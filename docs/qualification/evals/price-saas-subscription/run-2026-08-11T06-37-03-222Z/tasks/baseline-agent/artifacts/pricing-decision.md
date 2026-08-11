# Pricing Decision — SaaS Project-Management Tool

Status: **Proposed (bounded experiment — see Experiment/Rollout Plan)**
Date: 2026-08-11
Owner: Product × Finance (to be assigned)
Inputs: No internal cost, usage, or conversion data existed in the workspace at decision
time. All cost figures below are **assumptions** that must be validated against the
cloud/FinOps, support, and billing systems before publication. Prices are derived from
those assumptions, so the structure is decision-ready and the numbers are internally
consistent by construction.

---

## 1. Decision, buyer, and context

- **Product:** cloud project-management tool (tasks, projects, docs, reports,
  automations, integrations, API).
- **Buyer:** team lead / department owner / procurement (enterprise).
- **User:** individual contributors — seats should be priced low enough that users are
  never punished for adoption.
- **Purchasing motion:** self-serve credit card up to ~50 seats; sales-assisted above
  that or when security review is required.
- **Value metric:** paid seats (collaboration scale) + metered automation runs and
  storage (operational scale). This matches how value scales and aligns price to the
  two dominant cost drivers.
- **Expansion path:** Free → Team → Business → Enterprise, with overage and prepaid
  packs as the between-tier growth valve.

### Market anchor (accessed 2026-08-11, approx., per-seat/mo, annual billing)

| Product | Entry paid tier | Mid tier | Notes |
| --- | --- | --- | --- |
| Asana | Starter $10.99 (monthly $13.49) | Advanced $24.99 (monthly $30.49) | Enterprise $35–$45 |
| Monday.com | Basic ~$9–$12 | Pro ~$24 | 3-seat minimum; credit meters (1k–3k included, ~$0.01/credit overage) |
| ClickUp | Unlimited ~$7–$10 | Business ~$12; Business Plus ~$15–$22 | Enterprise ~$25–$40 |

Sources: Lifestack/Comparedge/UseCarly (Asana, 2026-07), Vendr/Forkast (Monday.com,
2026-07), Vendr/Spendbase/Smartsuite (ClickUp, 2025-11–2026-05). Re-verify before
publication; competitor prices drift.

Positioning decision: **price Team at the Asana/Monday entry band and Business below
Asana Advanced**, competing on being cheaper at mid-scale and clearer on meters than
the credit-based competitors.

---

## 2. Recommended model

**Hybrid: per-seat base + metered usage overage, tiered plans, self-serve with a
sales-assisted Enterprise path.**

- Seats capture collaboration value and baseline infrastructure cost.
- Automation runs and storage are metered because they are the marginal-cost drivers
  (serverless execution, object storage/backups).
- Free tier is a usage-gated habit builder, not a crippled demo.

### Plan architecture

| | Free | Team | Business | Enterprise |
| --- | --- | --- | --- | --- |
| Who | Small teams evaluating | Team lead, self-serve | Department owner, needs control | Procurement / security buyer |
| Price (monthly billing) | $0 | $12/seat/mo | $24/seat/mo | Negotiated |
| Price (annual billing) | — | $10/seat/mo | $20/seat/mo | Negotiated |
| Minimum paid seats | — | **3** | **5** | Negotiated (≥ 25) |
| Members | 3 max | Unmetered (all internal users are paid seats) | Same | Same |
| External guests/viewers | — | Free, unlimited | Free, unlimited | Free, unlimited |
| Projects | 3 active | Unlimited | Unlimited | Unlimited |
| Automation runs included | 100/mo | 2,000/mo | 10,000/mo | Committed band |
| Storage included | 1 GB | 20 GB | 100 GB | Committed band |
| Automations / integrations | Basic | Full | Full + advanced triggers | Full |
| Reporting & dashboards | Basic | Core | Advanced + cross-project | Custom |
| SSO/SAML, SCIM, audit log | — | — | ✅ | ✅ |
| SLA | — | Standard | 99.9% | 99.9% + credits |
| Security review / DPA / MSA | — | — | DPA on request | Full package |
| Support | Community | Email (24h) | Priority (8h) | Dedicated CSM + named escalation |
| Procurement | — | Card | Card or invoice | PO/invoice, multi-year |

**Explicit seat rules (no bundled-seat ambiguity):**
- Every internal member is a paid seat at the plan's per-seat price; there are no
  "included base seats" above the stated **minimum paid seats**.
