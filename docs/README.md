# CashNiti — Technical Documentation & Architecture Index

Welcome to the comprehensive technical and architectural documentation for **CashNiti**, an intelligent, resilience-first personal finance platform for Indian users.

All foundational architectural decisions (Decisions 1 through 7) have been **finalized and confirmed**. All specifications, mathematical models, API contracts, database schemas, and integration plans are organized into the dedicated documents below:

---

## Documentation Index

| Document | Description |
|---|---|
| [PROJECT_OVERVIEW.md](file:///c:/Users/Hp/Documents/CashNiti/docs/PROJECT_OVERVIEW.md) | Mission, problem statement, core value proposition, the 9 modules, MVP vs. future scope, and architectural philosophy. |
| [REQUIREMENTS.md](file:///c:/Users/Hp/Documents/CashNiti/docs/REQUIREMENTS.md) | Comprehensive functional and non-functional requirements, explicitly detailing all 7 confirmed architectural decisions. |
| [ARCHITECTURE.md](file:///c:/Users/Hp/Documents/CashNiti/docs/ARCHITECTURE.md) | System architecture diagrams (Mermaid), layered backend design, multi-user JWT authentication, four-tier currency architecture, multi-provider AI subsystem, backend CSV pipeline, and AI scam detection flow. |
| [DATABASE_DESIGN.md](file:///c:/Users/Hp/Documents/CashNiti/docs/DATABASE_DESIGN.md) | SQLite database schema with user ownership from day one, Entity-Relationship (ER) diagram, 64-bit integer paise precision strategy, multi-currency readiness, composite indexes, and Alembic migrations. |
| [API_SPECIFICATION.md](file:///c:/Users/Hp/Documents/CashNiti/docs/API_SPECIFICATION.md) | Complete REST API specification covering user authentication (`/auth`), all 9 modules, backend CSV import, multi-provider AI chat, and AI scam analysis with non-guarantee disclaimer. |
| [FINANCIAL_LOGIC.md](file:///c:/Users/Hp/Documents/CashNiti/docs/FINANCIAL_LOGIC.md) | Exact mathematical formulas, reducing-balance EMI amortizations, safe-to-spend algorithms, cash flow projections, currency registry rules, and edge cases. |
| [FRONTEND_STRUCTURE.md](file:///c:/Users/Hp/Documents/CashNiti/docs/FRONTEND_STRUCTURE.md) | React 19 + Vite + Tailwind CSS + Recharts structure, TanStack React Query + React Context state architecture, Lavender FinTech design token system, feature modules, and INR currency formatting utilities. |
| [STITCH_INTEGRATION_PLAN.md](file:///c:/Users/Hp/Documents/CashNiti/docs/STITCH_INTEGRATION_PLAN.md) | Comprehensive inspection report of `frontend/stitch-export/`, asset inventory, layout shell extraction blueprint, and file-by-file integration plan. |
| [DEVELOPMENT_ROADMAP.md](file:///c:/Users/Hp/Documents/CashNiti/docs/DEVELOPMENT_ROADMAP.md) | 13-phase ordered implementation plan detailing tasks, dependencies, deliverables, and completion criteria for each phase. |
| [OPEN_DECISIONS.md](file:///c:/Users/Hp/Documents/CashNiti/docs/OPEN_DECISIONS.md) | Architectural decisions log, recording all 7 finalized decisions (Decisions 1, 2, 3, 4, 5, 6, 7). |

---

## Core Architectural Pillars (All 7 Finalised & Approved)

1. **Multi-User Foundation & Strict Data Isolation (Decision 1):** Every user has an individual account created via registration and authenticated via JWT. All database tables enforce foreign key ownership (`user_id`). Users can never view, mutate, or delete another user's financial records.
2. **Monetary Precision & UI Abstraction (Decision 2):**
   - **Default Currency:** INR (₹).
   - **User Experience:** Users enter and view monetary values in normal currency format (e.g. `₹1,000.50`). The UI **never** exposes raw Paise.
   - **Database Storage:** Stored as 64-bit integer subunits (Paise for INR, $1\text{ INR} = 100\text{ Paise}$) to eliminate binary floating-point drift.
   - **Calculation Core:** Pure Python `decimal.Decimal` with explicit rounding.
   - **Separation of Concerns:** Formatting, currency metadata, and storage are decoupled for future multi-currency support.
3. **Multi-Provider AI Architecture (Decision 3):**
   - **Multiple Providers:** Support Google Gemini, Groq, and OpenRouter via a modular adapter interface (`BaseAIProvider`).
   - **User Choice:** Users can select their preferred provider in the UI.
   - **Central Key Management:** API keys reside securely on the backend; users do not need to provide their own keys.
   - **Free-Tier Priority:** Prioritizes genuinely free tiers with zero silent paid escalation and transparent limit tracking.
   - **Deterministic Independence:** Core financial calculations are 100% deterministic and independent of AI availability.
4. **Google Stitch UI Integration (Decision 4):**
   - The actual Google Stitch export at `frontend/stitch-export/` is the authoritative visual foundation.
   - Preserves the "Lavender Minimalist FinTech" design system without redesigning or recreating the 9 screens.
   - Decouples exported HTML/Tailwind screens into reusable React feature modules inside `frontend/src/modules/`.
5. **Frontend State Management (Decision 5):**
   - **TanStack React Query** manages all backend API data fetching, server caching, and automatic cache invalidation upon ledger mutations.
   - **React Context** manages client-only, application-wide UI state (`AuthContext`, `AIProviderContext`, `ToastContext`).
6. **Backend CSV Statement Processing (Decision 6):**
   - Bank statement CSV files are processed exclusively by the **Python FastAPI backend**.
   - Backend handles file validation, streaming parsing, row sanitization, user-scoped duplicate checking, category auto-tagging, and atomic database persistence with rollback on failure.
7. **AI-Based Scam Detection Strategy (Decision 7):**
   - Scam detection uses **AI models** to analyze suspicious messages, payment requests, SMS alerts, and links.
   - AI evaluates deceptive tactics, social engineering flags, and explains potential risks in plain English.
   - **Explicit Non-Guarantee Disclaimer:** Prominently communicates across API payloads and UI views that scam detection is an educational tool and is **NOT guaranteed**. Prominently links to National Cyber Crime portal (**1930** / **cybercrime.gov.in**).

---

## The Nine Core Application Modules

1. **Dashboard:** Central financial command center, net balance, safe-to-spend gauge, and resilience summary.
2. **Transactions:** Ledger tracking with category classification, search/filtering, and backend CSV statement ingestion.
3. **Expense Intelligence:** Category-wise spending breakdowns, Needs vs. Wants (50/30/20) analysis, and budget limits.
4. **Cash Flow Forecast:** 30/60/90-day forward liquidity trajectories modeling recurring obligations and daily burn.
5. **Financial Resilience Planner:** Emergency runway countdown (in months), survival buffer targets, and stress-test simulation.
6. **Safe to Spend:** Dynamic real-time calculation of guilt-free discretionary allowance until next income date.
7. **Loans & EMI Intelligence:** Portfolio tracking, reducing-balance amortization schedules, DTI health, and prepayment simulator.
8. **AI Financial Assistant:** Multi-provider conversational financial copilot strictly grounded in deterministic user-scoped platform numbers.
9. **Scam Detector:** AI-powered threat analysis evaluating suspicious messages, SMS alerts, and links with clear risk explanations and non-guarantee notices.
