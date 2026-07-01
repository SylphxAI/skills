# Subscription Entitlement Patterns

## Core invariant

Payment provider events are evidence of commerce state. Entitlements are product access derived from verified commerce events, plan rules, support adjustments, and policy decisions.

## State machine

```text
unknown -> trialing -> active -> grace -> past_due -> expired
                 |        |        |         |          |
                 v        v        v         v          v
              canceled  upgraded  downgraded refunded  revoked
active -> paused -> active | expired
unknown_or_expired -> restore_pending -> restored_active | restore_not_found
active -> offline_active -> offline_expired | online_reconciled
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
- `entitlement-11` — Cross-channel systems need an explicit precedence table. Do not let a refund, family-share removal, or seat removal revoke unrelated active access from another channel.
- `entitlement-12` — Provider notifications can be late, duplicated, replayed, or out of order. Dedupe by provider event ID plus source object ID, store provider effective time, and recompute entitlements from ordered ledger facts.
- `entitlement-13` — Paused subscriptions are neither canceled nor expired. Preserve the provider's pause/resume semantics, effective dates, access policy, and user copy.
- `entitlement-14` — Restored purchases are a reconciliation state, not a new purchase. A restore can reactivate access only after verified provider truth matches an active entitlement.
- `entitlement-15` — Offline mobile access needs a short TTL, signed entitlement snapshot, feature scope, last_verified_at, and mandatory online reconciliation before extension.

## Decision table

| Event | Commerce state | Entitlement action | User message |
| --- | --- | --- | --- |
| Trial started | trialing | Grant trial benefits | Trial active until date; cancellation path visible |
| Renewal failed | past_due/grace | Keep or limit access by policy | Update payment to avoid losing access |
| User canceled | active_until_period_end | Keep paid access until end if provider semantics allow | Access continues until date |
| Refund confirmed | refunded | Revoke or adjust refunded entitlement | Refunded purchase no longer grants access |
| Downgrade scheduled | pending change | Apply at effective date | Plan changes on date; data/limit impact explained |
| Store restore | provider truth replayed | Reconcile existing entitlement | Purchases restored or no active purchase found |
| Subscription paused | paused | Apply pause policy: limited/read-only/keep access until provider effective date | Subscription paused; access resumes or expires on date |
| Restore verified active | restored_active | Resume derived entitlement from existing ledger/source lineage | Purchase restored; no duplicate billing created |
| Offline snapshot issued | offline_active | Allow scoped access until TTL | Offline access available until date; reconnect to refresh |

## Paused, restored, and offline state semantics

| State | Entry | Access policy | Exit | Support evidence |
| --- | --- | --- | --- | --- |
| `paused` | Provider pause event, team admin pause, or support-approved pause with effective_at | Provider-specific: keep paid access until pause date, then limit to read-only/export or free tier | `resume_effective_at`, cancellation, expiration, or support correction | pause source, effective_at, resume_at, message key |
| `restore_pending` | User taps restore/resync on iOS/Android or signs in on new device | No new durable grant yet; show neutral "checking purchases" state | `restored_active`, `restore_not_found`, or `support_reviewable` | restore request ID, provider account hint, transaction/order lineage |
| `restored_active` | Provider validation finds active original transaction/purchase token lineage | Resume entitlement from existing source lineage; do not create duplicate subscription | normal active/renewal/refund/expiration transitions | original transaction ID or purchase token, previous ledger link |
| `restore_not_found` | Provider validation returns no active purchase | Keep current non-store access; show no active store purchase found | user buys, logs into correct store account, or support correction | provider response, app account, store account hint if available |
| `offline_active` | Recently verified active entitlement snapshot signed for mobile offline use | Scoped access only; no plan upgrades, purchases, team admin, or export of sensitive data while offline | online reconciliation, TTL expiry, refund/revoke conflict | snapshot ID, signed_at, last_verified_at, ttl, feature scope |
| `offline_expired` | Offline TTL expires before reconciliation | Graceful degradation to read-only/free tier with reconnect CTA | online reconciliation or support path | TTL expiry reason and user-facing message |

## Cross-channel precedence

Use a literal precedence table whenever a user can have more than one source of access.

| Source | Grants | Cannot grant | Conflict rule |
| --- | --- | --- | --- |
| Team invoice seat | Team-scoped plan while invoice/contract is active and seat is assigned | Personal billing ownership, family-owner benefits | Highest product access for workspaces covered by the team. Removing the seat revokes only team-derived access. |
| Enterprise/support override | Time-bounded entitlement or correction with reason and approver | Permanent hidden access without audit trail | Applies only to named scope and expiry; must not mask provider disputes or fraud indefinitely. |
| Stripe web subscription | Web-owned personal or account plan | App Store/Google billing management | If coexisting with app-store purchase, grant highest active tier and show duplicate-subscription guidance. |
| App Store owner purchase | Apple-owned personal entitlement validated by original transaction ID | Google/Stripe billing management | Grant until Apple expiration/revocation. Family-shared access is lower precedence than owner purchase. |
| Google Play owner purchase | Google-owned personal entitlement validated by purchase token lineage | Apple/Stripe billing management | Follow linked purchase tokens for replacements; grant until Google expiry/revocation. |
| Family sharing | Shared access only where store policy and product policy allow it | Billing management, team/admin privileges, owner-only benefits | Grant lowest eligible paid tier unless a personal/team entitlement is active. Revocation removes only shared access. |
| Free/default plan | Baseline access | Paid features | Used only when no active paid/team/shared/support source grants access. |

Conflict resolution rules:

- Choose the highest currently valid entitlement for access, but keep each billing source independent.
- Never cancel or refund one channel because another channel is active; instead show duplicate-subscription guidance.
- Do not transfer Apple/Google purchases between accounts automatically when restore finds an already-linked transaction; route to support/manual review.
- Refund, chargeback, revocation, or seat removal affects only the source that produced that event unless policy explicitly escalates to account-level fraud review.
- Team access can supersede individual access for workspace features, but a team downgrade must not destroy a still-active personal subscription.

## Event ordering and idempotency

Store provider facts before deriving entitlements:

```text
provider_event_id
provider
provider_object_id
provider_effective_at
received_at
normalized_event_type
user_id/account_id/team_id
product_id/plan_id
source_lineage_id
idempotency_key
raw_payload_ref
ledger_sequence
```

Processing rules:

- Dedupe by `(provider, provider_event_id)` when available; otherwise use a stable `(provider, provider_object_id, normalized_event_type, provider_effective_at)` idempotency key.
- Keep both provider effective time and received time; entitlement recomputation orders by provider effective time, then ledger sequence as a deterministic tie-breaker.
- Recompute derived entitlement state from the append-only ledger instead of patching current access in place.
- Treat webhooks, App Store notifications, Google RTDN, restore actions, and support adjustments as ledger inputs with source labels.
- Run reconciliation jobs against provider APIs to repair missed notifications and emit correction events rather than silently editing state.

## Event schema

Track:

```text
provider_event_received
receipt_validation_succeeded
receipt_validation_failed
subscription_created
trial_started
renewal_succeeded
renewal_failed
grace_started
grace_ended
subscription_canceled
subscription_paused
subscription_resumed
plan_changed
refund_detected
chargeback_opened
chargeback_resolved
team_seat_assigned
team_seat_removed
family_share_detected
family_share_revoked
offline_entitlement_issued
offline_entitlement_expired
entitlement_recomputed
entitlement_granted
entitlement_limited
entitlement_revoked
restore_purchase_started
restore_purchase_completed
restore_purchase_blocked
restore_purchase_not_found
support_adjustment_requested
support_adjustment_applied
support_adjustment_expired
reconciliation_started
reconciliation_corrected_state
```

For each event, include: actor/system, source channel, source object ID, previous state, next state, effective time, user-facing message key, support-visible reason, and correlation/request ID.

Additional required fields for paused/restored/offline states:

```text
pause_effective_at
resume_effective_at
restore_request_id
original_transaction_id
purchase_token_lineage
offline_snapshot_id
offline_scope
last_verified_at
offline_ttl_expires_at
reconciliation_result
```
