# Skill Marketplace Playbook

## Marketplace shapes

### Repository-only

Best first move. Use GitHub as the source of truth, contribution flow, trust signal, and SEO surface.

Minimum files:

```text
README.md
skills.sh.json
skills/<skill-name>/SKILL.md
registry/skills.json
scripts/validate-skills.*
docs/skill-quality-bar.md
.github/workflows/validate.yml
```

### Static catalog

Generate pages from `registry/skills.json`. Add search, topics, install commands, creator pages, and validation badges.

### API registry

Expose search, ranking, installation metadata, and compatibility data. Use when external agents or products need programmatic access.

### Full marketplace

Add accounts, submissions, reviews, analytics, verified creators, monetization, and abuse prevention.

## Skill schema

Required:

- `name`: lowercase kebab-case, under 64 characters, folder-matching.
- `description`: clear trigger text with "Use when" or equivalent.
- `SKILL.md`: concise method and routing.

Recommended:

- `references/`: detailed domain knowledge.
- `scripts/`: deterministic helpers.
- `agents/openai.yaml`: UI metadata.
- `evals/`: trigger and outcome checks.

## Quality gates

- Schema valid.
- Description has specific triggers and avoids overbroad invocation.
- No TODO placeholders.
- No secrets or private data.
- No unsafe shell commands unless tightly scoped and explained.
- Links to local references resolve.
- Content is original synthesis, not copied expression or close paraphrase. Direct quotes, third-party code/assets, or license-required excerpts have permission and attribution.
- At least one realistic example prompt exists for complex skills.

## Agent factory

Use agents to create drafts, not to publish automatically.

1. Scout: find knowledge gaps and source material.
2. Rights: decide whether any direct source material is being included. Prefer no direct inclusion; synthesize original guidance instead.
3. Distill: extract reusable workflow, not prose.
4. Author: create `SKILL.md`, references, and scripts.
5. Eval: test trigger and output behavior.
6. Security: inspect scripts and instruction risks.
7. Curator: decide whether it belongs in the catalog.

## Distribution

- Submit to open skill directories.
- Publish weekly skill demos with before/after outputs.
- Add install badges to README.
- Create skill packs by job: design, growth, engineering, security, data.
- Invite expert maintainers for verified categories.
