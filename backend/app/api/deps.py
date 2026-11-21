"""
Dependencies for CashNiti API endpoints.
Provides database sessions, JWT bearer extraction, authenticated user resolution,
reusable authenticated database context, and user-isolation anti-enumeration utilities.
"""
from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.core.security import decode_access_token
from app.models.user import User

# HTTPBearer scheme with auto_error=False to allow clean custom 401 error envelope responses
bearer_scheme = HTTPBearer(auto_error=False)


def get_current_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(bearer_scheme),
    db: Session = Depends(get_db)
) -> User:
    """
    Extracts the JWT access token from the Authorization header,
    validates signature and expiration, and fetches the active User.
    Rejects missing, invalid, or expired tokens with 401 Unauthorized.
    """
    if not credentials or not credentials.credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required. Bearer token missing, invalid, or expired.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = credentials.credentials
    try:
        payload = decode_access_token(token)
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required. Bearer token missing, invalid, or expired.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except (jwt.PyJWTError, Exception):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required. Bearer token missing, invalid, or expired.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user_id_str = payload.get("sub")
    if not user_id_str:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required. Bearer token missing, invalid, or expired.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    try:
        user_id = int(user_id_str)
    except (ValueError, TypeError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required. Bearer token missing, invalid, or expired.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required. Bearer token missing, invalid, or expired.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User account is deactivated.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return user


def get_current_active_user(
    current_user: User = Depends(get_current_user)
) -> User:
    """Dependency that returns the verified active user."""
    return current_user


def verify_user_ownership(
    resource_user_id: int,
    current_user_id: int,
    resource_name: str = "Resource"
) -> None:
    """
    Enforces user data isolation.
    If a user attempts to access a record belonging to another user,
    raises 404 Not Found (anti-enumeration) to prevent leaking existence.
    """
    if resource_user_id != current_user_id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"{resource_name} not found."
        )


class AuthenticatedDB:
    """
    Reusable authenticated database dependency context.
    Encapsulates the active database session and verified User identity.
    Guarantees downstream routes never trust a client-supplied user_id for ownership.
    """
    def __init__(self, db: Session, user: User):
        self.db = db
        self.user = user

    @property
    def user_id(self) -> int:
        return self.user.id

    def verify_ownership(self, resource_user_id: int, resource_name: str = "Resource") -> None:
        """Enforces anti-enumeration user ownership check (404 on mismatch)."""
        verify_user_ownership(resource_user_id, self.user.id, resource_name)

    def filter_by_user(self, query, model):
        """Convenience method to strictly scope a query by the verified authenticated user ID."""
        return query.filter(model.user_id == self.user.id)


def get_auth_db(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> AuthenticatedDB:
    """
    Reusable authenticated database dependency.
    Resolves the verified user from JWT and provides the DB session context.
    """
    return AuthenticatedDB(db=db, user=current_user)
