# Data Reliability Contract Patterns

## Contract record

For every critical data product record:

```text
id / producer and source authority / owner / consumers / decision or action /
grain / key / schema and semantics / event and observation time / lineage /
expected latency / quality checks / reconciliation source / trust-state surface /
alert and containment / backfill and correction / retention and access / retirement
```

## Failure model and checks

| Failure class | Example checks | Important limitation |
| --- | --- | --- |
| Contract | schema, type, enum, unit, compatibility | valid shape can carry wrong meaning |
| Freshness | source and end-to-end lag, watermark, partition age | recent data can be incomplete |
| Completeness | expected partitions/records, source totals, coverage | volume alone cannot prove correctness |
| Identity | key validity, uniqueness, merge/split, referential integrity | dedupe can erase real entities |
| Semantic | invariants, state transitions, cross-field relations | requires domain-owned meaning |
| Distribution | range, quantiles, category mix, drift | anomaly is evidence, not automatically an error |
| Reconciliation | authoritative totals, balanced deltas, round-trip checks | differences need explicit boundary semantics |
| Consumer outcome | query/API/model/job result and fallback | downstream green does not isolate the cause |

Select checks from decision impact and credible failure paths. Low-impact
exploration may carry labelled uncertainty; a customer, operational, financial,
safety, or compliance decision needs stronger source reconciliation and a
fail-safe degraded state.

## Trust-state model

```text
observed -> contract_checked -> transformed -> quality_checked -> reconciled
    |              |                 |                |              |
    v              v                 v                v              v
 unknown      incompatible       delayed/partial   quarantined    mismatch

reconciled -> published -> monitored -> deprecated
                   |            |
                   v            v
                stale       incident/backfill
```

Every consumer-facing projection distinguishes at least `healthy`, `delayed`,
`partial`, `backfilling`, `quarantined`, `incident`, `deprecated`, and `unknown`
when those states are possible. State includes observation time, affected range,
owner, consequence, and next action; an old green badge is not current evidence.

## Backfill and correction

A safe backfill/replay declares:

- exact source snapshot/range, transformation and schema versions;
- bounded partitions, resource and concurrency limits;
- idempotency/dedupe key and late/out-of-order behavior;
- dry-run or impact preview for high-impact consumers;
- before/after counts, invariants, authoritative reconciliation, and sampled
  semantic review where mechanical proof is insufficient;
- consumer pause/degraded behavior and communication;
- failure restart point, rollback or forward correction; and
- historical version/discontinuity annotation and migration of consumers.

Never overwrite historical values merely to make a current dashboard agree.
Corrections preserve what changed, why, which consumers observed it, and how the
new output was verified.

## Alert and action contract

```text
quality condition / affected range and consumers / severity / confidence /
owner / containment or degraded mode / notification / runbook /
suppression / escalation / recovery predicate / corrected outputs
```

Route by decision impact, not raw anomaly count. A delayed exploratory table may
be a ticket; a broken source feeding automated customer actions may require
quarantine and incident escalation.

## Evidence without leakage

- Prefer counts, bounded aggregates, synthetic records, content hashes, schema
  identities, and protected query references over raw row dumps.
- Separate data trust state from public disclosure. A customer sees only the
  intentional status/correction contract for their scope; internal lineage,
  sample rows, topology, and other tenants remain protected.
- Bind every quality result to dataset/version/range, check implementation,
  parameters, run identity, observation time, and evidence locator.

## Primary sources

- [OpenLineage specification](https://openlineage.io/docs/spec/)
- [JSON Schema specification](https://json-schema.org/specification)
- [W3C Data on the Web Best Practices](https://www.w3.org/TR/dwbp/)
- [Google SRE: Data Processing Pipelines](https://sre.google/sre-book/data-processing-pipelines/)
