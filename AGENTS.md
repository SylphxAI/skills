# Skills repository instructions

Public source for a small Agent Skills catalog (MIT) and install adapters.

## Authoring

- Managed packages live only under `skills/<id>/`.
- Root `SKILL.md` is the install bootstrap; it points at `INSTALL.md` only.
- Frontmatter is `name` + `description` only.
- Put depth in `references/`; deterministic helpers in `scripts/`.
- One specialized job per skill. No policy encyclopedias, no meta-routers.
- Keep the catalog inside the Codex ~8k description listing class.
- Rebuild with `npm run build:catalog`. Run `npm test` before landing.

## Model

See `docs/MODEL.md`. Always-on floors stay in `runtime/constitution.md`.

## Install targets

Codex, Claude Code, Grok Build via `runtime/sylphx-skills.mjs`.
