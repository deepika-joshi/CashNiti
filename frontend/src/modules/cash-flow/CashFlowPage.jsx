import React from 'react';

export default function CashFlowPage() {

  React.useEffect(() => {
    const btnExp = document.getElementById('tab-expense');
    const btnInc = document.getElementById('tab-income');

    function setEntryType(type) {
      if (!btnExp || !btnInc) return;
      if (type === 'income') {
        btnInc.className = 'px-4 py-1.5 rounded-lg font-label-md text-label-md bg-surface-container-lowest text-income-positive font-semibold shadow-sm transition-all';
        btnExp.className = 'px-4 py-1.5 rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-all';
      } else {
        btnExp.className = 'px-4 py-1.5 rounded-lg font-label-md text-label-md bg-surface-container-lowest text-expense-negative font-semibold shadow-sm transition-all';
        btnInc.className = 'px-4 py-1.5 rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-all';
      }
    }

    const onExp = () => setEntryType('expense');
    const onInc = () => setEntryType('income');
    btnExp?.addEventListener('click', onExp);
    btnInc?.addEventListener('click', onInc);

    return () => {
      btnExp?.removeEventListener('click', onExp);
      btnInc?.removeEventListener('click', onInc);
    };
  }, []);

  return (
    <>
<div className="flex flex-col w-full">
{/* Interactive Script to sync active sidebar state dynamically */}

{/* Main Container with consistent margin-desktop rhythm */}
<div className="p-space-lg lg:p-margin-desktop space-y-space-xl max-w-7xl mx-auto w-full">
{/* 1. PAGE HEADER */}
<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg pb-space-xs">
<div className="flex flex-col space-y-1">
<div className="flex items-center gap-space-sm flex-wrap">
<h1 className="font-display text-display text-on-surface tracking-tight">Cash Flow Forecast</h1>
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-surface-container-high text-primary font-semibold tracking-wide">
            Predictive Model (Estimates)
          </span>
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-surface-container-lowest text-text-secondary shadow-sm">
<span className="material-symbols-outlined text-[14px] text-income-positive">verified_user</span>
            Nov 01 - Nov 30, 2026
          </span>
</div>
<p className="font-body-lg text-body-lg text-text-secondary">
          See how your financial balance may change over the coming days and plan ahead with AI precision.
        </p>
</div>
{/* Controls & Quick Actions */}
<div className="flex flex-wrap items-center gap-space-sm">
{/* Segmented Filter Toggle */}
<div className="inline-flex p-1 rounded-xl bg-surface-container-low shadow-sm">
<button className="px-3 py-1.5 rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" type="button">
            7 Days
          </button>
<button className="px-3 py-1.5 rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" type="button">
            15 Days
          </button>
<button className="px-3.5 py-1.5 rounded-lg font-label-md text-label-md bg-surface-container-lowest text-primary font-semibold shadow-sm transition-all" type="button">
            30 Days
          </button>
</div>
{/* Add Expected Income Button */}
<button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-label-md text-label-md bg-lavender-subtle text-primary hover:bg-surface-container-high transition-colors shadow-sm" onclick="document.getElementById('quick-add-drawer').scrollIntoView({behavior: 'smooth'})" type="button">
<span className="material-symbols-outlined text-[18px]">add_circle</span>
<span>+ Add Expected Income</span>
</button>
{/* Add Upcoming Expense Button */}
<button className="flex items-center gap-1.5 px-4 py-2 rounded-lg font-label-md text-label-md bg-primary text-on-primary hover:bg-primary-container transition-colors shadow-sm" onclick="document.getElementById('quick-add-drawer').scrollIntoView({behavior: 'smooth'})" type="button">
<span className="material-symbols-outlined text-[18px]">remove_circle</span>
<span>+ Add Upcoming Expense</span>
</button>
</div>
</div>
{/* Opening Balance Indicator Ribbon */}
<div className="flex flex-wrap items-center justify-between gap-space-md p-space-md rounded-xl bg-surface-container-lowest shadow-sm">
<div className="flex items-center gap-space-md">
<div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[22px]">account_balance_wallet</span>
</div>
<div className="flex flex-col">
<div className="flex items-center gap-space-xs">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-text-secondary">Opening Ledger Baseline</span>
<span className="inline-block w-1.5 h-1.5 rounded-full bg-income-positive"></span>
<span className="font-caption text-caption text-income-positive font-medium">Reconciled Today</span>
</div>
<span className="font-headline-sm text-headline-sm text-on-surface">
            Starting Balance: <span className="font-metric-md text-metric-md text-primary font-bold">₹21,400</span> as of Nov 01, 2026
          </span>
</div>
</div>
<div className="flex items-center gap-space-md text-right">
<div className="hidden sm:flex flex-col items-end">
<span className="font-label-sm text-label-sm text-text-secondary">Emergency Buffer Target</span>
<span className="font-headline-sm text-headline-sm text-warning-alert font-bold">₹5,000</span>
</div>
<div className="h-8 w-px bg-surface-container hidden sm:block"></div>
<div className="flex flex-col items-end">
<span className="font-label-sm text-label-sm text-text-secondary">Forecast Horizon</span>
<span className="font-headline-sm text-headline-sm text-on-surface">30 Days (Nov 30)</span>
</div>
</div>
</div>
{/* 2. FORECAST SUMMARY CARDS (4 Compact Metrics in a Row) */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
{/* Card 1: Current Available Balance */}
<div className="p-space-xl rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between space-y-space-md hover:shadow-md transition-shadow">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-text-secondary">Current Balance</span>
<div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[18px]">account_balance</span>
</div>
</div>
<div>
<div className="font-metric-xl text-metric-xl text-on-surface tracking-tight">₹21,400</div>
<div className="mt-2 flex items-center gap-1.5">
<span className="inline-flex items-center px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-surface-container-low text-primary">
<span className="material-symbols-outlined text-[14px] mr-1">check_circle</span>
              Confirmed Ledger
            </span>
</div>
</div>
<div className="pt-space-xs font-caption text-caption text-text-secondary">
          Available in primary HDFC Salary checking
        </div>
</div>
{/* Card 2: Expected Inflows */}
<div className="p-space-xl rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between space-y-space-md hover:shadow-md transition-shadow">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-text-secondary">Expected Inflows (30D)</span>
<div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-income-positive">
<span className="material-symbols-outlined text-[18px]">south_west</span>
</div>
</div>
<div>
<div className="font-metric-xl text-metric-xl text-income-positive tracking-tight">+₹45,000</div>
<div className="mt-2 flex items-center gap-1.5">
<span className="inline-flex items-center px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-surface-container-low text-income-positive font-medium">
              2 Scheduled Credits
            </span>
</div>
</div>
<div className="pt-space-xs font-caption text-caption text-text-secondary truncate">
          TechCorp ₹40,000 + Freelance ₹5,000
        </div>
</div>
{/* Card 3: Upcoming Outflows */}
<div className="p-space-xl rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between space-y-space-md hover:shadow-md transition-shadow">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-text-secondary">Upcoming Outflows (30D)</span>
<div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-expense-negative">
<span className="material-symbols-outlined text-[18px]">north_east</span>
</div>
</div>
<div>
<div className="font-metric-xl text-metric-xl text-expense-negative tracking-tight">-₹24,850</div>
<div className="mt-2 flex items-center gap-1.5">
<span className="inline-flex items-center px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-surface-container-low text-expense-negative font-medium">
              6 Upcoming Debits
            </span>
</div>
</div>
<div className="pt-space-xs font-caption text-caption text-text-secondary truncate">
          Rent, Personal EMI, Bills &amp; Provisions
        </div>
</div>
{/* Card 4: Projected Ending Balance */}
<div className="p-space-xl rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between space-y-space-md hover:shadow-md transition-shadow">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-text-secondary">Projected Ending (Nov 30)</span>
<div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[18px]">savings</span>
</div>
</div>
<div>
<div className="font-metric-xl text-metric-xl text-on-surface tracking-tight">₹41,550</div>
<div className="mt-2 flex items-center gap-1.5">
<span className="inline-flex items-center px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-surface-container-high text-income-positive font-semibold">
              +₹20,150 Net Addition
            </span>
</div>
</div>
<div className="pt-space-xs font-caption text-caption text-text-secondary">
          731% above ₹5k minimum safety buffer
        </div>
</div>
</div>
{/* 3. CASH FLOW PROJECTION CHART */}
<div className="p-space-xl rounded-xl bg-surface-container-lowest shadow-sm space-y-space-lg">
<div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
<div>
<h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
<span>Projected Liquidity Trajectory</span>
<span className="font-caption text-caption px-2 py-0.5 rounded bg-surface-container text-primary font-medium">30-Day Model</span>
</h2>
<p className="font-body-md text-body-md text-text-secondary">
            Continuous balance curve accounting for recurring mandates, expected bills, and scheduled credits.
          </p>
</div>
{/* Chart Legend */}
<div className="flex flex-wrap items-center gap-space-md font-caption text-caption text-text-secondary">
<div className="flex items-center gap-1.5">
<span className="w-3.5 h-1 rounded-full bg-primary inline-block"></span>
<span>Projected Balance</span>
</div>
<div className="flex items-center gap-1.5">
<span className="w-2.5 h-2.5 rounded-full bg-income-positive inline-block"></span>
<span>Income Events</span>
</div>
<div className="flex items-center gap-1.5">
<span className="w-2.5 h-2.5 rounded-full bg-expense-negative inline-block"></span>
<span>Expense Debits</span>
</div>
<div className="flex items-center gap-1.5">
<span className="w-3.5 h-0.5 bg-warning-alert inline-block" style={{"borderTop":"2px dashed #f59e0b"}}></span>
<span>Safety Buffer (₹5k)</span>
</div>
</div>
</div>
{/* High-Fidelity SVG Interactive Chart */}
<div className="w-full relative overflow-hidden pt-space-sm pb-space-xs">
<div className="w-full h-72 sm:h-80 relative">
{/* Background Chart Grid Lines */}
<div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
<div className="w-full border-b border-surface-container flex justify-between">
<span className="font-caption text-caption text-text-secondary text-[10px] -mt-2">₹50,000</span>
</div>
<div className="w-full border-b border-surface-container flex justify-between">
<span className="font-caption text-caption text-text-secondary text-[10px] -mt-2">₹40,000</span>
</div>
<div className="w-full border-b border-surface-container flex justify-between">
<span className="font-caption text-caption text-text-secondary text-[10px] -mt-2">₹30,000</span>
</div>
<div className="w-full border-b border-surface-container flex justify-between">
<span className="font-caption text-caption text-text-secondary text-[10px] -mt-2">₹20,000</span>
</div>
<div className="w-full border-b border-surface-container flex justify-between">
<span className="font-caption text-caption text-text-secondary text-[10px] -mt-2">₹10,000</span>
</div>
<div className="w-full border-b border-surface-container flex justify-between">
<span className="font-caption text-caption text-text-secondary text-[10px] -mt-2">₹0</span>
</div>
</div>
{/* Dynamic SVG Vector Area + Line Chart */}
<svg className="w-full h-full overflow-visible" preserveaspectratio="none" viewbox="0 0 1000 320">
<defs>
<lineargradient id="cfGradient" x1="0%" x2="0%" y1="0%" y2="100%">
<stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.32"></stop>
<stop offset="60%" stopColor="#8b5cf6" stopOpacity="0.08"></stop>
<stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0"></stop>
</lineargradient>
<filter height="140%" id="shadowGlow" width="140%" x="-20%" y="-20%">
<fedropshadow dx="0" dy="4" flood-color="#8b5cf6" flood-opacity="0.25" stddeviation="6"></fedropshadow>
</filter>
</defs>
{/* Minimum Buffer Target (Dashed Amber line at ₹5,000, Y approx = 280) */}
<line opacity="0.85" stroke="#f59e0b" strokeDasharray="6,6" strokeWidth="2" x1="40" x2="980" y1="280" y2="280"></line>
<text fill="#f59e0b" font-family="Inter" font-size="11" font-weight="600" x="830" y="274">Safety Buffer: ₹5,000</text>
{/* Area polygon fill under line */}
{/* Scale: X 40 to 980 (Nov 1 to Nov 30). Y: 0=₹50k, 300=₹0. Formula: Y = 300 - (Value * 5.6 / 1000) */}
{/* Nov 1: 21,400 -> Y=180 | Nov 3: 13,400 -> Y=225 | Nov 5: 8,900 -> Y=250 | Nov 10: 6,451 -> Y=264 | Nov 15: 11,451 -> Y=236 | Nov 20: 9,351 -> Y=248 | Nov 25: 44,500 -> Y=51 | Nov 28: 43,300 -> Y=57 | Nov 30: 41,550 -> Y=67 */}
<polygon fill="url(#cfGradient)" points="
              40,300
              40,180
              100,180
              110,225
              180,225
              190,250
              330,250
              350,264
              500,264
              510,236
              650,236
              660,248
              800,248
              815,51
              900,51
              915,57
              950,57
              980,67
              980,300
            "></polygon>
{/* Line Path */}
<polyline fill="none" filter="url(#shadowGlow)" points="
              40,180
              100,180
              110,225
              180,225
              190,250
              330,250
              350,264
              500,264
              510,236
              650,236
              660,248
              800,248
              815,51
              900,51
              915,57
              950,57
              980,67
            " stroke="#6b38d4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></polyline>
{/* Data Marker Points & Interactive Badges */}
{/* Nov 1: Start */}
<circle cx="40" cy="180" fill="#6b38d4" r="5" stroke="#ffffff" strokeWidth="2.5"></circle>
{/* Nov 3: Rent Outflow (-₹8,000) */}
<circle cx="110" cy="225" fill="#e05252" r="5" stroke="#ffffff" strokeWidth="2.5"></circle>
{/* Callout Nov 3 */}
<g transform="translate(75, 195)">
<rect fill="#ffffff" filter="url(#shadowGlow)" height="18" rx="4" width="70" x="-35" y="-18"></rect>
<text fill="#e05252" font-size="10" font-weight="600" text-anchor="middle" x="0" y="-5">-₹8,000</text>
</g>
{/* Nov 5: EMI Outflow (-₹4,500) */}
<circle cx="190" cy="250" fill="#e05252" r="5" stroke="#ffffff" strokeWidth="2.5"></circle>
{/* Nov 10: Utility Outflow (-₹2,449) - LOW POINT */}
<circle cx="350" cy="264" fill="#ba1a1a" r="6" stroke="#ffffff" strokeWidth="3"></circle>
{/* Highlight Lowest Point Halo */}
<circle cx="350" cy="264" fill="#f59e0b" fill-opacity="0.25" r="14"></circle>
{/* Lowest Callout Bubble */}
<g transform="translate(350, 230)">
<rect fill="#1c192c" height="26" rx="6" width="130" x="-65" y="-28"></rect>
<polygon fill="#1c192c" points="-4,-2 4,-2 0,4"></polygon>
<text fill="#ffffff" font-size="10" font-weight="600" text-anchor="middle" x="0" y="-12">Lowest Dip: ₹6,451</text>
</g>
{/* Nov 15: Freelance Milestone (+₹5,000) */}
<circle cx="510" cy="236" fill="#16a34a" r="5" stroke="#ffffff" strokeWidth="2.5"></circle>
{/* Nov 20: Provisions (-₹2,100) */}
<circle cx="660" cy="248" fill="#e05252" r="5" stroke="#ffffff" strokeWidth="2.5"></circle>
{/* Nov 25: Salary Surge (+₹40,000) */}
<circle cx="815" cy="51" fill="#16a34a" r="7" stroke="#ffffff" strokeWidth="3"></circle>
{/* Salary Callout Bubble */}
<g transform="translate(815, 30)">
<rect fill="#16a34a" height="22" rx="5" width="130" x="-65" y="-24"></rect>
<text fill="#ffffff" font-size="10" font-weight="700" text-anchor="middle" x="0" y="-9">+₹40,000 Salary</text>
</g>
{/* Nov 30: Projected Ending Balance */}
<circle cx="980" cy="67" fill="#6b38d4" r="5" stroke="#ffffff" strokeWidth="2.5"></circle>
<g transform="translate(940, 95)">
<rect fill="#ffffff" filter="url(#shadowGlow)" height="18" rx="4" width="75" x="-35" y="-18"></rect>
<text fill="#1c192c" font-size="10" font-weight="700" text-anchor="middle" x="2" y="-5">₹41,550</text>
</g>
</svg>
</div>
{/* Date X-Axis Tick Labels */}
<div className="flex justify-between font-caption text-caption text-text-secondary pt-2 px-1 border-t border-surface-container">
<span className="font-medium text-on-surface">Nov 01</span>
<span>Nov 05</span>
<span className="text-warning-alert font-semibold">Nov 10 (Dip)</span>
<span>Nov 15</span>
<span>Nov 20</span>
<span className="text-income-positive font-semibold">Nov 25 (Salary)</span>
<span className="font-medium text-on-surface">Nov 30</span>
</div>
</div>
{/* Critical Insight Banner under graph */}
<div className="flex items-center gap-space-md p-space-md rounded-xl bg-surface-container-low text-on-surface">
<div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-warning-alert shrink-0">
<span className="material-symbols-outlined text-[20px]">insights</span>
</div>
<div className="flex-1 text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2">
<div>
<span className="font-headline-sm text-headline-sm text-on-surface">Lowest Projected Balance: ₹6,451 on Nov 10, 2026</span>
<span className="text-text-secondary font-body-md text-body-md block sm:inline sm:ml-2">
              • 29% safety buffer (₹1,451) above your ₹5,000 emergency threshold.
            </span>
</div>
<span className="inline-flex items-center px-2.5 py-1 rounded-md font-label-sm text-label-sm bg-surface-container-highest text-primary font-semibold self-start sm:self-auto shrink-0">
            Buffer Intact
          </span>
</div>
</div>
</div>
{/* 4. TWO-COLUMN LAYOUT: CASH FLOW CALENDAR & CHRONOLOGICAL EVENTS */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
{/* LEFT COLUMN: November 2026 Cash Flow Calendar (5 cols) */}
<div className="lg:col-span-5 p-space-xl rounded-xl bg-surface-container-lowest shadow-sm space-y-space-md">
<div className="flex items-center justify-between">
<div>
<h2 className="font-headline-md text-headline-md text-on-surface">Cash Flow Calendar</h2>
<p className="font-body-md text-body-md text-text-secondary">November 2026 daily net position</p>
</div>
<div className="flex items-center gap-1 text-on-surface-variant">
<button className="p-1 rounded hover:bg-surface-container transition-colors" title="Previous Month">
<span className="material-symbols-outlined text-[20px]">chevron_left</span>
</button>
<span className="font-label-md text-label-md font-semibold text-on-surface">Nov 2026</span>
<button className="p-1 rounded hover:bg-surface-container transition-colors" title="Next Month">
<span className="material-symbols-outlined text-[20px]">chevron_right</span>
</button>
</div>
</div>
{/* Days of week Header */}
<div className="grid grid-cols-7 text-center font-label-sm text-label-sm uppercase tracking-wider text-text-secondary py-1">
<span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
</div>
{/* 30-Day November 2026 Calendar Grid (Starts on Sunday Nov 1) */}
<div className="grid grid-cols-7 gap-1 text-center font-body-md text-body-md">
{/* Nov 1: Starting Balance */}
<div className="aspect-square p-1 rounded-lg bg-surface-container-low flex flex-col items-center justify-between cursor-pointer hover:bg-surface-container transition-colors">
<span className="font-semibold text-primary">1</span>
<span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
<span className="font-caption text-caption text-[9px] text-text-secondary">₹21.4k</span>
</div>
{/* Nov 2 */}
<div className="aspect-square p-1 rounded-lg hover:bg-surface-container-low flex flex-col items-center justify-between">
<span className="text-on-surface-variant">2</span>
<span></span>
<span className="font-caption text-caption text-[9px] text-text-secondary">₹21.4k</span>
</div>
{/* Nov 3: Rent Due ₹8,000 */}
<div className="aspect-square p-1 rounded-lg bg-surface-container-low flex flex-col items-center justify-between cursor-pointer ring-1 ring-expense-negative/30">
<span className="font-semibold text-expense-negative">3</span>
<span className="w-1.5 h-1.5 rounded-full bg-expense-negative"></span>
<span className="font-caption text-caption text-[9px] text-expense-negative font-medium">₹13.4k</span>
</div>
{/* Nov 4 */}
<div className="aspect-square p-1 rounded-lg hover:bg-surface-container-low flex flex-col items-center justify-between">
<span className="text-on-surface-variant">4</span>
<span></span>
<span className="font-caption text-caption text-[9px] text-text-secondary">₹13.4k</span>
</div>
{/* Nov 5: EMI Due ₹4,500 */}
<div className="aspect-square p-1 rounded-lg bg-surface-container-low flex flex-col items-center justify-between cursor-pointer ring-1 ring-expense-negative/30">
<span className="font-semibold text-expense-negative">5</span>
<span className="w-1.5 h-1.5 rounded-full bg-expense-negative"></span>
<span className="font-caption text-caption text-[9px] text-expense-negative font-medium">₹8.9k</span>
</div>
{/* Nov 6 */}
<div className="aspect-square p-1 rounded-lg hover:bg-surface-container-low flex flex-col items-center justify-between">
<span className="text-on-surface-variant">6</span>
<span></span>
<span className="font-caption text-caption text-[9px] text-text-secondary">₹8.9k</span>
</div>
{/* Nov 7 */}
<div className="aspect-square p-1 rounded-lg hover:bg-surface-container-low flex flex-col items-center justify-between">
<span className="text-on-surface-variant">7</span>
<span></span>
<span className="font-caption text-caption text-[9px] text-text-secondary">₹8.9k</span>
</div>
{/* Nov 8 */}
<div className="aspect-square p-1 rounded-lg hover:bg-surface-container-low flex flex-col items-center justify-between">
<span className="text-on-surface-variant">8</span>
<span></span>
<span className="font-caption text-caption text-[9px] text-text-secondary">₹8.9k</span>
</div>
{/* Nov 9 */}
<div className="aspect-square p-1 rounded-lg hover:bg-surface-container-low flex flex-col items-center justify-between">
<span className="text-on-surface-variant">9</span>
<span></span>
<span className="font-caption text-caption text-[9px] text-text-secondary">₹8.9k</span>
</div>
{/* Nov 10: Watch Zone (Bills ₹2,449) */}
<div className="aspect-square p-1 rounded-lg bg-surface-container-high flex flex-col items-center justify-between cursor-pointer ring-1 ring-warning-alert">
<span className="font-bold text-warning-alert">10</span>
<span className="w-1.5 h-1.5 rounded-full bg-warning-alert"></span>
<span className="font-caption text-caption text-[9px] text-warning-alert font-bold">₹6.4k</span>
</div>
{/* Nov 11 to 14 */}
<div className="aspect-square p-1 rounded-lg hover:bg-surface-container-low flex flex-col items-center justify-between">
<span className="text-on-surface-variant">11</span><span></span><span className="font-caption text-caption text-[9px] text-text-secondary">₹6.4k</span>
</div>
<div className="aspect-square p-1 rounded-lg hover:bg-surface-container-low flex flex-col items-center justify-between">
<span className="text-on-surface-variant">12</span><span></span><span className="font-caption text-caption text-[9px] text-text-secondary">₹6.4k</span>
</div>
<div className="aspect-square p-1 rounded-lg hover:bg-surface-container-low flex flex-col items-center justify-between">
<span className="text-on-surface-variant">13</span><span></span><span className="font-caption text-caption text-[9px] text-text-secondary">₹6.4k</span>
</div>
<div className="aspect-square p-1 rounded-lg hover:bg-surface-container-low flex flex-col items-center justify-between">
<span className="text-on-surface-variant">14</span><span></span><span className="font-caption text-caption text-[9px] text-text-secondary">₹6.4k</span>
</div>
{/* Nov 15: Freelance Milestone Inflow (+₹5,000) */}
<div className="aspect-square p-1 rounded-lg bg-surface-container-low flex flex-col items-center justify-between cursor-pointer ring-1 ring-income-positive/40">
<span className="font-bold text-income-positive">15</span>
<span className="w-1.5 h-1.5 rounded-full bg-income-positive"></span>
<span className="font-caption text-caption text-[9px] text-income-positive font-semibold">₹11.4k</span>
</div>
{/* Nov 16 to 19 */}
<div className="aspect-square p-1 rounded-lg hover:bg-surface-container-low flex flex-col items-center justify-between">
<span className="text-on-surface-variant">16</span><span></span><span className="font-caption text-caption text-[9px] text-text-secondary">₹11.4k</span>
</div>
<div className="aspect-square p-1 rounded-lg hover:bg-surface-container-low flex flex-col items-center justify-between">
<span className="text-on-surface-variant">17</span><span></span><span className="font-caption text-caption text-[9px] text-text-secondary">₹11.4k</span>
</div>
<div className="aspect-square p-1 rounded-lg hover:bg-surface-container-low flex flex-col items-center justify-between">
<span className="text-on-surface-variant">18</span><span></span><span className="font-caption text-caption text-[9px] text-text-secondary">₹11.4k</span>
</div>
<div className="aspect-square p-1 rounded-lg hover:bg-surface-container-low flex flex-col items-center justify-between">
<span className="text-on-surface-variant">19</span><span></span><span className="font-caption text-caption text-[9px] text-text-secondary">₹11.4k</span>
</div>
{/* Nov 20: Grocery Provision (-₹2,100) */}
<div className="aspect-square p-1 rounded-lg bg-surface-container-low flex flex-col items-center justify-between cursor-pointer">
<span className="font-semibold text-expense-negative">20</span>
<span className="w-1.5 h-1.5 rounded-full bg-expense-negative"></span>
<span className="font-caption text-caption text-[9px] text-text-secondary">₹9.3k</span>
</div>
{/* Nov 21 to 24 */}
<div className="aspect-square p-1 rounded-lg hover:bg-surface-container-low flex flex-col items-center justify-between">
<span className="text-on-surface-variant">21</span><span></span><span className="font-caption text-caption text-[9px] text-text-secondary">₹9.3k</span>
</div>
<div className="aspect-square p-1 rounded-lg hover:bg-surface-container-low flex flex-col items-center justify-between">
<span className="text-on-surface-variant">22</span><span></span><span className="font-caption text-caption text-[9px] text-text-secondary">₹9.3k</span>
</div>
<div className="aspect-square p-1 rounded-lg hover:bg-surface-container-low flex flex-col items-center justify-between">
<span className="text-on-surface-variant">23</span><span></span><span className="font-caption text-caption text-[9px] text-text-secondary">₹9.3k</span>
</div>
<div className="aspect-square p-1 rounded-lg hover:bg-surface-container-low flex flex-col items-center justify-between">
<span className="text-on-surface-variant">24</span><span></span><span className="font-caption text-caption text-[9px] text-text-secondary">₹9.3k</span>
</div>
{/* Nov 25: Monthly Salary Credit (+₹40,000) */}
<div className="aspect-square p-1 rounded-lg bg-primary text-on-primary flex flex-col items-center justify-between cursor-pointer shadow-sm">
<span className="font-bold">25</span>
<span className="material-symbols-outlined text-[12px]">star</span>
<span className="font-caption text-caption text-[9px] font-bold">₹44.5k</span>
</div>
{/* Nov 26 to 27 */}
<div className="aspect-square p-1 rounded-lg hover:bg-surface-container-low flex flex-col items-center justify-between">
<span className="text-on-surface-variant">26</span><span></span><span className="font-caption text-caption text-[9px] text-text-secondary">₹44.5k</span>
</div>
<div className="aspect-square p-1 rounded-lg hover:bg-surface-container-low flex flex-col items-center justify-between">
<span className="text-on-surface-variant">27</span><span></span><span className="font-caption text-caption text-[9px] text-text-secondary">₹44.5k</span>
</div>
{/* Nov 28: Fuel (-₹1,200) */}
<div className="aspect-square p-1 rounded-lg bg-surface-container-low flex flex-col items-center justify-between cursor-pointer">
<span className="font-semibold text-expense-negative">28</span>
<span className="w-1.5 h-1.5 rounded-full bg-expense-negative"></span>
<span className="font-caption text-caption text-[9px] text-text-secondary">₹43.3k</span>
</div>
{/* Nov 29: Dining (-₹1,400) */}
<div className="aspect-square p-1 rounded-lg bg-surface-container-low flex flex-col items-center justify-between cursor-pointer">
<span className="font-semibold text-expense-negative">29</span>
<span className="w-1.5 h-1.5 rounded-full bg-expense-negative"></span>
<span className="font-caption text-caption text-[9px] text-text-secondary">₹41.9k</span>
</div>
{/* Nov 30: Ending Balance */}
<div className="aspect-square p-1 rounded-lg bg-surface-container flex flex-col items-center justify-between cursor-pointer">
<span className="font-bold text-primary">30</span>
<span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
<span className="font-caption text-caption text-[9px] font-semibold text-primary">₹41.5k</span>
</div>
</div>
{/* Legend footer inside Calendar */}
<div className="pt-space-sm flex flex-wrap items-center justify-between text-caption font-caption text-text-secondary">
<div className="flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-income-positive"></span>
<span>Inflow Event</span>
</div>
<div className="flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-expense-negative"></span>
<span>Debit Event</span>
</div>
<div className="flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-warning-alert"></span>
<span>Watch Window</span>
</div>
</div>
</div>
{/* RIGHT COLUMN: Chronological Upcoming Financial Events Ledger (7 cols) */}
<div className="lg:col-span-7 p-space-xl rounded-xl bg-surface-container-lowest shadow-sm space-y-space-md">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
<div>
<h2 className="font-headline-md text-headline-md text-on-surface">Upcoming Financial Events</h2>
<p className="font-body-md text-body-md text-text-secondary">8 planned entries scheduled for November</p>
</div>
{/* Filter Pills */}
<div className="flex flex-wrap items-center gap-1 text-xs">
<button className="px-2.5 py-1 rounded-full bg-surface-container-high text-primary font-semibold font-label-sm text-label-sm">
              All (8)
            </button>
<button className="px-2.5 py-1 rounded-full bg-surface-container-low text-text-secondary hover:text-on-surface font-label-sm text-label-sm">
              Income (2)
            </button>
<button className="px-2.5 py-1 rounded-full bg-surface-container-low text-text-secondary hover:text-on-surface font-label-sm text-label-sm">
              Bills &amp; EMIs (4)
            </button>
<button className="px-2.5 py-1 rounded-full bg-surface-container-low text-text-secondary hover:text-on-surface font-label-sm text-label-sm">
              Discretionary (2)
            </button>
</div>
</div>
{/* Event List Stream */}
<div className="space-y-space-xs pt-1">
{/* Item 1: Rent */}
<div className="p-space-md rounded-xl bg-lavender-subtle hover:bg-surface-container-low transition-colors flex items-center justify-between gap-space-md">
<div className="flex items-center gap-space-md min-w-0">
<div className="flex flex-col items-center justify-center w-11 h-11 rounded-lg bg-surface-container-lowest shadow-sm shrink-0">
<span className="font-caption text-caption text-text-secondary uppercase">Nov</span>
<span className="font-headline-sm text-headline-sm text-on-surface leading-tight">03</span>
</div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-1.5 flex-wrap">
<span className="font-headline-sm text-headline-sm text-on-surface truncate">Prestige Oakwood Residency</span>
<span className="inline-flex px-2 py-0.2 rounded font-label-sm text-label-sm bg-surface-container text-primary">Recurring NACH</span>
</div>
<span className="font-caption text-caption text-text-secondary">Housing &amp; Rent • Mandate Active</span>
</div>
</div>
<div className="text-right shrink-0">
<div className="font-metric-md text-metric-md text-expense-negative font-semibold">-₹8,000</div>
<span className="font-caption text-caption text-text-secondary">Pending</span>
</div>
</div>
{/* Item 2: Loan EMI */}
<div className="p-space-md rounded-xl bg-lavender-subtle hover:bg-surface-container-low transition-colors flex items-center justify-between gap-space-md">
<div className="flex items-center gap-space-md min-w-0">
<div className="flex flex-col items-center justify-center w-11 h-11 rounded-lg bg-surface-container-lowest shadow-sm shrink-0">
<span className="font-caption text-caption text-text-secondary uppercase">Nov</span>
<span className="font-headline-sm text-headline-sm text-on-surface leading-tight">05</span>
</div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-1.5 flex-wrap">
<span className="font-headline-sm text-headline-sm text-on-surface truncate">HDFC Personal Loan EMI</span>
<span className="inline-flex px-2 py-0.2 rounded font-label-sm text-label-sm bg-surface-container text-primary">Auto-Debit</span>
</div>
<span className="font-caption text-caption text-text-secondary">Loans &amp; Debt • Loan #9821</span>
</div>
</div>
<div className="text-right shrink-0">
<div className="font-metric-md text-metric-md text-expense-negative font-semibold">-₹4,500</div>
<span className="font-caption text-caption text-text-secondary">Scheduled</span>
</div>
</div>
{/* Item 3: Utilities */}
<div className="p-space-md rounded-xl bg-lavender-subtle hover:bg-surface-container-low transition-colors flex items-center justify-between gap-space-md">
<div className="flex items-center gap-space-md min-w-0">
<div className="flex flex-col items-center justify-center w-11 h-11 rounded-lg bg-surface-container-lowest shadow-sm shrink-0">
<span className="font-caption text-caption text-text-secondary uppercase">Nov</span>
<span className="font-headline-sm text-headline-sm text-on-surface leading-tight">10</span>
</div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-1.5 flex-wrap">
<span className="font-headline-sm text-headline-sm text-on-surface truncate">BESCOM Power &amp; Airtel Fiber</span>
<span className="inline-flex px-2 py-0.2 rounded font-label-sm text-label-sm bg-surface-container text-primary">Bill Pay</span>
</div>
<span className="font-caption text-caption text-warning-alert font-medium">Utilities • Hits lowest balance dip</span>
</div>
</div>
<div className="text-right shrink-0">
<div className="font-metric-md text-metric-md text-expense-negative font-semibold">-₹2,449</div>
<span className="font-caption text-caption text-text-secondary">Upcoming</span>
</div>
</div>
{/* Item 4: Freelance Retainer */}
<div className="p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors flex items-center justify-between gap-space-md">
<div className="flex items-center gap-space-md min-w-0">
<div className="flex flex-col items-center justify-center w-11 h-11 rounded-lg bg-surface-container-lowest shadow-sm shrink-0">
<span className="font-caption text-caption text-text-secondary uppercase">Nov</span>
<span className="font-headline-sm text-headline-sm text-income-positive leading-tight">15</span>
</div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-1.5 flex-wrap">
<span className="font-headline-sm text-headline-sm text-on-surface truncate">Freelance Design Retainer</span>
<span className="inline-flex px-2 py-0.2 rounded font-label-sm text-label-sm bg-surface-container-high text-income-positive font-semibold">Client Wire</span>
</div>
<span className="font-caption text-caption text-income-positive">Secondary Inflow • Studio Hexa</span>
</div>
</div>
<div className="text-right shrink-0">
<div className="font-metric-md text-metric-md text-income-positive font-semibold">+₹5,000</div>
<span className="font-caption text-caption text-income-positive font-medium">Expected</span>
</div>
</div>
{/* Item 5: Groceries */}
<div className="p-space-md rounded-xl bg-lavender-subtle hover:bg-surface-container-low transition-colors flex items-center justify-between gap-space-md">
<div className="flex items-center gap-space-md min-w-0">
<div className="flex flex-col items-center justify-center w-11 h-11 rounded-lg bg-surface-container-lowest shadow-sm shrink-0">
<span className="font-caption text-caption text-text-secondary uppercase">Nov</span>
<span className="font-headline-sm text-headline-sm text-on-surface leading-tight">20</span>
</div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-1.5 flex-wrap">
<span className="font-headline-sm text-headline-sm text-on-surface truncate">Blinkit / Provisions Mid-Month</span>
<span className="inline-flex px-2 py-0.2 rounded font-label-sm text-label-sm bg-surface-container text-primary">UPI</span>
</div>
<span className="font-caption text-caption text-text-secondary">Groceries &amp; Kitchen</span>
</div>
</div>
<div className="text-right shrink-0">
<div className="font-metric-md text-metric-md text-expense-negative font-semibold">-₹2,100</div>
<span className="font-caption text-caption text-text-secondary">Estimated</span>
</div>
</div>
{/* Item 6: Monthly Salary Credit */}
<div className="p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors flex items-center justify-between gap-space-md">
<div className="flex items-center gap-space-md min-w-0">
<div className="flex flex-col items-center justify-center w-11 h-11 rounded-lg bg-surface-container-lowest shadow-sm shrink-0">
<span className="font-caption text-caption text-text-secondary uppercase">Nov</span>
<span className="font-headline-sm text-headline-sm text-income-positive leading-tight">25</span>
</div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-1.5 flex-wrap">
<span className="font-headline-sm text-headline-sm text-on-surface truncate">TechCorp India Pvt Ltd</span>
<span className="inline-flex px-2 py-0.2 rounded font-label-sm text-label-sm bg-surface-container-high text-income-positive font-semibold">Direct Deposit</span>
</div>
<span className="font-caption text-caption text-income-positive">Primary Salary Inflow • Payroll #442</span>
</div>
</div>
<div className="text-right shrink-0">
<div className="font-metric-md text-metric-md text-income-positive font-semibold">+₹40,000</div>
<span className="font-caption text-caption text-income-positive font-medium">Scheduled</span>
</div>
</div>
{/* Item 7: Fuel & Metro */}
<div className="p-space-md rounded-xl bg-lavender-subtle hover:bg-surface-container-low transition-colors flex items-center justify-between gap-space-md">
<div className="flex items-center gap-space-md min-w-0">
<div className="flex flex-col items-center justify-center w-11 h-11 rounded-lg bg-surface-container-lowest shadow-sm shrink-0">
<span className="font-caption text-caption text-text-secondary uppercase">Nov</span>
<span className="font-headline-sm text-headline-sm text-on-surface leading-tight">28</span>
</div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-1.5 flex-wrap">
<span className="font-headline-sm text-headline-sm text-on-surface truncate">Fuel &amp; Metro Pass Recharge</span>
<span className="inline-flex px-2 py-0.2 rounded font-label-sm text-label-sm bg-surface-container text-primary">Card</span>
</div>
<span className="font-caption text-caption text-text-secondary">Transport &amp; Commute</span>
</div>
</div>
<div className="text-right shrink-0">
<div className="font-metric-md text-metric-md text-expense-negative font-semibold">-₹1,200</div>
<span className="font-caption text-caption text-text-secondary">Estimated</span>
</div>
</div>
{/* Item 8: Weekend Dining Allocation */}
<div className="p-space-md rounded-xl bg-lavender-subtle hover:bg-surface-container-low transition-colors flex items-center justify-between gap-space-md">
<div className="flex items-center gap-space-md min-w-0">
<div className="flex flex-col items-center justify-center w-11 h-11 rounded-lg bg-surface-container-lowest shadow-sm shrink-0">
<span className="font-caption text-caption text-text-secondary uppercase">Nov</span>
<span className="font-headline-sm text-headline-sm text-on-surface leading-tight">29</span>
</div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-1.5 flex-wrap">
<span className="font-headline-sm text-headline-sm text-on-surface truncate">Weekend Dining Allocation</span>
<span className="inline-flex px-2 py-0.2 rounded font-label-sm text-label-sm bg-surface-container text-primary">Discretionary</span>
</div>
<span className="font-caption text-caption text-text-secondary">Food &amp; Dining</span>
</div>
</div>
<div className="text-right shrink-0">
<div className="font-metric-md text-metric-md text-expense-negative font-semibold">-₹1,400</div>
<span className="font-caption text-caption text-text-secondary">Estimated</span>
</div>
</div>
</div>
</div>
</div>
{/* 5. LOW BALANCE ALERTS & BUFFER ANALYSIS */}
<div className="p-space-xl rounded-xl bg-surface-container-lowest shadow-sm space-y-space-md">
<div className="flex items-center gap-space-sm">
<div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-warning-alert">
<span className="material-symbols-outlined text-[24px]">shield_with_heart</span>
</div>
<div>
<h2 className="font-headline-md text-headline-md text-on-surface">
            Cash Flow Health: Stable with Mid-Month Tight Window
          </h2>
<p className="font-body-md text-body-md text-text-secondary">
            Predictive resilience assessment for November 01 – November 30
          </p>
</div>
</div>
{/* Alert Narrative Card */}
<div className="p-space-md rounded-xl bg-surface-container-low text-on-surface space-y-space-xs">
<div className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-warning-alert text-[18px]">warning</span>
<span>Watch Window between Nov 05 – Nov 12</span>
</div>
<p className="font-body-md text-body-md text-text-secondary leading-relaxed">
          Account balance will drop from <strong className="text-on-surface">₹8,900</strong> to <strong className="text-on-surface">₹6,451</strong> after personal EMI and utility debits clear, prior to the Nov 15 freelance wire. Remaining safety margin is <strong className="text-income-positive">₹1,451</strong> above your mandatory ₹5,000 emergency buffer.
        </p>
</div>
{/* Actionable Suggestions Checklist */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-md pt-space-xs">
<div className="p-space-md rounded-lg bg-surface-container-lowest shadow-sm flex items-start gap-space-sm">
<span className="material-symbols-outlined text-income-positive text-[20px] shrink-0 mt-0.5">check_circle</span>
<div className="font-body-md text-body-md text-on-surface">
<strong>Liquid Checking Hold:</strong> Maintain at least ₹3,000 liquid in HDFC before Nov 04 to absorb sudden auto-debits.
          </div>
</div>
<div className="p-space-md rounded-lg bg-surface-container-lowest shadow-sm flex items-start gap-space-sm">
<span className="material-symbols-outlined text-income-positive text-[20px] shrink-0 mt-0.5">check_circle</span>
<div className="font-body-md text-body-md text-on-surface">
<strong>Discretionary Timing:</strong> Defer non-critical electronics or shopping purchases until after TechCorp salary on Nov 25.
          </div>
</div>
<div className="p-space-md rounded-lg bg-surface-container-lowest shadow-sm flex items-start gap-space-sm">
<span className="material-symbols-outlined text-income-positive text-[20px] shrink-0 mt-0.5">check_circle</span>
<div className="font-body-md text-body-md text-on-surface">
<strong>Reminder Active:</strong> BESCOM electricity payment alert set for Nov 08 to prevent late surcharge penalties.
          </div>
</div>
</div>
</div>
{/* 6. AI CASH FLOW INSIGHTS PANEL (3 Structured Cards) */}
<div>
<div className="flex items-center justify-between mb-space-md">
<div>
<h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[22px]">psychology</span>
<span>AI Cash Flow Insights</span>
</h2>
<p className="font-body-md text-body-md text-text-secondary">Synthesized guidance tailored to your earning and spending cadence</p>
</div>
<span className="font-label-sm text-label-sm text-text-secondary">Model Version 4.2</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
{/* Insight Card 1 */}
<div className="p-space-xl rounded-xl bg-surface-container-lowest shadow-sm space-y-space-sm hover:shadow-md transition-shadow">
<div className="flex items-center justify-between">
<span className="inline-flex px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-surface-container text-primary font-semibold">
              Inflow Coverage
            </span>
<span className="material-symbols-outlined text-income-positive text-[20px]">task_alt</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">100% Outflow Coverage</h3>
<p className="font-body-md text-body-md text-text-secondary leading-relaxed">
            Confirmed and scheduled income (<strong className="text-on-surface">₹45,000</strong>) comfortably covers all anticipated November obligations (<strong className="text-on-surface">₹24,850</strong>), yielding an aggregate net addition of <strong className="text-income-positive">+₹20,150</strong>.
          </p>
<div className="pt-space-xs font-caption text-caption text-text-secondary flex items-center gap-1">
<span className="material-symbols-outlined text-[14px] text-income-positive">trending_up</span>
            Savings rate projected at 44.7%
          </div>
</div>
{/* Insight Card 2 */}
<div className="p-space-xl rounded-xl bg-surface-container-lowest shadow-sm space-y-space-sm hover:shadow-md transition-shadow">
<div className="flex items-center justify-between">
<span className="inline-flex px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-surface-container text-warning-alert font-semibold">
              Buffer Optimization
            </span>
<span className="material-symbols-outlined text-warning-alert text-[20px]">tune</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Liquidity Cushion Target</h3>
<p className="font-body-md text-body-md text-text-secondary leading-relaxed">
            Based on 90-day debit variance, raising your checking buffer from ₹5,000 to <strong className="text-on-surface">₹6,500</strong> eliminates any transient overdraft risk during the Nov 5-10 bill confluence.
          </p>
<div className="pt-space-xs font-caption text-caption text-text-secondary flex items-center gap-1">
<span className="material-symbols-outlined text-[14px] text-primary">auto_graph</span>
            Recommended reallocation: ₹1,500 from liquid stash
          </div>
</div>
{/* Insight Card 3 */}
<div className="p-space-xl rounded-xl bg-surface-container-lowest shadow-sm space-y-space-sm hover:shadow-md transition-shadow">
<div className="flex items-center justify-between">
<span className="inline-flex px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-surface-container text-primary font-semibold">
              Pacing Guide
            </span>
<span className="material-symbols-outlined text-primary text-[20px]">speed</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Safe Discretionary Spend</h3>
<p className="font-body-md text-body-md text-text-secondary leading-relaxed">
            You maintain <strong className="text-primary font-bold">₹350 / day</strong> in safe discretionary spending capacity between Nov 01 and Nov 24 without breaching your ₹5,000 safety floor at the mid-month dip.
          </p>
<div className="pt-space-xs font-caption text-caption text-text-secondary flex items-center gap-1">
<span className="material-symbols-outlined text-[14px] text-income-positive">check</span>
            Scales to ₹1,200/day after Nov 25
          </div>
</div>
</div>
</div>
{/* 7. ADD / EDIT TRANSACTION PREVIEW CARD (Interactive Quick Drawer) */}
<div className="p-space-xl rounded-xl bg-surface-container-lowest shadow-sm space-y-space-md" id="quick-add-drawer">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-xs border-b border-surface-container">
<div>
<h2 className="font-headline-md text-headline-md text-on-surface">Add Expected Financial Event</h2>
<p className="font-body-md text-body-md text-text-secondary">Simulate or register an upcoming debit or credit to recalibrate the 30-day projection</p>
</div>
{/* Expense / Income Segmented Tab */}
<div className="inline-flex p-1 rounded-xl bg-surface-container-low self-start sm:self-auto">
<button className="px-4 py-1.5 rounded-lg font-label-md text-label-md bg-surface-container-lowest text-expense-negative font-semibold shadow-sm transition-all" id="tab-expense" onclick="setEntryType('expense')" type="button">
            Expense / Outflow
          </button>
<button className="px-4 py-1.5 rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-all" id="tab-income" onclick="setEntryType('income')" type="button">
            Income / Inflow
          </button>
</div>
</div>
{/* Form Inputs Grid */}
<form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md pt-2" onsubmit="event.preventDefault(); alert('Event added to predictive projection model.');">
{/* Event Name */}
<div className="space-y-1">
<label className="font-label-sm text-label-sm text-text-secondary uppercase">Transaction Description</label>
<input className="w-full h-10 px-3 rounded-lg bg-background-secondary text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="e.g. Car Insurance Premium" type="text" defaultValue="Car Insurance Premium Renewal"/>
</div>
{/* Amount (INR) */}
<div className="space-y-1">
<label className="font-label-sm text-label-sm text-text-secondary uppercase">Expected Amount (₹)</label>
<div className="relative flex items-center">
<span className="absolute left-3 font-semibold text-primary">₹</span>
<input className="w-full h-10 pl-8 pr-3 rounded-lg bg-background-secondary text-body-md text-on-surface font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20" type="text" defaultValue="3,200"/>
</div>
</div>
{/* Date Picker */}
<div className="space-y-1">
<label className="font-label-sm text-label-sm text-text-secondary uppercase">Expected Date</label>
<input className="w-full h-10 px-3 rounded-lg bg-background-secondary text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20" type="date" defaultValue="2026-11-12"/>
</div>
{/* Category & Frequency Dropdowns */}
<div className="space-y-1">
<label className="font-label-sm text-label-sm text-text-secondary uppercase">Category &amp; Frequency</label>
<div className="grid grid-cols-2 gap-2">
<select className="w-full h-10 px-2 rounded-lg bg-background-secondary text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20">
<option>Insurance</option>
<option>Utilities</option>
<option>Housing</option>
<option>Loans</option>
<option>Discretionary</option>
</select>
<select className="w-full h-10 px-2 rounded-lg bg-background-secondary text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20">
<option>One-time</option>
<option>Monthly</option>
<option>Annual</option>
</select>
</div>
</div>
{/* Action Row */}
<div className="md:col-span-2 lg:col-span-4 flex items-center justify-end gap-space-sm pt-space-xs">
<button className="px-4 py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-container transition-colors" type="reset">
            Cancel
          </button>
<button className="flex items-center gap-1.5 px-5 py-2 rounded-lg font-label-md text-label-md bg-primary text-on-primary hover:bg-primary-container shadow-sm transition-colors" type="submit">
<span className="material-symbols-outlined text-[18px]">add_task</span>
<span>Save Expected Event</span>
</button>
</div>
</form>
{/* Client-side Tab Switcher Script */}

</div>
{/* 8. DISCLAIMER FOOTER */}
<div className="pt-space-md pb-space-lg text-center font-caption text-caption text-text-secondary max-w-3xl mx-auto leading-relaxed">
      Cash flow projections are mathematical estimates derived from recorded historical patterns, scheduled recurring mandates, and user-forecasted commitments. They do not constitute guaranteed bank balances or real-time banking connections.
    </div>
</div>
</div>
    </>
  );
}
