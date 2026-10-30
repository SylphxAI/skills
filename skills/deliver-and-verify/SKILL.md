---
name: deliver-and-verify
description: "Use when implementing or shipping a feature, bug fix, parser, export format, endpoint, or authorized operational, repository, marketing, or commercial change. Carry the outcome through execution and verification at its real surface. Use self-challenge for a plan or architecture, prove-it for a review or evidence check, and clear-writing for prose alone."
---

# Deliver and verify

Carry the authorized outcome through execution and verification at the user, partner, or operator surface. Use the existing grants and release path; preserve user data and authorized spending limits.

## Coordinate the work

- Keep one named writer per worktree, pull request, database record, or live configuration. Parallel readers and writers on independent targets can proceed together.
- Prefer finishing comparable-priority in-flight work on the same target. Continue independent work during an asynchronous wait; choose ready work using the [priority method](../author-item/references/priority.md).
- During launch convergence, keep a finite checklist of the core value loop or remake parity. Defer non-blocking enhancements discovered along the way.
- Repair an owned upstream capability at its owning boundary and consume the published version. Keep downstream business rules and privileged exceptions out of shared layers.
- Compare repair and replacement by total cost to a verified outcome, including migration, recovery and cleanup. When replacing a mechanism, migrate its consumers and remove the superseded path. Split a delivery where a migration or dependency must merge first.
- Search related components for the same defect class. Repair affected instances within the authorized boundary and record separately owned work. Use a default, type or existing check when it proportionately prevents recurrence; a one-off ruling does not need a permanent guard.

## Establish the acceptance cases

Use read-only discovery to understand the target. Before changing it, state the observable positive cases and relevant negative or invariant cases. Use [author-item](../author-item/SKILL.md) when the brief needs clearer acceptance criteria.

Read the relevant code, configuration and external primary specification in the current session. Record the version and read time for an external dependency. For a live mutation, read the affected state before acting.

Preserve existing users' accounts, data and supported client workflows. For a live storage or service cutover, establish the new path, verify it and switch consumers before removing the predecessor. Keep schema migrations separate from operational record changes; [code.md](references/code.md#migrations) owns the details. A reconciler change compares affected declarations with served state and explicitly handles intended removals or revocations, so a rollout does not silently narrow the supported contract. Pre-launch work with no external consumers can change directly.

## Execute and verify

1. Run practical targeted checks, then publish one coherent change. State the remaining uncertainty; fix failures and rerun the affected checks on the same branch. Follow the repository's required checks and normal merge queue without force-push or bypass merge. Review depth follows the change's risk; independent review can run alongside or after delivery and does not create a separate completion stage.
2. For an external mutation, identify the intended operation and read its live status/timeline before submitting. Continue from an existing receipt instead of creating another in-flight submission. On the first call, record endpoint, UTC time, response status and returned operation/resource ID. Use provider-supported idempotency and retry semantics; if the result is unknown, inspect the target before a repeat.
3. For a blocked operational route, follow [unblock](../unblock/SKILL.md). A temporary repair stays within existing grants and has a durable fix and removal condition. Coordinate reconciliation on a GitOps-managed resource and merge the matching configuration.
4. Read the authoritative result back before claiming completion, following [prove-it](../prove-it/SKILL.md). A service needs its serving revision and affected acceptance cases checked; an operation needs the updated object and dependent behavior; a package, CLI or document needs its required checks and published artifact or source verified where applicable. Use a soak only when its measured behavior is part of the outcome.

Opening or merging a pull request is a checkpoint. Completion is the acceptance receipt at the delivered surface. Pre-launch code can be judged by automated checks in its target environment; verification does not add an approval ritual before first use.

## Domain references

- [code.md](references/code.md): domain boundaries, transactions, tests and migrations.
- [auth.md](references/auth.md): sign-in, sessions, recovery and delegated access.
- [security.md](references/security.md): authority, secrets, personal data and recovery.
- [integration.md](references/integration.md): provider calls, webhooks and reconciliation.
- [identifiers.md](references/identifiers.md): identity, text encodings, slugs and credentials.
- [performance.md](references/performance.md): journey budgets, queries and measurement.
- [dx.md](references/dx.md): APIs, packages, feedback loops and releases.
