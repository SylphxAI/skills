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

## Routing decision table

| Signal | Primary queue | Required evidence | Escalate when | Customer promise |
| --- | --- | --- | --- | --- |
| Account cannot authenticate | identity/access | actor, tenant, auth method, recovery attempts, security signals | suspected takeover, SSO/SCIM defect, or recovery control unavailable | safe recovery step and next update time |
| Charged/access mismatch | billing-entitlement | provider event, internal ledger, entitlement projection, account timeline | provider/internal truth differs or money/access correction is required | authority being checked; no invented refund promise |
| Data missing or conflicting | data-recovery | object/version IDs, backup/sync state, client version, restore attempts | destructive repair, multi-device conflict, or data-loss blast radius | preserve state; do not retry destructive actions |
| Product defect | product-support | reproduction, version, environment, logs/trace, impact | severity threshold or repeat pattern is met | workaround or bounded status, not a fabricated ETA |
| Abuse/safety report | trust-safety | report type, content/account IDs, evidence preservation, urgency | credible harm, coordinated abuse, legal/safety boundary | acknowledgement without exposing enforcement internals |
| Active incident | incident-command | service/region/version, start time, symptom, trace/status evidence | declared incident threshold is met | one incident source and update cadence |

`support-7` — A queue name is not a decision. Every route names authority,
evidence required at intake, handoff trigger, and customer-facing promise.

## Ticket state machine

```text
new
  -> classified
  -> evidence_pending | assigned
assigned
  -> waiting_customer | waiting_provider | waiting_engineering | waiting_policy
  -> mitigation_offered | correction_pending
mitigation_offered | correction_pending
  -> verification_pending
verification_pending
  -> resolved | reopened
resolved
  -> feedback_linked | closed
```

State rules:

- `support-8` — Every waiting state has a named dependency, owner, next-check
  time, and customer update deadline.
- `support-9` — `resolved` requires observable confirmation, not merely an agent
  reply or internal status change.
- `support-10` — Reopen preserves the prior classification, evidence, actions,
  and reason the resolution failed.
- `support-11` — Money, access, deletion, identity, and safety corrections use
  the owning system's audit trail; a ticket comment is never the authority.

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

Segment every metric by category, channel, locale, product/version, severity,
automation/manual handler, and escalation destination where cardinality is
bounded. Averages without the tail distribution hide broken queues.

## Quality and automation controls

| Control | Minimum evidence | Failure action |
| --- | --- | --- |
| Macro quality | sampled cases, policy/version, factual accuracy, actionability, tone | correct macro and find affected sent cases |
| Routing quality | confusion matrix across categories and escalation destinations | retrain/change rule; replay misroutes |
| AI answer safety | grounded source IDs, confidence/abstention, protected action list | disable affected automation path |
| Resolution quality | verification signal, reopen reason, downstream correction | reopen and route systemic defect |
| Escalation quality | reproducible packet, severity, owner, SLA, feedback closure | return incomplete packet or fix intake tooling |

Automation may classify, retrieve, draft, summarize, and suggest. It must
abstain or require the owning authority for refunds, durable entitlement,
account recovery, data deletion, enforcement, legal commitments, or other
high-impact side effects.

## Operating-system output checklist

- [ ] channel and issue taxonomy;
- [ ] routing table and decision rights;
- [ ] ticket state machine and waiting-state clocks;
- [ ] evidence contract for every high-volume/high-risk category;
- [ ] macros or response principles tied to current sources;
- [ ] automation scope, abstention, and protected actions;
- [ ] specialist/engineering/incident handoff packets;
- [ ] QA sampling and replay of failed cases;
- [ ] outcome, tail-latency, trust, and product-defect metrics;
- [ ] closed product-feedback loop with owner and expiry.

## Trust recovery

When the product fails:

- acknowledge what happened;
- explain what state is known;
- give the next action;
- avoid blaming the user;
- preserve support traceability;
- create a product fix if the same issue repeats.
