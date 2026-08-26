# Probabilistic Forecasting Methods

## Make the question scoreable

Define the event, horizon, authoritative resolution source, and treatment of
ambiguity before assigning a number. Separate unconditional forecasts from
conditional ones. Forecast a distribution when a binary threshold would discard
decision-relevant information.

## Build the estimate

Start with an outside-view reference class and record why that class is the
right one. Decompose into drivers or branches only when the pieces are less
dependent than the whole. Search for evidence that moves the probability in
both directions. For material questions, elicit independent estimates before
discussion and aggregate with a declared rule; status and stated confidence
are not reliability.

## Update and score

Store every estimate with a timestamp and the evidence that moved it. Update
when material evidence arrives or a declared checkpoint passes. After
resolution, use the predeclared proper scoring rule — Brier for binaries, log
score when unjustified certainty is costly, CRPS or declared quantile scores
for distributions. Assess calibration across a set. Change the question or the
resolution source only before seeing the outcome. Calibration skill decays
without continuously scored questions; treat forecasting as ongoing practice,
not a one-off exercise.

## Sources

- IARPA, Aggregative Contingent Estimation (ACE):
  <https://www.iarpa.gov/research-programs/ace>
- Mellers et al., Identifying and Cultivating Superforecasters:
  <https://doi.org/10.1177/1745691615577794>
- Gneiting and Raftery, Strictly Proper Scoring Rules:
  <https://doi.org/10.1198/016214506000001437>
