# Curation ledger

## Principle

Listing skills are **workflows users request**. Constraint depth lives under the
workflow that applies it. No standards bag skill. No docs-only agent binding.

## v5 workflows

| Action | Detail |
| --- | --- |
| demote | `*-standard` / `*-policy` / `*-profile` off the listing catalog |
| merge | design shapes → `design-product` + references |
| absorb | Keel app tooling → `build-product/references/keel-app` |
| absorb | resolve-support-case → `operate-customer-support/references/resolve-one-case` |
| merge | domain reviews → `review-domain` + references |

## v5.1 packaging mistake (corrected)

Putting all packs under `adopt-repo-standards/references/policies/` fixed install
visibility but **broke discovery semantics** (fake bag skill).

## v5.2 owner placement

| Action | Detail |
| --- | --- |
| place | each pack under its applying workflow's `references/` |
| link | other workflows point to owner path; no duplicate pack trees |
| keep | `docs/` human-only; `adopt-repo-standards` is only *repo adoption* |

## Non-goals

- Meta-router skill
- Restoring packs as listing skills
- Destroying pack method text
