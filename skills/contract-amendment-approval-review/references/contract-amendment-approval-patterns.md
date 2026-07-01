# Contract Amendment Approval Review Patterns

## Contract Amendment Approval Review state machine

```text
amendment_requested -> impact_assessed -> approvals_routed -> obligations_updated -> systems_verified -> renewal_review_scheduled
       |                     |                  |                  |                    |                 |
       v                     v                  v                  v                    v                 v
 scope_blur          hidden_obligation    authority_gap      register_gap         system_mismatch  renewal_surprise
```

## Rule IDs

- `amendment-approval-1` — Capture amendment scope, source clause, requested wording intent, business rationale, effective date, affected products, and customer-visible commitments.
- `amendment-approval-2` — Route legal interpretation and drafting to counsel while product, finance, security, privacy, support, and success assess operational feasibility.
- `amendment-approval-3` — Classify risk by clause type, customer segment, revenue impact, margin impact, security/privacy exposure, product gap, support burden, and renewal precedent.
- `amendment-approval-4` — Use approval authority for pricing, term, liability, SLA, data processing, data residency, security, AI/data-use, support, roadmap, and custom reporting changes.
- `amendment-approval-5` — Map accepted obligations to billing, provisioning, entitlement, support macros, reporting, trust evidence, runbooks, and customer success handoff.
- `amendment-approval-6` — Set exception expiry, renewal review, rollback/remediation path, and owner for every non-standard obligation.
- `amendment-approval-7` — Verify post-signature implementation with durable evidence instead of relying on signed PDFs or sales notes.
- `amendment-approval-8` — Archive rejected amendments with reason, fallback language, commercial alternative, and customer communication path.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Pricing amendment | Check margin and billing | Revenue/margin model | Revenue leakage |
| SLA change | Route support/infra approval | SLO evidence | Unsupported credit |
| Data residency request | Verify capability | Architecture/privacy proof | False commitment |
| Roadmap promise | Reject or bound | Product decision record | Hidden obligation |
| Side letter | Register obligation | Signed source and owner | Renewal surprise |

## Contract amendment checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `contract_amendment_requested`, `contract_amendment_impact_assessed`, `contract_amendment_approval_routed`, `contract_amendment_approved`, `contract_amendment_rejected`, `contract_obligation_updated`, `contract_amendment_system_verified`, `contract_amendment_renewal_review_scheduled`.

Recommended properties: `account_id, contract_id, amendment_id, clause_type, risk_tier, revenue_impact, margin_impact, owner_team, approver_role, effective_date, expiry_date, obligation_id, billing_status, provisioning_status, renewal_impact, decision`.
