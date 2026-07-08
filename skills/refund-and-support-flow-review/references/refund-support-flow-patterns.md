# Refund And Support Flow Patterns

## Refund flow state machine

```text
refund_requested -> refund_pending -> refund_confirmed -> entitlement_adjusted -> user_notified -> support_closed
        |                 |                    |                    |
        v                 v                    v                    v
platform_redirect   refund_rejected      review_required      appeal_opened
```

Abuse review is an overlay, not the default path.

For subscriptions, keep entitlement states explicit:

```text
active -> refund_confirmed -> pending_revoke -> grace_elapsed -> revoked
active -> cancellation_requested -> cancel_at_period_end -> period_end_elapsed -> expired
cancel_at_period_end -> restore_or_resubscribe -> active
active -> chargeback_opened -> disputed_hold -> dispute_won -> active
disputed_hold -> dispute_lost -> revoked
revoked -> repurchase_or_appeal_approved -> active
```

## Rule IDs

- `refund-flow-1` — Identify who controls the refund: app store, payment processor, marketplace, or internal support.
- `refund-flow-2` — Separate refund confirmation from entitlement revocation and account punishment.
- `refund-flow-3` — Use an abuse ladder: inform, reconcile, limit commerce, review, suspend only after evidence.
- `refund-flow-4` — Support should see purchase, grant, spend/use, refund, revoke, messages, and prior cases in one timeline.
- `refund-flow-5` — Consumable refunds need careful handling of spent value; avoid surprise negative balances by default.
- `refund-flow-6` — Repurchase offers must restore value, not threaten punishment.
- `refund-flow-7` — Chargebacks and fraud signals justify stronger commerce limits than normal refunds, but still need review paths.
- `refund-flow-8` — Refund copy should be factual, non-accusatory, and specific about access consequences.
- `refund-flow-9` — Appeals need evidence requirements, expected timeline, and a reversible hold state.
- `refund-flow-10` — Refund data should feed product quality loops: accidental purchase, unclear pricing, support gaps, or policy mismatch.
- `refund-flow-11` — Apple App Store, Google Play, Stripe, chargebacks, and internal goodwill refunds need separate authority, webhook/notification signal, dedupe key, entitlement action, and support route.
- `refund-flow-12` — Entitlement changes must be driven by a server-side entitlement ledger/history, not client state or support notes.
- `refund-flow-13` — Abuse enforcement needs score bands, evidence, false-positive review, approval thresholds for bans, and appeal timelines.
- `refund-flow-14` — Support dashboards should expose refund source, order/transaction IDs, entitlement state, grace/revoke time, chargeback status, goodwill history, abuse tier, and prior cases.
- `refund-flow-15` — Cancellation is not refund: cancellation normally stops renewal while preserving paid-through access; refund returns money and may change entitlement immediately or after a grace period.
- `refund-flow-16` — Restore-purchase flows must reconcile provider truth, entitlement ledger, prior refunds, cancellations, chargebacks, and support overrides before granting access.
- `refund-flow-17` — Event schemas need stable purchase, provider, refund, entitlement, support case, abuse tier, actor, source event, and policy version fields so support and analytics can replay decisions.
- `refund-flow-18` — Restore-purchase and repurchase paths must reconcile provider truth, refund/dispute state, entitlement ledger history, support overrides, and abuse tier before granting access.
- `refund-flow-19` — Consumable reversals need a ledger policy for spent value, minor/accidental purchase signals, event rewards, negative-balance avoidance, and repeated high-value abuse review.
- `refund-flow-20` — Chargebacks/disputes should move commerce and entitlement into explicit hold states, then restore, revoke, or limit only after dispute outcome and appeal evidence.
- `refund-flow-21` — Goodwill and product-quality refunds need budgets, approval owners, reason codes, and a product/support feedback loop; do not treat them as abuse by default.

## Evidence timeline

Support and automated policy should read from one timeline rather than scattered notes:

