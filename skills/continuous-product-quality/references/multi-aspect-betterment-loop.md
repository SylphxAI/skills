# Multi-Aspect Product Betterment Loop Engineering

## Purpose

Use this reference when the job is continuous improvement of a product across
one or many aspects—UI/UX, performance, business model, game design, art/3D,
reliability, content, growth, and similar—without a false “perfect” terminal.

This reference specializes loop engineering for multi-aspect betterment. The
binding control model is
[product-quality-loop-contract.md](product-quality-loop-contract.md).

## What “loop engineering” means here

**Loop** = the **engagement** keeps running **cycle after cycle**.

```text
engagement (uncapped goal, stays active)
  cycle k:
    coverage card + VoI deepen -> C -> B + R
    if B empty and R clean: engagement idle -> goal complete
    else: execute B -> verify -> cycle Stop-Audit -> cycle k+1  (loop)
```

A **cycle** clears **B** for this research pass.  
**Loop engineering** requires opening **cycle k+1** (re-research) after B clears,
unless engagement idle is proven by a **fresh** empty re-scout.  
Completing one micro-fix or one cycle is not ending the loop.

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

## Multi-cycle engagement procedure

1. Load current contract revision; lock 1–3 north-star outcomes and non-goals.
2. Bind/resume **uncapped** harness goal (see harness-goal-binding).
3. Fill **research coverage card** (5 cells). Deepen only under VoI. Prefer ~70%
   info on Type-2 work. Open `evidence-and-claims-standard` if using SOTA language.
4. Build Candidate set **C** (card + scouts + matrix signals).
5. Score leverage; admit **B ⊆ C** = all passers under capacity (not Top-1 only).
6. Write residual **R** with EV/L and blocker class.
7. Execute **all of B** under **efficiency bar** (parallel default; shared setup
   once; serial only with dependency). `autonomous-execution` per Workstream.
8. Re-admit R→B when capacity/evidence changes; do not abandon B for random polish.
9. **Verify cadence:** original-oracle per Work terminal; one cycle outcome
   readback on exact subjects (not PR-green-as-done; not every-commit full suite).
10. **Cycle Stop-Audit** (B cleared + verify cadence + card for this cycle).
11. Emit: card, B outcomes, R, coverage deltas.
12. **Loop:** immediately start next cycle at step 3 (new coverage card / re-scout)
    **without** ending the agent turn or asking the user to approve Cycle N+1.
    Do **not** complete the harness goal here. Do **not** emit a final “Cycle N
    報告 / WORK MAY STOP” while engagement is active.
13. **Engagement idle** only if step 5–6 yield B=∅ and R has no unblocked
    high-EV after a **fresh** card — then engagement Stop-Audit + goal complete
    (if API) + **then** user-facing final status.
14. **Outer objective:** keep product/north-star engagement text; cycle B items
    are checkpoints logged in the contract, not a replacement goal.
15. **No Goal API:** still execute steps 12–13 in-process; note residual once.

## Idle frontier (no perfection)

**Cycle boundary ≠ engagement idle.**

| Event | Action |
| --- | --- |
| B cleared this cycle | Cycle Stop-Audit → **re-research (next cycle)** |
| Fresh re-research admits B=∅ and R clean | **Engagement idle** → goal may complete |
| R still has unblocked **or soft-only** high-EV | **Must not idle or end turn** — slice into B and execute |
| Only remaining high-EV is qualified external/authority wait | Hard wait: engagement ACTIVE; no goal complete; no “start cycle?” |

Engagement idle when **all** hold **after a fresh coverage card/re-scout**:

- hard floors fresh;
- B empty (no passers this research pass);
- R has no unblocked EV/L ≥ MinOutcomeDelta;
- engagement Stop-Audit package complete;
- wake triggers durable.

Idle means “no better move now under policy,” not “product is perfect,” and
**not** “we shipped one good cycle.”

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
- Treating one cycle B-clear as loop/goal complete without re-research
- Final user response after each cycle while R/high-EV remains (“點 Cycle 4?”)
- Replacing outer engagement goal with “finish this cycle”
- Soft-parking engine/multi-day work in R then stopping
- “Title-only B empty” as fake pause while outer goal incomplete
- Admitting only one high-L item while other unblocked high-L items sit ignored
- Freeze-all mega-E waterfall
- Ease-first ranking; difficulty-as-veto
- Idle while high-L residual lacks qualified blocker
- Continuous reviewer ceremony
- Research without VoI stop or coverage card
- Shallow research-as-done
- Serial busywork on independent B items
- Using DORA small-batch to forbid large product bets (small **commits**, large **B** OK)
- Waiting for 90%+ information on reversible work
- Replacing specialist methods with generic advice inside this Skill

## Minimal contract fields for multi-aspect betterment

- north-star outcomes + non-goals + MinOutcomeDelta
- research coverage card (5 cells)
- efficiency bar + verify cadence
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
