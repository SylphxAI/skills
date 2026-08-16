# Payment Platform Patterns

## Payment system layers

1. Catalog: products, plans, regions, prices, eligibility.
2. Checkout: payment sheet/store purchase, taxes, authentication, failure handling.
3. Confirmation: receipts, webhooks, server notifications, idempotency.
4. Entitlement: grant, renew, pause, grace, revoke, restore.
5. Support: invoice/receipt lookup, refunds, disputes, adjustment ledger.
6. Reconciliation: processor/store truth versus internal ledger.

## Operating principles

- Treat platform/store/processor events as the source for money movement; treat internal entitlements as derived product state.
- Use idempotency keys and immutable ledger events for purchase, grant, renewal, refund, dispute, and adjustment.
- Separate catalog identifiers from entitlement identifiers so products can change without corrupting access history.
- Restore purchases must be visible, testable, and supportable for app-store products.
- Apple Pay and Google Pay are wallet checkout methods, not subscription policy systems by themselves.
- Google Play Billing and App Store IAP require store-specific purchase tokens/receipts, renewal states, refund/revoke handling, and sandbox tests.
- Web checkout needs tax/VAT assumptions, invoice email, payment method update, cancellation, and failed-payment recovery.
- Marketplaces need seller onboarding, payouts, disputes, tax identity, holds, and buyer/seller support separation.
- Payment UI must disclose renewal, trial, price, period, cancellation, refund path, and material limits.
- Support tooling must find transactions by user, order ID, provider ID, product ID, entitlement ID, and support case.
- Cross-platform subscriptions use provider-specific precedence rules and keep Apple, Google, Stripe, promo, restore, renewal, refund, revocation, and chargeback events distinct.
- Entitlements should be projected from an append-only ledger using provider effective time, receipt lineage, revocation evidence, and explicit internal adjustment events.
- Restore purchases and client callbacks are lookup or refresh triggers, not money events.
- Refund, cancellation, revocation, dispute, chargeback, billing retry, grace, account hold, pause, and expiration have different customer-access and risk semantics.
- Reconciliation must cover provider state, internal ledger, entitlement projection, invoices, taxes, fees, settlement, refunds, disputes, and support overrides.
- Manual correction appends a ledger event with actor, reason, source, approval, expiry, and customer-visible explanation. Provider payloads and prior ledger history remain immutable.
- Launch checks include out-of-order events, duplicate webhooks, delayed renewals, restore-before-webhook, webhook-before-client, partial refund, chargeback, provider outage, dead-letter replay, and projector replay from zero, each tied to an alert, recovery action, owner, and observed result.
- Customer trust requires temporary access or grace only when policy permits, clear status messaging, fast restore/retry paths, and support-safe remediation for false revocations.
- Webhook outages and backlogs need explicit replay states: paused, quarantined, deduplicated, ordered by provider effective time, replaying, projector-repaired, finance-reconciled, and resumed; arrival order is evidence, not entitlement truth.
- Month-close readiness requires separate ledger events and owners for invoice, tax, coupon, credit note, payment, refund, dispute, fee, settlement, revenue export, entitlement, dunning, and manual adjustment; invoice status is not access truth.
- Finance close uses numeric tolerances, source systems, owner, exception queue, service expectation, and a clear close decision.

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

## Cross-platform ledger and precedence

Use one append-only ledger for every verified provider, promo, support, and admin event. The ledger is money and audit evidence; the entitlement table is a replayable projection.

Required ledger fields:

```text
ledger_event_id, provider, provider_event_id, provider_object_id, provider_lineage_id,
user_id, account_id, product_id, entitlement_id, event_type, provider_status,
effective_at, received_at, processed_at, idempotency_key, raw_payload_hash,
verification_status, amount, currency, tax_amount, fee_amount, settlement_id,
refund_id, dispute_id, actor, reason_code, source_case_id, projection_version
```

Provider precedence:

| Event source | Authority | Idempotency key | Entitlement effect |
| --- | --- | --- | --- |
| Apple App Store IAP | verified transaction history and server notifications | notification UUID + transaction/original transaction ID | grant/renew/grace/revoke by Apple subscription lineage |
| Google Play Billing | verified purchase token and RTDN/API state | purchase token + order ID + notification ID | grant/renew/account-hold/grace/pause/revoke by token lineage |
| Stripe Checkout/subscriptions | signed webhook plus invoice/payment/subscription state | event ID + subscription/invoice/payment intent/charge ID | grant after paid confirmation; update on invoice/subscription/refund/dispute |
| Apple Pay / Google Pay wallet | wallet checkout evidence through processor | processor payment intent/charge ID | wallet does not define subscription policy by itself |
| Promo code | signed internal redemption | promo redemption ID | grant the promo entitlement and duration while preserving paid chargeback restrictions defined by policy |
| Restore purchase | server-side provider lookup | restore request ID plus provider lineage | relink or recompute existing provider ownership from prior money events |
| Support/admin | role-gated internal adjustment | adjustment ID | temporary grant, revoke, correction, or note with actor/reason/expiry |

