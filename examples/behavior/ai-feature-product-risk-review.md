# ai-feature-product-risk-review behavior example

skill: ai-feature-product-risk-review

## Positive prompt

> Review product risks for launching an AI support copilot that drafts replies, classifies tickets, and suggests refunds.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Classifies AI job, autonomy level, data sensitivity, harm if wrong, and model/output boundaries.
- Requires evals, UI transparency, fallback, monitoring, support paths, and rollout gates.
- Flags high-risk automation, privacy, hallucination, abuse, cost, latency, and provider/model-change risks.

It should also produce the artifact shape requested by `skills/ai-feature-product-risk-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Plan a community launch calendar.

The skill should not load for this prompt unless the user adds an explicit ai-feature-product-risk-review context.

## Expected behavior

- Classifies AI job, autonomy level, data sensitivity, harm if wrong, and model/output boundaries.
- Requires evals, UI transparency, fallback, monitoring, support paths, and rollout gates.
- Flags high-risk automation, privacy, hallucination, abuse, cost, latency, and provider/model-change risks.
