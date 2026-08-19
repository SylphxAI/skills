# Data Quality Observability
Produce one **Data Reliability Contract** that tells producers, consumers, and
operators whether a dataset or projection is fit for its declared decisions and
actions, what has degraded, and how to recover without silently publishing stale
or incorrect truth.

## Atomic boundary

Own generic dataset/pipeline identity, producer-consumer contracts, lineage,
freshness, completeness, validity, uniqueness, referential and semantic
invariants, distributions, reconciliation, quality states, alerts, quarantine,
backfill/replay, correction, consumer impact, and recovery proof.
Own the lineage needed to determine fitness and impact; general provenance and custody remain with their
dedicated systems.

Read [references/data-reliability-contract.md](./data-reliability-contract.md)
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
   end-to-end outcome checks. Monitor anomalies that threaten a named contract, consumer, or outcome.
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
   historical discontinuity handling. Classify an unavailable replay path
   explicitly and design recovery around the source's actual capabilities.
7. Prove normal and failure behavior with schema/contract fixtures, late and
   duplicate data, corrupt partitions, producer version drift, partial replay,
   reconciliation mismatch, consumer fallback, and recovery readback.

## Composition

- `review-domain` (`product-analytics-instrumentation`) owns product behavior event,
  identity, metric, experiment, and product-dashboard semantics.
- `review-domain` (`operational-observability`) owns service runtime health and operator
  diagnostics; it may consume data reliability state as one dependency signal.
- `review-domain` (`customer-data-migration`) owns one bounded source-to-target customer or
  tenant import/migration and its acceptance; this Skill owns the recurring
  reliability of an ongoing data product or pipeline.
- `review-domain` (`search-discovery-quality`) owns retrieval, relevance, ranking, query
  understanding, and user discovery quality. Source-to-index freshness and
  reconciliation remain data reliability.
- `design-product` owns a general machine-readable lineage,
  derivation, custody, receipt, and verification system. This contract consumes
  only enough lineage to judge fitness and affected consumers.
- Payment/ledger owners retain billing, entitlement, balance, and settlement
  authority; this contract detects and routes mismatches, while money
  certification requires the owning ledger.
- AI risk/evaluation owners retain training/eval dataset suitability and model
  assurance beyond generic pipeline reliability.
- Privacy and security owners retain purpose, access, data lifecycle, and threat
  decisions. `run-incident-response` owns an active quality incident lifecycle.

## Path

- Schema pass is one check. Semantic correctness, completeness, and decision fitness have their own oracles.
- Authority is the named source of record. Currency of a dashboard, warehouse table, replica, cache, or model feature is characterization.
- Quality evidence uses bounded aggregates, hashes, synthetic fixtures, and protected access.
- Unknown or missing observation stays `unknown`.
- High-impact backfill carries idempotency, exact version binding, impact preview, reconciliation, and consumer communication.
- Product metrics, money, permissions, legal records, and model-evaluation policy keep their owners.

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
its declared use, degraded states stay visibly degraded, and repair
can use the applicable replay, backfill, rebuild, quarantine, invalidation, or
forward-correction path and then reconcile without creating a second authority.
