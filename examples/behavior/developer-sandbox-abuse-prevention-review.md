# developer-sandbox-abuse-prevention-review behavior example

skill: developer-sandbox-abuse-prevention-review

## Positive prompt

> Review developer sandbox abuse prevention for an API marketplace with open signup, API keys, OAuth scopes, webhooks, email testing, synthetic data, quotas, token churn, fake apps, certification, production promotion, manual review, and developer appeals.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines sandbox entry points, environment isolation, synthetic data, risky capabilities, quota ladder, trust tiers, abuse signals, review queues, appeals, developer messaging, and production promotion gates.
- Separates activation friction, identity verification, API quotas, capability gating, data isolation, deliverability risk, marketplace certification, manual review, and false-positive monitoring.
- Flags production data leakage, sandbox credentials touching customers, threshold leakage, signup-friction overcorrection, automated final decisions, weak appeals, and unmeasured developer harm.

It should also produce the artifact shape requested by `skills/developer-sandbox-abuse-prevention-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Audit contract renewal obligations.

The skill should not load for this prompt unless the user adds an explicit developer-sandbox-abuse-prevention-review context.

## Expected behavior

- Defines sandbox entry points, environment isolation, synthetic data, risky capabilities, quota ladder, trust tiers, abuse signals, review queues, appeals, developer messaging, and production promotion gates.
- Separates activation friction, identity verification, API quotas, capability gating, data isolation, deliverability risk, marketplace certification, manual review, and false-positive monitoring.
- Flags production data leakage, sandbox credentials touching customers, threshold leakage, signup-friction overcorrection, automated final decisions, weak appeals, and unmeasured developer harm.
