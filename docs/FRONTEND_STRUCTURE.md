# CashNiti — Frontend Architecture & Structure

## 1. Frontend Technology Stack & Design System

The CashNiti frontend is built upon a modern, high-performance web architecture directly grounded in the **Google Stitch UI export** (`frontend/stitch-export/`):
- **Framework & Bundler:** **React 19** with **Vite** (ES modules, fast HMR).
- **Styling Engine:** **Tailwind CSS** configured with the **Lavender Minimalist FinTech** design token system from `lavender_minimalist_fintech/DESIGN.md`.
- **Typography:** **Inter** font family (`wght@400;500;600;700`).
- **Iconography:** **Material Symbols Outlined** (Google Fonts) and **Lucide React**.
- **Data Visualization:** **Recharts** (composable SVG charting library providing dynamic drop-in replacements for static Stitch SVG mockups).
- **Routing:** **React Router DOM v6 / v7** implementing persistent shell navigation.
- **State Management Architecture (Decision 5 - Finalised):**
  - **Server State (TanStack React Query):** All backend API data fetching, asynchronous caching, background synchronization, and automatic cache invalidation upon ledger updates.
  - **Shared UI State (React Context):** Client-only, application-wide UI state (`AuthContext`, `AIProviderContext`, `ToastContext`).
  - **Component State:** Standard React `useState` and `useReducer` for isolated local UI interactions.

---

## 2. Directory Structure (`frontend/src/`)

