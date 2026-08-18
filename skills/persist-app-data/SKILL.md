---
name: persist-app-data
description: Persist app data in a database, KV store, object store, or search index. Use when adding durable storage or replacing process-local state.
---

# Persist App Data

Give the app durable memory that survives process exit and restart.

## When to use

- Adding a database, cache, upload, or search index
- Replacing a process-local store
- Applying or changing a durable schema

## Method

1. **Name** the data job, state class, write authority, retention, privacy,
   backup, restore, and schema ownership.
2. **Read** the product's active storage contract and the selected provider's
   current official documentation.
3. **Declare** the resource through the repository's supported configuration
   and use its injected binding or configured client.
4. **Apply schema** through the repository's single declared migration path
   when the store is relational or otherwise schema-governed.
5. **Prove** write then read through the product contract, including the
   failure and recovery behavior changed.

## Done

The declared binding is consumed, write-then-read holds, and the owning
migration path was used when schema changed.

## Progressive disclosure

- Use `execute-hard-cutover` for a replacement or migration of an existing
  authority; its product-owned migration contract remains the source for the
  specific cutover.

## Boundaries

Product-domain validation stays in the product repository. Do not hide required
durability in process memory or introduce a second live schema writer.
