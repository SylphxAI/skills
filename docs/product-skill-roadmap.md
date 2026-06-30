# Product Skill Roadmap Matrix

Sylphx Skills is a public product-operating knowledge matrix for agents. It helps an agent build, launch, monetize, support, and improve products across mobile apps, games, web apps, SaaS, desktop software, utilities, developer tools, marketplaces, and community products.

The repository now contains **51 preview skills with eval coverage**. The current expansion closes another high-value layer of the roadmap: usage-based pricing, marketplace payouts, Microsoft Store readiness, store review policy risk, live event operations, retention cohort review, referral loops, and accessibility product review.

See [`sota-product-operating-matrix.md`](./sota-product-operating-matrix.md) for the lifecycle/product/channel matrix. See [`skill-factory-automation.md`](./skill-factory-automation.md) for the automation loop that turns market knowledge into original Sylphx skills.

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
| UI and interaction | How should the product feel: modern, fast, subtle, responsive, accessible, resilient? | `interface-craft`, `mobile-first-ui-review`, `motion-transition-review`, `responsive-layout-review`, `accessibility-product-review`, `empty-state-and-loading-review` | P0 |
| Monetization | SaaS pricing, usage pricing, subscriptions, IAP, IAA, payouts, trials, refunds, checkout, expansion. | `saas-subscription-pricing`, `usage-based-pricing-review`, `pricing-page-critique`, `checkout-conversion-review`, `marketplace-payouts-review`, `subscription-entitlement-review`, `refund-and-support-flow-review`, `payment-platform-readiness`, `ad-monetization-review` | P0 |
| Distribution | App Store, Google Play, Steam, Microsoft Store, web, direct download, review policy. | `app-store-distribution-readiness`, `store-listing-optimization`, `launch-readiness-review`, `steam-launch-readiness`, `microsoft-store-readiness`, `store-review-policy-risk`, `changelog-and-release-notes` | P0 |
| Platform integration | Apple Pay, Google Play Billing, macOS, Windows, permissions, notifications, storage. | `payment-platform-readiness`, `desktop-os-integration`, `macos-release-readiness`, `windows-release-readiness`, `microsoft-store-readiness`, `backup-restore-design` | P0 |
| Operations | Backup, restore, data export, live events, incidents, abuse, durability. | `backup-restore-design`, `live-event-ops-review`, `incident-communication-playbook`, `analytics-event-taxonomy`, `abuse-fraud-risk-review` | P0 |
| Promotion and growth | Offers, campaigns, lifecycle messaging, referrals, launch moments, SEO, cohort learning. | `startup-growth-review`, `landing-page-critique`, `product-positioning`, `seo-content-brief`, `promotion-campaign-review`, `referral-loop-review`, `retention-cohort-review`, `notification-strategy-review` | P0 |
| Customer support | Help center, refunds, tickets, escalation, support tooling, trust recovery. | `customer-support-operations`, `help-center-architecture`, `refund-and-support-flow-review` | P0 |
| Developer/community products | API/SDK/CLI adoption, marketplace supply quality, payouts, review queues, ranking, disputes. | `developer-tool-product-design`, `marketplace-product-ops`, `marketplace-payouts-review`, `skill-marketplace-creator` | P0 |
| Compliance and trust | Accessibility, privacy, children/minors, store review, data retention, cancellation, policy risk. | `accessibility-product-review`, `privacy-and-data-retention-review`, `store-review-policy-risk`, `abuse-fraud-risk-review`, `incident-communication-playbook` | P0 |

## Product type coverage matrix

| Product type | Must cover | First skills |
| --- | --- | --- |
| Mobile app | onboarding, permissions, subscriptions, IAP, IAA, notifications, restore purchase, referral, accessibility, app-store review | `mobile-app-product-systems`, `checkout-conversion-review`, `ad-monetization-review`, `referral-loop-review`, `accessibility-product-review`, `app-store-distribution-readiness` |
| Mobile game | economy, rewarded ads, daily rewards, streaks, live events, offers, refunds, anti-abuse, retention cohorts | `game-economy-review`, `ad-monetization-review`, `daily-reward-and-streak-review`, `live-event-ops-review`, `retention-cohort-review` |
| SaaS | pricing, usage pricing, checkout, trials, cancellation, expansion, support, retention, backup/export | `saas-subscription-pricing`, `usage-based-pricing-review`, `pricing-page-critique`, `checkout-conversion-review`, `retention-cohort-review`, `backup-restore-design` |
| Web app | responsive UI, accessibility, SEO/landing, checkout, auth, data export, support, browser states | `interface-craft`, `responsive-layout-review`, `accessibility-product-review`, `landing-page-critique`, `checkout-conversion-review` |
| Desktop utility | OS integration, store/direct distribution, auto-update, backup, permissions, menu/tray, local data | `desktop-os-integration`, `macos-release-readiness`, `windows-release-readiness`, `microsoft-store-readiness` |
| Developer tool | docs, onboarding, CLI/API, SDKs, usage pricing, limits, telemetry, changelog, support | `developer-tool-product-design`, `usage-based-pricing-review`, `help-center-architecture`, `changelog-and-release-notes` |
| Marketplace/community | submissions, ranking, trust, creator tools, payouts, disputes, moderation, referral loops, growth | `marketplace-product-ops`, `marketplace-payouts-review`, `referral-loop-review`, `abuse-fraud-risk-review` |
| PC game | Steam page, Microsoft Store if relevant, wishlist, demo, platform features, live events, community, reviews, patch ops | `steam-launch-readiness`, `microsoft-store-readiness`, `live-event-ops-review`, `game-economy-review` |

## Channel and platform matrix

