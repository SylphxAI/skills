---
name: execute-hard-cutover
description: Replace a predecessor with one destination and retire the old path in the same delivery. Use for system, API, package, instruction, installer, configuration, or data migrations that require a single final authority.
---

# Execute Hard Cutover

Move all required behavior and data to the destination, switch authority once, and leave one operating path.

## Method

1. Name the predecessor, destination, users, callers, data, jobs, interfaces, install paths, and final authority.
2. Inventory every dependency on the predecessor and define its exact destination.
3. Prepare the destination with the required behavior, schema, capacity, permissions, observability, and recovery path.
4. Create a recoverable snapshot or forward-repair point for state that could be lost during the cut.
5. Pause or fence writes for the brief interval needed to establish one consistent migration boundary.
6. Migrate and backfill all required data. Use idempotent operations where retries are possible.
7. Validate conservation, counts, key invariants, referential integrity, permissions, and representative reads before switching authority.
8. Switch writers, readers, traffic, jobs, and native installation paths to the destination.
9. Run the changed customer or operator path and confirm new writes appear only at the destination.
10. Remove predecessor code, configuration, jobs, flags, documentation, installers, and operational ownership in the same delivery.
11. Confirm service recovery, data completeness, sole authority, and the requested landed, released, deployed, or live state.

## Data cutovers

Use [Database cutover and migration](references/database-cutover-and-migration.md) for online schema changes, conserved-value data, large-table locking risk, shared multi-tenant state, or external clients. Apply the destination database's standard migration tool and keep one production writer at completion. When the job is preserving customer meaning across a source and target, use `migrate-customer-data` for mapping and rehearsal, then this skill for the authority switch.

## Completion

Return the destination authority, migrated data and invariants checked, recovery point, user path exercised, predecessor surfaces removed, downtime observed, and strongest truthful delivery state.
