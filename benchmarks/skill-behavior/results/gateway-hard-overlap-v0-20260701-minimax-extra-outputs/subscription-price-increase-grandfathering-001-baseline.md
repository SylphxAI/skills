# B2B SaaS Price Increase Plan

## 1. Segment Matrix & Decisions

| Segment | List/Target | Action | Notice | Grandfather Window |
|---|---|---|---|---|
| Legacy annual (in-term) | Booked ARR | No change mid-term; renew at new price | T-90d before renewal | Until renewal date |
| Legacy annual (renewing) | Booked ARR | Migrate to new tier w/ 12-mo price lock | T-90d | 12 months from renewal |
| Monthly self-serve | MRR | New price at next billing cycle | T-30d via email + in-app | None |
| Enterprise (named) | Booked ARR | CS-led renewal at new price + custom terms | T-120d | Negotiated (≤24mo) |
| Grandfathered plans (legacy SKU) | MRR/ARR | Sunset to nearest current SKU + loyalty credit | T-60d | 6 months |
| Usage overages | All | New unit rates effective on notice date | T-30d | 30 days |

**Effective date:** Single global date (D-Day). No backdating to in-term annual contracts.

## 2. Pricing Levers
- List price: +X% on Pro/Team; +Y% on Enterprise baseline.
- Usage overages: Increase unit rate or reduce included pool (pick one; never both silently).
- Floor for sales exceptions: ≥(old price × 0.85) for legacy renewals only.

## 3. Cancellation Risk Scoring

| Signal | Weight | Source |
|---|---|---|
| Login frequency drop (>30% / 60d) | High | Product telemetry |
| Support tickets ≥3/month | High | Zendesk |
| NPS detractor / contract redlines requested | Medium | CS notes |
| Annual renewal within 120d | Medium | CRM |
| Usage decline >25% / 90d | High | Billing API |

Threshold → trigger **save playbook** (discount ≤15% on list, usage credit, downgrade, multi-year lock).

## 4. Migration Offers (Choose by segment)
- **Loyalty credit:** 1–3 months waived for grandfathered users who switch to current SKU.
- **Multi-year lock:** 10–15% discount for 24–36 month commit.
- **Upgrade incentive:** Free migration + 1 month of higher tier.
- **Self-serve nudge:** In-app banner with side-by-side value comparison + savings calc.

## 5. Notification Cadence
- T-90d: Account-manager briefing (Enterprise, legacy annual renewing).
- T-60d: CS outreach + personalized ROI summary.
- T-30d: Email + in-app banner (self-serve), in-app modal at login.
- T-14d: Follow-up email; support team confirmation.
- T-0: System change; confirmation receipts.
- T+30d: Win/loss survey + retention review.

## 6. Support Scripts (top 3 objections)

**"Why is my price changing?"**
> "Your plan is being aligned to our current [Tier] pricing. Existing features stay the same, and you keep grandfathered access to [feature] through [date]. You can also lock in today's rate with a multi-year renewal."

**"I want to cancel."**
> "I understand. Before you decide, I can offer [migration credit / downgrade to $tier / usage adjustment]. Which fits best?" → Tag ticket `PRICING-RISK`; route to save specialist.

**"My competitor is cheaper."**
> "Our [X, Y, Z] drive a 2.3× ROI per your usage profile. I can share a benchmark and explore a multi-year commitment to lower your effective rate by up to 15%."

## 7. Sales Exception Policy
- Approval matrix: AE → Mgr (≤10%); Director (≤20%); VP (≤25%); CRO (>25%).
- Hard rule: No exception reduces list price more than 25% OR extends grandfathering past 24 months.
- All exceptions logged in CRM with reason code; weekly review.

## 8. Revenue-Retention Reporting

| KPI | Cadence | Owner |
|---|---|---|
| Gross/Net Retention by segment | Weekly | RevOps |
| Logo churn vs. control | Weekly | CS |
| Migration conversion rate | Weekly | PMM |
| Average discount given | Weekly | Sales Ops |
| Saved ARR (save playbook) | Weekly | CS |
| Price-increase-attributed churn | Monthly | Finance |

**Targets (audit baseline):** Gross Retention ≥95%; Logo Churn ≤2%/mo; Migration ≥70% of grandfathered accounts; Avg discount ≤8%.

## 9. Audit Trail Requirements
- Effective-date timestamp per account.
- Notice-send log (channel, timestamp, recipient).
- Approval log for every exception with reason code.
- Save-playbook outcome (saved $, saved months, churned $).
- Cohort view: pre-price-increase vs. post for 90-day comparison.

## 10. Go/No-Go Gates
- ✅ Legal/ToS review on notice language.
- ✅ Billing system supports prorated grandfathered renewals.
- ✅ In-app banner & email templates QA'd.
- ✅ Save playbook staffed (CSM + Sales).
- ✅ Dashboards live with ≥14d historical baseline.
