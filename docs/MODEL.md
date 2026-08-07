# Agent Skills model (v5)

## Industry meaning

A **Skill** is a specialized **workflow** an agent loads on demand:

- one user-requestable job
- short `name` + `description` for discovery
- procedure body + optional `references/` / `scripts/`

A Skill is **not**:

- a policy encyclopedia entry
- an engine brand product name
- a domain checklist that only differs by reference tables

## Catalog shape

| Kind | Where |
| --- | --- |
| Workflows | `skills/<job>/` (listing) |
| Shape/engine depth | `skills/<job>/references/` |
| Org policy packs | `docs/policies/` (not listing skills) |

## User-job framing

Agents match how users think about work:

- "design a product" → `design-product` (app/game/SaaS depth in references)
- "build a product" → `build-product` (Keel app tooling in `references/keel-app`)
- "review this domain" → `review-domain` (domain packs in references)
- "operate support" → `operate-customer-support` (single-case depth in references)

## Progressive disclosure

1. Listing metadata (budgeted)
2. Skill body when selected
3. References only when the body says so
