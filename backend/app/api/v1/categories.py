from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session

from app.api.deps import get_auth_db, AuthenticatedDB
from app.models.category import Category
from app.schemas.category import CategoryCreateRequest, CategoryResponse
from app.schemas.response import ResponseEnvelope
from app.services.category_service import ensure_default_categories

router = APIRouter()


@router.get("", response_model=ResponseEnvelope, status_code=status.HTTP_200_OK)
def list_categories(
    type: Optional[str] = Query(None, description="Filter by 'income' or 'expense'"),
    auth_db: AuthenticatedDB = Depends(get_auth_db)
):
    """
    Retrieves categories accessible to the authenticated user:
    all global system categories plus custom categories created by this user.
    """
    ensure_default_categories(auth_db.db)

    query = auth_db.db.query(Category).filter(
        (Category.user_id == None) | (Category.user_id == auth_db.user_id)
    )

    if type:
        type_clean = type.strip().lower()
        if type_clean in ("income", "expense"):
            query = query.filter(Category.type == type_clean)

    categories = query.order_by(Category.is_system.desc(), Category.name.asc()).all()
    data = [CategoryResponse.model_validate(c) for c in categories]
    return ResponseEnvelope(data=data)


@router.post("", response_model=ResponseEnvelope, status_code=status.HTTP_201_CREATED)
def create_custom_category(
    payload: CategoryCreateRequest,
    auth_db: AuthenticatedDB = Depends(get_auth_db)
):
    """
    Creates a user-defined custom category strictly scoped to the authenticated user.
    """
    # Prevent duplicate custom category name for the same user & type
    clean_name = payload.name.strip()
    existing = auth_db.db.query(Category).filter(
        Category.user_id == auth_db.user_id,
        Category.name.ilike(clean_name),
        Category.type == payload.type
    ).first()

    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Category '{clean_name}' of type '{payload.type}' already exists in your account."
        )

    category = Category(
        user_id=auth_db.user_id,
        name=clean_name,
        type=payload.type,
        icon=payload.icon,
        color=payload.color,
        is_system=False,
        is_essential=payload.is_essential
    )
    auth_db.db.add(category)
    auth_db.db.commit()
    auth_db.db.refresh(category)

    return ResponseEnvelope(data=CategoryResponse.model_validate(category))
