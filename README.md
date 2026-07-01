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
| [`accessibility-conformance-program-review`](./skills/accessibility-conformance-program-review/SKILL.md) | Building accessibility conformance programs with WCAG targets, audits, VPAT/ACR, remediation, and gates. | Preview |
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
| [`lifecycle-email-system-review`](./skills/lifecycle-email-system-review/SKILL.md) | Designing lifecycle email systems, segmentation, consent, deliverability, suppression, and triggers. | Preview |
| [`localization-market-expansion-review`](./skills/localization-market-expansion-review/SKILL.md) | Planning localization, regional launch, pricing, payments, support, and market expansion. | Preview |
| [`referral-loop-review`](./skills/referral-loop-review/SKILL.md) | Designing referral loops, rewards, attribution, fraud controls, support evidence, and retained-value metrics. | Preview |
| [`launch-narrative-review`](./skills/launch-narrative-review/SKILL.md) | Shaping launch narratives around audience, old way, new way, proof, objections, assets, and CTA. | Preview |
| [`brand-trust-review`](./skills/brand-trust-review/SKILL.md) | Auditing brand trust across claims, proof, pricing clarity, privacy promises, testimonials, and support reputation. | Preview |
| [`partner-co-marketing-launch-review`](./skills/partner-co-marketing-launch-review/SKILL.md) | Planning partner co-marketing, joint messaging, launch assets, approvals, attribution, and follow-up. | Preview |
| [`saas-subscription-pricing`](./skills/saas-subscription-pricing/SKILL.md) | Designing SaaS pricing, packaging, trials, cancellation, and expansion. | Preview |
| [`usage-based-pricing-review`](./skills/usage-based-pricing-review/SKILL.md) | Designing usage-based pricing, metering, credits, quotas, overages, spend controls, and billing trust. | Preview |
| [`cost-margin-unit-economics-review`](./skills/cost-margin-unit-economics-review/SKILL.md) | Reviewing COGS, gross margin, usage cost, CAC/LTV, refunds, support load, and pricing sustainability. | Preview |
| [`observability-cost-governance-review`](./skills/observability-cost-governance-review/SKILL.md) | Governing logs, metrics, traces, cardinality, sampling, retention, ownership, budgets, and privacy. | Preview |
| [`risk-register-governance-review`](./skills/risk-register-governance-review/SKILL.md) | Creating risk registers with severity, likelihood, controls, mitigations, owners, and review cadence. | Preview |
| [`customer-advisory-board-review`](./skills/customer-advisory-board-review/SKILL.md) | Designing customer advisory boards, member selection, agendas, roadmap signal, commitments, and follow-up. | Preview |
| [`revenue-forecast-capacity-review`](./skills/revenue-forecast-capacity-review/SKILL.md) | Reviewing revenue forecasts, funnel assumptions, gross margin, capacity constraints, and scenarios. | Preview |
| [`experimentation-platform-governance-review`](./skills/experimentation-platform-governance-review/SKILL.md) | Governing A/B tests, holdouts, metrics, exposure, guardrails, ethics, conflicts, and decisions. | Preview |
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
| [`offline-sync-conflict-review`](./skills/offline-sync-conflict-review/SKILL.md) | Designing offline queues, reconnect sync, conflict resolution, local state, and data-loss recovery. | Preview |
| [`changelog-and-release-notes`](./skills/changelog-and-release-notes/SKILL.md) | Writing user-facing release notes, technical changelogs, and support-aware update communication. | Preview |
| [`feature-sunset-deprecation-review`](./skills/feature-sunset-deprecation-review/SKILL.md) | Planning feature, API, integration, workflow, or plan sunset with migration and communication. | Preview |
| [`release-train-change-management-review`](./skills/release-train-change-management-review/SKILL.md) | Planning release trains, change calendars, risk classes, staged rollout, rollback, and support readiness. | Preview |
| [`service-level-slo-review`](./skills/service-level-slo-review/SKILL.md) | Designing SLOs, SLIs, SLAs, error budgets, status pages, maintenance windows, and reliability promises. | Preview |
| [`reliability-incident-learning-review`](./skills/reliability-incident-learning-review/SKILL.md) | Turning incidents into timelines, contributing factors, action items, recurrence prevention, and learning. | Preview |
| [`customer-support-operations`](./skills/customer-support-operations/SKILL.md) | Designing support, refund, escalation, help center, and trust operations. | Preview |
| [`account-recovery-identity-review`](./skills/account-recovery-identity-review/SKILL.md) | Reviewing password reset, MFA/passkey recovery, SSO fallback, proof, and takeover risk. | Preview |
| [`support-quality-qa-review`](./skills/support-quality-qa-review/SKILL.md) | Designing support QA scorecards, macro reviews, calibration, coaching, and product loops. | Preview |
| [`customer-feedback-intake-review`](./skills/customer-feedback-intake-review/SKILL.md) | Designing feedback intake, tagging, dedupe, routing, evidence scoring, and roadmap loops. | Preview |
| [`customer-success-health-review`](./skills/customer-success-health-review/SKILL.md) | Scoring customer health and mapping renewal, adoption, expansion, and success playbooks. | Preview |
| [`help-center-architecture`](./skills/help-center-architecture/SKILL.md) | Structuring help centers, support docs, search, escalation, and article maintenance. | Preview |
| [`support-deflection-knowledge-base-review`](./skills/support-deflection-knowledge-base-review/SKILL.md) | Improving knowledge bases, help search, macros, chatbots, deflection metrics, and escalation. | Preview |
| [`privacy-and-data-retention-review`](./skills/privacy-and-data-retention-review/SKILL.md) | Reviewing data collection, retention, deletion, export, telemetry, backups, and disclosures. | Preview |
| [`data-export-portability-review`](./skills/data-export-portability-review/SKILL.md) | Designing trusted export, portability, deletion, migration, and offboarding flows. | Preview |
| [`data-import-migration-review`](./skills/data-import-migration-review/SKILL.md) | Designing imports, migrations, bulk uploads, mapping, dry runs, reconciliation, and rollback. | Preview |
| [`data-quality-observability-review`](./skills/data-quality-observability-review/SKILL.md) | Designing data quality checks, freshness, completeness, schema drift, lineage, alerts, and metric trust. | Preview |
| [`trust-center-readiness-review`](./skills/trust-center-readiness-review/SKILL.md) | Preparing trust centers with security, privacy, compliance, subprocessors, uptime, policies, and evidence. | Preview |
| [`procurement-security-review`](./skills/procurement-security-review/SKILL.md) | Preparing enterprise procurement security reviews, evidence packets, questionnaires, DPAs, and gap handling. | Preview |
| [`compliance-evidence-room-review`](./skills/compliance-evidence-room-review/SKILL.md) | Designing compliance evidence rooms, gated reports, document access, expiry, approvals, and audit logs. | Preview |
| [`data-governance-access-review`](./skills/data-governance-access-review/SKILL.md) | Designing data classification, access controls, approvals, least privilege, retention, audits, and break-glass. | Preview |
| [`security-questionnaire-response-review`](./skills/security-questionnaire-response-review/SKILL.md) | Preparing truthful security questionnaire answers with evidence, caveats, and gaps. | Preview |
| [`abuse-fraud-risk-review`](./skills/abuse-fraud-risk-review/SKILL.md) | Designing abuse, fraud, spam, refund, promotion, marketplace, and game-economy controls. | Preview |
| [`moderation-trust-review`](./skills/moderation-trust-review/SKILL.md) | Designing moderation queues, appeals, enforcement ladders, and trust operations. | Preview |
| [`content-policy-appeals-review`](./skills/content-policy-appeals-review/SKILL.md) | Designing content policy, enforcement ladders, appeals, evidence, transparency, and moderation QA. | Preview |
| [`community-governance-review`](./skills/community-governance-review/SKILL.md) | Designing community governance, roles, norms, moderation, councils, escalation, safety, and sustainability. | Preview |
| [`incident-communication-playbook`](./skills/incident-communication-playbook/SKILL.md) | Planning outage, payment, data, privacy, game, and support incident communications. | Preview |
| [`analytics-event-taxonomy`](./skills/analytics-event-taxonomy/SKILL.md) | Defining event names, properties, funnels, identity, guardrails, and instrumentation QA. | Preview |
| [`developer-tool-product-design`](./skills/developer-tool-product-design/SKILL.md) | Designing developer tools, APIs, SDKs, CLIs, docs, examples, pricing, telemetry, and support. | Preview |
| [`api-rate-limit-quota-review`](./skills/api-rate-limit-quota-review/SKILL.md) | Designing API limits, quotas, headers, tiers, burst policy, dashboards, and developer UX. | Preview |
| [`sdk-onboarding-integration-review`](./skills/sdk-onboarding-integration-review/SKILL.md) | Reviewing SDK quickstarts, auth, sandbox data, examples, errors, telemetry, and version migration. | Preview |
| [`platform-certification-program-review`](./skills/platform-certification-program-review/SKILL.md) | Designing certification programs for partners, apps, plugins, creators, badges, renewal, and audits. | Preview |
| [`marketplace-product-ops`](./skills/marketplace-product-ops/SKILL.md) | Operating marketplaces with submissions, review queues, ranking, trust, payouts, disputes, and moderation. | Preview |
| [`creator-onboarding-review`](./skills/creator-onboarding-review/SKILL.md) | Designing creator onboarding, submission quality gates, review feedback, publishing, analytics, and payouts readiness. | Preview |
| [`community-launch-ops-review`](./skills/community-launch-ops-review/SKILL.md) | Planning community launch operations, channels, roles, moderation, events, and feedback loops. | Preview |
| [`partner-integration-ecosystem-review`](./skills/partner-integration-ecosystem-review/SKILL.md) | Designing partner ecosystems, APIs, certification, directories, incentives, and support boundaries. | Preview |
| [`partner-risk-due-diligence-review`](./skills/partner-risk-due-diligence-review/SKILL.md) | Assessing partner fit, data sharing, brand risk, legal/privacy/security exposure, incentives, and exit plans. | Preview |
| [`creator-ranking-quality-review`](./skills/creator-ranking-quality-review/SKILL.md) | Auditing marketplace ranking quality, fairness, freshness, fraud resistance, and creator trust. | Preview |
| [`search-discovery-relevance-review`](./skills/search-discovery-relevance-review/SKILL.md) | Auditing search, discovery, filters, relevance signals, zero-results, ranking drift, and fairness. | Preview |
| [`skill-eval-designer`](./skills/skill-eval-designer/SKILL.md) | Designing behavior evals, positive/negative prompts, rubrics, regression cases, and forward-tests for skills. | Preview |
| [`ai-eval-regression-ops-review`](./skills/ai-eval-regression-ops-review/SKILL.md) | Operating AI eval regression suites with datasets, rubrics, judge drift, release gates, and rollback. | Preview |
| [`skill-catalog-generator`](./skills/skill-catalog-generator/SKILL.md) | Generating skill catalogs, quality scores, groupings, gaps, and marketplace metadata. | Preview |
| [`skill-marketplace-creator`](./skills/skill-marketplace-creator/SKILL.md) | Creating, curating, validating, or operating a marketplace of reusable agent skills. | Preview |

