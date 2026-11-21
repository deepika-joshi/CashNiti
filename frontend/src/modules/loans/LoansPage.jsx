import React from 'react';

export default function LoansPage() {

  React.useEffect(() => {
    const calcAmountInput = document.getElementById('calcAmountInput');
    const calcAmountSlider = document.getElementById('calcAmountSlider');
    const calcRateInput = document.getElementById('calcRateInput');
    const calcRateSlider = document.getElementById('calcRateSlider');
    const calcTenureInput = document.getElementById('calcTenureInput');
    const calcTenureSlider = document.getElementById('calcTenureSlider');
    const tenureMonthsBtn = document.getElementById('tenureMonthsBtn');
    const tenureYearsBtn = document.getElementById('tenureYearsBtn');

    if (!calcAmountInput || !calcAmountSlider) return;

    let isTenureInYears = false;

    function calculateEMI() {
      let p = parseFloat(calcAmountInput.value) || 0;
      let annualRate = parseFloat(calcRateInput.value) || 0;
      let tenure = parseInt(calcTenureInput.value) || 1;
      let n = isTenureInYears ? tenure * 12 : tenure;

      if (p <= 0 || n <= 0) return;

      let r = (annualRate / 12) / 100;
      let emi = r === 0 ? p / n : (p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1));
      let totalRepay = emi * n;
      let totalInterest = totalRepay - p;

      const monthlyEl = document.getElementById('calcMonthlyEMI');
      const interestEl = document.getElementById('calcTotalInterest');
      const repayEl = document.getElementById('calcTotalRepay');
      const pPctEl = document.getElementById('calcPrincipalPct');
      const iPctEl = document.getElementById('calcInterestPct');
      const pBarEl = document.getElementById('calcPrincipalBar');
      const iBarEl = document.getElementById('calcInterestBar');

      if (monthlyEl) monthlyEl.textContent = '₹' + Math.round(emi).toLocaleString('en-IN');
      if (interestEl) interestEl.textContent = '₹' + Math.round(totalInterest).toLocaleString('en-IN');
      if (repayEl) repayEl.textContent = '₹' + Math.round(totalRepay).toLocaleString('en-IN');

      let pPct = Math.round((p / totalRepay) * 1000) / 10;
      let iPct = (100 - pPct).toFixed(1);

      if (pPctEl) pPctEl.textContent = pPct + '%';
      if (iPctEl) iPctEl.textContent = iPct + '%';
      if (pBarEl) pBarEl.style.width = pPct + '%';
      if (iBarEl) iBarEl.style.width = iPct + '%';

      updateScheduleTable(p, r, emi);
    }

    function updateScheduleTable(p, r, emi) {
      const tbody = document.getElementById('scheduleTableBody');
      if (!tbody) return;
      let html = '';
      let currentBalance = p;

      for (let month = 1; month <= 6; month++) {
        let interestComponent = currentBalance * r;
        let principalComponent = emi - interestComponent;
        let closingBalance = Math.max(0, currentBalance - principalComponent);

        html += `
          <tr class="hover:bg-surface-container/60 transition-colors">
            <td class="py-2.5 px-4 font-semibold">Month ${month}</td>
            <td class="py-2.5 px-4">₹${Math.round(currentBalance).toLocaleString('en-IN')}</td>
            <td class="py-2.5 px-4 font-semibold text-primary">₹${Math.round(emi).toLocaleString('en-IN')}</td>
            <td class="py-2.5 px-4 text-income-positive">₹${Math.round(principalComponent).toLocaleString('en-IN')}</td>
            <td class="py-2.5 px-4 text-expense-negative">₹${Math.round(interestComponent).toLocaleString('en-IN')}</td>
            <td class="py-2.5 px-4 text-right">₹${Math.round(closingBalance).toLocaleString('en-IN')}</td>
          </tr>
        `;
        currentBalance = closingBalance;
      }
      tbody.innerHTML = html;
    }

    const onAmountSlider = (e) => { calcAmountInput.value = e.target.value; calculateEMI(); };
    const onAmountInput = (e) => { calcAmountSlider.value = e.target.value; calculateEMI(); };
    calcAmountSlider.addEventListener('input', onAmountSlider);
    calcAmountInput.addEventListener('input', onAmountInput);

    const onRateSlider = (e) => { calcRateInput.value = e.target.value; calculateEMI(); };
    const onRateInput = (e) => { calcRateSlider.value = e.target.value; calculateEMI(); };
    calcRateSlider?.addEventListener('input', onRateSlider);
    calcRateInput?.addEventListener('input', onRateInput);

    const onTenureSlider = (e) => { calcTenureInput.value = e.target.value; calculateEMI(); };
    const onTenureInput = (e) => { calcTenureSlider.value = e.target.value; calculateEMI(); };
    calcTenureSlider?.addEventListener('input', onTenureSlider);
    calcTenureInput?.addEventListener('input', onTenureInput);

    const onMonthsClick = () => {
      if (isTenureInYears) {
        isTenureInYears = false;
        calcTenureSlider.min = "6";
        calcTenureSlider.max = "120";
        calcTenureSlider.value = String(parseInt(calcTenureInput.value) * 12);
        calcTenureInput.value = calcTenureSlider.value;
        tenureMonthsBtn?.classList.add('bg-surface-container-lowest', 'text-primary', 'font-semibold', 'shadow-sm');
        tenureMonthsBtn?.classList.remove('text-text-secondary');
        tenureYearsBtn?.classList.remove('bg-surface-container-lowest', 'text-primary', 'font-semibold', 'shadow-sm');
        tenureYearsBtn?.classList.add('text-text-secondary');
        calculateEMI();
      }
    };
    const onYearsClick = () => {
      if (!isTenureInYears) {
        isTenureInYears = true;
        calcTenureSlider.min = "1";
        calcTenureSlider.max = "10";
        calcTenureSlider.value = String(Math.max(1, Math.round(parseInt(calcTenureInput.value) / 12)));
        calcTenureInput.value = calcTenureSlider.value;
        tenureYearsBtn?.classList.add('bg-surface-container-lowest', 'text-primary', 'font-semibold', 'shadow-sm');
        tenureYearsBtn?.classList.remove('text-text-secondary');
        tenureMonthsBtn?.classList.remove('bg-surface-container-lowest', 'text-primary', 'font-semibold', 'shadow-sm');
        tenureMonthsBtn?.classList.add('text-text-secondary');
        calculateEMI();
      }
    };
    tenureMonthsBtn?.addEventListener('click', onMonthsClick);
    tenureYearsBtn?.addEventListener('click', onYearsClick);

    // Initial calculation
    calculateEMI();

    return () => {
      calcAmountSlider?.removeEventListener('input', onAmountSlider);
      calcAmountInput?.removeEventListener('input', onAmountInput);
      calcRateSlider?.removeEventListener('input', onRateSlider);
      calcRateInput?.removeEventListener('input', onRateInput);
      calcTenureSlider?.removeEventListener('input', onTenureSlider);
      calcTenureInput?.removeEventListener('input', onTenureInput);
    };
  }, []);

  return (
    <>
<div className="flex flex-col w-full">
{/* Content Canvas Container */}
<div className="w-full max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-xl space-y-space-xl">
{/* 1. Header & Actions Section */}
<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
<div className="space-y-space-xs">
<div className="inline-flex items-center gap-space-xs px-2.5 py-1 rounded-full bg-surface-container text-primary font-label-sm text-label-sm">
<span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          Active Debt Portfolio • 2 Active Loans
        </div>
<h1 className="font-display text-display text-on-surface tracking-tight">Loans &amp; EMI Intelligence</h1>
<p className="font-body-md text-body-md text-text-secondary max-w-3xl">
          Understand your debt structure, calculate reducing-balance EMIs, simulate early prepayments, and optimize your path to zero debt.
        </p>
</div>
{/* Action Buttons */}
<div className="flex flex-wrap items-center gap-space-sm pt-space-xs lg:pt-0">
<button className="inline-flex items-center gap-space-xs px-4 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md shadow-sm hover:bg-lavender-subtle transition-all cursor-pointer" id="exportLedgerBtn">
<span className="material-symbols-outlined text-[18px]">download</span>
          Export Debt Ledger
        </button>
<button className="inline-flex items-center gap-space-xs px-4 py-2.5 rounded-lg bg-surface-container text-primary font-label-md text-label-md hover:bg-surface-container-high transition-all cursor-pointer" id="compareOffersQuickBtn">
<span className="material-symbols-outlined text-[18px]">balance</span>
          Compare Offers
        </button>
<button className="inline-flex items-center gap-space-xs px-4 py-2.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md shadow-md hover:opacity-90 transition-all cursor-pointer" id="addLoanBtn">
<span className="material-symbols-outlined text-[18px]">add</span>
          + Add Loan
        </button>
</div>
</div>
{/* 2. KPI Summary Cards Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
{/* Card 1 */}
<div className="p-space-xl bg-surface-container-lowest rounded-lg shadow-sm flex flex-col justify-between space-y-space-md">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-text-secondary uppercase">Total Outstanding</span>
<div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[18px]">account_balance</span>
</div>
</div>
<div>
<div className="font-metric-xl text-metric-xl text-on-surface tracking-tight">₹3,84,500</div>
<p className="font-caption text-caption text-text-secondary mt-1">Across 2 active credit facilities</p>
</div>
<div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-50 text-income-positive font-label-sm text-label-sm w-fit">
<span className="material-symbols-outlined text-[14px]">arrow_downward</span>
          -₹8,450 paid down this quarter
        </div>
</div>
{/* Card 2 */}
<div className="p-space-xl bg-surface-container-lowest rounded-lg shadow-sm flex flex-col justify-between space-y-space-md">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-text-secondary uppercase">Monthly EMI Burden</span>
<div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[18px]">payments</span>
</div>
</div>
<div>
<div className="font-metric-xl text-metric-xl text-on-surface tracking-tight">₹11,200 <span className="font-body-md text-body-md text-text-secondary font-normal">/ mo</span></div>
<p className="font-caption text-caption text-text-secondary mt-1">Monthly commitments out of ₹52k income</p>
</div>
<div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-purple-50 text-primary font-label-sm text-label-sm w-fit">
<span className="material-symbols-outlined text-[14px]">check_circle</span>
          21.5% DTI (Below 35% safe limit)
        </div>
</div>
{/* Card 3 */}
<div className="p-space-xl bg-surface-container-lowest rounded-lg shadow-sm flex flex-col justify-between space-y-space-md">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-text-secondary uppercase">Remaining Interest</span>
<div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[18px]">percent</span>
</div>
</div>
<div>
<div className="font-metric-xl text-metric-xl text-on-surface tracking-tight">₹78,420</div>
<p className="font-caption text-caption text-text-secondary mt-1">Total future contractual interest cost</p>
</div>
<div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-purple-50 text-primary font-label-sm text-label-sm w-fit">
<span className="material-symbols-outlined text-[14px]">trending_down</span>
          Reducing amortisation model
        </div>
</div>
{/* Card 4 */}
<div className="p-space-xl bg-surface-container-lowest rounded-lg shadow-sm flex flex-col justify-between space-y-space-md">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-text-secondary uppercase">Active Facilities</span>
<div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[18px]">event_repeat</span>
</div>
</div>
<div>
<div className="font-metric-xl text-metric-xl text-on-surface tracking-tight">2 Active</div>
<p className="font-caption text-caption text-text-secondary mt-1">HDFC Personal + SBI Education</p>
</div>
<div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-amber-50 text-warning-alert font-label-sm text-label-sm w-fit">
<span className="material-symbols-outlined text-[14px]">schedule</span>
          Next auto-debit: Nov 05, 2026
        </div>
</div>
</div>
{/* 3. Existing Loans Portfolio Cards */}
<div className="p-space-xl bg-surface-container-lowest rounded-lg shadow-sm space-y-space-lg">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
<div>
<h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Active Loan Facilities</h2>
<p className="font-body-md text-body-md text-text-secondary">Detailed portfolio tracking with real-time NACH auto-debit monitoring</p>
</div>
<div className="flex items-center gap-2">
<span className="font-caption text-caption text-text-secondary">Debt-to-Income (DTI):</span>
<span className="px-2.5 py-1 rounded-full bg-emerald-50 text-income-positive font-label-sm text-label-sm font-semibold">21.5% • Safe Zone</span>
</div>
</div>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">
{/* Loan Card 1: HDFC Personal Loan */}
<div className="p-space-xl rounded-lg bg-lavender-subtle shadow-sm flex flex-col justify-between space-y-space-md hover:bg-surface-container/40 transition-colors">
<div className="flex items-start justify-between">
<div className="flex items-center gap-space-sm">
<div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm font-bold">
                H
              </div>
<div>
<div className="flex items-center gap-2">
<h3 className="font-headline-sm text-headline-sm text-on-surface">HDFC Bank Personal Loan</h3>
<span className="px-2 py-0.5 rounded-full bg-purple-100 text-primary font-label-sm text-label-sm">Personal Loan</span>
</div>
<p className="font-caption text-caption text-text-secondary">Mandate: NACH Active • Account ending in **4012</p>
</div>
</div>
<div className="text-right">
<span className="font-metric-md text-metric-md text-on-surface">₹4,500</span>
<span className="font-caption text-caption text-text-secondary block">/ month</span>
</div>
</div>
{/* Metrics Row */}
<div className="grid grid-cols-3 gap-space-sm py-2">
<div>
<span className="font-caption text-caption text-text-secondary block">Outstanding</span>
<span className="font-headline-sm text-headline-sm text-on-surface">₹48,200</span>
<span className="font-caption text-caption text-text-secondary block text-[10px]">Orig: ₹1,50,000</span>
</div>
<div>
<span className="font-caption text-caption text-text-secondary block">Interest Rate</span>
<span className="font-headline-sm text-headline-sm text-expense-negative">13.5% p.a.</span>
<span className="font-caption text-caption text-text-secondary block text-[10px]">Reducing Balance</span>
</div>
<div>
<span className="font-caption text-caption text-text-secondary block">Tenure Left</span>
<span className="font-headline-sm text-headline-sm text-on-surface">12 Months</span>
<span className="font-caption text-caption text-text-secondary block text-[10px]">24 of 36 paid</span>
</div>
</div>
{/* Progress Bar */}
<div className="space-y-1">
<div className="flex justify-between font-label-sm text-label-sm text-text-secondary">
<span>Amortization Progress: 68% Repaid</span>
<span className="text-on-surface font-semibold">₹1,01,800 Cleared</span>
</div>
<div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
<div className="h-full bg-primary rounded-full" style={{"width":"68%"}}></div>
</div>
</div>
{/* Footer & Actions */}
<div className="flex items-center justify-between pt-2">
<span className="font-caption text-caption text-text-secondary flex items-center gap-1">
<span className="material-symbols-outlined text-[14px] text-income-positive">verified</span>
              Due: Nov 05, 2026
            </span>
<div className="flex items-center gap-2">
<button className="px-3 py-1.5 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm shadow-sm hover:opacity-90 transition-opacity cursor-pointer" onclick="openPrepayModal('HDFC Bank Personal Loan', 48200, 13.5)">
                Prepay
              </button>
<button className="px-3 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface font-label-sm text-label-sm shadow-sm hover:bg-surface-container transition-colors cursor-pointer">
                View Schedule
              </button>
</div>
</div>
</div>
{/* Loan Card 2: SBI Scholar Loan */}
<div className="p-space-xl rounded-lg bg-lavender-subtle shadow-sm flex flex-col justify-between space-y-space-md hover:bg-surface-container/40 transition-colors">
<div className="flex items-start justify-between">
<div className="flex items-center gap-space-sm">
<div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm font-bold">
                S
              </div>
<div>
<div className="flex items-center gap-2">
<h3 className="font-headline-sm text-headline-sm text-on-surface">SBI Scholar Education Loan</h3>
<span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-label-sm text-label-sm">Education Loan</span>
</div>
<p className="font-caption text-caption text-text-secondary">Mandate: Standing Instruction • Account ending in **8921</p>
</div>
</div>
<div className="text-right">
<span className="font-metric-md text-metric-md text-on-surface">₹6,700</span>
<span className="font-caption text-caption text-text-secondary block">/ month</span>
</div>
</div>
{/* Metrics Row */}
<div className="grid grid-cols-3 gap-space-sm py-2">
<div>
<span className="font-caption text-caption text-text-secondary block">Outstanding</span>
<span className="font-headline-sm text-headline-sm text-on-surface">₹3,36,300</span>
<span className="font-caption text-caption text-text-secondary block text-[10px]">Orig: ₹4,00,000</span>
</div>
<div>
<span className="font-caption text-caption text-text-secondary block">Interest Rate</span>
<span className="font-headline-sm text-headline-sm text-income-positive">8.65% p.a.</span>
<span className="font-caption text-caption text-text-secondary block text-[10px]">Secured Concessional</span>
</div>
<div>
<span className="font-caption text-caption text-text-secondary block">Tenure Left</span>
<span className="font-headline-sm text-headline-sm text-on-surface">62 Months</span>
<span className="font-caption text-caption text-text-secondary block text-[10px]">10 of 72 paid</span>
</div>
</div>
{/* Progress Bar */}
<div className="space-y-1">
<div className="flex justify-between font-label-sm text-label-sm text-text-secondary">
<span>Amortization Progress: 16% Repaid</span>
<span className="text-on-surface font-semibold">₹63,700 Cleared</span>
</div>
<div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
<div className="h-full bg-primary rounded-full" style={{"width":"16%"}}></div>
</div>
</div>
{/* Footer & Actions */}
<div className="flex items-center justify-between pt-2">
<span className="font-caption text-caption text-text-secondary flex items-center gap-1">
<span className="material-symbols-outlined text-[14px] text-income-positive">verified</span>
              Due: Nov 10, 2026
            </span>
<div className="flex items-center gap-2">
<button className="px-3 py-1.5 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm shadow-sm hover:opacity-90 transition-opacity cursor-pointer" onclick="openPrepayModal('SBI Scholar Education Loan', 336300, 8.65)">
                Prepay
              </button>
<button className="px-3 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface font-label-sm text-label-sm shadow-sm hover:bg-surface-container transition-colors cursor-pointer">
                View Schedule
              </button>
</div>
</div>
</div>
</div>
{/* Add Loan Prompt Footer */}
<div className="p-space-md rounded-lg bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-sm">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-primary text-[22px]">info</span>
<span className="font-body-md text-body-md text-on-surface">Have a vehicle loan, consumer durable EMI, or credit card EMI? Add it for holistic debt management.</span>
</div>
<button className="px-4 py-2 rounded-lg bg-surface-container-lowest text-primary font-label-md text-label-md shadow-sm hover:bg-surface-container transition-colors cursor-pointer whitespace-nowrap" id="addLoanSecondaryBtn">
          + Connect Another Facility
        </button>
</div>
</div>
{/* 4. Interactive Reducing-Balance EMI Calculator */}
<div className="p-space-xl bg-surface-container-lowest rounded-lg shadow-sm space-y-space-lg">
<div className="space-y-1">
<div className="inline-flex items-center gap-1.5 text-primary font-label-sm text-label-sm uppercase tracking-wider">
<span className="material-symbols-outlined text-[16px]">calculate</span>
          Actuarial Model
        </div>
<h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Deterministic EMI Calculator</h2>
<p className="font-body-md text-body-md text-text-secondary max-w-4xl">
          Calculated using standard Reducing Balance Formula: <span className="font-mono text-primary font-semibold">E = P × r × (1+r)ⁿ / ((1+r)ⁿ - 1)</span>. 
          Reducing balance computes interest solely on the unamortized balance, unlike flat-rate borrowing which inflates your true APR.
        </p>
</div>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
{/* Sliders & Inputs (7 Columns) */}
<div className="lg:col-span-7 space-y-space-lg">
{/* Loan Amount */}
<div className="space-y-space-xs">
<div className="flex items-center justify-between">
<label className="font-label-md text-label-md text-on-surface" htmlFor="calcAmountInput">Loan Amount (Principal)</label>
<div className="relative w-44">
<span className="absolute left-3 top-1/2 -translate-y-1/2 font-headline-sm text-headline-sm text-primary">₹</span>
<input className="w-full h-10 pl-8 pr-3 rounded-lg bg-surface-container-low font-headline-sm text-headline-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20" id="calcAmountInput" max="5000000" min="50000" step="10000" type="number" defaultValue="500000"/>
</div>
</div>
<input className="w-full accent-primary h-2 bg-surface-container rounded-lg cursor-pointer" id="calcAmountSlider" max="5000000" min="50000" step="10000" type="range" defaultValue="500000"/>
<div className="flex justify-between font-caption text-caption text-text-secondary">
<span>₹50,000</span>
<span>₹25,00,000</span>
<span>₹50,00,000</span>
</div>
</div>
{/* Interest Rate */}
<div className="space-y-space-xs">
<div className="flex items-center justify-between">
<label className="font-label-md text-label-md text-on-surface" htmlFor="calcRateInput">Annual Interest Rate (Reducing)</label>
<div className="relative w-44">
<input className="w-full h-10 pl-3 pr-8 rounded-lg bg-surface-container-low font-headline-sm text-headline-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20" id="calcRateInput" max="30" min="5" step="0.1" type="number" defaultValue="10.5"/>
<span className="absolute right-3 top-1/2 -translate-y-1/2 font-headline-sm text-headline-sm text-text-secondary">%</span>
</div>
</div>
<input className="w-full accent-primary h-2 bg-surface-container rounded-lg cursor-pointer" id="calcRateSlider" max="30" min="5" step="0.1" type="range" defaultValue="10.5"/>
<div className="flex justify-between font-caption text-caption text-text-secondary">
<span>5.0%</span>
<span>17.5%</span>
<span>30.0%</span>
</div>
</div>
{/* Tenure */}
<div className="space-y-space-xs">
<div className="flex items-center justify-between">
<label className="font-label-md text-label-md text-on-surface" htmlFor="calcTenureInput">Loan Tenure</label>
<div className="flex items-center gap-2">
<div className="relative w-28">
<input className="w-full h-10 px-3 rounded-lg bg-surface-container-low font-headline-sm text-headline-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 text-right" id="calcTenureInput" max="120" min="6" step="1" type="number" defaultValue="36"/>
</div>
<div className="flex rounded-lg bg-surface-container p-1 font-label-sm text-label-sm">
<button className="px-2.5 py-1 rounded bg-surface-container-lowest text-primary font-semibold shadow-sm" id="tenureMonthsBtn">Mo</button>
<button className="px-2.5 py-1 rounded text-text-secondary hover:text-on-surface" id="tenureYearsBtn">Yr</button>
</div>
</div>
</div>
<input className="w-full accent-primary h-2 bg-surface-container rounded-lg cursor-pointer" id="calcTenureSlider" max="120" min="6" step="1" type="range" defaultValue="36"/>
<div className="flex justify-between font-caption text-caption text-text-secondary">
<span>6 Months</span>
<span>60 Months (5 Yrs)</span>
<span>120 Months (10 Yrs)</span>
</div>
</div>
</div>
{/* Output Panel (5 Columns) */}
<div className="lg:col-span-5 p-space-xl rounded-lg bg-lavender-subtle shadow-sm flex flex-col justify-between space-y-space-md">
<div className="space-y-space-sm">
<span className="font-label-sm text-label-sm text-text-secondary uppercase">Deterministic Calculation</span>
<div className="pt-1">
<span className="font-caption text-caption text-text-secondary block">Monthly Repayment (EMI)</span>
<span className="font-metric-xl text-metric-xl text-primary font-bold" id="calcMonthlyEMI">₹16,254</span>
</div>
<div className="grid grid-cols-2 gap-space-sm pt-2">
<div className="p-space-sm rounded-lg bg-surface-container-lowest shadow-sm">
<span className="font-caption text-caption text-text-secondary block">Total Interest</span>
<span className="font-headline-md text-headline-md text-on-surface" id="calcTotalInterest">₹85,144</span>
</div>
<div className="p-space-sm rounded-lg bg-surface-container-lowest shadow-sm">
<span className="font-caption text-caption text-text-secondary block">Total Repayment</span>
<span className="font-headline-md text-headline-md text-on-surface" id="calcTotalRepay">₹5,85,144</span>
</div>
</div>
{/* Principal vs Interest Breakdown Bar */}
<div className="space-y-1.5 pt-2">
<div className="flex justify-between font-label-sm text-label-sm">
<span className="flex items-center gap-1.5 text-primary">
<span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                  Principal: <strong id="calcPrincipalPct">85.5%</strong>
</span>
<span className="flex items-center gap-1.5 text-tertiary-container">
<span className="w-2.5 h-2.5 rounded-full bg-tertiary-container"></span>
                  Interest: <strong id="calcInterestPct">14.5%</strong>
</span>
</div>
<div className="w-full h-3 rounded-full bg-surface-container overflow-hidden flex">
<div className="h-full bg-primary" id="calcPrincipalBar" style={{"width":"85.5%"}}></div>
<div className="h-full bg-tertiary-container" id="calcInterestBar" style={{"width":"14.5%"}}></div>
</div>
</div>
</div>
<button className="w-full py-2.5 rounded-lg bg-surface-container-lowest text-primary font-label-md text-label-md shadow-sm hover:bg-surface-container transition-colors flex items-center justify-center gap-1.5 cursor-pointer" id="toggleScheduleBtn">
<span className="material-symbols-outlined text-[18px]">table_chart</span>
<span>View 6-Month Amortization Preview</span>
</button>
</div>
</div>
{/* Amortisation Schedule Table Preview (Collapsible) */}
<div className="space-y-space-sm pt-space-sm" id="schedulePreviewDrawer">
<div className="flex items-center justify-between">
<h3 className="font-headline-sm text-headline-sm text-on-surface">Early Amortization Curve (Months 1–6 Breakdown)</h3>
<span className="font-caption text-caption text-text-secondary">Shows standard front-loaded interest amortization</span>
</div>
<div className="overflow-x-auto rounded-lg bg-surface-container-low shadow-sm">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container font-label-sm text-label-sm text-text-secondary">
<th className="py-2.5 px-4">Month</th>
<th className="py-2.5 px-4">Opening Balance</th>
<th className="py-2.5 px-4">EMI Installment</th>
<th className="py-2.5 px-4">Principal Component</th>
<th className="py-2.5 px-4">Interest Component</th>
<th className="py-2.5 px-4 text-right">Closing Balance</th>
</tr>
</thead>
<tbody className="font-body-md text-body-md text-on-surface" id="scheduleTableBody">
{/* Dynamically populated or static standard snippet */}
<tr className="hover:bg-surface-container/60 transition-colors">
<td className="py-2.5 px-4 font-semibold">Month 1</td>
<td className="py-2.5 px-4">₹5,00,000</td>
<td className="py-2.5 px-4 font-semibold text-primary">₹16,254</td>
<td className="py-2.5 px-4 text-income-positive">₹11,879</td>
<td className="py-2.5 px-4 text-expense-negative">₹4,375</td>
<td className="py-2.5 px-4 text-right">₹4,88,121</td>
</tr>
<tr className="hover:bg-surface-container/60 transition-colors">
<td className="py-2.5 px-4 font-semibold">Month 2</td>
<td className="py-2.5 px-4">₹4,88,121</td>
<td className="py-2.5 px-4 font-semibold text-primary">₹16,254</td>
<td className="py-2.5 px-4 text-income-positive">₹11,983</td>
<td className="py-2.5 px-4 text-expense-negative">₹4,271</td>
<td className="py-2.5 px-4 text-right">₹4,76,138</td>
</tr>
<tr className="hover:bg-surface-container/60 transition-colors">
<td className="py-2.5 px-4 font-semibold">Month 3</td>
<td className="py-2.5 px-4">₹4,76,138</td>
<td className="py-2.5 px-4 font-semibold text-primary">₹16,254</td>
<td className="py-2.5 px-4 text-income-positive">₹12,088</td>
<td className="py-2.5 px-4 text-expense-negative">₹4,166</td>
<td className="py-2.5 px-4 text-right">₹4,64,050</td>
</tr>
<tr className="hover:bg-surface-container/60 transition-colors">
<td className="py-2.5 px-4 font-semibold">Month 4</td>
<td className="py-2.5 px-4">₹4,64,050</td>
<td className="py-2.5 px-4 font-semibold text-primary">₹16,254</td>
<td className="py-2.5 px-4 text-income-positive">₹12,194</td>
<td className="py-2.5 px-4 text-expense-negative">₹4,060</td>
<td className="py-2.5 px-4 text-right">₹4,51,856</td>
</tr>
<tr className="hover:bg-surface-container/60 transition-colors">
<td className="py-2.5 px-4 font-semibold">Month 5</td>
<td className="py-2.5 px-4">₹4,51,856</td>
<td className="py-2.5 px-4 font-semibold text-primary">₹16,254</td>
<td className="py-2.5 px-4 text-income-positive">₹12,301</td>
<td className="py-2.5 px-4 text-expense-negative">₹3,953</td>
<td className="py-2.5 px-4 text-right">₹4,39,555</td>
</tr>
<tr className="hover:bg-surface-container/60 transition-colors">
<td className="py-2.5 px-4 font-semibold">Month 6</td>
<td className="py-2.5 px-4">₹4,39,555</td>
<td className="py-2.5 px-4 font-semibold text-primary">₹16,254</td>
<td className="py-2.5 px-4 text-income-positive">₹12,408</td>
<td className="py-2.5 px-4 text-expense-negative">₹3,846</td>
<td className="py-2.5 px-4 text-right">₹4,27,147</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
{/* 5. Early Repayment & Prepayment Simulator */}
<div className="p-space-xl bg-surface-container-lowest rounded-lg shadow-sm space-y-space-lg">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
<div>
<div className="inline-flex items-center gap-1.5 text-primary font-label-sm text-label-sm uppercase tracking-wider">
<span className="material-symbols-outlined text-[16px]">speed</span>
            Accelerated Payoff Engine
          </div>
<h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Early Repayment Simulator (“Cut Your Debt Timeline”)</h2>
<p className="font-body-md text-body-md text-text-secondary">Simulate the direct actuarial savings of one-time bullet payments or recurring EMI top-ups</p>
</div>
<div className="p-2 px-3 rounded-lg bg-surface-container-low text-on-surface-variant font-caption text-caption flex items-center gap-2">
<span className="material-symbols-outlined text-income-positive text-[18px]">verified</span>
          RBI Mandate: Zero prepayment penalty on individual floating loans
        </div>
</div>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
{/* Simulator Controls (6 Cols) */}
<div className="lg:col-span-6 space-y-space-md">
{/* Select Target Loan */}
<div className="space-y-1.5">
<label className="font-label-md text-label-md text-on-surface" htmlFor="simTargetLoan">Target Debt Facility</label>
<select className="w-full h-11 px-3 rounded-lg bg-surface-container-low font-headline-sm text-headline-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20" id="simTargetLoan">
<option selected="" value="hdfc">HDFC Personal Loan (₹48,200 balance @ 13.5% APR)</option>
<option value="sbi">SBI Scholar Education Loan (₹3,36,300 balance @ 8.65% APR)</option>
</select>
</div>
{/* Strategy Toggle */}
<div className="space-y-1.5">
<label className="font-label-md text-label-md text-on-surface">Prepayment Structure</label>
<div className="grid grid-cols-2 p-1 rounded-lg bg-surface-container">
<button className="py-2 rounded bg-surface-container-lowest text-primary font-label-md text-label-md font-semibold shadow-sm text-center" id="simTypeLumpSum">
                One-Time Lump Sum
              </button>
<button className="py-2 rounded text-text-secondary font-label-md text-label-md hover:text-on-surface text-center" id="simTypeMonthly">
                Monthly Extra Top-Up
              </button>
</div>
</div>
{/* Amount Input with Quick Chips */}
<div className="space-y-1.5">
<label className="font-label-md text-label-md text-on-surface flex justify-between" htmlFor="simAmountInput">
<span id="simAmountLabel">One-Time Prepayment Amount</span>
<span className="text-text-secondary font-caption text-caption">Available checking buffer: ₹5,000</span>
</label>
<div className="relative">
<span className="absolute left-3 top-1/2 -translate-y-1/2 font-headline-sm text-headline-sm text-primary">₹</span>
<input className="w-full h-11 pl-8 pr-4 rounded-lg bg-surface-container-low font-headline-sm text-headline-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20" id="simAmountInput" max="200000" min="1000" step="1000" type="number" defaultValue="25000"/>
</div>
<div className="flex items-center gap-2 pt-1" id="simChipsContainer">
<button className="px-3 py-1 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface hover:bg-surface-container-high chip-btn cursor-pointer" data-val="10000">+₹10,000</button>
<button className="px-3 py-1 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface hover:bg-surface-container-high chip-btn cursor-pointer" data-val="25000">+₹25,000</button>
<button className="px-3 py-1 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface hover:bg-surface-container-high chip-btn cursor-pointer" data-val="50000">+₹50,000</button>
</div>
</div>
{/* Goal Preference Toggle */}
<div className="space-y-1.5">
<label className="font-label-md text-label-md text-on-surface">Optimization Objective</label>
<div className="grid grid-cols-2 p-1 rounded-lg bg-surface-container">
<button className="py-2 rounded bg-surface-container-lowest text-primary font-label-md text-label-md font-semibold shadow-sm text-center" id="simGoalTenure">
                Reduce Tenure (Keep EMI)
              </button>
<button className="py-2 rounded text-text-secondary font-label-md text-label-md hover:text-on-surface text-center" id="simGoalEmi">
                Reduce Monthly EMI
              </button>
</div>
</div>
</div>
{/* Outcome Cards (6 Cols) */}
<div className="lg:col-span-6 flex flex-col justify-between space-y-space-md">
<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
{/* Current Trajectory */}
<div className="p-space-lg rounded-lg bg-surface-container-low shadow-sm space-y-2">
<span className="font-label-sm text-label-sm text-text-secondary uppercase">Current Trajectory</span>
<div className="font-headline-lg text-headline-lg text-on-surface">12 Months</div>
<div className="text-caption font-caption text-text-secondary">
                Remaining Interest: <strong className="text-on-surface">₹3,840</strong><br/>
                EMI: ₹4,500/month
              </div>
<span className="inline-block px-2 py-0.5 rounded bg-surface-container text-text-secondary font-label-sm text-label-sm">Standard Schedule</span>
</div>
{/* Revised Trajectory */}
<div className="p-space-lg rounded-lg bg-surface-container shadow-sm space-y-2">
<span className="font-label-sm text-label-sm text-primary uppercase font-bold">Revised Trajectory</span>
<div className="font-headline-lg text-headline-lg text-primary" id="simRevisedTenure">6 Months</div>
<div className="text-caption font-caption text-text-secondary">
                Remaining Interest: <strong className="text-income-positive" id="simRevisedInterest">₹1,610</strong><br/>
                Timeline Saved: <strong className="text-income-positive" id="simSavedMonths">6 Months earlier</strong>
</div>
<span className="inline-block px-2 py-0.5 rounded bg-purple-100 text-primary font-label-sm text-label-sm font-semibold">50% Faster Payoff</span>
</div>
</div>
{/* Impact Banner */}
<div className="p-space-lg rounded-lg bg-lavender-subtle shadow-sm flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<div className="w-10 h-10 rounded-full bg-emerald-100 text-income-positive flex items-center justify-center">
<span className="material-symbols-outlined text-[22px]">savings</span>
</div>
<div>
<span className="font-caption text-caption text-text-secondary uppercase block">Net Pure Interest Saved</span>
<span className="font-metric-xl text-metric-xl text-income-positive font-bold" id="simNetSaved">₹2,230</span>
</div>
</div>
<button className="px-4 py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md shadow-sm hover:opacity-90 transition-opacity cursor-pointer" id="applyPrepayStrategyBtn">
              Set Prepayment Goal
            </button>
</div>
<p className="font-caption text-caption text-text-secondary">
            Note: Calculations assume immediate application of principal reduction on next billing cycle. Educational loans eligible for Sec 80E tax deductions require post-tax equivalence consideration.
          </p>
</div>
</div>
</div>
{/* 6. Side-by-Side Loan Offer Comparison Tool */}
<div className="p-space-xl bg-surface-container-lowest rounded-lg shadow-sm space-y-space-lg">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
<div>
<div className="inline-flex items-center gap-1.5 text-primary font-label-sm text-label-sm uppercase tracking-wider">
<span className="material-symbols-outlined text-[16px]">compare_arrows</span>
            Refinancing &amp; New Offers
          </div>
<h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Side-by-Side Loan Offer Comparison</h2>
<p className="font-body-md text-body-md text-text-secondary">Compare current liabilities against pre-approved balance transfer refinancing options</p>
</div>
<button className="px-3 py-1.5 rounded-lg bg-surface-container text-primary font-label-sm text-label-sm hover:bg-surface-container-high transition-colors cursor-pointer" id="requestQuotesBtn">
          Refresh Credit Offers
        </button>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
{/* Option 1: Current Loan */}
<div className="p-space-lg rounded-lg bg-surface-container-low shadow-sm flex flex-col justify-between space-y-space-md">
<div className="space-y-space-xs">
<div className="flex items-center justify-between">
<span className="px-2 py-0.5 rounded-full bg-surface-container text-text-secondary font-label-sm text-label-sm">Current Active Loan</span>
<span className="font-caption text-caption text-text-secondary">Existing Facility</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">HDFC Personal Loan</h3>
<div className="font-metric-xl text-metric-xl text-on-surface pt-1">₹4,500 <span className="font-body-md text-body-md text-text-secondary font-normal">/ mo</span></div>
</div>
<div className="space-y-2 py-space-sm font-body-md text-body-md text-on-surface">
<div className="flex justify-between">
<span className="text-text-secondary">Principal:</span>
<span className="font-semibold">₹1,50,000</span>
</div>
<div className="flex justify-between">
<span className="text-text-secondary">Interest Rate:</span>
<span className="font-semibold text-expense-negative">13.5% Reducing</span>
</div>
<div className="flex justify-between">
<span className="text-text-secondary">Tenure:</span>
<span className="font-semibold">36 Months</span>
</div>
<div className="flex justify-between">
<span className="text-text-secondary">Total Interest:</span>
<span className="font-semibold">₹23,108</span>
</div>
<div className="flex justify-between">
<span className="text-text-secondary">Processing Fee:</span>
<span className="font-semibold">₹1,500</span>
</div>
</div>
<div className="pt-2 border-t-0 space-y-2">
<div className="flex justify-between items-baseline">
<span className="font-label-sm text-label-sm text-text-secondary uppercase">Total Outflow Cost:</span>
<span className="font-headline-md text-headline-md text-on-surface">₹1,74,608</span>
</div>
<button className="w-full py-2 rounded-lg bg-surface-container text-text-secondary font-label-sm text-label-sm cursor-not-allowed" disabled="">
              Current Obligation
            </button>
</div>
</div>
{/* Option 2: Axis Balance Transfer (Best Value) */}
<div className="p-space-lg rounded-lg bg-lavender-subtle shadow-md flex flex-col justify-between space-y-space-md relative overflow-hidden">
<div className="absolute top-0 right-0 bg-primary text-on-primary text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-bl-lg shadow-sm">
            Lowest Total Cost
          </div>
<div className="space-y-space-xs pt-1">
<div className="flex items-center justify-between">
<span className="px-2 py-0.5 rounded-full bg-purple-100 text-primary font-label-sm text-label-sm font-semibold">Recommended Transfer</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Axis Pre-Approved Transfer</h3>
<div className="font-metric-xl text-metric-xl text-primary pt-1">₹4,332 <span className="font-body-md text-body-md text-text-secondary font-normal">/ mo</span></div>
</div>
<div className="space-y-2 py-space-sm font-body-md text-body-md text-on-surface">
<div className="flex justify-between">
<span className="text-text-secondary">Principal:</span>
<span className="font-semibold">₹1,50,000</span>
</div>
<div className="flex justify-between">
<span className="text-text-secondary">Interest Rate:</span>
<span className="font-semibold text-income-positive">11.25% Reducing</span>
</div>
<div className="flex justify-between">
<span className="text-text-secondary">Tenure:</span>
<span className="font-semibold">36 Months</span>
</div>
<div className="flex justify-between">
<span className="text-text-secondary">Total Interest:</span>
<span className="font-semibold">₹19,152</span>
</div>
<div className="flex justify-between">
<span className="text-text-secondary">Processing Fee:</span>
<span className="font-semibold">₹999</span>
</div>
</div>
<div className="pt-2 space-y-2">
<div className="flex justify-between items-baseline">
<span className="font-label-sm text-label-sm text-text-secondary uppercase">Total Outflow Cost:</span>
<span className="font-headline-md text-headline-md text-income-positive font-bold">₹1,70,151</span>
</div>
<div className="text-center font-caption text-caption text-income-positive font-semibold">
              Net Savings: ₹4,457 (after ₹999 fee)
            </div>
<button className="w-full py-2.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md shadow-sm hover:opacity-90 transition-opacity cursor-pointer">
              Explore Balance Transfer
            </button>
</div>
</div>
{/* Option 3: ICICI InstaLoan */}
<div className="p-space-lg rounded-lg bg-surface-container-low shadow-sm flex flex-col justify-between space-y-space-md">
<div className="space-y-space-xs">
<div className="flex items-center justify-between">
<span className="px-2 py-0.5 rounded-full bg-surface-container text-text-secondary font-label-sm text-label-sm">Special Pre-Approved</span>
<span className="font-caption text-caption text-text-secondary">Instant Disbursal</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">ICICI InstaLoan Offer</h3>
<div className="font-metric-xl text-metric-xl text-on-surface pt-1">₹4,386 <span className="font-body-md text-body-md text-text-secondary font-normal">/ mo</span></div>
</div>
<div className="space-y-2 py-space-sm font-body-md text-body-md text-on-surface">
<div className="flex justify-between">
<span className="text-text-secondary">Principal:</span>
<span className="font-semibold">₹1,50,000</span>
</div>
<div className="flex justify-between">
<span className="text-text-secondary">Interest Rate:</span>
<span className="font-semibold">12.0% Reducing</span>
</div>
<div className="flex justify-between">
<span className="text-text-secondary">Tenure:</span>
<span className="font-semibold">36 Months</span>
</div>
<div className="flex justify-between">
<span className="text-text-secondary">Total Interest:</span>
<span className="font-semibold">₹20,496</span>
</div>
<div className="flex justify-between">
<span className="text-text-secondary">Processing Fee:</span>
<span className="font-semibold">₹1,250</span>
</div>
</div>
<div className="pt-2 space-y-2">
<div className="flex justify-between items-baseline">
<span className="font-label-sm text-label-sm text-text-secondary uppercase">Total Outflow Cost:</span>
<span className="font-headline-md text-headline-md text-on-surface">₹1,71,746</span>
</div>
<div className="text-center font-caption text-caption text-income-positive">
              Net Savings: ₹2,862 vs HDFC
            </div>
<button className="w-full py-2 rounded-lg bg-surface-container-lowest text-primary font-label-md text-label-md shadow-sm hover:bg-surface-container transition-colors cursor-pointer">
              View Offer Details
            </button>
</div>
</div>
</div>
<div className="p-space-md rounded-lg bg-lavender-subtle text-caption font-caption text-text-secondary flex items-start gap-2">
<span className="material-symbols-outlined text-primary text-[18px] shrink-0">lightbulb</span>
<span>
<strong>Fintech Guidance:</strong> Ranking based strictly on Net Outflow (Principal + Total Compounded Reducing Interest + Processing Fees &amp; GST). A marginally lower interest rate can be eroded by exorbitant documentation or administrative charges.
        </span>
</div>
</div>
{/* 7. Strategic Debt Payoff Optimizer (Avalanche vs Snowball) */}
<div className="p-space-xl bg-surface-container-lowest rounded-lg shadow-sm space-y-space-lg">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
<div>
<div className="inline-flex items-center gap-1.5 text-primary font-label-sm text-label-sm uppercase tracking-wider">
<span className="material-symbols-outlined text-[16px]">psychology</span>
            Behavioral vs Actuarial Science
          </div>
<h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Strategic Debt Payoff Optimizer</h2>
<p className="font-body-md text-body-md text-text-secondary">Choose between maximum rupee interest reduction or rapid psychological momentum</p>
</div>
<div className="text-right">
<span className="font-caption text-caption text-text-secondary">Simulated Extra Monthly Allocation:</span>
<span className="font-headline-sm text-headline-sm text-primary block">+₹2,000 / month</span>
</div>
</div>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">
{/* Card A: Avalanche */}
<div className="p-space-xl rounded-lg bg-lavender-subtle shadow-sm flex flex-col justify-between space-y-space-md">
<div className="space-y-space-xs">
<div className="flex items-center justify-between">
<span className="px-2.5 py-1 rounded-full bg-purple-100 text-primary font-label-sm text-label-sm font-semibold">Mathematically Optimal</span>
<span className="font-caption text-caption text-income-positive font-semibold">Saves ₹8,600 Interest</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface">Debt Avalanche Method</h3>
<p className="font-body-md text-body-md text-text-secondary">
              Directs all extra surplus (+₹2,000/mo) strictly to the highest interest rate loan (13.5% APR) while keeping minimum mandatory payments on lower rate loans.
            </p>
</div>
<div className="p-space-md rounded-lg bg-surface-container-lowest space-y-2">
<div className="flex items-center justify-between">
<span className="font-caption text-caption text-text-secondary">Payoff Priority 1:</span>
<span className="font-label-md text-label-md text-expense-negative font-semibold">HDFC Personal Loan (13.5%)</span>
</div>
<div className="flex items-center justify-between">
<span className="font-caption text-caption text-text-secondary">Payoff Priority 2:</span>
<span className="font-label-md text-label-md text-on-surface font-semibold">SBI Education Loan (8.65%)</span>
</div>
<div className="flex items-center justify-between pt-1">
<span className="font-caption text-caption text-text-secondary">Total Projected Interest:</span>
<span className="font-headline-sm text-headline-sm text-income-positive">₹69,820</span>
</div>
<div className="flex items-center justify-between">
<span className="font-caption text-caption text-text-secondary">Debt-Free Date:</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-bold">February 2030</span>
</div>
</div>
<button className="w-full py-2.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md shadow-sm hover:opacity-90 transition-opacity cursor-pointer">
            Apply Avalanche to Monthly Budget
          </button>
</div>
{/* Card B: Snowball */}
<div className="p-space-xl rounded-lg bg-surface-container-low shadow-sm flex flex-col justify-between space-y-space-md">
<div className="space-y-space-xs">
<div className="flex items-center justify-between">
<span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 font-label-sm text-label-sm font-semibold">Psychological Momentum</span>
<span className="font-caption text-caption text-text-secondary">First Victory in 5 Mo</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface">Debt Snowball Method</h3>
<p className="font-body-md text-body-md text-text-secondary">
              Clears the loan with the lowest absolute rupee balance first (₹48,200), granting quick emotional validation and freeing up an entire monthly obligation fast.
            </p>
</div>
<div className="p-space-md rounded-lg bg-surface-container-lowest space-y-2">
<div className="flex items-center justify-between">
<span className="font-caption text-caption text-text-secondary">Payoff Priority 1:</span>
<span className="font-label-md text-label-md text-primary font-semibold">HDFC Personal (₹48.2k Balance)</span>
</div>
<div className="flex items-center justify-between">
<span className="font-caption text-caption text-text-secondary">Payoff Priority 2:</span>
<span className="font-label-md text-label-md text-on-surface font-semibold">SBI Education (₹3.36L Balance)</span>
</div>
<div className="flex items-center justify-between pt-1">
<span className="font-caption text-caption text-text-secondary">Total Projected Interest:</span>
<span className="font-headline-sm text-headline-sm text-on-surface">₹72,450</span>
</div>
<div className="flex items-center justify-between">
<span className="font-caption text-caption text-text-secondary">Debt-Free Date:</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-bold">April 2030</span>
</div>
</div>
<button className="w-full py-2.5 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md shadow-sm hover:bg-surface-container transition-colors cursor-pointer">
            Apply Snowball to Monthly Budget
          </button>
</div>
</div>
</div>
{/* 8. AI Loan Intelligence & Debt Guardrails */}
<div className="p-space-xl bg-surface-container-lowest rounded-lg shadow-sm space-y-space-lg">
<div className="space-y-1">
<div className="inline-flex items-center gap-1.5 text-primary font-label-sm text-label-sm uppercase tracking-wider">
<span className="material-symbols-outlined text-[16px]">security</span>
          Deterministic Advisory
        </div>
<h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">AI Debt Guardrails &amp; Cross-Impact Analysis</h2>
<p className="font-body-md text-body-md text-text-secondary">Synthesizing Arjun's debt obligations against Safe-to-Spend cash flow and emergency liquidity</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
{/* Insight 1: High APR Flag */}
<div className="p-space-lg rounded-lg bg-lavender-subtle shadow-sm flex items-start gap-space-md">
<div className="w-9 h-9 rounded-lg bg-purple-100 text-primary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[20px]">warning</span>
</div>
<div className="space-y-1">
<h4 className="font-headline-sm text-headline-sm text-on-surface">High APR Flag — Prioritize HDFC Personal Loan</h4>
<p className="font-body-md text-body-md text-text-secondary">
              At 13.5%, your HDFC facility is your most expensive liability. Allocating an extra ₹1,000/mo eliminates it 3 months ahead of schedule and saves ₹1,850 in avoidable interest.
            </p>
</div>
</div>
{/* Insight 2: DTI Ratio */}
<div className="p-space-lg rounded-lg bg-lavender-subtle shadow-sm flex items-start gap-space-md">
<div className="w-9 h-9 rounded-lg bg-emerald-100 text-income-positive flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[20px]">check_circle</span>
</div>
<div className="space-y-1">
<h4 className="font-headline-sm text-headline-sm text-on-surface">Healthy Debt-to-Income (DTI) — 21.5%</h4>
<p className="font-body-md text-body-md text-text-secondary">
              Your combined monthly EMI burden (₹11,200) consumes 21.5% of confirmed net monthly income (₹52,000). The recommended safe limit is 35%. You have comfortable headroom.
            </p>
</div>
</div>
{/* Insight 3: Safe to Spend Cross Impact */}
<div className="p-space-lg rounded-lg bg-lavender-subtle shadow-sm flex items-start gap-space-md">
<div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[20px]">sync_alt</span>
</div>
<div className="space-y-1">
<h4 className="font-headline-sm text-headline-sm text-on-surface">Safe-to-Spend Cross-Impact</h4>
<p className="font-body-md text-body-md text-text-secondary">
              Adding any proposed new EMI of ≥₹4,000/mo would compress your uncommitted Safe to Spend (currently ₹6,450) and reduce your daily discretionary spending limit by ₹133/day.
            </p>
</div>
</div>
{/* Insight 4: Liquidity Check */}
<div className="p-space-lg rounded-lg bg-lavender-subtle shadow-sm flex items-start gap-space-md">
<div className="w-9 h-9 rounded-lg bg-amber-100 text-warning-alert flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[20px]">shield</span>
</div>
<div className="space-y-1">
<h4 className="font-headline-sm text-headline-sm text-on-surface">Prepayment Liquidity Buffer Protection</h4>
<p className="font-body-md text-body-md text-text-secondary">
              Before executing a lump-sum part-payment, ensure your minimum ₹5,000 emergency checking buffer remains untouched to prevent overdraft or bounced standing instructions.
            </p>
</div>
</div>
</div>
</div>
{/* 9. Methodological & Regulatory Disclaimer Footer */}
<div className="p-space-lg rounded-lg bg-surface-container-low shadow-sm">
<div className="flex items-start gap-space-sm text-caption font-caption text-text-secondary">
<span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">verified_user</span>
<div>
<strong className="text-on-surface">Actuarial &amp; Regulatory Disclaimer:</strong> 
          All EMI projections, amortization schedules, and prepayment simulations are deterministic figures computed using standard mathematical reducing-balance amortization formulas [<span className="font-mono">E = P × r × (1+r)ⁿ / ((1+r)ⁿ - 1)</span>]. 
          No live credit bureau pull, automated loan application, or payment processing is executed directly from this intelligence screen. Designed strictly for self-directed personal financial planning intelligence.
        </div>
</div>
</div>
</div>
{/* Interactive Modal: Prepay Dialog (Accessible via JavaScript) */}
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm hidden" id="prepayModal">
<div className="w-full max-w-lg p-space-xl bg-surface-container-lowest rounded-xl shadow-xl space-y-space-md mx-4">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[18px]">payments</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface" id="modalLoanName">Prepay Facility</h3>
</div>
<button className="text-text-secondary hover:text-on-surface p-1 rounded-lg" onclick="closePrepayModal()">
<span className="material-symbols-outlined">close</span>
</button>
</div>
<div className="p-space-md rounded-lg bg-lavender-subtle space-y-1">
<div className="flex justify-between font-body-md text-body-md">
<span className="text-text-secondary">Current Balance:</span>
<span className="font-semibold text-on-surface" id="modalCurrentBal">₹48,200</span>
</div>
<div className="flex justify-between font-body-md text-body-md">
<span className="text-text-secondary">Current Interest Rate:</span>
<span className="font-semibold text-expense-negative" id="modalCurrentApr">13.5% p.a.</span>
</div>
</div>
<div className="space-y-space-xs">
<label className="font-label-md text-label-md text-on-surface" htmlFor="modalPartPaymentAmount">Part-Payment Amount</label>
<div className="relative">
<span className="absolute left-3 top-1/2 -translate-y-1/2 font-headline-sm text-headline-sm text-primary">₹</span>
<input className="w-full h-11 pl-8 pr-4 rounded-lg bg-surface-container-low font-headline-sm text-headline-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20" id="modalPartPaymentAmount" type="number" defaultValue="15000"/>
</div>
<div className="flex gap-2 pt-1">
<button className="px-2.5 py-1 rounded bg-surface-container font-label-sm text-label-sm text-on-surface hover:bg-surface-container-high" onclick="setModalAmount(5000)">+₹5,000</button>
<button className="px-2.5 py-1 rounded bg-surface-container font-label-sm text-label-sm text-on-surface hover:bg-surface-container-high" onclick="setModalAmount(10000)">+₹10,000</button>
<button className="px-2.5 py-1 rounded bg-surface-container font-label-sm text-label-sm text-on-surface hover:bg-surface-container-high" onclick="setModalAmount(25000)">+₹25,000</button>
</div>
</div>
<div className="p-space-md rounded-lg bg-emerald-50 text-income-positive text-body-md font-body-md flex items-center gap-2">
<span className="material-symbols-outlined text-[20px]">check_circle</span>
<span>Simulated immediate interest savings: <strong>~₹1,340</strong></span>
</div>
<div className="flex items-center justify-end gap-space-sm pt-2">
<button className="px-4 py-2.5 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors" onclick="closePrepayModal()">
          Cancel
        </button>
<button className="px-4 py-2.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md shadow-md hover:opacity-90 transition-opacity" onclick="confirmPrepayment()">
          Log Planned Prepayment
        </button>
</div>
</div>
</div>
</div>


    </>
  );
}
