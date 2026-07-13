---
name: marketplace-trust-operations-review
description: "Design or audit a two-sided marketplace trust operating system across participant and listing policy, content or commerce risk, moderation and fraud-review queues, temporary controls, disputes, evidence, enforcement ladders, notices, appeals, restoration, policy/model learning, fairness, trust economics, and marketplace health. Use when the primary artifact is a Marketplace Trust Operating Contract joining those decisions across buyers and sellers, creators, developers, or partners. Do not use for payout-ledger mechanics, generic product abuse outside a marketplace, seller performance coaching, or a general search/recommendation ranking algorithm alone."
---

# Marketplace Trust Operations Review

Produce one **Marketplace Trust Operating Contract** that protects participants
and market quality without making one opaque score the authority for visibility,
money, access, and account survival. Treat policy, evidence, queues, decisions,
appeals, restoration, and economics as one closed operating loop.

## Atomic boundary

Own two-sided participant and item policy taxonomy, marketplace harm and incentive
model, risk-action contract, moderation/fraud/dispute queues, evidence packages,
temporary controls, enforcement ladder, notices, appeals, restoration, reviewer
quality, policy/model feedback, fairness, transparency semantics, trust economics,
and marketplace-health evidence. Consume payout ledger, buyer payment/refund,
seller performance, ranking/retrieval, generic abuse, identity, privacy, security,
and incident truth from their canonical owners.

## When not to use

- Do not use for payout/ledger operations, buyer payment authority, or one
  post-refund account-consequence flow; use the marketplace payout, payment, or
  refund specialist as appropriate.
- Do not use for seller performance coaching or a general search/recommendation
  ranking system; export bounded trust evidence to those owners instead.
- Do not use for generic abuse outside a marketplace or for implementation of
  model evaluation, engineering controls, incidents, or delivery proof.

## Resource routing

- Read `references/policy-enforcement-appeals.md` for every task.
- Read `references/risk-queues-and-trust-economics.md` when risk scores, fraud
  queues, reviewer operations, policy/model learning, thresholds, fairness,
  rollout, incentives, cost, liquidity, or market-health tradeoffs matter.

## Source verification

Retrieve current marketplace terms, policy versions and examples, participant
and item states, dispute/refund/payout handoff contracts, risk/model/rule versions,
reviewer guidance, appeal promise, platform and jurisdiction requirements,
privacy/data constraints, ranking eligibility interface, and operating metrics at
execution. Record source owner, effective/version date, access time, and conflict.
Never turn stale policy, a model score, selected cases, or revenue pressure into
current authority or proof.

## Operating rules

1. Define each marketplace side, role, item/content/service, transaction or value
   exchange, lifecycle stage, promise, affected resource, and plausible harm.
   Include legitimate edge cases and adversarial incentives before controls.
2. Keep policy taxonomy independent from detection rules and model output. For
   each rule define scope, examples/non-examples, severity factors, evidence,
   allowed actions, notice boundary, appeal, restoration, and version behavior.
3. Separate eligibility, detection, triage, investigation, temporary protection,
   final decision, enforcement, notice, appeal, restoration, repeat-offender, and
   transparency states. One score must not silently collapse those authorities.
4. Route queues by expected harm, time sensitivity, financial or safety exposure,
   confidence/uncertainty, reversibility, policy ambiguity, and deadlines—not
   FIFO, revenue tier, or a single risk score. Define queue capacity behavior.
5. Build evidence packages with provenance, capture time, entity/version, policy
   version, safe facts, sensitive signals, uncertainty, prior decisions, affected
   parties, and reviewer authority. Keep user-visible explanations separate from
   evasion-sensitive evidence and private reports.
6. Match controls to evidence and threatened resource: educate/request change,
   limit visibility or capability, verify, hold a marketplace action, queue
   review, demote trust eligibility, suspend bounded functions, remove/delist,
   then terminate only with appropriate authority. Preserve unrelated earned or
   purchased value unless its canonical owner authorizes an effect.
7. Treat disputes as party conflicts with an evidence and fairness contract.
   Define deadlines, temporary protection, independent review where stakes
   require it, communication, decision, appeal, and downstream enforcement. Do
   not let payout or refund implications bypass their ledger owners.
8. Make appeals and restoration operational, not decorative. Preserve the
   original evidence and policy version, allow relevant new evidence, control
   reviewer independence, measure reversals, restore listing/visibility/capability/
   reputation/notification state, and correct harmful downstream effects.
9. Keep ranking eligibility, trust signals, organic relevance, editorial
   featuring, paid placement, seller performance, and policy enforcement distinct.
   Export typed trust evidence; do not design the general ranking algorithm here.
10. Close the learning loop with reviewed outcomes, appeals, disputes, chargeback
    or loss signals from their owners, support cases, policy edge cases, and new
    abuse patterns. Preserve label provenance and policy version; do not train or
    recalibrate on raw decisions as if they were ground truth.
11. Optimize marketplace health, not gross volume or loss alone. Model buyer and
    seller harm, false positives/negatives, support and review cost, refunds or
    chargebacks from authoritative owners, supply quality/diversity, liquidity,
    retained trust, and attacker adaptation with uncertainty.