Ordering rule: accept valid events in arrival order, store provider effective time, then recompute entitlement from complete lineage and policy.
For replay, sort projection by provider effective time within provider lineage after dedupe; preserve received_at for audit and SLA metrics.

## Refund, chargeback, and access semantics

| Signal | Meaning | Default handling | Customer trust note |
| --- | --- | --- | --- |
| Cancellation | future renewal stopped | keep paid access until paid-through date unless provider says otherwise | show access end date |
| Billing retry / grace | payment not fully settled but provider permits grace | keep access through provider grace end | explain payment update path |
| Refund | money returned by provider/merchant | revoke or shorten affected entitlement according to refund policy | distinguish full and partial refund |
| Partial refund | partial money returned | apply the policy-defined access effect: unchanged, proportional, or revoked | show the policy and customer consequence |
| Revocation | provider explicitly removes entitlement | revoke affected provider period | show restore/support path if disputed |
| Chargeback/dispute | cardholder or issuer disputes payment | mark disputed, may suspend paid access and block promos pending review | keep appeal/support route |
| Restore | user requests ownership lookup | verify provider history and recompute | preserve one paid period for each owned entitlement interval |
| Promo/admin grant | internal commercial/support decision | grant exact entitlement/duration and expiry | make source visible to support |

## Entitlement projection

Project current access by replaying ledger events:

1. Verify provider payload or internal authority.
2. Dedupe by provider-native idempotency key.
3. Attach product/catalog mapping version and entitlement ID.
4. Build effective access periods from purchase, renewal, promo, grace, and admin events.
5. Apply cancellations, expirations, refunds, revocations, disputes, pauses, and chargebacks to the affected lineage only.
6. Merge overlapping valid periods for the same entitlement.
7. Emit projection with `active`, `trialing`, `grace`, `billing_retry`, `paused`, `expired`, `revoked`, `disputed`, or `manual_review`.
8. Store projection version and source ledger event IDs.

When provider state is ambiguous, use a short policy-approved grace or support review path and base permanent access changes on confirmed provider lineage.

## Reconciliation plan

Cadences:

- Realtime: signed webhook/notification ingestion through durable queue, idempotency store, retries, and dead-letter queue.
- Hourly launch window: compare recent provider confirmations to internal grants and recent refunds/disputes to revokes.
- Daily: recheck active subscriptions renewing, expiring, in billing retry, or recently restored.
- Weekly: sample all active paid entitlements, settlement reports, invoice totals, tax, fees, refunds, disputes, and support overrides.
- Finance close: reconcile provider balance/settlement to internal revenue ledger, taxes, fees, refunds, disputes, and entitlement exposure.

Exception handling:

| Exception | Correction |
| --- | --- |
| Provider paid, no entitlement | append `entitlement_corrected_grant`, notify customer if affected |
| Entitlement active, provider expired/refunded | append `entitlement_corrected_revoke` or grace/manual review |
| Duplicate webhook | no-op with the duplicate record retained |
| Dead-letter event | replay after fix; projector recomputes |
| Account restore conflict | block automatic transfer, route support with provider proof |
| Fee/tax/settlement mismatch | finance exception, no entitlement edit unless payment state changes |

## Webhook outage replay state machine

Use this when provider notifications, webhooks, RTDN, settlement files, or client callbacks drift:

| State | Owner | Observed result | Ordering and idempotency rule | Exit condition |
| --- | --- | --- | --- | --- |
| ingestion_paused | payments incident commander | provider status, lag alert, freeze flag | stop side effects; continue durable capture where safe | affected providers and products identified |
| events_quarantined | payments on-call | raw payload hash, provider event ID, received_at, account/product scope | store only; no entitlement mutation from client success callbacks | quarantine backlog complete |
| events_deduplicated | payments engineer | provider event IDs, notification UUIDs, purchase tokens, invoice/payment IDs | duplicate events become no-op ledger evidence | duplicate and collision report reviewed |
| events_ordered | payments engineer | provider lineage, effective_at, received_at, sequence/version when available | replay by provider effective time within complete lineage | ordering assumptions documented |
| ledger_replaying | payments engineer | append-only ledger events and repair events | append compensating events while retaining prior payloads and entitlement history | replay completes without dead-letter errors |
| projector_repaired | entitlement owner | projection version, before/after diff, affected account list | rebuild projection from zero and compare changed access | false-revoke and over-grant review complete |
| finance_reconciled | finance owner | settlement, invoice, tax, fee, refund, dispute, revenue export checks | route money-close exceptions through owned ledger events and entitlement projection | exception queue has owner and SLA |
| resumed | incident commander | dashboard green, support macros, customer notices, owner approval | resume side effects and provider-specific processing | post-incident review created |

