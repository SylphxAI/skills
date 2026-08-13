---
name: persist-app-data
description: "Persists app data on Platform Data bindings (database, KV, objects, search). Use when adding durable storage or replacing process-local state."
---

# Persist App Data

Give the app durable memory on Sylphx Platform Data. The process may exit.

## When to use

- Adding a database, cache, upload, or search index
- Replacing a process-local store
- Applying schema through the Platform migrations Job

## Method

1. **Name** the data job.
2. **Open** `../build-product/references/sylphx-platform-first-policy/references/data.md`.
3. **Declare** the resource in `sylphx.toml` and use the injected contract.
4. **Apply schema** with Atlas via `[database.migrations]` when relational.
5. **Prove** write then read.

## Done

Binding consumed; write-then-read holds; migrations Job used when schema changed.

## Progressive disclosure

- `../build-product/references/sylphx-platform-first-policy/references/data.md`
- `../execute-hard-cutover/references/database-cutover-and-migration.md`

## Boundaries

Product-domain validation stays in the product repo.
