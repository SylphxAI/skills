# Product Skill Roadmap Matrix

Sylphx Skills is a public product-operating knowledge matrix for agents. It helps an agent build, launch, monetize, support, and improve products across mobile apps, games, web apps, SaaS, desktop software, utilities, developer tools, marketplaces, and community products.

The repository now contains **67 preview skills with eval coverage**. The current expansion closes the next commercial-operating layer of the roadmap: enterprise readiness, buyer-specific sales demos, catalog automation, marketplace moderation, win-back campaigns, customer health, data portability, and release health dashboards.

See [`sota-product-operating-matrix.md`](./sota-product-operating-matrix.md) for the lifecycle/product/channel matrix. See [`skill-factory-automation.md`](./skill-factory-automation.md) for the automation loop that turns market knowledge into original Sylphx skills.

## North-star quality

Every cell in the matrix should eventually have a dedicated or shared skill, state machines where state matters, decision tables where tradeoffs matter, event schemas where measurement matters, support/failure handling, platform caveats, positive and negative eval prompts, and public demos.

## Product lifecycle matrix

| Lifecycle | Questions the skill must answer | Core skills | Priority |
| --- | --- | --- | --- |
| Strategy and planning | Who is it for? Why now? What is the wedge? What is the decision? | `product-lifecycle-architect`, `market-research-synthesis`, `execution-simplification`, `decision-memo-writer`, `opportunity-scoring-review`, `enterprise-readiness-review`, `sales-demo-script-review` | P0 |
| Agentic execution | How should AI agents do repeatable work safely and observably? | `agentic-workflow-designer`, `skill-eval-designer`, `skill-marketplace-creator`, `skill-catalog-generator` | P0 |
| Product design | What systems must exist: onboarding, payment, support, notifications, data, trust? | `product-lifecycle-architect`, `mobile-app-product-systems`, `onboarding-activation-review`, `subscription-entitlement-review`, `customer-success-health-review`, `data-export-portability-review` | P0 |
| UI and interaction | How should the product feel: modern, fast, subtle, responsive, accessible, resilient? | `interface-craft`, `mobile-first-ui-review`, `motion-transition-review`, `responsive-layout-review`, `accessibility-product-review`, `design-system-extractor`, `form-ux-review`, `empty-state-and-loading-review` | P0 |
| Monetization | SaaS pricing, usage pricing, subscriptions, IAP, IAA, payouts, trials, refunds, checkout, expansion. | `saas-subscription-pricing`, `usage-based-pricing-review`, `pricing-page-critique`, `checkout-conversion-review`, `marketplace-payouts-review`, `subscription-entitlement-review`, `refund-and-support-flow-review`, `payment-platform-readiness`, `ad-monetization-review` | P0 |
| Distribution and narrative | App stores, Steam, Microsoft Store, web, review policy, launch story, release notes. | `app-store-distribution-readiness`, `store-listing-optimization`, `launch-readiness-review`, `release-health-dashboard-review`, `launch-narrative-review`, `steam-launch-readiness`, `microsoft-store-readiness`, `store-review-policy-risk`, `changelog-and-release-notes` | P0 |
| Growth and retention | Offers, referrals, lifecycle messaging, live events, cohorts, SEO. | `startup-growth-review`, `landing-page-critique`, `product-positioning`, `seo-content-brief`, `promotion-campaign-review`, `winback-campaign-review`, `referral-loop-review`, `retention-cohort-review`, `live-event-ops-review`, `notification-strategy-review` | P0 |
| Developer/community products | API/SDK/CLI adoption, marketplace supply quality, creator onboarding, payouts, ranking, disputes. | `developer-tool-product-design`, `marketplace-product-ops`, `moderation-trust-review`, `creator-onboarding-review`, `marketplace-payouts-review`, `skill-marketplace-creator`, `skill-catalog-generator` | P0 |
| Trust and support | Accessibility, privacy, store review, abuse, data retention, incidents, help centers, support. | `accessibility-product-review`, `privacy-and-data-retention-review`, `data-export-portability-review`, `store-review-policy-risk`, `abuse-fraud-risk-review`, `moderation-trust-review`, `customer-support-operations`, `customer-success-health-review`, `help-center-architecture`, `incident-communication-playbook` | P0 |

## Product type coverage matrix

| Product type | Must cover | First skills |
| --- | --- | --- |
| Mobile app | onboarding, permissions, subscriptions, IAP, IAA, forms, accessibility, referrals, app-store review | `mobile-app-product-systems`, `form-ux-review`, `accessibility-product-review`, `checkout-conversion-review`, `referral-loop-review`, `app-store-distribution-readiness` |
| Mobile game | economy, rewarded ads, daily rewards, live events, cohorts, referrals, support | `game-economy-review`, `ad-monetization-review`, `daily-reward-and-streak-review`, `live-event-ops-review`, `retention-cohort-review` |
| SaaS | pricing, usage pricing, checkout, decisions, opportunity scoring, forms, retention, support | `saas-subscription-pricing`, `usage-based-pricing-review`, `decision-memo-writer`, `opportunity-scoring-review`, `form-ux-review`, `retention-cohort-review`, `customer-success-health-review`, `enterprise-readiness-review` |
| Web app | responsive UI, design system, accessibility, SEO/landing, checkout, forms, support | `interface-craft`, `design-system-extractor`, `responsive-layout-review`, `accessibility-product-review`, `form-ux-review`, `landing-page-critique` |
| Desktop utility | OS integration, store/direct distribution, auto-update, backup, permissions, local data | `desktop-os-integration`, `macos-release-readiness`, `windows-release-readiness`, `microsoft-store-readiness` |
| Developer tool | docs, onboarding, CLI/API, SDKs, usage pricing, skill evals, changelog, support | `developer-tool-product-design`, `usage-based-pricing-review`, `skill-eval-designer`, `skill-catalog-generator`, `sales-demo-script-review`, `help-center-architecture` |
| Marketplace/community | creator onboarding, submissions, ranking, trust, payouts, disputes, moderation, growth | `creator-onboarding-review`, `marketplace-product-ops`, `moderation-trust-review`, `marketplace-payouts-review`, `referral-loop-review` |
| PC game | Steam, Microsoft Store if relevant, wishlist, demo, live events, community, reviews, patch ops | `steam-launch-readiness`, `microsoft-store-readiness`, `release-health-dashboard-review`, `live-event-ops-review`, `game-economy-review` |

## Remaining high-value gaps

- `experiment-design-review`
- `app-permission-ux-review`
- `localization-market-expansion-review`
- `admin-settings-ia-review`
- `security-questionnaire-response-review`
- `billing-reconciliation-review`
- `game-soft-launch-review`
- `community-launch-ops-review`

## Definition of SOTA coverage

A category is SOTA-covered only when an agent can produce a concrete, product-safe artifact without generic filler: a state machine, decision table, launch checklist, event schema, support flow, risk ladder, or implementation-ready review. If a skill cannot change a real product decision, it is not done.
