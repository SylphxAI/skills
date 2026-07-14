# Case Decisions, Remedies, And Scenario Playbooks

## Contents

1. Case state and evidence
2. Human response contract
3. Remedy and compensation decision
4. Scenario playbooks
5. Abuse and boundary handling
6. Cultural adaptation
7. Automation, CRM and learning
8. Current-authority sources

## 1. Case state and evidence

Use a state machine rather than an email thread:

```text
received
-> identity_or_authority_pending | evidence_pending | classified
classified
-> decision_pending | owner_handoff | action_pending | response_ready
action_pending | owner_handoff
-> verification_pending | waiting_dependency
response_ready
-> sent -> verification_pending
verification_pending
-> resolved | partially_resolved | reopened | appeal_open
resolved | partially_resolved
-> feedback_linked -> closed
```

Every waiting state has dependency, owner, due/next-check time, customer update deadline and fallback. A missed internal dependency never silently becomes the customer's responsibility.

### Evidence labels

| Label | Meaning | Allowed use |
| --- | --- | --- |
| `customer-stated` | customer's account of events | acknowledge and investigate; not automatic proof or disbelief |
| `system-observed` | observed internal/product state | use within source scope and freshness |
| `authority-confirmed` | owning provider/policy/system fact | use for the governed decision |
| `conflicting` | sources disagree | block irreversible decision; reconcile owner |
| `assumed` | working assumption | state explicitly; do not promise from it |
| `unknown` | missing material fact | ask minimum question or choose safe reversible path |

Preserve original message, attachments, headers/IDs, consent, redactions, translations, actions and timestamps according to current retention and access policy. Do not preserve unnecessary personal data “just in case.”

## 2. Human response contract

Use this shape proportionately; do not force nine paragraphs for a simple case.

1. **Recognition:** name the specific problem and impact without generic theatre.
2. **Known state:** state what was verified, what remains uncertain and what not to repeat.
3. **Direct answer:** answer yes/no/partial/pending and the reason at useful altitude.
4. **Action:** describe what has been done or the exact next safe step.
5. **Ownership and time:** name who owns the dependency and when the next update arrives; do not invent an ETA.
6. **Remedy:** explain refund, credit, extension, restoration, exception or decline and any relevant limit/expiry.
7. **Choice and appeal:** let the customer reply, choose among real alternatives, or appeal a high-impact decision.
8. **Close:** concise, natural and culturally appropriate.

Examples of grounded language:

```text
I confirmed <specific observed state>. I have not yet confirmed <material unknown>.
You do not need to repeat <failed/destructive step>.
I have <authorized action>, and the authoritative state now shows <readback>.
The <owning team/system> is checking <dependency>. I will update you by <time>, even if the answer has not changed.
We cannot approve <request> under <current rule>, but we can offer <real alternative>.
If you think we used the wrong facts, reply with <minimum evidence> and we will reopen the decision.
```

Avoid “we value your feedback,” “as a valued customer,” “per policy” without explanation, defensive chronology, blame, unsupported certainty, or repeatedly asking the customer to prove facts visible internally.

## 3. Remedy and compensation decision

### Remedy ladder

Choose the smallest outcome that fully addresses the verified harm:

1. truthful explanation or status;
2. guided correction/workaround with retained state;
3. restore, repair, replace, reperform or extend the promised service;
4. waive a fee, correct a charge, refund or credit through the owning money system;
5. bounded goodwill compensation for verified inconvenience or lost value;
6. policy exception inside an approved authority envelope;
7. specialist/legal/safety decision where support lacks authority;
8. reasoned decline plus safe alternative and appeal.

Do not substitute coupons for money that must be returned, credits for lost data, apologies for unresolved security harm, or gifts for fixing the product.

### Constrained decision model

First apply hard admission floors:

```text
law and consumer right
contract and approved company policy
platform/provider authority
safety, privacy, security and non-retaliation
truth, identity and recoverability
```

Only admitted options may be compared:

