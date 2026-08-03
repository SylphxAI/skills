# Harness Goal Binding for Product Betterment

## Purpose

On Codex-class harnesses, the **Goal System is the multi-turn loop motor**:
persistent thread objective + evidence-based complete/blocked + host continuation
when the thread is idle and the Goal is active.

This Skill/job **must bind an uncapped Goal** when the API is present and the
user asked for continuous betterment / loop engineering.

Not product Work authority (Enact/Git/delivery still own those planes).

## Outer objective only

Goal `objective` = product/north-star betterment.  
**Illegal:** Goal sole meaning = “finish cycle 3” / “land B8–B10”.

## Bind procedure

| Step | Action |
| --- | --- |
| Start | `get_goal` |
| Create | If none/wrong → `create_goal(outer_objective)` |
| Budget | **Omit `token_budget`** unless user set a budget |
| Work | Cycles under this Skill; keep using tools |
| Complete | Only engagement idle + Stop-Audit evidence |
| Blocked | Only harness repeated hard-impasse rule |

## Why uncapped

A default token budget stops continuation while the product engagement is still
open. That looks like “loop died.” Uncapped is the correct default for
continuous betterment; user may still set a budget explicitly.

## Continuation hygiene

- Prefer tool calls over pure narrative between cycles.
- Do not end with “要開 Cycle N+1 嗎？” — open the next cycle or leave Goal active for host continue.
- Do not mark complete because a cycle felt productive.

## Missing Goal API

Record `goal_api=unavailable` once. Continue in-process multi-cycle if the host
allows. Operator re-kick / automation is fallback only—not the designed happy path
for Codex.

## Objective string (minimum)

1. Continuous high-leverage product betterment (not one polish pass)
2. Product/repo/surfaces in scope + non-goals
3. North-star outcomes (1–3)
4. MinOutcomeDelta / leverage not ease-first
5. Multi-cycle until engagement idle (fresh empty re-scout)
6. Complete only with evidence; never after one cycle B-clear
