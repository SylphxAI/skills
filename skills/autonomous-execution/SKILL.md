---
name: autonomous-execution
description: "Drive one accepted multi-phase objective through research, execute, verify, repair to delivery-terminal evidence."
---

# Autonomous Execution (workflow)

**Primary class:** `workflow` (execution method with embedded binding predicates).  
**Package id** is job-named (workflow). Do not treat this package as pure policy or always-on law. See [ADR-20260801](https://github.com/SylphxAI/skills/blob/main/docs/adr/ADR-20260801-package-classes-and-standard-composition.md).

**When matched:** run this workflow for the active accepted objective.

## Progressive disclosure

1. Read [references/full-standard.md](references/full-standard.md) for the full
   execution method, startup, graph, evidence, and completion discipline.
2. Read [references/tool-grounded-execution.md](references/tool-grounded-execution.md)
   when the task needs tool-grounded iteration, checkpoint, recovery, or
   termination semantics.
3. Read [references/bounded-objective-closure-loop.md](references/bounded-objective-closure-loop.md)
   when the user explicitly asks for loop engineering, a full-scope autonomous
   closure loop, or repeated research-execute-audit transitions for one objective.

## Soft composition (native discovery has no dependency graph)

Before material mutations, open and apply only the composed packs that match the
objective (do not invent a meta-router):

- `decision-quality-standard` for framing, alternatives, and claim discipline
- `source-authoring-standard` for Work/attempt/checkpoint/source identity
- `delivery-standard` when claiming land/live done
- `evidence-and-claims-standard` when grading proof strength
- `engineering-standard` / `technology-stack-profile` when implementing software
- host continuity/objective surface when present: bind/resume per host rules (prefer uncapped
  goals for long multi-phase work unless the user set a budget)
- `enact-work-coordination` only when authenticated Enact tools are present

## Method (summary)

1. Establish intentional startup: objective, acceptance map, goal binding,
   workspace ownership, and non-interference with foreign changes.
2. Build an execution graph that maximizes authorized verified throughput
   without inflating certainty or delivery claims.
3. Research → execute → verify → repair or replan until the delivery terminal
   for this one objective is met or an honest blocker is recorded.
4. Claim done only with evidence at the active delivery boundary.

## Primary artifact

Progress toward **one accepted objective at its delivery terminal**, with
checkpoint/evidence integrated into the primary job output — not a separate
compliance report merely because this package loaded.

## Boundaries

- Does not grant deploy, credential, or MCP capabilities.
- Does not own continuous next-Work discovery (`select-next-work`).
- Does not own multi-aspect product betterment loops (`continuous-product-quality`).
- Does not replace product-local ADRs where those own decisions.

## When not to use

- Short Q&A or one local edit with no multi-phase terminal.
- Continuous work-selection OS without a single accepted objective.
- Product betterment across aspects as the primary job → `continuous-product-quality`.
- Live Enact API design alone → `enact-work-coordination` / `work-coordination-standard`.
