---
name: pursue-product-objective
description: "Pursue a fixed declared product objective to evidence-backed completion: keep going until that named outcome is reached and proved."
---

# Pursue Product Objective

When there is a **declared product objective** and you must **keep going until
that objective is achieved** (not a one-off polish pass), use this workflow.

**Default for “follow the goal until done” product work** when a durable product
outcome is declared.

This is the goal-directed betterment job: same high-leverage cycle shape as open
betterment, but the **terminal is the objective**, not “the product is perfect,”
and not “one cycle felt productive.”

## When to use

- User or host already stated a durable product outcome to reach
- You should advance the product until that outcome has evidence
- Work may take many cycles; stopping early for a progress essay is wrong

## Host continuity (portable)

Some hosts keep a persistent objective/goal/mission.

- Use only that host’s APIs and names — **do not hardcode tool ids**.
- If replace is forbidden: work under the active objective; do not invent rewrites.
- If an objective can be set when empty: set **the declared product objective**
  (outcome + done evidence), not “finish this cycle.”
- If no continuity surface exists: keep the objective text in working notes and
  continue in-process until terminal.
- Do not invent budget fields; follow host defaults and any user-set limits.

## Method

Repeat **full cycles** until the objective terminal holds.

### Cycle shape (each cycle)

1. **Restate objective** — exact outcome, non-goals, evidence that would prove
   done. Do not shrink it to the current backlog or to “what fits one PR.”
2. **Research** — coverage for *this objective* (decision-complete, not
   omniscient):
   - outcomes that matter for the objective
   - primary journeys/surfaces in scope
   - quality/competitive anchor or unknown+why
   - hard floors
   - highest pains/bets blocking the objective
3. **Candidate set C, then admit B (batch, not drip):**
   - Score leverage
     `L = (expected progress on the objective × weight × confidence) / full_lifecycle_cost`.
   - **B = every** item that materially advances the objective and is runnable
     now under **real** constraints only (tools/auth/safety/external wait)—**not
     Top-1**, not “a few representatives,” not an arbitrary small batch for a
     tidy commit.
   - Soft cost (large/hard/multi-day) → put a **shippable L0 slice** into B now;
     do not park merely because it is hard.
   - Park to residual **only** with evidence:
     `external_wait` | `authority_pending` | `dependency_blocked` | `safety_hold`.
   - **Capacity is not a preference throttle.** Do not invent WIP of 1–3, “one
     theme per cycle,” or “save the rest for next PR.” If N high-EV items are
     unblocked, **all N are in B** unless a **named real** constraint excludes a
     specific item.
4. **Implement all of B in this cycle** (parallel when independent; shared setup
   once). Correct ownership boundaries; no permanent workarounds.
   - Prefer **one coherent delivery unit** for the whole B when integration
     allows (one branch / one integration candidate), not N micro-PRs that each
     re-scout and re-claim “a pass.”
   - Commits may be intermediate checkpoints; **commit/PR count is not the cycle
     bar** and must not force splitting B.
5. **Verify** — original-oracle per B item; one objective-level readback on the
   exact subjects. Local green / commit count / open PR ≠ objective met.
6. **Short log** — progress vs objective; what B cleared; residuals still
   required. Do not ask the user to re-assign the objective.
7. **End of cycle ≠ end of objective.** If the objective terminal is false and
   no qualified hard wait holds, **start the next cycle in the same turn
   sequence** (re-scout → admit full B again). Do not stop after one B clear
   with a status essay.

### After each cycle

- If **objective terminal** is met with evidence → stop; mark host objective
  complete only via host rules when applicable.
- If only **qualified** blockers remain → hard wait / blocked per host rules;
  do not fake complete.
- Otherwise → **another cycle** (same objective). One cleared B list, one PR, or
  “made progress” is not done.

## Anti-patterns (this skill)

- Picking 1–2 easy items, committing, opening a PR, and treating that as a full
  cycle while other unblocked high-EV work was already known.
- Using “capacity” as a soft excuse to drip-feed work across many cycles.
- Replacing the objective with “land this PR” or “finish this cycle’s commits.”
- Micropolish thrash below material objective progress while larger bets sit open.

## Objective terminal

All hold:

1. Every requirement in the declared objective is satisfied with **current**
   evidence (not memory of intent).
2. Scoped journeys/floors in the objective are green or honestly N/A with reason.
3. No unblocked residual still required by the objective (EV above threshold).
4. Claims match evidence class (local vs landed vs live as the objective requires).

Not terminal: one PR, one cycle report, “improved a bit,” a green subset, or open
betterment idle while the objective text is still unmet.

## Leverage

Prefer high L over easy polish. Difficulty alone does not disqualify. When many
items clear the bar, **batch them**—that is the intended throughput, not a
stretch goal.

## Output

- Objective text (unchanged meaning)
- Cycles run / B sizes executed / key evidence pointers
- Met | blocked (qualified) | still open (what remains for the objective)
