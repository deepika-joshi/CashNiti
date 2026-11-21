import React from 'react';

export default function AIAssistantPage() {

  React.useEffect(() => {
    const textarea = document.getElementById('chat-input');
    const sendBtn = textarea?.closest('div')?.querySelector('button');

    function fillPrompt(text) {
      if (textarea) {
        textarea.value = text.trim();
        textarea.focus();
      }
    }

    function handleSend() {
      if (textarea && textarea.value.trim() !== '') {
        const query = textarea.value.trim();
        alert('CashNiti AI Copilot is computing deterministic projection for: "' + query + '"');
        textarea.value = '';
      }
    }

    // Attach click listeners to prompt chips
    const promptChips = document.querySelectorAll('button:has(.material-symbols-outlined)');
    promptChips.forEach(chip => {
      const text = chip.querySelector('span:not(.material-symbols-outlined)')?.textContent;
      if (text && (text.includes('80C') || text.includes('prepay') || text.includes('SIP') || text.includes('Emergency') || text.includes('Tax'))) {
        chip.addEventListener('click', () => fillPrompt(text));
      }
    });

    sendBtn?.addEventListener('click', handleSend);

    const onKey = (e) => {
      if (e.key === 'Enter' && !e.shiftKey && document.activeElement === textarea) {
        e.preventDefault();
        handleSend();
      }
    };
    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('keydown', onKey);
      sendBtn?.removeEventListener('click', handleSend);
    };
  }, []);

  return (
    <>
<div className="flex flex-col w-full">
{/* Top Command & Status Ribbon */}
<div className="w-full bg-surface-container-lowest px-gutter-desktop py-space-sm flex items-center justify-between shadow-sm">
<div className="flex items-center gap-space-md">
<div className="flex items-center gap-space-xs px-2.5 py-1 rounded-full bg-surface-container text-primary font-label-sm text-label-sm">
<span className="w-2 h-2 rounded-full bg-income-positive animate-pulse"></span>
        Deterministic Actuarial Kernel v4.2
      </div>
<div className="hidden lg:flex items-center gap-space-xs text-text-secondary font-caption text-caption">
<span className="material-symbols-outlined text-[16px] text-primary">sync</span>
        Unified Grounding: Transactions · Cash Flow · Resilience · Loans &amp; EMI
      </div>
</div>
<div className="flex items-center gap-space-sm">
<span className="font-caption text-caption px-2 py-0.5 rounded bg-background-secondary text-text-secondary uppercase tracking-wider font-semibold">Read-Only Financial Vault</span>
<button className="flex items-center gap-1 text-on-surface-variant hover:text-primary px-2.5 py-1 rounded font-label-md text-label-md transition-colors" onclick="alert('Exporting verified audit report as encrypted PDF...')">
<span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
<span>Audit Trail PDF</span>
</button>
</div>
</div>
{/* Primary 3-Column Studio Interface */}
<div className="w-full grid grid-cols-12 gap-0 min-h-[calc(100vh-8.5rem)] bg-background-secondary">
{/* COLUMN 1: Consultation History & Session Grounding (Width: ~280px equivalent -> 3 cols / 12 on 2xl) */}
<aside className="col-span-12 lg:col-span-3 xl:col-span-3 bg-surface-container-lowest flex flex-col justify-between p-space-md shadow-sm">
<div className="flex flex-col gap-space-md">
{/* New Consultation Button */}
<button className="w-full h-10 px-space-md bg-primary hover:bg-primary-container text-on-primary rounded-lg font-label-md text-label-md flex items-center justify-center gap-space-xs shadow-sm transition-all" onclick="document.getElementById('chat-input').focus()">
<span className="material-symbols-outlined text-[18px]">add</span>
<span>New Consultation</span>
</button>
{/* Search Bar */}
<div className="relative w-full">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-[16px]">search</span>
<input className="w-full h-9 pl-9 pr-3 rounded-lg bg-background-secondary font-body-md text-body-md text-on-surface placeholder:text-text-secondary focus:outline-none focus:bg-surface-container-lowest transition-all" placeholder="Search consultations..." type="text"/>
</div>
{/* Thread History Hierarchy */}
<div className="flex flex-col gap-space-md overflow-y-auto max-h-[calc(100vh-23rem)] pr-1">
{/* Group: Today */}
<div className="flex flex-col gap-1">
<span className="px-space-xs font-label-sm text-label-sm text-text-secondary uppercase tracking-wider">Today</span>
<button className="w-full text-left p-2.5 rounded-lg bg-surface-container text-primary font-label-md text-label-md flex items-start gap-2.5 transition-all">
<span className="material-symbols-outlined text-[18px] text-primary shrink-0 mt-0.5">chat_bubble</span>
<div className="flex flex-col min-w-0 flex-1">
<span className="font-headline-sm text-headline-sm truncate text-on-surface">November 2026 Spending &amp; Affordability</span>
<span className="font-caption text-caption text-primary truncate">Active consultation · 10:20 AM</span>
</div>
</button>
<button className="w-full text-left p-2.5 rounded-lg hover:bg-lavender-subtle text-on-surface-variant font-label-md text-label-md flex items-start gap-2.5 transition-all">
<span className="material-symbols-outlined text-[18px] text-text-secondary shrink-0 mt-0.5">account_balance</span>
<div className="flex flex-col min-w-0 flex-1">
<span className="font-label-md text-label-md truncate text-on-surface">Prepayment vs. Snowball Simulation</span>
<span className="font-caption text-caption text-text-secondary truncate">HDFC vs SBI reduction</span>
</div>
</button>
</div>
{/* Group: Yesterday */}
<div className="flex flex-col gap-1">
<span className="px-space-xs font-label-sm text-label-sm text-text-secondary uppercase tracking-wider">Yesterday</span>
<button className="w-full text-left p-2.5 rounded-lg hover:bg-lavender-subtle text-on-surface-variant font-label-md text-label-md flex items-start gap-2.5 transition-all">
<span className="material-symbols-outlined text-[18px] text-text-secondary shrink-0 mt-0.5">waves</span>
<div className="flex flex-col min-w-0 flex-1">
<span className="font-label-md text-label-md truncate text-on-surface">Mid-Month Liquidity Delay Shock</span>
<span className="font-caption text-caption text-text-secondary truncate">Stress test: TechCorp delay</span>
</div>
</button>
<button className="w-full text-left p-2.5 rounded-lg hover:bg-lavender-subtle text-on-surface-variant font-label-md text-label-md flex items-start gap-2.5 transition-all">
<span className="material-symbols-outlined text-[18px] text-text-secondary shrink-0 mt-0.5">bolt</span>
<div className="flex flex-col min-w-0 flex-1">
<span className="font-label-md text-label-md truncate text-on-surface">BESCOM Bill &amp; Utility Optimization</span>
<span className="font-caption text-caption text-text-secondary truncate">₹2,449 payment queue</span>
</div>
</button>
</div>
{/* Group: Previous 7 Days */}
<div className="flex flex-col gap-1">
<span className="px-space-xs font-label-sm text-label-sm text-text-secondary uppercase tracking-wider">Previous 7 Days</span>
<button className="w-full text-left p-2.5 rounded-lg hover:bg-lavender-subtle text-on-surface-variant font-label-md text-label-md flex items-start gap-2.5 transition-all">
<span className="material-symbols-outlined text-[18px] text-text-secondary shrink-0 mt-0.5">shield</span>
<div className="flex flex-col min-w-0 flex-1">
<span className="font-label-md text-label-md truncate text-on-surface">Emergency Fund 6-Month Target</span>
<span className="font-caption text-caption text-text-secondary truncate">₹40,000 / ₹90,000 progress</span>
</div>
</button>
<button className="w-full text-left p-2.5 rounded-lg hover:bg-lavender-subtle text-on-surface-variant font-label-md text-label-md flex items-start gap-2.5 transition-all">
<span className="material-symbols-outlined text-[18px] text-text-secondary shrink-0 mt-0.5">restaurant</span>
<div className="flex flex-col min-w-0 flex-1">
<span className="font-label-md text-label-md truncate text-on-surface">Dining Overspend Analysis</span>
<span className="font-caption text-caption text-text-secondary truncate">₹300 weekend variance</span>
</div>
</button>
</div>
</div>
</div>
{/* Grounding Telemetry Card at Bottom */}
<div className="mt-space-md p-space-md rounded-xl bg-lavender-subtle shadow-sm flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">tune</span>
            Grounding Context
          </span>
<span className="w-2 h-2 rounded-full bg-income-positive"></span>
</div>
<div className="grid grid-cols-2 gap-2 pt-1">
<div className="p-2 rounded bg-surface-container-lowest shadow-sm">
<span className="font-caption text-caption text-text-secondary block">Checking Bal</span>
<span className="font-headline-sm text-headline-sm text-on-surface">₹21,400</span>
</div>
<div className="p-2 rounded bg-surface-container-lowest shadow-sm">
<span className="font-caption text-caption text-text-secondary block">Safe Discretionary</span>
<span className="font-headline-sm text-headline-sm text-primary">₹6,450</span>
</div>
<div className="p-2 rounded bg-surface-container-lowest shadow-sm">
<span className="font-caption text-caption text-text-secondary block">Total Debt</span>
<span className="font-headline-sm text-headline-sm text-on-surface">₹3,84,500</span>
</div>
<div className="p-2 rounded bg-surface-container-lowest shadow-sm">
<span className="font-caption text-caption text-text-secondary block">Liquid Safety</span>
<span className="font-headline-sm text-headline-sm text-income-positive">2.7 mos</span>
</div>
</div>
<div className="flex items-center justify-between text-text-secondary font-caption text-caption pt-1">
<span>Synced: 1 min ago</span>
<span className="text-primary font-medium">Auto-Sync ON</span>
</div>
</div>
</aside>
{/* COLUMN 2: Central Chat Stream & Copilot Synthesis (Width: 6 cols on xl) */}
<section className="col-span-12 lg:col-span-9 xl:col-span-6 flex flex-col justify-between bg-surface-container-lowest overflow-hidden">
{/* Sub-Header for Session */}
<div className="px-gutter-desktop py-3.5 bg-surface-container-lowest shadow-sm flex items-center justify-between gap-space-md">
<div className="flex items-center gap-space-sm min-w-0">
<div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0">
<span className="material-symbols-outlined text-[20px]">psychology</span>
</div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-2">
<h1 className="font-headline-md text-headline-md text-on-surface truncate">MoneyMentor Copilot</h1>
<span className="px-2 py-0.5 rounded-full bg-surface-container-low text-primary font-label-sm text-label-sm">Deterministic Synthesizer</span>
</div>
<p className="font-caption text-caption text-text-secondary truncate">Synthesizing ledger data from Transactions, Cash Flow, Resilience &amp; Debt modules</p>
</div>
</div>
<div className="flex items-center gap-1 shrink-0">
<button className="p-2 rounded-lg text-text-secondary hover:bg-surface-container hover:text-on-surface transition-colors" onclick="alert('Session context cleared. Ready for fresh queries.')" title="Clear Thread">
<span className="material-symbols-outlined text-[18px]">cleaning_services</span>
</button>
<button className="p-2 rounded-lg text-text-secondary hover:bg-surface-container hover:text-on-surface transition-colors" title="Preferences">
<span className="material-symbols-outlined text-[18px]">tune</span>
</button>
</div>
</div>
{/* Scrollable Message Conversation Stream */}
<div className="flex-1 overflow-y-auto px-gutter-desktop py-space-xl space-y-space-xl bg-background-secondary/60">
{/* System Guardrail Card */}
<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex gap-space-md items-start">
<div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[18px]">verified_user</span>
</div>
<div className="flex flex-col gap-1 min-w-0">
<div className="flex items-center justify-between">
<span className="font-headline-sm text-headline-sm text-on-surface font-semibold">MoneyMentor Verification Engine</span>
<span className="font-caption text-caption text-text-secondary">Today, 10:15 AM</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Hello Arjun! I have synced your verified November 2026 financials: checking balance (₹21,400 at HDFC), upcoming salary (+₹40,000 from TechCorp due Nov 25), and scheduled commitments. All simulations run on deterministic balance tracking with no speculative assumptions.
            </p>
</div>
</div>
{/* Turn 1: User */}
<div className="flex justify-end">
<div className="max-w-xl bg-primary text-on-primary p-space-md rounded-2xl rounded-tr-xs shadow-md">
<p className="font-body-md text-body-md leading-relaxed">
              Where did most of my money go this month, and how much can I safely spend this week?
            </p>
<span className="block text-right font-caption text-caption text-on-primary/70 mt-1">10:16 AM · Read by Copilot</span>
</div>
</div>
{/* Turn 1: Assistant Rich Response */}
<div className="flex gap-space-md items-start">
<div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm mt-1">
<span className="material-symbols-outlined text-[18px]">smart_toy</span>
</div>
<div className="flex-1 max-w-2xl flex flex-col gap-space-md">
<div className="p-space-lg rounded-2xl rounded-tl-xs bg-surface-container-lowest shadow-sm flex flex-col gap-space-lg">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">Expense Intelligence &amp; Envelope Breakdown</span>
<span className="font-caption text-caption text-text-secondary">Nov 1 – Nov 08, 2026</span>
</div>
<p className="font-body-md text-body-md text-on-surface leading-relaxed">
                Based on your verified November 2026 ledger entries across the <strong>Expense Intelligence</strong> and <strong>Safe to Spend</strong> modules, you have spent <span className="font-semibold text-expense-negative">₹24,850</span> against your monthly target of ₹28,000. Here is your category distribution and weekly headroom:
              </p>
{/* Metric Bento 4-Card Mini Grid */}
<div className="grid grid-cols-2 gap-space-md">
<div className="p-space-md rounded-xl bg-lavender-subtle shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-text-secondary">Total Spent MTD</span>
<span className="material-symbols-outlined text-[16px] text-text-secondary">receipt_long</span>
</div>
<span className="font-metric-md text-metric-md text-on-surface mt-1">₹24,850</span>
<span className="font-caption text-caption text-text-secondary mt-1">88.7% of monthly ceiling</span>
</div>
<div className="p-space-md rounded-xl bg-lavender-subtle shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-text-secondary">Safe to Spend</span>
<span className="material-symbols-outlined text-[16px] text-income-positive">savings</span>
</div>
<span className="font-metric-md text-metric-md text-income-positive mt-1">₹6,450</span>
<span className="font-caption text-caption text-text-secondary mt-1">Available through Nov 30</span>
</div>
<div className="p-space-md rounded-xl bg-lavender-subtle shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-text-secondary">Weekly Cap</span>
<span className="material-symbols-outlined text-[16px] text-primary">speed</span>
</div>
<span className="font-metric-md text-metric-md text-primary mt-1">₹5,640</span>
<span className="font-caption text-caption text-text-secondary mt-1">Next 7 days maximum</span>
</div>
<div className="p-space-md rounded-xl bg-lavender-subtle shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-text-secondary">Daily Velocity</span>
<span className="material-symbols-outlined text-[16px] text-warning-alert">timelapse</span>
</div>
<span className="font-metric-md text-metric-md text-on-surface mt-1">₹806 / day</span>
<span className="font-caption text-caption text-text-secondary mt-1">Preserves ₹5,000 floor</span>
</div>
</div>
{/* Mini Visual Category Spend Progress Bars */}
<div className="flex flex-col gap-2.5 pt-2">
<span className="font-label-sm text-label-sm text-text-secondary uppercase tracking-wider">Outflow By Allocation</span>
{/* Housing */}
<div className="flex flex-col gap-1">
<div className="flex justify-between font-label-md text-label-md">
<span className="text-on-surface font-medium">Housing &amp; Rent (Prestige Oakwood)</span>
<span className="text-on-surface">₹8,000 <span className="text-text-secondary font-normal">/ ₹8,000 (100%)</span></span>
</div>
<div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
<div className="h-full bg-primary rounded-full" style={{"width":"100%"}}></div>
</div>
</div>
{/* EMIs */}
<div className="flex flex-col gap-1">
<div className="flex justify-between font-label-md text-label-md">
<span className="text-on-surface font-medium">Loans &amp; EMIs (HDFC + SBI)</span>
<span className="text-on-surface">₹4,500 <span className="text-text-secondary font-normal">/ ₹4,500 (100%)</span></span>
</div>
<div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
<div className="h-full bg-primary-container rounded-full" style={{"width":"100%"}}></div>
</div>
</div>
{/* Groceries */}
<div className="flex flex-col gap-1">
<div className="flex justify-between font-label-md text-label-md">
<span className="text-on-surface font-medium">Groceries &amp; Blinkit/Zepto</span>
<span className="text-on-surface">₹4,200 <span className="text-text-secondary font-normal">/ ₹5,000 (84%)</span></span>
</div>
<div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
<div className="h-full bg-income-positive rounded-full" style={{"width":"84%"}}></div>
</div>
</div>
{/* Dining Out - Spike Warning */}
<div className="flex flex-col gap-1 p-2 rounded-lg bg-error-container/20">
<div className="flex justify-between font-label-md text-label-md">
<span className="text-expense-negative font-semibold flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">warning</span>
                      Dining &amp; Food Delivery (Over Budget)
                    </span>
<span className="text-expense-negative font-bold">₹2,800 <span className="text-text-secondary font-normal">/ ₹2,500 (112%)</span></span>
</div>
<div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
<div className="h-full bg-expense-negative rounded-full" style={{"width":"100%"}}></div>
</div>
<span className="font-caption text-caption text-text-secondary">+₹300 over monthly plan. Weekend food orders accounted for 64% of this outflow.</span>
</div>
</div>
{/* Synthesized Guidance Points */}
<div className="p-3.5 rounded-lg bg-surface-container-low flex flex-col gap-1.5">
<span className="font-headline-sm text-headline-sm text-primary font-semibold">Guardrail Action Plan</span>
<p className="font-body-md text-body-md text-on-surface leading-relaxed">
                  1. <strong>Weekly Run Rate:</strong> Keeping discretionary expenses under <strong>₹806/day (₹5,640 this week)</strong> guarantees your mandatory ₹5,000 liquidity safety floor remains untouched before your TechCorp salary lands on Nov 25.<br/>
                  2. <strong>Delivery Restraint:</strong> Swapping 2 app food delivery orders for home meals this weekend recovers the ₹300 variance automatically.
                </p>
</div>
{/* In-Context Deep Links */}
<div className="flex flex-wrap items-center gap-2 pt-1">
<a className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md flex items-center gap-1 transition-colors" href="#">
<span>Open Expense Intelligence</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
<a className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md flex items-center gap-1 transition-colors" href="#">
<span>Inspect Safe-to-Spend Envelopes</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>
</div>
<span className="font-caption text-caption text-text-secondary pl-2">Synthesized at 10:17 AM · Grounded against 32 verified ledger records</span>
</div>
</div>
{/* Turn 2: User Query */}
<div className="flex justify-end">
<div className="max-w-xl bg-primary text-on-primary p-space-md rounded-2xl rounded-tr-xs shadow-md">
<p className="font-body-md text-body-md leading-relaxed">
              Can I afford to prepay ₹25,000 toward my HDFC Personal Loan right now, or will it hurt my safety buffer?
            </p>
<span className="block text-right font-caption text-caption text-on-primary/70 mt-1">10:20 AM · Read by Copilot</span>
</div>
</div>
{/* Turn 2: Assistant Rich Response with Impact Matrix */}
<div className="flex gap-space-md items-start">
<div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm mt-1">
<span className="material-symbols-outlined text-[18px]">smart_toy</span>
</div>
<div className="flex-1 max-w-2xl flex flex-col gap-space-md">
<div className="p-space-lg rounded-2xl rounded-tl-xs bg-surface-container-lowest shadow-sm flex flex-col gap-space-lg">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">Actuarial Amortization &amp; Cash Flow Simulation</span>
<span className="px-2 py-0.5 rounded bg-warning-alert/15 text-warning-alert font-label-sm text-label-sm font-semibold">Cautionary Recommendation</span>
</div>
<p className="font-body-md text-body-md text-on-surface leading-relaxed">
                I simulated an immediate <strong>₹25,000 principal prepayment</strong> against your <strong>HDFC Personal Loan</strong> (reducing balance @ 13.5% APR) while cross-referencing your <strong>Cash Flow Forecast</strong> for November:
              </p>
{/* Dual-Column Impact Matrix */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
{/* Col A: Loan Gains */}
<div className="p-space-md rounded-xl bg-income-positive/5 shadow-sm flex flex-col gap-2">
<div className="flex items-center gap-1.5 text-income-positive">
<span className="material-symbols-outlined text-[18px]">trending_down</span>
<span className="font-headline-sm text-headline-sm font-bold">Loan Benefit (Positive)</span>
</div>
<div className="flex flex-col gap-1.5 pt-1">
<div className="flex justify-between font-label-md text-label-md">
<span className="text-text-secondary">Balance Drop:</span>
<span className="font-semibold text-on-surface">₹48,200 ➔ ₹23,200</span>
</div>
<div className="flex justify-between font-label-md text-label-md">
<span className="text-text-secondary">Tenure Cut:</span>
<span className="font-bold text-income-positive">12 mos ➔ 6 mos (-6 mos)</span>
</div>
<div className="flex justify-between font-label-md text-label-md">
<span className="text-text-secondary">Interest Saved:</span>
<span className="font-bold text-income-positive">₹1,350 net interest</span>
</div>
</div>
</div>
{/* Col B: Liquidity Vulnerability */}
<div className="p-space-md rounded-xl bg-expense-negative/5 shadow-sm flex flex-col gap-2">
<div className="flex items-center gap-1.5 text-expense-negative">
<span className="material-symbols-outlined text-[18px]">report_problem</span>
<span className="font-headline-sm text-headline-sm font-bold">Liquidity Risk (High Alert)</span>
</div>
<div className="flex flex-col gap-1.5 pt-1">
<div className="flex justify-between font-label-md text-label-md">
<span className="text-text-secondary">Checking Now:</span>
<span className="font-semibold text-on-surface">₹21,400</span>
</div>
<div className="flex justify-between font-label-md text-label-md">
<span className="text-text-secondary">Immediate Deficit:</span>
<span className="font-bold text-expense-negative">-₹3,600 overdraft risk</span>
</div>
<div className="flex justify-between font-label-md text-label-md">
<span className="text-text-secondary">If Taken From E-Fund:</span>
<span className="font-semibold text-expense-negative">Runway cuts: 2.7 ➔ 1.0 mo</span>
</div>
</div>
</div>
</div>
{/* Recommendation Execution Schedule */}
<div className="p-3.5 rounded-lg bg-lavender-subtle flex flex-col gap-2">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[20px]">lightbulb</span>
<span className="font-headline-sm text-headline-sm text-primary font-bold">Optimal Execution Strategy</span>
</div>
<p className="font-body-md text-body-md text-on-surface leading-relaxed">
                  Do not execute the prepayment today. Your checking balance of ₹21,400 cannot support an immediate ₹25,000 debit without risking NACH bounces on your Nov 10 BESCOM bill (₹2,449).
                </p>
<div className="p-2.5 rounded bg-surface-container-lowest shadow-sm flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-income-positive text-[18px]">event_upcoming</span>
<span className="font-label-md text-label-md text-on-surface"><strong>Recommended Date: November 26, 2026</strong> (After ₹40,000 salary arrival)</span>
</div>
<span className="font-label-sm text-label-sm text-income-positive font-semibold">Zero Runway Hazard</span>
</div>
</div>
{/* Action Triggers */}
<div className="flex flex-wrap items-center gap-2 pt-1">
<button className="px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md flex items-center gap-1.5 transition-colors shadow-sm" onclick="alert('Simulation loaded into Loans &amp; EMI Intelligence calculator')">
<span className="material-symbols-outlined text-[16px]">calculate</span>
<span>Simulate in Loan Calculator</span>
</button>
<button className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md flex items-center gap-1 transition-colors" onclick="alert('Navigating to Cash Flow Forecast liquidity curve')">
<span>Inspect Cash Flow Trajectory</span>
<span className="material-symbols-outlined text-[16px]">timeline</span>
</button>
</div>
</div>
<span className="font-caption text-caption text-text-secondary pl-2">Synthesized at 10:21 AM · Validated via HDFC 13.5% reducing formula</span>
</div>
</div>
</div>
{/* Quick Suggested Follow-Up Prompts Carousel */}
<div className="px-gutter-desktop py-2 bg-surface-container-lowest overflow-x-auto flex items-center gap-2 no-scrollbar shadow-sm">
<span className="font-label-sm text-label-sm text-text-secondary uppercase tracking-wider shrink-0 mr-1">Suggested:</span>
<button className="px-3 py-1 rounded-full bg-surface-container-low hover:bg-surface-container text-primary font-label-sm text-label-sm shrink-0 transition-colors" onclick="fillPrompt(this.innerText)">
          What if salary is delayed 15 days?
        </button>
<button className="px-3 py-1 rounded-full bg-surface-container-low hover:bg-surface-container text-primary font-label-sm text-label-sm shrink-0 transition-colors" onclick="fillPrompt(this.innerText)">
          Can I afford another ₹3,500 EMI?
        </button>
<button className="px-3 py-1 rounded-full bg-surface-container-low hover:bg-surface-container text-primary font-label-sm text-label-sm shrink-0 transition-colors" onclick="fillPrompt(this.innerText)">
          Which loan to eliminate first: HDFC or SBI?
        </button>
<button className="px-3 py-1 rounded-full bg-surface-container-low hover:bg-surface-container text-primary font-label-sm text-label-sm shrink-0 transition-colors" onclick="fillPrompt(this.innerText)">
          How to accelerate Emergency Fund to 6 months?
        </button>
</div>
{/* Chat Input Dock */}
<div className="p-gutter-desktop bg-surface-container-lowest shadow-sm flex flex-col gap-2">
<div className="rounded-xl bg-background-secondary p-space-sm flex flex-col gap-2 shadow-sm focus-within:bg-surface-container-lowest transition-all">
<textarea className="w-full bg-transparent font-body-md text-body-md text-on-surface placeholder:text-text-secondary focus:outline-none resize-none px-2 pt-1" id="chat-input" placeholder="Ask MoneyMentor about your spending, debt payoff, cash flow forecast, or safe envelopes... (e.g., 'What happens if rent increases by ₹3,000 next month?')" rows="2"></textarea>
<div className="flex items-center justify-between pt-1">
<div className="flex items-center gap-2">
{/* Upload / Attach Trigger */}
<button className="p-1.5 rounded-lg text-text-secondary hover:text-primary hover:bg-surface-container transition-colors" title="Attach Bank Statement or Receipt (PDF/CSV)">
<span className="material-symbols-outlined text-[18px]">attach_file</span>
</button>
{/* Module Context Selector */}
<div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-surface-container-lowest shadow-sm text-text-secondary font-label-sm text-label-sm">
<span className="w-1.5 h-1.5 rounded-full bg-income-positive"></span>
<span>Context: All Modules (4 Synced)</span>
<span className="material-symbols-outlined text-[14px]">expand_more</span>
</div>
</div>
<div className="flex items-center gap-space-sm">
<span className="hidden sm:inline font-caption text-caption text-text-secondary">Press <kbd className="px-1.5 py-0.5 rounded bg-surface-container font-mono text-[10px]">Enter ↵</kbd> to send</span>
<button className="h-9 px-4 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md flex items-center gap-1.5 shadow-sm transition-all" onclick="handleSend()">
<span>Send</span>
<span className="material-symbols-outlined text-[16px]">send</span>
</button>
</div>
</div>
</div>
{/* Compliance & Regulatory Micro-Disclaimer */}
<p className="font-caption text-caption text-text-secondary text-center px-4 leading-normal">
          MoneyMentor AI generates deterministic financial analyses calculated exclusively from your recorded ledgers, scheduled EMIs, and budget ceilings. Projections are non-guaranteed simulations and do not constitute SEBI or RBI registered advisory.
        </p>
</div>
</section>
{/* COLUMN 3: Live Financial Telemetry (Active Session Context) (Width: ~300px equivalent -> 3 cols / 12) */}
<aside className="col-span-12 xl:col-span-3 bg-surface-container-lowest p-gutter-desktop shadow-sm flex flex-col gap-space-xl overflow-y-auto">
{/* Telemetry Header */}
<div className="flex items-center justify-between pb-2">
<div className="flex flex-col">
<h2 className="font-headline-sm text-headline-sm text-on-surface">Live Telemetry</h2>
<span className="font-caption text-caption text-text-secondary">Arjun Mehta · Primary Portfolio</span>
</div>
<span className="px-2 py-0.5 rounded bg-income-positive/10 text-income-positive font-label-sm text-label-sm font-semibold flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-income-positive"></span>
          Live Sync
        </span>
</div>
{/* Card 1: Safe to Spend Dynamic Envelope */}
<div className="p-space-md rounded-xl bg-lavender-subtle shadow-sm flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<div className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[16px]">account_balance_wallet</span>
</div>
<span className="font-headline-sm text-headline-sm text-on-surface">Safe Discretionary</span>
</div>
<span className="font-label-sm text-label-sm text-income-positive px-2 py-0.5 rounded-full bg-income-positive/10 font-bold">Safe Zone</span>
</div>
<div className="pt-1 flex flex-col">
<span className="font-metric-xl text-metric-xl text-primary font-bold">₹6,450</span>
<span className="font-caption text-caption text-text-secondary">Available until Nov 30 (22 days remaining)</span>
</div>
{/* Burn Gauge */}
<div className="w-full bg-surface-container h-2 rounded-full overflow-hidden mt-1">
<div className="bg-primary h-full rounded-full" style={{"width":"72%"}}></div>
</div>
<div className="flex justify-between font-caption text-caption text-text-secondary">
<span>₹806/day permitted burn</span>
<span>Target ₹5k floor preserved</span>
</div>
</div>
{/* Card 2: Cash Flow Inflow/Outflow Watch */}
<div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<span className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[18px]">swap_vert</span>
            Cash Flow Watch
          </span>
<span className="font-caption text-caption text-text-secondary">Nov 2026</span>
</div>
<div className="flex flex-col gap-2 pt-1">
{/* Next Outflow */}
<div className="p-2.5 rounded-lg bg-background-secondary flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-expense-negative"></span>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface font-semibold">BESCOM Electricity</span>
<span className="font-caption text-caption text-text-secondary">Due Nov 10 · Auto-Debit</span>
</div>
</div>
<span className="font-headline-sm text-headline-sm text-expense-negative">-₹2,449</span>
</div>
{/* Next Inflow */}
<div className="p-2.5 rounded-lg bg-background-secondary flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-income-positive"></span>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface font-semibold">Freelance Retainer</span>
<span className="font-caption text-caption text-text-secondary">Expected Nov 15</span>
</div>
</div>
<span className="font-headline-sm text-headline-sm text-income-positive">+₹5,000</span>
</div>
{/* Major Inflow */}
<div className="p-2.5 rounded-lg bg-primary/5 flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-primary"></span>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-primary font-bold">TechCorp Salary</span>
<span className="font-caption text-caption text-text-secondary">Scheduled Nov 25</span>
</div>
</div>
<span className="font-headline-sm text-headline-sm text-primary font-bold">+₹40,000</span>
</div>
</div>
<div className="pt-1 flex items-center justify-between text-text-secondary font-caption text-caption">
<span>Lowest checking dip:</span>
<span className="font-semibold text-warning-alert">₹6,451 on Nov 10</span>
</div>
</div>
{/* Card 3: Active Loans Snapshot */}
<div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<span className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[18px]">credit_card</span>
            Active Debt Obligations
          </span>
<span className="font-label-sm text-label-sm text-text-secondary">2 Loans</span>
</div>
<div className="flex flex-col gap-2 pt-1">
{/* Loan 1 */}
<div className="p-2.5 rounded-lg bg-lavender-subtle flex flex-col gap-1">
<div className="flex justify-between items-center">
<span className="font-label-md text-label-md font-bold text-on-surface">HDFC Personal Loan</span>
<span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-error-container text-expense-negative">13.5% APR</span>
</div>
<div className="flex justify-between items-center text-body-md font-body-md">
<span className="text-text-secondary font-caption text-caption">Principal Remaining</span>
<span className="font-semibold text-on-surface">₹48,200</span>
</div>
<span className="font-caption text-caption text-text-secondary">EMI: ₹4,500/mo · Priority payoff target</span>
</div>
{/* Loan 2 */}
<div className="p-2.5 rounded-lg bg-background-secondary flex flex-col gap-1">
<div className="flex justify-between items-center">
<span className="font-label-md text-label-md font-semibold text-on-surface">SBI Education Loan</span>
<span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-surface-container text-text-secondary">8.65% APR</span>
</div>
<div className="flex justify-between items-center text-body-md font-body-md">
<span className="text-text-secondary font-caption text-caption">Principal Remaining</span>
<span className="font-semibold text-on-surface">₹3,36,300</span>
</div>
<span className="font-caption text-caption text-text-secondary">Moratorium + 48 mos amortization</span>
</div>
</div>
</div>
{/* Card 4: Resilience Metric & Emergency Buffer */}
<div className="p-space-md rounded-xl bg-lavender-subtle shadow-sm flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<span className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[18px]">verified</span>
            Financial Resilience
          </span>
<span className="font-label-sm text-label-sm text-primary font-bold">2.7 mos</span>
</div>
<div className="flex flex-col gap-1 pt-1">
<div className="flex justify-between text-body-md font-body-md">
<span className="text-text-secondary font-caption text-caption">Current Liquid Savings</span>
<span className="font-bold text-on-surface">₹40,000</span>
</div>
<div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
<div className="bg-income-positive h-full rounded-full" style={{"width":"44.4%"}}></div>
</div>
<div className="flex justify-between font-caption text-caption text-text-secondary">
<span>Target: ₹90,000 (6 mos)</span>
<span>44.4% Achieved</span>
</div>
</div>
<div className="p-2 rounded bg-surface-container-lowest text-text-secondary font-caption text-caption leading-relaxed shadow-sm">
          💡 Adding <strong>₹5,000/mo</strong> achieves the 6-month buffer target in 10 months without compromising EMI velocity.
        </div>
</div>
{/* Quick Action Simulator Shortcuts */}
<div className="flex flex-col gap-2 pt-1">
<span className="font-label-sm text-label-sm text-text-secondary uppercase tracking-wider">Actuarial Quick Simulations</span>
<button className="w-full text-left p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary font-label-md text-label-md flex items-center justify-between transition-colors" onclick="fillPrompt('Run a 15-day salary delay stress test on my November checking balance')">
<span>Run 15-Day Delay Stress Test</span>
<span className="material-symbols-outlined text-[16px]">bolt</span>
</button>
<button className="w-full text-left p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary font-label-md text-label-md flex items-center justify-between transition-colors" onclick="fillPrompt('Show me the exact interest saved if I prepay ₹10,000 towards HDFC instead of ₹25,000')">
<span>Compare ₹10k vs ₹25k Prepayment</span>
<span className="material-symbols-outlined text-[16px]">compare_arrows</span>
</button>
</div>
</aside>
</div>
{/* Inline Micro-Interaction Script */}

</div>
    </>
  );
}
