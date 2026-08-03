---
name: continuous-product-quality
description: "High-leverage product betterment under an uncapped Goal: coverage card, admit all B, residual R, execute, verify; keep cycling until engagement idle."
---

# Continuous Product Quality

Close user/business-visible product gaps with **high leverage**, not cosmetic commit thrash.

**Primary class:** `workflow`.  
See [ADR-20260801](https://github.com/SylphxAI/skills/blob/main/docs/adr/ADR-20260801-package-classes-and-standard-composition.md).

## Continuity (Codex / Goal-first)

On harnesses with a **Goal System** (Codex):

| Layer | Owner |
| --- | --- |
| **Multi-turn loop motor** | **Uncapped Goal** — host continues an idle thread while the Goal is active |
| **Cycle quality** | This Skill (card → B → execute → verify → honest idle/complete) |
| **Durable notes** | Optional state/contract log in the product repo |
| **Automation / manual re-kick** | **Fallback only** when Goal API is missing or broken |

**Do not** tell the operator to set up heartbeat automation as the default path.  
**Do not** demote Goal to “insurance only” when Goal API exists.

Official Codex Goals behavior (summary): after a turn finishes, if the thread is idle, the Goal is active, and budget allows, the host can **continue** from latest state until success, pause, clear, interruption, budget limit, or a true blocker. Reaching a budget limit is **not** completion. Continuation that makes **no tool call** can suppress the next auto-continue—so keep doing real work with tools, not essay-only turns.

### Required Goal bind (when API present)

When the user invokes continuous betterment / loop engineering (this Skill, `$continuous-product-quality`, or equivalent explicit request):

1. `get_goal`
2. If missing or wrong objective → `create_goal` with the **outer product objective**
3. **Omit `token_budget`** unless the user set a budget (uncapped by default)
4. Never rewrite the Goal to “finish cycle N” / “ship B8–B10”
5. `update_goal(complete)` **only** at **engagement idle** with Stop-Audit evidence
6. `update_goal(blocked)` only after the harness’s repeated hard-impasse rule

Missing Goal API: note residual once; continue multi-cycle **in-process with tools** as far as the host allows; operator re-kick is last resort—not the happy path.

## Units

| Unit | Meaning |
| --- | --- |
| **Engagement** | Outer product betterment under one uncapped Goal. Ends only at engagement idle. |
| **Cycle** | Coverage card → Candidate **C** → admit **B** + **R** → execute **all of B** → verify → cycle log |
| **B** | All capacity-feasible above-threshold items this cycle (many OK) |
| **R** | Not-in-B items with EV + honest blocker |
| **Engagement idle** | Fresh re-scout: **B=∅** and R has no unblocked EV ≥ MinOutcomeDelta |

Clearing B ends a **cycle**, not the Goal. After a cycle, **immediately start the next cycle** (new card → C → B) while the Goal is active—prefer same turn when context allows; Goal auto-continue covers turn boundaries.

## Outer objective vs cycle

| Layer | Stop? |
| --- | --- |
| Outer engagement / Goal objective | Only at engagement idle |
| One cycle | Checkpoint only—never Goal complete |

## Method

1. **Bind Goal** (uncapped outer objective) when API present.
2. **Coverage card** (five cells) + VoI deepen until admission won’t change.
3. **Admit all** capacity-feasible passers into **B** (not Top-1). Overflow → R with `capacity`.
4. **Soft blockers are not stops:** multi-day / hard / engine / “not title-only” → slice L0 into B now.
5. **Execute all of B** (parallel default for independent items).
6. **Verify:** original-oracle per B item; one outcome/north-star readback for the cycle.
7. **Cycle log** (short). Do **not** ask “要開 Cycle N+1 嗎？”
8. If not idle → **next cycle** (tools keep going). If idle → Stop-Audit → `update_goal(complete)`.

```text
create/resume uncapped Goal (outer product outcomes)
while Goal active:
  card → C → admit all high-L into B (soft → L0 slice)
  if B empty and R clean after fresh re-scout:
    engagement Stop-Audit → update_goal(complete) → stop
  if B empty and only qualified external/authority blockers:
    update_goal(blocked) only if harness blocked-rule met; else hard-wait honestly
  else:
    execute all B → verify → short cycle log → next cycle
```

## Qualified blockers (may park high-EV in R)

| Class | Example |
| --- | --- |
| `external_wait` | Human-only browser visual OK; missing credentials |
| `authority_pending` | Explicit approval already requested |
| `dependency_blocked` | Upstream not under this engagement |
| `safety_hold` | Irreversible/live risk without authority |

**Not** qualified alone: multi-day, expensive, hard, missing Goal API, “polish later,” desire to write a long cycle report.

## Non-negotiable laws

1. Outcomes over activity; commit count ≠ progress.
2. Coverage card before admit; decision-complete, not omniscient.
3. `L = (Δ outcome/frontier × weight × confidence) / full_lifecycle_cost`
4. MinOutcomeDelta — below threshold stays out of B.
5. All passers into B; not Top-1 only.
6. Parallel default for independent B items.
7. Evidence before claims; local green ≠ betterment.
8. B clear ≠ Goal complete; re-cycle until idle.
9. Goal complete only at engagement idle with evidence.
10. No continuous independent reviewers (except irreversible/public-contract, load-bearing SOTA, contested idle).
11. No meta-router; native discovery only.
12. Goal is the multi-turn motor when present—not optional insurance, not automation-first.

## Anti-patterns

- Micro-polish thrash; hundreds of commits with no user-visible Δ
- One-cycle-and-stop / Goal complete after B-clear
- End-turn “要我開 Cycle N+1 嗎？” while Goal active
- Soft-parking high-EV then idling
- Essay-only turns with **no tools** (can kill Goal auto-continue)
- Setting a token budget “for safety” by default
- Telling the user automation/heartbeat is required when Goal works
- Redefining Goal text as the current cycle backlog

## When not to use

- Single bug / one-shot edit → direct fix / `autonomous-execution`
- One release-grade finish pass → `product-finish`
- Continuous any-Work OS without product matrix → `self-feeding-agent-loop`

## Compose with

| Need | Skill |
| --- | --- |
| Decision / stop quality | `decision-quality-standard` |
| SOTA / frontier claims | `evidence-and-claims-standard` |
| One Workstream delivery | `autonomous-execution` |
| Land/live proof | `delivery-standard` |
| Live Enact | `enact-work-coordination` |
| Domain method | matching specialist Skill |

## Read when needed

- [references/product-quality-loop-contract.md](references/product-quality-loop-contract.md)
- [references/multi-aspect-betterment-loop.md](references/multi-aspect-betterment-loop.md)
- [references/harness-goal-binding.md](references/harness-goal-binding.md)
- [docs/reference/betterment-engagement-runner.md](https://github.com/SylphxAI/skills/blob/main/docs/reference/betterment-engagement-runner.md) — fallback hosts + state schema
