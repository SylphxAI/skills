---
name: deliver-and-verify
description: "Execute an authorized outcome end-to-end through the three-stage ATDD loop (Stage 1: lock acceptance test cases; Stage 2: verify plan passes test cases; Stage 3: execute, clean up, and verify result at the real surface). Use when executing any implementation, operational action, commercial/partner agreement, marketing/growth campaign, or product change, when handing parallel work to one writer, or when carrying a change through merge, deploy, and live verification. Use refactor for behavior-preserving code cleanup, unblock when stopped by a refusal or dependency, and prove-it to verify claims or run a Tier-3 review."
---

# Deliver and Verify (`deliver-and-verify`)

Own the outcome from start to verified completion at the real surface. Whether the work is software engineering, an operational change, a commercial/partner agreement, a marketing/growth launch, or a product update, execute it through one coherent three-stage Acceptance Test-Driven Development (ATDD) loop.

## Stage 1: Lock Acceptance Test Cases First

Before writing code, drafting a contract, or changing live state:
1. Read the authorized outcome item (`goal`, `acceptance`, `constraints`, `references`). If the request arrived ad-hoc without explicit acceptance test cases, define them now using [`../author-item/SKILL.md`](../author-item/SKILL.md).
2. State the concrete **positive test cases** (what observable behavior or state must succeed) and **negative/invariant test cases** (what bad inputs, unauthorized calls, or regressions must fail closed).
3. Run the Stage 1 check in [`../self-challenge/SKILL.md`](../self-challenge/SKILL.md) (Category-Leader Benchmark when shaping a product/growth/commercial/platform surface, Zero-Unrequested-Mechanism Simplification, One-Shot Direct Path).

## Stage 2: Verify the Plan Against the Test Cases

Before executing:
1. Read the live codebase, live configuration, or live commercial/operational records—never rely on memory. When the work depends on an external specification, protocol, law, or vendor API, read and cite that primary source with its version/date and current UTC timestamp.
2. Verify that your proposed design or action plan satisfies **every Stage 1 acceptance test case** (`../self-challenge/SKILL.md` Moment 2).
3. **Single Writer per Target**:
   - Parallel subagents may research, audit, or gather evidence in read-only mode, or work in disjoint worktrees/targets.
   - Exactly **one writer** integrates and writes to a given worktree, pull request, database record, or external document.
4. **Live-User Continuity**:
   - When changing a product or store with active real users, reach the new state by adding the new path/replica and switching over cleanly without breaking active sessions or losing user data. Schema migrations change schema only; data/state changes run through the operator API or audited write role with before-and-after row reads.

## Stage 3: Execute, Clean Up, and Verify at the Real Surface

1. **Build the Complete Replacement in One Pass**:
   - Implement the change, update every affected caller, and delete superseded code, flags, or stale documentation in the same delivery.
   - Write automated tests (`FAIL_TO_PASS` and `PASS_TO_PASS`, plus property/adversarial tests where appropriate) that directly encode the Stage 1 acceptance test cases.
2. **Ship Through the Standard Path**:
   - *Software / Docs / Config*: Run local/CI verification checks ([references/dx.md](references/dx.md)), open or update one pull request, and merge through the repository's normal merge queue. Never force-push or bypass required checks.
   - *Tiered Review Policy*:
     - **Tier 3 (Real-user product change, or deletion/migration of real-user data stores)**: Require an independent review pass (`../prove-it/SKILL.md`) before merge.
     - **All other changes (pre-launch code, internal tools, commercial/growth/ops drafts, Tier 1–2)**: Merge on green automated checks without waiting for a manual pre-approval gate.
3. **Verify at the Real Surface ("Done" = Live Verification)**:
   - Merged or sent is a checkpoint, not completion.
   - Verify the delivered result on the live surface (`../prove-it/SKILL.md`):
     - *Deployed Services*: Read the live deployment version/SHA and execute the Stage 1 acceptance checks against the deployed environment.
     - *Pre-launch Code, Libraries, CLIs, or Docs/Config (no live deployment surface)*: Green automated CI and artifact checks on the merged commit are the complete Stage 3 verdict—never invent a synthetic deployment step.
     - *Commercial / Partner / Growth / Operations*: Read back the published page, signed agreement, active campaign telemetry, or updated operator record from the authoritative source after the write.

## Domain Reference Standards (Load Only What Matches the Task)

- [references/code.md](references/code.md) — Pure-core / imperative-shell structure, error handling, idempotency, and testing
- [references/auth.md](references/auth.md) — Authentication, passkeys/WebAuthn, OAuth/OIDC, workspaces, and delegated grants
- [references/security.md](references/security.md) — Secret handling, fail-closed guards, injection defense, and recovery ladder
- [references/integration.md](references/integration.md) — Webhooks, third-party APIs, retries, idempotency keys, and billing callbacks
- [references/identifiers.md](references/identifiers.md) — Type-prefixed IDs, slugs, external IDs, and key formats
- [references/performance.md](references/performance.md) — Latency budgets, query discipline, caching, streaming, and real-time events
- [references/dx.md](references/dx.md) — CLI/SDK ergonomics, CI speed, merge queue discipline, and rollout runbooks
