import React from 'react';
import { NavLink } from 'react-router-dom';

const mainNavigation = [
  { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { path: '/transactions', label: 'Transactions', icon: 'receipt_long' },
  { path: '/expense-intelligence', label: 'Expense Intelligence', icon: 'donut_large' },
  { path: '/cash-flow-forecast', label: 'Cash Flow Forecast', icon: 'trending_up' },
  { path: '/financial-resilience-planner', label: 'Financial Resilience', icon: 'shield_with_heart' },
  { path: '/safe-to-spend', label: 'Safe to Spend', icon: 'account_balance_wallet' },
  { path: '/loans-and-emi-intelligence', label: 'Loans & EMI', icon: 'credit_score' },
];

const intelligentAgents = [
  { path: '/ai-financial-assistant', label: 'AI Assistant', icon: 'smart_toy' },
  { path: '/scam-detector', label: 'Scam Detector', icon: 'policy' },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-lowest z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col h-full">
        {/* Brand Header */}
        <div className="h-16 px-space-xl flex items-center gap-space-sm bg-surface-container-lowest">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-on-primary font-bold text-sm shadow-xs">
            <span className="material-symbols-outlined text-[20px]">account_balance</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight leading-none">
              CashNiti
            </span>
            <span className="font-label-sm text-label-sm text-primary font-semibold tracking-wider uppercase">
              AI Finance
            </span>
          </div>
        </div>

        {/* Section Header */}
        <div className="px-space-md py-space-sm">
          <div className="px-space-md py-space-xs font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
            Navigation
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-space-md space-y-1 overflow-y-auto">
          {mainNavigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-space-md px-space-md py-2.5 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-surface-container-high text-primary font-semibold'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-label-md text-label-md'
                }`
              }
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}

          <div className="pt-space-sm pb-space-xs px-space-md">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              Intelligent Agents
            </span>
          </div>

          {intelligentAgents.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-space-md px-space-md py-2.5 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-surface-container-high text-primary font-semibold'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-label-md text-label-md'
                }`
              }
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User Profile Mini Bar */}
        <div className="p-space-md m-space-md rounded-xl bg-surface-container-low flex items-center gap-space-md">
          <img
            alt="Profile"
            className="w-9 h-9 rounded-full object-cover shadow-sm"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuATTQTqVciEbHm51AzXq2FZ4d-T1PNZR5hvw_9cTPGl79Uz-fexARU30pIwVOihnJtLmpa2JIHDjDwj92Ihl_eRtiadWZMZj7faIQVSRWnTlrLq7iO1olRZvDSjez5f0HUDLVgKbHQefWhZKrvOPfKstJOUxmsuEOCHnGaoft2ph-GI-UZPE1QXvIHrQcnVCCds1Cgflfv-g7MpAU4TCKcVFXtjsDmOR247SteEm98"
          />
          <div className="flex flex-col min-w-0 flex-1">
            <span className="font-headline-sm text-headline-sm text-on-surface truncate leading-tight">
              Arjun Mehta
            </span>
            <span className="font-caption text-caption text-text-secondary truncate leading-tight">
              arjun@example.com
            </span>
          </div>
          <span className="w-2 h-2 rounded-full bg-income-positive"></span>
        </div>
      </div>
    </aside>
  );
}
