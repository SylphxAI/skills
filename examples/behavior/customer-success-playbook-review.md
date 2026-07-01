# customer-success-playbook-review behavior example

skill: customer-success-playbook-review

## Positive prompt

> Design customer success playbooks for enterprise SaaS covering onboarding, adoption, health scoring, QBRs, renewal risk, expansion, champion change, support escalations, and product feedback loops.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines lifecycle stage, segment, triggers, entry/exit criteria, touchpoints, assets, owners, escalations, and metrics for repeatable customer outcomes.
- Separates onboarding, adoption, risk recovery, QBR, renewal, expansion, champion-change, and escalation playbooks.
- Flags CSM heroics, generic high-touch coverage, noisy health scores, QBRs without value proof, late renewal saves, and product blockers with no owner.

It should also produce the artifact shape requested by `skills/customer-success-playbook-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review API version deprecation policy.

The skill should not load for this prompt unless the user adds an explicit customer-success-playbook-review context.

## Expected behavior

- Defines lifecycle stage, segment, triggers, entry/exit criteria, touchpoints, assets, owners, escalations, and metrics for repeatable customer outcomes.
- Separates onboarding, adoption, risk recovery, QBR, renewal, expansion, champion-change, and escalation playbooks.
- Flags CSM heroics, generic high-touch coverage, noisy health scores, QBRs without value proof, late renewal saves, and product blockers with no owner.