```
frontend/src/
├── assets/                  # Local brand assets, icons, and logo SVGs
│   └── logo.svg             # CashNiti primary logo
├── components/              # Shared, Reusable UI Components Extracted from Stitch
│   ├── layout/              # Persistent Application Shell
│   │   ├── AppLayout.jsx    # Shell containing Sidebar, TopNav, and <Outlet />
│   │   ├── Sidebar.jsx      # Fixed 256px sidebar with 9 navigation routes & user badge
│   │   └── TopNav.jsx       # Fixed 64px header with search bar, support, and notifications
│   ├── common/              # Atomic UI elements extracted from Stitch
│   │   ├── Button.jsx       # Primary, secondary, icon button variants
│   │   ├── Modal.jsx        # Accessible dialog wrapper for forms and CSV import
│   │   ├── StatCard.jsx     # Standardized KPI card (Metric, Label, Trend badge)
│   │   ├── Badge.jsx        # Pill badges (Live Sync, AI Active, Emergency)
│   │   ├── LoadingSkeleton.jsx # Shimmer skeletons for data loading states
│   │   └── ErrorBoundary.jsx   # Error boundary for component fault tolerance
│   └── charts/              # Dynamic Recharts Wrappers Replacing Static Stitch SVGs
│       ├── CashFlowAreaChart.jsx   # Multi-horizon gradient area chart
│       ├── ExpenseDonutChart.jsx   # Donut chart for category spending distribution
│       ├── BudgetBarChart.jsx      # Bar chart comparing budget limits vs. actual spend
│       └── RunwayGauge.jsx         # Semi-circular resilience runway gauge
├── modules/                 # The Nine Reusable Feature Modules (1-to-1 Stitch Mapping)
│   ├── dashboard/
│   │   ├── DashboardView.jsx       # Extracted from stitch-export/dashboard/code.html
│   │   └── components/             # Dashboard-specific KPI cards and recent feed
│   ├── transactions/
│   │   ├── TransactionsView.jsx    # Extracted from stitch-export/transactions/code.html
│   │   └── components/
│   │       ├── TransactionTable.jsx
│   │       ├── FilterBar.jsx
│   │       └── CSVImportModal.jsx  # Multipart file upload sending CSV to Python backend
│   ├── expense-intelligence/
│   │   ├── ExpenseIntelligenceView.jsx # Extracted from stitch-export/expense_intelligence/code.html
│   │   └── components/
│   │       ├── NeedsWantsBreakdown.jsx
│   │       └── BudgetProgressList.jsx
│   ├── cash-flow/
│   │   ├── CashFlowForecastView.jsx # Extracted from stitch-export/cash_flow_forecast/code.html
│   │   └── components/
│   │       ├── ForecastHorizonToggle.jsx
│   │       └── ScheduledObligationsTimeline.jsx
│   ├── resilience/
│   │   ├── FinancialResilienceView.jsx # Extracted from stitch-export/financial_resilience_planner/code.html
│   │   └── components/
│   │       ├── RunwayMeter.jsx
│   │       └── StressTestSimulator.jsx
│   ├── safe-to-spend/
│   │   ├── SafeToSpendView.jsx     # Extracted from stitch-export/safe_to_spend/code.html
│   │   └── components/
│   │       ├── HeroAllowanceCard.jsx
│   │       └── DeductionsDrawer.jsx
│   ├── loans/
│   │   ├── LoansView.jsx           # Extracted from stitch-export/loans_and_emi_intelligence/code.html
│   │   └── components/
│   │       ├── LoanPortfolioCard.jsx
│   │       ├── AmortizationScheduleTable.jsx
│   │       └── PrepaymentSimulator.jsx
│   ├── ai-assistant/
│   │   ├── AIAssistantView.jsx     # Extracted from stitch-export/ai_financial_assistant/code.html
│   │   └── components/
│   │       ├── ConsultationHistory.jsx
│   │       ├── ChatThread.jsx
│   │       └── ProviderSelector.jsx # Switch between Gemini, Groq, OpenRouter
│   └── scam-detector/
│       ├── ScamDetectorView.jsx    # Extracted from stitch-export/scam_detector/code.html
│       └── components/
│           ├── ThreatScannerInput.jsx
│           ├── RiskScoreBadge.jsx
│           ├── AIExplanationBox.jsx # Plain-English threat analysis & non-guarantee disclaimer
│           └── EmergencyHelplineCard.jsx # Dial 1930 hotline & cybercrime.gov.in
├── services/                # API Client Services (FastAPI /api/v1)
│   ├── api.js              # Central Axios instance with Bearer JWT interceptor
│   ├── authService.js      # User registration, login, profile endpoints
│   ├── dashboardService.js # Dashboard summary & alerts
│   ├── transactionService.js # CRUD & Backend CSV import endpoint
│   ├── expenseService.js   # Analytics & budgets
│   ├── forecastService.js  # Cash flow projections
│   ├── resilienceService.js # Runway & stress test
│   ├── safeToSpendService.js # StS allowances
│   ├── loanService.js      # Loan portfolio & amortization
│   ├── aiService.js        # Multi-provider AI chat & insights
│   └── scamService.js      # AI threat analysis endpoint
├── context/                 # Global Shared UI State (React Context)
│   ├── AuthContext.jsx     # Current user profile and JWT token storage
│   ├── AIProviderContext.jsx # Selected AI provider (Gemini / Groq / OpenRouter)
│   └── ToastContext.jsx    # Global non-blocking notification toasts
├── hooks/                  # TanStack React Query Hooks (Server State Cache)
│   ├── useDashboard.js     # Query ['dashboard'], invalidates on tx mutation
│   ├── useTransactions.js  # Query ['transactions', page, filters]
│   ├── useForecast.js      # Query ['forecast', days]
│   ├── useSafeToSpend.js   # Query ['safe-to-spend']
│   ├── useLoans.js         # Query ['loans']
│   └── useAI.js            # Mutation for chat and scam analysis
├── utils/                  # Formatting and Calculation Helpers
│   ├── currency.js         # formatINR(amount) -> "₹1,000.50" (Paise strictly abstracted)
│   ├── date.js             # ISO date formatters & relative time strings
│   └── validators.js       # Form validation schemas
├── App.jsx                 # Route definition & provider configuration
└── main.jsx                # Application bootstrap
```

---

## 3. Application Routing Architecture

