# Betterment engagement continuity

## Happy path (Codex)

```text
User: $continuous-product-quality
Agent: create_goal(FIXED continuity objective, no token_budget)
Agent: discover workspace → run cycles with tools
Host: auto-continue while Goal active
Agent: update_goal(complete) only at engagement idle
```

User does **not** author the Goal. Goal text is the Skill’s fixed continuity
contract (“keep bettering until no unblocked high-EV work remains”), not a
product roadmap.

## Fixed Goal meaning

| Is | Is not |
| --- | --- |
| Host continuation latch | User’s product strategy doc |
| Same shape every time | Per-cycle backlog |
| Stops at engagement idle | Stops at perfection / true north-star |

## Fallback only if Goal API missing

In-process multi-cycle tool loop → manual re-kick → automation last.

## Optional state file

Product may log B/R/cycle; not required for Goal continuation.
