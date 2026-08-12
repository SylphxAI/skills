---
name: design-product
description: "Design a product blueprint (app, game, SaaS, etc.); shape depth in references."
---

# Design Product

When you need a **product design blueprint** (app, game, SaaS, marketing automation, or similar), run one design cycle.

User intent is **design a product**, not pick an engine brand. Shape-specific depth lives in references.

## When to use

- Greenfield or major redesign of a product experience
- Need jobs/IA, loops, tenancy, journeys, or system blueprint before build
- Not for implementing a single screen (use craft-product-interface) or shipping code (use build-product)

## Method

1. **Frame** the product promise, users, surfaces, non-goals, success criteria.
   Separate **product North Star** (one line + metric) from **end state**
   (final shape) and from **completable goals** — see documentation model under
   `../drive-to-delivery/references/source-authoring-standard/references/documentation-standard/`.
2. **Stance (Quality North Star Layer A):** prefer one deep core concept over
   many half-concepts; simplify by composition without cutting user-facing
   capability. Name 1–2 quality attributes this design intentionally strengthens
   or sacrifices. Open
   `../build-product/references/engineering-standard/` when quality tradeoffs
   or precedence matter. Quality `q-*` is **not** the product North Star.
3. **Choose shape** and open only the matching reference:
   - App / multi-surface client → [references/app/METHOD.md](references/app/METHOD.md)
   - Game → [references/game/METHOD.md](references/game/METHOD.md)
   - SaaS web platform → [references/saas-web-platform/METHOD.md](references/saas-web-platform/METHOD.md)
   - Marketing automation → [references/marketing-automation/METHOD.md](references/marketing-automation/METHOD.md)
   - Space map before choosing → [references/space-exploration/METHOD.md](references/space-exploration/METHOD.md)
   - Extract live UI system → [references/system-extractor/METHOD.md](references/system-extractor/METHOD.md)
   - Taxonomy/ontology → [references/semantic-taxonomy/METHOD.md](references/semantic-taxonomy/METHOD.md)
   - Provenance system → [references/provenance-system/METHOD.md](references/provenance-system/METHOD.md)
4. **Inventory** in the blueprint (or linked `docs/PRODUCT.md`):
   - **Capabilities** — requestable jobs, success, non-goals
   - **Tools / surfaces** — how each capability is exposed
   - **Details** — point at contracts/specs (or draft them); do not bury field
     lists only inside North Star prose
5. **Synthesize** one blueprint: concept, structure, critical flows/states, risks, open questions.
6. **Hand off** durable homes (do not leave design only in chat):
   - `PROJECT.md` — Purpose, North Star projection, End state summary, optional Goals, Delivery
   - Design entry — full capabilities/tools inventory
   - Specs/tests/`capability.json` — per-tool or per-capability contracts
   - Build/prototype with testable acceptance criteria and any quality-precedence
     tradeoffs + rollback conditions


## Progressive disclosure

- Shape packs under [references/](references/) (`app`, `game`, `saas-web-platform`, …)
- Documentation altitude (where NS / end state / goals / design live):
  `../drive-to-delivery/references/source-authoring-standard/references/documentation-standard/`
- Quality vocabulary (Depth / Simplicity / `q-*`): `../build-product/references/engineering-standard/`
- Related jobs (separate skills when requested): `price-saas-subscription`, `compose-product-portfolio`, `compose-product-program`, `decide-architecture-shape`, `engineer-testable-requirements`


## Output

Product design blueprint · capabilities/tools inventory · contract pointers ·
shape-specific residuals · build-ready acceptance criteria · projected
`PROJECT.md` North Star / end state when the owning repo is in scope

