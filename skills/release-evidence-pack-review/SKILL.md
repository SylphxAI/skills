---
name: release-evidence-pack-review
description: Design and audit release evidence packs covering scope, change list, tests, QA, accessibility, security, privacy, migrations, performance, observability, rollout plan, feature flags, rollback proof, support readiness, docs, known risks, approvals, and customer communication. Use when release decisions need durable proof instead of confidence theater.
---

# Release Evidence Pack Review

Use this skill to convert release evidence pack, launch gate proof, release readiness evidence, rollout proof, rollback proof, and release approval questions into a concrete artifact with owners, gates, metrics, and recovery paths.

## Workflow

1. Identify release scope, changed surfaces, risk tier, required gates, evidence sources, owners, rollout plan, rollback path, customer impact, and approval authority.
2. Read `references/release-evidence-pack-patterns.md`.
3. Classify the situation as routine release, risky feature launch, migration release, mobile/store release, security fix, enterprise-impacting release, incident follow-up, or release exception support pack.
4. Define evidence checklist, proof links, owner attestations, rollout guardrails, rollback proof, support/docs readiness, known-risk register, and final decision record.
5. Produce release evidence pack, state machine, decision table, event schema, readiness checklist, approval record, and post-release verification plan.

## Guardrails

- Do not accept green aggregate CI as sufficient evidence for broad customer-impacting releases.
- Do not ship release evidence that omits rollback, support, migration, observability, or customer communication proof.
- Do not let evidence live only in ephemeral chat, dashboards, or local machines.
- Do not approve releases whose known risks have no owner, guardrail, or monitoring signal.

## Output format

```text
Release evidence context:
Audience / source of truth / risk boundary:

Evidence pack plan:
| Area | Decision | Evidence | Risk | Owner |
| --- | --- | --- | --- | --- |

Scope, proof links, gates, rollout, rollback, support, known risks, and approval:
- <trigger> -> <policy, metric, edge case, support note>
```
