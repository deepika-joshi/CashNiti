# CashNiti — REST API Specification

## 1. API Standards & Conventions

- **Base URL:** `/api/v1`
- **Protocol:** HTTP/1.1 (JSON request and response payloads)
- **Content Type:** `application/json` (except multipart file upload for CSV)
- **Authentication:** All protected endpoints require a valid JWT Bearer token:
  ```http
  Authorization: Bearer <access_token>
  ```
  - Unauthenticated requests return `401 Unauthorized`.
  - Attempts to access or mutate records belonging to another user return `404 Not Found` (anti-enumeration).
- **Monetary Convention:**
  - All monetary values in request bodies and response payloads are formatted in **standard decimal format** (e.g., `1000.50`, `45000.00`).
  - The UI displays these with localized currency symbols (e.g., `₹1,000.50`).
  - **The API and UI never expose or require raw Paise values from end users.** Raw subunit integer conversion (Paise) is strictly handled internally by the backend service repository layer.
- **Currency Code:** Monetary models include an optional or context-derived `currency` code (defaults to `"INR"`).
- **State Management & Caching:** All endpoints are structured with consistent resource identifiers and timestamps to optimize caching and invalidation within TanStack React Query.
- **Date Format:** ISO 8601 extended format (`YYYY-MM-DD` for dates, `YYYY-MM-DDTHH:MM:SSZ` for timestamps).

---

## 2. Standard Response Envelopes

### Success Envelope
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "timestamp": "2026-11-20T11:00:00Z",
    "request_id": "req_abc123"
  }
}
```

### Paginated List Envelope
```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "total": 142,
    "page": 1,
    "limit": 20,
    "total_pages": 8
  },
  "meta": {
    "timestamp": "2026-11-20T11:00:00Z"
  }
}
```

### Error Envelopes

#### 400 Bad Request
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is already registered.",
    "details": null,
    "timestamp": "2026-11-20T11:00:00Z"
  }
}
```

#### 401 Unauthorized
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required. Bearer token missing or expired.",
    "details": null,
    "timestamp": "2026-11-20T11:00:00Z"
  }
}
```

#### 404 Not Found (Data Isolation Anti-Enumeration)
```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Transaction not found.",
    "details": null,
    "timestamp": "2026-11-20T11:00:00Z"
  }
}
```

---

## 3. Endpoints by Module

---

### 3.0 Module 0: Authentication & User Profile (`/auth`)

#### `POST /api/v1/auth/register`
Creates a new individual user account and issues an initial JWT token.
- **Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "full_name": "Arjun Sharma"
}
```
- **Response `201 Created`:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "full_name": "Arjun Sharma",
      "created_at": "2026-11-20T11:00:00Z"
    },
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "bearer",
    "expires_in": 3600
  }
}
```

#### `POST /api/v1/auth/login`
Authenticates user credentials and issues a JWT access token.
- **Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```
- **Response `200 OK`:** Returns user profile and access token.

