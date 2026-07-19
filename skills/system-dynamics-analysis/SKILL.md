---
name: system-dynamics-analysis
description: "Analyze persistent or surprising system behavior caused by feedback loops, delays, accumulations, nonlinear effects, constraints, incentives, and adaptation. Use for recurring oscillation, backlog, capacity, adoption, policy resistance, second-order effects, or fixes that make a problem return or worsen. Produce a Dynamic System Model. Do not use for an isolated implementation defect, a static dependency map, or estimating one identified causal effect from data."
---

# System Dynamics Analysis

Explain behavior over time rather than decorating a static architecture with
arrows. Read
[references/system-dynamics-methods.md](references/system-dynamics-methods.md)
when constructing loops, stock-flow models, simulations, or interventions.

## Workflow

1. Define the focal behavior, decision, time horizon, system boundary, and the
   evidence showing how the behavior changes over time.
2. Draw a behavior-over-time view for the important variables. Distinguish an
   observed pattern from a hypothesized mechanism.
3. Identify accumulations and their rates of change: queues, inventory,
   installed base, knowledge, debt, trust, capacity, cash, or other relevant
   stocks and flows.
4. Connect reinforcing and balancing feedback loops. Mark delays, thresholds,
   saturation, resource constraints, information gaps, incentives, and actors
   that adapt to the system.
5. Check dimensional consistency, conservation where applicable, loop polarity,
   omitted exogenous drivers, boundary choices, and alternative structures
   that could produce the same observed behavior.
6. Simulate or replay scenarios when the model can support it. Calibrate against
   observed history; otherwise label the model qualitative and do not invent
   parameter precision.
7. Test interventions across short and long horizons. Look for burden shifting,
   compensating feedback, new bottlenecks, gaming, lock-in, and delayed harm.
8. Recommend the smallest robust intervention set and the observations needed
   to validate or revise the model.

## Output

Produce a **Dynamic System Model**:

- **Question and behavior** — decision, boundary, horizon, observations, and
  behavior-over-time patterns.
- **Structure** — stocks, flows, feedback loops, delays, constraints,
  nonlinearities, incentives, and adaptive actors.
- **Model status** — observed facts, hypotheses, parameters, calibration,
  competing structures, and confidence.
- **Intervention analysis** — leverage points, expected trajectories,
  counter-effects, failure modes, and rollback or containment.
- **Validation plan** — discriminating measures, scenario replay, monitoring,
  and conditions requiring model revision.

## Boundaries

- Use `critical-analysis` for a bounded defect or competing root-cause
  hypotheses without material feedback dynamics.
- Use `causal-inference-analysis` to identify or estimate a specific
  intervention effect from experimental or observational evidence.
- Use engineering architecture methods for a static dependency, module, or
  deployment graph.
- A causal-loop diagram is a hypothesis, not evidence that the represented
  links or intervention effects are true.
- Do not expand the boundary until it contains everything. Include a variable
  only when it could materially change the behavior or intervention.
