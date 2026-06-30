# Opportunity Scoring Systems

Opportunity scoring is useful when it exposes assumptions and sequencing, not when it hides judgment behind a formula.

## Rule IDs

- `opportunity-1` — Score opportunities as outcomes or user problems, not raw features.
- `opportunity-2` — Define the goal: revenue, retention, activation, support reduction, risk reduction, strategic learning, or quality.
- `opportunity-3` — Use confidence bands; separate measured evidence from founder/team intuition.
- `opportunity-4` — Include effort and sequencing cost, not just engineering estimate.
- `opportunity-5` — Include risk: policy, privacy, accessibility, support, abuse, operations, and brand trust.
- `opportunity-6` — High learning value can justify low immediate impact when uncertainty is strategic.
- `opportunity-7` — Identify dependencies and mutually exclusive bets before ranking.
- `opportunity-8` — Run sensitivity analysis on the top factors that could change the ranking.
- `opportunity-9` — Recommend the next proof: research, prototype, experiment, sales test, support analysis, or build.
- `opportunity-10` — Keep rejected items with reasons so they do not reappear without new evidence.

## Scoring table

| Factor | Question | Scale guidance |
| --- | --- | --- |
| Impact | What outcome moves if this works? | 1 small, 3 meaningful, 5 company-level |
| Confidence | How strong is evidence? | 1 guess, 3 directional, 5 measured/repeated |
| Effort | What capacity and coordination does it consume? | 1 small, 3 team-sized, 5 cross-org |
| Risk | What can fail or harm trust? | 1 low, 3 manageable, 5 high/blast radius |
| Strategic fit | Does it reinforce wedge and roadmap? | 1 distracts, 3 adjacent, 5 core |
| Urgency | Is timing externally constrained? | 1 anytime, 3 soon, 5 now-or-never |
| Learning | Does it reduce critical uncertainty? | 1 little, 3 useful, 5 decisive |

## State machine

```text
raw_ideas -> opportunity_normalized -> evidence_attached -> scored
scored -> sensitivity_checked -> ranked -> sequence_selected
ranked -> proof_needed -> validation_run -> score_updated
sequence_selected -> shipped_or_rejected -> readout -> opportunity_archive_updated
```

## Event schema

Recommended records:

- `opportunity_created`: opportunity_id, source, target_outcome, segment, owner.
- `opportunity_scored`: opportunity_id, impact, confidence, effort, risk, fit, urgency, learning.
- `opportunity_validated`: opportunity_id, validation_type, result, confidence_delta.
- `opportunity_decided`: opportunity_id, decision, sequence, rationale, revisit_trigger.

## Checklist

- Opportunities are normalized to comparable outcomes.
- Evidence source and confidence are explicit.
- Scores include effort, risk, strategic fit, urgency, and learning value.
- Sensitivity analysis identifies what could change the answer.
- Recommendation includes next proof and sequencing.
