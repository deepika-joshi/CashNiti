import csv
import io
import hashlib
from datetime import datetime, date
from decimal import Decimal, InvalidOperation
from typing import Dict, Any, List, Optional
from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.models.transaction import Transaction
from app.models.category import Category
from app.core.currency import to_subunits, from_subunits
from app.services.category_service import ensure_default_categories, get_default_category
from app.schemas.transaction import CSVRowError, CSVImportResponse

REQUIRED_CSV_COLUMNS = {"date", "amount", "type", "description"}
ALLOWED_PAYMENT_MODES = {"upi", "card", "netbanking", "cash", "other"}
DATE_FORMATS = ("%Y-%m-%d", "%d-%m-%Y", "%d/%m/%Y", "%Y/%m/%d", "%Y-%m-%d %H:%M:%S")


def compute_transaction_hash(
    user_id: int,
    tx_date: str,
    amount_subunits: int,
    tx_type: str,
    description: str,
    merchant: Optional[str] = None
) -> str:
    """
    Computes a deterministic SHA-256 reference hash strictly scoped to the user
    for detecting identical duplicate transaction entries.
    """
    clean_desc = (description or "").strip().lower()
    clean_merchant = (merchant or "").strip().lower()
    clean_type = tx_type.strip().lower()
    raw = f"{user_id}:{tx_date}:{amount_subunits}:{clean_type}:{clean_desc}:{clean_merchant}"
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()


def parse_date_string(date_str: str) -> date:
    """Parses date string supporting ISO and common Indian date formats."""
    clean_str = date_str.strip()
    for fmt in DATE_FORMATS:
        try:
            return datetime.strptime(clean_str, fmt).date()
        except ValueError:
            continue
    raise ValueError(f"Unable to parse date '{date_str}'. Expected format YYYY-MM-DD or DD-MM-YYYY.")


def parse_amount_string(amount_str: str) -> Decimal:
    """Sanitizes and converts currency amount string to positive Decimal."""
    # Strip symbols: ₹, $, commas, whitespace
    cleaned = (
        amount_str.replace("₹", "")
        .replace("$", "")
        .replace(",", "")
        .strip()
    )
    if not cleaned:
        raise ValueError("Amount cannot be empty.")
    try:
        dec = Decimal(cleaned)
    except InvalidOperation:
        raise ValueError(f"Invalid monetary format: '{amount_str}'.")
    if dec <= Decimal("0"):
        raise ValueError(f"Transaction amount must be strictly positive (> 0), got '{amount_str}'.")
    return dec


