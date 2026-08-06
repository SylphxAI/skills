# Claim Dependency Revision

Use a truth-maintenance graph when conclusions depend on mutable premises.

1. Represent observations, assumptions, inferences, and conclusions as separate
   nodes with support, contradiction, and dependency edges.
2. Bind source identity, revision, freshness, and confidence to each premise.
3. When a premise expires, changes, or is contradicted, retract its support and
   invalidate only dependent descendants.
4. Recompute affected claims from remaining evidence; do not preserve a verdict
   because it was previously repeated or accepted.
5. Record the retraction, downstream claims affected, replacement evidence, and
   restored or unresolved state.

The artifact is a **Claim Dependency Graph** plus **Retraction Record**. It may
be represented as a table or graph; a handwritten status field is not support.

Research basis: Doyle's Truth Maintenance System:
<https://doi.org/10.1016/0004-3702(79)90008-0>.
