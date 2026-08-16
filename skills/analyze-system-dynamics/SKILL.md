---
name: analyze-system-dynamics
description: Explain behavior over time through stocks, flows, feedback loops, delays, incentives, and adaptive actors. Use for growth, decline, oscillation, bottlenecks, and policy resistance.
---

# Analyze System Dynamics

Build the smallest dynamic model that can explain the observed pattern and guide an intervention.

## Method

1. Define the focal behavior, decision, time horizon, system boundary, and observations across time.
2. Sketch the important variables as behavior-over-time curves before assigning mechanisms.
3. Identify stocks and their inflows and outflows: queues, inventory, installed base, knowledge, debt, trust, capacity, cash, or other accumulations.
4. Connect reinforcing and balancing feedback loops. Mark delays, thresholds, saturation, resource constraints, information gaps, incentives, and adaptive actors.
5. Check units, conservation, loop polarity, exogenous drivers, boundary choices, and alternative structures that could generate the same behavior.
6. Simulate or replay scenarios when available data supports parameterization. Keep qualitative models explicitly qualitative.
7. Test interventions across short and long horizons for compensating feedback, burden shifting, new bottlenecks, gaming, lock-in, and delayed effects.
8. Select a robust intervention and the observations that will confirm or revise the model.

Read [System dynamics methods](references/system-dynamics-methods.md) for stock-flow notation, loop construction, archetypes, and simulation guidance.

## Output

Return the behavior pattern, boundary, stocks and flows, feedback loops, delays, model status, intervention scenarios, expected trajectories, and revision signals.

Use `analyze-causal-inference` for a specific intervention estimand and `analyze-critically` for a bounded set of competing explanations.
