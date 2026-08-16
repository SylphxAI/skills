# CRDT convergence

Use a conflict-free replicated data type when multiple replicas update shared structured state concurrently or offline and the domain has a lawful merge algebra.

## Method

1. Define logical identity, the state-based or operation-based representation, and replica membership.
2. Define causal context, duplicate handling, deletion markers, compaction, and garbage-collection authority.
3. Establish the required algebra. State-based joins form a semilattice; operation-based updates commute under their delivery assumptions.
4. Specify convergence, idempotence, commutativity, and associativity properties that apply to the chosen form.
5. Separate mechanical convergence from domain conflict and assign semantic conflict resolution to the domain owner.
6. Property-test reordered, duplicated, delayed, partitioned, and concurrent operations.
7. Shrink failures to minimal deterministic counterexamples and retain them as regression cases.
8. Select transactional single-writer or compare-and-swap state for money, permissions, migrations, and invariant-coupled transitions whose domain rules require one serialization point.

Capture the merge algebra, delivery assumptions, domain-conflict policy, and convergence tests in the owning design and test suite.

Research basis: Shapiro et al., [Conflict-free replicated data types](https://doi.org/10.1007/978-3-642-24550-3_29).
