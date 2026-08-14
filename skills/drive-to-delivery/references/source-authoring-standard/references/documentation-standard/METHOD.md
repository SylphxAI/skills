# documentation-standard

# Documentation Standard

Policy constraints—compose onto matching host jobs.

Read [references/full-standard.md](references/full-standard.md) for the full
method. **Industry layers:** Product Vision · North Star Metric · OKRs/Goals ·
PRD · Specs/API reference · ADR · README entry · Diátaxis user docs.

## Method

1. Map the fact to the altitude table (industry home).
2. Apply the strongest relevant subset; record material tradeoffs in ADR/tests.
3. Prefer schema/test/generated reference over hand-copied lists.
4. Keep NSM short: one customer-value metric in English industry quantity.
   Vision, NSM, OKRs, and the PRD use product language. Delivery and
   engineering homes own process. Put product shape in **Vision**;
   completable work in **OKRs/Goals**; features in **PRD**; field details
   in **specs**.
5. Write the action, the home, and the done look
   (`../../../../../craft-human-agent-language/`).

## Composition and output

Canonical contract: [`author-skill/references/composition-contract.md`](../../../../../author-skill/references/composition-contract.md).

## Boundaries

- Deploy and credentials stay with the runtime.
- Product-local ADRs stay authoritative for product decisions.
- Quality vocabulary (`q-*`) lives under `build-product`.
