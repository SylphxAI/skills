# Risk

How we judge a risk before a decision: legal, commercial, technical or
operational. It adapts the ISO 31000 process (identify, analyse, evaluate,
treat, review) to a small, self-funded company. The register of risks we have
accepted is the accepted risks record.

Scoring, acceptance and the internal-use de minimis rule below never waive
[ONE PATH](architecture.md#hard-lines) or the
[recovery ladder](../../deliver-and-verify/references/security.md#recovery-ladder), including its audit and alerts.

## Hard lines

- Never block or slow a launch on a theoretical risk.
- Never spend to avoid a risk that costs less than its fix.
- Never repeat a risk in every document; state it once and link here.

## 1. Everything is scored

Every risk is scored below, with no exceptions: other
companies' terms, licences and platform policies, reputation, technical debt,
vendor dependence, charging users wrongly and losing customer or player data
alike. The size of the impact decides; charging users wrongly or losing their
data usually scores high (store or provider action, refunds and chargebacks,
lost trust) and is fixed at once when it does. Time matters: judge when a risk
could arrive (proximity) and how fast it hurts once it does (velocity), as
COSO's enterprise risk framework does; nothing is an instant kill.

The legal floor and company-side outside view live in
[conduct](conduct.md#methods-table); scoring never overrides them.

## 2. Score it

Score on a five-by-five consequence and likelihood matrix (IEC 31010:2019
B.10.3; the NHS risk matrix, NPSA 2008). **Likelihood** that the bad outcome
happens within a year:

| 1 Rare | 2 Unlikely | 3 Possible | 4 Likely | 5 Almost certain |
| --- | --- | --- | --- | --- |
| never seen at our size | seen, not to us | seen to us once | happens regularly | happening now |

**Impact** if it happens, measured against our monthly running cost (the
servers, services and seats we pay for each month), not a fixed sum. The same
money means little to a large company and a lot to a small one
(**materiality**):

| 1 Trivial | 2 Minor | 3 Moderate | 4 Major | 5 Severe |
| --- | --- | --- | --- | --- |
| under a day's running cost | under a month's | one to three months' | a main product lost, or about half a year's | the company cannot continue |

Impact is judged against today's running cost. Claimants pursue companies
that can pay (the **deep pocket**), so a claim that would only come after we
have grown is unlikely within the year and scores low on likelihood; a loss
further out is worth its present value (**discounting**). Our capacity to
absorb a loss (**risk capacity**, COSO ERM 2017) grows with the company, and
the trigger in section 5 re-scores the risk when it does.

**Score = likelihood × impact**, from 1 to 25. A **reversible** outcome (an
account reopened, an app relisted, a fee paid) has as its impact what reversing
it costs: the fee, the work, and the loss while it is down (recovery, in COSO
ERM 2017), not the value of what was at stake. Reversibility is part of the
impact rating; there is no separate band shift.

The matrix is the consequence/likelihood matrix technique of IEC 31010 (ISO
31000 sets the process, not the matrix). Its scales and the bands in section 3
are our own risk appetite. The scores are ordinal: they rank risks, so never
add, average or compare them across matrices.

Assess likelihood from the actual exposure surface (public redistribution vs.
strictly internal tooling) and observed enforcement history in the target
market rather than treating theoretical worst-case scenarios as certainties.

## 3. Decide

Compare the **expected cost** (probability × realistic impact) with the
**cost of avoiding it now** (money, time, speed lost). The score bands are the
NPSA grading (1–3 low and 4–6 moderate, merged here; 8–12 high; 15–25
extreme), and the action for each band is our risk appetite (ISO 31000:2018
6.3.4):

| Score | Default |
| --- | --- |
| 1–6 | **Accept.** Note it in one line; do not slow work. |
| 8–12 | **Accept with a trigger,** or a cheap mitigation if one costs less than the expected loss. Record it in the register. |
| 15–25 | **Reduce or avoid** now, unless avoiding it costs more than it saves; then take the cheaper side and note it. Spend, an irreversible delete or a change to core governance rulings escalates to the accountable human owner. |

The four treatments are **accept**, **reduce** (cheaper, smaller exposure),
**transfer** (a vendor, a plan, an insurer carries it) and **avoid** (don't do
it), the responses of COSO ERM 2017 and ISO 31000:2018 6.5.2. Avoiding is the
most expensive choice; use it for a knowing crime and severe scores.

Two money checks back the table:

- **Expected value:** the annual loss expectancy, probability within the year
  × realistic loss (FIPS PUB 65), compared with the cost of avoiding the risk
  now. Pay the cheaper one. Divided by 365 it is the loss per day that removing
  the risk stops, which is how a risk enters an item's cost of delay
  ([priority.md](../../author-item/references/priority.md)).
- **Risk of ruin:** the one loss we never take is a single event that ends the
  company, because expected value does not apply to ruin (Taleb et al., *The
  Precautionary Principle*, 2014). A loss we can absorb and recover from is a
  cost of doing business; only a ruinous loss justifies giving up speed or
  revenue to avoid it.

**Put a money figure on high scores.** The 5×5 score ranks risks; it does not
price them. A risk scored 15 or more, or one that spends, states a rough
annual loss in US$ (a three-point range is enough) beside the treatment's
yearly cost, in the style of FAIR (Factor Analysis of Information Risk; Open
Group O-RT taxonomy and O-RA analysis). It informs the choice and never blocks
it:

- **Loss event frequency:** how many times a year it happens, as a range
  (low, most likely, high), from evidence ([section 6](#6-a-risk-is-something-that-has-happened)).
- **Loss magnitude:** what one event costs, as a range, priced at the realistic
  step ([section 4](#4-price-the-realistic-outcome-not-the-worst-imaginable-one)).
- **Annual loss exposure:** frequency × magnitude, as a most-likely figure and a
  bad-year (90th percentile) figure. A three-point (PERT) estimate is enough;
  run Monte Carlo only when the bad-year figure decides the choice.

Compare that figure with the yearly cost of the treatment. Below 15, the score
alone decides: a money estimate would cost more than the risk.

## 4. Price the realistic outcome, not the worst imaginable one

Most grey-area risks move up a ladder, and each step is a chance to stop:

1. nothing happens (the usual case);
2. a warning, a policy notice, or a delisting;
3. a cease-and-desist letter or an account closure;
4. a demand to pay a fee or licence;
5. a lawsuit: rare, slow, and usually settled.

The realistic cost is each step's probability × its cost, summed (decision
tree analysis, IEC 31010:2019 Annex B), so step 5 counts only at its small
probability. A claimant weighs its own costs
and what it can recover; a company with little money is rarely worth suing,
and when a claim is real we settle from what the product earned meanwhile.
A commercial or legal notice is a business event to evaluate and resolve on
its merits, not an automatic shutdown trigger.

## 5. Record and review

- Record each accepted grey-area risk scored 8 or more in
  the accepted risks record: the risk, score,
  reason and trigger.
- **Triggers** that reopen a risk: we start earning from the thing at risk; the
  other party contacts us; the score rises (a new rule, a bigger exposure).
- When a trigger fires, fix it (buy, sign, change) and remove the row.

## 6. A risk is something that has happened

Likelihood comes from evidence, not imagination (NIST SP 800-30 Rev. 1,
Appendix G). A product that has been live for months with no problem has
likelihood 1 or 2 on the scale above, whatever could happen in theory. What is
acted on is in the repository's agent instructions. Everything
else is accepted without work: no investigations, forensics, audits, hardening,
credential refills or rotations, compensation, or "this could be risky" notes in
reports. People using or paying for the product now are the users that justify
effort; accounts dormant for months are not.

## 7. A fix stops at its target

A root-cause fix is future-proof when this class of failure falls back inside
a target set before the incident, not when it can "never happen again". "Never again" has no end: one more backup copy or one
more isolated machine always looks safer, and that is how a single incident
takes over a design.

- **The target is stated first.** An SLO and error budget for availability,
  RPO and RTO for data (backups follow 3-2-1, not "as many as possible"),
  and the scores in this page for everything else. The fix names the target it
  restores, and stops there. Reliability above the target is waste
  (Google SRE, *Service Level Objectives*).
- **The fix is proportional.** Reduce the risk until a further step costs
  clearly more than it saves (ALARP). The fix also counts its cost to every
  other rule it touches: capacity, speed, money, simplicity. A fix that
  breaks another standard is not done.
- **An incident usually proves enforcement failed, not that the principle is
  wrong.** Fix the enforcement first. A principle changes when its
  evidence changes or when no witnessed failure backs it; the commit says why.
- **No oscillation.** If the replacement would bring back the problem that
  produced the current rule (isolate → machines idle → share again), the
  change is a swing between A and B, not a fix. Fix the enforcement inside the
  current rule.
- **Reversible decisions are made fast; irreversible ones carefully**
  (one-way and two-way doors). Data loss and anything customer-visible that
  cannot be undone are one-way doors.

## How it is judged

A decision states the score (likelihood times impact) and the band's action. A score of 15 or more, or a decision that spends, also states a rough annual loss beside the treatment's yearly cost; it informs the choice and never blocks it. An accepted risk scored 8 or more is a row in the accepted risks record with its trigger. Scores rank risks; they are not added or averaged.

## Method sources

## Method sources

| Term | Formula | Source | Status |
| --- | --- | --- | --- |
| Risk matrix | likelihood 1–5 × impact 1–5 = score 1–25 | IEC 31010:2019 B.10.3; NPSA, *A risk matrix for risk managers* (2008); NIST SP 800-30 Rev. 1 Table I-2 | kept |
| Likelihood horizon | probability within one year | IEC 31010:2019 B.10.3 (a likelihood scale states its time horizon) | kept |
| Impact scale | multiples of monthly running cost | ISO 31000:2018 6.3.4 (the organisation sets its consequence criteria); materiality benchmark on expenses (ISA 320); the cut-points are ours, from our running cost | kept |
| Impact when the claim arrives later | impact read at our future size | none | replaced: today's impact, likelihood within the year, present value beyond it |
| Reversible outcome | one band lower | none | replaced: impact = cost to reverse (COSO ERM 2017 recovery) |
| De minimis | fixed score 1 | none | replaced: likelihood 1 on the scale |
| Bands and actions | 1–6 accept, 8–12 accept with a trigger, 15–25 reduce or avoid | NPSA 2008 grading; actions are our risk appetite (ISO 31000:2018 6.3.4) | kept |
| Treatments | accept, reduce, transfer, avoid | COSO ERM 2017 responses; ISO 31000:2018 6.5.2 | kept |
| Expected value | probability × loss per year | annual loss expectancy, FIPS PUB 65 (1979) | kept |
| Risk of ruin | ruin is never traded for expected value | Taleb et al. 2014; COSO ERM 2017 risk capacity | kept |
| Escalation ladder | realistic step only | none | replaced: probability-weighted sum (decision tree, IEC 31010:2019) |
| Proximity, velocity | when it could arrive, how fast it hurts | PMBOK Guide 6th ed., qualitative risk analysis (proximity); COSO ERM 2017 (velocity) | kept |
