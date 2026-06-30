# Marketplace Roadmap

## Stage 0 — Repository marketplace

- Public GitHub repository.
- Curated skills under `skills/`.
- Generated `registry/skills.json`.
- GitHub Actions validation.
- Listing on skills directories.

## Stage 1 — Static marketplace

- Generate a website from `registry/skills.json`.
- Skill detail pages with install commands, examples, license, and validation status.
- Topics, search, and creator pages.

## Stage 2 — Community and distribution

- Submit/request board.
- Skill packs.
- Verified creator badges.
- Install badges and anonymized install counts.
- Weekly featured skills.

## Stage 3 — Business surface

- Private enterprise skill registries.
- Skill evaluation and scoring.
- Custom skill creation service.
- Sponsored but clearly labelled placements.


## Current static catalog

The repository now includes a generated static catalog under [`catalog/`](../catalog/index.html). It is intentionally lightweight: no app framework, no database, no duplicate manual copy. The generator reads `registry/skills.json` and `skills.sh.json` and writes:

- `catalog/index.html` for all groups and skills;
- `catalog/groups/*.html` for topic pages;
- `catalog/skills/*.html` for skill pages with install commands and source links;
- `catalog/catalog-manifest.json` for generated-file traceability.

CI regenerates the catalog and fails if the committed output drifts from the registry.
