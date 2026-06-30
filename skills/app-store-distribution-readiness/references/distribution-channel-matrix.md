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

## Google Play

- store listing, short description, screenshots, feature graphic;
- data safety form and permission justifications;
- billing products/subscriptions and test tracks;
- pre-launch report issues;
- policy declarations for ads, families, health, finance, background location;
- refund/revoke event handling and support.

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
