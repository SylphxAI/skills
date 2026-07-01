# Data Lineage Impact Patterns

## Data Lineage Impact Review state machine

```text
change_proposed -> lineage_mapped -> consumers_notified -> tests_passed -> migration_run -> monitored
       |                 |                    |              |              |
       v                 v                    v              v              v
 unknown_source    owner_missing       consumer_blocked  test_failed   drift_detected
```

## Rule IDs

- `data-lineage-1` — Map source, event, table, transformation, model, metric, dashboard, export, reverse ETL, AI dataset, and customer-facing report dependencies.
- `data-lineage-2` — Classify change type, compatibility, semantic impact, privacy class, freshness/SLA impact, cost/cardinality impact, and retention impact.
- `data-lineage-3` — Assign owners for source, pipeline, metric, dashboard, consumer, privacy/security review, and rollback decision.
- `data-lineage-4` — Test schema contracts, sample records, null rates, ranges, volume, freshness, referential integrity, and metric deltas.
- `data-lineage-5` — Communicate breaking or semantic changes with migration path, timeline, sample diff, known caveats, and deprecation date.
- `data-lineage-6` — Control backfills with reproducible job, window, idempotency, impact estimate, validation, and rollback/archive strategy.
- `data-lineage-7` — Review AI/ML datasets and personalization inputs for leakage, bias, stale features, and policy drift after lineage changes.
- `data-lineage-8` — Monitor post-change anomalies, consumer errors, dashboard breaks, support tickets, and decision-metric deltas.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Breaking schema | Require migration and owner signoff | Consumer list and tests | Pipeline/dashboard failure |
| Semantic change | Version metric definition | Before/after sample | Silent decision drift |
| Backfill | Run reproducible validated job | Window and impact estimate | Historical metric rewrite |
| New PII field | Privacy/security review | Data class and purpose | Uncontrolled sensitive data |
| AI dataset dependency | Rebuild/eval downstream model | Dataset lineage and eval | Model regression |

## Data lineage checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `data_lineage_change_proposed`, `data_lineage_mapped`, `data_consumer_notified`, `data_contract_test_failed`, `data_backfill_started`, `data_backfill_completed`, `data_lineage_drift_detected`.

Recommended properties: `change_id, source_system, asset_type, asset_name, owner_team, change_type, compatibility, data_class, consumer_count, test_status, backfill_window, metric_delta, rollback_status, decision`.
