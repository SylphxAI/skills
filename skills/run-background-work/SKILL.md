---
name: run-background-work
description: Run cron, queues, jobs, or durable workflows through a product's current background-work provider. Use when work outlives one request.
---

# Run Background Work

Run work that outlives one request through the product's current scheduler,
queue, job, or workflow contract.

## When to use

- Adding cron, a queue consumer, a batch job, or function invoke
- Replacing a long-lived worker process

## Method

1. **Name** the activation, such as time, queue, event, or explicit invoke.
2. **Read** the product's current background-work contract and the selected
   provider's current official documentation.
3. **Define** payload authority, identity, ordering, concurrency, retries,
   timeout, cancellation, retention, dead-letter or quarantine, and terminal
   states.
4. **Implement** an idempotent handler. Persist authoritative progress outside
   process memory and make callbacks safe to replay.
5. **Prove** duplicate, retry, timeout, cancellation, recovery, and the real
   typed terminal that apply to the job.

## Done

Activation and execution authorities are named, the handler is idempotent,
progress is durable, and the owning terminal was observed.

## Boundaries

Queue acceptance is not completion. Do not create a second scheduler or hide
durable progress in a long-lived process. Isolated agent execution workspaces
belong to `provision-agent-workspace`.
