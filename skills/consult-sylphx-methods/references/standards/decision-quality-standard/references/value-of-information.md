# Value of Information

Use value of information when additional research, testing, or observation is
available but delay and attention also have cost.

## Method

1. Name the decision, live options, current ranking, and uncertainty that could
   change the selected option or risk treatment.
2. Describe the candidate observation or experiment and the possible results.
3. Estimate how each result would change the feasible set, ranking, exposure,
   or recovery choice.
4. Bound the expected value of perfect information as the maximum value that
   eliminating the uncertainty could add. Do not spend more than that bound.
5. Estimate the expected value of the available sample information, including
   false results, correlated evidence, implementation delay, and opportunity
   cost.
6. Acquire the information only when its expected decision improvement exceeds
   acquisition, delay, compute, integration, and risk cost.
7. Stop when remaining information cannot materially change the action or is
   dominated by a reversible action with faster feedback.

## Artifact

Record an **Information Acquisition Decision** inside the Decision Record:

| Uncertainty | Candidate evidence | Decision change | Value bound | Full cost | Acquire/skip | Stop rule |
| --- | --- | --- | --- | --- | --- | --- |

The arithmetic may use ranges. False precision is less useful than an explicit
decision boundary.

## Sources

- Howard, *Information Value Theory*, IEEE Transactions on Systems Science and
  Cybernetics: <https://doi.org/10.1109/TSSC.1966.300074>.
- Raiffa and Schlaifer, *Applied Statistical Decision Theory*.
