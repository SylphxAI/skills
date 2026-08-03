# Harness Goal Binding for Product Betterment

## Purpose

Many agent harnesses expose a **Goal System** that persists objectives across
turns and can auto-continue after an accidental stop. Continuous product
betterment should use that system **when present** so the **outer engagement**
is not lost when a session dies mid-cycle, and so `complete` cannot be claimed
without idle evidence.

This is **harness recovery + termination gate**, not the multi-cycle motor and
not product Work authority. Enact (when available) still owns Work/claims/runs;
Git owns source; delivery systems own deploy/live proof. Goal status write is
**not** automatic evidence verification—attach Stop-Audit material in durable
contract/output.

Multi-cycle continuity owner:
[betterment-engagement-runner.md](https://github.com/SylphxAI/skills/blob/main/docs/reference/betterment-engagement-runner.md)
(ADR-20260803). Missing Goal API → rely on runner + state; note residual once.

## Outer objective only

The goal `objective` is the **outer engagement** (product outcomes / betterment
north-stars). **Illegal:** setting or completing a goal whose sole meaning is
“finish cycle 3” or “land B8–B10.” Cycle backlogs live in the contract/state;
goal text stays outer until **engagement idle**.

## Rule: uncapped betterment goals

When the runtime provides goal APIs:

| Step | Action |
| --- | --- |
| Start / resume | `get_goal`. If none or wrong objective, `create_goal` |
| Budget | **Omit budget caps** (Codex: omit `token_budget`) unless user sets one |
| Resume | Runner/agent reads goal + state; continues same engagement |
| Complete | Only when state.status == `idle` (fresh re-scout B=∅ + R clean + Stop-Audit) |
| Blocked | Only after harness strict blocked audit (repeated hard impasse) |

**Do not** attach a token/time budget “for safety” by default. A budget cap
stops recovery precisely when long betterment needs continuation.

## Objective string contract

The goal `objective` must be self-contained for recovery. Include:

1. **Job:** high-leverage continuous product betterment (not one bug/polish pass)
2. **Product identity:** repo/product/release/surfaces in scope
3. **North-star outcomes (1–3)** and explicit non-goals
4. **Aspect set** / matrix families in scope
5. **EV policy:** MinOutcomeDelta; leverage ranking (not ease-first)
6. **Research:** 5-cell coverage card each cycle; VoI stop; ~70% on Type-2
7. **Continuity:** multi-cycle via outer runner + state path; Goal is insurance
8. **Definition of Done / engagement idle:** floors fresh; **fresh** card shows
   B=∅; R has no unblocked EV ≥ threshold; verify cadence on last cycle;
   engagement Stop-Audit passed—**not** product perfection, **not** “one cycle done”
9. **Validation gates:** per-Work original-oracle; per-cycle outcome readback
10. **Contract/state pointer:** Product Quality Loop Contract revision + state path
11. **Authority floors:** no meta-router; no invented credentials/deploy

## Per-cycle Goal hygiene

```text
get_goal
  if missing/wrong -> create_goal(outer_objective, no budget)
run one continuous-product-quality cycle
write engagement state
  if status == idle -> update_goal(complete) with Stop-Audit pointer
  else -> leave goal ACTIVE (do not complete)
```

## Anti-patterns

| Anti-pattern | Correct |
| --- | --- |
| Goal text = “Cycle 3: B8–B10” | Outer product outcomes only |
| `update_goal(complete)` after B-clear | Complete only at engagement idle |
| Budget cap “to save tokens” by default | Uncapped unless user sets budget |
| Treat missing Goal API as stop | Runner + state continue; residual note |
| Expect Goal API to re-kick without runner | Goal is insurance; runner is motor |
| “Cycle report, 要開 Cycle N+1?” as control | State + runner re-invoke |

## Residual when Goal API absent

Record once in state/contract: `goal_api=unavailable`. Continue with runner and
durable state. Do not invent a fake Goal store.
