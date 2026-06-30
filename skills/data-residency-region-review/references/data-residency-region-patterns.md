# Data Residency Region Patterns

## Data Residency Region Review state machine

```text
customer_region_selected -> data_classified -> regional_storage_configured -> processing_constrained -> evidence_ready
          |                    |                         |                       |
          v                    v                         v                       v
 unsupported_region      unclear_metadata          subprocessor_gap        transfer_exception
```

## Rule IDs

- `data-residency-1` — Define residency promise by data class, system, region, storage, processing, replication, backup, logs, analytics, support, and AI provider path.
- `data-residency-2` — Map subprocessors, cloud regions, network paths, admin/support access, disaster recovery, and customer-controlled exports/deletion.
- `data-residency-3` — Separate customer content, account metadata, billing data, telemetry, logs, support attachments, derived analytics, search indexes, and AI artifacts.
- `data-residency-4` — Document allowed transfers, legal basis, customer contract language, DPA/subprocessor references, and exception approval.
- `data-residency-5` — Ensure backup, restore, failover, and incident response respect region commitments or disclose controlled exceptions.
- `data-residency-6` — Provide customer evidence through architecture summary, data map, controls, access logs, subprocessor list, and audit artifacts.
- `data-residency-7` — Monitor drift when new services, analytics pipelines, AI providers, regions, support tools, or logs are added.
- `data-residency-8` — Plan migrations with data copy, verification, cutover, rollback, deletion, support communication, and billing/entitlement impacts.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| EU residency claim | Map every data class and processor | Data map and subprocessor list | False residency promise |
| Cross-region failover | Define exception and customer impact | DR plan and contract terms | Unapproved transfer |
| Support access | Restrict, audit, and justify | Access logs and support purpose | Data leaves boundary |
| AI processing | Check provider region and retention | Provider contract and data class | Hidden AI transfer |
| Region migration | Plan verified cutover and deletion | Migration proof and rollback | Data split or loss |

## Data residency checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `customer_region_selected`, `data_residency_map_updated`, `regional_service_configured`, `residency_exception_requested`, `cross_region_transfer_detected`, `regional_migration_completed`, `residency_evidence_provided`.

Recommended properties: `account_id, region, data_class, system, subprocessor, transfer_type, access_reason, exception_status, retention_days, failover_mode, evidence_type, owner_team, decision`.