| Evidence | Why it matters |
| --- | --- |
| Purchase/grant | proves product, provider, transaction, user, entitlement, and initial grant source |
| Usage/spend | distinguishes unused accidental purchase, consumed value, durable unlock, service period, and event reward |
| Cancellation | stops future renewal and usually preserves paid-through access |
| Refund confirmation | proves money returned and starts entitlement adjustment policy |
| Chargeback/dispute | indicates payment risk; requires hold/outcome states and evidence packet |
| Support messages | shows promises, goodwill approvals, appeal evidence, and user confusion |
| Restore/repurchase | must reconcile prior refund/revoke/dispute before granting access |
| Abuse tier | explains commerce limits or review, with false-positive and appeal path |

## Support operating model

| Queue | Owner | SLA | Agent permission | Approval threshold | QA/evidence |
| --- | --- | --- | --- | --- | --- |
| Store refund redirect | Support | first response within policy SLA | explain provider route and collect order id; no internal refund promise | lead approval for goodwill outside policy | message version, provider, purchase id |
| Entitlement/revoke mismatch | Support + Engineering | urgent when paid user lost access | temporary reversible hold/restore only from ledger-backed state | Engineering owner for ledger correction | before/after entitlement state, source event id |
| Chargeback/dispute | Finance/Trust + Support | deadline-driven by dispute evidence due date | explain hold and evidence path; no ban promise | Trust/Finance for commerce limit or suspension | dispute id, deadline, evidence packet |
| Goodwill/product defect | Support + Product | policy SLA; incident priority if widespread | issue approved credit/extension within budget | Support lead/Finance above budget | reason code, incident/build id, approval id |
| Abuse appeal | Trust/Support | publish appeal window, e.g. 7-14 days | collect evidence and freeze punitive escalation while under review | Trust lead for suspension/restore after severe tier | abuse tier, signals, reviewer id |

Support QA should sample decisions by provider, reason code, agent, region, and abuse tier. Track override variance and appeal reversal rate to catch inconsistent or biased goodwill/enforcement.

## State precedence rules

When signals conflict, resolve in this order unless a documented policy says otherwise:

1. Provider/payment truth for money movement and dispute state.
2. Server-side entitlement ledger/history for access state.
3. Contract/store paid-through period for cancellation without refund.
4. Support override only when tied to approval id, reason code, expiry, and reversible audit trail.
5. Client restore state never overrides refund, dispute lost, manual revoke, or abuse hold.

## Restore and repurchase reconciliation

| Path | Required checks | Safe outcome |
| --- | --- | --- |
| App-store restore after refund | provider subscription status, original transaction/purchase token, refund/revoke signal, entitlement ledger, support override | grant only active paid entitlement; otherwise show support-safe restore failed state |
| Direct repurchase after refund | prior refund/chargeback state, abuse tier, payment risk, entitlement revoked/expired state | grant new entitlement after successful payment; do not resurrect disputed grants |
| Appeal approved | evidence owner, approval id, policy version, corrected entitlement state | reversible restore with audit trail and user notification |
| Dispute won | dispute outcome, payment settled, entitlement hold state | restore paid access and remove commerce limit |
| Dispute lost | dispute outcome, entitlement use/spend, policy state | revoke disputed entitlement and move to commerce limit/review if needed |

## Consumable and negative-balance policy

Required ledger fields: `grant_id`, `purchase_id`, `provider`, `granted_amount`, `spent_amount`, `remaining_amount`, `refundable_unused_amount`, `consumed_value_amount`, `reversal_amount`, `event_reward_impact`, `negative_balance_policy_decision`, `review_owner`, `appeal_deadline`.

Decision formula pattern:

```text
refundable_unused_amount = max(remaining_amount linked to refunded grant, 0)
consumed_value_amount = max(granted_amount - remaining_amount, 0)
reversal_amount = refundable_unused_amount by default
negative_balance_policy_decision = never automatic; manual_review only for repeated/high-value abuse or competitive fairness impact
```

