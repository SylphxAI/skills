---
name: offline-sync-conflict-review
description: "Design or audit one offline/local-first synchronization and conflict protocol: local storage, queued mutations, idempotency, causality/order, reconnect, tombstones, optimistic states, multi-device/collaborative merges, attachments, auth expiry, encryption, schema migration, data-loss recovery, UX, support, observability, and chaos tests. Use when unreliable connectivity or concurrent edits need an independently acceptable sync artifact; use App Design for whole-product workflows."
---

# Offline Sync Conflict Review

Produce an **Offline Sync and Conflict Protocol** that preserves user intent and
data across network loss, retries, restarts, multi-device concurrency,
collaboration, auth expiry, migrations, and partial failure.

## Atomic boundary

Own local state, mutation log, sync protocol, ordering/causality, merge policy,
tombstones/deletion, attachment transfer, UX states, recovery, telemetry, and
test fixtures. Do not own whole-app experience, server business rules, backup
retention, or collaboration permissions except as consumed contracts.

Begin with the [shared product artifact envelope](references/product-artifact-envelope.schema.json)
and object, identity, permission, privacy, and server-authority inputs that each
name the exact producer contract through `fulfillsHandoffId`; digest-pin only
sealed inputs.

## Agent-first invariant

Build the complete protocol, migration/versioning, replay/chaos suite, conflict
UI, support diagnostics, observability, backpressure, encryption, and recovery
now. Offline capability may degrade by entity/operation, but “online first now,
sync later” is not an acceptable architecture when offline is declared. A
disabled sync domain queues nothing and reserves no background/network work.

## Workflow

1. Define user jobs, canonical entities/relationships, mutation types, device
   and collaborator count, offline duration, data size, server/client authority,
   privacy/retention, and harm if a merge is wrong.
2. Read `references/offline-sync-conflict-patterns.md`. Classify each operation
   as append-only, commutative, single-author editable, collaborative, ordered,
   destructive, permissioned, financial/legal, inventory, or attachment.
   When a CRDT is a candidate, also read
   `../engineering-standard/references/crdt-convergence.md` and prove its merge
   algebra rather than selecting it by name.
3. Specify local database/encryption, cache vs durable state, mutation/outbox
   record, stable IDs, idempotency, causal/base version, clocks, sequence,
   batching, compression, quotas, eviction, and backpressure.
4. Model cold start, local-ready, dirty, queued, syncing, retryable, blocked,
   conflict, merged, committed, rejected, tombstoned, auth-expired, quota-full,
   migration, recovery, and support-corrected states.
5. Define per-entity merge: CRDT/operation merge, field merge, server wins,
   client wins, first/last writer, manual choice, fork/copy, reject/compensate.
   Last-write-wins requires explicit bounded harm acceptance.
6. Design delete/tombstone, restore, account merge/logout, permission revocation,
   cross-device key rotation, attachment resume/checksum, reinstall, and
   schema/protocol expand-contract semantics.
7. Define UI feedback for pending/local/committed/failed/conflicted/recovered,
   user preview/diff/undo, accessibility/localization, support evidence, and
   truthful correction of optimistic state.
8. Prove with deterministic replay, duplicate/out-of-order/lost events, long
   offline, clock skew, concurrent edits, process death, storage eviction,
   quota, corruption, expired auth, permission change, migration, and low-end
   resource/poor-network chaos tests.

## Source verification

Retrieve current platform/browser storage, background execution, service-worker,
backup, encryption/keychain, privacy/deletion, network, battery, and quota
authority for the exact versions. Platform persistence is not guaranteed unless
the current contract and measured eviction behavior prove it.

## When not to use

- Use `app-design-blueprint` when offline/sync is one part of unresolved whole
  workflows, information architecture, identity, collaboration, and UX.
- Use a database/data-architecture procedure when the job is server storage,
  schema design, replication, or backup without a client sync protocol.
- Use `payment-platform-readiness` for provider-authoritative purchases,
  entitlement reconciliation, and finance ledgers; never merge them locally.
- Use `product-analytics-instrumentation-review` for telemetry event delivery;
  analytics loss must not share the user-data sync authority.

## Guardrails

- Never silently merge money, permissions, legal records, inventory, deletion,
  or irreversible actions using a convenience heuristic.
- Never confirm a server-authoritative write as committed before acknowledgement
  without visible correction/compensation semantics.
- Bound queues, storage, retries, attachment concurrency, battery, data use, and
  background work; expose quota and recovery instead of dropping writes.
- Permission revocation and deletion must stop future sync and remove/lock local
  material according to the authoritative retention contract.
- Telemetry and support logs must not leak synchronized content or credentials.

## Output contract

Return one typed Offline Sync and Conflict Protocol with:

1. object/mutation/authority/harm classification;
2. local storage, encryption, IDs, version/causality, outbox, idempotency,
   batching, quota, and backpressure contracts;
3. complete sync/conflict/auth/delete/attachment/migration/recovery state
   machine and per-entity merge table;
4. user feedback, diff/choice/undo, accessibility/localization, and support UX;
5. privacy, permission, account merge/logout/reinstall, and key semantics;
6. event/metric/diagnostic contract and deterministic replay/chaos fixtures;
7. rollout, compatibility, canary, rollback/forward-fix, and live readback.

Complete only when no tested duplicate, reorder, outage, restart, conflict,
permission, quota, migration, or corruption path silently loses or corrupts
authoritative user value.
