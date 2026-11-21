# CashNiti SQLAlchemy Models Registry
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

__all__ = [
    "Base",
    "User",
    "FinancialProfile",
    "Category",
    "Transaction",
    "RecurringObligation",
    "Budget",
    "FinancialGoal",
    "EmergencyFund",
    "Loan",
    "LoanAmortizationEntry",
    "ScamScan",
    "AIConversation",
    "AIMessage",
]
