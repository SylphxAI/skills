```text
Payment surfaces: Apple App Store IAP, Google Play Billing, Stripe web checkout, promo/admin grants, restore purchases, family sharing, Apple Pay/Google Pay as wallet methods
Billing model: auto-renewable subscriptions (Apple, Google, Stripe), monthly + annual tiers, family-share eligible on Apple, free trial + grace + billing retry
Authority boundary: provider/store events are money truth; entitlements are replayable projection; support/admin corrections are expiring, reason-coded ledger events only

Readiness matrix
- Catalog: separate catalog_id from entitlement_id; region, currency, tax, family eligibility per product
- Checkout: server-validated price/tax at purchase time; never trust client price; wallet methods route through Stripe/processor
- Confirmation and ledger: append-only ledger keyed by provider_event_id + notification UUID + transaction/purchase token
- Entitlement projection: replay by provider effective time within lineage; never "last webhook wins"
- Refund/revoke/dispute: refund → ledger event → policy lookup (full/partial/family) → revoke or grace
- Support/reconciliation: role-gated correction ledger; finance close with named tolerances

Payment and entitlement state model
- active → paid, projection confirms provider active, customer access normal
- trialing → provider trial, no charge yet, access granted
- grace → provider grace/billing retry, access retained, status "payment update needed"
- billing_retry → Stripe retry window, access retained through policy grace
- paused → Google account hold or user pause, no new entitlement period
- expired → provider period ended, no access
- refunded → full refund recorded, revoke per refund policy
- partially_refunded → proportional access change only if policy says so
- disputed → chargeback open, suspend access, route manual review
- revoked → provider explicitly revoked, restore/support path shown
- manual_review → ledger conflict or restore conflict, support queue
- support_graced → expiring admin grant with reason and expiry

Provider precedence rules
- Apple IAP → key: notification UUID + original transaction ID → entitlement by Apple subscription lineage
- Google Play RTDN → key: purchase token + order ID + notification ID → entitlement by token lineage
- Stripe webhook → key: event ID + invoice/subscription/charge ID → entitlement after paid confirmation
- Apple Pay/Google Pay → wallet only, no subscription policy by itself
- Promo → key: redemption ID → grant only promo duration; never override chargeback restrictions unless policy permits
- Restore → key: restore request ID + provider lineage → relink existing ownership, no money event
- Family share → inherits Apple original transaction ID lineage; partial refund applied to family owner
- Support/admin → key: adjustment ID → expiring grant/revoke with actor, reason, approval

Reconciliation and finance close
- Invoice to ledger → Stripe export vs ledger → daily/month-close → zero missing paid invoices → billing ops → block close
- Tax/VAT → tax engine vs invoice lines vs provider tax → daily/close → zero jurisdiction mismatches → tax owner → block close
- Fees/settlement → processor vs settlement vs bank deposit → daily → currency rounding only → finance/treasury → block close
- Refunds/disputes/credit notes → provider report vs ledger → daily/close → zero unmatched money → finance/support → block close
- Entitlement exposure → projection vs invoices/dunning → hourly launch/daily steady → zero paid-without-access, zero unpaid-active outside grace → entitlement owner → block close
- Revenue export → ledger vs revenue schedule → close → export equals ledger within tolerance → controller → block close

Close events: invoice_created, tax_calculated, coupon_applied, credit_note_issued, payment_succeeded/failed, refund_issued, dispute_opened, fee_recorded, settlement_received, revenue_exported, entitlement_granted/revoked, dunning_started/exhausted, manual_adjustment

Support-safe correction flow
- Lookup keys: account_id, user_id, invoice_id, payment_intent/charge, subscription, entitlement_id, Apple original_transaction_id, Google purchase_token, Stripe customer/subscription, support_case_id
- Evidence required: ledger timeline, raw_payload_hash, projection version, provider verified status
- Allowed by role: L1 lookup only; L2 expiring grant ≤7 days with reason+approval; L3 revoke only with finance signoff
- All corrections append ledger event with actor, reason_code, source_case_id, expiry, customer-visible note

Webhook outage replay flow
| State | Owner | Evidence | Ordering rule | Exit gate |
| ingestion_paused | incident commander | provider status, lag alert | durable capture only | scope identified |
| events_quarantined | payments on-call | raw hash, event ID, scope | no entitlement mutation | backlog complete |
| events_deduplicated | payments engineer | event IDs, tokens | dupes → no-op | collision report reviewed |
| events_ordered | payments engineer | lineage, effective_at | sort by provider effective time | ordering documented |
| ledger_replaying | payments engineer | append-only events | compensating events only | no DLQ errors |
| projector_repaired | entitlement owner | version, before/after diff | rebuild from zero | false-revoke review done |
| finance_reconciled | finance | settlement/tax/fee checks | money exceptions don't edit entitlement | queue has owner+SLA |
| resumed | incident commander | dashboard green, approvals | resume side effects | post-incident review filed |

Customer messaging
- "Payment received, premium active" on verified grant
- "Payment is being verified" during outage grace (never "failed" without provider evidence)
- "Refund processed, access ends [date]" with restore link
- "Payment update needed" during billing retry/grace with update path
- "Restore in progress, no duplicate charge" during restore-before-webhook
- "Dispute under review, contact support" on chargeback open

Blockers
- Unowned Apple refund-revoke policy for family-shared subscriptions
- No projection_version stored for current entitlement state
- Stripe webhook signature not enforced on all routes
- No customer messaging for "payment being verified" state

Observability and rollback controls
- Webhook ingestion (lag, dupes, DLQ) → payments on-call → pause fulfillment + replay
- Entitlement projection (grant latency, mismatch) → payments on-call → replay projector + risk path off
- Refund/dispute latency → payments+support → pause auto-revoke, route manual
- Restore conflict → support+payments → disable auto-transfer, require provider proof
- Finance close mismatch → finance → block signoff, no entitlement edit
- Provider kill switch → pause new grants, preserve valid access
- Auto-revoke pause → route refund/dispute to manual review
- Support grace → expiring access with reason+approval
- Promo kill switch → stop redemption without touching paid entitlements

Release gates
- Apple/Google/Stripe purchase→grant fixture
- Webhook-before-client and client-before-webhook
- Duplicate webhook, out-of-order renewal/cancel/refund
- Full refund, partial refund, explicit revoke, dispute open/close
- Family share partial refund policy
- Restore before webhook, restore conflict, blocked transfer
- Provider outage + stale status
- DLQ replay + projector rebuild from zero
- Settlement/tax/fee/refund/dispute reconciliation
- Rollback drills: kill switch, projector rollback, auto-revoke pause, promo kill switch, support grace
- Dashboard drill: webhook lag, DLQ, mismatch, grant latency, refund-to-revoke, dispute-to-review, restore failure, support tickets
```
