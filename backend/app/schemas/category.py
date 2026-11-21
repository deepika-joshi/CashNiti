from typing import Optional
from pydantic import BaseModel, Field, ConfigDict, field_validator

class CategoryCreateRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=80, description="Category name")
    type: str = Field(..., description="'income' or 'expense'")
    icon: str = Field(default="Tag", max_length=50, description="Icon identifier")
    color: str = Field(default="#64748B", max_length=20, description="Hex color code")
    is_essential: bool = Field(default=False, description="Whether this category is essential (Needs vs Wants)")

    @field_validator("type")
    @classmethod
    def validate_type(cls, v: str) -> str:
        v_lower = v.strip().lower()
        if v_lower not in ("income", "expense"):
            raise ValueError("Category type must be either 'income' or 'expense'.")
        return v_lower

class CategoryResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: Optional[int] = None
    name: str
    type: str
    icon: str
    color: str
    is_system: bool
    is_essential: bool
