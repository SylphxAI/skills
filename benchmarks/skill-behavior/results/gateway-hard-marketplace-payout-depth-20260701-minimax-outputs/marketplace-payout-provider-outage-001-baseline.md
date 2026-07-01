# Payout Incident Plan — Regional Provider Outage (Month-End)

## 1. Per-Payout State Machine

States (one FSM per `payout_intent`):

```
CREATED → QUEUED → SUBMITTED → ACCEPTED → IN_TRANSIT
                                              ↓
              SETTLED ← CONFIRMED ←   CALLBACK_OK
                ↓                       ↓
            REVERSED ← REVERSING    CALLBACK_FAIL → RETRYING → (CALLBACK_FAIL)ᴺ
                ↓
          NEEDS_REVIEW ←──  PARTIAL (sum != intent.amount)
```

- Terminal: `SETTLED`, `REVERSED`, `NEEDS_REVIEW`.
- No state transition without an event carrying a provider `event_id`.

## 2. Idempotency Controls

- **Idempotency key**: `sha256(creator_id | period_id | amount_cents | currency | attempt_no)`. Sent on every provider call; provider dedupes on it.
- **Webhook dedupe**: store `(provider, event_id)` in `webhook_events` (unique). Duplicate = ack 200, no state change.
- **Outbound dedupe**: every API call carries the same key until ACK; retries never produce a second submission.
- **Reversal pairing**: every `REVERSED` event must reference the original `payout_intent_id`; reversals never triggered by a generic "retry".
- **Two-person rule** for any manual CSV workaround (see §5).

## 3. Reconciliation Controls (run every 5 min during incident)

1. **Sum invariant**: `Σ intents.amount = Σ settled + Σ reversed + Σ pending + Σ needs_review`. Any delta → incident ticket.
2. **Three-way match**: internal ledger ↔ provider ledger (file + callbacks) ↔ bank statement (T+1).
3. **Partial file handling**: mark file `INCOMPLETE`; quarantine unmatched intents; never auto-resubmit until human review.
4. **Failed-callback reconciliation**: intents in `CALLBACK_FAIL` > 2 attempts → pull provider status via lookup API (not retry endpoint) to confirm ground truth before any action.
5. **Drift thresholds**: auto-page if `|settled − confirmed_by_provider| > 0.5%` or any count mismatch.

## 4. Creator / Support Messaging

| Tier | Trigger | Channel | Message |
|---|---|---|---|
| T1 detect | Outage confirmed | Status page (yellow) | "Payouts for {region} delayed; provider issue. No action needed." |
| T2 24h | Still pending | Email + in-app banner | "Your {period} payout of {amount} is queued. ETA ≤ 72h. We will notify on settlement." |
| T3 support | Creator asks | Macro | Reference intent_id; never promise specific bank credit date; escalate to finance only after 72h. |
| T4 resolved | Region restored | Status page (green) + per-creator email | "Payout settled/refunded; see statement." |

**Never** mention the CSV workaround externally. Finance/Support scripts reviewed by Legal pre-send.

## 5. Operational Runbook (timeline)

- **T+0**: Detect outage (provider status page + error-rate alert). Open incident; freeze new `SUBMITTED` for affected region; switch provider routing to secondary if available; snapshot ledger.
- **T+0+30m**: Dedupe webhook queue; mark partial file; pause outbound retries.
- **T+1h**: Finance requests CSV workaround → **refused by default**. Only allowed if: (a) ≥24h outage, (b) Treasury signs off, (c) restricted to payouts not yet `SUBMITTED`, (d) two-person export with checksum hash.
- **T+2h**: War-room: reconcile §3; queue creator comms T2.
- **Provider restored**: Re-enable flow in **read-only mode** for 30 min; replay callbacks; verify invariants; then resume writes.
- **T+48h post-recovery**: Full reconciliation report; close incident.

## 6. Recovery Gates (must all pass to close)

- [ ] Zero intents in `CALLBACK_FAIL` or `RETRYING` older than 15 min.
- [ ] Three-way match (§3) reconciles to 0 delta for affected region.
- [ ] All duplicate webhooks acknowledged; no orphan `event_id`.
- [ ] No intent transitioned to `SUBMITTED` twice (idempotency log clean).
- [ ] Reversal ledger entries match refund bank credits.
- [ ] All affected creators received T2/T4 message matching actual outcome.
- [ ] CSV workaround exports logged with hash, approver, scope.
- [ ] Postmortem filed within 5 business days; prevention action items owned.

**Hard rules**: No retries without idempotency key. No CSV export without Treasury + Eng-lead dual approval. No public ETA tighter than the conservative figure. No state change without a logged event.
