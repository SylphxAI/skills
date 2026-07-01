# Price-Increase Retention Program: Decision Framework

## 1. Guiding Principles
- **One-way door principle**: Save offers are framed as *transitional accommodation*, not a baseline. Every offer has an expiry and an annual attachment condition.
- **Earned generosity**: Discounts scale with tenure, usage, and signal strength — not with threat intensity.
- **Margin floor**: No offer below a hard unit-economics floor (e.g., contribution margin ≥ 60% of current). Finance owns this veto.
- **Annual over monthly**: Default the renewal conversation to annual; monthly remains a friction-laden exception.

## 2. Cohort Treatment Matrix

| Cohort | Monthly $12→$18 Action | Save Offer (if triggered) | Annual Migration Lever |
|---|---|---|---|
| **Power users** (high usage, >6mo) | Move to $18 on schedule | None standard; loyalty bump = 1mo free at annual lock-in | 10% annual discount + price-lock guarantee 24mo |
| **Low-usage users** | $18 + usage coaching | $14 lock for 6mo if usage ↑20% in 60 days | Annual $144 ($12/mo equiv) — *beat the increase* |
| **Students / Nonprofits** | Hold $12 with verified status | Continue existing tier; no change | Annual $115 (verified discount) |
| **Existing coupon users** | Honor coupon to expiry; new terms on renewal | Coupon converts to one of: (a) annual lock at $14/mo, (b) 2mo free on annual | Same — coupon → annual sweetener |
| **Cancellation intent** (downgrade clicks, NPS ≤6) | Offer routes to save flow *only if* ≥2 risk signals | Save ladder below | Annual at legacy $14/mo, 12mo fixed |
| **Recent support contact** (last 30 days) | Delay price change until ticket closed + 30d | Resolution credit (1mo) — not price cut | Standard annual offer + waive first month |

## 3. Save Offer Ladder (Margin-Protected)

Apply **only** when ≥2 of: cancellation click, NPS ≤6, usage drop >30% in 60d, support complaint about price.

| Step | Offer | Eligibility | Expiry | Floor Check |
|---|---|---|---|---|
| **L1 — Stay Discount** | $15/mo for 12mo, annual prepay required | ≥12mo tenure OR ≥3 risk signals | 7 days | CM ≥ 60% |
| **L2 — Legacy Lock** | $14/mo for 12mo annual | ≥24mo tenure AND ≥3 risk signals | 7 days | CM ≥ 55% |
| **L3 — Pause** | 60-day freeze, no charge, keep data | All cohorts, max 1× per 24mo | 14 days | $0 cost |
| **L4 — Downgrade** | Move to cheaper tier (if exists) | All | None | Margin preserved by plan |

**Hard caps**: One save offer per account per 18 months. L2 requires VP approval. L1–L4 ineligible if account used coupon in prior 12mo.

## 4. Annual Migration Mechanics (Default Path)

- **In-app**: Renewal page shows annual default at $172/yr ($14.33/mo) vs. $216/yr monthly — framed as a *win*, not a fallback.
- **Price-lock guarantee**: Annual payers locked at $172 for 24 months; future increases apply only on monthly.
- **Switch bonus**: Mid-term switch from monthly → annual grants 1 month free, applied at renewal.
- **Communication**: 60-day notice email + in-app card; tone is *appreciation + roadmap*, not apology.

## 5. Anti-Gaming Controls (Finance's Concern)

| Risk | Control |
|---|---|
| User threatens churn to extract discount | Save ladder requires ≥2 *objective* risk signals (not a cancellation click alone). Click-only = L1 only, not L2. |
| Repeat churn-then-return cycles | 18-month cool-down on save offers; reactivation within 60 days forfeits prior L1/L2 |
| Coupon stacking | Coupon → save offer exclusion rule (Section 3 caps) |
| Margin leakage | Finance-approved unit floor; weekly leakage report by cohort; auto-alert if >2% of accounts receive L1/L2 |
| Support theater (fake tickets to win credits) | Resolution credits issued only for *substantive* tickets (category ≠ billing complaint about increase) |
| Cohort bleed | Cohort definitions static; cross-cohort eligibility = highest protection only once |

## 6. Decision Tree (Compressed)

```
Price change date approaching for account
│
├─ Student/Nonprofit verified? → Hold $12 (annual $115)
├─ Active coupon? → Honor to expiry → migrate to annual at renewal
├─ Recent unresolved support ticket? → Delay 30d post-resolution
│
└─ Standard cohort path
   ├─ Annual lock available? → Push $172/yr (24-mo lock) [DEFAULT]
   ├─ Risk signals ≥2 AND eligible? → Enter save ladder
   │   ├─ Tenure ≥24mo? → L2 (legacy lock $14)
   │   ├─ Tenure ≥12mo? → L1 ($15, annual required)
   │   └─ Default → L3 (pause) or L4 (downgrade)
   └─ No risk signals → Move to $18, communicate, migrate to annual
```

## 7. Telemetry & Audit Trail

Track weekly: save-offer incidence by cohort, take-rate of annual default, margin leakage %, NPS delta, support contact rate post-change, reactivation rate. **Kill switch**: if any cohort shows >5% downgrade rate beyond forecast, escalate to pricing committee within 7 days.

**Bottom line**: Generosity is real but *conditioned* — paid in tenure, signal quality, and annual commitment. The framework makes save offers exist for genuine at-risk users while making annual migration the path of least resistance for everyone else.
