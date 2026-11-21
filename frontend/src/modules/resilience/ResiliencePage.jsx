import React from 'react';

export default function ResiliencePage() {

  React.useEffect(() => {
    function selectScenario(scenarioKey) {
      document.querySelectorAll('.scenario-card').forEach(el => {
        el.classList.remove('ring-2', 'ring-primary', 'bg-surface-container-low');
      });

      const activeCard = document.getElementById('scenario-card-' + scenarioKey);
      if (activeCard) {
        activeCard.classList.add('bg-surface-container-low', 'ring-2', 'ring-primary');
      }

      const titleEl = document.getElementById('active-scenario-title');
      if (titleEl) {
        if (scenarioKey === 'A') {
          titleEl.innerText = "Scenario A: Salary Delayed by 15 Days (Timing Gap)";
        } else if (scenarioKey === 'B') {
          titleEl.innerText = "Scenario B: Job Loss for 2 Months (-₹30,000 Living Burn)";
        } else if (scenarioKey === 'C') {
          titleEl.innerText = "Scenario C: Unexpected Medical Emergency (₹30,000 Outflow)";
        } else if (scenarioKey === 'D') {
          titleEl.innerText = "Scenario D: Rent Escalation (+₹3,000/mo Fixed Outflow)";
        } else if (scenarioKey === 'E') {
          titleEl.innerText = "Scenario E: New Two-Wheeler / Vehicle EMI (₹5,000/mo Cash Squeeze)";
        }
      }

      const results = document.getElementById('simulation-results-panel');
      if (results) {
        results.classList.add('animate-pulse');
        setTimeout(() => results.classList.remove('animate-pulse'), 300);
      }
    }

    ['A', 'B', 'C', 'D', 'E'].forEach(key => {
      const card = document.getElementById('scenario-card-' + key);
      card?.addEventListener('click', () => selectScenario(key));
    });

    const contribSlider = document.querySelector('input[type="range"][max="25000"]');
    const contribDisplay = document.getElementById('monthly-amt-display');
    const onContribChange = (e) => {
      if (contribDisplay) {
        contribDisplay.innerText = '₹' + Number(e.target.value).toLocaleString('en-IN') + ' / mo';
      }
    };
    contribSlider?.addEventListener('input', onContribChange);

    return () => {
      contribSlider?.removeEventListener('input', onContribChange);
    };
  }, []);

  return (
    <>
<div className="flex flex-col w-full px-margin-desktop py-space-xl space-y-space-xl">
{/* TOP HEADER SECTION */}
<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-lg bg-surface-container-lowest p-space-xl rounded-xl shadow-sm">
<div className="space-y-space-xs max-w-2xl">
<div className="flex items-center gap-space-sm flex-wrap">
<h1 className="font-display text-display text-on-surface">Financial Resilience Planner</h1>
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-primary font-label-md text-label-md">
<span className="material-symbols-outlined text-[16px]">verified_user</span>
          Stress-Test &amp; Safety Buffer Model
        </span>
</div>
<p className="font-body-md text-body-md text-text-secondary leading-relaxed">
        Prepare for unexpected financial events and gauge how reliably your liquid reserves cushion essential outflows against volatile income shocks and sudden expenses.
      </p>
</div>
{/* Switcher & Top Actions */}
<div className="flex flex-wrap items-center gap-space-md">
<div className="flex p-1 bg-surface-container-low rounded-lg">
<button className="px-space-md py-2 rounded-lg bg-surface-container-lowest font-headline-sm text-headline-sm text-primary shadow-sm transition-all flex items-center gap-1.5" id="tab-emergency-fund">
<span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
          Emergency Fund
        </button>
<button className="px-space-md py-2 rounded-lg font-headline-sm text-headline-sm text-on-surface-variant hover:text-on-surface transition-all flex items-center gap-1.5" id="tab-simulator">
<span className="material-symbols-outlined text-[18px]">tune</span>
          What-If Simulator
        </button>
</div>
<div className="flex items-center gap-space-sm">
<button className="px-space-md py-2.5 rounded-lg bg-surface-container text-primary hover:bg-surface-container-high transition-colors font-headline-sm text-headline-sm flex items-center gap-1" onclick="document.getElementById('custom-scenario-builder').scrollIntoView({ behavior: 'smooth' });">
<span className="material-symbols-outlined text-[18px]">add</span>
<span className="hidden sm:inline">Stress Scenario</span>
</button>
<button className="px-space-md py-2.5 rounded-lg bg-primary text-on-primary hover:bg-primary/90 transition-colors font-headline-sm text-headline-sm flex items-center gap-1.5 shadow-sm" onclick="triggerReportExport()">
<span className="material-symbols-outlined text-[18px]">file_download</span>
          Export Report
        </button>
</div>
</div>
</div>
{/* STATUS BANNER / BUFFER CALLOUT */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-md bg-surface-container p-space-lg rounded-xl">
<div className="flex items-center gap-space-md bg-surface-container-lowest p-space-md rounded-lg shadow-sm">
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[24px]">speed</span>
</div>
<div>
<span className="font-label-sm text-label-sm text-text-secondary uppercase tracking-wider block">Resilience Rating</span>
<span className="font-headline-md text-headline-md text-on-surface font-semibold">Medium-High (2.7 Months)</span>
</div>
</div>
<div className="flex items-center gap-space-md bg-surface-container-lowest p-space-md rounded-lg shadow-sm">
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[24px]">local_fire_department</span>
</div>
<div>
<span className="font-label-sm text-label-sm text-text-secondary uppercase tracking-wider block">Essential Monthly Burn</span>
<span className="font-headline-md text-headline-md text-on-surface font-semibold">₹15,000 / month</span>
</div>
</div>
<div className="flex items-center gap-space-md bg-surface-container-lowest p-space-md rounded-lg shadow-sm">
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-income-positive">
<span className="material-symbols-outlined text-[24px]">security</span>
</div>
<div>
<span className="font-label-sm text-label-sm text-text-secondary uppercase tracking-wider block">Safety Target Status</span>
<span className="font-headline-md text-headline-md text-income-positive font-semibold">44.4% of 6-Mo Goal Reached</span>
</div>
</div>
</div>
{/* KPI SUMMARY CARDS */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
{/* Card 1 */}
<div className="bg-surface-container-lowest p-space-xl rounded-lg shadow-sm flex flex-col justify-between space-y-space-md">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-text-secondary uppercase tracking-wider">Current Emergency Savings</span>
<div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[20px]">account_balance</span>
</div>
</div>
<div>
<div className="font-metric-xl text-metric-xl text-on-surface tracking-tight">₹40,000</div>
<div className="mt-1 flex items-center gap-2">
<span className="px-2 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm font-semibold">2.7 Months Runway</span>
</div>
</div>
<div className="pt-space-xs">
<div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
<div className="bg-primary h-full rounded-full" style={{"width":"44.4%"}}></div>
</div>
<span className="font-caption text-caption text-text-secondary mt-1.5 block">44.4% of ₹90,000 target</span>
</div>
</div>
{/* Card 2 */}
<div className="bg-surface-container-lowest p-space-xl rounded-lg shadow-sm flex flex-col justify-between space-y-space-md">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-text-secondary uppercase tracking-wider">Target Emergency Fund</span>
<div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[20px]">flag</span>
</div>
</div>
<div>
<div className="font-metric-xl text-metric-xl text-on-surface tracking-tight">₹90,000</div>
<p className="font-caption text-caption text-text-secondary mt-1">6 Months of Essential Outflows</p>
</div>
<div className="flex items-center justify-between pt-space-xs">
<span className="font-label-sm text-label-sm text-text-secondary">₹15,000/mo baseline</span>
<button className="font-label-sm text-label-sm text-primary hover:text-primary-container font-semibold inline-flex items-center gap-0.5">
          Edit Target ⚙️
        </button>
</div>
</div>
{/* Card 3 */}
<div className="bg-surface-container-lowest p-space-xl rounded-lg shadow-sm flex flex-col justify-between space-y-space-md">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-text-secondary uppercase tracking-wider">Essential Monthly Burn</span>
<div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-warning-alert">
<span className="material-symbols-outlined text-[20px]">lock_clock</span>
</div>
</div>
<div>
<div className="font-metric-xl text-metric-xl text-on-surface tracking-tight">₹15,000</div>
<div className="mt-1 flex flex-wrap gap-1">
<span className="font-caption text-caption text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded">Rent: ₹8k</span>
<span className="font-caption text-caption text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded">EMIs: ₹4.5k</span>
<span className="font-caption text-caption text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded">Food: ₹2.5k</span>
</div>
</div>
<div className="pt-space-xs">
<span className="font-caption text-caption text-text-secondary flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-income-positive"></span>
          Non-discretionary baseline
        </span>
</div>
</div>
{/* Card 4 */}
<div className="bg-surface-container-lowest p-space-xl rounded-lg shadow-sm flex flex-col justify-between space-y-space-md">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-text-secondary uppercase tracking-wider">Pace &amp; Completion</span>
<div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[20px]">event_upcoming</span>
</div>
</div>
<div>
<div className="font-metric-xl text-metric-xl text-on-surface tracking-tight">₹5,000 <span className="font-label-md text-label-md text-text-secondary font-normal">/ mo</span></div>
<p className="font-caption text-caption text-text-secondary mt-1">Goal target: September 2027</p>
</div>
<div className="flex items-center justify-between pt-space-xs">
<span className="font-label-sm text-label-sm font-semibold text-primary">10 Months remaining</span>
<button className="font-label-sm text-label-sm text-text-secondary hover:text-on-surface inline-flex items-center gap-0.5">
          Adjust ✏️
        </button>
</div>
</div>
</div>
{/* EMERGENCY FUND GROWTH & MILESTONES */}
<div className="bg-surface-container-lowest p-space-xl rounded-xl shadow-sm space-y-space-xl">
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-space-md">
<div>
<h2 className="font-headline-lg text-headline-lg text-on-surface">Emergency Fund Runway Trajectory</h2>
<p className="font-body-md text-body-md text-text-secondary">Projected accumulation path towards the full 6-month safety buffer</p>
</div>
<div className="flex items-center gap-space-md text-label-sm font-label-sm text-text-secondary flex-wrap">
<span className="flex items-center gap-1.5">
<span className="w-3 h-3 rounded-full bg-primary inline-block"></span>
          Base Trajectory (₹5,000/mo)
        </span>
<span className="flex items-center gap-1.5">
<span className="w-3 h-3 rounded-full bg-tertiary inline-block"></span>
          Accelerated (+₹2,500/mo)
        </span>
<span className="flex items-center gap-1.5">
<span className="w-3 h-1 bg-expense-negative inline-block"></span>
          Goal Level (₹90,000)
        </span>
</div>
</div>
{/* Stepper Milestones */}
<div className="p-space-lg bg-surface-container rounded-xl space-y-space-sm">
<div className="flex justify-between items-end font-label-md text-label-md text-on-surface flex-wrap gap-2">
<div className="flex flex-col">
<span className="text-primary font-semibold">Current: ₹40,000 (2.7 mo)</span>
<span className="font-caption text-caption text-text-secondary">Baseline liquidity in high-yield vault</span>
</div>
<div className="flex flex-col items-center">
<span className="font-semibold text-on-surface">M1: 3-Month Tier (₹45,000)</span>
<span className="font-caption text-caption text-income-positive">1 Month away (Dec 2026)</span>
</div>
<div className="flex flex-col items-center">
<span className="font-semibold text-on-surface">M2: 6-Month Target (₹90,000)</span>
<span className="font-caption text-caption text-primary">Primary Objective (Sep 2027)</span>
</div>
<div className="flex flex-col items-end">
<span className="font-semibold text-text-secondary">M3: 9-Month Buffer (₹1,35,000)</span>
<span className="font-caption text-caption text-text-secondary">Optional Expansion (May 2028)</span>
</div>
</div>
{/* Segmented Bar */}
<div className="h-3 w-full bg-surface-container-highest rounded-full overflow-hidden flex">
<div className="bg-primary h-full transition-all duration-500" style={{"width":"29.6%"}} title="Current: ₹40k"></div>
<div className="bg-primary-fixed-dim h-full transition-all duration-500" style={{"width":"3.7%"}} title="Next Tier Gap: ₹5k"></div>
<div className="bg-surface-container-high h-full" style={{"width":"33.3%"}} title="To 6-Month Goal: ₹45k"></div>
<div className="bg-surface-container h-full" style={{"width":"33.4%"}} title="Stretch Zone"></div>
</div>
</div>
{/* Visual Chart Area */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-space-xl items-start">
<div className="lg:col-span-2 space-y-space-md">
{/* Responsive SVG Area Chart */}
<div className="w-full h-64 relative bg-surface-container-low rounded-lg p-space-md overflow-hidden">
<svg className="w-full h-full" fill="none" preserveaspectratio="none" viewbox="0 0 700 240">
<defs>
<lineargradient id="primaryAreaGrad" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.25"></stop>
<stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0"></stop>
</lineargradient>
<lineargradient id="boostAreaGrad" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stopColor="#712ae2" stopOpacity="0.2"></stop>
<stop offset="100%" stopColor="#712ae2" stopOpacity="0.0"></stop>
</lineargradient>
</defs>
{/* Grid Lines */}
<line stroke="#EAE7F2" strokeDasharray="3 3" x1="40" x2="680" y1="30" y2="30"></line>
<line stroke="#EAE7F2" strokeDasharray="3 3" x1="40" x2="680" y1="90" y2="90"></line>
<line stroke="#EAE7F2" strokeDasharray="3 3" x1="40" x2="680" y1="150" y2="150"></line>
<line stroke="#EAE7F2" x1="40" x2="680" y1="210" y2="210"></line>
{/* Threshold Target Line: ₹90,000 */}
<line stroke="#E05252" strokeDasharray="5 5" strokeWidth="1.5" x1="40" x2="680" y1="65" y2="65"></line>
<text fill="#E05252" font-family="Inter" font-size="10" font-weight="600" text-anchor="end" x="685" y="69">₹90k Target</text>
{/* Threshold M1 Line: ₹45,000 */}
<line stroke="#8B5CF6" strokeDasharray="4 4" stroke-opacity="0.6" strokeWidth="1" x1="40" x2="680" y1="140" y2="140"></line>
<text fill="#6b38d4" font-family="Inter" font-size="10" font-weight="500" text-anchor="end" x="685" y="144">₹45k (3-Mo)</text>
{/* Trajectory Area 2 (Accelerated) */}
<path d="M 50 150 L 110 138 L 170 120 L 230 100 L 290 80 L 350 62 L 410 45 L 470 30 L 530 20 L 590 15 L 650 10 L 650 210 L 50 210 Z" fill="url(#boostAreaGrad)"></path>
<path d="M 50 150 L 110 138 L 170 120 L 230 100 L 290 80 L 350 62 L 410 45 L 470 30 L 530 20 L 590 15 L 650 10" stroke="#712ae2" strokeLinecap="round" strokeWidth="2"></path>
{/* Trajectory Area 1 (Base: ₹5k/mo) */}
<path d="M 50 150 L 110 142 L 170 133 L 230 124 L 290 115 L 350 105 L 410 95 L 470 85 L 530 75 L 590 65 L 650 55 L 650 210 L 50 210 Z" fill="url(#primaryAreaGrad)"></path>
<path d="M 50 150 L 110 142 L 170 133 L 230 124 L 290 115 L 350 105 L 410 95 L 470 85 L 530 75 L 590 65 L 650 55" stroke="#8B5CF6" strokeLinecap="round" strokeWidth="2.5"></path>
{/* Data Dots: Current State */}
<circle cx="50" cy="150" fill="#8B5CF6" r="5" stroke="#FFFFFF" strokeWidth="2"></circle>
{/* Target achieved dot (Month 10) */}
<circle cx="590" cy="65" fill="#16A34A" r="4.5" stroke="#FFFFFF" strokeWidth="1.5"></circle>
{/* Month Labels on Axis */}
<text fill="#64748B" font-family="Inter" font-size="10" text-anchor="middle" x="50" y="228">Nov '26</text>
<text fill="#64748B" font-family="Inter" font-size="10" text-anchor="middle" x="170" y="228">Jan '27</text>
<text fill="#64748B" font-family="Inter" font-size="10" text-anchor="middle" x="290" y="228">Mar '27</text>
<text fill="#64748B" font-family="Inter" font-size="10" text-anchor="middle" x="410" y="228">May '27</text>
<text fill="#64748B" font-family="Inter" font-size="10" text-anchor="middle" x="530" y="228">Jul '27</text>
<text fill="#8B5CF6" font-family="Inter" font-size="10" font-weight="700" text-anchor="middle" x="590" y="228">Sep '27 (Goal)</text>
<text fill="#64748B" font-family="Inter" font-size="10" text-anchor="middle" x="650" y="228">Oct '27</text>
</svg>
</div>
<div className="flex items-center justify-between text-caption font-caption text-text-secondary px-1">
<span>* Projections assume monthly compounding yield of 6.8% p.a. in RBI-regulated Liquid Mutual Funds / High-Yield Savings.</span>
<span className="text-primary font-medium cursor-pointer hover:underline">View Calculation Assumptions</span>
</div>
</div>
{/* Quick Contribution & Calibration Panel */}
<div className="bg-surface-container-low p-space-lg rounded-xl space-y-space-md">
<div className="flex items-center justify-between">
<span className="font-headline-sm text-headline-sm text-on-surface">Accelerate Runway</span>
<span className="material-symbols-outlined text-primary text-[20px]">bolt</span>
</div>
<div className="space-y-space-xs">
<div className="flex justify-between font-label-md text-label-md">
<span className="text-text-secondary">Monthly SIP Contribution</span>
<span className="font-semibold text-on-surface" id="monthly-amt-display">₹5,000 / mo</span>
</div>
<input className="w-full accent-primary cursor-pointer" id="monthly-slider" max="15000" min="2000" oninput="updateContribution(this.value)" step="500" type="range" defaultValue="5000"/>
<div className="flex justify-between font-caption text-caption text-text-secondary">
<span>₹2,000</span>
<span>₹15,000</span>
</div>
</div>
<div className="space-y-space-xs pt-space-xs">
<label className="font-label-md text-label-md text-text-secondary block">Apply One-time Inflow Booster</label>
<div className="flex rounded-lg overflow-hidden bg-surface-container-lowest shadow-sm">
<span className="px-3 py-2 text-primary font-semibold font-headline-sm text-headline-sm bg-surface-container flex items-center">₹</span>
<input className="w-full px-3 py-2 font-body-md text-body-md text-on-surface focus:outline-none bg-surface-container-lowest" id="booster-input" placeholder="15,000 (Bonus, Tax Refund)" type="number" defaultValue="15000"/>
</div>
</div>
<button className="w-full py-2.5 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-colors font-headline-sm text-headline-sm flex items-center justify-center gap-1.5 shadow-sm" onclick="applyBooster()">
<span className="material-symbols-outlined text-[18px]">calculate</span>
          Recalculate Runway
        </button>
<div className="p-space-md rounded-lg bg-surface-container flex items-start gap-space-sm">
<span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">tips_and_updates</span>
<p className="font-caption text-caption text-on-surface leading-snug">
<span className="font-semibold text-primary">AI Insight:</span> Redirecting <strong className="text-on-surface font-semibold">₹800/mo</strong> from discretionary dining surplus shrinks your emergency fund completion timeline by <strong className="text-on-surface font-semibold">1.8 months</strong>.
          </p>
</div>
</div>
</div>
</div>
{/* WHAT-IF SCENARIO SIMULATOR */}
<div className="space-y-space-lg">
<div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
<div>
<h2 className="font-headline-lg text-headline-lg text-on-surface flex items-center gap-2">
<span>Stress-Test Simulator: What If Life Happens?</span>
<span className="text-label-sm font-label-sm px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container">Interactive</span>
</h2>
<p className="font-body-md text-body-md text-text-secondary">
          Select or configure an adverse financial shock to evaluate its net impact on your liquidity, runway, and recovery time.
        </p>
</div>
<span className="font-label-sm text-label-sm text-text-secondary self-start md:self-auto">
        Showing impact on baseline: <strong className="text-on-surface">₹40,000 liquid</strong>
</span>
</div>
{/* 6 SCENARIO CARDS */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-lg">
{/* Scenario A */}
<div className="scenario-card cursor-pointer bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-space-md" id="scenario-card-A" onclick="selectScenario('A')">
<div>
<div className="flex items-center justify-between mb-space-xs">
<span className="px-2 py-0.5 rounded text-caption font-caption font-semibold bg-surface-container text-primary">Cash Flow Delay</span>
<span className="px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-surface-container text-income-positive font-medium">Low Risk</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface">Salary Delayed by 15 Days</h3>
<p className="font-body-md text-body-md text-text-secondary mt-1">Temporary cash freeze before corporate payroll disbursement.</p>
</div>
<div className="space-y-1 pt-space-xs">
<div className="flex justify-between font-label-sm text-label-sm">
<span className="text-text-secondary">Impact:</span>
<span className="font-semibold text-on-surface">-₹40,000 temporary timing gap</span>
</div>
<div className="flex justify-between font-label-sm text-label-sm">
<span className="text-text-secondary">Runway After Shock:</span>
<span className="font-semibold text-income-positive">2.7 mo (Fully Protected)</span>
</div>
</div>
</div>
{/* Scenario B */}
<div className="scenario-card cursor-pointer bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-space-md" id="scenario-card-B" onclick="selectScenario('B')">
<div>
<div className="flex items-center justify-between mb-space-xs">
<span className="px-2 py-0.5 rounded text-caption font-caption font-semibold bg-error-container text-error">Income Shock</span>
<span className="px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-error-container text-error font-medium">High Risk</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface">Job Loss for 2 Months</h3>
<p className="font-body-md text-body-md text-text-secondary mt-1">Sudden unemployment requiring total living reliance on safety fund.</p>
</div>
<div className="space-y-1 pt-space-xs">
<div className="flex justify-between font-label-sm text-label-sm">
<span className="text-text-secondary">Impact:</span>
<span className="font-semibold text-expense-negative">-₹30,000 essential burn</span>
</div>
<div className="flex justify-between font-label-sm text-label-sm">
<span className="text-text-secondary">Runway After Shock:</span>
<span className="font-semibold text-expense-negative">0.7 mo (Critical)</span>
</div>
</div>
</div>
{/* Scenario C (Pre-selected) */}
<div className="scenario-card cursor-pointer bg-surface-container-lowest p-space-lg rounded-xl shadow-md transition-all flex flex-col justify-between space-y-space-md relative overflow-hidden bg-surface-container-low" id="scenario-card-C" onclick="selectScenario('C')">
<div className="absolute top-0 right-0 w-2 h-full bg-primary"></div>
<div>
<div className="flex items-center justify-between mb-space-xs">
<span className="px-2 py-0.5 rounded text-caption font-caption font-semibold bg-surface-container text-primary">Sudden Outflow</span>
<span className="px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-surface-container text-warning-alert font-medium">Active Test</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface">Unexpected Medical Emergency</h3>
<p className="font-body-md text-body-md text-text-secondary mt-1">Hospital copay, diagnostics, or uncovered insurance copayment.</p>
</div>
<div className="space-y-1 pt-space-xs">
<div className="flex justify-between font-label-sm text-label-sm">
<span className="text-text-secondary">Impact:</span>
<span className="font-semibold text-expense-negative">-₹30,000 lump sum debit</span>
</div>
<div className="flex justify-between font-label-sm text-label-sm">
<span className="text-text-secondary">Runway After Shock:</span>
<span className="font-semibold text-warning-alert">0.7 mo (Alert Zone)</span>
</div>
</div>
</div>
{/* Scenario D */}
<div className="scenario-card cursor-pointer bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-space-md" id="scenario-card-D" onclick="selectScenario('D')">
<div>
<div className="flex items-center justify-between mb-space-xs">
<span className="px-2 py-0.5 rounded text-caption font-caption font-semibold bg-secondary-container text-on-surface-variant">Fixed Cost Hike</span>
<span className="px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-surface-container text-warning-alert font-medium">Moderate</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface">Rent Escalation (+₹3,000/mo)</h3>
<p className="font-body-md text-body-md text-text-secondary mt-1">Lease renewal rate revision inflating baseline monthly burn to ₹18,000.</p>
</div>
<div className="space-y-1 pt-space-xs">
<div className="flex justify-between font-label-sm text-label-sm">
<span className="text-text-secondary">Target Shift:</span>
<span className="font-semibold text-on-surface">Target becomes ₹1,08,000</span>
</div>
<div className="flex justify-between font-label-sm text-label-sm">
<span className="text-text-secondary">Runway After Shock:</span>
<span className="font-semibold text-on-surface">Drops to 2.2 mo</span>
</div>
</div>
</div>
{/* Scenario E */}
<div className="scenario-card cursor-pointer bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-space-md" id="scenario-card-E" onclick="selectScenario('E')">
<div>
<div className="flex items-center justify-between mb-space-xs">
<span className="px-2 py-0.5 rounded text-caption font-caption font-semibold bg-surface-container text-primary">Debt Commitment</span>
<span className="px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-surface-container text-warning-alert font-medium">Cash Squeeze</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface">New Two-Wheeler / Car EMI</h3>
<p className="font-body-md text-body-md text-text-secondary mt-1">Adding ₹5,000/mo vehicle installment, exhausting current savings rate.</p>
</div>
<div className="space-y-1 pt-space-xs">
<div className="flex justify-between font-label-sm text-label-sm">
<span className="text-text-secondary">Savings Pace:</span>
<span className="font-semibold text-expense-negative">₹0/mo net accumulation</span>
</div>
<div className="flex justify-between font-label-sm text-label-sm">
<span className="text-text-secondary">Target Delay:</span>
<span className="font-semibold text-expense-negative">Stalls until wage raise</span>
</div>
</div>
</div>
{/* Scenario F (Custom Add) */}
<div className="cursor-pointer bg-surface-container p-space-lg rounded-xl shadow-sm hover:bg-surface-container-high transition-all flex flex-col items-center justify-center text-center space-y-space-sm min-h-[160px]" onclick="document.getElementById('custom-scenario-builder').scrollIntoView({ behavior: 'smooth' });">
<div className="w-12 h-12 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm">
<span className="material-symbols-outlined text-[28px]">add_circle</span>
</div>
<div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Build Custom Scenario</h3>
<p className="font-caption text-caption text-text-secondary mt-0.5">Test appliance breakdown, travel contingency, or salary drop</p>
</div>
</div>
</div>
</div>
{/* SIMULATION RESULTS & BEFORE-VS-AFTER COMPARISON MATRIX */}
<div className="bg-surface-container-lowest p-space-xl rounded-xl shadow-sm space-y-space-xl" id="simulation-results-panel">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
<div className="space-y-1">
<span className="px-2.5 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm font-semibold inline-block">Active Stress Test Analysis</span>
<h3 className="font-headline-lg text-headline-lg text-on-surface" id="active-scenario-title">Scenario C: Unexpected Medical Emergency (₹30,000 Outflow)</h3>
</div>
<div className="flex items-center gap-space-xs">
<span className="w-2.5 h-2.5 rounded-full bg-warning-alert animate-ping"></span>
<span className="font-label-sm text-label-sm text-warning-alert font-semibold uppercase tracking-wider">Simulated Shock Active</span>
</div>
</div>
{/* Before vs After Metrics Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-md">
{/* Col 1 */}
<div className="p-space-lg bg-surface-container rounded-lg flex flex-col justify-between space-y-space-sm">
<span className="font-label-sm text-label-sm text-text-secondary uppercase">Emergency Runway</span>
<div className="space-y-1">
<div className="flex items-baseline justify-between">
<span className="font-headline-sm text-headline-sm text-text-secondary line-through">2.7 Months</span>
<span className="font-metric-xl text-metric-xl text-expense-negative">0.7 Mo</span>
</div>
<span className="inline-block px-2 py-0.5 rounded bg-error-container text-error font-caption text-caption font-semibold">-2.0 Months Loss</span>
</div>
</div>
{/* Col 2 */}
<div className="p-space-lg bg-surface-container rounded-lg flex flex-col justify-between space-y-space-sm">
<span className="font-label-sm text-label-sm text-text-secondary uppercase">Liquid Cash Reserves</span>
<div className="space-y-1">
<div className="flex items-baseline justify-between">
<span className="font-headline-sm text-headline-sm text-text-secondary line-through">₹40,000</span>
<span className="font-metric-xl text-metric-xl text-expense-negative">₹10,000</span>
</div>
<span className="font-caption text-caption text-text-secondary">₹30,000 liquid absorbed</span>
</div>
</div>
{/* Col 3 */}
<div className="p-space-lg bg-surface-container rounded-lg flex flex-col justify-between space-y-space-sm">
<span className="font-label-sm text-label-sm text-text-secondary uppercase">Immediate Cash Deficit</span>
<div className="space-y-1">
<div className="font-metric-xl text-metric-xl text-on-surface">₹0 <span className="font-headline-sm text-headline-sm text-income-positive">Deficit</span></div>
<span className="font-caption text-caption text-income-positive font-medium">Covered without high-interest debt</span>
</div>
</div>
{/* Col 4 */}
<div className="p-space-lg bg-surface-container rounded-lg flex flex-col justify-between space-y-space-sm">
<span className="font-label-sm text-label-sm text-text-secondary uppercase">Rebuild to ₹40k Buffer</span>
<div className="space-y-1">
<div className="font-metric-xl text-metric-xl text-on-surface">6 Months</div>
<span className="font-caption text-caption text-text-secondary">At standard ₹5,000/mo SIP pace</span>
</div>
</div>
{/* Col 5 */}
<div className="p-space-lg bg-surface-container rounded-lg flex flex-col justify-between space-y-space-sm">
<span className="font-label-sm text-label-sm text-text-secondary uppercase">Goal Target Postponement</span>
<div className="space-y-1">
<div className="font-metric-xl text-metric-xl text-warning-alert">+6 Months</div>
<span className="font-caption text-caption text-text-secondary">Completion delayed to Mar 2028</span>
</div>
</div>
</div>
{/* Visual Stress Curve Chart */}
<div className="p-space-lg bg-surface-container-low rounded-xl space-y-space-md">
<div className="flex items-center justify-between">
<span className="font-headline-sm text-headline-sm text-on-surface">Shock Trajectory &amp; Step Recovery Path</span>
<div className="flex items-center gap-space-md font-caption text-caption text-text-secondary">
<span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-expense-negative"></span> Medical Shock (-₹30k)</span>
<span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-primary"></span> Organic Recovery (₹5k/mo)</span>
<span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-income-positive"></span> AI Accelerated Plan</span>
</div>
</div>
<div className="w-full h-56 relative overflow-hidden">
<svg className="w-full h-full" fill="none" preserveaspectratio="none" viewbox="0 0 760 200">
{/* Background Zones */}
<rect fill="#ffdad6" fill-opacity="0.3" height="60" width="760" x="0" y="140"></rect>
<text fill="#ba1a1a" font-family="Inter" font-size="9" font-weight="600" x="10" y="185">CRITICAL RUNWAY ZONE (&lt; 1 MONTH)</text>
{/* Safe Baseline Line */}
<line stroke="#cbc3d7" strokeDasharray="4 4" x1="0" x2="760" y1="90" y2="90"></line>
<text fill="#64748B" font-family="Inter" font-size="9" text-anchor="end" x="750" y="85">Pre-Shock Balance: ₹40,000</text>
{/* Shock Drop & Regular Recovery Line */}
<path d="M 10 90 L 60 90 L 60 170 L 120 160 L 180 150 L 240 140 L 300 130 L 360 115 L 420 100 L 480 90 L 540 75 L 600 60 L 660 45 L 720 30" stroke="#8B5CF6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
{/* Instant Drop Indicator */}
<circle cx="60" cy="90" fill="#E05252" r="4"></circle>
<circle cx="60" cy="170" fill="#E05252" r="5" stroke="#FFFFFF" strokeWidth="2"></circle>
<line stroke="#E05252" strokeDasharray="2 2" strokeWidth="2" x1="60" x2="60" y1="90" y2="170"></line>
{/* AI Accelerated Recovery Curve (faster) */}
<path d="M 60 170 L 120 140 L 180 115 L 240 90 L 300 65 L 360 40 L 420 20" stroke="#16A34A" strokeDasharray="4 3" strokeLinecap="round" strokeWidth="2"></path>
{/* Milestones Points */}
<text fill="#E05252" font-family="Inter" font-size="10" font-weight="700" x="65" y="130">-₹30,000 Instant Shock</text>
<text fill="#16A34A" font-family="Inter" font-size="10" font-weight="600" x="245" y="84">AI Plan: Recovered in 3 Mos</text>
<text fill="#6b38d4" font-family="Inter" font-size="10" x="485" y="84">Base: Recovered in 6 Mos</text>
</svg>
</div>
</div>
</div>
{/* TWO COLUMN SPLIT: CUSTOM SCENARIO BUILDER + AI ACTION PLAN */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
{/* LEFT: Custom Stress Scenario Builder (5 cols) */}
<div className="lg:col-span-5 bg-surface-container-lowest p-space-xl rounded-xl shadow-sm flex flex-col justify-between space-y-space-lg" id="custom-scenario-builder">
<div className="space-y-space-xs">
<div className="flex items-center gap-space-xs text-primary">
<span className="material-symbols-outlined text-[22px]">tune</span>
<h3 className="font-headline-lg text-headline-lg text-on-surface">Custom Stress Builder</h3>
</div>
<p className="font-body-md text-body-md text-text-secondary">Simulate bespoke financial headwinds tailored to your domestic lifestyle.</p>
</div>
<form className="space-y-space-md" onsubmit="handleCustomSimulate(event)">
{/* Input 1: Scenario Name */}
<div className="space-y-1">
<label className="font-label-md text-label-md text-on-surface font-medium block">Scenario Title</label>
<input className="w-full h-10 px-3 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 transition-all" id="cust-name" type="text" defaultValue="Home Appliance Repair &amp; Travel"/>
</div>
{/* Input 2: Type Dropdown */}
<div className="space-y-1">
<label className="font-label-md text-label-md text-on-surface font-medium block">Category of Shock</label>
<div className="relative">
<select className="w-full h-10 px-3 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:bg-surface-container-lowest appearance-none cursor-pointer" id="cust-type">
<option value="lump_sum">Sudden One-Time Outflow</option>
<option value="income_pause">Temporary Income Pause</option>
<option value="recurring_hike">Recurring Fixed Expense Rise</option>
<option value="delayed_inflow">Client Inflow Payment Delay</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-2.5 text-text-secondary pointer-events-none text-[18px]">expand_more</span>
</div>
</div>
{/* Input 3: Amount */}
<div className="space-y-1">
<label className="font-label-md text-label-md text-on-surface font-medium block">Financial Magnitude</label>
<div className="flex rounded-lg overflow-hidden bg-surface-container-low focus-within:ring-2 focus-within:ring-primary/20">
<span className="px-3.5 py-2 text-primary font-semibold font-headline-sm text-headline-sm bg-surface-container flex items-center">₹</span>
<input className="w-full px-3 py-2 bg-transparent font-body-md text-body-md text-on-surface focus:outline-none" id="cust-amount" type="number" defaultValue="25000"/>
</div>
</div>
{/* Input 4: Horizon */}
<div className="grid grid-cols-2 gap-space-sm">
<div className="space-y-1">
<label className="font-label-md text-label-md text-on-surface font-medium block">Effective Month</label>
<select className="w-full h-10 px-3 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none appearance-none cursor-pointer" id="cust-month">
<option>Dec 2026</option>
<option>Jan 2027</option>
<option>Feb 2027</option>
</select>
</div>
<div className="space-y-1">
<label className="font-label-md text-label-md text-on-surface font-medium block">Frequency</label>
<select className="w-full h-10 px-3 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none appearance-none cursor-pointer" id="cust-duration">
<option>One-Time Event</option>
<option>Recurring (2 Mos)</option>
<option>Recurring (6 Mos)</option>
</select>
</div>
</div>
{/* Submit & Reset */}
<div className="pt-space-sm flex items-center gap-space-sm">
<button className="flex-1 py-2.5 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-colors font-headline-sm text-headline-sm flex items-center justify-center gap-1.5 shadow-sm" type="submit">
<span className="material-symbols-outlined text-[18px]">play_arrow</span>
            Simulate Stress Test
          </button>
<button className="px-space-md py-2.5 rounded-lg bg-surface-container-low text-text-secondary hover:text-on-surface transition-colors font-headline-sm text-headline-sm" onclick="resetCustomScenario()" type="button">
            Reset
          </button>
</div>
</form>
</div>
{/* RIGHT: AI Action Plan & Recovery Steps (7 cols) */}
<div className="lg:col-span-7 bg-surface-container-lowest p-space-xl rounded-xl shadow-sm flex flex-col justify-between space-y-space-lg">
<div className="flex items-center justify-between">
<div className="space-y-0.5">
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-primary text-[22px]">auto_awesome</span>
<h3 className="font-headline-lg text-headline-lg text-on-surface">AI Resilience Action Plan</h3>
</div>
<p className="font-body-md text-body-md text-text-secondary">Smart recovery tactics to restore your runway from 0.7 to 2.7+ months in record time.</p>
</div>
<span className="px-2.5 py-1 rounded bg-surface-container text-primary font-label-sm text-label-sm font-semibold">Priority: Active</span>
</div>
{/* Steps Stack */}
<div className="space-y-space-md">
{/* Step 1 */}
<div className="p-space-md rounded-lg bg-surface-container flex items-start gap-space-md">
<div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-label-md shrink-0">1</div>
<div className="space-y-0.5 flex-1">
<div className="flex items-center justify-between">
<h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Pause Discretionary Dining &amp; Streaming</h4>
<span className="font-label-sm text-label-sm text-income-positive font-bold">+₹2,200 / mo</span>
</div>
<p className="font-body-md text-body-md text-text-secondary">
              Temporarily cap Swiggy/Zomato and pause 2 unused video subscriptions for 3 months to redirect surplus directly into emergency savings without impinging essential housing.
            </p>
</div>
</div>
{/* Step 2 */}
<div className="p-space-md rounded-lg bg-surface-container flex items-start gap-space-md">
<div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-label-md shrink-0">2</div>
<div className="space-y-0.5 flex-1">
<div className="flex items-center justify-between">
<h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Reallocate Freelance Retainer Wire (Nov 15)</h4>
<span className="font-label-sm text-label-sm text-income-positive font-bold">+₹5,000 one-time</span>
</div>
<p className="font-body-md text-body-md text-text-secondary">
              Channel the expected ₹5,000 UX consulting disbursement directly into the Liquid Fund rather than checking account to quickly lift runway out of the red warning threshold.
            </p>
</div>
</div>
{/* Step 3 */}
<div className="p-space-md rounded-lg bg-surface-container flex items-start gap-space-md">
<div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-label-md shrink-0">3</div>
<div className="space-y-0.5 flex-1">
<div className="flex items-center justify-between">
<h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Maintain ₹5,000 Zero-Deficit Checking Floor</h4>
<span className="font-label-sm text-label-sm text-primary font-semibold">Risk Prevention</span>
</div>
<p className="font-body-md text-body-md text-text-secondary">
              Never let your primary salary account fall below the ₹5,000 threshold to prevent NACH mandate rejection penalties and bounce charges on your 5th-of-the-month EMIs.
            </p>
</div>
</div>
</div>
{/* Action Footer */}
<div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs">
<button className="px-space-lg py-2.5 rounded-lg bg-primary text-on-primary hover:bg-primary/90 transition-colors font-headline-sm text-headline-sm flex items-center gap-1.5 shadow-sm" onclick="applyPlanNotice()">
<span className="material-symbols-outlined text-[18px]">check_circle</span>
          Apply Rebuild Plan to Budget
        </button>
<button className="px-space-md py-2.5 rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors font-headline-sm text-headline-sm flex items-center gap-1.5" onclick="toggleAlerts()">
<span className="material-symbols-outlined text-[18px]">notifications_active</span>
          Set Low-Runway WhatsApp Alert
        </button>
</div>
</div>
</div>
{/* SCENARIO COMPARISON MATRIX */}
<div className="bg-surface-container-lowest p-space-xl rounded-xl shadow-sm space-y-space-md overflow-hidden">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
<div>
<h3 className="font-headline-lg text-headline-lg text-on-surface">Multi-Scenario Comparative Ledger</h3>
<p className="font-body-md text-body-md text-text-secondary">Instant comparative breakdown of all simulated vulnerabilities against your ₹90,000 goal.</p>
</div>
<span className="font-label-sm text-label-sm text-text-secondary">4 Scenarios Benchmarked</span>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container font-label-sm text-label-sm text-text-secondary uppercase">
<th className="py-3 px-space-md rounded-l-lg">Scenario Name</th>
<th className="py-3 px-space-md">Cash Impact</th>
<th className="py-3 px-space-md">Remaining Runway</th>
<th className="py-3 px-space-md">Recovery Period</th>
<th className="py-3 px-space-md">Vulnerability Level</th>
<th className="py-3 px-space-md rounded-r-lg">Recommended Preemptive Measure</th>
</tr>
</thead>
<tbody className="divide-y divide-border-subtle font-body-md text-body-md">
<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3.5 px-space-md font-semibold text-on-surface flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-income-positive"></span>
              Salary Delayed 15 Days
            </td>
<td className="py-3.5 px-space-md font-mono text-on-surface">₹0 net (timing)</td>
<td className="py-3.5 px-space-md font-semibold text-income-positive">2.7 Months</td>
<td className="py-3.5 px-space-md text-text-secondary">Immediate (on pay)</td>
<td className="py-3.5 px-space-md">
<span className="px-2 py-0.5 rounded-full bg-surface-container text-income-positive font-label-sm text-label-sm font-semibold">Low</span>
</td>
<td className="py-3.5 px-space-md text-text-secondary">Keep 10-day buffer in primary checking account</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors bg-surface-container-low/40">
<td className="py-3.5 px-space-md font-semibold text-on-surface flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-warning-alert"></span>
              Unexpected Medical Emergency
            </td>
<td className="py-3.5 px-space-md font-mono text-expense-negative">-₹30,000 lump sum</td>
<td className="py-3.5 px-space-md font-semibold text-warning-alert">0.7 Months</td>
<td className="py-3.5 px-space-md text-text-secondary">6 Months</td>
<td className="py-3.5 px-space-md">
<span className="px-2 py-0.5 rounded-full bg-surface-container text-warning-alert font-label-sm text-label-sm font-semibold">Moderate</span>
</td>
<td className="py-3.5 px-space-md text-text-secondary">Review health insurance copay rider &amp; super top-up</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3.5 px-space-md font-semibold text-on-surface flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-expense-negative"></span>
              Job Loss for 2 Months
            </td>
<td className="py-3.5 px-space-md font-mono text-expense-negative">-₹30,000 living burn</td>
<td className="py-3.5 px-space-md font-semibold text-expense-negative">0.7 Months</td>
<td className="py-3.5 px-space-md text-text-secondary">8 Months</td>
<td className="py-3.5 px-space-md">
<span className="px-2 py-0.5 rounded-full bg-error-container text-error font-label-sm text-label-sm font-semibold">High</span>
</td>
<td className="py-3.5 px-space-md text-text-secondary">Prioritize expanding emergency fund to full 6 months</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3.5 px-space-md font-semibold text-on-surface flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-warning-alert"></span>
              Rent Escalation (+₹3,000/mo)
            </td>
<td className="py-3.5 px-space-md font-mono text-on-surface">+₹36,000 / year</td>
<td className="py-3.5 px-space-md font-semibold text-on-surface">2.2 Months</td>
<td className="py-3.5 px-space-md text-text-secondary">Extends by 3.6 mos</td>
<td className="py-3.5 px-space-md">
<span className="px-2 py-0.5 rounded-full bg-surface-container text-warning-alert font-label-sm text-label-sm font-semibold">Moderate</span>
</td>
<td className="py-3.5 px-space-md text-text-secondary">Adjust discretionary dining or negotiate 2-year lease freeze</td>
</tr>
</tbody>
</table>
</div>
</div>
{/* FOOTER & DATA INTEGRITY NOTE */}
<div className="bg-surface-container p-space-lg rounded-xl flex items-start gap-space-md">
<span className="material-symbols-outlined text-primary text-[22px] shrink-0 mt-0.5">info</span>
<div className="space-y-1">
<span className="font-label-md text-label-md text-on-surface font-semibold block">Actuarial Methodology &amp; Data Verification</span>
<p className="font-caption text-caption text-text-secondary leading-relaxed">
        Calculations are calibrated on your verified non-discretionary baseline of <strong>₹15,000/month</strong> (Rent: ₹8,000, EMI commitments: ₹4,500, Groceries &amp; Utilities: ₹2,500) and current liquid savings of <strong>₹40,000</strong> held across linked savings accounts and liquid mutual funds. All simulation outputs are conservative mathematical projections intended for resilience stress-testing and safety buffer optimization.
      </p>
</div>
</div>
</div>
{/* INTERACTIVE SCRIPTS */}

    </>
  );
}
