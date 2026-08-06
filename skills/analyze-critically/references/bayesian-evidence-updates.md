# Bayesian Evidence Updates

Use Bayesian structure to discipline evidence updates, not to manufacture
precision.

## Method

1. Define mutually exclusive hypotheses where possible; otherwise separate
   competing explanations from coexisting contributors.
2. Start with a reference-class base rate or an explicit qualitative prior.
   Record its source and sensitivity.
3. For each observation, ask how expected it would be under every live
   hypothesis. Evidence that is equally likely under all hypotheses is weak.
4. Update relative odds with likelihood ratios when defensible. Otherwise use
   ordered labels such as `strongly favors`, `favors`, `neutral`, or
   `contradicts`, with the observation that justifies the label.
5. Check dependence before multiplying evidence. Correlated agents, repeated
   reports from one source, or several tests sharing one oracle are not
   independent observations.
6. Run sensitivity against plausible priors and measurement error. A conclusion
   that flips easily remains fragile.
7. Record the next observation with the highest expected ability to separate
   the leading hypotheses.

## Artifact

Add to the Critical Analysis Brief:

- hypothesis and prior basis;
- observation and source;
- relative likelihood or qualitative update;
- dependence and measurement caveats;
- posterior ranking or probability range;
- sensitivity and next discriminating evidence.

Do not infer probability from model confidence, vote counts, verbosity, or
consensus. Preserve `unknown` when priors or likelihoods cannot be supported.

## Sources

- Bayesian reasoning and likelihood ratios: E. T. Jaynes, *Probability Theory:
  The Logic of Science*, <https://doi.org/10.1017/CBO9780511790423>.
- Reference-class forecasting and the planning fallacy: Bent Flyvbjerg,
  <https://doi.org/10.1002/for.807>.
- Correlated evidence and superforecasting practice: Mellers et al.,
  <https://doi.org/10.1177/1745691615577794>.
