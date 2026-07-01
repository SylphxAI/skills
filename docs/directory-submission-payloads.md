# Directory Submission Payloads

Use these copy-ready payloads when submitting Sylphx Skills to external directories. Adjust field names to match each directory form.

## Canonical repository

- Repository: `https://github.com/SylphxAI/skills`
- Install: `npx skills add SylphxAI/skills`
- skills.sh page: `https://www.skills.sh/sylphxai/skills`
- Catalog: `catalog/index.html`
- License: MIT
- Skill count: 195 preview skills
- Quality proof: CI validates registry drift, static catalog drift, skill schema, eval coverage, catalog coverage, reference structure, behavior examples, and launch kit coverage.

## Short description

Curated, eval-backed AI-agent skills for product planning, UI craft, growth, checkout conversion, SaaS pricing, subscriptions, payments, mobile apps, games, Steam launch, Microsoft Store, store review risk, macOS/Windows release readiness, developer tools, marketplaces, referral loops, retention analytics, win-back, customer health, enterprise readiness, data portability, release health, experiment design, permission UX, localization, admin settings IA, security questionnaires, billing reconciliation, game soft launch, community launch ops, feature flags, partner ecosystems, tax/invoicing, user preferences, support QA, in-product education, AI feature risk, creator ranking quality, moderation, accessibility, support, privacy, fraud, incidents, analytics, contract renewals, enterprise onboarding, model routing, research repositories, support workforce planning, metrics layers, localization QA, audit readiness, sales qualification, enterprise expansion, usage metering, AI red teams, data residency, privacy impact assessments, partner channels, customer training, revenue recognition, legal terms, product analytics instrumentation, customer references, status page operations, support-engineering escalation, procurement packaging, trial conversion, ABM, RevOps CRM governance, security exceptions, admin audit logs, data lineage, community events, marketplace trust economics, product-led sales routing, contract redlines, customer success playbooks, sales commissions, feature prioritization, data erasure, API deprecation, marketplace quality scoring, onboarding migration runbooks, and skill-marketplace workflows.

## Long description

Sylphx Skills is a public repository of high-signal `SKILL.md` packages for AI agents. It is built as a product operating knowledge matrix rather than a prompt dump: compact skill instructions, progressively disclosed references, rule IDs, decision tables, state machines, event schemas, behavior examples, eval prompts, generated registry, static catalog, and CI validation.

The collection helps agents reason through the full lifecycle of software products: planning, research, product design, UI, monetization, distribution, operations, promotion, customer support, trust, privacy, analytics, developer experience, marketplace operations, accessibility, referral loops, retention analytics, and live event operations.

## Suggested tags

`ai-agents`, `skills`, `ai-skills`, `agent-skills`, `agent-tools`, `claude-skills`, `claude-code-skill`, `product-design`, `ui-design`, `saas`, `mobile-apps`, `games`, `growth`, `pricing`, `payments`, `developer-tools`, `marketplace`, `customer-support`, `analytics`

## Directory-specific notes

### skills.sh

- Public page: `https://www.skills.sh/sylphxai/skills`
- Repository: `SylphxAI/skills`
- Metadata file: `skills.sh.json`
- Install command: `npx skills add SylphxAI/skills`
- Verification: `npm run verify:install`
- Badge note: do not add `https://skills.sh/b/SylphxAI/skills` until the endpoint returns a valid repository badge rather than `resource not found`.

### SkillsMP

- Submit/index as: public skill repository / collection.
- Known indexer requirement: public GitHub repository with `SKILL.md` frontmatter and GitHub topic `claude-skills` or `claude-code-skill`.
- Primary categories: Product, Design, Growth, Operations, Developer Tools, Marketplace, Agent Skills.
- Representative skills: `interface-craft`, `checkout-conversion-review`, `mobile-app-product-systems`, `payment-platform-readiness`, `steam-launch-readiness`, `developer-tool-product-design`, `marketplace-product-ops`.

### ClaudeSkill / ClaudeSkill Hub

- Submit as: open skill folder collection.
- Note: skills are self-contained under `skills/<skill-name>/` and include `SKILL.md` frontmatter with only `name` and `description`.
- If no submit route is live, keep this as a manual external gate.

### Cross AI Tools

- Submit as: AI-agent skill repository if a submission route appears or contact is available.
- Emphasize: installable via open skills CLI, cross-agent folder pattern, generated catalog, MIT license, eval-backed quality gates.

## Current external discovery status

As of 2026-06-30 UTC:

| Surface | Status | Evidence |
| --- | --- | --- |
| Open skills CLI | Live | `npx skills add SylphxAI/skills --list` resolves the GitHub repo and lists the public skills. |
| skills.sh | Live | `https://www.skills.sh/sylphxai/skills` renders the repository page. |
| SkillsMP | Pending | Search returns older `SylphxAI/flow` entries, not `github.com/SylphxAI/skills`; topic-based daily sync is required. |
| Cross AI Tools | Pending | Public search/listing did not show `SylphxAI/skills`; no stable public submit route found. |
| ClaudeSkill / ClaudeSkill Hub | Pending | Site exists, but no stable submit/listing route for this repo was verified. |

Do not close launch distribution issue #1 until at least two third-party directories have stable public proof for `github.com/SylphxAI/skills` specifically.
