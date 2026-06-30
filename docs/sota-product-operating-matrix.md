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

- 59 preview skills are live in `skills/`, each with `SKILL.md`, at least one reference, `agents/openai.yaml`, eval, behavior example, registry entry, and catalog page.
- The latest strategy/workflow/UI/marketplace-eval batch covers: `decision-memo-writer`, `opportunity-scoring-review`, `agentic-workflow-designer`, `design-system-extractor`, `form-ux-review`, `launch-narrative-review`, `creator-onboarding-review`, and `skill-eval-designer`.
- Earlier depth covers usage pricing, marketplace payouts, Microsoft Store, store review risk, live events, retention cohorts, referrals, accessibility, checkout, ads, daily rewards, Steam, developer tools, marketplace ops, macOS, Windows, payments, refunds, subscriptions, UI craft, launch, privacy, support, analytics, and incidents.

## Master lifecycle matrix

| Lifecycle area | What agents must know | Current skill coverage | Next depth target |
| --- | --- | --- | --- |
| Strategy and wedge | Audience, pain, timing, differentiation, business model, proof target, decision quality. | `product-lifecycle-architect`, `execution-simplification`, `market-research-synthesis`, `decision-memo-writer`, `opportunity-scoring-review` | enterprise readiness and sales demo scripts |
| Agentic execution | Autonomy levels, tool boundaries, gates, evidence, evals, handoffs. | `agentic-workflow-designer`, `skill-eval-designer`, `skill-marketplace-creator` | catalog generation and scoring automation |
| Product architecture | Core loop, onboarding, accounts, billing, settings, support, data, trust. | `product-lifecycle-architect`, `mobile-app-product-systems`, `onboarding-activation-review` | customer success health |
| UI craft/accessibility | UI detail, responsive behavior, design system, forms, accessibility, states. | `interface-craft`, `mobile-first-ui-review`, `motion-transition-review`, `responsive-layout-review`, `accessibility-product-review`, `design-system-extractor`, `form-ux-review`, `empty-state-and-loading-review` | advanced component demos |
| Pricing and commerce | SaaS, usage, checkout, payments, payouts, entitlements, refunds. | `saas-subscription-pricing`, `usage-based-pricing-review`, `pricing-page-critique`, `checkout-conversion-review`, `payment-platform-readiness`, `marketplace-payouts-review` | billing calculators and reconciliation scripts |
| Growth and launch | Positioning, SEO, launch narrative, referrals, promotions, notifications. | `landing-page-critique`, `product-positioning`, `seo-content-brief`, `launch-narrative-review`, `referral-loop-review`, `promotion-campaign-review` | win-back campaign review |
| Retention and live ops | Cohorts, lifecycle events, live events, rewards, notifications, fatigue, economy impact. | `retention-cohort-review`, `live-event-ops-review`, `notification-strategy-review`, `daily-reward-and-streak-review` | lifecycle dashboard examples |
| Distribution | App Store, Google Play, Steam, Microsoft Store, web/direct download, review policy. | `app-store-distribution-readiness`, `store-listing-optimization`, `steam-launch-readiness`, `microsoft-store-readiness`, `store-review-policy-risk`, `launch-readiness-review` | release health dashboards |
| Developer and marketplace | Developer onboarding, creator onboarding, submissions, review, ranking, payouts, skill evals. | `developer-tool-product-design`, `creator-onboarding-review`, `marketplace-product-ops`, `marketplace-payouts-review`, `skill-eval-designer` | moderation trust review |
| Operations/support/trust | Backup, incidents, analytics, help center, privacy, abuse, support, accessibility. | `backup-restore-design`, `incident-communication-playbook`, `analytics-event-taxonomy`, `help-center-architecture`, `privacy-and-data-retention-review`, `abuse-fraud-risk-review`, `customer-support-operations`, `accessibility-product-review` | data portability and customer success health |

## Remaining high-value gaps

- `skill-catalog-generator`
- `moderation-trust-review`
- `winback-campaign-review`
- `customer-success-health-review`
- `sales-demo-script-review`
- `enterprise-readiness-review`
- `data-export-portability-review`
- `release-health-dashboard-review`

## Execution cadence

- Add useful skills in batches, but require eval coverage, behavior examples, and matrix placement for every skill.
- Deepen each skill with one reference file per hard domain before adding sprawling prose.
- Promote skills from preview only after forward-tests and public before/after demos.
- Weekly: pick one high-demand skill, add a state machine, decision table, event schema, and public demo.
- Monthly: refresh external directory status and issue #1 until at least two third-party directories list the repo.
