from datetime import datetime, timezone
from fastapi import FastAPI, Request, status, HTTPException
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.v1.auth import router as auth_router
from app.api.v1.transactions import router as transactions_router
from app.api.v1.categories import router as categories_router

app = FastAPI(
    title="CashNiti API",
    description="Backend API for CashNiti personal finance platform",
    version="1.0.0"
)

# CORS middleware configured via settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Exception handler for standard CashNiti JSON error envelopes
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    code_map = {
        400: "VALIDATION_ERROR",
        401: "UNAUTHORIZED",
        403: "FORBIDDEN",
        404: "RESOURCE_NOT_FOUND",
        409: "CONFLICT",
        422: "UNPROCESSABLE_ENTITY",
        500: "INTERNAL_ERROR"
    }
    code = code_map.get(exc.status_code, "ERROR")
    headers = getattr(exc, "headers", None)
    return JSONResponse(
        status_code=exc.status_code,
        content=jsonable_encoder({
            "success": False,
            "error": {
                "code": code,
                "message": exc.detail if isinstance(exc.detail, str) else str(exc.detail),
                "details": exc.detail if not isinstance(exc.detail, str) else None,
                "timestamp": datetime.now(timezone.utc).isoformat()
            }
        }),
        headers=headers
    )


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content=jsonable_encoder({
            "success": False,
            "error": {
                "code": "VALIDATION_ERROR",
                "message": "Invalid request parameters.",
                "details": exc.errors(),
                "timestamp": datetime.now(timezone.utc).isoformat()
            }
        })
    )


# Mount Authentication router:
# Mounted at both /api/auth and /api/v1/auth for specification and route compatibility
app.include_router(auth_router, prefix="/api/auth", tags=["Authentication"])
app.include_router(auth_router, prefix="/api/v1/auth", tags=["Authentication (v1)"])

# Mount Transactions and Categories routers (Phase 5)
app.include_router(transactions_router, prefix="/api/v1/transactions", tags=["Transactions"])
app.include_router(categories_router, prefix="/api/v1/categories", tags=["Categories"])


# Existing endpoints preserved
@app.get("/")
def home():
    return {
        "message": "Welcome to CashNiti API",
        "status": "running"
    }


@app.get("/api/health")
def health_check():
    return {
        "app": "CashNiti",
        "status": "healthy"
    }
