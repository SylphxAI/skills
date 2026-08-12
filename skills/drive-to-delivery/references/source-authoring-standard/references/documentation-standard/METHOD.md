# documentation-standard

# Documentation Standard

Policy constraints—compose onto matching host jobs.

Read [references/full-standard.md](references/full-standard.md) for the full
method and predicates, including the **product repository documentation model**
(North Star · End state · Goals · Capabilities · Tools · Contracts).

## Method

1. Resolve the question with the altitude map (which durable home owns this fact).
2. Apply the strongest relevant subset; record material tradeoffs in ADR/tests as required.
3. Prefer schema/test/ADR homes over copying this body into product repos.
4. Keep North Star short (line + metric); put construction target in End state;
   put completable slices in Goals; put capability/tool inventories in design;
   put field-level details in contracts.

## Composition and output

Canonical contract: [`author-skill/references/composition-contract.md`](../../../../../author-skill/references/composition-contract.md).

## Boundaries

- Does not grant deploy or credential capabilities.
- Does not replace product-local ADRs where those own decisions.
- Does not treat Quality North Star (`q-*`) as product North Star.