| Area | Details to cover | Skill home |
| --- | --- | --- |
| Apple Pay / Google Pay | wallet readiness, region support, fallback, provider errors, support traces | `payment-platform-readiness`, `checkout-conversion-review` |
| App Store / Google Play | listing, privacy/data safety, IAP/subscriptions, review notes, restore, policy risk | `app-store-distribution-readiness`, `store-listing-optimization`, `store-review-policy-risk` |
| Steam | store page, capsule art, wishlist, demo, achievements, cloud saves, refunds, community hub | `steam-launch-readiness` |
| Microsoft Store | package identity, MSIX/AppX, listing, IAP/subscriptions, certification, Windows integration | `microsoft-store-readiness`, `windows-release-readiness` |
| macOS | signing, notarization, sandbox, permissions, keychain, launch agents, backup, updates | `macos-release-readiness`, `desktop-os-integration` |
| Windows | installer/MSIX, signing, SmartScreen, tray, startup, registry/file associations, services, uninstall | `windows-release-readiness`, `microsoft-store-readiness`, `desktop-os-integration` |
| Backup | versioning, encryption, restore drills, export, cloud/local conflict resolution | `backup-restore-design` |
| Developer ecosystems | SDK/API/CLI quickstart, examples, errors, limits, usage pricing, status, changelog | `developer-tool-product-design`, `usage-based-pricing-review` |
| Skill/app marketplaces | submission, review, ranking, quality, disputes, payouts, moderation | `marketplace-product-ops`, `marketplace-payouts-review`, `skill-marketplace-creator` |

## Revenue leverage matrix

| Lever | Product effect | Skill coverage | What good output includes |
| --- | --- | --- | --- |
| Better positioning | Higher visitor-to-signup and clearer sales narrative. | `landing-page-critique`, `market-research-synthesis`, `product-positioning` | audience, promise, proof, objections, CTA experiments |
| Pricing clarity | Higher checkout completion and lower support load. | `pricing-page-critique`, `saas-subscription-pricing`, `usage-based-pricing-review` | value metric, plan clarity, risk reducers, usage controls, cancellation truth |
| Checkout conversion | Higher paid conversion without lower trust. | `checkout-conversion-review`, `payment-platform-readiness` | funnel state machine, wallets/fallback, errors, idempotency, guardrails |
| Payment/payout reliability | Fewer entitlement and creator payout disputes. | `payment-platform-readiness`, `subscription-entitlement-review`, `marketplace-payouts-review` | ledger events, receipt/webhook processing, payout holds, support traces |
| Ad monetization | Higher ARPDAU without churn/fatigue. | `ad-monetization-review`, `game-economy-review` | placement map, caps, consent, payer suppression, kill switches |
| Retention loops | Better repeat engagement and habit formation. | `daily-reward-and-streak-review`, `live-event-ops-review`, `retention-cohort-review`, `notification-strategy-review` | reward cadence, event ops, cohort diagnosis, anti-abuse, economy impact |
| Referral growth | Lower-cost acquisition with trust. | `referral-loop-review`, `promotion-campaign-review` | qualification, reward pending, attribution, fraud controls, retained-value metrics |
| Store readiness | Fewer launch delays and better channel conversion. | `app-store-distribution-readiness`, `steam-launch-readiness`, `microsoft-store-readiness`, `store-review-policy-risk` | policy risks, metadata, screenshots, support, review blockers |
| Accessibility | Higher usable market and lower legal/support risk. | `accessibility-product-review`, `interface-craft` | critical-task blockers, design-system fixes, validation checks |
| Support quality | Lower churn and faster trust recovery. | `customer-support-operations` | triage, macros, escalation, refund ladder, product feedback loop |
| Backup/recovery | Higher trust and enterprise readiness. | `backup-restore-design` | restore drills, RPO/RTO, export, deletion, support recovery |
| Marketplace quality | Higher supply trust and demand success. | `marketplace-product-ops`, `marketplace-payouts-review` | submission review, ranking guardrails, disputes, payouts, moderation |

## Remaining high-value gaps

- `decision-memo-writer`
- `opportunity-scoring-review`
- `agentic-workflow-designer`
- `design-system-extractor`
- `form-ux-review`
- `launch-narrative-review`
- `creator-onboarding-review`
- `skill-eval-designer`
- `skill-catalog-generator`
- `moderation-trust-review`
- `winback-campaign-review`
- `customer-success-health-review`

## Roadmap waves

| Wave | Goal | Deliverables |
| --- | --- | --- |
| Wave 1 | Make the repo obviously useful. | 35 eval-backed preview skills, registry, README, CI, SOTA matrix, and completed P1/P2 pack seeds. |
| Wave 2 | Make the repo demonstrably better than prompt lists. | behavior examples, launch demos, static catalog, install verification, public launch kit. |
| Wave 3 | Cover revenue systems deeply. | checkout conversion, subscription entitlement, usage pricing, refund/support, ad monetization, payouts, campaigns, game live ops. |
| Wave 4 | Cover channel-specific release depth. | Steam launch, Microsoft Store, macOS release, Windows release, store policy risk, signed downloads. |
| Wave 5 | Build marketplace mechanics. | marketplace ops, payouts, submissions, scoring, verified creators, install badges, private registry option. |
| Wave 6 | Build automation. | agent skill factory, eval gates, weekly research ingestion, auto-drafted PRs. |

## Definition of SOTA coverage

A category is SOTA-covered only when an agent can produce a concrete, product-safe artifact without generic filler: a state machine, decision table, launch checklist, event schema, support flow, risk ladder, or implementation-ready review. If a skill cannot change a real product decision, it is not done.
