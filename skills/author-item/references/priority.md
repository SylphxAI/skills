# Priority standard: value, cost and time

Trigger: deciding what to do first, whether something interrupts other work,
how fast a user or customer is answered, and whether and when to compensate.

Every action is an economic prioritization decision. Time, human attention,
and agent compute are finite: do first the work that returns the most value
for the least cost and duration, and order lower-return work later rather
than dropping it silently.

## The measure: value per unit of cost

One number orders all work: cost of delay per day divided by duration
(CD3; Reinertsen, *The Principles of Product Development Flow*, principle F17;
Arnold and Yüce, *Black Swan Farming Using Cost of Delay*, Agile 2013). It is
computed by the work system ([work.md](work.md)), never set by hand.

- **Cost of delay per day** (US$) = value + time criticality + enablement,
  SAFe's three WSJF components, each in money:
  - **Value:** revenue gained or loss stopped per day, in Arnold's benefit
    types (increase revenue, protect revenue, reduce cost, avoid cost). People
    affected × value per person per day, revenue at risk per day, and a risk's
    expected loss per day ([risk.md](../../self-challenge/references/risk.md)) are all value.
  - **Time criticality:** the cost per day of missing a real fixed date,
    nothing before the latest start (the fixed-date urgency profile).
  - **Enablement:** the cost of delay of the items it blocks, plus the time it
    saves at the price of time below.
- **Duration** = the estimate of the work, in days; the measured median for
  its kind when there is none.
- An item with no input is unscored and ordered after every scored item; no
  input is ever assumed.
- Cheap work that earns a lot goes first; costly work that earns little goes
  last. A label, a feeling or how loudly someone asks does not change the order;
  only the inputs do.

## The price of time

Time costs money, like money itself: cost of delay is the life-cycle profit a
day of delay loses (Smith and Reinertsen, *Developing Products in Half the
Time*).

