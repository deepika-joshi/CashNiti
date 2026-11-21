# CashNiti — Architectural Decisions Log

This document records the architectural and product decisions for CashNiti. **All seven foundational architectural decisions have been finalized and approved.**

---

## 1. Finalised Decisions

### Decision 1: Multi-User Architecture & Strict Data Isolation
- **Status:** **FINALISED & CONFIRMED**
- **Decision:**
  - CashNiti is a **Multi-User Application**.
  - Each user has an individual account with registration and login.
  - All financial records are associated with the appropriate user from day one.
  - Users must **never** be able to access another user's financial data.
  - The database is designed with user ownership and data isolation from the beginning:
    - Every table contains `user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE`.
    - Composite indexes on `(user_id, ...)` guarantee performant query isolation.
    - FastAPI dependency injection (`get_current_active_user`) extracts and validates the JWT Bearer token on every protected endpoint.
    - All queries, mutations, and duplicate checks are strictly parameterized with `current_user.id`.
    - Single-record lookups for unauthorized resources return `404 Not Found` to prevent account enumeration.

---

### Decision 2: Monetary Precision, Currency Handling & Separation of Concerns
- **Status:** **FINALISED & CONFIRMED**
- **Decision:**
  1. **Default Currency:** Indian Rupees (**INR - ₹**) is the default platform currency.
  2. **User Experience Standard:** Users must enter and view all monetary amounts in normal currency format (e.g., `₹1,000.50` or `₹45,000.00`).
  3. **UI Abstraction Guarantee:** The user interface must **never** expose raw Paise values to end users.
  4. **Internal Storage Standard:** Monetary amounts are stored internally in the database as **64-bit signed integers in currency subunits (Paise)** ($1\text{ INR} = 100\text{ Paise}$) to eliminate binary floating-point precision errors.
  5. **Calculation Engine Standard:** All domain financial calculations and conversions use Python's built-in `decimal.Decimal` with explicit, deterministic rounding modes.
  6. **Separation of Concerns:** Currency formatting (frontend UI localization), currency selection/metadata (user profile and system configuration), and database storage (integer subunits) are strictly decoupled.
  7. **Future Multi-Currency Readiness:** The architecture must be designed so additional currencies (e.g., USD, EUR, GBP, JPY, AED) can be supported in the future with currency-specific precision rules without altering calculation core logic or database integrity.

---

### Decision 3: AI Provider Architecture
- **Status:** **FINALISED & CONFIRMED**
- **Decision:**
  1. **Multi-Provider Support:** CashNiti must support multiple AI providers rather than being permanently tied to a single vendor.
  2. **User Provider Choice:** Users can select from the active AI providers integrated into CashNiti.
  3. **Initial Candidate Providers:**
     - **Google Gemini** (Gemini 1.5 Flash / official `google-genai` SDK)
     - **Groq** (Ultra-fast open models like Llama 3 via Groq Cloud API)
     - **OpenRouter** (Unified gateway providing access to diverse open and closed model endpoints)
  4. **Free-Tier Prioritization:** Providers and models offering genuinely free API tiers must be prioritized.
  5. **Centralized Backend Key Management:** CashNiti manages API keys centrally on the backend. End users will **not** be required to supply their own API keys.
  6. **Zero Silent Paid Escalation:** The platform must **never** silently switch users to a paid model or charged API.
  7. **Transparent Limit Communication:** The system clearly communicates free-tier limits, rate limits (RPM/TPD), token usage, and service availability to users in the UI.
  8. **Modular Provider Adapter Pattern:** Implements a provider-agnostic adapter interface (`BaseAIProvider`) so new providers can be added cleanly without altering domain business logic.
  9. **Implementation-Stage Model Verification:** Exact models, specific SDK versions, and current provider availability are verified at implementation time against current pricing and quotas.
  10. **Deterministic Independence:** All financial calculations remain completely deterministic and functional even if AI providers are unreachable or rate-limited.

---

### Decision 4: Stitch UI Integration & Frontend Architecture
- **Status:** **FINALISED & CONFIRMED**
- **Decision:**
  1. **Authoritative Foundation:** The actual Google Stitch exported UI located at `frontend/stitch-export/` serves as the authoritative foundation of the CashNiti frontend.
  2. **No Screen Recreation:** Do not recreate, redesign, or generate substitute screens for the nine existing screens.
  3. **Visual Fidelity Preservation:** Preserve the original Stitch visual styling, layout, typography, and "Lavender Minimalist FinTech" design system as closely as possible.
  4. **Pre-Integration Inspection Completed:** All exported files, components, assets, dependencies, and styling have been inspected prior to integration (see `docs/STITCH_INTEGRATION_PLAN.md`).
  5. **Modular React Feature Structure:** The frontend is organized into reusable React feature modules matching the nine screens:
     ```
     frontend/src/
     ├── modules/
     │   ├── dashboard/
     │   ├── transactions/
     │   ├── expense-intelligence/
     │   ├── cash-flow/
     │   ├── resilience/
     │   ├── safe-to-spend/
     │   ├── loans/
     │   ├── ai-assistant/
     │   └── scam-detector/
     ├── components/
     │   ├── layout/       # AppLayout, Sidebar, TopNav
     │   ├── common/       # Button, Modal, StatCard, Badge
     │   └── charts/       # Dynamic Recharts wrappers
     └── services/         # API clients and query hooks
     ```
  6. **Shared Components Extraction:** Common UI elements (Sidebar navigation, TopNav header, KPI stat cards, buttons, modals, badges) are extracted into shared components.
  7. **Phased Dynamic Data Binding:** Hardcoded sample values in the export are replaced with real backend API data during the frontend/backend integration phase.
  8. **Evidence-Based Adaptation:** Adaptations for React + Vite are grounded directly in the inspected export files (HTML5 + Tailwind CSS + Google Fonts).

