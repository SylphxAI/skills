# Betterment engagement continuity

Companion to product betterment Skills (`continuous-product-quality`).

## Primary motor: Goal System (Codex and peers)

When the host exposes Goals (Codex ≥0.128-class):

```text
User one-shot invoke
  → agent create_goal(outer product objective, NO token_budget)
  → cycle method (Skill)
  → turn may end
  → host auto-continues idle thread while Goal active & in budget
  → agent keeps tool-working cycles until engagement idle
  → update_goal(complete) only with evidence
```

This is the **default** “press once, run for hours” path.  
**Do not** require Codex automation heartbeats when Goal continuation works.

### Operator one-shot (happy path)

Paste once in the product thread:

```text
$continuous-product-quality

Start continuous product betterment for <product/repo>.
Outer objective: <north-stars + surfaces + non-goals>.
Create or resume an uncapped harness Goal (no token_budget) with that outer objective.
Keep cycling high-leverage betterment until engagement idle with evidence.
Do not ask me to start the next cycle. Do not complete the Goal after a single cycle.
Between cycles: tools + next cycle immediately. Essay-only idle turns are forbidden.
```

Optional: `/goal <same outer objective…>` then the same Skill invoke if you prefer the slash surface.

### Goal rules that matter

| Rule | Why |
| --- | --- |
| Outer objective only | Cycle backlogs are not the Goal text |
| Omit budget unless user set one | Budget stop ≠ complete; default uncapped |
| Complete only at engagement idle | One cycle B-clear is not done |
| Keep using tools each continued turn | No-tool continuation can suppress the next auto-continue |
| Blocked only on real repeated impasse | Soft cost is not blocked |

### Fallback motors (only if Goal missing/broken)

1. **In-process multi-cycle** in one long turn (tool loop; no final essay until idle/hard-wait).
2. **Manual re-kick** with the same outer objective + state pointer.
3. **Host automation / scripted re-invoke** — last resort; laggy and imprecise; never the preferred UX when Goals work.

## Optional durable state

Product may keep `docs/specs/*-betterment-state.json` for B/R/cycle notes.  
Useful for humans and for hosts without Goal. **Not required** for Codex Goal continuation.

| Field | Meaning |
| --- | --- |
| `engagement_id` | Stable id |
| `outer_objective` | Same text as Goal objective ideally |
| `status` | `active` \| `hard_wait` \| `idle` |
| `cycle` | Monotonic int |
| `B` / `R` | Admitted / residual items |
| `next_action` | Concrete next work |

## Idle predicate

Engagement idle only if after a **fresh** re-scout:

1. B = []
2. Every R item is below MinOutcomeDelta, negative EV, or **qualified**-blocked
3. No soft-only high-EV parking without an L0 slice attempt

## Relation to the Skill

| Piece | Owns |
| --- | --- |
| Goal (when present) | Multi-turn continuity |
| `continuous-product-quality` | High-leverage cycle method + when to complete Goal |
| Automation | Degraded continuity only |

## Anti-patterns

- Teaching automation as the default loop on Codex
- Labeling Goal “insurance only” when it is the host motor
- Completing Goal after cycle report
- Budget caps “for safety” by default
- Essay-only turns that starve auto-continue
