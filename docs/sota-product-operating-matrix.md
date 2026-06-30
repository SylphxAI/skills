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
| Frequency | Common tasks attract stars and repeated use. | UI polish, accessibility, pricing, checkout, launch readiness, support flows |
| Revenue leverage | Better decisions can increase conversion, retention, ARPU, margin, or retained revenue. | usage pricing, checkout, payouts, referrals, ads, subscriptions, game economy |
| Failure cost | Mistakes create refunds, bans, churn, support load, data loss, policy rejection, inaccessible flows, or bad reviews. | payments, payouts, store review, accessibility, backup, desktop release |
| Agent gap | Base models often give generic advice without operational state, support, or metrics. | entitlements, usage billing, payout ledgers, Microsoft Store, live events |
| Cross-product reuse | Useful across SaaS, apps, games, utilities, developer tools, marketplaces, and web. | responsive UI, support ops, market research, backup, checkout, accessibility |
| Public attractiveness | Easy to demo and understand in a GitHub README. | before/after UI, checkout audit, retention diagnosis, Steam/Microsoft launch checklist |

## Master lifecycle matrix

| Lifecycle area | What agents must know | Current skill coverage | Next depth target |
| --- | --- | --- | --- |
| Strategy and wedge | Audience, pain, timing, differentiation, business model, proof target. | `product-lifecycle-architect`, `execution-simplification`, `market-research-synthesis` | decision memo and opportunity scoring |
| Market research | Competitors, reviews, pricing, store listings, complaints, pattern synthesis. | `market-research-synthesis` | review-mining and competitor matrix helpers |
| Product architecture | Core loop, onboarding, accounts, billing, settings, support, data, trust. | `product-lifecycle-architect`, `mobile-app-product-systems`, `onboarding-activation-review` | product-system blueprints by product type |
| UI craft/accessibility | Perceived speed, hierarchy, micro-details, accessibility, empty/loading/error states. | `interface-craft`, `mobile-first-ui-review`, `motion-transition-review`, `responsive-layout-review`, `accessibility-product-review`, `empty-state-and-loading-review` | design-system extractor and form UX |
| SaaS and usage pricing | Value metric, tiers, usage units, credits, trials, freemium, cancellation, expansion. | `saas-subscription-pricing`, `usage-based-pricing-review`, `pricing-page-critique` | calculators and pricing experiment helpers |
| Checkout, payments, payouts | Wallets, discounts, tax, payment errors, receipts, entitlements, seller balances, payout holds. | `checkout-conversion-review`, `payment-platform-readiness`, `subscription-entitlement-review`, `marketplace-payouts-review` | provider-specific ledgers and reconciliation scripts |
| Mobile monetization | Subscription, IAP, IAA, promotions, notifications, daily rewards, refunds. | `mobile-app-product-systems`, `ad-monetization-review`, `daily-reward-and-streak-review` | win-back campaign skill |
| Retention and live ops | Cohorts, lifecycle events, live events, rewards, notifications, fatigue, economy impact. | `retention-cohort-review`, `live-event-ops-review`, `notification-strategy-review`, `daily-reward-and-streak-review` | cohort dashboard examples |
| Game economy | Currency, sources/sinks, progression, ads, IAP, events, fairness. | `game-economy-review`, `ad-monetization-review`, `daily-reward-and-streak-review`, `live-event-ops-review` | economy simulation helper |
| Growth loops | Referral, promotion, positioning, SEO, landing conversion, launch narrative. | `referral-loop-review`, `promotion-campaign-review`, `product-positioning`, `seo-content-brief`, `landing-page-critique` | launch narrative and win-back skills |
| Distribution | App Store, Google Play, Steam, Microsoft Store, web/direct download. | `app-store-distribution-readiness`, `store-listing-optimization`, `steam-launch-readiness`, `microsoft-store-readiness`, `store-review-policy-risk`, `launch-readiness-review` | signed-download examples |
| Desktop OS | macOS, Windows, installer, update, tray/menu, permissions, credentials. | `desktop-os-integration`, `macos-release-readiness`, `windows-release-readiness`, `microsoft-store-readiness` | auto-update demos |
| Backup/data | Versioning, export, restore drills, sync, deletion, local/cloud data. | `backup-restore-design` | restore-drill templates and scripts |
| Developer tools | API/SDK/CLI onboarding, docs, examples, limits, usage pricing, errors, changelog. | `developer-tool-product-design`, `usage-based-pricing-review` | docs-to-first-success demo suite |
| Marketplaces | Submission, review, ranking, quality, payouts, disputes, moderation, support. | `marketplace-product-ops`, `marketplace-payouts-review`, `skill-marketplace-creator` | creator onboarding and scoring skills |
| Operations/support | Help center, refund, escalation, incident comms, analytics taxonomy. | `customer-support-operations`, `help-center-architecture`, `refund-and-support-flow-review`, `incident-communication-playbook`, `analytics-event-taxonomy` | support-macro and triage generators |
| Trust/compliance | Accessibility, privacy, data retention, abuse/fraud, policy risk, safe growth. | `accessibility-product-review`, `privacy-and-data-retention-review`, `store-review-policy-risk`, `abuse-fraud-risk-review` | moderation trust review |

## Current coverage proof

- 51 preview skills are live in `skills/`, each with `SKILL.md`, at least one reference, `agents/openai.yaml`, eval, behavior example, registry entry, and catalog page.
- The latest depth batch covers: `usage-based-pricing-review`, `marketplace-payouts-review`, `microsoft-store-readiness`, `store-review-policy-risk`, `live-event-ops-review`, `retention-cohort-review`, `referral-loop-review`, and `accessibility-product-review`.
- Earlier depth covers checkout, ads, daily rewards, Steam, developer tools, marketplace ops, macOS, Windows, payments, refunds, subscriptions, UI craft, launch, privacy, support, analytics, and incidents.

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

## Execution cadence

- Add useful skills in batches, but require eval coverage, behavior examples, and matrix placement for every skill.
- Deepen each skill with one reference file per hard domain before adding sprawling prose.
- Promote skills from preview only after forward-tests and public before/after demos.
- Weekly: pick one high-demand skill, add a state machine, decision table, event schema, and public demo.
- Monthly: refresh external directory status and issue #1 until at least two third-party directories list the repo.
