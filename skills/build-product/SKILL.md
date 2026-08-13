---
name: build-product
description: "Ship a missing product capability end-to-end. Use when implementing a framed slice, not a single sign-in, storage, cron, delivery verb, or the repository CI."
---

# Build Product

When you need a **real capability** on a dogfood or market path, run **one** build cycle.

## When to use

- Direction is decided; a journey or capability is still missing
- Engine or product gaps block a customer path
- No more specific Platform verb listing matches the ask


## Method

**Journey gap → correct ownership boundary → implement → run the path you changed.**  
No permanent workarounds. Prefer durable work on the owning layer.

### 1. Frame
- Product, journey/capability, and **done look** for this cycle
- Constraints: platforms, auth, data, engine vs product boundary
- Classify Platform vs product-domain gaps. Open
  [references/sylphx-platform-first-policy/](references/sylphx-platform-first-policy/)
  and the one matching recipe.
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
- Prefer **Depth** and **Simplicity** on that capability: fully resolve one
  concept (real path, oracle, operability, failure modes) and **compose**
  rather than cut coverage. Apply the Engineering Standard **Quality North
  Star** (`q-*`) on the framed path—not a shallow shell that defers
  Correctness, Security, Reliability, or Observability. When quality
  attributes conflict, use default quality precedence or record tradeoff +
  rollback.
- When landing source: land with atomic commits and a revert-safe PR outcome. Do not leave dual-path concept
  residue; hard-cut obsolete paths via the execute-hard-cutover skill when cutover is the job.

- Implement Platform gaps through `sylphx.toml` `type=web`, injected bindings,
  runtime SDK, and Platform Work for anything that outlives a request.
- Keep product-domain rules in this repo.
- Real paths over mocks unless the cycle is explicitly building a seam
- Update public docs/contracts when behavior changes. Keep **Vision**, **North
  Star Metric**, **OKRs/Goals**, **PRD** features, and interface **specs** in
  industry documentation-standard homes — do not dump field lists into the NSM.
  Open
  `../drive-to-delivery/references/source-authoring-standard/references/documentation-standard/`
  when placing docs.

### 5. Deliver / verify
- Run the path you changed (test, smoke, API, or UI)
- Add or reuse a product-behavior oracle. Do not add slogan, brand,
  heading-list, file-existence, coverage-threshold, or meta-check tests.
  When the work *is* the repository pipeline, use
  `../implement-continuous-integration/`.
- Separate local vs landed vs live claims if you are claiming delivery
- List residuals without claiming whole-product completion

## Cycle done

1. Framed capability is usable on the path you changed, or only externally blocked  
2. Ownership of changes is honest  
3. Residuals are listed  
4. No known ship-blocker for this slice was ignored

## Progressive disclosure

Open only depth the current build needs:

- [references/keel-app/](references/keel-app/) — Keel app tooling when the product uses Keel
- [references/engineering-standard/](references/engineering-standard/) — Quality North Star (meta, 13 primaries, precedence) and engineering constraints while building; open `references/quality-north-star-usage.md` for pocket questions / anti-examples
- [references/risk-matched-verification-standard/](references/risk-matched-verification-standard/) — open when the failure model needs more than the path you changed
- [references/sylphx-platform-first-policy/](references/sylphx-platform-first-policy/) — classify, then open one family recipe
- Source landing: `../drive-to-delivery/references/source-authoring-standard/`
- Related jobs when requested: `prototype-product`, `expand-product`, `finish-product`, `craft-product-interface`, `build-payment-readiness`, `build-distribution-readiness`, `implement-continuous-integration`
