# Generative verification

Use generative verification when important correctness properties span more
states than example tests can cover economically.

## Method

1. State invariants independently of the implementation.
2. Generate valid inputs and state-transition sequences, including boundary and
   malformed cases.
3. Check properties such as round trips, conservation, monotonicity,
   idempotency, commutativity, or equivalence to a simpler reference model.
4. Shrink every failure to a minimal reproducible case and retain it as a
   deterministic regression.
5. Bias generators using observed gaps, but preserve broad exploration so a
   known failure distribution does not become the only tested distribution.

Generative tests complement example tests. They do not replace contract,
integration, or delivery proof.

## Sources

- Claessen and Hughes, *QuickCheck: A Lightweight Tool for Random Testing of
  Haskell Programs*: <https://doi.org/10.1145/351240.351266>
- Hypothesis, *Explanation*: <https://hypothesis.readthedocs.io/en/latest/explanation/>
