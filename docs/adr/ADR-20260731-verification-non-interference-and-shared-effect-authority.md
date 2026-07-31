---
status: accepted
date: 2026-07-31
owners:
  - SylphxAI/skills
---

# Verification must not monopolize shared delivery

## Context

A verification task can keep its own observation window stable by repeatedly
rewriting shared delivery or protection policy. That turns an evidence
collector into an out-of-band reconciliation controller, creates a second write
authority, and transfers one task's verification cost to unrelated agents,
deployments, and customers.

The observation may be legitimate and time-dependent. The shared freeze is not
therefore legitimate. A stable subject and a globally unchanged delivery plane
are separate requirements.

## Decision

1. Verification, soak, benchmark, and evidence collection are non-interfering
   by default. They do not acquire authority over unrelated delivery for sample
   continuity.
2. Evidence binds to an exact immutable artifact, deployment, cohort, cell, or
   replay corpus. When observation needs time, isolate or pin that subject while
   normal delivery continues.
3. A client-side or temporary script may not act as a persistent reconciler for
   shared delivery, migration, protection, promotion, or environment policy.
   Persistent reconciliation belongs to the owning product's versioned
   controller and typed control contract.
4. Customer and agent identities consume Platform through public contracts and
   cannot directly mutate Platform internal control tables. Missing isolation
   or pinned-deployment behavior is a Platform capability gap, not permission
   for a privileged bypass.
5. A shared hold is exceptional. Continued delivery must itself create a
   plausible material hazard that isolation cannot contain. The hold requires
   explicit effect authority, minimum scope, hard non-renewing expiry,
   owner-visible impact, recovery, audit, and release.
6. This decision is absorbed by the existing runtime constitution,
   Risk-Matched Verification, Parallel Change Integration, and Platform-first
   standards. It does not create a new Skill, CI word scanner, lock service, or
   control plane.

## Consequences

- Long observation can continue on a pinned subject without serializing normal
  delivery.
- A process that repeatedly restores shared settings is treated as a controller
  and must satisfy the owning authority and lifecycle boundary.
- If isolation is unavailable, the observation restarts or remains incomplete;
  it does not silently gain the right to block unrelated work.
- Enforcement belongs to effect APIs, identity, leases, fencing, expiry, and
  storage permissions. Focused behavioral tests verify those controls; prose
  and lexical CI checks do not.
