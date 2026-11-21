from datetime import datetime, timezone
from sqlalchemy import (
    Column, Integer, String, Boolean, Date, DateTime, BigInteger, CheckConstraint, ForeignKey, Index
)
from sqlalchemy.orm import relationship
from app.models.base import Base

def utc_now():
    return datetime.now(timezone.utc)

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    category_id = Column(Integer, ForeignKey("categories.id", ondelete="RESTRICT"), nullable=False, index=True)
    amount_subunits = Column(BigInteger, nullable=False)  # 64-bit integer paise (e.g., 100050 = ₹1,000.50)
    currency = Column(String(10), default="INR", nullable=False)
    type = Column(String(10), nullable=False)  # 'income' or 'expense'
    transaction_date = Column(Date, nullable=False, index=True)
    description = Column(String(255), nullable=False)
    merchant = Column(String(120), nullable=True)
    payment_mode = Column(String(20), default="upi", nullable=False)
    is_recurring = Column(Boolean, default=False, nullable=False)
    source = Column(String(20), default="manual", nullable=False)  # 'manual' or 'csv'
    reference_hash = Column(String(64), nullable=True)  # SHA-256 for duplicate detection
    created_at = Column(DateTime, default=utc_now, nullable=False)
    updated_at = Column(DateTime, default=utc_now, onupdate=utc_now, nullable=False)

    __table_args__ = (
        CheckConstraint("amount_subunits > 0", name="chk_tx_amount_positive"),
        CheckConstraint("type IN ('income', 'expense')", name="chk_tx_type"),
        CheckConstraint("payment_mode IN ('upi', 'card', 'netbanking', 'cash', 'other')", name="chk_tx_payment_mode"),
        CheckConstraint("source IN ('manual', 'csv')", name="chk_tx_source"),
        Index("idx_tx_user_date", "user_id", "transaction_date"),
        Index("idx_tx_user_category", "user_id", "category_id"),
        Index("uq_tx_user_ref_hash", "user_id", "reference_hash", unique=True),
    )

    # Relationships
    user = relationship("User", back_populates="transactions")
    category = relationship("Category", back_populates="transactions")
