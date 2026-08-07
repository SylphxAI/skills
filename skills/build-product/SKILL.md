---
name: build-product
description: "Ship a missing product capability end-to-end with original-oracle proof."
---

# Build Product

When you need a **real capability** on a dogfood or market path, run **one** build cycle.

## When to use

- Direction is decided; a journey or capability is still missing
- Engine or product gaps block a customer path


## Method

**Journey gap → correct ownership boundary → implement → original-oracle verify.**  
No permanent workarounds. Prefer durable work on the owning layer.

### 1. Frame
- Product, journey/capability, and **done look** for this cycle
- Constraints: platforms, auth, data, engine vs product boundary
- Non-goals: unrelated refactors, scale fantasy, cosmetic thrash

### 2. Research
- How the journey fails today (code, build, live, docs)
- Owning layer for each gap
- Load domain Skills only as needed via native discovery
- Stop when more reading will not change the plan

### 3. Admit work
- **In:** capacity-feasible gaps that unlock the framed capability (several OK)
- **Out:** below-threshold polish; speculative features; drive-by rewrites
- Large gaps → a still-meaningful vertical slice

### 4. Implement

### Core concept power (when implementing)

- Implement the **framed capability** as a full, owning-boundary vertical slice
  of the product’s core concept—not a parallel concept or permanent workaround.
- Prefer depth and strength on that capability (real path, oracle, operability)
  over shipping many half-concepts.
- When landing source: land with atomic commits and a revert-safe PR outcome. Do not leave dual-path concept
  residue; hard-cut obsolete paths via the execute-hard-cutover skill when cutover is the job.

- Correct boundary; no product hacks for shared floors that belong elsewhere
- Real paths over mocks unless the cycle is explicitly building a seam
- Update public docs/contracts when behavior changes

### 5. Deliver / verify
- Original oracles for this slice (run, smoke, API, pack, host as applicable)
- Separate local vs landed vs live claims if delivery is in scope
- List residuals without claiming whole-product completion

## Cycle done

1. Framed capability is usable under the stated oracle, or only externally blocked  
2. Ownership of changes is honest  
3. Residuals are listed  
4. No known ship-blocker for this slice was ignored  


## Progressive disclosure

Open only depth the current build needs:

- [references/prototype/](references/prototype/) — cheap real prototype with kill/continue
- [references/expand/](references/expand/) — scale a validated core
- [references/finish/](references/finish/) — finish/deburr with re-captured evidence
- [references/payment-readiness/](references/payment-readiness/) — production payments
- [references/distribution-readiness/](references/distribution-readiness/) — artifacts, install, channels
- [references/craft-interface/](references/craft-interface/) — one UI flow, a11y, verification
- [references/keel-app/](references/keel-app/) — Keel app tooling when the product uses Keel
- [references/engineering-standard/](references/engineering-standard/) — engineering constraints while building
- [references/risk-matched-verification-standard/](references/risk-matched-verification-standard/) — risk-matched verification
- [references/sylphx-platform-first-policy/](references/sylphx-platform-first-policy/) — platform-first boundaries
- Source landing: `../drive-to-delivery/references/source-authoring-standard/`

## Output

Capability · changes · oracle evidence · residuals

## Platform / engine tools (references, not separate skills)

When the product is implemented on **Keel** (app, game client, multi-platform shell):

- Read [references/keel-app/METHOD.md](references/keel-app/METHOD.md) for engine boundaries, pack, doctor, examples.
- Do **not** invent a separate "build engine product" skill — the user job is still **build product**.

Prefer product-repo tools and Platform services the same way: name them in research/implement steps, load depth from docs/references when needed.


## Progressive disclosure

When implementing, open only depth you need:

1. [references/keel-app/](references/keel-app/) — Keel app tooling (when the product uses Keel)
2. [references/engineering-standard/](references/engineering-standard/) — engineering constraints while building
3. [references/risk-matched-verification-standard/](references/risk-matched-verification-standard) — verification depth matched to risk
4. [references/sylphx-platform-first-policy/](references/sylphx-platform-first-policy/) — platform-first boundaries when relevant
5. Source landing rules live under `../drive-to-delivery/references/source-authoring-standard/`

