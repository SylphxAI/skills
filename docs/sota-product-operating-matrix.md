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

## Priority model

Prioritize skills with the highest combined score across six dimensions:

| Dimension | Why it matters | High-score examples |
| --- | --- | --- |
| Frequency | Common tasks attract stars and repeated use. | UI polish, pricing pages, checkout, launch readiness, support flows |
| Revenue leverage | Better decisions can increase conversion, retention, ARPU, or retained revenue. | pricing, checkout, ads, subscriptions, promotion, game economy |
| Failure cost | Mistakes create refunds, bans, churn, support load, data loss, policy rejection, or bad reviews. | payments, subscriptions, backup, privacy, desktop release, Steam launch |
| Agent gap | Base models often give generic advice without operational state, support, or metrics. | entitlements, refund handling, macOS/Windows release, marketplace ops |
| Cross-product reuse | Useful across SaaS, apps, games, utilities, developer tools, and web. | responsive UI, support ops, market research, backup, checkout |
| Public attractiveness | Easy to demo and understand in a GitHub README. | before/after UI, checkout audit, Steam launch checklist, developer quickstart review |

## Master lifecycle matrix

| Lifecycle area | What agents must know | Current skill coverage | Next depth target |
| --- | --- | --- | --- |
| Strategy and wedge | Audience, pain, timing, differentiation, business model, proof target. | `product-lifecycle-architect`, `execution-simplification`, `market-research-synthesis` | decision memo and opportunity scoring |
| Market research | Competitors, reviews, pricing, store listings, complaints, pattern synthesis. | `market-research-synthesis` | review-mining and competitor matrix helpers |
| Product architecture | Core loop, onboarding, accounts, billing, settings, support, data, trust. | `product-lifecycle-architect`, `mobile-app-product-systems`, `onboarding-activation-review` | product-system blueprints by product type |
| UI craft | Perceived speed, hierarchy, micro-details, accessibility, empty/loading/error states. | `interface-craft`, `mobile-first-ui-review`, `motion-transition-review`, `responsive-layout-review`, `empty-state-and-loading-review` | component-specific demos and screenshots |
| SaaS pricing | Value metric, tiers, trials, freemium, cancellation, expansion. | `saas-subscription-pricing`, `pricing-page-critique` | pricing experiments and packaging calculators |
| Checkout and payments | Wallets, discounts, tax, payment errors, receipts, entitlements, support traces. | `checkout-conversion-review`, `payment-platform-readiness`, `subscription-entitlement-review` | provider-specific ledgers and reconciliation scripts |
| Mobile monetization | Subscription, IAP, IAA, promotions, notifications, daily rewards, refunds. | `mobile-app-product-systems`, `ad-monetization-review`, `daily-reward-and-streak-review` | live-event and cohort-retention skills |
| Notifications | Push, email, SMS, in-app, desktop, consent, fatigue, lifecycle events. | `notification-strategy-review` | lifecycle campaign playbooks |
| Game economy | Currency, sources/sinks, progression, ads, IAP, events, fairness. | `game-economy-review`, `ad-monetization-review`, `daily-reward-and-streak-review` | economy simulation helper |
| Distribution | App Store, Google Play, Steam, Microsoft Store, web/direct download. | `app-store-distribution-readiness`, `store-listing-optimization`, `steam-launch-readiness`, `launch-readiness-review` | Microsoft Store-specific depth |
| Desktop OS | macOS, Windows, installer, update, tray/menu, permissions, credentials. | `desktop-os-integration`, `macos-release-readiness`, `windows-release-readiness` | signed-download and auto-update demos |
| Backup/data | Versioning, export, restore drills, sync, deletion, local/cloud data. | `backup-restore-design` | restore-drill templates and scripts |
| Developer tools | API/SDK/CLI onboarding, docs, examples, limits, errors, pricing, changelog. | `developer-tool-product-design` | docs-to-first-success demo suite |
| Marketplaces | Submission, review, ranking, quality, disputes, payouts, moderation, support. | `marketplace-product-ops`, `skill-marketplace-creator` | creator onboarding and scoring skills |
| Operations/support | Help center, refund, escalation, incident comms, analytics taxonomy. | `customer-support-operations`, `help-center-architecture`, `refund-and-support-flow-review`, `incident-communication-playbook`, `analytics-event-taxonomy` | support-macro and triage generators |
| Trust/compliance | Privacy, data retention, abuse/fraud, policy risk, safe growth. | `privacy-and-data-retention-review`, `abuse-fraud-risk-review` | store-review-policy-risk skill |

## Product type coverage matrix

