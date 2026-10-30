# Priority standard: value, cost and time

Trigger: deciding what to do first, whether work interrupts another outcome,
or how to prioritize customer support and remedies.

Rank work by the value lost while it waits and the time needed to deliver it.
Use measured inputs where available and explicit estimates with uncertainty
where they are not.

## The measure: value per unit of cost

Cost of delay divided by duration (CD3) is the ranking method:

```text
score = expected cost of delay per day / expected duration in days
```

Estimate the daily cost from revenue gained or protected, costs avoided,
fixed-date consequences and work enabled. Count each benefit once. A dependency
inherits the delay cost it actually controls. Record the time horizon and
uncertainty; update inputs when observations change.

Use a measured duration distribution for comparable work when available. For
new work, estimate a range and revise it after learning. Missing precision is a
reason to estimate explicitly; suspected major harm deserves an immediate
bounded read so uncertainty does not silently send it to the back of the queue.

## The price of time

Value saved time by what the released capacity can do. On a critical path,
include the revenue or cost that delay changes. Company running cost is useful
context, but assigning the whole daily burn to every delayed item double-counts
it. Compare incremental alternatives over the same horizon.

Perform quick, ready actions promptly. Choose an observation window long enough
to detect the signal that matters: a daily billing cycle can need a day;
a deterministic configuration correction can verify immediately. Extend a wait
when evidence or an external dependency justifies it.

## The size of an impact

Measure affected users, failed journeys, revenue, data continuity and duration.
A workaround can reduce the loss; include its friction and remaining harm.
Use the product's active population and traffic, rather than a company-wide
percentage that can hide a complete outage in a small product.

For a service-level objective (SLO), measure how fast the error budget is being
consumed. The Google SRE Workbook recommends starting with paging at 2% of a
30-day budget in one hour or 5% in six hours, and ticketing at 10% in three days.
It explicitly says to tune these values for the service. Sparse traffic needs
additional checks suited to its volume.

A support complaint supplies evidence. Combine it with the affected population
and the product's own records when estimating loss.

## Hard lines

Preserve user data and stay within authorized spend. Applicable legal and
contractual obligations constrain the available actions; record their authority
and deadlines when they affect the choice.

### Interrupts

A critical incident preempts ordinary work when delay would cause greater harm
than the interruption: an active serious outage, material money loss or wrong
charges, ongoing data loss, confirmed security harm, or an imminent binding
external deadline. State the affected population, observed harm, delay cost and
why ordinary ordering is insufficient. Alert the responsible decision-maker
through the configured incident path.

A small isolated case normally follows the scored queue. Its writer still
completes it. Incident urgency changes scheduling; access and
[recovery requirements](../../deliver-and-verify/references/security.md#recovery-procedure)
continue to govern the action.

## Support and compensation

Order support by impact, delay cost, customer value and the actual service
commitments. Answer a case that can be resolved immediately when doing so is
cheaper than deferring it. A wider investigation follows the same economic
ranking as other work.

Delivery and remedies follow the product's authorization and
[conduct standard](../../self-challenge/references/conduct.md#customers-and-players).
Use published response commitments and real accepted handoffs when describing
the next step to the customer.

## Deadlines and penalties are valued too

For a fixed date, model the loss at that date and the latest feasible start.
Include lawful extensions and their actual conditions, the expected penalty,
and downstream consequences. A grace period changes enforcement timing only
when the authoritative terms say so.

For a potentially irreversible or company-ending event, include the full
credible loss and urgency. Record legal uncertainty as uncertainty and obtain
the needed qualified advice through the actual decision-maker.

## How it is judged

The order follows recorded benefits, delay costs and duration estimates.
Interrupts state the harm they prevent. Forecasts and customer commitments
change when their measured inputs or binding constraints change.

## Worked example and method sources

### Worked example

Illustrative inputs: outcome A prevents US$300/day of loss and takes one day;
outcome B prevents US$200/day and takes half a day. Their scores are 300 and
400, so B runs first when both are ready and independent. If A is an ongoing
data-loss incident, apply the interrupt criteria and its binding data constraint.

## Method sources

| Method | Application | Source and replacement trigger |
| --- | --- | --- |
| Economic sequencing | Compare expected delay cost with duration; disclose uncertainty and avoid double-counting | The formula above defines the chosen ranking method; change it when measured outcomes show a better ordering objective |
| SLO burn alerts | Tune alert windows to budget consumption and service volume | [Google SRE Workbook, Alerting on SLOs](https://sre.google/workbook/alerting-on-slos/), read 2026-10-30; retune when traffic, SLO or response cost changes |
| Severity definitions | State impact and response criteria for the service | [PagerDuty severity levels](https://response.pagerduty.com/before/severity_levels/), read 2026-10-30; revise when observed harm is misclassified |
| Canary evaluation | Observe the affected signal over a representative window | [Google SRE Workbook, Canarying Releases](https://sre.google/workbook/canarying-releases/), read 2026-10-30; change the window when its detection power or cost changes |
