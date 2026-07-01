### 1. In-App Purchase (IAP) Setup
*   **Product IDs:** Create standardized SKUs (e.g., `com.app.premium.monthly`, `com.app.premium.yearly`).
*   **App Store Connect:** Create a Shared Secret for receipt validation. Add localized descriptions and pricing tiers. Attach a mandatory EULA URL.
*   **Google Play Console:** Create Base Plans and Offers. Ensure real-time developer notifications (RTDN) are linked to your backend for subscription lifecycle management. Activate the products.

### 2. Privacy Labels (App Privacy)
*   **Data Collected:** Identifiers (Device ID for analytics), Usage Data (Product Interaction). 
*   **Tracking:** Declare "Yes" if using SDKs like Meta Ads, ensuring "Developer's Advertising or Marketing" and "Third-Party Advertising" purposes are checked.
*   **Google Play Data Safety:** Declare data encryption, data deletion upon account closure, and compliance with Families Policy (if applicable).

### 3. Store Screenshots
*   **iOS:** Provide required 6.9" (iPhone 15 Pro Max) and 6.5" sets. 
*   **Android:** Provide 1080px-1920px (16:9 aspect ratio) minimum.
*   **Content:** Highlight 3 core features. *Crucial:* Include one screenshot of the subscription paywall explicitly detailing the price, billing period, and free trial terms (if offered).

### 4. App Review Notes
*   **Credentials:** Provide a dummy username and password (prefilled if possible) with annotations for bypassing SMS OTP during review.
*   **IAP Instructions:** Explicitly state: *"Reviewers must tap the 'Subscribe' button to initiate the sandbox/test IAP. Please do not reject for requiring payment."*
*   **Review Scope:** Highlight specific flows (e.g., "Test push notifications via the settings menu").

### 5. TestFlight & Internal Testing
*   **iOS:** Upload build via Xcode. Add internal testers (up to 100) immediately. Invite external testers (requires a brief beta app review).
*   **Android:** Upload `.aab` to the Internal Testing track. Invite backend QA team via email list link.
*   **Validation:** Testers must verify the sandbox purchase flow, successful entitlement unlock, and the Restore flow.

### 6. Support Contact, Refund & Restore Flow
*   **Support URL:** Host a public Zendesk/Intercom page. Link it in App Store Connect ("Support URL") and Play Console ("Developer Email/Website").
*   **Restore Flow:** Add a highly visible "Restore Purchases" button on the paywall and in the app's settings. Button calls StoreKit 2 (`Transaction.currentEntitlements`) or Google Play Billing (`queryPurchasesAsync`).
*   **Refund Flow:** Include a "Manage Subscription" link in settings routing to device OS settings. Provide direct links to Apple (`reportaproblem.apple.com`) and Google (`support.google.com/googleplay/contact/play_request_refund`) support in your app's FAQ/Help Center.

### 7. Push Notification Permission
*   **iOS:** Request `UNUserNotificationCenter` authorization **only after** the user completes a specific action (e.g., starting a workout, favoriting an item).
*   **Android:** Declare `POST_NOTIFICATIONS` in manifest. Request runtime permission only on Android 13+ during contextual onboarding.
*   **Copy:** Use clear preemptive text: *"We use notifications to remind you about [App Feature]. Enable to get started?"*

### 8. Staged Rollout
*   **iOS (Phased Release):** Upon approval, select "Automatically release in 7 days using phased release" (1%, 2%, 5%, 10%, 20%, 50%, 100%).
*   **Android (Staged Rollout):** Promote the Internal Testing build to Production. Set initial rollout to 10%. Monitor crash-rate metrics (Crashlytics) and conversion rates before manually increasing to 50% and 100% over a 7-14 day period.
