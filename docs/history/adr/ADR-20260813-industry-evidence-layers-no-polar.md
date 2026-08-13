# ADR-20260813 — Industry evidence layers; no Polar / residual grade / L0–L6 score

## Status

Accepted. Complements
[ADR-20260813-retire-house-nsm-follow-industry-eval.md](ADR-20260813-retire-house-nsm-follow-industry-eval.md)
(house coverage/yield KPIs). Does not delete installed `q-*` IDs or `eng-*`
rules.

## Context

Agents were minting house product objects next to the industry stack:

- **Polar / Polaris / Polariss** as a rebrand of North Star Metric
- residual `*Grade` strings, soak-wave titles, and door crawls as progress
- **L0–L6** claim ladders as if they were an evaluation score
- **`q-*` IDs** treated as a product North Star Metric / scoreboard

Industry practice already covers these jobs. Amplitude / Sean Ellis name one
customer-value quantity in English. Google SRE and ordinary delivery prove
work at **artifact / check / live**. Software product quality is
**ISO/IEC 25010**; this repository's tradeoff language is the nine English
principles. A private alias map is not a second product.

The 14 `q-*` IDs and the `eng-*` binding rules are already loaded by every
agent. Deleting them in the same cut would break overnight resolution.

## Decision

- Polar brand names, residual `*Grade`, and L0–L6 product scores are
  forbidden on active product surfaces.
- Evidence claims use only **artifact / check / live**. Residual matrices
  are gap inventory, not progress and not NSM.
- `q-*` is an **internal alias map** onto ISO/IEC 25010 and the nine
  English principles. It is not product NSM and not a product score.
- The 14 `q-*` IDs and `eng-*` rules stay installed. They are **demoted**,
  not deleted.

## Consequences

`documentation-standard` fence expands (no Polar, no residual grades,
artifact/check/live, `q-*` not NSM). Product North Star refuses Polar
brands, residual grades, and invented claim ladders. Quality usage docs
open with the industry model and the alias-map warning.

## Links

- `docs/NORTH-STAR.md`
- `skills/drive-to-delivery/references/source-authoring-standard/references/documentation-standard/`
- `skills/build-product/references/engineering-standard/references/quality-north-star-usage.md`
- `docs/policies/PRINCIPLES.md`
