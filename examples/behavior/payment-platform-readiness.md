# payment-platform-readiness behavior example

skill: payment-platform-readiness

## Positive prompt

> Audit an iOS subscription payment flow with Apple Pay, IAP, restore purchases, refunds, and support tooling.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Separates catalog, checkout, receipt/webhook, entitlement, refund, support, and reconciliation.
- Rejects client-only durable grants and includes idempotent ledger events.
- Defines provider-specific precedence for Apple IAP, Google Play, Stripe, wallets, promo codes, restore purchases, renewals, refunds, revocations, disputes, chargebacks, and manual adjustments.
- Projects entitlements from an append-only ledger with provider effective time, idempotency keys, receipt lineage, correction events, and replay-safe state.
- Separates refund, cancellation, partial refund, revocation, chargeback, grace, billing retry, restore, promo, and support adjustments instead of collapsing them into one revoke policy.
- Includes reconciliation across provider state, internal ledger, entitlements, invoices, taxes, fees, settlement, refunds, disputes, support overrides, and finance close.
- Defines support-safe correction tooling, role-gated manual grants/revokes, customer messaging, launch fixtures, observability, dead-letter replay, and projector rebuild gates.

It should also produce the artifact shape requested by `skills/payment-platform-readiness/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review landing page headline copy.

The skill should not load for this prompt unless the user adds an explicit payment-platform-readiness context.

## Expected behavior

- Separates catalog, checkout, receipt/webhook, entitlement, refund, support, and reconciliation.
- Rejects client-only durable grants and includes idempotent ledger events.
- Defines provider-specific precedence for Apple IAP, Google Play, Stripe, wallets, promo codes, restore purchases, renewals, refunds, revocations, disputes, chargebacks, and manual adjustments.
- Projects entitlements from an append-only ledger with provider effective time, idempotency keys, receipt lineage, correction events, and replay-safe state.
- Separates refund, cancellation, partial refund, revocation, chargeback, grace, billing retry, restore, promo, and support adjustments instead of collapsing them into one revoke policy.
- Includes reconciliation across provider state, internal ledger, entitlements, invoices, taxes, fees, settlement, refunds, disputes, support overrides, and finance close.
- Defines support-safe correction tooling, role-gated manual grants/revokes, customer messaging, launch fixtures, observability, dead-letter replay, and projector rebuild gates.
