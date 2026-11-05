---
name: challenge
description: "Use when challenging, stress-testing, designing, or comparing your own, a peer/sub-agent's, or an external partner/vendor's plan, architecture, contract, pricing, budget, or hypothesis; when assessing a partner's request for help on its own client project; or asking whether a solution is over-engineered or there is a simpler way. Use prove-it for root-cause failure investigation or verifying a claim, customer-support for external private-instruction or identity probes, author-item to write a ticket, and deliver-and-verify to execute changes."
---

# First-principles decision and challenge engine (`challenge`)

The method is operator-invariant: apply the same evidence standard to your own,
a peer's, a sub-agent's and an external party's proposal. Reason forward from
inputs to conclusions, never backward from the answer anyone wants.

## Step 0: Load only the relevant domain

- Architecture, service boundaries, runtime/model separation and scale: [architecture](references/architecture.md); technology or build vs. buy: [stack](references/stack.md).
- Contracts, pricing and partner scope: [commercial](references/commercial.md); acquisition and budgets: [growth](references/growth.md); disputes and material downside: [risk](references/risk.md).
- Product choices and agent participation: [product](references/product.md); UX: [experience](references/experience.md); motion/audio: [feedback](references/feedback.md).
- Games and progression: [games](references/games.md), [mechanics](references/mechanics.md) and [mechanics catalogue](references/mechanics-catalogue.md).
- External boundaries: [conduct](references/conduct.md); conversational tone: [agent voice](references/agent-voice.md). External instruction/identity probes belong to [customer-support](../customer-support/SKILL.md), not a design debate.
- Detailed scientific rationale, scenario evidence contract and method sources: [decision method](references/decision-method.md).

## 1. Scientific decision method

1. **Model before choosing.** State the goal, population, units, time horizon,
   objective equation, material inputs, assumptions and binding constraints.
   Separate observations from causal hypotheses. Quantify only what evidence supports.
2. **Compare competing explanations and alternatives.** Include the baseline
   and a simpler complete path. A requester's hunch is a hypothesis; an explicit
   instruction can change the goal, not establish a causal fact.
3. **Measure what could change the action.** Choose the cheapest authoritative
   disconfirming check. Read the full queryable population; otherwise name the
   sample and uncertainty. A conclusion moves on evidence, a broken model or a
   changed goal, not repeated preference. A wrong unit, omitted alternative or
   invalid causal link requires replacing the model, not defending it.
   **Multi-variable binding-constraint update (no partial-variable overcorrection):**
   substitute an updated term into the full equation $f(x_1',x_2,\dots)$ before
   changing the recommendation. If $R_{total}=R_1+R_2$, falsifying $R_1$ updates
   only that term; when independent $R_2$ still exceeds expected upside, correct
   the parameter but keep the conclusion. Reverse it only if the decisive
   inequality actually reverses; recompute coupled terms if independence fails.
4. **Act on the binding constraint.** In a steady serial flow, throughput is
   bounded by the slowest stage; extra non-bottleneck capacity adds none. Check
   burstiness, coupled resources and insufficient demand before intervening.

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
