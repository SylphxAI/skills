# Data Deletion Erasure Patterns

## Data Deletion Erasure Review state machine

```text
request_received -> identity_authorized -> scope_mapped -> eligibility_checked -> deletion_executed -> proof_recorded
       |                    |             |                   |                  |
       v                    v             v                   v                  v
 invalid_request     auth_failed   shared_scope_risk    legal_hold       retry_required
```

## Rule IDs

- `data-erasure-1` — Map subject, account/workspace, data classes, source systems, derived stores, exports, logs, backups, billing/legal records, and subprocessors.
- `data-erasure-2` — Separate hard delete, soft delete, anonymization, tombstone, retention purge, legal hold, and delayed backup expiry.
- `data-erasure-3` — Verify requester authority, account ownership, shared workspace impact, fraud/security exceptions, billing/tax retention, and contractual obligations.
- `data-erasure-4` — Define deletion order, idempotency, retries, failure handling, evidence, customer status, and support escalation.
- `data-erasure-5` — Route legal hold, active dispute, chargeback, abuse, security incident, and compliance-retention exceptions to approved owners.
- `data-erasure-6` — Include analytics, search indexes, caches, ML/AI datasets, email systems, support attachments, and third-party processors in the control map.
- `data-erasure-7` — Communicate scope, timing, irreversible effects, retained exceptions, export options, and completion proof clearly.
- `data-erasure-8` — Run deletion drills and sample audits to prove the workflow works across current systems.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| User self-delete | Verify identity and scope | Auth and account map | Unauthorized deletion |
| Workspace delete | Warn shared users/admins | Workspace ownership and members | Collateral data loss |
| Legal hold | Pause deletion scope | Hold record and owner | Evidence destruction |
| Backup retention | Disclose delayed purge | Backup policy | False deletion promise |
| Subprocessor data | Trigger processor workflow | DPA/subprocessor map | Incomplete erasure |

## Data erasure checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `data_erasure_requested`, `data_erasure_authorized`, `data_erasure_scope_mapped`, `data_erasure_exception_applied`, `data_erasure_job_completed`, `data_erasure_subprocessor_requested`, `data_erasure_proof_recorded`.

Recommended properties: `request_id, data_subject_type, account_id, workspace_id, data_class, system, deletion_method, exception_type, legal_hold_status, subprocessor, job_status, proof_id, owner_team, decision`.
