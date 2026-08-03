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
| `state_path` | Canonical path to this file |

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
$continuous-product-quality

Engagement <id> status=active cycle=<n>
Outer objective: <product north-stars — not "cycle N">
State path: <repo-relative path>

Run exactly ONE betterment cycle:
1. Read state; get_goal / create_goal(outer, no budget) if Goal API exists
2. Refresh coverage card; admit ALL capacity-feasible high-L items into B
3. Slice soft-only high-EV residuals into L0 B (do not park+essay)
4. Execute all B; verify with original oracles + one cycle outcome readback
5. Write state (cycle++, B/R, next_action, status=active|hard_wait|idle)
6. Do NOT ask the user to start the next cycle
7. Do NOT mark goal complete unless engagement_idle after fresh re-scout

If B empty after honest admit, re-scout once; if still empty and R only
qualified-blocked, set hard_wait or idle per runner rules.
```

## How to actually loop (operators)

There is **no** portable forever motor inside Skill text. Pick one outer owner:

### A) Manual re-kick (simplest)

After each cycle ends (agent final answer / turn complete):

1. Read `status` from state file.
2. If `active` → paste the invoke prompt above into a **new agent turn** (same or new thread) with updated `cycle`.
3. If `hard_wait` → supply the missing human/system input, then re-kick.
4. If `idle` → stop; optional Goal complete.

### B) Codex automation heartbeat (recommended for unattended multi-cycle)

Create an official Codex automation (not a shell daemon) that re-prompts the
same thread on a schedule while `status=active`. Pattern (illustrative):

```toml
version = 1
id = "betterment-<product>-loop"
kind = "heartbeat"
name = "Betterment <product> engagement"
# Point at the product thread that owns the engagement
target_thread_id = "<thread-id>"
rrule = "FREQ=MINUTELY;INTERVAL=15"
status = "ACTIVE"
prompt = """
$continuous-product-quality
Engagement <id> — outer loop tick.
Read state at <state_path>.
If status=idle or hard_wait: report one line and stop work.
If status=active: run exactly ONE cycle (card→B→execute→verify→write state).
Do not ask to start the next cycle. Do not complete Goal unless idle.
Outer objective: <…>
"""
```

Pause/delete the automation when `status` is `idle` or you intentionally stop.

### C) Scripted re-invoke (CI / host-specific)

Any host that can start agent turns:

```text
while true; do
  status=$(read status from state)
  case "$status" in
    idle) break ;;
    hard_wait) sleep / wait for wake ;;
    active|*) run_agent_one_cycle_with_prompt; ;;
  esac
done
```

This repo intentionally does **not** ship a host-private scheduler binary.
`docs/reference/betterment-engagement-runner.md` is the contract; product hosts
implement the re-invoke.

### D) Goal-only recovery (insurance, not motor)

If the agent dies mid-cycle and Goal API exists with uncapped outer objective,
resume the thread / create a follow-up that says: continue the open Goal + read
state + one cycle. **Do not** rely on Goal alone to fire every next cycle after
a clean final answer—pair with A/B/C.

## First-time setup checklist

1. Pick `engagement_id` + `state_path` in the product repo.
2. Write initial state: `status=active`, `cycle=0`, outer_objective filled, empty B/R.
3. Optional: harness `create_goal` with outer objective, **no** token budget.
4. First human/agent message: invoke prompt above (`cycle=1`).
5. Attach outer runner (B or C) **before** expecting unattended multi-cycle.
6. Install skills so agents can load the method:
   `node runtime/sylphx-skills.mjs install --agent all` (from skills checkout).

## Non-goals

- Implementing a specific host’s private APIs in this repo
- Replacing product-specific CI
- Forcing multi-hour single-turn sessions
- Claiming Skill listing alone makes agents loop forever

## Relation to continuous-product-quality

Skill = **how to run a good cycle**.  
This runner = **whether another cycle starts**.  
Both are required for “loop engineering” as a product behavior.
