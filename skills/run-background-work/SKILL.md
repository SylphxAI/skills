---
name: run-background-work
description: Run cron, queues, or jobs through the product's current scheduler or worker path. Use when adding scheduled or background work that outlives one request.
---

# Run Background Work

Run work that outlives one request through the owning product's current
scheduler, queue, or worker contract.

## Method

1. Name the activation (time, queue, invoke), idempotency key, progress
   store, retry, and observable terminal.
2. Inspect the repository's current job runner, queue, or scheduler and its
   official documentation. Do not add a parallel worker plane when one already
   owns the job.
3. Implement an idempotent handler on that current contract. Persist progress
   with `persist-app-data`. Isolated untrusted exec uses
   `provision-agent-workspace`.
4. Prove one activation reaches a typed terminal, including retry and
   duplicate delivery.

## Output

Return the activation owner, handler contract, progress store, terminal
observed, and strongest truthful delivery state.

## Boundaries

HTTP request handling stays on the product web surface. Durable state stays
with `persist-app-data`. Isolated exec sessions stay with
`provision-agent-workspace`.
