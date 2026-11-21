from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Boolean, Date, DateTime, BigInteger, CheckConstraint, ForeignKey, Index
from sqlalchemy.orm import relationship
from app.models.base import Base

def utc_now():
    return datetime.now(timezone.utc)

class FinancialGoal(Base):
    __tablename__ = "financial_goals"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    title = Column(String(120), nullable=False)
    target_amount_subunits = Column(BigInteger, nullable=False)  # 64-bit integer paise
    current_amount_subunits = Column(BigInteger, default=0, nullable=False)  # 64-bit integer paise
    currency = Column(String(10), default="INR", nullable=False)
    target_date = Column(Date, nullable=False)
    priority = Column(String(10), default="medium", nullable=False)
    is_completed = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime, default=utc_now, nullable=False)

    __table_args__ = (
        CheckConstraint("target_amount_subunits > 0", name="chk_goal_target_positive"),
        CheckConstraint("current_amount_subunits >= 0", name="chk_goal_current_non_negative"),
        CheckConstraint("priority IN ('low', 'medium', 'high')", name="chk_goal_priority"),
        Index("idx_goals_user", "user_id", "is_completed"),
    )

    # Relationship
    user = relationship("User", back_populates="financial_goals")


class EmergencyFund(Base):
    __tablename__ = "emergency_funds"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False, index=True)
    target_amount_subunits = Column(BigInteger, default=0, nullable=False)
    current_savings_subunits = Column(BigInteger, default=0, nullable=False)
    monthly_contribution_subunits = Column(BigInteger, default=0, nullable=False)
    currency = Column(String(10), default="INR", nullable=False)
    target_months = Column(Integer, default=6, nullable=False)
    updated_at = Column(DateTime, default=utc_now, onupdate=utc_now, nullable=False)

    __table_args__ = (
        CheckConstraint("target_months BETWEEN 1 AND 24", name="chk_emergency_target_months"),
    )

    # Relationship
    user = relationship("User", back_populates="emergency_fund")
