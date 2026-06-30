# Product Skill Roadmap Matrix

Sylphx Skills is a public product-operating knowledge matrix for agents. It should help an agent build, launch, monetize, support, and improve a product across mobile apps, games, web apps, SaaS, desktop software, utilities, developer tools, marketplaces, and community products.

The repository now contains **43 preview skills with eval coverage**. The foundation proved the skill marketplace format; this expansion deepens the highest-leverage product and revenue cells: checkout conversion, ad monetization, daily rewards/streaks, Steam launch, developer tools, marketplace operations, macOS release readiness, and Windows release readiness.

See [`sota-product-operating-matrix.md`](./sota-product-operating-matrix.md) for the full lifecycle/product/channel matrix and the first 60-skill destination map. See [`skill-factory-automation.md`](./skill-factory-automation.md) for the automation loop that turns market knowledge into original Sylphx skills.

## North-star quality

Every cell in the matrix should eventually have:

1. a dedicated or shared skill;
2. state machines where state matters;
3. decision tables where tradeoffs matter;
4. event schemas where measurement matters;
5. support and failure handling;
6. platform/channel caveats;
7. positive and negative eval prompts;
8. public demos that show the skill is more useful than generic prompting.

## Product lifecycle matrix

| Lifecycle | Questions the skill must answer | Core skills | Priority |
| --- | --- | --- | --- |
| Strategy and planning | Who is it for? Why now? What is the wedge? What is the business model? | `product-lifecycle-architect`, `market-research-synthesis`, `execution-simplification` | P0 |
| Market research | What do competitors, stores, reviews, pricing pages, and user complaints reveal? | `market-research-synthesis` | P0 |
| Product design | What systems must exist: onboarding, payment, support, notifications, data, trust? | `product-lifecycle-architect`, `mobile-app-product-systems`, `onboarding-activation-review`, `subscription-entitlement-review` | P0 |
| UI and interaction | How should the product feel: modern, fast, subtle, responsive, accessible, resilient? | `interface-craft`, `mobile-first-ui-review`, `motion-transition-review`, `responsive-layout-review`, `empty-state-and-loading-review` | P0 |
| Monetization | SaaS pricing, subscriptions, IAP, IAA, paid apps, trials, refunds, checkout, expansion. | `saas-subscription-pricing`, `pricing-page-critique`, `checkout-conversion-review`, `subscription-entitlement-review`, `refund-and-support-flow-review`, `payment-platform-readiness`, `ad-monetization-review` | P0 |
| Distribution | App Store, Google Play, Steam, Microsoft Store, web, direct download. | `app-store-distribution-readiness`, `store-listing-optimization`, `launch-readiness-review`, `steam-launch-readiness`, `changelog-and-release-notes` | P0 |
| Platform integration | Apple Pay, Google Play Billing, macOS, Windows, permissions, notifications, storage. | `payment-platform-readiness`, `desktop-os-integration`, `macos-release-readiness`, `windows-release-readiness`, `backup-restore-design` | P0 |
| Operations | Backup, restore, data export, observability, incidents, abuse, durability. | `backup-restore-design`, `incident-communication-playbook`, `analytics-event-taxonomy`, `abuse-fraud-risk-review` | P0 |
| Promotion and growth | Offers, campaigns, lifecycle messaging, launch moments, referrals, SEO. | `startup-growth-review`, `landing-page-critique`, `product-positioning`, `seo-content-brief`, `promotion-campaign-review`, `notification-strategy-review` | P0 |
| Customer support | Help center, refunds, tickets, escalation, support tooling, trust recovery. | `customer-support-operations`, `help-center-architecture`, `refund-and-support-flow-review` | P0 |
| Developer/community products | API/SDK/CLI adoption, marketplace supply quality, review queues, ranking, disputes. | `developer-tool-product-design`, `marketplace-product-ops`, `skill-marketplace-creator` | P0 |
| Compliance and trust | Privacy, children/minors, store review, data retention, cancellation, policy risk. | `privacy-and-data-retention-review`, `abuse-fraud-risk-review`, `incident-communication-playbook` | P1 |

## Product type coverage matrix

