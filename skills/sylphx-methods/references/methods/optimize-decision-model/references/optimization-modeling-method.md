# Optimization modeling method

Formulate the decision before choosing a solver. An optimization model is a
policy-bearing abstraction: objectives and constraints encode what the system
will favor, sacrifice, prohibit, and leave unmodeled.

## Formulation contract

Define:

- sets and indices for entities, locations, resources, periods, scenarios, and
  states;
- parameters with units, timestamps, provenance, quality, uncertainty, and
  update policy;
- decision variables with operational meaning and continuous, integer, binary,
  categorical, or state domains;
- objective terms with units, direction, priorities, weights, and acceptable
  trade-offs;
- hard constraints, soft constraints, slack, penalties, tolerances, and source
  policy;
- decision timing, information available at each stage, recourse, and re-solve
  cadence.

Use dimensional analysis. An objective that adds money, minutes, incidents, and
customer harm requires explicit normalization or lexicographic policy; a solver
cannot decide their social or business exchange rate.

## Model family selection

Choose the simplest family that represents the decision:

- linear programming for continuous choices and linear relationships;
- mixed-integer programming for discrete activation, assignment, sequencing,
  logical conditions, and combinatorial choices;
- network flow for flow conservation, routing, matching, and capacity networks;
- constraint programming for rich logical, scheduling, and combinatorial
  feasibility;
- nonlinear optimization only when material nonlinear relationships cannot be
  represented accurately by a simpler formulation;
- stochastic programming when decisions precede uncertain outcomes and
  scenario-dependent recourse matters;
- robust optimization when policies must remain feasible or acceptable across
  a declared uncertainty set without trusting one probability distribution.

Do not assume a model family from the tool already installed. Record why the
family fits the operational semantics and scale.

## Uncertainty and robustness

Separate:

1. known inputs at decision time;
2. forecast distributions or scenarios;
3. structural ambiguity in the model;
4. data error and staleness;
5. events outside the modeled support.

Declare scenario construction, probabilities, dependence, tail coverage, and
recourse timing. Stress correlated extremes and adverse but plausible cases.
When probabilities are weak, prefer transparent scenario or uncertainty-set
analysis over false precision.

## Verification

Before relying on an optimized solution:

1. Validate input identities, units, ranges, freshness, and reconciliation.
2. Confirm every variable has an operational action and every constraint has a
   policy source.
3. Check feasibility and boundedness on empty, minimum, typical, maximum,
   contradictory, and impossible fixtures.
4. Compare the formulation with a tiny instance whose optimum can be enumerated
   or reasoned independently.
5. Recompute objective terms and constraint residuals outside the solver.
6. Compare with the incumbent process and at least one simple heuristic.
7. Record solver termination status, incumbent, best bound, optimality gap,
   tolerance, runtime, resource limit, and deterministic configuration.
8. Perturb material inputs, weights, constraints, scenarios, and seeds. Explain
   unstable decisions and identify thresholds at which the recommendation
   changes.
9. Diagnose infeasibility with conflicts, irreducible inconsistent sets, or
   controlled relaxations. Never silently delete a constraint to get a result.

Solver output proves only what follows from the encoded model and supplied
data. It does not prove that the model represents reality or that its objective
is acceptable.

## Operating handoff

Specify how model inputs are assembled, when re-solving occurs, how solution
actions are validated, what monitoring detects drift or infeasibility, and what
fallback policy applies if inputs, solver, or downstream execution fail. Keep
the model, data snapshot, solver configuration, and emitted decision linked by
identifiers so a decision can be reproduced or audited.

## Sources

- NEOS Server, **NEOS Guide**, <https://neos-guide.org/>. A practical guide to
  optimization problem types, mathematical formulations, solver categories,
  and modeling resources maintained by the optimization community.
- Dimitris Bertsimas and John N. Tsitsiklis, **Introduction to Linear
  Optimization**, Athena Scientific, 1997. Foundational treatment of linear
  and integer optimization, duality, algorithms, and formulation.
- John R. Birge and François Louveaux, **Introduction to Stochastic
  Programming**, 2nd ed., Springer, 2011,
  <https://doi.org/10.1007/978-1-4614-0237-4>. Decision stages, scenarios,
  recourse, and solution methods under uncertainty.
- Aharon Ben-Tal, Laurent El Ghaoui, and Arkadi Nemirovski, **Robust
  Optimization**, Princeton University Press, 2009,
  <https://press.princeton.edu/books/hardcover/9780691143682/robust-optimization>.
  Optimization under explicit uncertainty sets and robustness trade-offs.
- Google, **OR-Tools Guides**, <https://developers.google.com/optimization>.
  Practical implementation reference for routing, scheduling, assignment,
  linear and mixed-integer optimization, and constraint programming. This is a
  tool reference, not the semantic authority for a model.
