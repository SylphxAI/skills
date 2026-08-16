# Skills repository

This repository owns reusable Agent Skill packages under `skills/<name>/`.
Each `SKILL.md` is the package source and follows the Agent Skills specification.
The product boundary and current North Star are [docs/NORTH-STAR.md](docs/NORTH-STAR.md).

## Working agreement

- Search `skills/` for the semantic owner before editing or adding a package.
- Keep one recurring job per skill and one semantic owner per instruction.
- Write positive action paths, ownership boundaries, and selection conditions.
- Place optional depth in directly relevant references.
- Keep scripts that implement real skill behavior and test those scripts.
- Use native host discovery and installation paths; this repository does not
  own a second installer, scheduler, or generated catalog.
- Run the format, local-link, and changed-script checks before landing.
- CI jobs use the owned `sylphx-linux-standard` runner profile; GitHub-hosted
  labels are not a fallback.
- Report local, landed, released, and live state precisely.

The compact always-on floor is [runtime/constitution.md](runtime/constitution.md)
and its full nine-principles source is [docs/policies/PRINCIPLES.md](docs/policies/PRINCIPLES.md).
Repository history remains available through Git. The active tree contains only
current product instructions and executable helpers.
