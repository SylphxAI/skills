---
name: self-challenge
description: "Use when drafting, designing, comparing, or reviewing a launch/migration/rollout plan, system architecture, service boundary, data model, tech stack, or product spec; when stress-testing a commercial contract, reseller/partner agreement, pricing model, marketing/ad budget, risk assessment, operational runbook, or vendor/build-vs-buy choice; when establishing or challenging a root-cause hypothesis ('Root cause: why did X fail?'); or when asking 'are we over-engineering / over-building this?' or 'is there a simpler way?'. Load this skill and its matching reference (architecture, stack, commercial, growth, product, experience, games, risk, conduct, agent-voice) to apply: Simple Concept / Deep Implementation, 10x/100x Scale, Scale-to-Zero, Single Source of Truth (SSOT), SOTA Category-Leader benchmarks, Upstream contribution and separation of concerns, the Separation of Concerns Between Model and Runtime, and 5x5 risk scoring. Use author-item to write a ticket; use deliver-and-verify to execute changes."
---

# Self-Challenge (`self-challenge`)

Use this skill whenever designing, planning, evaluating trade-offs, reviewing a proposal/contract/budget, or questioning whether an approach is over-engineered. It is **role-neutral and domain-universal** across software architecture, product design, commercial/partner deals, marketing/growth budgets, and operations.

Just as `references/stack.md` selects proven languages and storage engines rather than inventing them from scratch, this skill treats **decision methodology as a stack**: every domain applies an explicitly chosen, literature-backed quantitative methodology rather than intuition, surface analogy, or uncalibrated big-company habits. **Methodology always precedes conclusion ($f(\text{Measured Inputs}) \to \text{Derived Conclusion}$)**: never select or bend a methodology backward to justify a pre-stated conclusion, example, or hunch (post-hoc rationalization). Define the governing objective function and input variables first, measure the inputs, and compute the conclusion from the model—recognizing that different input regimes produce different optimal conclusions under the same methodology. When a newer paper, benchmark, or mathematical model demonstrates better prediction or return per unit cost, replace the row in `Method sources` in one commit.

## Step 0: Load the Matching Domain Reference First (Mandatory)

Do not answer from generic pretraining alone. Immediately read the specific reference file(s) under `references/` that govern the domain of the question:

- **System Architecture, Service Boundaries, Scale & Stack**:
  - [references/architecture.md](references/architecture.md) — Vertical slices with a pure core, Single Source of Truth (SSOT), 10x/100x scale, scale-to-zero (`min-scale: 0`), Theory of Constraints capacity calculus, event-driven reconciliation, durable request ownership, upstream contribution / separation of concerns, and agent-first APIs
  - [references/stack.md](references/stack.md) — Target languages, runtimes, storage engines, and dependency selection
- **Commercial Agreements, Pricing, Marketing Budgets, Growth & Games**:
  - [references/commercial.md](references/commercial.md) — Value-based market pricing (`Price follows the market`), gross-margin maximization, LTV/CAC unit economics, workspace plans, partner/reseller terms, always-take-the-money, and refund rules
  - [references/growth.md](references/growth.md) — Acquisition, activation, referral loops, holdout experiments, ad-spend/CAC/ROAS economics, and SEO/ASO
  - [references/mechanics.md](references/mechanics.md) and [references/mechanics-catalogue.md](references/mechanics-catalogue.md) — Engagement, progression, monetisation, and retention mechanics
  - [references/games.md](references/games.md) — Freemium power-law IAP economics vs. IAA, closed-sink virtual economy, matchmaking, live-player continuity, and remake parity sheets
- **Product Scope, UX/UI & Customer Feedback**:
  - [references/product.md](references/product.md) — Product value thesis, first value with zero-config, SOTA evidence vs model crutches, and multi-agent conversation contracts
  - [references/experience.md](references/experience.md) — UI/UX quality, onboarding, localization, accessibility, and latency feel
  - [references/feedback.md](references/feedback.md) — In-product user feedback loops and friction signals
- **Risk Scoring, Conduct & Voice**:
  - [references/risk.md](references/risk.md) — Quantitative `5×5` (`likelihood × impact`) risk scoring, expected value, and risk of ruin
  - [references/conduct.md](references/conduct.md) — External stance toward customers, partners, stores, and regulators
  - [references/agent-voice.md](references/agent-voice.md) — Sharp-friend conversational tone and persona layers

