# Customer Onboarding Migration Runbook Patterns

## Customer Onboarding Migration Runbook Review state machine

```text
scope_confirmed -> source_profiled -> mapping_approved -> dry_run_completed -> cutover_ready -> migrated -> adoption_handoff
       |                  |                  |                  |                |          |
       v                  v                  v                  v                v          v
 scope_gap          data_quality_gap     mapping_blocked    validation_failed rollback_needed adoption_risk
```

## Rule IDs

- `migration-runbook-1` — Define source system, data objects, volume, ownership, permissions, required fields, unsupported fields, integrations, and business-critical workflows.
- `migration-runbook-2` — Map fields, transformations, identity resolution, dedupe, attachments, comments, timestamps, permissions, and audit/history requirements.
- `migration-runbook-3` — Run sample import and dry-run rehearsal with validation queries, customer review, error taxonomy, and acceptance criteria.
- `migration-runbook-4` — Plan cutover window, freeze period, communication, roles, rollback, retry, monitoring, and support staffing.
- `migration-runbook-5` — Document data loss or behavior differences transparently with customer-approved mitigations.
- `migration-runbook-6` — Validate post-migration workflows, reports, notifications, integrations, permissions, and user training before broad go-live.
- `migration-runbook-7` — Track migration defects, support cases, customer satisfaction, time-to-value, adoption milestones, and remediation owners.
- `migration-runbook-8` — Promote repeated migration patterns into product importers, templates, docs, QA fixtures, and automation.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Unsupported field | Disclose and map alternative | Source sample and customer signoff | Silent data loss |
| Dry run fails | Fix mapping before cutover | Error report and validation | Bad launch |
| Downtime needed | Schedule with rollback | Cutover plan | Customer disruption |
| Permission mismatch | Validate roles/workflows | Access model comparison | Security/support issue |
| Post-migration adoption | Run handoff playbook | Usage and training metrics | Data moved, value absent |

## Migration runbook checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `migration_scope_confirmed`, `migration_source_profiled`, `migration_mapping_approved`, `migration_dry_run_completed`, `migration_cutover_started`, `migration_rollback_triggered`, `migration_adoption_handoff_completed`.

Recommended properties: `account_id, migration_type, source_system, data_object, volume_band, mapping_status, validation_status, cutover_window, rollback_status, unsupported_field_count, support_case_id, adoption_metric, decision`.
