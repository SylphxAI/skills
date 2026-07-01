# executive-business-review-operating-system-review behavior example

skill: executive-business-review-operating-system-review

## Positive prompt

> Design an executive business review operating system for enterprise SaaS accounts with account tiering, executive sponsors, value realization metrics, product adoption, support risks, roadmap asks, renewal timing, expansion signals, action owners, and follow-up cadence.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines account tiering, cadence, executive sponsor map, customer outcomes, value proof, adoption metrics, risk register, roadmap ask routing, renewal/expansion signals, actions, owners, and follow-up rhythm.
- Separates status reporting, value realization, executive decisions, roadmap asks, risk recovery, renewal readiness, and expansion planning.
- Flags slideware-only reviews, vanity metrics, sponsor gaps, false roadmap promises, unresolved adoption/support risks, drifting actions, and renewal surprises.

It should also produce the artifact shape requested by `skills/executive-business-review-operating-system-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review marketplace fraud queues.

The skill should not load for this prompt unless the user adds an explicit executive-business-review-operating-system-review context.

## Expected behavior

- Defines account tiering, cadence, executive sponsor map, customer outcomes, value proof, adoption metrics, risk register, roadmap ask routing, renewal/expansion signals, actions, owners, and follow-up rhythm.
- Separates status reporting, value realization, executive decisions, roadmap asks, risk recovery, renewal readiness, and expansion planning.
- Flags slideware-only reviews, vanity metrics, sponsor gaps, false roadmap promises, unresolved adoption/support risks, drifting actions, and renewal surprises.
