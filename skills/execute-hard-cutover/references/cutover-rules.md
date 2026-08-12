# Migration cutover rules

Universal max-scale method. No smaller fork for small repositories. See also
[database-cutover-and-migration.md](database-cutover-and-migration.md).

## Hard-cut default (terminal always)

Usual case — any of:

- You control the owning boundary and all writers/readers in scope
- Data can be backfilled, regenerated, or re-derived
- Clients are internal agents or a bounded fleet you can update together
- Dual-system entropy exceeds the one-time cut cost

Steps: destination → (schema multi-step inside destination if needed) →
migrate/backfill with oracles → flip writers → flip readers → verify → **delete
predecessor**.

## Temporary dual-write / expand steps (exception)

Open only when a **risk class** hits (any one): money/conserved value;
multi-tenant shared blast; large online DDL/lock; external un-updatable clients;
irreversible external effects.

Then require **all** procedure gates:

| Gate | Evidence |
| --- | --- |
| Live impact | Concrete failure if hard-cut now without temporary path |
| EV | Temporary dual/expand cost < expected hard-cut incident cost |
| Exit | Date + owner + delete proof for the old path |
| Oracles | Sole-writer readiness oracles green |
| Recovery | Forward repair and/or PITR restore point named |

Contract is mandatory. Expand without contract is incomplete migration.
Schema multi-step **inside B** is not product dual-path.

## Forbidden residuals

- Permanent dual-write or dual-read product authority
- Forever feature flags for old behavior
- Undated compatibility shims
- Dual public Skills/packages for one job without retire plan
- Silent dual writers after destination is ready
- “Support both” without a terminal
- Residuals used as permission to keep the predecessor alive
