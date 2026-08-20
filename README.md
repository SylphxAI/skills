# Sylphx Agent Skills

Reusable, organization-neutral [Agent Skills](https://agentskills.io/specification)
for product, engineering, operations, design, and research work.

- Ordinary: `none` — this catalog is not a public website. Customers browse this repository and install through host plugin marketplaces. `https://sylphx.com` is the Sylphx Platform marketing site, not this catalog.
- Preview: `none` — GitHub Pages is not enabled, and no product-owned preview or dogfood web host is admitted. `https://sylphx.com/skills` redirects to a Platform login, not this catalog.
- Vision: [`docs/vision.md`](docs/vision.md)
- Capabilities: [`docs/capabilities.md`](docs/capabilities.md)

Each package lives at `skills/<name>/` and uses `SKILL.md` as its source. A
listing is one recurring, independently accepted job. The body encodes
particular opinions, gotchas, and interfaces a capable model would otherwise
miss. Domain depth lives in `references/` of the owning job and loads only
when a stated condition holds. A package may include scripts and assets when
the skill genuinely uses them. `SKILL.md` is the sole package contract, and
each agent host owns installation and discovery through its native interface.

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
