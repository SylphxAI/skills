# Acceptance — semantic skill curation cut

## Objective

Deliver a skill catalog where:

1. Each listing skill is an independently requestable job (or true policy pack).
2. Integration happened by job/artifact rationale, not bagging and not blind restore.
3. Unique method text is preserved under owner packages.
4. Host listing stays within ~8k description characters.
5. Install + tests prove the tree.

## Evidence (this branch)

| Gate | Evidence |
| --- | --- |
| Model | `docs/MODEL.md` — no methods bag |
| Decisions | `docs/CURATION-LEDGER.md` — executed absorbs/merges + explicit non-merges + full inventory |
| Invariants | `tests/curation-invariants.test.mjs` |
| Integrity | `npm test` includes check + unit tests |
| Catalog | 120 skills; description sum ≤ 8000 |
| Live install | `node runtime/sylphx-skills.mjs status` → current N/N after install |

## Integrations executed

- restore distill-source-to-skill + design-skill-evals as first-class listings

- distill + design-skill-evals restored as first-class (not hidden under author-skill)
- merge privacy lifecycle + data-rights → review-privacy-and-data-rights
- demote documentation-standard → source-authoring-standard
- shared review-playbook-skeleton across review-*

## Residual

- GitHub Actions `check` on PR depends on `sylphx-linux-standard` runners. Recent PR runs failed or cancelled at job setup/queue — **not** a local integrity failure. Merge requires runner admission green or operator override per org policy.
- Further domain merges only after false-negative review (documented in ledger).

## Not residual

- Knowledge destruction of pre-v3 packages (migrated then integrated)
- Dual methods-bag + listing catalog
