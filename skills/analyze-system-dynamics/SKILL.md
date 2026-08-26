---
name: analyze-system-dynamics
description: "Explain behavior over time through stocks, flows, feedback, delays, and adaptive actors. Use for growth, decline, oscillation, bottlenecks, or policy resistance. Do not use to estimate a single causal effect, register an experiment, or forecast a scoreable event without a dynamic structure."
---

# Analyze System Dynamics

A static relationship diagram is not a dynamic explanation. Sketch the observed behavior over time before assigning loops. Name the stocks that persist when flows stop, then the reinforcing and balancing loops, delays, and adaptive actors that could generate that pattern.

The smallest model that can reproduce the history wins. Treat qualitative loops as hypotheses. An intervention is not identified until short-horizon improvement, compensating feedback, burden shifting, and delayed overshoot have been checked.

Open [system dynamics methods](references/system-dynamics-methods.md) for stock-flow construction, validation, and intervention tests.

Use `analyze-causal-inference` for a specific intervention estimand. Use `forecast-with-calibration` when the output is a resolvable probability rather than a mechanism.
