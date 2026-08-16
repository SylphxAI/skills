# Distribution Channel Requirements

Verify current platform policies before launch. Current platform policy and
legal counsel govern legal conclusions.

## Common release details

For each selected channel, capture:

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
exact artifact and live readback:
```

Build each target artifact once, preserve its identity through packaging, and
use least-privilege publication credentials. Channel automation handles
retries, polling, concurrent updates, and idempotency according to the owning
platform API.

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
- testing, review, rollout/update and live readback;
- current [App Submission API](https://developer.amazon.com/docs/app-submission-api/overview.html) format/field/console-only constraints retrieved at use.

## Steam

- exact build, depot, branch, package, account, and territory identity;
- build-to-claim parity for achievements, cloud saves, controller support, supported languages, system requirements, and any Early Access state;
- demo, playtest, or Early Access build identity, availability, migration, and save-state compatibility when applicable;
- current price, DLC, refund, and support declarations only where they are release-facing facts that must match the shipped build;
- SteamPipe/steamcmd build/depot/branch automation, build-account permissions, released-build confirmation and exact live branch readback;
- Valve store-page/build review state and partner-only authority from [SteamPipe](https://partner.steamgames.com/doc/sdk/uploading) and [review process](https://partner.steamgames.com/doc/store/review_process).

Keep ownership explicit: store-page metadata belongs to Store Listing Optimization, media production belongs to Product Asset Production, wishlist/creator/community activation belongs to Marketing Automation, and go/no-go plus first-week health belongs to Launch Readiness Review. Distribution owns the exact submission, approval, build, branch, rollout, and live readback exchanged with those owners.

## Xbox, PlayStation, and Nintendo Switch

These are partner/certification routes, not public general release APIs.

- account/company/concept approval, agreements/NDA and product eligibility;
- SDK/tool/devkit access, representative hardware, platform services and technical requirements;
- package/signing, age/content ratings, privacy/commerce, multiplayer/cross-network and certification;
- submission finding/waiver state, corrective candidate, release scheduling and live store/build readback;
- public entry routes: [ID@Xbox](https://developer.microsoft.com/en-us/games/publish/), [PlayStation Partners](https://partners.playstation.net/), and [Nintendo process](https://developer.nintendo.com/the-process).

Keep partner-confidential rules in their authorized system and base readiness
on current authorized partner state.

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
- current [Apple notarization](https://developer.apple.com/documentation/security/notarizing-macos-software-before-distribution) requirements and notarization result.

## Web/direct download

- landing page, SEO, trust badges, changelog, system requirements;
- signed installer, auto-update, rollback;
- malware false-positive plan;
- license activation, support, refund route;
- data export and uninstall cleanup.
- for HTML5/PWA: Web App Manifest, service-worker version/update/recovery, storage eviction, offline/resume, keyboard/touch/pointer, browser compatibility, install/share/deep links, accessibility, low-bandwidth and progressive enhancement;
- current [Web App Manifest](https://www.w3.org/TR/appmanifest/), [Service Workers](https://www.w3.org/TR/service-workers/), [Push API](https://www.w3.org/TR/push-api/), and browser capabilities.

## Select channels

Verify every declared product channel. A channel-portfolio task may compare
Apple, Google, HTML5/web, Huawei, Samsung, Amazon, Microsoft/direct desktop,
macOS/direct, Linux/direct, Steam or other PC storefronts, and consoles. A
release task covers its declared channels. Each mobile target includes its own
iOS or Android result; HTML5/PWA receives equal treatment when selected.

## Common channel behavior

- Permission prompts occur at the moment of value.
- Notifications need channel purpose, quiet hours, and settings.
- Desktop apps need predictable startup/login item behavior.
- File associations and deep links provide safe failure and recovery.
- Local data location, backup, migration, and uninstall behavior are explicit.
- Auto-update includes a rollback, repair, or superseding release path.
- Subscription disclosures keep the same meaning across paywall, store metadata, screenshots, onboarding, support, and reviewer notes.
- Restore, refund, and revoke handling is server-authoritative, idempotent, observable, and support-readable.
- Reviewer materials include test accounts, sandbox products, paywall steps, restore and refund steps, privacy forms, permission justifications, rollout conditions, and named owners.
- A staged rollout watches purchase success, restore success, entitlement drift, refund and revoke processing, crash-free sessions, support volume, and notification opt-in and denial results.

## Subscription disclosures

Use this for iOS and Android subscription apps before store submission.

| Surface | Required content | Confirmation |
| --- | --- | --- |
| Paywall | Product name, price, billing period, trial/intro terms, renewal behavior, cancel route, restore action, support/refund link | screenshot/video, build number, localization owner |
| Store metadata | Matching subscription display names, descriptions, duration, price/offer terms, privacy/support URLs | App Store Connect / Play Console screenshots |
| Screenshots/previews | Accurate trial and renewal context; core value shown before the monetization claim | creative and locale review |
| Reviewer notes | Demo account, subscription test products, sandbox/Play test account, exact paywall/restore/refund/revoke steps, backend test flags | review package doc |
| Support page | Restore instructions, cancellation route by platform, refund route by platform, response SLA, entitlement troubleshooting | live URL and support macro |
| Server ledger | Transaction ID/order ID, original transaction/purchase token, product/base plan, entitlement state, source event, processed_at, idempotency key | database schema/runbook |

## Entitlement and refund integration

`build-payment-readiness` owns provider normalization, ledger, and entitlement
correctness. `review-refund-and-support-flow` owns spent or transferred value,
account action, support, appeal, and abuse semantics.

| Provider event | Release integration check |
| --- | --- |
| Purchase/renewal/acknowledgement | signed/provider lookup, ledger input, idempotency, entitlement projection and live probe |
| Cancellation/pause/grace/expiry | distinct normalized state, effective time, access messaging and reconciliation |
| Partial/full refund | quantity/amount/source lineage, adjusted grant/entitlement, spent/transferred-value specialist result |
| Refund reversal | new provider fact, idempotent recomputation and one resulting grant |
| Platform revoke/family revoke or regrant | source-specific entitlement recomputation that preserves unrelated access |
| Chargeback/dispute | dispute and appeal case, with bounded commerce or account action from the refund specialist |
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
- Restore means "resync the store purchase and server entitlement" while preserving a single subscription.
- Cancellation, partial/full refund, refund reversal, platform revocation, family-share revoke/regrant, chargeback/dispute, expiration, and support adjustment are distinct ledger facts and test paths.
- Refund/revoke events adjust only their source entitlement/value, record quantity/reason/source/effective time, and preserve unrelated account data according to the product contract.
- Provider notifications wake reconciliation after deduplication. Signed provider state and periodic pull reconciliation supply the durable projection for delayed, duplicated, and out-of-order events.
- Apple coverage includes current `REFUND`, `REFUND_REVERSED`, `REVOKE`, transaction revocation and applicable consumption-request flows. Google coverage includes RTDN status lookup plus Voided Purchases, including chargebacks and quantity-based partial refunds. Retrieve current official semantics at use.
- If store state and server state disagree, degrade paid features safely, show neutral support copy, and create an entitlement-drift alert.

## Reviewer submission materials

| Area | Apple materials | Google materials |
| --- | --- | --- |
| Testing | TestFlight build, internal/external tester notes, sandbox account, review credentials | Internal/closed track build, license tester, test card/instrument notes |
| IAP setup | Subscription group, product IDs, localized names/prices, StoreKit config if used | Product IDs, base plans/offers, Play Billing Library version, acknowledge path |
| Restore/refund | Restore button path, StoreKit transaction validation, server notification handler | Restore/resync path, RTDN/PubSub endpoint, purchase token validation |
| Privacy | App Privacy labels, ATT/tracking decision, SDK list, permission purpose strings | Data Safety form, SDK list, permission declarations, pre-launch report |
| Notifications | In-context permission ask, categories, quiet hours/preferences | Runtime notification permission where applicable, channel categories/preferences |
| Support | Support URL, privacy URL, subscription FAQ, refund/cancel macro | Support URL, privacy URL, subscription FAQ, refund/cancel macro |

## Healthy rollout conditions

- crash-free sessions meet the agreed target;
- purchase, acknowledgement, and validation rates remain within their expected range;
- restore succeeds and creates one entitlement;
- refund and revoke events reach entitlement state within the agreed interval;
- privacy labels and Data Safety answers match SDK and runtime behavior;
- push permission follows a demonstrated user-value moment;
- support routes, support guidance, and reviewer accounts work;
- entitlement reconciliation stays current.
