# Sylphx Agent Skills

<p align="center">
  <img src="https://mark.sylphx.com/api/v1/mark/hero.svg?type=aurora&theme=grape&text=Sylphx%20Agent%20Skills&desc=Reusable%20skills%20for%20coding%20agents" alt="Sylphx Agent Skills" width="100%" />
</p>

Sylphx Agent Skills gives your coding agent a proven method for each recurring
job: install the whole catalog into Claude Code, Codex, Grok, or DeepSeek
Harness in one command per host.

```bash
# Claude Code
claude plugin marketplace add SylphxAI/skills --scope user && claude plugin install sylphx-skills@sylphx --scope user

# Codex
codex plugin marketplace add SylphxAI/skills && codex plugin add sylphx-skills@sylphx

# Grok
grok plugin install SylphxAI/skills --trust

# DeepSeek Harness (DSH)
dsh plugin --profile web add git+https://github.com/SylphxAI/skills.git
```

## Proven to help

We graded 11 skills against the same model without them
([method, per-task scores and caveats](docs/evals.md)); one of them,
`write-high-signal-update`, was merged into `handoff-work` afterwards. Nine
clearly beat the bare model; one does not on its own.

| Skill | Items with / bare (of 20) | Tasks passed with / bare (of 5) |
| --- | --- | --- |
| execute-hard-cutover | 19 / 10 | 5 / 2 |
| select-next-work | 18 / 10 | 5 / 1 |
| bound-request-scope | 19 / 13 | 5 / 2 |
| select-dependency-versions | 18 / 12 | 5 / 2 |
| analyze-critically | 20 / 14 | 5 / 3 |
| notification-strategy | 15 / 9 | 3 / 1 |
| handoff-work | 20 / 15 | 5 / 4 |
| launch-readiness | 20 / 16 | 5 / 4 |
| run-incident-response | 20 / 16 | 5 / 5 |

Caveats: one run per cell, one model, one grader; the rubrics were written from
each skill's own text, so this shows the skill transfers its method, not that
it is the best method. `build-product` showed no gain from its `SKILL.md`
alone, only from its reference file. 51 of 61 skills have no eval yet.
[Request a skill](https://github.com/SylphxAI/skills/issues/new?template=skill_request.yml)
or help close that gap (see [CONTRIBUTING.md](CONTRIBUTING.md)).

## Why it works

- **The right method, on request.** Each skill is one folder with a
  `SKILL.md` that says when it applies and what to do, covering product,
  engineering, operations, design, and research. Browse the catalog in
  [`skills/`](skills/).
- **Opinions, not boilerplate.** Skills carry the gotchas and judgement a
  capable model would otherwise miss, following the open
  [Agent Skills](https://agentskills.io/specification) specification.
- **Loads only what it needs.** Reference files, scripts, and assets are read
  when a skill calls for them. Nothing runs in the background: no always-on
  prompt, runtime, scheduler, daemon, or updater.
- **Native everywhere.** The host owns its plugin cache and update flow.
  Installed names use the plugin namespace, such as
  `sylphx-skills:analyze-critically`; DSH mounts the catalog under the plain
  skill names. Restart or reload the host after installing.

## Update

```bash
# Claude Code
claude plugin marketplace update sylphx
claude plugin update sylphx-skills@sylphx --scope user

# Codex
codex plugin marketplace upgrade sylphx
codex plugin add sylphx-skills@sylphx

# DeepSeek Harness (DSH)
dsh plugin --profile web update sylphx-skills
```

Codex follows the version in `.codex-plugin/plugin.json`; Claude Code follows
the source commit.

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

## Also from Sylphx

<!-- generated:also-from -->
- [**anymd**](https://github.com/SylphxAI/anymd): Any file (PDF, Word, PowerPoint, Excel, EPUB, HTML, images) to clean Markdown for AI agents.
- [**repomap**](https://github.com/SylphxAI/repomap): A map of your codebase for AI agents: code graph, search, call paths and change impact.
- [**lockdocs**](https://github.com/SylphxAI/lockdocs): Exact-version library docs from your lockfile. Local, offline, no rate limits.
- [**readme-mark**](https://github.com/SylphxAI/readme-mark): Beautiful README images from one URL: banners, badges, icons and stats cards.

More from Sylphx: https://sylphx.com/open-source
<!-- /generated:also-from -->

## License

MIT.
