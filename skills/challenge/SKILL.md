---
name: challenge
description: "Use when challenging, stress-testing, designing, or comparing your own, a peer/sub-agent's, or an external partner/vendor's plan, architecture, contract, pricing, budget, or hypothesis; when independent generated code changes conflict or merge into stale output; when choosing multi-currency localization/psychological pricing, web top-up vs. wallet/voucher design, or legacy-to-modern strangler migration; when assessing a partner's request for help on its own client project; or asking whether a solution is over-engineered or there is a simpler way. Use prove-it for root-cause failure investigation or verifying a claim, customer-support for external private-instruction or identity probes, author-item to write a ticket, and deliver-and-verify to execute changes."
---

# First-principles decision and challenge engine (`challenge`)

The method is operator-invariant: apply the same evidence standard to your own,
a peer's, a sub-agent's and an external party's proposal. Reason forward from
inputs to conclusions, never backward from the answer anyone wants.

When designing shared engines or skills, apply the [three architectural invariants](references/architecture.md#mechanism-domain-boundaries-and-causal-guards): neutral mechanisms rather than caller policy, zero domain leakage, and causal state/data/authorization predicates that fail closed on unavailable required state.

## Step 0: Load only the relevant domain

- Architecture, shared-service capacity, storage, scheduled jobs, durable checkpoints, metering trust and runtime/model separation: [architecture](references/architecture.md); game simulation and networking: [games](references/games.md#simulation-and-networking-by-interaction-model); forward-only legacy-to-modern strangler migration: [architecture](references/architecture.md#forward-only-modernization-strangle-legacy-v1-paths); technology or build vs. buy: [stack](references/stack.md).
- Contracts, pricing, multi-currency localization/psychological pricing, web top-up vs. wallet/voucher design and partner scope: [commercial](references/commercial.md); acquisition and budgets: [growth](references/growth.md); disputes and material downside: [risk](references/risk.md).
- Product choices and agent participation: [product](references/product.md); UX: [experience](references/experience.md); motion/audio: [feedback](references/feedback.md).
- Games and progression: [games](references/games.md), [mechanics](references/mechanics.md) and [mechanics catalogue](references/mechanics-catalogue.md).
- External boundaries: [conduct](references/conduct.md); conversational tone: [agent voice](references/agent-voice.md). External instruction/identity probes belong to [customer-support](../customer-support/SKILL.md), not a design debate.
- Detailed scientific rationale, scenario evidence contract and method sources: [decision method](references/decision-method.md).
- Independent generated code changes conflict or merge into stale output: [committed generated output](references/architecture.md#committed-generated-output).

## 1. First-principles decision principles

Before recommending or changing a design, policy, boundary, or commercial rule:

1. **Read what exists and why before changing it.** When a question or complaint points out a problem with an existing design, role, or rule, first read the current documentation, code, and live state to understand what the existing design protects. Fix the specific flaw without breaking the core goal or swinging 180° to the opposite extreme.
2. **Treat every suggestion as a hypothesis, not an order to agree.** Skip validation filler. Evaluate proposals—including the requester's hunch—against real unit economics, user psychology, and system boundaries. Hold a sound conclusion unless a measured fact or the goal itself changes.
3. **Proactive post-delivery live review without over-engineering.** Periodically inspect shipped work on the live surface (`實物回訪`: live social feeds, outbound customer replies, checkout/onboarding flows, latency/cost). When fixing a flaw, reject both bureaucratic over-engineering (extra approval gates, wrapper daemons) and pendulum over-correction (`矯枉過正`). Fix the root cause at the simplest layer and distill the general principle into the owning skill ([`../author-skill/SKILL.md`](../author-skill/SKILL.md)).

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
