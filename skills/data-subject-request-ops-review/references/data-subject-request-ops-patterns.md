# Data Subject Request Ops Patterns

## Data Subject Request Ops Review state machine

```text
request_received -> identity_verified -> scope_resolved -> systems_queued -> action_completed -> response_sent -> evidence_archived
       |                    |                 |                 |                  |              |
       v                    v                 v                 v                  v              v
 invalid_request     authority_gap       scope_conflict    system_gap       exception_needed  sla_missed
```

## Rule IDs

- `dsar-ops-1` — Classify request type, jurisdiction, data subject, authority, deadline, and response obligations before touching data.
- `dsar-ops-2` — Resolve workspace, organization, billing, security, support, and third-party data boundaries before export, correction, or deletion.
- `dsar-ops-3` — Require identity verification proportional to request risk and avoid collecting excessive verification data.
- `dsar-ops-4` — Inventory product databases, logs, analytics, backups, support systems, billing systems, AI datasets, exports, and subprocessors.
- `dsar-ops-5` — Handle legal holds, fraud/security retention, tax/accounting records, contractual records, and safety exceptions with approved wording.
- `dsar-ops-6` — Track each system action with owner, timestamp, result, retry state, exception, and evidence link.
- `dsar-ops-7` — Send responses that explain fulfilled actions, exceptions, timing, appeal/contact paths, and remaining retention where allowed.
- `dsar-ops-8` — Review SLA misses, manual work, ambiguous scopes, and subprocessor gaps to improve product privacy architecture.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Authorized agent | Verify authority before action | Consent/authorization proof | Wrong-party disclosure |
| Workspace export | Separate subject and org data | Role and ownership map | Leaking other users data |
| Legal hold | Suspend deletion subset | Legal basis and owner | Evidence spoliation |
| Subprocessor data | Trigger downstream request | Processor inventory | Incomplete fulfillment |
| SLA risk | Escalate and communicate | Deadline tracker | Regulatory breach |

## DSAR operations checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `dsar_request_received`, `dsar_identity_verified`, `dsar_scope_resolved`, `dsar_system_action_queued`, `dsar_system_action_completed`, `dsar_exception_recorded`, `dsar_response_sent`.

Recommended properties: `request_id, request_type, jurisdiction, subject_type, account_id, workspace_id, verification_status, authority_status, system_name, action_type, exception_type, sla_deadline, response_status, decision`.
