---
name: developer-sandbox-abuse-prevention-review
description: Design and audit developer sandbox abuse prevention for API, plugin, app, and marketplace products covering signup friction, environment isolation, synthetic data, quotas, token issuance, webhooks, email/SMS sending, compute/storage limits, fraud signals, graduated trust, review queues, appeals, and developer experience. Use when sandboxes must stay open without becoming abuse infrastructure.
---

# Developer Sandbox Abuse Prevention Review

Use this skill to convert developer sandbox, free trial, API key, plugin testing, webhook, synthetic data, quota abuse, token mining, spam, fake app, marketplace certification, and sandbox trust questions into a concrete artifact with owners, gates, metrics, and recovery paths.

## Workflow

1. Identify sandbox entry points, developer identity, API keys, tokens, data boundaries, risky capabilities, quota model, fraud signals, review paths, support burden, and graduation criteria.
2. Read `references/developer-sandbox-abuse-prevention-patterns.md`.
3. Classify the situation as open signup sandbox, invite-only sandbox, marketplace integration sandbox, API trial, certification environment, high-risk capability request, suspected abuse spike, or graduation-to-production review.
4. Define environment isolation, synthetic data policy, quota ladder, risky capability gates, abuse detection, graduated trust, manual review, appeal path, developer messaging, and production promotion gate.
5. Produce sandbox abuse prevention review, state machine, decision table, event schema, control checklist, queue policy, and developer-safe mitigation plan.

## Guardrails

- Do not solve abuse only by adding signup friction that destroys legitimate developer activation.
- Do not allow sandbox credentials, webhooks, or test data to reach production customers or real regulated data.
- Do not expose fraud rules or exact thresholds in developer-facing messaging.
- Do not make automated risk scores final without review, appeal, and false-positive monitoring for high-impact actions.

## Output format

```text
Developer sandbox context:
Audience / source of truth / risk boundary:

Sandbox abuse control plan:
| Area | Decision | Evidence | Risk | Owner |
| --- | --- | --- | --- | --- |

Entry points, quotas, risky capabilities, signals, review queues, appeals, and graduation gates:
- <trigger> -> <policy, metric, edge case, support note>
```
