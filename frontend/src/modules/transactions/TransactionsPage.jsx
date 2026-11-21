import React from 'react';

export default function TransactionsPage() {

  React.useEffect(() => {
    // 1. Drawer Opening & Closing
    const overlay = document.getElementById('add-transaction-overlay');
    const drawer = document.getElementById('add-transaction-drawer');
    const openBtn = document.getElementById('open-drawer-btn');
    const closeBtn = document.getElementById('close-drawer-btn');
    const cancelBtn = document.getElementById('cancel-drawer-btn');
    const backdrop = document.getElementById('drawer-backdrop');

    function openDrawer() {
      if (!overlay || !drawer) return;
      overlay.classList.remove('opacity-0', 'pointer-events-none');
      overlay.classList.add('opacity-100');
      drawer.classList.remove('translate-x-full');
      drawer.classList.add('translate-x-0');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      if (!overlay || !drawer) return;
      overlay.classList.remove('opacity-100');
      overlay.classList.add('opacity-0', 'pointer-events-none');
      drawer.classList.remove('translate-x-0');
      drawer.classList.add('translate-x-full');
      document.body.style.overflow = '';
    }

    if (openBtn) openBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (cancelBtn) cancelBtn.addEventListener('click', closeDrawer);
    if (backdrop) backdrop.addEventListener('click', closeDrawer);

    // 2. Export Dropdown Menu
    const exportToggle = document.getElementById('export-dropdown-toggle');
    const exportMenu = document.getElementById('export-menu');
    const handleExportToggle = (e) => {
      e.stopPropagation();
      exportMenu?.classList.toggle('hidden');
    };
    const handleDocClick = () => {
      if (exportMenu && !exportMenu.classList.contains('hidden')) {
        exportMenu.classList.add('hidden');
      }
    };
    if (exportToggle && exportMenu) {
      exportToggle.addEventListener('click', handleExportToggle);
      document.addEventListener('click', handleDocClick);
    }

    // 3. Type Switcher in Drawer
    const typeExpBtn = document.getElementById('drawer-type-expense');
    const typeIncBtn = document.getElementById('drawer-type-income');
    const handleTypeExp = () => {
      if (typeExpBtn && typeIncBtn) {
        typeExpBtn.className = 'py-2 rounded-lg text-label-md font-label-md font-semibold bg-surface-container-lowest text-expense-negative shadow-xs transition-all flex items-center justify-center gap-1.5';
        typeIncBtn.className = 'py-2 rounded-lg text-label-md font-label-md font-semibold text-text-secondary hover:text-on-surface transition-all flex items-center justify-center gap-1.5';
      }
    };
    const handleTypeInc = () => {
      if (typeExpBtn && typeIncBtn) {
        typeIncBtn.className = 'py-2 rounded-lg text-label-md font-label-md font-semibold bg-surface-container-lowest text-income-positive shadow-xs transition-all flex items-center justify-center gap-1.5';
        typeExpBtn.className = 'py-2 rounded-lg text-label-md font-label-md font-semibold text-text-secondary hover:text-on-surface transition-all flex items-center justify-center gap-1.5';
      }
    };
    if (typeExpBtn) typeExpBtn.addEventListener('click', handleTypeExp);
    if (typeIncBtn) typeIncBtn.addEventListener('click', handleTypeInc);

    // 4. Live Filtering Mechanics
    const searchInput = document.getElementById('table-search');
    const categorySelect = document.getElementById('category-filter');
    const methodSelect = document.getElementById('method-filter');
    const typeButtons = document.querySelectorAll('.filter-type-btn');
    const clearBtn = document.getElementById('clear-filters-btn');
    const resetEmptyBtn = document.getElementById('reset-empty-btn');
    const rows = document.querySelectorAll('.transaction-row');
    const emptyState = document.getElementById('table-empty-state');
    const resultsCount = document.getElementById('results-count');

    let currentTypeFilter = 'all';

    function applyFilters() {
      const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
      const selectedCat = categorySelect ? categorySelect.value : '';
      const selectedMethod = methodSelect ? methodSelect.value : '';

      let visibleCount = 0;
      rows.forEach(row => {
        const type = row.dataset.type;
        const category = row.dataset.category;
        const method = row.dataset.method;
        const text = row.innerText.toLowerCase();

        const matchesType = (currentTypeFilter === 'all') || (type === currentTypeFilter);
        const matchesCat = (!selectedCat) || (category === selectedCat);
        const matchesMethod = (!selectedMethod) || (method === selectedMethod);
        const matchesSearch = (!query) || text.includes(query);

        if (matchesType && matchesCat && matchesMethod && matchesSearch) {
          row.style.display = '';
          visibleCount++;
        } else {
          row.style.display = 'none';
        }
      });

      if (emptyState) {
        if (visibleCount === 0) {
          emptyState.classList.remove('hidden');
          emptyState.classList.add('flex');
        } else {
          emptyState.classList.add('hidden');
          emptyState.classList.remove('flex');
        }
      }

      if (resultsCount) {
        resultsCount.innerText = `Showing ${visibleCount} of 34 transactions`;
      }
    }

    typeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        typeButtons.forEach(b => {
          b.classList.remove('bg-surface-container-lowest', 'text-primary', 'font-semibold', 'shadow-xs');
          b.classList.add('text-text-secondary');
        });
        btn.classList.add('bg-surface-container-lowest', 'text-primary', 'font-semibold', 'shadow-xs');
        btn.classList.remove('text-text-secondary');
        currentTypeFilter = btn.dataset.filter || 'all';
        applyFilters();
      });
    });

    if (searchInput) searchInput.addEventListener('input', applyFilters);
    if (categorySelect) categorySelect.addEventListener('change', applyFilters);
    if (methodSelect) methodSelect.addEventListener('change', applyFilters);

    function resetAllFilters() {
      if (searchInput) searchInput.value = '';
      if (categorySelect) categorySelect.value = '';
      if (methodSelect) methodSelect.value = '';
      currentTypeFilter = 'all';
      typeButtons.forEach(b => {
        if (b.dataset.filter === 'all') {
          b.classList.add('bg-surface-container-lowest', 'text-primary', 'font-semibold', 'shadow-xs');
          b.classList.remove('text-text-secondary');
        } else {
          b.classList.remove('bg-surface-container-lowest', 'text-primary', 'font-semibold', 'shadow-xs');
          b.classList.add('text-text-secondary');
        }
      });
      applyFilters();
    }

    if (clearBtn) clearBtn.addEventListener('click', resetAllFilters);
    if (resetEmptyBtn) resetEmptyBtn.addEventListener('click', resetAllFilters);

    // 5. Save Transaction Feedback
    const saveBtn = document.getElementById('save-transaction-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        saveBtn.innerText = 'Saving...';
        setTimeout(() => {
          saveBtn.innerText = 'Saved!';
          setTimeout(() => {
            saveBtn.innerText = 'Save Transaction';
            closeDrawer();
          }, 600);
        }, 400);
      });
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('click', handleDocClick);
    };
  }, []);

  return (
    <>
<div className="flex flex-col w-full">
{/* Active Route Synchronizer (Ensures Transactions navigation in the persistent shell is highlighted) */}

{/* Page Content Container */}
<div className="px-gutter-desktop py-space-xl max-w-7xl mx-auto w-full space-y-space-xl">
{/* Top Bar: Header & Primary Actions */}
<div className="flex flex-col md:flex-row md:items-center justify-between gap-space-lg">
<div className="flex flex-col gap-0.5">
<div className="flex items-center gap-space-sm">
<h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Transactions</h1>
<span className="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm">
            Live Sync
          </span>
</div>
<p className="font-body-md text-body-md text-text-secondary">Track, reconcile, and categorize your income and expenses across all linked accounts.</p>
</div>
{/* Action Group */}
<div className="flex items-center flex-wrap gap-space-sm">
{/* Import CSV Button */}
<button className="inline-flex items-center gap-space-xs px-3.5 py-2 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-all font-label-md text-label-md shadow-sm border border-border-subtle group" id="import-btn" type="button">
<span className="material-symbols-outlined text-[18px] text-text-secondary group-hover:text-primary transition-colors">upload_file</span>
<span>Import CSV</span>
</button>
{/* Export Report Dropdown Group */}
<div className="relative">
<button className="inline-flex items-center gap-space-xs px-3.5 py-2 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-all font-label-md text-label-md shadow-sm border border-border-subtle group" id="export-dropdown-toggle" type="button">
<span className="material-symbols-outlined text-[18px] text-text-secondary group-hover:text-primary transition-colors">download</span>
<span>Export Report</span>
<span className="material-symbols-outlined text-[16px] text-text-secondary">expand_more</span>
</button>
<div className="hidden absolute right-0 mt-1 w-48 bg-surface-container-lowest rounded-xl shadow-xl border border-border-subtle py-1.5 z-30" id="export-menu">
<button className="w-full text-left px-3 py-2 font-label-md text-label-md text-on-surface hover:bg-surface-container flex items-center gap-2" type="button">
<span className="material-symbols-outlined text-[16px] text-primary">table_view</span>
<span>Export as CSV (.csv)</span>
</button>
<button className="w-full text-left px-3 py-2 font-label-md text-label-md text-on-surface hover:bg-surface-container flex items-center gap-2" type="button">
<span className="material-symbols-outlined text-[16px] text-expense-negative">picture_as_pdf</span>
<span>Download PDF Statement</span>
</button>
<button className="w-full text-left px-3 py-2 font-label-md text-label-md text-on-surface hover:bg-surface-container flex items-center gap-2" type="button">
<span className="material-symbols-outlined text-[16px] text-income-positive">account_balance</span>
<span>Send to CA / Auditor</span>
</button>
</div>
</div>
{/* Add Transaction Trigger (Primary) */}
<button className="inline-flex items-center gap-space-xs px-4 py-2 rounded-lg bg-primary text-on-primary hover:bg-[#7C3AED] active:scale-[0.98] transition-all font-label-md text-label-md shadow-md shadow-primary/20" id="open-drawer-btn" type="button">
<span className="material-symbols-outlined text-[20px]">add</span>
<span>Add Transaction</span>
</button>
</div>
</div>
{/* Financial Summary KPI Bar (4 Compact Cards) */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
{/* Card 1: Income */}
<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-border-subtle hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-text-secondary uppercase tracking-wider">Total Income</span>
<div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
</div>
</div>
<div className="mt-space-md">
<div className="font-metric-xl text-metric-xl text-on-surface tracking-tight font-bold">₹52,000</div>
<div className="mt-2 flex items-center gap-1.5">
<span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#F0FDF4] text-income-positive">
<span className="material-symbols-outlined text-[12px] mr-0.5">trending_up</span>+12%
            </span>
<span className="font-caption text-caption text-text-secondary">vs last month</span>
</div>
</div>
</div>
{/* Card 2: Expenses */}
<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-border-subtle hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-text-secondary uppercase tracking-wider">Total Expenses</span>
<div className="w-8 h-8 rounded-lg bg-[#FEF2F2] flex items-center justify-center text-expense-negative">
<span className="material-symbols-outlined text-[20px]">credit_card</span>
</div>
</div>
<div className="mt-space-md">
<div className="font-metric-xl text-metric-xl text-on-surface tracking-tight font-bold">₹24,850</div>
<div className="mt-2 flex items-center gap-1.5">
<span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FEF2F2] text-expense-negative">
              47.8%
            </span>
<span className="font-caption text-caption text-text-secondary">of monthly income</span>
</div>
</div>
</div>
{/* Card 3: Net Cash Flow */}
<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-border-subtle hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-text-secondary uppercase tracking-wider">Net Cash Flow</span>
<div className="w-8 h-8 rounded-lg bg-[#F0FDF4] flex items-center justify-center text-income-positive">
<span className="material-symbols-outlined text-[20px]">savings</span>
</div>
</div>
<div className="mt-space-md">
<div className="font-metric-xl text-metric-xl text-income-positive tracking-tight font-bold">+₹27,150</div>
<div className="mt-2 flex items-center gap-1.5">
<span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[11px] font-semibold bg-surface-container text-primary">
              Healthy
            </span>
<span className="font-caption text-caption text-text-secondary">52.2% savings rate</span>
</div>
</div>
</div>
{/* Card 4: Total Records */}
<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-border-subtle hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-text-secondary uppercase tracking-wider">Transactions</span>
<div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[20px]">receipt_long</span>
</div>
</div>
<div className="mt-space-md">
<div className="font-metric-xl text-metric-xl text-on-surface tracking-tight font-bold">34 <span className="font-body-md text-body-md text-text-secondary font-normal">records</span></div>
<div className="mt-2 flex items-center gap-2">
<span className="font-caption text-caption text-expense-negative flex items-center gap-0.5">
<span className="w-1.5 h-1.5 rounded-full bg-expense-negative"></span>28 Debits
            </span>
<span className="font-caption text-caption text-income-positive flex items-center gap-0.5">
<span className="w-1.5 h-1.5 rounded-full bg-income-positive"></span>6 Credits
            </span>
</div>
</div>
</div>
</div>
{/* Toolbar: Filter Controls & Search */}
<div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-border-subtle flex flex-col gap-space-md">
<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
{/* Search Input */}
<div className="relative flex-1 min-w-[260px] max-w-xl">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-[20px]">search</span>
<input className="w-full h-10 pl-10 pr-4 bg-background-secondary rounded-lg font-body-md text-body-md text-on-surface placeholder:text-text-secondary border border-transparent focus:border-primary focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/15 transition-all outline-none" id="table-search" placeholder="Search by description, merchant, tags, or reference..." type="text"/>
</div>
{/* Segmented Type Selector & Date Filter */}
<div className="flex items-center flex-wrap gap-space-sm">
{/* Type Pill Switch */}
<div className="inline-flex p-1 bg-surface-container-low rounded-lg border border-border-subtle" id="type-filter-group">
<button className="filter-type-btn px-3 py-1 rounded-md text-label-md font-label-md transition-colors bg-surface-container-lowest text-primary font-semibold shadow-xs" data-filter="all" type="button">All</button>
<button className="filter-type-btn px-3 py-1 rounded-md text-label-md font-label-md text-text-secondary hover:text-on-surface transition-colors" data-filter="income" type="button">Income</button>
<button className="filter-type-btn px-3 py-1 rounded-md text-label-md font-label-md text-text-secondary hover:text-on-surface transition-colors" data-filter="expense" type="button">Expenses</button>
</div>
{/* Date Quick Pill */}
<button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-low hover:bg-surface-container rounded-lg text-label-md font-label-md text-on-surface border border-border-subtle transition-colors" type="button">
<span className="material-symbols-outlined text-[18px] text-primary">calendar_month</span>
<span>This Month (Oct 2024)</span>
<span className="material-symbols-outlined text-[16px] text-text-secondary">arrow_drop_down</span>
</button>
</div>
</div>
{/* Secondary Filter Row */}
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pt-space-xs border-t border-border-subtle">
<div className="flex items-center flex-wrap gap-2">
{/* Category Dropdown */}
<div className="relative">
<select className="appearance-none pl-3 pr-8 py-1.5 bg-background-secondary rounded-lg font-label-md text-label-md text-on-surface border border-border-subtle focus:outline-none focus:border-primary cursor-pointer hover:bg-surface-container-low transition-colors" id="category-filter">
<option value="">All Categories</option>
<option value="Primary Income">Primary Income</option>
<option value="Secondary Income">Secondary Income</option>
<option value="Housing &amp; Rent">Housing &amp; Rent</option>
<option value="Loans &amp; EMI">Loans &amp; EMI</option>
<option value="Groceries">Groceries</option>
<option value="Food &amp; Dining">Food &amp; Dining</option>
<option value="Utilities">Utilities</option>
<option value="Investments">Investments</option>
</select>
<span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none text-[16px]">expand_more</span>
</div>
{/* Payment Method Dropdown */}
<div className="relative">
<select className="appearance-none pl-3 pr-8 py-1.5 bg-background-secondary rounded-lg font-label-md text-label-md text-on-surface border border-border-subtle focus:outline-none focus:border-primary cursor-pointer hover:bg-surface-container-low transition-colors" id="method-filter">
<option value="">All Payment Rails</option>
<option value="UPI">UPI (GPay / PhonePe)</option>
<option value="NEFT">NEFT Direct</option>
<option value="IMPS">IMPS Net Banking</option>
<option value="Card">Cards (Credit / Debit)</option>
<option value="NACH">NACH Mandate</option>
</select>
<span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none text-[16px]">expand_more</span>
</div>
{/* Reset Filter Ghost Button */}
<button className="inline-flex items-center gap-1 px-2.5 py-1.5 text-text-secondary hover:text-primary rounded-lg text-label-md font-label-md transition-colors" id="clear-filters-btn" type="button">
<span className="material-symbols-outlined text-[16px]">restart_alt</span>
<span>Reset</span>
</button>
</div>
<div className="text-right">
<span className="font-caption text-caption text-text-secondary" id="results-count">Showing 10 of 34 transactions</span>
</div>
</div>
</div>
{/* Transaction Ledger Table Panel */}
<div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-border-subtle overflow-hidden">
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse" id="transactions-table">
<thead>
<tr className="bg-lavender-subtle border-b border-border-subtle text-text-secondary font-label-sm text-label-sm uppercase tracking-wider">
<th className="py-3 px-space-lg font-semibold" scope="col">Date &amp; Time</th>
<th className="py-3 px-space-lg font-semibold" scope="col">Description / Merchant</th>
<th className="py-3 px-space-lg font-semibold" scope="col">Category</th>
<th className="py-3 px-space-lg font-semibold" scope="col">Rail / Method</th>
<th className="py-3 px-space-lg font-semibold" scope="col">Type</th>
<th className="py-3 px-space-lg font-semibold text-right" scope="col">Amount (₹)</th>
<th className="py-3 px-space-lg font-semibold text-center w-24" scope="col">Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-border-subtle font-body-md text-body-md" id="table-body">
{/* Row 1: Salary Credit */}
<tr className="hover:bg-surface-container-low/50 transition-colors group transaction-row" data-category="Primary Income" data-method="NEFT" data-type="income">
<td className="py-3.5 px-space-lg whitespace-nowrap text-text-secondary font-mono text-[12px]">
<div className="font-semibold text-on-surface">Oct 24, 2024</div>
<div className="text-[11px] text-text-secondary">10:15 AM</div>
</td>
<td className="py-3.5 px-space-lg">
<div className="flex items-center gap-space-sm">
<div className="w-9 h-9 rounded-full bg-[#E0E7FF] text-[#4338CA] flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                    TC
                  </div>
<div className="flex flex-col min-w-0">
<span className="font-headline-sm text-headline-sm text-on-surface truncate">TechCorp India Pvt Ltd</span>
<span className="font-caption text-caption text-text-secondary truncate">Monthly Salary Credit #SAL-OCT-9021</span>
</div>
</div>
</td>
<td className="py-3.5 px-space-lg whitespace-nowrap">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-surface-container text-primary">
                  Primary Income
                </span>
</td>
<td className="py-3.5 px-space-lg whitespace-nowrap">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-mono text-[11px] bg-background-secondary text-on-surface-variant border border-border-subtle">
<span className="w-1.5 h-1.5 rounded-full bg-income-positive"></span>NEFT
                </span>
</td>
<td className="py-3.5 px-space-lg whitespace-nowrap">
<span className="inline-flex items-center px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-[#DCFCE7] text-income-positive font-semibold">
                  Income
                </span>
</td>
<td className="py-3.5 px-space-lg whitespace-nowrap text-right font-mono font-semibold text-[14px] text-income-positive">
                +₹40,000.00
              </td>
<td className="py-3.5 px-space-lg whitespace-nowrap text-center">
<div className="flex items-center justify-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
<button aria-label="Edit transaction" className="p-1 rounded text-text-secondary hover:text-primary hover:bg-surface-container transition-colors" type="button">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
<button aria-label="Delete transaction" className="p-1 rounded text-text-secondary hover:text-expense-negative hover:bg-error-container/30 transition-colors" type="button">
<span className="material-symbols-outlined text-[18px]">delete</span>
</button>
</div>
</td>
</tr>
{/* Row 2: Rent */}
<tr className="hover:bg-surface-container-low/50 transition-colors group transaction-row" data-category="Housing &amp; Rent" data-method="IMPS" data-type="expense">
<td className="py-3.5 px-space-lg whitespace-nowrap text-text-secondary font-mono text-[12px]">
<div className="font-semibold text-on-surface">Oct 23, 2024</div>
<div className="text-[11px] text-text-secondary">08:30 AM</div>
</td>
<td className="py-3.5 px-space-lg">
<div className="flex items-center gap-space-sm">
<div className="w-9 h-9 rounded-full bg-[#FEF3C7] text-[#B45309] flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                    PO
                  </div>
<div className="flex flex-col min-w-0">
<span className="font-headline-sm text-headline-sm text-on-surface truncate">Prestige Oakwood Residency</span>
<span className="font-caption text-caption text-text-secondary truncate">October Apartment Maintenance &amp; Rent #A-402</span>
</div>
</div>
</td>
<td className="py-3.5 px-space-lg whitespace-nowrap">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-surface-container text-on-surface-variant">
                  Housing &amp; Rent
                </span>
</td>
<td className="py-3.5 px-space-lg whitespace-nowrap">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-mono text-[11px] bg-background-secondary text-on-surface-variant border border-border-subtle">
<span className="material-symbols-outlined text-[12px] text-primary">account_balance</span>Net Banking (IMPS)
                </span>
</td>
<td className="py-3.5 px-space-lg whitespace-nowrap">
<span className="inline-flex items-center px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-[#FEE2E2] text-expense-negative font-semibold">
                  Expense
                </span>
</td>
<td className="py-3.5 px-space-lg whitespace-nowrap text-right font-mono font-semibold text-[14px] text-on-surface">
                -₹8,000.00
              </td>
<td className="py-3.5 px-space-lg whitespace-nowrap text-center">
<div className="flex items-center justify-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
<button aria-label="Edit transaction" className="p-1 rounded text-text-secondary hover:text-primary hover:bg-surface-container transition-colors" type="button">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
<button aria-label="Delete transaction" className="p-1 rounded text-text-secondary hover:text-expense-negative hover:bg-error-container/30 transition-colors" type="button">
<span className="material-symbols-outlined text-[18px]">delete</span>
</button>
</div>
</td>
</tr>
{/* Row 3: Loan EMI */}
<tr className="hover:bg-surface-container-low/50 transition-colors group transaction-row" data-category="Loans &amp; EMI" data-method="NACH" data-type="expense">
<td className="py-3.5 px-space-lg whitespace-nowrap text-text-secondary font-mono text-[12px]">
<div className="font-semibold text-on-surface">Oct 20, 2024</div>
<div className="text-[11px] text-text-secondary">06:00 AM</div>
</td>
<td className="py-3.5 px-space-lg">
<div className="flex items-center gap-space-sm">
<div className="w-9 h-9 rounded-full bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                    HD
                  </div>
<div className="flex flex-col min-w-0">
<span className="font-headline-sm text-headline-sm text-on-surface truncate">HDFC Bank Retail Assets</span>
<span className="font-caption text-caption text-text-secondary truncate">Personal Loan Auto-Debit EMI #14/36</span>
</div>
</div>
</td>
<td className="py-3.5 px-space-lg whitespace-nowrap">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-surface-container text-on-surface-variant">
                  Loans &amp; EMI
                </span>
</td>
<td className="py-3.5 px-space-lg whitespace-nowrap">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-mono text-[11px] bg-background-secondary text-on-surface-variant border border-border-subtle">
<span className="material-symbols-outlined text-[12px] text-warning-alert">sync</span>NACH Auto-debit
                </span>
</td>
<td className="py-3.5 px-space-lg whitespace-nowrap">
<span className="inline-flex items-center px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-[#FEE2E2] text-expense-negative font-semibold">
                  Expense
                </span>
</td>
<td className="py-3.5 px-space-lg whitespace-nowrap text-right font-mono font-semibold text-[14px] text-on-surface">
                -₹4,500.00
              </td>
<td className="py-3.5 px-space-lg whitespace-nowrap text-center">
<div className="flex items-center justify-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
<button aria-label="Edit transaction" className="p-1 rounded text-text-secondary hover:text-primary hover:bg-surface-container transition-colors" type="button">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
<button aria-label="Delete transaction" className="p-1 rounded text-text-secondary hover:text-expense-negative hover:bg-error-container/30 transition-colors" type="button">
<span className="material-symbols-outlined text-[18px]">delete</span>
</button>
</div>
</td>
</tr>
{/* Row 4: Swiggy */}
<tr className="hover:bg-surface-container-low/50 transition-colors group transaction-row" data-category="Food &amp; Dining" data-method="UPI" data-type="expense">
<td className="py-3.5 px-space-lg whitespace-nowrap text-text-secondary font-mono text-[12px]">
<div className="font-semibold text-on-surface">Oct 19, 2024</div>
<div className="text-[11px] text-text-secondary">08:45 PM</div>
</td>
<td className="py-3.5 px-space-lg">
<div className="flex items-center gap-space-sm">
<div className="w-9 h-9 rounded-full bg-[#FFEDD5] text-[#C2410C] flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                    SW
                  </div>
<div className="flex flex-col min-w-0">
<span className="font-headline-sm text-headline-sm text-on-surface truncate">Swiggy Gourmet</span>
<span className="font-caption text-caption text-text-secondary truncate">Weekend family dinner delivery · Bangalore</span>
</div>
</div>
</td>
<td className="py-3.5 px-space-lg whitespace-nowrap">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-surface-container text-on-surface-variant">
                  Food &amp; Dining
                </span>
</td>
<td className="py-3.5 px-space-lg whitespace-nowrap">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-mono text-[11px] bg-background-secondary text-on-surface-variant border border-border-subtle">
<span className="material-symbols-outlined text-[12px] text-primary">contactless</span>UPI (GPay)
                </span>
</td>
<td className="py-3.5 px-space-lg whitespace-nowrap">
<span className="inline-flex items-center px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-[#FEE2E2] text-expense-negative font-semibold">
                  Expense
                </span>
</td>
<td className="py-3.5 px-space-lg whitespace-nowrap text-right font-mono font-semibold text-[14px] text-on-surface">
                -₹1,240.00
              </td>
<td className="py-3.5 px-space-lg whitespace-nowrap text-center">
<div className="flex items-center justify-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
<button aria-label="Edit transaction" className="p-1 rounded text-text-secondary hover:text-primary hover:bg-surface-container transition-colors" type="button">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
<button aria-label="Delete transaction" className="p-1 rounded text-text-secondary hover:text-expense-negative hover:bg-error-container/30 transition-colors" type="button">
<span className="material-symbols-outlined text-[18px]">delete</span>
</button>
</div>
</td>
</tr>
{/* Row 5: Blinkit Groceries */}
<tr className="hover:bg-surface-container-low/50 transition-colors group transaction-row" data-category="Groceries" data-method="UPI" data-type="expense">
<td className="py-3.5 px-space-lg whitespace-nowrap text-text-secondary font-mono text-[12px]">
<div className="font-semibold text-on-surface">Oct 17, 2024</div>
<div className="text-[11px] text-text-secondary">09:12 AM</div>
</td>
<td className="py-3.5 px-space-lg">
<div className="flex items-center gap-space-sm">
<div className="w-9 h-9 rounded-full bg-[#FEF9C3] text-[#A16207] flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                    BL
                  </div>
<div className="flex flex-col min-w-0">
<span className="font-headline-sm text-headline-sm text-on-surface truncate">Blinkit Instant Commerce</span>
<span className="font-caption text-caption text-text-secondary truncate">Weekly dairy, fruits &amp; essentials</span>
</div>
</div>
</td>
<td className="py-3.5 px-space-lg whitespace-nowrap">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-surface-container text-on-surface-variant">
                  Groceries
                </span>
</td>
<td className="py-3.5 px-space-lg whitespace-nowrap">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-mono text-[11px] bg-background-secondary text-on-surface-variant border border-border-subtle">
<span className="material-symbols-outlined text-[12px] text-primary">contactless</span>UPI (PhonePe)
                </span>
</td>
<td className="py-3.5 px-space-lg whitespace-nowrap">
<span className="inline-flex items-center px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-[#FEE2E2] text-expense-negative font-semibold">
                  Expense
                </span>
</td>
<td className="py-3.5 px-space-lg whitespace-nowrap text-right font-mono font-semibold text-[14px] text-on-surface">
                -₹1,850.00
              </td>
<td className="py-3.5 px-space-lg whitespace-nowrap text-center">
<div className="flex items-center justify-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
<button aria-label="Edit transaction" className="p-1 rounded text-text-secondary hover:text-primary hover:bg-surface-container transition-colors" type="button">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
<button aria-label="Delete transaction" className="p-1 rounded text-text-secondary hover:text-expense-negative hover:bg-error-container/30 transition-colors" type="button">
<span className="material-symbols-outlined text-[18px]">delete</span>
</button>
</div>
</td>
</tr>
{/* Row 6: BESCOM */}
<tr className="hover:bg-surface-container-low/50 transition-colors group transaction-row" data-category="Utilities" data-method="UPI" data-type="expense">
<td className="py-3.5 px-space-lg whitespace-nowrap text-text-secondary font-mono text-[12px]">
<div className="font-semibold text-on-surface">Oct 14, 2024</div>
<div className="text-[11px] text-text-secondary">03:20 PM</div>
</td>
<td className="py-3.5 px-space-lg">
<div className="flex items-center gap-space-sm">
<div className="w-9 h-9 rounded-full bg-[#F3E8FF] text-[#7E22CE] flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                    BE
                  </div>
<div className="flex flex-col min-w-0">
<span className="font-headline-sm text-headline-sm text-on-surface truncate">BESCOM Bengaluru</span>
<span className="font-caption text-caption text-text-secondary truncate">Electricity Bill · Consumer #5419920</span>
</div>
</div>
</td>
<td className="py-3.5 px-space-lg whitespace-nowrap">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-surface-container text-on-surface-variant">
                  Utilities
                </span>
</td>
<td className="py-3.5 px-space-lg whitespace-nowrap">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-mono text-[11px] bg-background-secondary text-on-surface-variant border border-border-subtle">
<span className="material-symbols-outlined text-[12px] text-primary">bolt</span>UPI
                </span>
</td>
<td className="py-3.5 px-space-lg whitespace-nowrap">
<span className="inline-flex items-center px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-[#FEE2E2] text-expense-negative font-semibold">
                  Expense
                </span>
</td>
<td className="py-3.5 px-space-lg whitespace-nowrap text-right font-mono font-semibold text-[14px] text-on-surface">
                -₹1,450.00
              </td>
<td className="py-3.5 px-space-lg whitespace-nowrap text-center">
<div className="flex items-center justify-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
<button aria-label="Edit transaction" className="p-1 rounded text-text-secondary hover:text-primary hover:bg-surface-container transition-colors" type="button">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
<button aria-label="Delete transaction" className="p-1 rounded text-text-secondary hover:text-expense-negative hover:bg-error-container/30 transition-colors" type="button">
<span className="material-symbols-outlined text-[18px]">delete</span>
</button>
</div>
</td>
</tr>
{/* Row 7: Airtel Fiber */}
<tr className="hover:bg-surface-container-low/50 transition-colors group transaction-row" data-category="Utilities" data-method="Card" data-type="expense">
<td className="py-3.5 px-space-lg whitespace-nowrap text-text-secondary font-mono text-[12px]">
<div className="font-semibold text-on-surface">Oct 11, 2024</div>
<div className="text-[11px] text-text-secondary">11:00 AM</div>
</td>
<td className="py-3.5 px-space-lg">
<div className="flex items-center gap-space-sm">
<div className="w-9 h-9 rounded-full bg-[#FFE4E6] text-[#BE123C] flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                    AX
                  </div>
<div className="flex flex-col min-w-0">
<span className="font-headline-sm text-headline-sm text-on-surface truncate">Airtel Xstream Fiber</span>
<span className="font-caption text-caption text-text-secondary truncate">High-speed 300Mbps Plan Auto-pay</span>
</div>
</div>
</td>
<td className="py-3.5 px-space-lg whitespace-nowrap">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-surface-container text-on-surface-variant">
                  Utilities
                </span>
</td>
<td className="py-3.5 px-space-lg whitespace-nowrap">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-mono text-[11px] bg-background-secondary text-on-surface-variant border border-border-subtle">
<span className="material-symbols-outlined text-[12px] text-primary">credit_card</span>Card Auto-pay
                </span>
</td>
<td className="py-3.5 px-space-lg whitespace-nowrap">
<span className="inline-flex items-center px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-[#FEE2E2] text-expense-negative font-semibold">
                  Expense
                </span>
</td>
<td className="py-3.5 px-space-lg whitespace-nowrap text-right font-mono font-semibold text-[14px] text-on-surface">
                -₹999.00
              </td>
<td className="py-3.5 px-space-lg whitespace-nowrap text-center">
<div className="flex items-center justify-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
<button aria-label="Edit transaction" className="p-1 rounded text-text-secondary hover:text-primary hover:bg-surface-container transition-colors" type="button">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
<button aria-label="Delete transaction" className="p-1 rounded text-text-secondary hover:text-expense-negative hover:bg-error-container/30 transition-colors" type="button">
<span className="material-symbols-outlined text-[18px]">delete</span>
</button>
</div>
</td>
</tr>
{/* Row 8: Zerodha SIP */}
<tr className="hover:bg-surface-container-low/50 transition-colors group transaction-row" data-category="Investments" data-method="UPI" data-type="expense">
<td className="py-3.5 px-space-lg whitespace-nowrap text-text-secondary font-mono text-[12px]">
<div className="font-semibold text-on-surface">Oct 10, 2024</div>
<div className="text-[11px] text-text-secondary">09:00 AM</div>
</td>
<td className="py-3.5 px-space-lg">
<div className="flex items-center gap-space-sm">
<div className="w-9 h-9 rounded-full bg-[#E0F2FE] text-[#0369A1] flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                    ZB
                  </div>
<div className="flex flex-col min-w-0">
<span className="font-headline-sm text-headline-sm text-on-surface truncate">Zerodha Broking Ltd</span>
<span className="font-caption text-caption text-text-secondary truncate">Nifty 50 Index Fund Monthly SIP</span>
</div>
</div>
</td>
<td className="py-3.5 px-space-lg whitespace-nowrap">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-surface-container text-primary font-medium">
                  Investments
                </span>
</td>
<td className="py-3.5 px-space-lg whitespace-nowrap">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-mono text-[11px] bg-background-secondary text-on-surface-variant border border-border-subtle">
<span className="material-symbols-outlined text-[12px] text-primary">autorenew</span>UPI Auto-mandate
                </span>
</td>
<td className="py-3.5 px-space-lg whitespace-nowrap">
<span className="inline-flex items-center px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-[#FEE2E2] text-expense-negative font-semibold">
                  Expense
                </span>
</td>
<td className="py-3.5 px-space-lg whitespace-nowrap text-right font-mono font-semibold text-[14px] text-on-surface">
                -₹5,000.00
              </td>
<td className="py-3.5 px-space-lg whitespace-nowrap text-center">
<div className="flex items-center justify-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
<button aria-label="Edit transaction" className="p-1 rounded text-text-secondary hover:text-primary hover:bg-surface-container transition-colors" type="button">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
<button aria-label="Delete transaction" className="p-1 rounded text-text-secondary hover:text-expense-negative hover:bg-error-container/30 transition-colors" type="button">
<span className="material-symbols-outlined text-[18px]">delete</span>
</button>
</div>
</td>
</tr>
{/* Row 9: Freelance UX Consulting */}
<tr className="hover:bg-surface-container-low/50 transition-colors group transaction-row" data-category="Secondary Income" data-method="IMPS" data-type="income">
<td className="py-3.5 px-space-lg whitespace-nowrap text-text-secondary font-mono text-[12px]">
<div className="font-semibold text-on-surface">Oct 08, 2024</div>
<div className="text-[11px] text-text-secondary">04:45 PM</div>
</td>
<td className="py-3.5 px-space-lg">
<div className="flex items-center gap-space-sm">
<div className="w-9 h-9 rounded-full bg-[#ECFDF5] text-income-positive flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                    FX
                  </div>
<div className="flex flex-col min-w-0">
<span className="font-headline-sm text-headline-sm text-on-surface truncate">Freelance UX Consulting</span>
<span className="font-caption text-caption text-text-secondary truncate">Client Milestone payout · FinTech App MVP</span>
</div>
</div>
</td>
<td className="py-3.5 px-space-lg whitespace-nowrap">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-surface-container text-primary">
                  Secondary Income
                </span>
</td>
<td className="py-3.5 px-space-lg whitespace-nowrap">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-mono text-[11px] bg-background-secondary text-on-surface-variant border border-border-subtle">
<span className="w-1.5 h-1.5 rounded-full bg-income-positive"></span>IMPS
                </span>
</td>
<td className="py-3.5 px-space-lg whitespace-nowrap">
<span className="inline-flex items-center px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-[#DCFCE7] text-income-positive font-semibold">
                  Income
                </span>
</td>
<td className="py-3.5 px-space-lg whitespace-nowrap text-right font-mono font-semibold text-[14px] text-income-positive">
                +₹12,000.00
              </td>
<td className="py-3.5 px-space-lg whitespace-nowrap text-center">
<div className="flex items-center justify-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
<button aria-label="Edit transaction" className="p-1 rounded text-text-secondary hover:text-primary hover:bg-surface-container transition-colors" type="button">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
<button aria-label="Delete transaction" className="p-1 rounded text-text-secondary hover:text-expense-negative hover:bg-error-container/30 transition-colors" type="button">
<span className="material-symbols-outlined text-[18px]">delete</span>
</button>
</div>
</td>
</tr>
{/* Row 10: Blue Tokai */}
<tr className="hover:bg-surface-container-low/50 transition-colors group transaction-row" data-category="Food &amp; Dining" data-method="Card" data-type="expense">
<td className="py-3.5 px-space-lg whitespace-nowrap text-text-secondary font-mono text-[12px]">
<div className="font-semibold text-on-surface">Oct 05, 2024</div>
<div className="text-[11px] text-text-secondary">02:15 PM</div>
</td>
<td className="py-3.5 px-space-lg">
<div className="flex items-center gap-space-sm">
<div className="w-9 h-9 rounded-full bg-[#FEF2F2] text-[#991B1B] flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                    BT
                  </div>
<div className="flex flex-col min-w-0">
<span className="font-headline-sm text-headline-sm text-on-surface truncate">Blue Tokai Coffee Roasters</span>
<span className="font-caption text-caption text-text-secondary truncate">Indiranagar cafe work session &amp; brew</span>
</div>
</div>
</td>
<td className="py-3.5 px-space-lg whitespace-nowrap">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-surface-container text-on-surface-variant">
                  Food &amp; Dining
                </span>
</td>
<td className="py-3.5 px-space-lg whitespace-nowrap">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-mono text-[11px] bg-background-secondary text-on-surface-variant border border-border-subtle">
<span className="material-symbols-outlined text-[12px] text-primary">credit_card</span>Card (HDFC Visa)
                </span>
</td>
<td className="py-3.5 px-space-lg whitespace-nowrap">
<span className="inline-flex items-center px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-[#FEE2E2] text-expense-negative font-semibold">
                  Expense
                </span>
</td>
<td className="py-3.5 px-space-lg whitespace-nowrap text-right font-mono font-semibold text-[14px] text-on-surface">
                -₹620.00
              </td>
<td className="py-3.5 px-space-lg whitespace-nowrap text-center">
<div className="flex items-center justify-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
<button aria-label="Edit transaction" className="p-1 rounded text-text-secondary hover:text-primary hover:bg-surface-container transition-colors" type="button">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
<button aria-label="Delete transaction" className="p-1 rounded text-text-secondary hover:text-expense-negative hover:bg-error-container/30 transition-colors" type="button">
<span className="material-symbols-outlined text-[18px]">delete</span>
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
{/* Graceful Empty State (Hidden initially; shown via filter if no matches) */}
<div className="hidden py-16 px-space-xl flex-col items-center justify-center text-center" id="table-empty-state">
<div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-primary mb-space-md">
<span className="material-symbols-outlined text-[32px]">search_off</span>
</div>
<h2 className="font-headline-sm text-headline-sm text-on-surface mb-1">No transactions found</h2>
<p className="font-body-md text-body-md text-text-secondary max-w-md mb-space-lg">
          No records match your active query or criteria. Try clearing some filters or link an additional bank account via Account Aggregator.
        </p>
<button className="inline-flex items-center gap-space-xs px-4 py-2 rounded-lg bg-surface-container text-primary font-label-md text-label-md hover:bg-surface-container-high transition-colors" id="reset-empty-btn" type="button">
<span className="material-symbols-outlined text-[18px]">refresh</span>
<span>Reset All Filters</span>
</button>
</div>
{/* Pagination & Ledger Footer */}
<div className="px-space-lg py-3.5 bg-lavender-subtle border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-space-md">
{/* Record Count Info */}
<span className="font-caption text-caption text-text-secondary">
          Showing <span className="font-semibold text-on-surface">1</span> to <span className="font-semibold text-on-surface">10</span> of <span className="font-semibold text-on-surface">34</span> records
        </span>
{/* Rows Per Page */}
<div className="flex items-center gap-2">
<span className="font-caption text-caption text-text-secondary">Rows per page:</span>
<select className="px-2 py-1 bg-surface-container-lowest rounded-md text-label-sm font-label-sm text-on-surface border border-border-subtle focus:outline-none focus:border-primary">
<option value="10">10</option>
<option value="25">25</option>
<option value="50">50</option>
</select>
</div>
{/* Numeric Pagination Controls */}
<div className="inline-flex items-center gap-1">
<button className="p-1 rounded text-text-secondary/40 cursor-not-allowed" disabled="" type="button">
<span className="material-symbols-outlined text-[18px]">chevron_left</span>
</button>
<button className="w-7 h-7 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm font-semibold flex items-center justify-center shadow-xs" type="button">
            1
          </button>
<button className="w-7 h-7 rounded-lg hover:bg-surface-container text-text-secondary font-label-sm text-label-sm flex items-center justify-center transition-colors" type="button">
            2
          </button>
<button className="w-7 h-7 rounded-lg hover:bg-surface-container text-text-secondary font-label-sm text-label-sm flex items-center justify-center transition-colors" type="button">
            3
          </button>
<button className="w-7 h-7 rounded-lg hover:bg-surface-container text-text-secondary font-label-sm text-label-sm flex items-center justify-center transition-colors" type="button">
            4
          </button>
<button className="p-1 rounded text-text-secondary hover:text-on-surface transition-colors" type="button">
<span className="material-symbols-outlined text-[18px]">chevron_right</span>
</button>
</div>
</div>
</div>
{/* AI Categorization Insight Toast / Banner */}
<div className="bg-surface-container-low rounded-2xl p-space-lg border border-primary/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
<div className="flex items-center gap-space-md">
<div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm">
<span className="material-symbols-outlined text-[22px]">auto_awesome</span>
</div>
<div>
<h2 className="font-headline-sm text-headline-sm text-on-surface">MoneyMentor Smart Auto-Reconciliation</h2>
<p className="font-body-md text-body-md text-text-secondary">
            32 of 34 transactions this month were automatically tagged with 99.4% accuracy via RBI account aggregator sync.
          </p>
</div>
</div>
<button className="whitespace-nowrap px-4 py-2 bg-surface-container-lowest hover:bg-surface-container text-primary font-label-md text-label-md rounded-lg border border-border-subtle shadow-xs transition-colors" type="button">
        Review Auto-Rules (3)
      </button>
</div>
</div>
{/* Slide-Over Drawer: Add Transaction */}
<div className="fixed inset-0 bg-[#1c192c]/40 backdrop-blur-xs z-50 transition-opacity duration-300 opacity-0 pointer-events-none" id="add-transaction-overlay">
<div className="absolute inset-0" id="drawer-backdrop"></div>
<div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-surface-container-lowest shadow-2xl flex flex-col transform translate-x-full transition-transform duration-300 ease-in-out border-l border-border-subtle" id="add-transaction-drawer">
{/* Drawer Header */}
<div className="p-space-xl border-b border-border-subtle flex items-center justify-between bg-lavender-subtle">
<div>
<h2 className="font-headline-md text-headline-md text-on-surface">Add New Transaction</h2>
<p className="font-caption text-caption text-text-secondary">Record a manual debit, cash expense, or offline salary credit.</p>
</div>
<button className="w-8 h-8 rounded-lg flex items-center justify-center text-text-secondary hover:text-on-surface hover:bg-surface-container transition-colors" id="close-drawer-btn" type="button">
<span className="material-symbols-outlined text-[20px]">close</span>
</button>
</div>
{/* Drawer Body (Form) */}
<form className="flex-1 overflow-y-auto p-space-xl space-y-space-lg" id="new-transaction-form">
{/* Type Switch (Segmented) */}
<div>
<label className="block font-label-sm text-label-sm text-text-secondary uppercase tracking-wider mb-2">Transaction Type</label>
<div className="grid grid-cols-2 p-1 bg-surface-container-low rounded-xl border border-border-subtle gap-1">
<button className="py-2 rounded-lg text-label-md font-label-md font-semibold bg-surface-container-lowest text-expense-negative shadow-xs transition-all flex items-center justify-center gap-1.5" id="drawer-type-expense" type="button">
<span className="material-symbols-outlined text-[18px]">arrow_outward</span>
<span>Expense</span>
</button>
<button className="py-2 rounded-lg text-label-md font-label-md font-semibold text-text-secondary hover:text-on-surface transition-all flex items-center justify-center gap-1.5" id="drawer-type-income" type="button">
<span className="material-symbols-outlined text-[18px]">arrow_downward</span>
<span>Income</span>
</button>
</div>
</div>
{/* Amount Input with Currency Affix */}
<div>
<label className="block font-label-sm text-label-sm text-text-secondary uppercase tracking-wider mb-1.5" htmlFor="drawer-amount">Amount (INR)</label>
<div className="relative flex items-center">
<div className="absolute left-0 top-0 bottom-0 w-11 flex items-center justify-center font-metric-md text-metric-md font-bold text-primary border-r border-border-subtle bg-surface-container-low rounded-l-lg">
              ₹
            </div>
<input className="w-full h-12 pl-14 pr-4 bg-surface-container-lowest rounded-lg font-metric-xl text-metric-xl font-bold text-on-surface border border-border-subtle focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all outline-none" id="drawer-amount" placeholder="0.00" required="" type="text" defaultValue="2,450.00"/>
</div>
</div>
{/* Description / Merchant Input */}
<div>
<label className="block font-label-sm text-label-sm text-text-secondary uppercase tracking-wider mb-1.5" htmlFor="drawer-desc">Merchant / Counterparty</label>
<input className="w-full h-11 px-3 bg-surface-container-lowest rounded-lg font-body-md text-body-md text-on-surface border border-border-subtle focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all outline-none" id="drawer-desc" placeholder="e.g. Nature's Basket, Swiggy, DLF Flat Maintenance" required="" type="text"/>
</div>
{/* Category Dropdown */}
<div>
<label className="block font-label-sm text-label-sm text-text-secondary uppercase tracking-wider mb-1.5" htmlFor="drawer-category">Category</label>
<div className="relative">
<select className="w-full h-11 pl-3 pr-8 bg-surface-container-lowest rounded-lg font-body-md text-body-md text-on-surface border border-border-subtle focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none appearance-none cursor-pointer" id="drawer-category">
<option value="Groceries &amp; Essentials">Groceries &amp; Essentials</option>
<option value="Food &amp; Dining">Food &amp; Dining</option>
<option value="Housing &amp; Rent">Housing &amp; Rent</option>
<option value="Loans &amp; EMI">Loans &amp; EMI</option>
<option value="Utilities">Utilities &amp; Bills</option>
<option value="Investments">Investments (SIP / MF)</option>
<option value="Entertainment">Entertainment &amp; Outings</option>
<option value="Primary Income">Primary Salary / Income</option>
<option value="Other">Other Miscellaneous</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none text-[20px]">expand_more</span>
</div>
</div>
{/* Date & Time Row */}
<div className="grid grid-cols-2 gap-space-md">
<div>
<label className="block font-label-sm text-label-sm text-text-secondary uppercase tracking-wider mb-1.5" htmlFor="drawer-date">Date</label>
<input className="w-full h-11 px-3 bg-surface-container-lowest rounded-lg font-body-md text-body-md text-on-surface border border-border-subtle focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none" id="drawer-date" type="date" defaultValue="2024-10-24"/>
</div>
<div>
<label className="block font-label-sm text-label-sm text-text-secondary uppercase tracking-wider mb-1.5" htmlFor="drawer-time">Time</label>
<input className="w-full h-11 px-3 bg-surface-container-lowest rounded-lg font-body-md text-body-md text-on-surface border border-border-subtle focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none" id="drawer-time" type="time" defaultValue="19:30"/>
</div>
</div>
{/* Payment Method */}
<div>
<label className="block font-label-sm text-label-sm text-text-secondary uppercase tracking-wider mb-1.5" htmlFor="drawer-method">Payment Method</label>
<div className="relative">
<select className="w-full h-11 pl-3 pr-8 bg-surface-container-lowest rounded-lg font-body-md text-body-md text-on-surface border border-border-subtle focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none appearance-none cursor-pointer" id="drawer-method">
<option value="UPI">UPI (Google Pay / PhonePe / Paytm)</option>
<option value="Debit Card">HDFC Platinum Debit Card</option>
<option value="Credit Card">Axis Bank Magnus Credit Card</option>
<option value="Net Banking">Net Banking (NEFT / IMPS)</option>
<option value="Cash">Cash in Hand</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none text-[20px]">expand_more</span>
</div>
</div>
{/* Tags & Notes */}
<div>
<label className="block font-label-sm text-label-sm text-text-secondary uppercase tracking-wider mb-1.5" htmlFor="drawer-notes">Notes &amp; Hashtags (Optional)</label>
<textarea className="w-full p-3 bg-surface-container-lowest rounded-lg font-body-md text-body-md text-on-surface border border-border-subtle focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none resize-none" id="drawer-notes" placeholder="e.g. Shared with roommates, reimbursable by company..." rows="3"></textarea>
</div>
</form>
{/* Drawer Footer Actions */}
<div className="p-space-lg border-t border-border-subtle bg-surface-container-lowest flex items-center justify-end gap-space-md">
<button className="px-4 py-2.5 rounded-lg border border-border-subtle text-on-surface hover:bg-surface-container font-label-md text-label-md transition-colors" id="cancel-drawer-btn" type="button">
          Cancel
        </button>
<button className="px-5 py-2.5 rounded-lg bg-primary hover:bg-[#7C3AED] text-on-primary font-label-md text-label-md font-semibold transition-all shadow-md shadow-primary/20" id="save-transaction-btn" type="button">
          Save Transaction
        </button>
</div>
</div>
</div>
{/* Interactive Client-side Script */}

</div>
    </>
  );
}
