# Counterfactual and off-policy evaluation

Use logged-policy evaluation when a proposed decision policy can be evaluated
from historical randomized or known-propensity data without exposing users to
the candidate policy first.

## Method

1. Define the target policy, outcome, population, horizon, and decision that the
   estimate will change.
2. Verify logged actions, outcomes, eligibility, context, and behavior-policy
   propensities. Unknown or manipulated propensities invalidate standard
   importance-weighted estimators.
3. Test overlap: the behavior policy must assign non-zero probability to
   actions the target policy may choose. Report unsupported regions rather than
   extrapolating silently.
4. Choose and predeclare direct, inverse-propensity, or doubly robust estimation;
   bound extreme weights and report sensitivity to the bound.
5. Validate on policies or periods with known online outcomes where possible.
6. Treat the result as decision evidence with explicit assumptions, uncertainty,
   and distribution-shift limits—not as production proof.

## Sources

- Dudik, Langford, and Li, *Doubly Robust Policy Evaluation and Learning*:
  <https://doi.org/10.48550/arXiv.1103.4601>
- Li et al., *Unbiased Offline Evaluation of Contextual-bandit-based News
  Article Recommendation Algorithms*: <https://doi.org/10.1145/1935826.1935878>
