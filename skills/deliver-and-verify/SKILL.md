---
name: deliver-and-verify
description: "Use when secret scanners refuse, provisioning previews, changing source checkouts, changing SQL queries or fixtures, changing session guards, changing database privileges, changing selected-source release inputs, editing PR titles/bodies, changing CI triggers, routing or concurrency, publishing disposable CI probe workflows, enrolling disabled tests in CI, running builds or tests in a lease, generating source, upgrading engine or SDK dependencies, benchmarking engines, repairing recovery references or reconcilers, rotating secrets consumed by Jobs, downsizing or replacing shared resources, changing diagnostic redaction, handling credentials in process arguments, implementing or shipping a feature, bug fix, parser, export format, endpoint, checkout or voucher channel, synthetic probe, zero-token external inbox/queue watcher, or authorized operational, repository, marketing, or commercial change. Use challenge for a plan or architecture, prove-it for a review or evidence check, clear-writing for prose alone."
---

# Deliver and verify

Carry the authorized outcome through execution and verification at the user, partner, or operator surface. Use the existing grants and release path; preserve user data and authorized spending limits.

When changing a game, app or SaaS user journey, remaking a product, or publishing
assets or configuration that change the experience, or comparing engines, read
[parity.md](references/parity.md) before defining the acceptance cases. It owns
the screen-and-feature comparison, engine benchmarks, live evidence and automated
release checks.

