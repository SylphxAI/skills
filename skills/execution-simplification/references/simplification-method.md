# Simplification Method

## Core move

Complexity becomes manageable when you separate the problem into: outcome, user, state, constraint, decision, action, and proof.

## Rule IDs

- `simplify-1` — Start with the outcome and the observable proof, not the activity list.
- `simplify-2` — Split facts from assumptions; do not let guesses become architecture.
- `simplify-3` — Identify the decision boundary: who owns the decision and what changes if it is wrong.
- `simplify-4` — Prefer reversible actions while irreversible decisions are unclear.
- `simplify-5` — Find the bottleneck; improving non-bottlenecks is often theater.
- `simplify-6` — Convert vague goals into state transitions, artifacts, owners, and checks.
- `simplify-7` — Remove or defer work that does not change the proof of progress.
- `simplify-8` — Preserve constraints around money, data, security, policy, brand, and user trust.
- `simplify-9` — Ship complete vertical slices: a thin path with real input, output, validation, and recovery.
- `simplify-10` — After each slice, update the map from evidence rather than defending the original plan.

## Decomposition table

| Messy input | Ask | Output |
| --- | --- | --- |
| "Build everything" | What proof would show this is real? | First durable vertical slice |
| "Users do not convert" | Where exactly do they lose trust or value? | Funnel diagnosis and experiment |
| "The product is too complex" | Which user job requires which state? | Simplified information architecture |
| "We need SOTA" | Which standards and competitors define the bar? | Quality rubric and gap matrix |
| "We need automation" | Which decisions are deterministic and which need review? | Agent workflow with gates |

## Execution plan fields

Use: outcome, non-goals, constraints, assumptions, decision log, state machine, backlog slices, validation checks, stop conditions, owner, and next action.
