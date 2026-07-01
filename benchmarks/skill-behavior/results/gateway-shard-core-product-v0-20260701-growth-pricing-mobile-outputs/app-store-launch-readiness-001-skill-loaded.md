Channels:  
- Apple App Store (iOS)  
- Google Play (Android)

Product type:  
- Mobile subscription app using in-app purchases/subscriptions, push notifications, and staged rollout.

Readiness matrix:

- App Store — metadata, policy, payments, testing, release, support
  - Metadata:
    - App name, subtitle, keywords, category, age rating.
    - App description with clear subscription value proposition.
    - Screenshots for required iPhone sizes; include paywall/subscription-related screens if central to app value.
    - Optional app preview video if UX benefits from demonstration.
  - IAP/subscriptions:
    - Create subscription group in App Store Connect.
    - Configure products: monthly/annual plans, pricing, free trial or intro offer if used.
    - Add localized subscription display names and descriptions.
    - Ensure paywall clearly shows price, billing interval, trial terms, renewal behavior, and cancellation path.
    - Implement Apple receipt / StoreKit validation.
    - Implement “Restore Purchases” prominently in settings/account/paywall.
    - Handle billing retry, grace period, refunds, revocations, upgrades, downgrades, and expired subscriptions.
  - Privacy labels:
    - Complete App Privacy section truthfully for all collected data.
    - Confirm SDK data collection: analytics, crash reporting, attribution, ads, customer support, push provider.
    - Link privacy policy URL.
    - If account deletion is required, provide in-app account deletion flow or clear support route.
  - Review notes:
    - Provide demo/test account credentials.
    - Explain subscription test products and expected flows.
    - Describe any gated content, login requirement, special permissions, or region restrictions.
    - Include reviewer steps to test purchase, restore, cancellation expectations, and push notification behavior.
  - Testing:
    - Use TestFlight internal testing first.
    - Validate clean install, upgrade, logged-out state, subscription purchase, restore, refund/revocation handling, network failure, expired subscription.
    - Test on supported iOS versions and device sizes.
  - Release:
    - Submit for App Review after IAPs are attached and approved/ready for review.
    - Use phased release if appropriate.
    - Monitor crashes, subscription conversion, restore failures, and review feedback.
  - Support:
    - App Store support URL and marketing URL.
    - In-app support contact: email/help center/chat.
    - FAQ for billing, cancellation, refund, restore purchases, and account deletion.

- Google Play — metadata, policy, payments, testing, release, support
  - Metadata:
    - App title, short description, full description.
    - Screenshots for phone and tablet if supported.
    - Feature graphic.
    - App category, tags, content rating.
    - Clearly describe subscription benefits and limitations.
  - IAP/subscriptions:
    - Configure subscription products in Play Console.
    - Define base plans, offers, pricing, trial/intro offers if applicable.
    - Implement Google Play Billing Library.
    - Server-side purchase token validation recommended.
    - Handle renewals, cancellations, grace period, account hold, pause/resume if enabled, refunds, chargebacks, and revocations.
    - Provide visible “Restore purchases” / “Manage subscription” flow.
    - Link users to Google Play subscription management where appropriate.
  - Data safety:
    - Complete Data Safety form truthfully.
    - Declare collected/shared data, encryption in transit, deletion availability, and optional vs required data.
    - Review third-party SDK disclosures.
    - Complete policy declarations for ads, health, finance, children/families, background location, or sensitive permissions if applicable.
  - Review notes:
    - Provide test credentials.
    - Explain subscription SKUs/base plans/offers.
    - Provide steps to access paid features, restore entitlement, and test push permissions.
    - Note any region, device, or account constraints.
  - Testing:
    - Use internal testing track before production.
    - Add license testers and test subscriptions.
    - Run Play pre-launch report and resolve crashes, ANRs, accessibility, and security warnings.
    - Validate purchase, restore, refund/revoke, expired subscription, offline behavior, and app update behavior.
  - Release:
    - Use staged rollout: start with small percentage, then expand based on crash-free sessions, ANRs, billing errors, and support tickets.
    - Prepare rollback/halt criteria.
    - Monitor vitals, reviews, billing events, and subscription churn.
  - Support:
    - Developer email, website, privacy policy.
    - In-app support route.
    - FAQ for billing, cancellation, refund, entitlement sync, and account deletion.

