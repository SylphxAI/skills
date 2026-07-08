---
name: customer-support-operations
description: Design customer support operations for software products including help centers, ticket triage, refund handling, escalation, support tooling, incident communication, macros, trust recovery, abuse review, and product feedback loops. Use when building or auditing support systems for apps, games, SaaS, utilities, stores, or subscription products.
---

# Customer Support Operations

Use this skill to turn support from a reactive inbox into a product trust system.

## Workflow

1. Identify support surfaces: help center, in-app support, email, chat, store reviews, community, incident status.
2. Read `references/support-ops-patterns.md`.
3. Define issue taxonomy, triage, escalation, support data, refund/entitlement tools, and feedback loops.
4. Design macros and user messaging that solve without blame.
5. Produce support metrics and product fixes.

## Guardrails

- Do not design support that blames users or hides refund, billing, or entitlement truth.
- Do not collapse provider-specific refund authority into one generic macro.
- Do not skip product feedback loops; recurring support themes must route to owners.

## Output format

```text
Support channels:
Issue taxonomy:
Triage and escalation:
Support tooling:
Macros/messages:
Metrics:
Product feedback loop:
```

## When not to use

- Do not use when the job belongs to `refund-and-support-flow-review` — Refund, chargeback, entitlement revocation, restore/repurchase state machines.
- Do not use when the job belongs to `refund-and-support-flow-review` — Defer when the job matches refund-and-support-flow-review instead.
- Do not use when the job belongs to `support-quality-qa-review` — QA sampling is a module of support ops, not a separate entry point.
- Do not use for generic advice the base model already handles without this skill's specific artifact contract.
