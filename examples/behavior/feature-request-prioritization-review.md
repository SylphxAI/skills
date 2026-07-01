# feature-request-prioritization-review behavior example

skill: feature-request-prioritization-review

## Positive prompt

> Prioritize feature requests from support tickets, enterprise sales, app reviews, research interviews, analytics drop-offs, and community posts for a SaaS roadmap.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Normalizes requests into jobs/problems, clusters duplicates, scores evidence quality, segment fit, impact, confidence, effort, risk, dependencies, and strategy fit.
- Separates bugs, UX confusion, compliance/security needs, integrations, package gaps, enhancements, and strategic bets.
- Flags loud-customer bias, sales urgency as roadmap, unapproved commitments, undifferentiated request lists, and poor close-the-loop communication.

It should also produce the artifact shape requested by `skills/feature-request-prioritization-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review sales commission accelerators.

The skill should not load for this prompt unless the user adds an explicit feature-request-prioritization-review context.

## Expected behavior

- Normalizes requests into jobs/problems, clusters duplicates, scores evidence quality, segment fit, impact, confidence, effort, risk, dependencies, and strategy fit.
- Separates bugs, UX confusion, compliance/security needs, integrations, package gaps, enhancements, and strategic bets.
- Flags loud-customer bias, sales urgency as roadmap, unapproved commitments, undifferentiated request lists, and poor close-the-loop communication.
