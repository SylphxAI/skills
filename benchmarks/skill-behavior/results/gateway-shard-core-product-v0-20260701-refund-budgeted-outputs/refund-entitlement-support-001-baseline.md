## Refund Handling Design for Mobile Subscription App

### 1. Principles

- **Entitlements follow payment state**, not support intent.
- **Refunded subscription time is not retained** unless explicitly approved as goodwill.
- **App Store and Google Play refunds are controlled by the platform**; Stripe refunds are controlled by us.
- **Grace periods apply to failed renewals**, not completed refunds.
- **Chargebacks are treated as higher-risk than voluntary refunds**.
- **Repeat refund abuse should normally result in downgrade first, warnings second, and bans only for clear fraud or payment-risk behavior.**

---

## 2. Purchase Sources

| Source | Refund Authority | Signal Source | Action Owner |
|---|---:|---|---|
| Apple App Store | Apple | App Store Server Notifications / API | Automated entitlement sync |
| Google Play | Google | Real-Time Developer Notifications / Play Developer API | Automated entitlement sync |
| Stripe | Us / bank | Stripe webhooks | Billing system + support |
| Chargeback | Bank / card network | Stripe dispute webhooks | Billing / risk |

---

## 3. Entitlement Revocation Rules

### Apple App Store

On refund or revoked transaction notification:

- Mark subscription transaction as `refunded` or `revoked`.
- Recalculate entitlement from latest valid, non-refunded transaction.
- If no valid active subscription remains:
  - Downgrade user to free tier immediately.
  - Remove premium features.
  - Preserve user data according to retention policy.
- Do not promise Apple refunds in support; direct users to Apple refund flow.

### Google Play

On refund, revoke, or cancellation with refund:

- Verify purchase token status via Google Play Developer API.
- If purchase is refunded or revoked:
  - Mark purchase as `refunded`.
  - Remove entitlement immediately unless another active purchase exists.
- For partial refunds, revoke only if Google indicates entitlement should end or subscription is no longer active.

### Stripe

On `charge.refunded`, `checkout.session.expired`, `customer.subscription.deleted`, or equivalent:

- Full refund:
  - Revoke entitlement immediately unless refund is explicitly tagged as goodwill-with-access.
- Partial refund:
  - Keep entitlement unless refund corresponds to cancellation of unused term.
- Refund and cancel:
  - End entitlement at refund effective date.
- Refund without cancel:
  - Allow only with explicit approval reason.

---

## 4. Grace Period Handling

Grace periods are for **payment failure**, not for refunds.

### Billing Retry Grace Period

Applicable when renewal payment fails but no refund has occurred.

- Keep entitlement active for configurable period, e.g. 3–7 days.
- Show billing recovery prompts.
- If payment succeeds: continue subscription.
- If grace expires: downgrade to free tier.

### Refunds During Grace Period

If a refund or chargeback occurs during grace:

- End grace immediately.
- Downgrade user unless another valid entitlement exists.

---

## 5. Chargebacks and Disputes

### Stripe Chargebacks

On `charge.dispute.created`:

- Immediately flag account as `payment_dispute_open`.
- Revoke entitlement for the disputed purchase.
- Prevent additional Stripe purchases until dispute closes or payment method is updated.
- Send neutral notice: “Your payment was disputed, so access tied to that payment has been paused.”

On `charge.dispute.closed`:

- If won:
  - Restore entitlement if subscription is still valid.
  - Remove payment-risk hold.
- If lost:
  - Keep entitlement revoked.
  - Record dispute loss.
  - Consider account warning or restriction based on history.

### App Store / Google Chargebacks

Usually abstracted through platform refund/revocation events.

- Treat as refunded/revoked purchase.
- Do not ban solely based on one platform refund event.

---

## 6. Refund Abuse Policy

### Abuse Signals

Track per user, device, payment method, email, and platform account where available:

- Multiple refunds within short period.
- Repeated subscribe-use-refund cycles.
- Refund immediately after consuming premium content.
- Multiple accounts sharing same card/device/IP pattern.
- Chargebacks after support offered standard refund route.
- Attempting to obtain refunds from support and platform for same purchase.
- Harassment or threats to obtain refunds.

### Suggested Thresholds

| Pattern | Action |
|---|---|
| First normal refund | Downgrade only, no warning |
| Second refund in 90 days | Downgrade + soft warning |
| 3+ refunds in 180 days | Downgrade + block goodwill refunds |
| 2+ chargebacks in 12 months | Block purchases and escalate review |
| Clear fraud, stolen payment, evasion | Ban or suspend account |

