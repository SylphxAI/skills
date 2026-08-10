# System Model: Why Support Backlogs Outgrow Additional Agent Capacity

## 1. Question and Focal Behavior

**Decision being supported:** Whether to add more support agents to reduce the
backlog, and under what conditions that intervention will (or will not) work.

**Focal behavior over time:** The support backlog (open tickets waiting for a
resolution) grows monotonically even as the team adds more agents. Adding
agents produces a transient dip or flattening in backlog, then the backlog
resumes growth. This is the classic "add capacity, watch it absorb, then watch
it refill" pattern.

**Time horizon:** Months to quarters. Relevant because agent onboarding, customer
behavior adaptation, and ticket generation rates all operate at different delays.

**System boundary:** The support organization that receives, triages, and
resolves customer tickets; the product teams that ship the software generating
support demand; customers who file support requests. Excluded outside the
boundary (but noted as exogenous drivers): market growth, product quality
changes, competitive dynamics, seasonal fluctuations.

---

## 2. Behavior Over Time

```
Ticket count
    ▲
    │                                          ____
    │                                    _____/    \
    │                              _____/          \________
    │                        _____/    [agent additions     ]
    │                  _____/           cause transient   |
    │            _____/                 improvement,      |
    │      _____/                       then backlog      |
    │__  _/                             resumes climbing  |
    │   /                                                 |
    └──┴──────────────────────────────────────────────────▶ Time
```

Observed pattern: **Sawtooth with upward drift.** Each agent addition produces
a short-lived improvement in backlog-out (work-off rate exceeds inflow), then
the backlog resumes growth from a higher floor than before. This suggests the
mechanism is not simply "too few hands" but a structural condition in which
additional capacity feeds additional inflow.

---

## 3. Structure

### 3.1 Stocks and Flows

| Stock | Description | Inflow | Outflow |
|---|---|---|---|
| **Backlog** | Open support tickets not yet resolved | New ticket arrivals | Ticket resolution |
| **Agent capacity (total)** | Total agent-hours per period available to the org | Hiring / offboarding | Attrition / burnout |
| **Agent productivity** | Effective resolutions per agent-hour | Training, tooling, process | Onboarding drag, turnover, context switching |
| **Ticket complexity** | Aggregate difficulty per ticket | Product complexity growth, incomplete self-service | Product fixes, documentation |
| **Knowledge base coverage** | Fraction of common issues resolvable without a human | Documentation investment | Drift as product changes |
| **Customer ticket propensity** | Tickets filed per active customer per period | Perceived friction, unmet needs | Improved UX, self-service, trust |

### 3.2 Core Feedbacks

#### Loop A — "Just Add More Hands" (Reinforcing with delay)

```
+----------------------+
| Backlog              |----+
+----------------------+    |
        │  ▲                 │ backlog too large (perceived, delayed)
        │  │                 ▼
        │  │        Management decides to hire more agents
        │  │                 │
        │  │                 ▼
        │  │        Agent headcount (stock) rises
        │  │                 │
        │  │                 ▼
        │  │        Total resolution capacity rises
        │  │                 │
        +--│-----------------+ 
           │ (delayed: hiring ~4-10 weeks, onboarding ~4-16 weeks)
           ▼
     Resolution rate rises
           │
           ▼
     Backlog falls (weakly, temporarily)
```

This is a **balancing loop**: larger backlog should call for more capacity,
which should reduce backlog. But it is **long-delayed** (hiring + onboarding),
giving the system ample time to overcorrect or to mask the true inflow driver.

#### Loop B — "Your Success Raises Expectations" (Reinforcing)

```
+---------------------+     Increasing support throughput
| Response/turnaround |<----+ means faster service
+---------------------+     |
        │                    |
        │ faster responses  |
        ▼                    |
More customers try the product,  |
more features get used, customers |
develop new questions            |
        │                        |
        ▼                        |
New ticket inflow rises —   (reinforcing)
```

Faster service changes **support expectations**. Quick response times make
customers more willing to file marginal issues rather than deferring them.
Support throughput creates demand for more support. Adding agents lowers
response time, which *increases* the arrival rate.

**Evidence that fits:** When support SLAs improve sharply, ticket inflow in
the next quarter typically rises — not because the product got worse, but
because customers who previously hesitated, Googled, or worked around now
file, ask, and escalate.

#### Loop C — "Backlog as a Queue Discipline Signal" (Reinforcing)

