# Risk Queues and Marketplace Trust Economics

Use this reference to operate review capacity, model/rule evidence, learning, and
market-health tradeoffs without turning scores or gross volume into policy.

## Contents

- [Risk-to-action contract](#risk-to-action-contract)
- [Queue model](#queue-model)
- [Backlog and dependency behavior](#backlog-and-dependency-behavior)
- [Reviewer decision and QA](#reviewer-decision-and-qa)
- [Learning loop](#learning-loop)
- [Release and rollback](#release-and-rollback)
- [Trust economics](#trust-economics)
- [Decision-grade health measures](#decision-grade-health-measures)
- [Agent-first scale operations](#agent-first-scale-operations)

## Risk-to-action contract

Map every signal or score to a bounded decision input:

```text
signal_id / source / observed_at / entity and feature scope / purpose
model_or_rule_version / provenance / quality and missingness / spoofability
privacy and access basis / bias or segment risk / freshness-expiry
allowed action inputs / prohibited uses / disclosure class / outage behavior
```

Map every action independently:

```text
action_id / threatened resource / policy authority / evidence bar / uncertainty
affected parties / scope and maximum duration / queue or approval authority
safe explanation / appeal and restoration / audit / downstream owner
```

A model can prioritize or contribute evidence; it must not redefine the policy
taxonomy. Calibrate by action severity and reversibility rather than searching for
one universal marketplace threshold.

## Queue model

Separate queues when evidence, reviewer skill, urgency, disclosure, or authority
differs. Typical families can include urgent safety, participant compromise,
fraud/transaction risk, listing/content policy, dispute, policy ambiguity,
appeal, quality assurance, and specialist escalation.

Queue item contract:

```text
case_id / queue / entered_at / affected parties / harm and exposure bands
deadline class / confidence-uncertainty / reversibility / temporary action
evidence completeness and freshness / required reviewer authority and skills
policy version / prior attempt / dependency state / escalation owner
```

Prioritize through a documented function of expected harm, time sensitivity,
exposure, uncertainty, reversibility, legal/platform deadline, affected parties,
and current protective state. Use revenue or strategic status only if current
authorized policy gives it a legitimate role; never lower the evidence standard.

## Backlog and dependency behavior

Define per case class:

- maximum safe duration of any temporary action;
- whether to allow, cap, limit, queue, preserve a bounded last state, or escalate
  when review capacity or a dependency is unavailable;
- aging and deadline breach behavior;
- duplicate-case merge and related-entity isolation;
- reassignment, conflict, reviewer unavailability, and escalation;
- safe party communication and updated service class;
- automatic expiry or review—never indefinite limbo by default.

Backlog reduction is not a valid reason to auto-deny, auto-approve, or silently
extend high-impact holds. Measure work removed through better product/policy and
evidence quality, not only reviewer throughput.

## Reviewer decision and QA

Provide reviewers with policy examples/non-examples, evidence provenance and
freshness, entity state, allowed actions, safe explanation fields, downstream
handoffs, conflict declaration, and escalation. Keep model output visible as
fallible evidence where appropriate; avoid anchoring if blinded review is needed
for calibration. Use authorized agents by default and route only the ambiguity or
stakes that current authority reserves for a specialist; “reviewer” names a
decision authority, not an assumption of manual-first operation.

Sample quality by risk/action class, reviewer, policy version, surface, market
side, category, lifecycle, evidence completeness, confidence, appeal outcome,
delayed outcome, and authorized fairness segments. Measure agreement only after
accounting for policy ambiguity; consensus on vague policy is not correctness.

Use adjudication for hard cases with an explicit authority and feed ambiguity
into policy examples, product controls, training, or specialist review.

## Learning loop

```text
policy_version -> signals_and_models -> queue_and_decision -> enforcement
       ^                                                       |
       |                                                       v
policy_examples <- root_cause <- appeals/disputes/support/delayed_outcomes
       |                                                       |
       v                                                       v
product_control_or_guidance <- release_decision <- label_quality_audit
```

Maintain label records with event time, observation window, policy version,
source, reviewer/adjudication context, appeal state, delayed outcome availability,
and known selection mechanism. Separate these changes:

- policy meaning or examples;
- action/evidence authority;
- model training data or architecture;
- threshold/calibration;
- reviewer guidance/tooling;
- product eligibility or prevention control;
- user-facing explanation.

Do not retrain on enforcement decisions without correcting for policy changes,
appeal reversals, selective review, missing outcomes, reviewer disagreement, and
feedback loops. A lower appeal rate can mean less accessible appeals, not quality.

## Release and rollback

For a material policy/rule/model/queue change, define:

1. current and proposed versions and exact decision surfaces affected;
2. offline replay with time-aware data and leakage controls;
3. ambiguous/adversarial/synthetic and known-edge-case evaluation;
4. reviewer capacity and evidence-package impact;
5. shadow decision comparison where safe;
6. canary exposure and action caps by severity;
7. marketplace-side, category, lifecycle, fairness, and liquidity guardrails;
8. notice/appeal/restoration readiness;
9. halt, rollback, decision replay, and correction of already affected parties;
10. incident routing and post-release delayed-outcome review.

Do not copy internal engineering eval procedures into this skill; define the
product evidence obligation and hand implementation to current Doctrine frontier
verification, engineering, delivery, and incident owners.

## Trust economics

Model both marketplace sides and the platform over the relevant horizon:

```text
protected participant value and prevented authorized loss
- buyer/user harm that remains
- seller/creator/developer harm that remains
- false-positive and restoration cost
- false-negative, refund, chargeback, dispute, support, and moderation cost
- delayed payout or transaction friction from canonical owner data
- supply exit, demand loss, concentration, and liquidity effects
- control, review, appeal, and compliance operating cost
= evidence-bounded net trust contribution
```

Keep gross merchandise/value volume, platform revenue, refunds, payouts, and loss
inputs tied to their canonical financial sources. Use ranges and uncertainty when
causality or delayed truth is incomplete. Never fabricate a cost-benefit number
to justify a control.

Evaluate incentives created by ranking eligibility, badges, reviews, promotions,
fees, refund rules, payout timing, enforcement, appeals, and support. Ask who can
profit from low quality, collusion, manipulation, delay, or asymmetric evidence;
also ask which legitimate new or small participant could be trapped by cold-start
uncertainty.

## Decision-grade health measures

Define population, exposure denominator, window, policy/action/model version,
source authority, late-outcome policy, cohort cuts, and uncertainty for:

- participant and item exposure by eligibility/action state;
- verified harm or loss and protected value from authorized sources;
- false-positive/false-negative estimates with sampling limitations;
- queue arrivals, age, deadlines, evidence gaps, temporary-action duration, and
  capacity by case class;
- reviewer agreement, adjudication, QA defects, and policy ambiguity;
- notice delivery, appeal access, reversal, restoration completeness, and repeat
  error—not merely appeal rate;
- buyer and seller retention/trust, supply quality/diversity, concentration,
  liquidity, disputes, support load, and market-side asymmetry;
- drift, novel patterns, attacker displacement, and control cost.

Do not call correlation causal. Use holdouts or experiments only where ethical and
safe; do not withhold required protection. Report product design, implemented
control, observed output, and verified marketplace outcome as separate states.

## Agent-first scale operations

Build versioned policy, action, signal, queue, case, evidence, appeal, and
restoration schemas. Automate idempotent ingestion, deduplication, reversible
triage, evidence assembly, routing, deadlines, safe notices, decision projection,
appeal orchestration, downstream reconciliation, sampling, drift detection,
recertification, and transparency aggregation.

Keep judgmental cases in typed queues with bounded authority rather than an
unstructured manual shadow system. Every operator override needs reason, scope,
expiry, audit, and feedback. Every dependency has declared fail/degrade behavior,
and every high-impact automated action has a cap, kill switch, replay, correction,
and incident route.
