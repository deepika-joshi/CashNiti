from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.core.config import settings
from app.core.security import hash_password, verify_password, create_access_token
from app.core.currency import from_subunits
from app.models.user import User, FinancialProfile
from app.schemas.user import (
    UserRegisterRequest,
    UserLoginRequest,
    UserResponse,
    TokenResponse,
    AuthResponse,
    FinancialProfileResponse,
    UserProfileResponse,
)
from app.schemas.response import ResponseEnvelope
from app.api.deps import get_auth_db, AuthenticatedDB

router = APIRouter()


@router.post("/register", response_model=ResponseEnvelope, status_code=status.HTTP_201_CREATED)
def register_user(
    payload: UserRegisterRequest,
    db: Session = Depends(get_db)
):
    """
    Registers a new individual user account and initializes default financial settings.
    Returns the created user object and a JWT access token.
    """
    normalized_email = payload.email.strip().lower()

    # Reject duplicate email registration
    existing_user = db.query(User).filter(User.email == normalized_email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email is already registered."
        )

    # Securely hash the password
    hashed_pwd = hash_password(payload.password)

    # Create user record
    new_user = User(
        email=normalized_email,
        full_name=payload.full_name.strip(),
        hashed_password=hashed_pwd,
        is_active=True,
    )
    db.add(new_user)
    db.flush()

    # Create default user financial profile
    default_profile = FinancialProfile(
        user_id=new_user.id,
        currency="INR",
        monthly_income_subunits=0,
        primary_income_date=1,
        default_buffer_subunits=500000,  # ₹5,000 in paise
        risk_tolerance="moderate",
    )
    db.add(default_profile)
    db.commit()
    db.refresh(new_user)

    # Issue JWT token
    token_delta = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(new_user.id), "email": new_user.email},
        expires_delta=token_delta
    )
    expires_in_seconds = settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60

    token_obj = TokenResponse(
        access_token=access_token,
        token_type="bearer",
        expires_in=expires_in_seconds
    )

    auth_data = AuthResponse(
        user=UserResponse.model_validate(new_user),
        access_token=access_token,
        token_type="bearer",
        expires_in=expires_in_seconds,
        token=token_obj
    )

    return ResponseEnvelope(data=auth_data)


@router.post("/login", response_model=ResponseEnvelope, status_code=status.HTTP_200_OK)
def login_user(
    payload: UserLoginRequest,
    db: Session = Depends(get_db)
):
    """
    Authenticates user credentials and issues a JWT access token.
    Never returns password hashes or plain-text credentials.
    """
    normalized_email = payload.email.strip().lower()

    user = db.query(User).filter(User.email == normalized_email).first()
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password."
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User account is deactivated."
        )

    # Issue JWT token
    token_delta = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.id), "email": user.email},
        expires_delta=token_delta
    )
    expires_in_seconds = settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60

    token_obj = TokenResponse(
        access_token=access_token,
        token_type="bearer",
        expires_in=expires_in_seconds
    )

    auth_data = AuthResponse(
        user=UserResponse.model_validate(user),
        access_token=access_token,
        token_type="bearer",
        expires_in=expires_in_seconds,
        token=token_obj
    )

    return ResponseEnvelope(data=auth_data)


@router.get("/me", response_model=ResponseEnvelope, status_code=status.HTTP_200_OK)
def get_current_user_profile(
    auth_db: AuthenticatedDB = Depends(get_auth_db)
):
    """
    Returns the profile of the authenticated user, including their financial profile.
    Protected endpoint requiring a valid JWT Bearer token and authenticated DB context.
    """
    current_user = auth_db.user
    profile = auth_db.db.query(FinancialProfile).filter(FinancialProfile.user_id == current_user.id).first()

    profile_resp = None
    if profile:
        profile_resp = FinancialProfileResponse(
            id=profile.id,
            currency=profile.currency,
            monthly_income=from_subunits(profile.monthly_income_subunits, profile.currency),
            primary_income_date=profile.primary_income_date,
            default_buffer=from_subunits(profile.default_buffer_subunits, profile.currency),
            risk_tolerance=profile.risk_tolerance,
        )

    user_resp = UserResponse.model_validate(current_user)

    user_profile_data = UserProfileResponse(
        id=current_user.id,
        email=current_user.email,
        full_name=current_user.full_name,
        is_active=current_user.is_active,
        created_at=current_user.created_at,
        user=user_resp,
        profile=profile_resp,
    )

    return ResponseEnvelope(data=user_profile_data)
