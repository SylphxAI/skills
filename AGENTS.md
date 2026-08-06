# Skills repository instructions

Public source for an industry-aligned Agent Skills catalog (MIT) plus migrated
method knowledge.

## Layout

- `skills/<task-id>/` — installable task skills (small catalog)
- `skills/sylphx-methods/` — **company method library** (one listing entry;
  real map is `references/INDEX.md` job → path; not optional nesting)
- `skills/author-skill/references/` — skill-authoring depth (incl. folded
  curate/distill/evals methods)
- `runtime/constitution.md` — thin always-on floors
- `docs/MODEL.md` — architecture rules

## Authoring

- Frontmatter is `name` + `description` only.
- Prefer task skills only when the task-skill test in `docs/MODEL.md` passes.
- Otherwise add depth under `sylphx-methods/references/` and index it.
- Rebuild with `npm run build:catalog`. Run `npm test` before landing.

## Install targets

Codex, Claude Code, Grok Build via `runtime/sylphx-skills.mjs`.
