# customer-feedback-intake-review behavior example

skill: customer-feedback-intake-review

## Positive prompt

> Design a feedback intake loop that turns support tickets, app reviews, and churn reasons into roadmap evidence without overreacting to anecdotes.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Separates bugs, UX confusion, feature requests, pricing objections, churn reasons, praise, risk signals, and research leads.
- Defines taxonomy, dedupe, enrichment, evidence scoring, routing, decision linkage, privacy redaction, and close-the-loop status.
- Warns against loud-customer bias and false roadmap commitments.

It should also produce the artifact shape requested by `skills/customer-feedback-intake-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design API retry headers for rate limiting.

The skill should not load for this prompt unless the user adds an explicit customer-feedback-intake-review context.

## Expected behavior

- Separates bugs, UX confusion, feature requests, pricing objections, churn reasons, praise, risk signals, and research leads.
- Defines taxonomy, dedupe, enrichment, evidence scoring, routing, decision linkage, privacy redaction, and close-the-loop status.
- Warns against loud-customer bias and false roadmap commitments.
