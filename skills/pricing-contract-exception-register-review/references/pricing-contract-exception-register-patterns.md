# Pricing Contract Exception Register Patterns

## Pricing Contract Exception Register Review state machine

```text
exception_requested -> policy_compared -> approval_recorded -> billing_mapped -> exception_active -> renewal_reviewed -> exception_retired
       |                    |                 |                 |                |                  |
       v                    v                 v                 v                v                  v
 vague_deviation     margin_gap       approval_gap      invoice_mismatch perpetual_debt     surprise_renewal
```

## Rule IDs

- `pricing-exception-1` — Record account, exception type, standard policy, deviation, value, margin impact, contract clause, approver, source, expiry, and renewal trigger.
- `pricing-exception-2` — Separate discount, credit, free period, payment term, usage cap, minimum commit, ramp, price-book, and grandfathering exceptions.
- `pricing-exception-3` — Map each exception to quote, contract, billing, invoice, entitlement, revenue recognition, CRM, support, and renewal systems.
- `pricing-exception-4` — Require finance/legal/commercial approval based on margin impact, payment risk, contract risk, and precedent risk.
- `pricing-exception-5` — Expose exceptions to renewal, customer success, support, billing, and revenue operations before they surprise customers.
- `pricing-exception-6` — Create expiry, review, uplift, sunset, or migration policy for every accepted exception.
- `pricing-exception-7` — Audit active exceptions for leakage, duplicate records, stale approvals, invoice mismatch, and margin erosion.
- `pricing-exception-8` — Feed repeated exceptions into packaging, pricing, sales qualification, procurement playbooks, and product limits.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Large discount | Approve with margin evidence | Gross margin and ARR impact | Bad-fit revenue |
| Custom payment term | Finance/legal review | Cash and risk memo | Collections risk |
| Grandfathering | Set renewal trigger | Contract and customer notice | Perpetual debt |
| Usage cap exception | Map entitlements | Meter and contract proof | Access dispute |
| Invoice mismatch | Fix source mapping | Billing diff | Revenue leakage |

## Pricing contract exception checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `pricing_exception_requested`, `pricing_exception_policy_compared`, `pricing_exception_approved`, `pricing_exception_billing_mapped`, `pricing_exception_activated`, `pricing_exception_renewal_reviewed`, `pricing_exception_retired`.

Recommended properties: `account_id, opportunity_id, exception_type, standard_policy, deviation_value, margin_impact, approver, contract_clause, billing_object, expiry_date, renewal_trigger, invoice_status, decision`.
