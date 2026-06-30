# motion-transition-review behavior example

skill: motion-transition-review

## Positive prompt

> Review this modal and page transition system for subtle modern motion.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Classifies the state change before recommending animation.
- Includes reduced-motion and interruptibility requirements.

It should also produce the artifact shape requested by `skills/motion-transition-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Create a refund abuse policy for consumable IAP.

The skill should not load for this prompt unless the user adds an explicit motion-transition-review context.

## Expected behavior

- Classifies the state change before recommending animation.
- Includes reduced-motion and interruptibility requirements.
