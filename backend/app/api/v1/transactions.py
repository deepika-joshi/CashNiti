import math
from datetime import date, datetime
from decimal import Decimal
from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, status, Query, UploadFile, File, Response
from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.api.deps import get_auth_db, AuthenticatedDB
from app.models.transaction import Transaction
from app.core.currency import to_subunits, from_subunits
from app.schemas.response import ResponseEnvelope, PaginatedResponseEnvelope, PaginationMeta
from app.schemas.category import CategoryResponse
from app.schemas.transaction import (
    TransactionCreateRequest,
    TransactionUpdateRequest,
    TransactionResponse,
    CSVImportResponse
)
from app.services.category_service import validate_category_for_user
from app.services.csv_service import (
    compute_transaction_hash,
    import_transactions_from_csv,
    generate_transactions_csv
)

router = APIRouter()


def serialize_transaction(tx: Transaction) -> TransactionResponse:
    """Serializes a SQLAlchemy Transaction entity into a TransactionResponse with Rupee Decimal amount."""
    cat_summary = None
    if tx.category:
        cat_summary = CategoryResponse.model_validate(tx.category)

    return TransactionResponse(
        id=tx.id,
        user_id=tx.user_id,
        category_id=tx.category_id,
        category=cat_summary,
        amount=from_subunits(tx.amount_subunits, tx.currency),
        currency=tx.currency,
        type=tx.type,
        transaction_date=tx.transaction_date,
        description=tx.description,
        merchant=tx.merchant,
        payment_mode=tx.payment_mode,
        is_recurring=tx.is_recurring,
        source=tx.source,
        created_at=tx.created_at,
        updated_at=tx.updated_at
    )


@router.post("", response_model=ResponseEnvelope, status_code=status.HTTP_201_CREATED)
def create_transaction(
    payload: TransactionCreateRequest,
    auth_db: AuthenticatedDB = Depends(get_auth_db)
):
    """
    Creates a new financial transaction strictly bound to the authenticated user.
    - User identity is derived exclusively from JWT claims (never trusted from body).
    - Amount is validated and stored internally as 64-bit integer paise.
    - Category accessibility and type matching are strictly verified.
    """
    # 1. Validate category accessibility and type compatibility
    validate_category_for_user(
        db=auth_db.db,
        category_id=payload.category_id,
        user_id=auth_db.user_id,
        expected_type=payload.type
    )

    # 2. Convert standard Rupee Decimal to internal integer paise
    amount_subunits = to_subunits(payload.amount, "INR")

    # 3. Compute deterministic reference hash
    ref_hash = compute_transaction_hash(
        user_id=auth_db.user_id,
        tx_date=payload.transaction_date.isoformat(),
        amount_subunits=amount_subunits,
        tx_type=payload.type,
        description=payload.description,
        merchant=payload.merchant
    )

    # 4. Create and persist transaction
    transaction = Transaction(
        user_id=auth_db.user_id,
        category_id=payload.category_id,
        amount_subunits=amount_subunits,
        currency="INR",
        type=payload.type,
        transaction_date=payload.transaction_date,
        description=payload.description,
        merchant=payload.merchant.strip() if payload.merchant else None,
        payment_mode=payload.payment_mode,
        is_recurring=payload.is_recurring,
        source=payload.source,
        reference_hash=ref_hash
    )
    auth_db.db.add(transaction)
    auth_db.db.commit()
    auth_db.db.refresh(transaction)

    return ResponseEnvelope(data=serialize_transaction(transaction))


