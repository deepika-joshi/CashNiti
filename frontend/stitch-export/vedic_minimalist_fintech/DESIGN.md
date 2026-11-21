---
name: Vedic Minimalist FinTech
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#434655'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#747686'
  outline-variant: '#c4c5d7'
  surface-tint: '#2151da'
  primary: '#0037b0'
  on-primary: '#ffffff'
  primary-container: '#1d4ed8'
  on-primary-container: '#cad3ff'
  inverse-primary: '#b7c4ff'
  secondary: '#855300'
  on-secondary: '#ffffff'
  secondary-container: '#fea619'
  on-secondary-container: '#684000'
  tertiary: '#2c2abc'
  on-tertiary: '#ffffff'
  tertiary-container: '#4648d4'
  on-tertiary-container: '#d1d1ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b7c4ff'
  on-primary-fixed: '#001551'
  on-primary-fixed-variant: '#0039b5'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#e1e0ff'
  tertiary-fixed-dim: '#c0c1ff'
  on-tertiary-fixed: '#07006c'
  on-tertiary-fixed-variant: '#2f2ebe'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.025em
  display-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: -0.005em
  metric-xl:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.02em
  metric-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
  body-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.02em
  caption:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
  space-2xl: 2rem
---

## Brand & Style

This design system establishes a high-trust, pristine financial environment built specifically for the Indian financial ecosystem. It balances rigorous institutional credibility with modern agility, catering to ambitious earners, young professionals, and families managing diverse portfolios—spanning UPI micro-transactions, domestic equity SIPs, sovereign gold bonds, and fixed deposits.

The aesthetic follows an ultra-clean **Modern Functional Minimalist** direction:
- **Zero Visual Noise:** Every pixel, boundary, and label serves a distinct cognitive purpose. Financial data is inherently complex; the interface strips away ornamental gradients, aggressive brand patterns, and unnecessary visual density to lower cognitive load.
- **Institutional Clarity & Security:** Inspired by contemporary civic and institutional systems, the interface employs strict structural alignment, pure light surfaces, crisp slate typographic hierarchy, and crisp 1px neutral framing.
- **Targeted Warmth:** High-energy financial alerts and milestone markers utilize warm amber and sunlit gold accents, delivering encouragement without trivializing wealth management.
- **Cultural FinTech Literacy:** The interface natively honors Indian numbering systems (Lakhs, Crores, ₹ formatting) and local payment mechanisms (UPI, IMPS, NEFT, RuPay).

## Colors

The palette is engineered to achieve strict WCAG AA contrast across all data visualization states, inputs, and text hierarchies.

### Brand & Surface Roles
- **Canvas / Ground (`#F8FAFC` to `#F1F5F9`):** Subtly cool off-white that prevents screen glare and defines clear contrast against foreground modules.
- **Surface Pure (`#FFFFFF`):** High-clarity white for cards, panels, and transactional containers.
- **Primary Accent (`#1D4ED8`):** Deep Royal Blue representing institutional safety, primary calls-to-action, active navigation states, and confirmed states.
- **Secondary Accent (`#F59E0B`):** Warm Amber/Gold for critical milestones, high-yield badges, pending verifications, and financial goal progress markers.
- **Tertiary Accent (`#6366F1`):** Indigo/Iris reserved strictly for long-term investments, Systematic Investment Plans (SIPs), and wealth-compounding analytics.

### Functional & Semantic Roles
- **Credit / Positive Yield (`#10B981`):** Inflows, investment returns, salary credits, and surplus budgets.
- **Debit / Expense / Overrun (`#EF4444`):** Outflows, bill settlements, deficit warnings, and debt alerts.
- **Neutral Outlines (`#E2E8F0`):** Hairline structure for data tables, input borders, and card perimeters.
- **Text Primary (`#0F172A`):** High-density slate for values, primary metrics, and headlines.
- **Text Secondary (`#64748B`):** Cool slate for descriptive context, timestamps, labels, and table metadata.

## Typography

The type system prioritizes mechanical legibility and tabular synchronization:
- **OpenType Feature Activation:** All numerical values, ledger columns, and financial amounts must enforce `font-feature-settings: "tnum" 1, "cv05" 1` (tabular numbers with accessible punctuation). This prevents jumping columns during dynamic calculations.
- **Indian Rupee Standard:** The currency symbol `₹` precedes numbers with zero whitespace (e.g., `₹12,48,500.00`). In metric cards, the currency glyph takes a semi-bold weight matching the numerical integer.
- **Hierarchical Discipline:** Data values rely on weight variations (`600` and `700`) rather than sheer scale. Section headers stay within 18px–22px to prioritize dashboard density over editorial sprawls.

## Layout & Spacing

The layout is structured around an uncompromising 4px spatial baseline (4px, 8px, 12px, 16px, 24px, 32px) maintaining alignment across desktop dashboards and mobile viewport heights:

- **Desktop (1280px+):** Fixed 260px collapsible sidebar with a fluid 12-column content area, bounded at 1440px maximum content width. Gaps use `gutter-desktop` (24px) with canvas margins of `margin-desktop` (32px).
- **Tablet (768px - 1023px):** 8-column layout. Sidebar transitions into a condensed icon rail (72px) or dismissible drawer. Spacing shifts to 16px gutters and 24px canvas margins.
- **Mobile (<767px):** Single-column stacked stream with an app-style fixed bottom navigation tab bar. Screen padding uses `margin` (16px), keeping touch-critical action targets minimum 44px in height.

