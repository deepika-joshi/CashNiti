# CashNiti — Google Stitch UI Export Inspection & Integration Plan

## 1. Executive Summary & Status

In accordance with **Decision 4 (Stitch UI Integration)**, the Google Stitch export has been located and comprehensively inspected at:
```
frontend/stitch-export/
```
The exported bundle contains all nine core application screens plus two complete design specification documents. The exported visual designs and markup serve as the authoritative foundation for the CashNiti frontend.

---

## 2. Comprehensive Export Inspection Report

### 2.1 File Catalog & Directory Inventory
The `frontend/stitch-export/` directory contains eleven subdirectories:

| Directory | Primary Asset | Asset Size | Preview Image | Module Mapping |
|---|---|---|---|---|
| `dashboard/` | `code.html` | 44,709 bytes | `screen.png` (435 KB) | Module 1: Dashboard |
| `transactions/` | `code.html` | 71,736 bytes | `screen.png` (510 KB) | Module 2: Transactions |
| `expense_intelligence/` | `code.html` | 51,691 bytes | `screen.png` (344 KB) | Module 3: Expense Intelligence |
| `cash_flow_forecast/` | `code.html` | 65,420 bytes | `screen.png` (334 KB) | Module 4: Cash Flow Forecast |
| `financial_resilience_planner/` | `code.html` | 60,188 bytes | `screen.png` (320 KB) | Module 5: Financial Resilience Planner |
| `safe_to_spend/` | `code.html` | 58,423 bytes | `screen.png` (299 KB) | Module 6: Safe to Spend |
| `loans_and_emi_intelligence/` | `code.html` | 73,046 bytes | `screen.png` (307 KB) | Module 7: Loans & EMI Intelligence |
| `ai_financial_assistant/` | `code.html` | 49,564 bytes | `screen.png` (395 KB) | Module 8: AI Financial Assistant |
| `scam_detector/` | `code.html` | 65,068 bytes | `screen.png` (409 KB) | Module 9: Scam Detector |
| `lavender_minimalist_fintech/` | `DESIGN.md` | 12,884 bytes | — | Design System Token Master (Active) |
| `vedic_minimalist_fintech/` | `DESIGN.md` | 12,007 bytes | — | Alternative Design Tokens |

### 2.2 Framework & Build Tooling in Export
- **Export Format:** Standalone semantic **HTML5** documents.
- **Package Manager / Dependencies:** The export does not contain a `package.json` or build scripts. It uses runtime CDN scripts:
  - `<script src="https://cdn.tailwindcss.com"></script>` with an embedded `<script id="tailwind-config">` configuration block.
  - Google Fonts CDN for typography: `Inter:wght@400;500;600;700`.
  - Google Fonts CDN for icons: `Material Symbols Outlined`.
- **Active Design Theme:** **Lavender Minimalist FinTech** (defined in `lavender_minimalist_fintech/DESIGN.md` and embedded in the Tailwind config of all 9 screens).

### 2.3 Shared Layout Shell Architecture
Every single `code.html` file includes an identical, shared outer shell layout:
1. **Persistent Sidebar (`<aside class="fixed left-0 top-0 h-full w-64 ...">`):**
   - **Header:** Brand logo and text ("MoneyMentor AI Finance" — will be adapted to "CashNiti").
   - **Navigation Menu (`<nav>`):** Nine navigation links with `data-path="..."` attributes:
     - `dashboard`
     - `transactions`
     - `expense-intelligence`
     - `cash-flow-forecast`
     - `financial-resilience-planner`
     - `safe-to-spend`
     - `loans-and-emi-intelligence`
     - `ai-financial-assistant`
     - `scam-detector`
   - **Footer:** User identity pill (avatar image, name "Arjun Mehta", email "arjun@example.com", online status indicator).
2. **Persistent Top Bar (`<header class="fixed top-0 left-64 right-0 h-16 ...">`):**
   - Global search input with shortcut hint: `"Search transactions, schemes, EMIs, or ask AI... (Press '/' to focus)"`.
   - Action buttons: "Support", Notification Bell with unread badge.
   - User profile dropdown ("Pro Tier", avatar, expand icon).
3. **Screen Content Canvas (`<main class="w-full pt-16 bg-background-secondary min-h-screen pl-64">`):**
   - Contains the screen-specific KPIs, tables, forms, and SVG visualizations.

### 2.4 Styling System & Design Tokens
All screens use custom Tailwind CSS extensions matching the Lavender theme:
- **Colors:**
  - `primary`: `#6b38d4` (royal purple)
  - `primary-container`: `#8455ef`
  - `surface`: `#fdf8ff`
  - `surface-container-lowest`: `#ffffff`
  - `surface-container`: `#f1ebff`
  - `surface-container-high`: `#ebe5ff`
  - `background`: `#fdf8ff`
  - `background-secondary`: `#F8FAFC`
  - `income-positive`: `#16A34A` (green)
  - `expense-negative`: `#E05252` (red)
  - `warning-alert`: `#F59E0B` (amber)
  - `text-secondary`: `#64748B`
  - `border-subtle`: `#EAE7F2`
