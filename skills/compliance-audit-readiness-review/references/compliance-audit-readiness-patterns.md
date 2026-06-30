# Compliance Audit Readiness Patterns

## Compliance Audit Readiness Review state machine

```text
scope_confirmed -> controls_mapped -> evidence_collected -> walkthrough_ready -> audit_request_answered -> finding_remediated -> report_received
       |                 |                  |                  |                         |                    |
       v                 v                  v                  v                         v                    v
 scope_gap        owner_missing       evidence_stale      sample_failed          exception_open       claim_review_required
```

## Rule IDs

- `compliance-audit-1` — Define framework, scope, period, systems, subprocessors, data classes, customer commitments, and report boundaries before collecting evidence.
- `compliance-audit-2` — Map controls to owners, policies, procedures, systems, evidence sources, operating frequency, samples, and review cadence.
- `compliance-audit-3` — Collect evidence from source systems with date, owner, control ID, sample period, reviewer, and retention metadata.
- `compliance-audit-4` — Prepare walkthrough narratives that explain actual control operation, exceptions, monitoring, and remediation rather than theoretical policy.
- `compliance-audit-5` — Maintain a gap register with severity, customer impact, compensating control, remediation owner, due date, and claim restrictions.
- `compliance-audit-6` — Route auditor requests through a controlled queue to avoid duplicate, stale, or unauthorized evidence sharing.
- `compliance-audit-7` — Synchronize trust center, security questionnaires, DPAs, subprocessors, policies, and sales claims with approved audit status.
- `compliance-audit-8` — After the audit, convert findings into control improvements, CI/checks, runbooks, owner training, and next-cycle evidence automation.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| New audit scope | Confirm boundaries and commitments | Framework, systems, data, customers | Wrong evidence or false assurance |
| Auditor sample | Respond from source evidence | Control ID and sample period | Manipulated or incomplete evidence |
| Control exception | Record severity and remediation | Gap register and owner | Hidden repeat finding |
| Customer claim | Match approved report language | Audit status and legal review | Unsupported compliance promise |
| Continuous control | Automate evidence where practical | System logs and review cadence | Deadline scramble every cycle |

## Audit readiness checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `audit_scope_confirmed`, `control_owner_assigned`, `audit_evidence_collected`, `audit_sample_answered`, `audit_exception_logged`, `audit_finding_remediated`, `compliance_claim_approved`.

Recommended properties: `framework, control_id, owner_team, system, evidence_type, sample_period, evidence_status, exception_severity, remediation_due_days, auditor_request_id, claim_type, customer_impact, decision`.
