import io
import os
import sys
import tempfile
import unittest
from datetime import date, timedelta
from decimal import Decimal
from pathlib import Path

# Add backend directory to sys.path
backend_dir = Path(__file__).resolve().parent.parent
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

from sqlalchemy import create_engine, event
from sqlalchemy.orm import sessionmaker
from starlette.testclient import TestClient
from alembic.config import Config
from alembic import command

from app.db.session import get_db
from app.models.base import Base
from app.models.user import User, FinancialProfile
from app.models.category import Category
from app.models.transaction import Transaction
from app.core.security import create_access_token
from app.core.currency import to_subunits, from_subunits
from app.services.category_service import ensure_default_categories
from main import app


class Phase5TestSuite(unittest.TestCase):
    """
    Comprehensive Phase 5 Test Suite:
    1. Transaction CRUD (create, read, update, delete) with INR paise precision.
    2. Category ownership, accessibility, and type matching rules.
    3. Multi-tenant user isolation and anti-enumeration (404 on cross-user access).
    4. Search, filtering (type, category, payment mode, date range), and pagination.
    5. Multipart CSV import: safe parsing, duplicate detection, invalid row reporting.
    6. CSV export: user-isolated downloadable CSV output.
    7. Authentication enforcement: unauthenticated requests rejected with 401.
    """

    @classmethod
    def setUpClass(cls):
        # 1. Isolated temporary SQLite database
        cls.temp_dir = tempfile.TemporaryDirectory()
        cls.test_db_path = Path(cls.temp_dir.name) / "test_phase5.db"
        cls.test_db_url = f"sqlite:///{cls.test_db_path}"

        # 2. Run Alembic migrations
        alembic_cfg = Config(str(backend_dir / "alembic.ini"))
        alembic_cfg.set_main_option("script_location", str(backend_dir / "alembic"))
        alembic_cfg.set_main_option("sqlalchemy.url", cls.test_db_url)
        command.upgrade(alembic_cfg, "head")

        # 3. Create engine and session factory
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

        # Seed global system categories
        with cls.TestingSessionLocal() as seed_session:
            ensure_default_categories(seed_session)

        # Register User A once
        cls.user_a_email = "user.a@cashniti.in"
        resp_a = cls.client.post("/api/auth/register", json={
            "email": cls.user_a_email,
            "password": "Password123!A",
            "full_name": "User Alpha"
        })
        cls.token_a = resp_a.json()["data"]["access_token"]
        cls.headers_a = {"Authorization": f"Bearer {cls.token_a}"}

        # Register User B once
        cls.user_b_email = "user.b@cashniti.in"
        resp_b = cls.client.post("/api/auth/register", json={
            "email": cls.user_b_email,
            "password": "Password123!B",
            "full_name": "User Beta"
        })
        cls.token_b = resp_b.json()["data"]["access_token"]
        cls.headers_b = {"Authorization": f"Bearer {cls.token_b}"}

    @classmethod
    def tearDownClass(cls):
        app.dependency_overrides.clear()
        cls.engine.dispose()
        cls.temp_dir.cleanup()

    def setUp(self):
        self.db = self.TestingSessionLocal()
        self.headers_a = self.__class__.headers_a
        self.headers_b = self.__class__.headers_b
        self.user_a = self.db.query(User).filter(User.email == self.__class__.user_a_email).first()
        self.user_b = self.db.query(User).filter(User.email == self.__class__.user_b_email).first()

        # Query global categories
        self.groceries_cat = self.db.query(Category).filter(
            Category.name == "Groceries & Essentials", Category.is_system == True
        ).first()
        self.salary_cat = self.db.query(Category).filter(
            Category.name == "Salary & Wages", Category.is_system == True
        ).first()

    def tearDown(self):
        self.db.close()

    # --------------------------------------------------------------------------
    # 1. Transaction Creation Tests
    # --------------------------------------------------------------------------
    def test_01_create_transaction_success(self):
        """Verify creating an expense and income transaction with exact paise subunits in DB."""
        # 1. Create Expense
        payload_exp = {
            "amount": 2400.50,
            "type": "expense",
            "category_id": self.groceries_cat.id,
            "transaction_date": "2026-11-20",
            "description": "Weekly Groceries at Nature's Basket",
            "merchant": "Nature's Basket",
            "payment_mode": "upi",
            "is_recurring": False,
            "source": "manual"
        }
        res_exp = self.client.post("/api/v1/transactions", json=payload_exp, headers=self.headers_a)
        self.assertEqual(res_exp.status_code, 201)
        data_exp = res_exp.json()["data"]
        self.assertEqual(data_exp["description"], "Weekly Groceries at Nature's Basket")
        self.assertEqual(Decimal(str(data_exp["amount"])), Decimal("2400.50"))
        self.assertEqual(data_exp["type"], "expense")
        self.assertEqual(data_exp["user_id"], self.user_a.id)

        # Verify DB representation is 64-bit integer paise (2400.50 * 100 = 240050)
        tx_db = self.db.query(Transaction).filter(Transaction.id == data_exp["id"]).first()
        self.assertIsNotNone(tx_db)
        self.assertEqual(tx_db.amount_subunits, 240050)
        self.assertIsInstance(tx_db.amount_subunits, int)
        self.assertIsNotNone(tx_db.reference_hash)

        # 2. Create Income
        payload_inc = {
            "amount": 85000.00,
            "type": "income",
            "category_id": self.salary_cat.id,
            "transaction_date": "2026-11-01",
            "description": "Monthly Salary",
            "merchant": "Tech Solutions Pvt Ltd",
            "payment_mode": "netbanking"
        }
        res_inc = self.client.post("/api/v1/transactions", json=payload_inc, headers=self.headers_a)
        self.assertEqual(res_inc.status_code, 201)
        data_inc = res_inc.json()["data"]
        self.assertEqual(Decimal(str(data_inc["amount"])), Decimal("85000.00"))
        self.assertEqual(data_inc["type"], "income")

    def test_02_create_transaction_validation_errors(self):
        """Verify validation rules reject invalid amounts, types, and payment modes."""
        # Negative amount
        res1 = self.client.post("/api/v1/transactions", json={
            "amount": -500.00,
            "type": "expense",
            "category_id": self.groceries_cat.id,
            "transaction_date": "2026-11-20",
            "description": "Negative amount test"
        }, headers=self.headers_a)
        self.assertEqual(res1.status_code, 422)

        # Zero amount
        res2 = self.client.post("/api/v1/transactions", json={
            "amount": 0.00,
            "type": "expense",
            "category_id": self.groceries_cat.id,
            "transaction_date": "2026-11-20",
            "description": "Zero amount test"
        }, headers=self.headers_a)
        self.assertEqual(res2.status_code, 422)

        # Invalid type
        res3 = self.client.post("/api/v1/transactions", json={
            "amount": 100.00,
            "type": "transfer",
            "category_id": self.groceries_cat.id,
            "transaction_date": "2026-11-20",
            "description": "Invalid type test"
        }, headers=self.headers_a)
        self.assertEqual(res3.status_code, 422)

        # Invalid payment mode
        res4 = self.client.post("/api/v1/transactions", json={
            "amount": 100.00,
            "type": "expense",
            "category_id": self.groceries_cat.id,
            "transaction_date": "2026-11-20",
            "description": "Invalid mode test",
            "payment_mode": "bitcoin"
        }, headers=self.headers_a)
        self.assertEqual(res4.status_code, 422)

        # Empty description
        res5 = self.client.post("/api/v1/transactions", json={
            "amount": 100.00,
            "type": "expense",
            "category_id": self.groceries_cat.id,
            "transaction_date": "2026-11-20",
            "description": "   "
        }, headers=self.headers_a)
        self.assertEqual(res5.status_code, 422)

    # --------------------------------------------------------------------------
    # 2. Category Ownership & Type Matching
    # --------------------------------------------------------------------------
    def test_03_category_ownership_and_type_matching(self):
        """Verify that transactions enforce category access restrictions and type compatibility."""
        # 1. Non-existent category -> 400 Bad Request
        res1 = self.client.post("/api/v1/transactions", json={
            "amount": 500.00,
            "type": "expense",
            "category_id": 99999,
            "transaction_date": "2026-11-20",
            "description": "Nonexistent category"
        }, headers=self.headers_a)
        self.assertEqual(res1.status_code, 400)

        # 2. Type mismatch: assigning income category to an expense transaction
        res2 = self.client.post("/api/v1/transactions", json={
            "amount": 500.00,
            "type": "expense",
            "category_id": self.salary_cat.id,  # Salary is 'income'
            "transaction_date": "2026-11-20",
            "description": "Type mismatch test"
        }, headers=self.headers_a)
        self.assertEqual(res2.status_code, 400)
        self.assertIn("type", res2.json()["error"]["message"].lower())

        # 3. Create custom category for User B
        res_cat = self.client.post("/api/v1/categories", json={
            "name": "Beta Private Hobby",
            "type": "expense",
            "icon": "palette",
            "color": "#8B5CF6",
            "is_essential": False
        }, headers=self.headers_b)
        self.assertEqual(res_cat.status_code, 201)
        cat_b_id = res_cat.json()["data"]["id"]

        # User A attempts to use User B's private custom category -> 400 Bad Request
        res3 = self.client.post("/api/v1/transactions", json={
            "amount": 350.00,
            "type": "expense",
            "category_id": cat_b_id,
            "transaction_date": "2026-11-20",
            "description": "Cross user category attempt"
        }, headers=self.headers_a)
        self.assertEqual(res3.status_code, 400)

    # --------------------------------------------------------------------------
    # 3. Listing, Search, Filters & Pagination
    # --------------------------------------------------------------------------
    def test_04_listing_filters_and_pagination(self):
        """Verify pagination metadata, search keyword matching, and multidimensional filters."""
        # Create 5 distinct transactions for User A
        dates = ["2026-11-10", "2026-11-12", "2026-11-15", "2026-11-18", "2026-11-20"]
        for idx, d in enumerate(dates):
            self.client.post("/api/v1/transactions", json={
                "amount": 1000.00 + (idx * 100),
                "type": "expense" if idx < 4 else "income",
                "category_id": self.groceries_cat.id if idx < 4 else self.salary_cat.id,
                "transaction_date": d,
                "description": f"Test Transaction {idx} Swiggy Food" if idx % 2 == 0 else f"Test Transaction {idx} Uber Ride",
                "merchant": "Swiggy" if idx % 2 == 0 else "Uber",
                "payment_mode": "upi" if idx < 3 else "card"
            }, headers=self.headers_a)

        # 1. Pagination: page 1, limit 2
        res_page = self.client.get("/api/v1/transactions?page=1&limit=2", headers=self.headers_a)
        self.assertEqual(res_page.status_code, 200)
        data_page = res_page.json()
        self.assertEqual(len(data_page["data"]), 2)
        self.assertGreaterEqual(data_page["pagination"]["total"], 5)
        self.assertEqual(data_page["pagination"]["page"], 1)
        self.assertEqual(data_page["pagination"]["limit"], 2)
        self.assertGreaterEqual(data_page["pagination"]["total_pages"], 3)

        # Verify sorting: newest first (2026-11-20 before 2026-11-18)
        items = data_page["data"]
        self.assertGreaterEqual(items[0]["transaction_date"], items[1]["transaction_date"])

        # 2. Filter by type=income
        res_inc = self.client.get("/api/v1/transactions?type=income", headers=self.headers_a)
        self.assertEqual(res_inc.status_code, 200)
        for item in res_inc.json()["data"]:
            self.assertEqual(item["type"], "income")

        # 3. Filter by payment_mode=card
        res_card = self.client.get("/api/v1/transactions?payment_mode=card", headers=self.headers_a)
        self.assertEqual(res_card.status_code, 200)
        for item in res_card.json()["data"]:
            self.assertEqual(item["payment_mode"], "card")

        # 4. Search keyword in merchant or description
        res_search = self.client.get("/api/v1/transactions?search=Swiggy", headers=self.headers_a)
        self.assertEqual(res_search.status_code, 200)
        for item in res_search.json()["data"]:
            self.assertTrue("swiggy" in item["description"].lower() or "swiggy" in (item["merchant"] or "").lower())

        # 5. Date range filter
        res_range = self.client.get("/api/v1/transactions?start_date=2026-11-12&end_date=2026-11-18", headers=self.headers_a)
        self.assertEqual(res_range.status_code, 200)
        for item in res_range.json()["data"]:
            self.assertTrue("2026-11-12" <= item["transaction_date"] <= "2026-11-18")

    # --------------------------------------------------------------------------
    # 4. Get, Update, Delete & Cross-User Anti-Enumeration
    # --------------------------------------------------------------------------
    def test_05_get_update_delete_and_cross_user_isolation(self):
        """Verify CRUD operations and anti-enumeration: return 404 for another user's records."""
        # User A creates a transaction
        res_create = self.client.post("/api/v1/transactions", json={
            "amount": 3500.00,
            "type": "expense",
            "category_id": self.groceries_cat.id,
            "transaction_date": "2026-11-20",
            "description": "A's Private Electronics Purchase",
            "merchant": "Croma"
        }, headers=self.headers_a)
        tx_id = res_create.json()["data"]["id"]

        # 1. User A can retrieve their own transaction
        res_get_a = self.client.get(f"/api/v1/transactions/{tx_id}", headers=self.headers_a)
        self.assertEqual(res_get_a.status_code, 200)
        self.assertEqual(res_get_a.json()["data"]["id"], tx_id)

        # 2. User B attempts to retrieve User A's transaction -> MUST return 404 Not Found (anti-enumeration)
        res_get_b = self.client.get(f"/api/v1/transactions/{tx_id}", headers=self.headers_b)
        self.assertEqual(res_get_b.status_code, 404)
        self.assertEqual(res_get_b.json()["error"]["code"], "RESOURCE_NOT_FOUND")

        # 3. User B attempts to update User A's transaction -> MUST return 404 Not Found
        res_put_b = self.client.put(f"/api/v1/transactions/{tx_id}", json={
            "description": "Hacked Description"
        }, headers=self.headers_b)
        self.assertEqual(res_put_b.status_code, 404)

        # 4. User A updates their own transaction
        res_put_a = self.client.put(f"/api/v1/transactions/{tx_id}", json={
            "amount": 3800.75,
            "description": "Updated Croma Electronics",
            "merchant": "Croma Flagship"
        }, headers=self.headers_a)
        self.assertEqual(res_put_a.status_code, 200)
        self.assertEqual(Decimal(str(res_put_a.json()["data"]["amount"])), Decimal("3800.75"))

        # Verify paise updated in DB
        tx_db = self.db.query(Transaction).filter(Transaction.id == tx_id).first()
        self.assertEqual(tx_db.amount_subunits, 380075)

        # 5. User B attempts to delete User A's transaction -> MUST return 404 Not Found
        res_del_b = self.client.delete(f"/api/v1/transactions/{tx_id}", headers=self.headers_b)
        self.assertEqual(res_del_b.status_code, 404)

        # 6. User A deletes their transaction
        res_del_a = self.client.delete(f"/api/v1/transactions/{tx_id}", headers=self.headers_a)
        self.assertEqual(res_del_a.status_code, 200)
        self.assertTrue(res_del_a.json()["data"]["deleted"])

        # 7. Subsequent retrieval returns 404
        res_post_del = self.client.get(f"/api/v1/transactions/{tx_id}", headers=self.headers_a)
        self.assertEqual(res_post_del.status_code, 404)

    # --------------------------------------------------------------------------
    # 5. Authentication Protection
    # --------------------------------------------------------------------------
    def test_06_unauthenticated_requests_rejected(self):
        """Verify all transaction endpoints return 401 when accessed without a valid JWT token."""
        self.assertEqual(self.client.get("/api/v1/transactions").status_code, 401)
        self.assertEqual(self.client.post("/api/v1/transactions", json={}).status_code, 401)
        self.assertEqual(self.client.get("/api/v1/transactions/1").status_code, 401)
        self.assertEqual(self.client.put("/api/v1/transactions/1", json={}).status_code, 401)
        self.assertEqual(self.client.delete("/api/v1/transactions/1").status_code, 401)
        self.assertEqual(self.client.get("/api/v1/transactions/export-csv").status_code, 401)
        self.assertEqual(self.client.post("/api/v1/transactions/import-csv").status_code, 401)

    # --------------------------------------------------------------------------
    # 6. CSV Import & Duplicate Detection
    # --------------------------------------------------------------------------
    def test_07_csv_import_success_and_duplicates(self):
        """Verify multipart CSV import, duplicate detection, and user isolation."""
        csv_data = (
            "date,amount,type,category,description,merchant,payment_mode\n"
            "2026-11-10,1250.50,expense,Groceries & Essentials,Supermarket Shopping,BigBasket,upi\n"
            "2026-11-11,450.00,expense,Food & Dining,Cafe Coffee Day,CCD,card\n"
            "2026-11-12,50000.00,income,Salary & Wages,Monthly Salary,Employer,netbanking\n"
        ).encode("utf-8")

        # 1. First import: 3 rows should succeed
        res_import = self.client.post(
            "/api/v1/transactions/import-csv",
            files={"file": ("transactions.csv", csv_data, "text/csv")},
            headers=self.headers_a
        )
        self.assertEqual(res_import.status_code, 200)
        data = res_import.json()["data"]
        self.assertEqual(data["total_rows_parsed"], 3)
        self.assertEqual(data["successful_imports"], 3)
        self.assertEqual(data["duplicates_skipped"], 0)
        self.assertEqual(len(data["errors"]), 0)

        # 2. Second import of the identical file: all 3 rows must be recognized as duplicates and skipped
        res_dup = self.client.post(
            "/api/v1/transactions/import-csv",
            files={"file": ("transactions.csv", csv_data, "text/csv")},
            headers=self.headers_a
        )
        self.assertEqual(res_dup.status_code, 200)
        data_dup = res_dup.json()["data"]
        self.assertEqual(data_dup["successful_imports"], 0)
        self.assertEqual(data_dup["duplicates_skipped"], 3)

        # 3. User B imports the identical CSV: should succeed because duplicates are strictly scoped to user_id
        res_b_import = self.client.post(
            "/api/v1/transactions/import-csv",
            files={"file": ("transactions.csv", csv_data, "text/csv")},
            headers=self.headers_b
        )
        self.assertEqual(res_b_import.status_code, 200)
        self.assertEqual(res_b_import.json()["data"]["successful_imports"], 3)

    def test_08_csv_import_invalid_rows_and_error_reporting(self):
        """Verify that invalid rows in CSV are recorded in errors without crashing the import."""
        mixed_csv = (
            "date,amount,type,category,description,merchant,payment_mode\n"
            "2026-11-15,150.00,expense,Food & Dining,Good Chai,Chai Point,upi\n"
            "invalid-date,200.00,expense,Food & Dining,Bad Date Row,Cafe,upi\n"
            "2026-11-16,-50.00,expense,Food & Dining,Negative Amount Row,Cafe,upi\n"
            "2026-11-17,300.00,unknown_type,Food & Dining,Bad Type Row,Cafe,upi\n"
            "2026-11-18,450.00,expense,Food & Dining,Good Dinner,Restaurant,card\n"
        ).encode("utf-8")

        res = self.client.post(
            "/api/v1/transactions/import-csv",
            files={"file": ("mixed.csv", mixed_csv, "text/csv")},
            headers=self.headers_a
        )
        self.assertEqual(res.status_code, 200)
        data = res.json()["data"]
        self.assertEqual(data["total_rows_parsed"], 5)
        self.assertEqual(data["successful_imports"], 2)  # Rows 2 and 6
        self.assertEqual(len(data["errors"]), 3)         # Rows 3, 4, 5 failed

    def test_09_csv_import_missing_headers_and_invalid_file_rejected(self):
        """Verify that CSV with missing required columns or non-csv file extension is rejected with 400."""
        bad_header_csv = "date,type,description\n2026-11-15,expense,Missing amount\n".encode("utf-8")
        res1 = self.client.post(
            "/api/v1/transactions/import-csv",
            files={"file": ("bad_headers.csv", bad_header_csv, "text/csv")},
            headers=self.headers_a
        )
        self.assertEqual(res1.status_code, 400)
        self.assertIn("missing required columns", res1.json()["error"]["message"].lower())

        # Non-CSV extension
        res2 = self.client.post(
            "/api/v1/transactions/import-csv",
            files={"file": ("statement.pdf", b"%PDF-1.4 dummy", "application/pdf")},
            headers=self.headers_a
        )
        self.assertEqual(res2.status_code, 400)

    # --------------------------------------------------------------------------
    # 7. CSV Export
    # --------------------------------------------------------------------------
    def test_10_csv_export_ownership_and_content(self):
        """Verify downloadable CSV export applies filters and contains only the requesting user's records."""
        # Export for User A
        res_export = self.client.get("/api/v1/transactions/export-csv", headers=self.headers_a)
        self.assertEqual(res_export.status_code, 200)
        self.assertEqual(res_export.headers["content-type"].split(";")[0], "text/csv")
        self.assertIn("attachment; filename=", res_export.headers.get("content-disposition", ""))

        csv_text = res_export.text
        lines = csv_text.strip().split("\r\n") if "\r\n" in csv_text else csv_text.strip().split("\n")
        self.assertGreaterEqual(len(lines), 2)  # Header + at least 1 row
        header = lines[0].split(",")
        self.assertIn("Transaction ID", header)
        self.assertIn("Amount (INR)", header)
        self.assertIn("Category", header)

        # Export for User B: should only have User B's rows
        res_b_export = self.client.get("/api/v1/transactions/export-csv", headers=self.headers_b)
        self.assertEqual(res_b_export.status_code, 200)
        b_lines = res_b_export.text.strip().split("\r\n") if "\r\n" in res_b_export.text else res_b_export.text.strip().split("\n")
        self.assertGreaterEqual(len(b_lines), 2)


if __name__ == "__main__":
    unittest.main()
