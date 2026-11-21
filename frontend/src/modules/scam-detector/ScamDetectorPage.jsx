import React from 'react';

export default function ScamDetectorPage() {

  React.useEffect(() => {
    const sampleLibrary = {
      kyc: "Dear Customer, your HDFC bank account will be blocked today due to pending PAN KYC update. Please verify immediately at http://bit.ly/hdfc-kyc-verify to avoid permanent deactivation of your NetBanking facilities.",
      upi: "COLLECT REQUEST: BESCOM Electricity Dept has sent a request for ₹14,500. Enter your UPI PIN to approve your refund of ₹1,450 directly into your bank account. Valid for 10 minutes only.",
      postal: "India Post Alert: Package #IN892014 arrives at destination hub but failed delivery due to incomplete postal address. Update address & pay redelivery fee of ₹25 immediately at: http://indiapost-parcel-reschedule.top/track",
      stock: "EXCLUSIVE: Join Motilal Oswal VIP Institutional Trading WhatsApp Group! Guaranteed 40% to 300% monthly returns with zero risk. Institutional SEBI block deals allocated daily. Click t.me/vip_stock_multibagger to join now.",
      legit: "HDFC Bank: ₹2,449.00 debited from A/c **4019 on 03-Nov-26 via NACH for BESCOM ELCTRCTY. Avail Bal: INR 1,84,320.14. If not done by you, SMS BLOCK to 5676712 immediately."
    };

    const textarea = document.getElementById('scam-text-input');
    const counter = document.getElementById('char-counter');

    function updateCharCounter() {
      if (textarea && counter) {
        counter.textContent = textarea.value.length + ' chars';
      }
    }

    textarea?.addEventListener('input', updateCharCounter);

    // Case studies
    const caseStudies = {
      1: {
        tag: "FRAUD SMS PREVIEW",
        origin: "From: +91 93112 04821",
        body: "“Dear Customer, Your SBI Bank account will be terminated today due to non-updation of PAN Card. Kindly update your PAN immediately by visiting: http://sbi-pan-kyc.in/portal to resume online services.”",
        desc: "Banks will never threaten single-day termination over SMS. Also note the fake generic domain 'sbi-pan-kyc.in' rather than the authorized onlinesbi.sbi portal.",
        badge: "RBI Circular 2024",
        points: [
          { title: "TRAI Telecommunications Standard", text: "All legitimate Indian banking messages use 6-character registered alphanumeric sender IDs like VM-SBIINB or AX-HDFCBK. Never personal numbers." },
          { title: "KYC Updation Norms", text: "Banks provide at least 30 to 90 days of written and registered email notice before classifying accounts as inoperative. Immediate freeze threats are always fraud." },
          { title: "Domain Verification Protocol", text: "Official Indian banking websites always possess green EV SSL certificates and resolve strictly to certified corporate subdomains." }
        ]
      },
      2: {
        tag: "UPI COLLECT FRAUD",
        origin: "From: GPay / PhonePe Notification",
        body: "“Collect Request received for ₹25,000 from OLX Buyer Army Officer. Enter UPI PIN to receive payment into your account.”",
        desc: "UPI PIN is required ONLY to debit money from your account, never to receive money. Fraudsters masquerade as armed forces personnel buying goods.",
        badge: "NPCI Security Standard",
        points: [
          { title: "Zero PIN Inflow Principle", text: "Entering UPI PIN always authenticates an outflow. No bank or payment gateway ever asks for UPI PIN to receive money." },
          { title: "Armed Forces Impersonation", text: "Scammers routinely circulate forged defense identity cards to establish instant unearned trust on second-hand marketplaces." }
        ]
      },
      3: {
        tag: "POSTAL APK MALWARE FRAUD",
        origin: "From: WhatsApp Unknown Number",
        body: "“IndiaPost Notice: Package on hold. Pay ₹10 delivery charges by installing IndiaPost_Redelivery.apk: http://post-hub-delivery.xyz/app”",
        desc: "Sideloading .apk files from third-party links bypasses Google Play Protect, granting SMS-reading permissions to capture OTPs silently.",
        badge: "CERT-In Advisory 2024",
        points: [
          { title: "Never Sideload APK Files", text: "India Post and banks never ask users to sideload .apk files from web links. Legitimate apps are exclusively distributed on Google Play Store." },
          { title: "Token Payment Pretext", text: "Asking for a trivial amount (₹10 or ₹25) lowers psychological defense while capturing entire card number, expiry, and CVV on a cloned gateway." }
        ]
      },
      4: {
        tag: "TELEGRAM STOCK TRADING SCAM",
        origin: "From: VIP Institutional Group",
        body: "“Join Kotak Institutional Pro Desk. Our SEBI registered research desk offers 500% profit guarantee on pre-IPO circuit stocks. Deposit funds into our institutional escrow account to trade immediately.”",
        desc: "Pig Butchering investment scam using cloned trading dashboards showing fabricated profits. When you try to withdraw, they demand 30% advance tax fees.",
        badge: "SEBI Investor Warning",
        points: [
          { title: "Guaranteed Return Prohibition", text: "SEBI strictly prohibits any entity from promising or guaranteeing fixed returns on equity or derivative investments." },
          { title: "Personal / Mules Bank Accounts", text: "Fraudulent syndicates ask you to transfer funds to random individual or proprietary accounts rather than a registered clearing corporation." }
        ]
      },
      5: {
        tag: "LEGITIMATE BANK SMS ANATOMY",
        origin: "From: VM-HDFCBK (TRAI Registered)",
        body: "“HDFC Bank Alert: ₹3,500.00 debited from A/c **9122 on 07-Nov-26 14:20 via UPI to ZOMATO. UPI Ref 431289104. Avail Bal: INR 78,410.20. If not done by you, forward this SMS to 1800-258-3838.”",
        desc: "Anatomy of authenticity: Official alphanumeric sender ID, masked account number, transaction reference number, accurate balance update, and direct official dispute rail.",
        badge: "Safe Banking Standard",
        points: [
          { title: "Masked Sensitive Data", text: "Legitimate notifications mask account and card numbers (showing only the last 3-4 digits). They never reveal full credentials." },
          { title: "Zero Action Coercion", text: "Authentic debit alerts do not force you to click links or threaten immediate account freezes unless you independently dispute the charge." }
        ]
      }
    };

    function switchCaseStudy(id) {
      for (let i = 1; i <= 5; i++) {
        const btn = document.getElementById(`cs-btn-${i}`);
        if (btn) {
          if (i === id) {
            btn.className = "px-3.5 py-1.5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-semibold transition-all";
          } else {
            btn.className = "px-3.5 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm transition-all";
          }
        }
      }

      const data = caseStudies[id];
      if (!data) return;

      const tag = document.getElementById('cs-left-tag');
      const origin = document.getElementById('cs-left-origin');
      const body = document.getElementById('cs-left-body');
      const desc = document.getElementById('cs-left-desc');
      const badge = document.getElementById('cs-right-badge');
      const pointsCont = document.getElementById('cs-right-points');

      if (tag) {
        tag.className = id === 5 ? "px-2.5 py-0.5 rounded-full bg-surface-container text-income-positive font-label-sm text-label-sm font-bold uppercase" : "px-2.5 py-0.5 rounded-full bg-error-container text-expense-negative font-label-sm text-label-sm font-bold uppercase";
        tag.textContent = data.tag;
      }
      if (origin) origin.textContent = data.origin;
      if (body) body.innerHTML = `<p class="font-mono text-xs text-text-secondary pb-1">MESSAGE INSPECTION</p><p>${data.body}</p>`;
      if (desc) desc.textContent = data.desc;
      if (badge) badge.textContent = data.badge;

      if (pointsCont) {
        pointsCont.innerHTML = data.points.map(pt => `
          <div class="flex items-start gap-space-sm">
            <span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">verified</span>
            <div>
              <span class="font-label-md text-label-md text-on-surface font-semibold block">${pt.title}</span>
              <p class="font-caption text-caption text-text-secondary">${pt.text}</p>
            </div>
          </div>
        `).join('');
      }
    }

    for (let i = 1; i <= 5; i++) {
      const btn = document.getElementById(`cs-btn-${i}`);
      btn?.addEventListener('click', () => switchCaseStudy(i));
    }

    // Bind sample attack chips
    const sampleButtons = document.querySelectorAll('button:has(.material-symbols-outlined)');
    sampleButtons.forEach(btn => {
      const text = btn.innerText.toLowerCase();
      if (text.includes('kyc') || text.includes('pan')) {
        btn.addEventListener('click', () => {
          if (textarea) textarea.value = sampleLibrary.kyc;
          updateCharCounter();
        });
      } else if (text.includes('electricity') || text.includes('bill')) {
        btn.addEventListener('click', () => {
          if (textarea) textarea.value = sampleLibrary.upi;
          updateCharCounter();
        });
      } else if (text.includes('lottery') || text.includes('prize')) {
        btn.addEventListener('click', () => {
          if (textarea) textarea.value = sampleLibrary.stock;
          updateCharCounter();
        });
      } else if (text.includes('parcel') || text.includes('apk')) {
        btn.addEventListener('click', () => {
          if (textarea) textarea.value = sampleLibrary.postal;
          updateCharCounter();
        });
      }
    });

    return () => {
      textarea?.removeEventListener('input', updateCharCounter);
    };
  }, []);

  return (
    <>
<div className="flex flex-col w-full">
{/* Dynamic Sidebar Active State Correction via JS */}

{/* Screen Content Canvas */}
<div className="px-space-md sm:px-gutter-desktop py-space-xl space-y-space-xl max-w-7xl mx-auto w-full">
{/* PAGE TITLE & HERO INTELLIGENCE BAR */}
<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">
<div className="space-y-1">
<div className="flex items-center gap-space-sm">
<span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-surface-container text-primary">
<span className="material-symbols-outlined text-[20px]" style={{"fontVariationSettings":"'FILL' 1"}}>security</span>
</span>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold">Intelligent Defense Shield</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm font-semibold">Heuristic v4.2</span>
</div>
<h1 className="font-display text-display text-on-surface tracking-tight">Scam Detector</h1>
<p className="font-body-md text-body-md text-text-secondary max-w-3xl">
          Detect fraudulent financial messages, deceptive payment requests, suspicious phishing links, and social-engineering attempts targeting Indian banking and UPI users.
        </p>
</div>
{/* Quick Action Helpline Card */}
<div className="flex items-center gap-space-md self-start lg:self-center">
<a className="flex items-center gap-space-md p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all group" href="tel:1930">
<div className="w-10 h-10 rounded-lg bg-error-container text-error flex items-center justify-center group-hover:scale-105 transition-transform">
<span className="material-symbols-outlined text-[22px]">phone_in_talk</span>
</div>
<div className="flex flex-col pr-space-sm">
<div className="flex items-center gap-1.5">
<span className="font-label-sm text-label-sm text-expense-negative font-bold uppercase tracking-wider">Emergency Hotlink</span>
<span className="w-2 h-2 rounded-full bg-expense-negative animate-ping"></span>
</div>
<span className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight">Dial 1930</span>
<span className="font-caption text-caption text-text-secondary">cybercrime.gov.in</span>
</div>
</a>
</div>
</div>
{/* 1. TOP STATS / INTELLIGENCE HEADER METRICS */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
<div className="p-space-xl rounded-lg bg-surface-container-lowest shadow-sm flex flex-col justify-between space-y-space-md">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-text-secondary uppercase">Analyses Logged</span>
<div className="w-8 h-8 rounded-lg bg-surface-container-low text-primary flex items-center justify-center">
<span className="material-symbols-outlined text-[18px]">document_scanner</span>
</div>
</div>
<div>
<span className="font-metric-xl text-metric-xl text-on-surface">18</span>
<span className="font-label-sm text-label-sm text-text-secondary block">Last 30 Days Evaluated</span>
</div>
<div className="flex items-center gap-space-xs font-caption text-caption text-income-positive">
<span className="material-symbols-outlined text-[16px]">verified</span>
<span>100% heuristics synchronized</span>
</div>
</div>
<div className="p-space-xl rounded-lg bg-surface-container-lowest shadow-sm flex flex-col justify-between space-y-space-md">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-text-secondary uppercase">Threats Neutralized</span>
<div className="w-8 h-8 rounded-lg bg-error-container text-expense-negative flex items-center justify-center">
<span className="material-symbols-outlined text-[18px]">gpp_bad</span>
</div>
</div>
<div>
<span className="font-metric-xl text-metric-xl text-expense-negative">12</span>
<span className="font-label-sm text-label-sm text-text-secondary block">Dangerous Inbound Vectors</span>
</div>
<div className="flex items-center gap-space-xs">
<span className="px-2 py-0.5 rounded-full bg-error-container text-expense-negative font-label-sm text-label-sm font-semibold">66.7% Detection Rate</span>
</div>
</div>
<div className="p-space-xl rounded-lg bg-surface-container-lowest shadow-sm flex flex-col justify-between space-y-space-md">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-text-secondary uppercase">Financial Loss Incurred</span>
<div className="w-8 h-8 rounded-lg bg-surface-container-low text-income-positive flex items-center justify-center">
<span className="material-symbols-outlined text-[18px]">savings</span>
</div>
</div>
<div>
<span className="font-metric-xl text-metric-xl text-income-positive">₹0.00</span>
<span className="font-label-sm text-label-sm text-text-secondary block">Zero Capital Compromised</span>
</div>
<div className="flex items-center gap-space-xs font-caption text-caption text-income-positive">
<span className="material-symbols-outlined text-[16px]">lock</span>
<span>Protected by Early Heuristics</span>
</div>
</div>
<div className="p-space-xl rounded-lg bg-surface-container-lowest shadow-sm flex flex-col justify-between space-y-space-md">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-text-secondary uppercase">National Rapid Access</span>
<div className="w-8 h-8 rounded-lg bg-surface-container-low text-warning-alert flex items-center justify-center">
<span className="material-symbols-outlined text-[18px]">policy</span>
</div>
</div>
<div>
<span className="font-headline-lg text-headline-lg text-on-surface">1930 / Chakshu</span>
<span className="font-label-sm text-label-sm text-text-secondary block">MHA Cyber Portal Ready</span>
</div>
<div className="flex items-center gap-space-xs font-caption text-caption text-text-secondary">
<span className="material-symbols-outlined text-[16px]">timer</span>
<span>Golden Hour: Within 2 Hours</span>
</div>
</div>
</div>
{/* 2. SCAM ANALYSIS SUBMISSION PANEL (INTERACTIVE CARD) */}
<div className="rounded-lg bg-surface-container-lowest shadow-sm overflow-hidden">
{/* Input Type Tabs */}
<div className="bg-surface-container-low px-space-lg pt-space-md flex flex-wrap gap-space-xs">
<button className="flex items-center gap-space-xs px-space-lg py-2.5 rounded-t-lg bg-surface-container-lowest text-primary font-label-md text-label-md font-semibold transition-colors shadow-sm" id="tab-sms">
<span className="material-symbols-outlined text-[18px]">sms</span>
<span>Paste SMS / WhatsApp Message</span>
</button>
<button className="flex items-center gap-space-xs px-space-lg py-2.5 rounded-t-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container font-label-md text-label-md transition-colors" id="tab-upi">
<span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
<span>Analyze Payment / UPI Request</span>
</button>
<button className="flex items-center gap-space-xs px-space-lg py-2.5 rounded-t-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container font-label-md text-label-md transition-colors" id="tab-url">
<span className="material-symbols-outlined text-[18px]">link</span>
<span>Scan Website Link / URL</span>
</button>
<button className="flex items-center gap-space-xs px-space-lg py-2.5 rounded-t-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container font-label-md text-label-md transition-colors" id="tab-img">
<span className="material-symbols-outlined text-[18px]">image</span>
<span>Upload Screenshot / File</span>
</button>
</div>
{/* Main Input Canvas */}
<div className="p-space-xl space-y-space-lg">
{/* Quick Load Samples Pill Bar */}
<div className="space-y-space-xs">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-text-secondary uppercase">Quick Test Samples (Click to Load):</span>
<span className="font-caption text-caption text-text-secondary">Simulated Attack Vectors</span>
</div>
<div className="flex flex-wrap gap-2 pt-1">
<button className="sample-pill flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm transition-all hover:scale-[1.02]" onclick="loadSampleText('kyc')">
<span className="w-2 h-2 rounded-full bg-expense-negative"></span>
<span>Fake Bank KYC SMS</span>
</button>
<button className="sample-pill flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm transition-all hover:scale-[1.02]" onclick="loadSampleText('upi')">
<span className="w-2 h-2 rounded-full bg-expense-negative"></span>
<span>UPI Collect PIN Trap</span>
</button>
<button className="sample-pill flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm transition-all hover:scale-[1.02]" onclick="loadSampleText('postal')">
<span className="w-2 h-2 rounded-full bg-warning-alert"></span>
<span>India Post Parcel Delay</span>
</button>
<button className="sample-pill flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm transition-all hover:scale-[1.02]" onclick="loadSampleText('stock')">
<span className="w-2 h-2 rounded-full bg-expense-negative"></span>
<span>Guaranteed 40% Stock Tip</span>
</button>
<button className="sample-pill flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm transition-all hover:scale-[1.02]" onclick="loadSampleText('legit')">
<span className="w-2 h-2 rounded-full bg-income-positive"></span>
<span>Legitimate Bank Debit Alert</span>
</button>
</div>
</div>
{/* Textarea input */}
<div className="relative">
<textarea className="w-full p-4 rounded-lg bg-background-secondary font-body-md text-body-md text-on-surface placeholder:text-text-secondary focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/25 transition-all resize-y" id="scam-text-input" placeholder="Paste suspicious SMS, WhatsApp message, Telegram advice, or email text here... e.g. 'Dear Customer, your HDFC bank account will be blocked today due to pending PAN KYC. Click bit.ly/hdfc-kyc-update immediately'" rows="4">Dear Customer, your HDFC bank account will be blocked today due to pending PAN KYC update. Please verify immediately at http://bit.ly/hdfc-kyc-verify to avoid permanent deactivation of your NetBanking facilities.</textarea>
<div className="absolute bottom-3 right-3 flex items-center gap-2">
<span className="font-caption text-caption text-text-secondary bg-surface-container-lowest/80 px-2 py-0.5 rounded backdrop-blur" id="char-counter">226 chars</span>
</div>
</div>
{/* Action Bar & Privacy Shield Tag */}
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md pt-2">
{/* Privacy disclaimer */}
<div className="flex items-center gap-space-xs text-text-secondary max-w-xl">
<span className="material-symbols-outlined text-[18px] text-primary shrink-0">shield</span>
<p className="font-caption text-caption">
<strong className="text-on-surface font-medium">Privacy Shield:</strong> Personal phone numbers, account numbers, and names are auto-masked locally before heuristic analysis. Never paste actual OTPs, passwords, or ATM PINs.
            </p>
</div>
{/* Buttons */}
<div className="flex items-center gap-space-sm shrink-0">
<button className="px-space-md py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors" onclick="clearScamInput()" type="button">
              Clear Text
            </button>
<button className="flex items-center gap-space-xs px-space-lg py-2 rounded-lg bg-primary hover:bg-tertiary text-on-primary font-label-md text-label-md transition-all shadow-sm" onclick="triggerAnalysisAnimation()" type="button">
<span className="material-symbols-outlined text-[18px]" style={{"fontVariationSettings":"'FILL' 1"}}>verified_user</span>
<span>Analyze Message for Scam Patterns</span>
</button>
</div>
</div>
</div>
</div>
{/* 3. ACTIVE RISK ASSESSMENT RESULT */}
<div className="rounded-lg bg-surface-container-lowest shadow-sm overflow-hidden transition-all duration-300" id="risk-assessment-container">
{/* Top Banner Classification */}
<div className="bg-error-container/40 p-space-xl flex flex-col md:flex-row md:items-center justify-between gap-space-lg">
<div className="flex items-start sm:items-center gap-space-md">
<div className="w-12 h-12 rounded-xl bg-expense-negative text-surface-container-lowest flex items-center justify-center shrink-0 shadow-md">
<span className="material-symbols-outlined text-[28px]" style={{"fontVariationSettings":"'FILL' 1"}}>warning</span>
</div>
<div>
<div className="flex flex-wrap items-center gap-space-xs">
<span className="px-2.5 py-0.5 rounded-full bg-expense-negative text-surface-container-lowest font-label-sm text-label-sm font-bold uppercase tracking-wider">
                HIGH RISK
              </span>
<span className="font-headline-md text-headline-md text-expense-negative font-semibold">
                Severe Fraud Threat Detected
              </span>
</div>
<p className="font-label-md text-label-md text-on-surface font-medium mt-0.5">
              Classification: Urgent Impersonation &amp; Phishing (Bank KYC Threat)
            </p>
<p className="font-caption text-caption text-text-secondary mt-0.5 flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">schedule</span>
<span>Analyzed today at 11:42 AM • Evaluated against 42 Indian financial fraud heuristics</span>
</p>
</div>
</div>
{/* Visual Risk Score Gauge / Level */}
<div className="flex items-center gap-space-md bg-surface-container-lowest/80 p-space-md rounded-xl backdrop-blur-sm self-start md:self-auto shadow-sm">
<div className="relative w-16 h-16 flex items-center justify-center">
{/* Inline SVG Circular Gauge */}
<svg className="w-16 h-16 -rotate-90" viewbox="0 0 36 36">
<path className="text-surface-container" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5"></path>
<path className="text-expense-negative transition-all duration-1000 ease-out" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="94, 100" strokeLinecap="round" strokeWidth="3.5"></path>
</svg>
<div className="absolute inset-0 flex flex-col items-center justify-center text-center">
<span className="font-headline-sm text-headline-sm font-bold text-expense-negative leading-none">94</span>
<span className="font-caption text-[9px] text-text-secondary leading-none">/ 100</span>
</div>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-text-secondary uppercase">Threat Index</span>
<span className="font-label-md text-label-md text-expense-negative font-bold">Critical Danger</span>
<span className="font-caption text-[11px] text-text-secondary leading-tight">Indicative Heuristic Risk</span>
</div>
</div>
</div>
{/* Key Red Flags Breakdown (Visual Tagged Badges) */}
<div className="p-space-xl space-y-space-lg">
<div>
<span className="font-label-sm text-label-sm text-text-secondary uppercase tracking-wider block mb-space-sm">
            Detected Attack Mechanics (4 Structural Violations Identified)
          </span>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
<div className="p-space-md rounded-lg bg-surface-container-low flex flex-col space-y-1.5 shadow-sm">
<div className="flex items-center gap-space-xs text-expense-negative">
<span className="material-symbols-outlined text-[18px]">timer_off</span>
<span className="font-label-sm text-label-sm font-bold uppercase">Coercive Urgency</span>
</div>
<p className="font-caption text-caption text-on-surface">
                Threatens immediate deactivation within 24h (<em className="text-expense-negative font-medium">"blocked today"</em>) inducing artificial panic.
              </p>
</div>
<div className="p-space-md rounded-lg bg-surface-container-low flex flex-col space-y-1.5 shadow-sm">
<div className="flex items-center gap-space-xs text-expense-negative">
<span className="material-symbols-outlined text-[18px]">link_off</span>
<span className="font-label-sm text-label-sm font-bold uppercase">Deceptive Link</span>
</div>
<p className="font-caption text-caption text-on-surface">
                Uses generic URL shortener (<em className="text-expense-negative font-medium">bit.ly/hdfc-kyc-update</em>) masking an offshore phish server.
              </p>
</div>
<div className="p-space-md rounded-lg bg-surface-container-low flex flex-col space-y-1.5 shadow-sm">
<div className="flex items-center gap-space-xs text-warning-alert">
<span className="material-symbols-outlined text-[18px]">badge</span>
<span className="font-label-sm text-label-sm font-bold uppercase">Credential Harvesting</span>
</div>
<p className="font-caption text-caption text-on-surface">
                Requests unauthenticated submission of confidential PAN &amp; NetBanking passwords on an external domain.
              </p>
</div>
<div className="p-space-md rounded-lg bg-surface-container-low flex flex-col space-y-1.5 shadow-sm">
<div className="flex items-center gap-space-xs text-expense-negative">
<span className="material-symbols-outlined text-[18px]">phone_disabled</span>
<span className="font-label-sm text-label-sm font-bold uppercase">Sender Mask Mismatch</span>
</div>
<p className="font-caption text-caption text-on-surface">
                Originated from private 10-digit SIM (+91-98765-XXXXX) rather than TRAI verified bank header (e.g. <strong className="text-primary font-medium">VM-HDFCBK</strong>).
              </p>
</div>
</div>
</div>
{/* 4. SUSPICIOUS PHRASE INSPECTOR & EXPLAINER */}
<div className="p-space-lg rounded-xl bg-background-secondary space-y-space-md">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-text-secondary uppercase tracking-wider flex items-center gap-1.5">
<span className="material-symbols-outlined text-[16px] text-primary">search_insights</span>
<span>Suspicious Phrase Inspector &amp; Heuristic Context</span>
</span>
<span className="font-caption text-caption text-primary font-medium">Visual Tokenized Breakdown</span>
</div>
{/* Highlighted Text Display Box */}
<div className="p-space-lg rounded-lg bg-surface-container-lowest font-body-lg text-body-lg text-on-surface leading-relaxed shadow-sm">
            Dear Customer, your <span className="bg-error-container text-expense-negative px-2 py-0.5 rounded font-semibold inline-flex items-center gap-1"><span>account will be blocked today</span> <span className="text-xs">⚠️ [A]</span></span> due to pending <span className="bg-error-container text-expense-negative px-2 py-0.5 rounded font-semibold inline-flex items-center gap-1"><span>PAN KYC update</span> <span className="text-xs">⚠️ [B]</span></span>. Please verify immediately at <span className="bg-error-container text-expense-negative px-2 py-0.5 rounded font-semibold underline decoration-dashed inline-flex items-center gap-1"><span>http://bit.ly/hdfc-kyc-verify</span> <span className="text-xs">⚠️ [C]</span></span> to avoid permanent deactivation of your NetBanking facilities.
          </div>
{/* Explanations breakdown side by side */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-md pt-space-xs">
<div className="p-space-md rounded-lg bg-surface-container-lowest space-y-1">
<div className="flex items-center gap-1 text-expense-negative font-label-sm text-label-sm font-semibold">
<span>[A] "account will be blocked today"</span>
</div>
<p className="font-caption text-caption text-text-secondary leading-normal">
                Psychological pressure tactic inducing panic so victims bypass critical judgment and skip independent bank verification.
              </p>
</div>
<div className="p-space-md rounded-lg bg-surface-container-lowest space-y-1">
<div className="flex items-center gap-1 text-expense-negative font-label-sm text-label-sm font-semibold">
<span>[B] "PAN KYC update"</span>
</div>
<p className="font-caption text-caption text-text-secondary leading-normal">
                RBI strictly mandates Indian scheduled banks <strong>NEVER</strong> solicit KYC document submission via unsolicited SMS links or sideloaded APKs.
              </p>
</div>
<div className="p-space-md rounded-lg bg-surface-container-lowest space-y-1">
<div className="flex items-center gap-1 text-expense-negative font-label-sm text-label-sm font-semibold">
<span>[C] "bit.ly/hdfc-kyc-verify"</span>
</div>
<p className="font-caption text-caption text-text-secondary leading-normal">
                Legitimate Indian scheduled commercial banks never use generic URL shorteners. Official domains end strictly in <code className="text-on-surface font-semibold">hdfcbank.com</code>.
              </p>
</div>
</div>
</div>
{/* 5. ACTIONABLE NEXT STEPS & IMMEDIATE DEFENSE */}
<div className="space-y-space-md">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<span className="w-2.5 h-2.5 rounded-full bg-expense-negative"></span>
<h2 className="font-headline-sm text-headline-sm text-on-surface">Urgent Prescribed Actions &amp; Immediate Defense</h2>
</div>
<span className="font-label-sm text-label-sm text-text-secondary">Execute Steps in Sequence</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-5 gap-space-md">
<div className="p-space-md rounded-lg bg-surface-container-low flex flex-col justify-between space-y-2">
<div className="flex items-center gap-2">
<span className="w-6 h-6 rounded-full bg-expense-negative text-surface-container-lowest font-label-sm text-label-sm flex items-center justify-center font-bold">1</span>
<span className="font-label-sm text-label-sm font-bold text-on-surface uppercase">Do Not Click</span>
</div>
<p className="font-caption text-caption text-text-secondary">
                Never tap the shortlink or forward this SMS to WhatsApp contacts or family groups.
              </p>
<div className="text-expense-negative flex items-center gap-1 font-caption text-[11px] font-semibold">
<span className="material-symbols-outlined text-[14px]">block</span> Zero interaction
              </div>
</div>
<div className="p-space-md rounded-lg bg-surface-container-low flex flex-col justify-between space-y-2">
<div className="flex items-center gap-2">
<span className="w-6 h-6 rounded-full bg-expense-negative text-surface-container-lowest font-label-sm text-label-sm flex items-center justify-center font-bold">2</span>
<span className="font-label-sm text-label-sm font-bold text-on-surface uppercase">PIN Safeguard</span>
</div>
<p className="font-caption text-caption text-text-secondary">
                Remember: UPI PIN is strictly for <strong>DEBITING</strong> funds, never for receiving rewards or verifying KYC.
              </p>
<div className="text-expense-negative flex items-center gap-1 font-caption text-[11px] font-semibold">
<span className="material-symbols-outlined text-[14px]">password</span> Never input PIN
              </div>
</div>
<div className="p-space-md rounded-lg bg-surface-container-low flex flex-col justify-between space-y-2">
<div className="flex items-center gap-2">
<span className="w-6 h-6 rounded-full bg-primary text-surface-container-lowest font-label-sm text-label-sm flex items-center justify-center font-bold">3</span>
<span className="font-label-sm text-label-sm font-bold text-on-surface uppercase">Bank Verification</span>
</div>
<p className="font-caption text-caption text-text-secondary">
                Dial official HDFC helpline: <strong className="text-on-surface">1800-202-6161</strong> or log into your verified mobile app.
              </p>
<div className="text-primary flex items-center gap-1 font-caption text-[11px] font-semibold">
<span className="material-symbols-outlined text-[14px]">call</span> Official channels
              </div>
</div>
<div className="p-space-md rounded-lg bg-surface-container-low flex flex-col justify-between space-y-2">
<div className="flex items-center gap-2">
<span className="w-6 h-6 rounded-full bg-expense-negative text-surface-container-lowest font-label-sm text-label-sm flex items-center justify-center font-bold">4</span>
<span className="font-label-sm text-label-sm font-bold text-on-surface uppercase">Dial 1930</span>
</div>
<p className="font-caption text-caption text-text-secondary">
                If already compromised, report on <strong className="text-on-surface">cybercrime.gov.in</strong> or call 1930 within the 2-Hour Golden Window.
              </p>
<div className="text-expense-negative flex items-center gap-1 font-caption text-[11px] font-semibold">
<span className="material-symbols-outlined text-[14px]">local_police</span> Stop fund routing
              </div>
</div>
<div className="p-space-md rounded-lg bg-surface-container-low flex flex-col justify-between space-y-2">
<div className="flex items-center gap-2">
<span className="w-6 h-6 rounded-full bg-warning-alert text-surface-container-lowest font-label-sm text-label-sm flex items-center justify-center font-bold">5</span>
<span className="font-label-sm text-label-sm font-bold text-on-surface uppercase">Chakshu Portal</span>
</div>
<p className="font-caption text-caption text-text-secondary">
                Report sender number on DoT Sanchar Saathi (<strong className="text-on-surface">sancharsaathi.gov.in</strong>) to ban SIM globally.
              </p>
<div className="text-warning-alert flex items-center gap-1 font-caption text-[11px] font-semibold">
<span className="material-symbols-outlined text-[14px]">cell_tower</span> Blacklist number
              </div>
</div>
</div>
{/* Bottom Action Buttons in result card */}
<div className="flex flex-wrap items-center justify-between gap-space-md pt-2">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[16px] text-income-positive">check_circle</span>
<span className="font-caption text-caption text-text-secondary">Heuristic fingerprint cached in your local defensive database</span>
</div>
<div className="flex flex-wrap items-center gap-space-sm">
<button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors" onclick="copyFraudReport()">
<span className="material-symbols-outlined text-[18px]">content_copy</span>
<span id="copy-btn-label">Copy Fraud Report Summary</span>
</button>
<a className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-expense-negative hover:opacity-95 text-surface-container-lowest font-label-md text-label-md transition-all shadow-sm" href="https://cybercrime.gov.in" rel="noopener noreferrer" target="_blank">
<span className="material-symbols-outlined text-[18px]">open_in_new</span>
<span>Report to National Portal (1930)</span>
</a>
<button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-text-secondary font-label-md text-label-md transition-colors" onclick="dismissAlert()">
<span>Mark as False Alarm</span>
</button>
</div>
</div>
</div>
</div>
</div>
{/* 7. INTERACTIVE SAMPLE DEMONSTRATIONS TABS (FRAUD VS LEGIT ANATOMY) */}
<div className="rounded-lg bg-surface-container-lowest shadow-sm overflow-hidden p-space-xl space-y-space-lg">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
<div>
<span className="font-label-sm text-label-sm text-primary uppercase font-semibold tracking-wider">Educational Anatomy Sandbox</span>
<h2 className="font-headline-md text-headline-md text-on-surface mt-0.5">Learn How Indian Cyber Fraud Mechanics Operate</h2>
</div>
<span className="font-caption text-caption text-text-secondary">Compare Frauds vs Official Bank Formats</span>
</div>
{/* Demonstration Nav Pills */}
<div className="flex flex-wrap gap-2 overflow-x-auto pb-1" id="case-study-nav">
<button className="px-3.5 py-1.5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-semibold transition-all" id="cs-btn-1" onclick="switchCaseStudy(1)">
          1. Bank KYC Smishing
        </button>
<button className="px-3.5 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm transition-all" id="cs-btn-2" onclick="switchCaseStudy(2)">
          2. UPI PIN Trap
        </button>
<button className="px-3.5 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm transition-all" id="cs-btn-3" onclick="switchCaseStudy(3)">
          3. India Post APK Scam
        </button>
<button className="px-3.5 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm transition-all" id="cs-btn-4" onclick="switchCaseStudy(4)">
          4. WhatsApp Stock Group
        </button>
<button className="px-3.5 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm transition-all" id="cs-btn-5" onclick="switchCaseStudy(5)">
          5. Legitimate Bank SMS Anatomy
        </button>
</div>
{/* Interactive Comparison Content Container */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg pt-space-xs" id="case-study-content">
{/* Left: Sample View Simulation */}
<div className="p-space-lg rounded-xl bg-background-secondary space-y-space-md flex flex-col justify-between">
<div className="space-y-space-sm">
<div className="flex items-center justify-between">
<span className="px-2.5 py-0.5 rounded-full bg-error-container text-expense-negative font-label-sm text-label-sm font-bold uppercase" id="cs-left-tag">
                FRAUD SMS PREVIEW
              </span>
<span className="font-caption text-caption text-text-secondary font-mono" id="cs-left-origin">From: +91 93112 04821</span>
</div>
<div className="p-space-md rounded-lg bg-surface-container-lowest font-body-md text-body-md text-on-surface space-y-2 shadow-sm" id="cs-left-body">
<p className="font-mono text-xs text-text-secondary pb-1">SMS RECEIVED TODAY 10:14 AM</p>
<p>“Dear Customer, Your SBI Bank account will be terminated today due to non-updation of PAN Card. Kindly update your PAN immediately by visiting: <span className="text-primary underline">http://sbi-pan-kyc.in/portal</span> to resume online services.”</p>
</div>
</div>
<div className="p-space-sm rounded-lg bg-surface-container-low space-y-1">
<span className="font-label-sm text-label-sm text-expense-negative font-semibold flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">dangerous</span> Trap Identified:
            </span>
<p className="font-caption text-caption text-text-secondary" id="cs-left-desc">
              Banks will never threaten single-day termination over SMS. Also note the fake generic domain "sbi-pan-kyc.in" rather than the authorized onlinesbi.sbi portal.
            </p>
</div>
</div>
{/* Right: Diagnostic Rule Explanations */}
<div className="p-space-lg rounded-xl bg-surface-container-low space-y-space-md flex flex-col justify-between">
<div className="space-y-space-sm">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">Defensive Rules &amp; RBI Safeguards</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm" id="cs-right-badge">RBI Circular 2024</span>
</div>
<div className="space-y-space-sm" id="cs-right-points">
<div className="flex items-start gap-space-sm">
<span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">verified</span>
<div>
<span className="font-label-md text-label-md text-on-surface font-semibold block">TRAI Telecommunications Standard</span>
<p className="font-caption text-caption text-text-secondary">All legitimate Indian banking messages use 6-character registered alphanumeric sender IDs like VM-SBIINB or AX-HDFCBK. Never personal numbers.</p>
</div>
</div>
<div className="flex items-start gap-space-sm">
<span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">verified</span>
<div>
<span className="font-label-md text-label-md text-on-surface font-semibold block">KYC Updation Norms</span>
<p className="font-caption text-caption text-text-secondary">Banks provide at least 30 to 90 days of written and registered email notice before classifying accounts as inoperative. Immediate freeze threats are always fraud.</p>
</div>
</div>
<div className="flex items-start gap-space-sm">
<span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">verified</span>
<div>
<span className="font-label-md text-label-md text-on-surface font-semibold block">Domain Verification Protocol</span>
<p className="font-caption text-caption text-text-secondary">Official Indian banking websites always possess green EV SSL certificates and resolve strictly to certified corporate subdomains.</p>
</div>
</div>
</div>
</div>
<div className="pt-2 flex items-center justify-between text-caption font-caption text-text-secondary">
<span>Simulated with Indian Banking Protocol Datasets</span>
<span className="text-primary font-semibold">Self-Training Module</span>
</div>
</div>
</div>
</div>
{/* 6. ANALYSIS HISTORY & RECENT SCANS (CARD GRID & LEDGER) */}
<div className="rounded-lg bg-surface-container-lowest shadow-sm overflow-hidden p-space-xl space-y-space-lg">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
<div>
<span className="font-label-sm text-label-sm text-text-secondary uppercase">Defensive Ledger</span>
<h2 className="font-headline-md text-headline-md text-on-surface mt-0.5">Recent Inbound Threat Analyses</h2>
</div>
<div className="flex items-center gap-space-xs">
<span className="font-caption text-caption text-text-secondary">Auto-sync with Device SMS Clip</span>
<span className="w-2 h-2 rounded-full bg-income-positive"></span>
</div>
</div>
{/* Ledger Table */}
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low text-text-secondary font-label-sm text-label-sm uppercase tracking-wider">
<th className="py-3 px-4 rounded-l-lg font-semibold">Incident / Message Excerpt</th>
<th className="py-3 px-4 font-semibold">Vector Type</th>
<th className="py-3 px-4 font-semibold">Threat Level</th>
<th className="py-3 px-4 font-semibold">Logged Timestamp</th>
<th className="py-3 px-4 rounded-r-lg font-semibold text-right">Interactive Action</th>
</tr>
</thead>
<tbody className="divide-y divide-border-subtle font-body-md text-body-md">
{/* Row 1 */}
<tr className="hover:bg-surface-container-low transition-colors group">
<td className="py-3.5 px-4 font-medium text-on-surface max-w-sm truncate">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-expense-negative">currency_rupee</span>
<span className="truncate">UPI Collect Request ₹14,500 'Refund from Electricity Dept'</span>
</div>
</td>
<td className="py-3.5 px-4 text-text-secondary">
<span className="px-2 py-0.5 rounded bg-surface-container-low text-on-surface font-label-sm text-label-sm">UPI PIN Trap</span>
</td>
<td className="py-3.5 px-4">
<span className="px-2 py-0.5 rounded-full bg-error-container text-expense-negative font-label-sm text-label-sm font-semibold inline-flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-expense-negative"></span>
                  High Risk (96/100)
                </span>
</td>
<td className="py-3.5 px-4 text-text-secondary font-caption text-caption">Today, 09:15 AM</td>
<td className="py-3.5 px-4 text-right">
<button className="px-3 py-1 rounded bg-surface-container text-primary hover:bg-primary hover:text-on-primary font-label-sm text-label-sm transition-colors" onclick="reinspectSample('upi')">
                  Re-inspect
                </button>
</td>
</tr>
{/* Row 2 */}
<tr className="hover:bg-surface-container-low transition-colors group">
<td className="py-3.5 px-4 font-medium text-on-surface max-w-sm truncate">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-expense-negative">local_shipping</span>
<span className="truncate">India Post: Consignment arrived at sorting hub, address missing pay ₹25</span>
</div>
</td>
<td className="py-3.5 px-4 text-text-secondary">
<span className="px-2 py-0.5 rounded bg-surface-container-low text-on-surface font-label-sm text-label-sm">Malicious APK Smishing</span>
</td>
<td className="py-3.5 px-4">
<span className="px-2 py-0.5 rounded-full bg-error-container text-expense-negative font-label-sm text-label-sm font-semibold inline-flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-expense-negative"></span>
                  High Risk (91/100)
                </span>
</td>
<td className="py-3.5 px-4 text-text-secondary font-caption text-caption">Nov 06, 2026</td>
<td className="py-3.5 px-4 text-right">
<button className="px-3 py-1 rounded bg-surface-container text-primary hover:bg-primary hover:text-on-primary font-label-sm text-label-sm transition-colors" onclick="reinspectSample('postal')">
                  Re-inspect
                </button>
</td>
</tr>
{/* Row 3 */}
<tr className="hover:bg-surface-container-low transition-colors group">
<td className="py-3.5 px-4 font-medium text-on-surface max-w-sm truncate">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-expense-negative">trending_up</span>
<span className="truncate">Motilal Oswal Insider VIP WhatsApp Group: 300% Monthly Returns</span>
</div>
</td>
<td className="py-3.5 px-4 text-text-secondary">
<span className="px-2 py-0.5 rounded bg-surface-container-low text-on-surface font-label-sm text-label-sm">Pig Butchering / Task Fraud</span>
</td>
<td className="py-3.5 px-4">
<span className="px-2 py-0.5 rounded-full bg-error-container text-expense-negative font-label-sm text-label-sm font-semibold inline-flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-expense-negative"></span>
                  High Risk (98/100)
                </span>
</td>
<td className="py-3.5 px-4 text-text-secondary font-caption text-caption">Nov 04, 2026</td>
<td className="py-3.5 px-4 text-right">
<button className="px-3 py-1 rounded bg-surface-container text-primary hover:bg-primary hover:text-on-primary font-label-sm text-label-sm transition-colors" onclick="reinspectSample('stock')">
                  Re-inspect
                </button>
</td>
</tr>
{/* Row 4 */}
<tr className="hover:bg-surface-container-low transition-colors group">
<td className="py-3.5 px-4 font-medium text-on-surface max-w-sm truncate">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-income-positive">bolt</span>
<span className="truncate">HDFC Bank Alert: ₹2,449 debited via NACH to BESCOM Power</span>
</div>
</td>
<td className="py-3.5 px-4 text-text-secondary">
<span className="px-2 py-0.5 rounded bg-surface-container-low text-on-surface font-label-sm text-label-sm">Official Bank SMS</span>
</td>
<td className="py-3.5 px-4">
<span className="px-2 py-0.5 rounded-full bg-surface-container text-income-positive font-label-sm text-label-sm font-semibold inline-flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-income-positive"></span>
                  No Obvious Threat (04/100)
                </span>
</td>
<td className="py-3.5 px-4 text-text-secondary font-caption text-caption">Nov 03, 2026</td>
<td className="py-3.5 px-4 text-right">
<button className="px-3 py-1 rounded bg-surface-container text-primary hover:bg-primary hover:text-on-primary font-label-sm text-label-sm transition-colors" onclick="reinspectSample('legit')">
                  Re-inspect
                </button>
</td>
</tr>
{/* Row 5 */}
<tr className="hover:bg-surface-container-low transition-colors group">
<td className="py-3.5 px-4 font-medium text-on-surface max-w-sm truncate">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-warning-alert">credit_card</span>
<span className="truncate">Axis Bank Credit Card Limit Enhancement Offer via TinyURL</span>
</div>
</td>
<td className="py-3.5 px-4 text-text-secondary">
<span className="px-2 py-0.5 rounded bg-surface-container-low text-on-surface font-label-sm text-label-sm">Unverified Shortlink</span>
</td>
<td className="py-3.5 px-4">
<span className="px-2 py-0.5 rounded-full bg-surface-container text-warning-alert font-label-sm text-label-sm font-semibold inline-flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-warning-alert"></span>
                  Suspicious (62/100)
                </span>
</td>
<td className="py-3.5 px-4 text-text-secondary font-caption text-caption">Oct 30, 2026</td>
<td className="py-3.5 px-4 text-right">
<button className="px-3 py-1 rounded bg-surface-container text-primary hover:bg-primary hover:text-on-primary font-label-sm text-label-sm transition-colors" onclick="loadSampleText('kyc')">
                  Re-inspect
                </button>
</td>
</tr>
</tbody>
</table>
</div>
</div>
{/* 8. TRUST, REGULATORY & CYBER SAFETY DISCLAIMER FOOTER */}
<div className="p-space-lg rounded-lg bg-surface-container-low shadow-sm flex items-start gap-space-md">
<div className="w-8 h-8 rounded-lg bg-surface-container text-primary flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[20px]">shield_with_heart</span>
</div>
<div className="space-y-1">
<span className="font-label-sm text-label-sm text-on-surface font-semibold uppercase tracking-wider block">
          Trust, Regulatory &amp; Indian Financial Cyber Safety Notice
        </span>
<p className="font-caption text-caption text-text-secondary leading-relaxed">
          MoneyMentor AI Scam Detector operates using pattern matching and rule-based heuristic indicators developed against prevalent Indian financial frauds (UPI frauds, SIM swap warnings, KYC smishing). It does not guarantee authenticity or absence of risk. MoneyMentor never requests, stores, or processes complete debit/credit card CVVs, NetBanking passwords, or UPI PINs. If you suspect funds have been debited without authorization, immediately block your cards via your bank's official app and dial <strong>1930</strong> within the Golden Hour.
        </p>
</div>
</div>
</div>
{/* Vanilla Interaction Logic */}

</div>
    </>
  );
}