- Minimums: Team = 3 paid seats ($36/mo monthly billing, $360/yr annual). Business =
  5 paid seats ($120/mo monthly, $1,200/yr annual). Additional seats are prorated at
  the same per-seat price, charged on the next invoice.
- External guests and read-only viewers are free and unlimited on paid plans, so
  collaboration is never punished; only internal seats pay.

---

## 3. Cost model (assumptions — validate before launch)

Per-seat marginal cost/month (blended across the paid base):

| Component | Cost | Basis |
| --- | --- | --- |
| Infrastructure (compute, DB, baseline storage) | $1.20/seat/mo | Shared fleet amortized over active seats |
| Support (email/priority, amortized) | $0.60/seat/mo | Headcount ÷ supported seats |
| Misc (payment fraud, chargebacks, misc) | $0.20/seat/mo | Buffer |
| **Per-seat marginal total** | **$2.00/seat/mo** | |
| Automation run (serverless + queue + logs) | $0.0005/run | Marginal |
| Storage (object store + backups) | $0.05/GB/mo | Marginal |
| Payment processing | 2.9% + $0.30/invoice | Stripe-class; fold into margin check |

Free-tier cost assumption: ~$0.40/active free member/mo (infra + community support)
→ ~$1.20/mo per 3-member free org. This is a paid-acquisition cost, not a revenue
line; guarded by the metrics in §6.

---

## 4. Usage metering and overages

Metered units: **automation runs** and **storage GB-month**. Both are priced above
their marginal cost floor and are explicit on the pricing page.

| Plan | Included | Overage (per run / per GB-mo) | Alerts | Cap/degrade behavior |
| --- | --- | --- | --- | --- |
| Free | 100 runs, 1 GB | — (no overage; usage pauses at quota) | 80%/90% | Usage pauses until next cycle or upgrade |
| Team | 2,000 runs, 20 GB | $0.005/run; $0.30/GB-mo | 80%/90% | Auto-bill overage up to 3× included; above that, require prepaid pack or plan change |
| Business | 10,000 runs, 100 GB | $0.005/run (≤50k) → $0.004 (50k–500k) → $0.003 (>500k); $0.30/GB-mo | 80%/90% | Same cap rule |
| Enterprise | Committed band | True-up at tier rates from committed band | Contractual | Contractual |

- **Prepaid packs:** 100k runs = $400 ($0.004/run), auto-renews unless disabled. Packs
  are the volume lever for customers who predict spikes.
- **Overage billing mechanics:** metered overage appears as a line item on the next
  invoice; the dashboard shows month-to-date usage and projected overage at 80%/90%
  of included quota. No silent auto-top-up above 3× included; bill shock is the
  number-one trust risk and the cap is the guardrail.

---

## 5. Pricing arithmetic (consistency pass — this is the section that must hold)

### 5.1 Seat pricing

| Plan | Per-seat price (monthly billing) | Per-seat price (annual billing) | Minimum paid seats | Effective monthly minimum invoice |
| --- | --- | --- | --- | --- |
| Team | $12.00 | $10.00 | 3 | $36 monthly / $30 annual |
| Business | $24.00 | $20.00 | 5 | $120 monthly / $100 annual |

### 5.2 Overage margin sanity (floor: overage price ≥ marginal cost ÷ (1 − target GM))

Target gross margin on overage: **≥ 80%** (after processing, spikes, support load).

| Meter | Marginal cost | Price at 80% GM floor | Proposed price | Actual GM |
| --- | --- | --- | --- | --- |
| Automation run (tier 1) | $0.0005 | $0.0025 | $0.005 | 90% ✅ |
| Automation run (tier 2) | $0.0005 | $0.0025 | $0.004 | 87.5% ✅ |
| Automation run (tier 3) | $0.0005 | $0.0025 | $0.003 | 83.3% ✅ |
| Prepaid pack (100k runs) | $0.0005 | $0.0025 | $0.004 | 87.5% ✅ |
| Storage GB-month | $0.05 | $0.25 | $0.30 | 83.3% ✅ |

### 5.3 Seat margin sanity (floor: blended gross margin ≥ 75%)

Per-seat marginal cost $2.00 + processing (~$0.45 monthly / ~$0.32 annual at minimum
invoice; falls as invoice grows).

