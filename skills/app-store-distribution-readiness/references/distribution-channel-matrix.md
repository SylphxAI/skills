# Distribution Channel Matrix

Always verify current platform policies before launch; this reference is a product-readiness synthesis, not legal advice.

## Common release-control contract

```text
prepare -> validate -> build -> attest -> sign
-> notarize_or_certify_if_required
-> upload -> poll_processing -> submit_review -> poll_review
-> stage -> promote | halt
-> live_readback -> supersede | withdraw
```

Every target channel needs an official-source record and explicit support for each transition. Portal-only or external-review steps are typed states, not invisible manual checkboxes. Build once and promote the exact digest; external effects use idempotency, durable receipts, retry/backoff, polling, locks, observed-state reconciliation and least-privilege identities.

Required channel record:

```text
product/channel/territory/audience:
account, agreement, partner and first-submission authority:
API vs portal/partner-only transitions:
package/signing/notarization/certification:
identity/commerce/refund/social/cloud/achievement services:
metadata/assets/locales/ratings/privacy declarations:
testing tracks/branches and representative hardware:
staged rollout, halt, withdraw, rollback/supersede:
official URL/section, effective_at, retrieved_at, expires_at, digest:
exact artifact and live readback evidence:
```

## App Store

- listing name, subtitle, keywords, screenshots, preview video;
- privacy disclosures and data collection truth;
- subscription/IAP metadata and restore purchase path;
- review notes for login, test accounts, special permissions;
- cancellation/refund support explanation;
- age rating and content policy review;
- push notification purpose and permission timing.
- subscription disclosure parity across paywall, App Store metadata, screenshots, and review notes: price, period, free trial, renewal, cancellation route, restore, family sharing if applicable, and support/refund path.
- App Store Server Notifications / StoreKit transaction reconciliation for purchase, renewal, cancellation, billing retry, grace period, refund/revoke, upgrade, downgrade, and expiration.

## Google Play

- store listing, short description, screenshots, feature graphic;
- data safety form and permission justifications;
- billing products/subscriptions and test tracks;
- pre-launch report issues;
- policy declarations for ads, families, health, finance, background location;
- refund/revoke event handling and support.
- base plans/offers disclosure parity across paywall, Play listing, screenshots, and review notes: price, period, trial/intro price, renewal, cancellation route, restore/resync, support/refund path.
- Real-time developer notifications and Play Developer API reconciliation for purchase, acknowledge, renewal, cancellation, pause, hold, grace, refund/revoke, upgrade, downgrade, and expiration.

