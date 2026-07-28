---
status: accepted
date: 2026-07-22
owners:
  - SylphxAI
amends: ADR-0003
---

# ADR-0012: Require live scheduler evidence for AutoSync

## Context

AutoSync configuration and installation were previously represented by one
`enabled` flag. On a Linux agent container without a user-systemd manager, old
unit files and an enabled config survived while no scheduler process could run.
The managed checkout and every installed runtime therefore remained on an old
Skills generation even though `auto-sync status` reported enabled.

File presence proves desired configuration, not execution. A detached process
or an unstarted cron entry would have the same failure mode and would not
survive a host restart as a declared service boundary.

## Decision

1. AutoSync reports configuration, scheduler liveness, and exact source/target
   freshness separately. Freshness binds the canonical remote head, clean
   managed checkout, applied state, adapter bytes, and selected installed
   runtime generations to one commit.
2. `enabled` is true only when the selected scheduler proves liveness. A native
   scheduler proves its managed timer or task is enabled and current. An
   explicitly selected external supervisor proves a fresh, owned heartbeat
   while the hosting runtime owns its foreground lifecycle.
3. Scheduler installation fails closed unless the newly registered scheduler
   passes the same live readback.
4. Linux systemd unit files without a reachable active user manager are
   `configured but inactive`, never success.
5. A runtime without a working per-user scheduler is a partial installation.
   The hosting environment owns providing a supervised native scheduling
   boundary. The Skills installer does not create a best-effort detached daemon,
   user-shell dependency, runtime hook, or hosted control service to hide that
   missing capability.
6. Exact static reconciliation and AutoSync health remain separate claims. A
   one-time successful update does not prove that later generations will
   converge automatically.

## Consequences

- Operators and agents can distinguish current static bytes from continuing
  update capability.
- Existing false-green Linux installations become visibly degraded after they
  receive this generation.
- Container platforms must supply a durable scheduler lifecycle if they want a
  complete installation; until then the last known-good generation remains
  usable and an explicit reconcile can update it, but that state is partial.
- The no-hook, no-resident-installer-daemon boundary in ADR-0003 remains intact.

## Amendment — 2026-07-28: Explicit external-supervisor mode

Container and cloud-agent hosts may use
`auto-sync enable --scheduler external` when their runtime supervisor, rather
than the guest operating system, owns recurring process lifecycle. This is not
automatic fallback: the host must select it explicitly, keep the heartbeat
inside the receiving runtime home, supervise the reconciler as a foreground
child, and recover it on host restart.

Skills continues to own the exact-source managed checkout, reconciler bytes,
locks, target generations, drift repair, backoff, and status calculation. The
host may schedule reconciler ticks and publish the small liveness heartbeat; it
must not reimplement target materialization. Status is healthy only when both
the external heartbeat is fresh and source/target readback is current.