| Plan × billing | Price | Cost incl. processing | GM |
| --- | --- | --- | --- |
| Team monthly | $12.00 | ~$2.45 | ~79.6% ✅ |
| Team annual | $10.00 | ~$2.32 | ~76.8% ✅ |
| Business monthly | $24.00 | ~$2.76 | ~88.5% ✅ |
| Business annual | $20.00 | ~$2.59 | ~87.1% ✅ |

### 5.4 Annual discount and contract terms

- Annual = 16.7% off the monthly per-seat rate ($12→$10, $24→$20), invoiced upfront.
  Effective discount is explicit on the pricing page; annual customers see their
  renewal date and the monthly equivalent next to the annual price.
- **Refund boundary:** 30-day money-back guarantee on the first annual invoice; no
  partial refunds after day 30 (except statutory). Monthly plans cancel at period end.
- **Multi-year (Enterprise only):** 2–3 year commitments may add up to 5% (max 20.8%
  total vs monthly rate). Any discount beyond 20% cumulative requires Finance sign-off
  and a written margin check showing **blended GM ≥ 70%** after all discounts,
  processing, and credits. Sanity: Team annual at $9.50 → GM ≈ 75.6% ✅; no proposal
  below $9.00/seat (GM ≈ 74.2%) is approvable.
- Annual/minimum invoices are due net 0 (card) or net 30 (invoice, Enterprise only).

### 5.5 Free tier economics

- Free org cost ≈ $1.20/mo at full quota. Break-even requires the free tier to drive
  paid conversion; guardrails in §6 cap free cost at 15% of paid revenue.

### 5.6 Consistency invariants (do not break)

1. Overage rates never drop below $0.0025/run or $0.25/GB-mo without a margin review.
2. Every discount (annual, multi-year, sales) is validated against blended GM ≥ 70%
   before signature; CRM must log approval.
3. Seat minimums are printed as invoice minimums, never as "included seats."
4. Annual price always equals 5/6 of monthly price; no off-list per-seat discounting
   below the multi-year floor ($9.00 Team / $18.00 Business equivalent).
5. Prepaid packs never undercut the lowest tier-3 overage rate ($0.003/run).

---

## 6. Upgrade moments, cancellation, downgrade

**Upgrade moments (reason visible before paywall — pricing page and in-app):**
- 4th member needed → Team (the free tier's 3-member cap is the first paywall).
- Automation quota at 80%/90% with projected spend shown → upgrade to Business or buy
  a pack (show both, with a side-by-side cost comparison).
- Storage quota at 80%/90% → upgrade or overage (auto-suggested).
- SSO/audit/SCIM requested → Business.
- > 50 seats, > 1M runs/mo, or a security questionnaire → sales-assist handoff to
  Enterprise (self-serve remains available, but a rep owns the deal).

**Cancellation/downgrade promises (near subscription actions, in plain language):**
- Monthly: cancel anytime, effective end of billing period; no retroactive charges.
- Annual: cancel within 30 days of renewal for full refund; after that, access
  continues to end of term (no partial refunds).
- Downgrade: takes effect at next billing cycle; data is retained **90 days**
  read-only with one-click export; features above the new plan are disabled; metered
  overage is true-up billed at the current tier's rates.
- Export: full workspace export (tasks, docs, attachments) anytime during the 90-day
  window; after 90 days data is deleted per DPA and a certificate of deletion is
  available on Enterprise.

---

## 7. Metrics and unit-economics targets

**Targets:**
- Blended gross margin ≥ 75% (overage ≥ 80%) by quarter 3.
- CAC payback ≤ 18 months; NRR ≥ 110% by quarter 4 after launch.
- Logo churn ≤ 2%/mo (Team), ≤ 1%/mo (Business).
- Free tier: infra+support cost ≤ 15% of paid revenue; free→paid conversion ≥ 4% of
  activated free orgs (3+ members, 1 active project).
- Support cost ≤ $0.75 per paid seat/mo; refund rate ≤ 2% of revenue.

**Tracked events:** `pricing_page_viewed`, `plan_compared`, `trial_started`,
`checkout_started`, `subscription_started`, `upgrade_clicked`, `upgrade_completed`,
`downgrade_started`, `cancellation_completed`, `overage_alert_seen`,
`overage_alert_acknowledged`, `pack_purchased`, `winback_offer_shown`,
`winback_accepted`, `pricing_notice_seen`, `pricing_notice_acknowledged`.

**Cost and abuse controls:**
- Overage hard cap at 3× included monthly quota (auto-bill) — beyond that requires a
  pack or plan change; API rate limits and automation concurrency limits per plan.
- Free tier: usage pauses at quota (no negative balance); one free org per verified
  domain; anti-abuse flagging on bulk account creation.
- Metered usage is sampled at 1-minute granularity, reconciled daily, and billed on
  exact counts — no rounding up.

---

## 8. Experiment / rollout plan

This is **new pricing for a new product** — no existing customers to migrate or
grandfather. If pricing changes after launch, the migration rules in
`price-saas-subscription` apply (cohorts, notice, grandfathering, rollback).

- **Hypothesis:** "Team at $12 ($10 annual) with explicit meters converts ≥ 4% of
  activated free orgs and holds blended GM ≥ 75% at 500 paying orgs."
- **Staged rollout:**
  1. Launch **Free + Team** immediately; Business behind an interest form for
     waitlist/cohort measurement (6 weeks).
  2. Launch **Business** at week 6 with a 10% launch credit for the first 100 orgs
     (logged, CRM-approved, margin-checked — $18/seat annual → GM ≈ 85.6% ✅).
  3. **Enterprise** sales motion from day one for ≥ 50-seat or security-review leads,
     using the procurement checklist (SSO/SCIM, DPA/MSA, SLA, invoice/PO, security
     review, named escalation).
- **Success metrics:** activation (3+ members + 1 project), free→paid conversion,
  NRR, expansion (seat + usage), downgrade/cancel rate, support load, refund rate,
  free-cost ratio.
- **Kill criteria / rollback triggers:** conversion < 2% of activated free orgs after
  two quarters → re-test price/limit set; free cost > 15% of paid revenue → tighten
  free quota; Team NRR < 100% at quarter 2 → investigate meter or cap friction before
  discounting. Rollback = revert limits/price and hold a comparable cohort.
- **Validation before launch (owner: Finance/Eng):** re-derive marginal costs from
  live FinOps and support data; confirm meter accounting is auditable; sign off the
  pricing page copy (value metric, limits, renewal, cancel semantics identical to this
  doc).

**Sales/support enablement (approved, not invented at the desk):**
- Objections: "why a 3-seat minimum" (invoice economics + margin floor), "why metered
  overage" (value scales with operational load), "why no unlimited free" (quality and
  abuse control).