---

When an operational path is slow or blocked, use a reversible workaround within existing grants, record its root-fix follow-up and removal trigger, and remove it when the fix lands. This does not authorize a product to work around or bypass our own engines or platform: the engine owner fixes the gap upstream first, and the product consumes the published capability. Spending approval remains required. Preserve unique user data and keep auth, tenant isolation, and ledger protections hard.

## 1. The Scientific Decision Method (Causal Inference, Bayesian Updating, Competing Hypotheses & Bottleneck Calculus)

Derive every non-trivial judgment, trade-off, capacity decision, or response to a challenge from the methodology to the conclusion ($f(\text{Inputs}) \to \text{Conclusion}$), never backward from a desired conclusion:

1. **Model the Objective Function & Causal Graph (`Structural Causal Models` — Pearl 2009; `Theory of Constraints` — Goldratt 1984; `Reinertsen 2009`)**:
   - State the objective function to maximize (such as expected cohort net contribution margin or verified throughput per unit cost) and the structural causal equation governing it (for example, $\text{Verified Throughput} = \min(\text{Demand}, \text{Capacity} \times \text{Active Duty Cycle}) \times \text{Completion Rate} \times \text{Verification Pass Rate}$, where the first two are tasks per hour and the last two are fractions). Keep units consistent; a serial-bottleneck model is one approximation, not every dispatch topology.
   - Separate correlation from causal intervention $P(Y \mid do(X))$: before attributing a failure or proposing an intervention on $X$, specify the causal mechanism and verify that changing $X$ changes $Y$.
2. **Enumerate Competing Hypotheses & Priors (`Strong Inference` — Platt 1964; `ACH` — Heuer 1999; `Bayesian Decision Theory` — Jaynes 2003)**:
   - List the plausible competing hypotheses $\{H_0, H_1, H_2\}$ across those causal variables, always including the null/baseline hypothesis $H_0$ (for example, that current capacity is sufficient and output is throttled by a downstream failure or synchronous wait) and, where useful, an "other or unknown" bucket. Causes can interact, so do not force them to be mutually exclusive or pretend the list is exhaustive.
   - Place any initial hunch, peer claim, or directional challenge from a user into $\{H_0, H_1, H_2\}$ as a candidate hypothesis pointing to an input variable to test—never as a pre-ordained conclusion to rationalize.
3. **Run High-EVOI Diagnostic Measurements (`Expected Value of Information` — Howard 1966; `Crucial Experiment` — Popper 1959; `Sequential Testing / Thompson Sampling` — Johari et al. 2017, Russo et al. 2018)**:
   - Select the measurement or experiment with the highest expected value of information per unit of time/cost: how much its possible results could change the action, not only how diagnostic it is ($\Lambda = \frac{P(E \mid H_1)}{P(E \mid H_0)}$). A highly diagnostic test of a fact that cannot change the decision is worth nothing. Query authoritative primary sources across the full population and window (such as 7-day p95 physical utilization and 12–24h active duty cycle and completion rates), or run sequential / multi-armed bandit experiments on live traffic.
   - **A conclusion moves on evidence, a broken model, or a changed goal**: new diagnostic evidence updates the model's parameters; a logical counterexample, wrong unit, omitted alternative or invalid causal link shows the model itself is wrong and replaces it; a changed objective changes the utility. A challenge that brings none of these leaves the conclusion unchanged; repeating a preference is not evidence. When the measured inputs confirm the original or a third hypothesis, keep the derived conclusion and show the numbers.
4. **Act on the Binding Constraint (`Goldratt 1984`; `Kingman 1961`)**:
   - Intervene on the variable that bounds the equation. In a steady serial flow, capacity added at a non-bottleneck step adds no throughput; bursty demand, routing skew or coupled resources are exceptions to check. Low output at low utilization means either a stall or synchronous wait to fix at its source, or simply too little demand: tell which before acting.

---

## 2. The Five First-Principles Challenge Tests

Evaluate every architecture, plan, product spec, commercial deal, or budget against the applicable tests below:

1. **Test A — Category-Leader Benchmark (SOTA), First-Principles Decomposition & Live Primary Source**:
   - Name the **category leader** (the top product, service, or open standard in that space). When a design depends on an external specification, protocol, law, vendor API, or paper, carry a **dated read of the primary source from the current session**—never rely on training memory.
   - **Separate irreducible mechanics from legacy compromises**: deconstruct *why* the category leader works—which parts reflect fundamental physical, protocol, or unit-economics laws, and which parts are compromises forced by a large incumbent's human coordination overhead, enterprise sales force, or pre-serverless infrastructure. Match or beat the leader on every user-visible dimension while discarding its legacy compromises.
   - On AI/agent systems, use external papers for benchmark metrics and failure classes only—never copy multi-step prompt/planner scaffolding built as crutches for older, weaker models ([references/product.md](references/product.md)).
   - *(Skip Test A for routine internal chores or mechanical bug fixes.)*
2. **Test B — Simple Concept, Powerful & Deep Implementation (YAGNI)**:
   - Ask: *"What happens if we delete this part? How do we get the most value from the least resources?"*
   - Keep the external concept and user interface minimal (zero-config, zero-knowledge by default); keep the internal implementation deep (a narrow public interface over substantial, deterministic logic).
   - Reject every self-imposed limit, unrequested throttle, hand-built queue, approval gate, compatibility wrapper, or speculative abstraction that has no witnessed failure behind it.
3. **Test C — Plan for 10x/100x Scale, Build the Target Architecture First, Scale-to-Zero, and SSOT**:
   - **Build the Target Architecture (Include Future Migration in Lifecycle Cost)**: Choose the known-fit, proven scalable design (the target architecture) from the first PR, evaluating total lifecycle cost including future data, contract, caller, and live-user migration cost. When initial implementation costs of the interim and target designs are comparable for an agent, build the target architecture directly rather than implementing an interim design that requires migrating live state, schemas, IDs, or external contracts later.
   - **10x / 100x Design**: For any system, data model, contract, or boundary that persists or scales (skip only for disposable one-off reports or static prose), state how it holds at **10x and 100x** across the relevant dimensions (including schema, partition key, and stateless edge where applicable), and name what breaks first. (Size actual hardware purchases from measured physical utilization such as p95 CPU/memory/I/O, never from uncalibrated bookings.)
   - **Nothing Runs Always-On (Runtime Services & Jobs)**: Every service, worker, and job starts on demand and scales to zero when idle unless an explicit always-on exception is recorded ([references/architecture.md](references/architecture.md)); fix slow cold starts at image pull/startup rather than paying for warm idle floors.
   - **Single Source of Truth (SSOT)**: Every setting, price, model ID, schema, and rule has exactly one authoritative home; all other surfaces derive from it. Delete duplicate sources immediately.
4. **Test D — Upstream-First, Separation of Concerns & Agent-Native Build vs. Buy**:
   - **Fix Upstream, Not Downstream**: When a problem or capability gap sits in an upstream we own (engine, platform, shared SDK/skill), fix or build the generic capability in the upstream; products never bypass our own engines.
   - **Separation of Concerns (No Privileged First-Party Access)**: Ask: *"Would this upstream change make complete sense for an unrelated external tenant?"* First-party apps are ordinary clients: never put downstream product names, business rules, privilege bypasses, or backdoors into an upstream layer. Dependencies flow strictly one way (downstream depends on published upstream versions).
   - **Agent-Native Build vs. Buy ([references/stack.md](references/stack.md))**: Separate **adopting open standards** (for interoperability) from **owning the implementation**. Compare building a focused implementation in our shared platform/engine against adopting a third-party dependency/system across full lifecycle cost (implementation, verification against specification/conformance/differential tests, third-party baggage, ability to modify/optimize immediately, and cost of waiting on external release cycles). Build and own the implementation once in our shared platform/engine (never duplicated DIY per product) when the capability is bounded, frequently evolving, or shapes core product experience and can be verified against a clear specification/test suite; adopt external engines where deep irreducible complexity, formal certification, or our workload benchmark favors them.
