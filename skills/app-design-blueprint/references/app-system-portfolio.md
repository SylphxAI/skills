# App System Portfolio

## 1. Capability record

For every canonical primitive and requested capability produce:

```text
capability_id and owner:
user value and app pillar:
canonical objects/state authority:
dependencies and collision boundary:
complete scale-ready target and verified slices:
numeric workload/failure envelope and proof:
build, availability, and presentation state:
dormant/off-state contract:
events, metrics, countermetrics, and experiments:
migration/version compatibility:
degradation, rollback, compensation, and forward-fix:
autonomous maintenance policy:
specialist artifact IDs required:
```

Build, proof, availability, and presentation are independent. `built` does not mean integrated, available, prominent, scale-verified, or production-proven.

## 2. Canonical capability sweep

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

### Refund Consequence Contract

App/game design declares semantics; `payment-platform-readiness` and `refund-and-support-flow-review` implement and adjudicate them.

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
- Do not automatically ban for one ordinary refund, revoke unrelated access, or create surprise negative balances.
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

Never condition the benefit on rating, review, positive sentiment, permission, ad click, spend, contact upload, forced share, or installing another product. Critical compatibility/security updates use minimum-version safety policy, not reward pressure.

### Cross-Promotion Placement Contract

Marketing owns campaign truth; app/game design owns the product surface.

```text
source and target product IDs:
recipient/user value and product-fit edge:
audience, age, territory, consent, entitlement and exclusions:
claim-proof IDs and publisher/house-ad disclosure:
placement, frequency, dismissal, suppression and cold-start prohibition:
universal/app/web link, installed/not-installed fallback and attribution:
reward qualification/reversal if any:
privacy, child, brand-safety, cannibalization and support controls:
holdout and incremental retained-value measurement:
```

Do not force downloads, scrape contacts, disguise promotion as system UI, interrupt critical work, or use one external-purchase route across territories with different authority.

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

Public review eligibility may not depend on inferred positivity, spend, rating prediction, vulnerability, or whether private feedback was negative.

## 4. Specialist routing matrix

| Artifact | Primary owner |
| --- | --- |
| Provider payment, ledger, settlement and entitlement projection | `payment-platform-readiness` |
| Refund consequence, repurchase, restriction, support and appeal | `refund-and-support-flow-review` |
| Subscription access state | `payment-platform-readiness` |
| Ad placement/monetization | `ad-monetization-review` |
| Notification channel strategy | `notification-strategy-review` |
| Daily rewards and streaks | `daily-reward-and-streak-review` |
| Referral qualification, grant, reversal and fraud | `referral-loop-review` |
| One promotion/update/cross-promotion campaign | `promotion-campaign-review` |
| Public review plus private feedback close-loop | `review-solicitation-and-feedback-loop` |
| Event/identity/metric instrumentation | `product-analytics-instrumentation-review` |
| Offline/sync conflict | `offline-sync-conflict-review` |
| Store/channel release evidence | `app-store-distribution-readiness` |
| Localized experience and LQA | `product-lifecycle-architect` for the cross-channel program; this blueprint owns app semantics |
| Multi-channel marketing control plane | `marketing-automation-blueprint` |

## 5. Dangerous interaction tests

Test combinations, not only isolated systems:

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

- Every canonical primitive has a capability record or exact hard-floor blocker.
- App availability and presentation never rely on arbitrary engagement progression.
- State owners, specialist artifact IDs, and collision boundaries are explicit.
- Refund, update, cross-promotion, and review contracts have idempotency, reversals, evidence, support, and abuse states.
- Dangerous combinations have automated fixtures and recovery proof.
- No specialist live fact is copied into the app blueprint.
