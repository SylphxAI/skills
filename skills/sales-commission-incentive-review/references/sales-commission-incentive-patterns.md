# Sales Commission Incentive Patterns

## Sales Commission Incentive Review state machine

```text
deal_booked -> eligibility_checked -> credit_assigned -> payout_calculated -> payout_approved -> quality_reviewed
     |                 |                |                  |                 |
     v                 v                v                  v                 v
 data_mismatch   ineligible_deal   credit_conflict     exception_needed  clawback_triggered
```

## Rule IDs

- `sales-incentive-1` — Define commissionable event, source of truth, eligible roles, deal type, quota credit, payout timing, and finance reconciliation.
- `sales-incentive-2` — Separate incentives for new logo, expansion, renewal, services, usage commits, channel, partner, and multi-year terms.
- `sales-incentive-3` — Use guardrails for discounts, margin, payment terms, contract exceptions, customer fit, implementation risk, and early churn.
- `sales-incentive-4` — Define credit splits, territory rules, account ownership, channel conflict, manager approval, and dispute resolution.
- `sales-incentive-5` — Model accelerators and SPIFFs for behavior risk, sandbagging, discounting, quarter-end quality, and support burden.
- `sales-incentive-6` — Apply clawbacks or holdbacks for non-payment, cancellation, fraud, early churn, materially changed terms, or unsupported bookings.
- `sales-incentive-7` — Audit compensation data against CRM, contracts, billing, revenue schedules, and approved exceptions.
- `sales-incentive-8` — Review incentive outcomes by win quality, retention, margin, customer health, and rep behavior, not attainment alone.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Heavy discount | Gate payout by margin policy | Discount and approval record | Margin leakage |
| Expansion deal | Credit CS/AE by rule | Account ownership and influence | Team conflict |
| Usage commit | Tie payout to contract/control | Commit terms and risk | Inflated usage promise |
| Early churn | Apply holdback/clawback | Cancellation timing | Bad-fit sales rewarded |
| Channel deal | Use registration rules | Partner/direct source | Channel conflict |

## Sales incentive checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `commission_eligibility_checked`, `commission_credit_assigned`, `commission_exception_requested`, `commission_payout_calculated`, `commission_dispute_opened`, `commission_clawback_triggered`, `commission_plan_reviewed`.

Recommended properties: `deal_id, role, compensation_plan, deal_type, quota_credit, payout_basis, discount_percent, margin_impact, exception_type, credit_split, churn_window, dispute_status, finance_status, decision`.
