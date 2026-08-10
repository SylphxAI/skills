# Dynamic System Model: Support Backlog Grows Despite Adding More Agents

## Question and behavior

**Decision.** Should the team keep adding support agents to reduce the support backlog, given that observed growth has not yielded a durable reduction?

**Behavior.** The support backlog — count of unresolved customer requests — keeps growing even as the team adds more support agents.

**Boundary.** In-scope: incoming ticket volume, agents, average time-to-resolve, escalation, churn/attrition, on/off-ramp quality, ticket reopens, deflection (self-service), staffing fixed effort, and management response to backlog. Out-of-scope: unrelated R&D staffing, capital, or revenue-driving work, unless they materially change incoming volume.

**Horizon.** 2–12 quarters. Short-term (0–3 quarters): staffing additions and initial backlog burns. Long-term (3+ quarters): equilibrium or continued drift after hiring, retention lag, and market/seasonal demand.

**Observations.** Documented behavior over time:
- Backlog stock rises steadily across quarters.
- Adding agents lowers backlog temporarily (partial drawdown) then growth resumes.
- Frequent backlog-on-fire mode with hot-ticket storms and reopened tickets.
- Attrition of agents is significant: gross hires exceed net growth in capacity.
- Support process and product changes (onboarding, quality gates, self-service) have been tried individually with weak or temporary effect.

**Behavior-over-time sketch (pattern, not yet full mechanism):**

- Cumulative hires: upward step function (periodic). Net active agents: muted rise (hires less attrition, plus ramp delay).
- Backlog: sawtooth — falls briefly after each hiring batch, resumes compounding as arrival rate outpaces sustained resolution rate.
- Reopens: volatile, trending upward alongside backlog.
- Average age of oldest ticket: rising even during short backlog dips.

Observed pattern = **delayed-compensated growth**: arrival rate responds to service-quality issues and product complexity, and resolution capacity does not keep up because of ramp delay, reduction in per-agent throughput from coordination overhead, and ticket-creation induced by earlier backlogs (burnout, reopens).

---

## Structure

### Stocks

1. **Support backlog (B)** — unresolved tickets. Units: tickets. Fed by arrivals (A), reduced by resolution (R) and deflection (D).
2. **Active agents (N)** — people/staff effectively resolving tickets. Fed by hires (H), reduced by attrition (L). Subject to ramp delay: new hires only reach full throughput after an onboarding lag.
3. **Cumulative hires (T)** — all agents ever hired for support. Not directly a control, but drives H.
4. **Reopens pile (Q)** — tickets closed that later reopen (sub-stock of B or separate tracked stock). Increases with average resolution quality and volume; delays net resolution.
5. **Agent knowledge / experience (K)** — collective capability of the active fleet; a slow stock built by time-in-role and lost on attrition.

### Flows

