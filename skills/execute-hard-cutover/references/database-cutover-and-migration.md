# Database cutover and migration

Use this method to move persistent state from a predecessor to one destination while preserving data and ending with one production writer.

## Choose the migration shape

- Use a brief write pause for a clear consistency boundary when the product can tolerate short downtime.
- Use destination-local schema preparation for large or locking-sensitive changes: add the new shape, backfill, validate, then enforce final constraints.
- Use transactional change capture when continuous writes are a real product requirement and both stores can share an exact ordered boundary.
- Use the database and repository's standard versioned migration tool as the sole production schema applicator.

The completed cutover has one authoritative schema, one writer, one read path, and one operational owner.

## Cutover method

1. Inventory tables, relationships, callers, jobs, webhooks, workers, reports, permissions, retention rules, and operational dependencies.
2. Prepare the destination schema, indexes, constraints, capacity, access policy, observability, and migration code.
3. Establish a recovery point with point-in-time recovery, a snapshot, an append-only business log, or a forward-repair migration appropriate to the data.
4. Test the migration against a representative copy and rehearse recovery from an interrupted apply.
5. Pause or fence writes at the chosen consistency boundary.
6. Run an idempotent backfill that records stable progress and supports safe retry.
7. Validate row counts, checksums, conserved totals, foreign keys, uniqueness, permissions, and representative tenant or account reads.
8. Switch writers and readers to the destination, then resume service.
9. Exercise new writes, updates, reads, jobs, and recovery behavior through the real product path.
10. Remove predecessor schemas, code, credentials, jobs, flags, documentation, and operational ownership after the destination checks pass.

## High-integrity data

Money, ledgers, multi-tenant shared state, large online rewrites, externally controlled clients, and irreversible side effects benefit from stronger preparation:

- define conservation equations and domain invariants;
- use transaction boundaries or ordered change capture;
- test migration retry and partial-apply recovery;
- name the restore point and forward-repair procedure;
- rehearse the authority switch with production-equivalent volume; and
- confirm predecessor write volume reaches zero at completion.

## Migration tooling

- Pin the migration CLI to an exact version and the production operating system and architecture.
- Keep migration files append-only after production application.
- Replay the full migration history against an ephemeral database in CI.
- Run the tool's schema lint and destructive-change analysis when available.
- Generate migration integrity files with the same pinned tool used by CI and production.
- Prefer forward repair and point-in-time recovery for production recovery.

## Completion checklist

- [ ] Every predecessor dependency has a destination.
- [ ] Backfill supports safe retry and completes for the full data set.
- [ ] Counts, checksums, conservation rules, relationships, and permissions pass.
- [ ] Restore or forward-repair procedures are ready.
- [ ] Product reads, writes, jobs, and operational telemetry use the destination.
- [ ] The predecessor has zero production writers and zero operating responsibility.
- [ ] Obsolete code, configuration, credentials, jobs, and documentation are removed.
