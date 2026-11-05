---
name: deliver-and-verify
description: "Use when implementing or shipping a feature, bug fix, parser, export format, endpoint, checkout or voucher channel, synthetic probe, zero-token external inbox/queue watcher, or authorized operational, repository, marketing, or commercial change. Carry the outcome through execution and verification at its real surface. Use self-challenge for a plan or architecture, prove-it for a review or evidence check, and clear-writing for prose alone."
---

# Deliver and verify

Carry the authorized outcome through execution and verification at the user, partner, or operator surface. Use the existing grants and release path; preserve user data and authorized spending limits.

When changing a game, app or SaaS user journey, remaking a product, or publishing
assets or configuration that change the experience, or comparing engines, read
[parity.md](references/parity.md) before defining the acceptance cases. It owns
the screen-and-feature comparison, engine benchmarks, live evidence and automated
release checks.

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

For long builds or tests in a deadline-limited cloud session, read
[turn-boundaries.md](references/turn-boundaries.md) before starting execution.

## Execute and verify

1. Run practical targeted checks, then publish one coherent change. State the remaining uncertainty; fix failures and rerun the affected checks on the same branch. Follow the repository's required checks and normal merge queue without force-push or bypass merge. Review depth follows the change's risk; independent review can run alongside or after delivery and does not create a separate completion stage.
2. For an external mutation, identify the intended operation and read its live status/timeline before submitting. Continue from an existing receipt instead of creating another in-flight submission. On the first call, record endpoint, UTC time, response status and returned operation/resource ID. Use provider-supported idempotency and retry semantics; if the result is unknown, inspect the target before a repeat. Recovered or overlapping sessions can repeat a step, so guard a one-time action with a lock, a fresh read of the authoritative attempt and an exclusive marker written before the call; once the marker exists, reconcile and never resend. Keep the guard in a script, so whoever holds working execution can run it safely.
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
- [code.md](references/code.md): domain boundaries, transactions, tests and migrations.
- [auth.md](references/auth.md): sign-in, sessions, recovery and delegated access.
- [security.md](references/security.md): authority, secrets, personal data and recovery.
- [integration.md](references/integration.md): provider calls, webhooks and reconciliation.
- [identifiers.md](references/identifiers.md): identity, text encodings, slugs and credentials.
- [performance.md](references/performance.md): journey budgets, queries and measurement.
- [dx.md](references/dx.md): APIs, packages, feedback loops and releases.
- [private-device-preview.md](references/private-device-preview.md): art, text or layout edits in a private real-client session without publishing content or a store build; cold/warm timing and exclusive device handoff.
