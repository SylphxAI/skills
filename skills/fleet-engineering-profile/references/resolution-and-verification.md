# Fleet language-boundary resolution and verification

The normative profile is [`profile.json`](profile.json). This reference defines
how an agent or control-plane adapter resolves and verifies that contract. It
does not create a second selection authority. If this method and the machine
contract disagree, resolution fails closed and the package must be corrected.

## Rule set

- `fleet-profile-selector-01` — resolve only when every selector fact is known
  and one of the declared values matches. Unknown organization, lifecycle, or
  task surface is not permission to improvise.
- `fleet-profile-role-01` — classify components by runtime role and effect
  ownership before considering source files, framework names, or process
  boundaries.
- `fleet-profile-backend-01` — production backend, API, gateway, worker,
  controller, runtime, storage, queue, background-job, and critical-path roles
  select Rust.
- `fleet-profile-web-01` — browser, product-web, server-rendered web, and UI
  orchestration roles select TypeScript with Bun and Next where applicable.
- `fleet-profile-effect-01` — web cannot own backend database mutation, durable
  queue publication or consumption, backend business effects, backend
  authorization decisions, or a TypeScript backend fallback.
- `fleet-profile-completion-01` — completion is measured across the declared
  service-role and effect denominator. File extension and language totals are
  never completion evidence.
- `fleet-profile-state-01` — Skills owns this static selection; product repos
  project local component facts; Control Plane owns resolved live adoption,
  deployment, exceptions, and convergence.

Product repositories project those facts through the canonical optional
`serviceFacts` envelope in `project.manifest.json`. The envelope binds the exact
profile id, revision, digest, and vocabulary version, then maps unique component
ids to service role, implementation, declared production-authority scope,
backend-owner reference, and explicit owned-effect list. Repositories do not
copy the defaults or forbidden-effect policy. Control Plane fails missing,
empty, stale, conflicting, or unresolved facts closed for applicable repos and
compares the declaration with observed deployment; local scope never overrides
live readback.

## Resolution table

| Observed component | Role/effect classification | Binding result |
| --- | --- | --- |
| HTTP API that authorizes a backend operation and mutates a database | backend API plus durable business effect | Rust authority |
| Queue consumer or scheduled job with external side effects | worker/background job | Rust authority |
| Browser application rendering product state | browser/product web | TypeScript/Bun/Next authority |
| Next SSR route that composes UI data without owning backend effects | server-rendered web orchestration | TypeScript/Bun/Next authority |
| Next or Bun handler that directly mutates backend storage or decides backend authorization | web process owning a forbidden backend effect | profile violation; move the effect to Rust |
| TypeScript service retained as fallback for an incomplete Rust backend | backend fallback | forbidden; repair Rust |
| Repository containing both Rust services and TypeScript web | multiple declared roles | valid when each role/effect follows its selection |

Transport shape does not decide authority. An HTTP or RPC boundary may exist on
either side. Ownership follows the semantic role and effects behind the
transport. UI orchestration may validate presentation inputs, shape view data,
manage sessions for rendering, and call backend contracts. It may not become
the durable business-system authority through a convenient server function.

## Resolution state machine

```text
facts-unknown -> blocked
facts-known -> selector-unmatched | selector-matched
selector-matched -> roles-classified
roles-classified -> conforming | violation | ambiguous
ambiguous -> blocked
violation -> rust-fix-required
rust-fix-required -> conforming
```

There is no transition from `violation` to TypeScript backend fallback. A
production defect, parity gap, or missing capability remains a Rust work item.

## Verification checklist

- Record the exact profile id, revision, and content digest used.
- Enumerate deployable components and their declared service roles.
- Verify each applicable repository projects versioned `serviceFacts`; missing
  facts remain a Control Plane coverage gap rather than inferred compliance.
- Verify the envelope binds this exact profile revision and digest, component
  ids are unique, backend-owner references resolve, and declared scope agrees
  with independent deployment observation.
- Enumerate database, queue, authorization, external, and background effects.
- Prove that Rust owns every backend or durable-effect role.
- Prove that TypeScript/Bun/Next components are browser, product-web, SSR, or UI
  orchestration only.
- Search for TypeScript backend fallback, dual-run, shadow, recovery, and
  business-effect paths.
- Compute completion from the role/effect denominator and name unresolved
  domains explicitly.
- Keep source admission, product-manifest resolution, deployment, and live
  production proof as separate evidence layers.
- Fail stale or conflicting selectors rather than borrowing a historical
  snapshot or an archived instruction source.

Exceptions never authorize the forbidden language/effect boundary. A typed,
owned, expiring exception may cover a non-authority selection detail only when
the profile contract lists that default as exceptable. Expiry fails closed;
renewal needs a new decision and recovery evidence.