| Scenario | Default action | Review trigger | Support language | Dashboard fields |
| --- | --- | --- | --- | --- |
| Unused consumable refund | revoke unused balance after confirmation | mismatch between provider and ledger | factual, no accusation | granted, remaining, reversed |
| Spent consumable, first/low-value accidental refund | do not surprise-charge or instantly negative-balance; record reason and educate | minor/account-sharing signal or repeated pattern | explain value was consumed and future refunds may limit purchases | spent value, reason code, first-time flag |
| High-value repeated spent refunds | freeze new purchases or review commerce, not gameplay by default | repeated value, timing, linked accounts/payment, chargebacks | evidence-based macro with appeal | repeat count, value, linked signals, reviewer |
| Event reward tied to refunded purchase | remove future eligibility or reconcile event ledger if policy allows | leaderboard/prize/fairness impact | clear explanation and appeal route | event id, reward id, leaderboard impact |

## Chargeback/dispute ladder

| State | Entitlement/data access | Commerce/account action | Evidence/deadline | Support action |
| --- | --- | --- | --- | --- |
| dispute_opened | disputed_hold for disputed paid feature; preserve safe data export/read-only access for B2B/team data unless fraud risk is severe | block new purchases/payment-method changes when risk is high; no auto-ban | dispute id, amount, invoice, renewal notice, usage, evidence_due_at | explain dispute path and ask user to resolve with bank/provider or send evidence |
| evidence_due | hold unchanged; no destructive deletion | escalation to Finance/Trust owner | evidence packet owner and due date | remind support owner, not user spam |
| evidence_submitted | hold unchanged | no ban without review | submitted_at, evidence packet hash/link, reviewer | support sees packet and deadline |
| dispute_won | restore/keep entitlement and team seats | remove commerce limit | outcome id, settled amount | notify user and close case |
| dispute_lost | revoke disputed entitlement where policy allows; preserve data export window where required | commerce limit/manual review; suspend only with approval | outcome id, loss amount, policy version | explain outcome, appeal path, and repurchase route |
| appeal_opened | freeze further punitive escalation while reviewed | commerce limit remains unless owner approves | support_case_id, appeal evidence, reviewer, SLA | acknowledge appeal timeline |
| repurchase_requested | grant only new paid entitlement after dispute state and abuse tier allow it | require clean payment method if risk high | new purchase id, prior dispute id, approval if needed | explain fresh-start access without threats |

## Goodwill and product-quality loop

Refund reasons should not disappear into support notes. Use this explicit taxonomy in outputs and dashboards:

| Reason code | Meaning | Action | Owner |
| --- | --- | --- | --- |
| `outage_or_bug` | product defect, failed export, downtime, broken entitlement | goodwill refund/credit budget, preserve trust, link to incident/product fix | Product + Support |
| `unclear_pricing_or_copy` | confusing price, renewal, paywall, feature, or refund wording | refund/credit according to policy, update pricing/paywall/receipt copy | Growth/Billing |
| `duplicate_charge` | duplicate billing, accidental double purchase, processor retry issue | refund duplicate, reconcile ledger/invoice | Billing/Finance |
| `accidental_purchase` | user says purchase was unintended and value mostly unused | one-time goodwill if internally controlled, improve confirmation UX | Support/Product |
| `minor_purchase` | minor/family/account-sharing purchase signal | provider route where required, parent-safe support macro, prevention UX | Support/Product |
| `policy_mismatch` | public policy/support promise differs from actual behavior | honor documented promise if approved, fix policy/support docs | Legal/Support/Product |
| `store_policy_redirect` | provider owns refund decision | explain store route and track redirect outcome | Support |
| `support_exception` | agent-approved goodwill or override | approval id, expiry, budget owner | Support/Finance |
| `refund_abuse_suspected` | evidence-backed repeated/high-risk pattern | review, commerce limit, appeal, no automatic ban | Trust/Support |

## Decision table

