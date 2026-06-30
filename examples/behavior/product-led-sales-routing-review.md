# product-led-sales-routing-review behavior example

skill: product-led-sales-routing-review

## Positive prompt

> Design product-led sales routing for a freemium SaaS with activation signals, PQL scoring, enterprise domains, expansion signals, CRM ownership, sales capacity, lifecycle messages, suppression, and conversion-quality guardrails.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines product signals, PQL/PQA scoring, account matching, owner rules, routing thresholds, sales capacity, suppression, CRM sync, message playbooks, and outcome feedback.
- Separates self-serve, nurture, sales-assist, enterprise AE, CS expansion, partner, support-assist, disqualified, and suppress states.
- Flags routing every signal to sales, consent/support suppression gaps, product/CRM owner mismatch, meeting-only optimization, and low-quality sales tasks.

It should also produce the artifact shape requested by `skills/product-led-sales-routing-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review marketplace payout risk and dispute economics.

The skill should not load for this prompt unless the user adds an explicit product-led-sales-routing-review context.

## Expected behavior

- Defines product signals, PQL/PQA scoring, account matching, owner rules, routing thresholds, sales capacity, suppression, CRM sync, message playbooks, and outcome feedback.
- Separates self-serve, nurture, sales-assist, enterprise AE, CS expansion, partner, support-assist, disqualified, and suppress states.
- Flags routing every signal to sales, consent/support suppression gaps, product/CRM owner mismatch, meeting-only optimization, and low-quality sales tasks.
