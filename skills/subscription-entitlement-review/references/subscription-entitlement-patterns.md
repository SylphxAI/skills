# Subscription Entitlement Patterns

## Core invariant

Payment provider events are evidence of commerce state. Entitlements are product access derived from verified commerce events, plan rules, support adjustments, and policy decisions.

## State machine

```text
unknown -> trialing -> active -> grace -> past_due -> expired
                 |        |        |         |          |
                 v        v        v         v          v
              canceled  upgraded  downgraded refunded  revoked
```

Support/fraud overlays should be separate: `manual_review`, `commerce_limited`, `account_suspended`.

## Rule IDs

- `entitlement-1` — Separate product catalog IDs, subscription IDs, entitlement IDs, and user/account IDs.
- `entitlement-2` — Grant and revoke access from verified provider/store events plus idempotent internal ledger events.
- `entitlement-3` — Cancellation stops future renewal; refund reverses money; revocation changes access. Do not collapse them.
- `entitlement-4` — Grace periods apply to failed renewal or payment recovery, not ordinary refunded access.
- `entitlement-5` — Upgrades, downgrades, and plan switches need explicit proration/effective-date semantics.
- `entitlement-6` — Restore purchase must reconcile store truth without duplicating grants.
- `entitlement-7` — Usage limits should degrade predictably on downgrade or expiry; preserve export/read-only paths where practical.
- `entitlement-8` — Support tools must show provider event, ledger event, entitlement state, effective time, and user-facing message.
- `entitlement-9` — Trials must disclose renewal, cancellation, eligibility, conversion timing, and trial abuse controls.
- `entitlement-10` — Entitlement calculations should be reproducible from ledger history for audit and support.

## Decision table

| Event | Commerce state | Entitlement action | User message |
| --- | --- | --- | --- |
| Trial started | trialing | Grant trial benefits | Trial active until date; cancellation path visible |
| Renewal failed | past_due/grace | Keep or limit access by policy | Update payment to avoid losing access |
| User canceled | active_until_period_end | Keep paid access until end if provider semantics allow | Access continues until date |
| Refund confirmed | refunded | Revoke or adjust refunded entitlement | Refunded purchase no longer grants access |
| Downgrade scheduled | pending change | Apply at effective date | Plan changes on date; data/limit impact explained |
| Store restore | provider truth replayed | Reconcile existing entitlement | Purchases restored or no active purchase found |

## Event schema

Track: `subscription_created`, `trial_started`, `renewal_succeeded`, `renewal_failed`, `grace_started`, `subscription_canceled`, `plan_changed`, `refund_detected`, `entitlement_granted`, `entitlement_revoked`, `restore_purchase_started`, `restore_purchase_completed`, `support_adjustment_applied`.
