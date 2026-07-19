# Causal Inference Methods

## Start from the counterfactual question

Define the treatment strategy and comparator precisely enough that each could
in principle be assigned. Specify population, eligibility, time zero, outcome,
follow-up, and estimand. “Impact of X” is not an estimand.

Use a target experiment as the organizing model even for observational data:
eligibility criteria, treatment strategies, assignment procedure, follow-up,
outcome, causal contrast, and analysis plan. This exposes immortal-time,
selection, treatment-definition, and follow-up errors before modeling.

## Encode causal assumptions

Use a directed acyclic graph or an equally explicit structural account. Mark:

- common causes requiring control;
- mediators on the treatment pathway;
- colliders that can open biasing paths when conditioned on;
- selection and missingness mechanisms;
- treatment versions, adherence, measurement error, and interference;
- time-varying treatment and confounding.

The graph represents assumptions; data alone do not validate every arrow or
absence. Record domain evidence and plausible alternative graphs.

## Match design to assignment

Randomization identifies many effects under clear assignment, compliance,
measurement, and interference conditions. When it is unavailable, choose an
observational or quasi-experimental design because its identifying assumptions
match the assignment mechanism:

- adjustment, weighting, or matching for measured exchangeability;
- target-trial emulation for longitudinal observational comparisons;
- difference-in-differences when untreated trends are credibly parallel;
- regression discontinuity around a real assignment threshold;
- instrumental variables when exclusion, relevance, and monotonicity or their
  chosen alternatives are defensible;
- interrupted time series or synthetic controls where temporal and comparison
  structures support them.

Method names do not supply identification. State the estimand each design
actually identifies and the population to which it applies.

## Diagnose and challenge

Use design-appropriate checks: overlap, balance, positivity, assignment and
exposure integrity, missingness, pre-trends, manipulation around thresholds,
placebo outcomes or dates, negative controls, alternative specifications, and
sensitivity to unmeasured confounding or selection.

Report effect size and uncertainty separately from identification confidence.
A narrow interval around a biased estimate is not strong causal evidence.
Preserve `not identified` when assumptions or data are insufficient.

## Sources

- Hernán and Robins, **Causal Inference: What If**:
  <https://miguelhernan.org/whatifbook>
- Pearl, Glymour, and Jewell, **Causal Inference in Statistics: A Primer**:
  <https://bayes.cs.ucla.edu/PRIMER/>
- Hernán and Robins, **Using Big Data to Emulate a Target Trial When a
  Randomized Trial Is Not Available**:
  <https://doi.org/10.1093/aje/kwv254>
- Textor et al., **Robust Causal Inference Using Directed Acyclic Graphs**:
  <https://doi.org/10.1093/ije/dyw341>
