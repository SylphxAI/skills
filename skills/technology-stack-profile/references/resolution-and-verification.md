# Backend and web technology resolution and verification

The normative profile is [`profile.json`](profile.json). This reference defines
how an agent or control-plane adapter resolves and verifies that contract. It
does not create a second selection source. If this method and the machine
contract disagree, resolution fails closed and the package must be corrected.

## Rule set

- `technology-profile-selector-01` — resolve only when every selector fact is known
  and one of the declared values matches. Unknown organization, lifecycle, or
  task surface is not permission to improvise.
- `technology-profile-role-01` — classify components by runtime role and effect
  ownership before considering source files, framework names, or process
  boundaries.
- `technology-profile-backend-01` — production backend, API, gateway, worker,
  controller, runtime, storage, queue, background-job, and critical-path roles
  select Rust.
- `technology-profile-web-01` — browser, product-web, server-rendered web, and UI
  orchestration roles select TypeScript with Bun and Next where applicable.
- `technology-profile-effect-01` — web cannot own backend database mutation, durable
  queue publication or consumption, backend business effects, backend
  authorization decisions, or a TypeScript backend fallback.
- `technology-profile-completion-01` — completion is measured across the declared
  service-role and effect denominator. File extension and language totals are
  never completion evidence.
- `technology-profile-state-01` — Skills owns this static selection; product repos
  project local component facts; Control Plane owns resolved live adoption,
  deployment, exceptions, and completion.

Product repositories project intended component topology through the optional
`architecture.components` map in `project.manifest.json`. Each unique component
id declares its role, implementation, backend-owner reference, and owned
effects. The manifest schema owns the generic fact shape; this Profile owns the
recognized role/effect meanings. Missing or unknown facts block a selected
technology decision instead of being inferred from filenames. Live deployment
and production status remain Control Plane observations, not repo-authored
component fields.

## Resolution table

| Observed component | Role/effect classification | Required result |
| --- | --- | --- |
| HTTP API that authorizes a backend operation and mutates a database | backend API plus durable business effect | Rust required |
| Queue consumer or scheduled job with external side effects | worker/background job | Rust required |
| Browser application rendering product state | browser/product web | TypeScript/Bun/Next required |
| Next SSR route that composes UI data without owning backend effects | server-rendered web orchestration | TypeScript/Bun/Next required |
| Next or Bun handler that directly mutates backend storage or decides backend authorization | web process owning a forbidden backend effect | profile violation; move the effect to Rust |
| TypeScript service retained as fallback for an incomplete Rust backend | backend fallback | forbidden; repair Rust |
| Repository containing both Rust services and TypeScript web | multiple declared roles | valid when each role/effect follows its selection |

Transport shape does not decide implementation ownership. An HTTP or RPC boundary may exist on
either side. Ownership follows the semantic role and effects behind the
transport. UI orchestration may validate presentation inputs, shape view data,
manage sessions for rendering, and call backend contracts. It may not become
the durable business-system owner through a convenient server function.

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
- Enumerate applicable `architecture.components` entries and their declared
  service roles; missing entries remain a gap.
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
owned, expiring exception may cover a non-core selection detail only when
the profile contract lists that default as exceptable. Expiry fails closed;
renewal needs a new decision and recovery evidence.
