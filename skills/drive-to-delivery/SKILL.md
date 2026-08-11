---
name: drive-to-delivery
description: "Drive one accepted multi-phase objective (engineering or product) to delivery-terminal."
---

# Drive To Delivery

When one **accepted multi-phase engineering objective** must reach its
**delivery terminal** (not a polish essay, not open product betterment), run
this method until evidence at the active delivery boundary says done—or until
honestly blocked.

## When to use

- Multi-phase engineering objective already accepted
- Need research → execute → verify → repair/replan until terminal evidence
- Host continuity/objective surfaces may re-inject; do not stop after one phase

## Method

1. **Startup (direction first):** objective, acceptance map, owning **project boundary**, north-star / product direction, workspace ownership, non-interference with foreign changes. Load enough estate literacy (adjacent products/contracts) to keep boundaries correct. Bind host continuity if present (prefer uncapped long work unless user set a budget). No hard-coded host tool ids.
2. **Graph:** maximize authorized verified throughput without inflating certainty or delivery claims.
3. **Loop:** research → execute → verify → repair or replan until the delivery terminal for **this one** objective is met or an honest blocker is recorded.
   - Implement **root-cause, future-proof** fixes in the **owning project**. No workarounds, dual paths left as escape, or cross-boundary hacks.
   - When mutating source, follow `references/source-authoring-standard/` three layers: **L1** batch unblocked high-value work for this objective; **L2** atomic valid commits; **L3** land via **one revert-safe complete PR outcome** per independent outcome (queue/squash unit).
   - **Ordinary path (no bypass):** PR → Merge Queue → main → Auto Deploy → live verification (per repository delivery declaration). Never force-merge, skip required checks, admin-override, or weaken gates to unblock—fix the owning project and re-enter.
   - **Auto-merge** may be armed only after independent review is clear of material findings and required checks will admit the candidate; it is a **queue mechanism**, not quality proof and not done.
   - Before marking ready / arming auto-merge: run **independent separate-context review** (subagent when available); clear material findings first.
   - Own the outcome through the path. Worker occupancy may checkpoint/re-enter while waiting on external events; merged or deployed alone is never automatic done.
4. **Done:** claim only with evidence at the active delivery boundary (often **live-observed / well-tested**—not merely local green, PR open, auto-merge armed, merged, or deployed).

When the accepted objective is a **product outcome** (host-declared objective,
terminal = current evidence, not just a delivery boundary), also open
[references/product-objective-mode.md](references/product-objective-mode.md)
for host-continuity, research-depth, and objective-terminal rules.

## Output

Progress on **one accepted objective at its delivery terminal**, with checkpoint/evidence in the primary job output—not a separate compliance report.

## Progressive disclosure

1. [references/working-brief.md](references/working-brief.md) — mid-task re-anchor (direction, path, no-bypass, review, done layers).
2. [references/full-standard.md](references/full-standard.md) — full execution method, startup, graph, evidence, completion.
3. [references/tool-grounded-execution.md](references/tool-grounded-execution.md) — tool-grounded iteration, checkpoint, recovery, termination.
4. [references/bounded-objective-closure-loop.md](references/bounded-objective-closure-loop.md) — explicit loop-engineering / full-scope closure for one objective.
5. [references/autonomous-execution-standard/](references/autonomous-execution-standard/) — multi-step execution graphs and completion discipline for non-trivial objectives.
6. [references/source-authoring-standard/](references/source-authoring-standard/) · [references/delivery-standard/](references/delivery-standard/) — source landing and land/live done claims.
7. [references/ci-admission-standard/](references/ci-admission-standard/) · [references/ci-runner-capacity-standard/](references/ci-runner-capacity-standard/) · [references/parallel-change-integration-standard/](references/parallel-change-integration-standard/)
8. [references/product-objective-mode.md](references/product-objective-mode.md) — product-objective mode (host continuity, objective terminal)

### Composition (no meta-router)

Open only packs that match the objective:

- `../record-structured-deliberation/references/decision-quality-standard/` — framing, alternatives, claims
- `../record-structured-deliberation/references/sota-execution-standard/` — SOTA end-state selection when the objective is non-trivial
- `../synthesize-evidence-brief/references/evidence-and-claims-standard/` — proof strength
- `../build-product/references/engineering-standard/` / `../select-dependency-versions/references/technology-stack-profile/` — when implementing software
- Related jobs: `bound-request-scope`

## Boundaries

- Grants no deploy or credential capabilities.
- Scope is **one accepted multi-phase engineering objective** to its delivery terminal.
- Product-local ADRs remain authoritative for product decisions.
