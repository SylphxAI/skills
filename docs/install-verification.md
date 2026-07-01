# Install Verification

This repository is installable through the open skills CLI.

## Manual command

List public skills without installing:

```bash
npx skills add SylphxAI/skills --list
```

Install all skills for Codex into an isolated HOME or a real user environment:

```bash
npx skills add SylphxAI/skills --global --skill '*' --agent codex -y --copy
```

## Reproducible verifier

Run the repository verifier against default-branch GitHub:

```bash
npm run verify:install
```

Run it against a local checkout or branch source before merge:

```bash
npm run verify:install -- /absolute/path/to/skills
# or
SKILLS_SOURCE=/absolute/path/to/skills npm run verify:install
```

The verifier creates an isolated temporary `HOME`, npm cache, and XDG config/cache directories. It then:

1. runs `npx --yes skills add <source> --list`;
2. asserts the CLI reports all skills from `registry/skills.json`;
3. installs all skills with `--global --skill '*' --agent codex -y --copy` inside the isolated HOME;
4. asserts every expected `SKILL.md` exists under the temporary install root;
5. runs `npx --yes skills list --global --json`.

The default source is `SylphxAI/skills`, which verifies the GitHub default branch. For unmerged PR work, pass the local checkout path so the expected registry and the install source refer to the same tree.

## Latest local proof

Last verified from a clean temporary HOME on 2026-06-30 UTC using the local checkout source:

| Check | Result |
| --- | --- |
| `npx --yes skills add <local checkout path> --list` | exit 0; reported 171 skills |
| `npx --yes skills add <local checkout path> --global --skill '*' --agent codex -y --copy` | exit 0 |
| Installed `SKILL.md` files | 171 |
| `npx --yes skills list --global --json` | exit 0 |

Default-branch proof should be refreshed with `npm run verify:install` after the 171-skill expansion merges to `main`. Third-party directory listing still depends on external indexers or manual submission flows.
