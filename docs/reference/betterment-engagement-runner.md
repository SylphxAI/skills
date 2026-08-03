# Betterment engagement runner (outer loop)

Companion to
[ADR-20260803-betterment-outer-loop-vs-cycle-method](../adr/ADR-20260803-betterment-outer-loop-vs-cycle-method.md).

This is the **continuity** contract. The Skill teaches **one cycle**. This doc
describes how **many cycles** run without pretending Skill prose is a scheduler.

## Layers

```text
Outer harness (this doc)
  while not engagement_idle(state):
      invoke agent with: outer brief + state + continuous-product-quality (cycle method)
      agent writes state delta + optional git commit
      optional: Goal resume if session died mid-cycle

Inner host agent loop (Codex/Claude/…)
  tools until model emits final text for THIS invoke

Cycle method skill
  card → C → B/R → execute → verify → cycle log in state
```

## Engagement state (minimal schema)

Durable file in the product repo (path chosen by product), e.g.
`docs/specs/*-betterment-state.json` or markdown with stable headings.

| Field | Meaning |
| --- | --- |
| `engagement_id` | Stable id |
| `outer_objective` | Product north-stars / commercial bar (not “cycle 3”) |
| `status` | `active` \| `hard_wait` \| `idle` |
| `cycle` | Monotonic integer |
| `coverage_card` | Last 5-cell card summary |
| `B` | Current admitted items (ids, acceptance) |
| `R` | Residuals (ev, qualified_blocker or null) |
| `last_cycle_result` | verify pointers / commits |
| `next_action` | Concrete next invoke instruction |
| `hard_wait` | If set: blocker id + what human/system must provide |

## Idle predicate (outer)

`engagement_idle` only if **all** hold after a **fresh** cycle attempt:

1. Outer acceptance not yet claimed false, **and**
2. Fresh coverage/re-scout admits **B = []**, **and**
3. Every residual in **R** is either below MinOutcomeDelta, negative EV, or has a
   **qualified** blocker (`external_wait` / `authority_pending` / …), **and**
4. No soft-only high-EV parking (“multi-day”, “engine later”) without an L0 slice
   attempted or in B.

Otherwise status stays `active` and the runner **must re-invoke**.

## Hard wait vs idle

| Status | Meaning | Runner |
| --- | --- | --- |
| `active` | Unblocked or soft-only work remains | Re-invoke immediately / on schedule |
| `hard_wait` | Only qualified external/authority blockers remain | Pause; resume on wake signal |
| `idle` | True empty high-EV frontier for now | Stop; optional Goal complete |

Do **not** map “cycle finished” → idle.

## Goal API (insurance only)

When present:

- `create_goal` once with **outer_objective** (uncapped)
- Resume on crash
- `update_goal(complete)` **only** when state.status == idle
- Missing Goal API: runner still loops; record residual once

## Agent invoke prompt (shape)

Each invoke should look like:

```text
Engagement <id> status=active cycle=<n>
Outer objective: <…>
Load continuous-product-quality (cycle method only).
Read state at <path>. Run exactly one cycle: refresh card, admit B, execute all
B (slice large work), verify, write state. Do not ask the user to start the next
cycle. Do not mark goal complete unless engagement_idle.
If B empty after honest admit, re-scout once; if still empty and R only
qualified-blocked, set hard_wait or idle per runner rules; else put L0 slices in B.
```

## Non-goals

- Implementing a specific host’s private APIs in this repo
- Replacing product-specific CI
- Forcing multi-hour single-turn sessions

## Relation to continuous-product-quality

Skill = **how to run a good cycle**.  
This runner = **whether another cycle starts**.  
Both are required for “loop engineering” as a product behavior.
