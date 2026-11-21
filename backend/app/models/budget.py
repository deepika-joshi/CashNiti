from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, DateTime, BigInteger, CheckConstraint, ForeignKey, Index, UniqueConstraint
from sqlalchemy.orm import relationship
from app.models.base import Base

def utc_now():
    return datetime.now(timezone.utc)

class Budget(Base):
    __tablename__ = "budgets"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    category_id = Column(Integer, ForeignKey("categories.id", ondelete="CASCADE"), nullable=False, index=True)
    limit_amount_subunits = Column(BigInteger, nullable=False)  # 64-bit integer paise
    currency = Column(String(10), default="INR", nullable=False)
    month = Column(Integer, nullable=False)
    year = Column(Integer, nullable=False)
    alert_threshold_percentage = Column(Integer, default=85, nullable=False)
    created_at = Column(DateTime, default=utc_now, nullable=False)

    __table_args__ = (
        CheckConstraint("limit_amount_subunits > 0", name="chk_budget_limit_positive"),
        CheckConstraint("month BETWEEN 1 AND 12", name="chk_budget_month"),
        CheckConstraint("year >= 2020", name="chk_budget_year"),
        CheckConstraint("alert_threshold_percentage BETWEEN 1 AND 100", name="chk_budget_alert_threshold"),
        UniqueConstraint("user_id", "category_id", "month", "year", name="uq_user_cat_month_year"),
        Index("idx_budgets_user_period", "user_id", "year", "month"),
    )

    # Relationships
    user = relationship("User", back_populates="budgets")
    category = relationship("Category", back_populates="budgets")
