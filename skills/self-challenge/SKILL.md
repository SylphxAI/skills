---
name: self-challenge
description: "Use when drafting, designing, comparing, or reviewing a launch/migration/rollout plan, system architecture, service boundary, data model, tech stack, or product spec; when stress-testing a commercial contract, reseller/partner agreement, pricing model, marketing/ad budget, risk assessment, operational runbook, or vendor/build-vs-buy choice; when establishing or challenging a root-cause hypothesis ('Root cause: why did X fail?'); or when asking 'are we over-engineering / over-building this?' or 'is there a simpler way?'. Load this skill and its matching reference (architecture, stack, commercial, growth, product, experience, games, risk, conduct, agent-voice) to enforce our methodology: Simple Concept / Deep Implementation, 10x/100x Scale, Scale-to-Zero, Single Source of Truth (SSOT), SOTA Category-Leader benchmarks, Upstream-First purity, the Responsibility Boundary & Zero Model-Constraining gate, and 5x5 risk scoring. Use author-item to write a ticket; use deliver-and-verify to execute changes."
---

# Self-Challenge (`self-challenge`)

Use this skill whenever designing, planning, evaluating trade-offs, reviewing a proposal/contract/budget, or questioning whether an approach is over-engineered. It is **role-neutral and domain-universal** across software architecture, product design, commercial/partner deals, marketing/growth budgets, and operations.

## Step 0: Load the Matching Domain Reference First (Mandatory)

Do not answer from generic pretraining alone. Immediately read the specific reference file(s) under `references/` that govern the domain of the question:

- **System Architecture, Service Boundaries, Scale & Stack**:
  - [references/architecture.md](references/architecture.md) — Vertical slices with a pure core, Single Source of Truth (SSOT), 10x/100x scale, scale-to-zero (`min-scale: 0`), event-driven reconciliation, durable request ownership, upstream-first / customer-zero boundaries, and agent-first APIs
  - [references/stack.md](references/stack.md) — Target languages, runtimes, storage engines, and dependency selection
- **Commercial Agreements, Pricing, Marketing Budgets, Growth & Games**:
  - [references/commercial.md](references/commercial.md) — Pricing, plans, unit economics, partner/reseller terms, always-take-the-money, and refund rules
  - [references/growth.md](references/growth.md) — Acquisition, activation, referral loops, ad-spend/CAC/ROAS economics, and SEO/ASO
  - [references/mechanics.md](references/mechanics.md) and [references/mechanics-catalogue.md](references/mechanics-catalogue.md) — Engagement, progression, monetisation, and retention mechanics
  - [references/games.md](references/games.md) — Game economy, matchmaking, live-player continuity, and remake parity sheets
- **Product Scope, UX/UI & Customer Feedback**:
  - [references/product.md](references/product.md) — Product value thesis, first value with zero-config, SOTA evidence vs model crutches, and multi-agent conversation contracts
  - [references/experience.md](references/experience.md) — UI/UX quality, onboarding, localization, accessibility, and latency feel
  - [references/feedback.md](references/feedback.md) — In-product user feedback loops and friction signals
- **Risk Scoring, Conduct & Voice**:
  - [references/risk.md](references/risk.md) — Quantitative `5×5` (`likelihood × impact`) risk scoring, expected value, and risk of ruin
  - [references/conduct.md](references/conduct.md) — External stance toward customers, partners, stores, and regulators
  - [references/agent-voice.md](references/agent-voice.md) — Sharp-friend conversational tone and persona layers

---

## 1. The Five First-Principles Challenge Tests

Evaluate every architecture, plan, product spec, commercial deal, or budget against the applicable tests below:

1. **Test A — Category-Leader Benchmark (SOTA) & Live Primary Source**:
   - Name the **category leader** (the top product, service, or open standard in that space). When a design depends on an external specification, protocol, law, vendor API, or paper, carry a **dated read of the primary source from the current session**—never rely on training memory.
   - Ask: *"Does our target match or beat the category leader on every user-visible dimension, or are we settling for a weaker step?"*
   - On AI/agent systems, use external papers for benchmark metrics and failure classes only—never copy multi-step prompt/planner scaffolding built as crutches for older, weaker models ([references/product.md](references/product.md)).
   - *(Skip Test A for routine internal chores or mechanical bug fixes.)*
