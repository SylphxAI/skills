---
name: probabilistic-forecasting
description: "Produce and maintain calibrated probability forecasts for resolvable future events. Use when asked for the likelihood of an outcome by a date, delivery or incident risk, demand or capacity scenarios, conditional futures, or a forecast that should be updated and scored. Produce a Probabilistic Forecast Record. Do not use for general confidence language, choosing an action under known probabilities, or an event that cannot be resolved from declared evidence."
---

# Probabilistic Forecasting

Make uncertainty explicit, updateable, and accountable. Read
[references/probabilistic-forecasting-methods.md](references/probabilistic-forecasting-methods.md)
for elicitation, aggregation, calibration, and scoring detail.

## Workflow

1. Write one resolvable question with an outcome, deadline, resolution date,
   authoritative resolution source, and rules for ambiguous, canceled, or
   partially observed outcomes. Reframe or decline an unresolvable question.
2. Establish the reference class and base rate before inspecting vivid case
   details. Record data provenance, selection effects, and relevance limits.
3. Decompose the event into causal drivers, necessary milestones, conditional
   branches, or independent subquestions without double-counting dependencies.
4. Elicit an initial probability or distribution. State the strongest evidence
   for and against, key assumptions, and the observation most likely to move
   the estimate.
5. For material forecasts, obtain estimates from agents using different
   evidence or models before sharing their numbers. Aggregate transparently;
   correlated agreement is not independent evidence.
6. Set an update policy based on event cadence and decision value. Update on
   material evidence, preserve the full history, and distinguish evidence
   changes from preference or risk-tolerance changes.
7. Resolve against the predeclared source. Score with an appropriate proper
   scoring rule, inspect calibration across a meaningful set, and record what
   should change in future forecasts.

## Output

Produce a **Probabilistic Forecast Record**:

- **Question contract** — outcome, horizon, resolution source, ambiguity rules,
  and owner.
- **Forecast** — probability or distribution, timestamp, base rate, model, and
  decomposition.
- **Evidence and assumptions** — supports, objections, unknowns, dependence,
  and update triggers.
- **History** — timestamped estimates and the evidence that caused each change.
- **Resolution and learning** — outcome, score, calibration context, failure
  analysis, and reusable update.

## Boundaries

- Use `critical-analysis` for confidence in a present explanation rather than a
  resolvable future event.
- Use `decision-quality-standard` to combine forecasts with value, cost, risk
  appetite, reversibility, and authority to choose an action.
- Domain skills own the meaning of revenue, reliability, delivery, safety, or
  other specialized outcomes; this skill owns the forecasting method.
- Do not manufacture precise probabilities from prose alone. Use ranges or
  expose insufficient evidence when precision is unsupported.
- Do not judge one forecast solely by whether it happened. Evaluate process,
  proper score, and calibration across repeated forecasts.
