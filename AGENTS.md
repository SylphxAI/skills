# Skills repository

This repository owns reusable Agent Skill packages under `skills/<name>/`.
Each `SKILL.md` is the package source and follows the Agent Skills specification.
The product destination is [docs/vision.md](docs/vision.md).

## Working agreement

- Search `skills/` for the semantic owner before editing or adding a package.
- Keep one recurring job per skill and one semantic owner per instruction.
- Encode particular opinions and gotchas, not numbered recipes of ordinary work.
  Prefer judgement heuristics that stay true over absolute rules that do not.
- Place optional depth in references and say when to open each file.
- Keep scripts that implement real skill behavior and test those scripts.
- Use native host discovery and installation paths.
- Run the format, local-link, and changed-script checks before landing.
- Report local, landed, released, and live state precisely.

Repository history remains available through Git. The active tree contains only
current product instructions and executable helpers.