- Approved concessions: 30-day first-invoice refund; multi-year up to 20% cumulative
  (Finance sign-off above 15%); annual launch credits only from logged promo codes.
- Escalation: support → CSM → Finance for anything below the margin floor, multi-year
  > 3 years, or custom meters.

---

## 9. Risks

| Risk | Mitigation |
| --- | --- |
| Cost assumptions wrong (infra per seat, run cost) | Pre-launch FinOps validation; margin guardrails force reprice, not silent erosion |
| Bill shock on automation overage | 80%/90% alerts with projected spend, 3× cap, packs, tiered rates |
| Free-tier cost leakage | 3-member/3-project/100-run caps; 15%-of-revenue guardrail with rollback |
| Seat minimum friction for 1–2 person teams | Minimums printed as invoice floors; competitors (Monday) use the same mechanic |
| Discount leakage via sales | Written approval thresholds, CRM logging, margin check before any signature |
| Competitor price cuts | We sit at entry-band parity; moat is meter clarity + Business/Enterprise path, not a race to zero |
| Annual refund boundary confusion | 30-day boundary and renewal date printed next to every annual price |

---

## 10. Summary table

```text
Recommended model:            Hybrid — per-seat base + metered automation/storage overage, tiered
Value metric:                 Paid seats (collaboration) + automation runs + storage GB-month
Plans:                        Free ($0, 3 members) / Team ($12 or $10 annual, min 3) /
                              Business ($24 or $20 annual, min 5) / Enterprise (negotiated)
Overage:                      $0.005→$0.003/run, $0.30/GB-mo (all ≥ 80% GM; floor $0.0025 / $0.25)
Annual discount:              16.7% (5/6 of monthly); multi-year up to 20.8% max, GM ≥ 70% check
Gross margin:                 Target ≥ 75% blended, ≥ 80% on overage; all proposed prices ≥ 76.8% GM
Free-tier guardrail:          ≤ 15% of paid revenue; conversion ≥ 4% of activated orgs
Rollout:                      Free+Team now, Business at week 6, Enterprise day one; kill criteria defined
Owner/next step:              Validate cost assumptions against FinOps + support data; sign pricing page copy
```
