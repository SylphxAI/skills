---
status: accepted
date: 2026-07-27
owners:
  - SylphxAI
---

# ADR-20260727: Use owned runners for all company CI compute

## Context

Repository workflows still had paths that selected GitHub-hosted runner labels.
That makes a required check depend on a compute provider outside the company
runner plane and creates an avoidable billing and scheduling dependency. It
also allows a runner-capacity incident to be hidden by moving a job to another
provider instead of repairing the owning execution plane.

GitHub Actions remains the source-hosting and workflow-orchestration adapter.
That does not require GitHub to provide the machines that execute company CI.

## Decision

1. Every company workflow job uses an explicit, stable `sylphx-*` runner
   profile. GitHub-hosted labels and dynamic `runs-on` selection are forbidden.
2. Hermetic policy and instruction-admission checks are normal managed CI
   workloads. They use `sylphx-linux-standard` unless the execution plane
   publishes another owned profile with a documented capability and SLO.
3. A missing owned OS or capability profile is a platform-capability gap. It
   blocks that exact proof and starts execution-plane work; it is not an
   exception that permits GitHub-hosted compute or a weaker replacement test.
4. The Skills repository's package-integrity workflow runs on
   `sylphx-linux-standard`. Its former GitHub-hosted operating-system matrix is
   retired rather than misrepresented as owned-runner evidence. Cross-platform
   runtime proof remains a separate, currently unavailable capability until
   owned profiles are provided.
5. Repositories add deterministic conformance checks so a future workflow
   cannot silently reintroduce a GitHub-hosted or dynamic runner selection.

## Consequences

- Runner availability, capacity, and recovery are visible responsibilities of
  the Sylphx execution plane rather than a per-repository fallback decision.
- CI pickup delays and runner failures must be classified separately from
  source/test failures.
- No repository may claim fresh macOS or Windows execution proof until the
  execution plane provides and verifies an owned profile for that platform.
- Migration is complete only when each repository's workflow source, CI job
  assignment, and post-merge execution evidence all show an owned profile.

## Verification

- `tests/ci-runner-profile.test.mjs` rejects dynamic and non-owned workflow
  runner labels and asserts the runner-capacity standard has no GitHub-hosted
  policy exception.
- `npm run build:catalog`, `npm test`, and `npm pack --dry-run` validate the
  packaged Skills source candidate.
- Delivery records source, CI assignment, merge, and deployment/readback as
  separate evidence layers.
