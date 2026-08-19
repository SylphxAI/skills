---
name: execute-hard-cutover
description: "Replace a predecessor with one destination and retire the old path in the same delivery. Use for system, API, package, instruction, installer, configuration, or data migrations that require a single final authority."
---

# Execute Hard Cutover

One destination. Switch authority once. Retire the predecessor in the same delivery. Keep one production writer at completion.

Open [database cutover](references/database-cutover-and-migration.md) for online schema changes, conserved-value data, large-table locking, or shared multi-tenant state.
