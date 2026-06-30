# SOTA Product Operating Matrix

Sylphx Skills is designed to become a public, eval-backed knowledge matrix for building better products with AI agents. The repository should help an agent reason through a product from idea to market: research, planning, UI, product systems, monetization, distribution, OS/platform integration, operations, promotion, customer support, and iteration.

The ambition is not to collect prompt snippets. The ambition is to encode the operating knowledge that strong product teams repeatedly use, in a form that agents can load and apply.

## North-star standard

Each important product cell should eventually have:

1. a skill with a clear trigger;
2. a concise `SKILL.md` workflow;
3. deep references with rule IDs, state machines, decision tables, event schemas, edge cases, and support paths;
4. eval prompts that prove the skill triggers correctly and improves output;
5. marketplace metadata and installability;
6. evidence of real-world usefulness: examples, demos, before/after outputs, or adoption.

## Current coverage proof

- 139 preview skills are live in `skills/`, each with `SKILL.md`, at least one reference, `agents/openai.yaml`, eval, behavior example, registry entry, and catalog page.
- The latest operating-depth batch covers: `compliance-evidence-room-review`, `reliability-incident-learning-review`, `lifecycle-email-system-review`, `partner-risk-due-diligence-review`, `data-governance-access-review`, `experimentation-platform-governance-review`, `observability-cost-governance-review`, and `accessibility-conformance-program-review`.
- Earlier depth covers trust centers, SLOs, procurement security, customer advisory boards, AI eval regression ops, certification programs, revenue forecasting, community governance, data quality observability, search/discovery relevance, SDK onboarding, release trains, risk governance, content-policy appeals, support deflection, partner co-marketing, data import/migration, account recovery, API quotas, offline sync, feedback intake, feature sunset, brand trust, unit economics, feature flags, partner ecosystems, tax/invoicing, user preferences, support QA, in-product education, AI feature risk, creator ranking quality, usage pricing, marketplace payouts, Microsoft Store, store review risk, live events, retention cohorts, referrals, accessibility, checkout, ads, daily rewards, Steam, developer tools, marketplace ops, macOS, Windows, payments, refunds, subscriptions, UI craft, launch, privacy, support, analytics, and incidents.

## Master lifecycle matrix