- **While we run at a loss** (default dead, in Paul Graham's terms), one day of
  delay on the critical path to revenue costs one day of the company's running
  cost (monthly running cost / 30, set in the work system's config from the
  invoices). A month-long migration that holds up product work costs a month
  of running the company. Work that saves hours saves their price (Arnold's
  reduce-cost benefit).
- **Once profitable,** the price of a day becomes the profit that day gives up.
- **Benchmark for elapsed time:** DORA's 2021 elite performers take a change
  from commit to production, and restore a failed service, in under an hour;
  high performers restore within a day.
- **Quick actions run now:** a deploy, release, restart, config change,
  switch-over or small data move that takes minutes is done when it is ready,
  never booked for later. A wait longer than the action itself needs a named
  reason: a real external event or a measured risk.
- **Short soaks:** a soak, shadow or dual run (a canary, Google SRE Workbook
  ch. 16) is the shortest one that shows the signal it watches: minutes to an
  hour by default; 24 hours only to watch a daily cycle; a week only with the
  owner's word.
- **Long work is fine; long waits are not.** A product can take months to
  build, but no step inside it waits days on a quick action.

## The size of an impact

Severity is measured by the share of active users affected, as PagerDuty's
incident response guide asks teams to define it, read from live figures. A
major incident (PagerDuty SEV-1 or SEV-2) is money lost or charged wrong, an
outage or data loss reaching 10% or more of active users (the owner's
threshold), a
live security exploit or any exposure of personal data; anything smaller is
ordered by its score. A person with a working workaround can still use the
function, so is not counted as affected.

A service with a published SLO alerts on error-budget burn instead (Google SRE
Workbook ch. 5): page when 2% of a 30-day budget burns in an hour or 5% in six
hours, open a ticket when 10% burns in three days.

- **Value per person** is predicted customer lifetime value (CLV; Gupta and
  Lehmann, *Customers as Assets*, 2003). A person with no purchase history
  counts at the product's average revenue per user (ARPU), the cohort
  average.
- A complaint raises the count of a case; no complaint keeps a small case
  small.

## Hard lines

### Interrupts

A critical incident (an interrupt) is Kanban's expedite class (Anderson,
*Kanban*, 2010): it stops other work, jumps the merge queue and passes
scheduling holds, never customer-path authority or the
[recovery ladder](../../deliver-and-verify/references/security.md#recovery-ladder). It is used only when the cost
of waiting outweighs the price of interrupting (Reinertsen F20: preempt only
when switching costs are low). It is reserved for large harm:

- a major incident (above);
- a cost of delay of half the company's daily running cost or more (the
  owner's threshold);
- a live security exploit or any exposure of personal data;
- a fixed-date deadline (law, tax, store or payment provider) whose last real
  deadline is near and whose cost of missing passes the threshold.

It is **never** used for a handful of players, even core players or people we
know; for one unpaid or very small purchase; or for a feature few people use.
Spending more to serve a case than the case is worth is a loss, and stopping
the whole company for a few players is the most expensive way to serve them.

## Support and compensation

Support is tiered by value, as large platforms do: Google and Meta answer
routine consumer cases in weeks or months and enterprise customers within
hours. We do the same.

- **Answer order follows the score:** high-value customers and widespread
  problems first; a single low-value case can wait days or weeks.
- **A complaint is a signal, not an emergency:** it raises the score; it does
  not interrupt.
- **Delivery and compensation** follow [conduct](../../self-challenge/references/conduct.md#customers-and-players);
  never stop other work to do it early for a small case.
- Waiting is a valid business tool (it buys time) as long as its cost stays
  below what the time is used for.

## Deadlines and penalties are valued too

Nothing is exempt from this measure. Law, tax, store and
payment-provider rules, data exposure and company-ending risk all have a cost
of delay; some are simply very large.

- **Cost-of-delay profiles** (Anderson's classes of service; Arnold's urgency
  profiles): *standard* work loses value steadily; *expedite* work loses it
  fast; *fixed-date* work costs almost nothing until its real deadline and then
  jumps; *intangible* work costs little now and more later.
- **A legal or tax deadline is fixed-date work.** Its real deadline is the last
  one, after every legitimate extension, appeal, grace period or penalty
  allowance: an appeal that pauses a fine and resets a discount period, or a
  penalty point that can be spent once. Using those is a valid way to buy
  time. The cost of missing it is the expected penalty plus what follows
  (lost allowances, escalation, a store or provider action), weighed against
  what else the time could do.
- **Company-ending risk** (a forced strike-off, losing a store or payment
  account the business depends on) costs the whole company, so it ranks first
  without a special rule, even against urgent personal or family matters.
- **Large by nature:** a live security exploit, personal-data exposure or
  personal criminal liability carries a cost of delay large enough to pass the
  interrupt threshold, so it is handled now.

Separate from triage: our own releases must not break players' accounts or
paid delivery ([games.md](../../self-challenge/references/games.md)). That is a cheap release check that
prevents harm, not a reason to rush a fix for a few players.

## How it is judged

Met when the work system's order matches these inputs, interrupts are rare and
each meets a trigger above, quick actions finish in minutes, and no small case
has stopped other work.

The worked example and the method-source table are in [research/priority-method-2026-10.md](#worked-example-and-method-sources).

## Worked example and method sources

History of the priority standard: a worked example and the source table for each term. The standard itself is [priority.md](priority.md).

## Worked example

A legacy title with a few dozen players, none of them paying, had broken
database queries on features about one or two players an hour reached, with no
confirmed loss (2026-10-05). It was wrongly run as an interrupt: a senior
engineer, a merge-queue jump and urgent production reads. Under this standard
it is under 10% of active users and worth little per player: it is fixed
through the normal queue, in its computed order, and nothing else stops.

## Method sources

| Term | Formula | Source | Status |
| --- | --- | --- | --- |
| CD3 | cost of delay per day / duration | Reinertsen 2009, F17 (WSJF); Arnold and Yüce 2013 (CD3) | kept |
| Cost of delay | value + time criticality + enablement, in US$/day | SAFe WSJF components; Arnold's benefit types and urgency profiles | replaced: was people × value + revenue at risk + time held up |
| Missing duration | the measured median for the item's kind | our measurement | kept |
| Price of time | running cost / 30 per day on the critical path to revenue | Smith and Reinertsen (cost of delay = life-cycle profit lost); Graham, *Default Alive or Default Dead?* (2015); the burn is our figure | kept |
| Share of the path | a share of the burn per item | none | replaced: hours saved × price of time (reduce cost) |
| Elapsed-time scale | minutes fast to a week the limit | none | replaced: DORA 2021 performance levels |
| Soak length | shortest window that shows the signal | Google SRE Workbook ch. 16 (canarying); durations are our parameters | kept |
| Severity | share of active users affected | PagerDuty incident response severity levels | kept; 10% is the owner's threshold (2026-10-05) |
| SEV1–SEV4 cut-points | 50%, 10%, 1% | none | deleted: only the 10% interrupt line decides anything |
| Workaround | lowers a level by one | none | replaced: a person with a workaround is not affected |
| Error-budget burn | page at 2%/1 h or 5%/6 h, ticket at 10%/3 d | Google SRE Workbook ch. 5 | kept |
| Value per person | lifetime value; no history at ARPU | Gupta and Lehmann 2003 (CLV) | kept |
| VIP | top 1% of 90-day spenders | none | deleted: CLV already weighs them |
| Interrupt | expedite only when waiting costs more than interrupting | Anderson 2010 (expedite class); Reinertsen 2009, F20 | kept; half the daily running cost is the owner's threshold (2026-10-05) |
| Deadlines | fixed-date profile at the last real deadline | Anderson 2010; Arnold urgency profiles | kept |
