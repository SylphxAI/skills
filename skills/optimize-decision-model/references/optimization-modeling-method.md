# Optimization Modeling Method

Formulate the decision before choosing a solver. Objectives and constraints
encode what the system will favor, which tradeoffs it accepts, and what is
outside scope.

Define sets, parameters with units and provenance, decision variables with
operational meaning, objective terms with direction and owner-chosen
tradeoffs, hard versus soft constraints, and the information available at each
decision time. An objective that adds money, minutes, incidents, and harm
needs explicit normalization or a lexicographic policy from the owner.

Choose the simplest family that represents the decision: linear, mixed-integer,
network, constraint, nonlinear only when linearity lies, stochastic when
recourse timing matters, robust when probabilities are too weak to trust.
Known inputs, forecast distributions, structural ambiguity, stale data, and
events outside support are different uncertainty classes.

Before relying on a solution: validate identities and units; confirm every
variable is an action and every constraint has a policy source; check empty,
typical, and contradictory fixtures; recompute outside the solver; perturb
weights and constraints until the recommendation moves; diagnose infeasibility
with the owner before relaxing a floor.
