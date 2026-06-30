# Refund And Support Flow Patterns

## Refund flow state machine

```text
refund_requested -> refund_pending -> refund_confirmed -> entitlement_adjusted -> user_notified -> support_closed
        |                 |                    |                    |
        v                 v                    v                    v
platform_redirect   refund_rejected      review_required      appeal_opened
```

Abuse review is an overlay, not the default path.

## Rule IDs

- `refund-flow-1` — Identify who controls the refund: app store, payment processor, marketplace, or internal support.
- `refund-flow-2` — Separate refund confirmation from entitlement revocation and account punishment.
- `refund-flow-3` — Use an abuse ladder: inform, reconcile, limit commerce, review, suspend only after evidence.
- `refund-flow-4` — Support should see purchase, grant, spend/use, refund, revoke, messages, and prior cases in one timeline.
- `refund-flow-5` — Consumable refunds need careful handling of spent value; avoid surprise negative balances by default.
- `refund-flow-6` — Repurchase offers must restore value, not threaten punishment.
- `refund-flow-7` — Chargebacks and fraud signals justify stronger commerce limits than normal refunds, but still need review paths.
- `refund-flow-8` — Refund copy should be factual, non-accusatory, and specific about access consequences.
- `refund-flow-9` — Appeals need evidence requirements, expected timeline, and a reversible hold state.
- `refund-flow-10` — Refund data should feed product quality loops: accidental purchase, unclear pricing, support gaps, or policy mismatch.

## Decision table

| Scenario | Entitlement action | Account action | Support action |
| --- | --- | --- | --- |
| Accidental subscription purchase | Revoke after confirmed refund or at provider-defined time | None | Explain platform refund route and restore path |
| Non-consumable refund | Revoke feature/license | None | Confirm access ended; show repurchase path |
| Consumable spent before refund | Reconcile ledger, avoid surprise debt by default | Risk score if repeated | Route repeated high-value cases to review |
| Chargeback | Pause disputed entitlement | Commerce-limited pending review | Ask user to resolve dispute or contact support |
| Repeated refund abuse | Revoke where possible | Commerce limit or manual review | Use evidence-based macro and appeal path |

## Support macro pattern

Use: acknowledge, state what happened, explain access impact, provide next action, provide appeal/support route.

```text
We received confirmation that this purchase was refunded. The refunded premium access has ended, but your account remains active. If you believe this is wrong, reply with the order ID and we will review it.
```

## Event schema

Track: `refund_requested`, `refund_redirect_shown`, `refund_detected`, `entitlement_adjusted_after_refund`, `refund_user_notified`, `refund_support_case_opened`, `commerce_limited`, `appeal_opened`, `appeal_resolved`.
