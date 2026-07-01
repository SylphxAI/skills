# Subscription App Launch Checklist (iOS + Android)

## 1. IAP Setup

**Apple (App Store Connect → Subscriptions)**
- Group ID: `com.<vendor>.<app>.subs`
- Products: `monthly`, `yearly` (auto-renewable), plus `lifetime` (non-consumable if applicable)
- Reference name, product ID, subscription duration, price tier (with introductory offer + free trial of 7 or 14 days where eligible)
- Localized prices for primary markets
- App Store Server Notifications URL configured (production + sandbox)
- Shared secret saved in backend
- Subscription status URL implemented for signed JWS validation

**Google (Play Console → Products → Subscriptions)**
- Product ID: same SKU convention as Apple
- Base plans + offers (free trial, introductory, grace period)
- Real-time developer notifications via Pub/Sub topic → backend webhook
- V2 deferred billing/migration if migrating from v1
- Signature key generated and stored

**Both:** Receipt validation server-side; never trust client. Map `original_transaction_id` / `purchaseToken` to user account.

## 2. Privacy Labels / Data Safety

**iOS (App Store Connect):** Declare data collected per purpose:
- Purchases (Account ID, Purchase History) — Required, app functionality
- Diagnostics (Crash, Performance) — optional, analytics
- User Content only if applicable

**Android (Play Console → Data Safety):** Mirror iOS declarations: data types, purpose, sharing, encryption, deletability. Keep them in sync — inconsistency is a top rejection reason.

**Action:** Update Privacy Policy URL; reference subscription auto-renewal, cancellation, and refund policy.

## 3. Screenshots

- iOS: 6.7" (1290×2796), 6.5", 5.5" required; 12.9" iPad if universal
- Android: Phone + 7" + 10" tablet; feature graphic 1024×500
- 3–8 per locale for primary markets (en-US, en-GB, de, ja, etc.)
- Show onboarding → paywall → active subscription state
- Avoid referencing Android in iOS assets and vice versa
- No price strings in screenshots; localization handled via store metadata

## 4. Review Notes (App Store)

Provide reviewer login:
- Demo account: `reviewer@<vendor>.com` / password in notes
- Test IAP sandbox account credentials
- Steps to reach paywall and trigger subscription
- Note any hidden content behind auth
- Explain push permission usage
- Reference support URL

## 5. TestFlight / Internal Testing

**iOS:** Internal testers (up to 100), External (up to 10k) with first-build review
- Test all IAP flows in sandbox; verify restore, renewal, cancellation
- Test StoreKit 2 paths if using
- Validate subscription status endpoint responses

**Android:** Internal testing track (closed list), then closed testing (recommended 14+ days active testers for 1-year subs per policy)
- License-test accounts for IAP
- Test offers, upgrades, downgrades, base plan changes

## 6. Support Contact

- Public support URL (HTTPS, no auth wall) — linked from store listing
- Support email monitored within 24h
- Add to App Store Connect (App Information) and Play Console (Store listing → Contact details)
- In-app support entry on Settings/Account screen
- Required: mechanism for users to request data deletion (iOS 17+ requirement; Android Data Safety form)

## 7. Refund / Restore Flow

**iOS:** Do not build your own refund UI. Use `AppStore.showManageSubscriptions` (StoreKit 2) and link to `reportaproblem.apple.com`. Show clear "Manage Subscription" button in app.

**Android:** Use Google Play Billing library's launchPriceChangeConfirmationFlow and account-hold/recovery APIs. For refunds, link to `support.google.com/googleplay/workflow/...` from app.

**Restore:** Always provide "Restore Purchases" — required by Apple. Server-side receipt validation on restore. Display current subscription state, renewal date, plan.

**Mandatory disclosures in paywall:** price, billing period, auto-renewal statement, cancellation instructions, link to Terms + Privacy.

## 8. Push Notification Permission

- iOS: request via `UNUserNotificationCenter` only after value demonstrated (post-onboarding, post-subscription). Include `NSUserTrackingUsageDescription` only if tracking.
- Android: API 33+ requires `POST_NOTIFICATIONS` runtime permission; use `shouldShowRequestPermissionRationale` flow.
- Categories registered server-side; quiet-hours support
- Include opt-out in app Settings; respect system-level disable

## 9. Staged Rollout

**iOS:** Phased Release 1% → 2% → 5% → 10% → 20% → 50% → 100% (each step 24–48h, monitor crash-free sessions ≥ 99.5%)

**Android:** Open/closed testing → Production track staged rollout 5% → 10% → 25% → 50% → 100% (24h between bumps)

**Holdback criteria to pause:** crash rate spike, ANR increase, IAP validation errors >1%, support volume spike, subscription webhook failures

**Post-launch (T+24h, T+72h, T+7d):** review crash reports, IAP conversion, refund rate, subscription retention, store reviews

---

**Pre-submission gate (must pass before hitting Submit):** receipts validated server-side, restore works on fresh install, paywall disclosures complete, support URL resolves, privacy labels consistent across stores, screenshot dimensions validated, review notes grant full access, staging sandbox subscription tested end-to-end, push opt-in shown only when value is clear.
