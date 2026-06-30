# Revenue Recognition Policy Patterns

## Revenue Recognition Policy Review state machine

```text
contract_signed -> obligation_identified -> delivery_evidenced -> revenue_scheduled -> revenue_recognized
      |                    |                    |                  |
      v                    v                    v                  v
 side_letter         review_required       delivery_gap       adjustment_needed
```

## Rule IDs

- `revenue-recognition-1` — Separate commercial offer, invoice, payment, entitlement, delivery, usage consumption, and revenue recognition records.
- `revenue-recognition-2` — Identify performance obligations, standalone value assumptions, delivery evidence, acceptance criteria, refund rights, and customer concessions.
- `revenue-recognition-3` — Review new bundles, discounts, credits, trials, upgrades, downgrades, renewals, cancellations, and contract modifications before launch.
- `revenue-recognition-4` — Reconcile billing ledger, usage ledger, entitlement state, CRM order, contract terms, and finance revenue schedule.
- `revenue-recognition-5` — Track exceptions such as side letters, manual credits, non-standard terms, implementation services, and marketplace fees.
- `revenue-recognition-6` — Define owner approval for revenue-impacting product changes, pricing experiments, sales concessions, and refund policies.
- `revenue-recognition-7` — Expose customer-facing terms clearly without promising accounting treatment in product copy.
- `revenue-recognition-8` — Use post-launch audits to detect recognition drift, invoice mismatches, usage corrections, and support-driven concessions.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Usage overage | Recognize from rated usage after controls | Usage ledger and rating rule | Over/under recognized revenue |
| Prepaid credit | Separate cash, liability, consumption | Credit terms and drawdown ledger | Recognizing before service delivery |
| Bundle | Identify obligations and allocation review | Package terms and finance approval | Wrong allocation |
| Refund/concession | Adjust with documented reason | Support case and credit memo | Hidden revenue reversal |
| Contract modification | Route to finance review | Amendment and entitlement change | Incorrect modification accounting |

## Revenue recognition checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `revenue_policy_review_started`, `performance_obligation_identified`, `delivery_evidence_recorded`, `revenue_exception_logged`, `revenue_schedule_updated`, `revenue_adjustment_approved`, `recognition_control_failed`.

Recommended properties: `account_id, contract_type, pricing_model, obligation_type, billing_period, delivery_event, usage_unit, credit_type, exception_type, finance_owner, review_status, revenue_impact, decision`.