5. **Test E — Complete Migration, Clean-Slate Replacement vs. Patching & Launch Convergence**:
   - **Total Cost to Verified Outcome (Not Lines Typed)**: Traditional human workflows often favor small band-aid patches when manual multi-file edits are costly; for agents, mechanical multi-file edits are often cheaper than the state complexity, CI round-trips, and debugging loops caused by layering patches onto a flawed abstraction. When a failure recurs on the same boundary or a patch requires shims/workarounds, compare **local repair vs. clean-slate boundary replacement** (*Sacrificial Architecture*) by total cost to a verified outcome (reasoning, verification, caller migration, failure recovery, and cleanup)—never by diff line count. When that analysis shows a broken model or lower total verified-outcome cost for replacement, lock the contract with acceptance tests and replace the component cleanly in one pass, migrating all callers and deleting the old path in the same change.
   - **Scope Management for Launches**: If a product or cutover is struggling to converge, lock a **finite, burn-down-only checklist** of what a real user needs to complete the core value loop (or parity sheet). Hammer every nice-to-have and side discovery to post-launch.

---

## 3. Separation of Concerns Between Model and Runtime (Every Agent/Platform Change)

Apply this gate whenever a design, review, incident, or performance complaint touches an agent, runtime, sandbox, tool loop, or model configuration. Keep the boundary in one direction: the model owns its reasoning and tool path; the platform owns the environment and its overhead.

1. **Model autonomy is never constrained**:
   - Which tools an agent calls, how many tool rounds it takes, whether it uses bash or a sandbox/code-mode, and how deeply it reasons belong to the model's quality and autonomy.
   - Never cap tool rounds. Never ban sandbox/code-mode on chat turns. Never inject canned acknowledgment text. Never kill an active stream while reasoning tokens are flowing.
   - A rule about the order of a session's steps belongs in the tooling or a machine check, never in a prompt or a gate that pre-scripts the model's path.
2. **Platform and agent runtime own the overhead**:
   - When an agent feels slow, measure and fix the platform, not the model: sandbox startup latency (preserving the scale-to-zero rule unless an explicit exception is recorded), per-tool preparation and progress I/O overhead, stream liveness during active reasoning deltas plus live progress-card status visibility, and immediate auto-backgrounding of in-flight tools when a new user message or steer arrives.
   - Judge the result at the real surface, never by tool-call counts, step transcripts, or an expected-tool assertion ([references/architecture.md](references/architecture.md), "Steering agents by environment").
3. **Unified Engine Loop vs. Isolated Agent Instances**:
   - All agents share one unified runtime loop (model, tools, sandbox, and capability/grant interfaces)—never split the runtime into separate "worker" and "assistant" engines.
   - Each agent **instance** holds an isolated identity, session, memory, and grant scope: persistent assistants belong to their user or standing role, whereas dispatched task/project work spawns an independent agent instance with task-scoped grants and never borrows a user's persistent assistant or active conversation session.

---

## 4. Applying the Challenge by Scenario

### Scenario 1 — Designing or Comparing Architectures / Technical Specs
- Check `references/architecture.md` and `references/stack.md`.
- Verify vertical slices with a pure core (zero I/O in domain logic) and imperative shell, event-driven primary paths (no polling loops), durable ownership of accepted requests (never tell the user to retry an internal fault), and `Test B / C / D` above.

### Scenario 2 — Evaluating a Commercial Contract, Budget, Vendor, or Growth Plan
- Check `references/commercial.md`, `references/growth.md`, and `references/risk.md`.
- Compute unit economics (value-based market pricing, gross margin after store/payment fees, CAC vs LTV, downside exposure) and score every legal, tax, or commercial risk quantitatively by `likelihood (1–5) × impact (1–5)`. Never block on an unscored hypothetical risk; ask only for new unauthorized spend, a missing grant, or an ambiguous request, with one recommended option. Already authorized deletions or governance changes need no repeated approval; preserve unique user data.

