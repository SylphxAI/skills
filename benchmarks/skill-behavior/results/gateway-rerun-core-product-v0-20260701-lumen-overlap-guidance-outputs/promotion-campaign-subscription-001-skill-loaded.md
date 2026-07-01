Objective: Drive Annual Recurring Revenue (ARR), reactivate lapsed users, and acquire new users via the creator economy.
Audience: New users, churned users (win-back segment: >30 days inactive), and creator audiences.
Offer: 40% off the first year of the annual plan (New/Affiliate); 1 free month added to an annual subscription (Win-back). Offers are non-stackable.

Campaign system:
- Eligibility: Deterministic and support-visible (`promo-2`). Active annual subscribers are excluded. Win-back applies only to accounts inactive for 30+ days. Affiliate codes expire 14 days after generation. 
- Placement: In-app paywall (hard paywall for new users, soft modal on app open for win-back), targeted Email sequences (Day 0, 3, 7 of churn), and Push notifications (Day 5 of churn). Affiliate links route directly to a deep-linked discounted paywall.
- Message: "Unlock a year of peak productivity" (New), "We miss you! Come back and get a free month on us" (Win-back), "[Creator Name] gave you 40% off your best year yet" (Affiliate). Clear terms regarding auto-renewal at standard price are displayed above the CTA (`promo-3`).
- Fulfillment: Idempotent and traceable via RevenueCat/App Store Server API (`promo-5`). Affiliate codes mapped to distinct SKUs for accurate payout tracking. All ledger events log the specific campaign ID.
- Measurement: Track `campaign_eligible`, `offer_shown`, `offer_clicked`, `offer_redeemed`, `fulfillment_succeeded`, `campaign_conversion`, `campaign_refund`, `campaign_unsubscribed`. Success metrics: Incremental ARR, Win-back conversion rate, Affiliate CAC vs LTV, and Refund rate.
- Guardrails: Fraud controls enabled (`promo-6`) to block self-referrals, device ID spoofing, and coupon sharing. No fake scarcity or coercive urgency used. Campaign calendar schedules this for a Q3 "Fall Productivity" push to avoid overlapping with existing monthly discounts. Margin protected by capping affiliate payouts to 30% of first-year revenue. Event economy and fairness checks passed (`promo-8`).

Risks and rollback:
- Affiliate fraud / self-referrals -> Stop condition: Self-referral rate exceeds 2% of redemptions; automatically pause flagged creator codes.
- Win-back email fatigue -> Stop condition: Unsubscribe rate exceeds 3% for the targeted segment.
- High refund rate / accidental subscriptions -> Stop condition: Campaign-specific refund rate exceeds 5%; trigger immediate review of paywall clarity.
- Margin erosion -> Stop condition: Incremental CAC exceeds target LTV limits; disable affiliate code generation.
