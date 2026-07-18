# Sylphx Skills — repository instructions

This repository is the canonical public source for Sylphx static agent
instructions.

- Author package semantics only under `skills/<id>/`.
- Keep each `SKILL.md` frontmatter to `name` and `description`.
- Put detailed reusable knowledge in `references/` and optional deterministic
  helpers in the package's `scripts/`.
- Do not add benchmark runs, model outputs, admission systems, live fleet/work
  state, credentials, customer data, generated skill bodies, or retired copies.
- `catalog.json` is derived; rebuild it with `npm run build:catalog`.
- Run `npm test` before landing a change.
- Material repository decisions receive an ADR under `docs/adr/`; product-local
  decisions remain in their owning product repository.

The single CI job protects package/install integrity. It is not a semantic
judge, trust system, or Control Plane.

