from datetime import datetime, timezone
from typing import Any, Optional, Dict, List
from pydantic import BaseModel, Field

def utc_iso_now() -> str:
    return datetime.now(timezone.utc).isoformat()

class MetaInfo(BaseModel):
    timestamp: str = Field(default_factory=utc_iso_now)
    request_id: Optional[str] = None

class ResponseEnvelope(BaseModel):
    success: bool = True
    data: Any
    meta: MetaInfo = Field(default_factory=MetaInfo)

class PaginationMeta(BaseModel):
    total: int
    page: int
    limit: int
    total_pages: int

class PaginatedResponseEnvelope(BaseModel):
    success: bool = True
    data: List[Any]
    pagination: PaginationMeta
    meta: MetaInfo = Field(default_factory=MetaInfo)

class ErrorDetail(BaseModel):
    code: str
    message: str
    details: Optional[Any] = None
    timestamp: str = Field(default_factory=utc_iso_now)

class ErrorEnvelope(BaseModel):
    success: bool = False
    error: ErrorDetail
