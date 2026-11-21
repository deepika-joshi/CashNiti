import os
import sys
import tempfile
import unittest
from datetime import date, datetime, timezone
from decimal import Decimal
from pathlib import Path

# Add backend directory to path
backend_dir = Path(__file__).resolve().parent.parent
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

from sqlalchemy import create_engine, event, select, text
from sqlalchemy.engine import Engine
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import sessionmaker

from alembic.config import Config
from alembic import command

from app.models.base import Base
from app.models.user import User, FinancialProfile
from app.models.category import Category
from app.models.transaction import Transaction
from app.models.obligation import RecurringObligation
from app.models.budget import Budget
from app.models.goal import FinancialGoal, EmergencyFund
from app.models.loan import Loan, LoanAmortizationEntry
from app.models.scam import ScamScan
from app.models.ai import AIConversation, AIMessage
from app.core.currency import to_subunits, from_subunits


class DatabaseTestSuite(unittest.TestCase):
    """
    Comprehensive Phase 3 Database Test Suite:
    - Verifies Alembic migrations create all tables on a fresh database.
    - Verifies user creation and retrieval.
    - Verifies user ownership and mandatory non-null user_id constraints.
    - Verifies 64-bit integer paise storage (no floating-point values).
    - Verifies foreign key enforcement and cascading deletes.
    - Verifies multi-user data isolation.
    """

    @classmethod
    def setUpClass(cls):
        # Create a unique temporary directory for the test database
        cls.temp_dir = tempfile.TemporaryDirectory()
        cls.test_db_path = Path(cls.temp_dir.name) / "test_cashniti.db"
        cls.test_db_url = f"sqlite:///{cls.test_db_path}"

        # 1. Verify Alembic migrations run cleanly on fresh database
        alembic_cfg = Config(str(backend_dir / "alembic.ini"))
        alembic_cfg.set_main_option("script_location", str(backend_dir / "alembic"))
        alembic_cfg.set_main_option("sqlalchemy.url", cls.test_db_url)

        # Run Alembic upgrade head
        command.upgrade(alembic_cfg, "head")

        # 2. Create synchronous engine with SQLite foreign key enforcement
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

        cls.SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=cls.engine)

    @classmethod
    def tearDownClass(cls):
        cls.engine.dispose()
        cls.temp_dir.cleanup()

    def setUp(self):
        self.session = self.SessionLocal()

    def tearDown(self):
        self.session.rollback()
        self.session.close()

    def test_01_all_tables_created_by_migration(self):
        """Confirm migration successfully created all 13 application tables."""
        with self.engine.connect() as conn:
            result = conn.execute(text("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;"))
            tables = {row[0] for row in result.fetchall()}

        expected_tables = {
            "alembic_version",
            "users",
            "financial_profiles",
            "categories",
            "transactions",
            "recurring_obligations",
            "budgets",
            "financial_goals",
            "emergency_funds",
            "loans",
            "loan_amortization_entries",
            "scam_scans",
            "ai_conversations",
            "ai_messages",
        }
        for table in expected_tables:
            self.assertIn(table, tables, f"Expected table '{table}' not found in database!")

    def test_02_create_and_retrieve_user(self):
        """Create and retrieve a user with financial profile."""
        user = User(
            email="arjun.mehta@example.com",
            full_name="Arjun Mehta",
            hashed_password="secure_bcrypt_hashed_password_placeholder",
            is_active=True
        )
        self.session.add(user)
        self.session.commit()
        self.session.refresh(user)

        self.assertIsNotNone(user.id)
        self.assertEqual(user.email, "arjun.mehta@example.com")
        self.assertEqual(user.full_name, "Arjun Mehta")
        self.assertTrue(user.is_active)

        # Retrieve user by email
        queried_user = self.session.query(User).filter(User.email == "arjun.mehta@example.com").first()
        self.assertIsNotNone(queried_user)
        self.assertEqual(queried_user.id, user.id)

    def test_03_financial_records_and_integer_paise_storage(self):
        """
        Create financial records and verify monetary figures are stored
        as 64-bit integer paise (₹1,250.50 -> 125050 paise).
        """
        user = self.session.query(User).filter(User.email == "arjun.mehta@example.com").first()

        # Create category
        category = Category(
            user_id=None,  # Global system category
            name="Groceries & Essentials",
            type="expense",
            icon="shopping_basket",
            color="#16A34A",
            is_system=True,
            is_essential=True
        )
        self.session.add(category)
        self.session.commit()
        self.session.refresh(category)

        # Create monetary transaction of ₹1,250.50
        paise_amount = to_subunits(Decimal("1250.50"), "INR")  # Exactly 125050 paise
        self.assertEqual(paise_amount, 125050)
        self.assertIsInstance(paise_amount, int)

        tx = Transaction(
            user_id=user.id,
            category_id=category.id,
            amount_subunits=paise_amount,
            currency="INR",
            type="expense",
            transaction_date=date(2026, 11, 21),
            description="Nature's Basket Organic Groceries",
            merchant="Nature's Basket",
            payment_mode="upi",
            is_recurring=False,
            source="manual"
        )
        self.session.add(tx)
        self.session.commit()
        self.session.refresh(tx)

        # Verify transaction fields
        self.assertEqual(tx.user_id, user.id)
        self.assertEqual(tx.amount_subunits, 125050)
        self.assertIsInstance(tx.amount_subunits, int)

        # Verify conversion back to decimal
        reconstituted_decimal = from_subunits(tx.amount_subunits, tx.currency)
        self.assertEqual(reconstituted_decimal, Decimal("1250.50"))

        # Verify raw SQL integer storage directly in SQLite
        with self.engine.connect() as conn:
            raw_res = conn.execute(
                text("SELECT amount_subunits, typeof(amount_subunits) FROM transactions WHERE id = :id"),
                {"id": tx.id}
            ).fetchone()
            stored_val, stored_type = raw_res
            self.assertEqual(stored_val, 125050)
            self.assertEqual(stored_type, "integer")

    def test_04_mandatory_user_id_constraint(self):
        """Verify that user_id is strictly NOT NULL for user-owned records."""
        cat = self.session.query(Category).first()

        # Attempt to insert transaction without user_id
        orphan_tx = Transaction(
            user_id=None,  # Forbidden
            category_id=cat.id,
            amount_subunits=50000,
            currency="INR",
            type="expense",
            transaction_date=date(2026, 11, 21),
            description="Orphan Transaction Attempt"
        )
        self.session.add(orphan_tx)

        with self.assertRaises(IntegrityError):
            self.session.commit()
        self.session.rollback()

    def test_05_foreign_key_enforcement(self):
        """Verify SQLite foreign key enforcement on invalid user_id or category_id."""
        # 1. Invalid user_id
        invalid_tx = Transaction(
            user_id=999999,  # Non-existent user
            category_id=1,
            amount_subunits=50000,
            currency="INR",
            type="expense",
            transaction_date=date(2026, 11, 21),
            description="Invalid User FK"
        )
        self.session.add(invalid_tx)
        with self.assertRaises(IntegrityError):
            self.session.commit()
        self.session.rollback()

        # 2. Invalid category_id
        user = self.session.query(User).first()
        invalid_cat_tx = Transaction(
            user_id=user.id,
            category_id=888888,  # Non-existent category
            amount_subunits=50000,
            currency="INR",
            type="expense",
            transaction_date=date(2026, 11, 21),
            description="Invalid Category FK"
        )
        self.session.add(invalid_cat_tx)
        with self.assertRaises(IntegrityError):
            self.session.commit()
        self.session.rollback()

    def test_06_cascading_delete_on_user_removal(self):
        """Verify cascading deletion purges all linked records when user is deleted."""
        # Create dedicated temporary user
        temp_user = User(
            email="temp.delete@example.com",
            full_name="Temp User",
            hashed_password="pw"
        )
        self.session.add(temp_user)
        self.session.commit()
        self.session.refresh(temp_user)

        cat = self.session.query(Category).first()

        # Add transaction and financial profile
        profile = FinancialProfile(
            user_id=temp_user.id,
            monthly_income_subunits=7500000,
            primary_income_date=5
        )
        tx = Transaction(
            user_id=temp_user.id,
            category_id=cat.id,
            amount_subunits=250000,
            currency="INR",
            type="expense",
            transaction_date=date(2026, 11, 21),
            description="Will be cascaded"
        )
        self.session.add_all([profile, tx])
        self.session.commit()

        # Verify records exist
        self.assertEqual(self.session.query(Transaction).filter_by(user_id=temp_user.id).count(), 1)
        self.assertEqual(self.session.query(FinancialProfile).filter_by(user_id=temp_user.id).count(), 1)

        # Delete the user
        self.session.delete(temp_user)
        self.session.commit()

        # Verify child records automatically cascaded and deleted
        self.assertEqual(self.session.query(Transaction).filter_by(user_id=temp_user.id).count(), 0)
        self.assertEqual(self.session.query(FinancialProfile).filter_by(user_id=temp_user.id).count(), 0)

    def test_07_multi_user_data_isolation(self):
        """Verify users cannot see or access other users' financial records."""
        # Create User A and User B
        user_a = User(email="user.a@example.com", full_name="User A", hashed_password="pw")
        user_b = User(email="user.b@example.com", full_name="User B", hashed_password="pw")
        self.session.add_all([user_a, user_b])
        self.session.commit()

        cat = self.session.query(Category).first()

        # User A transaction: ₹5,000.00
        tx_a = Transaction(
            user_id=user_a.id,
            category_id=cat.id,
            amount_subunits=500000,
            currency="INR",
            type="expense",
            transaction_date=date(2026, 11, 21),
            description="User A Secret Expense"
        )
        # User B transaction: ₹10,000.00
        tx_b = Transaction(
            user_id=user_b.id,
            category_id=cat.id,
            amount_subunits=1000000,
            currency="INR",
            type="expense",
            transaction_date=date(2026, 11, 21),
            description="User B Confidential Inflow"
        )
        self.session.add_all([tx_a, tx_b])
        self.session.commit()

        # Query scoped to User A
        user_a_txs = self.session.query(Transaction).filter(Transaction.user_id == user_a.id).all()
        self.assertEqual(len(user_a_txs), 1)
        self.assertEqual(user_a_txs[0].description, "User A Secret Expense")
        self.assertEqual(user_a_txs[0].amount_subunits, 500000)

        # Query scoped to User B
        user_b_txs = self.session.query(Transaction).filter(Transaction.user_id == user_b.id).all()
        self.assertEqual(len(user_b_txs), 1)
        self.assertEqual(user_b_txs[0].description, "User B Confidential Inflow")
        self.assertEqual(user_b_txs[0].amount_subunits, 1000000)


if __name__ == "__main__":
    unittest.main()
