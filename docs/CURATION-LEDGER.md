# Curation ledger — user-job catalog (v5)

## Principle

Listing skills are **workflows users request**. Overlapping shapes and policies are **references or docs**, not parallel listings.

## Executed (v5)

| Action | Detail |
| --- | --- |
| demote | all `*-standard` / `*-policy` / `*-profile` → `docs/policies/` |
| merge | design-app/game/saas/marketing/… → `design-product` + shape references |
| absorb | `build-keel-title` → `build-product/references/keel-app` (product term: app, not title) |
| absorb | `resolve-support-case` → `operate-customer-support/references/resolve-one-case` |
| merge | all `review-*` → `review-domain` + domain references |
| move | `design-prompt-architecture` → `engineer-agent-context/references/prompt-architecture` |

## Naming

- Prefer **app** / **product** / **game** in agent-facing language.
- Keel type name `Title` may appear only as engine API vocabulary inside Keel references.

## Non-goals of this cut

- Deleting researched method text (moved, not destroyed)
- Meta-router skill
- Restoring policy packs as listing skills
