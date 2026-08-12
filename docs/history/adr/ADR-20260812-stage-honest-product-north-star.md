---
id: ADR-20260812-stage-honest-product-north-star
status: accepted
date: 2026-08-12
decision_owner: SylphxAI
supersedes: []
amends:
  - ADR-20260810-verified-capabilities-model
scope:
  - product-identity
  - north-star-metrics
  - qualification
---

# ADR-20260812: Stage-honest Product North Star

## Context

ADR-20260810 established **Sylphx Verified Capabilities** with three durable
concepts (Capability, Qualification, Outcome receipt) and named **Verified
Capability Yield (VCY)** as the North Star metric.

That identity remains correct. The operational failure was different: with
**zero outcome receipts** owned outside this repository, VCY has **no eligible
attempts** and therefore **cannot steer daily work**. Treating VCY as the only
compass while receipts do not exist produces either:

- dashboard theater (synthetic receipts), or
- unsteered authoring (compass without a needle),

both of which violate Observability and Economy (attention spent on unreadable
instruments; verification budget not pointed at jobs that raise real trust).

Meanwhile a naming collision grew between:

- **Product North Star** (Verified Capabilities win condition), and
- **Quality North Star** (`q-*` engineering vocabulary under
  `engineering-standard`),

which agents and humans occasionally treated as interchangeable. A green `q-*`
pass is not qualification and not yield.

## Decision

1. **Product one-liner (binding).**  
   *Agents load one trusted method for a real job—and never grant more trust
   than version-scoped evidence allows.*

2. **Three durable concepts unchanged.** Capability · Qualification · Outcome
   receipt, with the same truth authorities as ADR-20260810. No fourth product
   object.

3. **Stage-honest metric ladder.**
   - **Stage A (active now):** **Trustworthy Job Coverage (TJC)** — high-value
     requestable jobs that are listed, discoverable, honestly qualified on the
     current package digest, and free of false-qualified claims. This is the
     **active compass** for this open-foundation repository.
   - **Stage B (when real receipts exist):** **Verified Capability Yield (VCY)**
     remains the **product-system truth metric** as defined in ADR-20260810.
     TJC becomes a leading indicator once Stage B is live.
   - Do not operate Stage B dashboards as the daily compass while receipts = 0.

4. **Vocabulary hygiene.**  
   - “North Star” without qualifier, in product docs, means **Product North
     Star** (`docs/NORTH-STAR.md`).  
   - Engineering quality vocabulary remains **Quality North Star** (`q-*`) and
     is explicitly **not** a product metric and **not** qualification evidence.  
   - Universal principles (9) remain `docs/policies/PRINCIPLES.md`.

5. **Canonical rewrite.** Full normative product text lives in
   `docs/NORTH-STAR.md` (2026-08-12 rewrite). This ADR records the decision;
   the doc is the operating surface.

6. **What is not decided here.** Control Plane pricing, specific TJC
   denominator lists, and re-qualification prioritization of individual
   packages remain operational work under TJC—not new product concepts.

## Consequences

- Authors and agents optimize **honest current qualification of real jobs**
  and **fail-closed install truth** before inventing yield instrumentation.
- VCY definition stays ambitious and external; the repository still never
  fabricates outcome receipts.
- README / MODEL / QUALIFICATION / LEDGER / project.manifest must speak Stage A
  honestly and point to Stage B without claiming live yield.
- Quality North Star documents stay deep as engineering vocabulary; they link
  up to Product North Star without absorbing it.

## Alternatives considered

| Alternative | Why rejected |
| --- | --- |
| VCY-only forever | Unsteerable at 0 receipts |
| Drop VCY | Abandons eventual product truth and oracle discipline |
| Count / stars as North Star | Commodity; false trust |
| Merge principles + q-* + product into one mega-doc | Entropy; destroys progressive disclosure |

## Links

- `docs/NORTH-STAR.md`
- ADR-20260810-verified-capabilities-model
- `docs/QUALIFICATION.md`
- `skills/build-product/references/engineering-standard/`
