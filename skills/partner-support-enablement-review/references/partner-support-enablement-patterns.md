# Partner Support Enablement Patterns

## Partner Support Enablement Review state machine

```text
partner_segmented -> scope_defined -> enablement_completed -> support_live -> quality_reviewed -> certification_renewed
       |                    |                |                    |              |                    |
       v                    v                v                    v              v                    v
 wrong_partner       scope_gap       training_gap          escalation_gap  quality_issue       revocation_needed
```

## Rule IDs

- `partner-support-1` — Define partner type, support scope, customer segment, allowed promises, access level, and escalation owner before enablement.
- `partner-support-2` — Separate sales enablement, implementation enablement, support enablement, technical escalation, and customer success handoff.
- `partner-support-3` — Provide runbooks, diagnostics, support macros, release notes, known issues, sandbox data, and escalation criteria.
- `partner-support-4` — Gate customer-impacting access with least privilege, audit logs, expiration, training, and partner offboarding.
- `partner-support-5` — Measure partner quality with resolution time, escalation rate, customer satisfaction, rework, defect reports, and renewal/expansion impact.
- `partner-support-6` — Create certification levels with evidence, renewal cadence, revocation criteria, and public/private badge rules.
- `partner-support-7` — Feed partner-reported blockers into product, docs, support, pricing, and implementation improvements.
- `partner-support-8` — Review partner claims and support content for security, privacy, pricing, SLA, and roadmap accuracy.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Implementation partner | Enable with scoped runbook | Project complexity and training proof | Customer launch failure |
| Support access request | Grant least privilege | Role and audit requirements | Data exposure |
| Escalation spike | Review partner quality | Case taxonomy | Support overload |
| Certification badge | Require outcome evidence | QA and customer results | Badge inflation |
| Roadmap claim | Correct and retrain | Claim audit | False customer promise |

## Partner support enablement checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `partner_support_scope_defined`, `partner_training_completed`, `partner_access_granted`, `partner_case_escalated`, `partner_quality_review_completed`, `partner_certification_renewed`, `partner_access_revoked`.

Recommended properties: `partner_id, partner_type, tier, support_scope, access_level, training_status, certification_status, customer_segment, escalation_reason, resolution_time, csat, quality_score, revocation_reason, decision`.
