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

- 107 preview skills are live in `skills/`, each with `SKILL.md`, at least one reference, `agents/openai.yaml`, eval, behavior example, registry entry, and catalog page.
- The latest operating-depth batch covers: `trust-center-readiness-review`, `service-level-slo-review`, `procurement-security-review`, `customer-advisory-board-review`, `ai-eval-regression-ops-review`, `platform-certification-program-review`, `revenue-forecast-capacity-review`, and `community-governance-review`.
- Earlier depth covers data quality observability, search/discovery relevance, SDK onboarding, release trains, risk governance, content-policy appeals, support deflection, partner co-marketing, data import/migration, account recovery, API quotas, offline sync, feedback intake, feature sunset, brand trust, unit economics, feature flags, partner ecosystems, tax/invoicing, user preferences, support QA, in-product education, AI feature risk, creator ranking quality, usage pricing, marketplace payouts, Microsoft Store, store review risk, live events, retention cohorts, referrals, accessibility, checkout, ads, daily rewards, Steam, developer tools, marketplace ops, macOS, Windows, payments, refunds, subscriptions, UI craft, launch, privacy, support, analytics, and incidents.

## Master lifecycle matrix

| Lifecycle area | What agents must know | Current skill coverage | Next depth target |
| --- | --- | --- | --- |
| Strategy and wedge | Audience, pain, timing, differentiation, business model, proof target, decision quality, risk governance. | `product-lifecycle-architect`, `execution-simplification`, `market-research-synthesis`, `decision-memo-writer`, `opportunity-scoring-review`, `experiment-design-review`, `ai-feature-product-risk-review`, `customer-feedback-intake-review`, `cost-margin-unit-economics-review`, `risk-register-governance-review`, `customer-advisory-board-review`, `revenue-forecast-capacity-review`, `enterprise-readiness-review`, `sales-demo-script-review` | compliance evidence and partner risk due diligence |
| Agentic execution | Autonomy levels, tool boundaries, gates, evidence, evals, handoffs. | `agentic-workflow-designer`, `skill-eval-designer`, `skill-marketplace-creator`, `skill-catalog-generator` | scoring automation scripts and cross-repo catalog sync |
| Product architecture | Core loop, onboarding, accounts, billing, settings, support, data, trust. | `product-lifecycle-architect`, `mobile-app-product-systems`, `onboarding-activation-review`, `admin-settings-ia-review`, `user-preferences-settings-review`, `account-recovery-identity-review`, `data-import-migration-review`, `data-quality-observability-review`, `service-level-slo-review`, `offline-sync-conflict-review`, `customer-feedback-intake-review`, `customer-success-health-review`, `data-export-portability-review`, `ai-feature-product-risk-review` | data governance access and compliance evidence room |
| UI craft/accessibility | UI detail, responsive behavior, design system, forms, accessibility, states. | `interface-craft`, `mobile-first-ui-review`, `motion-transition-review`, `responsive-layout-review`, `accessibility-product-review`, `design-system-extractor`, `form-ux-review`, `app-permission-ux-review`, `admin-settings-ia-review`, `user-preferences-settings-review`, `in-product-education-review`, `empty-state-and-loading-review` | advanced component demos |
| Pricing and commerce | SaaS, usage, checkout, payments, payouts, entitlements, refunds. | `saas-subscription-pricing`, `usage-based-pricing-review`, `cost-margin-unit-economics-review`, `pricing-page-critique`, `checkout-conversion-review`, `payment-platform-readiness`, `marketplace-payouts-review`, `billing-reconciliation-review`, `tax-invoicing-compliance-review` | reconciliation scripts and margin dashboards |
| Growth and launch | Positioning, SEO, launch narrative, referrals, promotions, notifications. | `landing-page-critique`, `product-positioning`, `brand-trust-review`, `partner-co-marketing-launch-review`, `customer-advisory-board-review`, `seo-content-brief`, `launch-narrative-review`, `referral-loop-review`, `promotion-campaign-review`, `winback-campaign-review`, `localization-market-expansion-review`, `experiment-design-review`, `in-product-education-review`, `sales-demo-script-review` | lifecycle email and partner due diligence depth |
| Retention and live ops | Cohorts, lifecycle events, live events, rewards, notifications, fatigue, economy impact. | `retention-cohort-review`, `live-event-ops-review`, `notification-strategy-review`, `daily-reward-and-streak-review`, `winback-campaign-review`, `experiment-design-review`, `feature-flag-rollout-review`, `feature-sunset-deprecation-review`, `release-train-change-management-review`, `service-level-slo-review`, `game-soft-launch-review`, `customer-success-health-review` | reliability incident learning and observability cost governance |
| Distribution | App Store, Google Play, Steam, Microsoft Store, web/direct download, review policy. | `app-store-distribution-readiness`, `store-listing-optimization`, `steam-launch-readiness`, `microsoft-store-readiness`, `store-review-policy-risk`, `launch-readiness-review`, `release-health-dashboard-review`, `feature-flag-rollout-review`, `feature-sunset-deprecation-review`, `release-train-change-management-review`, `service-level-slo-review`, `offline-sync-conflict-review`, `app-permission-ux-review`, `localization-market-expansion-review`, `game-soft-launch-review` | platform certification program and compliance evidence room |
| Developer and marketplace | Developer onboarding, creator onboarding, submissions, review, ranking, payouts, skill evals. | `developer-tool-product-design`, `api-rate-limit-quota-review`, `sdk-onboarding-integration-review`, `data-import-migration-review`, `search-discovery-relevance-review`, `platform-certification-program-review`, `community-governance-review`, `creator-onboarding-review`, `marketplace-product-ops`, `marketplace-payouts-review`, `moderation-trust-review`, `community-launch-ops-review`, `partner-integration-ecosystem-review`, `creator-ranking-quality-review`, `skill-eval-designer`, `ai-eval-regression-ops-review`, `skill-catalog-generator` | experimentation platform governance and AI eval regression automation |
| Operations/support/trust | Backup, incidents, analytics, help center, privacy, abuse, support, accessibility. | `backup-restore-design`, `incident-communication-playbook`, `analytics-event-taxonomy`, `help-center-architecture`, `privacy-and-data-retention-review`, `data-export-portability-review`, `data-import-migration-review`, `data-quality-observability-review`, `account-recovery-identity-review`, `customer-feedback-intake-review`, `support-deflection-knowledge-base-review`, `content-policy-appeals-review`, `trust-center-readiness-review`, `procurement-security-review`, `brand-trust-review`, `security-questionnaire-response-review`, `abuse-fraud-risk-review`, `moderation-trust-review`, `customer-support-operations`, `support-quality-qa-review`, `customer-success-health-review`, `accessibility-product-review` | accessibility conformance and data governance access |

## Remaining high-value gaps

- `compliance-evidence-room-review`
- `reliability-incident-learning-review`
- `lifecycle-email-system-review`
- `partner-risk-due-diligence-review`
- `data-governance-access-review`
- `experimentation-platform-governance-review`
- `observability-cost-governance-review`
- `accessibility-conformance-program-review`

## Execution cadence

- Add useful skills in batches, but require eval coverage, behavior examples, and matrix placement for every skill.
- Deepen each skill with one reference file per hard domain before adding sprawling prose.
- Promote skills from preview only after forward-tests and public before/after demos.
- Weekly: pick one high-demand skill, add a state machine, decision table, event schema, and public demo.
- Monthly: refresh external directory status and issue #1 until at least two third-party directories list the repo.
