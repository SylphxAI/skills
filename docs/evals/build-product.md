# Evals: build-product

Scoring: each rubric item is pass or fail; a task passes at 3 of 4 items. Prompts are self-contained; the model answers in text only with a short build plan (no code longer than a few lines).

Tasks 1-5 test the `SKILL.md` body. Tasks 6-10 (round 2) probe `references/event-contracts.md`: they were run with the reference, with `SKILL.md` alone, and bare.

## Task 1
**Prompt:** Our product already has users in Postgres, a job queue (BullMQ on Redis) and a webhook event bus. Build "weekly digest email" end to end. Give the build plan you would execute.

**Rubric:**
1. Reuses the existing Postgres, queue and event bus instead of adding a new scheduler, database or runtime.
2. Does not keep required state (sent markers, schedules) only in process memory.
3. Includes a verification that exercises the real user path (a user receives a digest), not only config or unit checks.
4. Covers the slice across code, interface (a settings opt-out), data and delivery.

## Task 2
**Prompt:** Users must be able to invite teammates to a workspace. The app has auth via an identity provider and a Postgres database. Plan the slice you would ship.

**Rubric:**
1. Uses the existing identity provider rather than a second account system.
2. Stores invites durably in the existing database, with expiry and acceptance state.
3. Proves the real path end to end (invite sent, link opened, user joins) in the plan.
4. Includes the user interface and delivery (email or link), not only the API.

## Task 3
**Prompt:** Add an "export my data" feature. The product emits domain events when users change data and has a job runner. Describe the build, including how events are involved.

**Rubric:**
1. Runs the export through the existing job runner rather than a new background mechanism.
2. Treats events with a contract: names, payload shape, producer, consumer and delivery behaviour (retries, duplicates, ordering).
3. Does not hold the export state only in memory.
4. Verifies by actually requesting an export and receiving the file.

## Task 4
**Prompt:** We have an accepted direction: let customers pay per seat. The code base has a billing provider, Postgres and a feature-flag service. Plan the first usable slice.

**Rubric:**
1. Builds on the existing billing provider and datastore instead of a parallel billing ledger.
2. Chooses a usable slice on one real user path (one customer changes seats and is billed) rather than a broad scaffold.
3. States how the real path is exercised (test-mode purchase, not just config).
4. Names how it is delivered and rolled out (flag, migration, observability).

## Task 5
**Prompt:** A user asks you to "make notifications real-time" in an app that currently polls. The app has a job system and an event bus. How do you build it?

**Rubric:**
1. Uses the existing event bus and providers; does not introduce a second runtime or a second live writer of the same state.
2. Keeps durability (missed notifications survive restart or disconnect) in persistent storage, not memory.
3. Exercises the real user path (an action in one session appears in another) as the proof.
4. Addresses event semantics: delivery guarantees, duplicates or ordering.

## Task 6
**Prompt:** Round 2 (harder, probes the event-contract reference). Our order service marks an order paid in Postgres and must tell the warehouse service, which is a separate deployment with its own queue, to start picking. Design how the order-paid event is produced and consumed.

**Rubric:**
1. Publishes only after the paid transition commits, using an outbox or an equivalently atomic mechanism, so a crash between commit and publish does not lose the fact.
2. Gives the consumer an idempotency key or event identity and handles duplicates and redelivery.
3. Defines a versioned schema owned by the producer, with event id, occurred time and schema version, and a compatibility rule.
4. Names fixtures or tests for commit-before-publish failure, duplicate and reordered delivery, not only the happy path.

## Task 7
**Prompt:** A mobile app unlocks premium when the client calls our API with "purchase succeeded". Product also wants a `purchase_completed` event feeding the analytics dashboard and the weekly revenue report. Plan the build.

**Rubric:**
1. Treats the server-verified store or billing record as entitlement truth, not the client's "purchase succeeded" call.
2. Separates the analytics event from the domain transition: analytics is never the source of entitlement, money or policy truth.
3. Names the event kinds involved (domain or integration fact, analytics) and gives each a distinct owner or path.
4. Exercises a real purchase (sandbox or test-mode) through entitlement, not only the analytics output.

## Task 8
**Prompt:** Our architect wants CloudEvents with a broker for every event, including `UserRenamed`, which three modules inside our one monolith already use as an in-process call. Decide what to do and explain the boundaries.

**Rubric:**
1. Keeps the in-process domain event native instead of wrapping it in a broker or transport model.
2. Uses CloudEvents (if at all) only for events that cross a process, repository or external-consumer boundary.
3. States that CloudEvents carries occurrence context and does not define the payload, ordering, idempotency or failure behaviour; the product's versioned schema owns the payload.
4. Classifies the facts first (domain, integration, delivery, analytics, telemetry) before choosing a transport.

## Task 9
**Prompt:** A billing consumer activates a customer's plan when it receives `invoice.paid`. Sometimes events arrive late, twice or out of order, and plans end up wrong. Redesign the consumer.

**Rubric:**
1. Treats the event as an immutable fact and wake-up, not as completion: the consumer reconciles desired against observed state.
2. Makes handling idempotent (event id or idempotency key) and defines an ordering scope.
3. Adds a periodic resync or repair path for lost, delayed or reordered events.
4. Handles poison or incompatible messages with retry limits and a dead-letter or quarantine path, with a way to replay.

## Task 10
**Prompt:** After a user requests a data export, we email them. The email provider calls our webhook with `delivered`. Product wants the export job marked "completed" when that webhook arrives, and the in-app banner to say "export ready". Review and fix the plan.

**Rubric:**
1. Does not use the delivery webhook as proof the export committed; job completion is decided by the owning domain transition.
2. Distinguishes message acceptance or delivery from observed completion (the user can actually download the file).
3. Handles webhook duplicates, delay and reordering, and authenticates or authorizes the webhook.
4. Considers privacy, retention or authorization of the event and download link (who can fetch the file).
