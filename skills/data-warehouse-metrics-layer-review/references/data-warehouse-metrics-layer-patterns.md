# Data Warehouse Metrics Layer Patterns

## Data Warehouse Metrics Layer Review state machine

```text
source_ingested -> model_built -> metric_defined -> quality_checked -> published -> monitored -> deprecated
      |               |              |                 |              |             |
      v               v              v                 v              v             v
 source_late     lineage_missing  owner_missing   test_failed    access_blocked  consumer_migrated
```

## Rule IDs

- `metrics-layer-1` — Start from business decision questions and define the metric owner, consumer, decision cadence, and acceptable latency.
- `metrics-layer-2` — Specify metric name, description, formula, grain, dimensions, filters, timezone, identity key, null handling, exclusions, and source lineage.
- `metrics-layer-3` — Use one canonical definition for core metrics and derive dashboards from the metrics layer rather than hand-written BI formulas.
- `metrics-layer-4` — Test freshness, completeness, uniqueness, referential integrity, range, anomaly, and reconciliation against source systems.
- `metrics-layer-5` — Separate certified metrics, exploratory metrics, deprecated metrics, and restricted metrics with visible status.
- `metrics-layer-6` — Log definition changes, backfills, ownership transfers, dashboard migrations, and known caveats.
- `metrics-layer-7` — Reconcile finance, billing, product usage, support, and experimentation metrics where leaders make cross-functional decisions.
- `metrics-layer-8` — Control access to sensitive dimensions and row-level data while keeping aggregate decision metrics usable.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Conflicting dashboards | Pick canonical metric owner and contract | BI formulas and business decision | Metric mistrust |
| New KPI | Define grain and lineage before publish | Source schema and consumer need | Ambiguous metric adoption |
| Backfill | Estimate impact and notify consumers | Change log and comparison | Historical trend break |
| Finance/product mismatch | Reconcile definitions explicitly | Billing and product ledgers | Leadership decisions on bad numbers |
| Sensitive dimension | Restrict or aggregate | Data classification and purpose | Privacy/access breach |

## Metrics-layer checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `metric_contract_created`, `metric_quality_failed`, `metric_published`, `metric_definition_changed`, `metric_backfilled`, `metric_deprecated`, `metric_access_reviewed`.

Recommended properties: `metric_name, domain, owner_team, source_system, grain, freshness_sla_minutes, quality_status, consumer_count, change_type, backfill_window, access_tier, dashboard_id, decision`.
