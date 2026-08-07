# Marketplace Policy, Enforcement, and Appeals

Use this reference to make policy decisions explainable, bounded, appealable, and
reversible across a two-sided marketplace.

## Contents

- [Fact and authority model](#fact-and-authority-model)
- [Policy rule contract](#policy-rule-contract)
- [Case state model](#case-state-model)
- [Action architecture](#action-architecture)
- [Evidence package](#evidence-package)
- [Dispute contract](#dispute-contract)
- [Notice contract](#notice-contract)
- [Appeal and restoration](#appeal-and-restoration)
- [Transparency without leakage](#transparency-without-leakage)

## Fact and authority model

Keep these categories separate in data, reasoning, and user communication:

| Category | Meaning |
| --- | --- |
| Allegation/report | A party or detector asserts something; not proof |
| Observation | A captured event, artifact, or system state with provenance |
| Verification | Observation reconciled with an authoritative source/test |
| Inference | A bounded conclusion with assumptions and uncertainty |
| Rule/model output | Versioned evidence input; never policy authority itself |
| Reviewer decision | Authorized action decision with rationale and evidence |
| Final outcome | Enforced and reconciled downstream state, subject to appeal |
| Authority pending | Required current policy/legal/platform/owner fact is missing |

Retrieve policy, terms, item/participant state, transaction and money referrals,
platform/jurisdiction requirements, privacy, appeal promise, and reviewer authority
at use. Preserve content/listing snapshots, effective policy version, decision
time, and later outcome rather than overwriting history.

## Policy rule contract

Represent each rule as:

```text
policy_id / rule_id / version / effective_at / surfaces / actors / item types
protected interest and harm / required facts / examples / non_examples
severity factors and mitigators / allowed temporary and final actions
notice reason category / disclosure limits / appeal eligibility and window class
restoration requirements / repeat-pattern semantics / owner / change history
```

Avoid rules so vague that reviewers invent a new standard per case. Avoid rules
so mechanical that context, intent, scale, vulnerability, recurrence, remedy, or
harm cannot affect a decision. If policy changes, define whether old items receive
grandfathering, notice and correction, re-review, or immediate protection based on
current authority; never silently apply a new version as if it existed earlier.

Keep policy separate from:

- eligibility prerequisites and quality standards;
- risk/detection signals and confidence;
- organic ranking and relevance;
- paid/editorial placement;
- seller performance/coaching;
- buyer-payment, refund, payout, and ledger decisions.

## Case state model

```text
submitted_or_observed -> eligibility_checked -> signals_attached -> triaged
          |                      |                    |              |
          v                      v                    v              v
 invalid_or_duplicate     no_policy_issue      urgent_protection  evidence_needed

triaged -> temporary_action_or_no_action -> investigated -> decision_authorized
    |                 |                            |                   |
    v                 v                            v                   v
policy_ambiguity  party_notice_needed       insufficient_evidence  enforcement_started

enforcement_started -> notice_delivered -> appeal_window -> final_or_reversed
          |                    |                   |                 |
          v                    v                   v                 v
partial_failure        safe_disclosure_limit  new_evidence     restoration_pending

restoration_pending -> downstream_reconciled -> case_closed -> learning_eligible
```

For every transition define actor/authority, prerequisites, evidence, policy
version, allowed side effects, safe message, deadline class, retry/idempotency,
audit event, downstream owner, appeal/recovery, and completion proof.

## Action architecture

Use action-specific evidence bars. Examples of action families, ordered by
impact only approximately:

- education, clarification, correction request, or warning;
- draft/review hold, visibility limit, label, or discoverability restriction;
- identity, ownership, delivery, or capability verification;
- bounded transaction/listing/capability pause or referral to a money owner;
- review suppression or trust-signal exclusion where manipulation is evidenced;
- marketplace capability restriction or scoped suspension;
- item removal/delisting;
- participant suspension or termination.

For each action record threatened resource, affected parties, scope, duration,
evidence and confidence, policy authority, reversibility, notification, appeal,
restoration, and downstream side effects. High impact and low reversibility
increase the required evidence and independent authority.

Do not combine listing removal, search demotion, payout hold, refund, account
termination, and confiscation into one “block” action. Money state requires a
typed request to its canonical owner and an authoritative result back.

## Evidence package

```text
case_id / marketplace and surface / actor and item IDs / current lifecycle state
allegation or trigger / observations with source and capture time
content/listing/transaction snapshots and versions / policy and rule versions
rule-model outputs with version and uncertainty / related-case linkage basis
party-submitted evidence / sensitive evidence access class
prior relevant decisions and appeal outcomes / affected parties and exposure
temporary action and reason / reviewer authority / decision and rationale
safe explanation category / downstream requests and authoritative results
retention-expiry / audit references
```

Distinguish missing evidence from negative evidence. Do not infer guilt from a
party's inability to produce data the product never told them to retain. Protect
reporter identity, sensitive safety facts, private user data, fraud linkages, and
evasion-sensitive logic with purpose-bound access.

## Dispute contract

Classify the dispute before deciding it: non-delivery, quality/promise mismatch,
ownership/IP, rating/review, item/listing policy, refund/chargeback, payout hold,
fraud suspicion, moderation appeal, or another typed class.

For each class define:

| Element | Required decision |
| --- | --- |
| Parties and standing | Who may open/respond/appeal and for which item/transaction |
| Evidence | Party and platform evidence, source, deadline, burden limits |
| Temporary protection | Visibility/capability/referral action and duration |
| Financial interface | Typed request/result from refund, payment, or payout owner |
| Reviewer authority | Conflict rules, escalation, precedent or specialist route |
| Communication | What each party sees and when |
| Outcome | Item, capability, rating, policy, and support effects |
| Appeal | Window class, new evidence, reviewer independence, finality |
| Learning | Listing/onboarding/policy/product cause to improve |

Do not bias decisions toward buyer, seller, strategic partner, or high-revenue
participant without an explicit current policy. Segment fairness review by side,
category, geography, lifecycle, revenue/volume band, and other authorized slices
while protecting privacy and avoiding proxy harm.

## Notice contract

Provide enough safe specificity for the affected party to understand and act:

- affected item, capability, or account scope;
- current action and effective timing;
- policy reason category and safe relevant facts;
- whether the action is temporary or final;
- corrective action or evidence that can be supplied;
- appeal eligibility, route, and expected service class if authorized;
- downstream money/support state only after its owner confirms it;
- how future behavior or restoration will be evaluated.

Do not reveal private reporters, raw reviewer notes, exact model/rule thresholds,
account linkage, investigative methods, or unsafe content unnecessarily. “Policy
violation” with no affected item, rule category, or recourse is not actionable.

## Appeal and restoration

Preserve the original case, evidence, policy version, decision authority, and
notice. Record appeal basis, new evidence, conflicts, reviewer independence,
decision, rationale, and correction. Do not measure appeal quality only from
appeal volume: access, language, disability, effort, fear of retaliation, and
understanding affect who appeals.

On reversal or expiry, reconcile every affected projection:

- item/listing/content visibility and eligibility;
- trust or policy flags and repeat-pattern state;
- ranking-eligibility signal, without dictating organic rank;
- reviews/ratings or capability state where the decision changed them;
- participant notices and downstream notifications;
- payment/refund/payout requests and results through their owners;
- customer support case, public/private badge, and audit/transparency state;
- compensation or correction route when authorized harm occurred.

Case closure requires downstream reconciliation evidence, not only an appeal
decision field.

## Transparency without leakage

Aggregate by versioned policy category, surface, action, detection/review source,
appeal eligibility, appeal outcome, reversal reason, time class, and relevant
market segments. Document coverage, suppression/privacy rules, late corrections,
and denominator. Do not publish tiny cohorts, sensitive tactics, or misleading
volume without marketplace exposure.
