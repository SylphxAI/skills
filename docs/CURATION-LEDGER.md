# Curation ledger — user-job catalog (v5.1)

## Principle

Listing skills are **workflows users request**. Overlapping shapes and policies are **references**, not parallel listings. Anything agents must open after install must live under `skills/`.

## Executed (v5)

| Action | Detail |
| --- | --- |
| demote | all `*-standard` / `*-policy` / `*-profile` off the listing catalog |
| merge | design-app/game/saas/marketing/… → `design-product` + shape references |
| absorb | `build-keel-title` → `build-product/references/keel-app` (product term: app, not title) |
| absorb | `resolve-support-case` → `operate-customer-support/references/resolve-one-case` |
| merge | all `review-*` → `review-domain` + domain references |
| move | `design-prompt-architecture` → `engineer-agent-context/references/prompt-architecture` |

## Executed (v5.1 packaging fix)

| Action | Detail |
| --- | --- |
| relocate | policy packs → `skills/adopt-repo-standards/references/policies/` (installable) |
| demote docs | `docs/policies/` is a human pointer only; no binding method depth there |
| rewire | workflow composition paths use `../adopt-repo-standards/references/policies/<pack>/` |

## Naming

- Prefer **app** / **product** / **game** in agent-facing language.
- Keel type name `Title` may appear only as engine API vocabulary inside Keel references.

## Non-goals

- Deleting researched method text (moved, not destroyed)
- Meta-router skill
- Restoring policy packs as listing skills
