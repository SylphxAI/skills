---
status: accepted
date: 2026-07-31
owners:
  - SylphxAI/skills
---

# Shared work must not externalize local costs

## Context

Agents operate in systems shared with other agents, users, deployments, jobs,
and customers. A local task can make itself easier by freezing a shared lane,
occupying scarce capacity, repeatedly restoring settings, or otherwise
externalizing its delay and risk. The task may be legitimate; its convenience
does not create authority over unrelated work.

A verification task that repeatedly rewrites delivery or protection policy to
keep an observation window stable exposed this general failure mode. It turns
an evidence collector into an out-of-band reconciliation controller, creates a
second write authority, and transfers one task's verification cost to unrelated
work. A stable subject and a globally unchanged delivery plane are separate
requirements.

## Decision

1. Work is non-interfering by default. It does not acquire exclusive authority
   over shared state or capacity merely because exclusivity makes its own task
   easier.
2. Isolate mutable state and effects at the smallest owning boundary. Prefer
   partitioning, immutable subjects, versioning, compare-and-swap, optimistic
   concurrency, bounded leases, or isolated environments over global locks,
   freezes, and continuously enforced overrides.
3. Verification, soak, benchmark, and evidence collection bind to an exact
   immutable artifact, deployment, cohort, cell, or replay corpus. When
   observation needs time, pin or isolate that subject while unrelated delivery
   continues.
4. A client-side or temporary script may not act as a persistent reconciler for
   shared delivery, migration, protection, promotion, environment, or other
   control policy. Persistent reconciliation belongs to the owning product's
   versioned controller and typed control contract.
5. Customer and agent identities consume Platform through public contracts and
   cannot directly mutate Platform internal control tables. A missing product
   capability is not permission for a privileged bypass.
6. Shared interference is exceptional but not forbidden. It must address a
   demonstrated material hazard that isolation cannot contain and requires
   explicit effect authority, minimum scope and duration, owner-visible impact,
   recovery or preemption where practical, audit, and prompt release.
7. This decision is absorbed by the existing runtime constitution,
   Autonomous Execution,
   Risk-Matched Verification, Parallel Change Integration, and Platform-first
   standards. It does not create a new Skill, CI word scanner, lock service, or
   control plane.

## Consequences

- Agents must account for concurrent work before consuming or mutating shared
  resources; they cannot assume the world contains only their task.
- Long observation can continue on a pinned subject without serializing normal
  delivery, and the same isolation principle applies to development, CI,
  databases, runtime resources, and control state.
- A process that repeatedly restores shared settings is treated as a controller
  and must satisfy the owning authority and lifecycle boundary.
- If isolation is unavailable, the observation restarts or remains incomplete;
  it does not silently gain the right to block unrelated work.
- Short correctness locks, bounded leases, authorized maintenance, and incident
  containment remain valid when they are the smallest complete mechanism for a
  material predicate.
- Enforcement belongs to effect APIs, identity, leases, fencing, expiry, and
  storage permissions. Focused behavioral tests verify those controls; prose
  and lexical CI checks do not.