2. **Test B — Simple Concept, Powerful & Deep Implementation (Zero Unrequested Mechanisms)**:
   - Ask: *"What happens if we delete this part? How do we get the most value from the least resources?"*
   - Keep the external concept and user interface minimal (zero-config, zero-knowledge by default); keep the internal implementation deep (a narrow public interface over substantial, deterministic logic).
   - Reject every self-imposed limit, unrequested throttle, hand-built queue, approval gate, compatibility wrapper, or speculative abstraction that has no witnessed failure behind it.
3. **Test C — Plan for 10x/100x Scale, Build End-State Method B First, Scale-to-Zero, and SSOT**:
   - **Build End-State Method B on Day 1 (Include Future Migration in Lifecycle Cost)**: Choose the known-fit, proven scalable design (**Method B**) from the first PR, evaluating total lifecycle cost including future data, contract, caller, and live-user migration cost. When initial implementation costs of A and B are comparable for an agent, build **Method B** directly rather than landing a transitional **Method A** that requires migrating live state, schemas, IDs, or external contracts later.
   - **10x / 100x Design**: For any system, data model, contract, or boundary that persists or scales (skip only for disposable one-off reports or static prose), state how it holds at **10x and 100x** across the relevant dimensions (including schema, partition key, and stateless edge where applicable), and name what breaks first. (Size actual hardware purchases from measured physical utilization such as p95 CPU/memory/I/O, never from uncalibrated bookings.)
   - **Nothing Runs Always-On (Runtime Services & Jobs)**: Every service, worker, and job starts on demand and scales to zero when idle unless an explicit always-on exception is recorded ([references/architecture.md](references/architecture.md)); fix slow cold starts at image pull/startup rather than paying for warm idle floors.
   - **Single Source of Truth (SSOT)**: Every setting, price, model ID, schema, and rule has exactly one authoritative home; all other surfaces derive from it. Delete duplicate sources immediately.
4. **Test D — Upstream-First, Upstream Purity & Agent-Native Build vs. Buy**:
   - **Fix Upstream, Not Downstream**: When a problem or capability gap sits in an upstream we own (engine, platform, shared SDK/skill), fix or build the generic capability in the upstream—never hack a bypass in the downstream consumer.
   - **Upstream Purity (Customer Zero, No Backdoors)**: Ask: *"Would this upstream change make complete sense for an unrelated external tenant?"* First-party apps are ordinary customers (`Customer Zero`): never put downstream product names, business rules, privilege bypasses, or backdoors into an upstream layer. Dependencies flow strictly one way (downstream depends on published upstream versions).
   - **Agent-Native Build vs. Buy ([references/stack.md](references/stack.md))**: Separate **adopting open standards** (for interoperability) from **owning the implementation**. Compare building a focused implementation in our shared platform/engine against adopting a third-party dependency/system across full lifecycle cost (implementation, verification against specification/conformance/differential tests, third-party baggage, ability to modify/optimize immediately, and cost of waiting on external release cycles). Build and own the implementation once in our shared platform/engine (never duplicated DIY per product) when the capability is bounded, frequently evolving, or shapes core product experience and can be verified against a clear specification/test suite; adopt external engines where deep irreducible complexity, formal certification, or our workload benchmark favors them.
5. **Test E — One-Shot Direct Path, Clean-Slate Replacement vs. Patching & Launch Convergence**:
   - **Total Cost to Verified Outcome (Not Lines Typed)**: Traditional human workflows often favor small band-aid patches when manual multi-file edits are costly; for agents, mechanical multi-file edits are often cheaper than the state complexity, CI round-trips, and debugging loops caused by layering patches onto a flawed abstraction. When a failure recurs on the same boundary or a patch requires shims/workarounds, compare **local repair vs. clean-slate boundary replacement** (*Sacrificial Architecture*) by total cost to a verified outcome (reasoning, verification, caller migration, failure recovery, and cleanup)—never by diff line count. When that analysis shows a broken model or lower total verified-outcome cost for replacement, lock the contract with acceptance tests and replace the component cleanly in one pass, migrating all callers and deleting the old path in the same change.
   - **Scope Hammering for Launches**: If a product or cutover is struggling to converge, lock a **finite, burn-down-only checklist** of what a real user needs to complete the core value loop (or parity sheet). Hammer every nice-to-have and side discovery to post-launch.

