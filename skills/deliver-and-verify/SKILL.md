---
name: deliver-and-verify
description: "Use when asked to add, build, implement, or ship a code feature, parser, serializer/export format, endpoint, or bug fix, or when shipping an authorized operational, repository, marketing, or commercial change end-to-end (such as a repository rename, DNS/config change, migration/cutover, approved promotion, or commercial close). Enforces Finish-First in-lane, Single Writer per target, Launch Burn-down (Scope Hammering), Complete Replacement (migrate callers, delete old path), Sibling Sweep (Yokoten), live readback after every write, and an External Write Pre-Flight & Submission Receipt gate (read the target's live status before any external write, never resend an in-flight request, and record endpoint, UTC timestamp, response status, and returned submission/event ID on the first call). Do NOT use when only drafting/reviewing a plan or architecture (use self-challenge), only reviewing a PR or investigating past root causes (use prove-it), or only drafting/rewriting/translating prose (use clear-writing)."
---

# Deliver and Verify (`deliver-and-verify`)

Own the authorized outcome from execution through verified completion at the real user, partner, or operator surface. This skill governs **doing and shipping work** across software engineering, repository/infrastructure operations, commercial/partner execution, and marketing launches.

## Core Execution Laws (Enforce on Every Delivery)

1. **Finish-First Within a Lane (Aging WIP Priority)**:
   - For work of comparable priority on the same surface, pull from the right side of the board first: **Live Verification (`Verify`) > Open PR Merge (`Review/Merge`) > Active Implementation (`In-Progress`) > Starting New Work (`New`)**. Finish your in-flight verification or merge on that surface before opening a new item there, unless pre-empted by a higher-CD3 blocker or live incident, or while an external step is genuinely waiting asynchronously.
2. **Single Writer per Target**:
   - Parallel subagents may research, read logs, or audit in read-only mode, or work in disjoint worktrees/targets.
   - Exactly **one named writer** edits a given worktree, pull request, database record, or live configuration at a time.
3. **Product Convergence & Launch Burn-down (Scope Hammering)**:
   - When driving a product, remake, or platform cutover to launch, work from a **finite, burn-down-only checklist** of what a real user needs to complete the core value loop (or the screen-by-screen parity sheet for a remake).
   - Once in convergence, the checklist only shrinks: hammer every newly discovered nice-to-have, polish idea, or non-blocking enhancement to post-launch items rather than expanding pre-launch scope.
4. **Upstream-First with Upstream Purity (Boundary Placement)**:
   - If the task hits a bug or missing capability in an **owned upstream** (engine, platform, shared SDK/skill), fix or build the generic capability in the upstream—never hack a downstream bypass.
   - Keep the upstream pure (`Customer Zero`): no downstream product names, backdoors, or privilege bypasses in shared layers, and depend only on published upstream versions.
5. **End-State Method B on Day 1 + Clean-Slate Replacement + Sibling Sweep (Yokoten) + Guard (Poka-Yoke)**:
   - **Build Proven End-State (Method B) in the First PR**: Where a proven, scalable design (**Method B**) exists, build it in the first PR rather than landing a weaker transitional **Method A** that creates future data, contract, or caller migration cost.
   - **Optimize Total Cost to Verified Outcome, Not Lines Typed**: Do not default to stacking defensive band-aid patches just to touch fewer lines. When a failure recurs on a boundary or a fix requires workarounds, compare local repair against clean boundary replacement by total cost to a verified outcome (verification, caller migration, failure recovery, and cleanup). When the model is structurally flawed or replacement has lower total cost to a verified outcome, lock the contract with tests, replace the mechanism cleanly in one pass, migrate every caller, and delete the old code, flags, tests, and docs in the same change.
   - **Sibling Sweep (Yokoten)**: When fixing a defect, search the repository and sibling components for the same failure pattern and fix every instance in one pass.
   - **Standing-Rule Guard (Poka-Yoke)**: A standing rule or invariant broken once ships with the default, type constraint, or check that enforces it (reusing existing mechanisms rather than inventing a new service or bespoke CI gate per incident); a one-off ruling gets no guard.
6. **External Write Pre-Flight & Submission Receipt (Never Resend an In-Flight Request)**:
   - **Pre-flight read**: Before calling any external write API—a store review submission, payment or webhook trigger, messaging/social post, or DNS/cloud mutation—read the target's live status and timeline in the same session (`date -u`). If a request is already in flight, already accepted, or already recorded, do not send it again; inspect its current state and continue from that receipt.
   - **Receipt on the first call**: Record a submission receipt on the work record: the endpoint, the `date -u` UTC timestamp, the HTTP/response status, and the returned submission/event/resource ID. Reuse that receipt for every status check, retry, or follow-up. An unknown receipt means read the target again before any second write; a blind retry that creates a duplicate submission is a defect.

