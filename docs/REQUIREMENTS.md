# CashNiti — Requirements Specification

## 1. Introduction & Scope Overview

This document specifies the complete functional and non-functional requirements for the **CashNiti** personal finance platform. CashNiti provides deterministic financial control, predictive cash flow visibility, debt intelligence, emergency resilience, and **AI-powered scam detection**, supported by natural language explanations powered by a **multi-provider AI architecture**, built upon a **strictly isolated multi-user architecture**, **backend CSV statement processing**, and the **Google Stitch UI design foundation**.

---

## 2. Requirement Baseline: Confirmed Decisions

All architectural decisions have been **confirmed and finalized**:

1. **Multi-User Architecture & Authentication (Decision 1):**
   - CashNiti is a multi-user application.
   - Each user will have an individual account with registration and login.
   - All financial records must be associated with the appropriate user.
   - Users must **never** be able to access another user's financial data.
   - The database is designed with user ownership and data isolation from the beginning.
2. **Monetary Precision & Currency Handling (Decision 2):**
   - **INR (₹)** is the default currency.
   - Users must enter and view monetary amounts in normal currency format, such as `₹1,000.50` or `₹45,000.00`.
   - The user interface must **never** expose raw Paise values.
   - Store INR amounts internally as **64-bit integer Paise** in the database to prevent floating-point precision errors.
   - Use Python `decimal.Decimal` for all financial calculations, amortizations, and conversions.
   - Keep currency formatting, currency selection, and database storage as strictly separate concerns.
   - Design the system so additional currencies (e.g., USD, EUR, GBP, JPY) can be supported in the future with currency-specific precision rules.
3. **AI Provider Architecture (Decision 3):**
   - Support multiple AI providers rather than being permanently tied to a single vendor.
   - Users can choose from the AI providers integrated into CashNiti.
   - Initial provider candidates: Google Gemini, Groq, OpenRouter.
   - Prioritize models with genuinely free API tiers.
   - Centrally manage API keys on the backend; users do not need to provide their own keys.
   - Never silently switch users to a paid model or charged API.
   - Clearly communicate free-tier limits, rate limits, and service availability.
   - Keep the AI integration modular so additional providers can be added cleanly.
   - Exact models, SDK versions, and provider availability will be verified during implementation.
   - Financial calculations must remain deterministic and independent of AI availability.
4. **Google Stitch UI Integration (Decision 4):**
   - The actual Google Stitch exported UI at `frontend/stitch-export/` is the authoritative foundation of the CashNiti frontend.
   - Do not recreate or redesign the nine existing screens.
   - Preserve the original Stitch visual design, typography, and "Lavender Minimalist FinTech" design tokens.
   - Organize the frontend into reusable React feature modules in `frontend/src/modules/`.
   - Extract shared layout components (`AppLayout`, `Sidebar`, `TopNav`) and atomic widgets (`Button`, `StatCard`, `Modal`).
   - Replace hardcoded sample data with backend API data during integration.
5. **Frontend State Management (Decision 5):**
   - **TanStack React Query** handles all backend API data fetching, server state caching, background refetching, and automatic cache invalidation upon data mutations.
   - **React Context** manages client-only, application-wide UI state (`AuthContext` for user session, `AIProviderContext` for selected AI provider, `ToastContext` for notifications).
6. **CSV Statement Processing (Decision 6):**
   - CSV files will be processed exclusively by the **Python FastAPI backend**.
   - Backend handles file validation, streaming parsing, row-level validation, duplicate checking via user-scoped reference hashes, category auto-tagging heuristics, and atomic database persistence.
7. **Scam Detection Strategy (Decision 7):**
   - Scam detection utilizes **AI analysis** to evaluate suspicious messages, payment requests, SMS alerts, and links.
   - AI explains potential risks, identifies social engineering patterns, and provides safety guidance.
   - **Prominently document that detection is NOT guaranteed**; it is an educational risk assessment tool. Displays National Cyber Crime Helpline (**1930** / **cybercrime.gov.in**).

---

## 3. Module-by-Module Functional Requirements

### Module 0: User Registration, Authentication & Profile Management
- **Purpose:** Provide secure user onboarding, authentication, session issuance, and financial macroeconomic profile configuration.
- **Required Data:** Full name, email address (unique), password, default currency (defaults to `INR`), monthly income (INR), primary income date (1-31), default cushion buffer (INR), and risk tolerance profile.
- **Calculations & Rules:**
  - Password must be hashed using salted `bcrypt` (or `Argon2id`). Passwords must never be logged or stored in plaintext.
  - JWT access tokens issued on login with cryptographic signature (`HS256`), containing user ID and expiration claims.
  - All subsequent requests validate the Bearer token and inject the authenticated `user_id` into database queries.
- **Backend API Endpoints:** `POST /api/v1/auth/register`, `POST /api/v1/auth/login`, `GET /api/v1/auth/me`, `PUT /api/v1/auth/profile`.

