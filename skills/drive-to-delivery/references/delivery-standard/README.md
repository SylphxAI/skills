# delivery-standard

> Constraint depth owned by `drive-to-delivery` (not a listing skill). Other workflows open this path when their body says so.

# Delivery Standard

Policy constraints—compose onto matching host jobs.

Read [references/full-standard.md](references/full-standard.md) for the full
method and predicates.

## Method

1. Read [references/full-standard.md](references/full-standard.md) for the full method and predicates (ordinary path PR → Merge Queue → main → Auto Deploy → live; auto-merge as queue arm only; no gate bypass; done layers).
2. Apply the strongest relevant subset; record material tradeoffs in ADR/tests as required.
3. Prefer schema/test/ADR homes over copying this body into product repos.
4. Mid-task re-anchor: [`../working-brief.md`](../working-brief.md).

## Composition and output

Canonical contract: [`author-skill/references/composition-contract.md`](../../../author-skill/references/composition-contract.md).
## Boundaries

- Does not grant deploy or credential capabilities.
- Does not replace product-local ADRs where those own decisions.

