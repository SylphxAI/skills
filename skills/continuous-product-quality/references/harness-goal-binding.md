# Harness Goal Binding for Product Betterment Loops

## Purpose

Many agent harnesses expose a **Goal System** that persists objectives across
turns and can auto-continue after an accidental stop. Continuous product
betterment must use that system when present so the loop is not lost when a
session ends mid-tick.

This is **harness recovery state**, not product Work authority. Enact (when
available) still owns Work/claims/runs; Git owns source; delivery systems own
deploy/live proof.

## Rule: uncapped betterment goals

When the runtime provides goal APIs:

| Step | Action |
| --- | --- |
| Start / first tick | `get_goal`. If none or wrong objective, `create_goal` |
| Budget | **Omit budget caps** (for Codex: omit `token_budget`) unless the user explicitly sets a budget |
| Resume | Every tick begins with `get_goal` and continues the same objective |
| Complete | Only at honest **idle frontier** for the declared product/aspect scope |
| Blocked | Only after the harness strict blocked audit (repeated hard impasse) |

**Do not** attach a token/time budget “for safety” by default. A budget cap
causes the harness to stop recovering precisely when long betterment loops need
continuation. If the user wants a cap, record it as an explicit owner decision
inside the goal objective text and contract, not as a silent default.

## Objective string contract

The goal `objective` must be self-contained for recovery. Include:

1. **Job:** continuous product betterment loop engineering (not one bug/finish)
2. **Product identity:** repo/product/release/surfaces in scope
3. **Aspect set:** selected matrix cells / families and explicit non-goals
4. **Success criteria / Definition of Done:** healthy **idle frontier**
   (floors fresh; no positive-net admitted work under budgets; wake triggers
   durable)—**not** product perfection
5. **Validation gates:** original-oracle readback on delivered subjects;
   delivery-terminal honesty
6. **Authority floors:** no meta-router; no invented credentials/deploy; commercial/legal changes need owner authority
7. **Current next safe action** (updated in durable contract state each tick)
8. **Composition:** use `continuous-product-quality`; compose specialists by
   native discovery; use `autonomous-execution-standard` for one admitted Work;
   use `self-feeding-agent-loop-standard` only for continuous Work OS concerns

### Template (adapt; keep compact but complete)

```text
Operate continuous product betterment for <PRODUCT/REPO> across aspects
<ASPECTS>. Maintain a versioned Product Quality Loop Contract and run bounded
ticks: scout → admit positive-net Work → deliver → original-oracle verify →
update coverage. Idle at a healthy frontier without claiming perfection; wake
on declared signals. Do not stop after one finding, one PR, or local green.
No token budget cap. Next safe action: <ACTION>.
```

## Lifecycle

```text
get_goal
  -> missing/mismatch -> create_goal(objective, NO budget)
  -> active -> run betterment tick
        -> still open findings/work -> leave goal active
        -> idle frontier reached -> update_goal(complete)
        -> true multi-turn impasse -> update_goal(blocked) only after audit
```

On a later wake (new signal, owner request, freshness miss):

- if previous goal completed at idle, `create_goal` a new uncapped goal for the
  new cycle with the same product identity and updated aspects/action;
- do not silently shrink the objective to the last patch.

## Mapping across harnesses

| Harness capability | Betterment binding |
| --- | --- |
| Explicit Goal API (e.g. Codex `create_goal`/`get_goal`/`update_goal`) | Required when operating this Skill |
| Goal API with optional budget field | Omit budget unless user explicitly requests one |
| No Goal API | Residual: durable contract + scheduler/wake only; state the gap |
| Enact Work Graph also present | Goal recovers the **loop engagement**; Enact owns individual Work items |

## Anti-patterns

- Creating a goal with a token budget “just in case”
- Completing the goal when one Work lands or CI is green
- Goal objective that only says “improve the product” with no product/aspect/DoD
- Replacing Enact/Git/delivery authority with the harness goal
- Using goal completion to claim the product is perfect
- Skipping `get_goal` on resume and starting a narrower ad-hoc task

## Minimum evidence in Skill output

When a Goal System exists, the operating tick output must state:

- goal created vs resumed;
- budget omitted (or user-explicit budget, if any);
- active objective digest/summary;
- whether the goal remains active, completed at idle frontier, blocked, or
  unavailable.
