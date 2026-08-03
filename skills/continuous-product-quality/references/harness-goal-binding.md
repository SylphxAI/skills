# Harness Goal Binding — continuity motor, not product brief

## What Goal is here

**Mechanical continuity** so the host auto-continues an idle thread while high-value betterment remains.

It is **not**:

- a user-written project goal
- a north-star essay the human must invent each time
- “work I assigned you this cycle”

The agent **always** sets it on Skill invoke. Product discovery happens after bind.

## Fixed objective (canonical)

```text
Continuous high-leverage product betterment on the active workspace until engagement idle.
Keep cycling: research coverage card → admit ALL capacity-feasible high-leverage items into B → execute all B → verify → re-scout.
Do not stop after one cycle, one PR, local green, or a progress report.
Do not complete this Goal while any unblocked residual has EV ≥ MinOutcomeDelta (including soft-only “large/hard/engine” items — slice L0 into B).
Engagement idle only after a fresh re-scout shows B empty and R has no unblocked high-EV work.
Never rewrite this Goal into a single-cycle backlog. Discover product state from the workspace yourself.
```

Use this text (or a strict paraphrase that preserves every bullet). Do **not** expand it into a product-specific roadmap inside `create_goal`.

## Procedure

| Step | Action |
| --- | --- |
| 1 | `get_goal` |
| 2 | If missing / wrong shape → `create_goal({ objective: fixed text })` — **omit token_budget** |
| 3 | Work cycles; discover product from workspace |
| 4 | `update_goal(complete)` only at engagement idle with evidence |
| 5 | `blocked` only after harness repeated hard-impasse rule |

## Idle vs perfect

There is no absolute perfect terminal.  
**Idle** = policy empty frontier (no unblocked high-EV left), not “product is ideal.”

## Missing Goal API

Note residual once; continue in-process. Do not invent a fake Goal store. Do not demand the user write an objective to compensate.