| Product type | Must cover | Current skills |
| --- | --- | --- |
| Mobile app | onboarding, permissions, subscriptions, IAP, IAA, notifications, restore purchase, offline state, app-store review | `mobile-app-product-systems`, `checkout-conversion-review`, `ad-monetization-review`, `app-store-distribution-readiness` |
| Mobile game | economy, rewarded ads, daily rewards, streaks, offers, refunds, anti-abuse, live events | `game-economy-review`, `ad-monetization-review`, `daily-reward-and-streak-review` |
| SaaS | pricing, packaging, checkout, trials, cancellation, expansion, support, backup/export | `saas-subscription-pricing`, `pricing-page-critique`, `checkout-conversion-review`, `backup-restore-design` |
| Web app | responsive UI, SEO/landing, checkout, auth, data export, support, browser states | `interface-craft`, `responsive-layout-review`, `landing-page-critique`, `checkout-conversion-review` |
| Desktop utility | installers, update, backup, file associations, permissions, menu/tray, local data | `desktop-os-integration`, `macos-release-readiness`, `windows-release-readiness` |
| Developer tool | docs, quickstart, CLI/API, SDKs, limits, pricing, telemetry, changelog, support | `developer-tool-product-design`, `help-center-architecture`, `changelog-and-release-notes` |
| Marketplace/community | submissions, ranking, trust, creator tools, disputes, payouts, moderation, growth loops | `marketplace-product-ops`, `abuse-fraud-risk-review`, `customer-support-operations` |
| PC game | Steam store page, wishlist, demo, platform features, community, refunds, reviews, patch ops | `steam-launch-readiness`, `game-economy-review`, `changelog-and-release-notes` |

## Platform and channel matrix

| Area | Details to cover | Skill home |
| --- | --- | --- |
| Apple Pay | wallet sheet readiness, region support, fallback, errors, entitlement and support traces | `payment-platform-readiness`, `checkout-conversion-review` |
| Google Play Billing | products, subscriptions, purchase tokens, restore, refund/revoke, event processing | `mobile-app-product-systems`, `payment-platform-readiness` |
| App Store | metadata, screenshots, privacy nutrition, subscriptions, review notes, restore purchases | `app-store-distribution-readiness`, `store-listing-optimization` |
| Google Play | listing, data safety, billing, testing tracks, pre-launch report, policy risk | `app-store-distribution-readiness`, `store-listing-optimization` |
| Steam | store page, wishlist, demo, achievements, cloud saves, refunds, community hub | `steam-launch-readiness` |
| Microsoft Store | package identity, listing, IAP, updates, Windows integration, certification | `app-store-distribution-readiness`, `windows-release-readiness` |
| macOS | signing, notarization, sandbox, permissions, keychain, launch agents, backup, updates | `macos-release-readiness`, `desktop-os-integration` |
| Windows | installer/MSIX, signing, SmartScreen, tray, startup, registry/file associations, services, uninstall | `windows-release-readiness`, `desktop-os-integration` |
| Backup | versioning, encryption, restore drills, export, cloud/local conflict resolution | `backup-restore-design` |
| Developer ecosystems | SDK/API/CLI quickstart, examples, errors, limits, pricing, status, changelog | `developer-tool-product-design` |
| Skill/app marketplaces | submission, review, ranking, quality, disputes, payouts, moderation | `marketplace-product-ops`, `skill-marketplace-creator` |

## First 60-skill destination map

### Completed foundation and depth cells

- 43 preview skills are live in `skills/`, each with `SKILL.md`, at least one reference, `agents/openai.yaml`, eval, behavior example, registry entry, and catalog page.
- This includes the first high-revenue depth batch: `checkout-conversion-review`, `ad-monetization-review`, `daily-reward-and-streak-review`, `steam-launch-readiness`, `developer-tool-product-design`, `marketplace-product-ops`, `macos-release-readiness`, and `windows-release-readiness`.

### Remaining high-value gaps

- `usage-based-pricing-review`
- `marketplace-payouts-review`
- `microsoft-store-readiness`
- `store-review-policy-risk`
- `live-event-ops-review`
- `retention-cohort-review`
- `referral-loop-review`
- `accessibility-product-review`
- `design-system-extractor`
- `creator-onboarding-review`
- `skill-eval-designer`
- `decision-memo-writer`

## Execution cadence

- Add useful skills in batches, but require eval coverage, behavior examples, and matrix placement for every skill.
- Deepen each skill with one reference file per hard domain before adding sprawling prose.
- Promote skills from preview only after forward-tests and public before/after demos.
- Weekly: pick one high-demand skill, add a state machine, decision table, event schema, and public demo.
- Monthly: refresh external directory status and issue #1 until at least two third-party directories list the repo.
