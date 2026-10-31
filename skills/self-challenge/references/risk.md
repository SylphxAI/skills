# Risk

Use this method to identify, assess, treat and review material legal,
commercial, technical and operational risk. Its 5×5 scales and response bands
are chosen defaults for a small organization; the workspace owns its accepted
risks and any different appetite.

Scoring operates within the requester's authority and applicable hard lines.
Use [deliver-and-verify](../../deliver-and-verify/SKILL.md) for execution
and recovery authorization.

## Hard lines

- **Never knowingly commit a crime.** Criminal illegality is the unscored legal
  boundary.
- Preserve unique user data and spend within the existing grant; execution
  authorization follows [deliver-and-verify](../../deliver-and-verify/SKILL.md).
- Treat organizational survival as a decision constraint when comparing options.
  Score other material grey-area exposure before using it to block work; honor
  accepted risks and avoid repeating warnings without changed evidence.

## 1. Everything is scored

Rank material legal, commercial, technical and operational risks under the
hard boundaries above. Estimate proximity (when the outcome could arrive) and
velocity (how fast the impact unfolds) where either changes the action. A risk
score does not cancel an applicable duty or authorize spending or data loss.

The legal floor and company-side outside view live in
[conduct](conduct.md#methods-table); scoring never overrides them.

## 2. Score it

Use a five-by-five consequence and likelihood matrix. The score is an ordinal
ranking aid, not an expected monetary loss. Define the assessment horizon
(one year by default), estimate likelihood from exposure and comparable data,
and state the evidence and uncertainty behind the chosen rating. Prior
occurrence is evidence; it does not mechanically determine annual likelihood.

| Likelihood | 1 Rare | 2 Unlikely | 3 Possible | 4 Likely | 5 Almost certain |
| --- | --- | --- | --- | --- | --- |
| Meaning within the stated horizon | exceptional | not expected | plausible | expected | near-certain |

Calibrate probability bands when the evidence and decision warrant them. Use
explicit numeric probabilities for an expected-loss estimate rather than
converting these labels into invented probabilities.

Measure financial impact against monthly running cost as a reference default:

| Impact | 1 Trivial | 2 Minor | 3 Moderate | 4 Major | 5 Severe |
| --- | --- | --- | --- | --- | --- |
| Reference loss | under one day's cost | one day to under one month | one to under three months | three months or more, while recoverable | the organization cannot continue |

Map a product outage or other operational consequence to its realistic loss and
recovery cost. Apply the data-preservation boundary separately from a tradeable
financial score.

Estimate claim or enforcement likelihood from the actual exposure,
jurisdiction and comparable cases. Company size alone does not establish low
likelihood. When timing matters, state the relevant exposure and discounting
assumptions and reassess as they change.

**Score = likelihood × impact**, from 1 to 25. For a reversible outcome, include
the chance and cost of recovery, downtime, lost value and permanent harm; do not
assume an account can be reopened or a product relisted. Scores rank risks
within the same matrix; expected-loss estimates price them separately.

Assess likelihood from the actual exposure surface (public redistribution vs.
strictly internal tooling) and observed enforcement history in the target
market rather than treating theoretical worst-case scenarios as certainties.

## 3. Decide

Compare expected loss with the money, implementation time, operating cost and
speed lost under each feasible treatment. The following bands express this
method's default appetite; they are not claimed as mandatory cut-points from
an external standard.

| Score | Default |
| --- | --- |
| 1–6 | Accept and note the basis briefly. |
| 8–12 | Accept with a review trigger, or take a mitigation whose benefit exceeds its total cost. |
| 15–25 | Compare reduction, transfer and avoidance with acceptance under the survival, data and authority boundaries; use the highest-value feasible choice. |

Accept, reduce, transfer and avoid are the working menu. Compare their actual
costs rather than assuming that avoidance is always the most expensive choice.

Two money checks back the table:

- **Expected loss:** for repeatable events, estimate expected annual event
  count times mean loss per event, stating the assumptions about frequency,
  severity and dependence. Probability times loss is suitable for a one-event
  model. Compare that exposure with the treatment's total cost. Derive cost of
  delay from the loss the treatment would actually prevent
  ([priority.md](../../author-item/references/priority.md)).
- **Survival:** assess expected value within the organization's ability to
  survive a loss and preserve unique user data. A non-ruinous risk can still
  justify a cheap mitigation when the expected benefit exceeds its cost.

Quantify exposure when an estimate could change the action, including a cheap
high-value estimate below score 15. Give the rough annual loss and treatment
cost, using ranges when the inputs are uncertain.

- Estimate event frequency and per-event severity from evidence.
- State dependencies and aggregation assumptions before combining the ranges.
- Claim a percentile only from an explicit distribution or simulation. Three
  elicited points alone do not determine a unique annual-loss 90th percentile.

Use sensitivity checks to find which uncertain input can change the choice.
The Open FAIR model is a reference for separating loss frequency and magnitude;
its source does not make this particular matrix or cut-point mandatory.

## 4. Price the realistic outcomes

Build a decision tree for the actual exposure: plausible outcomes, their
conditional probabilities, timing and costs. Use comparable cases and the
applicable rules rather than assuming that a warning always precedes a claim
or that a small company will not face immediate action. Include uncertainty
and any costs that persist after the event is reversed. Evaluate a real notice
on its facts and the supported response available.

## 5. Record and review

- Record each accepted grey-area risk scored 8 or more with its reason, evidence
  and review trigger in the owning risk register.
- Reassess when exposure, evidence, law, income or counterparty contact changes
  a material input. Choose the treatment under the current authority and retain
  the earlier decision with the new status.

## 6. Likelihood follows exposure and evidence

Use witnessed failures, comparable cases and present exposure to estimate
likelihood. State monitoring and sampling limits: a quiet period does not by
itself establish that the event is rare. NIST SP 800-30 Rev. 1 considers threat
sources, vulnerabilities, safeguards, empirical data and uncertainty. Apply the
workspace's accepted risks and actual priority boundaries to the resulting
assessment.

## 7. A fix stops at its target

A root-cause fix is future-proof when this class of failure falls back inside
a target set before the incident, not when it can "never happen again". "Never again" has no end: one more backup copy or one
more isolated machine always looks safer, and that is how a single incident
takes over a design.

- **State the target first.** Name the availability, data-recovery or other
  outcome the fix restores. Choose a recovery design that meets its RPO and
  RTO and verify restoration.
- **Keep the fix proportional.** Include implementation and operating cost,
  capacity, speed and complexity. Stop adding work when the expected benefit
  no longer justifies that total cost.
- **Test the rule and its enforcement.** Compare both with the observed failure.
  Preserve the objective, and change the principle or mechanism when current
  evidence supports it. Record how the earlier failure remains controlled.
- **Reversible decisions are made fast; irreversible ones carefully**
  (one-way and two-way doors). Data loss and anything customer-visible that
  cannot be undone are one-way doors.

## 8. Check for over-caution before calling something illegal

Language models lean cautious: the word "law" tends to become "block". Agents are
company employees and representatives acting with delegated organizational
authority—never outside prosecutors or auditors turning the company's internal
workings inside out so external statutes paralyze normal internal operations.
Before a legal concern stops or rewrites work, run these four checks from the
company's side:

- **Black-box observational equivalence and information asymmetry.** External
  laws, regulators and customers observe and govern the company's external
  commercial boundary (what the customer is promised and what the customer
  actually receives), never how the company structures its internal hierarchy,
  software or workflow. Whether an approval, quota or reservation is executed by
  two separate humans, one person wearing both hats (`自己批自己`), or an
  authorized agent is an internal implementation detail that is opaque and
  observationally equivalent from outside. Never treat internal automation or
  single-agent delegation as a "false description" of an internal process.
- **Indoor management principle (*Turquand's Rule*) and delegated authority.**
  Under corporate law, internal approval mechanics and divisions of authority are
  matters of indoor governance. When the organization's authorized agent grants
  an exception, allocates a monthly quota or holds a time-limited reservation in
  the system, the organization has genuinely approved, allocated and reserved
  it. If a mechanism is missing in code or state, build or record the mechanism;
  never ban the business practice or language.
- **Materiality and consumer detriment test (name the false fact).** A
  false-description or unfair-practice concern requires three elements:
  1. **Deliverable mismatch:** the customer received less than promised or paid
     for;
  2. **External falsifiability:** the statement contradicts an externally
     observable fact; and
  3. **Actual consumer detriment:** the statement caused a customer to suffer a
     material loss.
  If the customer receives the exact promised benefit and suffers zero
  detriment, internal framing and approval workflows are lawful commercial
  execution. Say exactly which external fact is false before raising a concern.
- **Start from witnessed reality, not hypothetical prosecutor readings.** A
  misled customer, a complaint, a loss or a regulator, store or partner making
  contact is evidence. "It could be read as false if our internal architecture
  were transparent" is an invalid premise; score any real external exposure, say
  it once, and let the owner proceed. Two agents built on similar models
  reaching the same caution count as one opinion, not two.

## How it is judged

A decision states the material risk, evidence, likelihood and impact rating,
and chosen action. An accepted grey-area risk scored 8 or more has a recorded
reason and review trigger. Quantitative estimates are useful when they can
change the choice; their assumptions and uncertainty travel with the number.

## Method sources

| Method | Chosen rule | Source and scope | Replace when |
| --- | --- | --- | --- |
| Risk assessment | Estimate likelihood and consequence from exposure, evidence and uncertainty. | [NIST SP 800-30 Rev. 1](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-30r1.pdf), especially likelihood and risk determination; the 5×5 product and appetite here are our adaptation. | Another calibrated method better predicts material outcomes for the workload. |
| Assessment horizon | One year by default; name a different relevant horizon. | NIST SP 800-30 discusses explicit assessment timeframes; this exact default is chosen here. | Exposure timing or the decision changes. |
| Impact and reversibility | Use realistic loss, recovery probability and permanent harm; monthly cost is the reference scale. | Chosen financial sizing convention, not an externally prescribed materiality threshold. | Runway, financial structure or the operational consequence makes the scale misleading. |
| Expected annual loss | Expected event count times mean event loss under stated dependence assumptions. | [FIPS PUB 65 (1979)](https://nvlpubs.nist.gov/nistpubs/Legacy/FIPS/fipspub65.pdf), historical annual-loss analysis used as a method reference. | A better frequency/severity or dependency model changes the estimate. |
| Loss frequency and magnitude | Keep event frequency and severity distinct; state the aggregation model for percentiles. | [Open FAIR](https://www.opengroup.org/open-fair); the quantification trigger is chosen here. | Another model predicts losses more accurately at lower decision cost. |
| Survival | Compare expected value within the ability to survive the loss and preserve unique user data. | Chosen risk-capacity constraint; [Taleb et al., The Precautionary Principle (2014)](https://arxiv.org/abs/1410.5787) discusses ruin in a distinct systemic-risk setting. | The organization's capacity or exposure changes. |
