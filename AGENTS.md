# Skills repository

Public workflow Agent Skills with installable constraint depth.

- Listing packages: `skills/<workflow-id>/` only
- Constraint packs (not listing skills): `skills/adopt-repo-standards/references/policies/`
- `docs/` is human git documentation only; the installer does not ship it
- One skill = one user-requestable job; depth in references
- Prefer product language **app/game/product**, not "title"
- Keel tooling is reference under `build-product`, not a separate listing
- `npm run build:catalog && npm test`
