Below is a concise, audit-friendly launch checklist for an iOS and Android subscription app.

---

# Subscription App Launch Checklist

## 1. In-App Purchase / Subscription Setup

### iOS — App Store Connect

**Required setup**
- Create subscription group.
- Add subscription products:
  - Monthly plan
  - Annual plan
  - Optional free trial or intro offer
- Product IDs should be stable and descriptive, e.g.:
  - `com.company.app.subscription.monthly`
  - `com.company.app.subscription.annual`
- Add localized display names and descriptions.
- Configure pricing tiers and territories.
- Add subscription duration and renewal behavior.
- Enable grace period if supported.
- Configure App Store Server Notifications v2 endpoint.
- Add shared secret or App Store Server API key for receipt validation.
- Confirm paid agreement, tax, and banking are active.

**App requirements**
- Use StoreKit 2 where possible.
- Validate purchases server-side.
- Unlock premium access only after verified entitlement.
- Include “Restore Purchases” in settings/paywall.
- Handle:
  - active subscription
  - expired subscription
  - billing retry
  - grace period
  - revoked/refunded purchase
  - upgrade/downgrade
  - family sharing if enabled

---

### Android — Google Play Console

**Required setup**
- Create subscription products.
- Configure base plans:
  - Monthly
  - Annual
- Configure offers:
  - Free trial, if applicable
  - Intro pricing, if applicable
- Product IDs should match internal entitlement mapping, e.g.:
  - `premium_monthly`
  - `premium_annual`
- Activate products before release.
- Configure Real-time Developer Notifications.
- Link Google Cloud Pub/Sub topic.
- Enable Play Developer API access.
- Confirm payments profile is complete.

**App requirements**
- Use Google Play Billing Library current supported version.
- Acknowledge purchases within required window.
- Validate purchases server-side.
- Handle:
  - active subscription
  - expired subscription
  - account hold
  - grace period
  - pause/resume
  - cancellation
  - refund/revocation
  - upgrade/downgrade

---

## 2. Privacy Labels and Data Safety

### iOS App Privacy — App Store Connect

Complete privacy nutrition labels for all data collected by the app and SDKs.

Audit categories:
- Contact info
- User ID
- Device ID
- Purchases
- Usage data
- Diagnostics
- Crash data
- Analytics
- Notifications token
- Support messages

For each data type, confirm:
- Collected or not collected
- Linked to user or not
- Used for tracking or not
- Purpose:
  - App functionality
  - Analytics
  - Developer advertising
  - Product personalization
  - Customer support

If using third-party SDKs, include their data practices.

---

### Android Data Safety — Google Play Console

Complete Data Safety form.

Confirm:
- Data collected
- Data shared
- Data encrypted in transit
- User can request deletion
- Data is optional or required
- Account deletion URL available if accounts exist

Common disclosures:
- Email address for account/support
- Purchase history for entitlement management
- App activity for analytics
- Crash logs for diagnostics
- Push token for notifications

---

## 3. Screenshots and Store Listing Assets

### iOS Screenshots

Prepare screenshots for required device sizes:
- 6.7" iPhone
- 6.5" iPhone if required
- 5.5" iPhone if required
- iPad sizes if iPad supported

Recommended screenshots:
1. Primary value proposition
2. Key app feature
3. Subscription/premium benefit
4. Personalization or workflow screen
5. Settings/account screen

Avoid:
- Misleading subscription claims
- Unavailable features
- Unsupported pricing shown in screenshots
- “Free” language if paid subscription is required

---

### Android Screenshots

Prepare:
- Phone screenshots
- 7-inch tablet screenshots if supported
- 10-inch tablet screenshots if supported
- Feature graphic
- App icon
- Short description
- Full description

Screenshots should show actual app UI and subscription benefits clearly.

---

## 4. App Review Notes

### iOS Review Notes Template

Include in App Store Connect:

```text
This app includes auto-renewable subscriptions.

Test account:
Email: [test@example.com]
Password: [password]

Subscription products:
- Monthly: com.company.app.subscription.monthly
- Annual: com.company.app.subscription.annual

How to test:
1. Launch the app.
2. Sign in using the provided test account.
3. Open the Premium or Subscription screen.
4. Select a subscription product.
5. Complete purchase using StoreKit sandbox.
6. Confirm premium features unlock.
7. Go to Settings > Restore Purchases to test restoration.

Notes:
- Purchases are validated server-side.
- Premium access is linked to the user account after validation.
- Restore Purchases is available in Settings.
- Privacy Policy: [URL]
- Terms of Use: [URL]
- Support: [support email or URL]
```

---

### Android Review Notes

Use Play Console app access instructions:

```text
Test account:
Email: [test@example.com]
Password: [password]

Subscription products:
- Monthly: premium_monthly
- Annual: premium_annual

How to test:
1. Install the internal testing build.
2. Sign in with the provided account.
3. Open the Premium screen.
4. Select a subscription.
5. Complete purchase using Google Play test payment method.
6. Confirm premium access unlocks.
7. Use Settings > Restore Purchases / Sync Subscription to refresh entitlement.

Privacy Policy: [URL]
Terms of Use: [URL]
Support: [support email or URL]
```