- **Spacing Tokens:** `space-xs` (0.25rem), `space-sm` (0.5rem), `space-md` (0.75rem), `space-lg` (1rem), `space-xl` (1.5rem), `gutter` (1rem), `gutter-desktop` (1.5rem), `margin-desktop` (2rem).
- **Typography Scales:** `label-sm` (11px), `label-md` (13px), `body-md` (13px), `body-lg` (15px), `headline-sm` (15px), `headline-md` (18px), `headline-lg` (22px), `metric-md` (18px), `metric-xl` (28px), `display` (30px).

### 2.5 Assets, Fonts & External Resources
- **Fonts:** `Inter` (Google Fonts).
- **Icons:** Google `Material Symbols Outlined`.
- **Images:** External placeholder avatar and logo URLs hosted on Google User Content CDN (`https://lh3.googleusercontent.com/...`). These will be replaced with local assets or dynamic initials avatars.

### 2.6 Routing Implementation in Export
- Exported screens use static HTML links (`<a href="#" data-path="...">`) accompanied by small embedded `<script>` blocks that toggle active CSS classes on the corresponding sidebar link.
- In React, this pattern maps directly to `react-router-dom` `<NavLink>` components inside a persistent `AppLayout`.

### 2.7 Hardcoded Sample Data Present
All nine screens are populated with rich mock data:
- **Dashboard:** Monthly Income (₹40,000, +8.5%), Expenses (₹18,000, 45%), Savings (₹40,000), Safe to Spend (₹6,450).
- **Transactions:** Tabular entries for Swiggy, Amazon, Salary, BESCOM bill, Blinkit, etc.
- **Expense Intelligence:** Donut chart SVG placeholders, category allocations (Food 28%, Rent 40%, etc.), budget meters.
- **Cash Flow Forecast:** 30-day projection timeline, day-by-day projected balances, recurring inflow dots.
- **Financial Resilience:** Runway score "Medium-High (2.7 Months)", essential burn "₹15,000/month", stress sliders.
- **Safe to Spend:** Hero metric "₹6,450 available through Nov 30", 8 days remaining, cushion buffer.
- **Loans & EMI:** Outstanding balance "₹3,84,500 across 2 loans", monthly EMI "₹24,800", prepayment calculator.
- **AI Assistant:** Consultation thread list ("November 2026 Spending", "Prepayment Simulation"), chat dialogue, audit trail button.
- **Scam Detector:** Text paste box, "Dial 1930 / cybercrime.gov.in" hotlink, sample alert scan cards.

### 2.8 API Integrations in Export
- No live backend API connections exist. Actions use JavaScript `alert()` placeholders (e.g. `alert('Exporting verified audit report as encrypted PDF...')`) or non-functioning buttons.

---

## 3. Comparison with Existing React + Vite Frontend

| Dimension | Existing Frontend (`frontend/`) | Stitch Export (`stitch-export/`) | Integration Decision |
|---|---|---|---|
| **Framework** | React 19 + Vite 8.3 | Standalone HTML5 | Port HTML structures into clean React JSX components. |
| **Styling** | Basic CSS (`App.css`, `index.css`) | Tailwind CSS (Lavender FinTech) | Port design tokens from `lavender_minimalist_fintech/DESIGN.md` into `frontend/tailwind.config.js`. |
| **Icons** | None installed | Material Symbols Outlined | Add Material Symbols font to `index.html` or map to `lucide-react`. |
| **Routing** | None (Single `App.jsx`) | Static anchor links (`data-path`) | Install `react-router-dom` and wire to nested routes under `AppLayout`. |
| **Charts** | None | Static SVG placeholders | Replace static SVG elements with responsive Recharts components. |
| **State** | None | Hardcoded HTML strings | Bind view props to TanStack Query hooks fetching from FastAPI `/api/v1`. |

---

## 4. File-by-File Integration Plan

### 4.1 Target Directory Architecture (`frontend/src/`)

