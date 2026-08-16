# Metamorphic and differential testing

Use these methods when exact expected outputs are difficult to enumerate while stable relations or independent implementations can still reveal defects.

## Metamorphic testing

1. Define an input transformation and the expected relation between original and transformed outputs.
2. Select relations grounded in the product contract, such as permutation invariance, scale equivariance, semantic-preserving rewrite, reversibility, or monotonic response.
3. Generate source cases, apply the transformation, and compare the resulting relation.
4. Scope each relation to the inputs and operating conditions where it is valid.
5. Retain minimal relation violations as regression cases.

## Differential testing

1. Select independently implemented systems, models, versions, compilers, or execution paths that should share observable behavior.
2. Run identical cases through each implementation and normalize only contract-irrelevant differences.
3. Investigate disagreements against the product contract or a higher-authority reference.
4. Increase comparator value through implementation diversity and distinct dependency paths.
5. Record the comparator's scope, tolerated differences, and refresh condition.

Use metamorphic relations to test internal consistency and differential comparisons to expose implementation-specific behavior. Combine both when a transformation can be exercised across several independent implementations.

## Sources

- Chen et al., [Metamorphic Testing: A Review of Challenges and Opportunities](https://doi.org/10.1145/3143561)
- Yang et al., [Finding and Understanding Bugs in C Compilers](https://doi.org/10.1145/1993498.1993532)
