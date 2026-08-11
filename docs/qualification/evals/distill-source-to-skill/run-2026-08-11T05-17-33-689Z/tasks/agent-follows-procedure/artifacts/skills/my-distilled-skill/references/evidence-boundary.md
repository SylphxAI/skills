# Evidence Boundary — Weekly Capacity Review Skill

Source inventory for the distillation. Kept as a permanent record so future readers can distinguish read evidence, inference, and unavailable material.

## What was read
- `notes.md` (1.1 KB, English, Markdown) — the full source runbook for the weekly capacity review meeting procedure. Every line was read and mapped to the skill:
  - header and scope line → evidence boundary (this file) and "When to use"
  - Inputs section → Inputs
  - Steps 1–5 → Decision rules D1–D4 and Workflow
  - Output section → Output contract
  - Failure modes section → Failure modes D5–D6
- The distillation method (host skill `SKILL.md` and its `references/source-to-skill-patterns.md`) — read completely; defines trigger, decision rules, workflow, output contract, failure modes, and validation as the required package elements.

## What is unavailable (out of scope for this skill)
- The incident-response runbook — explicitly excluded by the source ("separate runbook"); do not apply this skill there.
- Actual team capacity sheet, queue backlog report, and previous review notes — no sample data or values were provided.
- Definitions of backlog `priority` and `age` (units, source field, tie-break format) — not in the source.
- Definition of a `slot` (hours, tasks, points) and of the review week boundary — not in the source.
- Identity or contact for the product owner and the team — not in the source.
- Tooling and storage locations (spreadsheet URLs, tracker, repo, filenames) — not in the source.
- License or publication authority statement — none exists in the source.

## Assumptions (inference, marked as such)
- The capacity sheet lists slots per engineer per week, so utilization is per engineer per week.
- Priority and age are fields available on each backlog item; ranking by priority then age is a tie-break the source endorses.
- The skill is used by the meeting facilitator or an agent acting for the platform team; it does not replace the team's agreement step.
- Outputs are recorded in the team's existing review-notes location; the source does not specify a format.

## Languages and audience
- Source language: English only. No multilingual or code-switching triggers are sourced; do not add trigger phrases in other languages without new evidence.
- Intended audience: platform team members and the agent running the weekly review.

## Sensitivity and publication authority
- The source is marked "Internal runbook"; the material is internal process, not public.
- No credentials, customer data, personal data, raw telemetry, or private topology appear in the source or this package.
- Do not publish this package or derived public summaries without the platform team's explicit authority. Redaction is not needed for secrets (none present) but publication itself requires authority.

## Mechanism disposition
Kept (embodied in SKILL.md): input collection deadline (Thursday 12:00); utilization formula and flag thresholds (90% / 40%, three consecutive weeks); backlog buckets (committed next week, candidate next two weeks, parked without owner); promotion gate (free slot AND owner agreement); follow-up rule; no-invention rule; product-owner priority tie-break; output contract; validation signals.
Discarded: the source's framing sentences ("Source for distillation", "Does not cover incident response") — moved to this boundary rather than the skill body; no other prose was substantive.