---

## Stage 1: Lock Acceptance Test Cases First

Before editing code, running an operational command, or publishing an asset:
1. State the concrete **positive test cases** (what observable behavior or state must succeed at the real surface) and **negative/invariant test cases** (what bad inputs, unauthorized calls, or regressions must fail closed). If the brief lacks clear acceptance criteria, shape them with [`../author-item/SKILL.md`](../author-item/SKILL.md).
2. For operational or live-state changes (such as renaming a repository, updating a setting, or modifying database rows via the operator API), **read and record the current live state before acting (`Before Read`)** with a `date -u` timestamp.

---

## Stage 2: Verify the Plan & Protect Live Users

1. **Read Primary Sources Live**: Read the actual codebase, live config, and any external specification/API docs in the current session—never from memory.
2. **Live-User Continuity vs Pre-Launch Speed**:
   - **Live Products with Real Users**: Zero broken accounts, zero lost data, zero failed logins, and never stop taking paid orders. Reach a new storage or service path by **adding the new replica/path and switching over**—never migrate in place. Database migrations change schema only; state/record updates go through the operator API (or audited write role with before-and-after row reads).
   - **Pre-Launch Products (Zero Real Users)**: No grandfathering, no maintenance windows, and no compatibility shims—change directly to the cleanest target design.

---

## Stage 3: Execute, Ship, and Verify at the Real Surface ("Done" = Live Readback)

1. **Build & Verify in the Local Inner Loop First (No CI-Driven Debugging)**:
   - Run compilation, unit/integration tests (`FAIL_TO_PASS` and `PASS_TO_PASS`, plus property/adversarial tests where appropriate), and local dev-server / end-to-end surface verification in the local inner loop until the entire outcome passes with zero defects; never push partial commits to use remote CI as a compiler or debugger, and never split one fix into sequential trial-and-error PRs.
   - For local single-host / dev-machine software, build, verify, and activate directly in place in the local environment first without blocking on a remote PR/CI round-trip.
   - For operational, config, or publishing actions (such as renaming a repository or publishing approved copy), reuse existing checks and verify via live `Before Read` / `After Read`.
   - Complete the **Sibling Sweep** and delete all superseded paths.
2. **Ship Through the Standard Outer Loop Once**:
   - Once the complete outcome is verified in the local inner loop, package it into one clean pull request and run CI and the repository's normal merge queue once (never force-push or bypass checks).
   - **Tier 3 changes** (live real-user product or real-user data store deletion/migration) require an independent review pass ([`../prove-it/SKILL.md`](../prove-it/SKILL.md)) before merge; all other tiers merge on green automated checks.
   - For GitOps-managed infrastructure, coordinate competing reconciliation on the affected resource so an auto-sync does not overwrite an urgent mitigation, and merge the matching change through Git.
3. **Verify at the Real Surface (`After Read`)**:
   - Opening or merging a PR is a checkpoint, never completion. Follow the canonical completion and review-tier table in [`../author-item/references/work.md#done-and-review-stage-3-atdd-verification`](../author-item/references/work.md#done-and-review-stage-3-atdd-verification) (**Tier 3 live real-user changes require an independent live verifier pass on the post-rollout production verification**).
   - Read back the authoritative live surface ([`../prove-it/SKILL.md`](../prove-it/SKILL.md)) with `date -u`:
     - *Deployed Service*: Verify the serving revision/SHA and run the Stage 1 positive and negative checks against the live endpoint.
     - *Operational / Repository Action (e.g., repo rename, config update, DNS/secret change)*: Read back the updated object from the live API/CLI and verify dependent callers/redirects.
     - *Pre-launch Library / CLI / Docs (no live deployment)*: Green CI and artifact verification on the merged commit.

---

## Domain Reference Standards (Load When Relevant)

- [references/code.md](references/code.md) — Pure-core / imperative-shell structure, error handling, transactions, idempotency, and migrations
- [references/auth.md](references/auth.md) — Sign-in, passkeys/WebAuthn, OAuth/OIDC, workspaces, and RFC 8693 delegated grants
- [references/security.md](references/security.md) — Secret handling (read once, never print), fail-closed guards, injection defense, and recovery ladder
- [references/integration.md](references/integration.md) — Third-party APIs, webhooks, idempotency keys, retries, and billing callbacks
- [references/identifiers.md](references/identifiers.md) — TypeID / UUIDv7 entity IDs, slugs, and external key formats
- [references/performance.md](references/performance.md) — Latency budgets, query discipline, caching, streaming, and real-time events
- [references/dx.md](references/dx.md) — CLI/SDK ergonomics, CI speed, merge queue discipline, and rollout runbooks