---

## 5. TestFlight and Internal Testing

### iOS TestFlight

Before submission:
- Upload release candidate build.
- Add internal testers.
- Add external testers if needed.
- Test with sandbox Apple IDs.
- Verify:
  - purchase flow
  - restore purchases
  - expired subscription handling
  - logout/login entitlement sync
  - refund/revocation handling
  - paywall copy
  - push notification prompt
  - privacy permission prompts
  - crash-free startup

Minimum acceptance criteria:
- No crash on launch.
- Subscription unlock works.
- Restore works.
- No duplicate charges from repeated taps.
- Entitlement state is consistent across reinstall.

---

### Android Internal Testing

Before production:
- Upload release candidate to Internal testing track.
- Add license testers.
- Add internal testers by email group.
- Test with Play Billing test cards.
- Verify:
  - purchase and acknowledgement
  - subscription renewal test cycle
  - cancellation
  - refund/revocation
  - restore/sync entitlement
  - app update from previous version
  - notification permission on Android 13+

Minimum acceptance criteria:
- Billing Library returns handled states correctly.
- Purchases are acknowledged.
- Server entitlement matches Play subscription state.
- App does not grant premium without verified purchase.

---

## 6. Support Contact and Legal Links

Required public links:
- Privacy Policy URL
- Terms of Use / EULA URL
- Support URL or support email
- Account deletion URL, if accounts exist

In-app locations:
- Settings > Help / Support
- Settings > Privacy Policy
- Settings > Terms
- Settings > Restore Purchases
- Settings > Manage Subscription
- Settings > Delete Account, if accounts exist

Support email:
```text
support@company.com
```

Support response categories:
- Billing issue
- Restore purchases
- Refund request
- Account access
- Subscription cancellation
- Data deletion request

---

## 7. Refund, Cancellation, and Restore Flow

### Restore Purchases

Required behavior:
- Clearly visible in Settings and/or paywall.
- iOS: call StoreKit restore/current entitlements.
- Android: query active purchases and sync with backend.
- Show success/failure state.

Suggested copy:
```text
Restore Purchases

Use this if you previously subscribed and premium access is not showing.
```

---

### Manage Subscription

Provide platform-native links:
- iOS: open Apple subscription management page.
- Android: open Google Play subscription management page.

Suggested copy:
```text
Manage or cancel your subscription through the App Store or Google Play.
```

---

### Refunds

Do not process platform IAP refunds manually.

In-app support copy:
```text
Refunds for subscriptions purchased through the App Store or Google Play are handled by Apple or Google.

Apple refund requests:
https://reportaproblem.apple.com/

Google Play refund requests:
https://support.google.com/googleplay/workflow/9813244
```

Backend must revoke or update entitlement after refund/revocation notification.

---

## 8. Push Notification Permission

### iOS

Do not ask on first launch unless necessary.

Recommended flow:
1. Explain benefit in-app.
2. User taps “Enable Notifications”.
3. Trigger iOS permission prompt.
4. If denied, provide settings instructions.

Pre-permission copy:
```text
Enable notifications to receive important reminders, subscription updates, and account alerts.
```

---

### Android

For Android 13+:
- Request `POST_NOTIFICATIONS` runtime permission.
- Use same pre-permission screen.
- If denied, app must continue working.

Do not require push permission to use subscription features unless technically necessary.

---

## 9. Staged Rollout Plan

### iOS

Recommended release:
1. Submit to App Review.
2. Use manual release after approval.
3. Release to 1–5% if phased release is enabled.
4. Monitor for 24 hours:
   - crash-free sessions
   - purchase failures
   - restore failures
   - server validation errors
   - support tickets
5. Increase to 25%.
6. Increase to 50%.
7. Release to 100%.

Rollback options:
- Pause phased release.
- Remove app version from sale if critical.
- Ship expedited fix if needed.

---

### Android

Recommended staged rollout:
1. Internal testing.
2. Closed testing, if needed.
3. Production staged rollout:
   - 5%
   - 10%
   - 25%
   - 50%
   - 100%
4. Hold each stage at least 24 hours.

Monitor:
- Android vitals
- crash rate
- ANR rate
- billing failures
- subscription conversion
- refund/cancellation spike
- backend receipt validation errors

Rollback:
- Halt rollout.
- Increase version code and release hotfix.
- Deactivate problematic experiments/paywalls remotely if supported.

---

## 10. Final Launch Gate

Launch only when all are true:

- IAP products active and tested.
- Server-side receipt validation live.
- Restore purchases verified.
- Refund/revocation entitlement handling verified.
- Privacy labels and Data Safety complete.
- Screenshots and metadata approved.
- Review notes include valid test credentials.
- Support email and legal links live.
- Push permission flow tested.
- Internal/TestFlight testing complete.
- Staged rollout monitoring dashboard ready.
