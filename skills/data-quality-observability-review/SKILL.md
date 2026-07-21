---
name: data-quality-observability-review
description: "Design or audit a recurring Data Reliability Contract for data products and pipelines—datasets, streams, imports, transformations, warehouses, and search/operational projections—across freshness, completeness, semantic drift, reconciliation, trust state, repair, and consumer impact. Use when ongoing data fitness is the primary artifact. Do not use for one bounded customer/tenant migration, search relevance/ranking quality, a general provenance/custody graph, product analytics metrics, ledger truth, privacy, or active incident response alone."
---

# Data Quality Observability Review

Produce one **Data Reliability Contract** that tells producers, consumers, and
operators whether a dataset or projection is fit for its declared decisions and
actions, what has degraded, and how to recover without silently publishing stale
or incorrect truth.

## Atomic boundary

Own generic dataset/pipeline identity, producer-consumer contracts, lineage,
freshness, completeness, validity, uniqueness, referential and semantic
invariants, distributions, reconciliation, quality states, alerts, quarantine,
backfill/replay, correction, consumer impact, and recovery proof.
Own only the lineage needed to determine fitness and impact; do not expand this
artifact into a general provenance or custody system.

Read [references/data-reliability-contract.md](references/data-reliability-contract.md)
for quality states, check selection, reconciliation, and backfill patterns.

## Workflow

1. Inventory the critical data products, producers, transformations, stores,
   consumers, decisions/actions, owners, latency expectations, retention,
   sensitivity, and blast radius of missing, late, duplicated, or wrong data.
2. Define grain, keys, schema, units, timestamps, ordering, null/unknown meaning,
   source authority, lineage, version, compatibility, and consumer contract.
3. Select checks from the failure modes that can change a consumer decision:
   freshness, volume/completeness, validity, uniqueness, referential integrity,
   distribution, semantic invariants, drift, cross-source reconciliation, and
   end-to-end outcome checks. Do not monitor every statistically unusual value.
4. Model `healthy`, `delayed`, `partial`, `backfilling`, `quarantined`,
   `incident`, `deprecated`, and `unknown`. Propagate the trust state to
   downstream APIs, dashboards, models, automations, and human decisions.
5. Define alert severity, owner, affected consumers, immediate containment,
   suppression, escalation, correction, and recovery predicate. Freeze or
   degrade unsafe decisions instead of showing stale data as quietly current.
6. Select the applicable repair path—replay, backfill, rebuild, quarantine,
   invalidation, rollback, or forward correction—and bind it to exact source
   and transformation versions, bounded impact, preview where safe,
   before/after reconciliation, duplicate control, consumer notification, and
   historical discontinuity handling. Do not invent replayability for a source
   that cannot be replayed.
7. Prove normal and failure behavior with schema/contract fixtures, late and
   duplicate data, corrupt partitions, producer version drift, partial replay,
   reconciliation mismatch, consumer fallback, and recovery readback.

## Composition

- `product-analytics-instrumentation-review` owns product behavior event,
  identity, metric, experiment, and product-dashboard semantics.
- `operational-observability-review` owns service runtime health and operator
  diagnostics; it may consume data reliability state as one dependency signal.
- `customer-data-migration-review` owns one bounded source-to-target customer or
  tenant import/migration and its acceptance; this Skill owns the recurring
  reliability of an ongoing data product or pipeline.
- `search-discovery-quality-review` owns retrieval, relevance, ranking, query
  understanding, and user discovery quality. Source-to-index freshness and
  reconciliation remain data reliability.
- `provenance-system-design` owns a general machine-readable lineage,
  derivation, custody, receipt, and verification system. This contract consumes
  only enough lineage to judge fitness and affected consumers.
- Payment/ledger owners retain billing, entitlement, balance, and settlement
  authority; this contract detects and routes mismatches but cannot certify money.
- AI risk/evaluation owners retain training/eval dataset suitability and model
  assurance beyond generic pipeline reliability.
- Privacy and security owners retain purpose, access, data lifecycle, and threat
  decisions. `incident-standard` owns an active quality incident lifecycle.

## Guardrails

- A passing schema check does not prove semantic correctness, completeness, or
  fitness for a decision.
- A dashboard, warehouse table, replica, cache, or model feature is not
  authoritative merely because it is current.
- Do not log sample rows, secrets, credentials, or personal data as quality
  evidence; use bounded aggregates, hashes, synthetic fixtures, and protected
  access when row-level diagnosis is necessary.
- Unknown or missing observation remains `unknown`; it does not become healthy.
- Do not backfill high-impact data without idempotency, exact version binding,
  impact preview, reconciliation, and consumer communication.
- Do not let a generic quality contract redefine product metrics, money,
  permissions, legal records, or model-evaluation policy.

## Output contract

Return one Data Reliability Contract containing:

1. data-product inventory, owners, consumers, decisions/actions, authority,
   latency, sensitivity, and blast radius;
2. schema/semantic/grain/key/time/lineage/version and compatibility contract;
3. risk-proportionate checks, thresholds, evidence, and blind spots;
4. trust-state model and downstream propagation/fallback rules;
5. alert, quarantine, correction, escalation, and incident handoff;
6. applicable replay, backfill, rebuild, quarantine, invalidation, rollback, or
   forward-correction plan, plus reconciliation, migration, and deprecation;
7. access, privacy, retention, cost, and evidence controls; and
8. fixtures, fault cases, consumer-impact proof, and recovery readback.

Complete only when each critical consumer can determine whether data is fit for
its declared use, degraded states cannot masquerade as current truth, and repair
can use the applicable replay, backfill, rebuild, quarantine, invalidation, or
forward-correction path and then reconcile without creating a second authority.
