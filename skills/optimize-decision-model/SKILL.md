---
name: optimize-decision-model
description: "Translate an operational decision into an explicit model — objective, constraints, uncertainty, and a recomputed solution — then stress it for proxy failure. Use when the user asks to optimize, allocate, schedule, or choose under constraints. Do not use to pick the next backlog item, run an experiment, or critique a claim."
---

# Optimize Decision Model

Solver success is not an operational decision. The model has to name the owner, controllable actions, objective units, hard constraints, and what happens when the optimum is infeasible. Recompute the objective and material constraints outside the solver. Compare with the current policy and at least one dumb heuristic.

If the score can be gamed, leaked, or improved without improving the real outcome, the objective is wrong until that path is closed. Do not confiscate value, rights, or access because a proxy moved.

Open [optimization modeling method](references/optimization-modeling-method.md) when formulating. Open [Goodhart and proxy failure](references/goodhart-and-proxy-failure.md) when the objective can be optimized without the outcome.
