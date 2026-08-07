# Pre-v3 entry method (execute-hard-cutover)

> Archived entry procedure from `1ba07c46dce3f448e84374ba2b52aafc65e861ce` so clean-break rewrite of `SKILL.md` does not destroy researched method text. Prefer the current `SKILL.md` for routing; use this file when the deeper pre-v3 procedure is needed.

---

# Execute Hard Cutover

When you need to **move** a system (API, schema, package, skill, stack, data,
runtime instruction, or owned boundary) from a predecessor to a destination,
run **one migration** to a clean cutover—not a permanent dual-stack.

## When to use

- Replace an old path/package/schema/API with a new one
- Cut over owned boundaries (engine vs title, platform vs product, etc.)
- Retire shims, flags, dual writers, legacy lanes, or undated “compat”
- Upgrade across major versions when the job is the cutover itself

## Method

**Destination sole writer → migrate/backfill → verify → delete predecessor.**  
Default is **hard-cut**. Dual-path is exceptional tech debt.

### 1. Frame
- **Destination** state (what sole truth looks like when done)
- **Predecessor** surfaces to retire (code, data, flags, packages, docs, tests)
- **Ownership boundary** for each piece (who owns write authority after cut)
- Non-goals: forever-compat matrix, “might break someone” without scale evidence

### 2. Research
- Current writers/readers of predecessor and destination
- Data and traffic that must move (backfill, re-pin, reinstall, regenerate)
- Whether any **large-scale live user** path would hard-fail a clean cut
- Stop when more reading will not change cut strategy

### 3. Admit work
**Default — hard-cut (In):**
- Implement destination on the owning boundary
- Migrate/backfill all owned state to destination
- Point all in-boundary clients at destination
- Verify original oracles on destination
- Delete predecessor paths, shims, dual writers, dead tests/docs

**Exception — expand-contract (only if all true):**
- Demonstrated large-scale user or live production impact if cut hard now
- Measured risk that a temporary dual path reduces
- Named owner + **dated** contract/retirement gate

“Might break someone” without scale/path/cost is **not** an exception.

### 4. Implement
- When landing source: L1 batch → L2 atomic commits → L3 revert-safe PR outcome(s) (`source-authoring-standard`).
- Prefer one coherent cutover on the **owning** layer; no title-local forever
  bridges for engine floors, no product dual-write “for safety”
- Backfill or regenerate so destination is complete, not partial
- If expand-contract: expand → migrate traffic/data → **contract** (mandatory)
- Do not stop at “both work”

### 5. Deliver / verify
- Original oracles for the migrated behavior (not only local green)
- Destination is **sole writer** for the framed boundary
- Predecessor removed or behind an explicit dated residual with owner
- Separate local vs landed vs live claims when delivery is in scope

## Cycle done

Migration cycle is done when:

1. Destination owns the framed truth on the correct boundary, and
2. Predecessor dual-path is gone **or** an exception residual has owner + date
   + contract proof plan, and
3. Oracles for the destination path pass.

Not done: “compat left for later,” undated flags, dual packages for comfort.

## optional composition

Open only what the cut touches:

- `engineering-standard` — safety, verification, eng-hard-cut predicates
- `source-authoring-standard` — L1 batch cutover work, L2 atomic commits, L3 revert-safe PR outcome(s); `delivery-standard` — land/live honesty
- `instruction-evolution-standard` — skill/constitution generation cutovers
- `author-skill` / `curate-skill-repository` — portfolio package retirements
- `parallel-change-integration-standard` — only under measured Git contention

## Boundaries

- Does not grant deploy or credential capabilities.
- Hard-cut still requires verification—not silent production breakage.
- Historical docs/ADRs are not permission to keep dual paths running.
