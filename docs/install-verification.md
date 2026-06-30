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

Run the repository verifier:

```bash
npm run verify:install
```

The verifier creates an isolated temporary `HOME`, npm cache, and XDG config/cache directories. It then:

1. runs `npx --yes skills add SylphxAI/skills --list`;
2. asserts the CLI reports all skills from `registry/skills.json`;
3. installs all skills with `--global --skill '*' --agent codex -y --copy` inside the isolated HOME;
4. asserts every expected `SKILL.md` exists under the temporary install root;
5. runs `npx --yes skills list --global --json`.

The script is intentionally not part of the default push CI because it depends on external npm/GitHub network availability. Use the manual `Verify open skills install` GitHub Action when external install proof is needed.

## Latest local proof

Last verified from a clean temporary HOME on 2026-06-30 UTC:

| Check | Result |
| --- | --- |
| `npx --yes skills add SylphxAI/skills --list` | exit 0; reported 35 skills |
| `npx --yes skills add SylphxAI/skills --global --skill '*' --agent codex -y --copy` | exit 0 |
| Installed `SKILL.md` files | 35 |
| `npx --yes skills list --global --json` | exit 0 |

The latest proof confirms public GitHub readback and installability. Third-party directory listing still depends on external indexers or manual submission flows.
