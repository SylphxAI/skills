# CRDT Convergence

This is a general concurrent-state engineering method; integration and offline
sync procedures compose it.

Use a conflict-free replicated data type only when agents must update shared
structured state concurrently or offline and the domain has a valid merge
algebra.

1. Define logical identity, state or operation representation, causal context,
   duplicate handling, tombstones, and garbage-collection authority.
2. Prove the required algebra: convergence plus idempotence, commutativity, and
   associativity for the chosen merge form.
3. Separate mechanical convergence from semantic conflict. Two valid values can
   converge mechanically while still requiring domain adjudication.
4. Property-test reordered, duplicated, delayed, partitioned, and concurrent
   operations; retain minimal counterexamples.
5. Use a single-writer/CAS path when no lawful merge exists. Do not force a CRDT
   onto migrations, money, permissions, or invariant-coupled transitions.

The artifact is a **Merge Algebra and Convergence Test Suite**.

Research basis: Shapiro et al., conflict-free replicated data types:
<https://doi.org/10.1007/978-3-642-24550-3_29>.
