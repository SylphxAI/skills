---
name: my-distilled-skill
description: "Run the weekly platform capacity review: collect capacity/backlog inputs by Thursday 12:00, compute per-engineer utilization flags (above 90% or below 40% for three consecutive weeks), rank the backlog into committed/candidate/parked, and record decisions and follow-ups. Use when asked to run, prepare, or audit a weekly capacity review, capacity utilization analysis, or backlog prioritization. Not for incident response (separate runbook) or sprint planning."
---

# my-distilled-skill

# Weekly Capacity Review

## When to use
- Running, preparing, or auditing the team's weekly capacity review.
- Calculating engineer utilization from a capacity sheet.
- Prioritizing and bucketing a queue backlog into committed, candidate, or parked work.
- Resolving missing-input or priority-dispute situations during a review.
- Not for incident response (covered by a separate runbook) or sprint planning.

## Inputs (collect by Thursday 12:00)
1. Team capacity sheet: booked slots per engineer per week.
2. Queue backlog report: items with age, size estimate, and priority.
3. Previous week's review notes.

If any input is missing, do not invent numbers. Mark the review partial and proceed with what exists.

## Procedure
1. Collect the three inputs above by Thursday 12:00.
2. Compute utilization per engineer: `booked slots / total slots`.
   Flag an engineer when utilization is above 90% or below 40% for three consecutive weeks (a single week above/below threshold is not a flag).
3. Rank backlog items by priority, then by age (oldest first within equal priority).
4. Bucket each item:
   - Committed: scheduled for next week.
   - Candidate: possible within the next two weeks.
   - Parked: no owner assigned.
5. Decide with the team. Move a candidate to committed only if both hold:
   - a slot is free for the owner, and
   - the owner agrees to take it.
6. Record all decisions in the review notes.
7. Open follow-ups for any parked item that has no owner.

## Decision rules
- Promotion gate: candidate -> committed requires a free slot AND owner agreement. Missing either keeps the item in candidate.
- Utilization flag: only a three-consecutive-week streak above 90% or below 40% triggers a flag.
- Disputed priority: defer to the product owner's ranking; record the disagreement in the review notes.
- Missing inputs: mark the review partial; never fabricate numbers.
- Parked without owner: always create a follow-up.

## Output contract
- Updated capacity sheet reflecting all decisions.
- Review notes containing: utilization flags, backlog bucketing, promotion decisions, disagreements recorded, and follow-ups opened for ownerless parked items.

## Quality signals
- Every flag cites a three-week streak, not a single week.
- Every promotion cites a free slot and owner agreement.
- Every ownerless parked item has a follow-up.
- No invented numbers anywhere in the outputs.

## Failure modes and handling
- Missing input arrives late: mark the review partial, proceed with available inputs, and note what was missing.
- Disputed priority: use the product owner's ranking, record the disagreement, do not leave it unresolved in the notes.
- Threshold confusion: a one-off 95% week is not a flag; the streak rule applies.

## Eval prompts
Positive examples:
- "Run the weekly capacity review" -> follow Procedure and produce updated capacity sheet + review notes.
- "Which engineers are overloaded this week?" -> compute utilization and apply the three-week flag rule.
- "Should item X move to committed?" -> apply the promotion gate (free slot AND owner agreement).

Negative examples (do not trigger):
- "There is an incident in production" -> out of scope; incident response is a separate runbook.
- "Plan the next sprint's stories" -> out of scope; sprint planning is not this review.
- "Summarize the capacity runbook" -> this skill executes the review; it does not summarize its own source.
