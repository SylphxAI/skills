# Agent Skills model (v6 — atomic actions)

## Industry + local rule

A **Skill** is a specialized package an agent loads on demand for **one task-level atomic action**:

- finite, requestable job
- short `name` + `description` for discovery
- procedure body + optional `references/` / `scripts/`

Progressive disclosure (industry default): listing → body → references.

## Atomic action test

Listing skill **only if** all true:

1. Requestable as "do X"
2. Independent acceptably complete outcome
3. Real recurring agent gap without it
4. Specific non-textbook procedure
5. Improves listing-budget routing

Otherwise: owner action `references/`, thin always-on floor, or nothing.

**Target catalog size: ~15–25 actions**, not dozens of phases/techniques/domains.

## Not skills

- standards / policies / profiles
- lifecycle phases of another action
- domain checklist packs (one `review-domain` + refs)
- analysis techniques (under evidence/research actions)
- engine brand product names
- methods bags / "consult standards" skills
- `docs/`-only material (not installed)

## Install reality

Installer copies `skills/*` only. Agent-needed depth must live under an installed action skill's `references/`. `docs/` is human git documentation.

## Constraint pack owners (examples)

| Depth | Owner action |
| --- | --- |
| engineering, verification, platform-first | `build-product` |
| source-authoring, delivery, CI | `drive-to-delivery` |
| project-manifest / enterprise profile | `adopt-repo-standards` |
| decision-quality, causal, critique methods | `synthesize-evidence-brief` |
| instruction-evolution, distill, evals, curate | `author-skill` |
| review solicitation / feedback loop | `operate-customer-support` |

## v6 listing catalog

Twenty atomic actions (see `catalog.json`). Demoted jobs live under those owners' `references/`.
