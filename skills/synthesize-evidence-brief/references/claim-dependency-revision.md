# Claim Dependency Revision

Use a truth-maintenance graph when conclusions depend on mutable premises.

1. Represent observations, assumptions, inferences, and conclusions as separate
   nodes with support, contradiction, and dependency edges.
2. Bind source identity, revision, freshness, and confidence to each premise.
3. When a premise expires, changes, or is contradicted, retract its support and
   invalidate only dependent descendants.
4. Recompute affected claims from the remaining evidence and current premises.
5. Record the retraction, downstream claims affected, replacement evidence, and
   restored or unresolved state.

Use a table or graph that makes dependencies, retractions, replacement sources,
and affected conclusions explicit.

Research basis: Doyle's Truth Maintenance System:
<https://doi.org/10.1016/0004-3702(79)90008-0>.