OS/platform details:

- IAP and entitlement behavior:
  - Subscription status must be derived from verified Apple/Google purchase state, not only local flags.
  - Entitlement sync should work after reinstall, device change, app update, and logout/login.
  - Restore purchase button must be easy to find.
  - Do not imply users must contact support to cancel platform-managed subscriptions.

- Refund/restore flow:
  - iOS:
    - Restore Purchases button calls StoreKit restore/sync.
    - Handle refunded or revoked transactions by removing entitlement.
    - Support should explain that App Store refunds are requested through Apple.
  - Android:
    - Restore/sync checks active Play purchases for the signed-in app account.
    - Handle refund, revoke, account hold, grace period, pause, and expired states.
    - Support should explain that Google Play refunds are requested through Google Play unless business policy adds separate assistance.

- Push notification permission:
  - Request permission only at the moment of value, not immediately on first launch.
  - Pre-permission screen should explain purpose, examples, and frequency.
  - Provide in-app notification settings.
  - Define notification categories/channels:
    - Account/billing notices.
    - Content/activity reminders.
    - Promotional messages, only if consented and policy-compliant.
  - Respect quiet hours and opt-out.

- Privacy and permissions:
  - Privacy policy must match App Store privacy labels and Google Play Data Safety answers.
  - Avoid unnecessary permissions.
  - Explain any sensitive permission in context before the system prompt.
  - Verify analytics, attribution, crash, push, and support SDK disclosures.

- Screenshots:
  - Show actual app UI, not misleading marketing-only mockups.
  - Include onboarding, core value screen, subscription/paywall if central, settings/support, and key differentiators.
  - Localize screenshots for priority markets.
  - Avoid claims that cannot be substantiated.

- Staged rollout:
  - iOS: use phased release or manual release after approval.
  - Android: use production staged rollout percentages.
  - Suggested gates:
    - 1–5%: smoke test production billing, login, crashes.
    - 10–25%: monitor support and subscription conversion.
    - 50%: proceed only if crash/ANR/billing metrics are healthy.
    - 100%: after at least 24–72 hours of stable metrics.
  - Halt rollout if there are severe crashes, failed entitlement sync, purchase failures, incorrect privacy disclosures, or support spike.

Launch blockers:

- IAP products/subscriptions not configured, localized, approved, or attached to app submission — Owner: Product / Mobile Lead.
- Paywall missing price, billing interval, trial terms, renewal terms, or cancellation information — Owner: Product / Legal.
- Restore purchases missing or unreliable — Owner: Mobile Engineering.
- Refund/revocation/grace-period/account-hold handling incomplete — Owner: Backend / Mobile Engineering.
- App privacy labels or Google Play Data Safety not reconciled with SDK behavior — Owner: Privacy / Engineering.
- Privacy policy missing or inconsistent with actual data collection — Owner: Legal / Privacy.
- Review notes missing test account, subscription test path, or permission explanation — Owner: Release Manager.
- TestFlight/internal testing not completed across purchase, restore, refund, reinstall, logout/login, and upgrade flows — Owner: QA.
- Push permission requested too early or lacks in-app settings/opt-out — Owner: Mobile Engineering / Product.
- Screenshots incomplete, misleading, or not localized for launch markets — Owner: Marketing / Product.
- Support contact, billing FAQ, refund guidance, and account deletion route missing — Owner: Support / Product.
- Staged rollout plan lacks monitoring metrics, halt criteria, or owner — Owner: Release Manager.