```
+-------------------+
| Backlog size      |----+
+-------------------+    |
        │                ▼
        │        Perceived backlog is acceptable
        │                │
        │                │ (agents observe: "we're behind but not drowning")
        │                ▼
        │        Agents prioritize newest/hottest/easiest tickets
        │                │   (cherry-picking, triage shortcuts)
        │                ▼
        │        Oldest / hardest tickets remain untouched
        │                │
        │                ▼
        │        These tickets get re-opened, escalated, re-filed
        │                │
        │                ▼
        │        Inflow rises again (duplicate refiles)
        +----------------+
```

As backlog shrinks, agents increasingly cherry-pick the easiest or most
visible tickets, leaving the hard ones. Those hard tickets reappear as
re-filings and escalations, regenerating inflow. **Effective resolution rate
falls as backlog falls** because the marginal ticket is harder.

#### Loop D — "Resolution Quality → Re-Filing" (Reinforcing)

```
+----------------+
| Throughput     |----+   under load, agents close tickets
+----------------+    |   faster with less root-cause work
        │            ▼
        │    Resolution quality drops
        │            │
        │            ▼
        │    Customers see incomplete fixes, re-file
        │            │
        │            ▼
        │    New-ticket inflow rises
        +------------+
```

Holding constant agent quality, pushing more tickets per agent-hour reduces the
fraction that stay closed. This is a **balancing-to-reinforcing crossover**:
initially closing more tickets reduces the backlog, but below a quality
threshold, more closures generate more refilings. Classic burden-shifting.

#### Loop E — "Product Complexity Feedback" (Reinforcing)

```
+-------------------+
| Backlog           |----+   product teams see support load
+-------------------+    |
        │                ▼
        │    "Support is absorbing it" — product fixes deprioritized
        │                │
        │                ▼
        │    Product defects accumulate in the field
        │                │
        │                ▼
        │    New tickets per user rise
        │                │
        │                ▼
        │    Backlog rises (continues reinforcing)
        +----------------+
```

When support capacity grows, product teams can perceive that customer pain is
being handled downstream. The incentive to fix root causes in product/infra
weakens. Defect-generating behavior at the source rises. Inflow per customer
rises faster than agent capacity, no matter how many agents are added.

#### Loop F — "Onboarding Capacity Constraint" (Balancing with delay)

```
+------------------+
| Agent headcount  |----+
+------------------+    │
        │               ▼
        │       Ramp-up load on senior agents
        │               │
        │               ▼
        │       Senior agent throughput drops (mentoring time)
        │               │
        │               ▼
        │       Effective capacity grows slower than headcount
        │               │
        │               ▼
        │       Backlog not reduced (perceived) → hire more
        +---------------+
```

Every new hire consumes senior expertise. Until juniors are productive,
effective capacity *drops* below baseline. Management reads the unchanged
backlog as "still need more people," creating a **ratcheting hire loop.**
This is why hiring waves often produce a *worse* short-term backlog before
any improvement.

#### Loop G — "Customer Trust / Pestering Threshold" (Balancing with delay)

```
+----------------+
| Agent capacity |----+   faster turnaround
+----------------+    |
        │             ▼
        │     Customer trust in "file a ticket" rises
        │             │
        │             ▼
        │     More reports, more detail, more edge cases
        │             │
        │             ▼
        │     Ticket size/complexity per arrival rises
        │             │
        │             ▼
        │     Effective capacity consumed per ticket rises
        +-------------+
```

As customers learn that reporting issues actually produces help, they file
more complete, more edge-case-heavy reports. **Per-ticket work rises with
agent reputation.** An agent-hour handles fewer tickets over time even at
constant arrival count.

### 3.3 Delays

| Delay | Duration (typical) | Effect |
|---|---|---|
| Hiring lag | 4–12 weeks | Capacity response arrives long after the need it addresses |
| Onboarding | 4–16 weeks for full productivity | Negative short-term throughput; managers read failure too early |
| Ticket re-open cycle | 1–8 weeks after closure | Quality problems surface well after capacity changes |
| Product change cycle | 4–26 weeks | Root-cause fixes respond slowly to support insight |
| Customer adaptation | 4–52 weeks | Customers discover support exists, trust it, change filing behavior |
| Management decision cycle | 2–16 weeks | Backlog reads as a signal after significant delays, producing overshoot |

### 3.4 Nonlinearities

1. **Response-time-to-inflow curve:** Below a response threshold (e.g., < 1 day),
   inflow accelerates as marginal customers discover/trust support.