| Product type | Must cover | First skills |
| --- | --- | --- |
| Mobile app | onboarding, permissions, subscriptions, IAP, IAA, notifications, restore purchase, offline state, app-store review | `mobile-app-product-systems`, `checkout-conversion-review`, `ad-monetization-review`, `app-store-distribution-readiness` |
| Mobile game | game economy, rewarded ads, check-ins, streaks, offers, refunds, anti-abuse, live events | `game-economy-review`, `ad-monetization-review`, `daily-reward-and-streak-review`, `mobile-app-product-systems` |
| SaaS | pricing, packaging, trials, checkout, sales-assisted conversion, cancellation, expansion, support, backup/export | `saas-subscription-pricing`, `pricing-page-critique`, `checkout-conversion-review`, `backup-restore-design` |
| Web app | responsive UI, SEO/landing, checkout, auth, data export, support, browser states | `interface-craft`, `startup-growth-review`, `checkout-conversion-review`, `backup-restore-design` |
| Desktop utility | OS integration, auto-update, backup, file associations, permissions, menu/tray, local data | `desktop-os-integration`, `macos-release-readiness`, `windows-release-readiness`, `backup-restore-design` |
| Developer tool | docs, onboarding, CLI/API, pricing, usage limits, telemetry, support, changelog | `developer-tool-product-design`, `changelog-and-release-notes`, `help-center-architecture` |
| Marketplace/community | moderation, trust, creator tools, payouts, disputes, ranking, discovery, growth loops | `marketplace-product-ops`, `abuse-fraud-risk-review`, `customer-support-operations` |
| PC game | Steam page, wishlist, demo, platform features, community, refunds, first-week patching | `steam-launch-readiness`, `game-economy-review`, `changelog-and-release-notes` |

## Channel and platform matrix

| Area | Details to cover | Skill home |
| --- | --- | --- |
| Apple Pay / Google Pay | wallet readiness, region support, fallback, provider errors, support traces | `payment-platform-readiness`, `checkout-conversion-review` |
| App Store / Google Play | listing, privacy/data safety, IAP/subscriptions, review notes, restore, policy risk | `app-store-distribution-readiness`, `store-listing-optimization` |
| Steam | store page, capsule art, wishlist, demo, achievements, cloud saves, refunds, community hub | `steam-launch-readiness` |
| Microsoft Store | package identity, listing, IAP/subscriptions, certification, Windows integration | `app-store-distribution-readiness`, `windows-release-readiness` |
| macOS | signing, notarization, sandbox, permissions, keychain, launch agents, backup, updates | `macos-release-readiness`, `desktop-os-integration` |
| Windows | installer/MSIX, signing, SmartScreen, services, registry, tray, startup, uninstall, updates | `windows-release-readiness`, `desktop-os-integration` |
| Backup | versioning, encryption, restore drills, export, cloud/local conflict resolution | `backup-restore-design` |
| Developer ecosystems | SDK/API/CLI onboarding, examples, limits, changelog, status, support | `developer-tool-product-design` |
| Marketplaces | submission, review, listing, ranking, disputes, payouts, moderation | `marketplace-product-ops` |

## Revenue leverage matrix

| Lever | Product effect | Skill coverage | What good output includes |
| --- | --- | --- | --- |
| Better positioning | Higher visitor-to-signup and clearer sales narrative. | `landing-page-critique`, `market-research-synthesis`, `product-positioning` | audience, promise, proof, objections, CTA experiments |
| Pricing clarity | Higher checkout completion and lower support load. | `pricing-page-critique`, `saas-subscription-pricing` | value metric, plan clarity, risk reducers, cancellation truth |
| Checkout conversion | Higher paid conversion without lower trust. | `checkout-conversion-review`, `payment-platform-readiness` | funnel state machine, wallets/fallback, errors, idempotency, guardrails |
| Payment reliability | Fewer failed purchases and entitlement disputes. | `payment-platform-readiness`, `subscription-entitlement-review` | ledger events, receipt/webhook processing, support traces |
| Ad monetization | Higher ARPDAU without churn/fatigue. | `ad-monetization-review`, `game-economy-review` | placement map, caps, consent, payer suppression, kill switches |
| Retention loops | Better repeat engagement and habit formation. | `daily-reward-and-streak-review`, `notification-strategy-review` | reward cadence, streak repair, notifications, anti-abuse, economy impact |
| Game economy tuning | Better retention, monetization, and fairness. | `game-economy-review` | sources/sinks, offers, refund semantics, live-ops events |
| Store readiness | Fewer launch delays and better channel conversion. | `app-store-distribution-readiness`, `steam-launch-readiness` | policy risks, metadata, screenshots, support, review blockers |
| Support quality | Lower churn and faster trust recovery. | `customer-support-operations` | triage, macros, escalation, refund ladder, product feedback loop |
| Backup/recovery | Higher trust and enterprise readiness. | `backup-restore-design` | restore drills, RPO/RTO, export, deletion, support recovery |
| Marketplace quality | Higher supply trust and demand success. | `marketplace-product-ops` | submission review, ranking guardrails, disputes, payouts, moderation |

