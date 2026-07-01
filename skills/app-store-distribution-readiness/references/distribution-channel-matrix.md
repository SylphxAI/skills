# Distribution Channel Matrix

Always verify current platform policies before launch; this reference is a product-readiness synthesis, not legal advice.

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

## Steam

- capsule art, trailer, screenshots, tags, supported languages;
- demo/wishlist strategy;
- achievements, cloud saves, controller support;
- early access communication if applicable;
- refund expectation and save-state handling;
- community hub and patch notes.

## Microsoft Store / Windows

- package identity, installer/MSIX, screenshots, age rating;
- IAP/subscription support if used;
- Windows notification, startup, file association, uninstall, update behavior;
- privacy policy and support links;
- certification and crash/quality readiness.

## Web/direct download

- landing page, SEO, trust badges, changelog, system requirements;
- signed installer, auto-update, rollback;
- malware false-positive plan;
- license activation, support, refund route;
- data export and uninstall cleanup.

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

```text
not_subscribed -> purchase_started -> purchased_pending_validation
purchased_pending_validation -> active_entitled -> renewed
active_entitled -> billing_retry_or_grace -> active_entitled | expired
active_entitled -> upgraded_or_downgraded -> active_entitled
active_entitled -> user_canceled -> active_until_period_end -> expired
active_entitled -> refund_or_revoke_event -> entitlement_revoked -> support_reviewable
expired -> restore_or_resubscribe -> active_entitled
unknown_or_drift -> server_reconciliation -> active_entitled | expired | support_reviewable
```

Rules:

- App UI may cache entitlement briefly, but server ledger is the source of truth.
- Restore means "resync the store purchase and server entitlement"; it should not create a duplicate subscription.
- Refund/revoke events should remove paid entitlement promptly, record reason/source, and preserve account data according to retention policy.
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