2. **Ticket-hardness frontier:** As backlog shrinks, remaining tickets are
   harder (old, complex, multi-party). Throughput per agent-hour falls.
3. **Quality-throughput tradeoff:** Close rate beyond a threshold increases
   re-filing rate almost linearly.
4. **Onboarding debt:** Effective team capacity per head falls nonlinearly
   when the ratio of new-to-senior agents exceeds ~1:3.
5. **Product-defect ceiling:** A given product surface produces a natural
   support demand level; no amount of support labor reduces that demand.

### 3.5 Adaptive Actors

- **Customers** adapt by filing more, filing harder cases, and abandoning when
  the perceived delay exceeds a threshold.
- **Agents** adapt by cherry-picking easy tickets, short-format responses,
  reuse of canned answers, and (in the worst case) premature closure.
- **Management** adapts by using backlog as its sole read on the system, hiring
  as a near-automatic response, and rarely examining product-cause reduction.
- **Product teams** adapt by reallocating effort away from defect reduction
  once support begins "absorbing" the load.

---

## 4. Why Adding Agents Fails

Adding agents attacks only one stock (backlog) through one flow (resolution
capacity). It does **not** touch:

- the **inflow rate** (customer training, product quality), which Rises
  with faster service;
- the **per-ticket work content** (complexity, edge cases, context switching),
  which rises with agent density;
- the **refiling rate** from premature closure, which rises under close-rate
  pressure;
- the **product complexity driver** that generates demand in the first place.

The net result of pure capacity additions is a **compensating response**
across four channels: customers file more, agents close faster with lower
per-ticket quality, harder tickets dominate the marginal case, and product
defects compound because support absorbs them. These four responses act like
a **floating inlet**: no matter how much you drain the tub, the tap opens
wider.

---

## 5. Model Status

| Dimension | Status |
|---|---|
| Observed behavior | Strong (sawtooth + drift is widely reported, not merely theoretical) |
| Hypothesized loops | Reasonable; A, B, C, E, F have direct observational support from multiple sectors |
| Parameters | Qualitative only; no calibrated equations are claimed |
| Calibration | None — the model is a qualitative dynamic hypothesis |
| Competing structures | Alternative: growth is simply exogenous product/company growth; agent additions often lag behind. These are not mutually exclusive |
| Confidence | High that capacity alone does not fix the system; moderate on which intervention is most Pareto-efficient |
| Falsifiability | If backlog remains flat after N hires *and* inflow is flat *and* per-ticket hours are flat, the hypothesis fails |

---

## 6. Intervention Analysis

### 6.1 Leverage Points (highest leverage → lowest)

1. **Reduce ticket generation at source.** Fix defects, improve self-service,
   clarify docs, harden onboarding. This attacks the *inflow stock driver*
   and reduces per-ticket complexity. Best ROEE (return on engineering
   effort) when combined with support-insight feedback to product.
2. **Change the management read.** Stop using backlog as the sole growth
   signal. Track *inflow rate per active customer* separately from backlog.
   This prevents the ratcheting hire loop and enables condition-based hiring.
3. **Raise per-ticket resolution quality.** Require root-cause or known-
   temporary categorization at close. Reduce refiling rate. This both shrinks
   inflow and improves customer trust without triggering the expectation loop.
4. **Adjust onboarding structure.** Cap new-to-senior ratio, pair on hard
   tickets, invest up-front in training before scaling headcount.
5. **Cap the response-time feedback.** Set a deliberate SLA floor above
   "immediately" to prevent the accelerated-discovery loop, or pair faster
   responses with a hard consumption gate (self-service first-pass for
   known cases).

### 6.2 Expected Trajectories by Intervention

| Intervention | Short-term (0–90d) | Medium (90–365d) | Risk |
|---|---|---|---|
| Hire more agents | Backlog dips 5–15% | Backlog resumes growth; cost per resolution rises | Onboarding drag; permanent cost ratchet |
| Fix top-20 causes | Inflow starts to decline (2–3 weeks later) | Backlog trends down structurally; per-ticket cost falls | Product team bandwidth; support data quality |
| Quality-gate at close | Throughput falls short-term | Refiling drops; effective throughput rises | Agent morale; metric gaming |
| Self-service + knowledge base | Triage drops sharply | Inflow falls for known cases only | Uncomfortable but correct — unknown cases rise |
| Management metric redesign | None visible | Hiring becomes condition-gated; cost stabilizes | Leadership buy-in required |

