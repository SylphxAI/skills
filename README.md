# Sylphx Agent Skills

Reusable, organization-neutral [Agent Skills](https://agentskills.io/specification)
for product, engineering, operations, design, and research work.

Browse the catalog in [`skills/`](skills/). Each skill is a folder with a
`SKILL.md` that says when it applies and what to do, plus optional reference
files, scripts and assets that load only when the skill needs them. Install it
as a plugin in Codex, Claude Code, Grok or DeepSeek Harness; nothing else runs
in the background.

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

# DeepSeek Harness (DSH)
dsh plugin --profile web add git+https://github.com/SylphxAI/skills.git
```

The host owns its plugin cache and update flow. Installed skill names use the
plugin namespace, such as `sylphx-skills:analyze-critically`. Restart or reload
the host after changing plugins. DSH mounts the catalog as a global skill
provider under the plain skill names; restart the harness after installing.

The plugin exposes only `skills/`. It does not install an always-on prompt,
runtime, scheduler, daemon, or background updater.

## Update

Refresh the host-owned marketplace and plugin cache:

```bash
# Codex
codex plugin marketplace upgrade sylphx
codex plugin add sylphx-skills@sylphx

# Claude Code
claude plugin marketplace update sylphx
claude plugin update sylphx-skills@sylphx --scope user

# DeepSeek Harness (DSH)
dsh plugin --profile web update sylphx-skills
```

Codex uses the semantic version in `.codex-plugin/plugin.json`; a Codex plugin
release bumps that version. Claude Code intentionally uses the source commit as
its version because `.claude-plugin/plugin.json` omits a fixed version. Restart
or reload the host after an update.

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

## License

MIT.
