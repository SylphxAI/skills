---
name: remediate-agent-harness
description: "Remediate an agent harness with measured deltas and failure modes."
---

# Remediate Agent Harness

Correct a recurring agent-system behavior at the layer that causes it.

## Method

1. Open [learning system methods](references/learning-system-methods.md).
2. Define the recurring outcome, affected tasks, impact, current rate, and
   observation window. Separate the recurring class from one incident.
3. Trace objective, instructions, loaded skills, context, memory, model, tools,
   permissions, state, evaluator, coordination, and feedback.
4. Form competing causal explanations and identify observations that
   distinguish them.
5. Change the smallest owning layer: objective, instruction, context, tool
   contract, evaluator, permission, state, or feedback.
6. Compare the candidate with the current harness on representative tasks.
   Measure the target behavior plus critical failures, cost, latency, and
   transfer across relevant task or model families.
7. Keep, revise, or revert the change from the observed result. Retire the
   superseded instruction or compensating path when the new owner takes effect.

## Output

Return the recurring behavior, system trace, causal explanation, change,
representative comparison, critical failures, decision, rollback, owner, and
remaining uncertainty.

Use `analyze-critically` when diagnosis is the requested terminal. Use
`design-skill-evals` when the requested artifact is a reusable skill evaluation.
