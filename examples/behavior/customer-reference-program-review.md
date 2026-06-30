# customer-reference-program-review behavior example

skill: customer-reference-program-review

## Positive prompt

> Design a customer reference program for enterprise SaaS with logos, quotes, case studies, private reference calls, segment matching, consent, renewal risk, sales intake, and advocacy fatigue controls.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines proof needs, eligibility, consent scope, approval, segment matching, request intake, usage limits, incentives, refresh/retirement, and sales enablement workflow.
- Separates logo, quote, case study, reference call, webinar, analyst/procurement proof, and anonymized aggregate evidence.
- Flags unauthorized logos, invented claims, advocacy fatigue, unhealthy customer asks, stale metrics, and references replacing real product proof.

It should also produce the artifact shape requested by `skills/customer-reference-program-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design product analytics event contracts for onboarding.

The skill should not load for this prompt unless the user adds an explicit customer-reference-program-review context.

## Expected behavior

- Defines proof needs, eligibility, consent scope, approval, segment matching, request intake, usage limits, incentives, refresh/retirement, and sales enablement workflow.
- Separates logo, quote, case study, reference call, webinar, analyst/procurement proof, and anonymized aggregate evidence.
- Flags unauthorized logos, invented claims, advocacy fatigue, unhealthy customer asks, stale metrics, and references replacing real product proof.
