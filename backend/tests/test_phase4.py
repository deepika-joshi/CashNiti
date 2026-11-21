import os
import sys
import tempfile
import unittest
from datetime import timedelta
from decimal import Decimal
from pathlib import Path

# Add backend directory to sys.path
backend_dir = Path(__file__).resolve().parent.parent
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

from sqlalchemy import create_engine, event
from sqlalchemy.engine import Engine
from sqlalchemy.orm import sessionmaker
from starlette.testclient import TestClient
from alembic.config import Config
from alembic import command

from app.db.session import get_db
from app.models.base import Base
from app.models.user import User, FinancialProfile
from app.core.security import create_access_token, hash_password, verify_password
from app.core.currency import to_subunits, from_subunits
from app.calculations.emi import calculate_reducing_balance_emi, generate_amortization_schedule
from app.calculations.summary import calculate_totals, calculate_savings_rate, calculate_budget_usage
from app.api.deps import verify_user_ownership, AuthenticatedDB, get_auth_db
from main import app


class Phase4TestSuite(unittest.TestCase):
    """
    Comprehensive Phase 4 Backend Test Suite:
    1. User registration with validation, password hashing, and duplicate rejection.
    2. User login with password verification and JWT token generation.
    3. Authentication protection: valid, missing, invalid, and expired JWT handling.
    4. Multi-user data isolation and anti-enumeration verification.
    5. High-precision 64-bit integer paise conversion and float drift prevention.
    6. Reducing-balance EMI and amortization schedule mathematical correctness.
    7. Financial aggregates: monthly totals, savings rate, and budget usage.
    """

    @classmethod
    def setUpClass(cls):
        # 1. Create a clean temporary directory for isolated test database
        cls.temp_dir = tempfile.TemporaryDirectory()
        cls.test_db_path = Path(cls.temp_dir.name) / "test_phase4.db"
        cls.test_db_url = f"sqlite:///{cls.test_db_path}"

        # 2. Run Alembic migrations against the test database
        alembic_cfg = Config(str(backend_dir / "alembic.ini"))
        alembic_cfg.set_main_option("script_location", str(backend_dir / "alembic"))
        alembic_cfg.set_main_option("sqlalchemy.url", cls.test_db_url)
        command.upgrade(alembic_cfg, "head")

        # 3. Create isolated SQLAlchemy engine and session factory
        cls.engine = create_engine(
            cls.test_db_url,
            connect_args={"check_same_thread": False},
            echo=False
        )

        @event.listens_for(cls.engine, "connect")
        def set_sqlite_pragma(dbapi_connection, connection_record):
            cursor = dbapi_connection.cursor()
            cursor.execute("PRAGMA foreign_keys=ON")
            cursor.close()

        cls.TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=cls.engine)

        # 4. Dependency override for FastAPI get_db
        def override_get_db():
            db = cls.TestingSessionLocal()
            try:
                yield db
            finally:
                db.close()

        app.dependency_overrides[get_db] = override_get_db
        cls.client = TestClient(app)

    @classmethod
    def tearDownClass(cls):
        app.dependency_overrides.clear()
        cls.engine.dispose()
        cls.temp_dir.cleanup()

    def setUp(self):
        self.db = self.TestingSessionLocal()

    def tearDown(self):
        self.db.close()

    # --------------------------------------------------------------------------
    # 1. User Registration Tests
    # --------------------------------------------------------------------------
    def test_01_user_registration_success(self):
        """Verify successful user registration, default profile creation, and JWT issuance."""
        payload = {
            "email": "testuser1@cashniti.in",
            "password": "StrongPassword123!",
            "full_name": "Vikram Singh"
        }
        response = self.client.post("/api/auth/register", json=payload)
        self.assertEqual(response.status_code, 201)
        data = response.json()

        self.assertTrue(data["success"])
        user_info = data["data"]["user"]
        self.assertEqual(user_info["email"], "testuser1@cashniti.in")
        self.assertEqual(user_info["full_name"], "Vikram Singh")
        self.assertTrue(user_info["is_active"])
        self.assertNotIn("password", user_info)
        self.assertNotIn("hashed_password", user_info)

        # Verify access token is issued
        self.assertIn("access_token", data["data"])
        self.assertEqual(data["data"]["token_type"], "bearer")
        self.assertGreater(data["data"]["expires_in"], 0)

        # Verify database state: user and default financial profile exist
        user = self.db.query(User).filter(User.email == "testuser1@cashniti.in").first()
        self.assertIsNotNone(user)
        self.assertNotEqual(user.hashed_password, "StrongPassword123!")
        self.assertTrue(verify_password("StrongPassword123!", user.hashed_password))

        profile = self.db.query(FinancialProfile).filter(FinancialProfile.user_id == user.id).first()
        self.assertIsNotNone(profile)
        self.assertEqual(profile.currency, "INR")
        self.assertEqual(profile.default_buffer_subunits, 500000)  # ₹5,000

    def test_02_duplicate_email_registration_rejected(self):
        """Verify that registering with an already existing email returns 400 Bad Request."""
        payload = {
            "email": "testuser1@cashniti.in",
            "password": "AnotherPassword456!",
            "full_name": "Duplicate Vikram"
        }
        response = self.client.post("/api/auth/register", json=payload)
        self.assertEqual(response.status_code, 400)
        data = response.json()
        self.assertFalse(data["success"])
        self.assertEqual(data["error"]["code"], "VALIDATION_ERROR")
        self.assertIn("already registered", data["error"]["message"].lower())

    def test_03_registration_short_password_rejected(self):
        """Verify password validation rejects passwords under 8 characters with 422 Unprocessable Entity."""
        payload = {
            "email": "shortpass@cashniti.in",
            "password": "short",
            "full_name": "Short Pass User"
        }
        response = self.client.post("/api/auth/register", json=payload)
        self.assertEqual(response.status_code, 422)
        data = response.json()
        self.assertFalse(data["success"])
        self.assertEqual(data["error"]["code"], "VALIDATION_ERROR")

    # --------------------------------------------------------------------------
    # 2. User Login Tests
    # --------------------------------------------------------------------------
    def test_04_user_login_success(self):
        """Verify that correct email and password returns 200 OK and valid JWT token."""
        payload = {
            "email": "testuser1@cashniti.in",
            "password": "StrongPassword123!"
        }
        response = self.client.post("/api/auth/login", json=payload)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["success"])
        self.assertIn("access_token", data["data"])
        self.assertEqual(data["data"]["user"]["email"], "testuser1@cashniti.in")

    def test_05_user_login_invalid_password_rejected(self):
        """Verify that an incorrect password returns 401 Unauthorized."""
        payload = {
            "email": "testuser1@cashniti.in",
            "password": "WrongPassword999!"
        }
        response = self.client.post("/api/auth/login", json=payload)
        self.assertEqual(response.status_code, 401)
        data = response.json()
        self.assertFalse(data["success"])
        self.assertEqual(data["error"]["code"], "UNAUTHORIZED")

    def test_06_user_login_nonexistent_email_rejected(self):
        """Verify that a nonexistent email returns 401 Unauthorized without leaking account existence."""
        payload = {
            "email": "nonexistent@cashniti.in",
            "password": "SomePassword123!"
        }
        response = self.client.post("/api/auth/login", json=payload)
        self.assertEqual(response.status_code, 401)
        data = response.json()
        self.assertFalse(data["success"])
        self.assertEqual(data["error"]["code"], "UNAUTHORIZED")

    # --------------------------------------------------------------------------
    # 3. Protected Route & Token Handling Tests
    # --------------------------------------------------------------------------
    def test_07_protected_me_endpoint_with_valid_token(self):
        """Verify GET /api/auth/me returns the user profile when supplied with a valid Bearer token."""
        login_resp = self.client.post("/api/auth/login", json={
            "email": "testuser1@cashniti.in",
            "password": "StrongPassword123!"
        })
        token = login_resp.json()["data"]["access_token"]

        headers = {"Authorization": f"Bearer {token}"}
        response = self.client.get("/api/auth/me", headers=headers)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["success"])
        self.assertEqual(data["data"]["email"], "testuser1@cashniti.in")
        self.assertEqual(data["data"]["profile"]["currency"], "INR")
        self.assertEqual(Decimal(str(data["data"]["profile"]["default_buffer"])), Decimal("5000.00"))

        # Verify /api/v1/auth/me also works identically
        v1_resp = self.client.get("/api/v1/auth/me", headers=headers)
        self.assertEqual(v1_resp.status_code, 200)

    def test_08_protected_endpoints_reject_missing_token(self):
        """Verify accessing /api/auth/me without an Authorization header returns 401 Unauthorized."""
        response = self.client.get("/api/auth/me")
        self.assertEqual(response.status_code, 401)
        data = response.json()
        self.assertFalse(data["success"])
        self.assertEqual(data["error"]["code"], "UNAUTHORIZED")

    def test_09_protected_endpoints_reject_invalid_token(self):
        """Verify accessing /api/auth/me with an invalid token returns 401 Unauthorized."""
        headers = {"Authorization": "Bearer invalid.jwt.token.here"}
        response = self.client.get("/api/auth/me", headers=headers)
        self.assertEqual(response.status_code, 401)
        data = response.json()
        self.assertFalse(data["success"])
        self.assertEqual(data["error"]["code"], "UNAUTHORIZED")

    def test_10_protected_endpoints_reject_expired_token(self):
        """Verify accessing /api/auth/me with an expired token returns 401 Unauthorized."""
        user = self.db.query(User).filter(User.email == "testuser1@cashniti.in").first()
        expired_token = create_access_token(
            data={"sub": str(user.id), "email": user.email},
            expires_delta=timedelta(seconds=-30)  # Expired 30 seconds ago
        )
        headers = {"Authorization": f"Bearer {expired_token}"}
        response = self.client.get("/api/auth/me", headers=headers)
        self.assertEqual(response.status_code, 401)
        data = response.json()
        self.assertFalse(data["success"])
        self.assertEqual(data["error"]["code"], "UNAUTHORIZED")

    # --------------------------------------------------------------------------
    # 4. User Isolation & Anti-Enumeration Tests
    # --------------------------------------------------------------------------
    def test_11_user_isolation_anti_enumeration(self):
        """Verify that verifying ownership against another user's record raises 404 (not 403) to prevent enumeration."""
        # Create User 2
        reg_resp = self.client.post("/api/auth/register", json={
            "email": "testuser2@cashniti.in",
            "password": "StrongPassword456!",
            "full_name": "Pooja Mehta"
        })
        self.assertEqual(reg_resp.status_code, 201)

        user1 = self.db.query(User).filter(User.email == "testuser1@cashniti.in").first()
        user2 = self.db.query(User).filter(User.email == "testuser2@cashniti.in").first()

        self.assertNotEqual(user1.id, user2.id)

        # Calling verify_user_ownership when owner != current user must raise HTTPException 404
        from fastapi import HTTPException
        with self.assertRaises(HTTPException) as cm:
            verify_user_ownership(resource_user_id=user1.id, current_user_id=user2.id, resource_name="Transaction")
        self.assertEqual(cm.exception.status_code, 404)
        self.assertEqual(cm.exception.detail, "Transaction not found.")

        # Same user ownership should succeed without error
        try:
            verify_user_ownership(resource_user_id=user1.id, current_user_id=user1.id, resource_name="Transaction")
        except HTTPException:
            self.fail("verify_user_ownership raised HTTPException unexpectedly for identical user ID")

    def test_11b_authenticated_db_dependency_and_query_scoping(self):
        """Verify AuthenticatedDB encapsulates user context and scopes queries strictly by user_id."""
        user1 = self.db.query(User).filter(User.email == "testuser1@cashniti.in").first()
        user2 = self.db.query(User).filter(User.email == "testuser2@cashniti.in").first()

        auth_db1 = AuthenticatedDB(db=self.db, user=user1)
        self.assertEqual(auth_db1.user_id, user1.id)

        # Scoped query test: querying profiles through filter_by_user must only return user1's record
        scoped_query = auth_db1.filter_by_user(self.db.query(FinancialProfile), FinancialProfile)
        profiles = scoped_query.all()
        self.assertEqual(len(profiles), 1)
        self.assertEqual(profiles[0].user_id, user1.id)

        # Anti-enumeration via auth_db method
        from fastapi import HTTPException
        with self.assertRaises(HTTPException) as cm:
            auth_db1.verify_ownership(resource_user_id=user2.id, resource_name="Account")
        self.assertEqual(cm.exception.status_code, 404)
        self.assertEqual(cm.exception.detail, "Account not found.")

    # --------------------------------------------------------------------------
    # 5. Financial Calculation Tests: Currency & Paise Precision
    # --------------------------------------------------------------------------
    def test_12_currency_paise_conversions_and_precision(self):
        """Verify exact 64-bit integer paise conversion and floating-point drift elimination."""
        # 1. Decimal to Subunits (INR)
        self.assertEqual(to_subunits(Decimal("1000.50"), "INR"), 100050)
        self.assertEqual(to_subunits(Decimal("0.05"), "INR"), 5)
        self.assertEqual(to_subunits(Decimal("0.00"), "INR"), 0)
        self.assertEqual(to_subunits(Decimal("123456789.99"), "INR"), 12345678999)

        # 2. Verify Decimal eliminates classic float binary rounding drift (0.1 + 0.2 != 0.3)
        dec_sum = Decimal("0.10") + Decimal("0.20")
        self.assertEqual(to_subunits(dec_sum, "INR"), 30)

        # 3. Subunits to Decimal (INR)
        self.assertEqual(from_subunits(100050, "INR"), Decimal("1000.50"))
        self.assertEqual(from_subunits(5, "INR"), Decimal("0.05"))
        self.assertEqual(from_subunits(0, "INR"), Decimal("0.00"))
        self.assertEqual(from_subunits(12345678999, "INR"), Decimal("123456789.99"))

        # 4. Error handling
        with self.assertRaises(ValueError):
            to_subunits(Decimal("-10.00"), "INR")
        with self.assertRaises(ValueError):
            from_subunits(-500, "INR")

    # --------------------------------------------------------------------------
    # 6. Financial Calculation Tests: Reducing-Balance EMI & Amortization
    # --------------------------------------------------------------------------
    def test_13_reducing_balance_emi_standard_loan(self):
        """
        Verify reducing-balance EMI formula against standard mathematical benchmark:
        Principal: ₹10,00,000, Annual Rate: 8.5%, Tenure: 120 months (10 years)
        Formula: EMI = P * [r * (1 + r)^n] / [(1 + r)^n - 1]
        Expected monthly EMI: ₹12,398.57
        """
        principal = Decimal("1000000.00")
        annual_rate = Decimal("8.50")
        tenure_months = 120

        result = calculate_reducing_balance_emi(principal, annual_rate, tenure_months)
        self.assertEqual(result["monthly_emi"], Decimal("12398.57"))
        self.assertEqual(result["monthly_emi_subunits"], 1239857)
        self.assertEqual(result["total_repayment"], Decimal("1487828.40"))
        self.assertEqual(result["total_interest"], Decimal("487828.40"))

    def test_14_zero_interest_emi(self):
        """Verify zero-interest (no-cost EMI) edge case handles division cleanly."""
        principal = Decimal("60000.00")
        annual_rate = Decimal("0.00")
        tenure_months = 6

        result = calculate_reducing_balance_emi(principal, annual_rate, tenure_months)
        self.assertEqual(result["monthly_emi"], Decimal("10000.00"))
        self.assertEqual(result["total_interest"], Decimal("0.00"))
        self.assertEqual(result["total_repayment"], Decimal("60000.00"))

    def test_15_amortization_schedule_reconciliation(self):
        """Verify complete month-by-month amortization schedule reconciles to exactly ₹0.00 closing balance."""
        principal = Decimal("100000.00")
        annual_rate = Decimal("10.00")
        tenure_months = 12

        schedule = generate_amortization_schedule(principal, annual_rate, tenure_months)
        self.assertEqual(len(schedule), 12)

        # First month check
        self.assertEqual(schedule[0]["month_number"], 1)
        self.assertEqual(schedule[0]["opening_balance"], Decimal("100000.00"))

        # Final month check
        self.assertEqual(schedule[-1]["month_number"], 12)
        self.assertEqual(schedule[-1]["closing_balance"], Decimal("0.00"))

        # Sum of principal components must equal initial principal
        total_principal_paid = sum(entry["principal_component"] for entry in schedule)
        self.assertEqual(total_principal_paid, Decimal("100000.00"))

    # --------------------------------------------------------------------------
    # 7. Financial Calculation Tests: Totals, Savings Rate, Budget Usage
    # --------------------------------------------------------------------------
    def test_16_financial_totals_and_savings_rate(self):
        """Verify calculation of monthly income/expense totals and savings rate."""
        transactions = [
            {"amount": Decimal("50000.00"), "type": "income"},
            {"amount": Decimal("15000.00"), "type": "income"},
            {"amount": Decimal("20000.00"), "type": "expense"},
            {"amount": Decimal("5000.00"), "type": "expense"},
        ]
        totals = calculate_totals(transactions)
        self.assertEqual(totals["total_income"], Decimal("65000.00"))
        self.assertEqual(totals["total_expenses"], Decimal("25000.00"))
        self.assertEqual(totals["net_balance"], Decimal("40000.00"))

        # Savings Rate: ((65000 - 25000) / 65000) * 100 = 61.54%
        savings_rate = calculate_savings_rate(totals["total_income"], totals["total_expenses"])
        self.assertEqual(savings_rate, Decimal("61.54"))

        # Zero income and expenses -> 0.00%
        self.assertEqual(calculate_savings_rate(Decimal("0.00"), Decimal("0.00")), Decimal("0.00"))

        # Zero income with positive expenses -> -100.00%
        self.assertEqual(calculate_savings_rate(Decimal("0.00"), Decimal("5000.00")), Decimal("-100.00"))

    def test_17_budget_usage_calculation(self):
        """Verify budget consumption percentage and headroom calculations."""
        # 1. Normal usage
        usage = calculate_budget_usage(spend=Decimal("12000.00"), limit=Decimal("20000.00"))
        self.assertEqual(usage["usage_percentage"], Decimal("60.00"))
        self.assertEqual(usage["remaining_budget"], Decimal("8000.00"))
        self.assertFalse(usage["is_exceeded"])

        # 2. Exceeded usage
        usage_exceeded = calculate_budget_usage(spend=Decimal("25000.00"), limit=Decimal("20000.00"))
        self.assertEqual(usage_exceeded["usage_percentage"], Decimal("125.00"))
        self.assertEqual(usage_exceeded["remaining_budget"], Decimal("0.00"))
        self.assertTrue(usage_exceeded["is_exceeded"])

    # --------------------------------------------------------------------------
    # 8. Preserved Base Endpoints
    # --------------------------------------------------------------------------
    def test_18_preserved_base_endpoints(self):
        """Verify GET / and GET /api/health remain operational."""
        home_resp = self.client.get("/")
        self.assertEqual(home_resp.status_code, 200)
        self.assertEqual(home_resp.json()["status"], "running")

        health_resp = self.client.get("/api/health")
        self.assertEqual(health_resp.status_code, 200)
        self.assertEqual(health_resp.json()["status"], "healthy")


if __name__ == "__main__":
    unittest.main()
