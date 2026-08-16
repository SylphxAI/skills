---
name: forecast-with-calibration
description: Produce an updateable probability or distribution for a resolvable future event using base rates, explicit assumptions, current information, and a declared resolution source.
---

# Forecast With Calibration

Make uncertainty explicit enough to support a decision and later learning.

## Method

1. Write a resolvable question with an outcome, deadline, resolution date, authoritative resolution source, and ambiguity rules.
2. Establish a relevant reference class and base rate with its provenance and selection limits.
3. Decompose the event into causal drivers, necessary milestones, conditional branches, or sufficiently independent subquestions.
4. Elicit an initial probability or distribution and identify the assumptions and observations most likely to move it.
5. For material forecasts, combine estimates formed from genuinely different information or models and account for their dependence.
6. Set an update cadence based on event speed and decision value. Preserve timestamped updates and their causes.
7. Resolve against the declared source and use a proper scoring rule across a meaningful set of comparable forecasts.
8. Feed calibration and resolution errors into future reference classes, decomposition, and updating.

Read [Probabilistic forecasting methods](references/probabilistic-forecasting-methods.md) for elicitation, aggregation, scoring, and calibration techniques.

## Output

Return the resolvable question, timestamped forecast, base rate, decomposition, assumptions, update triggers, resolution source, and calibration result when resolved.

Use `analyze-critically` for confidence in a present explanation and a domain skill for the meaning and consequences of the forecasted outcome.
