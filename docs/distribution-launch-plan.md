# Distribution Launch Plan

This repository is ready to be promoted as a public, eval-backed skill marketplace seed. GitHub remains the source of truth; external directories and posts should point back to the repo, install command, generated catalog, and live skills.sh page.

## Launch positioning

**Sylphx Skills** is a curated set of product, design, growth, monetization, platform, trust, support, analytics, developer-tool, marketplace, and agent-operation skills for AI agents.

Core message:

> Curated, eval-backed skills for AI agents that help teams design, launch, monetize, support, and operate better software products.

## Public proof points

- 115 preview skills.
- 115 eval files.
- 115 behavior examples.
- Generated registry: `registry/skills.json`.
- Generated static catalog: `catalog/index.html`.
- Live skills.sh listing: `https://www.skills.sh/sylphxai/skills`.
- CI gates for registry drift, catalog drift, skill schema, eval coverage, catalog coverage, reference structure, and behavior examples.
- Original-synthesis policy and quality bar.

## Directory submission checklist

| Surface | Action | Status |
| --- | --- | --- |
| GitHub README | Make install path, catalog, quality bar, and roadmap visible. | Ready |
| Open skills CLI list/install | Verify `npx skills add SylphxAI/skills --list` and all-skill install in isolated HOME. | Verified locally / workflow-backed |
| skills.sh | Public listing at `https://www.skills.sh/sylphxai/skills`. | Live |
| SkillsMP | Add required GitHub topics (`claude-skills` or `claude-code-skill`) and wait for daily sync; submit manually if a form appears. | External indexer pending |
| ClaudeSkill / ClaudeSkill Hub | Submit repo URL if the submit page is available. | External gate |
| Cross AI Tools | Wait for curated/indexed discovery or submit if a public route appears. | External gate |
| Social launch | Use `docs/public-launch-post.md`. | Ready |
| Product/community posts | Link to catalog, README, skills.sh page, and demo matrix. | Ready |

## Install verification

Preferred command:

```bash
npx skills add SylphxAI/skills
```

Specific skill command:

```bash
npx skills add https://github.com/SylphxAI/skills --skill interface-craft
```

Run install verification only in an environment where downloading npm packages is acceptable. `npm run verify:install` performs this in an isolated temporary HOME and checks every skill listed in `registry/skills.json`.

## Launch sequence

1. Confirm CI is green on `main`.
2. Open `catalog/index.html` locally or via a published static host.
3. Verify install command in a clean environment.
4. Confirm skills.sh page and open skills CLI discovery.
5. Submit to or wait for external directories where submission/indexing is available.
6. Publish launch post.
7. Add badges/links after directory badge/listing endpoints are proven live.
8. Review stars, issues, installs, and external feedback weekly.

## Manual gates

These steps may require accounts, web forms, third-party indexer timing, or company-owned social accounts:

- SkillsMP/CrossAI/ClaudeSkill submission or indexer sync;
- install-count badge availability;
- enabling GitHub Pages or another public static host;
- social/community posting from the company account.

## Submission payloads

Copy-ready directory payloads live in [`directory-submission-payloads.md`](./directory-submission-payloads.md).
