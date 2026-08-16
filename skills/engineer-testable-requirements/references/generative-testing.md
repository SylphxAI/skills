# Generative testing

Use generative testing when important correctness properties span more inputs or state transitions than hand-written examples can cover economically.

## Method

1. State properties independently from the implementation.
2. Generate valid inputs and state-transition sequences across normal, boundary, and malformed cases.
3. Check round trips, conservation, monotonicity, idempotence, commutativity, ordering, or equivalence to a simpler reference model.
4. Control seeds and environmental inputs so failures can be replayed.
5. Shrink each failure to a minimal reproducible case.
6. Keep the minimal case as a deterministic regression example.
7. Bias generators toward observed weak areas while preserving broad input exploration.
8. Combine generative tests with contract and integration tests for the boundaries that depend on external systems.

## Sources

- Claessen and Hughes, [QuickCheck: A Lightweight Tool for Random Testing of Haskell Programs](https://doi.org/10.1145/351240.351266)
- Hypothesis, [Explanation](https://hypothesis.readthedocs.io/en/latest/explanation/)
