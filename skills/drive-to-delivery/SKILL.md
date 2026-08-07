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
   When mutating source, follow `docs/policies/source-authoring-standard/` three layers: **L1** batch unblocked high-value work for this objective; **L2** atomic valid commits; **L3** land via **one revert-safe complete PR outcome** per independent outcome (queue/squash unit).
4. **Done:** claim only with evidence at the active delivery boundary (landed/live as required—not merely local green).

### Progressive disclosure

1. [references/full-standard.md](references/full-standard.md) — full execution method, startup, graph, evidence, completion.
2. [references/tool-grounded-execution.md](references/tool-grounded-execution.md) — tool-grounded iteration, checkpoint, recovery, termination.
3. [references/bounded-objective-closure-loop.md](references/bounded-objective-closure-loop.md) — explicit loop-engineering / full-scope closure for one objective.

### composition (no meta-router)

Open only packs that match the objective:

- `docs/policies/decision-quality-standard/` — framing, alternatives, claims
- `docs/policies/source-authoring-standard/` — L1 batch / L2 atomic commits / L3 revert-safe PR outcomes
- `docs/policies/delivery-standard/` — land/live done claims
- `docs/policies/evidence-and-claims-standard/` — proof strength
- `docs/policies/engineering-standard/` / `docs/policies/technology-stack-profile/` — when implementing software

## Output

Progress on **one accepted objective at its delivery terminal**, with checkpoint/evidence in the primary job output—not a separate compliance report.

## Boundaries

- Grants no deploy or credential capabilities.
- Scope is **one accepted multi-phase engineering objective** to its delivery terminal.
- Product-local ADRs remain authoritative for product decisions.
