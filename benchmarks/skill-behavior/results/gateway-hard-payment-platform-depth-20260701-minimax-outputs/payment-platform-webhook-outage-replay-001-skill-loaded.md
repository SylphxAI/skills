```text
INCIDENT RUNBOOK: 4-Hour Cross-Provider Webhook Backlog
Incident ID: PAY-INC-YYYYMMDD-##  Commander: Payments On-Call  Scope: Stripe + Apple IAP + Google Play

POSTURE DECLARED (T+0)
- Flag freeze_fulfillment = true for all three providers.
- Kill switch: new_grant_paused = true; auto_revoke_paused = true.
- Customer banner: "Payment is being verified — access may take up to 4 hours." No "payment failed" wording.
- Open war room; page finance, support lead, entitlement owner.

REPLAY STATE MACHINE
(Each state names owner, evidence, ordering/idempotency rule, dead-letter handling, exit gate.)

1. ingestion_paused
   Owner: incident commander. Evidence: provider status pages, lag alert, freeze flag.
   Rule: durable capture only; no side effects. Exit: backlog envelope known per provider.

2. events_quarantined
   Owner: payments on-call. Evidence: raw_payload_hash, provider_event_id, received_at.
   Rule: store raw, mutate nothing. Client success callbacks never enter ledger here.

3. events_deduplicated
   Owner: payments engineer. Key:
     Stripe = event.id; Apple = notificationUUID + original_transaction_id;
     Google = purchase_token + order_id + notification_id.
   Duplicates → no-op ledger row with duplicate=true. Collision report filed.

4. events_ordered
   Rule: sort by provider effective_at within provider lineage; preserve received_at for SLA.
   Assumption log: missing sequence numbers from Apple RTDN flagged for manual verify.

5. ledger_replaying
   Owner: payments engineer.
   - Append compensating events (e.g., revoked_then_granted, revoked_paid_access).
   - Never patch prior rows. Stamp projection_version.
   - Settlement file landed → split into settlement_received + fee_recorded + revenue_exported candidates; do not conflate with payment_succeeded.

6. projector_repaired
   Owner: entitlement owner.
   - Rebuild projection from ledger ordered list, exclude all client-callback-derived grants.
   - Diff vs prior projection → quarantine every account whose grant predates server confirmation.
   - For each: if provider confirms paid → keep; if not → expire grace, append corrective ledger event (revoke + reason_code=client_only_grant_repaired), leave expiring temp access if policy allows.
   - Refunds issued during outage → apply after projection; net access = max(paid_period − refund_period, 0); preserve paid-through semantics.

7. finance_reconciled
   Owner: finance owner.
   - Reconcile settlement file against: invoices, refunds, disputes, fees, revenue export.
   - Tolerance: settlement shortfall ≤ currency-rounding; any larger → close blocker, route to exception queue, do NOT edit entitlements.

8. resumed
   Owner: incident commander. Exit gates: dashboards green, support macros published, ledger closed for window, false-revoke + over-grant accounts dispositioned, customer messages retired.

IDEMPOTENCY KEYS (frozen)
- Stripe: event.id + invoice/charge/payment_intent/subscription.id
- Apple: notificationUUID + original_transaction_id + transaction_id
- Google: purchase_token + order_id + notification_id
- Settlement: settlement_id + file_hash + bank_deposit_id
Collision → dead-letter with payload hash → poison owner = payments engineer.

LEDGER REPAIR (not mutation)
- Append: payment_received_late, grant_corrected, revoke_corrected, refund_applied, dispute_opened, fee_recorded, settlement_recorded, manual_review_started.
- Every event carries: actor, reason_code, evidence_ref, source_case_id, idempotency_key, raw_payload_hash, effective_at, received_at, processed_at, projection_version.

ENTITLEMENT CORRECTION
- Paid-without-grant → append entitled_corrected_grant, gentle customer note.
- Granted-without-paid (client-only) → expire in ≤24h, note "temporary access" with support path.
- Refund-after-grant → keep until paid-through unless provider already revoked; append refund_ledgered; customer sees "Refund processed, access until <date>".
- Disputed during outage → mark disputed, block promo stacking, route manual review, no auto-revoke.

FINANCE RECONCILIATION
- Settlement file → settlement_received event; tie invoices/refunds/disputes/fees.
- Daily during recovery: invoice→ledger, fees→settlement, refunds→credit_notes, tax→jurisdiction.
- Close blockers: any unmatched money event, any unsettled provider fee > rounding tolerance, any tax mismatch without owner.

COMMUNICATIONS
- Customer (in-app + email): status banner, what to expect, restore link for Apple/Google.
- Support: macros prepared: missing_purchase_v2, refund_in_flight, restore_pending, settlement_delay.
- Status page: incident entry with expected resolution window.

RECOVERY GATES (each requires artifact + owner sign-off)
- Backlog 0 AND DLQ triaged → payments engineer
- Duplicate + collision report reviewed → payments engineer
- Projector diff: 0 false-revoke, 0 over-grant unowned → entitlement owner
- Finance exceptions open with owner + SLA → finance
- Customer trust dashboard: ticket themes spike absent → support owner
- Post-incident review artifact saved (provider timeline, retry/DLQ metrics, diff, finance exceptions, control fix, approvals) → incident commander

ROLLBACK CONTROLS RETAINED UNTIL CLOSE
- new_grant_paused, auto_revoke_paused, promo_redemption_paused, provider_kill_switch per provider, projection pin to pre-incident version, support_grace_control with reason+expiry+approval.

OWNER SIGN-OFFS REQUIRED: payments on-call, finance, support lead, entitlement owner, incident commander.
```
