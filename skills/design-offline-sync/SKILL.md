---
name: design-offline-sync
description: "Design an offline sync and conflict protocol that preserves user intent across retries, multi-device edits, deletion, and partial failure. Use when offline is a declared product capability. Do not use for ordinary online CRUD or for a live incident."
---

# Design Offline Sync

Last-write-wins needs explicit bounded-harm acceptance. A disabled sync domain queues nothing and starts no background or network work. Money, permissions, legal records, inventory, and deletion use an explicit conflict protocol, not silent merge.

Open [offline sync patterns](references/offline-sync-conflict-patterns.md) when classifying operations or choosing a merge. Open [CRDT convergence](references/crdt-convergence.md) only when a CRDT is a candidate, and prove the merge algebra rather than selecting it by name.
