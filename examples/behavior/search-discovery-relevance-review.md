# search-discovery-relevance-review behavior example

skill: search-discovery-relevance-review

## Positive prompt

> Audit marketplace search relevance for plugins with filters, sponsored placement, new creators, zero-results, and ranking evals.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Separates retrieval, eligibility, ranking, personalization, editorial, paid placement, and moderation.
- Defines eval queries, relevance metrics, zero-result recovery, debug tools, guardrails, canary rollout, and rollback.
- Flags click-only optimization, unlabeled sponsored results, cold-start unfairness, and trust risks.

It should also produce the artifact shape requested by `skills/search-discovery-relevance-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review account recovery MFA reset risk.

The skill should not load for this prompt unless the user adds an explicit search-discovery-relevance-review context.

## Expected behavior

- Separates retrieval, eligibility, ranking, personalization, editorial, paid placement, and moderation.
- Defines eval queries, relevance metrics, zero-result recovery, debug tools, guardrails, canary rollout, and rollback.
- Flags click-only optimization, unlabeled sponsored results, cold-start unfairness, and trust risks.