---

### Module 1: Dashboard
- **Purpose:** Serve as the command center for the user's current financial posture, providing immediate answers to: "Where do I stand right now?", "Am I safe to spend today?", and "What requires my urgent attention?".
- **Required Data:**
  - Aggregated liquid balance (sum of bank/cash balances for the authenticated user, rendered in standard INR format e.g. `₹68,450.00`).
  - Current month total income and total expenses.
  - Safe-to-Spend headline figure and daily allowance.
  - Financial Resilience Score / Emergency Runway in months.
  - Active debt summary (total outstanding principal and upcoming monthly EMI).
  - Recent transactions list (latest 5 to 10 entries for the user).
  - User-specific alerts (e.g., bill due within 3 days, low cash flow buffer, budget breach).
- **Backend API Endpoints:** `GET /api/v1/dashboard/summary`, `GET /api/v1/dashboard/alerts`.

---

### Module 2: Transactions
- **Purpose:** Provide complete ledger tracking, categorization, filtering, and bulk ingestion of financial transactions.
- **Required Data:**
  - Transaction ID, User ID, Date, Amount (entered and displayed in standard format e.g. `1250.00` / `₹1,250.00`; stored internally as paise integer `125000`), Currency (`INR`), Type (`income` / `expense`), Category ID, Description / Merchant name, Payment Mode (`upi`, `card`, `netbanking`, `cash`, `other`), Is Recurring flag, Source (`manual` / `csv`), Notes.
- **Calculations & Rules:**
  - Paginated sorting by date descending, strictly filtered by `user_id`.
  - Search filtering by keyword, category, date range, amount range, and payment mode.
  - **Backend CSV Processing Pipeline:** Python backend validates uploaded CSV, parses rows, auto-detects column headers for Indian banks, computes SHA-256 reference hashes to eliminate duplicates, auto-tags categories via merchant keywords, and persists rows within an atomic database transaction.
- **Backend API Endpoints:**
  - `GET /api/v1/transactions`
  - `POST /api/v1/transactions`
  - `GET /api/v1/transactions/{id}`, `PUT /api/v1/transactions/{id}`, `DELETE /api/v1/transactions/{id}`
  - `POST /api/v1/transactions/import-csv`
  - `GET /api/v1/transactions/categories`

---

### Module 3: Expense Intelligence
- **Purpose:** Deliver deep behavioral analytics and spending patterns to identify leaks, enforce budgets, and categorize expenses by necessity.
- **Required Data:** User's historic transaction ledger grouped by categories and months; defined monthly category budgets and essential vs. discretionary classification tags.
- **Calculations & Rules:** Category breakdowns, Needs vs. Wants (50/30/20) ratio, Month-over-Month variance, and budget limit breach warnings (>80% warning, >100% breached).
- **Backend API Endpoints:** `GET /api/v1/expenses/breakdown`, `GET /api/v1/expenses/trends`, `GET /api/v1/expenses/budgets`, `POST /api/v1/expenses/budgets`.

---

### Module 4: Cash Flow Forecast
- **Purpose:** Model future liquidity over 30, 60, and 90-day horizons to alert the user to potential cash deficits before they materialize.
- **Required Data:** Current opening balance, recurring income schedules, recurring expense obligations, scheduled loan EMIs, and historical daily burn rate.
- **Calculations & Rules:** Daily projected balance trajectory, minimum projected balance date, and low-balance deficit warnings.
- **Backend API Endpoints:** `GET /api/v1/forecast/cashflow`, `GET /api/v1/forecast/obligations`, `POST /api/v1/forecast/obligations`.

---

### Module 5: Financial Resilience Planner
- **Purpose:** Measure and strengthen the user's financial survival buffer against job loss, medical emergencies, or unexpected shocks.
- **Required Data:** Total liquid emergency reserves, monthly baseline essential living costs, target emergency buffer horizon (3 to 12 months).
- **Calculations & Rules:** Essential monthly burn, emergency runway in months, target emergency fund amount, resilience score (0-100), and interactive stress-test scenario simulations.
- **Backend API Endpoints:** `GET /api/v1/resilience/metrics`, `POST /api/v1/resilience/simulate-scenario`, `PUT /api/v1/resilience/target`.

---

### Module 6: Safe to Spend
- **Purpose:** Provide a real-time, unambiguous figure of the guilt-free discretionary cash available right now without endangering upcoming obligations or savings goals.
- **Required Data:** Current liquid balance, upcoming committed obligations until next payday, goal allocations, cushion buffer, and days remaining until payday.
- **Calculations & Rules:** Safe-to-Spend total and daily safe-to-spend allowance. Deficit detection alerts when obligations exceed available cash.
- **Backend API Endpoints:** `GET /api/v1/safe-to-spend/current`, `PUT /api/v1/safe-to-spend/settings`.

---

