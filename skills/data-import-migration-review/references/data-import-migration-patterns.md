# Data Import Migration Patterns

## Migration state machine

```text
migration_requested -> sample_received -> schema_mapped -> dry_run_complete -> approved -> import_queued -> importing -> validating -> reconciled -> customer_accepted -> complete
       |                   |                 |                 |             |              |             |             |              |
       v                   v                 v                 v             v              v             v             v              v
   rejected         unsupported_source   mapping_blocked   dry_run_failed  cancelled   retry_waiting  paused       rollback_needed  support_followup
```

## Rule IDs

- `import-migration-1` — Classify the migration mode: self-serve import, assisted migration, admin bulk upload, background backfill, restore, or continuous sync cutover.
- `import-migration-2` — Define source-of-truth direction before writing: replace, merge, append, upsert, shadow-copy, or dual-write.
- `import-migration-3` — Require sample analysis for encoding, delimiters, identifiers, timestamps, currencies, nulls, duplicates, and foreign-key shape.
- `import-migration-4` — Every write path needs idempotency, dedupe rules, bounded retries, resumability, and audit records.
- `import-migration-5` — Dry-run output must show created, updated, skipped, failed, transformed, and ambiguous records before approval.
- `import-migration-6` — Progress UI must separate queued, processing, validating, failed, partially complete, rolled back, and accepted states.
- `import-migration-7` — Reconciliation compares source counts, target counts, checksums or sampled records, customer-visible totals, and support tickets.
- `import-migration-8` — Sensitive fields need minimization, redaction, retention limits, and explicit access controls during import support.
- `import-migration-9` — Cutovers need freeze windows, backout criteria, stakeholder comms, and post-cutover monitoring.
- `import-migration-10` — Customer acceptance is a product state, not a support afterthought; give users a review, fix, and confirm path.

## Decision table

| Scenario | Import mode | Write policy | User experience | Recovery path |
| --- | --- | --- | --- | --- |
| CSV contacts import | Self-serve import | Upsert by stable email/customer ID | Mapping preview, duplicate review, dry-run counts | Undo batch or re-run with same idempotency key |
| Competitor migration | Assisted migration | Transform then staged write | Migration workspace, approval checkpoint, support owner | Freeze source, restore snapshot, or partial rollback |
| Billing plan backfill | Background backfill | Shadow-copy then switch | Admin-only progress and reconciliation | Pause flag, restore previous entitlement source |
| Large media import | Queued import | Append with attachment checksum | Upload progress, retryable failed files | Resume failed chunks, quarantine corrupt files |
| Continuous sync cutover | Dual-read/write then cutover | Source-of-truth switch | Status banner and acceptance report | Revert pointer before cleanup window closes |

## Migration checklist

- Source and target schema owners are named.
- Data classes, sensitive fields, retention, and support access are documented.
- Dry-run produces counts, samples, errors, and transformation notes.
- Idempotency, dedupe, retry, pause, resume, cancel, and rollback are specified.
- Customer-visible progress and support evidence exist.
- Reconciliation and customer acceptance are required before cleanup.

## Event schema

Track: `migration_requested`, `migration_sample_analyzed`, `migration_mapping_saved`, `migration_dry_run_completed`, `migration_started`, `migration_record_failed`, `migration_reconciled`, `migration_accepted`, `migration_rolled_back`.

Recommended properties: `migration_id`, `source_system`, `target_entity`, `mode`, `actor_type`, `records_total`, `records_created`, `records_updated`, `records_skipped`, `records_failed`, `idempotency_key`, `duration_ms`, `failure_code`, `rollback_available`, `accepted_by_customer`.
