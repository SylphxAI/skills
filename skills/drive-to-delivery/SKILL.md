---
name: drive-to-delivery
description: "Drive one multi-phase engineering objective to delivery-terminal."
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

1. **Startup:** objective, acceptance map, workspace ownership, non-interference with foreign changes. Bind host continuity if present (prefer uncapped long work unless user set a budget). No hard-coded host tool ids.
2. **Graph:** maximize authorized verified throughput without inflating certainty or delivery claims.
3. **Loop:** research → execute → verify → repair or replan until the delivery terminal for **this one** objective is met or an honest blocker is recorded.
   When mutating source, follow `references/source-authoring-standard/` three layers: **L1** batch unblocked high-value work for this objective; **L2** atomic valid commits; **L3** land via **one revert-safe complete PR outcome** per independent outcome (queue/squash unit).
4. **Done:** claim only with evidence at the active delivery boundary (landed/live as required—not merely local green).

### Progressive disclosure

1. [references/full-standard.md](references/full-standard.md) — full execution method, startup, graph, evidence, completion.
2. [references/tool-grounded-execution.md](references/tool-grounded-execution.md) — tool-grounded iteration, checkpoint, recovery, termination.
3. [references/bounded-objective-closure-loop.md](references/bounded-objective-closure-loop.md) — explicit loop-engineering / full-scope closure for one objective.

### composition (no meta-router)

Open only packs that match the objective:

- `../synthesize-evidence-brief/references/structured-deliberation/references/decision-quality-standard/` — framing, alternatives, claims
- `references/source-authoring-standard/` — L1 batch / L2 atomic commits / L3 revert-safe PR outcomes
- `references/delivery-standard/` — land/live done claims
- `../synthesize-evidence-brief/references/evidence-and-claims-standard/` — proof strength
- `../build-product/references/engineering-standard/` / `../select-dependency-versions/references/technology-stack-profile/` — when implementing software

## Output

Progress on **one accepted objective at its delivery terminal**, with checkpoint/evidence in the primary job output—not a separate compliance report.


## Progressive disclosure

- [references/full-standard.md](references/full-standard.md) — full drive method
- [references/bound-request-scope/](references/bound-request-scope/) — bound objective/in/out before long work
- [references/pursue-objective/](references/pursue-objective/) — fixed-objective pursuit loop depth
- [references/source-authoring-standard/](references/source-authoring-standard/) — L1/L2/L3 source landing
- [references/delivery-standard/](references/delivery-standard/) — land/live done claims
- [references/ci-admission-standard/](references/ci-admission-standard/) · [references/ci-runner-capacity-standard/](references/ci-runner-capacity-standard/)
- [references/parallel-change-integration-standard/](references/parallel-change-integration-standard/)

## Boundaries

- Grants no deploy or credential capabilities.
- Scope is **one accepted multi-phase engineering objective** to its delivery terminal.
- Product-local ADRs remain authoritative for product decisions.
