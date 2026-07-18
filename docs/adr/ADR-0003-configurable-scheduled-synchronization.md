---
status: accepted
date: 2026-07-18
owners:
  - SylphxAI
supersedes: ADR-0002
---

# ADR-0003: Use configurable OS-scheduled synchronization

## Context

Agent hooks vary by runtime, may require approval, add work to active turns, and
still cannot replace instructions already loaded into a model context. A hosted
push service would add infrastructure and credentials to a public static source.

## Decision

1. Auto-sync uses the operating system's user scheduler: launchd, systemd user
   timers, or Windows Task Scheduler.
2. The default interval is ten minutes and users may configure it.
3. Each tick checks the public repository and applies changes only when the
   source commit changed.
4. Synchronization reconciles the complete managed set: new packages appear,
   removed packages leave, unchanged packages remain byte-identical, and
   unrelated user-managed skills are untouched.
5. The installer removes its legacy runtime hooks during upgrade.
6. No hosted daemon, webhook relay, token, Control Plane dependency, or
   per-agent-turn hook is required.

## Consequences

- Updates are not instantaneous; freshness is bounded by the configured
  interval and the next model context that loads the changed package.
- Active agent work is not slowed by synchronization checks.
- Offline clients keep the last known-good installed set and recover on a later
  tick.