For engine or SDK upgrades affecting controls, account entry or host lifecycle,
read [shipping-host verification](references/parity.md#verify-engine-and-sdk-changes-in-the-shipping-host).
Native tests and browser previews can exercise different input and feature paths.

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

For large transfers, shared response caches, fan-out streams, archive restores,
or stored-output replay, read
[bounded memory for large transfers](references/performance.md#bounded-memory-for-large-transfers)
before choosing storage queries and transport APIs.

For code or test changes, read [code.md](references/code.md). Formatting fixes
need independent expected strings and cases that expose locale and sign errors.
UI control and renderer changes also use the [visual acceptance checks](references/parity.md#ui-coverage-geometry-and-painted-output), including engine components tested outside a complete app.

For preview provisioning or reduced-backend profiles, read
[deployment configuration](references/code.md#deployment-configuration) and
[migrations](references/code.md#migrations) before selecting a backend target.

For SQL or database fixture changes, read
[database boundary tests](references/code.md#database-boundary-tests).

When storing process/tool output in JSON or a database, read
[binary output and text storage](references/code.md#binary-output-and-text-storage).
For worker replacement, snapshot selection or partial checkpoints, read
[execution environment recovery](references/code.md#execution-environment-recovery)
before changing capture coverage or restoring user files.

Preserve existing users' accounts, data and supported client workflows. For a live storage or service cutover, establish the new path, verify it and switch consumers before removing the predecessor. Keep schema migrations separate from operational record changes; [code.md](references/code.md#migrations) owns the details. A reconciler change compares affected declarations with served state and explicitly handles intended removals or revocations, so a rollout does not silently narrow the supported contract. Pre-launch work with no external consumers can change directly.

For recovery references, rollback pins or asynchronous reconcilers, read
[recovery references and desired state](references/code.md#recovery-references-and-desired-state)
before changing target selection or resource creation order.

When a policy change must update existing resources, verify declarations created
before the change as well as newly rendered output. Rendering only on creation
or redeploy leaves existing specifications unchanged; use the normal writer's
bounded reconciliation or backfill, preserving exclusions and intended absence,
and verify the served objects before reporting rollout complete.

For long builds or tests, work in leased environments, or results resumed after
a turn boundary, read
[turn-boundaries.md](references/turn-boundaries.md) before starting execution or
resubmitting work.

For public social feed publishing, follow the [social post media and visual inspection checks](../clear-writing/references/articles-and-copy.md#public-social-feed-posts) before sending and verify the attached image afterward.

## Execute and verify

Before bulk mutations, including cancelling CI runs, read
[bulk mutation controls](references/dx.md#bulk-mutations).

When changing selected-source release inputs or their CI guards, read
[selected release inputs](references/dx.md#selected-release-inputs).

When changing shared runtime settings or deployment overlays, rotating secrets consumed by Jobs, or downsizing or replacing shared resources, read
[deployment configuration](references/code.md#deployment-configuration).

For container packaging or one-off container probes, read
[container builds and probes](references/dx.md#container-builds-and-probes).

For source checkout or materialization changes, shared-cache permission failures,
pinned-tool launch failures, generated CLI calls, sandbox build templates or
native compilation failures,
read [first useful success](references/dx.md#first-useful-success).

When changing database test setup or disposable fixture cleanup, read
[database test fixtures](references/dx.md#database-test-fixtures) and
[affected-test selection](references/dx.md#continuous-integration). New fixture
objects still enter repository-wide policy scans.

When changing runtime isolation or removing operational access, read
[runtime isolation](references/security.md#runtime-isolation).

Before changing database roles, privileges, reader transports or session-bound
database checks, read
[shared reader privileges](references/security.md#shared-reader-privileges).

When handling credentials exposed in process arguments or changing diagnostic redaction, read [security.md](references/security.md) to protect the actual launching process and preserve useful diagnostics.

When a secret scanner refuses publication, follow
[reviewing scanner findings](references/security.md#secret-scanner-publication-refusals).

For dependency lockfiles, package publication or registry/download mirrors, read
[interfaces and packages](references/dx.md#interfaces-and-packages).

When changing generator inputs, running a generator locally or remotely, or
running a package manager through a remote command wrapper, read
[source generation](references/dx.md#source-generation).

When editing PR titles or bodies, changing CI triggers, routing or concurrency, publishing disposable CI probe workflows, enrolling disabled tests in CI, running tests in fresh build leases, or selecting checks for source, SDK or transport changes, read
[affected-test selection](references/dx.md#continuous-integration). Tests can
depend on files across language and workspace boundaries.

Before changing provider calls, shared HTTP-client features or defaults, HTTP test doubles, streamed output, queued
dispatch, receipt parsing or webhooks, read [integration.md](references/integration.md). Preserve
relevant endpoint and error-contract boundaries in tests. Admission and later
dispatch can run under different provider configuration.

For browser keyboard defaults or foreground lifecycle changes, also read
[browser input and foreground tests](references/dx.md#browser-input-and-foreground-tests).

For changes to transaction locks or nested transactional helpers, read
[transactions and idempotency](references/code.md#transactions-and-idempotency)
before editing; the lock order starts at the outer transaction and spans a batch.

1. Run practical targeted checks, then publish one coherent change. State the remaining uncertainty; fix failures and rerun the affected checks on the same branch. Follow the repository's required checks and normal merge queue without force-push or bypass merge. Review depth follows the change's risk; independent review can run alongside or after delivery and does not create a separate completion stage.
   When a CLI publishes a title, description or comment from a file, create that file in a unique directory owned by this run (`mktemp -d`) and publish only after the write succeeds. A predictable shared path can retain another run's text when your write fails. Read the published title and body back before reporting success. A structured text argument needs no temporary file.
2. For an external mutation, identify the intended operation and read its live status/timeline before submitting. A mutable target can change after that read: bind the write to the reviewed version through the provider's precondition, such as `gh pr merge --match-head-commit <sha>` or HTTP `If-Match`; a version mismatch requires a fresh read and review. Continue from an existing receipt instead of creating another in-flight submission. On the first call, record endpoint, UTC time, response status and returned operation/resource ID. Use provider-supported idempotency and retry semantics; if the result is unknown, inspect the target before a repeat. Recovered or overlapping sessions can repeat a step, so guard a one-time action with a lock, a fresh read of the authoritative attempt and an exclusive marker written before the call; once the marker exists, reconcile and never resend. Keep the guard in a script, so whoever holds working execution can run it safely.
3. For a blocked operational route, follow [unblock](../unblock/SKILL.md). A temporary repair stays within existing grants and has a durable fix and removal condition. Coordinate reconciliation on a GitOps-managed resource and merge the matching configuration.
4. Read the authoritative result back before claiming completion, following [prove-it](../prove-it/SKILL.md). A service needs its serving revision and affected acceptance cases checked; an operation needs the updated object and dependent behavior; a package, CLI or document needs its required checks and published artifact or source verified where applicable. Use a soak only when its measured behavior is part of the outcome.
5. **Cross-Currency Entitlement Normalization & Canonical Analytics Read-Model:** When shipping or verifying a new checkout, voucher, credit, or payment channel, verify at the live surface that:
   - **Cross-currency entitlement normalization:** Issued vouchers, credits, or wallet top-ups normalize to the recipient wallet's currency via the authoritative FX rate so redemption never fails on a currency mismatch (for example, a USD checkout credit applied to an HKD or TWD wallet).
   - **Canonical analytics read-model:** Settled orders write to—or project into—the same canonical order table that powers live revenue analytics and payment-history lookups, rather than stranding settled revenue in an isolated channel table.
   - **Auth-Redirect Attribution & Public Metadata Hygiene:** When shipping or modifying a web storefront, checkout/voucher funnel, invite landing page, or web/game pack (`keel.toml`), verify on the live HTML response (`curl -sS`) that campaign touches survive `/sign-in?nextUrl=...` redirects into authenticated checkout headers, and that public `<title>`, `<meta name="description">`, `<link rel="canonical">`, absolute `og:image` (`HTTP 200`), and JSON-LD (`VideoGame` / `SoftwareApplication`) contain zero internal or dogfood strings (`rebuilt on Keel`, `dogfood`).
6. **Synthetic Probe CDN Cache Bypass:** When adding or modifying synthetic health, readiness, or scale-to-zero activator probes that traverse a CDN on public domains, ensure probe requests or responses carrying internal routing headers (such as `K-Network-Probe`) explicitly bypass CDN caching (`cache: false` or `Cache-Control: no-store, private`) so synthetic probe bodies never poison public page caches.
7. **Zero-Token Event-Driven Watcher Pattern for Webhook-Less Surfaces:** When monitoring an external inbox, queue, or surface that lacks native push webhooks, never poll with recurring LLM turns (`every: 15m/1h`) and never cancel polling without an active wake wire. Run a lightweight zero-token script or daemon that checks the external surface and writes a `.trigger` file watched via `watch: "file:..."` only when `actionable_count > 0`.
8. **Autonomous Skill Distillation Gate (Completion / Exit Gate):** Before declaring an outcome complete, check whether the task or incident required a **second-attempt detour** (an initial approach hit an undocumented trap and a fallback approach was needed), fixed a **post-ship defect or rework** (an existing verification checklist missed a dimension), surfaced a **recurring cross-agent blind spot**, or produced a **verified reusable playbook** (such as a zero-token file-watch trigger daemon). When any of these occurred, distill the role-neutral governing mechanism into the owning skill in the shared skills repository following [author-skill](../author-skill/SKILL.md)—refining the existing skill in place 90% of the time and verifying its YAML `description: "Use when..."` covers the entry moment—as part of completion, without waiting for a human prompt.

Size the mechanism to the harm. A reversible change to a few fields takes one conditional statement with the row read before and after, not a new role, schema and scheduler. Verify what crosses a boundary: a release, an upload, a live surface. Rehashing your own working files, auditing your own helper with another helper or tracing a queue that will drain by itself costs time and proves nothing to a user.

Opening or merging a pull request is a checkpoint. Completion is the acceptance receipt at the delivered surface plus any triggered skill distillation. Pre-launch code can be judged by automated checks in its target environment; verification does not add an approval ritual before first use.

## Domain references

- [parity.md](references/parity.md): verifying game, app and SaaS journeys against a category leader; remake parity, live captures, asset/table checks and automatic recovery.
- [code.md](references/code.md): domain boundaries, transactions, recovery references, desired state, tests and migrations.
- [auth.md](references/auth.md): sign-in, sessions, recovery and delegated access.
- [security.md](references/security.md): authority, privileged tool maintenance, secrets, personal data and recovery.
- [integration.md](references/integration.md): provider calls, HTTP test doubles and routing, queued dispatch, partial acceptance, webhooks and reconciliation.
- [identifiers.md](references/identifiers.md): identity, text encodings, slugs and credentials.
- [performance.md](references/performance.md): journey budgets, queries and measurement.
- [dx.md](references/dx.md): APIs, packages, affected-test selection, feedback loops and releases.
- [private-device-preview.md](references/private-device-preview.md): art, text or layout edits in a private real-client session without publishing content or a store build; cold/warm timing and exclusive device handoff.
