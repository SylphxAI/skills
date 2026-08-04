---
name: pursue-product-objective
description: "Pursue a fixed declared product objective to evidence-backed completion—not open-ended betterment."
---

# Pursue Product Objective

When there is a **declared product objective** and you must **keep going until that objective is achieved** (not a one-off polish pass), use this workflow.

**Default for “follow the goal until done” product work** when a durable product outcome is declared.

This is the goal-directed betterment job: same high-leverage cycle shape as open betterment, but the **terminal is the objective**, not “the product is perfect,” and not “one cycle felt productive.”

## When to use

- User or host already stated a durable product outcome to reach
- You should advance the product until that outcome has evidence
- Work may take many cycles; stopping early for a progress essay is wrong

## Host continuity (portable)

Some hosts keep a persistent objective/goal/mission.

- Use only that host’s APIs and names — **do not hardcode tool ids**.
- If replace is forbidden: work under the active objective; do not invent rewrites.
- If an objective can be set when empty: set **the declared product objective** (outcome + done evidence), not “finish this cycle.”
- If no continuity surface exists: keep the objective text in working notes and continue in-process until terminal.
- Do not invent budget fields; follow host defaults and any user-set limits.

## Method

Repeat **full cycles** until the objective terminal holds.

### Cycle shape (each cycle)

1. **Restate objective** — exact outcome, non-goals, evidence that would prove done. Do not shrink it to the current backlog.
2. **Research** — coverage for *this objective* (decision-complete, not omniscient):
   - outcomes that matter for the objective
   - primary journeys/surfaces in scope
   - quality/competitive anchor or unknown+why
   - hard floors
   - highest pains/bets blocking the objective
3. **Admit B** — all capacity-feasible items with EV that **materially advances the objective** (not Top-1 only). Soft cost (large/hard) → shippable L0 slice into B. Park only with evidence: external_wait | authority_pending | dependency_blocked | safety_hold.
4. **Implement** all of B (parallel when independent); correct ownership boundaries; no permanent workarounds.
5. **Verify** — original-oracle per item; one objective-level readback on exact subjects. Local green / commit count ≠ objective met.
6. **Short log** — progress vs objective; residuals. Do not ask the user to re-assign the objective.

### After each cycle

- If **objective terminal** is met with evidence → stop; mark host objective complete only via host rules when applicable.
- If only **qualified** blockers remain → hard wait / blocked per host rules; do not fake complete.
- Otherwise → **another cycle** (same objective). One cleared B list is not done.

## Objective terminal

All hold:

1. Every requirement in the declared objective is satisfied with **current** evidence (not memory of intent).
2. Scoped journeys/floors in the objective are green or honestly N/A with reason.
3. No unblocked residual still required by the objective (EV above threshold).
4. Claims match evidence class (local vs landed vs live as the objective requires).

Not terminal: one PR, one cycle report, “improved a bit,” or open betterment idle while the objective text is still unmet.

## Leverage

`L = (expected progress on the objective × weight × confidence) / full_lifecycle_cost`  
Prefer high L over easy polish. Difficulty alone does not disqualify.

## Output

- Objective text (unchanged meaning)
- Cycles run / key evidence pointers
- Met | blocked (qualified) | still open (what remains)
