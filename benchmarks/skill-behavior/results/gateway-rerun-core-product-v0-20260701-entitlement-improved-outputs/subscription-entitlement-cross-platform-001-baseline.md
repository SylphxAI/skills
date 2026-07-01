## 1) Core principle

Maintain **one internal entitlement ledger** per user/team. External stores (Stripe, Apple, Google, invoices) are **payment/receipt sources**, not the source of truth for access. Entitlement is computed from validated events with deterministic precedence.

---

## 2) Entitlement model

### Entities

| Entity | Purpose |
|---|---|
| `User` | Login identity. |
| `Team` | Org-owned subscription, seats, admin billing. |
| `Entitlement` | Effective access grant: plan, scope, start/end, source, status. |
| `PurchaseSource` | Stripe / App Store / Google Play / Invoice. |
| `SubscriptionLink` | Maps external subscription or receipt identity to internal user/team. |
| `SeatAssignment` | User assigned to a paid team seat. |
| `EntitlementEvent` | Immutable audit log of validations, renewals, refunds, etc. |

### Entitlement scopes

| Scope | Owner | Applies to |
|---|---|---|
| Personal | User | Individual account |
| Team | Team | Members with active seats |
| Family | Store account family group | Only if store confirms entitlement |

---

## 3) Effective access resolution

For a user, compute active grants in this order:

1. **Team seat entitlement** if user has active seat in active team subscription.
2. **Personal paid entitlement** from Stripe/App Store/Google.
3. **Family-shared entitlement** only if verified by Apple/Google receipt APIs.
4. **Grace-period entitlement** if payment source says billing retry/grace is active.
5. **Offline cached entitlement** if within allowed offline window.
6. Free plan.

If multiple paid grants exist, expose the **highest plan/features** but keep each subscription independent. Do not auto-cancel another store subscription unless user explicitly manages it.

---

## 4) Subscription states

| State | Access? | Notes |
|---|---:|---|
| `trialing` | Yes | Until trial end. |
| `active` | Yes | Valid paid period. |
| `grace_period` | Yes | Payment failed but provider grants grace. |
| `past_due` | Optional/limited | Stripe configurable; recommend short grace then restrict. |
| `paused` | No or limited | Provider-specific. |
| `canceled_active_until_period_end` | Yes | Until paid-through date. |
| `expired` | No | Downgrade to free. |
| `refunded` | No from refund effective time | Full refund revokes. |
| `partially_refunded` | Usually yes | Unless policy says otherwise. |
| `chargeback` | No | Revoke and flag risk. |
| `revoked` | No | Fraud/admin/manual. |

---

## 5) Purchase and validation behavior

### Web Stripe

- Create checkout/customer portal using authenticated user/team.
- Store `stripe_customer_id`, `subscription_id`, `price_id`.
- Trust only Stripe webhooks, not client success redirects.
- Required webhooks:
  - `checkout.session.completed`
  - `customer.subscription.created/updated/deleted`
  - `invoice.paid`
  - `invoice.payment_failed`
  - `charge.refunded`
  - `charge.dispute.created`
- Validate webhook signatures.
- Entitlement end date = Stripe subscription `current_period_end` unless canceled/revoked/refunded earlier.

### App Store

- Use App Store Server API / Notifications V2.
- Validate signed transaction and renewal info.
- Link `original_transaction_id` to user on first verified purchase/restore.
- Handle:
  - renewal
  - expiration
  - billing retry
  - grace period
  - refund/revocation
  - upgrade/downgrade
  - family sharing fields where available
- Never trust device receipt alone without server validation.

### Google Play

- Validate purchases with Google Play Developer API.
- Link `purchaseToken` / subscription lineage to user.
- Handle RTDN events:
  - purchased
  - renewed
  - canceled
  - expired
  - in grace period
  - account hold
  - paused
  - revoked
  - refunded
- Acknowledge purchases after validation.

### Team admin invoice

- Admin purchases seats via Stripe invoice, manual invoice, or sales-assisted billing.
- Entitlement belongs to `Team`, not the admin personally.
- Access requires:
  - team subscription active/grace
  - user assigned active seat
  - user not removed/suspended

---

## 6) Restore purchases

### Mobile restore

1. User signs in.
2. App requests store receipt/purchase history.
3. Server validates with Apple/Google.
4. If external subscription already linked:
   - same user: restore access.
   - different user: deny automatic claim; show “subscription linked to another account” support flow.
5. If unlinked:
   - link to signed-in user after validation.
6. Recompute entitlement.

### Family sharing edge cases

- Family-shared purchase may restore on multiple Apple/Google family members.
- Do not bind family-shared entitlement as the purchaser’s personal subscription unless provider identifies it as owned.
- If family organizer cancels, removes member, or sharing stops, revoke at next validated event/expiry.
- Family sharing does not grant team seats.
- Do not allow family-shared entitlement to be transferred to web billing.

---

## 7) Team seat changes

| Action | Behavior |
|---|---|
| Add seat | Immediate access if billing policy allows seat expansion. |
| Remove seat | Access removed immediately or at period end per contract; recommend immediate for SaaS seats. |
| Reassign seat | Remove old member, grant new member; audit both. |
| Seat count reduction below assigned users | Mark excess users unseated; admin must choose or system removes newest/least-recent. |
| Team subscription canceled | Members retain access until paid-through date unless chargeback/refund. |
| Admin leaves team | Billing ownership must be transferred before admin removal. |

Personal subscriptions remain owned by the user even if they join/leave a team.

---

## 8) Plan changes and downgrades

| Change | Timing |
|---|---|
| Upgrade | Immediate feature access; prorate where provider supports. |
| Downgrade | Schedule for end of current paid period. |
| Cross-store downgrade | Not supported automatically; user must manage original store subscription. |
| Team plan downgrade | Schedule at period end; warn if current usage exceeds future limits. |
| Feature over-limit after downgrade | Keep data read-only/archived; block new usage above limit. |

---

## 9) Grace periods, refunds, chargebacks

| Event | Behavior |
|---|---|
| Payment failure with provider grace | Keep access until grace end. |
| Payment failure without grace | Enter `past_due`; restrict after internal grace window. |
| Full refund | Revoke entitlement from refund effective timestamp. |
| Partial refund | Keep access unless tied to cancellation. |
| Chargeback/dispute | Immediately revoke, flag account, block re-purchase if fraud policy requires. |
| Store revocation | Revoke according to Apple/Google revocation timestamp. |

---

## 10) Offline mobile access

- App stores signed entitlement token from server:
  - user ID
  - plan
  - feature flags
  - entitlement source
  - expiry
  - issued-at
  - signature
- Recommended offline window: **3–7 days**, never beyond paid-through/grace end.
- On app launch, use cached entitlement only if token valid and unexpired.
- On reconnect, refresh entitlement and upload audit events.
- If refund/chargeback occurs while offline, revoke on next sync; optionally require periodic online check for premium actions.

---

## 11) Audit and consistency requirements

- Every provider event is idempotently processed using external event ID.
- Keep immutable `EntitlementEvent` records.
- Store raw provider payloads or signed references for audit.
- Entitlement recomputation must be deterministic.
- Prefer provider webhooks/server notifications over client claims.
- Support manual admin override with reason, actor, start/end, and audit trail.
