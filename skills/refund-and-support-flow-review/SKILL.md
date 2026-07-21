---
name: refund-and-support-flow-review
description: "Design or audit one customer/account consequence flow after authoritative cancellation, refund, revocation, chargeback, or dispute events: entitlement outcome, grace, repayment, repurchase, commerce restriction, abuse ladder, appeal, support, trust recovery, and product feedback for SaaS, apps, games, utilities, marketplaces, and subscriptions. Use when post-event treatment is the primary artifact; use Payment Platform for provider ingestion, money ledger, settlement, and authoritative event projection."
---

# Refund And Support Flow Review

Use this skill to handle refunds without damaging trust or letting abuse break the product.

## Composition contract

Own entitlement/customer consequence, grace/hold/recovery, account action,
appeal, repayment, support, and product-feedback states. Do **not** own provider
event ingestion, money truth, or the entitlement projector. Consume those
authoritative facts from `payment-platform-readiness` or the owning provider/
ledger system and preserve their evidence references.

For every artifact, record `artifactVersion`, `artifactRevision`, and
`artifactState`; never put `artifactDigest` on the top-level artifact. Use the
[shared product artifact envelope](references/product-artifact-envelope.schema.json)
for structured drafts and sealed artifacts. Consume payment, entitlement,
purchase, product, economy, and support inputs through input references. A
sealed input additionally requires `artifactDigest` and
`digestRule: sha256-exact-bytes`; every input requires `fulfillsHandoffId`,
while a draft contains no digest fields.

## Workflow

1. Identify purchase type, provider/store, entitlement type, refund authority, and support ownership.
2. Read `references/refund-support-flow-patterns.md`.
3. Map authoritative provider/ledger evidence references and classify which
   event families actually apply. Always preserve entitlement consequence,
   customer messaging, support, appeal, audit, and reconciliation floors; do
   not instantiate unrelated commerce branches. If provider/ledger truth is
   missing or inconsistent, emit a typed blocker to Payment Platform rather
   than deciding it here.
4. Separate only the applicable cancellation, ordinary/goodwill refund, fraud,
   chargeback/dispute, consumable reversal, non-consumable revocation, restore,
   repurchase, and repeated-abuse paths. Record a reasoned non-applicability
   disposition for high-risk branches that could otherwise be confused.
5. Build one timeline per account before taking action: purchase, grant, usage/spend, cancellation, refund request, provider confirmation, entitlement transition, support messages, chargeback/dispute, appeal, and repurchase.
6. Define abuse scoring, false-positive controls, support dashboards, metrics, and approval thresholds before account restrictions.
7. Define the support operating model: queue owner, SLA, escalation owner, agent override permissions, QA sampling, approval thresholds, and appeal timeline.
8. Produce the common authority/evidence, entitlement, support, appeal,
   reconciliation, audit, and risk controls plus state-machine branches,
   ledgers, macros, and event fields only for the selected applicable paths.

## When not to use

- Use `customer-support-operations` when the primary artifact is the whole channel, queue, triage, staffing, QA, or escalation operating model rather than refund authority.
- Use `payment-platform-readiness` when checkout, ledger ingestion, settlement, finance close, and entitlement projection must be designed together.
- Do not invoke this full state-machine workflow to draft one customer reply when the governing refund and entitlement state is already known.

## Source verification

- Verify the current provider/store refund, cancellation, chargeback, restore, entitlement, and appeal authority from official sources at use.
- Record provider, product type, geography, policy/API version, access date, and URL for every external rule that changes money or access.
- Never turn an internal starter threshold, remembered store rule, or support convention into provider policy.

## Guardrails

- Do not auto-ban after a normal refund.
- Do not coerce repurchase with threats.
- Keep immutable ledger evidence for support and audit.
- Do not collapse Apple, Google, Stripe, chargebacks, and internal goodwill into one policy.
- Do not collapse cancellation into refund. A user may cancel renewal and keep paid access until period end without receiving money back.
- Do not revoke durable access without a server-side entitlement truth source and reversible audit trail.
- Do not re-ingest or reinterpret provider events as a competing money ledger. Reference the Payment Platform/provider authority and own only the downstream customer/account policy.
- Do not let restore-purchase or client state re-grant access after a confirmed refund, chargeback loss, or manual revoke without ledger reconciliation.
- Do not create surprise negative balances for spent consumables by default; use explicit policy, warnings, review, and appeal paths.
- Do not use refund flows to punish product-quality, outage, billing-copy, or accidental-purchase issues; feed those reason codes back into product/support fixes.
- Do not ask users to repurchase under threat. Repurchase restores value only after entitlement, dispute, and abuse state are reconciled.
- Do not omit reason-code taxonomy. Product-quality and support learning must explicitly distinguish outage_or_bug, unclear_pricing_or_copy, duplicate_charge, accidental_purchase, minor_purchase, policy_mismatch, store_policy_redirect, support_exception, and refund_abuse_suspected.
- Do not model chargebacks as a single refund event; include dispute_opened, evidence_due, evidence_submitted, dispute_won, dispute_lost, appeal_opened, and repurchase_requested states.

## Output format

```text
Artifact identity:
- schemaVersion / artifactId / productId / artifactKind / ownerSkill
- artifactVersion / artifactRevision / artifactState / inputArtifacts
- a sealed artifact does not self-hash; its exact-byte digest appears only in a downstream reference
- canonicalFactsOwned / handoffOutputs / assumptions / proofState / proofEvidence

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

Entitlement state machine:
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

Chargeback/dispute evidence packet:
- <state> -> deadline, evidence, commerce/data access, support message, owner

Abuse and trust ladder:
- <score/tier> -> evidence, action, approval, appeal path, false-positive guard

Support macros/events:
- <macro or event> with provider, purchase id, refund id, entitlement id, state transition, actor, reason code, support case id

Metrics/dashboard:
- <metric/event> -> owner, decision it supports
- Include refund detection lag, restore failures, entitlement revocation lag, support load, support QA variance, goodwill variance, false-positive/appeal reversal rate, dispute win/loss, repurchase after fix, churn, and product-quality reason trends.
```