### Warn, Downgrade, or Ban

Default policy:

1. **Downgrade** when payment is refunded or revoked.
2. **Warn** when pattern suggests misuse but is not clearly fraudulent.
3. **Ban or suspend** only for:
   - Chargeback abuse.
   - Fraudulent payment activity.
   - Account cycling to avoid payment.
   - Refund abuse combined with harassment, threats, or policy evasion.

Do not ban users merely for requesting a legitimate refund.

---

## 7. One-Time Goodwill Refunds

A goodwill refund is an exception granted by support.

### Eligibility

Allowed when:

- User reports accidental renewal.
- User forgot to cancel and has low usage after renewal.
- Technical issue prevented use.
- User has no recent goodwill refund.
- Account has no fraud or chargeback flags.

### Rules

- Limit to **one goodwill refund per user lifetime** or per rolling 12–24 months.
- Record reason code and agent ID.
- For Stripe, support may process directly if within policy.
- For Apple/Google, support cannot issue refund directly:
  - Provide platform refund instructions.
  - Optionally grant temporary access or coupon if appropriate.

### Entitlement After Goodwill Refund

Default:

- Refund causes downgrade.

Exception:

- A manager may approve `goodwill_refund_keep_access` for serious service failure.
- Must be logged with reason and expiration date.

---

## 8. Support Macros

### Macro: Apple Refund Request

> Thanks for contacting us. Purchases made through the Apple App Store are billed and refunded by Apple directly.  
>  
> You can request a refund here: https://reportaproblem.apple.com/  
>  
> If Apple approves the refund, your premium access may be removed automatically because the subscription payment will no longer be active.

### Macro: Google Play Refund Request

> Thanks for contacting us. Purchases made through Google Play are handled by Google.  
>  
> You can request a refund through Google Play using your order history or this guide: https://support.google.com/googleplay/answer/2479637  
>  
> If Google approves the refund, premium access may be removed automatically.

### Macro: Stripe Refund Approved

> We’ve approved your refund. The refunded amount should appear on your payment method according to your bank’s processing timeline.  
>  
> Because the subscription payment has been refunded, your premium access has been downgraded effective immediately.

### Macro: One-Time Goodwill Refund

> As a one-time courtesy, we’ve issued a goodwill refund for this purchase.  
>  
> Please note that future refunds may not be available outside our standard policy. Your premium access will be removed unless otherwise stated.

### Macro: Refund Abuse Warning

> We noticed multiple refund requests or refunded purchases on this account. Refunds are intended for exceptional cases, not repeated short-term access.  
>  
> Future refund requests may be denied, and repeated payment disputes may result in account restrictions.

### Macro: Chargeback / Dispute

> We received notice that the payment for your subscription was disputed with your bank or card provider. Access linked to that payment has been paused while the dispute is reviewed.  
>  
> If this was accidental, please contact your bank or update your payment method.

---

## 9. Analytics and Audit Events

Log immutable billing events:

- `purchase_created`
- `subscription_renewed`
- `payment_failed`
- `grace_started`
- `grace_expired`
- `refund_requested`
- `refund_approved`
- `refund_denied`
- `platform_refund_detected`
- `entitlement_revoked`
- `entitlement_restored`
- `chargeback_opened`
- `chargeback_won`
- `chargeback_lost`
- `goodwill_refund_granted`
- `refund_abuse_warning_sent`
- `purchase_blocked`
- `account_suspended`

Required fields:

- User ID
- Platform
- Transaction/order ID
- Subscription product
- Refund amount
- Currency
- Reason code
- Effective entitlement date
- Agent/system actor
- Abuse score at time of action
- Linked support ticket

### Metrics

- Refund rate by platform/product/cohort.
- Chargeback rate.
- Refund-to-active-use ratio.
- Goodwill refund count by agent.
- Entitlement revocation latency.
- Repeat refund rate.
- Dispute loss rate.
- Revenue leakage from refunded-but-active accounts.
- Support contacts per refund.
- Abuse warnings and subsequent behavior.

---

## 10. Operational Controls

- Nightly reconciliation against Apple, Google, and Stripe.
- Idempotent webhook processing.
- No manual entitlement extension without reason code.
- Refund and entitlement changes must be linked.
- Separate support permissions:
  - View billing.
  - Issue Stripe refund.
  - Grant goodwill.
  - Override entitlement.
- Manager approval for:
  - Refund while keeping access.
  - Refunds outside window.
  - Any ban based on refund abuse alone.
