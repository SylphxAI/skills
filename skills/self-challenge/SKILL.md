---
name: self-challenge
description: "Use when drafting, designing, comparing, or reviewing a launch/migration/rollout plan, system architecture, service boundary, data model, tech stack, or product spec; when stress-testing a commercial contract, reseller/partner agreement, pricing model, marketing/ad budget, risk assessment, operational runbook, or vendor/build-vs-buy choice; when establishing or challenging a root-cause hypothesis ('Root cause: why did X fail?'); or when asking 'are we over-engineering / over-building this?' or 'is there a simpler way?'. Load this skill and its matching reference (architecture, stack, commercial, growth, product, experience, games, risk, conduct, agent-voice) to apply: Simple Concept / Deep Implementation, 10x/100x Scale, Scale-to-Zero, Single Source of Truth (SSOT), SOTA Category-Leader benchmarks, Upstream contribution and separation of concerns, the Separation of Concerns Between Model and Runtime, and 5x5 risk scoring. Use author-item to write a ticket; use deliver-and-verify to execute changes."
---

# Self-Challenge (`self-challenge`)

Use this skill whenever designing, planning, evaluating trade-offs, reviewing a proposal/contract/budget, or questioning whether an approach is over-engineered. It applies across software architecture, product design, commercial/partner deals, marketing/growth budgets, and operations.

Use the chosen decision method to state the objective, material inputs, alternatives and uncertainty. Define the model before drawing the conclusion, and quantify the inputs where measurement can change the action. Name a qualitative judgment when the evidence does not support a number. Compare replacement methods on relevant outcomes and total cost before updating the owning method row. Different input regimes can produce different decisions under the same method.

## Step 0: Load the Matching Domain Reference First (Mandatory)

Do not answer from generic pretraining alone. Immediately read the specific reference file(s) under `references/` that govern the domain of the question:

- **System Architecture, Service Boundaries, Scale & Stack**:
  - [references/architecture.md](references/architecture.md) — Vertical slices with a pure core, Single Source of Truth (SSOT), 10x/100x scale, scale-to-zero (`min-scale: 0`), Theory of Constraints capacity calculus, event-driven reconciliation, durable request ownership, upstream contribution / separation of concerns, and agent-first APIs
  - [references/stack.md](references/stack.md) — Target languages, runtimes, storage engines, and dependency selection
- **Commercial Agreements, Pricing, Marketing Budgets, Growth & Games**:
  - [references/commercial.md](references/commercial.md) — Cohort contribution, market evidence, LTV/CAC and cash payback, shared or individual purchases, durable fulfillment and remedies
  - [references/growth.md](references/growth.md) — Acquisition, activation, referral loops, holdout experiments, ad-spend/CAC/ROAS economics, and SEO/ASO
  - [references/mechanics.md](references/mechanics.md) and [references/mechanics-catalogue.md](references/mechanics-catalogue.md) — Engagement, progression, monetisation, and retention mechanics
  - [references/games.md](references/games.md) — Measured cohort economics, advertised competitive rules, economy sources and sinks, live-player continuity and remake parity sheets
- **Product Scope, UX/UI & Customer Feedback**:
  - [references/product.md](references/product.md) — Product value thesis, first value, useful configuration defaults, agent design and multi-agent conversation contracts
  - [references/experience.md](references/experience.md) — UI/UX quality, onboarding, localization, accessibility, and latency feel
  - [references/feedback.md](references/feedback.md) — Sensory response to input: motion, sound, haptics and feedback states
- **Risk Scoring, Conduct & Voice**:
  - [references/risk.md](references/risk.md) — Ordinal `5×5` (`likelihood × impact`) risk ranking, expected loss and risk of ruin
  - [references/conduct.md](references/conduct.md) — External stance toward customers, partners, stores, and regulators
  - [references/agent-voice.md](references/agent-voice.md) — Sharp-friend conversational tone and persona layers

---

For operational recovery and execution authorization, use [deliver-and-verify](../deliver-and-verify/SKILL.md). Apply the upstream-first design test below when the gap belongs to a shared engine or platform.