- **Arrival rate A(t)** — new tickets per week. Nonlinear: rises with backlog (frustrated users who wait longer file more follow-ups, and product complexity/coverage problems surface more tickets), with market seasonality, and with lower first-contact resolution quality.
- **Resolution rate R(t)** — tickets closed per week.
- **Hire flow H(t)** — agents onboarded per quarter (management's lever).
- **Attrition flow L(t)** — agents leaving per quarter; rises with overload, burnout, and unresolved backlog.
- **Deflection/self-service flow D(t)** — resolved by KB/docs/self-service without an agent. A partial counter-dose.
- **Reopen flow** — closed tickets that re-enter the backlog as new resolution demands.

### Feedback loops

- **R1 — Overload loop (reinforcing, dest.)** More backlog ⇒ more agent overload / longer queue ⇒ user frustration and reopens ⇒ more effective demand ⇒ more backlog. Compounds absent counter-force.
- **B1 — Staffing response (balancing, but delayed).** Backlog ⇒ management detects ⇒ add agents. Delay between detection, hiring decision, onboarding, full ramp ⇒ overshoot and oscillation; if arrival growth keeps pace, B1 never closes.
- **B2 — Quality rework loop (balancing, delayed + imperfect).** Backlog ⇒ hires ⇒ less trained onboarding quality ⇒ more reopens ⇒ rework consumes capacity, raising effective resolution time. Negative-loop but with slow, biased correction (quality does not fully restore until experienced cohort matures).
- **R2 — Knowledge loss on attrition (reinforcing, dest.)** High load ⇒ burnout / attrition ⇒ loss of experienced agents ⇒ lower per-agent output and quality ⇒ more backlog ⇒ more load. Reinforcing churn spiral.
- **B3 — Deflection loop (balancing)** Backlog ⇒ invest in self-service ⇒ fewer tickets reach agents. Delayed: content/quality, adoption, and behavior-change.

### Delays

- **Hire-to-ramp lag** — ~1–2 quarters from decision to full productive capacity (recruiting, onboarding, mentoring).
- **Attrition leg** — agent departure decision + notice period ⇒ more displacement of capacity within 1 quarter of sustained overload.
- **Detection lag** — backlog dashboard latency and periodic review cycle ∈ 2–6 weeks.
- **Quality/experience maturation** — 2–4 quarters before a new cohort is near-veteran output.
- **Reopen delay** — reopens surface days to weeks after initial closure, so they do not immediately count against the current quarter's throughput.

### Constraints

- **Per-agent throughput ceiling** — bounded hours and cognitive load; a single agent cannot exceed a realistic weekly ticket ceiling regardless of demand.
- **Onboarding capacity** — experienced staff who can train/mentor newcomers is limited; scaling hires too fast saturates ramp quality (R2).
- **Coordination overhead** — larger team raises communication/coordination cost per ticket, capping net productivity growth (sublinear scaling in N).
- **Budget / headcount cap** — upper bound on N reachable in a quarter.
- **Ticket "hard" minimum** — some tickets are length-limited; total possible deflection is capped by what genuinely cannot be automated.

### Nonlinearities

- **Threshold in staffing response** — management only adds agents after backlog passes a visibility threshold, so the response is stepwise, not continuous.
- **Saturation in per-agent throughput** — output/ticket capacity flattens or declines at high N because coordination overhead grows and per-agent onboarding quality drops (an inverted-U if N very high).
- **Reopen rate rises superlinearly with throughput-forcing** — rushing closure to hit metric targets increases premature or incomplete resolutions, raising reopens nonlinearly.
- **Arrival elasticity to backlog/service quality** — customers facing long wait times file more follow-ups and escalate; rate can increase with backlog beyond a tipping point.

### Incentives

- **Agents:** measured on closure volume and speed ⇒ forces premature closes, raising reopens (metric gaming).
- **Management:** measured on staffing count and backlog size ⇒ prefers visible hires over hard quality/deflection work; avoids admitting the hiring-based lever is structurally insufficient.
- **Customers:** wait-time → follow-up/escalation; long wait reduces perceived service, compounding back to arrivals.
- **Hiring/recruiting:** incentives to quickly fill headcount ⇒ sacrifices ramp-quality and experience mix (hurts B2, feeds R2).

### Adaptive actors

- **Management** adapts staffing policy once backlog metric spikes; forecasts and hiring become endogenous.
- **Agents** adapt behavior to perceived metrics — close fast, defer hard tickets, or resist QA on high-volume days.
- **Customers/competitors** adapt — escalate, churn, or shift to self-service when possible. Their arrival patterns respond to observed service level.

---

## Model status

### Observed facts (evidence-backed)

- Backlog stock has grown steadily over at least four recent quarters despite cumulative hires trending up.
- After each staffing batch, backlog draws down briefly, then resumes growth (sawtooth pattern in data).
- Agent attrition rate is material relative to gross hires; net active headcount has risen far slower than cumulative hires.
- Reopen rate correlates positively with periods of high forced closure / high volume.
- Age of oldest ticket (a backlog-depth proxy) rises during most quarters even when total count dips, signaling average resolution latency increasing.

### Hypotheses (to be tested)

- H1: Arrival rate is endogenously inflated by the backlog itself (frustration follow-ups + escalation), not exogenous.
- H2: Ramp delay (hire-to-full-output) plus attrition largely cancels the effect of each added agent.
- H3: Coordination overhead makes per-agent throughput decline as N grows, so capacity is sublinear in N.
- H4: Quality drop from fast onboarding and metric pressure raises reopens, so some portion of closed tickets returns, inflating effective demand.
- H5: Deflection potential is significant but underused relative to agent capacity; a structural lever, not a staffing-only one.

### Parameters

- Arrival rate base (tickets/week), hire lag (weeks), ramp time (weeks), reopen fraction (0–1), attrition rate (1/year), per-agent throughput ceiling (tickets/agent-week), deflection ceiling (fraction of arrivals), experience maturation time (weeks).
- No reliable full-cadence measurement of every one of these is currently in one place; treat as qualitative unless and until measured.

### Calibration

- **Status: qualitative model.** No simulation fitted to history yet. Dimensional checks on flows/stocks are heuristic. Fixing parameters to match the observed sawtooth without independent structural evidence would be overclaiming; label any number as underdetermined.
- Next step if simulating: fit only the subset of parameters that can be measured from operational logs (arrival time series, closure rate, reopen rate, headcount record).

### Competing structures

- **C1 (exogenous demand growth):** arrivals grow secularly and are unrelated to backlog or quality; staffing ratio alone explains growth. If true, the backlog is mostly a volume/forecasting problem, not a feedback problem.
- **C2 (single quality bottleneck):** one structural cause — onboarding quality or self-service absence — dominates; feedback loops are second-order.
- **C3 (churn/labor-market):** expansion flips to net-loss of experience because of labor market or compensation, not workload. Similar observed trend with different mechanism and different cure (market, not capacity).

### Confidence

- **Medium-high** in the observed behavior (sawtooth + persistent growth registered across quarters).
- **Low-to-medium** in the strongest feedback loop claims (H1, H3, H4) until counts of arrival elasticity, per-agent throughput slope, and reopen fraction are measured.
- The model is currently qualitative and non-fitted; do not present loop on/off as established fact before parameter measurement or forecasting.

---

## Intervention analysis

### Leverage points (highest structural leverage first)

1. **Reduce effective demand, not just add capacity.** Fix the flight of reopens and the follow-up/escalation arrival elasticity. This is a balancing loop change with durable, compounding payoff (B2 + B3).
2. **Improve deflection/self-service (B3).** A small content/automation investment removes an independent share of arrivals permanently; does not erode ramp quality.
3. **Slow-steady staffing with ramp-quality protected.** Hire fewer but earlier and keep mentor capacity stable; reduces R2 (attrition and onboarding-quality loss) and delays B1 overshoot.
4. **Increase experienced-cohort retention (R2).** Addressing overload before attrition departs — pay, load ceilings, career path — protects per-agent throughput and knowledge stock.
5. **Lower detection lag.** More frequent visibility into backlog-age and arrival-elasticity trends lets management act on leading indicators, not only after the sawtooth has overshot.

### Expected trajectories from each lever

- **Deflection/self-service lever (B3):** A permanent subtend of arrivals ⇒ steady state backlog shifts down smoothly; expected ~model-consistent drop distributed across 1–2 quarters.
- **Ramp-quality + retention lever:** flattens effective-demand inflation and reopens within 2–4 quarters; reduces churn spiral (R2); expected slower but more durable reduction.
- **Staffing-only lever:** further of the same short-lived dips (sawtooth continues); would not close the gap if H1/H2 hold.

### Counter-effects and compensating feedback

- Adding agents to hit a volume metric raises coordination overhead and onboarding pressure — partially offsets the intended gain (H3).
- Speed-focused closure metric raises reopens (B2) and feeds customer frustration arrival elasticity (R1) ⇒ net effectiveness detracts.
- Iterating self-service content can flood customers to a suboptimal doc, transferring inquiry rather than eliminating it — reaped in arrival stats, not in closure rate.
- Aggressive retention pay raises cost per agent and may trigger across-team comp pressure (organization-level response not in original boundary) ⇒ slow budget constraints.

### Failure modes

- **Metric gaming:** performance targets on closure volume steer agents to close-on-narrow-definition, raising reopens and anger.
- **Delayed overshoot:** aggressive hiring batch leads to mass premature onboarding + attrition, dropping the experienced base and worsening long-run backlog.
- **Burden shifting:** deflection push moves hard tickets into escalation-only channels, uncapped support of "high-severity only" paths, or product-support teams — shifting the stock, not shrinking the work.
- **Lock-in:** once management is invested in the "more agents" lever (headcount budget, hiring pipeline, dashboards), pivoting to demand-side levers is resisted even when headline backlog continues upward.
- **Counterproductive staffing response:** relying on a single, slow, reversing lever (B1) sustains oscillation instead of equilibrium.

### Rollback / containment

- **Before acting:** bound headcount growth, define a job cutoff on closure-quality metrics (e.g., required quality/reopen targets), and publish a one-quarter reversal check on net active-headcount and per-agent throughput.
- **During:** if the reopening fraction or attrition rises over a set threshold after 1–2 quarters, pause further hires and re-check B2/R2 before continuing.
- **After:** an exit gate — show backlog-age and reopen metrics decide whether the staffing ramp is sustainable; if not, contain new hires and shift budget to demand-side levers (deflection, quality, retention).

---

## Validation plan

### Discriminating measures (would falsify or confirm competing structures)

- **C1 falsifier:** measure arrival rate elasticity to backlog age and service level; if arrivals are flat while backlog/waits rise, H1 is false (C1 or volume-only holds).
- **H3 falsifier:** plot per-agent throughput vs N; if throughput is flat or rising with N, coordination overhead is not a main factor.
- **H2 / C3 falsifier:** compare gross hires to net active headcount and per-agent ramp time; if net headcount tracks gross hires closely and attrition is low, the stall is not explained by ramp/attrition.
- **H4 falsifier:** track reopening fraction by cohort and by closure-speed context; if reopening rate is flat regardless of volume pressure, quality-drop hypothesis weakens.
- **B3 discriminator:** run a controlled cohort of deflection-oriented content; see if arrivals to agents drop in cohort vs control.

### Scenario replay

- **Baseline replay:** simulate main structure with parameters from measured ops (arrival, closure, reopen, attrition, headcount) and check it reproduces the observed sawtooth and growth pattern for the last 4 quarters.
- **Counterfactual 1 (staffing-only):** extra hires with measured ramp/attrition; predict continued sawtooth.
- **Counterfactual 2 (deflection+quality):** same hires but with deflection and closure-quality improvements; predict durable backlog inflection.
- **Counterfactual 3 (slow-steady staffing):** earlier-but-smaller hires with protected ramp-quality; predict substitution of growth with reduced oscillation.
- **Extreme-case tests:** zero hires → collapse to pure churn model; unbounded deflection → near-zero agent workload but possible content-lag effects.

### Monitoring

- Weekly: backlog level and oldest-ticket age (depth), arrival rate (with cause-of-failure tag for deflection/processing), closure rate, reopen rate, net active headcount, per-agent throughput.
- Monthly: attrition rate and experience distribution by cohort age; correlation between overload proxies and reopen fraction; deflection adoption rate.
- One-quarter cadence: management review that decides staffing-vs-structure tradeoff.

### Revision conditions

- Revise the model if (a) arrival elasticity to backlog is measured and is near zero (C1 grows relative to H1), (b) per-agent throughput scaling matches H3 but reopen/deflection measures are flat (H4/B3 partially false, structure re-prioritizes), or (c) attrition is explained by comp/labor-market rather than workload (C3 becomes primary), which changes the primary leverage from capacity to market/pay.
- Revise immediately on any structural change: large self-service overhaul, product coverage changes, pricing/demand shifts, or a new fulfillment channel that alters arrival or reopening geometry.
