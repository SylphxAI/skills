---
status: superseded
date: 2026-07-18
owners:
  - SylphxAI
supersededBy: ADR-0003
---

# ADR-0002: Reconcile Skills with a per-user interval scheduler

This experiment was superseded by ADR-0003. Runtime hooks introduced approval,
compatibility, and per-turn overhead without guaranteeing hot reload during
continuous model generation.

## Context

A public Git repository cannot push directly into arbitrary clients without a
subscribed service, and a service would add infrastructure, credentials,
availability, and operating cost to a static public instruction source.
Runtime-specific hooks also create three separate integration surfaces and can
run network work on an agent's critical path. One per-user operating-system
scheduler provides a portable, inspectable owner with bounded freshness and no
resident process. This decision supersedes the earlier consumption-boundary
hook design previously recorded in this file.

## Decision

1. Install one native per-user scheduler: launchd on macOS, a systemd user timer
   on Linux, or Task Scheduler on Windows. Default to ten minutes and accept an
   explicit whole-minute interval from one minute through 24 hours.
2. Keep runtime hooks out of the recurring path. During upgrade and disable,
   remove only legacy Sylphx-managed hook entries and preserve unrelated user
   settings.
3. Share freshness state and an atomic single-flight lock per user. Every tick
   verifies the installed catalog, profile metadata, exact source commit, and
   package digests before it can trust cached remote or applied state.
4. When a remote probe is due, query the fixed public Git remote for `main`.
   Fetch on a changed commit, or reuse the exact clean managed checkout to
   repair installed drift when the remote and applied commit are equal. Keep
   that checkout as an incremental-transfer cache, never a semantic authoring
   source.
5. Bind installed manifests to the applied source commit. Build and verify all
   managed package updates, removals, profile metadata, and the manifest in a
   sibling ownership-proven target-generation journal before atomically
   switching one managed-generation pointer shared by every package and the
   manifest. Fence recovery, status, synchronization, and clear under one
   target-scoped writer lock. Keep the target root stable so unrelated runtime
   Skills never enter the managed journal and are never copied, moved, or
   deleted during a switch. Recovery deterministically completes or rolls back
   the managed generation after a crash.
6. On network failure, keep the last known-good Skills, record a bounded local
   error, and use exponential retry backoff. Auto-sync failure must not block
   unrelated agent work.
7. Do not introduce a webhook relay, resident daemon, credential, or Control
   Plane dependency.

## Consequences

- Installed files converge within the configured interval; an already-running
  agent may still wait for its normal reload boundary before consuming them.
- Each configured user account performs at most one scheduled verification at
  a time. There is no per-agent duplicate polling surface.
- Unchanged ticks pay local byte verification plus one remote-head read when
  due; changed or drifted targets pay exact-source synchronization.
- Scheduler availability and user-session behavior remain operating-system
  concerns, covered by the platform-specific scheduler tests and CI matrix.
