---
name: self-challenge
description: "Use when designing, comparing, or reviewing a system architecture, service boundary, data model, technology stack, or product spec; when stress-testing a plan, commercial contract, reseller/partner agreement, pricing model, marketing/ad budget, risk assessment, or vendor/build-vs-buy choice; or when asking 'are we over-engineering / over-building this?' or 'is there a simpler way?'. Also use before claiming a root cause or when a task has stalled for 30+ minutes. Load this skill and its matching reference (architecture, stack, commercial, growth, product, experience, games, risk, conduct, agent-voice) to enforce our opinionated methodology: Simple Concept / Deep Implementation, 10x/100x Scale, Scale-to-Zero, Single Source of Truth (SSOT), SOTA Category-Leader benchmarks, Upstream-First boundary purity, and quantitative 5x5 risk scoring. Use author-item to write a work ticket; use deliver-and-verify to execute code changes; use prove-it to review a PR diff or verify live status."
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

Evaluate every architecture, plan, product spec, commercial deal, or budget against these five tests:

1. **Test A — Category-Leader Benchmark (SOTA) & Live Primary Source**:
   - Name the **category leader** (the top product, service, or open standard in that space). When a design depends on an external specification, protocol, law, vendor API, or paper, carry a **dated read of the primary source from the current session**—never rely on training memory.
   - Ask: *"Does our target match or beat the category leader on every user-visible dimension, or are we settling for a weaker step?"*
   - On AI/agent systems, use external papers for benchmark metrics and failure classes only—never copy multi-step prompt/planner scaffolding built as crutches for older, weaker models ([references/product.md](references/product.md)).
   - *(Skip Test A for routine internal chores or mechanical bug fixes.)*
2. **Test B — Simple Concept, Powerful & Deep Implementation (Zero Unrequested Mechanisms)**:
   - Ask: *"What happens if we delete this part? How do we get the most value from the least resources?"*
   - Keep the external concept and user interface minimal (zero-config, zero-knowledge by default); keep the internal implementation deep (a narrow public interface over substantial, deterministic logic).
   - Reject every self-imposed limit, unrequested throttle, hand-built queue, approval gate, compatibility wrapper, or speculative abstraction that has no witnessed failure behind it.
3. **Test C — Plan for 10x/100x Scale, Scale-to-Zero, and Single Source of Truth (SSOT)**:
   - **10x / 100x Design**: State how the data model, partition key, and stateless edge hold at **10x and 100x** current load, and name what breaks first. (Size actual hardware capacity from measured physical utilization such as p95 CPU/memory/I/O, never from uncalibrated bookings.)
   - **Nothing Runs Always-On**: Every service, worker, and job starts on demand and scales to zero when idle; fix slow cold starts at image pull/startup rather than paying for warm idle floors.
   - **Single Source of Truth (SSOT)**: Every setting, price, model ID, schema, and rule has exactly one authoritative home; all other surfaces derive from it. Delete duplicate sources immediately.
4. **Test D — Upstream-First vs Upstream Purity (Boundary Law)**:
   - **Fix Upstream, Not Downstream**: When a problem or capability gap sits in an upstream we own (engine, platform, shared SDK/skill), fix or build the generic capability in the upstream—never hack a bypass in the downstream consumer.
   - **Upstream Purity (Customer Zero, No Backdoors)**: Ask: *"Would this upstream change make complete sense for an unrelated external tenant?"* First-party apps are ordinary customers (`Customer Zero`): never put downstream product names, business rules, privilege bypasses, or backdoors into an upstream layer. Dependencies flow strictly one way (downstream depends on published upstream versions).
5. **Test E — One-Shot Direct Path & Launch Convergence (Scope Hammering)**:
   - **Complete Replacement**: Reach the end state in one delivery—update all callers and delete the superseded path, flags, and docs in the same change.
   - **Scope Hammering for Launches**: If a product or cutover is struggling to converge, lock a **finite, burn-down-only checklist** of what a real user needs to complete the core value loop (or parity sheet). Hammer every nice-to-have and side discovery to post-launch.

---

## 2. Applying the Challenge by Scenario

### Scenario 1 — Designing or Comparing Architectures / Technical Specs
- Check `references/architecture.md` and `references/stack.md`.
- Verify vertical slices with a pure core (zero I/O in domain logic) and imperative shell, event-driven primary paths (no polling loops), durable ownership of accepted requests (never tell the user to retry an internal fault), and `Test B / C / D` above.

### Scenario 2 — Evaluating a Commercial Contract, Budget, Vendor, or Growth Plan
- Check `references/commercial.md`, `references/growth.md`, and `references/risk.md`.
- Compute unit economics (net margin after store/payment fees, CAC vs LTV, downside exposure) and score every legal, tax, or commercial risk quantitatively by `likelihood (1–5) × impact (1–5)`. Never block on an unscored hypothetical risk; flag one-way doors (new spend, irreversible deletion, or unapproved commitments) with one recommended option.

### Scenario 3 — Root-Cause Claims & 30-Minute Stalls
- Before claiming a root cause, cite one concrete observation from a single failing job, request, or pod, and state what observation would **disprove** your hypothesis. Run the disconfirming check first (or label the claim as an unverified hypothesis).
- If any task or wait has stalled for **30 minutes or more**, stop waiting passively: read the live object directly and switch to [`../unblock/SKILL.md`](../unblock/SKILL.md) or [`../swarm-fuse/SKILL.md`](../swarm-fuse/SKILL.md).
