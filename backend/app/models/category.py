from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, CheckConstraint
from sqlalchemy.orm import relationship
from app.models.base import Base

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=True, index=True)
    name = Column(String(80), nullable=False)
    type = Column(String(10), nullable=False)
    icon = Column(String(50), default="Tag", nullable=False)
    color = Column(String(20), default="#64748B", nullable=False)
    is_system = Column(Boolean, default=False, nullable=False)
    is_essential = Column(Boolean, default=False, nullable=False)

    __table_args__ = (
        CheckConstraint("type IN ('income', 'expense')", name="chk_category_type"),
    )

    # Relationships
    user = relationship("User", back_populates="categories")
    transactions = relationship("Transaction", back_populates="category")
    budgets = relationship("Budget", back_populates="category", cascade="all, delete-orphan")
    recurring_obligations = relationship("RecurringObligation", back_populates="category")
