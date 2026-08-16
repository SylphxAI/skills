---
name: optimize-decision-model
description: "Translate an operational decision into a constrained mathematical model and recompute the solution. Use review-optimization-objective when the measured target itself may be a proxy failure."
---

# Optimize Decision Model

Translate an operational decision into a mathematical model whose variables,
constraints, objective, and solution represent the real decision.

## Method

1. Open the [optimization modeling method](references/optimization-modeling-method.md).
2. Define the decision owner, controllable actions, entities, horizon,
   frequency, latency, downstream effects, baseline policy, and output.
3. Declare sets, parameters, units, sources, timestamps, uncertainty, and
   missing-data treatment.
4. Define decision variables and domains, including state, recourse, slack, or
   activation variables when they have operational meaning.
5. State the objective in business or system units. Name the priority,
   lexicographic order, Pareto treatment, or approved weights for multiple
   objectives.
6. Encode hard constraints separately from preferences and penalties. Link
   every constraint to its owner, source, tolerance, and relaxation policy.
7. Choose deterministic, stochastic, chance-constrained, or robust treatment
   from the uncertainty and decision timing.
8. Test feasibility and boundedness, then solve with a reproducible solver
   configuration.
9. Recompute the objective and material constraints from the emitted solution.
   Compare with the current baseline, a simple heuristic, and a tiny exhaustive
   fixture when feasible.
10. Run sensitivity and stress analysis, then define fallback behavior,
    monitoring, re-solve triggers, and the decision handoff.

## Output

Return a Constrained Decision Model with decision boundary, data and units,
variables, objective, constraints, formulation, solver result, independent
recomputation, baseline comparison, sensitivity, fallback, and residual model
risk.

Solver success is one result. The operational decision owner accepts the model
when its semantics and recomputed solution match the real decision.
