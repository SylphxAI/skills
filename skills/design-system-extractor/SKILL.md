---
name: design-system-extractor
description: Extract and reconcile an existing product design system from authorized screenshots, design files, tokens, stylesheets, components, and shipped flows, preserving provenance, confidence, states, responsive rules, accessibility, exceptions, and migration impact. Use when the deliverable is an evidence-backed as-is system map or consolidation plan. Do not use to invent a greenfield visual direction, critique one flow, implement a supplied design, or imitate a third-party product.
---

# Design System Extractor

Recover the system the product actually uses. Keep observed facts, inference,
and proposed normalization visibly separate.

## Workflow

1. Confirm source ownership/authorization, target product versions, platforms,
   themes, locales, viewport classes, source recency, and intended consumers.
2. Read `references/design-system-extraction-systems.md`.
3. Build a source and coverage ledger before naming tokens. Capture code/design
   locators, visible state, viewport, platform, theme, locale, frequency, and
   confidence for every observation.
4. Extract the dependency graph: raw values -> primitives -> semantic tokens ->
   component anatomy/variants/states -> compositions -> complete workflows.
5. Reconcile contradictions using source authority, shipped usage, recency,
   accessibility, and product intent. Label each decision `observed`, `inferred`,
   `proposed`, `intentional_exception`, or `unresolved`.
6. Model responsive constraints, density, content stress, input modality,
   platform conventions, motion/reduced motion, localization, and non-happy
   states rather than cataloguing default screenshots only.
7. Identify duplicate values/components, semantic collisions, missing states,
   inaccessible patterns, and migrations. Preserve intentional variants with
   rationale instead of flattening every difference.
8. Validate by reconstructing or auditing representative flows against the
   extracted system, including at least one dense, error, loading, empty,
   localized, keyboard, and narrow-screen case where applicable.
9. Produce the provenance ledger, token graph, component contracts, exception
   register, confidence gaps, representative-flow validation, and migration map.

## When not to use

- For a new product or greenfield redesign, use `interface-craft` and treat any
  existing-system extraction as an input, not the final design direction.
- For a one-flow usability or visual critique, use `interface-craft`.
- For implementation from an already authoritative system, hand off the exact
  component contract and acceptance states to the implementation owner.
- Do not extract a clone from an unrelated third-party product. Use external
  products for high-level comparative research, not source copying.
- Do not claim Figma, code, screenshots, or production are universally
  canonical; record conflicts and the authority chosen for this extraction.

## Guardrails

- Never invent missing values or states and report them as extracted.
- Never collapse platform, theme, density, locale, accessibility, or product
  variants merely because their raw styles are similar.
- Never treat frequency as authority when the frequent pattern is deprecated,
  inaccessible, or an accidental fork.
- Never output raw style tokens without semantic roles, provenance, confidence,
  and consumers.
- Never log private customer content or proprietary third-party assets in the
  reusable system artifact.

## Output

```text
Scope and source authority:
- product/version/platform/theme/locale/viewport / source order / exclusions

Source and coverage ledger:
| Observation ID | Source locator | Surface/state | Raw fact | Status | Confidence |
| --- | --- | --- | --- | --- | --- |

System graph:
- primitive -> semantic token -> component contract -> composition -> workflow

Component and pattern contracts:
| Item | Anatomy | Variants | States | Responsive/content rules | A11y/input | Provenance |
| --- | --- | --- | --- | --- | --- | --- |

Exceptions and unresolved conflicts:
- observation / competing evidence / decision or open question / owner

Validation and migration:
- representative flow / mismatches / proposed canonical change / blast radius
```
