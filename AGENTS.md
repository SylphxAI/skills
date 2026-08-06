# Skills repository instructions

Public Agent Skills catalog (MIT) for Codex, Claude Code, and Grok Build.

## Rules

- Every method is a first-class package under `skills/<id>/`.
- Frontmatter: only `name` and `description` (keep descriptions short for listing budget).
- Depth in `references/`; helpers in `scripts/`.
- No meta-router skill and no "methods library bag" that hides jobs.
- Rebuild: `npm run build:catalog`. Test: `npm test`.

## Always-on

`runtime/constitution.md` — thin fail-closed floors only.