def import_transactions_from_csv(
    db: Session,
    user_id: int,
    csv_bytes: bytes,
    max_size_bytes: int = 10 * 1024 * 1024  # 10 MB limit
) -> CSVImportResponse:
    """
    Safely processes, validates, and imports a CSV file for the authenticated user.
    - Validates file size and header column presence.
    - Detects and skips duplicates using user-scoped reference hashes.
    - Records row-level parsing errors without crashing.
    - Inserts all valid rows atomically in a single database transaction.
    """
    if len(csv_bytes) > max_size_bytes:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"CSV file size exceeds the allowed limit of {max_size_bytes // (1024 * 1024)} MB."
        )

    # Decode text handling UTF-8, UTF-8 with BOM, and fallback to Latin-1
    try:
        text_content = csv_bytes.decode("utf-8-sig")
    except UnicodeDecodeError:
        try:
            text_content = csv_bytes.decode("latin-1")
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Failed to decode CSV file: {str(e)}"
            )

    stream = io.StringIO(text_content.strip())
    reader = csv.reader(stream)

    try:
        header_raw = next(reader)
    except StopIteration:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="CSV file is empty."
        )

    # Normalize header column names
    header_normalized = [col.strip().lower().replace(" ", "_") for col in header_raw]
    header_set = set(header_normalized)

    missing_cols = REQUIRED_CSV_COLUMNS - header_set
    if missing_cols:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"CSV missing required columns: {sorted(list(missing_cols))}. Required columns are: date, amount, type, description."
        )

    # Load categories for matching
    ensure_default_categories(db)
    categories = db.query(Category).filter(
        (Category.user_id == None) | (Category.user_id == user_id)
    ).all()
    cat_by_name = {c.name.strip().lower(): c for c in categories}
    cat_by_id = {c.id: c for c in categories}

    # Query existing reference hashes for this user to detect duplicates efficiently
    existing_hashes = set(
        h[0] for h in db.query(Transaction.reference_hash)
        .filter(Transaction.user_id == user_id, Transaction.reference_hash != None)
        .all()
    )

    batch_hashes = set()
    transactions_to_create: List[Transaction] = []
    errors: List[CSVRowError] = []
    total_rows = 0
    duplicates_skipped = 0

    for row_idx, row in enumerate(reader, start=2):
        if not row or not any(field.strip() for field in row):
            continue  # Skip blank lines

        total_rows += 1
        row_dict = dict(zip(header_normalized, [f.strip() for f in row]))

        try:
            # 1. Parse date
            raw_date = row_dict.get("date", "")
            tx_date = parse_date_string(raw_date)

            # 2. Parse amount
            raw_amount = row_dict.get("amount", "")
            amount_dec = parse_amount_string(raw_amount)
            amount_subunits = to_subunits(amount_dec, "INR")

            # 3. Parse type
            raw_type = row_dict.get("type", "").lower()
            if raw_type in ("income", "credit", "cr"):
                tx_type = "income"
            elif raw_type in ("expense", "debit", "dr"):
                tx_type = "expense"
            else:
                raise ValueError(f"Invalid transaction type '{raw_type}'. Must be 'income' or 'expense'.")

            # 4. Parse description
            description = row_dict.get("description", "").strip()
            if not description:
                raise ValueError("Description is required and cannot be blank.")

            # 5. Parse merchant (optional)
            merchant = row_dict.get("merchant", "").strip() or None

            # 6. Parse payment mode (optional, default 'other')
            raw_mode = row_dict.get("payment_mode", row_dict.get("payment_method", "other")).lower()
            payment_mode = raw_mode if raw_mode in ALLOWED_PAYMENT_MODES else "other"

            # 7. Category resolution
            category = None
            raw_category = row_dict.get("category", "").strip()
            if raw_category:
                # Try numeric ID first
                if raw_category.isdigit() and int(raw_category) in cat_by_id:
                    matched = cat_by_id[int(raw_category)]
                    if matched.type == tx_type:
                        category = matched
                # Try exact name match
                elif raw_category.lower() in cat_by_name:
                    matched = cat_by_name[raw_category.lower()]
                    if matched.type == tx_type:
                        category = matched

            if not category:
                category = get_default_category(db, tx_type)

            # 8. Duplicate detection
            ref_hash = compute_transaction_hash(
                user_id=user_id,
                tx_date=tx_date.isoformat(),
                amount_subunits=amount_subunits,
                tx_type=tx_type,
                description=description,
                merchant=merchant
            )

            if ref_hash in existing_hashes or ref_hash in batch_hashes:
                duplicates_skipped += 1
                continue

            batch_hashes.add(ref_hash)

            # 9. Instantiate Transaction
            tx = Transaction(
                user_id=user_id,
                category_id=category.id,
                amount_subunits=amount_subunits,
                currency="INR",
                type=tx_type,
                transaction_date=tx_date,
                description=description,
                merchant=merchant,
                payment_mode=payment_mode,
                is_recurring=False,
                source="csv",
                reference_hash=ref_hash
            )
            transactions_to_create.append(tx)

        except Exception as ex:
            errors.append(CSVRowError(
                row_number=row_idx,
                reason=str(ex),
                raw_data=row_dict
            ))

    # Persist in single atomic transaction
    if transactions_to_create:
        db.add_all(transactions_to_create)
        db.commit()

    return CSVImportResponse(
        total_rows_parsed=total_rows,
        successful_imports=len(transactions_to_create),
        duplicates_skipped=duplicates_skipped,
        errors=errors
    )


def generate_transactions_csv(transactions: List[Transaction]) -> str:
    """Generates downloadable CSV content from a list of user transactions."""
    output = io.StringIO()
    writer = csv.writer(output, lineterminator="\r\n")

    # Header
    writer.writerow([
        "Transaction ID",
        "Date",
        "Type",
        "Category",
        "Amount (INR)",
        "Description",
        "Merchant",
        "Payment Mode",
        "Is Recurring",
        "Source",
        "Created At"
    ])

    for tx in transactions:
        cat_name = tx.category.name if tx.category else "Uncategorized"
        amt_str = str(from_subunits(tx.amount_subunits, tx.currency))
        writer.writerow([
            tx.id,
            tx.transaction_date.isoformat(),
            tx.type,
            cat_name,
            amt_str,
            tx.description,
            tx.merchant or "",
            tx.payment_mode,
            "Yes" if tx.is_recurring else "No",
            tx.source,
            tx.created_at.isoformat() if tx.created_at else ""
        ])

    return output.getvalue()
