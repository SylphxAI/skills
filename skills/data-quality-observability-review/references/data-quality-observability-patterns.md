# Data Quality Observability Patterns

## Data quality state machine

```text
source_changed -> contract_checked -> pipeline_ran -> quality_checked -> metric_published -> decision_consumed -> trust_reviewed
      |                 |                |                 |                  |                   |
      v                 v                v                 v                  v                   v
 schema_drift     contract_missing   pipeline_failed   quality_failed   dashboard_suppressed  incident_opened
```

## Rule IDs

- `data-quality-1` — Classify the dataset by decision impact: exploratory, product dashboard, billing, compliance, AI training/eval, support, or executive metric.
- `data-quality-2` — Define checks for schema, freshness, volume, uniqueness, nulls, referential integrity, distribution, reconciliation, and semantic invariants.
- `data-quality-3` — Critical metrics need owner, SLA, source lineage, transformation owner, and escalation path.
- `data-quality-4` — Dashboard trust states must show fresh, delayed, partial, backfilling, incident, and deprecated.
- `data-quality-5` — Backfills need idempotency, partition plan, reconciliation, replay window, and stakeholder notice.
- `data-quality-6` — Event taxonomy changes need versioning, producer contract, consumer impact, and migration window.
- `data-quality-7` — Alerts should route by decision impact and owner, not by raw anomaly count.
- `data-quality-8` — Billing, entitlement, privacy, and AI datasets need stricter audit and sampling rules.
- `data-quality-9` — Quality incidents should record affected dashboards, decisions, customers, and corrected outputs.
- `data-quality-10` — Metric definitions belong in one source of truth with tests and examples.

## Decision table

| Failure | Severity | Immediate action | Recovery proof |
| --- | --- | --- | --- |
| Dashboard delayed | Medium | Show stale banner and notify owner | Freshness restored and user notice |
| Billing reconciliation mismatch | Critical | Freeze invoice run and open incident | Reconciled totals and audit log |
| Event schema drift | High | Block or version producer change | Consumer tests and migration notes |
| AI eval dataset corruption | High | Pause eval conclusions | Dataset checksum and sampled review |
| Low-risk exploratory table missing | Low | Ticket owner | Pipeline rerun proof |

## Quality checklist

- Dataset owner, consumer, SLA, and decision impact are listed.
- Checks cover structural, freshness, reconciliation, and semantic quality.
- Dashboards expose trust state and incident links.
- Backfill and replay procedures are idempotent and observable.
- Alerts have severity, owner, runbook, and suppression rules.
- Metric definitions and examples are versioned.

## Event schema

Track: `data_quality_check_passed`, `data_quality_check_failed`, `data_freshness_delayed`, `schema_drift_detected`, `metric_suppressed`, `backfill_started`, `backfill_reconciled`, `data_quality_incident_opened`, `metric_definition_changed`.

Recommended properties: `dataset`, `metric_name`, `owner_team`, `decision_impact`, `check_type`, `severity`, `freshness_lag_minutes`, `rows_expected`, `rows_observed`, `partition`, `lineage_node`, `dashboard`, `incident_id`, `reconciled`.
