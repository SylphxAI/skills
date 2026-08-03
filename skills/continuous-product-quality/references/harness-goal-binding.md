# Goal = workflow; Skill = bootstrap

## Split

| Artifact | Role |
| --- | --- |
| Skill invoke | Human start point → agent self-setup |
| `create_goal(objective=workflow contract)` | Durable full cycle workflow + terminal |
| Host Goal continuation | Loop: each continue = next cycle under same objective |

The Skill is not the loop. The Goal text is the loop body the host re-injects.

## Rules

1. Agent creates Goal on invoke (user does not author it).
2. Objective = full workflow contract from SKILL.md (not a product brief).
3. No default token budget.
4. Complete only at terminal (no unblocked high-EV after fresh re-scout).
5. After bind, execute from Goal; do not require re-opening Skill each cycle.
