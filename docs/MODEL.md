# Agent Skills model

## North star

Every reusable job method is a **first-class skill**:

- own folder under `skills/<id>/`
- own `name` + `description` for host discovery
- own body + optional `references/` / `scripts/`
- no meta "methods bag" and no "company vs non-company" gate

Agents do not ask "is this company work?" before loading a method.
They match the **job** in the skill description and load it.

## Progressive disclosure

1. Listing: all skill names + short descriptions (host budgeted)
2. Body: when selected
3. References/scripts: on demand

## Always-on

`runtime/constitution.md` — miss-class-A floors only (authority, evidence honesty).
Not a method catalog.

## Listing budget

Keep descriptions short so the full catalog stays within host listing class
(Codex ~8k characters). Depth goes in `references/`, not the description.

## Authoring

Use `author-skill`. One job per skill. Prefer short descriptions and deep references.
