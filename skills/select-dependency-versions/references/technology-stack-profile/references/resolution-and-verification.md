# Backend, web, and interoperability technology resolution and verification

The normative profile is [`profile.json`](profile.json). This reference defines
how an agent or control-plane adapter resolves and verifies that contract. It
does not create a second selection source. If this method and the machine
contract disagree, resolution fails closed and the package must be corrected.

`assertions.rules` is the executable rule table and is covered by the profile
content digest. A consumer interprets the schema-defined `kind` values and
their fields. Default keys remain selection and collision identities only;
their spelling, suffixes, rationale, and constraints are never evaluator
instructions.

## Machine resolution

1. Resolve every condition under `selector.matchAll`, then aggregate all
   condition states using the single `selector-outcome` rule's declared
   precedence. The current match-all contract makes an explicit unmatched fact
   decisive over an unrelated unknown fact; permutations produce the same
   outcome. Unknown-only or conflicting input blocks.
2. Read component facts through `assertions.factModel`. For every declared
   component, select exactly one `role-requirement` whose `roles` contains the
   component role. Zero or multiple matches block evaluation.
3. Compare the component implementation with `requiredImplementation`. Resolve
   every declared owned effect through the referenced `effect-classification`
   rule, requiring exactly one class match, then apply the role rule's explicit
   class allowance. A zero match is unknown and multiple matches are ambiguous;
   both block instead of being treated as allowed.
4. Build completion from the single `completion-denominator` rule. Each
   declared component role and each declared owned effect is one denominator
   item; all items must conform. Missing facts or ambiguous role resolution
   emit the rule's blocked outcome.
5. For a boundary named by the single `contract-stack-requirement`, select the
   contract, Rust server, transport family, and matching client entry directly
   from that rule. A missing or duplicate platform, a client protocol not
   served by the server, or a server implementation that disagrees with the
   backend role requirement blocks resolution.
6. For the single `interoperability-stack-requirement`, apply the declared
   CloudEvents envelope only to the named cross-boundary integration-event
   scopes, retain schema-first payload authority, and apply OpenTelemetry only
   at the declared adapter/bootstrap telemetry boundary. Any other envelope,
   payload authority, domain SDK dependency, or public evidence disposition is
   a profile violation.
7. For relational product databases, schema changes, migration apply, or
   schema-coupled backfill, resolve the single
   `database-migration-stack-requirement`. Atlas is the sole production
   schema-change applicator. Versioned migrations are required. ORM push to
   live databases, a second production migration runner, unpinned CLI
   binaries, and migrate-down as ordinary recovery are violations. CI must
   provide ephemeral full-history replay, a destructive/data-depend gate, and
   directory integrity; `atlas migrate lint` only when the admitted edition
   evaluates the schema source.

The current rule table requires Rust for backend roles and
TypeScript/Bun/Next for web roles. It forbids backend-effect ownership by web
roles and TypeScript backend fallback. It also selects Protobuf Editions, Buf,
Protovalidate, Connect Rust, the Connect/gRPC/gRPC-Web protocol family, and the
native client matrix for web, Flutter, Apple, Android, Rust, Go, Python, Node,
and .NET. It selects CloudEvents for cross-boundary integration-event context
and OpenTelemetry for protected operational telemetry. It selects Atlas as the
sole production database migration engine for every language and repository
size. Those values are read from the profile, not duplicated in an adapter.

Product repositories project intended component topology through the optional
`architecture.components` map in `project.manifest.json` and bind this Profile
under `architecture.profileBindings` using its exact revision and content
digest. Each unique component id declares its role, implementation,
backend-owner reference, and owned effects. The manifest schema owns only the
generic fact shape; this Profile owns the recognized role/effect meanings.
Missing, stale, or unknown bindings and facts block a selected technology
decision instead of being inferred from filenames. Live deployment and
production status remain the live work system observations, not repo-authored fields.

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
| Rust backend called by React web and Flutter | cross-runtime API with two clients | one Protobuf/Buf service; Connect Rust server; generated Connect Web and Connect Dart clients |
| iOS or Android application | selected native client | Connect Swift or Connect Kotlin plus its generated Protobuf runtime and native presentation-state tools |
| .NET or an unlisted ecosystem | selected gRPC fallback or unknown client | .NET uses generated gRPC; any unlisted client blocks for Profile review instead of inventing a schema |
| Integration event crossing Capability/process/runtime/repository ownership | cross-boundary event | CloudEvents envelope plus schema-first payload; delivery/idempotency/replay remain explicit |
| In-process domain event | local domain fact | native typed event; no CloudEvents wrapper required |
| Production operational signal | telemetry | OpenTelemetry at adapters/bootstrap; protected by default, explicit allowlist for public/customer projection |
| Relational product schema change or migration apply | database migration | Atlas versioned migrations; sole production applicator; ban ORM push and second migrator |
| Runtime query tool (sqlx, Drizzle, etc.) | query layer | Compile/check against migration-derived schema; never a second apply authority |
| “Small repo / early stage” alternate migration tool | stack fork | profile violation; one fleet method |

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

- Record the exact profile id, revision, content digest, and applied assertion
  ids.
- Verify `architecture.profileBindings.technology-stack-profile` matches this
  exact revision and digest; a missing or stale binding is a coverage gap.
- Enumerate applicable `architecture.components` entries and their declared
  service roles; missing entries remain a gap.
- Enumerate database, queue, authorization, external, and background effects.
- Prove each declared effect has exactly one profile classification and one
  allowance for its resolved role; an application-specific unclassified effect
  remains blocked until classified.
- Prove that Rust owns every backend or durable-effect role.
- Prove that TypeScript/Bun/Next components are browser, product-web, SSR, or UI
  orchestration only.
- For every applicable cross-platform boundary, record the contract-stack
  assertion and prove the selected Protobuf edition, Buf inputs, Rust server,
  served protocols, and client target come from the same profile revision.
- For every cross-boundary integration-event surface, prove the CloudEvents
  envelope does not duplicate payload semantics and that ordering, causation,
  idempotency, delivery, replay, and failure contracts remain explicit.
- Prove OpenTelemetry is bound at adapters/bootstrap, stable semantic
  conventions and W3C Trace Context are used where applicable, raw operator
  evidence remains protected, and public/customer projections are explicit
  allowlists.
- Regenerate, compile, package, and exercise every declared client against an
  ephemeral server with the shared positive/negative fixture corpus.
- Prove remote cache, local presentation state, optional offline store, and
  backend business truth are not duplicated across state systems.
- Search for TypeScript backend fallback, dual-run, shadow, recovery, and
  business-effect paths.
- For relational databases, prove Atlas is the sole production migration
  applicator, CI has ephemeral replay plus destructive/data-depend gate, CLI
  is OS/arch-pinned for apply images, and no ORM push/second migrator remains.
- Compute completion from the machine-declared role/effect denominator and name
  unresolved domains explicitly.
- Keep source admission, product-manifest resolution, deployment, and live
  production proof as separate evidence layers.
- Fail stale or conflicting selectors rather than borrowing a historical
  snapshot or an archived instruction source.

Exceptions never authorize the forbidden language/effect boundary. A typed,
owned, expiring exception may cover a non-core selection detail only when
the profile contract lists that default as exceptable. Expiry fails closed;
renewal needs a new decision and recovery evidence.
