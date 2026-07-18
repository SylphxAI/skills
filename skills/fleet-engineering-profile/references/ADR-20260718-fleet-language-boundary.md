---
status: accepted
date: 2026-07-18
owners:
  - SylphxAI/skills
decision_request: owner direction confirming the fleet language and effect authority boundary
---

# Bind Rust backend authority and TypeScript product-web authority by role and effect

## Context

Fleet progress had been described as though every TypeScript file or Bun
process were a Rust migration residual. That model incorrectly treats intended
browser and server-rendered product web as backend authority, while also
allowing committed snapshots and prose to drift away from current runtime
roles. It cannot distinguish a legitimate Next web surface from a TypeScript
service that still owns durable backend effects.

The stable engineering standard supplies language mappings but intentionally
does not select a current fleet default. A binding enterprise Profile is the
correct owner for the current, replaceable language boundary. Product
repositories own local component facts and Control Plane owns their live
resolution and adoption state.

## Decision

Admit `fleet-engineering-profile` as an active governance-constraint Profile:

1. Rust is the sole production authority for backend services, APIs, gateways,
   workers, controllers, runtimes, storage, durable queues, background jobs,
   and critical paths.
2. TypeScript, Bun, and Next are intended production technologies for browser,
   product-web, server-rendered web, and UI orchestration.
3. Web may render and orchestrate calls through backend contracts. It may not
   own backend database mutations, durable queues, business effects, backend
   authorization decisions, or a TypeScript backend fallback.
4. An incomplete or defective backend is repaired in Rust. TypeScript is not a
   fallback, dual-run authority, shadow-production path, recovery path, or
   reason to delay Rust implementation.
5. Completion is measured by declared service roles and owned effects. `.ts`
   counts, repository language totals, Bun process presence, and endpoint-shell
   parity are not completion metrics.
6. The machine-readable profile is the selection authority. Product repos
   project only local service facts; Control Plane resolves live adoption,
   exceptions, deployment, and convergence.

This decision has no active predecessor. Any changed selection is a new
immutable profile revision with its own digest and decision. Retired revisions
never reactivate.

Revision `2026-07-18.2` supersedes the initial `2026-07-18.1` encoding without
changing the decision: it aligns the selector with the canonical project
lifecycle vocabulary and publishes the versioned local `serviceFacts` schema
needed to evaluate the boundary without file-count inference.

## Consequences

- A Rust backend plus TypeScript web repository can be fully conforming.
- A TypeScript web handler that owns backend effects is a hard violation even
  if its route shape matches Rust.
- Fleet dashboards and migration audits must classify roles and effects before
  claiming residuals or completion.
- Static selection, repository facts, and live fleet state remain separate
  authorities with explicit projection boundaries.
- No archived repository, historical snapshot, or generated prose participates
  in current instruction resolution.

## Verification

- Validate the profile schema, content digest, accepted decision reference,
  selector determinism, active-profile collision freedom, exception contract,
  and retirement terminal.
- Exercise positive and negative routing prompts for mixed Rust backend and
  TypeScript web repositories, forbidden TypeScript backend effects, and
  misleading file-count audits.
- Generate the active catalog and prove the admitted active Profile is binding
  and installable without routing or behavior tournament proof.
- Keep downstream manifest resolution, deployment, and production readback as
  separate Control Plane evidence.