```
frontend/src/
├── assets/
│   ├── logo.svg                     # CashNiti brand logo
│   └── icons/
├── components/
│   ├── layout/                      # Persistent Shell Extracted from Stitch
│   │   ├── AppLayout.jsx            # Shell wrapper (<aside> + <header> + <Outlet />)
│   │   ├── Sidebar.jsx              # Navigation links, logo, user profile pill
│   │   └── TopNav.jsx               # Search bar, support, alerts, user menu
│   ├── common/                      # Reusable UI Atoms Extracted from Stitch
│   │   ├── StatCard.jsx             # Standard KPI card (Income, Expense, Savings)
│   │   ├── Button.jsx               # Primary, secondary, icon buttons
│   │   ├── Modal.jsx                # Dialog container for forms/imports
│   │   ├── Badge.jsx                # Risk badges, trend indicators (+8.5%)
│   │   └── SearchInput.jsx          # Global search input with '/' key shortcut
│   └── charts/                      # Recharts Drop-in Replacements for Static SVGs
│       ├── CashFlowAreaChart.jsx    # Replaces static forecast SVG
│       ├── ExpenseDonutChart.jsx    # Replaces static category pie SVG
│       ├── BudgetBarChart.jsx       # Replaces static budget bars
│       └── RunwayGauge.jsx          # Replaces static resilience meter
├── modules/                         # The 9 Feature Modules (1-to-1 Mapping)
│   ├── dashboard/
│   │   ├── DashboardView.jsx        # Extracted from stitch-export/dashboard/code.html
│   │   └── components/
│   ├── transactions/
│   │   ├── TransactionsView.jsx     # Extracted from stitch-export/transactions/code.html
│   │   └── components/
│   │       ├── TransactionTable.jsx
│   │       └── CSVImportModal.jsx
│   ├── expense-intelligence/
│   │   ├── ExpenseIntelligenceView.jsx # Extracted from stitch-export/expense_intelligence/code.html
│   │   └── components/
│   ├── cash-flow/
│   │   ├── CashFlowForecastView.jsx # Extracted from stitch-export/cash_flow_forecast/code.html
│   │   └── components/
│   ├── resilience/
│   │   ├── FinancialResilienceView.jsx # Extracted from stitch-export/financial_resilience_planner/code.html
│   │   └── components/
│   │       └── StressTestSimulator.jsx
│   ├── safe-to-spend/
│   │   ├── SafeToSpendView.jsx      # Extracted from stitch-export/safe_to_spend/code.html
│   │   └── components/
│   ├── loans/
│   │   ├── LoansView.jsx            # Extracted from stitch-export/loans_and_emi_intelligence/code.html
│   │   └── components/
│   │       ├── AmortizationTable.jsx
│   │       └── PrepaymentSimulator.jsx
│   ├── ai-assistant/
│   │   ├── AIAssistantView.jsx      # Extracted from stitch-export/ai_financial_assistant/code.html
│   │   └── components/
│   │       ├── ChatThread.jsx
│   │       └── ConsultationHistory.jsx
│   └── scam-detector/
│       ├── ScamDetectorView.jsx     # Extracted from stitch-export/scam_detector/code.html
│       └── components/
│           └── ScannerForm.jsx
├── services/                        # API Client Layer (FastAPI /api/v1)
│   ├── api.js                       # Axios instance with Bearer token interceptor
│   ├── authService.js
│   ├── dashboardService.js
│   ├── transactionService.js
│   ├── expenseService.js
│   ├── forecastService.js
│   ├── resilienceService.js
│   ├── safeToSpendService.js
│   ├── loanService.js
│   ├── aiService.js
│   └── scamService.js
├── context/
│   ├── AuthContext.jsx              # Current user identity & JWT tokens
│   └── AIProviderContext.jsx        # Selected AI provider (Gemini / Groq / OpenRouter)
├── utils/
│   ├── currency.js                  # formatINR(amount) -> "₹1,000.50"
│   └── date.js
├── App.jsx                          # React Router DOM configuration
└── main.jsx                         # App bootstrap
```

### 4.2 Integration Workflow (When Implementation Commences)

1. **Step 1: Configure Tailwind CSS & Fonts in `frontend/`:**
   - Add Inter font and Material Symbols stylesheet links to `frontend/index.html`.
   - Port all color definitions, font scales, and spacing tokens from `lavender_minimalist_fintech/DESIGN.md` into `frontend/tailwind.config.js`.
2. **Step 2: Extract Reusable Layout Shell:**
   - Create `frontend/src/components/layout/Sidebar.jsx` from the `<aside>` markup, replacing static `<a>` tags with `react-router-dom` `<NavLink>` components.
   - Create `frontend/src/components/layout/TopNav.jsx` from the `<header>` markup.
   - Create `frontend/src/components/layout/AppLayout.jsx` combining Sidebar, TopNav, and `<Outlet />`.
3. **Step 3: Extract & Modularize the 9 Screen Views:**
   - Convert each screen's `<main>` markup into its corresponding React functional component inside `frontend/src/modules/<feature>/<View>.jsx`.
   - Convert HTML attributes to JSX (`class` -> `className`, `onclick` -> `onClick`, `style="..."` -> `style={{ ... }}`).
4. **Step 4: Configure React Router:**
   - Mount all 9 views as child routes in `frontend/src/App.jsx`.
5. **Step 5: Replace Static Charts with Recharts:**
   - Drop in dynamic `ResponsiveContainer` Recharts wrappers matching the exact height, colors, and layout of the Stitch design.
6. **Step 6: Replace Hardcoded Values with Backend API Hooks:**
   - Replace static mock figures with reactive data hooks (`useDashboard()`, `useSafeToSpend()`, `useTransactions()`).