---

### Decision 5: Frontend State Management
- **Status:** **FINALISED & CONFIRMED**
- **Decision:**
  1. **Backend API Data State:** **TanStack React Query** (`@tanstack/react-query`) is used for all server state management.
     - Handles caching, deduplication, background refetching, pagination, and mutations.
     - Query key hierarchies (e.g., `['transactions', { page, filter }]`, `['dashboard']`, `['safe-to-spend']`) allow granular, automatic cache invalidation upon ledger updates.
  2. **Shared UI State:** **React Context** is used strictly for client-only, application-wide UI state:
     - `AuthContext`: Authenticated user identity, JWT token, login/logout session state.
     - `AIProviderContext`: Current user-selected AI provider preference (`gemini`, `groq`, `openrouter`).
     - `ToastContext`: Global non-blocking feedback notifications (success, error, warning).
  3. **Local Component State:** Standard React `useState` and `useReducer` for isolated UI interactions (form inputs, modal toggles, dropdown open/close).

---

### Decision 6: CSV Statement Processing
- **Status:** **FINALISED & CONFIRMED**
- **Decision:**
  1. **Backend Processing Pipeline:** CSV files will be processed exclusively by the **Python FastAPI backend**.
  2. **End-to-End Backend Ownership:** The backend handles:
     - Multipart file upload validation (file size limits, mime-type verification, encoding checks).
     - Streaming parsing and header mapping for Indian bank exports (HDFC, SBI, ICICI, Axis) and generic statement formats.
     - Row-level validation (date parsing, amount sanitization, transaction type detection).
     - Duplicate transaction detection using user-scoped reference hashes (`reference_hash`).
     - Category auto-tagging heuristics based on merchant keyword matching.
     - Atomic database persistence within a single database transaction with automatic rollback on error.
  3. **Client Role:** The frontend UI provides an intuitive drag-and-drop file upload modal, displays upload progress, and renders a structured summary report returned by the backend (total rows parsed, imported count, duplicates skipped, errors).

---

### Decision 7: Scam Detection Strategy
- **Status:** **FINALISED & CONFIRMED**
- **Decision:**
  1. **AI-Based Scam Detection:** Scam detection utilizes **AI analysis** to evaluate suspicious messages, SMS alerts, payment requests, emails, and links.
  2. **Risk Analysis & Plain-English Explanation:** The AI evaluates potential threats, identifies social engineering patterns (urgency, panic, KYC freeze threats, malicious APK links, fake UPI collect requests), and provides clear, actionable explanations of potential risks.
  3. **Strict Non-Guarantee Disclaimer:** The platform must **clearly and prominently document that scam detection is NOT guaranteed**.
     - Detection is an educational, advisory safety tool based on heuristic analysis and AI pattern recognition.
     - It does not guarantee the safety or legitimacy of any message, transaction, or link.
     - Prominently displays emergency cyber helpline information (National Cyber Crime Helpline: **1930** and **cybercrime.gov.in**).

---

## 2. Decision Summary Table

| # | Topic | Final Decision | Status |
|---|---|---|---|
| **1** | Multi-User & Data Isolation | Multi-user application, individual registration/login, JWT authentication, strict row-level isolation | **FINALISED** |
| **2** | Monetary Precision & Currency | 64-bit integer Paise in DB, Python Decimal math, standard decimal format in UI (raw paise strictly hidden) | **FINALISED** |
| **3** | AI Provider Architecture | Modular multi-provider support (Gemini, Groq, OpenRouter), user choice, central backend key management, free-tier priority | **FINALISED** |
| **4** | Stitch UI Integration | Use actual Stitch export as frontend foundation, 9 React feature modules, preserve Lavender FinTech styling | **FINALISED** |
| **5** | Frontend State Management | TanStack React Query for backend API data; React Context for shared UI state | **FINALISED** |
| **6** | CSV Statement Processing | Python FastAPI backend handles validation, parsing, and atomic transaction persistence | **FINALISED** |
| **7** | Scam Detection Strategy | AI-based analysis and risk explanation; explicitly documented that detection is not guaranteed | **FINALISED** |

*All architectural decisions for the CashNiti MVP have been finalized and approved.*
