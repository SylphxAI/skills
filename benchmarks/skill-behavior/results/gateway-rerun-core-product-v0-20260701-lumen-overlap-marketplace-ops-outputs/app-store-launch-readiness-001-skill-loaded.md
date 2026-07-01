```text
Channels: App Store, Google Play
Product type: Mobile subscription app (iOS + Android) with IAP

Readiness matrix:
- App Store — metadata: name, subtitle, keywords, screenshots, preview video; policy: privacy labels, age rating, content review; payments: subscription products, IAP metadata, restore purchase path; testing: TestFlight beta + internal review; release: phased rollout; support: contact + refund/cancellation explanation
- Google Play — metadata: store listing, short description, screenshots, feature graphic; policy: data safety form, permission justifications, ads/families/finance declarations; payments: billing products/subscriptions, test tracks, license testing; testing: internal + closed/open tracks; release: staged rollout; support: contact + refund/revoke handling

OS/platform details:
- dist-os-1 — Request push notification permission at first moment of user value, not on app open; tie to a clear benefit string.
- dist-os-2 — Define notification channel purpose (Android) and usage description (iOS); respect quiet hours/DND; provide in-app settings.
- dist-os-5 — Confirm subscription state restores across reinstalls/devices; document restore purchase path and failure handling.
- dist-os-6 — Plan hotfix path for broken IAP/subscription release; keep previous build tagged and reviewable.

Launch blockers:
- Privacy labels (App Store) + Data safety form (Google Play) must match actual data collection — Owner: Product/Privacy
- Subscription IAP products created and approved in App Store Connect + Google Play Console with sandbox/ testers — Owner: Payments/Backend
- Restore purchase + refund/cancellation flow implemented and documented — Owner: Engineering
- Push notification permission copy finalized, timing validated against value moment — Owner: Product
- Screenshots, preview video, feature graphic finalized per device size and locale — Owner: Marketing/Design
- Review notes with test accounts, demo credentials, subscription info, and reviewer guidance submitted — Owner: Release Manager
- TestFlight (iOS) + internal testing track (Android) passing with no P1/P2 crashes — Owner: QA
- Support contact URL/email reachable and listed in both store listings — Owner: Support
- Age rating questionnaire completed for both stores — Owner: Product
- Staged rollout plan defined: percentage gates, monitoring window, rollback criteria — Owner: Release Manager
```