### Module 7: Loans & EMI Intelligence
- **Purpose:** Consolidate active debts, track amortization schedules, calculate Debt-to-Income (DTI) health, and simulate the interest-saving impact of pre-payments.
- **Required Data:** Loan portfolio (principal, interest rate, tenure, EMI, lender), gross monthly income.
- **Calculations & Rules:** Standard reducing-balance EMI, full month-by-month amortization schedule, DTI ratio risk classification, and prepayment simulation (reducing tenure vs. reducing EMI).
- **Backend API Endpoints:** `GET /api/v1/loans`, `POST /api/v1/loans`, `GET /api/v1/loans/{id}/amortization`, `POST /api/v1/loans/simulate-prepayment`.

---

### Module 8: AI Financial Assistant
- **Purpose:** Serve as a natural language financial copilot that answers user queries, summarizes financial posture, and explains trends based strictly on deterministic backend metrics for the authenticated user across multiple AI providers.
- **Required Data:** User query string, selected provider identifier (`gemini`, `groq`, `openrouter`), deterministic metric context snapshot, conversation history.
- **Calculations & Guardrails:**
  - **Zero Hallucination Policy:** AI prompt explicitly injects pre-calculated numbers from the backend. The LLM is instructed never to calculate financial figures.
  - **Provider Agnostic:** Backend routes the query to the user's selected provider adapter.
  - **Rate Limit & Quota Transparency:** System monitors provider free-tier availability and returns clear quota notices if a provider is exhausted.
- **Backend API Endpoints:** `GET /api/v1/ai/providers`, `POST /api/v1/ai/chat`, `GET /api/v1/ai/insights`.

---

### Module 9: Scam Detector
- **Purpose:** Provide an educational and **AI-powered threat analysis shield** against prevalent financial fraud schemes (fake UPI payment alerts, suspicious loan APKs, phishing SMS, lottery/work-from-home scams).
- **Required Data:** Input text (SMS, WhatsApp message, email body, URL string, or suspicious UPI handle).
- **Calculations & Guardrails:**
  - **AI Threat Analysis:** The AI evaluates message content and links, identifying deceptive tactics, urgency pressure, and impersonation flags, explaining risks in plain English.
  - **Risk Scoring (0-100):** Weighted risk index mapping to Critical, High, Medium, or Low risk.
  - **Prominent Non-Guarantee Disclaimer:** The UI and API explicitly display: *"AI scam analysis is an educational assessment tool and is NOT guaranteed. Always verify with official financial institutions."*
  - **Emergency Helpline:** Prominently links to National Cyber Crime portal (**1930** / **cybercrime.gov.in**).
- **Backend API Endpoints:** `POST /api/v1/scam-detector/analyze`, `GET /api/v1/scam-detector/history`.

---

## 4. Non-Functional Requirements (NFRs)

### 4.1 Strict Multi-Tenant Security & Isolation
- **Row-Level Isolation:** Users must never be able to access or manipulate another user's financial data. Every single operation is strictly scoped to `current_user.id`.
- **Anti-Enumeration Protection:** If a user requests a resource ID belonging to another user, the API responds with `404 Not Found` rather than `403 Forbidden`.
- **Password Security:** All passwords must be salted and hashed with `bcrypt` (work factor $\ge 12$). Plaintext passwords must never be stored, logged, or cached.
- **JWT Protection:** Tokens are cryptographically signed with `HS256`, enforced with expiration lifetimes, and validated on every API request.
- **Centralized Key Storage:** AI provider API keys reside strictly on the backend. No keys are ever sent to client browsers.

### 4.2 Monetary Precision & Currency Architecture
- **Separation of Concerns:** Currency formatting, currency selection/metadata, and database storage are strictly separated into independent layers.
- **UI Abstraction:** The user interface displays and accepts standard currency formats (e.g., `₹1,000.50`). Raw Paise values are strictly hidden from users.
- **Subunit Storage:** Amounts stored as 64-bit signed integers in currency subunits (Paise for INR) in SQLite to eliminate floating-point drift.
- **Python Decimal:** All calculations and amortizations execute using Python `decimal.Decimal`.

### 4.3 Multi-Provider AI Resilience & Transparency
- **Deterministic Independence:** Core financial features operate 100% deterministically without requiring AI provider availability.
- **No Silent Paid Escalation:** The platform will never switch a user to a paid model or charged API without explicit user consent.
- **Quota Transparency:** Free-tier usage and limits are displayed openly in the UI.

### 4.4 Performance & Responsiveness
- **API Latency:** 95% of read queries must respond in $< 150\text{ ms}$ on local SQLite.
- **CSV Ingestion:** Ingestion of up to 2,000 transaction rows must execute within $< 2\text{ seconds}$ on the backend.
- **Client Rendering:** Client UI must maintain 60 FPS transitions, with lazy-loaded chart components to avoid rendering bottlenecks.