| Scenario | Entitlement action | Account action | Support action |
| --- | --- | --- | --- |
| Accidental subscription purchase | Revoke after confirmed refund or at provider-defined time | None | Explain platform refund route and restore path |
| Cancellation without refund | Keep access until paid-through period end | None | Explain renewal stopped, access-through date, and resubscribe path |
| Non-consumable refund | Revoke feature/license | None | Confirm access ended; show repurchase path |
| Consumable spent before refund | Reconcile ledger, avoid surprise debt by default | Risk score if repeated | Route repeated high-value cases to review |
| Chargeback | Pause disputed entitlement | Commerce-limited pending review | Ask user to resolve dispute or contact support |
| Repeated refund abuse | Revoke where policy/evidence supports it | Commerce limit or manual review before suspension | Use evidence-based macro and appeal path |

## Provider table

| Provider/channel | Signal | Dedupe key | Entitlement action |
| --- | --- | --- | --- |
| Apple App Store | App Store Server Notifications such as revoke/refund events | original_transaction_id + notification id | Set pending_revoke or revoked according to product grace policy |
| Apple cancellation/expiration | subscription status / expiration signal | original_transaction_id + status event id | Keep access until provider-paid-through date, then expire unless renewed/restored |
| Google Play | Real-time developer notifications and voided purchases | purchase_token + notification id | Set pending_revoke/revoked and reconcile restore-purchase state |
| Google cancellation/expiration | RTDN subscription cancellation/expiration status | purchase_token + notification id | Keep paid-through access, then expire or restore based on provider truth |
| Stripe refund | `charge.refunded` / refund webhook | charge/refund id | Apply refund policy and entitlement grace/revoke state |
| Stripe cancellation | subscription deleted/updated/cancel_at_period_end event | subscription id + event id | Keep access through current period unless immediate cancellation/refund is confirmed |
| Stripe chargeback | dispute opened/won/lost webhooks | dispute id | Move entitlement to disputed_hold, then restore or revoke after outcome |
| Internal goodwill | support-approved adjustment | ticket id + approval id | Usually preserve entitlement or maintain until current period end |

## Abuse score pattern

Use explainable scoring rather than one-off judgment:

- recent refund count and value;
- refund timing after purchase;
- usage/consumption after purchase;
- repeated chargebacks;
- linked devices/payment methods/accounts;
- prior support and appeal outcomes.

Example bands: low = inform only; medium = warning and skip future grace; high = commerce limit/manual review; severe = suspension only with approval and appeal route.

## Support macro pattern

Use: acknowledge, state what happened, explain access impact, provide next action, provide appeal/support route.

```text
We received confirmation that this purchase was refunded. The refunded premium access has ended, but your account remains active. If you believe this is wrong, reply with the order ID and we will review it.
```

## Event schema

Track: `refund_requested`, `refund_redirect_shown`, `refund_detected`, `cancellation_detected`, `restore_purchase_requested`, `restore_purchase_resolved`, `entitlement_state_changed`, `entitlement_adjusted_after_refund`, `refund_user_notified`, `refund_support_case_opened`, `commerce_limited`, `chargeback_dispute_opened`, `chargeback_dispute_resolved`, `abuse_tier_changed`, `appeal_opened`, `appeal_resolved`, `repurchase_completed`, `goodwill_refund_approved`, `product_quality_reason_recorded`.

Required properties: `provider`, `provider_event_id`, `purchase_id`, `original_transaction_id_or_purchase_token`, `refund_id`, `chargeback_or_dispute_id`, `subscription_id`, `entitlement_id`, `user_id`, `previous_entitlement_state`, `next_entitlement_state`, `paid_through_at`, `grace_until`, `revoke_at`, `reason_code`, `abuse_tier`, `support_case_id`, `actor`, `source_event_id`, `policy_version`, `decision`.

Dashboards should include refund rate by provider, refund detection lag, restore failure rate, entitlement revocation lag, chargeback open/win/loss, goodwill usage and variance by agent/cohort, support load and SLA, support QA variance, false-positive and appeal reversal rate, abuse-tier transitions, repurchase after fix, churn after refund, and product quality reason-code trends.
