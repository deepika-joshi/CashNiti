import React from 'react';

export default function ExpenseIntelligencePage() {
  return (
    <>
<div className="flex flex-col w-full">
<div className="p-gutter-desktop space-y-gutter-desktop max-w-[1400px] mx-auto w-full">
{/* Screen Title & Top Control Ribbon */}
<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
<div className="space-y-space-xs">
<div className="flex items-center gap-space-sm">
<h1 className="font-display text-display text-on-surface tracking-tight">Expense Intelligence</h1>
<span className="inline-flex items-center px-2 py-0.5 rounded-full text-label-sm font-label-sm bg-primary/10 text-primary">
            Recorded Ledger
          </span>
</div>
<p className="font-body-md text-body-md text-text-secondary">
          Understand your spending patterns and discover where your money goes.
        </p>
</div>
{/* Controls bar */}
<div className="flex flex-wrap items-center gap-space-sm">
{/* Granularity switcher */}
<div className="inline-flex p-1 bg-surface-container-lowest rounded-lg shadow-sm">
<button className="px-3.5 py-1.5 rounded text-label-md font-label-md text-text-secondary hover:text-on-surface transition-colors" type="button">
            Weekly
          </button>
<button className="px-3.5 py-1.5 rounded text-label-md font-label-md bg-primary text-on-primary shadow-sm transition-all" type="button">
            Monthly
          </button>
<button className="px-3.5 py-1.5 rounded text-label-md font-label-md text-text-secondary hover:text-on-surface transition-colors" type="button">
            Yearly
          </button>
</div>
{/* Date range selector */}
<button className="inline-flex items-center gap-space-xs px-3.5 py-2 rounded-lg bg-surface-container-lowest shadow-sm text-on-surface hover:bg-surface-container transition-colors" type="button">
<span className="material-symbols-outlined text-[18px] text-primary">calendar_month</span>
<span className="font-label-md text-label-md font-semibold">November 2026</span>
<span className="material-symbols-outlined text-[18px] text-text-secondary">expand_more</span>
</button>
{/* Quick Action: Export Report */}
<button className="inline-flex items-center gap-space-xs px-3.5 py-2 rounded-lg bg-surface-container-lowest shadow-sm text-on-surface hover:bg-surface-container transition-colors" type="button">
<span className="material-symbols-outlined text-[18px] text-primary">download</span>
<span className="font-label-md text-label-md font-medium">Export Report</span>
</button>
</div>
</div>
{/* 1. Spending Overview Stat Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
{/* Card 1: Total Spending */}
<div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-text-secondary">Total Spending</span>
<div className="w-8 h-8 rounded-lg bg-lavender-subtle flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
</div>
</div>
<div className="my-space-md">
<div className="font-metric-xl text-metric-xl text-on-surface tracking-tight">₹24,850</div>
<div className="flex items-center gap-1.5 mt-1">
<span className="inline-flex items-center px-2 py-0.5 rounded-full text-label-sm font-label-sm bg-[#F0FDF4] text-income-positive">
<span className="material-symbols-outlined text-[14px] mr-0.5">arrow_downward</span> -4.2% MoM
            </span>
<span className="font-caption text-caption text-text-secondary">₹1,100 saved</span>
</div>
</div>
<div className="text-caption font-caption text-text-secondary">Baseline budget: ₹28,000</div>
</div>
{/* Card 2: Average Daily Spending */}
<div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-text-secondary">Average Daily</span>
<div className="w-8 h-8 rounded-lg bg-lavender-subtle flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[18px]">today</span>
</div>
</div>
<div className="my-space-md">
<div className="font-metric-xl text-metric-xl text-on-surface tracking-tight">₹828<span className="font-body-md text-body-md text-text-secondary font-normal"> / day</span></div>
<div className="w-full bg-surface-container rounded-full h-1.5 mt-2">
<div className="bg-primary h-1.5 rounded-full" style={{"width":"92%"}}></div>
</div>
</div>
<div className="flex items-center justify-between text-caption font-caption text-text-secondary">
<span>Target: ₹900/day</span>
<span className="text-income-positive font-semibold">92% utilized</span>
</div>
</div>
{/* Card 3: Highest Category */}
<div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-text-secondary">Top Category</span>
<div className="w-8 h-8 rounded-lg bg-lavender-subtle flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[18px]">apartment</span>
</div>
</div>
<div className="my-space-md">
<div className="font-metric-xl text-metric-xl text-on-surface tracking-tight truncate">Housing &amp; Rent</div>
<div className="flex items-center gap-space-sm mt-1">
<span className="font-body-md text-body-md font-semibold text-on-surface">₹8,000</span>
<span className="inline-flex items-center px-2 py-0.5 rounded-full text-label-sm font-label-sm bg-surface-container-high text-primary font-medium">
              32.2% of total
            </span>
</div>
</div>
<div className="text-caption font-caption text-text-secondary">Badge: Fixed essential outflow</div>
</div>
{/* Card 4: Month-over-Month Velocity */}
<div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-text-secondary">Trajectory</span>
<div className="w-8 h-8 rounded-lg bg-lavender-subtle flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[18px]">trending_down</span>
</div>
</div>
<div className="my-space-md">
<div className="font-metric-xl text-metric-xl text-income-positive tracking-tight">-4.2%</div>
<div className="flex items-center gap-1.5 mt-1">
<span className="font-caption text-caption text-text-secondary">₹24,850 vs ₹25,950 Oct</span>
</div>
</div>
<div className="flex items-center gap-1 text-caption font-caption text-income-positive">
<span className="material-symbols-outlined text-[14px]">check_circle</span>
<span>Within safe spending zone</span>
</div>
</div>
</div>
{/* 2. Spending Trends & Velocity Comparisons */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
{/* Card 1: Trajectory Chart (2 cols) */}
<div className="lg:col-span-2 bg-surface-container-lowest rounded-xl p-space-xl shadow-sm space-y-space-lg">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
<div>
<h2 className="font-headline-md text-headline-md text-on-surface">Monthly Expense Trajectory &amp; Comparison</h2>
<p className="font-caption text-caption text-text-secondary">Weekly performance: November 2026 vs October 2026</p>
</div>
{/* Legend */}
<div className="flex flex-wrap items-center gap-space-md font-label-sm text-label-sm">
<span className="flex items-center gap-1.5 text-on-surface">
<span className="w-3 h-3 rounded-full bg-primary inline-block"></span>
              Nov 2026 (₹24,850)
            </span>
<span className="flex items-center gap-1.5 text-text-secondary">
<span className="w-3 h-3 rounded-full bg-surface-variant inline-block"></span>
              Oct 2026 (₹25,950)
            </span>
<span className="flex items-center gap-1.5 text-text-secondary">
<span className="w-4 h-0.5 border-t-2 border-dashed border-secondary inline-block"></span>
              Cap (₹7,000/wk)
            </span>
</div>
</div>
{/* Weekly Comparison Visualization */}
<div className="pt-space-md">
<div className="grid grid-cols-4 gap-space-md items-end h-56 pb-6 relative">
{/* Cap guideline horizontal reference */}
<div className="absolute left-0 right-0 top-6 border-b border-dashed border-border-subtle flex items-center justify-end">
<span className="text-caption font-caption text-text-secondary bg-surface-container-lowest px-1 -mt-2.5">₹7,000 target ceiling</span>
</div>
{/* Week 1 */}
<div className="flex flex-col items-center h-full justify-end group">
<div className="font-caption text-caption text-text-secondary mb-1 opacity-0 group-hover:opacity-100 transition-opacity">Nov: ₹6,400</div>
<div className="flex items-end gap-2 w-full max-w-[80px] justify-center h-40">
<div className="w-5 bg-surface-variant rounded-t transition-all group-hover:opacity-80" style={{"height":"72%"}} title="Oct Week 1: ₹6,800"></div>
<div className="w-5 bg-primary rounded-t transition-all group-hover:brightness-110" style={{"height":"68%"}} title="Nov Week 1: ₹6,400"></div>
</div>
<span className="font-label-sm text-label-sm text-on-surface mt-2">W1 (1-7)</span>
<span className="font-caption text-caption text-income-positive">-₹400</span>
</div>
{/* Week 2 */}
<div className="flex flex-col items-center h-full justify-end group">
<div className="font-caption text-caption text-text-secondary mb-1 opacity-0 group-hover:opacity-100 transition-opacity">Nov: ₹5,950</div>
<div className="flex items-end gap-2 w-full max-w-[80px] justify-center h-40">
<div className="w-5 bg-surface-variant rounded-t transition-all group-hover:opacity-80" style={{"height":"66%"}} title="Oct Week 2: ₹6,200"></div>
<div className="w-5 bg-primary rounded-t transition-all group-hover:brightness-110" style={{"height":"63%"}} title="Nov Week 2: ₹5,950"></div>
</div>
<span className="font-label-sm text-label-sm text-on-surface mt-2">W2 (8-14)</span>
<span className="font-caption text-caption text-income-positive">-₹250</span>
</div>
{/* Week 3 (Spike alert) */}
<div className="flex flex-col items-center h-full justify-end group relative">
<span className="absolute top-0 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-warning-alert/15 text-warning-alert whitespace-nowrap">
                Spike Alert
              </span>
<div className="font-caption text-caption text-text-secondary mb-1 opacity-0 group-hover:opacity-100 transition-opacity">Nov: ₹7,100</div>
<div className="flex items-end gap-2 w-full max-w-[80px] justify-center h-40">
<div className="w-5 bg-surface-variant rounded-t transition-all group-hover:opacity-80" style={{"height":"69%"}} title="Oct Week 3: ₹6,450"></div>
<div className="w-5 bg-primary rounded-t transition-all group-hover:brightness-110" style={{"height":"76%"}} title="Nov Week 3: ₹7,100"></div>
</div>
<span className="font-label-sm text-label-sm text-on-surface mt-2">W3 (15-21)</span>
<span className="font-caption text-caption text-expense-negative">+₹650</span>
</div>
{/* Week 4 */}
<div className="flex flex-col items-center h-full justify-end group">
<div className="font-caption text-caption text-text-secondary mb-1 opacity-0 group-hover:opacity-100 transition-opacity">Nov: ₹5,400</div>
<div className="flex items-end gap-2 w-full max-w-[80px] justify-center h-40">
<div className="w-5 bg-surface-variant rounded-t transition-all group-hover:opacity-80" style={{"height":"70%"}} title="Oct Week 4: ₹6,500"></div>
<div className="w-5 bg-primary rounded-t transition-all group-hover:brightness-110" style={{"height":"57%"}} title="Nov Week 4: ₹5,400"></div>
</div>
<span className="font-label-sm text-label-sm text-on-surface mt-2">W4 (22-28)</span>
<span className="font-caption text-caption text-income-positive">-₹1,100</span>
</div>
</div>
</div>
</div>
{/* Card 2: Velocity & Budget Pacing */}
<div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-sm flex flex-col justify-between space-y-space-md">
<div>
<div className="flex items-center justify-between">
<h2 className="font-headline-md text-headline-md text-on-surface">Burn Rate Velocity</h2>
<span className="px-2 py-0.5 rounded text-label-sm font-label-sm bg-[#F0FDF4] text-income-positive">Controlled</span>
</div>
<p className="font-caption text-caption text-text-secondary mt-1">Spend pacing for current cycle</p>
</div>
<div className="p-space-md bg-surface-container-low rounded-lg space-y-space-sm">
<div className="flex justify-between items-baseline">
<span className="font-label-sm text-label-sm text-text-secondary">Current Weekly Burn</span>
<span className="font-headline-sm text-headline-sm text-on-surface">₹5,798 <span className="font-caption text-caption text-text-secondary font-normal">/ wk</span></span>
</div>
<div className="flex justify-between items-baseline">
<span className="font-label-sm text-label-sm text-text-secondary">Planned Target Pace</span>
<span className="font-label-md text-label-md text-text-secondary">₹6,055 / wk</span>
</div>
<div className="flex items-center gap-1.5 text-caption font-caption text-income-positive pt-1">
<span className="material-symbols-outlined text-[16px]">check_circle</span>
<span>Running ₹257/week under maximum allocation</span>
</div>
</div>
<div className="space-y-space-xs">
<div className="flex items-center justify-between text-label-sm font-label-sm">
<span className="text-text-secondary">Monthly Budget Utilized</span>
<span className="font-semibold text-on-surface">88.7% (₹24,850 / ₹28,000)</span>
</div>
<div className="w-full bg-surface-container rounded-full h-2">
<div className="bg-primary h-2 rounded-full" style={{"width":"88.7%"}}></div>
</div>
<div className="flex items-center justify-between text-caption font-caption text-text-secondary pt-0.5">
<span>Cycle Elapsed: 93%</span>
<span className="text-primary font-medium">2 Days Remaining</span>
</div>
</div>
<div className="pt-space-xs">
<div className="p-2.5 rounded-lg bg-lavender-subtle flex items-start gap-2">
<span className="material-symbols-outlined text-primary text-[18px] mt-0.5">insights</span>
<p className="font-caption text-caption text-on-surface leading-tight">
              With 2 days remaining, projected surplus stands at <strong className="text-income-positive font-semibold">₹3,150</strong>.
            </p>
</div>
</div>
</div>
</div>
{/* 3. Category Breakdown & Budget Tracking */}
<div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-sm space-y-space-lg">
<div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
<div>
<h2 className="font-headline-md text-headline-md text-on-surface">Expense Categories Breakdown</h2>
<p className="font-caption text-caption text-text-secondary">
            Comparative performance across 8 monitored operational categories for Nov 2026.
          </p>
</div>
<div className="flex items-center gap-space-sm">
<div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-surface-container-low font-label-sm text-label-sm text-text-secondary">
<span>Total Budget: <strong className="text-on-surface">₹28,000</strong></span>
<span>•</span>
<span>Spent: <strong className="text-on-surface">₹24,850</strong></span>
<span>•</span>
<span className="text-income-positive font-semibold">Remaining: ₹3,150</span>
</div>
<button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container-low text-primary hover:bg-surface-container transition-colors font-label-md text-label-md" type="button">
<span className="material-symbols-outlined text-[16px]">tune</span>
<span>+ Set / Edit Budgets</span>
</button>
</div>
</div>
{/* Categories Table / List */}
<div className="space-y-space-sm">
{/* Category 1: Housing & Rent */}
<div className="p-space-md rounded-lg bg-surface-container-lowest hover:bg-lavender-subtle transition-colors flex flex-col md:flex-row md:items-center justify-between gap-space-md">
<div className="flex items-center gap-space-md min-w-[240px]">
<div className="w-9 h-9 rounded-lg bg-lavender-subtle flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[20px]">apartment</span>
</div>
<div>
<div className="font-headline-sm text-headline-sm text-on-surface">Housing &amp; Rent</div>
<div className="font-caption text-caption text-text-secondary">Fixed monthly rent obligation</div>
</div>
</div>
<div className="flex-1 max-w-md w-full space-y-1">
<div className="flex justify-between text-caption font-caption">
<span className="text-text-secondary">Budget: ₹8,000</span>
<span className="font-semibold text-on-surface">100% on track</span>
</div>
<div className="w-full bg-surface-container rounded-full h-2">
<div className="bg-primary h-2 rounded-full" style={{"width":"100%"}}></div>
</div>
</div>
<div className="flex items-center justify-between md:justify-end gap-space-lg">
<div className="text-right">
<div className="font-metric-md text-metric-md text-on-surface">₹8,000</div>
<span className="font-caption text-caption text-text-secondary">32.2% share</span>
</div>
<span className="px-2 py-0.5 rounded text-label-sm font-label-sm bg-surface-container text-on-surface-variant">Fixed</span>
</div>
</div>
{/* Category 2: EMIs & Loans */}
<div className="p-space-md rounded-lg bg-surface-container-lowest hover:bg-lavender-subtle transition-colors flex flex-col md:flex-row md:items-center justify-between gap-space-md">
<div className="flex items-center gap-space-md min-w-[240px]">
<div className="w-9 h-9 rounded-lg bg-lavender-subtle flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[20px]">account_balance</span>
</div>
<div>
<div className="font-headline-sm text-headline-sm text-on-surface">EMIs &amp; Loans</div>
<div className="font-caption text-caption text-text-secondary">Auto Loan + Personal Device EMI</div>
</div>
</div>
<div className="flex-1 max-w-md w-full space-y-1">
<div className="flex justify-between text-caption font-caption">
<span className="text-text-secondary">Budget: ₹4,500</span>
<span className="font-semibold text-on-surface">100% fixed</span>
</div>
<div className="w-full bg-surface-container rounded-full h-2">
<div className="bg-primary h-2 rounded-full" style={{"width":"100%"}}></div>
</div>
</div>
<div className="flex items-center justify-between md:justify-end gap-space-lg">
<div className="text-right">
<div className="font-metric-md text-metric-md text-on-surface">₹4,500</div>
<span className="font-caption text-caption text-text-secondary">18.1% share</span>
</div>
<span className="px-2 py-0.5 rounded text-label-sm font-label-sm bg-surface-container text-on-surface-variant">Auto-Debit</span>
</div>
</div>
{/* Category 3: Groceries & Essentials */}
<div className="p-space-md rounded-lg bg-surface-container-lowest hover:bg-lavender-subtle transition-colors flex flex-col md:flex-row md:items-center justify-between gap-space-md">
<div className="flex items-center gap-space-md min-w-[240px]">
<div className="w-9 h-9 rounded-lg bg-lavender-subtle flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[20px]">shopping_cart</span>
</div>
<div>
<div className="font-headline-sm text-headline-sm text-on-surface">Groceries &amp; Essentials</div>
<div className="font-caption text-caption text-text-secondary">Supermarkets, Blinkit &amp; Local vendors</div>
</div>
</div>
<div className="flex-1 max-w-md w-full space-y-1">
<div className="flex justify-between text-caption font-caption">
<span className="text-text-secondary">Budget: ₹5,000</span>
<span className="text-income-positive font-semibold">84% used • ₹800 left</span>
</div>
<div className="w-full bg-surface-container rounded-full h-2">
<div className="bg-income-positive h-2 rounded-full" style={{"width":"84%"}}></div>
</div>
</div>
<div className="flex items-center justify-between md:justify-end gap-space-lg">
<div className="text-right">
<div className="font-metric-md text-metric-md text-on-surface">₹4,200</div>
<span className="font-caption text-caption text-text-secondary">16.9% share</span>
</div>
<span className="px-2 py-0.5 rounded text-label-sm font-label-sm bg-[#F0FDF4] text-income-positive">Healthy</span>
</div>
</div>
{/* Category 4: Dining & Food Delivery (SELECTED / EXPANDED STATE) */}
<div className="p-space-md rounded-lg bg-surface-container-high transition-all flex flex-col md:flex-row md:items-center justify-between gap-space-md relative">
<div className="flex items-center gap-space-md min-w-[240px]">
<div className="w-9 h-9 rounded-lg bg-primary text-on-primary flex items-center justify-center shadow-sm">
<span className="material-symbols-outlined text-[20px]">restaurant</span>
</div>
<div>
<div className="flex items-center gap-1.5">
<span className="font-headline-sm text-headline-sm text-on-surface">Dining &amp; Food Delivery</span>
<span className="w-2 h-2 rounded-full bg-primary" title="Category currently selected for drill-down"></span>
</div>
<div className="font-caption text-caption text-text-secondary">Swiggy, Zomato, cafes &amp; restaurants</div>
</div>
</div>
<div className="flex-1 max-w-md w-full space-y-1">
<div className="flex justify-between text-caption font-caption">
<span className="text-text-secondary">Budget: ₹2,500</span>
<span className="text-warning-alert font-semibold">112% used • ₹300 OVER</span>
</div>
<div className="w-full bg-surface-container rounded-full h-2">
<div className="bg-warning-alert h-2 rounded-full" style={{"width":"100%"}}></div>
</div>
</div>
<div className="flex items-center justify-between md:justify-end gap-space-lg">
<div className="text-right">
<div className="font-metric-md text-metric-md text-on-surface font-semibold">₹2,800</div>
<span className="font-caption text-caption text-text-secondary">11.3% share</span>
</div>
<span className="px-2 py-0.5 rounded text-label-sm font-label-sm bg-[#FFFBEB] text-warning-alert font-semibold flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">warning</span> Spike Alert
            </span>
</div>
</div>
{/* Category 5: Utilities & Internet */}
<div className="p-space-md rounded-lg bg-surface-container-lowest hover:bg-lavender-subtle transition-colors flex flex-col md:flex-row md:items-center justify-between gap-space-md">
<div className="flex items-center gap-space-md min-w-[240px]">
<div className="w-9 h-9 rounded-lg bg-lavender-subtle flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[20px]">bolt</span>
</div>
<div>
<div className="font-headline-sm text-headline-sm text-on-surface">Utilities &amp; Internet</div>
<div className="font-caption text-caption text-text-secondary">Power, broadband, mobile postpaid</div>
</div>
</div>
<div className="flex-1 max-w-md w-full space-y-1">
<div className="flex justify-between text-caption font-caption">
<span className="text-text-secondary">Budget: ₹2,600</span>
<span className="text-text-secondary">94% used • ₹151 left</span>
</div>
<div className="w-full bg-surface-container rounded-full h-2">
<div className="bg-primary h-2 rounded-full" style={{"width":"94%"}}></div>
</div>
</div>
<div className="flex items-center justify-between md:justify-end gap-space-lg">
<div className="text-right">
<div className="font-metric-md text-metric-md text-on-surface">₹2,449</div>
<span className="font-caption text-caption text-text-secondary">9.9% share</span>
</div>
<span className="px-2 py-0.5 rounded text-label-sm font-label-sm bg-[#F0FDF4] text-income-positive">Saved ₹350</span>
</div>
</div>
{/* Category 6: Transport & Fuel */}
<div className="p-space-md rounded-lg bg-surface-container-lowest hover:bg-lavender-subtle transition-colors flex flex-col md:flex-row md:items-center justify-between gap-space-md">
<div className="flex items-center gap-space-md min-w-[240px]">
<div className="w-9 h-9 rounded-lg bg-lavender-subtle flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[20px]">local_gas_station</span>
</div>
<div>
<div className="font-headline-sm text-headline-sm text-on-surface">Transport &amp; Fuel</div>
<div className="font-caption text-caption text-text-secondary">Metro card recharges &amp; petrol pump</div>
</div>
</div>
<div className="flex-1 max-w-md w-full space-y-1">
<div className="flex justify-between text-caption font-caption">
<span className="text-text-secondary">Budget: ₹2,000</span>
<span className="text-income-positive font-semibold">72% used • ₹550 left</span>
</div>
<div className="w-full bg-surface-container rounded-full h-2">
<div className="bg-income-positive h-2 rounded-full" style={{"width":"72%"}}></div>
</div>
</div>
<div className="flex items-center justify-between md:justify-end gap-space-lg">
<div className="text-right">
<div className="font-metric-md text-metric-md text-on-surface">₹1,450</div>
<span className="font-caption text-caption text-text-secondary">5.8% share</span>
</div>
<span className="px-2 py-0.5 rounded text-label-sm font-label-sm bg-surface-container text-on-surface-variant">On Plan</span>
</div>
</div>
{/* Category 7: Shopping & Personal */}
<div className="p-space-md rounded-lg bg-surface-container-lowest hover:bg-lavender-subtle transition-colors flex flex-col md:flex-row md:items-center justify-between gap-space-md">
<div className="flex items-center gap-space-md min-w-[240px]">
<div className="w-9 h-9 rounded-lg bg-lavender-subtle flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[20px]">checkroom</span>
</div>
<div>
<div className="font-headline-sm text-headline-sm text-on-surface">Shopping &amp; Personal</div>
<div className="font-caption text-caption text-text-secondary">Apparel, grooming &amp; books</div>
</div>
</div>
<div className="flex-1 max-w-md w-full space-y-1">
<div className="flex justify-between text-caption font-caption">
<span className="text-text-secondary">Budget: ₹1,500</span>
<span className="text-income-positive font-semibold">57% used • ₹650 left</span>
</div>
<div className="w-full bg-surface-container rounded-full h-2">
<div className="bg-income-positive h-2 rounded-full" style={{"width":"57%"}}></div>
</div>
</div>
<div className="flex items-center justify-between md:justify-end gap-space-lg">
<div className="text-right">
<div className="font-metric-md text-metric-md text-on-surface">₹850</div>
<span className="font-caption text-caption text-text-secondary">3.4% share</span>
</div>
<span className="px-2 py-0.5 rounded text-label-sm font-label-sm bg-[#F0FDF4] text-income-positive">Under Cap</span>
</div>
</div>
{/* Category 8: Miscellaneous */}
<div className="p-space-md rounded-lg bg-surface-container-lowest hover:bg-lavender-subtle transition-colors flex flex-col md:flex-row md:items-center justify-between gap-space-md">
<div className="flex items-center gap-space-md min-w-[240px]">
<div className="w-9 h-9 rounded-lg bg-lavender-subtle flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[20px]">category</span>
</div>
<div>
<div className="font-headline-sm text-headline-sm text-on-surface">Other / Miscellaneous</div>
<div className="font-caption text-caption text-text-secondary">Ad-hoc expenses and pharmacy</div>
</div>
</div>
<div className="flex-1 max-w-md w-full space-y-1">
<div className="flex justify-between text-caption font-caption">
<span className="text-text-secondary">Budget: ₹1,900</span>
<span className="text-income-positive font-semibold">31% used • ₹1,299 left</span>
</div>
<div className="w-full bg-surface-container rounded-full h-2">
<div className="bg-income-positive h-2 rounded-full" style={{"width":"31%"}}></div>
</div>
</div>
<div className="flex items-center justify-between md:justify-end gap-space-lg">
<div className="text-right">
<div className="font-metric-md text-metric-md text-on-surface">₹601</div>
<span className="font-caption text-caption text-text-secondary">2.4% share</span>
</div>
<span className="px-2 py-0.5 rounded text-label-sm font-label-sm bg-surface-container text-on-surface-variant">Under Cap</span>
</div>
</div>
</div>
</div>
{/* 4. AI Spending Insights Panel */}
<div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-sm space-y-space-md">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
<span className="material-symbols-outlined text-[18px]">auto_awesome</span>
</div>
<h2 className="font-headline-md text-headline-md text-on-surface">AI Spending Intelligence</h2>
</div>
<span className="px-2.5 py-1 rounded-full text-label-sm font-label-sm bg-lavender-subtle text-primary font-medium">
          4 Observations from Recorded Data
        </span>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
{/* Insight 1: Dining Spikes */}
<div className="p-space-lg rounded-xl bg-surface-container-low flex flex-col justify-between space-y-space-md">
<div className="space-y-space-xs">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-warning-alert font-bold">Overspending Warning</span>
<span className="text-caption font-caption text-text-secondary">Dining &amp; Delivery</span>
</div>
<p className="font-body-md text-body-md text-on-surface">
              Dining exceeded budget by <strong className="text-warning-alert font-semibold">₹300 (+12%)</strong>. Weekend orders accounted for 64% of dining outflows.
            </p>
<p className="font-caption text-caption text-text-secondary">
              Recommendation: Establish a strict ₹1,200 weekend dining limit for December cycle.
            </p>
</div>
<div className="pt-space-xs">
<button className="w-full sm:w-auto px-3.5 py-1.5 rounded-lg bg-primary text-on-primary text-label-md font-label-md shadow-sm hover:bg-tertiary transition-colors" type="button">
              Set Weekend Cap
            </button>
</div>
</div>
{/* Insight 2: Utility Consolidation */}
<div className="p-space-lg rounded-xl bg-surface-container-low flex flex-col justify-between space-y-space-md">
<div className="space-y-space-xs">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-income-positive font-bold">Savings Opportunity</span>
<span className="text-caption font-caption text-text-secondary">Utilities</span>
</div>
<p className="font-body-md text-body-md text-on-surface">
              Utility consolidation saved <strong className="text-income-positive font-semibold">₹350</strong> this month. Electricity and internet paid during early discount window.
            </p>
<p className="font-caption text-caption text-text-secondary">
              Recommendation: Enable recurring auto-schedule for Dec 10 to lock repeat savings.
            </p>
</div>
<div className="pt-space-xs">
<button className="w-full sm:w-auto px-3.5 py-1.5 rounded-lg bg-surface-container-lowest text-primary text-label-md font-label-md shadow-sm hover:bg-surface-container transition-colors" type="button">
              Review Schedule
            </button>
</div>
</div>
{/* Insight 3: Grocery Bulk Ordering */}
<div className="p-space-lg rounded-xl bg-surface-container-low flex flex-col justify-between space-y-space-md">
<div className="space-y-space-xs">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">Trend Analysis</span>
<span className="text-caption font-caption text-text-secondary">Groceries</span>
</div>
<p className="font-body-md text-body-md text-on-surface">
              Groceries spend stabilized at <strong className="text-on-surface font-semibold">₹4,200</strong> (16% below monthly ceiling of ₹5,000) through bulk ordering on Blinkit.
            </p>
<p className="font-caption text-caption text-text-secondary">
              Recommendation: Allocate surplus ₹800 directly toward your Emergency Fund.
            </p>
</div>
<div className="pt-space-xs">
<button className="w-full sm:w-auto px-3.5 py-1.5 rounded-lg bg-surface-container-lowest text-primary text-label-md font-label-md shadow-sm hover:bg-surface-container transition-colors" type="button">
              Transfer to Savings
            </button>
</div>
</div>
{/* Insight 4: Fixed Inflexibility */}
<div className="p-space-lg rounded-xl bg-surface-container-low flex flex-col justify-between space-y-space-md">
<div className="space-y-space-xs">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-text-secondary font-bold">Predictive Observation</span>
<span className="text-caption font-caption text-text-secondary">50/30/20 Rule</span>
</div>
<p className="font-body-md text-body-md text-on-surface">
              Fixed recurring outflows (Rent + EMIs) consume <strong className="text-on-surface font-semibold">50.3%</strong> of total monthly expenses.
            </p>
<p className="font-caption text-caption text-text-secondary">
              Status: Essential living costs remain strictly resilient within the recommended 50/30/20 guideline.
            </p>
</div>
<div className="pt-space-xs flex items-center gap-1.5 text-label-sm font-label-sm text-income-positive">
<span className="material-symbols-outlined text-[16px]">verified</span>
<span>Balanced Allocation Ratio</span>
</div>
</div>
</div>
</div>
{/* 5. Transaction Drill-down (Filtered Category) */}
<div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-sm space-y-space-lg">
<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
<div>
<div className="flex items-center gap-space-sm">
<h2 className="font-headline-md text-headline-md text-on-surface">
              Transaction Drill-down: Dining &amp; Food Delivery
            </h2>
<span className="px-2 py-0.5 rounded text-label-sm font-label-sm bg-lavender-subtle text-primary font-medium">
              4 Recorded Entries
            </span>
</div>
<p className="font-caption text-caption text-text-secondary">
            Inspecting itemized ledger for the selected over-budget category (Total: ₹2,800).
          </p>
</div>
{/* Category switch pills */}
<div className="flex flex-wrap items-center gap-1.5">
<span className="text-caption font-caption text-text-secondary mr-1">Switch:</span>
<button className="px-2.5 py-1 rounded-md text-label-sm font-label-sm bg-primary text-on-primary" type="button">
            Dining
          </button>
<button className="px-2.5 py-1 rounded-md text-label-sm font-label-sm bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-colors" type="button">
            Groceries
          </button>
<button className="px-2.5 py-1 rounded-md text-label-sm font-label-sm bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-colors" type="button">
            Utilities
          </button>
<button className="px-2.5 py-1 rounded-md text-label-sm font-label-sm bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-colors" type="button">
            Transport
          </button>
</div>
</div>
{/* Transaction List Table */}
<div className="overflow-x-auto">
<table className="w-full text-left">
<thead>
<tr className="bg-lavender-subtle font-label-sm text-label-sm uppercase tracking-wider text-text-secondary h-10">
<th className="px-space-md rounded-l">Date</th>
<th className="px-space-md">Merchant &amp; Description</th>
<th className="px-space-md">Payment Rail</th>
<th className="px-space-md">Tag</th>
<th className="px-space-md text-right rounded-r">Amount</th>
</tr>
</thead>
<tbody className="divide-y divide-border-subtle font-body-md text-body-md text-on-surface">
{/* Row 1 */}
<tr className="hover:bg-lavender-subtle transition-colors h-14">
<td className="px-space-md text-text-secondary font-label-md whitespace-nowrap">Nov 22, 2026</td>
<td className="px-space-md">
<div className="flex items-center gap-space-sm">
<div className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-primary text-xs font-semibold">
                    SG
                  </div>
<div>
<div className="font-headline-sm text-headline-sm text-on-surface">Swiggy Gourmet</div>
<div className="font-caption text-caption text-text-secondary">Weekend Dinner Delivery</div>
</div>
</div>
</td>
<td className="px-space-md whitespace-nowrap">
<span className="px-2 py-0.5 rounded text-label-sm font-label-sm bg-surface-container-high text-primary">UPI (GPay)</span>
</td>
<td className="px-space-md whitespace-nowrap">
<span className="px-2 py-0.5 rounded text-label-sm font-label-sm bg-surface-container text-text-secondary">Discretionary</span>
</td>
<td className="px-space-md text-right font-headline-sm text-headline-sm text-expense-negative whitespace-nowrap">
                -₹1,240
              </td>
</tr>
{/* Row 2 */}
<tr className="hover:bg-lavender-subtle transition-colors h-14">
<td className="px-space-md text-text-secondary font-label-md whitespace-nowrap">Nov 16, 2026</td>
<td className="px-space-md">
<div className="flex items-center gap-space-sm">
<div className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-primary text-xs font-semibold">
                    BT
                  </div>
<div>
<div className="font-headline-sm text-headline-sm text-on-surface">Blue Tokai Coffee Roasters</div>
<div className="font-caption text-caption text-text-secondary">Team Work Session &amp; Pour-over</div>
</div>
</div>
</td>
<td className="px-space-md whitespace-nowrap">
<span className="px-2 py-0.5 rounded text-label-sm font-label-sm bg-surface-container-high text-primary">Card (HDFC Visa)</span>
</td>
<td className="px-space-md whitespace-nowrap">
<span className="px-2 py-0.5 rounded text-label-sm font-label-sm bg-surface-container text-text-secondary">Discretionary</span>
</td>
<td className="px-space-md text-right font-headline-sm text-headline-sm text-expense-negative whitespace-nowrap">
                -₹620
              </td>
</tr>
{/* Row 3 */}
<tr className="hover:bg-lavender-subtle transition-colors h-14">
<td className="px-space-md text-text-secondary font-label-md whitespace-nowrap">Nov 09, 2026</td>
<td className="px-space-md">
<div className="flex items-center gap-space-sm">
<div className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-primary text-xs font-semibold">
                    ZO
                  </div>
<div>
<div className="font-headline-sm text-headline-sm text-on-surface">Zomato Online</div>
<div className="font-caption text-caption text-text-secondary">Weekday Lunch Delivery</div>
</div>
</div>
</td>
<td className="px-space-md whitespace-nowrap">
<span className="px-2 py-0.5 rounded text-label-sm font-label-sm bg-surface-container-high text-primary">UPI (PhonePe)</span>
</td>
<td className="px-space-md whitespace-nowrap">
<span className="px-2 py-0.5 rounded text-label-sm font-label-sm bg-surface-container text-text-secondary">Discretionary</span>
</td>
<td className="px-space-md text-right font-headline-sm text-headline-sm text-expense-negative whitespace-nowrap">
                -₹540
              </td>
</tr>
{/* Row 4 */}
<tr className="hover:bg-lavender-subtle transition-colors h-14">
<td className="px-space-md text-text-secondary font-label-md whitespace-nowrap">Nov 03, 2026</td>
<td className="px-space-md">
<div className="flex items-center gap-space-sm">
<div className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-primary text-xs font-semibold">
                    CH
                  </div>
<div>
<div className="font-headline-sm text-headline-sm text-on-surface">Chaayos Cafe</div>
<div className="font-caption text-caption text-text-secondary">Evening Chai &amp; Quick Snacks</div>
</div>
</div>
</td>
<td className="px-space-md whitespace-nowrap">
<span className="px-2 py-0.5 rounded text-label-sm font-label-sm bg-surface-container-high text-primary">UPI</span>
</td>
<td className="px-space-md whitespace-nowrap">
<span className="px-2 py-0.5 rounded text-label-sm font-label-sm bg-surface-container text-text-secondary">Discretionary</span>
</td>
<td className="px-space-md text-right font-headline-sm text-headline-sm text-expense-negative whitespace-nowrap">
                -₹400
              </td>
</tr>
</tbody>
</table>
</div>
{/* Footer Navigation Callout */}
<div className="p-space-md bg-surface-container-low rounded-lg flex flex-col sm:flex-row items-center justify-between gap-space-sm">
<div className="flex items-center gap-space-sm text-text-secondary">
<span className="material-symbols-outlined text-[18px]">receipt_long</span>
<span className="font-body-md text-body-md">Looking for comprehensive ledger with search and export filters?</span>
</div>
<a className="inline-flex items-center gap-1 font-label-md text-label-md font-semibold text-primary hover:text-tertiary transition-colors" href="#">
<span>Go to Transactions Module</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>
</div>
{/* Compliance / Disclaimers notice */}
<div className="py-space-sm text-center">
<p className="font-caption text-caption text-text-secondary">
        Analysis generated from user-recorded transactions for November 2026. Data displayed does not imply real-time RBI Account Aggregator fetching or scraping.
      </p>
</div>
</div>
</div>
    </>
  );
}
