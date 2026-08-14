---
name: drive-to-delivery
description: "Drive one accepted multi-phase objective (engineering or product) to its asked terminal."
---

# Drive To Delivery

When one **accepted multi-phase engineering objective** must reach its
**asked terminal** (not a polish essay, not open product betterment), run
this method until that terminal is met—or until honestly blocked.

## When to use

- Multi-phase engineering objective already accepted
- Need research → execute → run the changed path → repair/replan until the asked terminal
- Host continuity/objective surfaces may re-inject; do not stop after one phase

## Method

1. **Startup:** objective, acceptance map, workspace ownership, non-interference with foreign changes. Bind host continuity if present (prefer uncapped long work unless user set a budget). No hard-coded host tool ids.
2. **Graph:** maximize authorized throughput without inflating certainty or delivery claims.
3. **Loop:** research → execute → run the path you changed → repair or replan until the asked terminal for **this one** objective is met or an honest blocker is recorded.
   When mutating source, follow `references/source-authoring-standard/` three layers: **L1** batch unblocked high-value work for this objective; **L2** atomic valid commits; **L3** land via **one revert-safe complete PR outcome** per independent outcome (queue/squash unit).
4. **Done:** the asked terminal is met. Reversible local work is done when the changed path is correct. Claim landed or live only when that layer is actually true.

When the accepted objective is a **product outcome** (host-declared objective,
terminal = the asked product result, not a default live boundary), also open
[references/product-objective-mode.md](references/product-objective-mode.md)
for host-continuity, research-depth, and objective-terminal rules.

## Output

Progress on **one accepted objective at its asked terminal**, in the primary job output—not a separate compliance report.

## Progressive disclosure

1. [references/full-standard.md](references/full-standard.md) — full execution method, startup, graph, completion.
2. [references/tool-grounded-execution.md](references/tool-grounded-execution.md) — tool-grounded iteration, checkpoint, recovery, termination.
3. [references/bounded-objective-closure-loop.md](references/bounded-objective-closure-loop.md) — explicit loop-engineering / full-scope closure for one objective.
4. [references/autonomous-execution-standard/](references/autonomous-execution-standard/) — multi-step execution graphs and completion discipline for non-trivial objectives.
5. [references/source-authoring-standard/](references/source-authoring-standard/) · [references/delivery-standard/](references/delivery-standard/) — source landing. Open delivery-standard only when the asked terminal is land, release, or live. For industry product docs (Vision · North Star Metric · OKR · PRD · Spec · ADR · Diátaxis), open [references/source-authoring-standard/references/documentation-standard/](references/source-authoring-standard/references/documentation-standard/).
6. When the objective **is** this repo's pipeline: `../implement-continuous-integration/`. Admission wiring: [references/ci-admission-standard/](references/ci-admission-standard/). Runner health: [references/ci-runner-capacity-standard/](references/ci-runner-capacity-standard/). Parallel change: [references/parallel-change-integration-standard/](references/parallel-change-integration-standard/).
7. [references/product-objective-mode.md](references/product-objective-mode.md) — product-objective mode (host continuity, objective terminal)

### Composition (no meta-router)

Open only packs that match the objective:

- `../record-structured-deliberation/references/decision-quality-standard/` — framing, alternatives, claims
- `../record-structured-deliberation/references/sota-execution-standard/` — SOTA end-state selection when the objective is non-trivial
- `../synthesize-evidence-brief/` — only when the job itself is a disputed or public claim
- `../build-product/references/engineering-standard/` / `../select-dependency-versions/references/technology-stack-profile/` — when implementing software
- `../build-product/references/sylphx-platform-first-policy/` — when the objective deploys, authenticates, persists, or runs work on Platform; open `references/paas-deploy.md` for deploy/preview
- Related jobs: `bound-request-scope`

## Boundaries

- Grants no deploy or credential capabilities.
- Scope is **one accepted multi-phase engineering objective** to its asked terminal.
- Product-local ADRs remain authoritative for product decisions.
