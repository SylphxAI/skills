# risk-matched-verification-standard

> Constraint depth owned by `build-product` (not a listing skill). Other workflows open this path when their body says so.

# Risk-Matched Verification Standard

Constraints composed onto build / verification work—not a listing skill.

Read [references/full-standard.md](references/full-standard.md) for the full method and predicates.

Focused methods (sibling under `build-product`):

- [Verification coverage model](../engineering-standard/references/verification-coverage-model.md)
- [Oracle-free verification](../engineering-standard/references/oracle-free-verification.md)
- [Control-effectiveness verification](../engineering-standard/references/control-effectiveness.md)

## Method

1. Read [references/full-standard.md](references/full-standard.md) for the full method and predicates.
2. Apply the strongest relevant subset; record material tradeoffs in ADR/tests as required.
3. Prefer schema/test/ADR homes over copying this body into product repos.

## Composition and output

Canonical contract: [`author-skill/references/composition-contract.md`](../../../author-skill/references/composition-contract.md).
## Boundaries

- Does not grant deploy or credential capabilities.
- Does not replace product-local ADRs where those own decisions.