## 1. The Scientific Decision Method (Causal Inference, Bayesian Updating, Competing Hypotheses & Bottleneck Calculus)

Derive every non-trivial judgment, trade-off, capacity decision, or response to a challenge from the methodology to the conclusion ($f(\text{Inputs}) \to \text{Conclusion}$), never backward from a desired conclusion:

1. **Model the Objective Function & Causal Graph (`Structural Causal Models` — Pearl 2009; `Theory of Constraints` — Goldratt 1984; `Reinertsen 2009`)**:
   - State the objective function to maximize (such as expected cohort net contribution margin or verified throughput per unit cost) and the structural causal equation governing it (for example, $\text{Verified Throughput} = \min(\text{Demand}, \text{Capacity} \times \text{Active Duty Cycle}) \times \text{Completion Rate} \times \text{Verification Pass Rate}$, where the first two are tasks per hour and the last two are fractions). Keep units consistent; a serial-bottleneck model is one approximation, not every dispatch topology.
   - State the proposed causal mechanism, observations and assumptions. Run a safe disconfirming or intervention check when its result could change the action; otherwise label the explanation a hypothesis and state the uncertainty.
2. **Enumerate Competing Hypotheses & Priors (`Strong Inference` — Platt 1964; `ACH` — Heuer 1999; `Bayesian Decision Theory` — Jaynes 2003)**:
   - For a causal question, compare plausible hypotheses, including the baseline and an unknown alternative where useful. Allow interacting causes; use the hypothesis structure that fits the question.
   - Treat factual claims from a hunch, peer or requester as candidates to test. An explicit instruction can change the goal or constraints; distinguish that authority from evidence for a causal claim.
3. **Run High-EVOI Diagnostic Measurements (`Expected Value of Information` — Howard 1966; `Crucial Experiment` — Popper 1959; `Sequential Testing / Thompson Sampling` — Johari et al. 2017, Russo et al. 2018)**:
   - Choose the cheapest authoritative measurement that could change the action. Use the full population when authoritatively queryable; otherwise state the sample, time window and uncertainty. A likelihood ratio $P(E \mid H_1)/P(E \mid H_0)$ describes diagnosticity, while the value of information depends on whether the evidence changes a useful decision. Use sequential inference or adaptive allocation when their assumptions and objective fit.
   - **A conclusion moves on evidence, a broken model, or a changed goal**: new diagnostic evidence updates the model's parameters; a logical counterexample, wrong unit, omitted alternative or invalid causal link shows the model itself is wrong and replaces it; a changed objective changes the utility. A challenge that brings none of these leaves the conclusion unchanged; repeating a preference is not evidence. When the measured inputs confirm the original or a third hypothesis, keep the derived conclusion and show the numbers.
4. **Act on the Binding Constraint (`Goldratt 1984`; `Kingman 1961`)**:
   - Intervene on the variable that bounds the equation. In a steady serial flow, capacity added at a non-bottleneck step adds no throughput; bursty demand, routing skew or coupled resources are exceptions to check. Low output at low utilization means either a stall or synchronous wait to fix at its source, or simply too little demand: tell which before acting.

---

## 2. The Five First-Principles Challenge Tests

Evaluate every architecture, plan, product spec, commercial deal, or budget against the applicable tests below:

1. **Test A — Category-Leader Benchmark (SOTA), First-Principles Decomposition & Live Primary Source**:
   - Name the **category leader** (the top product, service, or open standard in that space). When a design depends on an external specification, protocol, law, vendor API, or paper, carry a **dated read of the primary source from the current session**—never rely on training memory.
   - Decompose the leader's useful mechanics and compare the dimensions required by the outcome's acceptance criteria. For a remake, use its full screen-and-feature parity sheet; for a new value loop, distinguish necessary mechanics from features outside the launch scope.
   - On AI/agent systems, compare the simplest direct agent loop with candidate planning or workflow methods on the actual task. Keep added structure when the measured benefit pays for its cost ([references/product.md](references/product.md)).
   - *(Skip Test A for routine internal chores or mechanical bug fixes.)*
