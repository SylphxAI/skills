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
3. **Prefer hard cut.** Default is switch + retire. Use short expand/contract only when required for safety, with an explicit end date and owner.
4. **Backfill.** Move or rebuild required state at the destination before cut. Verify with original oracles, not memory.
5. **Cut traffic.** Point writers and readers at destination. Block new predecessor writes.
6. **Retire predecessor.** Delete or quarantine dead paths in the same delivery unit when safe. Do not leave "just in case" dual paths.
7. **Prove.** Destination handles the surface under real checks. Predecessor no longer receives production responsibility for that surface.

## Gotchas

- A green dual-path is not done.
- Feature flags that never expire become the new system of record — ban them as the terminal state.
- Docs and installers often keep pointing at the predecessor after code cutover.

## Validation

- Destination sole writer for the named surface
- Predecessor retired or explicitly time-boxed with kill criteria
- Evidence for backfill + cut + residual list


## Progressive disclosure

- [references/cutover-rules.md](references/cutover-rules.md) — open when needed for depth
- [references/pre-v3-entry-method.md](references/pre-v3-entry-method.md) — open when needed for depth

## Output

Cutover plan executed · evidence · residuals

## Archived depth

If the thinner entry is insufficient, read [pre-v3-entry-method.md](references/pre-v3-entry-method.md).