## Elevation & Depth

Visual separation relies on clean borders coupled with featherlight ambient drop shadows, eliminating murky layered visuals:

- **Level 0 (Flat Ground):** Canvas background (`#F8FAFC`), input fields in resting state, table cell backgrounds.
- **Level 1 (Card & Module Deck):** Applied to summary metric cards, transaction blocks, and secondary toolbars. Uses `0px 1px 3px rgba(15, 23, 42, 0.05), 0px 1px 2px rgba(15, 23, 42, 0.03)` with a precise `1px solid #E2E8F0` border.
- **Level 2 (Hover & Floating Elements):** Applied to active dropdown menus, interactive card hovers, and date-range pickers. Uses `0px 4px 6px -1px rgba(15, 23, 42, 0.07), 0px 2px 4px -2px rgba(15, 23, 42, 0.04)`.
- **Level 3 (Modal Dialogs & Critical Sheets):** Elevated centered modal dialogs and bottom sheets. Employs `0px 20px 25px -5px rgba(15, 23, 42, 0.08), 0px 8px 10px -6px rgba(15, 23, 42, 0.03)` with an underlying `backdrop-blur-sm` over `rgba(15, 23, 42, 0.4)`.

## Shapes

The design uses geometric rounded corners to convey modern approachability while preserving structured, data-first composure:

- **Base Radii (8px / `rounded`):** Standard for buttons, text input fields, payment method selector pills, and dropdown rows.
- **Container Radii (12px to 16px / `rounded-lg` & `rounded-xl`):** Financial summary cards, KPI blocks, chart wrappers, and modal windows.
- **Pill Radii (Full Rounded / `9999px`):** Status indicators, categorized transaction tags (UPI, NEFT), trend badges (`+14.2%`), and quick-filter category chips.

## Components

### Buttons
- **Primary:** Solid `#1D4ED8` background, `#FFFFFF` text, `font-weight: 500`. Hover state deepens to `#1E40AF`. Active ring: `focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-1`.
- **Secondary / Outline:** Background `#FFFFFF`, border `1px solid #E2E8F0`, text `#0F172A`. Hover: `#F8FAFC` background and `#CBD5E1` border.
- **Destructive:** Light crimson background `#FEF2F2`, border `1px solid #FCA5A5`, text `#DC2626`. Hover shifts to `#EF4444` solid with white text.

### KPI & Financial Summary Cards
- White background (`#FFFFFF`), `1px solid #E2E8F0`, rounded at 14px (`rounded-xl`).
- Padding: 20px (`space-xl` equivalent).
- Top row: Metric label in `label-sm` (`#64748B`) paired with a contextual soft-tinted icon container (32x32px, 8px rounded).
- Value row: Main integer in `metric-xl` (`#0F172A`) formatted with Lakhs/Crores commas (`₹4,82,300`).
- Bottom row: Comparison trend badge. A pill with green `#ECFDF5` background / `#065F46` text for positive movement, or crimson `#FEF2F2` / `#991B1B` for expense spikes, accompanied by small directional micro-arrows (`↑` / `↓`).

### Form Inputs & Monetary Fields
- Border: `1px solid #CBD5E1`, resting background `#FFFFFF`, height 42px.
- Left-addon affix: Fixed `₹` symbol in `#64748B`, solidifying currency input semantics.
- Focus state: Border shifts to `#1D4ED8` with a subtle outer spread ring `box-shadow: 0 0 0 3px rgba(29, 78, 216, 0.12)`.
- Number formatting: Automatically comma-separates Indian monetary numbering as the user types (e.g., `1,00,000`).

### Transaction Ledger Table
- Headers: Clean uppercase `label-sm` in `#64748B` across an alternating `#F8FAFC` header rail.
- Rows: Height 56px, bordered bottom with `1px solid #F1F5F9`. Hover state switches to `#F8FAFC` background.
- Columns: Date/Timestamp, Merchant Entity (with a 36px icon bubble), Payment Channel Badge (UPI in `#EEF2FF` pill, CC in `#F3F4F6`), and Final Amount. Inflow amounts carry green prefix `+₹`, expenses take neutral dark `-₹`.

### Data Visualizations & Charts
- **Area Charts:** Clean single or dual spline strokes (2px `#1D4ED8`) with a vertical linear gradient fill fading down to `rgba(29, 78, 216, 0.0)`. Tooltips are pure white with Level 2 elevation and crisp values.
- **Category Donut:** High-contrast, non-competing semantic segments (Food: `#F59E0B`, Housing: `#1D4ED8`, Investments: `#6366F1`, Healthcare: `#10B981`, Misc: `#94A3B8`). Inner cutout displays total monthly spend aggregate.

### Notifications & Modals
- **Alert Ribbons:** Bordered alerts featuring an amber left edge marker (`4px solid #F59E0B`), warm background (`#FFFBEB`), and concise actionable microcopy for upcoming bill dates and tax-saving deadlines.
- **Modal Dialogs:** Centered overlays with `rounded-2xl`, structured into a fixed title bar, scrollable body area, and an explicit dual-action footer (Cancel secondary, Commit primary).