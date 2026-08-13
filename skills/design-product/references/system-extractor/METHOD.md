# design-system-extractor

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

## Path

- Missing values and states stay unlabeled or `unresolved`. Extracted means observed.
- Platform, theme, density, locale, accessibility, and product variants stay distinct when their roles differ.
- Authority is source ownership, shipped usage, recency, accessibility, and product intent. Frequency is one input.
- Tokens ship with semantic roles, provenance, confidence, and consumers.
- Private customer content and proprietary third-party assets stay out of the reusable system artifact.

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
