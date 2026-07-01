## 1) Safest ledger model

**Use an append-only, immutable payment/entitlement event ledger.** Never directly mutate subscription state from webhooks or clients.

### Core tables

**`payment_events`**
- `event_id` internal UUID
- `provider`: `apple | google | stripe | promo | admin | internal`
- `provider_event_id` / notification ID
- `provider_transaction_id`
- `original_transaction_id` / purchase token / subscription ID
- `user_id`, if known
- `product_id`, `plan_id`, `environment`
- `event_type`: purchase, renewal, cancellation, refund, chargeback, grace, hold, recovery, promo_grant, admin_grant, revoke
- `effective_at`: when entitlement should start/end
- `occurred_at`: provider event time
- `received_at`: backend ingest time
- `payload_hash`, raw payload pointer
- `verification_status`
- `idempotency_key`
- Unique constraints per provider identity

**`entitlement_periods`**
- Derived projection, rebuildable from ledger
- `user_id`
- `entitlement_type`
- `source`
- `source_ref`
- `starts_at`
- `ends_at`
- `status`: active, expired, revoked, refunded, chargeback, superseded
- `revoked_at`, `revocation_reason`

**`subscription_identities`**
- Maps Apple original transaction ID, Google purchase token, Stripe subscription/customer, promo/admin grants to user accounts.
- Supports account merge and restore flows.

### Design rules

- Webhooks, restores, checkout success pages, and admin grants only **append events**.
- A deterministic projector computes current entitlement from the event ledger.
- Projector must be **idempotent, replayable, and order-independent**.
- Provider-verified events always outrank client-reported state.
- Negative financial events — refund, chargeback, revocation — must override prior grants for the affected period.
- Never delete events. Use compensating events.

---

## 2) Event ordering and reconciliation policy

### Ordering

Compute state using:

1. `effective_at`
2. provider transaction lineage
3. provider verification result
4. event precedence
5. ingest timestamp as final tiebreaker

### Precedence, highest first

1. Chargeback / dispute lost
2. Refund / revoke
3. Provider cancellation with entitlement end
4. Renewal / recovery
5. Initial purchase
6. Promo/admin grant
7. Client restore hint

### Out-of-order handling

- Accept late webhooks.
- Rebuild affected user’s entitlement projection after every relevant event.
- If a refund arrives after a renewal, revoke only the provider-indicated transaction/period.
- If delayed renewal arrives after expiration, restore access from its effective start date.
- If duplicate events arrive, store once or mark duplicate by idempotency key.

---

## 3) Provider-specific controls

### Apple IAP

- Verify App Store Server Notifications v2 signatures.
- Use `originalTransactionId` as subscription lineage.
- Query Apple transaction history during restore or reconciliation.
- Respect revocation/refund fields.
- Treat client receipt as a hint only; backend verifies.

### Google Play

- Verify purchase tokens with Google Play Developer API.
- Use purchase token and linked purchase token lineage.
- Handle account hold, grace period, pause, cancel, refund, revoke.
- Pull current subscription state during reconciliation.

### Stripe Checkout

- Fulfill only after verified webhook, not redirect success page.
- Use `checkout.session.completed`, `invoice.paid`, `customer.subscription.updated/deleted`, `charge.refunded`, `dispute.created/closed`.
- Store Stripe customer, subscription, invoice, payment intent, charge IDs.
- Handle async payment methods where payment succeeds later.

### Promo/admin grants

- Require grant reason, actor, duration, and audit trail.
- Promo grants should not override paid refund/chargeback restrictions unless explicitly allowed.
- Support reversible grants via compensating revoke event.

---

## 4) Entitlement calculation

For each user:

- Build all valid entitlement periods from verified ledger events.
- Merge overlapping active periods for the same entitlement.
- Apply revocations to exact affected source periods.
- Current access = now is within at least one non-revoked entitlement period.
- Future access = any valid future period.
- If provider status is ambiguous, prefer safe temporary access only where policy allows, e.g. short grace window.

Recommended policy:

- Paid purchase verified: grant.
- Provider grace period: grant until provider grace end.
- Billing retry/hold without grace: do not extend unless business policy says so.
- Refund/chargeback: revoke affected period immediately.
- Fraud/abuse flag: block future grants pending review.

---

## 5) Reconciliation plan

### Continuous reconciliation

- Process all webhooks through durable queue with retries and dead-letter queue.
- Nightly job samples/rechecks active subscriptions against Apple, Google, and Stripe.
- Daily full reconciliation of subscriptions expiring/renewing in the next 72 hours.
- Weekly full scan of all active paid entitlements.
- Alert on mismatches.

### Reconciliation outputs

For each mismatch, append a corrective ledger event:

- `provider_state_reconciled`
- `entitlement_corrected`
- `refund_discovered`
- `renewal_discovered`
- `subscription_unlinked`
- `identity_conflict`

Never silently edit entitlement rows.

### Key metrics

- Webhook ingestion lag
- Dead-letter count
- Duplicate event rate
- Entitlement/provider mismatch count
- Refund-to-revoke latency
- Chargeback-to-revoke latency
- Restore failure rate
- Manual override count
- Revenue vs entitlement discrepancy

---

## 6) Restore purchases and account linking

- Restore creates a backend verification request, not an entitlement by itself.
- Verify Apple/Google history server-side.
- If purchase is already linked to another user, block automatic transfer and route to support unless account-merge policy permits.
- Maintain identity history for fraud investigation.
- Prevent one store purchase from granting multiple unrelated accounts.

---

## 7) Support operations

Provide an internal support console showing:

- Current entitlement state and why
- Full event timeline
- Provider identifiers
- Raw provider status check
- Refund/chargeback status
- Linked accounts/devices
- Manual grant/revoke actions with approval trail
- Replay entitlement projection button
- Escalation notes

Support actions:

- Must be role-based.
- Require reason codes.
- Create ledger events.
- Support temporary grants with expiry.
- Never edit provider IDs or raw events manually.

Runbooks needed for:

- Missing entitlement after purchase
- Duplicate charge
- Refund requested
- Chargeback/dispute
- Restore linked to wrong account
- Webhook outage
- Provider API outage
- Promo abuse

---

## 8) Release-readiness checklist

### Architecture

- Append-only ledger implemented
- Idempotency enforced per provider
- Projector replay tested
- Out-of-order events tested
- DLQ and replay tooling available
- Raw payloads retained securely

### Provider validation

- Apple signed notification verification
- Google API verification
- Stripe webhook signature verification
- Sandbox and production separation
- Shared-secret/key rotation plan

### Test matrix

Must test:

- Initial purchase
- Renewal
- Delayed renewal
- Grace period
- Expiration
- Refund
- Partial refund where applicable
- Chargeback/dispute
- Cancel then renew
- Restore before webhook
- Webhook before client callback
- Duplicate webhook
- Promo grant overlapping paid subscription
- Admin revoke
- Account transfer conflict
- Provider outage
- Queue retry after failure
- Projection replay from scratch

### Security/compliance

- Least-privilege provider credentials
- Encrypted raw payload storage
- PII minimization
- Audit log for support/admin actions
- Fraud monitoring
- GDPR/CCPA deletion strategy preserving financial audit records

### Go/no-go criteria

Go only if:

- Refunds and chargebacks revoke correctly.
- No client-only path can grant paid entitlement.
- Ledger replay produces deterministic state.
- Duplicate/out-of-order webhooks are harmless.
- Support can diagnose and correct without database edits.
- Reconciliation detects and repairs provider mismatches.
- Monitoring and on-call runbooks are live.
