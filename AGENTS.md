# Skills repository

This repository owns reusable Agent Skill packages under `skills/<name>/`.
Each `SKILL.md` is the package source and follows the Agent Skills specification.

## Working agreement

- Search `skills/` for the semantic owner before editing or adding a package.
- Keep one recurring job per skill and one semantic owner per instruction.
- Write positive action paths, ownership boundaries, and selection conditions.
- Place optional depth in directly relevant references.
- Keep scripts that implement real skill behavior and test those scripts.
- Use native host discovery and installation paths.
- Run the format, local-link, and changed-script checks before landing.
- Report local, landed, released, and live state precisely.

Repository history remains available through Git. The active tree contains only
current product instructions and executable helpers.