## First 60-skill destination map

### Foundation and execution

- `product-lifecycle-architect`
- `execution-simplification`
- `market-research-synthesis`
- `decision-memo-writer`
- `opportunity-scoring-review`
- `agentic-workflow-designer`

### UI and product craft

- `interface-craft`
- `mobile-first-ui-review`
- `motion-transition-review`
- `responsive-layout-review`
- `design-system-extractor`
- `empty-state-and-loading-review`
- `form-ux-review`
- `accessibility-product-review`

### Growth and marketing

- `landing-page-critique`
- `pricing-page-critique`
- `startup-growth-review`
- `product-positioning`
- `seo-content-brief`
- `promotion-campaign-review`
- `launch-narrative-review`
- `referral-loop-review`

### Monetization and commerce

- `saas-subscription-pricing`
- `payment-platform-readiness`
- `checkout-conversion-review`
- `mobile-app-product-systems`
- `subscription-entitlement-review`
- `refund-and-support-flow-review`
- `usage-based-pricing-review`
- `marketplace-payouts-review`

### Mobile, games, and lifecycle systems

- `notification-strategy-review`
- `game-economy-review`
- `ad-monetization-review`
- `daily-reward-and-streak-review`
- `onboarding-activation-review`
- `live-event-ops-review`
- `retention-cohort-review`
- `winback-campaign-review`

### Distribution and platforms

- `app-store-distribution-readiness`
- `desktop-os-integration`
- `store-listing-optimization`
- `launch-readiness-review`
- `steam-launch-readiness`
- `microsoft-store-readiness`
- `macos-release-readiness`
- `windows-release-readiness`

### Operations, trust, and support

- `backup-restore-design`
- `customer-support-operations`
- `privacy-and-data-retention-review`
- `abuse-fraud-risk-review`
- `incident-communication-playbook`
- `analytics-event-taxonomy`
- `help-center-architecture`
- `changelog-and-release-notes`

### Developer, marketplace, and community

- `developer-tool-product-design`
- `marketplace-product-ops`
- `skill-marketplace-creator`
- `moderation-trust-review`
- `creator-onboarding-review`
- `skill-eval-designer`
- `skill-catalog-generator`

## Roadmap waves

| Wave | Goal | Deliverables |
| --- | --- | --- |
| Wave 1 | Make the repo obviously useful. | 35 eval-backed preview skills, registry, README, CI, SOTA matrix, and completed P1/P2 pack seeds. |
| Wave 2 | Make the repo demonstrably better than prompt lists. | behavior examples, launch demos, static catalog, install verification, public launch kit. |
| Wave 3 | Cover revenue systems deeply. | checkout conversion, subscription entitlement, refund/support, ad monetization, campaigns, game live ops. |
| Wave 4 | Cover channel-specific release depth. | Steam launch, macOS release, Windows release, Microsoft Store depth, signed downloads. |
| Wave 5 | Build marketplace mechanics. | marketplace ops, submissions, scoring, verified creators, install badges, private registry option. |
| Wave 6 | Build automation. | agent skill factory, eval gates, weekly research ingestion, auto-drafted PRs. |

## Definition of SOTA coverage

A category is SOTA-covered only when an agent can produce a concrete, product-safe artifact without generic filler: a state machine, decision table, launch checklist, event schema, support flow, risk ladder, or implementation-ready review. If a skill cannot change a real product decision, it is not done.
