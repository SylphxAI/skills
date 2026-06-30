# in-product-education-review behavior example

skill: in-product-education-review

## Positive prompt

> Design in-product education for a SaaS onboarding flow with checklists, empty states, templates, contextual help, and expert-user suppression.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Chooses education format based on user moment and confusion, not generic tours.
- Defines trigger, dismissal, persistence, accessibility, localization, help handoff, and retained-action metrics.
- Flags when education is masking broken IA, defaults, or product copy.

It should also produce the artifact shape requested by `skills/in-product-education-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review tax invoice requirements for VAT IDs.

The skill should not load for this prompt unless the user adds an explicit in-product-education-review context.

## Expected behavior

- Chooses education format based on user moment and confusion, not generic tours.
- Defines trigger, dismissal, persistence, accessibility, localization, help handoff, and retained-action metrics.
- Flags when education is masking broken IA, defaults, or product copy.
