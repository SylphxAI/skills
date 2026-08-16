---
name: review-refund-and-support-flow
description: "Review refund and support consequences so trust holds and abuse cannot break entitlement. Money truth stays with the payment owner."
---

# Review a Refund and Support Flow

Use this skill to handle refunds without damaging trust or letting abuse break the product.

## Scope

Own entitlement/customer consequence, grace/hold/recovery, account action,
appeal, repayment, support, and product-feedback states. Do **not** own provider
event ingestion, money truth, or the entitlement projector. Consume those
authoritative facts from `build-payment-readiness` or the owning provider/
ledger system and preserve their evidence references.

Write the refund-consequence record in markdown as the sole artifact. Name
owners and sources in prose. Consume payment, entitlement, purchase, product,
economy, and support inputs through stable owner references.

## Workflow

1. Identify purchase type, provider/store, entitlement type, refund authority, and support ownership.
2. Read `references/refund-support-flow-patterns.md`.
3. Map authoritative provider/ledger evidence references and classify which
   event families actually apply. Always preserve entitlement consequence,
   customer messaging, support, appeal, audit, and reconciliation floors;
   instantiate the commerce branches that apply to the selected providers and
   product. If provider/ledger truth is
   missing or inconsistent, emit a typed blocker to Payment Platform rather
   than deciding it here.
4. Separate only the applicable cancellation, ordinary/goodwill refund, fraud,
   chargeback/dispute, consumable reversal, non-consumable revocation, restore,
   repurchase, and repeated-abuse paths. Record a reasoned non-applicability
   owner decision for high-risk branches that could otherwise be confused.
5. Build one timeline per account before taking action: purchase, grant, usage/spend, cancellation, refund request, provider confirmation, entitlement transition, support messages, chargeback/dispute, appeal, and repurchase.
6. Define abuse scoring, false-positive controls, support dashboards, metrics, and approval thresholds before account restrictions.
7. Define the support operating model: queue owner, SLA, escalation owner, agent override permissions, QA sampling, approval thresholds, and appeal timeline.
8. Produce the common authority/evidence, entitlement, support, appeal,
   reconciliation, audit, and risk controls plus consequence branches,
   ledgers, macros, and event fields only for the selected applicable paths.

## Current sources

- Verify the current provider/store refund, cancellation, chargeback, restore, entitlement, and appeal authority from official sources at use.
- Record provider, product type, geography, policy/API version, access date, and URL for every external rule that changes money or access.
- Provider policy comes from current official provider authority; internal
  starter thresholds, memory, and support conventions stay internally scoped.

## Principles

- A normal refund keeps the account open. Ban is a separate enforcement action with its own evidence.
- Repurchase is optional after entitlement, dispute, and abuse state are reconciled.
- Support and audit read the immutable ledger.
- Apple, Google, Stripe, chargebacks, and internal goodwill each keep their own policy.
- Cancellation and refund are separate states. A user may cancel renewal and keep paid access until period end.
- Durable access changes go through a server-side entitlement source with a reversible audit trail.
- Provider events stay with `build-payment-readiness`. This pack owns downstream customer and account policy.
- Restore-purchase and client state re-grant access only after ledger reconciliation.
- Spent consumables keep their value unless an explicit policy, warning, review, and appeal path says otherwise.
- Product-quality, outage, billing-copy, and accidental-purchase refunds feed product and support fixes.
- Product-quality and support learning explicitly distinguish outage_or_bug,
  unclear_pricing_or_copy, duplicate_charge, accidental_purchase, minor_purchase,
  policy_mismatch, store_policy_redirect, support_exception, and refund_abuse_suspected.
- Chargebacks include dispute_opened, evidence_due, evidence_submitted,
  dispute_won, dispute_lost, appeal_opened, and repurchase_requested states.

## Output

```text
Purchase/refund context:
Authority:

Provider/ledger evidence reference table:
- <provider/channel> -> authority artifact/event ID, observed state, evidence, projected entitlement input, freshness/conflict blocker

Evidence timeline:
| Time | Source | Purchase/refund/dispute event | Entitlement state | Usage/spend | Support message | Actor | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |

Support operating model:
| Queue | Owner | SLA | Agent permission | Approval threshold | QA/evidence |
| --- | --- | --- | --- | --- | --- |

Reason-code taxonomy:
| Reason code | Meaning | Entitlement/support action | Product/finance owner |
| --- | --- | --- | --- |

Entitlement lifecycle:
- <from_state> -> <event> -> <to_state>, grace/hold timing, audit evidence
- Include applicable cancellation, restore, refund, chargeback/dispute,
  goodwill, appeal, and repurchase paths separately; list excluded branches and why.

Decision table:
- <scenario> -> entitlement action, account action, support action

Restore/repurchase/reconciliation:
- <path> -> provider truth check, entitlement ledger check, abuse/dispute check, support/audit action

Consumable ledger policy:
- Include only when consumable value can be granted, spent, reversed, or restricted.
- Fields: granted_amount, spent_amount, remaining_amount, refundable_unused_amount, consumed_value_amount, reversal_amount, event_reward_impact, negative_balance_policy_decision.
- Formula/decision: <how balance or commerce limit is calculated without surprise debt>

Chargeback or dispute submission:
- <state> -> deadline, evidence, commerce/data access, support message, owner

Abuse and trust ladder:
- <score/tier> -> evidence, action, approval, appeal path, false-positive guard

Support macros/events:
- <macro or event> with provider, purchase id, refund id, entitlement id, state transition, actor, reason code, support case id

Metrics/dashboard:
- <metric/event> -> owner, decision it supports
- Include refund detection lag, restore failures, entitlement revocation lag, support load, support QA variance, goodwill variance, false-positive/appeal reversal rate, dispute win/loss, repurchase after fix, churn, and product-quality reason trends.
```
