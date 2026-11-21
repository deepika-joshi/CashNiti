import React from 'react';

export default function DashboardPage() {
  return (
    <>
<div className="flex flex-col w-full">
{/* Top Command & Perspective Header */}
<div className="px-margin-desktop py-space-xl flex flex-col md:flex-row md:items-center md:justify-between gap-space-lg">
<div className="flex flex-col">
<div className="flex items-center gap-space-sm">
<span className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Good morning, Arjun</span>
<span className="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[14px] mr-1 text-primary" style={{"fontVariationSettings":"'FILL' 1"}}>auto_awesome</span>
          AI Active
        </span>
</div>
<p className="font-body-md text-body-md text-text-secondary mt-1">Here is your real-time financial health summary for October 2024.</p>
</div>
{/* Controls & Global Actions */}
<div className="flex items-center gap-space-md flex-wrap">
{/* Period Selector Dropdown */}
<div className="relative">
<button className="h-10 px-space-md bg-surface-container-lowest rounded-lg text-on-surface font-label-md text-label-md flex items-center gap-space-sm shadow-sm hover:bg-lavender-subtle transition-all" id="period-dropdown-btn" type="button">
<span className="material-symbols-outlined text-[18px] text-primary">calendar_month</span>
<span>October 2024</span>
<span className="material-symbols-outlined text-[18px] text-on-surface-variant">keyboard_arrow_down</span>
</button>
</div>
{/* Export Report */}
<button className="h-10 px-space-md bg-surface-container-lowest rounded-lg text-on-surface font-label-md text-label-md flex items-center gap-space-sm shadow-sm hover:bg-lavender-subtle hover:text-primary transition-all" type="button">
<span className="material-symbols-outlined text-[18px] text-text-secondary">file_download</span>
<span className="hidden sm:inline">Download Report</span>
</button>
{/* Add Transaction Action */}
<button className="h-10 px-space-lg bg-primary hover:bg-primary-container text-on-primary rounded-lg font-label-md text-label-md flex items-center gap-space-xs shadow-sm hover:shadow transition-all" type="button">
<span className="material-symbols-outlined text-[18px]">add</span>
<span>Add Transaction</span>
</button>
</div>
</div>
{/* Main Content Flow Container */}
<div className="px-margin-desktop pb-margin-desktop flex flex-col gap-space-xl">
{/* Section 1: Financial Summary Cards Grid */}
<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter-desktop">
{/* Card 1: Monthly Income */}
<div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-text-secondary uppercase tracking-wider">Monthly Income</span>
<div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
</div>
</div>
<div className="mt-space-md">
<div className="font-metric-xl text-metric-xl text-on-surface tracking-tight font-bold">₹40,000</div>
<div className="mt-space-sm flex items-center gap-space-xs">
<span className="inline-flex items-center px-2 py-0.5 rounded-full bg-green-50 text-income-positive font-label-sm text-label-sm font-semibold">
<span className="material-symbols-outlined text-[14px] mr-0.5">arrow_upward</span>
              +8.5%
            </span>
<span className="font-caption text-caption text-text-secondary">vs last month</span>
</div>
</div>
</div>
{/* Card 2: Monthly Expenses */}
<div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-text-secondary uppercase tracking-wider">Monthly Expenses</span>
<div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-expense-negative">
<span className="material-symbols-outlined text-[20px]">credit_card</span>
</div>
</div>
<div className="mt-space-md">
<div className="font-metric-xl text-metric-xl text-on-surface tracking-tight font-bold">₹18,000</div>
<div className="mt-space-sm flex items-center gap-space-xs">
<span className="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold">
              45%
            </span>
<span className="font-caption text-caption text-text-secondary">of income used</span>
</div>
</div>
</div>
{/* Card 3: Total Savings */}
<div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-text-secondary uppercase tracking-wider">Total Savings</span>
<div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[20px]">savings</span>
</div>
</div>
<div className="mt-space-md">
<div className="font-metric-xl text-metric-xl text-on-surface tracking-tight font-bold">₹40,000</div>
<div className="mt-space-sm flex items-center gap-space-xs">
<span className="inline-flex items-center px-2 py-0.5 rounded-full bg-green-50 text-income-positive font-label-sm text-label-sm font-semibold">
              +₹12,000
            </span>
<span className="font-caption text-caption text-text-secondary">added this month</span>
</div>
</div>
</div>
{/* Card 4: Safe to Spend */}
<div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-text-secondary uppercase tracking-wider">Safe to Spend</span>
<div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[20px]" style={{"fontVariationSettings":"'FILL' 1"}}>shield_with_heart</span>
</div>
</div>
<div className="mt-space-md">
<div className="font-metric-xl text-metric-xl text-primary tracking-tight font-bold">₹10,000</div>
<div className="mt-space-sm">
<span className="inline-flex items-center px-2 py-0.5 rounded-md bg-surface-container text-primary font-caption text-caption font-medium">
              After upcoming bills &amp; EMIs
            </span>
</div>
</div>
</div>
</section>
{/* Section 2: AI Financial Insights Showcase Card */}
<section className="bg-lavender-subtle rounded-xl p-space-xl shadow-sm relative overflow-hidden">
<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg relative z-10">
<div className="flex items-start gap-space-md max-w-4xl">
<div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm mt-0.5">
<span className="material-symbols-outlined text-[22px]" style={{"fontVariationSettings":"'FILL' 1"}}>psychology</span>
</div>
<div className="flex flex-col">
<div className="flex items-center gap-space-sm flex-wrap">
<h3 className="font-headline-sm text-headline-sm text-on-surface">AI Financial Mentor Insight</h3>
<span className="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container-highest text-primary font-label-sm text-label-sm">High Impact</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant mt-1.5 leading-relaxed">
              You've saved <strong className="text-on-surface font-semibold">55%</strong> of your income so far this month, which is <strong className="text-income-positive font-semibold">₹6,000 higher</strong> than your 3-month average! However, your dining &amp; food delivery expenses spiked by <span className="text-expense-negative font-semibold">28%</span> over the weekend. We recommend setting a weekend cap of <span className="text-on-surface font-semibold">₹2,500</span> to preserve your Safe to Spend balance at <span className="text-primary font-semibold">₹10,000</span>.
            </p>
</div>
</div>
<div className="flex items-center gap-space-sm shrink-0 pl-14 lg:pl-0">
<button className="h-9 px-space-md bg-primary hover:bg-primary-container text-on-primary rounded-lg font-label-md text-label-md flex items-center gap-space-xs transition-colors shadow-sm" type="button">
<span className="material-symbols-outlined text-[16px]">tune</span>
<span>Apply Weekend Cap</span>
</button>
<button className="h-9 px-space-md bg-surface-container-lowest hover:bg-surface-container text-on-surface rounded-lg font-label-md text-label-md transition-colors shadow-sm" type="button">
<span>Review Food Transactions</span>
</button>
</div>
</div>
{/* Decorative subtle light background aura */}
<div className="absolute -right-10 -bottom-10 w-44 h-44 bg-surface-container-highest/60 rounded-full blur-2xl pointer-events-none"></div>
</section>
{/* Section 3: Spending Analytics (2-Column Grid) */}
<section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop">
{/* Column A: Monthly Income vs Expenses Chart (7 cols) */}
<div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-space-xl shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-space-lg">
<div className="flex flex-col">
<h3 className="font-headline-md text-headline-md text-on-surface">Income vs Expenses</h3>
<span className="font-caption text-caption text-text-secondary mt-0.5">May 2024 – Oct 2024 (Last 6 Months)</span>
</div>
{/* Legend Indicators */}
<div className="flex items-center gap-space-md font-label-sm text-label-sm">
<div className="flex items-center gap-1.5">
<span className="w-3 h-3 rounded-full bg-primary"></span>
<span className="text-on-surface font-medium">Income</span>
</div>
<div className="flex items-center gap-1.5">
<span className="w-3 h-3 rounded-full bg-slate-300"></span>
<span className="text-text-secondary font-medium">Expenses</span>
</div>
</div>
</div>
{/* Comparative Bar Chart Graphic */}
<div className="w-full pt-4">
<div className="grid grid-cols-6 gap-2 sm:gap-6 items-end h-56 pb-2">
{/* May */}
<div className="flex flex-col items-center gap-2 h-full justify-end group">
<div className="w-full flex items-end justify-center gap-1.5 h-44">
<div className="w-1/2 max-w-[20px] bg-primary rounded-t-sm h-[75%] transition-all group-hover:opacity-90 relative" title="Income: ₹36,000"></div>
<div className="w-1/2 max-w-[20px] bg-slate-200 rounded-t-sm h-[48%] transition-all group-hover:bg-slate-300 relative" title="Expenses: ₹21,000"></div>
</div>
<span className="font-label-sm text-label-sm text-text-secondary">May</span>
</div>
{/* Jun */}
<div className="flex flex-col items-center gap-2 h-full justify-end group">
<div className="w-full flex items-end justify-center gap-1.5 h-44">
<div className="w-1/2 max-w-[20px] bg-primary rounded-t-sm h-[80%] transition-all group-hover:opacity-90" title="Income: ₹38,000"></div>
<div className="w-1/2 max-w-[20px] bg-slate-200 rounded-t-sm h-[52%] transition-all group-hover:bg-slate-300" title="Expenses: ₹22,500"></div>
</div>
<span className="font-label-sm text-label-sm text-text-secondary">Jun</span>
</div>
{/* Jul */}
<div className="flex flex-col items-center gap-2 h-full justify-end group">
<div className="w-full flex items-end justify-center gap-1.5 h-44">
<div className="w-1/2 max-w-[20px] bg-primary rounded-t-sm h-[78%] transition-all group-hover:opacity-90" title="Income: ₹37,500"></div>
<div className="w-1/2 max-w-[20px] bg-slate-200 rounded-t-sm h-[45%] transition-all group-hover:bg-slate-300" title="Expenses: ₹19,800"></div>
</div>
<span className="font-label-sm text-label-sm text-text-secondary">Jul</span>
</div>
{/* Aug */}
<div className="flex flex-col items-center gap-2 h-full justify-end group">
<div className="w-full flex items-end justify-center gap-1.5 h-44">
<div className="w-1/2 max-w-[20px] bg-primary rounded-t-sm h-[82%] transition-all group-hover:opacity-90" title="Income: ₹39,000"></div>
<div className="w-1/2 max-w-[20px] bg-slate-200 rounded-t-sm h-[49%] transition-all group-hover:bg-slate-300" title="Expenses: ₹21,200"></div>
</div>
<span className="font-label-sm text-label-sm text-text-secondary">Aug</span>
</div>
{/* Sep */}
<div className="flex flex-col items-center gap-2 h-full justify-end group">
<div className="w-full flex items-end justify-center gap-1.5 h-44">
<div className="w-1/2 max-w-[20px] bg-primary rounded-t-sm h-[80%] transition-all group-hover:opacity-90" title="Income: ₹38,500"></div>
<div className="w-1/2 max-w-[20px] bg-slate-200 rounded-t-sm h-[46%] transition-all group-hover:bg-slate-300" title="Expenses: ₹20,100"></div>
</div>
<span className="font-label-sm text-label-sm text-text-secondary">Sep</span>
</div>
{/* Oct (Active) */}
<div className="flex flex-col items-center gap-2 h-full justify-end group">
<div className="w-full flex items-end justify-center gap-1.5 h-44 relative">
{/* AI Highlight pill */}
<div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-surface-container px-1.5 py-0.5 rounded text-[10px] text-primary font-semibold whitespace-nowrap shadow-xs">
                    Cur. mo
                  </div>
<div className="w-1/2 max-w-[20px] bg-primary rounded-t-sm h-[92%] transition-all" title="Income: ₹40,000"></div>
<div className="w-1/2 max-w-[20px] bg-tertiary-container rounded-t-sm h-[40%] transition-all" title="Expenses: ₹18,000"></div>
</div>
<span className="font-label-sm text-label-sm text-primary font-bold">Oct</span>
</div>
</div>
</div>
</div>
{/* Metric Footer Summary */}
<div className="pt-space-md mt-space-md bg-lavender-subtle rounded-lg p-space-md flex items-center justify-between flex-wrap gap-space-sm">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[20px]">insights</span>
<span className="font-label-md text-label-md text-on-surface">Average Savings Rate: <strong className="text-income-positive">52.8%</strong></span>
</div>
<span className="font-caption text-caption text-text-secondary">Lowest expenditure month in 2024</span>
</div>
</div>
{/* Column B: Expense Category Breakdown (5 cols) */}
<div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-space-xl shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-space-md">
<div>
<h3 className="font-headline-md text-headline-md text-on-surface">Expense Categories</h3>
<p className="font-caption text-caption text-text-secondary">Breakdown of ₹18,000 spent in Oct</p>
</div>
<button className="text-primary hover:text-tertiary font-label-sm text-label-sm" type="button">View Details</button>
</div>
{/* Category Progress Stacks */}
<div className="space-y-space-md mt-space-lg">
{/* Item 1: Rent */}
<div>
<div className="flex items-center justify-between font-label-md text-label-md mb-1.5">
<span className="flex items-center gap-2 text-on-surface font-medium">
<span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                  Housing &amp; Rent
                </span>
<div className="flex items-center gap-space-sm">
<span className="font-caption text-caption text-text-secondary">44%</span>
<span className="font-body-md text-body-md text-on-surface font-semibold">₹8,000</span>
</div>
</div>
<div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
<div className="bg-primary h-full rounded-full" style={{"width":"44.4%"}}></div>
</div>
</div>
{/* Item 2: Groceries */}
<div>
<div className="flex items-center justify-between font-label-md text-label-md mb-1.5">
<span className="flex items-center gap-2 text-on-surface font-medium">
<span className="w-2.5 h-2.5 rounded-full bg-income-positive"></span>
                  Groceries &amp; Essentials
                </span>
<div className="flex items-center gap-space-sm">
<span className="font-caption text-caption text-text-secondary">23%</span>
<span className="font-body-md text-body-md text-on-surface font-semibold">₹4,200</span>
</div>
</div>
<div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
<div className="bg-income-positive h-full rounded-full" style={{"width":"23.3%"}}></div>
</div>
</div>
{/* Item 3: Food & Dining */}
<div>
<div className="flex items-center justify-between font-label-md text-label-md mb-1.5">
<span className="flex items-center gap-2 text-on-surface font-medium">
<span className="w-2.5 h-2.5 rounded-full bg-warning-alert"></span>
                  Food &amp; Dining (Spike Alert)
                </span>
<div className="flex items-center gap-space-sm">
<span className="font-caption text-caption text-text-secondary">16%</span>
<span className="font-body-md text-body-md text-on-surface font-semibold">₹2,800</span>
</div>
</div>
<div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
<div className="bg-warning-alert h-full rounded-full" style={{"width":"15.6%"}}></div>
</div>
</div>
{/* Item 4: Utilities */}
<div>
<div className="flex items-center justify-between font-label-md text-label-md mb-1.5">
<span className="flex items-center gap-2 text-on-surface font-medium">
<span className="w-2.5 h-2.5 rounded-full bg-text-secondary"></span>
                  Utilities &amp; Internet
                </span>
<div className="flex items-center gap-space-sm">
<span className="font-caption text-caption text-text-secondary">10%</span>
<span className="font-body-md text-body-md text-on-surface font-semibold">₹1,800</span>
</div>
</div>
<div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
<div className="bg-text-secondary h-full rounded-full" style={{"width":"10%"}}></div>
</div>
</div>
{/* Item 5: Entertainment & Misc */}
<div>
<div className="flex items-center justify-between font-label-md text-label-md mb-1.5">
<span className="flex items-center gap-2 text-on-surface font-medium">
<span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
                  Entertainment &amp; Misc
                </span>
<div className="flex items-center gap-space-sm">
<span className="font-caption text-caption text-text-secondary">7%</span>
<span className="font-body-md text-body-md text-on-surface font-semibold">₹1,200</span>
</div>
</div>
<div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
<div className="bg-tertiary h-full rounded-full" style={{"width":"6.7%"}}></div>
</div>
</div>
</div>
</div>
<div className="mt-space-lg pt-space-md flex items-center justify-between text-on-surface-variant font-caption text-caption">
<span>Fixed Outflows: ₹9,800</span>
<span>Discretionary Outflows: ₹8,200</span>
</div>
</div>
</section>
{/* Section 4: Financial Planning & Cash Flow (3-Column Grid) */}
<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter-desktop">
{/* Card 1: Upcoming Commitments & Bills */}
<div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-space-md">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-warning-alert text-[22px]">calendar_clock</span>
<h3 className="font-headline-md text-headline-md text-on-surface">Upcoming Bills</h3>
</div>
<span className="font-caption text-caption text-text-secondary">3 commitments</span>
</div>
<div className="space-y-space-md mt-space-md">
{/* Commitment 1 */}
<div className="p-space-sm rounded-lg bg-lavender-subtle hover:bg-surface-container-low transition-colors flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary font-bold text-[11px]">
                  28
                </div>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface font-semibold truncate max-w-[130px]">HDFC Personal Loan</span>
<span className="font-caption text-caption text-expense-negative font-medium">Due in 3 days</span>
</div>
</div>
<div className="font-body-md text-body-md text-on-surface font-bold">₹4,500</div>
</div>
{/* Commitment 2 */}
<div className="p-space-sm rounded-lg bg-lavender-subtle hover:bg-surface-container-low transition-colors flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary font-bold text-[11px]">
                  01
                </div>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface font-semibold truncate max-w-[130px]">High-speed Fiber</span>
<span className="font-caption text-caption text-income-positive font-medium">Auto-debit active</span>
</div>
</div>
<div className="font-body-md text-body-md text-on-surface font-bold">₹999</div>
</div>
{/* Commitment 3 */}
<div className="p-space-sm rounded-lg bg-lavender-subtle hover:bg-surface-container-low transition-colors flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary font-bold text-[11px]">
                  05
                </div>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface font-semibold truncate max-w-[130px]">Electricity (BESCOM)</span>
<span className="font-caption text-caption text-text-secondary">Upcoming</span>
</div>
</div>
<div className="font-body-md text-body-md text-on-surface font-bold">₹1,450</div>
</div>
</div>
</div>
<div className="pt-space-md mt-space-md flex items-center justify-between">
<div className="flex flex-col">
<span className="font-caption text-caption text-text-secondary">Total Committed</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-bold">₹6,949</span>
</div>
<button className="h-9 px-space-md bg-surface-container-high hover:bg-primary hover:text-on-primary text-primary rounded-lg font-label-md text-label-md transition-all" type="button">
            Pay All Due
          </button>
</div>
</div>
{/* Card 2: Emergency Fund Target & Progress */}
<div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-space-md">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-primary text-[22px]">health_and_safety</span>
<h3 className="font-headline-md text-headline-md text-on-surface">Emergency Fund</h3>
</div>
<span className="px-2 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm font-semibold">20% Done</span>
</div>
<div className="mt-space-md">
<div className="flex items-baseline justify-between">
<span className="font-metric-xl text-metric-xl text-on-surface font-bold">₹40,000</span>
<span className="font-body-md text-body-md text-text-secondary">Target: ₹2,00,000</span>
</div>
{/* Milestone Progress Gauge */}
<div className="w-full bg-surface-container-high h-3 rounded-full overflow-hidden mt-space-md">
<div className="bg-primary h-full rounded-full transition-all duration-500" style={{"width":"20%"}}></div>
</div>
{/* Milestones Labels */}
<div className="grid grid-cols-3 text-center mt-space-sm font-caption text-caption text-text-secondary">
<div className="text-left font-medium text-primary">1 Month (Reached)</div>
<div>3 Months</div>
<div className="text-right">6 Months Goal</div>
</div>
<div className="mt-space-lg p-space-md rounded-lg bg-lavender-subtle">
<p className="font-body-md text-body-md text-on-surface leading-snug">
                On track to complete your full 6-month safety net in <strong className="text-primary font-semibold">14 months</strong> at your planned pace of ₹12,000/mo.
              </p>
</div>
</div>
</div>
<div className="pt-space-md mt-space-md flex items-center justify-between">
<button className="text-primary hover:text-tertiary font-label-md text-label-md flex items-center gap-1 font-semibold" type="button">
<span>Adjust Monthly Allocation</span>
<span className="material-symbols-outlined text-[16px]">chevron_right</span>
</button>
</div>
</div>
{/* Card 3: Weekly Spending Velocity & Rhythm */}
<div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-space-md">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-primary text-[22px]">show_chart</span>
<h3 className="font-headline-md text-headline-md text-on-surface">Weekly Velocity</h3>
</div>
<span className="font-caption text-caption text-text-secondary">Oct Cycles</span>
</div>
<div className="space-y-space-md mt-space-md">
{/* Week 1 */}
<div>
<div className="flex items-center justify-between font-label-md text-label-md mb-1">
<span className="text-on-surface font-medium">Week 1 (Oct 1-7)</span>
<span className="text-on-surface font-semibold">₹4,100</span>
</div>
<div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
<div className="bg-primary-container h-full rounded-full" style={{"width":"55%"}}></div>
</div>
</div>
{/* Week 2 */}
<div>
<div className="flex items-center justify-between font-label-md text-label-md mb-1">
<span className="text-on-surface font-medium">Week 2 (Oct 8-14)</span>
<span className="text-on-surface font-semibold">₹3,900</span>
</div>
<div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
<div className="bg-primary-container h-full rounded-full" style={{"width":"52%"}}></div>
</div>
</div>
{/* Week 3 */}
<div>
<div className="flex items-center justify-between font-label-md text-label-md mb-1">
<span className="text-on-surface font-medium flex items-center gap-1">
<span>Week 3 (Oct 15-21)</span>
<span className="material-symbols-outlined text-[14px] text-warning-alert">trending_up</span>
</span>
<span className="text-expense-negative font-semibold">₹5,800</span>
</div>
<div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
<div className="bg-warning-alert h-full rounded-full" style={{"width":"82%"}}></div>
</div>
</div>
{/* Week 4 */}
<div>
<div className="flex items-center justify-between font-label-md text-label-md mb-1">
<span className="text-text-secondary font-medium">Week 4 (Forecast)</span>
<span className="text-text-secondary font-semibold">₹4,200</span>
</div>
<div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
<div className="bg-slate-300 h-full rounded-full stroke-dasharray" style={{"width":"58%"}}></div>
</div>
</div>
</div>
</div>
<div className="pt-space-md mt-space-md bg-lavender-subtle p-space-sm rounded-lg flex items-center gap-space-sm">
<span className="material-symbols-outlined text-primary text-[18px]">notifications_active</span>
<span className="font-caption text-caption text-on-surface-variant">
            Burn rate safely under the ₹5,000 weekly budget threshold.
          </span>
</div>
</div>
</section>
{/* Section 5: Recent Verified Transactions Ledger Preview */}
<section className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
<div className="p-space-xl flex items-center justify-between flex-wrap gap-space-md">
<div className="flex flex-col">
<h3 className="font-headline-md text-headline-md text-on-surface">Recent Ledger Records</h3>
<span className="font-caption text-caption text-text-secondary">Transactions seamlessly categorized via UPI and banking feeds</span>
</div>
<div className="flex items-center gap-space-sm">
<button className="h-9 px-space-md bg-lavender-subtle hover:bg-surface-container text-on-surface rounded-lg font-label-md text-label-md transition-colors" type="button">
            All Categories
          </button>
<button className="h-9 px-space-md bg-primary hover:bg-primary-container text-on-primary rounded-lg font-label-md text-label-md transition-colors" type="button">
            View All Ledger
          </button>
</div>
</div>
{/* Clean Minimal Table */}
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-lavender-subtle text-text-secondary font-label-sm text-label-sm uppercase tracking-wider h-10">
<th className="px-space-xl">Transaction Entity</th>
<th className="px-space-md">Category</th>
<th className="px-space-md">Rail / Method</th>
<th className="px-space-md">Timestamp</th>
<th className="px-space-xl text-right">Amount</th>
</tr>
</thead>
<tbody className="divide-y-0 font-body-md text-body-md text-on-surface">
{/* Row 1: Income */}
<tr className="h-14 hover:bg-lavender-subtle/50 transition-colors">
<td className="px-space-xl flex items-center gap-space-md py-3">
<div className="w-8 h-8 rounded-full bg-green-50 text-income-positive flex items-center justify-center">
<span className="material-symbols-outlined text-[18px]">business</span>
</div>
<div className="flex flex-col">
<span className="font-semibold text-on-surface">TechCorp India Pvt Ltd</span>
<span className="font-caption text-caption text-text-secondary">Monthly Salary Credit</span>
</div>
</td>
<td className="px-space-md">
<span className="px-2 py-0.5 rounded-full bg-green-50 text-income-positive font-label-sm text-label-sm">Primary Income</span>
</td>
<td className="px-space-md">
<span className="px-2 py-0.5 rounded-md bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">NEFT</span>
</td>
<td className="px-space-md font-caption text-caption text-text-secondary">
                Oct 01, 09:30 AM
              </td>
<td className="px-space-xl text-right font-metric-md text-metric-md text-income-positive font-semibold">
                +₹40,000
              </td>
</tr>
{/* Row 2: Expense Dining */}
<tr className="h-14 hover:bg-lavender-subtle/50 transition-colors">
<td className="px-space-xl flex items-center gap-space-md py-3">
<div className="w-8 h-8 rounded-full bg-red-50 text-expense-negative flex items-center justify-center">
<span className="material-symbols-outlined text-[18px]">restaurant</span>
</div>
<div className="flex flex-col">
<span className="font-semibold text-on-surface">Swiggy Gourmet</span>
<span className="font-caption text-caption text-text-secondary">Weekend dinner order</span>
</div>
</td>
<td className="px-space-md">
<span className="px-2 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm">Food &amp; Dining</span>
</td>
<td className="px-space-md">
<span className="px-2 py-0.5 rounded-md bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">UPI</span>
</td>
<td className="px-space-md font-caption text-caption text-text-secondary">
                Oct 20, 08:45 PM
              </td>
<td className="px-space-xl text-right font-metric-md text-metric-md text-on-surface font-semibold">
                -₹1,240
              </td>
</tr>
{/* Row 3: Essentials */}
<tr className="h-14 hover:bg-lavender-subtle/50 transition-colors">
<td className="px-space-xl flex items-center gap-space-md py-3">
<div className="w-8 h-8 rounded-full bg-surface-container text-primary flex items-center justify-center">
<span className="material-symbols-outlined text-[18px]">local_grocery_store</span>
</div>
<div className="flex flex-col">
<span className="font-semibold text-on-surface">Blinkit Grocery Store</span>
<span className="font-caption text-caption text-text-secondary">Weekly pantry replenishment</span>
</div>
</td>
<td className="px-space-md">
<span className="px-2 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm">Groceries</span>
</td>
<td className="px-space-md">
<span className="px-2 py-0.5 rounded-md bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">UPI</span>
</td>
<td className="px-space-md font-caption text-caption text-text-secondary">
                Oct 18, 11:15 AM
              </td>
<td className="px-space-xl text-right font-metric-md text-metric-md text-on-surface font-semibold">
                -₹1,850
              </td>
</tr>
{/* Row 4: Savings Auto-Transfer */}
<tr className="h-14 hover:bg-lavender-subtle/50 transition-colors">
<td className="px-space-xl flex items-center gap-space-md py-3">
<div className="w-8 h-8 rounded-full bg-surface-container-highest text-primary flex items-center justify-center">
<span className="material-symbols-outlined text-[18px]">savings</span>
</div>
<div className="flex flex-col">
<span className="font-semibold text-on-surface">Emergency Fund Deposit</span>
<span className="font-caption text-caption text-text-secondary">Automated recurring transfer</span>
</div>
</td>
<td className="px-space-md">
<span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-primary font-label-sm text-label-sm">Savings Goal</span>
</td>
<td className="px-space-md">
<span className="px-2 py-0.5 rounded-md bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">NACH</span>
</td>
<td className="px-space-md font-caption text-caption text-text-secondary">
                Oct 05, 10:00 AM
              </td>
<td className="px-space-xl text-right font-metric-md text-metric-md text-primary font-semibold">
                ₹12,000
              </td>
</tr>
</tbody>
</table>
</div>
</section>
</div>
</div>

    </>
  );
}
