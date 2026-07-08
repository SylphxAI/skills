# Release Readiness Exception Board Review Patterns

## Release Readiness Exception Board Review state machine

```text
exception_requested -> evidence_reviewed -> risk_decided -> mitigation_bound -> release_monitored -> exception_retired
       |                    |                 |                |                    |                 |
       v                    v                 v                v                    v                 v
 scope_unclear       weak_evidence       authority_gap    mitigation_gap       rollback_gap     zombie_exception
```

## Rule IDs

- `release-exception-1` — Require exception intake to name release scope, unmet gate, customer impact, risk tier, requested decision, owner, expiry, and alternative paths.
- `release-exception-2` — Separate evidence gaps across tests, QA, security, privacy, accessibility, performance, migrations, observability, support, docs, and rollout.
- `release-exception-3` — Map approval authority to risk: product, engineering, security, privacy, support, legal, customer success, finance, or executive sponsor.
- `release-exception-4` — Accept risk only with mitigation owner, rollout boundary, feature flag or kill switch, rollback trigger, monitoring signal, and communication plan.
- `release-exception-5` — Set expiry and retirement criteria so exceptions do not survive into future releases unnoticed.
- `release-exception-6` — Record customer-specific exceptions separately from general release exceptions to avoid hidden entitlement or support commitments.
- `release-exception-7` — Trigger post-release review from incident, rollback, support spike, metric regression, missed expiry, or repeated exception pattern.
- `release-exception-8` — Convert repeated exceptions into durable fixes: gate update, test coverage, runbook, staffing, architecture, or planning change.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Missing low-risk doc | Approve with expiry | Owner and due date | Zombie exception |
| Migration proof gap | Block or narrow scope | Dry-run evidence | Data loss |
| Store deadline | Limit rollout | Customer impact and comms | Policy/review failure |
| Security evidence gap | Escalate authority | Security decision record | Unaccepted exposure |
| Hotfix exception | Time-box and monitor | Rollback trigger | Unbounded blast radius |

## Exception board checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `release_exception_requested`, `release_exception_evidence_reviewed`, `release_exception_approved`, `release_exception_rejected`, `release_exception_mitigation_bound`, `release_exception_trigger_fired`, `release_exception_retired`, `release_exception_post_reviewed`.

Recommended properties: `release_id, exception_id, unmet_gate, risk_tier, customer_scope, approver_role, mitigation_owner, expiry_at, rollout_scope, flag_id, rollback_trigger, monitoring_signal, support_ready, decision`.


## Merged from release-risk-exception-review

# Release Risk Exception Patterns

## Release Risk Exception Review state machine

```text
exception_requested -> risk_classified -> authority_reviewed -> guardrails_defined -> release_executed -> monitored -> exception_closed
       |                    |                 |                    |                    |             |
       v                    v                 v                    v                    v             v
 vague_risk          wrong_authority    control_gap          rollback_gap        incident_trigger remediation_stale
```

## Rule IDs

- `release-exception-1` — Record the blocked gate, evidence, affected surface, customer impact, risk tier, accountable owner, approver, and expiry before release.
- `release-exception-2` — Separate product defect, test gap, security/privacy issue, compliance gap, performance regression, infra readiness, and operational support risk.
- `release-exception-3` — Require higher authority for irreversible data loss, security exposure, payment defects, availability risk, privacy risk, or contractual commitments.
- `release-exception-4` — Define compensating controls, feature flags, staged rollout, monitoring, alerts, support macros, customer notices, and rollback triggers.
- `release-exception-5` — Link every accepted exception to remediation work with due date, owner, and post-release verification.
- `release-exception-6` — Limit exception blast radius with cohorting, kill switches, canaries, config gates, or manual approvals where possible.
- `release-exception-7` — Review actual impact after release and update gates if the exception exposed a systemic blind spot.
- `release-exception-8` — Reject exceptions whose failure mode cannot be observed, contained, or reversed.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Flaky non-critical test | Accept with remediation | Failure analysis | Masking real regression |
| Security finding | Require security authority | Severity and exploitability | Unapproved exposure |
| Payment defect | Block or narrow rollout | Revenue and refund impact | Financial harm |
| Performance regression | Canary with guardrail | Load and SLO evidence | Availability incident |
| Rollback missing | Do not approve | Rollback proof | Irreversible bad release |

## Release exception checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `release_exception_requested`, `release_risk_classified`, `release_exception_approved`, `release_guardrail_configured`, `release_exception_triggered`, `release_rollback_started`, `release_exception_closed`.

Recommended properties: `release_id, gate_name, exception_type, risk_tier, owner_team, approver, customer_impact, guardrail_type, rollout_scope, rollback_status, expiry_date, remediation_id, incident_id, decision`.
