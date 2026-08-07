# Acceptance — skill catalog optimization cut

## Objective

Optimize `SylphxAI/skills` so:

1. Every independently requestable job is a **first-class listing skill** (no methods bag).
2. Integration is **semantic** (job/artifact), with content preserved under owners.
3. Listing descriptions are complete, short, and fit host budget (~8k chars).
4. Tests and live install prove the tree.
5. PR carries the full decision record.

## Verified evidence (HEAD of this branch)

| Requirement | Evidence |
| --- | --- |
| No methods bag | no `skills/sylphx-methods` / `consult-sylphx-methods` |
| distill + skill-evals discoverable | `skills/distill-source-to-skill`, `skills/design-skill-evals` first-class |
| author-skill does not hide them | related-skill table only; invariants test |
| privacy reviews integrated | `review-privacy-and-data-rights` only |
| documentation-standard demoted | under `source-authoring-standard/references/` |
| review skeleton shared | every `review-*/references/review-playbook-skeleton.md` |
| Catalog size | **120** skills |
| Listing budget | description sum **7722** ≤ 8000 |
| Local tests | `npm test` **54/54** |
| Live install | Codex/Claude/Grok **current 120/120** |
| Decision SSOT | `docs/CURATION-LEDGER.md` |
| Invariants | `tests/curation-invariants.test.mjs` |

## Explicit non-merges retained

Product cycles, delivery vs evidence, marketplace triad, design shapes, support vs incident, curate vs author — see ledger.

## Residual (external)

GitHub Actions on `sylphx-linux-standard` may remain **queued/blocked** independent of local green. Merge to main requires runner admission success or org policy override.

## Version

`4.3.0`
