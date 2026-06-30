# Product Skill Roadmap Matrix

Sylphx Skills should become a repository for building better products end-to-end: planning, research, design, implementation, distribution, operations, promotion, customer support, and long-term monetization.

The repository must cover common product forms:

- mobile apps;
- games;
- web apps;
- SaaS products;
- desktop software;
- utilities;
- developer tools;
- content/community products;
- commerce products.


## Current coverage snapshot

The repository now contains 35 preview skills with eval coverage. The first expansions deliberately fill the highest-demand product matrix cells: mobile-first UI, motion, responsive layout, empty/loading states, landing pages, pricing pages, product positioning, SEO, promotions, subscriptions/entitlements, refunds/support, onboarding activation, notifications, payments, desktop OS integration, store listings, launch readiness, release notes, game economy, privacy/data retention, abuse/fraud, incident communications, analytics taxonomy, help center architecture, and execution simplification.

See [`sota-product-operating-matrix.md`](./sota-product-operating-matrix.md) for the full lifecycle/product/channel matrix and the first 60-skill destination map. See [`skill-factory-automation.md`](./skill-factory-automation.md) for the automation loop that turns market knowledge into original Sylphx skills.

## North-star quality

Every cell in the matrix should eventually have:

1. a dedicated or shared skill;
2. state machines where state matters;
3. decision tables where tradeoffs matter;
4. event schemas where measurement matters;
5. support and failure handling;
6. platform/channel caveats;
7. positive and negative eval prompts.

## Product lifecycle matrix

| Lifecycle | Questions the skill must answer | Core skills | Priority |
| --- | --- | --- | --- |
| Strategy and planning | Who is it for? Why now? What is the wedge? What is the business model? | `product-lifecycle-architect`, `market-research-synthesis` | P0 |
| Market research | What do competitors, stores, reviews, pricing pages, and user complaints reveal? | `market-research-synthesis` | P0 |
| Product design | What systems must exist: onboarding, payment, support, notifications, data, trust? | `product-lifecycle-architect`, `mobile-app-product-systems`, `onboarding-activation-review`, `subscription-entitlement-review` | P0 |
| UI and interaction | How should the product feel: modern, fast, subtle, responsive, accessible, resilient? | `interface-craft`, `mobile-first-ui-review`, `motion-transition-review`, `responsive-layout-review`, `empty-state-and-loading-review` | P0 |
| Monetization | SaaS pricing, subscriptions, IAP, IAA, paid apps, trials, refunds, expansion. | `saas-subscription-pricing`, `pricing-page-critique`, `subscription-entitlement-review`, `refund-and-support-flow-review`, `payment-platform-readiness`, `mobile-app-product-systems` | P0 |
| Distribution | App Store, Google Play, Steam, Microsoft Store, web, direct download. | `app-store-distribution-readiness`, `store-listing-optimization`, `launch-readiness-review`, `changelog-and-release-notes` | P0 |
| Platform integration | Apple Pay, Google Play Billing, OS permissions, macOS, Windows, notifications, storage. | `payment-platform-readiness`, `desktop-os-integration`, `app-store-distribution-readiness`, `backup-restore-design` | P1 |
| Operations | Backup, restore, data export, observability, incidents, abuse, durability. | `backup-restore-design`, `incident-communication-playbook`, `analytics-event-taxonomy`, `abuse-fraud-risk-review` | P0 |
| Promotion and growth | Offers, campaigns, lifecycle messaging, launch moments, referrals, SEO. | `startup-growth-review`, `landing-page-critique`, `product-positioning`, `seo-content-brief`, `promotion-campaign-review`, `notification-strategy-review` | P0 |
| Customer support | Help center, refunds, tickets, escalation, support tooling, trust recovery. | `customer-support-operations`, `help-center-architecture`, `refund-and-support-flow-review` | P0 |
| Compliance and trust | Privacy, children/minors, store review, data retention, cancellation, policy risk. | `privacy-and-data-retention-review`, `abuse-fraud-risk-review`, `incident-communication-playbook` | P1 |

## Product type coverage matrix