| Lifecycle area | What agents must know | Current skill coverage | Next depth target |
| --- | --- | --- | --- |
| Strategy and wedge | Audience, pain, timing, differentiation, business model, proof target, decision quality, risk governance. | `product-lifecycle-architect`, `execution-simplification`, `market-research-synthesis`, `decision-memo-writer`, `opportunity-scoring-review`, `experiment-design-review`, `ai-feature-product-risk-review`, `customer-feedback-intake-review`, `cost-margin-unit-economics-review`, `risk-register-governance-review`, `customer-advisory-board-review`, `revenue-forecast-capacity-review`, `experimentation-platform-governance-review`, `enterprise-readiness-review`, `sales-demo-script-review` | contract lifecycle and enterprise implementation depth |
| Agentic execution | Autonomy levels, tool boundaries, gates, evidence, evals, handoffs. | `agentic-workflow-designer`, `skill-eval-designer`, `skill-marketplace-creator`, `skill-catalog-generator` | scoring automation scripts and cross-repo catalog sync |
| Product architecture | Core loop, onboarding, accounts, billing, settings, support, data, trust. | `product-lifecycle-architect`, `mobile-app-product-systems`, `onboarding-activation-review`, `admin-settings-ia-review`, `user-preferences-settings-review`, `account-recovery-identity-review`, `data-import-migration-review`, `data-quality-observability-review`, `service-level-slo-review`, `offline-sync-conflict-review`, `customer-feedback-intake-review`, `customer-success-health-review`, `data-export-portability-review`, `ai-feature-product-risk-review` | enterprise onboarding and data warehouse metrics layer |
| UI craft/accessibility | UI detail, responsive behavior, design system, forms, accessibility, states. | `interface-craft`, `mobile-first-ui-review`, `motion-transition-review`, `responsive-layout-review`, `accessibility-product-review`, `accessibility-conformance-program-review`, `design-system-extractor`, `form-ux-review`, `app-permission-ux-review`, `admin-settings-ia-review`, `user-preferences-settings-review`, `in-product-education-review`, `empty-state-and-loading-review` | advanced component demos |
| Pricing and commerce | SaaS, usage, checkout, payments, payouts, entitlements, refunds, renewals. | `saas-subscription-pricing`, `usage-based-pricing-review`, `cost-margin-unit-economics-review`, `observability-cost-governance-review`, `contract-lifecycle-renewal-review`, `pricing-page-critique`, `checkout-conversion-review`, `payment-platform-readiness`, `marketplace-payouts-review`, `billing-reconciliation-review`, `tax-invoicing-compliance-review`, `usage-metering-accuracy-review`, `revenue-recognition-policy-review`, `procurement-pricing-packaging-review` | revenue assurance and discount governance automation |
| Growth and launch | Positioning, SEO, launch narrative, referrals, promotions, notifications, localization quality. | `landing-page-critique`, `product-positioning`, `brand-trust-review`, `partner-co-marketing-launch-review`, `lifecycle-email-system-review`, `customer-advisory-board-review`, `seo-content-brief`, `launch-narrative-review`, `referral-loop-review`, `promotion-campaign-review`, `winback-campaign-review`, `localization-market-expansion-review`, `localization-quality-program-review`, `experiment-design-review`, `in-product-education-review`, `sales-demo-script-review`, `partner-channel-program-review`, `customer-reference-program-review`, `trial-conversion-sales-assist-review`, `customer-training-academy-review` | account-based marketing and community event loops |
| Retention and live ops | Cohorts, lifecycle events, live events, rewards, notifications, fatigue, economy impact, renewal readiness. | `retention-cohort-review`, `live-event-ops-review`, `notification-strategy-review`, `daily-reward-and-streak-review`, `winback-campaign-review`, `contract-lifecycle-renewal-review`, `experiment-design-review`, `feature-flag-rollout-review`, `feature-sunset-deprecation-review`, `release-train-change-management-review`, `service-level-slo-review`, `reliability-incident-learning-review`, `game-soft-launch-review`, `customer-success-health-review`, `enterprise-expansion-health-review` | churn-prevention playbooks and expansion forecasting |
| Distribution | App Store, Google Play, Steam, Microsoft Store, web/direct download, review policy. | `app-store-distribution-readiness`, `store-listing-optimization`, `steam-launch-readiness`, `microsoft-store-readiness`, `store-review-policy-risk`, `launch-readiness-review`, `release-health-dashboard-review`, `feature-flag-rollout-review`, `feature-sunset-deprecation-review`, `release-train-change-management-review`, `service-level-slo-review`, `reliability-incident-learning-review`, `incident-status-page-ops-review`, `offline-sync-conflict-review`, `app-permission-ux-review`, `localization-market-expansion-review`, `game-soft-launch-review` | compliance audit readiness and release evidence |
| Developer and marketplace | Developer onboarding, creator onboarding, submissions, review, ranking, payouts, skill evals. | `developer-tool-product-design`, `api-rate-limit-quota-review`, `sdk-onboarding-integration-review`, `data-import-migration-review`, `search-discovery-relevance-review`, `platform-certification-program-review`, `community-governance-review`, `creator-onboarding-review`, `marketplace-product-ops`, `marketplace-payouts-review`, `moderation-trust-review`, `community-launch-ops-review`, `partner-integration-ecosystem-review`, `partner-risk-due-diligence-review`, `creator-ranking-quality-review`, `skill-eval-designer`, `ai-eval-regression-ops-review`, `skill-catalog-generator`, `enterprise-onboarding-implementation-review`, `model-router-cost-quality-review`, `partner-channel-program-review`, `customer-training-academy-review` | developer certification evidence and partner marketplace QA |
| Operations/support/trust | Backup, incidents, analytics, help center, privacy, abuse, support, accessibility, audit readiness. | `backup-restore-design`, `incident-communication-playbook`, `analytics-event-taxonomy`, `data-warehouse-metrics-layer-review`, `data-residency-region-review`, `privacy-impact-assessment-review`, `legal-terms-policy-review`, `support-escalation-engineering-review`, `help-center-architecture`, `privacy-and-data-retention-review`, `data-export-portability-review`, `data-import-migration-review`, `data-quality-observability-review`, `data-governance-access-review`, `account-recovery-identity-review`, `customer-feedback-intake-review`, `support-deflection-knowledge-base-review`, `content-policy-appeals-review`, `trust-center-readiness-review`, `compliance-evidence-room-review`, `compliance-audit-readiness-review`, `procurement-security-review`, `brand-trust-review`, `security-questionnaire-response-review`, `abuse-fraud-risk-review`, `moderation-trust-review`, `customer-support-operations`, `support-quality-qa-review`, `support-workforce-planning-review`, `customer-training-academy-review`, `customer-success-health-review`, `accessibility-product-review` | continuous-control automation, security exceptions, and admin audit logs |

## Remaining high-value gaps

- `account-based-marketing-review`
- `revops-crm-governance-review`
- `enterprise-security-exception-review`
- `admin-audit-log-review`
- `data-lineage-impact-review`
- `customer-community-events-review`
- `marketplace-trust-safety-economics-review`
- `product-led-sales-routing-review`

## Execution cadence

- Add useful skills in batches, but require eval coverage, behavior examples, and matrix placement for every skill.
- Deepen each skill with one reference file per hard domain before adding sprawling prose.
- Promote skills from preview only after forward-tests and public before/after demos.
- Weekly: pick one high-demand skill, add a state machine, decision table, event schema, and public demo.
- Monthly: refresh external directory status and issue #1 until at least two third-party directories list the repo.
