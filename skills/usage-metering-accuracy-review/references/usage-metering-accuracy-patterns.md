# Usage Metering Accuracy Patterns

## Usage Metering Accuracy Review state machine

```text
usage_event_received -> deduped -> rated -> aggregated -> invoice_line_created -> invoice_reviewed -> billed
        |              |         |         |                    |                 |
        v              v         v         v                    v                 v
 invalid_event    duplicate  rating_gap late_event          dispute_open     credit_adjusted
```

## Rule IDs

- `usage-metering-1` — Define billable unit, source event, customer/account identity, timestamp, idempotency key, rating rule, aggregation grain, and invoice mapping.
- `usage-metering-2` — Separate real-time quota checks, customer estimates, rated usage, final invoice lines, credits, commits, and adjustments.
- `usage-metering-3` — Handle duplicates, late events, retries, out-of-order events, backfills, plan changes, and timezone boundaries explicitly.
- `usage-metering-4` — Reconcile source events, metering ledger, rated usage, invoice lines, revenue recognition, and customer-visible reports.
- `usage-metering-5` — Keep correction workflow with reason, owner, approval, customer impact, invoice impact, support note, and audit trail.
- `usage-metering-6` — Expose customer-visible usage with freshness, unit definitions, included allowance, overage risk, and exportable detail.
- `usage-metering-7` — Alert on missing events, spike anomalies, rating failures, negative usage, quota bypass, and invoice mismatch.
- `usage-metering-8` — Run replay tests and sample audits before pricing launches, plan migrations, and metering rule changes.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Late event | Apply documented cutoff or adjustment | Event timestamp and invoice window | Surprise invoice change |
| Duplicate event | Dedupe by idempotency key | Producer contract and ledger | Overbilling |
| Plan change mid-cycle | Split rating windows | Plan history and timestamps | Wrong allowance/overage |
| Customer dispute | Trace event-to-invoice lineage | Usage detail and audit log | Trust loss |
| Metering outage | Replay and reconcile before billing | Backfill job and controls | Revenue leakage or overcharge |

## Metering accuracy checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `usage_event_ingested`, `usage_event_deduped`, `usage_rated`, `usage_aggregation_completed`, `usage_invoice_line_created`, `usage_dispute_opened`, `usage_correction_applied`.

Recommended properties: `account_id, unit_type, source_system, event_id, idempotency_key, rating_rule, billing_period, plan_id, usage_quantity, freshness_minutes, correction_reason, dispute_status, invoice_id, decision`.
