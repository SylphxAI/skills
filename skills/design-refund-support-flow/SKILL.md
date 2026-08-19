---
name: design-refund-support-flow
description: 'Design the customer and entitlement consequence of a refund, cancellation, dispute, or chargeback. Use when spent value, access, and support action must stay consistent with payment truth without owning the ledger.'
---

# Design Refund and Support Flow

Handle refunds without damaging trust or letting abuse break the product.

This skill owns entitlement and customer consequence, not provider money truth. Consume ledger and entitlement facts from `build-payment-readiness`.

## Method

1. Identify purchase type, refund authority, what was spent or consumed, and who may reverse it.
2. Separate money truth, remaining entitlement, product consequence, account action, and support communication.
3. Ordinary refunds reverse remaining unused value and leave unrelated progress standing. Spent consumables need an explicit consequence, not a silent rewrite of history.
4. Chargebacks, repeated spent-value refunds, and fraud use an evidence-based ladder with appeal. Do not trade refunds for review deletion.
5. Open [refund support flow patterns](references/refund-support-flow-patterns.md) for reason codes and state tables.

## Output

Consequence map: money fact, entitlement fact, customer action, appeal, and owner.
