import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';

const DashboardPage = lazy(() => import('./modules/dashboard/DashboardPage'));
const TransactionsPage = lazy(() => import('./modules/transactions/TransactionsPage'));
const ExpenseIntelligencePage = lazy(() => import('./modules/expense-intelligence/ExpenseIntelligencePage'));
const CashFlowPage = lazy(() => import('./modules/cash-flow/CashFlowPage'));
const ResiliencePage = lazy(() => import('./modules/resilience/ResiliencePage'));
const SafeToSpendPage = lazy(() => import('./modules/safe-to-spend/SafeToSpendPage'));
const LoansPage = lazy(() => import('./modules/loans/LoansPage'));
const AIAssistantPage = lazy(() => import('./modules/ai-assistant/AIAssistantPage'));
const ScamDetectorPage = lazy(() => import('./modules/scam-detector/ScamDetectorPage'));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] w-full">
      <div className="flex flex-col items-center gap-space-md">
        <div className="w-10 h-10 border-3 border-surface-container-high border-t-primary rounded-full animate-spin"></div>
        <span className="font-label-md text-label-md text-text-secondary">Loading view...</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="expense-intelligence" element={<ExpenseIntelligencePage />} />
            <Route path="cash-flow-forecast" element={<CashFlowPage />} />
            <Route path="cash-flow" element={<CashFlowPage />} />
            <Route path="financial-resilience-planner" element={<ResiliencePage />} />
            <Route path="resilience" element={<ResiliencePage />} />
            <Route path="safe-to-spend" element={<SafeToSpendPage />} />
            <Route path="loans-and-emi-intelligence" element={<LoansPage />} />
            <Route path="loans" element={<LoansPage />} />
            <Route path="ai-financial-assistant" element={<AIAssistantPage />} />
            <Route path="ai-assistant" element={<AIAssistantPage />} />
            <Route path="scam-detector" element={<ScamDetectorPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
