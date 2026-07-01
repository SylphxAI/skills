Objective:  
Increase annual subscription revenue and reactivation for a mobile productivity app while protecting margin, customer trust, and long-term retention.

Audience:  
1. **Win-back users:** previously paid subscribers who canceled or expired 30–365 days ago, excluding refund abusers and users who opted out of marketing.  
2. **Free active users:** users with meaningful product intent, e.g. 3+ sessions or 2+ completed productivity actions in last 14 days.  
3. **Creator affiliate traffic:** new or returning users using approved creator codes.  
4. **Existing monthly subscribers:** eligible for annual upgrade offer, with transparent comparison to current monthly plan.

Offer:  
Annual plan discount campaign:  
- **Core offer:** 30% off first year of annual subscription.  
- **Win-back offer:** 35% off first year of annual subscription for eligible former subscribers.  
- **Creator affiliate code:** 25% off first year, creator receives tracked commission after refund window.  
- **Renewal:** renews at standard annual price unless canceled before renewal.  
- **Limits:** one promotional annual redemption per account, device cluster, and payment instrument within 12 months.  
- **Stacking:** cannot stack with other coupons, trials, student plans, family plans, or app store promos unless explicitly configured.  
- **Refund effect:** refunded purchases consume the promo unless support confirms accidental purchase or payment issue.

Campaign system:  
- Eligibility:  
  - Deterministic server-side eligibility checks before offer display and checkout.  
  - Segments:
    - `winback_annual_35`: canceled/expired paid users, 30–365 days since paid access ended, no refund abuse, no active subscription, marketing consent where required.
    - `free_intent_annual_30`: free users with recent activation behavior, no prior promo annual redemption in last 12 months.
    - `creator_code_25`: user enters or lands through valid creator attribution link/code, subject to fraud and geo/payment checks.
    - `monthly_upgrade_annual_30`: active monthly subscribers shown annual savings, prorated or app-store-compliant upgrade handling.
  - Exclusions:
    - active annual subscribers,
    - users with unresolved payment disputes,
    - chargeback history above threshold,
    - self-referral or creator self-use where prohibited,
    - sanctioned/unsupported regions,
    - unsubscribed users for email/push.
  - Eligibility and rejection reason visible to support.

- Placement:  
  - **In-app paywall:** primary placement after high-intent moments:
    - completing a task streak,
    - hitting free-plan limit,
    - using premium feature preview,
    - returning after inactivity.
  - **Win-back email:** 2-email sequence with respectful value-led messaging.
  - **Push notification:** only for opted-in users; max 1–2 pushes per campaign window.
  - **Creator links/codes:** creator landing page, app deep link, checkout code field, and attribution dashboard.
  - **Pricing page:** annual discount clearly shown with renewal terms.
  - **Account/subscription screen:** monthly users see upgrade economics without implying they are losing access.

- Message:  
  - Value-led, not pressure-led:
    - “Come back to your productivity system with 35% off annual.”
    - “Plan your year for less: save 30% on annual.”
    - “Use creator code ALEX25 for 25% off your first year.”
  - Required clarity:
    - discounted annual price,
    - standard renewal price,
    - expiration date,
    - cancellation terms,
    - eligibility limits,
    - app store billing terms where applicable.
  - Avoid:
    - fake countdowns,
    - “last chance” unless actually final,
    - shame-based win-back copy,
    - hidden renewal language.

- Fulfillment:  
  - Server creates `campaign_eligible` and `offer_shown` events with campaign ID, segment, price, currency, channel, and eligibility rule version.  
  - Checkout validates eligibility again before redemption.  
  - Redemption creates idempotent `offer_redeemed` and `fulfillment_succeeded` events.  
  - Coupon codes tied to campaign, creator, expiration, max redemptions, eligible products, and geography.  
  - App store purchase validation required before subscription entitlement.  
  - Creator commission locked until refund/chargeback window closes.  
  - Support can look up:
    - campaign exposure,
    - eligibility decision,
    - code entered,
    - purchase status,
    - renewal price,
    - refund history.

