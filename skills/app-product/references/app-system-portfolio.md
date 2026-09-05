# App System Portfolio

## 1. Capability record

Evaluate every capability in the canonical sweep and every requested addition. Produce a proportionate record:

```text
capability and owner:
selection and exact reason:
user value and app pillar, or authority owner:
canonical objects/state authority:
dependencies and collision boundary:
complete selected target and tested paths:
numeric workload/failure envelope and observed result:
implementation, availability, and presentation state:
dormant/off-state contract:
events, metrics, countermetrics, and experiments:
migration/version compatibility:
degradation, rollback, compensation, and forward-fix:
maintenance policy:
specialist owner, contract, and acceptance checks where selected:
```

Selection, implementation, observed checks, availability, and presentation are
separate facts. Include requested and user-promise-essential capabilities,
reuse a complete shared primitive through an exact app integration, preserve a
zero-runtime extension point when concrete future compatibility warrants it,
and omit a system for a stated product-fit reason. An exact legal, platform,
trust, safety, rights, consent, authority, or physical boundary routes the
decision to its owner and defines the safe available path. A named dependency
includes its owner and the condition that resumes implementation.

## 2. Canonical capability sweep

Evaluate every category below. Select requested or user-promise-essential capabilities, reuse complete shared primitives where appropriate, preserve worthwhile zero-runtime extension points, and record product-fit or authority reasons for other systems. Appearance in this list creates evaluation coverage; product need and user promise determine whether a social, community, collaboration, commerce, AI, or other system enters the product.

Accessibility, privacy, security, recovery, observability, localization, performance, migration, and other cross-cutting qualities attach wherever they govern a selected capability.

### Identity and account

- guest/local identity, signup/sign-in, passkeys/federation where applicable;
- account recovery, device linking, merge, logout, session/security history;
- profiles, avatars/identity expression, privacy and discoverability;
- roles, teams/workspaces, parental/guardian modes, delegated administration;
- cross-device and cross-platform identity without accidental account splitting.

### Data lifecycle and continuity

- canonical data model and local/cloud authority;
- create/read/update/delete, drafts, autosave, history, undo/redo, version restore;
- offline queue, sync, conflict resolution, stale state, background/resume;
- backup/restore, import/export, portability, deletion, retention, account closure;
- schema migration, backward/forward compatibility, corruption recovery, audit.

### Core workflow and information architecture

- objects, tasks, navigation, deep links, search, filters, sort, saved views;
- templates/defaults/sample data, batch actions, automation, shortcuts;
- empty/loading/partial/error/permission/offline states;
- settings/preferences, notification controls, privacy controls, accessibility;
- support diagnostics, admin tools, audit trail, status and incident surfaces.

### Creation, content, and intelligence

- creation/editing, media/assets, provenance/rights, versioning, collaboration;
- content catalog/feed/discovery/recommendation, freshness and quality;
- AI/agent assistance, explainability, confirmation, provenance, cost and abuse bounds;
- UGC publishing, moderation, reports, appeals, deletion, ranking and discovery;
- user-controlled personalization and model/profile reset.

### Collaboration and social

- invite, accept/decline, roles/permissions, presence, comments, mentions, activity;
- real-time/asynchronous co-work, conflict, reconnect, handoff and notifications;
- friends/follows/groups/community only where the user-value contract supports them;
- block/mute/report, privacy, age modes, anti-spam, abuse and moderation;
- sharing preview, permissions, expiry, revocation, recipient fallback and deep link.

### Engagement and lifecycle

- goals/progress/milestones, reminders, inbox, widgets, email/push/in-app channels;
- meaningful missions/checklists, streaks with repair, comeback/recap and new-value education;
- update education and verified adoption benefits;
- portfolio cross-promotion, referrals and shareable identity/value artifacts;
- review solicitation, private feedback, support, telemetry and close-loop integration.

### Commerce and monetization

- free/paid/subscription/usage/IAP/IAA/hybrid capability contracts;
- catalog, offer, checkout, receipt, ledger, entitlement, restore and support;
- upgrade/downgrade, trial, renewal, grace, cancellation, refund/revoke/chargeback;
- rewarded ads and grants, frequency/fatigue, consent and payer treatment;
- pricing/value clarity, tax/territory/channel authority, spend/fraud controls.

The app blueprint owns only the intended product semantics. Provider transaction and refund enforcement details belong to their specialists.

