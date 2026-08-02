# Multi-Aspect Product Betterment Loop Engineering

## Purpose

Use this reference when the job is continuous improvement of a product across
one or many aspects—UI/UX, performance, business model, game design, art/3D,
reliability, content, growth, and similar—without a false “perfect” terminal.

This reference specializes loop engineering for multi-aspect betterment. The
binding control model is
[product-quality-loop-contract.md](product-quality-loop-contract.md).

## What “loop engineering” means here

```text
outcomes + frontier map
  -> Candidate C
  -> admit backlog B + residual R
  -> execute all of B (parallel OK)
  -> re-admit as evidence/capacity changes
  -> outcome readback + Stop-Audit
  -> idle or wake
```

A **cycle** clears **B** (or legally rejects items) and proves residuals in **R**
cannot justify more Work under policy. Completing one micro-fix is not a cycle.

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
| Content/brand | accuracy, voice, localization | `voice-preserving-editor`, `documentation-standard` |
| Growth/commerce | pricing packaging, retention, ads, referrals | `saas-subscription-pricing`, `retention-cohort-review`, `ad-monetization-review`, `referral-loop-review` |
| Game systems | loops, economy, progression, soft launch | `game-design-blueprint`, `game-economy-review`, `game-soft-launch-review`, `daily-reward-and-streak-review` |
| Art/assets/3D | art direction, asset fidelity, packaging inputs | `product-asset-production`, `product-finish` |
| Architecture | seams, migrations, maintainability | `architecture-convergence`, `engineering-standard` |
| Feedback | private/public signal learning | `product-feedback-learning-loop` |

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
- Compose `decision-quality-standard` when ranking or stopping.

## One cycle procedure

1. Load current contract revision; lock 1–3 north-star outcomes and non-goals.
2. Bind/resume **uncapped** harness goal (see harness-goal-binding).
3. Deep research with **VoI stop**: stop when more research will not change B
   ranking or idle verdict enough to justify delay. Open
   `evidence-and-claims-standard` for any SOTA/frontier language.
4. Build Candidate set **C** (opportunity inventory + matrix signals).
5. Score leverage; admit **B ⊆ C** = all items that pass MinOutcomeDelta, positive
   L, authority, and capacity envelope (many items OK—do not admit only Top-1).
6. Write residual **R** for the rest with EV/L and blocker class.
7. Execute **all of B** (parallel workstreams OK; small engineering commits OK).
   Use `autonomous-execution` per Workstream terminal.
8. Re-admit R→B when capacity frees or evidence changes; do not abandon B for a
   fresh random polish scout.
9. Original-oracle readback per Work; cycle-level outcome/frontier readback on
   exact delivered subjects.
10. **Stop-Audit** package; only then idle / `update_goal(complete)`.
11. Emit: B outcomes, R register, coverage deltas, idle/wake predicate.

## Idle frontier (no perfection)

Idle when **all** hold:

- hard floors have fresh decisive evidence;
- B is empty or remaining B items are Stop-Audit rejected with falsifiable reasons;
- R has no unblocked item with EV/L ≥ MinOutcomeDelta;
- Stop-Audit tests pass (see contract);
- wake triggers are durable and explicit.

Idle means “no better move now under policy,” not “product is perfect.”

## Reviewer policy

- **No continuous independent reviewers** inside the operating loop.
- Always-on discipline: oracles, residual register, Goal complete gate, Stop-Audit.
- Independent review only for: irreversible/public-contract authority;
  load-bearing SOTA claims; **contested** Stop-Audit.

## Composition with other loops

| Situation | Owner |
| --- | --- |
| Standing multi-aspect betterment | this Skill |
| Continuous discovery/scheduling of any Work class | `self-feeding-agent-loop` |
| Drive one admitted Workstream to delivery terminal | `autonomous-execution` |
| One integrated product finish pass | `product-finish` |
| Recurring agent/Skills failure | `agent-system-improvement` |

### Soft composition under native discovery

Naming another Skill does **not** host-enforce load order. For material
obligations, open the composed package (or rely on co-selected descriptions).

## Anti-patterns

- “Make everything better” with no outcome, oracle, or owner
- Collapsing UI, performance, and business model into one score
- Micro-polish thrash (many commits, no user-visible Δ)
- Treating one Work land as cycle/goal complete
- Admitting only one high-L item while other unblocked high-L items sit ignored
- Freeze-all mega-E waterfall
- Ease-first ranking; difficulty-as-veto
- Idle while high-L residual lacks qualified blocker
- Continuous reviewer ceremony
- Research without VoI stop
- Using DORA small-batch to forbid large product bets (small **commits**, large **B** OK)
- Replacing specialist methods with generic advice inside this Skill

## Minimal contract fields for multi-aspect betterment

- north-star outcomes + non-goals + MinOutcomeDelta
- aspect selection rationale and `not_applicable` reasons
- oracle + freshness per applicable cell
- Candidate/B/R fields and re-admission rules
- Stop-Audit checklist and idle predicate
- specialist handoff language examples
- wake catalog
- residual register (known-not-yet-worth or blocked)

## Harness Goal System (recovery + termination)

Betterment cycles **must** bind an **uncapped** goal when the API exists, encode
idle DoD + EV policy + contract pointer, and complete **only** with a Stop-Audit
evidence package. See [harness-goal-binding.md](harness-goal-binding.md).