### Scenario 3 — Root-Cause Claims, Incident Framing & 30-Minute Stalls
- **Perform Root-Cause Analysis Before Naming a Cause or Shared Fix**:
  1. **Layer**: Name the exact layer (product concept, runtime engine, agent instance, configuration/policy, runtime code, or operations)—never conflate engine/class with instance/session, and never swing to the opposite extreme when a framing is challenged.
  2. **Observation**: Read the authoritative primary source for that layer (live log/DB trace, live policy/request receipt, or `file:line`) with its `date -u` read time and exact object ID.
  3. **Hypothesis & Disconfirming Check**: Separate read facts, hypotheses, and recommendations (never present a suggestion as a user ruling). State what observation would **disprove** the hypothesis (e.g., whether earlier occurrences in the timeline predate the suspected change) and run that check first.
  4. **Boundary**: State the intended outcome, target, and blast radius—which identities, sessions, memories, or grants are touched and which must remain untouched.
  5. **Action**: Test the proposed fix against one concrete counterexample to confirm it repairs the right layer without adding unrequested gates, agent categories, or model constraints. Until the live event and governing code/config are read, label any explanation a **hypothesis** and never use it to redirect shared architecture or dispatch; when new evidence disproves a conclusion, retract affected decisions immediately.
- Change the method as soon as a path is blocked; **30 minutes is the latest re-check, not a wait**. Read the live object directly and switch to [`../unblock/SKILL.md`](../unblock/SKILL.md) or [`../swarm-fuse/SKILL.md`](../swarm-fuse/SKILL.md).

---

## Method sources

| Method | Formula / Rule | Source | Replace when |
| --- | --- | --- | --- |
| Structural causal models (SCM) & counterfactual intervention | Model system relationships as a causal graph and verify that intervening on the proposed cause $do(X = x)$ changes the outcome $Y$, separating causal mechanism from correlation or post-hoc rationalization. | Judea Pearl, *Causality: Models, Reasoning, and Inference* (2nd ed., 2009) | Never replaced by correlational or post-hoc reasoning. |
| Bayesian decision theory & Expected Value of Information (EVOI) | Update hypothesis beliefs by likelihood ratio $P(H \mid E) \propto P(E \mid H)P(H)$ and prioritize checks by expected value of information per unit cost. New evidence updates beliefs; a counterexample revises the model; a changed goal revises the utility; a bare restatement changes nothing. | Ronald A. Howard, *Information Value Theory*, IEEE Trans. SSC (1966); E. T. Jaynes, *Probability Theory: The Logic of Science* (2003) | A higher-diagnosticity sequential inference rule outperforms Bayesian EVOI on our tasks. |
| Strong inference & Analysis of Competing Hypotheses (ACH) | Formulate the plausible competing hypotheses $\{H_0, H_1, H_2\}$ (plus an unknown bucket where useful) and evaluate primary evidence across all hypotheses simultaneously to eliminate contradicted explanations before concluding. | John R. Platt, *Strong Inference*, Science 146(3642), 1964; Karl Popper (1959); Richards J. Heuer Jr., *Psychology of Intelligence Analysis* (1999), ch. 8 | A better-calibrated multi-hypothesis protocol reduces false-positive and flip-flop error rates. |
| Sequential testing (mSPRT) & Thompson Sampling bandits | Run always-valid sequential hypothesis tests and Bayesian multi-armed bandits to shift live traffic toward higher-performing variants without fixed-horizon sample waste. | Ramesh Johari et al., *Peeking at A/B Tests* (KDD 2017); Daniel Russo et al., *A Tutorial on Thompson Sampling*, FnTML (2018) | A more sample-efficient online experimentation algorithm is validated on our traffic scale. |
| Theory of Constraints (TOC) & queueing physics | In a steady serial flow, throughput equals the rate of its binding constraint ($\min(r_1, \dots, r_n)$) and non-bottleneck capacity adds none; burstiness, routing skew and coupled resources are the exceptions, and low utilization can also mean too little demand. | Eliyahu M. Goldratt, *The Goal* (1984); John D. C. Little (1961); J. F. C. Kingman (1961) | The flow topology changes or a more accurate queueing model governs our dispatch and build pipelines. |
| First-principles decomposition & sacrificial lifecycle cost | Separate a category leader's irreducible physical, protocol, or unit-economics mechanics from legacy incumbent compromises, and compare local patching vs. complete replacement by total cost to a verified outcome. | Martin Fowler, *Sacrificial Architecture* (2014); Donald G. Reinertsen, *The Principles of Product Development Flow* (2009) | Relative costs of agent code authoring, verification, or runtime state change materially. |
