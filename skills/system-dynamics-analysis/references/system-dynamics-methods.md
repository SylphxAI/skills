# System Dynamics Methods

## Model behavior, structure, and time

System dynamics explains patterns through accumulations, rates, feedback, and
delays. Start with observed behavior over time. A static relationship diagram
cannot distinguish temporary correlation from a mechanism that reproduces the
pattern.

## Core model elements

- **Stock:** an accumulation that persists when flows stop, such as backlog,
  inventory, installed base, trust, knowledge, cash, or technical debt.
- **Flow:** a rate that changes a stock, with compatible units over time.
- **Reinforcing loop:** change compounds in the same direction until another
  limit intervenes.
- **Balancing loop:** action counters deviation from a target or constraint.
- **Delay:** information, decision, build, transport, learning, or effect lag
  that can create overshoot and oscillation.
- **Nonlinearity:** threshold, saturation, congestion, network effect, or other
  response whose slope changes materially.
- **Adaptive actor:** a person, organization, agent, or market participant that
  changes behavior in response to the intervention or metric.

## Validation

Check whether the proposed structure can reproduce the observed pattern across
more than one period or scenario. Use dimensional consistency, extreme-case
tests, historical replay, parameter sensitivity, and alternative structures.
Treat qualitative loops as hypotheses when measurements or equations are not
available.

Do not fit a complex simulation merely to match history. Inspect whether the
mechanism, parameters, and boundary are independently defensible and whether
different structures fit equally well.

## Intervention analysis

Test interventions at multiple horizons and under adverse conditions. Look for:

- policy resistance and compensating feedback;
- burden shifting to a symptomatic control;
- bottlenecks that move rather than disappear;
- delayed overshoot or collapse;
- metric gaming and actor adaptation;
- local improvement that worsens the total system;
- lock-in that removes a later correction path.

Prefer intervention portfolios that change the owning structure, remain
observable, and preserve correction options. State which measures would
falsify the model.

## Sources

- MIT OpenCourseWare, **Introduction to System Dynamics**:
  <https://ocw.mit.edu/courses/15-871-introduction-to-system-dynamics-fall-2013/>
- System Dynamics Society, **What Is System Dynamics?**:
  <https://systemdynamics.org/what-is-system-dynamics/>
- Donella H. Meadows, **Thinking in Systems**, MIT Press:
  <https://mitpress.mit.edu/9780262535934/thinking-in-systems/>
