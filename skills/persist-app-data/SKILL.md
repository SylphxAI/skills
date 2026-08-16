---
name: persist-app-data
description: Persist application data in the product's current durable store. Use when adding a database, cache, or object store, or when replacing process-local state.
---

# Persist App Data

Give the product durable memory that survives process restart. Use the store
and migration path the owning repository already selected.

## Method

1. Name the data job, records, identity, consistency, retention, and who may
   read or write.
2. Inspect the product's current data store, schema owner, credentials, and
   official client or SDK. Do not introduce a second store when one already
   owns the job.
3. Place durable state behind the store's current public contract. Keep
   product validation in the product domain.
4. Apply relational schema only through the database and repository's standard
   versioned migration tool. Use `execute-hard-cutover` and
   [Database cutover and migration](../execute-hard-cutover/references/database-cutover-and-migration.md)
   when replacing a predecessor store or writer.
5. Prove the job with a real write then read: insert/select, set/get,
   upload/download, or index/query. A process health check is not data proof.
6. Cover failure, retry, tenant or account isolation, deletion, and recovery
   that the job requires.

## Output

Return the store and contract, schema or migration path, write-then-read
evidence, isolation and recovery behavior, and strongest truthful delivery
state.

## Boundaries

Managed search, flags, or analytics that are not the product's primary durable
store use `wire-managed-backend-services`. Isolated agent filesystems use
`provision-agent-workspace`.
