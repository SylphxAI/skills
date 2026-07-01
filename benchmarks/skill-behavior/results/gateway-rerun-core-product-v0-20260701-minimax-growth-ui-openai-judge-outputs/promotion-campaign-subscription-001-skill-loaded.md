```text
Objective: Lift annual-plan conversion by 12% and recover lapsed users, while preserving margin and trust across paid, owned, and partner channels.

Audience:
- New mobile users in trial or first-14-day window
- Monthly subscribers nearing renewal (days 25-30)
- Lapsed users (churned 30-180 days)
- Creator-affiliate referred visitors
- Existing users exposed to annual upgrade prompt

Offer:
- Annual plan: 40% off first year (2 months free), then standard renewal
- Win-back: 50% off 3 months, only if previously subscribed 60+ days
- Creator affiliate: tracked 30% off code, 10% revenue share to creator, 12-month cookie window
```

Campaign system

- Eligibility:
  - Annual discount: new users only; one per account; device ID + account ID dedupe
  - Win-back: email match against churned cohort; excludes users who refunded last 90 days
  - Creator code: validated against active creator list, single code per session, no self-referral (account ≠ referrer)

- Placement:
  - In-app paywall: trial-day 7 and monthly renewal screen
  - Email: dedicated win-back flow + upgrade nudge for monthly users
  - Push: silent hours 8am-8pm local, capped 2/week, deep-link to paywall
  - Creator codes: unique landing URL per creator, UTM-tagged

- Message:
  - Annual: "Lock in 40% off — 2 months free, billed yearly. Cancel anytime."
  - Win-back: "We saved your notes. Pick up where you left off, 50% off 3 months."
  - Affiliate: creator-written intro + neutral disclosure ("affiliate link")

- Fulfillment:
  - Discount attached via coupon ledger with idempotent redemption (coupon_id + user_id key)
  - Annual plan auto-renews at full price; reminder email 14 days before renewal
  - Win-back discount prorated, expires in 7 days once viewed
  - Affiliate credit attributed server-side at first paid invoice, not at click

- Measurement:
  - Primary: incremental annual conversion, win-back reactivation rate, attributed affiliate revenue
  - Guardrails: gross margin, refund rate, churn within 30 days of discount expiry, support ticket volume, unsubscribe rate per channel
  - Holdout: 10% control per segment for incrementality test

- Guardrails:
  - Margin floor: blended discount ≤18% of projected first-year revenue
  - Stacking: affiliate code cannot combine with annual intro or win-back
  - Fraud: device-fingerprint dedupe, velocity cap (3 redemptions/IP/hour), refund-cycling block, geo-IP mismatch flag
  - Trust: no fake countdown timers; expiration language is literal and timezone-accurate
  - Dark-pattern check: cancel flow reachable in ≤3 taps from paywall

Risks and rollback

- Annual cannibalizes monthly -> stop if monthly-to-annual upgrade rate <6% after 21 days
- Win-back reactivators churn again -> stop if 60-day re-churn >45%
- Affiliate fraud or coupon leakage -> stop if refund-cycling or self-referral rate >2%
- Support overload from renewal confusion -> stop if renewal-related tickets >5% of new annual subs
- Push fatigue -> stop if opt-out rate exceeds baseline by 1.5x

Campaign calendar

| Week | Action | Owner |
| --- | --- | --- |
| -2 | Brief creators, finalize copy, instrument events | PM + Marketing |
| -1 | Internal QA, fraud rules load test, support macros live | Eng + Trust |
| 0 | Launch annual offer in paywall + email | Growth |
| 1 | Enable push reminder, monitor margin + refund daily | Growth + Finance |
| 2 | Win-back email + push to 30-180d cohort | Lifecycle |
| 3 | Creator wave goes live with tracked links | Partnerships |
| 4 | Mid-campaign review; adjust creative, not discount depth | PM |
| 6 | Final readout; decide extension or sunset | PM + Finance |

Sunset rule: campaign auto-sunsets at week 8 unless renewed with fresh approval; creator codes expire 90 days after campaign close.
