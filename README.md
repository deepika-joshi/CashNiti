# CashNiti (कैशनिति)

> **Resilience-First Personal Finance Platform for Indian Households**
> *Turning defensive financial management into proactive wealth and runway security.*

---

## Overview

**CashNiti** is an intelligent personal finance platform engineered specifically for modern Indian earners, digital-first households, and investors. Built upon deterministic financial logic, localized Indian banking conventions (₹, Lakhs & Crores, UPI, NACH, reducing-balance EMIs), and multi-provider AI intelligence, CashNiti bridges the gap between passive expense tracking and actionable financial resilience.

The user interface is powered by Google Stitch's **Lavender Minimalist FinTech** design system, providing a calm, data-dense, distraction-free environment.

---

## System Architecture & Tech Stack

```
CashNiti/
├── frontend/                # React 19 + Vite 8 + Tailwind CSS v4 SPA
│   ├── src/
│   │   ├── components/      # Shared layout (Sidebar, Header, MainLayout)
│   │   ├── modules/         # 9 converted Stitch feature modules
│   │   ├── App.jsx          # Route configuration & code splitting
│   │   ├── index.css        # Tailwind CSS v4 @theme design tokens
│   │   └── main.jsx         # React application entry point
│   ├── stitch-export/       # Authoritative Google Stitch UI designs
│   ├── package.json         # Frontend dependencies & scripts
│   └── vite.config.js       # Vite + Tailwind v4 plugin configuration
│
├── backend/                 # Python FastAPI REST API
│   ├── .venv/               # Isolated Python virtual environment
│   ├── main.py              # FastAPI application entry point with CORS
│   ├── requirements.txt     # Python dependencies (FastAPI, Uvicorn)
│   └── .env.example         # Backend environment variables template
│
├── docs/                    # Technical architecture & specifications (11 files)
├── .gitignore               # Multi-language Git exclusion rules
└── README.md                # Project documentation & setup guide (this file)
```

### Core Technologies

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite 8, Tailwind CSS v4, React Router 7, TanStack React Query 5, Axios, Recharts 3, Lucide React, Google Fonts (`Inter`), Material Symbols Outlined |
| **Backend** | Python 3.15, FastAPI, Uvicorn, Pydantic, Starlette (SQLite, SQLAlchemy, Alembic planned for Phase 3) |
| **Design System** | Google Stitch "Lavender Minimalist FinTech" design tokens (`#6b38d4` primary, `#fdf8ff` surface, tabular figures, 4px/8px rhythm) |
| **Precision** | 64-bit integer subunits (Paise) in storage, Python `Decimal` in calculation, standard UI currency abstraction |

---

## The Nine Core Application Modules

All nine modules have been converted from Google Stitch screens into modular React components with active routing:

1. **Dashboard** (`/`, `/dashboard`): Central financial command center, net cash balance, safe-to-spend gauge, and resilience summary.
2. **Transactions** (`/transactions`): Searchable, filterable transaction ledger with sliding "Add Transaction" drawer and multi-format export.
3. **Expense Intelligence** (`/expense-intelligence`): Category spending breakdown, spend velocity tracking, top merchants, and subscription audit.
4. **Cash Flow Forecast** (`/cash-flow-forecast`): 30/60/90-day liquidity projections, scheduled inflow/outflow timeline, and cash event simulator.
5. **Financial Resilience Planner** (`/financial-resilience-planner`): Emergency fund health gauge (months of runway), monthly burn analysis, and scenario stress-testing.
6. **Safe to Spend** (`/safe-to-spend`): Dynamic daily discretionary allowance calculator with real-time "What If" purchase risk simulator.
7. **Loans & EMI Intelligence** (`/loans-and-emi-intelligence`): Debt portfolio tracker, reducing-balance EMI calculator engine, and prepayment optimizer.
8. **AI Financial Assistant** (`/ai-financial-assistant`): Actuarial copilot interface with deterministic computation cards and prompt suggestion chips.
9. **Scam Detector** (`/scam-detector`): Phishing and social engineering threat analyzer with risk scores, attack scenario library, and case studies.

---

## Quick Start Guide (Windows PowerShell)

### Prerequisites

