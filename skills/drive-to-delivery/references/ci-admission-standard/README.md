# ci-admission-standard

> Constraint depth owned by `drive-to-delivery` (not a listing skill). Other workflows open this path when their body says so.

# Ci Admission Standard

Policy constraints—compose onto matching host jobs.

Read [references/full-standard.md](references/full-standard.md) for the full
method and predicates.

## Method

1. Read [references/full-standard.md](references/full-standard.md) for the full method and predicates.
2. Apply the strongest relevant subset; record material tradeoffs only where
   the owning contract, configuration, ADR, or executable proof requires them.
   Do not add a prose-presence test to prove that this standard was followed.
3. Prefer schema/test/ADR homes over copying this body into product repos.
4. When a required check claims to detect a failure class, apply
   [control-effectiveness verification](../../../build-product/references/engineering-standard/references/control-effectiveness.md).

## Composition and output

Canonical contract: [`author-skill/references/composition-contract.md`](../../../author-skill/references/composition-contract.md).
## Boundaries

- Does not grant deploy or credential capabilities.
- Does not replace product-local ADRs where those own decisions.

