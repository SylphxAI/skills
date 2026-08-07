# Oracle-free verification

This is a general engineering verification method; frontier systems compose it.

Use these methods when the exact correct output is unavailable but stable
relations or independent implementations can still falsify behavior.

## Metamorphic testing

Define transformations whose output relation should hold—for example,
permutation invariance, scale equivariance, semantic-preserving rewrite, or
monotonic response. Generate source cases, apply the transformation, and fail
on relation violations rather than judging either output in isolation.

## Differential testing

Run the same cases through independently implemented systems, models, versions,
or execution paths. Investigate disagreements; agreement is stronger when the
implementations do not share the same likely defect or oracle.

Every relation and comparator needs a scope and invalidation rule. Neither
method proves correctness when all compared systems can share the same error.

## Sources

- Chen et al., *Metamorphic Testing: A Review of Challenges and Opportunities*:
  <https://doi.org/10.1145/3143561>
- Yang et al., *Finding and Understanding Bugs in C Compilers*:
  <https://doi.org/10.1145/1993498.1993532>
