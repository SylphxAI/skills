---
name: run-background-work
description: "Runs cron, queues, or jobs as Platform Work that HTTP-wakes a web service. Use when adding scheduled or background work."
---

# Run Background Work

Run work that outlives one request as a Sylphx Platform Work Operation.
Platform wakes the `type=web` handler.

## When to use

- Adding cron, a queue consumer, a batch job, or function invoke
- Replacing a long-lived worker process

## Method

1. **Name** the activation (time, queue, invoke).
2. **Keep compute as `type=web`** when required by the active Platform
   contract; request wake-up does not make process memory durable.
3. **Create** the Work Resource using the
   [Sylphx Platform Work contract](../build-product/references/sylphx-platform-contract.md#work-resources).
4. **Implement** an idempotent HTTP callback. Store progress in Platform Data.
5. **Prove** the Operation reaches a typed terminal.

## Done

Activation owner is a Platform Work Resource; handler is request-wake web;
terminal observed.

## Progressive disclosure

- [Sylphx Platform Work contract](../build-product/references/sylphx-platform-contract.md#work-resources)

## Boundaries

Platform control-plane always-on web is not the customer template.
Isolated exec Sessions are provisioned through `provision-agent-workspace`.
