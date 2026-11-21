from datetime import datetime
from typing import Optional
from decimal import Decimal
from pydantic import BaseModel, EmailStr, Field, ConfigDict

class UserRegisterRequest(BaseModel):
    email: EmailStr = Field(..., description="Unique email address for user login")
    password: str = Field(..., min_length=8, description="Password with minimum 8 characters")
    full_name: str = Field(..., min_length=2, max_length=150, description="User's full name")

class UserLoginRequest(BaseModel):
    email: EmailStr = Field(..., description="Registered email address")
    password: str = Field(..., description="User password")

class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    email: EmailStr
    full_name: str
    is_active: bool
    created_at: datetime

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int

class AuthResponse(BaseModel):
    user: UserResponse
    access_token: str
    token_type: str = "bearer"
    expires_in: int
    token: Optional[TokenResponse] = None

class FinancialProfileResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    currency: str
    monthly_income: Decimal
    primary_income_date: int
    default_buffer: Decimal
    risk_tolerance: str

class UserProfileResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    email: EmailStr
    full_name: str
    is_active: bool
    created_at: datetime
    user: Optional[UserResponse] = None
    profile: Optional[FinancialProfileResponse] = None
