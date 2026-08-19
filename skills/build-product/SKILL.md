---
name: build-product
description: "Build a missing product capability end to end. Use when an accepted direction needs a usable slice, including sign-in, durable data, background jobs, outbound events, or another managed backend through the product's current provider."
---

# Build Product

Turn an accepted product outcome into a complete capability on a real user path.

## Method

1. Define the user, journey, capability, owning repository, constraints, and observable done condition.
2. Inspect the current path and locate each gap at its semantic owner: product domain, shared platform, interface, data, or operations.
3. Choose the smallest complete vertical slice that delivers the capability with one source of truth.
4. Implement the slice through the repository's established architecture and public contracts.
5. Cover normal behavior, important failure behavior, recovery, security, and operability on the changed path.
6. Update product documentation and public interfaces when the delivered behavior changes them.
7. Run the changed path with the repository's compiler, tests, and the fastest representative user journey.
8. Land, release, or deploy when the requested terminal and available authority include that layer.

## References

Open only the file that matches the current slice:

- [Authenticate users](references/authenticate-app-users.md) for sign-in, session, and recovery
- [Persist app data](references/persist-app-data.md) for databases, KV, objects, or search
- [Run background work](references/run-background-work.md) for cron, queues, or jobs
- [Deliver app events](references/deliver-app-events.md) for email, webhooks, realtime, or push
- [Managed backend services](references/managed-backend-services/METHOD.md) for flags, search, analytics, AI routing, or consent
- [Event contracts](references/event-contracts.md) to classify something called an event
- [Expand a working core](references/expand-product.md) when the loop already works and a scale constraint is the job

Payments, interface craft, distribution, and CI stay on their own listings.
Use `execute-hard-cutover` when the capability replaces an existing
implementation or data path.

## Ownership

- Keep product rules with the product that owns them.
- Reuse an existing platform capability when it already owns the infrastructure job.
- Read the product's current provider contract and official provider docs; do not invent a second runtime.

## Completion

Return:

- the capability delivered and the user path it enables;
- the owning files and contracts changed;
- the checks and representative journey run;
- the truthful local, landed, released, or live state; and
- any external blocker or remaining product gap.
