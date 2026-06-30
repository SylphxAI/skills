# partner-channel-program-review behavior example

skill: partner-channel-program-review

## Positive prompt

> Design a partner channel program for SaaS with referral, reseller, implementation, and technology partners, including tiers, incentives, lead registration, certification, support ownership, MDF, and conflict rules.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines partner motion, qualification, tiers, obligations, incentives, lead registration, deal protection, certification, enablement, claims policy, support ownership, and governance.
- Includes metrics for accepted leads, conversion, time-to-live, retention, support load, NPS, margin, complaints, and partner health.
- Flags low-quality incentives, unsupported partner claims, missing support handoff, channel conflict, margin-negative discounts, and customer harm.

It should also produce the artifact shape requested by `skills/partner-channel-program-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Run a privacy impact assessment for AI analytics.

The skill should not load for this prompt unless the user adds an explicit partner-channel-program-review context.

## Expected behavior

- Defines partner motion, qualification, tiers, obligations, incentives, lead registration, deal protection, certification, enablement, claims policy, support ownership, and governance.
- Includes metrics for accepted leads, conversion, time-to-live, retention, support load, NPS, margin, complaints, and partner health.
- Flags low-quality incentives, unsupported partner claims, missing support handoff, channel conflict, margin-negative discounts, and customer harm.
