# customer-advisory-board-review behavior example

skill: customer-advisory-board-review

## Positive prompt

> Design a customer advisory board for enterprise SaaS roadmap strategy with member selection, confidentiality, agenda, synthesis, commitments, and follow-up.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Starts from decisions to inform and classifies the format before selecting members and agenda.
- Includes member criteria, bias coverage, confidentiality, incentives, evidence capture, synthesis, commitment control, and follow-up.
- Warns against roadmap-by-committee, logo bias, unapproved promises, and meetings without decision linkage.

It should also produce the artifact shape requested by `skills/customer-advisory-board-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Prepare an enterprise SOC evidence packet.

The skill should not load for this prompt unless the user adds an explicit customer-advisory-board-review context.

## Expected behavior

- Starts from decisions to inform and classifies the format before selecting members and agenda.
- Includes member criteria, bias coverage, confidentiality, incentives, evidence capture, synthesis, commitment control, and follow-up.
- Warns against roadmap-by-committee, logo bias, unapproved promises, and meetings without decision linkage.
