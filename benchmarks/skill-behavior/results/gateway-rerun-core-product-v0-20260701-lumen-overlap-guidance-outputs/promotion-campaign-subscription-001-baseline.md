**Campaign Name:** FocusPlan Annual Productivity Drive
**Core Offer:** 40% off the Annual Premium Plan (Discount applied at checkout via web and in-app).

### 1. Campaign Calendar (4 Weeks)
*   **Week 1: Affiliate & Prep:** Distribute affiliate codes to creators. QA in-app paywall and deep links.
*   **Week 2: Acquisition Launch:** Trigger in-app paywall for high-intent users. Creators begin broadcasting codes.
*   **Week 3: Active Nurturing:** Send push notifications to active free users. Launch broad email blast to unengaged free users.
*   **Week 4: Win-Back:** Deploy emails and retargeting ads to lapsed annual subscribers whose subscriptions ended 3–6 months ago. 

### 2. Channel Artifacts & Strategy
**In-App Paywall (Triggered after 3rd task completion):**
*   *Headline:* Unlock your most productive year yet.
*   *Sub-headline:* Get unlimited focus sessions, cross-device sync, and advanced analytics. 
*   *Pricing:* Show crossed-out monthly rate vs. discounted annual rate. 
*   *CTA:* Start 7-Day Free Trial.

**Push Notification (Active Free Users - Week 3):**
*   *Message:* "🚀 You’ve been on a roll! Keep the momentum going and save 40% on FocusPlan Annual today only."

**Email (Win-Back Segment - Week 4):**
*   *Subject:* We miss you (and your productivity). Let's hit reset.
*   *Body:* "Your tasks are waiting. Reclaim your focus and get 40% off your annual plan. Welcome back to FocusPlan."
*   *CTA:* Reclaim My 40% Discount.

**Creator Affiliate Codes:**
*   *Mechanism:* Creators receive a 20% revenue share for every annual subscription driven via their unique URL/code (e.g., CREATOR40).
*   *Tracking:* UTM parameters mapped to user ID at checkout.

### 3. Fraud Risk & Mitigation Controls
*   **Risk: Promo Abuse & Self-Referrals:** Users creating multiple accounts or using their own affiliate codes.
    *   *Control:* Enforce strict device-ID fingerprinting (IDFA/AppTrackingTransparency where available) and block multiple sign-ups from the same IP or payment method.
*   **Risk: Affiliate Click Spamming:** Creators falsely claiming attribution for organic downloads.
    *   *Control:* Utilize a Mobile Measurement Partner (MMP) with deterministic matching (last-click attribution with a 7-day expiry window). 
*   **Risk: Friendly Fraud / Chargebacks:** Users subscribing, accessing data, then disputing the charge.
    *   *Control:* Enforce clear in-app consent terms prior to trial start; pause affiliate payouts for 30 days post-conversion to align with standard chargeback windows.

### 4. Success Metrics (Audit-Ready KPIs)
**Primary Metrics (ROI & Conversion):**
*   **Annual Plan Conversion Rate:** % of paywall viewers and email recipients who purchase.
*   **Win-Back Conversion Rate:** % of lapsed annual users who resubscribe.
*   **Customer Acquisition Cost (CAC):** Total campaign spend / new annual subscribers (separated by Affiliate vs. Paid).

**Secondary Metrics (Engagement):**
*   **Free-Trial-to-Paid Rate:** % of users who convert after the 7-day trial via the in-app paywall.
*   **Email/Push Open and Click-Through Rates (CTR).**

**Guardrail Metrics (Health & Risk):**
*   **Chargeback Rate:** Must remain < 1% of total transactions.
*   **Fraudulent Affiliate Rate:** < 2% of affiliate-driven conversions flagged by MMP.
*   **Annual Churn Rate:** Monitor 30-day post-trial refund rates to ensure high-quality acquisition.
