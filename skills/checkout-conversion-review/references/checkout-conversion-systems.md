# Checkout Conversion Systems

Use checkout review as a product-system review: the user is deciding whether to trust the product, not merely entering payment details.

## Rule IDs

- `checkout-1` — The user should know what they are buying, when they will be charged, what renews, what is refundable, and what they get immediately.
- `checkout-2` — Keep the path short only after the decision is clear; remove avoidable fields, not material terms.
- `checkout-3` — Offer wallets such as Apple Pay or Google Pay when they reduce typing and increase trust, but keep a reliable non-wallet fallback.
- `checkout-4` — Separate quote, payment authorization, payment capture, receipt processing, entitlement grant, and confirmation in state and analytics.
- `checkout-5` — Never let a retry duplicate grants, orders, invoices, or consumed promotion codes.
- `checkout-6` — Show recoverable payment errors with a next action: change method, retry later, contact bank, use alternate channel, or contact support.
- `checkout-7` — Discounts need explicit eligibility, duration, renewal price, stacking rules, and refund consequences.
- `checkout-8` — Taxes, fees, and currency should appear before final confirmation when they materially affect price perception.
- `checkout-9` — Post-purchase confirmation must include receipt, entitlement status, support route, and restore/download/start action.
- `checkout-10` — Optimize for net revenue quality: conversion, activation, refund, dispute, support contact, and retained value together.

## Funnel decision table

| Scenario | Conversion risk | Product response | Support/analytics evidence |
| --- | --- | --- | --- |
| User is comparing plans | Confusion or wrong plan purchase | Show plan fit, limits, upgrade path, cancellation route | `plan_compared`, selected plan, objections clicked |
| User starts checkout on mobile web | Form friction and wallet absence | Prefer wallet, email autofill, concise fields, visible security/trust | `checkout_started`, device class, payment method offered |
| Card authorization fails | Churn or repeated failed attempts | Preserve cart, explain next action, offer alternate method | `payment_failed`, provider reason class, retry count |
| Payment succeeds but grant is delayed | Support tickets and trust loss | Show pending state, retry grant idempotently, alert support | `entitlement_pending`, order ID, grant attempts |
| Discount applied | Surprise renewal or margin loss | Show current price, renewal price, end date, non-stack rules | `discount_applied`, offer ID, renewal price shown |
| User cancels on payment page | Price/trust objection unknown | Ask one optional reason or infer from last interaction | `checkout_abandoned`, last step, reason if given |

## State machine

```text
offer_viewed -> plan_selected -> checkout_started -> quote_created
quote_created -> payment_method_selected -> payment_authorized
payment_authorized -> payment_captured -> receipt_created -> entitlement_granted -> confirmation_shown
payment_authorized -> payment_failed -> recovery_offered -> payment_method_selected
payment_captured -> entitlement_pending -> entitlement_granted
payment_captured -> entitlement_failed -> support_escalated
checkout_started -> abandoned
```

## Event schema

Required events:

- `offer_viewed`: user_id/session_id, offer_id, placement, plan_id, price, currency, segment.
- `checkout_started`: cart_id, product_type, platform, device_class, payment_methods_available.
- `quote_created`: quote_id, subtotal, tax, discount, total, currency, renewal_price, trial_days.
- `payment_submitted`: payment_method_type, provider, wallet_used, saved_method_used.
- `payment_failed`: provider, reason_class, retryable, attempt_count, cart_id.
- `entitlement_granted`: order_id, entitlement_id, grant_latency_ms, idempotency_key.
- `checkout_abandoned`: last_step, elapsed_ms, user_state, plan_id.

## Review checklist

- Price, renewal, cancellation, refund, and tax terms are visible before commitment.
- Wallets, saved payment methods, and fallback methods are matched to platform norms.
- Errors are classified into retryable, user-action, provider-action, and support-action.
- Idempotency keys cover payment submission, order creation, discount redemption, and entitlement grant.
- Confirmation makes the next product action obvious.
- Metrics include conversion and quality guardrails: refunds, disputes, support contact, activation, retained revenue.
