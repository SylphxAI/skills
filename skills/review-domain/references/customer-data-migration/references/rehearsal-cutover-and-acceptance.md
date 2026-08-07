# Rehearsal, Cutover, and Acceptance

## Validation layers

1. **Structural** — schema, types, required fields, encodings, file integrity.
2. **Cardinality** — expected/excluded/quarantined counts by entity and cohort, not total rows alone.
3. **Referential** — relationships, ownership, permissions, ordering, versions, tombstones.
4. **Semantic** — business meaning, units, time zones, locale, states, derived values, entitlements.
5. **Behavioral** — representative user/admin workflows, search, reporting, notifications, billing/support interactions.
6. **Non-functional** — throughput, latency, resource use, quotas, isolation, retry/recovery, downtime.
7. **Customer outcome** — target jobs work and known losses/exceptions are accepted.

## Cutover strategies

| Strategy | Use when | Primary risk |
| --- | --- | --- |
| Freeze and bulk switch | bounded downtime and stable source snapshot are acceptable | long freeze or failed switch |
| Incremental + final delta | source changes can be captured deterministically | missed/duplicated delta |
| Change-data capture | durable ordered change stream exists | lag, schema change, replay |
| Dual read/write | both systems can preserve equivalent semantics | split brain and divergence |
| Cohort migration | tenants are isolated and learning is transferable | cross-cohort inconsistency |
| Read-only legacy bridge | target needs temporary historical access | indefinite dependency and privacy drift |

At each phase name the authoritative writer, authoritative reader, sync direction, lag limit, stop rule, and reconciliation query.

## Go/no-go gates

Require exact source/target/rule versions; authority current; rehearsal cohort representative; all hard invariants pass; performance/recovery within declared bounds; unresolved loss accepted; support and communication ready; rollback or forward-fix proven for credible failures; telemetry and halt controls live; temporary credentials/data expiry scheduled.

## Acceptance ledger

Record expected, migrated, excluded by approved rule, quarantined, failed, retried, reconciled, customer-validated, and unresolved counts per entity/cohort. Link validation evidence, known loss, customer or owner acceptance, complaints/support cases, post-cutover monitoring, cleanup, and decommission status. `accepted` is an explicit authority state, not the absence of a complaint.
