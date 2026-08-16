# Sylphx Agent Skills

Reusable [Agent Skills](https://agentskills.io/specification) for product,
engineering, operations, design, and research work.

Each package lives at `skills/<name>/` and uses `SKILL.md` as its source. A
package may include references, scripts, and assets when the skill genuinely
uses them. `SKILL.md` is the sole package contract, and each agent host owns
installation and discovery through its native interface.

## Install

Install through the host's native plugin interface:

```bash
# Codex
codex plugin marketplace add SylphxAI/skills
codex plugin add sylphx-skills@sylphx

# Claude Code
claude plugin marketplace add SylphxAI/skills --scope user
claude plugin install sylphx-skills@sylphx --scope user

# Grok
grok plugin install SylphxAI/skills --trust
```

The host owns its plugin cache and update flow. Installed skill names use the
plugin namespace, such as `sylphx-skills:analyze-critically`. Restart or reload
the host after changing plugins.

Codex reads the repo-scoped marketplace from `.agents/plugins/marketplace.json`
and the plugin manifest from `.codex-plugin/plugin.json`. Claude Code keeps its
native compatibility metadata under `.claude-plugin/`; neither host delegates
installation or update state to this repository.

## Repository layout

```text
skills/
  <name>/
    SKILL.md
    references/   # optional reading selected by SKILL.md
    scripts/      # optional executable helpers
    assets/       # optional output resources
```

Browse [`skills/`](skills/) by job name. The frontmatter description in each
`SKILL.md` defines when that skill applies.

## Contribute

See [CONTRIBUTING.md](CONTRIBUTING.md). Pull requests run one fast check for
the Agent Skills format, local links, and bundled script behavior.

## Operating floor

The current product boundary is [docs/NORTH-STAR.md](docs/NORTH-STAR.md). The
compact always-on constitution is [runtime/constitution.md](runtime/constitution.md)
and the full nine-principles source is [docs/policies/PRINCIPLES.md](docs/policies/PRINCIPLES.md).

## License

MIT.
