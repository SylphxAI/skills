# user-research-repository-review behavior example

skill: user-research-repository-review

## Positive prompt

> Design a user research repository that combines interviews, usability tests, support tickets, churn reasons, app reviews, and analytics anomalies into consent-safe decision-linked insights.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines evidence taxonomy, consent/redaction rules, tagging, confidence scoring, decision linkage, stale-review cadence, and repository ownership.
- Separates observation, interpretation, synthesized insight, recommendation, and decision outcome.
- Flags PII leakage, loud-anecdote bias, unsearchable archives, stale insights, and quote-driven roadmap decisions.

It should also produce the artifact shape requested by `skills/user-research-repository-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design a model routing cost policy for AI inference.

The skill should not load for this prompt unless the user adds an explicit user-research-repository-review context.

## Expected behavior

- Defines evidence taxonomy, consent/redaction rules, tagging, confidence scoring, decision linkage, stale-review cadence, and repository ownership.
- Separates observation, interpretation, synthesized insight, recommendation, and decision outcome.
- Flags PII leakage, loud-anecdote bias, unsearchable archives, stale insights, and quote-driven roadmap decisions.