### 6.3 Counter-effects and Failure Modes

- **Hiring more agents** → seniors burn out mentoring → attrition rises →
  effective capacity actually falls.
- **Quality gating** → agents undercount, game the category, or close too
  fast to "meet quota" → refiling migrates from support to churn (harder to
  see).
- **Self-service push** → known-case inflow drops but unknown-case backlog
  rises; if the knowledge base drifts as product changes, the win decays.
- **Product-fix investment** → support measurement of "root cause" is
  contested; product teams may dispute causality and refuse to prioritize.
- **SLA floor** → customers who need immediate aid bounce or escalate to
  management; if the cap is too high, trust erosion outweighs demand reduction.

### 6.4 Recommended Intervention Portfolio

Prefer a **small package that changes the owning structure**:

1. **Separate inflow from backlog in management metrics.** Track:
   new tickets / week, tickets re-opened within 14 days, tickets per active
   customer, median resolution hours (not just count).
2. **Fix top 20 root causes** with a dedicated cross-functional (support +
   product + engineering) team, gated on measurable inflow reduction.
3. **Quality-gate closure** with a "permanently resolved vs deferred" flag
   and a 14-day reopen audit.
4. **Invest in self-service** for the top 5 recurring known-case categories,
   with monthly doc-drift review.

### 6.5 What Would Falsify the Model

- Inflow per customer remains flat over 6 months *while* response time falls
  materially below the historical threshold.
- Per-ticket hours remain flat as backlog shrinks (the hardness frontier
  does not materialize).
- Reopen/refiling rate does not rise as close rate increases 30%+.
- Product teams fix root causes without measurable inflow reduction in
  90 days (time-lag would need to be long).

---

## 7. Validation Plan

1. **Collect monthly data** for at least 12 months: backlog count, arrivals,
   closed count, reopen count, median time-to-first-response, median time-to-
   resolution, tickets per active customer, root-cause category distribution.
2. **Segment the data** by ticket source (known-case vs unknown-case, complex
   vs simple, new customers vs existing).
3. **Replay historically** across at least one full hire cycle to test whether
   the model predicts the observed sawtooth.
4. **Run a sensitivity test:** compare the backlog trajectory in a 6-month
   window without hiring against the model's prediction.
5. **Trigger condition:** if the model predicts intervention X should reduce
   inflow by Y%, and it does not within Z weeks, the relevant loop is weaker
   than hypothesized — revise or abandon it.

---

## 8. Key Takeaway

> Adding agents to a support backlog that is structurally fed by product
> complexity, customer adaptation to faster support, refiling due to
> premature closure, and weak root-cause feedback is a **symptomatic fix**
> that produces a compensating response. The backlog will keep growing
> because the inflow rate rises with the service itself. Interventions that
> reduce inflow per customer, raise per-ticket quality, and rewire management
> metrics to separate demand generation from backlog drainage are the ones
> that change the trajectory durably.

---

## Appendix A: Causal Loop Diagram Summary

```
                ┌─────────────────────────────────────────────┐
                │                                             │
                ▼                                             │
        ┌──────────────────┐        +──────────────+          │
        │ Backlog (stock)  │───────▶│ Management    │          │
        └──────────────────┘        │ perceives too │          │
                │                   │ large         │          │
                │                   └───────┬──────┘          │
                │                           │                 │
                │            hires/adds     ▼                 │
                │                   ┌───────────────┐         │
                │                   │ Agent         │         │
                │                   │ headcount     │─────────┘
                │                   └───────┬───────┘
                │                           │
                │     resolution capacity  │
                │          rises           ▼
                │                ┌───────────────┐
                │                │ Resolution    │
                │                │ rate          │
                │                └───────┬───────┘
                │                        │
                │        ┌───────────────┴───────────────┐
                │        │                               │
                │        ▼                               ▼
                │  Customer filing            Premature closure
                │  propensity rises           → refiling rate
                │  (Loop B)                     rises (Loop D)
                │        │                               │
                │        ▼                               │
                │  Ticket inflow rises ──────────────────┤
                │                                        │
                └────────────────────────────────────────┘
                             (Loop A output feeds
                              arrival above)

        Product complexity (Loop E): product teams deprioritize
        fixes as support absorbs the pain → inflow per customer rises.
        Onboarding (Loop F): new hires drain senior time → effective
        capacity can fall before it rises.
```
