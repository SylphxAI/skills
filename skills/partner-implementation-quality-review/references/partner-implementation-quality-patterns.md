# Partner Implementation Quality Patterns

## Partner Implementation Quality Review state machine

```text
scope_confirmed -> qa_evidence_collected -> customer_validated -> handoff_completed -> scorecard_updated -> certification_decided
       |                 |                       |                    |                   |
       v                 v                       v                    v                   v
 scope_creep      weak_evidence            workflow_failed       support_gap       decertification_needed
```

## Rule IDs

- `partner-implementation-1` — Define partner scope, deliverables, acceptance criteria, customer workflows, data/integration risks, and owner roles before delivery starts.
- `partner-implementation-2` — Separate implementation delivery, migration quality, integration quality, training quality, support readiness, and customer success handoff.
- `partner-implementation-3` — Require QA evidence for permissions, data mapping, integrations, notifications, reports, performance, security, and rollback where relevant.
- `partner-implementation-4` — Validate customer workflows and business outcomes, not only task completion or partner-reported status.
- `partner-implementation-5` — Track partner-caused defects, rework, support cases, time-to-value, customer satisfaction, renewal risk, and expansion impact.
- `partner-implementation-6` — Tie scorecards to certification, referrals, marketplace ranking, co-selling eligibility, remediation, and revocation.
- `partner-implementation-7` — Feed repeated partner gaps into enablement, docs, product onboarding, templates, certification, and support macros.
- `partner-implementation-8` — Escalate security, privacy, data-loss, compliance, or high-value customer risks to internal owners before signoff.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Migration complete | Validate workflows | Customer acceptance evidence | Data moved, value absent |
| Integration defect | Block signoff | Test and logs | Support burden |
| Training delivered | Measure adoption | Attendance and usage | Low activation |
| Scorecard drop | Remediate or restrict | Defect/support metrics | Reputation damage |
| Certification renewal | Require evidence | QA and customer outcomes | Badge inflation |

## Partner implementation quality checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `partner_scope_confirmed`, `partner_qa_evidence_collected`, `partner_customer_validated`, `partner_defect_recorded`, `partner_handoff_completed`, `partner_scorecard_updated`, `partner_certification_decided`.

Recommended properties: `partner_id, account_id, project_type, deliverable, qa_status, acceptance_status, defect_count, support_case_count, customer_satisfaction, time_to_value, scorecard_score, certification_status, remediation_status, decision`.
