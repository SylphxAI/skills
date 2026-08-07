# Acceptance — user-job skills catalog (v5.1)

## Objective

Skills catalog matches industry workflow definition and user mental model:

1. Listing skills are workflows, not policies
2. Overlapping domains use one skill + references
3. Engine tooling (Keel) is reference under product build, not a separate "title" skill
4. Policy/constraint packs that agents must apply are **installable** under skill `references/`
5. Content preserved; listing budget healthy; tests/install green

## Evidence

- `skills/adopt-repo-standards/references/policies/*/README.md` present for each pack
- `docs/policies/` contains only a pointer README
- package tests and `catalog.json` green after this cut
- reinstall shows packs under the installed `adopt-repo-standards` package
