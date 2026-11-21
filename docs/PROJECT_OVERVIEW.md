# CashNiti — Project Overview

## 1. Executive Summary

**CashNiti** is an intelligent, resilience-first personal finance platform tailored for Indian individuals, professionals, and households. Navigating personal finances in India involves dealing with multi-channel payment ecosystems (UPI, net banking, cards, cash), high-cost short-term loans, aggressive marketing of consumer debt (EMIs), unpredictable cash flow cycles, and an increasing proliferation of financial scams (phishing, fake loan apps, QR code fraud).

CashNiti is built on a fundamental guiding philosophy: **Deterministic Financial Truth, Augmented by Explanatory AI**. All balances, forecasts, debt schedules, emergency runways, and safe-to-spend limits are computed using strict, verified mathematical formulas in the backend. Artificial Intelligence (AI) does not guess, estimate, or hallucinate financial numbers; instead, it synthesizes deterministic data to provide contextual explanations, strategic guidance, and heuristic-based threat detection.

---

## 2. Problem Statement & Market Context

1. **Information Fragmentation:** Users manage funds across multiple bank accounts, wallets, and credit cards without a single unified view of their actual net worth and liquidity.
2. **The "Safe-to-Spend" Dilemma:** A user with ₹50,000 in their bank account often overspends, forgetting that ₹32,000 is already committed to rent, upcoming loan EMIs, and utility bills before their next payday.
3. **Debt Traps & Hidden Interest:** Many users take zero-cost EMIs, personal loans, or credit card rollovers without understanding the true annualized cost, amortization schedules, or the compounding benefits of pre-payment.
4. **Fragile Emergency Preparedness:** Very few individuals calculate their genuine monthly survival burn rate or maintain an emergency fund calibrated to real fixed obligations.
5. **Financial Scams & Social Engineering:** Indian consumers are heavily targeted by fake UPI payment screenshots, malicious APK download links, deceptive investment schemes, and fraudulent customer care contacts.

---

## 3. Product Mission & Value Proposition

CashNiti bridges the gap between passive bookkeeping and active financial resilience:

- **Total Liquidity Clarity:** Knowing exactly how much money is genuinely available to spend today without jeopardizing tomorrow's commitments (**Safe to Spend**).
- **Proactive Cash Flow Shield:** Projecting 30, 60, and 90-day balances to anticipate cash crunches weeks before they occur (**Cash Flow Forecast**).
- **Debt Optimization:** Visualizing amortizations, identifying high-interest debt burdens, and simulating pre-payment payoffs (**Loans & EMI Intelligence**).
- **Resilience Engineering:** Structuring emergency reserves based on essential non-discretionary expenses (**Financial Resilience Planner**).
- **Scam Protection:** Serving as a preliminary security filter against suspicious messages, payment requests, and fraudulent links (**Scam Detector**).
- **Intelligent Financial Advisory:** An AI financial assistant grounded in the user's verified financial facts (**AI Financial Assistant**).

---

## 4. The Nine Core Application Modules

CashNiti is structured into nine functional modules:

| # | Module Name | Primary Objective |
|---|-------------|-------------------|
| 1 | **Dashboard** | Centralized financial cockpit displaying liquidity KPIs, net cash balance, safe-to-spend gauge, resilience score, and quick actions. |
| 2 | **Transactions** | Robust transaction tracking supporting manual entry, categorization, search/filtering, and structured CSV statement import. |
| 3 | **Expense Intelligence** | Granular analytics breaking down spending by category, essential vs. discretionary tags, month-over-month variances, and budget limits. |
| 4 | **Cash Flow Forecast** | Multi-horizon forward projection (30/60/90 days) modeling recurring income, fixed bills, EMIs, and historical daily spend rates. |
| 5 | **Financial Resilience Planner** | Emergency runway calculator measuring survival duration in months, liquid asset coverage, and stress-test scenarios. |
| 6 | **Safe to Spend** | Real-time calculation of discretionary allowance remaining until next income date after reserving for obligations and savings targets. |
| 7 | **Loans & EMI Intelligence** | Portfolio of active loans, EMI amortization schedules, Debt-to-Income (DTI) ratio, and pre-payment simulator. |
| 8 | **AI Financial Assistant** | Natural language conversational interface grounded in deterministic platform data, providing actionable financial guidance. |
| 9 | **Scam Detector** | Heuristic scanner analyzing suspicious SMS, emails, text messages, UPI IDs, or APK links for known financial scam patterns. |

---

## 5. Scope Definition: MVP vs. Future Scope

To ensure a high-quality, secure, and deliverable product, CashNiti strictly defines its MVP boundaries:

