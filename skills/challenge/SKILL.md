---
name: challenge
description: "Use when challenging, stress-testing, designing, or comparing your own, a peer/sub-agent's, or an external partner/vendor's plan, architecture, contract, pricing, budget, or hypothesis; when independent generated code changes conflict or merge into stale output; when choosing multi-currency localization/psychological pricing, web top-up vs. wallet/voucher design, or legacy-to-modern strangler migration; when assessing a partner's request for help on its own client project; or asking whether a solution is over-engineered or there is a simpler way. Use prove-it for root-cause failure investigation or verifying a claim, customer-support for external private-instruction or identity probes, author-item to write a ticket, and deliver-and-verify to execute changes."
---

# First-principles decision and challenge engine (`challenge`)

The method is operator-invariant: apply the same evidence standard to your own,
a peer's, a sub-agent's and an external party's proposal. Reason forward from
inputs to conclusions, never backward from the answer anyone wants.

## Step 0: Load only the relevant domain

- Architecture, shared-service capacity, storage, scheduled jobs, durable checkpoints, metering trust and runtime/model separation: [architecture](references/architecture.md); game simulation and networking: [games](references/games.md#simulation-and-networking-by-interaction-model); forward-only legacy-to-modern strangler migration: [architecture](references/architecture.md#forward-only-modernization-strangle-legacy-v1-paths); technology or build vs. buy: [stack](references/stack.md).
- Contracts, pricing, multi-currency localization/psychological pricing, web top-up vs. wallet/voucher design and partner scope: [commercial](references/commercial.md); acquisition and budgets: [growth](references/growth.md); disputes and material downside: [risk](references/risk.md).
- Product choices and agent participation: [product](references/product.md); UX: [experience](references/experience.md); motion/audio: [feedback](references/feedback.md).
- Games and progression: [games](references/games.md), [mechanics](references/mechanics.md) and [mechanics catalogue](references/mechanics-catalogue.md).
- External boundaries: [conduct](references/conduct.md); conversational tone: [agent voice](references/agent-voice.md). External instruction/identity probes belong to [customer-support](../customer-support/SKILL.md), not a design debate.
- Detailed scientific rationale, scenario evidence contract and method sources: [decision method](references/decision-method.md).
- Independent generated code changes conflict or merge into stale output: [committed generated output](references/architecture.md#committed-generated-output).

## 1. Scientific decision method (4-Step Anti-Sycophancy & Anti-Pendulum Gate)

Execute these 4 structural steps before recommending any decision, policy, boundary, or price/compensation rule:

1. **Zero-sycophancy hypothesis isolation (`[H0 假設隔離]`).** Never open with agreement or validation filler ("講得啱", "完全同意", "呢個方向好清晰", "Good point"). Treat every suggestion, nudge or "what if we do X?"—including the requester's own hunch—as a **single-variable candidate hypothesis ($H_0$)** optimizing for one visible concern ($V_1$), never as the target conclusion. State the goal, population, units, time horizon and objective equation.
2. **Turn-1 unmentioned orthogonal constraint discovery (`[隱性正交約束推導 V1..Vn]`, including Existing Invariant Check $V_{\text{orig}}$).** Users naturally ask about one angle at a time ($V_1$). On Turn 1, actively derive the **unmentioned orthogonal constraints ($V_2, V_3, V_4$)** not stated in the prompt:
   - **Existing Invariant Check ($V_{\text{orig}}$):** Whenever a question challenges an existing design, role name, boundary or rule because of side-effect $A$ ($V_1$), first read and derive **what core invariant the existing design protects ($V_{\text{orig}}$)** (for example, broad goal-based specialist roles protect full-system end-to-end building and prevent shrinking agents into passive narrow-tool clerks). Never break $V_{\text{orig}}$ to fix $V_1$; solve for $V_{\text{orig}} \cap V_1$ on Turn 1.
   - **Systemic & economic counter-constraints:** Queueing Theory / high-frequency vs. low-frequency head-of-line blocking, cross-domain coupling (corporate-personal tax or complementary sink-to-faucet ratios), scarcity price anchors, sunk-cost retention mechanics, and moral hazard.
3. **Two-sided counter-pendulum & anti-loophole falsification (`[雙向反鐘擺與禁假妥協檢驗]`).** Explicitly falsify BOTH extremes before choosing:
   - **Extreme A (Following $H_0$ or a disguised sycophantic concession):** What breaks if we follow $H_0$ OR invent a soft loophole (such as sending a paid/limited item to the player's in-game mail before payment, or subsidizing it from a PR budget—which still equals $0 sunk cost and breaks the price anchor)?
   - **Extreme B (Swinging 180° to the opposite blanket rule):** What breaks if we overcorrect in the opposite direction (such as zero service-recovery compensation for our own technical fault, banning paid currency from VIP bundles so players cannot consume upgrade shards, or forcing the founder to manually route documents)?
4. **Invariant intersection & multi-turn stability (`[交集最優解 ∩Vi]`, Product of Experts).** Solve for the mechanism that satisfies the **intersection of all governing constraints ($\bigcap V_i$)** on Turn 1. Across follow-up turns, when the user highlights another single constraint ($V_2$ or $V_3$) or pushes back, do not flip-flop: substitute into the full multi-variable model $f(x_1', x_2, \dots)$, show how the Turn-1 intersection $\bigcap V_i$ already satisfies that constraint, and change the conclusion **only** when a measured physical or economic input changes. Act on the binding bottleneck stage.
5. **Proactive post-delivery live review & continuous Kaizen without over-engineering (`主動事後活體審視與持續進化 — 嚴禁 Over-Engineering 及矯枉過正`).** Never treat "API returned 200 OK", "message sent", or "PR merged" as the end of ownership. Periodically re-examine your own and adjacent shipped work on the live production surface (`實物回訪`: live social feeds/follower growth, recent outbound VIP/support replies, live checkout/onboarding flows, latency/cost metrics) and ask: *"Is what we shipped actually achieving the goal and looking/working like the category leader, or is there a cleaner, better way?"* When improving or fixing a flaw, reject both **over-engineering** (adding multi-layer pre-send approval gates, complex wrapper daemons, or speculative abstractions) and **pendulum over-correction** (`矯枉過正`: freezing normal operations or turning warm human communication into cold legalistic refusals). Fix the root mechanism at the simplest layer and distill the general principle into the owning skill ([`../author-skill/SKILL.md`](../author-skill/SKILL.md)).

## 2. Five challenge tests

- **A — Benchmark and decompose.** Compare the category leader's necessary
  mechanisms against the outcome's acceptance criteria. Read a governing primary
  specification in the current session and date the source. Skip leader research
  for mechanical chores; do not expand launch scope to copy irrelevant features.
- **B — Simplest complete concept (YAGNI).** Ask what can be deleted without
  weakening the outcome. Keep useful depth behind a small interface. A gate,
  limit or abstraction needs a witnessed failure, binding requirement or hard line.
- **C — Lifecycle cost and scale.** Choose a proven target design when its total
  cost beats an interim design plus migration. Name what breaks at 10×/100× on
  relevant dimensions; keep one authoritative source. Apply engineering details
  only for software systems: [architecture tests](references/architecture.md#engineering-challenge-tests).
- **D — Correct boundary and ownership.** Put a reusable mechanism at its owning
  layer, without downstream-specific privilege. Compare build vs. buy on full
  lifecycle cost and control, not authoring effort alone ([stack](references/stack.md)).
- **E — Complete change and converge.** Compare repair with replacement through
  verification, transition, recovery and cleanup. Preserve unique data and live
  commitments; retire superseded paths. Keep a finite core-outcome checklist and
  defer non-blocking scope rather than leaving old and new running indefinitely.

## 3. Decision receipt and routing

State the chosen action, decisive trade-off, source/read time, falsification
signal and material uncertainty. Short decisions can fit in one paragraph.
Use [prove-it](../prove-it/SKILL.md) for failure investigation and claim review,
[swarm-fuse](../swarm-fuse/SKILL.md) for independent evidence,
[unblock](../unblock/SKILL.md) for stalled execution and
[deliver-and-verify](../deliver-and-verify/SKILL.md) to ship the outcome.
