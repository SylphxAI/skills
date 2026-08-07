# Policy packs (installable location)

Org policy packs are **not** listing skills. They ship **inside** the installed
skill package:

`skills/adopt-repo-standards/references/policies/<pack>/`

Agents only receive packages under `skills/` from the installer. Do not put
binding method depth only under `docs/` — documentation here is a pointer for
humans browsing the repository.

## Catalog

See the directories under:

[../../skills/adopt-repo-standards/references/policies/](../../skills/adopt-repo-standards/references/policies/)

## Progressive disclosure

Workflow skills compose constraints by opening those packs when the job needs
them. Prefer paths relative to installed skill packages, for example from
`drive-to-delivery`:

`../adopt-repo-standards/references/policies/<pack>/`

Primary entry is usually `README.md` then `references/full-standard.md`.