### In-Scope for MVP
- **Manual Data Entry:** Fast, keyboard-friendly recording of income and expenses.
- **CSV Statement Import:** Structured parsing of bank/card statement CSV files with auto-categorization heuristics.
- **Deterministic Financial Calculators:** Rigorous Python backend logic using INR (₹) precision calculations (paise-based integer arithmetic / Decimal).
- **Dynamic Cash Flow Projections:** Mathematical modeling of cash trajectories based on fixed commitments and average burn rate.
- **Loan Amortization & Simulation:** Precise reducing-balance EMI calculation and pre-payment impact modeling.
- **Heuristic Scam Detection:** Rule-based and pattern-matching analysis of suspicious text snippets with safety scorecards.
- **Grounded AI Conversations:** AI assistant that strictly interprets computed backend metrics and answers user queries without inventing figures.
- **Offline-First / Local Storage:** SQLite database providing zero-setup, high-speed, local data ownership.
- **Responsive Web UI:** Modern interface styled according to Google Stitch UI designs using React, Vite, Tailwind CSS, and Recharts.

### Explicitly Excluded from MVP (Future Roadmap)
- **Live Bank Account Aggregator Integrations:** No direct Account Aggregator (AA) ecosystem, Plaid, or Setu API integrations.
- **UPI Integration & Payment Execution:** No live fund transfers, UPI collect requests, or wallet transactions.
- **Live Loan / Credit Sourcing:** No partnerships or live lending marketplace integrations.
- **Guaranteed / Cryptographic Scam Elimination:** Scam detector provides educational risk indicators and heuristic warnings, not an absolute guarantee.
- **Multi-Currency Support:** MVP strictly standardizes on Indian Rupees (INR - ₹).

---

## 6. Core Technical Philosophy & Constraints

1. **Deterministic Logic vs. Generative AI:**
   - **Math is Backend Law:** No LLM is ever used to calculate a balance, compute an EMI, determine a safe-to-spend limit, or calculate a savings rate.
   - **AI as Explainer:** Generative AI is used exclusively for linguistic explanation, personalized summaries, habit insights, and natural language query interpretation.
2. **Financial Precision:**
   - Floating-point arithmetic (`0.1 + 0.2 = 0.30000000000000004`) is strictly forbidden for financial calculations.
   - Calculations use Python's `decimal.Decimal` and database records store currency as integer **Paise** (1 INR = 100 Paise) to guarantee precision.
3. **UI Fidelity via Google Stitch:**
   - The user interface design has already been created in Google Stitch across nine dedicated screens.
   - The frontend architecture is designed to integrate the exported Stitch UI components into the existing React + Vite foundation without rewriting screens from scratch.
4. **Architectural Separation:**
   - Clean boundaries between API routers, Pydantic validation schemas, business services, math engines, database models, and AI adapters.

---

## 7. Project Directory Structure

```
CashNiti/
├── backend/
│   ├── .venv/                   # Python virtual environment
│   ├── main.py                  # Existing FastAPI entry point (preserved)
│   ├── app/                     # Proposed modular application structure
│   │   ├── api/                 # API routers for 9 modules
│   │   ├── core/                # Configuration, security, exceptions
│   │   ├── db/                  # Database session, base models, migrations
│   │   ├── models/              # SQLAlchemy ORM models
│   │   ├── schemas/             # Pydantic v2 validation models
│   │   ├── services/            # Business logic & AI clients
│   │   └── calculations/        # Deterministic math engine (EMI, StS, Runway)
│   └── tests/                   # Backend unit and integration tests
├── frontend/
│   ├── node_modules/            # Installed node dependencies
│   ├── public/                  # Static assets & icons
│   ├── src/                     # React application source
│   │   ├── assets/              # Static media
│   │   ├── components/          # Shared UI components (Navbar, Sidebar, Cards)
│   │   ├── modules/             # Nine application module views
│   │   ├── services/            # API client and endpoints
│   │   ├── hooks/               # Custom hooks
│   │   ├── utils/               # Currency (INR) and date formatters
│   │   ├── App.jsx              # Root component & routing
│   │   └── main.jsx             # React entry point
│   ├── package.json             # Frontend dependencies & scripts
│   └── vite.config.js           # Vite build configuration
├── docs/                        # Complete technical and architecture documentation
│   ├── README.md                # Documentation master index
│   ├── PROJECT_OVERVIEW.md      # This document
│   ├── REQUIREMENTS.md          # Functional & non-functional requirements
│   ├── ARCHITECTURE.md          # System architecture, data flow & security
│   ├── DATABASE_DESIGN.md       # SQLite schema, relationships & constraints
│   ├── API_SPECIFICATION.md     # REST API endpoints & schemas
│   ├── FINANCIAL_LOGIC.md       # Precision formulas & edge cases
│   ├── FRONTEND_STRUCTURE.md    # React component & state architecture
│   ├── STITCH_INTEGRATION_PLAN.md # Stitch UI export integration roadmap
│   ├── DEVELOPMENT_ROADMAP.md   # Phased implementation plan
│   └── OPEN_DECISIONS.md        # Architecture decisions pending confirmation
└── .gitignore                   # Git exclusion rules
```
