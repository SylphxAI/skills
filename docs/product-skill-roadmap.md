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
| Product design | What systems must exist: onboarding, payment, support, notifications, data, trust? | `product-lifecycle-architect`, `mobile-app-product-systems` | P0 |
| UI and interaction | How should the product feel: modern, fast, subtle, responsive, accessible? | `interface-craft` plus future UI pack | P0 |
| Monetization | SaaS pricing, subscriptions, IAP, IAA, paid apps, trials, refunds, expansion. | `saas-subscription-pricing`, `mobile-app-product-systems` | P0 |
| Distribution | App Store, Google Play, Steam, Microsoft Store, web, direct download. | `app-store-distribution-readiness` | P0 |
| Platform integration | Apple Pay, Google Play Billing, OS permissions, macOS, Windows, notifications, storage. | `app-store-distribution-readiness`, `backup-restore-design` | P1 |
| Operations | Backup, restore, data export, observability, incidents, abuse, durability. | `backup-restore-design`, future ops pack | P0 |
| Promotion and growth | Offers, campaigns, lifecycle messaging, launch moments, referrals, SEO. | `startup-growth-review`, `mobile-app-product-systems` | P0 |
| Customer support | Help center, refunds, tickets, escalation, support tooling, trust recovery. | `customer-support-operations` | P0 |
| Compliance and trust | Privacy, children/minors, store review, data retention, cancellation, policy risk. | future trust/compliance pack | P1 |

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
| Apple Pay | payment sheet readiness, entitlements, region support, fallback, receipts, support traces | future payment-platform-readiness |
| Google Play Billing | products, subscriptions, purchase tokens, restore, refund/revoke, RTDN-style event processing | `mobile-app-product-systems` |
| App Store | metadata, screenshots, privacy nutrition, subscriptions, review notes, restore purchases | `app-store-distribution-readiness` |
| Google Play | listing, data safety, billing, testing tracks, pre-launch report, policy risk | `app-store-distribution-readiness` |
| Steam | store page, wishlist, demo, achievements, cloud saves, refunds, community hub | `app-store-distribution-readiness` |
| Microsoft Store | package identity, listing, IAP, updates, Windows integration, certification | `app-store-distribution-readiness` |
| macOS | menu bar, dock, login item, permissions, sandbox, file access, backup, keychain | future desktop-os-integration |
| Windows | installer, MSIX, tray, startup, registry/file associations, notifications, backup | future desktop-os-integration |
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

- `mobile-first-ui-review`
- `motion-transition-review`
- `responsive-layout-review`
- `pricing-page-critique`
- `landing-page-critique`
- `notification-strategy-review`
- `game-economy-review`
- `refund-and-support-flow-review`
- `desktop-os-integration`
- `payment-platform-readiness`

### P2 — defensibility and operations

- `privacy-and-data-retention-review`
- `abuse-fraud-risk-review`
- `incident-communication-playbook`
- `developer-tool-product-design`
- `marketplace-product-ops`
- `analytics-event-taxonomy`
- `help-center-architecture`
- `launch-readiness-review`
- `store-listing-optimization`
- `changelog-and-release-notes`

## Execution cadence

- Add 5-10 foundation skills quickly.
- Deepen each skill with one reference file per hard domain.
- Add eval prompts immediately after each skill.
- Promote skills from preview only after they have examples and at least one forward-test.
- Weekly: pick the highest-demand skill, add state machines and decision tables, then publish a demo.
