# Multi-Aspect Product Betterment (cycle reference)

## Purpose

Use when continuous improvement of a product spans one or many aspects—UI/UX,
performance, business model, game design, art/3D, reliability, content, growth—
without a false “perfect” terminal.

Binding control fields:
[product-quality-loop-contract.md](product-quality-loop-contract.md).  
Multi-cycle continuity:
[betterment-engagement-runner.md](https://github.com/SylphxAI/skills/blob/main/docs/reference/betterment-engagement-runner.md)
(ADR-20260803).

## Layers (do not collapse)

```text
Outer engagement motor: agent-set FIXED uncapped continuity Goal (host auto-continue while active)
  while not engagement_idle:
      one cycle (this Skill method)
      next cycle in-process and/or Goal continuation at turn boundary

One cycle:
  coverage card + VoI deepen -> C -> B + R
  if B empty after honest re-scout: hard_wait | idle (Goal complete only if idle)
  else: execute all B -> verify -> short log -> next cycle
```

A **cycle** clears **B** for this research pass.  
**Loop engineering** = Goal stays active across cycles until engagement idle.  
Automation re-kick is fallback when Goal API is absent—not the default on Codex.

It is **not**:

- an immortal chat thread;
- a single global quality score;
- a meta-router over all Skills;
- continuous independent reviewers on every tick;
- a freeze-all waterfall of every idea forever;
- a promise of product perfection.

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
| Content/brand | accuracy, voice, localization | `documentation-standard` |
| Growth/commerce | pricing packaging, retention, ads, referrals | `saas-subscription-pricing`, `retention-cohort-review`, `ad-monetization-review`, `referral-loop-review` |
| Game systems | loops, economy, progression, soft launch | `game-design-blueprint`, `game-economy-review`, `game-soft-launch-review`, `daily-reward-and-streak-review` |
| Art/assets/3D | art direction, asset fidelity, packaging inputs | `product-asset-production`, `product-finish` |
| Architecture | seams, migrations, maintainability | `converge-architecture`, `engineering-standard` |
| Feedback | private/public signal learning | `run-product-feedback-loop` |

If no specialist fits, keep the item under this loop with an explicit method
card rather than inventing a Skill mid-flight.

## Betterment classes

| Class | Meaning | Admission bias |
| --- | --- | --- |
| Hard floor | Unacceptable if failed for declared product state | Highest; still needs authority/safety |
| Objective | Declared measurable north-star / target | Rank by leverage L |
| Frontier opportunity | Closes claim-grade frontier gap; EV ≥ MinOutcomeDelta | Into B if capacity; else R with reason |
| Polish residual | Below MinOutcomeDelta cosmetic | R or reject; not B |

## Leverage (normative sketch)

```text
L = (expected_outcome_or_frontier_gap_delta × weight × confidence)
    / full_lifecycle_cost
```

- Full cost includes implementation, integration, verification, operation,
  collision, and recovery—not “typing effort” alone.
- **Difficulty alone does not disqualify.**
- **Ease alone must not promote** micro-polish over higher-L harder bets.

## Admission in one cycle

1. Build coverage card (five cells from contract).
2. Enumerate candidates across selected aspects.
3. Score L; drop below MinOutcomeDelta.
4. Admit **all** capacity-feasible passers into **B** (not Top-1).
5. Park only with **qualified** blockers; soft cost → L0 slice into B.
6. Execute all B; verify; write state for the outer runner.

## Anti-patterns (cycle level)

- Aspect tourism with no admission impact
- Ease-first ranking
- One-item B while nine passers exist
- Soft-parking high-EV as “engine later” without L0
- Treating cycle B-clear as product done