- Measurement:  
  - Core events:
    - `campaign_eligible`
    - `offer_shown`
    - `offer_clicked`
    - `offer_redeemed`
    - `fulfillment_succeeded`
    - `fulfillment_failed`
    - `coupon_rejected`
    - `campaign_conversion`
    - `campaign_refund`
    - `campaign_support_contact`
    - `campaign_unsubscribed`
  - Primary success metrics:
    - incremental annual subscription conversions,
    - incremental net revenue,
    - annual plan mix,
    - win-back reactivation rate,
    - creator-code conversion rate,
    - payback period after discount and commissions.
  - Guardrail metrics:
    - gross margin after app store fees, discounts, refunds, and affiliate payouts,
    - refund rate,
    - chargeback rate,
    - 30/60/90-day retained subscribers,
    - renewal cancellation before paid year ends,
    - support contact rate,
    - email unsubscribe/spam complaint rate,
    - push opt-out rate,
    - coupon rejection rate,
    - promo cannibalization of full-price annual purchases.
  - Experiment design:
    - Holdout groups by segment:
      - win-back: no-offer/value-message control vs 35% offer,
      - free active: standard paywall vs 30% annual offer,
      - creator traffic: code landing page vs generic landing page where feasible.
    - Measure incremental lift, not just attributed conversions.
    - Keep creator attribution separate from organic, paid, and lifecycle channels.
    - Analyze by platform, country, acquisition source, prior subscription history, and app engagement level.

- Guardrails:  
  - Clear renewal pricing and cancellation terms on every channel.  
  - Existing customers are not made worse off; monthly subscribers get a fair annual upgrade path.  
  - No hidden stacking, no misleading expiry, no undisclosed affiliate relationship.  
  - Respect unsubscribe, push permissions, regional consent, and app store rules.  
  - Support macros ready before launch:
    - “Why am I not eligible?”
    - “How does renewal pricing work?”
    - “Can I combine creator code and win-back offer?”
    - “I forgot to apply a code.”
    - “How do refunds affect the discount?”
  - Fraud controls:
    - one redemption per account/device/payment instrument,
    - block suspicious device farms and repeated account creation,
    - creator self-redemption detection,
    - velocity limits per code and IP/payment cluster,
    - geo-price arbitrage monitoring,
    - chargeback and refund cycling suppression,
    - manual review for high-volume creator anomalies,
    - commission payout only after refund window.

Campaign calendar:  
- **Week -3:** finalize offer economics, margin model, eligibility rules, legal/app-store review.  
- **Week -2:** implement campaign IDs, coupon rules, creator tracking, paywall variants, support tooling.  
- **Week -1:** QA checkout, renewal language, refund cases, deep links, email/push previews, analytics events.  
- **Launch Week:**  
  - Day 1: in-app paywall to 10% traffic, monitor fulfillment/errors.  
  - Day 2–3: expand to 50% if guardrails healthy.  
  - Day 4: launch win-back email.  
  - Day 5: enable creator codes.  
  - Day 6–7: push notification only to eligible opted-in high-intent users.  
- **Week +1 to +3:** optimize by segment, pause poor-performing creators, monitor refunds/support.  
- **Week +4:** stop new redemptions unless extended through approved review; keep entitlements valid.  
- **Week +6:** readout incremental revenue, retention, refund, and creator quality.

Risks and rollback:  
- Fulfillment failure or entitlement mismatch -> stop campaign if purchase-to-entitlement failure exceeds 1% for 2 hours.  
- Margin erosion -> pause segment if net margin falls below approved threshold.  
- Refund abuse or chargebacks -> pause codes/segments if refund or chargeback rate is 2x baseline.  
- Creator code leakage -> rotate or disable code if redemptions exceed cap or suspicious clusters appear.  
- Existing customer complaints -> revise placement/message if support contact rate exceeds 1.5x baseline.  
- Push/email fatigue -> pause channel if unsubscribe, spam complaint, or push opt-out exceeds threshold.  
- Cannibalization -> reduce discount or suppress offer if full-price annual conversions drop materially without incremental net revenue.  
- App store compliance issue -> immediately disable affected paywall/copy and revert to standard pricing.