@router.get("", response_model=PaginatedResponseEnvelope, status_code=status.HTTP_200_OK)
def list_transactions(
    page: int = Query(1, ge=1, description="Page number starting at 1"),
    limit: int = Query(20, ge=1, le=100, description="Items per page (max 100)"),
    type: Optional[str] = Query(None, description="Filter by 'income' or 'expense'"),
    category_id: Optional[int] = Query(None, description="Filter by category ID"),
    payment_mode: Optional[str] = Query(None, description="Filter by payment mode: upi, card, netbanking, cash, other"),
    start_date: Optional[date] = Query(None, description="Filter transactions on or after this date"),
    end_date: Optional[date] = Query(None, description="Filter transactions on or before this date"),
    search: Optional[str] = Query(None, description="Search keyword in description or merchant"),
    auth_db: AuthenticatedDB = Depends(get_auth_db)
):
    """
    Retrieves paginated transactions strictly belonging to the authenticated user.
    Supports filtering by type, category, payment mode, date range, and text search.
    Ordered newest first by default.
    """
    # Strict user scoping
    query = auth_db.db.query(Transaction).filter(Transaction.user_id == auth_db.user_id)

    # Filters
    if type:
        query = query.filter(Transaction.type == type.strip().lower())
    if category_id:
        query = query.filter(Transaction.category_id == category_id)
    if payment_mode:
        query = query.filter(Transaction.payment_mode == payment_mode.strip().lower())
    if start_date:
        query = query.filter(Transaction.transaction_date >= start_date)
    if end_date:
        query = query.filter(Transaction.transaction_date <= end_date)
    if search:
        search_term = f"%{search.strip()}%"
        query = query.filter(
            or_(
                Transaction.description.ilike(search_term),
                Transaction.merchant.ilike(search_term)
            )
        )

    # Total count for pagination metadata
    total_count = query.count()
    total_pages = math.ceil(total_count / limit) if total_count > 0 else 0

    # Ordered newest first (transaction_date DESC, id DESC)
    transactions = (
        query.order_by(Transaction.transaction_date.desc(), Transaction.id.desc())
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
    )

    items = [serialize_transaction(tx) for tx in transactions]
    pagination = PaginationMeta(
        total=total_count,
        page=page,
        limit=limit,
        total_pages=total_pages
    )

    return PaginatedResponseEnvelope(data=items, pagination=pagination)


@router.get("/export-csv", status_code=status.HTTP_200_OK)
def export_transactions_csv(
    type: Optional[str] = Query(None, description="Filter by 'income' or 'expense'"),
    category_id: Optional[int] = Query(None, description="Filter by category ID"),
    payment_mode: Optional[str] = Query(None, description="Filter by payment mode"),
    start_date: Optional[date] = Query(None, description="Filter on or after date"),
    end_date: Optional[date] = Query(None, description="Filter on or before date"),
    search: Optional[str] = Query(None, description="Search keyword"),
    auth_db: AuthenticatedDB = Depends(get_auth_db)
):
    """
    Exports the authenticated user's transactions as a downloadable CSV file.
    Applies the same filtering parameters as the listing endpoint.
    Strictly isolated: users can never export another user's transactions.
    """
    query = auth_db.db.query(Transaction).filter(Transaction.user_id == auth_db.user_id)

    if type:
        query = query.filter(Transaction.type == type.strip().lower())
    if category_id:
        query = query.filter(Transaction.category_id == category_id)
    if payment_mode:
        query = query.filter(Transaction.payment_mode == payment_mode.strip().lower())
    if start_date:
        query = query.filter(Transaction.transaction_date >= start_date)
    if end_date:
        query = query.filter(Transaction.transaction_date <= end_date)
    if search:
        search_term = f"%{search.strip()}%"
        query = query.filter(
            or_(
                Transaction.description.ilike(search_term),
                Transaction.merchant.ilike(search_term)
            )
        )

    transactions = query.order_by(Transaction.transaction_date.desc(), Transaction.id.desc()).all()
    csv_content = generate_transactions_csv(transactions)

    today_str = datetime.now().strftime("%Y%m%d")
    filename = f"cashniti_transactions_{today_str}.csv"

    return Response(
        content=csv_content,
        media_type="text/csv",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'}
    )


