---
name: review-offline-sync-conflict
description: "Review offline sync and conflict handling so user intent survives network loss, retries, multi-device concurrency, and partial failure."
---

# Review Offline Sync Conflicts

Produce an **Offline Sync and Conflict Protocol** that preserves user intent and
data across network loss, retries, restarts, multi-device concurrency,
collaboration, auth expiry, migrations, and partial failure.

## Scope

Own local state, mutation log, sync protocol, ordering/causality, merge policy,
tombstones/deletion, attachment transfer, UX states, recovery, sync-domain
signal semantics and proof requirements, and test fixtures. The end-to-end
telemetry pipeline, whole-app experience, server business rules, backup
retention, and collaboration permissions remain consumed owner contracts.

Write the protocol in markdown as the sole artifact. Name owners and sources in
prose. Consume object, identity, permission, privacy, and
server-authority inputs without copying their facts.

## Operating model

Build the complete protocol, migration/versioning, replay/chaos suite, conflict
UI, support evidence requirements, backpressure, encryption, and recovery now.
Offline capability may degrade by entity/operation, but “online first now, sync
later” is not an acceptable architecture when offline is declared. A disabled
sync domain queues nothing and reserves no background/network work.

## Workflow

1. Define user jobs, canonical entities/relationships, mutation types, device
   and collaborator count, offline duration, data size, server/client authority,
   privacy/retention, and harm if a merge is wrong.
2. Read `references/offline-sync-conflict-patterns.md`. Classify each operation
   as append-only, commutative, single-author editable, collaborative, ordered,
   destructive, permissioned, financial/legal, inventory, or attachment.
   When a CRDT is a candidate, also read
   [CRDT convergence](../engineer-testable-requirements/references/crdt-convergence.md) and prove its merge
   algebra rather than selecting it by name.
3. Specify local database/encryption, cache vs durable state, mutation/outbox
   record, stable IDs, idempotency, causal/base version, clocks, sequence,
   batching, compression, quotas, eviction, and backpressure.
4. Model cold start, local-ready, dirty, queued, syncing, retryable, blocked,
   conflict, merged, committed, rejected, tombstoned, auth-expired, quota-full,
   migration, recovery, and support-corrected states.
5. Define per-entity merge: CRDT/operation merge, field merge, server wins,
   client wins, first/last writer, manual choice, fork/copy, or authoritative
   response with retry or compensation.
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

## Current sources

Retrieve current platform/browser storage, background execution, service-worker,
backup, encryption/keychain, privacy/deletion, network, battery, and quota
authority for the exact versions. Platform persistence is not guaranteed unless
the current contract and measured eviction behavior prove it.

## Principles

- Money, permissions, legal records, inventory, deletion, and irreversible actions use an explicit conflict protocol.
- A server-authoritative write is committed after acknowledgement, or the UI shows correction and compensation.
- Queues, storage, retries, attachments, battery, data use, and background work have bounds, quota, and recovery.
- Permission revocation and deletion stop future sync and remove or lock local material under the retention contract.
- Raw sync telemetry stays protected. Customer/public sync status is an allowlisted projection.

## Output

Return one typed Offline Sync and Conflict Protocol with:

1. object/mutation/authority/harm classification;
2. local storage, encryption, IDs, version/causality, outbox, idempotency,
   batching, quota, and backpressure contracts;
3. complete sync/conflict/auth/delete/attachment/migration/recovery state
   machine and per-entity merge table;
4. user feedback, diff/choice/undo, accessibility/localization, and support UX;
5. privacy, permission, account merge/logout/reinstall, and key semantics;
6. sync-domain outcome/event semantics and proof requirements, plus
   deterministic replay/chaos fixtures;
7. rollout, compatibility, canary, rollback/forward-fix, and live readback.

Complete only when no tested duplicate, reorder, outage, restart, conflict,
permission, quota, migration, or corruption path silently loses or corrupts
authoritative user value.