Customer trust during replay: keep policy-approved temporary access for verified payers when provider truth is delayed; message "payment is being verified" until provider records support a final status. Support issues expiring access through a correction ledger event with reason, approval, expiry, and customer-visible note.

Replay runbooks name dead-letter handling for each provider: quarantine reason, retry budget, poison event owner, payload hash, source provider ticket when needed, replay decision, and final disposition. The incident review records provider timeline, retry/dead-letter metrics, projector before/after diff, false-revoke/over-grant account list, finance exception list, customer/support themes, permanent control fix, and approval.

## Invoice, tax, and finance-close event model

Invoice and tax launches need ledger events that finance can close without spreadsheet inference:

| Event | Required fields | Owner | Close check |
| --- | --- | --- | --- |
| `invoice_created` | invoice_id, account_id, line_items, product_ids, period, currency, due_at | billing | invoice lines match catalog and entitlement periods |
| `tax_calculated` | invoice_id, jurisdiction, tax_rate/source, taxable_amount, tax_amount, exemption evidence | finance/tax owner | tax report totals match invoices and provider export |
| `coupon_applied` | coupon_id, discount_amount, eligibility, expiry, approver when manual | billing/growth owner | discount policy and revenue impact approved |
| `credit_note_issued` | credit_note_id, invoice_id, amount, reason, approver, customer message | finance/support | credit note reconciles to invoice and revenue export |
| `payment_succeeded` / `payment_failed` | payment_intent/charge, invoice_id, amount, method, failure_code | billing | payment state maps to dunning and entitlement policy |
| `refund_issued` / `dispute_opened` | refund_id/dispute_id, invoice/charge, amount, reason, evidence | support/finance | refund/dispute maps to ledger, tax, fees, and access effect |
| `fee_recorded` | provider fee, FX fee, chargeback fee, tax fee, settlement_id | finance | fees reconcile to provider settlement |
| `settlement_received` | settlement_id, gross, fees, net, currency, deposit date | finance | settlement equals invoices minus refunds/disputes/fees within tolerance |
| `revenue_exported` | export_id, accounting period, revenue lines, deferred/reversal flags | finance | revenue recognition export ties to ledger and exceptions |
| `manual_adjustment` | actor, reason, approval, source_case_id, ledger effect, expiry, customer-visible reason | support/finance | adjustment has approval and is included in close exceptions |
| `entitlement_granted` / `entitlement_revoked` | entitlement_id, account_id, source ledger event, access period, projection_version | entitlement owner | access state ties to paid/grace/dunning/revoke policy |
| `dunning_started` / `dunning_exhausted` | invoice_id, retry schedule, grace end, suspension date, customer message | billing/support | dunning state matches entitlement and customer notices |

Month-close exceptions need named owner, tolerance, SLA, customer impact, and resolution action. Examples: invoice-paid/no-entitlement, active-entitlement/unpaid-invoice, tax mismatch, provider fee mismatch, settlement shortfall, duplicate credit note, unresolved dispute, support adjustment without approval, and revenue export mismatch.

Starter tolerance table:

| Close check | Source systems | Cadence | Starter tolerance | Owner | Close blocker |
| --- | --- | --- | --- | --- | --- |
| Invoice to ledger | Stripe invoice export, internal ledger | daily and month-close | zero missing paid invoices | billing ops | any paid invoice missing ledger event |
| Tax/VAT | tax engine, invoice lines, tax report | daily in launch, month-close | zero jurisdiction/rate mismatches unless tax owner approves | tax owner | unowned tax mismatch |
| Fees and settlement | processor fees, settlement/payout report, bank deposit | daily | currency rounding only; no unexplained amount over approved threshold | finance/treasury | unexplained settlement shortfall |
| Refunds, disputes, credit notes | provider refund/dispute report, credit note export, ledger | daily and close | zero unmatched money events | finance/support | unmatched refund/dispute/credit note |
| Entitlement exposure | entitlement projection, invoices, dunning state | hourly launch, daily steady state | zero paid-without-access and zero unpaid-active outside policy grace | entitlement owner | stale access or false revoke without owner |
| Revenue export | ledger, revenue schedule, accounting export | close | export total equals approved ledger total within accounting tolerance | controller | unapproved revenue export mismatch |

