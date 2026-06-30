# Support Operations Patterns

## Issue taxonomy

- account access;
- billing/refund/subscription;
- entitlement/restore purchase;
- data loss/backup/restore;
- bug/crash/performance;
- abuse/fraud/safety;
- feature confusion;
- cancellation/downgrade;
- store review complaint;
- incident/outage.

## Triage ladder

1. Self-serve help article.
2. Guided in-product fix.
3. Support macro with account-aware data.
4. Specialist queue.
5. Engineering escalation.
6. Trust/safety or fraud review.
7. Incident/public communication.

## Support tooling requirements

- `support-1` — Support should see relevant state without asking users for screenshots: account, platform, app version, purchase IDs, entitlement state, device, logs, last backup.
- `support-2` — Billing support needs purchase/refund/entitlement ledger, not only current plan.
- `support-3` — Data-loss support needs backup snapshots, restore attempts, device/app version, and conflict state.
- `support-4` — Store review responses should route repeated complaints into product fixes.
- `support-5` — Macros should be empathetic, specific, and action-oriented.
- `support-6` — Abuse review should be evidence-based and appealable.

## Metrics

Track:

```text
ticket_created
ticket_category_set
first_response_sent
macro_used
escalation_created
refund_help_opened
restore_purchase_help_opened
backup_restore_help_opened
ticket_resolved
csat_submitted
product_feedback_created
```

Measure first response time, time to resolution, reopen rate, refund support load, restore success, contact reason trend, and product defect escape rate.

## Trust recovery

When the product fails:

- acknowledge what happened;
- explain what state is known;
- give the next action;
- avoid blaming the user;
- preserve support traceability;
- create a product fix if the same issue repeats.