- **Node.js**: v20+ installed ([nodejs.org](https://nodejs.org/))
- **Python**: v3.11+ installed ([python.org](https://www.python.org/))

---

### 1. Backend Setup & Startup

Open a Windows PowerShell terminal from the project root directory:

```powershell
# Navigate to backend directory
Set-Location backend

# Activate existing virtual environment
.\.venv\Scripts\Activate.ps1

# (Optional) Verify or install dependencies
pip install -r requirements.txt

# Create local environment file from template
Copy-Item .env.example .env

# Start the FastAPI development server with auto-reload
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

> **API Verification:**
> - Root endpoint: [http://127.0.0.1:8000/](http://127.0.0.1:8000/)
> - Health check: [http://127.0.0.1:8000/api/health](http://127.0.0.1:8000/api/health)
> - Interactive OpenAPI docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

### 2. Frontend Setup & Startup

Open a second Windows PowerShell terminal from the project root directory:

```powershell
# Navigate to frontend directory
Set-Location frontend

# (Optional) Create local environment file from template
Copy-Item .env.example .env.local

# Start the Vite development server with Hot Module Replacement (HMR)
npm run dev
```

> **Application Verification:**
> - Open [http://localhost:5173/](http://localhost:5173/) in your web browser.
> - Use the sidebar navigation to move between all nine screens.

---

### 3. Production Build Verification

To verify that the frontend compiles cleanly for production:

```powershell
# From the project root
npm --prefix frontend run build
```

---

## Key Architectural Decisions (Confirmed & Finalized)

1. **Multi-User Foundation & Data Isolation:** Individual user registration/login via JWT; every database record is isolated by `user_id`.
2. **Monetary Precision & UI Abstraction:** Normal currency format displayed in UI (₹); stored as 64-bit integer Paise; calculated using Python `Decimal`.
3. **Multi-Provider AI Architecture:** Modular adapters for Gemini, Groq, and OpenRouter with central backend key management and free-tier prioritization.
4. **Google Stitch UI Integration:** Authoritative visual designs preserved from `frontend/stitch-export/` and structured into `frontend/src/modules/`.
5. **Frontend State Architecture:** TanStack Query for server cache and API requests; React Context for local UI state.
6. **Backend CSV Statement Processing:** Bank CSV statements validated, parsed, and atomically persisted by Python FastAPI.
7. **AI Scam Detection:** Threat evaluation with plain-English risk explanations and an explicit non-guarantee educational disclaimer.

---

## Detailed Documentation

Comprehensive documentation is available in the [`docs/`](file:///c:/Users/Hp/Documents/CashNiti/docs/) folder:

- [docs/README.md](file:///c:/Users/Hp/Documents/CashNiti/docs/README.md) — Documentation index
- [docs/PROJECT_OVERVIEW.md](file:///c:/Users/Hp/Documents/CashNiti/docs/PROJECT_OVERVIEW.md) — Mission and scope
- [docs/ARCHITECTURE.md](file:///c:/Users/Hp/Documents/CashNiti/docs/ARCHITECTURE.md) — System architecture & data flow
- [docs/DATABASE_DESIGN.md](file:///c:/Users/Hp/Documents/CashNiti/docs/DATABASE_DESIGN.md) — SQLite schema & ER diagram
- [docs/API_SPECIFICATION.md](file:///c:/Users/Hp/Documents/CashNiti/docs/API_SPECIFICATION.md) — REST API endpoints
- [docs/FINANCIAL_LOGIC.md](file:///c:/Users/Hp/Documents/CashNiti/docs/FINANCIAL_LOGIC.md) — Mathematical formulas & algorithms
- [docs/FRONTEND_STRUCTURE.md](file:///c:/Users/Hp/Documents/CashNiti/docs/FRONTEND_STRUCTURE.md) — React & Tailwind layout structure
- [docs/DEVELOPMENT_ROADMAP.md](file:///c:/Users/Hp/Documents/CashNiti/docs/DEVELOPMENT_ROADMAP.md) — 13-phase implementation plan
- [docs/OPEN_DECISIONS.md](file:///c:/Users/Hp/Documents/CashNiti/docs/OPEN_DECISIONS.md) — Finalized decisions log

---

## License

Private repository. All rights reserved.
