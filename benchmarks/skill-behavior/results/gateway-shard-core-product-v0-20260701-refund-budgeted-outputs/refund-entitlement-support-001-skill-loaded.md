Purchase/refund context:  
Mobile subscription app with recurring entitlements purchased via Apple App Store, Google Play, or Stripe. Entitlement is premium subscription access. Refunds may be normal refunds, goodwill refunds, failed billing/grace-period events, chargebacks, or repeated abuse.

Authority:
- Apple App Store: Apple controls refund approval and timing. App detects refund via App Store Server Notifications / receipt status.
- Google Play: Google controls store refunds. App detects via Real-time Developer Notifications / Play Developer API.
- Stripe: Merchant controls standard refunds; banks control chargebacks/disputes. App detects via Stripe webhooks.
- Internal support: Can issue Stripe goodwill refunds if policy allows; cannot directly refund Apple/Google purchases, but can guide users to platform refund flows.

Flow:
- purchase_active -> grant premium entitlement; record provider, order ID, subscription ID, renewal date, trial status, refundability window.
- refund_requested:
  - Apple/Google -> redirect user to platform refund process; create support timeline note.
  - Stripe -> support or self-serve refund eligibility check.
- refund_pending -> keep entitlement active unless provider marks subscription canceled/revoked or fraud/chargeback risk exists.
- refund_confirmed -> record immutable refund event; separate refund from account discipline.
- entitlement_adjusted:
  - active subscription refund -> downgrade to free/basic at provider-defined effective time.
  - current billing-period refund -> revoke premium immediately or at store-reported expiration, depending on platform signal.
  - partial/prorated Stripe refund -> keep access until paid-through date unless policy says otherwise.
  - goodwill refund -> apply agreed access outcome explicitly.
- user_notified -> factual message explaining refund, access impact, and recovery path.
- grace_period:
  - failed renewal / payment retry -> keep premium for configured grace period, e.g. 3–7 days for Stripe, store-defined for Apple/Google.
  - refund confirmed during grace -> end premium; no negative account action.
- chargeback/dispute:
  - pause disputed Stripe entitlement.
  - commerce-limit account while dispute is unresolved.
  - do not ban by default; open review and provide resolution path.
- abuse_review overlay:
  - triggered only by repeated/high-value refunds, suspicious repurchase/refund loops, chargebacks, or evidence of policy evasion.
- appeal_opened -> reversible hold state; support reviews order IDs, provider evidence, usage, prior cases.
- support_closed -> timeline contains purchase, grant, usage, refund, revocation, messages, support notes, and appeal outcome.

Decision table:
- First ordinary App Store/Google Play refund -> revoke/downgrade premium per store signal; no account restriction; send refund-confirmed macro.
- First ordinary Stripe refund within policy -> refund and downgrade at paid-through date or immediately if full-period refund; no account restriction; send confirmation.
- One-time goodwill refund -> refund once, document reason and “goodwill_used=true”; entitlement outcome stated in ticket; no punishment.
- Failed renewal in grace period -> keep premium during grace; send payment update reminders; downgrade if unpaid after grace.
- Subscription canceled without refund -> keep access until paid-through date; no account action; send cancellation confirmation.
- Full refund after heavy usage -> revoke premium; no ban; flag risk only if pattern repeats.
- Repeated refunds, e.g. 3+ refunds in 90 days or high-value refund loop -> downgrade refunded entitlement; warn and limit future refunds/self-serve refund eligibility; route to manual review.
- Repurchase after refund -> allow repurchase; restore premium normally; do not threaten punishment.
- Repeated repurchase/refund abuse after warning -> revoke refunded access; commerce-limit or require manual purchase review; appeal available.
- Stripe chargeback/dispute -> pause disputed entitlement; limit commerce/payment changes; ask user to resolve dispute or contact support.
- Chargeback won by merchant -> restore entitlement if subscription is valid or close dispute state.
- Chargeback lost/refunded -> downgrade premium; keep account active unless fraud evidence exists.
- Confirmed payment fraud, stolen card, account takeover, or forged receipts -> revoke affected entitlement; commerce block and security review; suspend only after evidence and appeal route.
- User claims refund was mistaken -> provide order-ID appeal path; restore if provider shows valid active paid subscription.

Repeat-abuse ladder:
- Level 0: Normal refund. Downgrade only; no warning beyond factual notice.
- Level 1: Pattern emerging. Inform user that refunded purchases cannot retain premium access.
- Level 2: Repeated refunds/high value. Manual review; disable self-serve goodwill refunds; require support approval.
- Level 3: Chargebacks or refund loops after warning. Commerce limit, pause disputed entitlements, require dispute resolution.
- Level 4: Strong fraud evidence. Suspend commerce or account access only after review; provide appeal instructions.
- Default answer on “warn, downgrade, or ban”: downgrade refunded entitlements; warn only for repeat patterns; ban only for proven fraud or severe abuse, never for a normal refund.

Support macros/events:

Macro — platform refund route:
```text
Refunds for purchases made through Apple App Store or Google Play are handled by the store. Please request the refund through your Apple or Google purchase history. Once the store confirms a refund to us, we will update your subscription access automatically.
```

Macro — refund confirmed/downgrade:
```text
We received confirmation that this subscription purchase was refunded. The refunded premium access has ended, but your account remains active. If you believe this is incorrect, reply with the order ID and we will review it.
```

Macro — Stripe refund approved:
```text
Your Stripe refund has been processed. Your premium access will end on [date/time] / has ended because the billing period was refunded. You can resubscribe anytime to restore premium features.
```

Macro — goodwill refund:
```text
As a one-time goodwill exception, we have refunded this purchase. This does not affect your account standing. Your premium access will [end now / remain until date] as confirmed in this ticket.
```

Macro — grace period/payment failed:
```text
We could not renew your subscription payment. Your premium access will remain active during the grace period until [date]. Please update your payment method to avoid being downgraded to the free plan.
```

Macro — chargeback:
```text
We received a payment dispute for this subscription, so the disputed premium access has been paused while the payment is reviewed. Your account remains active. Please resolve the dispute with your bank or contact us with the order details.
```

Macro — repeated refund review:
```text
We noticed repeated refunds on recent subscription purchases. Refunded purchases cannot keep premium access. Future refund or purchase activity may require manual review. If there is a billing or product issue, reply here and we will help.
```

Macro — appeal:
```text
If you believe this refund or access change is wrong, send the order ID, provider, purchase date, and any store or bank confirmation. We review appeals within [X] business days and will restore access if the purchase is valid.
```

Analytics/events:
- `purchase_started`
- `purchase_completed`
- `entitlement_granted`
- `subscription_canceled`
- `billing_grace_started`
- `billing_grace_ended`
- `payment_failed`
- `refund_requested`
- `refund_redirect_shown`
- `refund_detected`
- `refund_confirmed`
- `goodwill_refund_issued`
- `entitlement_adjusted_after_refund`
- `user_downgraded_after_refund`
- `refund_user_notified`
- `chargeback_opened`
- `chargeback_resolved`
- `commerce_limited`
- `abuse_review_opened`
- `appeal_opened`
- `appeal_resolved`

Analytics dimensions:
- provider: Apple, Google, Stripe
- refund type: normal, partial, goodwill, chargeback, fraud
- entitlement state before/after
- time from purchase to refund
- usage before refund
- refund count in 30/90/365 days
- support contact reason
- appeal outcome
- restored after appeal: yes/no
- churn reason and product-quality tags: accidental purchase, unclear pricing, missing feature, technical issue, policy mismatch.
