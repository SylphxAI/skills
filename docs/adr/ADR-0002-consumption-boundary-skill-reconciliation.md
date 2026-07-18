---
status: superseded
date: 2026-07-18
owners:
  - SylphxAI
supersededBy: ADR-0003
---

# ADR-0002: Reconcile Skills at agent consumption boundaries

This experiment was superseded by ADR-0003. Runtime hooks introduced approval,
compatibility, and per-turn overhead without guaranteeing hot reload during
continuous model generation.

## Context

An hourly scheduler is cheap but can leave a newly authored Skill unavailable
for almost an hour. Session-start and prompt hooks reduce that delay but miss a
single agent turn that continues through tools for several hours. A public Git
repository cannot push directly into arbitrary clients without a subscribed
service, and a service would add infrastructure, credentials, availability,
and operating cost to a static public instruction source.

The useful freshness boundary is not the Git push itself. It is the next point
where an agent runtime can discover and consume changed instructions. A model
that is already continuously generating cannot safely replace its active
context until such a lifecycle boundary occurs.

## Decision

1. Replace hourly OS schedulers with runtime-native hooks at session start or
   resume, user prompt submission, sub-agent start, and the active tool loop.
2. Use Claude Code's `PostToolBatch` event to reconcile once before the next
   model step. Use Codex `PreToolUse`, which covers both eventually successful
   and failed tool calls without installing duplicate pre/post hooks.
3. Share freshness state and an atomic single-flight lock per user. Lifecycle
   probes have a one-second maximum age; active-turn probes have a ten-second
   maximum age. Most hook invocations therefore read one small local JSON file
   and exit without network access.
4. When a probe is due, query the fixed public Git remote for `main`. Fetch and
   apply only when its commit identity changed. Keep an automatically managed
   local checkout for incremental transfer; it is a cache and never a semantic
   authoring source.
5. Bind installed manifests to the applied source commit. Preserve unrelated
   runtime hooks and settings, install idempotently, and remove only managed
   hook entries on disable.
6. On network failure, keep the last known-good Skills, record a bounded local
   error, and use exponential retry backoff. Auto-sync failure must not block
   unrelated agent work.
7. Do not introduce a webhook relay, daemon, credential, Control Plane
   dependency, or continuous polling while no supported agent is active.

## Consequences

- A long-running tool-using turn sees updates at its next active-loop boundary,
  with at most ten seconds of probe staleness under normal operation.
- Idle machines consume no polling resources. Concurrent local agents coalesce
  to one remote probe or update.
- A rare update may add a few seconds before the next model step; unchanged
  hooks normally pay only a short local process and state read.
- Fully continuous model generation without a prompt, sub-agent, or tool
  boundary cannot hot-reload instructions; the next boundary is the honest
  freshness limit.