The routing structure mirrors the navigation paths defined in the Stitch UI export (`data-path` attributes):

| Route Path | View Component | Module | Navigation Label |
|---|---|---|---|
| `/` or `/dashboard` | `DashboardView` | Module 1 | Dashboard |
| `/transactions` | `TransactionsView` | Module 2 | Transactions |
| `/expense-intelligence` | `ExpenseIntelligenceView` | Module 3 | Expense Intelligence |
| `/cash-flow-forecast` | `CashFlowForecastView` | Module 4 | Cash Flow Forecast |
| `/financial-resilience-planner` | `FinancialResilienceView` | Module 5 | Financial Resilience Planner |
| `/safe-to-spend` | `SafeToSpendView` | Module 6 | Safe to Spend |
| `/loans-and-emi-intelligence` | `LoansView` | Module 7 | Loans & EMI Intelligence |
| `/ai-financial-assistant` | `AIAssistantView` | Module 8 | AI Financial Assistant |
| `/scam-detector` | `ScamDetectorView` | Module 9 | Scam Detector |
| `/login` | `LoginView` | Auth | Sign In |
| `/register` | `RegisterView` | Auth | Create Account |
| `*` | `NotFoundView` | 404 | Page Not Found |

---

## 4. State Management Integration (Decision 5)

### 4.1 Server State with TanStack Query
All API interaction is wrapped in typed React Query hooks:
- **Automatic Background Refetching:** Ensures the dashboard reflects real-time ledger updates.
- **Granular Cache Keys:**
  - `['transactions', { page, limit, filter }]`
  - `['dashboard', 'summary']`
  - `['safe-to-spend', 'current']`
  - `['expenses', 'breakdown', { month, year }]`
  - `['forecast', { days }]`
- **Cache Invalidation Workflow:**
  When a new transaction is added or a CSV statement is processed:
  ```javascript
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: ['transactions'] });
  queryClient.invalidateQueries({ queryKey: ['dashboard'] });
  queryClient.invalidateQueries({ queryKey: ['safe-to-spend'] });
  queryClient.invalidateQueries({ queryKey: ['expenses'] });
  queryClient.invalidateQueries({ queryKey: ['forecast'] });
  ```

### 4.2 Shared UI State with React Context
Used strictly for client-side cross-cutting UI needs:
1. `AuthContext`: Tracks JWT token in `localStorage`, user details, and provides `login()`, `logout()`, `register()`.
2. `AIProviderContext`: Allows the user to select their active AI provider (`gemini`, `groq`, `openrouter`), persisting choice locally.
3. `ToastContext`: Displays toast notifications for asynchronous actions (e.g., CSV upload completion, error messages).

---

## 5. CSV Ingestion UI Architecture (Decision 6)
- The `CSVImportModal` component presents a clean drag-and-drop file target.
- On file drop, it dispatches a `multipart/form-data` request directly to `POST /api/v1/transactions/import-csv`.
- The frontend renders an upload progress bar and then parses the structured backend response:
  - Displays total rows parsed, successful records imported, duplicate transactions skipped, and any parsing warnings.
  - Automatically triggers TanStack Query cache invalidation to refresh the ledger table and dashboard cards.

---

## 6. AI Scam Detector UI Architecture (Decision 7)
- The `ScamDetectorView` contains a text area for pasting SMS, emails, or links.
- Submits content to `POST /api/v1/scam-detector/analyze`.
- Renders:
  - Prominent **Risk Score Gauge** (Green for Low, Amber for Medium, Red for High/Critical).
  - **AI Explanation Box:** Plain-English description of the detected deceptive tactics and red flags.
  - **Mandatory Disclaimer Banner:** *"Notice: AI scam analysis is an educational assessment tool and is NOT guaranteed. Always verify with official financial institutions."*
  - **Direct Emergency Contact:** One-click dial button for National Cyber Crime Helpline **1930** and link to `cybercrime.gov.in`.
