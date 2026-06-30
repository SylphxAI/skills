# Sylphx Skills Agent Instructions

This repository is a public skill marketplace seed, not a product runtime.

## Non-negotiables

- Keep every skill self-contained under `skills/<skill-name>/`.
- `SKILL.md` frontmatter must contain only `name` and `description`.
- Put detailed reusable knowledge in `references/` and deterministic helpers in `scripts/`.
- Do not commit secrets, credentials, proprietary customer data, or copied copyrighted material.
- Do not scrape third-party writing into a skill. Published skills should be Sylphx original synthesis: understand the source material, then write our own structure, rules, examples, and wording. Attribute only when directly quoting, incorporating third-party code/assets, or when a source license requires it.
- Run `node scripts/generate-registry.mjs && node scripts/validate-skills.mjs --check-registry` before pushing.

## Skill quality

Optimize for agent behavior, not human documentation volume. A good skill has clear triggers, a compact method, concrete output formats, and examples or evals that show improvement.
