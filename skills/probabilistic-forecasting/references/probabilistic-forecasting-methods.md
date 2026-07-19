# Probabilistic Forecasting Methods

## Make the question scoreable

A forecast needs an observable resolution rule. Define the event, horizon,
authoritative source, and treatment of ambiguity before assigning a number.
Separate unconditional forecasts from conditional ones such as “if release A
ships by date D, what is the probability of outcome B?”

Forecast distributions for continuous outcomes when a binary threshold would
discard decision-relevant information.

## Build the estimate

1. Start with an outside-view reference class and note selection or relevance
   limits.
2. Decompose the event into milestones, drivers, or conditional branches.
3. Use the inside view to update rather than erase the base rate.
4. Search for evidence that moves the probability in both directions.
5. Expose dependence between subevents; multiplying dependent probabilities
   creates false precision.
6. For material questions, elicit independent estimates before discussion and
   aggregate using a declared rule. Weighting by demonstrated calibration can
   be useful; status or confidence alone is not a reliability measure.

## Update and resolve

Store every estimate with a timestamp and reason. Update when material evidence
arrives or a declared checkpoint passes, not merely because the forecaster is
asked again. Preserve the original question and resolution rule.

After resolution, use a proper scoring rule. For binary events the Brier score
is the squared difference between forecast probability and outcome. Log scores
penalize unjustified extreme certainty more sharply. Choose the scoring rule in
advance and never change it after seeing the result.

For continuous outcomes, publish the declared representation—a full predictive
distribution, named parametric family, or fixed quantiles/intervals. Score the
same object that was elicited: logarithmic score for a defensible predictive
density, continuous ranked probability score (CRPS) for a full distribution,
or predeclared quantile/interval scores for quantile forecasts. Do not infer a
distribution after resolution or select whichever score makes the forecast
look best.

Assess calibration and discrimination across a set of comparable forecasts.
One correct low-probability event or one incorrect high-probability event does
not by itself establish skill or failure.

## Agent-native use

Parallel agents can improve coverage when they use distinct reference classes,
decompositions, evidence sources, or models. Sharing an anchor before the first
estimate reduces independence. Aggregate only after inspecting shared inputs
and correlation.

Use resolved forecasts as training evidence: identify missed base rates,
misread evidence, overconfidence, stale updates, bad decomposition, and
resolution defects. Do not rewrite history to make earlier estimates look
better.

## Sources

- IARPA, **Aggregative Contingent Estimation (ACE)** program:
  <https://www.iarpa.gov/research-programs/ace>
- Mellers et al., **Identifying and Cultivating Superforecasters as a Method of
  Improving Probabilistic Predictions**:
  <https://doi.org/10.1177/1745691615577794>
- Gneiting and Raftery, **Strictly Proper Scoring Rules, Prediction, and
  Estimation**:
  <https://doi.org/10.1198/016214506000001437>
