# CRDT convergence

Use a CRDT when multiple replicas update shared structured state concurrently
or offline and the domain has a lawful merge algebra.

Mechanical convergence is not domain conflict. Money, permissions, migrations,
and invariant-coupled transitions need one serialization point.

Property-test reordered, duplicated, delayed, partitioned, and concurrent
operations. Shrink failures to minimal deterministic counterexamples.

Research basis: Shapiro et al., [Conflict-free replicated data types](https://doi.org/10.1007/978-3-642-24550-3_29).
