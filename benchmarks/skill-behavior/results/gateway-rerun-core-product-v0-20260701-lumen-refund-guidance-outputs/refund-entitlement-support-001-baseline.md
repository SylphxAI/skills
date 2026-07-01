### 1. Platform Event Ingestion
*   **App Store:** Listen to `AppStoreServerNotificationV2`. Trigger on `REFUND` and `REVOKE`.
*   **Google Play:** Listen to Real-time Developer Notifications (RTDN). Trigger on `SUBSCRIPTION_REVOKED` and `VOIDED_PURCHASE`.
*   **Stripe:** Listen to `charge.refunded` and `charge.dispute.closed` (status `lost`).
*   *Audit Rule:* All refunds processed via native platform APIs (e.g., App Store Connect) must be idempotent to prevent double-revocation.

### 2. Entitlement & Grace Period Logic
*   **Standard Refunds / Chargebacks:** Immediate entitlement revocation. No grace period.
*   **Billing Failures (Dunning):** Apply a strict **14-day grace period**. User retains premium access while payment is retried. If retries exhaust, access is downgraded.
*   **Cancellations (Voluntary):** Entitlement remains active until the end of the current billing cycle.

### 3. Goodwill Refunds (One-Time Exceptions)
*   **Criteria:** 1st-time refund request within 30 days of purchase; user claims technical issues or unused access.
*   **Action:** Support issues refund via Stripe (or native console). 
*   **Entitlement:** **Soft Revoke**. Keep entitlement active until the current period ends to ensure a smooth, positive user experience. 
*   **Tracking:** Tag account in DB with `goodwill_refund_used = TRUE`. Limit one per lifetime.

### 4. Chargeback (Dispute) Handling
*   **Action:** Immediate hard revocation of entitlement.
*   **Automation (Stripe):** Auto-submit basic evidence (user usage logs, IP, TOS agreement) via API for `charge.dispute.created`.
*   **Blacklist:** If dispute is lost, automatically add user payment details to a blocklist to prevent future purchases.

### 5. Repeat Abuser Management
User refund history is evaluated via a rolling 12-month window.
*   **Warning (Threshold: 2 refunds / 1 lost chargeback):** 
    *   *Action:* No ban, but user is flagged. Display in-app warning popup upon next login. Block future Goodwill Refunds.
*   **Downgrade (Threshold: 3 refunds / >$50 refunded):** 
    *   *Action:* Force account to Free tier. Block the ability to purchase new subscriptions via UI. Provide link to support for appeal.
*   **Ban (Threshold: 4+ refunds OR 2 lost chargebacks):** 
    *   *Action:* Account suspension. User cannot log in. 
    *   *Audit Justification:* Protects merchant account health and prevents platform-wide penalties (e.g., Apple/Google app suspension for high chargeback ratios).

### 6. Support Macros
*   **Macro 1: Standard Refund Processed** 
    "Your refund of [Amount] has been processed. Premium access is removed. It may take 3-5 business days to appear on your statement."
*   **Macro 2: One-Time Goodwill Refund** 
    "As a one-time courtesy, we’ve refunded your purchase. Your Premium access remains active until [Expiration Date]."
*   **Macro 3: Abuse Warning** 
    "We noticed multiple refund requests on your account. While we value you as a user, our system limits the number of refunds per account. Your access has been reverted to our Free tier."
*   **Macro 4: Chargeback Disputed**
    "We see you initiated a chargeback. Per our Terms of Service, initiating a chargeback results in immediate account suspension. Please contact support to resolve this amicably."

### 7. Analytics & KPIs
Monitor via internal BI tool (e.g., Mixpanel, Amplitude, Looker):
*   **Refund Rate:** `(Total Refunds + Chargebacks) / Total Transactions`. Alert if > 3%.
*   **Platform Dispute Ratio:** Track Stripe dispute ratio specifically (must stay under 1% to avoid payment processing risks).
*   **Abuser Segmentation:** Track % of users hitting Warn/Downgrade/Ban thresholds.
*   **Goodwill ROI:** Compare retention rates of users who received a Goodwill Refund vs. those who didn't.