## Support tooling

Support console must show:

- user/account and entitlement state with "why";
- invoice lookup by invoice ID, account ID, subscription ID, payment intent/charge ID, tax document/export ID, entitlement ID, support case, and customer email;
- provider identifiers and latest verified provider status;
- ledger timeline, raw payload hash, projection version, and replay button;
- invoice, tax, fee, settlement, refund, dispute, and chargeback records;
- restore history, account links, identity conflicts, and promo/admin grants;
- allowed actions by role with reason code, approval, expiry, and customer message.

Runbooks: missing purchase, duplicate charge, failed renewal, restore conflict, family/account transfer, refund request, partial refund, chargeback/dispute, provider outage, webhook backlog, dead-letter replay, promo abuse, false revocation.

## Launch checks

- Sandbox and production credentials separated.
- Product catalog reviewed for region, currency, and tax assumptions.
- Server-side receipt/webhook verification implemented.
- Idempotent grant and revoke paths tested.
- Restore purchase and payment-method update tested.
- Refund/dispute support macro and ledger view ready.
- Metrics cover checkout start, provider confirmation, grant latency, webhook lag, duplicate rate, dead-letter count, provider/entitlement mismatch, refund-to-revoke latency, dispute-to-review latency, restore failure, manual override count, support contact, settlement mismatch, tax/fee mismatch, and false revocation.

## Observability and rollback controls

Required launch dashboards and alerts:

| Dashboard / alert | Signal | Starter threshold | Owner | Rollback or response |
| --- | --- | --- | --- | --- |
| Webhook ingestion | lag, retry count, duplicate rate, dead-letter count | lag above launch SLO, DLQ nonzero, duplicate spike | payments on-call | pause fulfillment for affected provider, replay queue, status message |
| Entitlement projection | grant latency, provider/entitlement mismatch, projector errors | grant latency above SLO or mismatch above zero for paid confirmations | payments on-call | replay projector, disable risky grant path, temporary policy-approved grace |
| Refund/dispute handling | refund-to-revoke latency, dispute-to-review latency, false revoke reports | latency above policy or support spike | payments + support | pause auto-revoke for affected lineage, route manual review |
| Restore/account linking | restore failure, identity conflict, duplicate account grant | restore failure spike or conflict queue breach | support + payments | disable automatic transfer, require provider proof |
| Finance close | settlement, fee, tax, invoice, refund, dispute mismatch | unreconciled close exception | finance | block finance signoff; no entitlement edit unless provider state changes |
| Customer trust | missing-entitlement tickets, false revocation, payment-status confusion | duplicate support theme spike | support owner | pinned status, macro, temporary grace where allowed |

Rollback controls:

- Provider kill switch: pause new grants for one provider while preserving existing valid access where policy allows.
- Projector rollback: pin previous projection version, replay from ledger after fix, compare before/after affected users.
- Auto-revoke pause: route refund/dispute revokes to manual review for a provider/product while investigating false positives.
- Promo kill switch: stop promo redemption without touching paid entitlements.
- Support grace control: issue expiring temporary access with reason code and approval during provider outage.
- Customer messaging: payment pending, restore in progress, refund processed, dispute review, and degraded-mode notices.

## Release behavior fixtures

Before launch, run and record:

- Apple, Google, and Stripe successful purchase to entitlement grant.
- Client callback before webhook and webhook before client callback.
- Duplicate webhook/server notification replay.
- Out-of-order renewal, cancellation, refund, and restore.
- Delayed renewal, provider grace, account hold, pause, and expiration.
- Full refund, partial refund, explicit revocation, dispute opened, dispute closed.
- Promo overlap with paid subscription and paid refund after promo redemption.
- Manual support grant with expiry and compensating revoke.
- Account restore conflict and blocked transfer.
- Provider API outage and stale status handling.
- Queue dead-letter, replay, and projector rebuild from zero.
- Settlement, tax, fee, refund, and dispute finance reconciliation.
- Observability dashboard drill: webhook lag, DLQ, mismatch, grant latency, refund-to-revoke, dispute-to-review, restore failure, support tickets.
- Rollback drill: provider kill switch, projector rollback, auto-revoke pause, promo kill switch, support grace control, and customer message.
