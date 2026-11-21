from typing import List, Dict, Any, Optional
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.category import Category

DEFAULT_SYSTEM_CATEGORIES: List[Dict[str, Any]] = [
    # Expense Categories (Needs & Essentials)
    {"name": "Housing & Rent", "type": "expense", "icon": "home", "color": "#3B82F6", "is_essential": True},
    {"name": "Groceries & Essentials", "type": "expense", "icon": "shopping_basket", "color": "#16A34A", "is_essential": True},
    {"name": "Utilities & Bills", "type": "expense", "icon": "receipt", "color": "#F59E0B", "is_essential": True},
    {"name": "Transport & Fuel", "type": "expense", "icon": "directions_car", "color": "#6366F1", "is_essential": True},
    {"name": "Healthcare & Medical", "type": "expense", "icon": "medical_services", "color": "#EF4444", "is_essential": True},
    {"name": "Loans & EMIs", "type": "expense", "icon": "account_balance", "color": "#DC2626", "is_essential": True},
    {"name": "Investments & Savings", "type": "expense", "icon": "trending_up", "color": "#059669", "is_essential": True},

    # Expense Categories (Wants & Discretionary)
    {"name": "Food & Dining", "type": "expense", "icon": "restaurant", "color": "#EC4899", "is_essential": False},
    {"name": "Shopping & Lifestyle", "type": "expense", "icon": "shopping_bag", "color": "#8B5CF6", "is_essential": False},
    {"name": "Entertainment & Subscriptions", "type": "expense", "icon": "movie", "color": "#14B8A6", "is_essential": False},
    {"name": "Travel & Commute", "type": "expense", "icon": "flight", "color": "#06B6D4", "is_essential": False},
    {"name": "Other Expense", "type": "expense", "icon": "more_horiz", "color": "#64748B", "is_essential": False},

    # Income Categories
    {"name": "Salary & Wages", "type": "income", "icon": "payments", "color": "#10B981", "is_essential": True},
    {"name": "Freelance & Consulting", "type": "income", "icon": "work", "color": "#06B6D4", "is_essential": True},
    {"name": "Business Revenue", "type": "income", "icon": "storefront", "color": "#8B5CF6", "is_essential": True},
    {"name": "Investments & Dividends", "type": "income", "icon": "savings", "color": "#F59E0B", "is_essential": True},
    {"name": "Rental Income", "type": "income", "icon": "apartment", "color": "#3B82F6", "is_essential": True},
    {"name": "Other Income", "type": "income", "icon": "account_balance_wallet", "color": "#64748B", "is_essential": False},
]

def ensure_default_categories(db: Session) -> None:
    """Seeds global system categories if none currently exist in the database."""
    has_system_cat = db.query(Category).filter(Category.is_system == True).first()
    if has_system_cat is None:
        for cat_def in DEFAULT_SYSTEM_CATEGORIES:
            cat = Category(
                user_id=None,
                name=cat_def["name"],
                type=cat_def["type"],
                icon=cat_def["icon"],
                color=cat_def["color"],
                is_system=True,
                is_essential=cat_def["is_essential"],
            )
            db.add(cat)
        db.commit()


def validate_category_for_user(
    db: Session,
    category_id: int,
    user_id: int,
    expected_type: Optional[str] = None
) -> Category:
    """
    Validates that a category is either a global system category or owned by the given user.
    Optionally verifies that category.type matches expected_type ('income' or 'expense').
    Raises 400 Bad Request if invalid.
    """
    category = db.query(Category).filter(
        Category.id == category_id,
        (Category.user_id == None) | (Category.user_id == user_id)
    ).first()

    if not category:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Category with id {category_id} not found or not accessible."
        )

    if expected_type and category.type != expected_type.lower():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Category '{category.name}' has type '{category.type}', but transaction type is '{expected_type}'."
        )

    return category


def get_default_category(db: Session, tx_type: str) -> Category:
    """Returns fallback category for CSV parsing ('Other Expense' or 'Other Income')."""
    ensure_default_categories(db)
    target_name = "Other Income" if tx_type == "income" else "Other Expense"
    cat = db.query(Category).filter(
        Category.is_system == True,
        Category.name == target_name
    ).first()
    if not cat:
        cat = db.query(Category).filter(
            Category.is_system == True,
            Category.type == tx_type
        ).first()
    return cat
