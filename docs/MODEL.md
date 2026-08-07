# Agent Skills model (v5.1)

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

| Kind | Where | Installed to agents? |
| --- | --- | --- |
| Workflows | `skills/<job>/` (listing) | Yes |
| Shape / engine depth | `skills/<job>/references/` | Yes (with parent skill) |
| Org policy packs | `skills/adopt-repo-standards/references/policies/<pack>/` | Yes (with adopt-repo-standards) |
| Human repo docs | `docs/` (including `docs/policies/` pointer) | **No** — not in package install path |

## Why policies live under a workflow package

The installer copies only `skills/*` packages into runtime skill roots. Content that must constrain live agent work therefore **must** live under an installed skill package—typically as progressive `references/`—not only under `docs/`.

Policies remain **not listing skills**. Agents do not discover `delivery-standard` as a job; they open policy packs when a workflow says so.

## User-job framing

Agents match how users think about work:

- "design a product" → `design-product` (app/game/SaaS depth in references)
- "build a product" → `build-product` (Keel app tooling in `references/keel-app`)
- "review this domain" → `review-domain` (domain packs in references)
- "operate support" → `operate-customer-support` (single-case depth in references)
- "adopt engineering baseline" → `adopt-repo-standards` (and its policy packs)

## Progressive disclosure

1. Listing metadata (budgeted)
2. Skill body when selected
3. References (shape depth, engine tooling, policy packs) only when the body says so