---

## 2. Responsibility Boundary & Zero Model-Constraining Gate (Every Agent/Platform Change)

Apply this gate whenever a design, review, incident, or performance complaint touches an agent, harness, sandbox, tool loop, or model configuration. Keep the boundary in one direction: the model owns its reasoning and tool path; the platform owns the environment and its overhead.

1. **Model autonomy is never constrained**:
   - Which tools an agent calls, how many tool rounds it takes, whether it uses bash or a sandbox/code-mode, and how deeply it reasons belong to the model's quality and autonomy.
   - Never cap tool rounds. Never ban sandbox/code-mode on chat turns. Never inject canned acknowledgment text. Never kill an active stream while reasoning tokens are flowing.
   - A rule about the order of a session's steps belongs in the tooling or a machine check, never in a prompt or a gate that pre-scripts the model's path.
2. **Platform and harness own the overhead**:
   - When an agent feels slow, measure and fix the platform, not the model: sandbox startup latency (preserving the scale-to-zero rule unless an explicit exception is recorded), per-tool preparation and progress I/O overhead, stream liveness during active reasoning deltas plus live progress-card status visibility, and immediate auto-backgrounding of in-flight tools when a new user message or steer arrives.
   - Judge the result at the real surface, never by tool-call counts, step transcripts, or an expected-tool assertion ([references/architecture.md](references/architecture.md), "Steering agents by environment").
3. **Unified Engine Loop vs. Isolated Agent Instances**:
   - All agents share one unified runtime loop (model, tools, sandbox, and capability/grant interfaces)—never split the runtime into separate "worker" and "assistant" engines.
   - Each agent **instance** holds an isolated identity, session, memory, and grant scope: persistent assistants belong to their user or standing role, whereas dispatched task/project work spawns an independent agent instance with task-scoped grants and never borrows a user's persistent assistant or active conversation session.

---

## 3. Applying the Challenge by Scenario

### Scenario 1 — Designing or Comparing Architectures / Technical Specs
- Check `references/architecture.md` and `references/stack.md`.
- Verify vertical slices with a pure core (zero I/O in domain logic) and imperative shell, event-driven primary paths (no polling loops), durable ownership of accepted requests (never tell the user to retry an internal fault), and `Test B / C / D` above.

### Scenario 2 — Evaluating a Commercial Contract, Budget, Vendor, or Growth Plan
- Check `references/commercial.md`, `references/growth.md`, and `references/risk.md`.
- Compute unit economics (net margin after store/payment fees, CAC vs LTV, downside exposure) and score every legal, tax, or commercial risk quantitatively by `likelihood (1–5) × impact (1–5)`. Never block on an unscored hypothetical risk; flag one-way doors (new spend, irreversible deletion, or unapproved commitments) with one recommended option.

### Scenario 3 — Root-Cause Claims, Incident Framing & 30-Minute Stalls
- **Walk the Five-Step Evidence Path Before Naming a Cause or Shared Fix**:
  1. **Layer**: Name the exact layer (product concept, runtime engine, agent instance, configuration/policy, runtime code, or operations)—never conflate engine/class with instance/session, and never swing to the opposite extreme when a framing is challenged.
  2. **Observation**: Read the authoritative primary source for that layer (live log/DB trace, live policy/request receipt, or `file:line`) with its `date -u` read time and exact object ID.
  3. **Hypothesis & Disconfirming Check**: Separate read facts, hypotheses, and recommendations (never present a suggestion as a user ruling). State what observation would **disprove** the hypothesis (e.g., whether earlier occurrences in the timeline predate the suspected change) and run that check first.
  4. **Boundary**: State the intended outcome, target, and blast radius—which identities, sessions, memories, or grants are touched and which must remain untouched.
  5. **Action**: Test the proposed fix against one concrete counterexample to confirm it repairs the right layer without adding unrequested gates, agent categories, or model constraints. Until the live event and governing code/config are read, label any explanation a **hypothesis** and never use it to redirect shared architecture or dispatch; when new evidence disproves a conclusion, retract affected decisions immediately.
- If any task or wait has stalled for **30 minutes or more**, stop waiting passively: read the live object directly and switch to [`../unblock/SKILL.md`](../unblock/SKILL.md) or [`../swarm-fuse/SKILL.md`](../swarm-fuse/SKILL.md).
