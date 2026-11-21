from datetime import date, datetime
from decimal import Decimal
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field, ConfigDict, field_validator
from app.schemas.category import CategoryResponse

VALID_PAYMENT_MODES = {"upi", "card", "netbanking", "cash", "other"}
VALID_SOURCES = {"manual", "csv"}
VALID_TYPES = {"income", "expense"}

class TransactionCreateRequest(BaseModel):
    amount: Decimal = Field(..., gt=0, description="Amount in Rupees (e.g. 1250.50). Must be strictly greater than 0.")
    type: str = Field(..., description="Transaction type: 'income' or 'expense'")
    category_id: int = Field(..., description="ID of category")
    transaction_date: date = Field(..., description="Transaction date (YYYY-MM-DD)")
    description: str = Field(..., min_length=1, max_length=255, description="Transaction narrative or note")
    merchant: Optional[str] = Field(None, max_length=120, description="Merchant or payee name")
    payment_mode: str = Field(default="upi", description="Payment mode: 'upi', 'card', 'netbanking', 'cash', 'other'")
    is_recurring: bool = Field(default=False, description="Whether this is a recurring obligation")
    source: str = Field(default="manual", description="'manual' or 'csv'")

    @field_validator("type")
    @classmethod
    def validate_type(cls, v: str) -> str:
        v_clean = v.strip().lower()
        if v_clean not in VALID_TYPES:
            raise ValueError(f"Transaction type must be one of {sorted(VALID_TYPES)}.")
        return v_clean

    @field_validator("payment_mode")
    @classmethod
    def validate_payment_mode(cls, v: str) -> str:
        v_clean = v.strip().lower()
        if v_clean not in VALID_PAYMENT_MODES:
            raise ValueError(f"Payment mode must be one of {sorted(VALID_PAYMENT_MODES)}.")
        return v_clean

    @field_validator("source")
    @classmethod
    def validate_source(cls, v: str) -> str:
        v_clean = v.strip().lower()
        if v_clean not in VALID_SOURCES:
            raise ValueError(f"Source must be one of {sorted(VALID_SOURCES)}.")
        return v_clean

    @field_validator("description")
    @classmethod
    def validate_description(cls, v: str) -> str:
        v_clean = v.strip()
        if not v_clean:
            raise ValueError("Description cannot be empty or blank.")
        return v_clean


class TransactionUpdateRequest(BaseModel):
    amount: Optional[Decimal] = Field(None, gt=0, description="Amount in Rupees")
    type: Optional[str] = Field(None, description="'income' or 'expense'")
    category_id: Optional[int] = Field(None, description="ID of category")
    transaction_date: Optional[date] = Field(None, description="Transaction date (YYYY-MM-DD)")
    description: Optional[str] = Field(None, min_length=1, max_length=255, description="Description")
    merchant: Optional[str] = Field(None, max_length=120, description="Merchant name")
    payment_mode: Optional[str] = Field(None, description="Payment mode")
    is_recurring: Optional[bool] = Field(None, description="Recurring status")

    @field_validator("type")
    @classmethod
    def validate_type(cls, v: Optional[str]) -> Optional[str]:
        if v is not None:
            v_clean = v.strip().lower()
            if v_clean not in VALID_TYPES:
                raise ValueError(f"Transaction type must be one of {sorted(VALID_TYPES)}.")
            return v_clean
        return v

    @field_validator("payment_mode")
    @classmethod
    def validate_payment_mode(cls, v: Optional[str]) -> Optional[str]:
        if v is not None:
            v_clean = v.strip().lower()
            if v_clean not in VALID_PAYMENT_MODES:
                raise ValueError(f"Payment mode must be one of {sorted(VALID_PAYMENT_MODES)}.")
            return v_clean
        return v

    @field_validator("description")
    @classmethod
    def validate_description(cls, v: Optional[str]) -> Optional[str]:
        if v is not None:
            v_clean = v.strip()
            if not v_clean:
                raise ValueError("Description cannot be empty.")
            return v_clean
        return v


class TransactionResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
    category_id: int
    category: Optional[CategoryResponse] = None
    amount: Decimal
    currency: str = "INR"
    type: str
    transaction_date: date
    description: str
    merchant: Optional[str] = None
    payment_mode: str
    is_recurring: bool
    source: str
    created_at: datetime
    updated_at: datetime


class CSVRowError(BaseModel):
    row_number: int
    reason: str
    raw_data: Optional[Dict[str, Any]] = None


class CSVImportResponse(BaseModel):
    total_rows_parsed: int
    successful_imports: int
    duplicates_skipped: int
    errors: List[CSVRowError] = []
