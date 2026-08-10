# Feedback Loop: Onboarding Flow

A practical, three-phase loop for taking user feedback about a confusing
onboarding flow, deciding what to change, and verifying the change helped.

---

## Phase 1 - Collect and triage

**Route channels:** Support tickets, in-product surveys, session analytics,
help docs "was this helpful", and community/user groups. Tag each item with the
source so you can weight quantitative evidence over anecdotes.

**For each piece of feedback, extract:**
- The concrete moment where confusion occurs (e.g., "got stuck on the payment
  step", not "onboarding is bad").
- The user's stated expectation vs. what actually happened.
- Any session data you can attach (drop-off point, time spent, error shown).

**Triage into buckets:**
- Confirmed bug (reproducible, harmful).
- Design gap (flow works but is unintuitive).
- Missing feature (user needs something the flow doesn't offer).
- Noise (single complaint, no evidence, low priority).

**Check:** Is this feedback from a real user on the real flow, or from a
reviewer/stakeholder/agent? Prioritize verified user data.

---

## Phase 2 - Decide

**Rank candidate changes** by:
1. Impact - how many users does it affect, and how severe is the confusion?
2. Cost - implementation effort, risk, and time to ship.
3. Evidence - how confident are you that the change addresses the root cause?

**Perform root-cause analysis before editing.** Trace the user's actual path
through the flow and identify the single decision point where the flow
diverges from their expectation. Fix the cause, not the symptom. If the
"confusion" is that a step is skippable, the fix may be to remove the step
entirely, not to add a tooltip.

**Scope the change:** One change per iteration where possible. This keeps the
before/after measurement clean and avoids compounding variables.

**Write a falsifiable hypothesis:** "If we split the account-creation step
into two pages, the drop-off rate between step 2 and step 3 will decrease by at
least 15%." A hypothesis you can't measure is a guess.

---

## Phase 3 - Verify

**Before shipping, define:**
- The metric(s) you will watch (e.g., completion rate, time to complete,
  support tickets about this step).
- The baseline number from the current flow.
- The timeframe for review (e.g., 2 weeks after launch).

**Ship the change** to the real flow (feature-flagged or progressive rollout if
you need to compare against the baseline).

**Measure after:**
- Compare the metric against the baseline. Did it move in the expected
  direction?
- Check for unintended side effects (new drop-offs elsewhere, increased support
  questions on a different step).
- Re-read the original feedback: would the reporting user consider this
  resolved?

**Decide:**
- Metric moved as predicted -> keep the change, document it.
- Metric did not move -> revert or iterate; the hypothesis was wrong, not the
  user.
- Metric improved but feedback persists -> the change helped but didn't address
  the full issue; run another loop.

---

## Guardrails

- Never ship a change based on one anecdote without a hypothesis you can
  measure.
- Never label a change "done" based on code merged or preview screenshots.
  Verification is the live metric after the change reaches real users.
- Keep the loop small and repeatable. A 2-week cycle beats a 6-month redesign.
- Document decisions and outcomes so the next round of feedback starts from
  evidence, not from memory.

## Summary

| Phase | Action | Deliverable |
|-------|--------|-------------|
| Collect | Triage feedback into confirmed/design/missing/noise | Bucketed, tagged items |
| Decide | Root-cause + falsifiable hypothesis + one scoped change | Hypothesis with baseline metric |
| Verify | Ship, measure, decide keep/revert/iterate | Before/after comparison |
