# Directory Submission Payloads

Use these copy-ready payloads when submitting Sylphx Skills to external directories. Adjust field names to match each directory form.

## Canonical repository

- Repository: `https://github.com/SylphxAI/skills`
- Install: `npx skills add SylphxAI/skills`
- Catalog: `catalog/index.html`
- License: MIT
- Skill count: 35 preview skills
- Quality proof: CI validates registry drift, static catalog drift, skill schema, eval coverage, catalog coverage, reference structure, behavior examples, and launch kit coverage.

## Short description

Curated, eval-backed AI-agent skills for product planning, UI craft, growth, SaaS pricing, subscriptions, payments, mobile apps, games, store launch, desktop OS integration, support, privacy, fraud, incidents, analytics, and skill-marketplace workflows.

## Long description

Sylphx Skills is a public repository of high-signal `SKILL.md` packages for AI agents. It is built as a product operating knowledge matrix rather than a prompt dump: compact skill instructions, progressively disclosed references, rule IDs, decision tables, state machines, event schemas, behavior examples, eval prompts, generated registry, static catalog, and CI validation.

The collection helps agents reason through the full lifecycle of software products: planning, research, product design, UI, monetization, distribution, operations, promotion, customer support, trust, privacy, analytics, and marketplace operations.

## Suggested tags

`ai-agents`, `skills`, `product-design`, `ui-design`, `saas`, `mobile-apps`, `games`, `growth`, `pricing`, `payments`, `customer-support`, `analytics`, `agent-tools`

## Directory-specific notes

### skills.sh

- Submit repository: `SylphxAI/skills`
- Metadata file: `skills.sh.json`
- Install command: `npx skills add SylphxAI/skills`
- Verification: `npm run verify:install`

### SkillsMP

- Submit as: public skill repository / collection
- Primary categories: Product, Design, Growth, Operations, Agent Skills
- Representative skills: `interface-craft`, `mobile-app-product-systems`, `payment-platform-readiness`, `game-economy-review`, `privacy-and-data-retention-review`

### ClaudeSkill

- Submit as: open skill folder collection
- Note: skills are self-contained under `skills/<skill-name>/` and include `SKILL.md` frontmatter with only `name` and `description`.

### Cross AI Tools

- Submit as: AI-agent skill repository
- Emphasize: installable via open skills CLI, cross-agent folder pattern, generated catalog, MIT license, eval-backed quality gates.

## Current external discovery status

As of 2026-06-30 UTC, `npx skills find SylphxAI` returned `No skills found for "SylphxAI"`. That means external directory indexing is still pending even though direct GitHub install works.