| Product type | Must cover | First skills |
| --- | --- | --- |
| Mobile app | onboarding, permissions, subscriptions, IAP, notifications, restore purchase, offline state, app-store review | `mobile-app-product-systems`, `app-store-distribution-readiness` |
| Mobile game | game economy, rewarded ads, check-ins, streaks, offers, refunds, anti-abuse, live events | `mobile-app-product-systems` |
| SaaS | pricing, packaging, trials, sales-assisted conversion, cancellation, expansion, support, backup/export | `saas-subscription-pricing`, `backup-restore-design` |
| Web app | responsive UI, SEO/landing, checkout, auth, data export, support, browser states | `interface-craft`, `startup-growth-review`, `backup-restore-design` |
| Desktop utility | OS integration, auto-update, backup, file associations, permissions, menu/tray, local data | `app-store-distribution-readiness`, `backup-restore-design` |
| Developer tool | docs, onboarding, CLI/API, pricing, usage limits, telemetry, support, changelog | future developer-tool-product-design |
| Marketplace/community | moderation, trust, creator tools, payouts, disputes, growth loops | future marketplace-product-ops |

## Platform and channel matrix

| Area | Details to cover | Skill home |
| --- | --- | --- |
| Apple Pay | payment sheet readiness, entitlements, region support, fallback, receipts, support traces | `payment-platform-readiness` |
| Google Play Billing | products, subscriptions, purchase tokens, restore, refund/revoke, RTDN-style event processing | `mobile-app-product-systems` |
| App Store | metadata, screenshots, privacy nutrition, subscriptions, review notes, restore purchases | `app-store-distribution-readiness` |
| Google Play | listing, data safety, billing, testing tracks, pre-launch report, policy risk | `app-store-distribution-readiness` |
| Steam | store page, wishlist, demo, achievements, cloud saves, refunds, community hub | `app-store-distribution-readiness` |
| Microsoft Store | package identity, listing, IAP, updates, Windows integration, certification | `app-store-distribution-readiness` |
| macOS | menu bar, dock, login item, permissions, sandbox, file access, backup, keychain | `desktop-os-integration` |
| Windows | installer, MSIX, tray, startup, registry/file associations, notifications, backup | `desktop-os-integration` |
| Backup | versioning, encryption, restore drills, export, cloud/local conflict resolution | `backup-restore-design` |

## First 30-skill target map

### P0 — star-driving foundation

- `product-lifecycle-architect`
- `market-research-synthesis`
- `interface-craft`
- `mobile-app-product-systems`
- `saas-subscription-pricing`
- `app-store-distribution-readiness`
- `backup-restore-design`
- `customer-support-operations`
- `startup-growth-review`
- `skill-marketplace-creator`

### P1 — high-demand depth

Completed in the first expansion:

- `mobile-first-ui-review`
- `motion-transition-review`
- `responsive-layout-review`
- `pricing-page-critique`
- `landing-page-critique`
- `notification-strategy-review`
- `game-economy-review`
- `desktop-os-integration`
- `payment-platform-readiness`
- `execution-simplification`

Completed in the second expansion:

- `refund-and-support-flow-review`
- `subscription-entitlement-review`
- `onboarding-activation-review`
- `promotion-campaign-review`
- `empty-state-and-loading-review`

Next P1 depth target:

- `checkout-conversion-review`
- `daily-reward-and-streak-review`
- `ad-monetization-review`

### P2 — defensibility and operations

Completed in the second expansion:

- `privacy-and-data-retention-review`
- `abuse-fraud-risk-review`
- `incident-communication-playbook`
- `analytics-event-taxonomy`
- `help-center-architecture`
- `launch-readiness-review`
- `store-listing-optimization`
- `changelog-and-release-notes`
- `product-positioning`
- `seo-content-brief`

Next P2 depth target:

- `developer-tool-product-design`
- `marketplace-product-ops`
- `checkout-conversion-review`
- `store-review-policy-risk`

## Execution cadence

- Keep adding useful skills in batches, but require eval coverage and matrix placement for every new skill.
- Deepen each skill with one reference file per hard domain.
- Add eval prompts immediately after each skill.
- Promote skills from preview only after they have examples and at least one forward-test.
- Weekly: pick the highest-demand skill, add state machines and decision tables, then publish a demo.
