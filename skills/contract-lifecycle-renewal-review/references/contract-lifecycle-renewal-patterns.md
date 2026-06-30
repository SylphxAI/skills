# Contract Lifecycle Renewal Patterns

## Contract Lifecycle Renewal Review state machine

```text
contract_drafted -> signed -> active_term -> renewal_window_open -> renewal_decision -> renewed
      |             |          |                |                     |
      v             v          v                v                     v
 redlines       billing_gap  health_risk   notice_missed        terminated
                                |                |                     |
                                v                v                     v
                           expansion_path   exception_review     post_term_reconcile
```

## Rule IDs

- `contract-lifecycle-1` — Record term dates, notice windows, auto-renewal rules, pricing, discount, renewal cap, payment terms, and termination rights in a contract source of truth.
- `contract-lifecycle-2` — Keep contract, CRM, billing, provisioning, support, and customer-success health signals reconciled before renewal outreach.
- `contract-lifecycle-3` — Separate renewal, expansion, downgrade, cancellation, true-up, collections, and amendment workflows with explicit owners.
- `contract-lifecycle-4` — Trigger renewal preparation early enough for procurement, security review, legal redlines, budget cycles, and executive alignment.
- `contract-lifecycle-5` — Expose customer-friendly cancellation and non-renewal paths that preserve trust and reduce support escalation.
- `contract-lifecycle-6` — Gate entitlement changes on signed order or approved exception and verify billing/provisioning after change.
- `contract-lifecycle-7` — Track renewal risk reasons such as low adoption, incident history, unresolved support, price shock, champion loss, or procurement delay.
- `contract-lifecycle-8` — Post-review lost renewals and concessions to improve product, packaging, pricing, support, and onboarding.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Auto-renewal window | Notify and prepare before notice deadline | Contract term, owner, communication log | Surprise renewal dispute |
| Expansion at renewal | Separate value proof from base renewal | Usage, adoption, champion, procurement path | Bundling expansion risk into must-have renewal |
| Downgrade request | Map entitlement, billing, and success impact | Plan mapping and support readiness | Access loss or billing mismatch |
| True-up dispute | Reconcile usage and contract measurement | Usage ledger and contract language | Revenue leakage or trust break |
| Cancellation | Respect terms and capture reason | Notice record and data/export plan | Dark-pattern retention or orphaned data |

## Renewal checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `renewal_window_opened`, `renewal_risk_detected`, `renewal_offer_sent`, `contract_amendment_requested`, `entitlement_change_approved`, `contract_renewed`, `contract_terminated`.

Recommended properties: `account_id, segment, owner_team, contract_type, term_end_days, notice_due_days, renewal_status, risk_reason, commercial_motion, entitlement_change, decision, revenue_impact, customer_health, support_case_id`.
