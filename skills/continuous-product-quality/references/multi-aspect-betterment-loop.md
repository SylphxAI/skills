# Multi-Aspect Product Betterment Loop Engineering

## Purpose

Use this reference when the job is continuous improvement of a product across
one or many aspects—UI/UX, performance, business model, game design, art/3D,
reliability, content, growth, and similar—without a false “perfect” terminal.

This reference does not replace
[product-quality-loop-contract.md](product-quality-loop-contract.md). It
specializes loop engineering for multi-aspect betterment and Skill composition.

## What “loop engineering” means here

Loop engineering is the design and operation of a closed control loop:

```text
intent/matrix -> observe -> decide/admit -> execute/deliver -> verify -> update coverage
                     ^                                                         |
                     +------------------- wake / next tick --------------------+
```

It is **not**:

- an immortal chat thread;
- a single global quality score;
- a meta-router over all Skills;
- a promise that the product will become perfect.

## Aspect catalog (select; do not force all)

Pick only aspects that can change product value for this subject:

| Aspect family | Example cells | Example specialist Skills |
| --- | --- | --- |
| Product definition | promise, IA, journeys, capability portfolio | `app-design-blueprint`, `game-design-blueprint`, `requirements-engineering` |
| Interaction & craft | UI states, flows, visual hierarchy, feel | `interface-craft`, `product-finish` |
| Accessibility | AT paths, semantics, exceptions | `accessibility-conformance-program-review` |
| Performance | latency, jank, budgets, low-end | `frontend-performance-remediation`, `operational-observability-review` |
| Reliability/ops | errors, recovery, SLOs, diagnosability | `operational-observability-review`, `incident-standard` |
| Security/privacy | threats, abuse, data lifecycle | `security-threat-modeling`, `privacy-data-lifecycle-review`, `product-abuse-risk-review` |
| Content/brand | accuracy, voice, localization | `voice-preserving-editor`, `documentation-standard` |
| Growth/commerce | pricing packaging, retention, ads, referrals | `saas-subscription-pricing`, `retention-cohort-review`, `ad-monetization-review`, `referral-loop-review` |
| Game systems | loops, economy, progression, soft launch | `game-design-blueprint`, `game-economy-review`, `game-soft-launch-review`, `daily-reward-and-streak-review` |
| Art/assets/3D | art direction, asset fidelity, packaging inputs | `product-asset-production`, `product-finish` |
| Architecture | seams, migrations, maintainability | `architecture-convergence`, `engineering-standard` |
| Feedback | private/public signal learning | `product-feedback-learning-loop` |

If no specialist fits, keep the finding under this loop with an explicit method
card rather than inventing a Skill mid-flight.

## Betterment classes

| Class | Meaning | Admission bias |
| --- | --- | --- |
| Hard floor | Unacceptable if failed for declared product state | Highest; still needs authority/safety |
| Objective | Declared measurable target with product value | Rank by expected value / cost / risk |
| Frontier opportunity | Better than current target while EV stays positive | Admit only under spare capacity |
| Residual | Known uncertainty/gap retained with reason | Track; do not fake green |

## One tick procedure

1. Load the current contract revision (CAS/predecessor rules as in the contract
   reference).
2. Refresh only stale or signal-hit matrix cells.
3. Convert observations → findings with dedupe keys.
4. Rank positive-net candidates; stop if capacity is saturated.
5. Admit ≤ policy WIP of Work items with specialist-friendly wording.
6. Execute or hand off each Work to durable coordination.
7. On delivery, re-run the **same** oracle against the exact subject.
8. Emit: closed findings, residuals, coverage deltas, idle/wake predicate.

## Idle frontier (no perfection)

Idle when:

- hard floors have fresh decisive evidence;
- no positive-net admitted opportunity remains under budgets;
- open critical findings are blocked only on qualified external waits;
- wake triggers are durable and explicit.

Idle means “no better move now,” not “product is perfect.”

## Composition with other loops

| Situation | Owner |
| --- | --- |
| Standing multi-aspect betterment | this Skill |
| Continuous discovery/scheduling of any Work class | `self-feeding-agent-loop` |
| Drive one admitted betterment Work to delivery terminal | `autonomous-execution` |

### Soft composition under native discovery

Naming another Skill does **not** host-enforce load order. For material
obligations, the agent must open the composed package (or rely on co-selected
descriptions). Class labels and cross-links are authoring contracts, not
portable dependency injection.

| One integrated product finish pass | `product-finish` |
| Recurring agent/Skills failure | `agent-system-improvement` |

A product defect does not automatically justify a Skill change. A Skill defect
does not automatically justify product Work.

## Anti-patterns

- “Make everything better” Work with no cell, oracle, or owner
- Collapsing UI, performance, and business model into one score
- Replacing specialist methods with generic advice inside this Skill
- Using future loop cycles to excuse shipping an unfinished candidate that
  needed a `product-finish` pass
- Building a portable Skill router or keyword dependency graph
- Claiming utilization or quality victory from install status alone

## Minimal contract fields for multi-aspect betterment

When authoring or auditing the loop contract, ensure:

- aspect selection rationale and `not_applicable` reasons;
- oracle + freshness per applicable cell;
- scout signals per aspect family;
- admission EV function and WIP caps;
- specialist handoff language examples;
- idle frontier predicate and wake catalog;
- residual register (what is known-not-yet-worth-fixing).

## Harness Goal System (recovery)

If the agent harness provides a Goal System, betterment loops **must** bind an
**uncapped** goal at start and resume it every tick so accidental stops recover
into the same engagement. See
[harness-goal-binding.md](harness-goal-binding.md).

Goals do not replace product Work authority, delivery proof, or specialist
methods. They only preserve the loop objective across harness interruptions.

