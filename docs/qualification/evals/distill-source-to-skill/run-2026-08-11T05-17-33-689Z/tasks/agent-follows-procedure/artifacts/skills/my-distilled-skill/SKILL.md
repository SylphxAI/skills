---
name: weekly-capacity-review
description: "Run the weekly platform-team capacity review: collect the three inputs, compute per-engineer utilization flags, triage the backlog into committed/candidate/parked, and record decisions and follow-ups. Use when asked to prepare, run, record, or follow up the weekly capacity review, update the capacity sheet, or triage the queue for next week. Not for incident response or one-off backlog grooming."
---

# Weekly Capacity Review

A repeatable procedure for the platform team's weekly capacity review meeting. A future agent can run this job from this file alone; the source runbook is not needed in context.

## When to use
- The user asks to prepare, run, or record the weekly capacity review.
- The user asks to update the capacity sheet, flag engineer utilization, or triage the queue backlog for the coming weeks.
- The review meeting needs a prepared agenda, computed flags, or recorded decisions.

Do not use for incident response (separate runbook) or ad-hoc backlog grooming outside the review cycle.

## Evidence boundary (summary)
- Source: internal runbook `notes.md` (English, Markdown, 1.1 KB) covering only the weekly capacity review procedure: inputs, steps, output, failure modes.
- Not covered by the source: the incident-response runbook, actual sheet/backlog data, definitions of priority or age, the product owner's identity, and any tooling or storage locations.
- Sensitivity: internal. Do not publish this package or its output publicly without authority; it contains no secrets but describes internal process.
- Full inventory: `references/evidence-boundary.md`.

## Inputs
1. Team capacity sheet — slots per engineer per week.
2. Queue backlog report — items with age, size estimate, priority.
3. Previous week's review notes.

## Decision rules
- D1 Utilization flag: `booked slots / total slots` per engineer; flag only when above 90% or below 40% for **three consecutive weeks** (not on a single week).
- D2 Backlog classification: `committed` = planned next week; `candidate` = planned within the next two weeks; `parked` = no owner.
- D3 Promote a candidate to committed only when **both** a free slot exists **and** the owner agrees. Never promote on one condition alone.
- D4 Anything parked without an owner gets an opened follow-up.
- D5 Missing input: mark the review `partial`; never invent numbers to complete it.
- D6 Disputed priority: the product owner's ranking wins; record the disagreement verbatim in the review notes.

## Workflow
1. Gather all three inputs no later than Thursday 12:00. If any input is missing, proceed as a partial review per D5.
2. Compute utilization per engineer from the actual sheet; apply D1 and list flagged engineers with their three-week trend.
3. Rank the backlog by priority, then by age (D2 basis); split into committed, candidate, parked.
4. With the team, apply D3 to each candidate; confirm free slots and owner agreement before moving items.
5. For each parked item without an owner, open a follow-up (D4).
6. Record all decisions in the review notes, including disagreements (D6) and any partial-review marker (D5).

## Output contract
- Updated capacity sheet: utilization computed for every engineer, flags only where D1 holds.
- Review notes containing: the classification of every backlog item into exactly one bucket, decisions made, follow-ups opened for ownerless parked items, disagreements recorded with the product owner's ranking, and a `partial` marker with the missing-input list if D5 applied.
- No fabricated figures: every number traces to an input.

## Failure modes
- Missing inputs: D5 — mark partial, list what is missing, do not invent.
- Disputed priority: D6 — defer to the product owner, record the disagreement.
- Ambiguous priority or age fields in the backlog report: ask the product owner for the ranking rather than guessing.
- Threshold or cycle ambiguities (e.g., what counts as a slot or week): use the sheet's declared units; if undefined, state the assumption in the notes.
- A request to change the rules (thresholds, buckets): out of scope — the runbook is authoritative; record the request as a decision note, do not silently modify the procedure.

## Validation signals
- Every engineer has a utilization figure computed from the sheet.
- Flagged engineers satisfy the three-consecutive-week rule.
- Every backlog item appears in exactly one bucket.
- Every parked item has either an owner or a follow-up.
- No invented numbers; partial marker present when inputs were missing.
- Disagreements are recorded, not resolved silently.

## Eval prompts
Positive triggers (should run the workflow):
- "Run the weekly capacity review."
- "Prepare next week's capacity review; inputs are attached."
- "Update the capacity sheet and triage the backlog."
- "Record today's review decisions and follow-ups."

Nearby negative triggers (should not run the workflow):
- "Summarize the capacity review runbook." (produces a brief, not the review)
- "Respond to the current incident." (incident response is a separate runbook)
- "Groom the backlog for my personal project." (ad-hoc, outside the review cycle)

Expected behavior assertions:
- Uses only provided numbers; flags follow D1; classification follows D2; promotion follows D3; follow-ups follow D4; partial marker on missing inputs (D5); disagreements recorded (D6).
- Artifact shape: updated capacity sheet + review notes with decisions, follow-ups, and any partial marker.

## References
- [references/evidence-boundary.md](references/evidence-boundary.md) — full source inventory: what was read, what is unavailable, sensitivity, assumptions, audience, and authority.