```text
Expected resolution value
= probability_of_durable_resolution * retained_contribution
+ trust_repair_value
+ avoided_repeat_support_and_churn
+ learning_or_recovery_value
- direct_money_or_service_cost
- fraud_and_repeat_claim_leakage
- inconsistency_and_precedent_cost
- operational_and_accounting_cost
- tail_downside_reserve
```

Define currency and time horizon. Use ranges when evidence is weak. Test downside concentration and worst credible loss; an attractive average does not justify an unbounded legal, safety, privacy, fraud, or reputational tail. For low-dollar reversible cases, the transaction and trust cost of arguing may exceed the remedy. For systematic or easily gamed cases, consistency and root-cause correction matter more than one cheap appeasement.

### Compensation inputs

- verified harm, duration, scope and recoverability;
- company fault or avoidable contribution;
- plan promise/service objective, price paid and unusable period;
- actual lost value versus inconvenience;
- customer effort caused by the company;
- prior remedies for materially similar cases;
- vulnerability/accessibility impact without exploiting protected traits;
- abuse evidence and repeat pattern;
- accounting, tax, entitlement and provider consequence;
- expiry, reversal, transferability, duplicate prevention and product/economy effect.

Compensation should be reason-coded, consistent by material facts, bounded, auditable and idempotent. It must never require a positive review, silence, complaint withdrawal, deletion of a post, waiver not approved by legal authority, or future spend.

## 4. Scenario playbooks

| Scenario | Decide from | Default handling | Do not |
| --- | --- | --- | --- |
| Small genuine product issue | impact, company fault, duration, workaround, repeat pattern | fix or route; concise apology; bounded credit/extension only when proportionate; link systemic defect | spray gifts instead of fixing or demand a review |
| Outage or widespread failure | incident authority, affected cohort/time, plan promise, verified recovery | one incident source, proactive updates, cohort-based idempotent remedy where warranted | make every customer beg separately or invent recovery time |
| Duplicate/incorrect charge | provider and ledger truth, invoice/tax state | correct through Payment owner, refund/credit as authorized, confirm money and entitlement separately | issue an off-ledger gift or call cancellation a refund |
| Ordinary refund request | purchase, provider, right/policy, usage, reason | explain eligibility, route provider path, preserve unrelated data, apply approved entitlement consequence | auto-ban, threaten repurchase or label fraud from sentiment |
| Suspected malicious refund/chargeback | confirmed timeline, linked identities, prior pattern, consumption/transfer, provider dispute | preserve evidence, distinguish dispute stages, proportionate commerce restriction, notice, review/appeal, correction | punish before authority, disclose evasion thresholds, hold unrelated data hostage |
| Trial request | published eligibility, prior trials, product fit, service cost/capacity, abuse risk, sales motion | approve deterministically, or offer demo/sandbox/limited proof/paid pilot; state conversion and expiry | favour status/followers, hide auto-renewal or improvise unlimited service |
| Gift/credit request | harm, promise, approved goodwill envelope, repeat pattern | grant only for a reasoned policy cohort; otherwise decline warmly and offer a real useful alternative | teach users that persistence, threats or public pressure earns value |
| Cancellation or downgrade | current plan/contract, renewal date, access/data policy | make stop/renewal effect explicit; preserve export/read-only behavior; offer help without obstruction | create cancellation mazes, fake scarcity or conflate with refund |
| Legal or regulator threat | exact statement, jurisdiction/customer contract, evidence, deadlines, safety/security/retention implications | acknowledge receipt, preserve evidence, stop argument, route authorized owner, give safe contact/update | ignore by default, admit liability, make legal conclusions, retaliate or delete records |
| Abusive contact | behavior, credible threat, channel history, underlying service issue, staff-safety policy | separate issue from conduct; set boundary; rate-limit/channel-restrict/escalate proportionately; continue essential lawful route | trade insults, stereotype, deny a valid right solely for rude language |
| Vulnerable or accessibility case | expressed need, task barrier, urgency, safe accommodation | adapt channel/format/time, reduce repeated burden, route specialist risk | infer capacity, demand diagnosis, exploit vulnerability for retention |

### Legal-threat reply skeleton

