from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Boolean, Date, DateTime, BigInteger, Numeric, CheckConstraint, ForeignKey, Index
from sqlalchemy.orm import relationship
from app.models.base import Base

def utc_now():
    return datetime.now(timezone.utc)

class Loan(Base):
    __tablename__ = "loans"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    loan_name = Column(String(120), nullable=False)
    lender = Column(String(120), nullable=False)
    principal_amount_subunits = Column(BigInteger, nullable=False)  # 64-bit integer paise
    currency = Column(String(10), default="INR", nullable=False)
    annual_interest_rate = Column(Numeric(5, 2), nullable=False)  # e.g. 8.50%
    tenure_months = Column(Integer, nullable=False)
    start_date = Column(Date, nullable=False)
    monthly_emi_subunits = Column(BigInteger, nullable=False)  # 64-bit integer paise
    remaining_principal_subunits = Column(BigInteger, nullable=False)  # 64-bit integer paise
    loan_type = Column(String(30), default="personal", nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime, default=utc_now, nullable=False)

    __table_args__ = (
        CheckConstraint("principal_amount_subunits > 0", name="chk_loan_principal_positive"),
        CheckConstraint("annual_interest_rate >= 0", name="chk_loan_interest_rate_non_negative"),
        CheckConstraint("tenure_months > 0", name="chk_loan_tenure_positive"),
        CheckConstraint("monthly_emi_subunits > 0", name="chk_loan_emi_positive"),
        CheckConstraint(
            "loan_type IN ('personal', 'home', 'car', 'education', 'consumer_emi', 'other')",
            name="chk_loan_type"
        ),
        Index("idx_loans_user", "user_id", "is_active"),
    )

    # Relationships
    user = relationship("User", back_populates="loans")
    amortization_entries = relationship("LoanAmortizationEntry", back_populates="loan", cascade="all, delete-orphan")


class LoanAmortizationEntry(Base):
    __tablename__ = "loan_amortization_entries"

    id = Column(Integer, primary_key=True, autoincrement=True)
    loan_id = Column(Integer, ForeignKey("loans.id", ondelete="CASCADE"), nullable=False, index=True)
    month_number = Column(Integer, nullable=False)
    due_date = Column(Date, nullable=False)
    emi_amount_subunits = Column(BigInteger, nullable=False)
    principal_component_subunits = Column(BigInteger, nullable=False)
    interest_component_subunits = Column(BigInteger, nullable=False)
    remaining_balance_subunits = Column(BigInteger, nullable=False)
    status = Column(String(15), default="pending", nullable=False)

    __table_args__ = (
        CheckConstraint("status IN ('paid', 'pending')", name="chk_amortization_status"),
        Index("idx_amortization_loan", "loan_id", "month_number"),
    )

    # Relationship
    loan = relationship("Loan", back_populates="amortization_entries")
