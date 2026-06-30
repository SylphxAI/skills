# Payment Platform Patterns

## Payment system layers

1. Catalog: products, plans, regions, prices, eligibility.
2. Checkout: payment sheet/store purchase, taxes, authentication, failure handling.
3. Confirmation: receipts, webhooks, server notifications, idempotency.
4. Entitlement: grant, renew, pause, grace, revoke, restore.
5. Support: invoice/receipt lookup, refunds, disputes, adjustment ledger.
6. Reconciliation: processor/store truth versus internal ledger.

## Rule IDs

- `payment-1` — Treat platform/store/processor events as the source for money movement; treat internal entitlements as derived product state.
- `payment-2` — Use idempotency keys and immutable ledger events for purchase, grant, renewal, refund, dispute, and adjustment.
- `payment-3` — Separate catalog identifiers from entitlement identifiers so products can change without corrupting access history.
- `payment-4` — Restore purchases must be visible, testable, and supportable for app-store products.
- `payment-5` — Apple Pay and Google Pay are wallet checkout methods, not subscription policy systems by themselves.
- `payment-6` — Google Play Billing and App Store IAP require store-specific purchase tokens/receipts, renewal states, refund/revoke handling, and sandbox tests.
- `payment-7` — Web checkout needs tax/VAT assumptions, invoice email, payment method update, cancellation, and failed-payment recovery.
- `payment-8` — Marketplaces need seller onboarding, payouts, disputes, tax identity, holds, and buyer/seller support separation.
- `payment-9` — Payment UI must disclose renewal, trial, price, period, cancellation, refund path, and material limits.
- `payment-10` — Support tooling must find transactions by user, order ID, provider ID, product ID, entitlement ID, and support case.

## State machine

```text
checkout_started -> payment_pending -> payment_confirmed -> entitlement_granted
       |                    |                    |
       v                    v                    v
checkout_failed       payment_abandoned      refund_or_dispute_detected
                                                |
                                                v
                                         entitlement_revoked_or_adjusted
```

## Launch checklist

- Sandbox and production credentials separated.
- Product catalog reviewed for region, currency, and tax assumptions.
- Server-side receipt/webhook verification implemented.
- Idempotent grant and revoke paths tested.
- Restore purchase and payment-method update tested.
- Refund/dispute support macro and ledger view ready.
- Metrics cover checkout start, provider confirmation, grant, failure, refund, and support contact.
