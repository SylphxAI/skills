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
| Frequency | Common tasks attract stars and repeated use. | UI polish, pricing pages, launch readiness, support flows |
| Revenue leverage | Better decisions can increase conversion, retention, or ARPU. | pricing, payments, promotion, game economy, lifecycle messaging |
| Failure cost | Mistakes create refunds, bans, churn, support load, or policy rejection. | payments, subscriptions, backup, privacy, store review |
| Agent gap | Base models often give generic advice without operational detail. | entitlements, refund handling, desktop OS details, live ops |
| Cross-product reuse | Useful across SaaS, apps, games, utilities, and web. | responsive UI, support ops, market research, backup |
| Public attractiveness | Easy to demo and understand in a GitHub README. | before/after UI, landing critique, app-store launch checklist |

## Master lifecycle matrix

| Lifecycle area | What agents must know | Current skill coverage | Next depth target |
| --- | --- | --- | --- |
| Strategy and wedge | Audience, pain, timing, differentiation, business model, proof target. | `product-lifecycle-architect`, `execution-simplification` | decision memo and opportunity scoring |
| Market research | Competitors, reviews, pricing, store listings, user complaints, pattern synthesis. | `market-research-synthesis` | review-mining and competitor matrix helpers |
| Product architecture | Core loop, onboarding, accounts, billing, settings, support, data, trust. | `product-lifecycle-architect`, `mobile-app-product-systems` | onboarding and activation review |
| UI craft | Perceived speed, hierarchy, micro-details, accessibility, empty/loading/error states. | `interface-craft` | component-specific examples and screenshots |
| Mobile-first UI | Touch ergonomics, safe areas, permissions, keyboard, restore, offline. | `mobile-first-ui-review` | mobile checkout and onboarding examples |
| Motion | Feedback, continuity, navigation, gestures, loading, reduced motion. | `motion-transition-review` | implementation snippets for common stacks |
| Responsive design | Content stress points, navigation, tables, modals, desktop density. | `responsive-layout-review` | responsive dashboard/table patterns |
| SaaS pricing | Value metric, tiers, trials, freemium, cancellation, expansion. | `saas-subscription-pricing` | pricing experiments and packaging calculators |
| Pricing-page UX | Plan comparison, risk reducers, billing period, enterprise CTA, trust. | `pricing-page-critique` | before/after pricing page examples |
| Landing/conversion | Positioning, proof, CTA, objections, demo, SEO, analytics. | `landing-page-critique`, `startup-growth-review` | product-specific landing page templates |
| Payments | Apple Pay, Google Pay, IAP, checkout, receipts, refunds, entitlements. | `payment-platform-readiness` | provider-specific checklists and ledger examples |
| Mobile monetization | Subscription, IAP, IAA, promotions, notifications, daily rewards, refunds. | `mobile-app-product-systems` | dedicated subscription-entitlement review |
| Notifications | Push, email, SMS, in-app, desktop, consent, fatigue, lifecycle events. | `notification-strategy-review` | lifecycle campaign playbooks |
| Game economy | Currency, sources/sinks, progression, ads, IAP, events, fairness. | `game-economy-review` | economy simulation helper |
| Distribution | App Store, Google Play, Steam, Microsoft Store, web/direct download. | `app-store-distribution-readiness` | store-listing optimization and launch readiness |
| Desktop OS | macOS, Windows, installer, update, tray/menu, permissions, credentials. | `desktop-os-integration` | signed-release and auto-update runbooks |
| Backup/data | Versioning, export, restore drills, sync, deletion, local/cloud data. | `backup-restore-design` | restore-drill templates and threat model |
| Customer support | Help center, ticket triage, refunds, escalation, macros, feedback loops. | `customer-support-operations` | help-center architecture and support QA |
| Trust/compliance | Privacy, minors, abuse, fraud, retention, policy review, auditability. | partial | privacy and abuse/fraud pack |
| Product operations | Incidents, changelogs, analytics, release notes, feedback, roadmap updates. | partial | incident communication and analytics taxonomy |
| Marketplace operations | Skill submission, quality gates, ranking, installability, verified creators. | `skill-marketplace-creator` | static catalog and scoring automation |

## Product type matrix

| Product type | Required coverage | Current skills | Missing high-value skills |
| --- | --- | --- | --- |
| Mobile app | onboarding, permissions, subscription/IAP, restore, notifications, support, app-store review, offline. | `mobile-first-ui-review`, `onboarding-activation-review`, `mobile-app-product-systems`, `subscription-entitlement-review`, `payment-platform-readiness`, `app-store-distribution-readiness` | app-specific examples and demos |
| Mobile game | core loop, economy, IAP, ads, daily rewards, events, refund handling, anti-abuse, live ops. | `game-economy-review`, `mobile-app-product-systems`, `notification-strategy-review` | live-event-ops-review, ad-monetization-review |
| Web app | responsive layout, auth/account, checkout, SEO, loading/error states, support, analytics. | `responsive-layout-review`, `interface-craft`, `empty-state-and-loading-review`, `landing-page-critique`, `seo-content-brief`, `backup-restore-design`, `analytics-event-taxonomy` | checkout-conversion-review |
| SaaS | pricing, packaging, trial, onboarding, billing, cancellation, expansion, support, backup/export. | `saas-subscription-pricing`, `pricing-page-critique`, `customer-support-operations`, `backup-restore-design` | cancellation-save-flow-review, enterprise-readiness-review |
| Desktop utility | install, auto-update, permissions, local storage, backup, tray/menu, credentials, uninstall. | `desktop-os-integration`, `backup-restore-design`, `payment-platform-readiness` | updater-release-readiness, desktop-support-diagnostics |
| Developer tool | docs, CLI/API onboarding, examples, pricing, limits, telemetry, changelog, support. | partial via lifecycle/pricing/support | developer-tool-product-design, docs-onboarding-review |
| Marketplace/community | creator onboarding, trust, moderation, payouts, disputes, ranking, community loops. | `skill-marketplace-creator`, `payment-platform-readiness` | marketplace-product-ops, moderation-trust-review |
| Commerce product | catalog, checkout, payments, refunds, support, fraud, retention, promotions. | `payment-platform-readiness`, `refund-and-support-flow-review`, `customer-support-operations`, `landing-page-critique`, `abuse-fraud-risk-review`, `promotion-campaign-review` | checkout-conversion-review |
| Content product | discovery, SEO, notifications, subscriptions, creator workflows, retention. | `landing-page-critique`, `notification-strategy-review`, `saas-subscription-pricing` | content-growth-loop-review |

