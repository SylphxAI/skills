# Usage Based Pricing Systems

Usage pricing works when the customer can predict, control, and explain the bill. It fails when metering is opaque or the price metric diverges from perceived value.

## Rule IDs

- `usage-pricing-1` — Choose a value metric that correlates with customer success and willingness to pay, not only provider cost.
- `usage-pricing-2` — Separate metered event, billable unit, aggregation window, invoice line, entitlement, and product limit.
- `usage-pricing-3` — Give customers spend controls: quotas, caps, alerts, budgets, usage pages, and admin notifications.
- `usage-pricing-4` — Explain free allowance, included usage, overage price, rounding, reset time, carryover, and expiration.
- `usage-pricing-5` — Metering must be idempotent, replayable, auditable, and resilient to delayed or duplicated events.
- `usage-pricing-6` — High-variance usage needs forecast, anomaly detection, and temporary holds or alerts before surprise invoices.
- `usage-pricing-7` — Credits should state scope, expiration, priority, refundability, and interaction with subscriptions or invoices.
- `usage-pricing-8` — Enterprise controls need committed spend, pooled usage, role-based limits, invoice approval, and export.
- `usage-pricing-9` — Support should see raw usage, rated usage, adjustments, credit consumption, and invoice line lineage.
- `usage-pricing-10` — Evaluate experiments by retained revenue, activation, support contacts, disputes, gross margin, and trust.

## Pricing decision table

| Scenario | Good pattern | Risk | Required control |
| --- | --- | --- | --- |
| API with variable traffic | Included tier plus overage | bill shock | quota, alert, usage dashboard |
| AI/token product | credits or metered units | users do not understand units | examples, forecast, budget cap |
| Storage/compute | cost-aligned usage | cost pass-through feels punitive | committed tiers, reserved discounts |
| Team SaaS | seats plus usage | double charging perception | clear seat vs usage value split |
| Marketplace | transaction or GMV fee | creator margin confusion | payout preview and fee breakdown |
| Enterprise | committed spend | shelfware or lock-in distrust | true-up rules and admin controls |

## State machine

```text
usage_event_received -> usage_event_deduped -> usage_aggregated -> allowance_applied
allowance_applied -> billable_usage_rated -> invoice_line_created -> invoice_issued
usage_aggregated -> quota_threshold_crossed -> alert_sent -> customer_action_or_continue
billable_usage_rated -> anomaly_detected -> hold_or_review -> invoice_line_created
invoice_issued -> dispute_opened -> evidence_collected -> adjustment_or_uphold
credits_granted -> credits_consumed -> credits_expired_or_exhausted
```

## Event schema

Recommended events:

- `usage_metered`: meter_id, account_id, subject_id, raw_quantity, unit, idempotency_key, occurred_at.
- `usage_aggregated`: meter_id, period_start, period_end, aggregated_quantity, aggregation_rule.
- `usage_threshold_crossed`: threshold_type, threshold_value, current_usage, notification_channel.
- `usage_rated`: meter_id, billable_quantity, price_per_unit, currency, invoice_line_id.
- `credit_consumed`: credit_grant_id, amount, priority, remaining_balance, expiration.
- `usage_adjustment_created`: reason, quantity_delta, amount_delta, approver, support_ticket_id.

## Review checklist

- Metric matches customer value and has examples users understand.
- Metering is idempotent, auditable, and support-visible.
- Users can see current usage, forecast, limits, alerts, and invoices.
- Credits, overages, rounding, reset time, and invoice timing are explicit.
- Experiments track conversion and trust guardrails, not just ARPU.
