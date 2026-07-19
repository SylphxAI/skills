---
name: decision-optimization-modeling
description: Formulate, solve, validate, or audit a constrained mathematical decision model for allocation, assignment, routing, scheduling, capacity, inventory, network, or resource-planning decisions. Use when explicit decision variables, objectives, constraints, units, feasibility, deterministic or stochastic assumptions, solver evidence, sensitivity, and robustness are required, and produce a Constrained Decision Model. Do not use for qualitative option selection, agent planning-system architecture, forecasting without an intervention decision, causal or product experiments, or ordinary implementation planning.
---

# Decision Optimization Modeling

Translate an operational decision into a falsifiable mathematical model whose
recommended solution can be independently checked. Read
[references/optimization-modeling-method.md](references/optimization-modeling-method.md)
before selecting a formulation or solver.

## Workflow

1. Define the decision owner, controllable actions, entities, horizon,
   frequency, latency, downstream effects, baseline policy, and terminal
   decision artifact. Separate controllable choices from forecasts and facts.
2. Declare sets, indices, parameters, units, sources, timestamps, uncertainty,
   missingness, and lineage. Reject inputs whose meaning or unit cannot be
   reconciled.
3. Define decision variables and domains before writing the objective. Include
   state, recourse, slack, and activation variables only when their operational
   meaning is explicit.
4. State the objective in business or system units. For multiple objectives,
   declare priority, lexicographic order, Pareto treatment, or calibrated
   trade-off weights; never hide policy choices inside arbitrary coefficients.
5. Encode hard constraints separately from soft preferences and penalties.
   Bind every constraint to its operational rule, source, tolerance, and reason
   for being hard or relaxable.
6. Choose deterministic, scenario-based stochastic, chance-constrained, or
   robust treatment according to the uncertainty and decision timing. State
   distributional and independence assumptions and what happens outside the
   modeled set.
7. Test feasibility and boundedness before optimization. Exercise empty,
   minimum, maximum, conflicting, and impossible cases; preserve an explicit
   diagnostic for infeasibility instead of silently dropping constraints.
8. Solve with reproducible configuration. Record solver, version, formulation,
   seed where relevant, termination status, objective, bounds, optimality gap,
   resource limits, and incumbent solution.
9. Independently recompute the objective and every material constraint from the
   emitted solution. Compare with a current baseline, a simple heuristic, and
   exhaustive enumeration on a tiny fixture where feasible.
10. Run sensitivity, scenario, stress, and parameter-perturbation analysis.
    Convert the model into a robust operating policy with fallback behavior,
    monitoring signals, re-solve triggers, and decision handoff.

## Artifact

Produce a **Constrained Decision Model**:

- decision boundary, horizon, baseline, assumptions, and non-goals;
- sets, parameters, units, provenance, uncertainty, and data-quality rules;
- variables, objective, constraints, tolerances, and mathematical formulation;
- feasibility evidence, solver configuration, result, bounds, gap, and runtime;
- independent solution verification and baseline or heuristic comparison;
- sensitivity, stress cases, robust policy, fallback, monitoring, and re-solve
  conditions;
- unsupported claims, unresolved model risk, and implementation handoff.

## Boundaries

- Use `optimization-objective-review` for the real outcome, proxy, Goodhart,
  gaming, and protected-floor contract when an automated optimizer will act on
  the model. This Skill consumes that contract and owns variables, constraints,
  solver evidence, and solution verification.
- When both Skills apply but no standalone objective audit was requested,
  integrate the material objective-contract fields into this Constrained
  Decision Model rather than emitting a second artifact.
- Use `decision-quality-standard` when the job is evidence-based qualitative
  selection among materially distinct options without a mathematical program.
- Use `agent-planning-system-review` for how an agent decomposes, sequences,
  observes, and replans work.
- Use `probabilistic-forecasting` when the primary artifact is a calibrated
  prediction rather than a controllable decision.
- Use `product-experiment-review` or `causal-inference-analysis` to estimate the
  effect of an intervention. An optimizer may consume those estimates but does
  not identify them.
- Do not treat solver success as model validity. Feasible nonsense remains
  nonsense when variables, objectives, constraints, data, or uncertainty do not
  represent the operational decision.
