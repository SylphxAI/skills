---
name: continuous-product-quality
description: "Continuous high-leverage product betterment: auto-bind uncapped Goal, coverage card, admit all B, residual R, execute, verify; cycle until no high-EV work remains."
---

# Continuous Product Quality

Close user/business-visible product gaps with **high leverage**, not cosmetic commit thrash.

**Primary class:** `workflow`.  
User invoke = load this Skill (e.g. `$continuous-product-quality`). **Do not** demand a long user-written project brief or north-star essay.

## Continuity Goal (fixed motor — agent sets it)

On hosts with a Goal API (Codex): **you** bind the Goal. The user does not author it.

| Fact | Rule |
| --- | --- |
| Who sets Goal | **Agent**, immediately on invoke |
| What Goal is | **Continuity contract** so the host keeps auto-continuing while work remains |
| What Goal is not | A user-supplied product roadmap; not “finish cycle N”; not a one-shot task list |
| Goal text | **Stable template** below — same shape every engagement |
| Budget | **Omit `token_budget`** unless the user explicitly set one |
| Complete | Only at **engagement idle** (fresh re-scout: no unblocked high-EV ≥ MinOutcomeDelta) |
| Perfect / true north-star | **Does not exist.** Idle ≠ perfection. Idle = no remaining positive-leverage unblocked work under policy |

### Fixed Goal objective (use essentially this text)

```text
Continuous high-leverage product betterment on the active workspace until engagement idle.
Keep cycling: research coverage card → admit ALL capacity-feasible high-leverage items into B → execute all B → verify → re-scout.
Do not stop after one cycle, one PR, local green, or a progress report.
Do not complete this Goal while any unblocked residual has EV ≥ MinOutcomeDelta (including soft-only “large/hard/engine” items — slice L0 into B).
Engagement idle only after a fresh re-scout shows B empty and R has no unblocked high-EV work.
Never rewrite this Goal into a single-cycle backlog. Discover product state from the workspace yourself.
```

### Bind procedure (first tools this Skill runs)

1. `get_goal`
2. If missing or objective is a one-shot/cycle backlog → `create_goal` with the fixed objective above (**no** `token_budget`)
3. If already this continuity Goal and active → resume work (do not recreate thrash)
4. Then discover product/repo/surfaces from the workspace and run cycles

Missing Goal API: note once; keep multi-cycle tool work in-process. Automation re-kick is last-resort fallback only—not the happy path.

**Why fixed text:** Goal only needs to keep the host from stopping. Product specifics live in cycle research, not in Goal authorship. The user is not “finding work for the agent”; the agent finds work under this Skill.

## Units

| Unit | Meaning |
| --- | --- |
| **Engagement** | This continuity Goal’s lifetime |
| **Cycle** | Card → C → B+R → execute all B → verify → short log → next cycle |
| **B** | All capacity-feasible above-threshold items this cycle (many OK) |
| **R** | Parked items with EV + honest blocker |
| **Engagement idle** | Fresh re-scout: B=∅ and no unblocked EV ≥ MinOutcomeDelta in R |

## Method

1. **Bind fixed uncapped Goal** (above).
2. **Discover** product identity and evidence from the workspace (git, docs, live surfaces as available).
3. **Coverage card** (five cells) + VoI deepen until admission won’t change.
4. **Admit all** capacity-feasible passers into **B** (not Top-1). Soft cost → L0 slice into B, not stop.
5. **Execute all of B** (parallel default for independent items).
6. **Verify** (original-oracle per item; one cycle outcome readback).
7. **Short cycle log** — no “要開 Cycle N+1 嗎？”
8. If not idle → **next cycle** (same turn if possible; else Goal auto-continue). If idle → Stop-Audit → `update_goal(complete)`.

```text
create/resume FIXED uncapped continuity Goal
loop:
  discover + coverage card + admit all high-L into B
  if B empty & R clean after fresh re-scout → complete Goal (idle)
  else execute all B → verify → next cycle
```

## Qualified blockers (only these park high-EV in R)

`external_wait` · `authority_pending` · `dependency_blocked` · `safety_hold`  
(with concrete evidence)

**Not** blockers alone: multi-day, hard, expensive, engine, “not title-only”, missing user north-star essay, desire to report and wait.

## Non-negotiable

1. Agent sets Goal; user only invokes Skill.
2. Goal text stays the continuity template — not a user task dump.
3. Outcomes over activity; commit count ≠ progress.
4. All passers into B; leverage not ease.
5. B clear ≠ Goal complete.
6. Idle ≠ perfect; idle = no unblocked high-EV left.
7. Keep using tools each turn (essay-only can kill auto-continue).
8. No meta-router; native discovery only.
9. No continuous independent reviewers except irreversible/public-contract, load-bearing SOTA, contested idle.

## Anti-patterns

- Asking the user to write outer objectives / north-stars to “start the loop”
- Goal = “finish cycle 3” / ship a tiny B list
- Completing Goal after one productive cycle
- Soft-parking high-EV then stopping
- Automation-first on Codex when Goal works
- Micro-polish thrash as substitute for high-L work

## When not to use

- One bug / one-shot edit → direct fix / `autonomous-execution`
- One release-grade finish pass → `product-finish`
- Any-Work OS without product matrix → `self-feeding-agent-loop`

## Compose with

| Need | Skill |
| --- | --- |
| Decision quality | `decision-quality-standard` |
| Claims / SOTA | `evidence-and-claims-standard` |
| Single Workstream delivery | `autonomous-execution` |
| Land/live proof | `delivery-standard` |
| Domain method | matching specialist |

## Read when needed

- [references/product-quality-loop-contract.md](references/product-quality-loop-contract.md)
- [references/multi-aspect-betterment-loop.md](references/multi-aspect-betterment-loop.md)
- [references/harness-goal-binding.md](references/harness-goal-binding.md)
