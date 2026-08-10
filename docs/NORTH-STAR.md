# Sylphx Verified Capabilities — North Star

The product identity of this repository is **Sylphx Verified Capabilities**: the
open, cross-runtime qualification layer that lets any agent select the smallest
sufficient set of trusted capabilities and prove the user's outcome — without
requiring trust in the capability author, marketplace, model vendor, or Sylphx
itself.

This repository is the **open foundation**: portable capability packages,
public qualification records, and the recording contract for outcomes. It is
not a marketplace, an agent runtime, a larger skill library, or a Control
Plane. The Control Plane (the live commercial product) owns live activation,
policy, evidence and reconciliation; the user's product/system owns the oracle.

## The three durable concepts

| Concept | Meaning | Truth authority |
| --- | --- | --- |
| **Capability** | One portable user job with boundaries, inputs and outputs, required tools/data/permissions, failure semantics, and an externally observable outcome contract | Package source owns the declaration, never the truth of its claims |
| **Qualification** | Reproducible, version-scoped evidence of incremental value, compatibility, provenance, security and currentness in declared environments | Named evaluator or attestor owns the result |
| **Outcome receipt** | Evidence that the user's actual result satisfied the declared oracle — or failed, recovered, or remained unresolved | The user's product/system owns the oracle; Control Plane owns live recording and reconciliation |

Composition is not another product object: it is the application of capability
contracts whose boundaries and evidence compose. A catalog, badge, dashboard or
agent listing is a projection of these authorities, never a new source of
truth.

## North Star metric

> **Verified Capability Yield** = value-weighted, externally verified successful
> outcomes ÷ value-weighted eligible attempts.

An attempt is eligible only when its capability versions are **current**,
**qualified**, and **authorized** for the actual context. Correctness and
Security are hard gates: an unverifiable success, unresolved critical security
condition, or false-success condition makes the attempt ineligible for a
positive result rather than merely lowering a score.

This metric dominates installs, skill count, stars, catalog size, and
self-graded quality. It grows only when real capability and real value grow.

## How this repository projects the metric

- `catalog.json` carries per-package `qualified` / `qualificationStatus` and a
  top-level `qualification` block (`total`, `qualified`, `qualifiedNames`).
- Each package carries a `capability.json` contract and a `qualification.json`
  record (`unqualified` is the honest default; `qualified` requires
  version-scoped evidence with a named evaluator and a future `expiresAt`).
- `docs/qualification/LEDGER.md` is the human-readable qualification ledger;
  evals evidence lives under `docs/qualification/evals/`.
- Outcome receipts are recorded against `schemas/outcome-receipt.schema.json`
  by the user's product/system and the Control Plane; the repository never
  fabricates receipts.

Current honest projection (2026-08-10): 57 capability packages, 0 qualified,
0 recorded outcome receipts, Verified Capability Yield = 0 eligible attempts
(yield is undefined/zero until eligibility gates are met). Structural and
runtime CI prove consistency, not capability value.

## Quality North Star vs Verified Capability Yield

The **Quality North Star** (`q-*`, 14 attributes) is the engineering quality
vocabulary for *authoring* packages; it is self-graded and never a product
metric. **Verified Capability Yield** is the product metric and requires
external verification. The former never substitutes for the latter, and a
green Quality North Star audit is not qualification evidence.

## Open foundation and paid assurance

- **Open foundation (this repository):** portable capability contracts, public
  packages, and reproducible public qualification evidence remain freely
  inspectable.
- **Paid assurance (Control Plane):** private capability portfolios,
  continuous context-specific qualification, organizational policy/evidence
  projections, and assurance support form the subscription product.
- Pricing authority is assurance scope and qualification workload, not
  downloads, file count, or seats. No price is published here without buyer
  research and observed willingness to pay.

## What would change this conclusion

- Repeat-use evidence showing authored methods alone create durable outcome
  lift and paid retention → the premium curated-library future becomes
  credible.
- Cross-runtime qualification failing to transfer, or currentness cost
  exceeding the risk it protects → a vertical outcome product becomes
  superior.
- A host-neutral standard absorbing interoperable qualification, provenance
  and organizational evidence as a native commodity → specialize around a
  valuable domain instead of duplicating it.
- Usage concentrating in one consequential workflow with a defensible outcome
  oracle and buyer → that vertical becomes the commercial product.

These are reviewed live, never assumed. The repo's own qualification state and
ledger are the current evidence for this projection.
