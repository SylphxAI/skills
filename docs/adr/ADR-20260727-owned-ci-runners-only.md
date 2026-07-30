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

1. Every company workflow job uses one explicit, static profile from the
   execution plane's owned-runner contract. Linux uses a scalar
   `sylphx-linux-*` profile (or its literal `[self-hosted, sylphx-linux-*]`
   form when GitHub requires that class); macOS uses its literal
   `[self-hosted, sylphx, macos, <size>]` contract. GitHub-hosted labels and
   dynamic `runs-on` selection are forbidden. A generic `self-hosted` label is
   not an owned-runner fallback.
2. Hermetic policy and instruction-admission checks are normal managed CI
   workloads. They use `sylphx-linux-standard` unless the execution plane
   publishes another owned profile with a documented capability and SLO.
3. A missing owned OS or capability profile is a platform-capability gap. It
   blocks that exact proof and starts execution-plane work; it is not an
   exception that permits GitHub-hosted compute or a weaker replacement test.
4. The Skills repository's package-integrity workflow runs on
   `sylphx-linux-standard`. Its former GitHub-hosted operating-system matrix is
   retired rather than misrepresented as owned-runner evidence. Cross-platform
   runtime proof remains a separate capability. macOS proof may use the
   published owned macOS label array; Windows proof remains blocked until an
   owned Windows profile is published and verified.
5. Runner selection is enforced and read back at the organization/provider
   boundary that owns runner eligibility. Repositories do not add regex workflow
   scanners or tests that merely restate allowed `runs-on` strings.

## Consequences

- Runner availability, capacity, and recovery are visible responsibilities of
  the Sylphx execution plane rather than a per-repository fallback decision.
- CI pickup delays and runner failures must be classified separately from
  source/test failures.
- No repository may claim fresh Windows execution proof until the execution
  plane publishes and verifies an owned Windows profile. macOS proof must use
  the published literal owned label array rather than GitHub-hosted macOS.
- Migration is complete only when each repository's workflow source, CI job
  assignment, and post-merge execution evidence all show an owned profile.

## Verification

- The provider/Platform observation for the exact workflow job proves its
  requested and assigned runner profile. Workflow source alone is not runtime
  assignment proof.
- `npm run build:catalog`, `npm test`, and `npm pack --dry-run` validate the
  packaged Skills source candidate but do not claim provider runner assignment.
- Delivery records source, CI assignment, merge, and deployment/readback as
  separate evidence layers.
