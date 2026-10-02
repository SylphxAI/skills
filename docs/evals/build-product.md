# Evals: build-product

Scoring: each rubric item is pass or fail; a task passes at 3 of 4 items. Prompts are self-contained; the model answers in text only with a short build plan (no code longer than a few lines).

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
