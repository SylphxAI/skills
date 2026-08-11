# Internal runbook: weekly capacity review

Source for distillation. Covers the weekly capacity review meeting procedure used
by the platform team. Does not cover incident response (separate runbook).

## Inputs
- Team capacity sheet (slots per engineer per week)
- Queue backlog report (items with age, size estimate, priority)
- Previous week's review notes

## Steps
1. Collect the three inputs by Thursday 12:00.
2. Compute utilization = booked slots / total slots per engineer; flag anyone above 90% or below 40% for three consecutive weeks.
3. Rank backlog by priority, then age; split into committed (next week), candidate (next two weeks), and parked (no owner).
4. Decide with the team: move candidates into committed only if a slot is free and the owner agrees.
5. Record decisions in the review notes; open follow-ups for anything parked without owner.

## Output
- Updated capacity sheet
- Review notes with decisions and follow-ups

## Failure modes
- Missing inputs: do not invent numbers; mark the review partial.
- Disputed priority: defer to the product owner's ranking, record the disagreement.