#### `GET /api/v1/auth/me`
Retrieves the profile and macroeconomic settings of the authenticated user.
- **Headers:** `Authorization: Bearer <token>`
- **Response `200 OK`:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "user@example.com",
    "full_name": "Arjun Sharma",
    "profile": {
      "currency": "INR",
      "monthly_income": 85000.00,
      "primary_income_date": 1,
      "default_buffer": 5000.00,
      "risk_tolerance": "moderate",
      "preferred_ai_provider": "gemini"
    }
  }
}
```

#### `PUT /api/v1/auth/profile`
Updates financial profile parameters (payday, buffer, income, preferred AI provider).
- **Headers:** `Authorization: Bearer <token>`
- **Response `200 OK`:** Returns updated profile object.

---

### 3.1 Module 1: Dashboard

#### `GET /api/v1/dashboard/summary`
Retrieves user-scoped top-level financial posture KPIs and summary figures in standard decimal format.
- **Headers:** `Authorization: Bearer <token>`
- **Response `200 OK`:**
```json
{
  "success": true,
  "data": {
    "currency": "INR",
    "current_balance": 68450.00,
    "monthly_income": 85000.00,
    "monthly_expenses": 42150.00,
    "savings_rate_percentage": 50.41,
    "safe_to_spend_today": 1250.00,
    "safe_to_spend_total": 18750.00,
    "resilience_score": 78,
    "emergency_runway_months": 4.5,
    "total_active_loans_principal": 350000.00,
    "upcoming_monthly_emi": 14200.00,
    "days_until_next_payday": 15
  }
}
```

#### `GET /api/v1/dashboard/alerts`
Returns user-scoped critical actionable financial alerts.
- **Headers:** `Authorization: Bearer <token>`
- **Response `200 OK`:** Returns list of active alerts.

---

### 3.2 Module 2: Transactions & Backend CSV Processing

#### `GET /api/v1/transactions`
Retrieves paginated transactions strictly belonging to the authenticated user.
- **Headers:** `Authorization: Bearer <token>`
- **Query Parameters:**
  - `page` (integer, default: `1`): Page number.
  - `limit` (integer, default: `20`, max: `100`): Items per page.
  - `type` (string, optional: `"income"` | `"expense"`): Filter by flow type.
  - `category_id` (integer, optional): Filter by category ID.
  - `payment_mode` (string, optional: `"upi"` | `"card"` | `"netbanking"` | `"cash"` | `"other"`): Filter by payment mode.
  - `start_date` (date, optional, `YYYY-MM-DD`): Transactions on or after this date.
  - `end_date` (date, optional, `YYYY-MM-DD`): Transactions on or before this date.
  - `search` (string, optional): Case-insensitive search keyword across description and merchant.
- **Sorting:** Newest transactions first by default (`transaction_date DESC, id DESC`).
- **Response `200 OK`:**
```json
{
  "success": true,
  "data": [
    {
      "id": 14,
      "user_id": 1,
      "category_id": 2,
      "category": {
        "id": 2,
        "name": "Groceries & Essentials",
        "type": "expense",
        "icon": "shopping_basket",
        "color": "#16A34A",
        "is_system": true,
        "is_essential": true
      },
      "amount": 2400.50,
      "currency": "INR",
      "type": "expense",
      "transaction_date": "2026-11-20",
      "description": "Weekly Groceries at Nature's Basket",
      "merchant": "Nature's Basket",
      "payment_mode": "upi",
      "is_recurring": false,
      "source": "manual",
      "created_at": "2026-11-20T10:15:30Z",
      "updated_at": "2026-11-20T10:15:30Z"
    }
  ],
  "pagination": {
    "total": 142,
    "page": 1,
    "limit": 20,
    "total_pages": 8
  },
  "meta": {
    "timestamp": "2026-11-20T11:00:00Z"
  }
}
```

#### `POST /api/v1/transactions`
Creates a transaction strictly associated with the authenticated user.
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
```json
{
  "amount": 2400.50,
  "type": "expense",
  "category_id": 2,
  "transaction_date": "2026-11-20",
  "description": "Weekly Groceries at Nature's Basket",
  "merchant": "Nature's Basket",
  "payment_mode": "upi",
  "is_recurring": false,
  "source": "manual"
}
```
- **Validation Rules:**
  - `amount`: Strictly positive (`> 0`) in standard currency units (e.g. ₹2,400.50). Converted internally to 64-bit integer paise (`240050`).
  - `type`: Must be `"income"` or `"expense"`.
  - `category_id`: Must reference a valid global system category or a custom category owned by the authenticated user. The category type must match the transaction type.
  - `payment_mode`: One of `"upi"`, `"card"`, `"netbanking"`, `"cash"`, `"other"`.
  - `source`: `"manual"` or `"csv"`.
- **Response `201 Created`:** Returns created transaction object.

#### `GET /api/v1/transactions/{transaction_id}`
Retrieves a single transaction by ID.
- **Headers:** `Authorization: Bearer <token>`
- **Anti-Enumeration:** Returns `404 Not Found` if the transaction does not exist or belongs to another user.
- **Response `200 OK`:** Returns single transaction response envelope.

#### `PUT /api/v1/transactions/{transaction_id}`
Updates an existing transaction.
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:** All fields optional (`amount`, `type`, `category_id`, `transaction_date`, `description`, `merchant`, `payment_mode`, `is_recurring`).
- **Anti-Enumeration:** Returns `404 Not Found` if record belongs to another user.
- **Response `200 OK`:** Returns updated transaction object.

#### `DELETE /api/v1/transactions/{transaction_id}`
Permanently deletes a transaction.
- **Headers:** `Authorization: Bearer <token>`
- **Anti-Enumeration:** Returns `404 Not Found` if record belongs to another user.
- **Response `200 OK`:**
```json
{
  "success": true,
  "data": {
    "id": 14,
    "deleted": true
  },
  "meta": {
    "timestamp": "2026-11-20T11:00:00Z"
  }
}
```

#### `POST /api/v1/transactions/import-csv`
Uploads a transaction statement CSV to be parsed, validated, and saved exclusively by the **Python FastAPI backend**.
- **Headers:** `Authorization: Bearer <token>`
- **Request:** `multipart/form-data` with `file: <CSV binary>` (file size limit: 10 MB, `.csv` extension required).
- **Generic CSV Format Specification:**
  - **Required Columns (case-insensitive headers):**
    - `date`: Transaction date (supports `YYYY-MM-DD`, `DD-MM-YYYY`, `DD/MM/YYYY`, `YYYY/MM/DD`).
    - `amount`: Positive transaction amount in Rupees (e.g., `1250.50`, `₹1,250.00`).
    - `type`: `income` (or `credit`, `cr`) or `expense` (or `debit`, `dr`).
    - `description`: Transaction narrative or note.
  - **Optional Columns:**
    - `category`: Category name or ID (auto-matched against global and user categories; falls back to `"Other Expense"` / `"Other Income"` if unmatched).
    - `merchant`: Merchant / Payee name.
    - `payment_mode`: `"upi"`, `"card"`, `"netbanking"`, `"cash"`, or `"other"` (defaults to `"other"`).
  - **Sample Generic CSV:**
    ```csv
    date,amount,type,category,description,merchant,payment_mode
    2026-11-10,1250.50,expense,Groceries & Essentials,Supermarket Shopping,BigBasket,upi
    2026-11-11,450.00,expense,Food & Dining,Cafe Coffee Day,CCD,card
    2026-11-12,50000.00,income,Salary & Wages,Monthly Salary,Employer,netbanking
    ```
- **Backend Pipeline Execution:**
  1. Validates file extension, non-empty content, and size limit (< 10 MB).
  2. Parses rows using Python's streaming CSV engine (`csv.reader` with encoding fallbacks for UTF-8 and Latin-1).
  3. Sanitizes amounts into `decimal.Decimal` and computes user-scoped SHA-256 reference hashes:
     $$\text{Hash} = \text{SHA256}(\text{user\_id} : \text{date} : \text{amount\_subunits} : \text{type} : \text{description} : \text{merchant})$$
  4. Automatically detects and skips duplicates without rejecting the batch.
  5. Atomically commits all valid rows within a single database transaction.
  6. Captures and reports row-level errors without crashing.
- **Response `200 OK`:**
```json
{
  "success": true,
  "data": {
    "total_rows_parsed": 85,
    "successful_imports": 82,
    "duplicates_skipped": 3,
    "errors": [
      {
        "row_number": 12,
        "reason": "Invalid monetary format: 'abc'",
        "raw_data": {
          "date": "2026-11-12",
          "amount": "abc",
          "type": "expense",
          "description": "Erroneous Row"
        }
      }
    ]
  },
  "meta": {
    "timestamp": "2026-11-20T11:00:00Z"
  }
}
```

#### `GET /api/v1/transactions/export-csv`
Exports the authenticated user's transactions as a downloadable CSV file.
- **Headers:** `Authorization: Bearer <token>`
- **Query Parameters:** Supports identical filters as listing (`type`, `category_id`, `payment_mode`, `start_date`, `end_date`, `search`).
- **Data Isolation:** Strictly scoped to the authenticated user. Never includes another user's transactions.
- **Response Headers:**
  - `Content-Type: text/csv; charset=utf-8`
  - `Content-Disposition: attachment; filename="cashniti_transactions_YYYYMMDD.csv"`
- **Response Body:** Formatted CSV stream containing column headers:
  `Transaction ID, Date, Type, Category, Amount (INR), Description, Merchant, Payment Mode, Is Recurring, Source, Created At`

---

### 3.2.1 Categories Taxonomy (`/categories`)

#### `GET /api/v1/categories`
Retrieves all categories accessible to the user (global system categories + user's custom categories).
- **Headers:** `Authorization: Bearer <token>`
- **Query Parameters:** `type` (optional: `"income"` | `"expense"`)
- **Response `200 OK`:** List of category objects.

#### `POST /api/v1/categories`
Creates a user-defined custom category strictly scoped to the authenticated user.
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
```json
{
  "name": "Freelance Design",
  "type": "income",
  "icon": "palette",
  "color": "#8B5CF6",
  "is_essential": false
}
```
- **Response `201 Created`:** Returns created category object.

---

### 3.3 Module 3: Expense Intelligence

#### `GET /api/v1/expenses/breakdown`
Retrieves user-scoped categorized spending breakdown.
- **Headers:** `Authorization: Bearer <token>`
- **Query Parameters:** `month` (1-12), `year` (e.g., 2026)
- **Response `200 OK`:** Needs vs. wants ratio and category allocations.

#### `GET /api/v1/expenses/trends`
Provides 6-month historical spending trend data for Recharts visualizations.

---

### 3.4 Module 4: Cash Flow Forecast

#### `GET /api/v1/forecast/cashflow`
Generates daily forward liquidity trajectory over 30, 60, or 90 days.
- **Headers:** `Authorization: Bearer <token>`
- **Query Parameters:** `days` (30 | 60 | 90)
- **Response `200 OK`:** Timeline of projected balances and scheduled cash obligations.

---

### 3.5 Module 5: Financial Resilience Planner

#### `GET /api/v1/resilience/metrics`
Retrieves user's emergency fund adequacy, runway in months, and resilience score.
- **Headers:** `Authorization: Bearer <token>`
- **Response `200 OK`:** Resilience score, runway months, target fund amount.

#### `POST /api/v1/resilience/simulate-scenario`
Simulates emergency shocks on user liquidity.
- **Headers:** `Authorization: Bearer <token>`
- **Response `200 OK`:** Recalculated runway under stress scenarios.

---

### 3.6 Module 6: Safe to Spend

#### `GET /api/v1/safe-to-spend/current`
Calculates uncommitted discretionary allowance until next paycheck for the user.
- **Headers:** `Authorization: Bearer <token>`
- **Response `200 OK`:** Safe to spend total, daily allowance, buffer deducted.

---

### 3.7 Module 7: Loans & EMI Intelligence

#### `GET /api/v1/loans`
Retrieves user's active loan portfolio and Debt-to-Income (DTI) metrics.
- **Headers:** `Authorization: Bearer <token>`
- **Response `200 OK`:** Portfolio summary, DTI ratio, and loan schedule.

#### `POST /api/v1/loans/simulate-prepayment`
Calculates interest and tenure savings from extra payments.
- **Headers:** `Authorization: Bearer <token>`
- **Response `200 OK`:** Amortization savings analysis.

---

### 3.8 Module 8: AI Financial Assistant (`/ai`)

#### `GET /api/v1/ai/providers`
Returns the list of integrated AI providers, active status, free-tier limits, and availability.
- **Headers:** `Authorization: Bearer <token>`
- **Response `200 OK`:**
```json
{
  "success": true,
  "data": {
    "default_provider": "gemini",
    "providers": [
      {
        "id": "gemini",
        "name": "Google Gemini",
        "model": "gemini-1.5-flash",
        "tier": "free",
        "status": "available",
        "rate_limit_rpm": 15,
        "daily_limit_requests": 1500,
        "description": "Official Google Gemini SDK. Fast, intelligent multi-turn advisory."
      },
      {
        "id": "groq",
        "name": "Groq Cloud",
        "model": "llama-3.1-70b-versatile",
        "tier": "free",
        "status": "available",
        "rate_limit_rpm": 30,
        "daily_limit_requests": 14400,
        "description": "Ultra-low latency inference for open models via Groq LPU."
      },
      {
        "id": "openrouter",
        "name": "OpenRouter",
        "model": "meta-llama/llama-3.1-8b-instruct:free",
        "tier": "free",
        "status": "available",
        "rate_limit_rpm": 20,
        "daily_limit_requests": 200,
        "description": "Universal open gateway accessing diverse free models."
      }
    ]
  }
}
```

#### `POST /api/v1/ai/chat`
Conversational endpoint grounded in verified user financial state, routed to user's chosen provider.
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
```json
{
  "session_id": "session_uuid_123",
  "provider": "groq",
  "message": "Can I afford to purchase a ₹45,000 laptop this weekend?"
}
```
- **Response `200 OK`:** Grounded AI explanation strictly using authenticated user's metrics in standard currency format.

---

### 3.9 Module 9: AI Scam Detector (`/scam-detector`)

#### `POST /api/v1/scam-detector/analyze`
**AI-powered analysis** of suspicious messages, SMS alerts, emails, and links, explaining potential risks with an explicit non-guarantee disclaimer.
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
```json
{
  "input_type": "sms",
  "content": "Dear Customer, Your SBI account KYC has expired. Immediate update required within 24 hours to prevent permanent freeze. Click here to update: http://bit.ly/sbi-kyc-verify-apk",
  "provider": "gemini"
}
```
- **Response `200 OK`:**
```json
{
  "success": true,
  "data": {
    "risk_score": 95,
    "risk_level": "critical",
    "summary": "High-confidence banking impersonation phishing scam detected by AI analysis.",
    "ai_explanation": "The message exhibits multiple classic social engineering hallmarks: (1) Artificial urgency ('within 24 hours', 'permanent freeze') intended to bypass critical thinking, (2) A shortened bit.ly URL masking the actual destination rather than official 'sbi.co.in', and (3) An APK filename indicating an attempt to install malicious Android software capable of intercepting OTPs and credentials.",
    "detected_flags": [
      {
        "flag": "URGENCY_PRESSURE",
        "description": "Threatens permanent account freeze within 24 hours."
      },
      {
        "flag": "MASKED_SHORT_URL",
        "description": "Uses bit.ly link shortener to conceal fraudulent domain."
      },
      {
        "flag": "MALICIOUS_APK_INDICATOR",
        "description": "Payload slug contains '.apk' software download pattern."
      }
    ],
    "recommendations": [
      "DO NOT click the link or download any file.",
      "Never enter your netbanking password or UPI PIN on unverified websites.",
      "Legitimate banks never request KYC updates via SMS links or APK files.",
      "Forward fraudulent SMS to 1909 (Do Not Disturb reporting) or report to cybercrime.gov.in."
    ],
    "disclaimer": "AI scam analysis is an educational assessment tool based on heuristic patterns and is NOT guaranteed. Users must exercise independent caution and verify directly with official banking institutions.",
    "emergency_helpline": {
      "name": "National Cyber Crime Reporting Portal",
      "phone": "1930",
      "website": "https://cybercrime.gov.in"
    }
  }
}
```

#### `GET /api/v1/scam-detector/history`
Retrieves past user scan logs and risk scores.
- **Headers:** `Authorization: Bearer <token>`
- **Response `200 OK`:** Paginated scan history for the user.
