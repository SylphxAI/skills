```text
Marketplace/payout context:
- Creator marketplace, month-end payout release, regional payout provider outage.
- Live queue: pending creator balances, duplicate webhook retries, one partial payout file, failed bank-transfer callbacks, finance pressure for CSV workaround, creator ETA pressure, double-pay / missed-reversal risk.

Payout policy (incident-bound):
- Cadence: monthly; clearing delay: 7d; reserve: 0–5% rolling 30d; min threshold: USD 25 / local equiv.
- Provider fee + FX on provider, platform fee on seller per policy version.
- NO payout released while incident_state != payout_released.

Payout flow (incident):
- payout_queued -> payout_paused -> payout_provider_pending -> (payout_partially_submitted | payout_failed | payout_retry_blocked) -> payout_manual_review -> payout_reconciled -> (payout_released | payout_reversed)
- Owner: incident commander (IC); ops: payout-ops + finance; eng: idempotency owner.

Formal state machine:
- payout_queued -> outage_detected -> payout_paused (IC, evidence: status-page/ticket id + freeze_flag)
- payout_paused -> submission_started -> payout_provider_pending (ops, evidence: request_id set, ledger snapshot sealed)
- payout_provider_pending -> partial_ack -> payout_partially_submitted (ops, evidence: accepted_rows[], rejected_rows[])
- payout_provider_pending -> failure_callback -> payout_failed (ops, evidence: failure_code, dest_state)
- payout_provider_pending -> duplicate_webhook -> payout_retry_blocked (eng, evidence: idempotency_key collision log)
- payout_partially_submitted | payout_failed | payout_retry_blocked -> owner_assigned -> payout_manual_review (finance+risk, evidence: mismatch packet)
- payout_manual_review -> three_way_match_ok -> payout_reconciled (finance, evidence: ledger = provider = internal file)
- payout_reconciled -> release_gate_passed -> payout_released (ops, evidence: payout_paid ledger event + provider trace)
- payout_reconciled -> reversal_required -> payout_reversed (finance+support, evidence: source_event_id, lineage, negative_balance effect)

Idempotency & reconciliation controls:
- One payout_id = one idempotency_key; webhook replay keyed on (provider_event_id, payout_id).
- Quarantine duplicate callbacks (payout_webhook_quarantined); no DB write until classified.
- Three-way match per row: ledger.amount = internal_file.amount = provider_trace.amount; mismatch -> payout_manual_review.
- Block CSV workaround from clearing state; if finance exports, label as reconciliation artifact only (per payout-18); require dual approval + no-batch-release.
- Reversals always post before any retry; negative-balance ledger entry created on failure.
- Hourly reconcile job compares submitted vs released rows; alert on drift > 0.

Decision table:
- Duplicate webhook -> quarantine, no action; suppress retry; support: "no action needed, duplicate suppressed."
- Partial file -> reconcile row-by-row; release only accepted rows; reverse rejected; support: "some rows delayed."
- Failed transfer -> return funds to held (not available); support: "bank rejected, fix destination."
- Outage > SLA -> escalate to secondary provider or manual review; support: "delayed, balance safe, ETA on next cadence."
- Finance CSV ask -> refuse normal-path release; allow artifact-only export with dual sign-off.

Seller dashboard & support workflow:
- Status: "Payout delayed — provider outage in region X; your balance is safe." -> ETA: "Next cadence after restore or 72h, whichever first."
- Show: pending, available, held (incident), next-payout update time, support case auto-opened.
- SLA: support ack 4h, finance review 24h, creator update every 12h during incident.

Reserve/hold governance (incident):
- Trigger: outage or partial-ack affecting cohort. Scope: only affected batch. Owner: IC. Release: on payout_reconciled -> payout_released. Appeal: support case with payout_id.

Compliance/provider readiness (incident effect):
- Tax form verified? -> retains state; reporting unaffected; payout blocked only by incident, not form.
- Sanctions/KYC -> unchanged; no payout release until held status clear.
- Country eligibility -> affected region flagged provider_restricted until restored.

Ledger/events:
- payout_incident_state_changed (payout_id, from_state, to_state, reason_code, owner, provider_trace_id, policy_version)
- payout_webhook_quarantined (provider_event_id, idempotency_key, quarantine_reason)
- payout_reconciliation_completed (ledger_entry_ids[], provider_trace_ids[], result, mismatch_reason)
- seller_negative_balance_changed (only on reversal_during_incident)

Audit invariants:
- Provider "paid" never reaches payout_released without ledger_paid + three-way match.
- Sum(ledger.available + held) per seller unchanged by incident; only sub-bucket reshuffles.
- Every duplicate webhook resolved within SLA or escalated; no silent drop.
- CSV workaround cannot post payout_paid without payout-18 controls.

Open risks:
- Double-pay via retry -> idempotency_key + quarantine.
- Skipped reversal -> reversal-first ordering in manual review.
- Stale creator display -> cached value vs ledger flagged in support UI.
- Secondary provider enablement cost -> pre-approved fallback contract.

Trust metrics:
- Payout latency vs SLA, reconciliation mismatch rate, duplicate-webhook rate, held-balance age, creator CSAT, support tickets/payout, false-incident-declare rate.
```
