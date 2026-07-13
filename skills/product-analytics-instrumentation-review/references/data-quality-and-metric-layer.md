# Product Measurement Quality and Metric Layer

Use this module when product events have reached a warehouse or semantic layer
and agents must decide whether a product metric is fit to drive a decision. It
does not make the product analytics artifact authoritative for payment,
entitlement, finance, support, or generic data-platform state.

## Decision-impact classes

Classify each dataset and metric before choosing controls:

| Class | Example | Required response to uncertainty |
| --- | --- | --- |
| Exploratory | one-off product question | label caveats and expiry |
| Product operating | activation or retention dashboard | visible freshness, coverage, and owner |
| Experiment decision | exposure, outcome, or guardrail | freeze conclusion on material integrity failure |
| Executive or board | canonical product KPI | certified definition, reconciliation, change history |
| Customer-facing | usage or outcome shown to a customer | access, correction, and communication path |
| Billing, entitlement, or finance | invoice, balance, revenue | external owner; reconcile, never self-certify |
| AI, safety, or compliance | training, eval, regulated record | Doctrine or domain owner and elevated assurance |

## Quality state machine

```text
source/version observed -> contract checked -> transform ran -> quality checked
        |                        |                   |                |
        v                        v                   v                v
 source late/unknown       schema conflict      run failed      metric suppressed

quality checked -> certified or exploratory -> published -> monitored -> deprecated
                         |                         |             |
                         v                         v             v
                   owner pending             stale/partial   consumers migrated
```

Dashboards and APIs expose `fresh`, `delayed`, `partial`, `backfilling`,
`incident`, `deprecated`, or `unknown` truth. Never render a stale value as
quietly current.

## Quality contract

For each critical dataset or metric record:

```text
decision_and_consumer, owner, source_and_lineage, grain, dimensions,
formula_and_filters, timezone, identity_key, null_and_exclusion_semantics,
expected_latency, schema, freshness, volume, uniqueness, referential,
distribution_and_semantic_checks, source_reconciliation, access_class,
status_surface, alert_owner, backfill, change_and_deprecation
```

Quality checks cover the failure classes that could change the decision, not
every anomaly available. Route alerts by decision impact, affected consumers,
severity, and next action; suppress repetitive noise without hiding an
unresolved incident.

## Metric-layer rules

- `analytics-quality-1` — One canonical product metric definition includes
  name, decision, owner, formula, grain, dimensions, filters, timezone,
  identity, nulls, exclusions, lineage, latency, and examples.
- `analytics-quality-2` — Separate certified, exploratory, restricted,
  incident, and deprecated states; a dashboard-specific formula is not a
  second canonical definition.
- `analytics-quality-3` — Reconcile product metrics to billing, finance,
  support, attribution, or experiment sources only through explicit boundary
  mappings; differences may be valid and must be explained.
- `analytics-quality-4` — Monitor schema, freshness, volume, uniqueness, nulls,
  referential integrity, distributions, late or duplicate data, and semantic
  invariants proportional to decision impact.
- `analytics-quality-5` — Definition and producer changes identify affected
  consumers, compatibility, migration window, discontinuity, dashboard or
  query updates, and deprecation.
- `analytics-quality-6` — Sensitive dimensions and row-level data use
  purpose-bound access; prefer aggregates where the decision does not need
  identifiable detail.
- `analytics-quality-7` — Backfills are idempotent and partition-bounded, use
  exact source and rule versions, preview impact, reconcile before and after,
  notify consumers, and annotate historical discontinuity.
- `analytics-quality-8` — A quality incident records affected decisions,
  cohorts, dashboards, experiments, customers, time range, incorrect outputs,
  correction, communication owner, and recovery evidence.

## Backfill decision table

| Situation | Safe decision | Required proof |
| --- | --- | --- |
| Late source now complete | bounded idempotent fill | partitions, counts, invariants, consumer diff |
| Definition changed | version or explicit historical rewrite | owner decision, comparison, migration notice |
| Identity bug | rebuild joins with collision checks | before/after cohort and duplicate reconciliation |
| Experiment exposure corruption | pause or invalidate conclusion | scoped exposure/outcome recovery evidence |
| Billing/product mismatch | escalate to payment or finance owner | boundary definitions and reconciled source totals |
| Sensitive field leaked | stop access and route incident | containment, deletion or correction, access audit |

## Evidence events

Track contract creation or change, producer version, quality check result, trust
state, metric certification, publication, suppression, incident, backfill
preview/start/reconcile, consumer migration, access review, and deprecation.
Preserve exact run and version identifiers plus decision impact; do not log
sampled personal data or secrets as evidence.
