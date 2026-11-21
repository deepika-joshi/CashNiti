from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Boolean, Date, DateTime, BigInteger, CheckConstraint, ForeignKey, Index
from sqlalchemy.orm import relationship
from app.models.base import Base

def utc_now():
    return datetime.now(timezone.utc)

class RecurringObligation(Base):
    __tablename__ = "recurring_obligations"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    category_id = Column(Integer, ForeignKey("categories.id", ondelete="RESTRICT"), nullable=False, index=True)
    title = Column(String(120), nullable=False)
    amount_subunits = Column(BigInteger, nullable=False)  # 64-bit integer paise
    currency = Column(String(10), default="INR", nullable=False)
    frequency = Column(String(20), default="monthly", nullable=False)
    due_day_of_month = Column(Integer, nullable=False)
    next_due_date = Column(Date, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime, default=utc_now, nullable=False)

    __table_args__ = (
        CheckConstraint("amount_subunits > 0", name="chk_obligation_amount_positive"),
        CheckConstraint("frequency IN ('weekly', 'monthly', 'quarterly', 'annual')", name="chk_obligation_frequency"),
        CheckConstraint("due_day_of_month BETWEEN 1 AND 31", name="chk_obligation_due_day"),
        Index("idx_recurring_user", "user_id", "is_active"),
    )

    # Relationships
    user = relationship("User", back_populates="recurring_obligations")
    category = relationship("Category", back_populates="recurring_obligations")
