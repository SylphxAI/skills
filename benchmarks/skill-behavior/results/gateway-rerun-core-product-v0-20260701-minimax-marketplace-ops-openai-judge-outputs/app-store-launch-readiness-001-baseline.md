<think>
The user wants me to prepare a launch checklist for an iOS and Android subscription app. Let me structure this concisely across the requested areas:

1. IAP setup
2. Privacy labels
3. Screenshots
4. Review notes
5. TestFlight/internal testing
6. Support contact
7. Refund/restore flow
8. Push notification permission
9. Staged rollout

Need to stay under 650 words. Be audit-friendly with clear artifacts and decisions. Use concise formatting.
</think>

# Subscription App Launch Playbook

## 1. IAP Setup
**Products (mirror across stores):**
- `premium_monthly` — 1-month auto-renew, 7-day free trial eligible
- `premium_yearly` — 12-month auto-renew, free trial / intro offer eligible
- `premium_lifetime` — non-consumable IAP (iOS); Google Play only if SKUs allow

**Server-side receipt validation required** — never trust client. Use App Store Server Notifications v2 + Google Play Real-time Developer Notifications. Map `product_id`, `expires_at`, `original_transaction_id`, `acknowledgement_state`. Persist entitlements server-side; client receives only a signed entitlement token.

**Configuration:**
- iOS: App Store Connect → Subscriptions → create groups, pricing, localization, refund policy URL, review screenshot.
- Android: Play Console → Monetize → Products → Subscriptions; enable base plans + offers; set billing cycles in user's home currency; set `replaceProductProrationMode = CHARGE_FULL_PRICE`.

## 2. Privacy Labels & Data Safety
**iOS Privacy Labels (App Store Connect):**
- Purchases → Used for App Functionality (✓), not Tracking
- Contact Info (email) → App Functionality
- Usage Data (analytics) → optional; if enabled, declare Diagnostics
- No Tracking = no ATT prompt needed

**Google Data Safety:**
- Account info (email) — App functionality, encrypted in transit, user can delete
- Financial info (purchase) — App functionality, encrypted
- Analytics (optional) — toggle off by default
- Declare: no data sold/shared, no advertising ID use, deletion request via support

**Required artifacts:** Privacy Policy URL, Terms of Service, EULA, Subscription Terms (auto-renew disclosure).

## 3. Screenshots
- 6.7" (iPhone 15 Pro Max), 6.5", 5.5"; iPad 12.9" if universal
- Android: phone + 10" tablet; 16:9 and 9:16
- Cover first frame shows core value prop (no text-heavy marketing)
- 2 frames include paywall + subscription terms (Apple guideline 3.1.2)
- Localize for each tier (en-US, en-GB, de-DE, ja, es)

## 4. Review Notes (App Store)
> "Subscription requires a sandbox Apple ID. Use Settings → App Store → Sandbox Account. Sign-in not required for trial; paywall appears on 3rd session. Test instructions: tap 'Start Trial', confirm Face ID, return to home to see premium unlocked. Restore Purchase available in Settings. For backend testing, receipts validate at `https://api.example.com/v1/iap/verify`. Contact: [email protected]."

## 5. Test Testing
- **iOS TestFlight:** internal (≤100, App Store Connect users), external (≤10k, requires beta review — submit build 48h ahead). Promote at least one full purchase-flow test group.
- **Android:** internal testing track (instant), closed track (whitelisted accounts), open track optional. Use license testers with `android.test.purchased` for consumables.
- Regression checklist: trial conversion, renewal, grace period, billing retry, restore, refund, plan upgrade/downgrade, family sharing (iOS).

## 6. Support Contact
- Email: `[email protected]` (must match App Store/Play listing)
- In-app Help → opens mailto + FAQ URL
- Response SLA: <48h; escalate billing issues to ticket system linked to `original_transaction_id`
- Status page: `status.example.com`

## 7. Refund / Restore Flow
- **Restore:** Settings → "Restore Purchases" → calls `restoreCompletedTransactions` (iOS) / `queryPurchases` (Android). Server reconciles; updates UI within 2s.
- **Refund:** Link in receipt emails + in-app → opens `reportaproblem.apple.com` (iOS) / Play refund form (Android). Backend webhook marks entitlement inactive on `NOTIFY_REFUND`. Log all refund events; do not auto-ban.
- Display "Cancel anytime — manage in [App Store/Play] settings" near every paywall.

## 8. Push Notification Permission
- Request **contextually**, after first value moment (not on launch).
- iOS: provisional auth first (silent push), then explicit prompt if needed.
- Android 13+: `POST_NOTIFICATIONS` runtime permission; request after onboarding completes.
- Categories: transactional (renewal, payment failure) — required; marketing — opt-in.

## 9. Staged Rollout
**iOS:** Phased Release — 1% day 1, 2% day 2, 5% day 3, 10% day 4, 25% day 5, 50% day 6, 100% day 7. Pause if crash-free <99.5% or refund rate >2%.

**Android:** Play staged rollout — 5% → 10% → 25% → 50% → 100% over 7 days. Watch vitals (ANR <0.47%, crash <1.09%).

**Gates to advance:** crash-free ≥99.5%, refund rate ≤2%, purchase success ≥97%, support ticket volume <1% of installs.

## Pre-Launch Verification Checklist
- [ ] Receipt validation live + tested with sandbox + production ($0.99 SKU)
- [ ] Privacy labels + Data Safety match actual SDK behavior
- [ ] Restore works on fresh install (iOS + Android)
- [ ] Server-side subscription status overrides client
- [ ] Cancellation instructions visible pre-purchase
- [ ] Push permission strings localized
- [ ] Staged rollout monitors wired (Crashlytics, Play Vitals, custom IAP dashboard)
