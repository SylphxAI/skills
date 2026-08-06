# Agent Skills model (industry-aligned, knowledge-preserving)

## Clean-break meaning

**No backward-compatible dual catalog.** The old 122 listing is gone.

**Not knowledge destruction.** Unique methods were **migrated**:

| Former package kind | New home |
| --- | --- |
| Specialized task skills (12 + library) | `skills/<id>/` installable packages |
| Meta skill-authoring helpers | `skills/author-skill/references/{curate,distill,evals}/` |
| Standards / profiles / policy packs | `skills/sylphx-methods/references/standards/` |
| Domain `review-*` playbooks | `skills/sylphx-methods/references/reviews/` |
| Design methods | `skills/sylphx-methods/references/design/` |
| Other product/analysis/support methods | `skills/sylphx-methods/references/methods/` |

Start navigation at `skills/sylphx-methods/references/INDEX.md`.

## What a skill is

Per [agentskills.io](https://agentskills.io): a folder with `SKILL.md` plus optional
`scripts/`, `references/`, `assets/`. Progressive disclosure:

1. Metadata (`name` + `description`) — listing budgeted
2. `SKILL.md` body — when selected
3. References/scripts — on demand

## Always-on vs skills vs method library

| Layer | Home | Content |
| --- | --- | --- |
| Always-on | `runtime/constitution.md` | Miss-class-A floors only |
| Task skills | `skills/*` (except library) | High-frequency specialized jobs |
| Company methods package | `sylphx-methods` | Migrated breadth; one listing entry |
| Product norms | Product repo `AGENTS.md` / docs | Local stack and decisions |
| Live authority | CI, deploy, RBAC, tools | Real effects |

## Task-skill test (before adding a listing entry)

1. Recurring job
2. Real agent gap without the package
3. One primary outcome
4. Specific gotchas/commands (not generic textbook)
5. Catalog still fits host listing budget (~8k description chars class on Codex)

If it fails: put depth under `sylphx-methods/references/` (or product docs), not a new listing.

## Authoring

Follow `skills/author-skill`. Prefer fewer task skills + deep library references.


## Discoverability rule

The risk of a methods package is **opacity**. Mitigations in this repo:

1. Listing description names concrete domains (agent-native, delivery, product cycles, …).
2. `references/INDEX.md` is **job-first**, not only legacy package ids.
3. Always-on constitution points agents at the INDEX for company work.
4. Hot-path task skills stay separate shortcuts; they do not hide the library.