@router.post("/import-csv", response_model=ResponseEnvelope, status_code=status.HTTP_200_OK)
async def import_transactions_csv(
    file: UploadFile = File(..., description="CSV file of transactions"),
    auth_db: AuthenticatedDB = Depends(get_auth_db)
):
    """
    Uploads and imports a bank statement CSV strictly into the authenticated user's account.
    - Validates file type and size.
    - Safely parses rows, dates, and amounts.
    - Detects and skips duplicate entries using user-scoped reference hashes.
    - Returns summary of successful imports, duplicates skipped, and row errors.
    """
    # Validate extension
    filename = file.filename or ""
    if not filename.lower().endswith(".csv"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid file type. Only .csv files are supported."
        )

    content = await file.read()
    if not content:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded CSV file is empty."
        )

    result = import_transactions_from_csv(
        db=auth_db.db,
        user_id=auth_db.user_id,
        csv_bytes=content
    )

    return ResponseEnvelope(data=result)


@router.get("/{transaction_id}", response_model=ResponseEnvelope, status_code=status.HTTP_200_OK)
def get_transaction(
    transaction_id: int,
    auth_db: AuthenticatedDB = Depends(get_auth_db)
):
    """
    Retrieves a single transaction by ID.
    Enforces anti-enumeration: returns 404 Not Found if record belongs to another user.
    """
    transaction = auth_db.db.query(Transaction).filter(Transaction.id == transaction_id).first()
    if not transaction:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Transaction not found."
        )

    # Multi-tenant isolation check
    auth_db.verify_ownership(transaction.user_id, "Transaction")

    return ResponseEnvelope(data=serialize_transaction(transaction))


@router.put("/{transaction_id}", response_model=ResponseEnvelope, status_code=status.HTTP_200_OK)
def update_transaction(
    transaction_id: int,
    payload: TransactionUpdateRequest,
    auth_db: AuthenticatedDB = Depends(get_auth_db)
):
    """
    Updates an existing transaction.
    Enforces anti-enumeration: returns 404 Not Found if record belongs to another user.
    """
    transaction = auth_db.db.query(Transaction).filter(Transaction.id == transaction_id).first()
    if not transaction:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Transaction not found."
        )

    # Multi-tenant isolation check
    auth_db.verify_ownership(transaction.user_id, "Transaction")

    # If category or type is changed, validate compatibility
    effective_type = payload.type or transaction.type
    effective_category_id = payload.category_id or transaction.category_id

    if payload.category_id is not None or payload.type is not None:
        validate_category_for_user(
            db=auth_db.db,
            category_id=effective_category_id,
            user_id=auth_db.user_id,
            expected_type=effective_type
        )
        transaction.type = effective_type
        transaction.category_id = effective_category_id

    # Update amount if provided
    if payload.amount is not None:
        transaction.amount_subunits = to_subunits(payload.amount, transaction.currency)

    # Update other fields
    if payload.transaction_date is not None:
        transaction.transaction_date = payload.transaction_date
    if payload.description is not None:
        transaction.description = payload.description.strip()
    if payload.merchant is not None:
        transaction.merchant = payload.merchant.strip() if payload.merchant else None
    if payload.payment_mode is not None:
        transaction.payment_mode = payload.payment_mode
    if payload.is_recurring is not None:
        transaction.is_recurring = payload.is_recurring

    # Recompute reference hash
    transaction.reference_hash = compute_transaction_hash(
        user_id=auth_db.user_id,
        tx_date=transaction.transaction_date.isoformat(),
        amount_subunits=transaction.amount_subunits,
        tx_type=transaction.type,
        description=transaction.description,
        merchant=transaction.merchant
    )

    auth_db.db.commit()
    auth_db.db.refresh(transaction)

    return ResponseEnvelope(data=serialize_transaction(transaction))


@router.delete("/{transaction_id}", response_model=ResponseEnvelope, status_code=status.HTTP_200_OK)
def delete_transaction(
    transaction_id: int,
    auth_db: AuthenticatedDB = Depends(get_auth_db)
):
    """
    Permanently deletes a transaction.
    Enforces anti-enumeration: returns 404 Not Found if record belongs to another user.
    """
    transaction = auth_db.db.query(Transaction).filter(Transaction.id == transaction_id).first()
    if not transaction:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Transaction not found."
        )

    # Multi-tenant isolation check
    auth_db.verify_ownership(transaction.user_id, "Transaction")

    auth_db.db.delete(transaction)
    auth_db.db.commit()

    return ResponseEnvelope(data={"id": transaction_id, "deleted": True})
