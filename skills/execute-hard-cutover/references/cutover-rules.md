# Migration cutover rules

## Hard-cut default

Use when any of these hold (usual case):

- You control the owning boundary and all writers/readers in scope
- Data can be backfilled, regenerated, or re-derived
- Clients are internal agents or a bounded fleet you can update together
- Keeping dual-path costs more than the cut (matrix, tests, residual risk)

Steps: destination → migrate/backfill → flip readers/writers → verify → delete.

## Expand-contract exception

Only with **all** of:

| Gate | Evidence |
| --- | --- |
| Scale | Large user cohort, traffic share, or data volume named |
| Live impact | Concrete failure if hard-cut now |
| EV | Dual-path cost < expected incident/cost of hard-cut |
| Exit | Date + owner + delete proof for the old path |

Contract is mandatory. Expand without contract is incomplete migration.

## Forbidden residuals

- Forever feature flags for old behavior
- Undated compatibility shims
- Dual public Skills/packages for one job without retire plan
- Silent dual writers after destination is ready
- “Support both” without a terminal