### Integrations and ecosystem

- public API, webhooks, import/export connectors, automation triggers/actions;
- deep links/universal links/app links, file associations, share targets, widgets;
- SDK adapters for analytics, crash, attribution, consent, ads, commerce, push, remote config, experimentation, support;
- partner sandbox, rate limits, retries, idempotency, versioning, isolation and kill switches.

### Quality, trust, and operations

- responsive platform/input adapters, HTML5/PWA, accessibility, i18n/culturalization;
- startup, low-end, low-bandwidth, memory/storage/network/battery/thermal tiers;
- privacy, consent, security, account recovery, abuse/fraud, child and regulated modes;
- observability, support, moderation, backups, incidents, migrations and shutdown;
- autonomous content, localization, dependency, capacity, support, safety and recovery loops.

## 3. Integration contracts

Create an integration contract and specialist handoff for an included capability or shared primitive used by the app. A preserved extension point receives only its zero-runtime boundary check. An omitted or authority-owned system records its reason and safe available path. Providers, SDKs, permissions, telemetry, jobs, assets, networks, and attack-surface dependencies exist only for selected runtime capabilities.

### Monetization Value Exchange Contract

The app blueprint owns the intended value exchange and priority between models. Pricing, provider transactions, advertising, and refund consequences remain specialist artifacts.

```text
buyer, payer and beneficiary:
valuable capability/outcome being exchanged:
primary model: one-time | subscription | usage | IAP | IAA | hybrid
secondary model and why it does not undermine the primary:
free/default utility and paid boundary:
purchase/upgrade moment after value is understood:
payer, non-payer, child, territory and platform treatment:
retained-value, conversion, refund, regret, support and cannibalization measures:
pricing/packaging, payment, advertising and refund handoff requests:
```

Rules:

- When monetization is selected, state one primary commercial model and keep any alternatives explicitly subordinate. A free, public-interest, bundled, or otherwise non-commercial app may omit commerce for its business model and keep payment and advertising runtime absent.
- Where the app creates honest durable or recurring paid value, evaluate purchase, IAP, or subscription as the primary exchange before relying on interruption-based IAA. Paid mechanics require credible paid value.
- Ads are a contextual or supplementary model unless product evidence supports them as primary. Preserve useful core behavior, consent, age modes, payer/ad-free treatment, startup and low-end budgets.
- Use `price-saas-subscription` when subscription/SaaS packaging is the independent decision, and `build-payment-readiness` for provider/ledger correctness. In-product advertising stays with the owning product design.

### Refund Consequence Contract

App/game design declares semantics; `build-payment-readiness` and `operate-customer-support` implement and adjudicate them.

```text
purchase/entitlement/value type:
unspent and precisely reversible value:
consumed, transferred, competitive, and irreversible value:
user-created data or unrelated access to preserve:
provider-confirmed refund/revoke/chargeback transitions:
entitlement downgrade/end/read-only/export behavior:
commerce restriction evidence threshold and expiry:
repurchase/restoration path:
support, appeal, audit, idempotency, and reconciliation:
product-quality reason feedback:
```

Rules:

- An ordinary confirmed refund removes or adjusts the refunded entitlement/value; it is not consequence-free.
- Entitlement reconciliation and account punishment are separate decisions.
- One ordinary refund adjusts only the refunded entitlement or value. Bans, unrelated access changes, and negative balances require separate fraud or ledger authority and evidence.
- For spent/irreversible value, use a transparent ledger policy, bounded commerce or transfer restriction where evidence justifies it, and an appealable abuse ladder.
- Confirmed fraud or repeated high-confidence abuse may progress through inform, reconcile, limit commerce, independent review, suspend, and ban; every action needs evidence, expiry/review, and appeal.
- Preserve user-created data with a disclosed read-only/export/deletion window where practical after paid access ends.

### Release Benefit And Compensation Contract

```text
reason: celebration | new-capability-adoption | migration | incident-compensation
source and target signed versions:
eligibility and excluded states:
verified activation/value event:
authoritative idempotent grant and retry/offline behavior:
economy or entitlement effect and cap:
expiry/post-expiry conversion:
fraud, reversal, support, and compensation:
```

