---
name: execute-hard-cutover
description: "Hard-cut predecessor to destination sole writer; retire dual paths."
---

# Execute Hard Cutover

Run a hard cutover when a predecessor implementation must stop owning a path and a destination must become the only writer.

## When to use

- Replacing a system, package, API, instruction set, or data path
- Dual-write / dual-read shims have become permanent residue
- Expand/contract is only a temporary phase, not the end state

## Workflow

1. **Name the cut.** Predecessor, destination, traffic/data surface, and terminal: destination sole writer; predecessor retired for that surface.
2. **Inventory dependency.** Callers, data, jobs, docs, install paths, feature flags. Record what must migrate.
3. **Prefer hard cut.** Default terminal is switch + retire. Temporary dual-write/shadow only under eng-hard-cut-01 risk-class gates with owner, date, oracles, and recovery drill. Agent speed does not skip those gates.
4. **Schema multi-step inside destination** when live DDL/lock risk exists (not a second product system). Relational apply authority is Atlas (technology-stack-profile).
5. **Backfill.** Move or rebuild required state at the destination before cut. Verify with original oracles, not memory.
6. **Cut traffic.** Point writers and readers at destination. Block new predecessor writes.
7. **Retire predecessor.** Delete or quarantine dead paths in the same delivery unit. Residuals are incomplete status.
8. **Prove.** Destination handles the surface under real checks. Predecessor no longer receives production responsibility for that surface.

## Checks

- Done is destination sole writer and predecessor retired.
- Remaining flags have an expiry and kill criteria.
- Docs and installers point at the destination.
- Schema steps inside the destination stay inside that system.

## Validation

- Destination sole writer for the named surface
- Predecessor retired or explicitly time-boxed with kill criteria under risk-class gates only
- Evidence for backfill + cut; residuals are incomplete-status only, not dual-system permission


## Progressive disclosure

- [references/cutover-rules.md](references/cutover-rules.md) — open when needed for depth
- [references/database-cutover-and-migration.md](references/database-cutover-and-migration.md) — database/Atlas cutover, dual taxonomy, readiness checklist
- [references/pre-v3-entry-method.md](references/pre-v3-entry-method.md) — open when needed for depth

## Output

Cutover plan executed · evidence · residuals

## Archived depth

If the thinner entry is insufficient, read [pre-v3-entry-method.md](references/pre-v3-entry-method.md).