12. Build for scale at first delivery: versioned policy and action registries,
    typed evidence and queues, automated reversible triage, reviewer workbench,
    QA sampling, appeal/restoration orchestration, simulation/replay, shadow and
    canary release, caps/kill switches, drift alerts, transparency aggregation,
    and auditable specialist handoffs.
13. Separate `alleged`, `observed`, `verified`, `inferred`, `model_or_rule_output`,
    `reviewer_decision`, and `authority-pending`. Never invent violations, fraud,
    financial exposure, policy authority, fairness results, or prevented loss.

## Workflow

### 1. Frame the market and harm

Map participant roles, items/content/services, value and money interfaces,
marketplace promises, incentives, protected resources, harms, legitimate
lookalikes, current authority, and the exact trust decision. Define hard legal,
safety, privacy, rights, accessibility, and trust floors.

### 2. Build policy and action architecture

Create the policy taxonomy and version semantics, severity/action matrix,
eligibility and temporary controls, evidence contract, explanation boundary,
dispute categories, appeal/restoration states, and specialist side effects.

### 3. Design risk and review operations

Define signal provenance, action-specific evidence bars, queue taxonomy and
priority, reviewer authority, QA/calibration, SLA classes, outage/backlog
behavior, fairness checks, and escalation without exposing evasion logic.

### 4. Close learning and economics

Bind policy/rule/model/reviewer versions to decisions and delayed outcomes.
Specify label-quality audits, appeal and dispute feedback, threshold/policy change
separation, safe experiments, market-health economics, and correction of harm.

### 5. Automate and verify

Implement the contract as versioned, replayable, idempotent decision flows with
shadow/canary, bounded actions, kill switches, audit, restoration, drift and
incident routing. Verify behavior on known, synthetic, ambiguous, adversarial,
outage, backlog, and cohort cases; do not claim production efficacy from design.

## Owner handoffs

- Use `marketplace-payouts-review` for seller earnings, reserves, payout holds,
  clawbacks, ledger, reconciliation, and payout authority. Send a typed trust or
  dispute referral; never mutate balances from this artifact.
- Use `refund-and-support-flow-review` for customer/account consequences after an
  authoritative refund, cancellation, chargeback, or revocation event.
- Use `payment-platform-readiness` for buyer payment ingestion, money ledger,
  settlement, provider events, and finance truth.
- Use `marketplace-seller-performance-review` for opportunity-normalized seller
  quality, coaching, badges, and performance interventions.
- Use `search-discovery-quality-review` for retrieval, relevance, recommendation,
  diversity, and general ranking. Export policy eligibility and calibrated trust
  evidence without leaking sensitive features.
- Use `product-abuse-risk-review` for adaptive abuse outside the marketplace or
  across unrelated product resources.
- Use current Doctrine incident, security, privacy, frontier verification,
  engineering, and delivery procedures for live incidents, internal controls,
  model/eval engineering, implementation, and shipped-state proof.

## Hard gates

Reject or redesign an output that:

- lets a model score, reviewer queue, payout hold, popularity, revenue tier, or
  policy label become unrestricted authority over all marketplace actions;
- has no versioned policy, evidence provenance, uncertainty, notice, appeal, or
  downstream restoration for a high-impact action;
- permanently enforces from low-confidence automation or treats absence of an
  appeal as proof the decision was correct;
- favors high-value participants or a marketplace side by changing the evidence
  standard without an explicit authorized policy basis;
- exposes fraud/model thresholds, private reports, reviewer notes, sensitive
  signals, or enough detail to enable evasion;
- releases, holds, reverses, or confiscates money without the canonical payment,
  refund, or payout authority;
- treats reviewed decisions as training truth without policy-version, label-
  quality, selection-bias, appeal, and delayed-outcome controls;
- reports fairness, prevented loss, policy quality, trust, liquidity, or unit
  economics from invented numbers or undefined populations and windows;
- automates irreversible action without idempotency, audit, queue/outage behavior,
  caps, rollback/restoration, and incident routing.

## Output contract

Produce one **Marketplace Trust Operating Contract** containing:

1. artifact ID, marketplace sides and value exchange, items/surfaces, current
   authorities, evidence labels, incentives, harms, hard floors, and open facts;
2. versioned policy taxonomy, examples/non-examples, severity/action matrix,
   eligibility, explanation boundary, and policy-change behavior;
3. detection-to-restoration state machines for moderation, fraud/risk review,
   disputes, temporary controls, enforcement, notices, appeals, and recurrence;
4. evidence schema, action-specific decision table, queue priority/capacity,
   reviewer authority, QA, fairness, outage behavior, and safe communications;
5. downstream side-effect and handoff map for listing, visibility, rating,
   capability, ranking eligibility, payments, refunds, payouts, and support;
6. policy/model/label feedback, release and rollback plan, simulation/replay,
   shadow/canary, drift/adaptation, restoration, and transparency aggregation;
7. trust-economics and marketplace-health measures with authoritative inputs,
   populations, windows, uncertainty, cohort cuts, and no unsupported claims.

The artifact is complete when every marketplace action can be traced from a
current rule and bounded evidence through authorized decision, communication,
appeal, restoration, learning, and economic consequence—without stealing the
authority of money, ranking, seller-performance, or engineering owners.