## Platform and channel matrix

| Platform/channel | Must cover | Current skill home | Detail still needed |
| --- | --- | --- | --- |
| App Store | metadata, screenshots, privacy, IAP/subscriptions, review notes, restore purchases. | `app-store-distribution-readiness`, `payment-platform-readiness` | review-note examples and screenshot matrix |
| Google Play | listing, data safety, billing, testing tracks, pre-launch report, policy declarations. | `app-store-distribution-readiness`, `payment-platform-readiness` | RTDN-style event handling examples |
| Apple Pay | payment sheet, merchant readiness, fallback, support traces, wallet-specific UX. | `payment-platform-readiness` | merchant/domain checklist examples |
| Google Pay | wallet checkout, region/payment-method support, fallback, confirmation. | `payment-platform-readiness` | web/native examples |
| Steam | store page, wishlist, demo, capsule art, achievements, cloud saves, refunds, community. | `app-store-distribution-readiness`, `game-economy-review` | Steam launch and wishlist skill |
| Microsoft Store | package identity, certification, IAP, updates, Windows notifications, listing. | `app-store-distribution-readiness`, `desktop-os-integration` | certification checklist |
| macOS | app bundle, notarization, sandbox, menu bar, login item, permissions, keychain, backup. | `desktop-os-integration` | macOS-specific release runbook |
| Windows | installer/MSIX, signing, tray, startup, registry, credential manager, firewall, uninstall. | `desktop-os-integration` | Windows diagnostics and updater runbook |
| Web/direct | landing, SEO, checkout, trust, signed downloads, auto-update, support, changelog. | `landing-page-critique`, `seo-content-brief`, `payment-platform-readiness`, `desktop-os-integration`, `changelog-and-release-notes` | signed-download examples |

## Revenue leverage matrix

| Lever | Product effect | Skill coverage | What good output includes |
| --- | --- | --- | --- |
| Better positioning | Higher visitor-to-signup and clearer sales narrative. | `landing-page-critique`, `market-research-synthesis` | audience, promise, proof, objections, CTA experiments |
| Pricing clarity | Higher checkout completion and lower support load. | `pricing-page-critique`, `saas-subscription-pricing` | value metric, plan clarity, risk reducers, cancellation truth |
| Payment reliability | Fewer failed purchases and entitlement disputes. | `payment-platform-readiness`, `mobile-app-product-systems` | idempotent ledger, receipt/webhook processing, support traces |
| Lifecycle messaging | Higher activation/retention without fatigue. | `notification-strategy-review`, `startup-growth-review` | taxonomy, consent, caps, events, negative signals |
| Game economy tuning | Better retention, monetization, and fairness. | `game-economy-review` | sources/sinks, offers, refund semantics, live-ops events |
| Store readiness | Fewer launch delays and better channel conversion. | `app-store-distribution-readiness` | policy risks, metadata, screenshots, support, review blockers |
| Support quality | Lower churn and faster trust recovery. | `customer-support-operations` | triage, macros, escalation, refund ladder, product feedback loop |
| Backup/recovery | Higher trust and enterprise readiness. | `backup-restore-design` | restore drills, RPO/RTO, export, deletion, support recovery |

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
- `mobile-app-product-systems`
- `subscription-entitlement-review`
- `refund-and-support-flow-review`
- `checkout-conversion-review`
- `usage-based-pricing-review`
- `marketplace-payouts-review`

### Mobile, games, and lifecycle systems

- `notification-strategy-review`
- `game-economy-review`
- `onboarding-activation-review`
- `daily-reward-and-streak-review`
- `ad-monetization-review`
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

### Marketplace and community

- `skill-marketplace-creator`
- `marketplace-product-ops`
- `moderation-trust-review`
- `creator-onboarding-review`
- `skill-eval-designer`
- `skill-catalog-generator`

## Roadmap waves

| Wave | Goal | Deliverables |
| --- | --- | --- |
| Wave 1 | Make the repo obviously useful. | 35 eval-backed preview skills, registry, README, CI, SOTA matrix, and completed P1/P2 pack seeds. |
| Wave 2 | Make the repo demonstrably better than prompt lists. | examples, before/after outputs, screenshots, static catalog, skill pages. |
| Wave 3 | Cover revenue systems deeply. | subscription-entitlement, checkout, refund/support, campaigns, game live ops. |
| Wave 4 | Cover trust and operations. | privacy, abuse/fraud, incidents, analytics, help center, changelogs. |
| Wave 5 | Build marketplace mechanics. | submissions, scoring, verified creators, install badges, private registry option. |
| Wave 6 | Build automation. | agent skill factory, eval gates, weekly research ingestion, auto-drafted PRs. |

## Definition of SOTA coverage

A category is SOTA-covered only when an agent can produce a concrete, product-safe artifact without generic filler: a state machine, decision table, launch checklist, event schema, support flow, risk ladder, or implementation-ready review. If a skill cannot change a real product decision, it is not done.
