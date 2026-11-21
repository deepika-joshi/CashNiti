import React from 'react';

export default function SafeToSpendPage() {

  React.useEffect(() => {
    const BASE_SAFE = 6450;
    const DAYS_REMAINING = 8;
    const inputEl = document.getElementById('sim-input');
    const badgeEl = document.getElementById('sim-badge');
    const newSafeEl = document.getElementById('sim-new-safe');
    const newDailyEl = document.getElementById('sim-new-daily');
    const recTextEl = document.getElementById('sim-recommendation-text');
    const presetBtns = document.querySelectorAll('.sim-preset-btn');
    const recalcBtn = document.getElementById('btn-recalculate');
    const openSimBtn = document.getElementById('btn-open-simulator');

    function updateSimulation(amount) {
      const val = Math.max(0, Number(amount) || 0);
      const remainingSafe = BASE_SAFE - val;
      const newDaily = Math.max(0, Math.round(remainingSafe / DAYS_REMAINING));

      if (badgeEl && newSafeEl && newDailyEl && recTextEl) {
        if (remainingSafe >= 3000) {
          badgeEl.className = 'inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-income-positive font-label-sm text-label-sm font-semibold';
          badgeEl.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-income-positive"></span> Fully Affordable • Safe Zone';
          newSafeEl.className = 'font-metric-xl text-metric-xl text-income-positive mt-0.5 font-bold';
          newDailyEl.className = 'font-metric-xl text-metric-xl text-income-positive font-bold';
          recTextEl.textContent = 'This purchase is comfortably within your discretionary ceiling. You will maintain over ₹375/day pacing without adjusting plans.';
        } else if (remainingSafe >= 0) {
          badgeEl.className = 'inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-label-sm text-label-sm font-semibold';
          badgeEl.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-warning-alert"></span> Affordable with Caution';
          newSafeEl.className = 'font-metric-xl text-metric-xl text-on-surface mt-0.5 font-bold';
          newDailyEl.className = 'font-metric-xl text-metric-xl text-warning-alert font-bold';
          recTextEl.textContent = 'If purchased, restrict discretionary weekend dining to under ₹500 to keep the ₹5,000 safety floor intact before the Nov 30 salary credit.';
        } else {
          const deficit = Math.abs(remainingSafe);
          badgeEl.className = 'inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 text-expense-negative font-label-sm text-label-sm font-semibold';
          badgeEl.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-expense-negative"></span> Unsafe • Erodes ₹5,000 Safety Buffer';
          newSafeEl.className = 'font-metric-xl text-metric-xl text-expense-negative mt-0.5 font-bold';
          newDailyEl.className = 'font-metric-xl text-metric-xl text-expense-negative font-bold';
          recTextEl.textContent = `Warning: This expense exceeds your free liquidity by ₹${deficit.toLocaleString('en-IN')}. It will breach your minimum emergency reserve floor. Postpone until Dec 01.`;
        }

        newSafeEl.textContent = remainingSafe >= 0 ? `₹${remainingSafe.toLocaleString('en-IN')}` : `-₹${Math.abs(remainingSafe).toLocaleString('en-IN')}`;
        newDailyEl.textContent = `₹${newDaily.toLocaleString('en-IN')}`;
      }
    }

    const onInput = (e) => {
      presetBtns.forEach(b => {
        b.className = 'sim-preset-btn px-3 py-1.5 rounded-full bg-surface-container text-primary font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-colors';
      });
      updateSimulation(e.target.value);
    };

    if (inputEl) inputEl.addEventListener('input', onInput);

    presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const amt = btn.getAttribute('data-amount') || '0';
        if (inputEl) inputEl.value = amt;
        presetBtns.forEach(b => {
          b.className = 'sim-preset-btn px-3 py-1.5 rounded-full bg-surface-container text-primary font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-colors';
        });
        btn.className = 'sim-preset-btn px-3 py-1.5 rounded-full bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-colors';
        updateSimulation(amt);
      });
    });

    if (openSimBtn) {
      openSimBtn.addEventListener('click', () => {
        if (inputEl) {
          inputEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          inputEl.focus();
        }
      });
    }

    if (recalcBtn) {
      recalcBtn.addEventListener('click', () => {
        const icon = recalcBtn.querySelector('.material-symbols-outlined');
        if (icon) icon.classList.add('animate-spin');
        setTimeout(() => {
          if (icon) icon.classList.remove('animate-spin');
        }, 600);
      });
    }

    return () => {
      inputEl?.removeEventListener('input', onInput);
    };
  }, []);

  return (
    <>
<div className="flex flex-col w-full">
<div className="w-full max-w-[1440px] mx-auto px-gutter md:px-margin-tablet lg:px-margin-desktop py-space-xl flex flex-col gap-space-xl">
{/* SECTION 1: Page Header */}
<header className="flex flex-col xl:flex-row xl:items-end justify-between gap-space-lg">
<div className="flex flex-col gap-space-xs max-w-3xl">
<div className="flex items-center gap-space-sm flex-wrap">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-primary font-label-sm text-label-sm">
<span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            November 2026 • 8 Days Remaining
          </span>
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lavender-subtle text-on-surface-variant font-label-sm text-label-sm shadow-sm">
<span className="material-symbols-outlined text-[14px] text-primary">verified_user</span>
            Conservative Safety Model (Active)
          </span>
</div>
<h1 className="font-display text-display text-on-surface tracking-tight mt-1">Safe to Spend</h1>
<p className="font-body-lg text-body-lg text-text-secondary">
          Know exactly what you can spend today without jeopardizing bills, EMIs, or planned savings goals.
        </p>
</div>
<div className="flex items-center gap-space-md flex-wrap shrink-0">
<button className="inline-flex items-center gap-space-xs px-4 py-2.5 rounded-lg bg-surface-container-low text-primary hover:bg-surface-container transition-all font-label-md text-label-md shadow-sm" id="btn-open-simulator" type="button">
<span className="material-symbols-outlined text-[18px]">add_circle</span>
<span>+ Simulate Purchase</span>
</button>
<button className="inline-flex items-center gap-space-xs px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary transition-all font-label-md text-label-md shadow-sm" id="btn-recalculate" type="button">
<span className="material-symbols-outlined text-[18px]">sync</span>
<span>Recalculate Budget</span>
</button>
</div>
</header>
{/* SECTION 2: Hero & Deterministic Equation */}
<section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-surface-container-lowest via-surface-container-low to-surface-container p-space-xl lg:p-8 shadow-sm">
<div className="relative z-10 flex flex-col gap-6">
<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
<div className="flex flex-col">
<div className="flex items-center gap-2">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-text-secondary">Instant Liquidity Clear To Spend</span>
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-income-positive font-label-sm text-label-sm">
<span className="w-1.5 h-1.5 rounded-full bg-income-positive"></span>
                Safe Zone • Ready to Spend
              </span>
</div>
<div className="flex items-baseline gap-3 mt-1.5">
<span className="font-display text-[42px] leading-[48px] font-bold text-on-surface tracking-tight" id="hero-safe-metric">₹6,450</span>
<span className="font-body-md text-body-md text-text-secondary font-medium">available through Nov 30</span>
</div>
</div>
<div className="flex items-center gap-4 bg-surface-container-lowest/80 backdrop-blur-md px-4 py-3 rounded-lg shadow-sm">
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0">
<span className="material-symbols-outlined text-[22px]">format_image_left</span>
</div>
<div className="flex flex-col text-left">
<span className="font-label-sm text-label-sm text-text-secondary">Protection Status</span>
<span className="font-headline-sm text-headline-sm text-on-surface">100% Obligations Locked</span>
</div>
</div>
</div>
{/* Visual Deterministic Equation Bar */}
<div className="flex flex-col gap-2 pt-2">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-text-secondary">Deterministic Computation Breakdown</span>
<div className="grid grid-cols-1 md:grid-cols-5 gap-2 lg:gap-3 items-stretch">
{/* Step 1: Checking */}
<div className="flex flex-col p-3 rounded-lg bg-surface-container-lowest shadow-sm">
<span className="font-caption text-caption text-text-secondary">Available Checking</span>
<span className="font-headline-md text-headline-md text-on-surface mt-0.5">₹21,400</span>
<span className="font-caption text-[10px] text-text-secondary mt-1">HDFC Primary A/c</span>
</div>
{/* Minus 1 */}
<div className="flex flex-col p-3 rounded-lg bg-surface-container-lowest shadow-sm relative">
<span className="absolute -top-2 left-3 px-1.5 py-0.2 bg-expense-negative text-on-primary rounded text-[9px] font-semibold">MINUS</span>
<span className="font-caption text-caption text-text-secondary">Upcoming Bills &amp; EMIs</span>
<span className="font-headline-md text-headline-md text-expense-negative mt-0.5">-₹6,950</span>
<span className="font-caption text-[10px] text-text-secondary mt-1">3 scheduled debits</span>
</div>
{/* Minus 2 */}
<div className="flex flex-col p-3 rounded-lg bg-surface-container-lowest shadow-sm relative">
<span className="absolute -top-2 left-3 px-1.5 py-0.2 bg-expense-negative text-on-primary rounded text-[9px] font-semibold">MINUS</span>
<span className="font-caption text-caption text-text-secondary">Essential Provisions</span>
<span className="font-headline-md text-headline-md text-expense-negative mt-0.5">-₹3,000</span>
<span className="font-caption text-[10px] text-text-secondary mt-1">Blinkit + Commute</span>
</div>
{/* Minus 3 */}
<div className="flex flex-col p-3 rounded-lg bg-surface-container-lowest shadow-sm relative">
<span className="absolute -top-2 left-3 px-1.5 py-0.2 bg-expense-negative text-on-primary rounded text-[9px] font-semibold">MINUS</span>
<span className="font-caption text-caption text-text-secondary">Safety Floor Reserve</span>
<span className="font-headline-md text-headline-md text-on-surface-variant mt-0.5">-₹5,000</span>
<span className="font-caption text-[10px] text-text-secondary mt-1">Zero-deficit buffer</span>
</div>
{/* Result */}
<div className="flex flex-col p-3 rounded-lg bg-primary text-on-primary shadow-sm relative">
<span className="absolute -top-2 left-3 px-1.5 py-0.2 bg-income-positive text-on-primary rounded text-[9px] font-semibold">EQUALS =</span>
<span className="font-caption text-caption text-primary-fixed">Safe Discretionary</span>
<span className="font-headline-md text-headline-md text-on-primary mt-0.5">₹6,450</span>
<span className="font-caption text-[10px] text-primary-fixed mt-1">Net clear capital</span>
</div>
</div>
</div>
<div className="flex items-center gap-2 text-text-secondary font-caption text-caption">
<span className="material-symbols-outlined text-[16px] text-primary">info</span>
<span>All calculations are deterministic and based on your recorded ledger entries and confirmed commitments.</span>
</div>
</div>
</section>
{/* SECTION 3: Top 4 Financial Metric Summary Cards */}
<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
{/* Card 1 */}
<div className="flex flex-col justify-between p-space-xl rounded-lg bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
<div className="flex items-center justify-between gap-2">
<span className="font-label-sm text-label-sm text-text-secondary uppercase tracking-wider">Liquid Balance</span>
<div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
</div>
</div>
<div className="flex flex-col mt-3">
<span className="font-metric-xl text-metric-xl text-on-surface">₹21,400</span>
<div className="flex items-center gap-1.5 mt-2">
<span className="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container text-primary font-caption text-caption font-medium">HDFC Salary Primary</span>
<span className="text-text-secondary font-caption text-caption">Live balance</span>
</div>
</div>
</div>
{/* Card 2 */}
<div className="flex flex-col justify-between p-space-xl rounded-lg bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
<div className="flex items-center justify-between gap-2">
<span className="font-label-sm text-label-sm text-text-secondary uppercase tracking-wider">Upcoming Obligations</span>
<div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-expense-negative">
<span className="material-symbols-outlined text-[18px]">pending_actions</span>
</div>
</div>
<div className="flex flex-col mt-3">
<span className="font-metric-xl text-metric-xl text-expense-negative">₹6,950</span>
<div className="flex items-center gap-1.5 mt-2">
<span className="inline-flex items-center px-2 py-0.5 rounded-full bg-red-50 text-expense-negative font-caption text-caption font-medium">3 debits pending</span>
<span className="text-text-secondary font-caption text-caption">Due before Nov 30</span>
</div>
</div>
</div>
{/* Card 3 */}
<div className="flex flex-col justify-between p-space-xl rounded-lg bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
<div className="flex items-center justify-between gap-2">
<span className="font-label-sm text-label-sm text-text-secondary uppercase tracking-wider">Planned Savings Goal</span>
<div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-income-positive">
<span className="material-symbols-outlined text-[18px]">savings</span>
</div>
</div>
<div className="flex flex-col mt-3">
<span className="font-metric-xl text-metric-xl text-on-surface">₹5,000</span>
<div className="flex items-center gap-1.5 mt-2">
<span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-50 text-income-positive font-caption text-caption font-medium">Liquid MF SIP • Locked</span>
<span className="text-text-secondary font-caption text-caption">Nov 05 Executed</span>
</div>
</div>
</div>
{/* Card 4 */}
<div className="flex flex-col justify-between p-space-xl rounded-lg bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
<div className="flex items-center justify-between gap-2">
<span className="font-label-sm text-label-sm text-text-secondary uppercase tracking-wider">Safety Floor Buffer</span>
<div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-warning-alert">
<span className="material-symbols-outlined text-[18px]">security</span>
</div>
</div>
<div className="flex flex-col mt-3">
<span className="font-metric-xl text-metric-xl text-on-surface">₹5,000</span>
<div className="flex items-center gap-1.5 mt-2">
<span className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-caption text-caption font-medium">Zero-Deficit Target</span>
<span className="text-text-secondary font-caption text-caption">Preserves penalty-free floor</span>
</div>
</div>
</div>
</section>
{/* SECTION 4: Spending Velocity & Pacing Widget */}
<section className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
{/* Left: Velocity Limits (5 Cols) */}
<div className="lg:col-span-5 p-space-xl rounded-lg bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-6">
<div>
<div className="flex items-center justify-between mb-4">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[20px]">speed</span>
<h2 className="font-headline-md text-headline-md text-on-surface">Spending Velocity Limits</h2>
</div>
<span className="font-caption text-caption px-2 py-0.5 rounded bg-surface-container text-on-surface-variant">Nov 22 – 30</span>
</div>
<div className="grid grid-cols-2 gap-4">
<div className="p-4 rounded-lg bg-lavender-subtle flex flex-col">
<span className="font-label-sm text-label-sm text-text-secondary">Safe Daily Spend Limit</span>
<span className="font-metric-xl text-metric-xl text-primary mt-1 font-bold">₹806 <span className="font-label-sm text-label-sm text-text-secondary font-normal">/ day</span></span>
<span className="font-caption text-[11px] text-text-secondary mt-1">₹6,450 ÷ 8 days</span>
</div>
<div className="p-4 rounded-lg bg-lavender-subtle flex flex-col">
<span className="font-label-sm text-label-sm text-text-secondary">Weekly Allowance</span>
<span className="font-metric-xl text-metric-xl text-on-surface mt-1 font-bold">₹5,640 <span className="font-label-sm text-label-sm text-text-secondary font-normal">/ 7 days</span></span>
<span className="font-caption text-[11px] text-income-positive mt-1">Sustainable pacing</span>
</div>
</div>
</div>
<div className="p-3.5 rounded-lg bg-emerald-50/70 flex items-start gap-3">
<span className="material-symbols-outlined text-income-positive text-[20px] shrink-0 mt-0.5">check_circle</span>
<div className="flex flex-col text-sm">
<span className="font-headline-sm text-headline-sm text-income-positive">Pacing Surplus Buffer</span>
<span className="font-body-md text-body-md text-on-surface">You are spending ₹250/day less than your planned envelope. Surplus builds into your year-end reserve fund.</span>
</div>
</div>
</div>
{/* Right: Discretionary Spending Progress (7 Cols) */}
<div className="lg:col-span-7 p-space-xl rounded-lg bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-6">
<div>
<div className="flex items-center justify-between mb-4">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[20px]">donut_large</span>
<h2 className="font-headline-md text-headline-md text-on-surface">Monthly Discretionary Envelope</h2>
</div>
<span className="font-label-sm text-label-sm text-text-secondary">Total Budget: ₹12,000</span>
</div>
<div className="flex items-center justify-between mb-2">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-text-secondary">Consumed To Date</span>
<span className="font-headline-md text-headline-md text-on-surface">₹5,550 <span className="text-text-secondary font-body-md text-body-md">(46.2%)</span></span>
</div>
<div className="flex flex-col text-right">
<span className="font-label-sm text-label-sm text-text-secondary">Remaining Envelope</span>
<span className="font-headline-md text-headline-md text-income-positive">₹6,450 <span className="text-income-positive font-body-md text-body-md">(53.8%)</span></span>
</div>
</div>
{/* Multi-zone Progress Bar */}
<div className="relative w-full h-4 rounded-full bg-surface-container overflow-hidden my-3">
<div className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all duration-500" style={{"width":"46.25%"}}></div>
{/* Threshold Markers */}
<div className="absolute top-0 bottom-0 left-[60%] w-0.5 bg-surface-container-lowest opacity-80" title="Caution Zone"></div>
<div className="absolute top-0 bottom-0 left-[85%] w-0.5 bg-surface-container-lowest opacity-80" title="Critical Zone"></div>
</div>
{/* Zone Indicators */}
<div className="grid grid-cols-3 gap-2 text-center pt-1">
<div className="flex flex-col items-center">
<span className="font-label-sm text-label-sm text-income-positive font-semibold">0% - 60%</span>
<span className="font-caption text-caption text-text-secondary">Green: Safe Velocity</span>
</div>
<div className="flex flex-col items-center">
<span className="font-label-sm text-label-sm text-warning-alert font-semibold">60% - 85%</span>
<span className="font-caption text-caption text-text-secondary">Amber: Slow Discretionary</span>
</div>
<div className="flex flex-col items-center">
<span className="font-label-sm text-label-sm text-expense-negative font-semibold">85% - 100%</span>
<span className="font-caption text-caption text-text-secondary">Red: Freeze Non-Essentials</span>
</div>
</div>
</div>
<div className="flex items-center justify-between pt-2 text-text-secondary font-caption text-caption">
<span>Cycle Days: 22 elapsed / 8 remaining</span>
<span className="font-medium text-on-surface">Target Nov 30 Balance: ≥ ₹5,000</span>
</div>
</div>
</section>
{/* SECTION 5: Spending Breakdown (The Complete Waterfall) */}
<section className="p-space-xl rounded-lg bg-surface-container-lowest shadow-sm flex flex-col gap-6">
<div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[22px]">waterfall_chart</span>
<div>
<h2 className="font-headline-md text-headline-md text-on-surface">November Capital Allocation Flow</h2>
<p className="font-caption text-caption text-text-secondary">Deterministic accounting waterfall from gross inflows down to discretionary headroom</p>
</div>
</div>
<span className="inline-flex items-center gap-1 text-label-sm font-label-sm px-3 py-1 bg-surface-container text-primary rounded-full">
          Total Inflows: ₹45,000
        </span>
</div>
{/* Waterfall Graphic Rows */}
<div className="flex flex-col gap-3">
{/* Tier 1: Inflow */}
<div className="flex flex-col md:flex-row md:items-center justify-between p-3.5 rounded-lg bg-surface-container-low gap-3">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-income-positive/10 text-income-positive flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[18px]">south</span>
</div>
<div className="flex flex-col">
<span className="font-headline-sm text-headline-sm text-on-surface">Total Inflows (Nov 2026)</span>
<span className="font-caption text-caption text-text-secondary">TechCorp Base ₹40,000 + Product Design Freelance ₹5,000</span>
</div>
</div>
<div className="flex items-center gap-4 self-end md:self-auto">
<span className="font-headline-md text-headline-md text-income-positive font-semibold">+₹45,000</span>
<span className="w-20 text-right font-caption text-caption text-text-secondary">100% Inflow</span>
</div>
</div>
{/* Tier 2: Fixed Obligations */}
<div className="flex flex-col md:flex-row md:items-center justify-between p-3.5 rounded-lg bg-lavender-subtle gap-3">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-expense-negative/10 text-expense-negative flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[18px]">lock</span>
</div>
<div className="flex flex-col">
<span className="font-headline-sm text-headline-sm text-on-surface">Fixed Committed Obligations</span>
<span className="font-caption text-caption text-text-secondary">Prestige Oakwood Apartment Rent (₹8,000) + HDFC Personal Loan EMI (₹4,500)</span>
</div>
</div>
<div className="flex items-center gap-4 self-end md:self-auto">
<span className="font-headline-md text-headline-md text-expense-negative font-semibold">-₹12,500</span>
<span className="w-20 text-right font-caption text-caption text-income-positive font-medium">100% Paid</span>
</div>
</div>
{/* Tier 3: Essential Variable Outflows */}
<div className="flex flex-col md:flex-row md:items-center justify-between p-3.5 rounded-lg bg-lavender-subtle gap-3">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-amber-500/10 text-warning-alert flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[18px]">shopping_cart</span>
</div>
<div className="flex flex-col">
<span className="font-headline-sm text-headline-sm text-on-surface">Essential Utilities &amp; Provisions</span>
<span className="font-caption text-caption text-text-secondary">Groceries ₹4,200 + BESCOM Power/Airtel ₹2,449 + Shell Fuel ₹1,450</span>
</div>
</div>
<div className="flex items-center gap-4 self-end md:self-auto">
<span className="font-headline-md text-headline-md text-on-surface font-semibold">-₹8,099</span>
<span className="w-20 text-right font-caption text-caption text-text-secondary">82% Executed</span>
</div>
</div>
{/* Tier 4: Discretionary to Date */}
<div className="flex flex-col md:flex-row md:items-center justify-between p-3.5 rounded-lg bg-lavender-subtle gap-3">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[18px]">restaurant</span>
</div>
<div className="flex flex-col">
<span className="font-headline-sm text-headline-sm text-on-surface">Discretionary Spent to Date</span>
<span className="font-caption text-caption text-text-secondary">Social Dining ₹2,800 + Lifestyle Shopping ₹850 + Misc Subscriptions ₹601</span>
</div>
</div>
<div className="flex items-center gap-4 self-end md:self-auto">
<span className="font-headline-md text-headline-md text-on-surface font-semibold">-₹4,251</span>
<span className="w-20 text-right font-caption text-caption text-text-secondary">Recorded</span>
</div>
</div>
{/* Tier 5: Planned Emergency Savings SIP */}
<div className="flex flex-col md:flex-row md:items-center justify-between p-3.5 rounded-lg bg-lavender-subtle gap-3">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-emerald-500/10 text-income-positive flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[18px]">shield</span>
</div>
<div className="flex flex-col">
<span className="font-headline-sm text-headline-sm text-on-surface">Target Monthly Savings Contribution</span>
<span className="font-caption text-caption text-text-secondary">Automated SIP to Parag Parikh Liquid Fund</span>
</div>
</div>
<div className="flex items-center gap-4 self-end md:self-auto">
<span className="font-headline-md text-headline-md text-income-positive font-semibold">-₹5,000</span>
<span className="w-20 text-right font-caption text-caption text-income-positive font-medium">Locked</span>
</div>
</div>
{/* Tier 6: Minimum Liquid Floor Buffer */}
<div className="flex flex-col md:flex-row md:items-center justify-between p-3.5 rounded-lg bg-lavender-subtle gap-3">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-primary-container/10 text-primary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[18px]">layers</span>
</div>
<div className="flex flex-col">
<span className="font-headline-sm text-headline-sm text-on-surface">Minimum Safety Floor Retained</span>
<span className="font-caption text-caption text-text-secondary">Zero-deficit untouchable buffer across current cycle</span>
</div>
</div>
<div className="flex items-center gap-4 self-end md:self-auto">
<span className="font-headline-md text-headline-md text-on-surface font-semibold">-₹5,000</span>
<span className="w-20 text-right font-caption text-caption text-text-secondary">Ringfenced</span>
</div>
</div>
{/* Tier 7: Final Result Card */}
<div className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg bg-surface-container text-on-surface gap-3">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[18px]">account_balance</span>
</div>
<div className="flex flex-col">
<span className="font-headline-md text-headline-md text-primary font-bold">Remaining Uncommitted Safe to Spend</span>
<span className="font-caption text-caption text-text-secondary">Completely unencumbered cash ready for free use without risk</span>
</div>
</div>
<div className="flex items-center gap-4 self-end md:self-auto">
<span className="font-metric-xl text-metric-xl text-primary font-bold">₹6,450</span>
<span className="w-20 text-right font-label-sm text-label-sm text-income-positive font-semibold">14.3% Free</span>
</div>
</div>
</div>
</section>
{/* SECTION 6: Upcoming Commitments Schedule */}
<section className="p-space-xl rounded-lg bg-surface-container-lowest shadow-sm flex flex-col gap-space-lg">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[22px]">calendar_month</span>
<div>
<h2 className="font-headline-md text-headline-md text-on-surface">Upcoming Financial Commitments</h2>
<p className="font-caption text-caption text-text-secondary">Chronological schedule of confirmed debits deducted before calculating Safe to Spend</p>
</div>
</div>
<div className="flex items-center gap-2">
<span className="font-label-sm text-label-sm text-text-secondary">Total Pending Obligations:</span>
<span className="font-headline-sm text-headline-sm text-expense-negative">₹5,749</span>
</div>
</div>
{/* Ledger Table */}
<div className="w-full overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-lavender-subtle text-text-secondary font-label-sm text-label-sm uppercase tracking-wider">
<th className="py-3 px-4 rounded-l-lg">Obligation / Payee</th>
<th className="py-3 px-4">Category</th>
<th className="py-3 px-4">Due Date</th>
<th className="py-3 px-4">Account Rail</th>
<th className="py-3 px-4 text-right">Amount</th>
<th className="py-3 px-4 text-center rounded-r-lg">Execution Status</th>
</tr>
</thead>
<tbody className="divide-y divide-border-subtle font-body-md text-body-md">
{/* Row 1 */}
<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3.5 px-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-amber-50 text-warning-alert flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[16px]">bolt</span>
</div>
<div className="flex flex-col">
<span className="font-headline-sm text-headline-sm text-on-surface">BESCOM Power &amp; Airtel Fiber</span>
<span className="font-caption text-caption text-text-secondary">Electricity &amp; Gigabit Wi-Fi</span>
</div>
</div>
</td>
<td className="py-3.5 px-4 text-text-secondary">Utilities</td>
<td className="py-3.5 px-4">
<div className="flex flex-col">
<span className="font-medium text-on-surface">Nov 10, 2026</span>
<span className="font-caption text-caption text-warning-alert font-medium">Due in 2 days</span>
</div>
</td>
<td className="py-3.5 px-4">
<span className="px-2 py-0.5 rounded text-[11px] font-medium bg-surface-container text-primary">NACH Auto-Debit</span>
</td>
<td className="py-3.5 px-4 text-right font-headline-sm text-headline-sm text-expense-negative">
                ₹2,449
              </td>
<td className="py-3.5 px-4 text-center">
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-warning-alert font-label-sm text-label-sm">
<span className="w-1.5 h-1.5 rounded-full bg-warning-alert"></span>
                  Pending Auto-Debit
                </span>
</td>
</tr>
{/* Row 2 */}
<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3.5 px-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-emerald-50 text-income-positive flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[16px]">check</span>
</div>
<div className="flex flex-col">
<span className="font-headline-sm text-headline-sm text-on-surface">HDFC Personal Loan EMI</span>
<span className="font-caption text-caption text-text-secondary">Loan Ac #982103 • 24/36 mo</span>
</div>
</div>
</td>
<td className="py-3.5 px-4 text-text-secondary">Debt Service</td>
<td className="py-3.5 px-4">
<div className="flex flex-col">
<span className="font-medium text-on-surface">Nov 05, 2026</span>
<span className="font-caption text-caption text-text-secondary">Cleared</span>
</div>
</td>
<td className="py-3.5 px-4">
<span className="px-2 py-0.5 rounded text-[11px] font-medium bg-surface-container text-primary">Standing Instruction</span>
</td>
<td className="py-3.5 px-4 text-right font-headline-sm text-headline-sm text-on-surface line-through opacity-70">
                ₹4,500
              </td>
<td className="py-3.5 px-4 text-center">
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-income-positive font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[12px]">done</span>
                  Paid / Settled
                </span>
</td>
</tr>
{/* Row 3 */}
<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3.5 px-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-emerald-50 text-income-positive flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[16px]">home</span>
</div>
<div className="flex flex-col">
<span className="font-headline-sm text-headline-sm text-on-surface">Prestige Oakwood Rent</span>
<span className="font-caption text-caption text-text-secondary">Monthly flat lease landlord credit</span>
</div>
</div>
</td>
<td className="py-3.5 px-4 text-text-secondary">Housing</td>
<td className="py-3.5 px-4">
<div className="flex flex-col">
<span className="font-medium text-on-surface">Nov 03, 2026</span>
<span className="font-caption text-caption text-text-secondary">Cleared</span>
</div>
</td>
<td className="py-3.5 px-4">
<span className="px-2 py-0.5 rounded text-[11px] font-medium bg-surface-container text-primary">IMPS Transfer</span>
</td>
<td className="py-3.5 px-4 text-right font-headline-sm text-headline-sm text-on-surface line-through opacity-70">
                ₹8,000
              </td>
<td className="py-3.5 px-4 text-center">
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-income-positive font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[12px]">done</span>
                  Paid / Settled
                </span>
</td>
</tr>
{/* Row 4 */}
<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3.5 px-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-surface-container text-primary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[16px]">local_mall</span>
</div>
<div className="flex flex-col">
<span className="font-headline-sm text-headline-sm text-on-surface">Mid-Month Blinkit Groceries</span>
<span className="font-caption text-caption text-text-secondary">Estimated pantry replenishment</span>
</div>
</div>
</td>
<td className="py-3.5 px-4 text-text-secondary">Living Provision</td>
<td className="py-3.5 px-4">
<div className="flex flex-col">
<span className="font-medium text-on-surface">Nov 20, 2026</span>
<span className="font-caption text-caption text-text-secondary">In 12 days</span>
</div>
</td>
<td className="py-3.5 px-4">
<span className="px-2 py-0.5 rounded text-[11px] font-medium bg-surface-container text-primary">UPI Target</span>
</td>
<td className="py-3.5 px-4 text-right font-headline-sm text-headline-sm text-expense-negative">
                ₹2,100
              </td>
<td className="py-3.5 px-4 text-center">
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm">
<span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Scheduled Essential
                </span>
</td>
</tr>
{/* Row 5 */}
<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3.5 px-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-surface-container text-primary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[16px]">local_gas_station</span>
</div>
<div className="flex flex-col">
<span className="font-headline-sm text-headline-sm text-on-surface">Fuel &amp; Commute Recharge</span>
<span className="font-caption text-caption text-text-secondary">Metro card + 2-Wheeler Petrol</span>
</div>
</div>
</td>
<td className="py-3.5 px-4 text-text-secondary">Transportation</td>
<td className="py-3.5 px-4">
<div className="flex flex-col">
<span className="font-medium text-on-surface">Nov 28, 2026</span>
<span className="font-caption text-caption text-text-secondary">In 20 days</span>
</div>
</td>
<td className="py-3.5 px-4">
<span className="px-2 py-0.5 rounded text-[11px] font-medium bg-surface-container text-primary">Debit Card</span>
</td>
<td className="py-3.5 px-4 text-right font-headline-sm text-headline-sm text-expense-negative">
                ₹1,200
              </td>
<td className="py-3.5 px-4 text-center">
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-lavender-subtle text-on-surface-variant font-label-sm text-label-sm">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  Planned Variable
                </span>
</td>
</tr>
</tbody>
</table>
</div>
</section>
{/* SECTION 7: Interactive Spending Scenario Calculator */}
<section className="p-space-xl rounded-lg bg-surface-container-lowest shadow-sm flex flex-col gap-6">
<div className="flex flex-col gap-1">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[22px]">calculate</span>
<h2 className="font-headline-md text-headline-md text-on-surface">Interactive Purchase Simulator ("Can I Afford This?")</h2>
</div>
<p className="font-caption text-caption text-text-secondary">Test immediate discretionary expenses to inspect real-time impact on daily run rate and mandatory safety floor.</p>
</div>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
{/* Controls (5 Cols) */}
<div className="lg:col-span-5 flex flex-col gap-4">
<label className="font-label-sm text-label-sm uppercase tracking-wider text-text-secondary" htmlFor="sim-input">Planned Purchase Amount</label>
<div className="relative flex items-center">
<span className="absolute left-3.5 text-primary font-bold text-lg select-none">₹</span>
<input className="w-full h-11 pl-9 pr-4 rounded bg-surface-container-lowest font-headline-sm text-headline-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm" id="sim-input" max="25000" min="0" placeholder="Enter amount..." step="100" type="number" defaultValue="4500"/>
</div>
<span className="font-caption text-caption text-text-secondary">Quick Presets:</span>
<div className="flex flex-wrap gap-2">
<button className="sim-preset-btn px-3 py-1.5 rounded-full bg-surface-container text-primary font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-colors" data-amount="1500" type="button">
              ₹1,500 Dining
            </button>
<button className="sim-preset-btn px-3 py-1.5 rounded-full bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-colors" data-amount="4500" type="button">
              ₹4,500 ANC Headphones
            </button>
<button className="sim-preset-btn px-3 py-1.5 rounded-full bg-surface-container text-primary font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-colors" data-amount="8000" type="button">
              ₹8,000 Getaway
            </button>
</div>
<div className="mt-2 p-3.5 rounded-lg bg-surface-container-low flex flex-col gap-1.5">
<div className="flex items-center gap-1.5 font-label-sm text-label-sm text-primary">
<span className="material-symbols-outlined text-[16px]">info</span>
<span>Baseline State Before Purchase</span>
</div>
<div className="flex justify-between font-caption text-caption text-text-secondary">
<span>Current Safe to Spend:</span>
<span className="text-on-surface font-medium">₹6,450</span>
</div>
<div className="flex justify-between font-caption text-caption text-text-secondary">
<span>Current Daily Allowance:</span>
<span className="text-on-surface font-medium">₹806 / day</span>
</div>
</div>
</div>
{/* Dynamic Assessment Result (7 Cols) */}
<div className="lg:col-span-7 p-space-xl rounded-lg bg-lavender-subtle flex flex-col justify-between gap-5" id="sim-result-card">
<div className="flex flex-col gap-4">
<div className="flex flex-wrap items-center justify-between gap-2">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-text-secondary">Simulated Post-Purchase Position</span>
<span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-label-sm text-label-sm font-semibold" id="sim-badge">
<span className="w-1.5 h-1.5 rounded-full bg-warning-alert"></span>
                Affordable with Caution
              </span>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
<div className="p-3.5 rounded-lg bg-surface-container-lowest shadow-sm flex flex-col">
<span className="font-caption text-caption text-text-secondary">New Safe to Spend</span>
<span className="font-metric-xl text-metric-xl text-on-surface mt-0.5 font-bold" id="sim-new-safe">₹1,950</span>
<span className="font-caption text-[11px] text-text-secondary mt-0.5">₹6,450 - ₹4,500</span>
</div>
<div className="p-3.5 rounded-lg bg-surface-container-lowest shadow-sm flex flex-col">
<span className="font-caption text-caption text-text-secondary">Adjusted Daily Run Rate</span>
<div className="flex items-baseline gap-1.5 mt-0.5">
<span className="font-metric-xl text-metric-xl text-warning-alert font-bold" id="sim-new-daily">₹243</span>
<span className="font-caption text-caption text-text-secondary">/ day (8 days left)</span>
</div>
<span className="font-caption text-[11px] text-expense-negative mt-0.5">Down from ₹806 / day</span>
</div>
</div>
{/* Impact Matrix */}
<div className="flex flex-col gap-2 pt-1 font-body-md text-body-md">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-income-positive text-[18px]">verified</span>
<span className="text-on-surface"><strong>Zero impact on bills &amp; EMIs:</strong> Upcoming obligations (₹6,950) remain 100% protected.</span>
</div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-income-positive text-[18px]">verified</span>
<span className="text-on-surface"><strong>Zero impact on savings:</strong> Planned ₹5,000 Liquid SIP remains untouchable.</span>
</div>
</div>
</div>
{/* Simulation Recommendation Banner */}
<div className="p-3.5 rounded-lg bg-surface-container-lowest shadow-sm flex items-start gap-3" id="sim-recommendation-box">
<span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">lightbulb</span>
<div className="flex flex-col text-sm">
<span className="font-headline-sm text-headline-sm text-on-surface">Actionable Recommendation</span>
<p className="font-body-md text-body-md text-text-secondary mt-0.5" id="sim-recommendation-text">
                If purchased, restrict discretionary weekend dining to under ₹500 to keep the ₹5,000 safety floor intact before the Nov 30 salary credit.
              </p>
</div>
</div>
</div>
</div>
</section>
{/* SECTION 8: AI Spending Intelligence & Guardrails */}
<section className="flex flex-col gap-4">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[22px]">psychology</span>
<div>
<h2 className="font-headline-md text-headline-md text-on-surface">AI Spending Guardrails &amp; Insights</h2>
<p className="font-caption text-caption text-text-secondary">Behavioral patterns engineered from Arjun's historical transactions</p>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
{/* Guardrail A */}
<div className="p-space-xl rounded-lg bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-4">
<div className="flex flex-col gap-2">
<div className="flex items-center justify-between">
<div className="w-8 h-8 rounded-lg bg-amber-50 text-warning-alert flex items-center justify-center">
<span className="material-symbols-outlined text-[18px]">nightlife</span>
</div>
<span className="font-label-sm text-label-sm text-warning-alert font-semibold uppercase tracking-wider">Weekend Cap</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mt-1">Weekend Dining Spike Warning</h3>
<p className="font-body-md text-body-md text-text-secondary">
              Historically, 64% of your monthly discretionary outflows occur between Friday evening and Sunday night. We recommend capping this upcoming weekend's leisure spend at <strong>₹2,200</strong>.
            </p>
</div>
<div className="pt-2 flex items-center justify-between font-caption text-caption text-text-secondary">
<span>Historical Friday Spike</span>
<span className="font-medium text-on-surface">2.4x Weekday Rate</span>
</div>
</div>
{/* Guardrail B */}
<div className="p-space-xl rounded-lg bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-4">
<div className="flex flex-col gap-2">
<div className="flex items-center justify-between">
<div className="w-8 h-8 rounded-lg bg-emerald-50 text-income-positive flex items-center justify-center">
<span className="material-symbols-outlined text-[18px]">trending_up</span>
</div>
<span className="font-label-sm text-label-sm text-income-positive font-semibold uppercase tracking-wider">Optimal Pacing</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mt-1">Surplus Compound Opportunity</h3>
<p className="font-body-md text-body-md text-text-secondary">
              Keeping daily discretionary spending under <strong>₹800</strong> ensures you enter December with an extra <strong>₹1,650 cash cushion</strong>, ready to be automatically swept into your Liquid MF SIP.
            </p>
</div>
<div className="pt-2 flex items-center justify-between font-caption text-caption text-text-secondary">
<span>Potential Dec Carryover</span>
<span className="font-medium text-income-positive">+₹1,650</span>
</div>
</div>
{/* Guardrail C */}
<div className="p-space-xl rounded-lg bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-4">
<div className="flex flex-col gap-2">
<div className="flex items-center justify-between">
<div className="w-8 h-8 rounded-lg bg-red-50 text-expense-negative flex items-center justify-center">
<span className="material-symbols-outlined text-[18px]">drive_file_rename_outline</span>
</div>
<span className="font-label-sm text-label-sm text-expense-negative font-semibold uppercase tracking-wider">Floor Alert</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mt-1">Buffer Defense Protocol</h3>
<p className="font-body-md text-body-md text-text-secondary">
              If an unexpected discretionary purchase exceeds <strong>₹6,450</strong>, funds will erode your <strong>₹5,000 minimum safety buffer</strong>, leaving zero margin before the Nov 30 salary credit.
            </p>
</div>
<div className="pt-2 flex items-center justify-between font-caption text-caption text-text-secondary">
<span>Buffer Threshold</span>
<span className="font-medium text-expense-negative">₹5,000 Hard Limit</span>
</div>
</div>
</div>
</section>
{/* SECTION 9: Actuarial & Data Governance Footnote */}
<footer className="p-space-lg rounded-lg bg-lavender-subtle text-text-secondary flex items-start gap-3 shadow-sm mb-4">
<span className="material-symbols-outlined text-[20px] text-primary shrink-0 mt-0.5">verified_user</span>
<div className="flex flex-col gap-1">
<span className="font-headline-sm text-headline-sm text-on-surface">Actuarial Determinism &amp; Data Governance</span>
<p className="font-caption text-caption leading-relaxed">
          All calculations are strictly deterministic and based on user-entered ledger records, confirmed scheduled dates, and the selected ₹5,000 safety buffer. MoneyMentor AI does not access live banking credentials or execute financial transactions. Projections apply conservative risk modeling to protect non-negotiable living liabilities and debt schedules.
        </p>
</div>
</footer>
</div>
</div>

    </>
  );
}
