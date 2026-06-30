# community-governance-review behavior example

skill: community-governance-review

## Positive prompt

> Design governance for a creator marketplace community with roles, norms, moderation, councils, events, feedback routing, transparency, and leader sustainability.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Classifies community type and defines purpose, member promise, roles, norms, decision boundaries, and feedback routes.
- Includes moderation ladder, transparency, incentives, events, health metrics, safety escalation, and leadership sustainability.
- Flags vanity engagement, faction capture, unpaid leader overload, harassment neglect, and incentives that reward low-quality volume.

It should also produce the artifact shape requested by `skills/community-governance-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review a revenue forecast capacity plan.

The skill should not load for this prompt unless the user adds an explicit community-governance-review context.

## Expected behavior

- Classifies community type and defines purpose, member promise, roles, norms, decision boundaries, and feedback routes.
- Includes moderation ladder, transparency, incentives, events, health metrics, safety escalation, and leadership sustainability.
- Flags vanity engagement, faction capture, unpaid leader overload, harassment neglect, and incentives that reward low-quality volume.