Condition the benefit on the declared version, eligibility, and verified activation or value event. Ratings, reviews, sentiment, permissions, ad clicks, spend, contact upload, sharing, and other-product installation remain independent user choices. Critical compatibility/security updates use minimum-version safety policy, not reward pressure.

### Cross-Promotion Placement Contract

Marketing owns campaign truth; app/game design owns the product surface.

```text
source and target product IDs:
recipient/user value and product-fit edge:
audience, age, territory, consent, entitlement and exclusions:
claim sources and publisher-ad disclosure:
placement, frequency, dismissal, suppression and cold-start prohibition:
universal/app/web link, installed/not-installed fallback and attribution:
reward qualification/reversal if any:
privacy, child, brand-safety, cannibalization and support controls:
holdout and incremental retained-value measurement:
```

Cross-promotion is voluntary, permission-scoped, clearly presented as promotion, placed outside critical work, and routed through current territory-specific purchase authority.

### Review And Feedback Handoff

```text
meaningful-value event IDs eligible for neutral review consideration:
platform-specific review adapter and current-policy record:
private feedback entry points available to everyone:
support and safety escalation events:
analytics/quality context allowed under consent:
cooldown, suppression, age/territory and accessibility:
close-loop status and product candidate linkage:
```

Public review eligibility remains neutral across inferred sentiment, spend, rating prediction, vulnerability, and private-feedback outcome.

## 4. Specialist routing matrix

| Artifact | Primary owner |
| --- | --- |
| App monetization model and value-exchange semantics | owning product design |
| Subscription/SaaS price and package decision | `price-saas-subscription` |
| Provider payment, ledger, settlement and entitlement projection | `build-payment-readiness` |
| Refund consequence, repurchase, restriction, support and appeal | `operate-customer-support` |
| Subscription access state | `build-payment-readiness` |
| Ad placement/monetization | owning product design |
| Notification channel strategy | `review-domain` (`notification-strategy`) |
| Daily rewards and streaks | `review-domain` (`daily-reward-and-streak`) |
| Referral qualification, grant, reversal and fraud | owning product design |
| One promotion/update/cross-promotion campaign | owning product design |
| Platform-specific authentic public review request policy | `run-product-feedback-loop` |
| Universal private feedback, review ingestion and product-learning close-loop | `run-product-feedback-loop` |
| Event/identity/metric instrumentation | owning product repository |
| Offline/sync conflict | `design-offline-sync` |
| Store/channel release evidence | `build-distribution-readiness` |
| Localized experience semantics | owning product design |
| Deterministic product capture, cross-channel asset transformation, localized production and LQA pack | `produce-product-assets` |
| Multi-channel marketing control plane | owning product design |
| Cross-domain release dependencies and sibling artifacts | active product release plan and each artifact's owning project |

## 5. Dangerous interaction tests

Test applicable combinations among selected capabilities. A preserved extension point also checks that its module remains dormant and zero-cost.

- refund after consumable/reward was spent, transferred, shared, or used competitively;
- update benefit retried offline or reversed after rollback;
- cross-promo reward plus referral reward plus refund/chargeback;
- review prompt coinciding with failure, support case, minor mode, or paid event;
- account merge across web/mobile/store entitlements and different locales;
- offline edit plus collaborator delete/role revoke/schema migration;
- notification deep link into expired, unauthorized, refunded, or deleted state;
- app downgrade while user-created premium data exists;
- SDK disabled by consent or kill switch during startup/retry;
- HTML5 storage eviction, browser upgrade, background suspension, and restored session;
- low-memory/low-bandwidth mode with localization expansion and assistive technology;
- automated model proposes a change that improves engagement but worsens refund, complaint, accessibility, or child-safety floors.

## 6. Completion check

- Every swept capability has a defensible selection reason; every requested or user-promise-essential legitimate capability is included or uses an exact shared primitive unless an authority boundary owns the decision.
- Omission rests on product fit, audience, business model, attention, semantics, platform, or physical reality.
- Selected app capabilities are available through semantic access conditions; preserved extension points and omitted systems remain absent from the runtime.
- State owners, conditional specialist revisions, and collision boundaries are explicit.
- Selected refund, update, cross-promotion, and review contracts have idempotency, reversals, evidence, support, and abuse states.
- Selected dangerous combinations have automated fixtures and recovery proof.
- Specialist live facts stay with their owning product and release surfaces.
- A narrow utility carries only the social, community, commerce, or AI runtime selected by its product promise.
