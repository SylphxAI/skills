# Public Launch Post

## Short version

We just launched **Sylphx Skills**: a public, eval-backed repository of AI-agent skills for product teams.

It covers product planning, UI craft, mobile apps, games, SaaS pricing, subscriptions, payments, App Store/Google Play/Steam/Microsoft Store readiness, desktop OS integration, backup/restore, promotions, support, privacy, fraud, incidents, analytics, and marketplace operations.

Install:

```bash
npx skills add SylphxAI/skills
```

Browse the generated catalog in the repo:

- https://github.com/SylphxAI/skills
- `catalog/index.html`

What makes it different: every skill is concise, progressively disclosed, original-synthesis, eval-backed, and validated by CI.

## Longer version

Most AI-agent skill repos become prompt dumps. We wanted something closer to a product operating knowledge matrix: compact `SKILL.md` files, deeper references with state machines and decision tables, behavior examples, eval prompts, and CI gates.

Current coverage:

- 139 preview skills;
- product lifecycle, UI, growth, pricing, payments, mobile/game systems, distribution, desktop OS, backup, support, privacy, abuse/fraud, incidents, analytics, renewals, enterprise onboarding, AI model routing, metrics layers, localization QA, audit readiness, sales qualification, enterprise expansion, usage metering, AI red-team review, data residency, privacy assessment, partner channels, customer training, revenue recognition, legal terms, product analytics instrumentation, customer references, status page ops, support-engineering escalation, procurement packaging, trial conversion, and skill marketplace operations;
- generated registry and static catalog;
- validation for schema, eval coverage, catalog coverage, reference structure, behavior examples, and catalog drift.

The goal is to help agents make better product decisions, not just write nicer prose.

Repository:

https://github.com/SylphxAI/skills

Install all skills:

```bash
npx skills add SylphxAI/skills
```

Install one skill:

```bash
npx skills add https://github.com/SylphxAI/skills --skill interface-craft
```

## Tags

AI agents, skills, product design, SaaS, mobile apps, games, growth, developer tools, customer support, product operations.