| [`contract-lifecycle-renewal-review`](./skills/contract-lifecycle-renewal-review/SKILL.md) | Separates renewal, expansion, downgrade, cancellation, true-up, collections, and amendment workflows with explicit owners | Preview |
| [`enterprise-onboarding-implementation-review`](./skills/enterprise-onboarding-implementation-review/SKILL.md) | Maps stakeholders, success criteria, dependencies, milestones, escalation rules, and customer/internal actions | Preview |
| [`model-router-cost-quality-review`](./skills/model-router-cost-quality-review/SKILL.md) | Defines task taxonomy, quality bar, latency SLO, privacy tier, user tier, cost ceiling, eval matrix, and rollback gates | Preview |
| [`user-research-repository-review`](./skills/user-research-repository-review/SKILL.md) | Defines evidence taxonomy, consent/redaction rules, tagging, confidence scoring, decision linkage, stale-review cadence, and repository ownership | Preview |
| [`support-workforce-planning-review`](./skills/support-workforce-planning-review/SKILL.md) | Forecasts volume by channel, severity, language, segment, issue type, arrival pattern, handle time, seasonality, and launch/incident drivers | Preview |
| [`data-warehouse-metrics-layer-review`](./skills/data-warehouse-metrics-layer-review/SKILL.md) | Defines canonical metric contracts with owner, formula, grain, dimensions, filters, timezone, identity, lineage, freshness SLA, tests, and access tier | Preview |
| [`localization-quality-program-review`](./skills/localization-quality-program-review/SKILL.md) | Scopes product UI, billing, cancellation, notifications, emails, help center, support macros, store listings, legal/privacy, marketing, and platform surfaces | Preview |
| [`compliance-audit-readiness-review`](./skills/compliance-audit-readiness-review/SKILL.md) | Defines audit scope, control matrix, evidence sources, owners, collection cadence, sample workflow, walkthrough prep, gap register, remediation SLA, and claim approval | Preview |
| [`sales-qualification-discovery-review`](./skills/sales-qualification-discovery-review/SKILL.md) | Defines ICP fit, pain, impact, urgency, buying committee, budget/process, technical fit, next commitment, disqualification reasons, and CRM hygiene | Preview |
| [`enterprise-expansion-health-review`](./skills/enterprise-expansion-health-review/SKILL.md) | Assesses adoption, value outcomes, support burden, incident history, relationship strength, renewal risk, product fit, whitespace, and procurement timing | Preview |
| [`usage-metering-accuracy-review`](./skills/usage-metering-accuracy-review/SKILL.md) | Defines billable unit, source event, identity, idempotency, rating rule, grain, quota/estimate/final invoice boundaries, and event-to-invoice lineage | Preview |
| [`ai-safety-red-team-review`](./skills/ai-safety-red-team-review/SKILL.md) | Defines assets at risk, attack classes, system surfaces, severity model, fixtures, mitigations, owners, release gates, telemetry, regression tests, and incident triggers | Preview |
| [`data-residency-region-review`](./skills/data-residency-region-review/SKILL.md) | Defines residency promise by data class, system, storage, processing, replication, backup, logs, analytics, support, AI providers, and subprocessors | Preview |
| [`privacy-impact-assessment-review`](./skills/privacy-impact-assessment-review/SKILL.md) | Maps data subjects, fields, sources, purposes, legal basis, retention, sharing, vendors, regions, security controls, and user controls | Preview |
| [`partner-channel-program-review`](./skills/partner-channel-program-review/SKILL.md) | Defines partner motion, qualification, tiers, obligations, incentives, lead registration, deal protection, certification, enablement, claims policy, support ownership, and governance | Preview |
| [`customer-training-academy-review`](./skills/customer-training-academy-review/SKILL.md) | Defines learner personas, jobs, role-based curricula, formats, labs/templates, assessments, certification, lifecycle triggers, localization, accessibility, content ownership, and release versioning | Preview |
| [`revenue-recognition-policy-review`](./skills/revenue-recognition-policy-review/SKILL.md) | Separates invoice, payment, entitlement, delivery, usage consumption, and revenue recognition records | Preview |
| [`legal-terms-policy-review`](./skills/legal-terms-policy-review/SKILL.md) | Maps product promises, restrictions, billing terms, renewals, cancellation, refunds, AI/data use, and marketplace rules to approved policy sources | Preview |
| [`product-analytics-instrumentation-review`](./skills/product-analytics-instrumentation-review/SKILL.md) | Defines decision questions, event contracts, properties, identity/session/account rules, source reliability, consent/privacy, QA fixtures, dashboard owners, and drift monitoring | Preview |
| [`customer-reference-program-review`](./skills/customer-reference-program-review/SKILL.md) | Defines proof needs, eligibility, consent scope, approval, segment matching, request intake, usage limits, incentives, refresh/retirement, and sales enablement workflow | Preview |
| [`incident-status-page-ops-review`](./skills/incident-status-page-ops-review/SKILL.md) | Defines component taxonomy, declaration thresholds, update cadence, templates, subscriber channels, approval paths, support coordination, SLO impact, maintenance, and post-incident follow-up | Preview |
| [`support-escalation-engineering-review`](./skills/support-escalation-engineering-review/SKILL.md) | Defines escalation classes, severity, evidence requirements, specialized paths, owners, triage cadence, workaround policy, customer update cadence, closure proof, and feedback loops | Preview |
| [`procurement-pricing-packaging-review`](./skills/procurement-pricing-packaging-review/SKILL.md) | Defines SKU/tier/entitlement/value metric, included limits, add-ons, minimums, commits, overages, services, discount rules, procurement proof, order/billing handoff, and renewal path | Preview |
| [`trial-conversion-sales-assist-review`](./skills/trial-conversion-sales-assist-review/SKILL.md) | Defines activation milestones, PQL scoring, firmographic fit, account identity, intent signals, routing rules, nudges, demo/CS handoff, trial extension policy, suppression, and experiment guardrails | Preview |
| [`account-based-marketing-review`](./skills/account-based-marketing-review/SKILL.md) | Defines target account selection, tiering, buying committee, intent/trigger signals, personalized offers, channel orchestration, sales handoff, suppression rules, and measurement | Preview |
| [`revops-crm-governance-review`](./skills/revops-crm-governance-review/SKILL.md) | Defines CRM object ownership, lifecycle stages, stage criteria, routing, required fields, attribution, permissions, integrations, reporting contracts, and change control | Preview |
| [`enterprise-security-exception-review`](./skills/enterprise-security-exception-review/SKILL.md) | Maps customer asks to controls, policies, product capabilities, data classes, contracts, evidence, compensating controls, owners, expiry, and remediation | Preview |
| [`admin-audit-log-review`](./skills/admin-audit-log-review/SKILL.md) | Defines privileged event coverage, event contract, actor/target/context, redaction, retention, tamper evidence, customer UI/API/SIEM export, alerting, and release-gate tests | Preview |
| [`data-lineage-impact-review`](./skills/data-lineage-impact-review/SKILL.md) | Maps source systems, events, tables, transformations, models, metrics, dashboards, exports, reverse ETL, AI datasets, owners, and consumers | Preview |
| [`customer-community-events-review`](./skills/customer-community-events-review/SKILL.md) | Defines event purpose, audience, format, agenda, moderation, accessibility/localization, consent, product/support owners, feedback capture, content reuse, follow-up, and metrics | Preview |
| [`marketplace-trust-safety-economics-review`](./skills/marketplace-trust-safety-economics-review/SKILL.md) | Models buyer/seller/platform incentives, quality gates, ranking/payout guardrails, disputes, refunds, enforcement ladder, appeals, and trust-health unit economics | Preview |
| [`product-led-sales-routing-review`](./skills/product-led-sales-routing-review/SKILL.md) | Defines product signals, PQL/PQA scoring, account matching, owner rules, routing thresholds, sales capacity, suppression, CRM sync, message playbooks, and outcome feedback | Preview |
| [`enterprise-contract-redlines-review`](./skills/enterprise-contract-redlines-review/SKILL.md) | Classifies redlines by clause type, risk, owner, standard fallback, required evidence, approval path, accepted obligation, and renewal review | Preview |
| [`customer-success-playbook-review`](./skills/customer-success-playbook-review/SKILL.md) | Defines lifecycle stage, segment, triggers, entry/exit criteria, touchpoints, assets, owners, escalations, and metrics for repeatable customer outcomes | Preview |
| [`sales-commission-incentive-review`](./skills/sales-commission-incentive-review/SKILL.md) | Defines commissionable event, source of truth, eligible roles, deal types, payout timing, quota credit, exception approval, disputes, clawbacks, and finance reconciliation | Preview |
| [`feature-request-prioritization-review`](./skills/feature-request-prioritization-review/SKILL.md) | Normalizes requests into jobs/problems, clusters duplicates, scores evidence quality, segment fit, impact, confidence, effort, risk, dependencies, and strategy fit | Preview |
| [`data-deletion-erasure-review`](./skills/data-deletion-erasure-review/SKILL.md) | Maps data subjects, systems, data classes, derived stores, exports, logs, backups, billing/legal records, subprocessors, and deletion methods | Preview |
| [`api-versioning-deprecation-review`](./skills/api-versioning-deprecation-review/SKILL.md) | Classifies additive, behavior, breaking schema, auth/rate-limit, webhook, SDK, deprecated field, endpoint sunset, and emergency security changes | Preview |
| [`marketplace-quality-scoring-review`](./skills/marketplace-quality-scoring-review/SKILL.md) | Defines quality dimensions, scoring inputs, thresholds, confidence, eligibility/ranking/badge actions, anti-gaming controls, explanations, appeals, fairness, and monitoring | Preview |
| [`customer-onboarding-migration-runbook-review`](./skills/customer-onboarding-migration-runbook-review/SKILL.md) | Defines source assessment, data mapping, transformations, dry run, validation, signoff, cutover, rollback, communication, training, support readiness, and adoption handoff | Preview |
| [`enterprise-plan-migration-review`](./skills/enterprise-plan-migration-review/SKILL.md) | Maps cohorts, contracts, entitlement deltas, billing objects, discounts, invoices, customer notices, support readiness, rollback, exception expiry, and renewal audit. | Preview |
| [`lifecycle-pricing-experiment-review`](./skills/lifecycle-pricing-experiment-review/SKILL.md) | Defines lifecycle stage, hypothesis, eligibility, variants, holdouts, billing QA, revenue quality metrics, margin/support guardrails, stop conditions, and rollout policy. | Preview |
| [`data-subject-request-ops-review`](./skills/data-subject-request-ops-review/SKILL.md) | Defines request type, jurisdiction, identity and authority checks, workspace scope, system inventory, exceptions, subprocessor workflow, SLA tracking, response package, and audit proof. | Preview |
| [`partner-support-enablement-review`](./skills/partner-support-enablement-review/SKILL.md) | Defines partner tiers, support scope, access model, runbooks, training, certification, escalation paths, customer handoffs, release updates, quality metrics, and revocation rules. | Preview |
| [`release-risk-exception-review`](./skills/release-risk-exception-review/SKILL.md) | Defines blocked gate, risk tier, affected surface, approver, compensating controls, feature flags, monitoring, customer impact, rollback trigger, expiry, remediation, and post-release review. | Preview |
| [`app-review-response-ops-review`](./skills/app-review-response-ops-review/SKILL.md) | Classifies store policy notices, maps evidence to product behavior, drafts reviewer responses, coordinates metadata/build fixes, appeal paths, release sequencing, support communication, and recurrence prevention. | Preview |
| [`security-changelog-disclosure-review`](./skills/security-changelog-disclosure-review/SKILL.md) | Defines security change type, severity, exploitability, affected scope, remediation status, customer action, approved wording, trust center updates, support macros, embargo handling, and monitoring. | Preview |
| [`marketplace-dispute-resolution-review`](./skills/marketplace-dispute-resolution-review/SKILL.md) | Defines dispute type, parties, evidence package, temporary holds, refund and payout rules, reviewer independence, appeals, fraud-signal protection, fairness metrics, and policy feedback loops. | Preview |
| [`enterprise-account-governance-review`](./skills/enterprise-account-governance-review/SKILL.md) | Defines tenant hierarchy, account ownership, delegated admins, SSO/SCIM, domains, billing owner, support access, audit events, data boundaries, break-glass controls, and access reviews. | Preview |
| [`sales-engineering-handoff-review`](./skills/sales-engineering-handoff-review/SKILL.md) | Defines discovery context, solution scope, POC success criteria, technical commitments, caveats, evidence, CRM handoff fields, owner map, kickoff readiness, and post-sale risks. | Preview |
| [`support-automation-governance-review`](./skills/support-automation-governance-review/SKILL.md) | Defines contact drivers, automation scope, source grounding, confidence thresholds, allowed actions, escalation triggers, human handoff, QA sampling, analytics, privacy checks, and rollback. | Preview |
| [`privacy-consent-preference-center-review`](./skills/privacy-consent-preference-center-review/SKILL.md) | Defines consent categories, legal basis, regional defaults, preference UI, proof events, revocation, downstream enforcement, sync SLAs, accessibility, localization, and audit evidence. | Preview |
| [`release-rollback-drill-review`](./skills/release-rollback-drill-review/SKILL.md) | Defines rollback scenario, release surface, trigger thresholds, owner roles, irreversible steps, data compatibility, drill environment, monitoring proof, customer communication, and runbook updates. | Preview |
| [`app-store-policy-change-monitoring-review`](./skills/app-store-policy-change-monitoring-review/SKILL.md) | Defines policy sources, effective dates, store differences, affected products, owner routing, remediation plan, evidence packages, privacy/payment/content impact, reviewer notes, and release timing. | Preview |
| [`marketplace-seller-performance-review`](./skills/marketplace-seller-performance-review/SKILL.md) | Defines seller categories, performance signals, quality thresholds, confidence, cold-start handling, interventions, ranking impact, payout holds, badges, warnings, appeals, and fairness monitoring. | Preview |
| [`partner-implementation-quality-review`](./skills/partner-implementation-quality-review/SKILL.md) | Defines partner scope, deliverables, quality gates, QA evidence, customer acceptance, migration/integration risks, support handoff, defect triage, scorecards, remediation, and certification rules. | Preview |
| [`enterprise-admin-permission-review`](./skills/enterprise-admin-permission-review/SKILL.md) | Defines privileged actions, RBAC/ABAC roles, custom role scope, SSO/SCIM mappings, approval gates, separation of duties, audit events, break-glass expiry, support access, and access reviews. | Preview |
| [`customer-escalation-war-room-review`](./skills/customer-escalation-war-room-review/SKILL.md) | Defines escalation severity, account impact, owner roles, decision/action logs, customer communication cadence, workaround tracking, executive visibility, de-escalation criteria, and learning review. | Preview |
| [`pricing-contract-exception-register-review`](./skills/pricing-contract-exception-register-review/SKILL.md) | Defines exception taxonomy, standard-policy deviation, approval owners, margin/revenue impact, contract clauses, billing and invoice mapping, expiry dates, renewal triggers, and cleanup backlog. | Preview |
| [`integration-sandbox-certification-review`](./skills/integration-sandbox-certification-review/SKILL.md) | Defines sandbox environment, synthetic data, OAuth scopes, API/webhook test cases, error handling, rate limits, security/privacy checks, certification evidence, production gates, badges, and recertification. | Preview |
| [`release-evidence-pack-review`](./skills/release-evidence-pack-review/SKILL.md) | Defines release scope, risk tier, evidence sources, proof links, owners, test/QA/security/privacy/accessibility/migration/performance evidence, rollout guardrails, rollback proof, support readiness, and approvals. | Preview |
| [`store-subscription-policy-compliance-review`](./skills/store-subscription-policy-compliance-review/SKILL.md) | Defines store product IDs, paywall disclosures, trial/intro offers, pricing periods, entitlement tests, receipt/server notifications, restore/cancel flows, refunds, grace periods, metadata alignment, reviewer evidence, and support macros. | Preview |
| [`marketplace-fraud-review-queue-review`](./skills/marketplace-fraud-review-queue-review/SKILL.md) | Defines fraud signals, queue priority, risk tiers, evidence packages, temporary actions, payout/refund/ATO/fake-review handling, reviewer QA, appeals, fairness metrics, and model/policy feedback. | Preview |
| [`partner-renewal-health-review`](./skills/partner-renewal-health-review/SKILL.md) | Defines partner type, renewal date, scorecard evidence, revenue/pipeline, customer outcomes, support burden, certification, compliance, disputes, contract terms, renewal decision, remediation, tier changes, and exit planning. | Preview |
| [`enterprise-role-lifecycle-review`](./skills/enterprise-role-lifecycle-review/SKILL.md) | Defines role taxonomy, IdP/SCIM source of truth, joiner-mover-leaver states, privileged access, break-glass, support overrides, stale access reviews, audit logs, and customer admin UX. | Preview |
| [`executive-business-review-operating-system-review`](./skills/executive-business-review-operating-system-review/SKILL.md) | Defines EBR/QBR account tiering, cadence, sponsor maps, value proof, adoption metrics, risk registers, roadmap ask routing, renewal/expansion signals, action owners, and follow-up rhythm. | Preview |
| [`contract-obligation-renewal-audit-review`](./skills/contract-obligation-renewal-audit-review/SKILL.md) | Defines contract source collection, obligation registers, notice windows, SLA/security/privacy/support/product commitments, pricing exceptions, evidence owners, remediation, and renewal negotiation handoff. | Preview |
| [`developer-sandbox-abuse-prevention-review`](./skills/developer-sandbox-abuse-prevention-review/SKILL.md) | Defines sandbox isolation, synthetic data, API/token quotas, risky capability gates, graduated trust, abuse signals, review queues, appeals, developer messaging, and production promotion gates. | Preview |
| [`release-readiness-exception-board-review`](./skills/release-readiness-exception-board-review/SKILL.md) | Defines release exception intake, unmet gates, evidence gaps, risk acceptance, approval authority, mitigations, rollout limits, rollback triggers, monitoring, support communication, expiry, and post-release review. | Preview |
| [`store-price-change-communication-review`](./skills/store-price-change-communication-review/SKILL.md) | Defines affected products, cohorts, regions, channel rules, consent/notice timing, price-change copy, paywall/store metadata alignment, support macros, refund/cancel routes, analytics, and churn monitoring. | Preview |
| [`marketplace-risk-model-calibration-review`](./skills/marketplace-risk-model-calibration-review/SKILL.md) | Defines marketplace risk actions, label sources, ground truth, thresholds, review queues, appeals, fairness checks, drift monitoring, reviewer QA, policy feedback, and safe risk-model rollout. | Preview |
| [`partner-incentive-payout-governance-review`](./skills/partner-incentive-payout-governance-review/SKILL.md) | Defines partner incentive objectives, eligibility, attribution, payout formulas, approvals, evidence, quality gates, tax/invoice requirements, clawbacks, disputes, fraud controls, communication, and ROI review. | Preview |
| [`admin-delegation-boundary-review`](./skills/admin-delegation-boundary-review/SKILL.md) | Defines delegated admin scopes, tenant hierarchy, inherited access, sensitive-action gates, approval chains, support impersonation, break-glass, audit logs, drift review, and customer-visible controls. | Preview |
| [`board-metrics-operating-review`](./skills/board-metrics-operating-review/SKILL.md) | Defines board metric dictionaries, source systems, reconciliation boundaries, owner signoff, cohort/segment cuts, variance narratives, forecast bridges, board asks, and action follow-up. | Preview |
| [`contract-amendment-approval-review`](./skills/contract-amendment-approval-review/SKILL.md) | Defines amendment scope, clause risks, approval authority, pricing/SLA/DPA/security/support/product impacts, obligation-register updates, billing/provisioning mapping, verification, and renewal effects. | Preview |
| [`developer-quota-credit-abuse-review`](./skills/developer-quota-credit-abuse-review/SKILL.md) | Defines developer quota units, credit ledgers, trust tiers, costly operation gates, abuse signals, throttles, review queues, appeals, upgrade paths, cost guardrails, and activation metrics. | Preview |
| [`release-freeze-change-control-review`](./skills/release-freeze-change-control-review/SKILL.md) | Defines release-freeze scope, protected systems, allowed change classes, severity ladder, approval matrix, rollback/monitoring evidence, communication, exception registers, and post-freeze review. | Preview |
| [`subscription-price-increase-retention-review`](./skills/subscription-price-increase-retention-review/SKILL.md) | Defines subscription price-increase cohorts, billing-channel rules, value narrative, notices, grandfathering, save offers, cancellation recovery, support/refund paths, and net-revenue/churn monitoring. | Preview |
| [`marketplace-policy-model-feedback-loop-review`](./skills/marketplace-policy-model-feedback-loop-review/SKILL.md) | Defines marketplace policy taxonomy, model-signal mapping, reviewer labels, appeals/disputes feedback, drift monitoring, retraining criteria, release gates, explanation boundaries, and health guardrails. | Preview |
| [`partner-spiff-dispute-resolution-review`](./skills/partner-spiff-dispute-resolution-review/SKILL.md) | Defines SPIF dispute intake, eligibility, attribution source order, evidence packets, payout recalculation, approval authority, partner communication, appeals, clawbacks, fraud escalation, and program learning loops. | Preview |
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

## Behavioral benchmark

Installability is not the same as usefulness. The repository now includes a paired baseline-vs-skill
benchmark framework in [`benchmarks/skill-behavior/`](./benchmarks/skill-behavior/), an optional
OpenAI Responses API runner, and the methodology in
[`docs/skill-benchmark-methodology.md`](./docs/skill-benchmark-methodology.md).

Current public status: skills are schema-validated, install-verified, and the current benchmark evidence
across `core-product-v0` plus `hard-product-v0` supports the repository-level **SOTA candidate** tier:
25 current task samples, +1.24 average skill uplift, 100.0% skill win rate, 100.0% non-regression rate,
0.0% negative-control over-trigger rate, positive confidence interval, and passing shared-task multi-model
overlap. The current suite also reports answer token/latency overhead so quality gains can be weighed
against added context cost. See the
[`current-suite-20260701` summary](./benchmarks/skill-behavior/results/current-suite-20260701-summary.md).
This is still a bounded benchmark claim, not an unqualified claim that every individual skill is SOTA in
every downstream product context.

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