2. **Test B — Simple Concept, Powerful & Deep Implementation (YAGNI)**:
   - Ask: *"What happens if we delete this part? How do we get the most value from the least resources?"*
   - Keep the external concept and interface small. Derive useful defaults and ask for configuration when it changes the result; keep substantial domain logic behind the interface.
   - Remove a self-imposed limit, gate or abstraction unless it addresses a witnessed failure, a binding requirement or an explicit hard line. Keep the constraint no tighter than that need.
3. **Test C — Plan for 10x/100x Scale, Build the Target Architecture First, Scale-to-Zero, and SSOT**:
   - **Build the Target Architecture (Include Future Migration in Lifecycle Cost)**: Choose the known-fit, proven scalable design (the target architecture) from the first PR, evaluating total lifecycle cost including future data, contract, caller, and live-user migration cost. When initial implementation costs of the interim and target designs are comparable for an agent, build the target architecture directly rather than implementing an interim design that requires migrating live state, schemas, IDs, or external contracts later.
   - **10x / 100x Design**: For any system, data model, contract, or boundary that persists or scales (skip only for disposable one-off reports or static prose), state how it holds at **10x and 100x** across the relevant dimensions (including schema, partition key, and stateless edge where applicable), and name what breaks first. (Size actual hardware purchases from measured physical utilization such as p95 CPU/memory/I/O, never from uncalibrated bookings.)
   - **Nothing Runs Always-On (Runtime Services & Jobs)**: Every service, worker, and job starts on demand and scales to zero when idle unless an explicit always-on exception is recorded ([references/architecture.md](references/architecture.md)); fix slow cold starts at image pull/startup rather than paying for warm idle floors.
   - **Single Source of Truth (SSOT)**: Every setting, price, model ID, schema, and rule has exactly one authoritative home; all other surfaces derive from it. Delete duplicate sources immediately.
4. **Test D — Upstream-First, Separation of Concerns & Agent-Native Build vs. Buy**:
   - **Fix Upstream, Not Downstream**: When a problem or capability gap sits in an upstream we own (engine, platform, shared SDK/skill), fix or build the generic capability in the upstream; products never bypass our own engines.
   - **Separation of Concerns (No Privileged First-Party Access)**: Ask: *"Would this upstream change make complete sense for an unrelated external tenant?"* First-party apps are ordinary clients. Keep shared mechanisms independent of downstream identity, and keep product-specific business rules and privileged exceptions in their owning layer. Dependencies flow strictly one way (downstream depends on published upstream versions).
   - **Build vs. buy ([references/stack.md](references/stack.md))**: distinguish adopting a standard from owning its implementation. Compare implementation, verification, maintenance, security, optimization freedom and waiting costs. Build once in the shared platform when the lifecycle comparison favors ownership and the contract is verifiable; adopt when the external engine wins.
5. **Test E — Complete Migration, Clean-Slate Replacement vs. Patching & Launch Convergence**:
   - **Total cost to the verified outcome**: compare local repair and boundary replacement by reasoning, implementation, verification, migration, recovery and cleanup cost. When replacement wins, lock its observable contract, migrate owned callers and remove the old internal path in that delivery. For published consumers that cannot update atomically, follow the supported-version rollout before retiring the old contract; preserve unique live data.
   - **Scope Management for Launches**: If a product or cutover is struggling to converge, lock a **finite, burn-down-only checklist** of what a real user needs to complete the core value loop (or parity sheet). Defer newly discovered non-blocking enhancements to post-launch work.

---

## 3. Model and runtime boundary

