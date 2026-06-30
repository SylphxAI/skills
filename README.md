# Sylphx Skills

[![Validate skills](https://github.com/SylphxAI/skills/actions/workflows/validate.yml/badge.svg)](https://github.com/SylphxAI/skills/actions/workflows/validate.yml)

Curated, eval-backed skills for AI agents.

Sylphx Skills is a public repository of high-signal `SKILL.md` packages for agents such as Codex, Claude Code, Cursor, GitHub Copilot, Windsurf, and other tools that understand the open skill folder pattern.

We optimize for **quality over volume**:

- concise `SKILL.md` instructions with progressive disclosure;
- practical references and scripts instead of long prompt dumps;
- trigger descriptions that tell agents exactly when to use each skill;
- validation, security review, original-synthesis review, and lightweight evals before publish.

## Browse

A generated static catalog lives in [`catalog/index.html`](./catalog/index.html). It is built from [`registry/skills.json`](./registry/skills.json) and [`skills.sh.json`](./skills.sh.json), so GitHub remains the source of truth.

## Install

Install the whole collection with the open skills CLI:

```bash
npx skills add SylphxAI/skills
```

Install a specific skill when your client supports skill selection:

```bash
npx skills add https://github.com/SylphxAI/skills --skill interface-craft
```

## Skills

| Skill | Use when | Status |
| --- | --- | --- |
| [`product-lifecycle-architect`](./skills/product-lifecycle-architect/SKILL.md) | Planning a product end-to-end from strategy through support, growth, and operations. | Preview |
| [`execution-simplification`](./skills/execution-simplification/SKILL.md) | Turning messy cross-functional product problems into simple execution plans. | Preview |
| [`market-research-synthesis`](./skills/market-research-synthesis/SKILL.md) | Synthesizing competitors, reviews, pricing, and market patterns into original strategy. | Preview |
| [`interface-craft`](./skills/interface-craft/SKILL.md) | Building, polishing, or reviewing UI for product craft and tasteful micro-details. | Preview |
| [`mobile-first-ui-review`](./skills/mobile-first-ui-review/SKILL.md) | Auditing mobile-first flows for touch ergonomics, safe areas, forms, permissions, and speed. | Preview |
| [`motion-transition-review`](./skills/motion-transition-review/SKILL.md) | Designing subtle, accessible motion for state changes, navigation, gestures, and loading. | Preview |
| [`responsive-layout-review`](./skills/responsive-layout-review/SKILL.md) | Making layouts work from compact mobile views to wide desktop workspaces. | Preview |
| [`empty-state-and-loading-review`](./skills/empty-state-and-loading-review/SKILL.md) | Improving empty, loading, offline, zero-result, and error recovery states. | Preview |
| [`landing-page-critique`](./skills/landing-page-critique/SKILL.md) | Improving landing pages for positioning, proof, CTA clarity, objections, and conversion. | Preview |
| [`pricing-page-critique`](./skills/pricing-page-critique/SKILL.md) | Improving pricing pages, plan tables, trials, risk reducers, and monetization UX. | Preview |
| [`startup-growth-review`](./skills/startup-growth-review/SKILL.md) | Reviewing a startup product, funnel, positioning, launch, or go-to-market plan. | Preview |
| [`product-positioning`](./skills/product-positioning/SKILL.md) | Sharpening audience, category, alternatives, differentiation, proof, and message hierarchy. | Preview |
| [`seo-content-brief`](./skills/seo-content-brief/SKILL.md) | Creating product-led SEO briefs around intent, original value, internal links, and conversion. | Preview |
| [`promotion-campaign-review`](./skills/promotion-campaign-review/SKILL.md) | Designing offers, promotions, launches, win-back, events, and campaign guardrails. | Preview |
| [`saas-subscription-pricing`](./skills/saas-subscription-pricing/SKILL.md) | Designing SaaS pricing, packaging, trials, cancellation, and expansion. | Preview |
| [`subscription-entitlement-review`](./skills/subscription-entitlement-review/SKILL.md) | Keeping subscriptions, plans, trials, renewals, refunds, and access states consistent. | Preview |
| [`refund-and-support-flow-review`](./skills/refund-and-support-flow-review/SKILL.md) | Designing fair refund, entitlement, appeal, abuse review, and support flows. | Preview |
| [`payment-platform-readiness`](./skills/payment-platform-readiness/SKILL.md) | Preparing Apple Pay, Google Pay, IAP, web checkout, refunds, entitlements, and reconciliation. | Preview |
| [`mobile-app-product-systems`](./skills/mobile-app-product-systems/SKILL.md) | Designing mobile app/game monetization, retention, notification, refund, and reward systems. | Preview |
| [`notification-strategy-review`](./skills/notification-strategy-review/SKILL.md) | Designing push, email, in-app, SMS, and lifecycle notifications without fatigue. | Preview |
| [`game-economy-review`](./skills/game-economy-review/SKILL.md) | Reviewing currencies, sources/sinks, rewards, ads, IAP, events, refunds, and fairness. | Preview |
| [`onboarding-activation-review`](./skills/onboarding-activation-review/SKILL.md) | Improving first-run setup, permission timing, aha moments, and activation metrics. | Preview |
| [`app-store-distribution-readiness`](./skills/app-store-distribution-readiness/SKILL.md) | Preparing apps, games, and desktop software for store/channel launch. | Preview |
| [`store-listing-optimization`](./skills/store-listing-optimization/SKILL.md) | Optimizing App Store, Google Play, Steam, Microsoft Store, and direct-download listings. | Preview |
| [`launch-readiness-review`](./skills/launch-readiness-review/SKILL.md) | Reviewing go/no-go readiness across product, payments, support, analytics, trust, and rollback. | Preview |
| [`desktop-os-integration`](./skills/desktop-os-integration/SKILL.md) | Designing macOS/Windows installers, auto-update, tray/menu, permissions, files, and backup. | Preview |
| [`backup-restore-design`](./skills/backup-restore-design/SKILL.md) | Designing backup, restore, export, sync, and data durability systems. | Preview |
| [`changelog-and-release-notes`](./skills/changelog-and-release-notes/SKILL.md) | Writing user-facing release notes, technical changelogs, and support-aware update communication. | Preview |
| [`customer-support-operations`](./skills/customer-support-operations/SKILL.md) | Designing support, refund, escalation, help center, and trust operations. | Preview |
| [`help-center-architecture`](./skills/help-center-architecture/SKILL.md) | Structuring help centers, support docs, search, escalation, and article maintenance. | Preview |
| [`privacy-and-data-retention-review`](./skills/privacy-and-data-retention-review/SKILL.md) | Reviewing data collection, retention, deletion, export, telemetry, backups, and disclosures. | Preview |
| [`abuse-fraud-risk-review`](./skills/abuse-fraud-risk-review/SKILL.md) | Designing abuse, fraud, spam, refund, promotion, marketplace, and game-economy controls. | Preview |
| [`incident-communication-playbook`](./skills/incident-communication-playbook/SKILL.md) | Planning outage, payment, data, privacy, game, and support incident communications. | Preview |
| [`analytics-event-taxonomy`](./skills/analytics-event-taxonomy/SKILL.md) | Defining event names, properties, funnels, identity, guardrails, and instrumentation QA. | Preview |
| [`skill-marketplace-creator`](./skills/skill-marketplace-creator/SKILL.md) | Creating, curating, validating, or operating a marketplace of reusable agent skills. | Preview |

The generated registry lives at [`registry/skills.json`](./registry/skills.json).

## Quality bar

A Sylphx skill must be:

1. **Useful** — it changes agent behavior on a real task.
2. **Concise** — `SKILL.md` contains routing and method, not a knowledge dump.
3. **Progressively disclosed** — detailed knowledge lives in `references/`; deterministic work lives in `scripts/`.
4. **Evaluable** — examples show when the skill should trigger and what better output looks like.
5. **Safe** — no secrets, unsafe shell snippets, malicious instructions, dark patterns, or license laundering.
6. **Original synthesis** — learn from the world, then publish Sylphx-owned structure, examples, and wording; attribution is only needed for direct quotes, third-party code/assets, or license-required excerpts.

See [`docs/skill-quality-bar.md`](./docs/skill-quality-bar.md), [`docs/skill-authoring-principles.md`](./docs/skill-authoring-principles.md), [`docs/product-skill-roadmap.md`](./docs/product-skill-roadmap.md), [`docs/sota-product-operating-matrix.md`](./docs/sota-product-operating-matrix.md), [`docs/skill-factory-automation.md`](./docs/skill-factory-automation.md), and [`docs/skill-packs.md`](./docs/skill-packs.md).

## Validate locally

```bash
node scripts/generate-registry.mjs
node scripts/generate-catalog.mjs
node scripts/validate-skills.mjs --check-registry
node scripts/validate-evals.mjs
node scripts/validate-catalog.mjs
node scripts/validate-reference-quality.mjs
node scripts/generate-catalog.mjs --check
```

## Contribute

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) and [`docs/submit-a-skill.md`](./docs/submit-a-skill.md).

## Roadmap

This repository is the source of truth. The marketplace surface can later become:

- a static website generated from `registry/skills.json`;
- a public search API;
- install analytics and badges;
- verified creator pages;
- private enterprise registries;
- skill eval and scoring services.

See [`docs/marketplace-roadmap.md`](./docs/marketplace-roadmap.md).

## License

MIT. See [`LICENSE`](./LICENSE).