Current automation route: [Google Play Developer API](https://developers.google.com/android-publisher), transactional [Edits](https://developers.google.com/android-publisher/edits), and [Reporting API](https://developers.google.com/play/developer/reporting). Current Edits guidance has first-publication prerequisites and concurrent console changes can invalidate an open edit; retrieve the exact current rule.

## Huawei AppGallery

- partner/account and app registration state;
- package, signing, device/service compatibility and territories;
- localized listing, privacy/data, permissions, commerce and content rating;
- testing, review, rollout, support and live readback;
- current [AppGallery Connect Publishing API](https://developer.huawei.com/consumer/en/doc/AppGallery-connect-Guides/agcapi-publish_api_overview-0000001158365043) operations/auth/region limits retrieved at use.

## Samsung Galaxy Store

- Seller Portal/commercial status and existing-app registration prerequisite;
- package, device/region compatibility, IAP, listing assets/locales and privacy;
- submission, closed testing, staged rollout, statistics and live readback;
- current [Galaxy Store Developer API](https://developer.samsung.com/galaxy-store/galaxy-store-developer-api.html) capabilities and portal-only first registration retrieved at use.

## Amazon Appstore

- existing-app/first-version authority and supported package format;
- Fire/Android device capability, IAP, privacy, listing assets and locales;
- testing, review, rollout/update and live evidence;
- current [App Submission API](https://developer.amazon.com/docs/app-submission-api/overview.html) format/field/console-only constraints retrieved at use.

## Steam

- exact build, depot, branch, package, account, and territory identity;
- build-to-claim parity for achievements, cloud saves, controller support, supported languages, system requirements, and any Early Access state;
- demo, playtest, or Early Access build identity, availability, migration, and save-state compatibility evidence when applicable;
- current price, DLC, refund, and support declarations only where they are release-facing facts that must match the shipped build;
- SteamPipe/steamcmd build/depot/branch automation, build-account permissions, released-build confirmation and exact live branch readback;
- Valve store-page/build review state and partner-only authority from [SteamPipe](https://partner.steamgames.com/doc/sdk/uploading) and [review process](https://partner.steamgames.com/doc/store/review_process).

Keep ownership explicit: store-page metadata belongs to Store Listing Optimization, media production belongs to Product Asset Production, wishlist/creator/community activation belongs to Marketing Automation, and go/no-go plus first-week health belongs to Launch Readiness Review. Distribution owns the exact submission, approval, build, branch, rollout, and live-readback evidence exchanged with those owners.

## Xbox, PlayStation, and Nintendo Switch

These are partner/certification routes, not public general release APIs.

- account/company/concept approval, agreements/NDA and product eligibility;
- SDK/tool/devkit access, representative hardware, platform services and technical requirements;
- package/signing, age/content ratings, privacy/commerce, multiplayer/cross-network and certification;
- submission finding/waiver state, corrective candidate, release scheduling and live store/build readback;
- public entry routes: [ID@Xbox](https://developer.microsoft.com/en-us/games/publish/), [PlayStation Partners](https://partners.playstation.net/), and [Nintendo process](https://developer.nintendo.com/the-process).

Do not copy partner-confidential rules into a reusable skill or claim readiness before authorized current evidence.

## Microsoft Store / Windows

- package identity, installer/MSIX, screenshots, age rating;
- IAP/subscription support if used;
- Windows notification, startup, file association, uninstall, update behavior;
- privacy policy and support links;
- certification and crash/quality readiness.
- current [Microsoft Store Developer CLI](https://learn.microsoft.com/windows/apps/publish/msstore-dev-cli/overview) and [Submission API](https://learn.microsoft.com/windows/apps/publish/store-submission-api) support/preview/first-submission/product constraints retrieved at use.

## macOS direct

- Developer ID signing, hardened runtime/entitlements, notarization and stapling;
- signed installer/update manifest, downgrade/rollback or superseding build, malware false-positive handling;
- privacy permissions, file associations, login items, uninstall/data paths and support;
- current [Apple notarization](https://developer.apple.com/documentation/security/notarizing-macos-software-before-distribution) authority and live notarization evidence.

## Web/direct download

- landing page, SEO, trust badges, changelog, system requirements;
- signed installer, auto-update, rollback;
- malware false-positive plan;
- license activation, support, refund route;
- data export and uninstall cleanup.
- for HTML5/PWA: Web App Manifest, service-worker version/update/recovery, storage eviction, offline/resume, keyboard/touch/pointer, browser compatibility, install/share/deep links, accessibility, low-bandwidth and progressive enhancement;
- current [Web App Manifest](https://www.w3.org/TR/appmanifest/), [Service Workers](https://www.w3.org/TR/service-workers/), [Push API](https://www.w3.org/TR/push-api/), and browser capability evidence.

## Channel sweep completion

For every declared product, evaluate Apple, Google, HTML5/web, Huawei, Samsung, Amazon, Microsoft/direct desktop, macOS/direct, Linux/direct, Steam/other PC storefronts, and console channels. `not applicable` requires a product-format, authority, audience, safety, or semantic reason—not human effort or speculative ROI. iOS and Android evidence is mandatory for a declared mobile product; HTML5/PWA is first-class when applicable.

## OS detail checklist

- `dist-os-1` — Permission prompts should occur at the moment of value.
- `dist-os-2` — Notifications need channel purpose, quiet hours, and settings.
- `dist-os-3` — Desktop apps need predictable startup/login item behavior.
- `dist-os-4` — File associations and deep links must fail safely.
- `dist-os-5` — Local data location, backup, migration, and uninstall behavior must be intentional.
- `dist-os-6` — Auto-update must have rollback or recovery path for broken releases.
- `dist-store-7` — Subscription disclosure text must be identical in meaning across paywall, store metadata, screenshots, onboarding, support, and reviewer notes.
- `dist-store-8` — Restore/refund/revoke handling must be server-authoritative, idempotent, observable, and support-readable.
- `dist-store-9` — Reviewer packages need durable evidence: test accounts, sandbox products, paywall steps, restore/refund steps, privacy forms, permission justifications, rollout gates, and named owners.
- `dist-store-10` — Staged rollout gates should include purchase success, restore success, entitlement drift, refund/revoke processing, crash-free sessions, support volume, and notification opt-in/denial metrics.

## Subscription disclosure matrix

Use this for iOS and Android subscription apps before store submission.

| Surface | Required content | Evidence |
| --- | --- | --- |
| Paywall | Product name, price, billing period, trial/intro terms, renewal behavior, cancel route, restore action, support/refund link | screenshot/video, build number, localization owner |
| Store metadata | Matching subscription display names, descriptions, duration, price/offer terms, privacy/support URLs | App Store Connect / Play Console screenshots |
| Screenshots/previews | No misleading "free" claim without trial/renewal context; core value shown before monetization claim | creative approval and locale matrix |
| Reviewer notes | Demo account, subscription test products, sandbox/Play test account, exact paywall/restore/refund/revoke steps, backend test flags | review package doc |
| Support page | Restore instructions, cancellation route by platform, refund route by platform, response SLA, entitlement troubleshooting | live URL and support macro |
| Server ledger | Transaction ID/order ID, original transaction/purchase token, product/base plan, entitlement state, source event, processed_at, idempotency key | database schema/runbook |

## Entitlement and refund state model

This section is a release-evidence taxonomy, not the canonical product consequence policy. Consume exact `payment-platform-readiness` and `refund-and-support-flow-review` artifact IDs/versions/digests for provider normalization, spent/transferred value, account action, support, appeal and abuse semantics.

| Provider evidence class | Canonical release proof required |
| --- | --- |
| Purchase/renewal/acknowledgement | signed/provider lookup, ledger input, idempotency, entitlement projection and live probe |
| Cancellation/pause/grace/expiry | distinct normalized state, effective time, access messaging and reconciliation |
| Partial/full refund | quantity/amount/source lineage, adjusted grant/entitlement, spent/transferred-value specialist result |
| Refund reversal | new provider fact, idempotent recomputation and restoration proof without duplicate grant |
| Platform revoke/family revoke or regrant | source-specific entitlement recomputation that preserves unrelated access |
| Chargeback/dispute | dispute state, evidence/appeal, bounded commerce/account action from the refund specialist |
| Restore/account merge | original transaction/token lineage, cross-channel precedence and duplicate prevention |
| Missed/duplicate/out-of-order notification | periodic provider pull, deterministic ledger replay and correction event |

```text
not_subscribed -> purchase_started -> pending_validation -> active_entitled
active_entitled -> renewed | upgraded | downgrade_scheduled
active_entitled -> billing_retry_or_grace -> active_entitled | expired
active_entitled -> user_canceled -> active_until_period_end -> expired

active_entitled -> refund_detected -> refunded_partial | refunded_full
refunded_partial -> quantity_or_entitlement_adjusted -> recomputed_entitlement
refunded_full -> refunded_entitlement_revoked -> recomputed_entitlement
refunded_partial | refunded_full -> refund_reversed -> recomputed_entitlement

active_entitled -> platform_revoke -> revoked -> recomputed_entitlement
active_entitled -> chargeback_or_dispute -> commerce_limited_or_revoked -> appeal_or_resolution
active_entitled -> family_shared -> family_revoked -> recomputed_entitlement

expired | recomputed_entitlement -> restore_or_resubscribe -> pending_validation -> active_entitled
unknown_or_drift -> server_reconciliation -> active_entitled | limited | expired | support_reviewable
```

Rules:

- App UI may cache entitlement briefly, but server ledger is the source of truth.
- Restore means "resync the store purchase and server entitlement"; it should not create a duplicate subscription.
- Cancellation, partial/full refund, refund reversal, platform revocation, family-share revoke/regrant, chargeback/dispute, expiration, and support adjustment are distinct ledger facts and test paths.
- Refund/revoke events adjust only their source entitlement/value, record quantity/reason/source/effective time, and preserve unrelated account data according to the product contract.
- Provider notifications are deduplicated wake-up/evidence inputs, not the sole durable projection. Validate signed/provider truth and run periodic pull reconciliation for missed, delayed, duplicated and out-of-order events.
- Apple evidence should cover current `REFUND`, `REFUND_REVERSED`, `REVOKE`, transaction revocation and applicable consumption-request flows; Google evidence should cover RTDN status lookup plus Voided Purchases backstop, including chargebacks and quantity-based partial refunds. Retrieve current official semantics at use.
- If store state and server state disagree, degrade paid features safely, show neutral support copy, and create an entitlement-drift alert.

## Reviewer evidence package

| Area | Apple evidence | Google evidence |
| --- | --- | --- |
| Testing | TestFlight build, internal/external tester notes, sandbox account, review credentials | Internal/closed track build, license tester, test card/instrument notes |
| IAP setup | Subscription group, product IDs, localized names/prices, StoreKit config if used | Product IDs, base plans/offers, Play Billing Library version, acknowledge path |
| Restore/refund | Restore button path, StoreKit transaction validation, server notification handler | Restore/resync path, RTDN/PubSub endpoint, purchase token validation |
| Privacy | App Privacy labels, ATT/tracking decision, SDK list, permission purpose strings | Data Safety form, SDK list, permission declarations, pre-launch report |
| Notifications | In-context permission ask, categories, quiet hours/preferences | Runtime notification permission where applicable, channel categories/preferences |
| Support | Support URL, privacy URL, subscription FAQ, refund/cancel macro | Support URL, privacy URL, subscription FAQ, refund/cancel macro |

## Staged rollout gates

Do not advance rollout if any gate is red:

- crash-free sessions below the agreed threshold;
- purchase success, acknowledgement, or validation failure spikes;
- restore success rate below target or duplicate entitlement creation occurs;
- refund/revoke events are delayed, dropped, or not reflected in entitlement state;
- privacy labels/Data Safety answers no longer match SDK/runtime behavior;
- push permission ask happens before a demonstrated user-value moment;
- support contact route, support macro, or reviewer account stops working;
- entitlement drift alert is unresolved.