For agent, runtime, sandbox, tool-loop or model-configuration decisions, use the
[model and runtime boundary](references/architecture.md#separation-of-concerns-between-model-and-runtime).

---

## 4. Applying the Challenge by Scenario

### Scenario 1 — Designing or Comparing Architectures / Technical Specs
- Check `references/architecture.md` and `references/stack.md`.
- Check vertical slices with a pure core and imperative shell, the supported event/reconciliation path, durable ownership of accepted incomplete work, and `Test B / C / D` above. Use the reference for provider polling and recovery details.

### Scenario 2 — Evaluating a Commercial Contract, Budget, Vendor, or Growth Plan
- Check `references/commercial.md`, `references/growth.md`, and `references/risk.md`.
- Estimate the relevant unit economics and use [risk.md](references/risk.md) to rank material downside. A 5×5 score is an ordinal priority aid; use expected-loss estimates when they can change the decision. Execution authorization belongs to [deliver-and-verify](../deliver-and-verify/SKILL.md).

### Scenario 3: Analysis and root-cause claims

Use one evidence contract for an analysis:

- State the question, intended outcome and boundary.
- Identify the sources, their revision or version, and when they were read.
- Separate observations from hypotheses and recommendations.
- State what would disprove a causal hypothesis, run the useful available check,
  and report its result.
- Name material evidence gaps and how they affect the conclusion.
- Recommend an action within the existing authority, with its decisive trade-off.

Include the elements relevant to the decision and use the format the audience
needs. A short answer may carry the evidence in one paragraph; a larger review
may use sections or a table. Until the event and governing code or configuration
are read, keep a causal explanation a hypothesis. Correct affected decisions
when evidence disproves it.

For a blocked live task, use [unblock](../unblock/SKILL.md); use
[swarm-fuse](../swarm-fuse/SKILL.md) when independent views can supply new evidence.

---

## Method sources

| Method | Formula / Rule | Source | Replace when |
| --- | --- | --- | --- |
| Structural causal models and counterfactual intervention | State the causal mechanism, evidence and assumptions; test a useful safe intervention or falsifier where available. Keep an untested explanation a hypothesis. | Judea Pearl, *Causality* (2009); [author's causal-inference overview](https://ftp.cs.ucla.edu/pub/stat_ser/r350.pdf) | A counterexample, invalid assumption or better predictive model changes the mechanism. |
| Bayesian decision theory and expected value of information | Use Bayes' rule $P(H \mid E) \propto P(E \mid H)P(H)$ to update beliefs. Choose evidence by the decision value it can change relative to its cost. | E. T. Jaynes, *Probability Theory* (2003); Ronald A. Howard, *Information Value Theory* (1966) | A validated alternative improves decisions after measurement cost on the relevant tasks. |
| Strong inference & Analysis of Competing Hypotheses (ACH) | Formulate the plausible competing hypotheses $\{H_0, H_1, H_2\}$ (plus an unknown bucket where useful) and evaluate primary evidence across all hypotheses simultaneously to eliminate contradicted explanations before concluding. | John R. Platt, *Strong Inference*, Science 146(3642), 1964; Karl Popper (1959); Richards J. Heuer Jr., *Psychology of Intelligence Analysis* (1999), ch. 8 | A better-calibrated multi-hypothesis protocol reduces false-positive and flip-flop error rates. |
| Sequential inference and Thompson sampling | Use always-valid sequential inference for stopping-sensitive hypothesis tests; use Thompson sampling for adaptive allocation when its reward and exploration objective fit. State assumptions and judge the two methods separately. | [Johari et al., Always Valid Inference](https://arxiv.org/abs/1512.04922); [Russo et al., A Tutorial on Thompson Sampling](https://arxiv.org/abs/1707.02038) | Another method improves the relevant error, reward or sample-cost objective under the same workload. |
| Theory of Constraints (TOC) & queueing physics | In a steady serial flow, throughput equals the rate of its binding constraint ($\min(r_1, \dots, r_n)$) and non-bottleneck capacity adds none; burstiness, routing skew and coupled resources are the exceptions, and low utilization can also mean too little demand. | Eliyahu M. Goldratt, *The Goal* (1984); John D. C. Little (1961); J. F. C. Kingman (1961) | The flow topology changes or a more accurate queueing model governs our dispatch and build pipelines. |
| First-principles decomposition & sacrificial lifecycle cost | Separate a category leader's irreducible physical, protocol, or unit-economics mechanics from legacy incumbent compromises, and compare local patching vs. complete replacement by total cost to a verified outcome. | Martin Fowler, *Sacrificial Architecture* (2014); Donald G. Reinertsen, *The Principles of Product Development Flow* (2009) | Relative costs of agent code authoring, verification, or runtime state change materially. |
