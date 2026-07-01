<think>
The user wants a concise, audit-friendly distribution readiness plan for an iOS and Android subscription app. They want specific artifacts: IAP setup, privacy labels, screenshots, review notes, TestFlight/internal testing, support contact, refund/restore flow, push notification permission, and staged rollout.

I need to follow the skill output format and stay within 650 words. Let me structure this clearly.
</think>

```text
Channels: Apple App Store (iOS/iPadOS), Google Play (Android)
Product type: Subscription app (auto-renewable subscription + optional IAP)
```

## Readiness Matrix

### Apple App Store
- **Metadata**: App name, subtitle (30 chars), promotional text, keywords (100 chars, comma-separated, no competitor names), category, age rating via Questionnaire; localized for each supported locale.
- **Screenshots**: 6.7", 6.5", 5.5" iPhone plus 12.9" iPad if universal. First two slots must communicate value in <3 seconds. No status-bar overlays.
- **Privacy labels (App Store Connect → App Privacy)**: Declare every data category collected, even if only via SDKs (analytics, crash, auth). Mark data as linked, tracked, or used for tracking. Submit Nutrition Labels before submission.
- **IAP / Subscriptions**:
  - Configure subscription group with auto-renewable products; set localized price tier per locale.
  - Provide display name, description, duration, free-trial wording matching the actual product.
  - Implement **StoreKit 2** (preferred) for `Product`, `Transaction`, `currentEntitlements`. Fallback path to StoreKit 1 documented.
  - **Restore Purchase** button visible in Settings; calls `Transaction.currentEntitlements`.
  - Server-side receipt or `Transaction.jwsRepresentation` validation; signed `AppStoreServerNotification` v2 webhook for lifecycle events.
- **Review notes (App Store Connect → Review Information)**:
  - Demo account credentials (role: subscriber / non-subscriber).
  - Exact steps to trigger each paywall and the restore path.
  - Sign-in backdoor if SSO.
  - Note any VPN, location, or push permission required for core flow.
  - Sample upgrade/downgrade/crossgrade scenarios.
- **TestFlight**:
  - Internal: up to 100 members, no review, sandbox purchases with Apple ID test accounts.
  - External: up to 10,000 testers, requires beta review, build expiration 90 days.
  - Add `What to Test` notes per build; clear prior builds before promoting.
  - Sandbox subscription renewal acceleration: 3 min (1 mo), 3 min (1 yr) etc.
- **Push**: Request `UNUserNotification` permission **in context** (after onboarding value moment, never at first launch). Provide provisional authorization if supported. Register categories for support actions.

### Google Play
- **Metadata**: Short (80 chars) and full (4000 chars) descriptions, app icon, feature graphic (1024×500), 2–8 phone screenshots.
- **Data Safety form**: Mirror actual SDK behavior. Declare encryption in transit, account data, app activity, optional data. Submit before each release that changes collection.
- **Billing**:
  - Use **Google Play Billing Library 7+** with BillingClient and `queryProductDetailsAsync`.
  - Configure base plans + offers (free trial, intro price, upgrade); ack each within 24 h.
  - Real-time developer notifications via Pub/Sub; process `SUBSCRIPTION_PURCHASED`, `SUBSCRIPTION_RENEWED`, `SUBSCRIPTION_CANCELED`, `SUBSCRIPTION_REVOKED`.
- **Internal testing**: Closed track up to 100 testers, instant publish; use license-test accounts for IAP (response codes). **Closed/Open** for staged alpha/beta.
- **Review notes**: Provide test account, sandbox instructions, refund/restore path.

### Refund / Restore (shared)
- In-app **Restore Purchases** (App Store) and **Restore** (Play) entry points on Settings and Paywall.
- Web support page with direct contact; honor App Store refund decisions; handle `revoked` event by revoking server-side entitlement within one cycle.

### Support & Trust
- Support URL (HTTPS, mobile-rendered), Privacy Policy URL, Marketing URL optional. Both stores require reachable support contact before submission.

### Staged Rollout
- **iOS**: Release manually to 1% / 2% / 5% / 10% / 20% / 50% / 100% over 7 days; monitor crash-free sessions ≥ 99.5% before each step.
- **Android**: Play Console staged rollout 1% → 5% → 10% → 25% → 50% → 100% with halt-on-crash threshold. Maintain rollback-ready prior artifact.

## OS / Platform Details
- `dist-os-1` Permission prompt fires only after the user encounters the feature that needs it.
- `dist-os-2` Push permission requested in context; in-app notification preferences for category opt-outs.
- `dist-os-5` Entitlement state stored server-side; client state cached locally with migration on app update.
- `dist-os-6` No client-side auto-update on iOS/Android — but server must validate subscription on every launch and on silent push to revoke on refund.

## Launch Blockers
- App Privacy labels not yet complete — owner: PM.
- Privacy Policy URL missing or returns 404 — owner: Web.
- Restore Purchase button absent in shipped build — owner: Mobile lead.
- Real-time developer notification endpoint not ACK-ing Play Pub/Sub — owner: Backend.
- Subscription products not acknowledged within 24 h — owner: Billing engineer.
- TestFlight internal build on prior SDK version — owner: Mobile lead.
- Screenshots in only one locale — owner: Localization.
- Support mailbox unmonitored — owner: CX.
- Crash-free sessions < 99.5% on TestFlight — owner: Mobile lead.

## Pre-Submission Checklist
- [ ] Sandbox purchase verified on both platforms
- [ ] Restore path exercised end-to-end
- [ ] Refund (Play) and revoke (both) revoke entitlement server-side
- [ ] Privacy labels and Data Safety form published
- [ ] Screenshot set approved per device class
- [ ] Support and Privacy URLs live
- [ ] Staged rollout percentages and halt thresholds configured
- [ ] Rollback artifact tagged in both stores
