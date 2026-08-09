# work-coordination-standard

> Constraint depth owned by `select-next-work` (not a listing skill). Other workflows open this path when their body says so.

# Work Coordination Standard

Policy constraints—compose onto matching host jobs.

Read [references/full-standard.md](references/full-standard.md) for the full
method and predicates.

For allocation and shared-state patterns, also read
[references/coordination-protocols.md](references/coordination-protocols.md).

## Method

1. Read [references/full-standard.md](references/full-standard.md) for the full method and predicates.
2. Apply the strongest relevant subset; record material tradeoffs in ADR/tests as required.
3. Prefer schema/test/ADR homes over copying this body into product repos.

## Composition and output

Canonical contract: [`author-skill/references/composition-contract.md`](../../../author-skill/references/composition-contract.md).
## Boundaries

- Does not grant deploy or credential capabilities.
- Does not replace product-local ADRs where those own decisions.
- A discovered tool or adapter does not select the work ledger; selection is
  explicit in the active product contract.

