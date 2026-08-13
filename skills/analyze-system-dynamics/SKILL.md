---
name: analyze-system-dynamics
description: "Map stubborn loops: stocks, delays, incentives, policy resistance."
---

# Analyze System Dynamics

Explain behavior over time rather than decorating a static architecture with
arrows. Read
[references/system-dynamics-methods.md](references/system-dynamics-methods.md)
when constructing loops, stock-flow models, simulations, or interventions.


## When to use
- Behavior over time needs explanation: growth, decline, oscillation, delay, or policy resistance
- Stocks/flows, feedback loops, delays, or adaptive actors materially shape the outcome
- Testing interventions for burden-shifting, compensating feedback, or delayed harm
- Not for a static dependency graph or a one-shot causal estimate (`analyze-causal-inference`)

## Workflow

1. Define the focal behavior, decision, time horizon, system boundary, and the
   evidence showing how the behavior changes over time.
2. Draw a behavior-over-time view for the important variables. Distinguish an
   observed pattern from a hypothesized mechanism.

Example: signups grow fast then plateau — sketch active-users-over-time before naming loops; the plateau may be capacity, churn, or market saturation.
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


## Progressive disclosure

- [references/system-dynamics-methods.md](references/system-dynamics-methods.md) — open when needed for depth

## Boundaries

- Use `analyze-critically` for a bounded defect or competing root-cause
  hypotheses without material feedback dynamics.
- Use `analyze-causal-inference` to identify or estimate a specific
  intervention effect from experimental or observational evidence.
- Use engineering architecture methods for a static dependency, module, or
  deployment graph.
- A causal-loop diagram is a hypothesis. Links and intervention effects need their own evidence.

## Path

- Include a variable when it could materially change the behavior or intervention. The boundary stays the smallest set that can produce the observed pattern.