```text
We have received your message regarding <matter>.
We have preserved the case and the information currently available to us.
<Authorized factual status or immediate safe action.>
The matter has been routed to <authorized owner/channel>. You can expect the next update by <time or defined event>.
We will not speculate on the legal issues while that review is pending.
```

This is an operating pattern, not legal advice. Current legal owner instructions override it.

### Trial decision record

```text
request and intended use:
published eligibility and prior trial state:
fit and success event:
cost/capacity and abuse envelope:
card/no-card, start/end, included limits and conversion terms:
approved path: trial | sandbox | demo | proof-of-concept | paid pilot | decline
reason, expiry, owner, follow-up and conversion/learning measure:
```

## 5. Abuse and boundary handling

Assess behavior, evidence and impact—not customer identity, tone model score, nationality, disability, protected trait, follower count or staff dislike.

Use a proportional ladder:

```text
inform -> warn -> slow/rate-limit -> restrict affected channel/capability
-> require stronger verification -> temporary suspension
-> independent policy review -> durable enforcement
```

Each step names evidence threshold, affected capability, start/expiry, customer notice, essential-access/data path, review/appeal, correction and audit. Credible immediate threats, doxxing, fraud, account takeover, child/safety harm or coordinated abuse may skip steps under the owning policy.

Do not reveal fraud/security rules that materially enable evasion. Give a useful reason category and appeal evidence instead.

## 6. Cultural adaptation

Keep invariant:

- factual truth and uncertainty;
- equal treatment for materially equal facts;
- remedy authority and audit;
- privacy, safety, non-discrimination and appeal;
- clear next action and ownership.

Adapt from actual locale/customer preference and approved style:

- directness, formality, honorifics and apology intensity;
- greeting/closing, name order and pronouns;
- date, time, number and currency formats;
- channel preference, operating hours and response cadence;
- translated policy explanations, accessibility and reading level;
- current jurisdiction-specific rights and required notices.

Do not infer that a culture expects dishonesty, unlimited compensation, no apology, aggressive upsell, or weaker rights. Translate meaning, not just words; retain the original plus translation/provenance for material cases.

## 7. Automation, CRM and learning

Automation may retrieve permitted facts, summarize, translate, classify, suggest, draft, execute pre-authorized idempotent remedies, schedule updates, verify state and cluster systemic issues. It must abstain or hand off on missing identity, conflicting authority, novel exceptions, legal/safety signals, high-impact enforcement, irreversible action or cap exceedance.

CRM/helpdesk records case and relationship workflow; they do not become the payment, entitlement, identity, incident or product event ledger. Store stable references, not uncontrolled copies. Separate customer-visible reply, private support note, sensitive fraud/security note and privileged/legal material with appropriate access.

Track verified resolution, time to durable outcome, waiting-state age, updates kept/missed, reopen/recontact, appeal correction, remedy cost, compensation consistency, fraud leakage, churn/refund after resolution, complaint, trust, accessibility, source freshness and product-defect closure. CSAT and handle time are diagnostics; never optimize them by hiding escalation or closing early.

Close the learning loop:

```text
case -> reason/evidence cluster -> owner -> reproduce/verify
-> product/policy/process candidate -> validate -> ship/change
-> live readback -> affected-customer update -> recurrence measure
```

## 8. Current-authority sources

At use, retrieve current authority from the applicable consumer regulator, contract, payment/store provider, privacy authority, support policy, and authorized legal route. Useful starting points include:

- [US Federal Trade Commission business guidance](https://www.ftc.gov/business-guidance)
- [FTC endorsements and reviews guidance](https://www.ftc.gov/business-guidance/advertising-marketing/endorsements-influencers-reviews)
- [European Commission consumer rights](https://commission.europa.eu/live-work-travel-eu/consumer-rights-and-complaints_en)
- [UK Competition and Markets Authority consumer protection](https://www.gov.uk/government/organisations/competition-and-markets-authority)
- the selected payment processor and marketplace refund/dispute documentation.

Record publisher, URL, jurisdiction/scope, retrieval date, effective version, uncertainty and the exact case decision it governs.
