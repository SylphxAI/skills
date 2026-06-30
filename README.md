# Sylphx Skills

[![Validate skills](https://github.com/SylphxAI/skills/actions/workflows/validate.yml/badge.svg)](https://github.com/SylphxAI/skills/actions/workflows/validate.yml)

Curated, eval-backed product operating skills for AI agents.

Sylphx Skills is a public repository of high-signal `SKILL.md` packages for agents such as Codex, Claude Code, Cursor, GitHub Copilot, Windsurf, and other tools that understand the open skill folder pattern.

We optimize for **quality over volume**:

- concise `SKILL.md` instructions with progressive disclosure;
- practical references and scripts instead of long prompt dumps;
- trigger descriptions that tell agents exactly when to use each skill;
- validation, security review, original-synthesis review, lightweight evals, and behavior examples before publish.

## Browse

A generated static catalog lives in [`catalog/index.html`](./catalog/index.html). It is built from [`registry/skills.json`](./registry/skills.json) and [`skills.sh.json`](./skills.sh.json), so GitHub remains the source of truth.

## Install

Install the whole collection with the open skills CLI:

```bash
npx skills add SylphxAI/skills
```

Install verification details: [`docs/install-verification.md`](./docs/install-verification.md).

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
| [`decision-memo-writer`](./skills/decision-memo-writer/SKILL.md) | Writing decision memos with owner, options, evidence, tradeoffs, risks, metrics, and revisit triggers. | Preview |
| [`opportunity-scoring-review`](./skills/opportunity-scoring-review/SKILL.md) | Scoring roadmap, growth, product, and market opportunities by impact, confidence, effort, risk, and learning. | Preview |
| [`experiment-design-review`](./skills/experiment-design-review/SKILL.md) | Designing product experiments with hypotheses, guardrails, exposure, metrics, and decisions. | Preview |
| [`ai-feature-product-risk-review`](./skills/ai-feature-product-risk-review/SKILL.md) | Reviewing AI feature value, safety, privacy, evals, autonomy, cost, and rollout risk. | Preview |
| [`enterprise-readiness-review`](./skills/enterprise-readiness-review/SKILL.md) | Auditing enterprise readiness across security, identity, procurement, support, and rollout. | Preview |
| [`sales-demo-script-review`](./skills/sales-demo-script-review/SKILL.md) | Creating buyer-specific sales demo scripts with discovery, proof, objections, and next steps. | Preview |
| [`agentic-workflow-designer`](./skills/agentic-workflow-designer/SKILL.md) | Designing reliable agentic workflows with autonomy levels, tool boundaries, gates, handoffs, and evals. | Preview |
| [`interface-craft`](./skills/interface-craft/SKILL.md) | Building, polishing, or reviewing UI for product craft and tasteful micro-details. | Preview |
| [`mobile-first-ui-review`](./skills/mobile-first-ui-review/SKILL.md) | Auditing mobile-first flows for touch ergonomics, safe areas, forms, permissions, and speed. | Preview |
| [`motion-transition-review`](./skills/motion-transition-review/SKILL.md) | Designing subtle, accessible motion for state changes, navigation, gestures, and loading. | Preview |
| [`responsive-layout-review`](./skills/responsive-layout-review/SKILL.md) | Making layouts work from compact mobile views to wide desktop workspaces. | Preview |
| [`accessibility-product-review`](./skills/accessibility-product-review/SKILL.md) | Reviewing critical product flows for keyboard, screen reader, motion, contrast, touch, and recovery access. | Preview |
| [`design-system-extractor`](./skills/design-system-extractor/SKILL.md) | Extracting tokens, components, states, patterns, accessibility rules, and migration plans from existing UI. | Preview |
| [`form-ux-review`](./skills/form-ux-review/SKILL.md) | Auditing form flows for field necessity, validation, errors, accessibility, trust, autosave, and completion quality. | Preview |
| [`app-permission-ux-review`](./skills/app-permission-ux-review/SKILL.md) | Auditing permission prompts, sensitive access, denial recovery, settings, and trust copy. | Preview |
| [`admin-settings-ia-review`](./skills/admin-settings-ia-review/SKILL.md) | Designing admin settings IA, role gates, defaults, audit logs, and dangerous actions. | Preview |
| [`user-preferences-settings-review`](./skills/user-preferences-settings-review/SKILL.md) | Designing user preferences, defaults, sync, privacy controls, reset, and settings UX. | Preview |
| [`in-product-education-review`](./skills/in-product-education-review/SKILL.md) | Designing contextual education, checklists, tooltips, tours, templates, and help handoffs. | Preview |
| [`empty-state-and-loading-review`](./skills/empty-state-and-loading-review/SKILL.md) | Improving empty, loading, offline, zero-result, and error recovery states. | Preview |
| [`landing-page-critique`](./skills/landing-page-critique/SKILL.md) | Improving landing pages for positioning, proof, CTA clarity, objections, and conversion. | Preview |
| [`pricing-page-critique`](./skills/pricing-page-critique/SKILL.md) | Improving pricing pages, plan tables, trials, risk reducers, and monetization UX. | Preview |
| [`checkout-conversion-review`](./skills/checkout-conversion-review/SKILL.md) | Auditing checkout, wallets, discounts, payment errors, entitlement grants, and conversion guardrails. | Preview |
| [`startup-growth-review`](./skills/startup-growth-review/SKILL.md) | Reviewing a startup product, funnel, positioning, launch, or go-to-market plan. | Preview |
| [`product-positioning`](./skills/product-positioning/SKILL.md) | Sharpening audience, category, alternatives, differentiation, proof, and message hierarchy. | Preview |
| [`seo-content-brief`](./skills/seo-content-brief/SKILL.md) | Creating product-led SEO briefs around intent, original value, internal links, and conversion. | Preview |
| [`promotion-campaign-review`](./skills/promotion-campaign-review/SKILL.md) | Designing offers, promotions, launches, win-back, events, and campaign guardrails. | Preview |
| [`winback-campaign-review`](./skills/winback-campaign-review/SKILL.md) | Designing ethical win-back and reactivation campaigns for churned or dormant users. | Preview |
| [`localization-market-expansion-review`](./skills/localization-market-expansion-review/SKILL.md) | Planning localization, regional launch, pricing, payments, support, and market expansion. | Preview |
| [`referral-loop-review`](./skills/referral-loop-review/SKILL.md) | Designing referral loops, rewards, attribution, fraud controls, support evidence, and retained-value metrics. | Preview |
| [`launch-narrative-review`](./skills/launch-narrative-review/SKILL.md) | Shaping launch narratives around audience, old way, new way, proof, objections, assets, and CTA. | Preview |
| [`saas-subscription-pricing`](./skills/saas-subscription-pricing/SKILL.md) | Designing SaaS pricing, packaging, trials, cancellation, and expansion. | Preview |
| [`usage-based-pricing-review`](./skills/usage-based-pricing-review/SKILL.md) | Designing usage-based pricing, metering, credits, quotas, overages, spend controls, and billing trust. | Preview |
| [`subscription-entitlement-review`](./skills/subscription-entitlement-review/SKILL.md) | Keeping subscriptions, plans, trials, renewals, refunds, and access states consistent. | Preview |
| [`refund-and-support-flow-review`](./skills/refund-and-support-flow-review/SKILL.md) | Designing fair refund, entitlement, appeal, abuse review, and support flows. | Preview |
| [`payment-platform-readiness`](./skills/payment-platform-readiness/SKILL.md) | Preparing Apple Pay, Google Pay, IAP, web checkout, refunds, entitlements, and reconciliation. | Preview |
| [`marketplace-payouts-review`](./skills/marketplace-payouts-review/SKILL.md) | Designing marketplace seller balances, fees, holds, refunds, chargebacks, ledgers, and payouts. | Preview |
| [`billing-reconciliation-review`](./skills/billing-reconciliation-review/SKILL.md) | Reconciling invoices, payments, ledgers, entitlements, refunds, disputes, and payouts. | Preview |
| [`tax-invoicing-compliance-review`](./skills/tax-invoicing-compliance-review/SKILL.md) | Auditing tax, invoicing, receipts, VAT/GST, credit notes, and finance-support handoffs. | Preview |
| [`mobile-app-product-systems`](./skills/mobile-app-product-systems/SKILL.md) | Designing mobile app/game monetization, retention, notification, refund, and reward systems. | Preview |
| [`notification-strategy-review`](./skills/notification-strategy-review/SKILL.md) | Designing push, email, in-app, SMS, and lifecycle notifications without fatigue. | Preview |
| [`game-economy-review`](./skills/game-economy-review/SKILL.md) | Reviewing currencies, sources/sinks, rewards, ads, IAP, events, refunds, and fairness. | Preview |
| [`ad-monetization-review`](./skills/ad-monetization-review/SKILL.md) | Designing rewarded ads, interstitials, mediation, caps, privacy, and ad fatigue guardrails. | Preview |
| [`daily-reward-and-streak-review`](./skills/daily-reward-and-streak-review/SKILL.md) | Designing daily rewards, streaks, missions, repair, notifications, economy impact, and anti-abuse controls. | Preview |
| [`live-event-ops-review`](./skills/live-event-ops-review/SKILL.md) | Operating live events with eligibility, rewards, offers, monitoring, support, rollback, and post-event learning. | Preview |
| [`game-soft-launch-review`](./skills/game-soft-launch-review/SKILL.md) | Planning game soft launches with cohorts, economy, ads, IAP, retention, and scale gates. | Preview |
| [`retention-cohort-review`](./skills/retention-cohort-review/SKILL.md) | Diagnosing activation, retention, resurrection, churn, cohort quality, and product action plans. | Preview |
| [`onboarding-activation-review`](./skills/onboarding-activation-review/SKILL.md) | Improving first-run setup, permission timing, aha moments, and activation metrics. | Preview |
| [`app-store-distribution-readiness`](./skills/app-store-distribution-readiness/SKILL.md) | Preparing apps, games, and desktop software for store/channel launch. | Preview |
| [`store-listing-optimization`](./skills/store-listing-optimization/SKILL.md) | Optimizing App Store, Google Play, Steam, Microsoft Store, and direct-download listings. | Preview |
| [`launch-readiness-review`](./skills/launch-readiness-review/SKILL.md) | Reviewing go/no-go readiness across product, payments, support, analytics, trust, and rollback. | Preview |
| [`release-health-dashboard-review`](./skills/release-health-dashboard-review/SKILL.md) | Designing release health dashboards, staged rollout gates, rollback, and post-release review. | Preview |
| [`feature-flag-rollout-review`](./skills/feature-flag-rollout-review/SKILL.md) | Planning feature flags, staged rollouts, kill switches, gates, rollback, and cleanup. | Preview |
| [`steam-launch-readiness`](./skills/steam-launch-readiness/SKILL.md) | Preparing Steam store pages, wishlists, demos, builds, pricing, community, and launch-week ops. | Preview |
| [`microsoft-store-readiness`](./skills/microsoft-store-readiness/SKILL.md) | Preparing Windows apps for Microsoft Store packaging, listing, certification, monetization, and rollout. | Preview |
| [`store-review-policy-risk`](./skills/store-review-policy-risk/SKILL.md) | Auditing store submission risk across payments, privacy, permissions, UGC, ads, claims, and reviewer notes. | Preview |
| [`desktop-os-integration`](./skills/desktop-os-integration/SKILL.md) | Designing macOS/Windows installers, auto-update, tray/menu, permissions, files, and backup. | Preview |
| [`macos-release-readiness`](./skills/macos-release-readiness/SKILL.md) | Auditing macOS signing, notarization, permissions, keychain, data, updates, uninstall, and diagnostics. | Preview |
| [`windows-release-readiness`](./skills/windows-release-readiness/SKILL.md) | Auditing Windows installers, signing, services, startup, registry, updates, uninstall, and diagnostics. | Preview |
| [`backup-restore-design`](./skills/backup-restore-design/SKILL.md) | Designing backup, restore, export, sync, and data durability systems. | Preview |
| [`changelog-and-release-notes`](./skills/changelog-and-release-notes/SKILL.md) | Writing user-facing release notes, technical changelogs, and support-aware update communication. | Preview |
| [`customer-support-operations`](./skills/customer-support-operations/SKILL.md) | Designing support, refund, escalation, help center, and trust operations. | Preview |
| [`support-quality-qa-review`](./skills/support-quality-qa-review/SKILL.md) | Designing support QA scorecards, macro reviews, calibration, coaching, and product loops. | Preview |
| [`customer-success-health-review`](./skills/customer-success-health-review/SKILL.md) | Scoring customer health and mapping renewal, adoption, expansion, and success playbooks. | Preview |
| [`help-center-architecture`](./skills/help-center-architecture/SKILL.md) | Structuring help centers, support docs, search, escalation, and article maintenance. | Preview |
| [`privacy-and-data-retention-review`](./skills/privacy-and-data-retention-review/SKILL.md) | Reviewing data collection, retention, deletion, export, telemetry, backups, and disclosures. | Preview |
| [`data-export-portability-review`](./skills/data-export-portability-review/SKILL.md) | Designing trusted export, portability, deletion, migration, and offboarding flows. | Preview |
| [`security-questionnaire-response-review`](./skills/security-questionnaire-response-review/SKILL.md) | Preparing truthful security questionnaire answers with evidence, caveats, and gaps. | Preview |
| [`abuse-fraud-risk-review`](./skills/abuse-fraud-risk-review/SKILL.md) | Designing abuse, fraud, spam, refund, promotion, marketplace, and game-economy controls. | Preview |
| [`moderation-trust-review`](./skills/moderation-trust-review/SKILL.md) | Designing moderation queues, appeals, enforcement ladders, and trust operations. | Preview |
| [`incident-communication-playbook`](./skills/incident-communication-playbook/SKILL.md) | Planning outage, payment, data, privacy, game, and support incident communications. | Preview |
| [`analytics-event-taxonomy`](./skills/analytics-event-taxonomy/SKILL.md) | Defining event names, properties, funnels, identity, guardrails, and instrumentation QA. | Preview |
| [`developer-tool-product-design`](./skills/developer-tool-product-design/SKILL.md) | Designing developer tools, APIs, SDKs, CLIs, docs, examples, pricing, telemetry, and support. | Preview |
| [`marketplace-product-ops`](./skills/marketplace-product-ops/SKILL.md) | Operating marketplaces with submissions, review queues, ranking, trust, payouts, disputes, and moderation. | Preview |
| [`creator-onboarding-review`](./skills/creator-onboarding-review/SKILL.md) | Designing creator onboarding, submission quality gates, review feedback, publishing, analytics, and payouts readiness. | Preview |
| [`community-launch-ops-review`](./skills/community-launch-ops-review/SKILL.md) | Planning community launch operations, channels, roles, moderation, events, and feedback loops. | Preview |
| [`partner-integration-ecosystem-review`](./skills/partner-integration-ecosystem-review/SKILL.md) | Designing partner ecosystems, APIs, certification, directories, incentives, and support boundaries. | Preview |
| [`creator-ranking-quality-review`](./skills/creator-ranking-quality-review/SKILL.md) | Auditing marketplace ranking quality, fairness, freshness, fraud resistance, and creator trust. | Preview |
| [`skill-eval-designer`](./skills/skill-eval-designer/SKILL.md) | Designing behavior evals, positive/negative prompts, rubrics, regression cases, and forward-tests for skills. | Preview |
| [`skill-catalog-generator`](./skills/skill-catalog-generator/SKILL.md) | Generating skill catalogs, quality scores, groupings, gaps, and marketplace metadata. | Preview |
| [`skill-marketplace-creator`](./skills/skill-marketplace-creator/SKILL.md) | Creating, curating, validating, or operating a marketplace of reusable agent skills. | Preview |

The generated registry lives at [`registry/skills.json`](./registry/skills.json).

## Public/private boundary

This repository is the public skill marketplace seed. It publishes MIT-licensed,
self-contained skills that must not depend on private Sylphx repositories,
credentials, customer data, or internal operating policy. Private Sylphx
engineering doctrine lives outside this public repository. Internal Sylphx
agents may install private Doctrine skills alongside these public skills; when
there is a conflict, private Doctrine governs internal work and this repository
provides advisory domain craft.

Project identity and delivery boundary are recorded in
[`.doctrine/project.json`](./.doctrine/project.json) and summarized in
[`PROJECT.md`](./PROJECT.md).

## Quality bar

A Sylphx skill must be:

1. **Useful** — it changes agent behavior on a real task.
2. **Concise** — `SKILL.md` contains routing and method, not a knowledge dump.
3. **Progressively disclosed** — detailed knowledge lives in `references/`; deterministic work lives in `scripts/`.
4. **Evaluable** — examples show when the skill should trigger and what better output looks like.
5. **Safe** — no secrets, unsafe shell snippets, malicious instructions, dark patterns, or license laundering.
6. **Original synthesis** — learn from the world, then publish Sylphx-owned structure, examples, and wording; attribution is only needed for direct quotes, third-party code/assets, or license-required excerpts.

See [`docs/skill-quality-bar.md`](./docs/skill-quality-bar.md), [`docs/skill-authoring-principles.md`](./docs/skill-authoring-principles.md), [`docs/behavior-eval-rubric.md`](./docs/behavior-eval-rubric.md), [`docs/product-skill-roadmap.md`](./docs/product-skill-roadmap.md), [`docs/sota-product-operating-matrix.md`](./docs/sota-product-operating-matrix.md), [`docs/skill-factory-automation.md`](./docs/skill-factory-automation.md), and [`docs/skill-packs.md`](./docs/skill-packs.md).

## Validate locally

```bash
node scripts/generate-registry.mjs
node scripts/generate-catalog.mjs
node scripts/validate-skills.mjs --check-registry
node scripts/validate-evals.mjs
node scripts/validate-catalog.mjs
node scripts/validate-reference-quality.mjs
node scripts/validate-behavior-examples.mjs
node scripts/validate-launch-kit.mjs
node scripts/generate-catalog.mjs --check

# Optional external install verification
npm run verify:install
```

## Contribute

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) and [`docs/submit-a-skill.md`](./docs/submit-a-skill.md).

## Launch kit

- Demo matrix: [`examples/launch-demos.md`](./examples/launch-demos.md)
- Distribution plan: [`docs/distribution-launch-plan.md`](./docs/distribution-launch-plan.md)
- Public launch post: [`docs/public-launch-post.md`](./docs/public-launch-post.md)
- Install verification: [`docs/install-verification.md`](./docs/install-verification.md)
- Directory submission payloads: [`docs/directory-submission-payloads.md`](./docs/directory-submission-payloads.md)

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
