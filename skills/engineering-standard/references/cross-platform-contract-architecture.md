# Cross-platform Contract Architecture

This reference defines the canonical architecture for a product whose backend,
web application, native applications, SDKs, workers, or integrations use more
than one implementation language. The active technology profile selects the
current libraries. This reference owns the stable architecture and proof
obligations.

## One semantic contract

Use one versioned, language-neutral Protobuf Editions module as the semantic
authority for cross-runtime request, response, event, error-detail, pagination,
streaming, and lifecycle shapes. Use Buf for module dependency resolution,
linting, generation, and source/binary compatibility analysis.

The edition policy is **latest released edition admitted by the complete
generator matrix**. At the time of this decision, Protobuf Edition 2024 is the
latest released edition. A generator that cannot consume the selected edition
must be upgraded or replaced; it does not justify a second schema or a silent
contract downgrade.

Generated wire types are transport DTOs, not the domain model. Each capability
maps generated inputs into domain values before enforcing invariants and maps
domain results into generated outputs at the interface. Never annotate Rust
domain structs, TypeScript view models, Dart state objects, Swift models, or
Kotlin models as independent copies of the same wire contract.

```text
Protobuf Editions + Buf + validation annotations
                         |
       +-----------------+------------------+
       |                 |                  |
 generated server   generated clients   generated projections
 adapter             per platform         OpenAPI/docs/fixtures
       |                 |                  |
 application ports  native facade       protocol-specific metadata
       +-----------------+------------------+
                         |
                capability/domain core
```

## Protocol family

Serve the Connect, gRPC, and gRPC-Web protocols from the same generated service
contract. Connect is the default product protocol because it is HTTP-native,
supports Protobuf and ProtoJSON, works with ordinary infrastructure and `curl`,
and has native clients across the supported application platforms. gRPC is the
interoperability path for ecosystems without a Connect client and for existing
gRPC infrastructure. gRPC-Web is a compatibility transport, not a separately
authored API.

Use binary Protobuf by default for native applications and service-to-service
traffic. Browser clients may use ProtoJSON for inspectability and HTTP tooling;
select binary format for measured payload, latency, CPU, or bandwidth pressure.
Encoding is a transport option over the same messages and methods, never a
second contract.

Do not force unrelated protocols through RPC:

- OAuth, OIDC, SAML, WebAuthn, and payment protocols follow their standards.
- Browser redirects, signed upload/download URLs, cacheable assets, and webhook
  delivery use intentional HTTP contracts.
- Public REST or GraphQL is a separate product surface only when external
  consumer jobs require it. Derive shared payloads and compatibility lineage
  from the canonical contract instead of copying models.
- Integration events and durable command envelopes retain their own
  versioned event contract when their lifecycle differs from synchronous RPC.

## Platform composition

The active technology profile names the current packages. The architectural
roles remain:

| Platform | Wire/API role | Application state |
| --- | --- | --- |
| Rust backend | Generated Connect service adapter over the Rust application ports | Domain and application state remain framework-independent |
| React/TypeScript web | Generated Protobuf-ES client and Connect transport; generated query options over one server-state cache | React state for local component state; a small external store only for genuinely cross-component, client-owned state |
| Dart/Flutter | Generated Dart messages and Connect client behind an application port | Riverpod owns composition, async projections, and UI lifecycles; plain Dart owns domain decisions |
| Swift/Apple | Generated SwiftProtobuf and Connect client behind an application protocol | Swift Observation/SwiftUI state owns presentation; domain rules remain plain Swift |
| Kotlin/Android | Generated Protobuf Kotlin and Connect client behind an application interface | Coroutines/Flow, ViewModel, and Compose state own presentation projections |
| Go, Python, Rust, Node, and other SDKs | Generated native client from the same service descriptors | A thin facade may add idiomatic cancellation, pagination, auth, and typed errors without copying messages |

A backend-for-frontend may authenticate, aggregate, or shape a view-specific
response when that is a real security or latency boundary. It consumes the
generated client and owns only its presentation contract; it does not become a
second business domain or copy backend semantics into the web runtime.

## Remote, local, and offline state

Keep these authorities separate:

- **Remote server state:** the generated client plus one platform-native
  server-state cache owns freshness, retries, invalidation, and request
  deduplication.
- **Local presentation state:** the UI framework owns ephemeral interaction
  state.
- **Client-owned durable state:** an explicit local database owns drafts,
  downloaded projections, or offline work.
- **Business truth:** the backend capability owns authoritative durable state.

Do not copy query results into a second global store merely to make them
globally accessible. Offline-first behavior is a separate consistency design:
persist an outbox with stable operation identity, base revision, idempotency
key, retry state, conflict policy, and user-visible resolution. Apply remote
changes through a deterministic reducer and reconcile on reconnect. A generic
state-management library is not an offline protocol.

## Stateless and streaming execution

Request handlers remain horizontally scalable: identity, authorization,
idempotency, durable workflow state, and replay cursors live in owned durable
systems rather than process memory. Streaming connections may hold ephemeral
connection state, but durable progress is resumable from an authenticated
cursor or snapshot after reconnect. Use event wake-ups plus level-triggered
reconciliation for convergent long-lived state; do not rely on a single
delivery or an immortal process.

Deadlines, cancellation, retry classification, idempotency, authentication,
tenant scope, trace context, and typed error details are method semantics.
Implement them through generated metadata and server/client interceptors, then
map them into application ports. Never expose raw internal topology,
diagnostics, feature flags, migration state, or operator telemetry in a public
response merely because the RPC layer carries observability.

## Generation and verification

One generation manifest pins:

- Buf module dependencies and the selected Protobuf edition;
- every message/runtime and RPC plugin identity;
- all supported client targets and public package coordinates;
- generated output ownership and freshness mode;
- validation implementation coverage by language.

Admission must:

1. lint and build the source module;
2. run source and wire compatibility checks against the admitted predecessor;
3. regenerate every selected target from a clean tree and reject drift;
4. compile and package every generated target;
5. run one shared positive/negative fixture corpus across languages;
6. run every client against an ephemeral server, including typed errors,
   auth metadata, deadlines, cancellation, pagination, and supported streaming;
7. prove old-client/new-server compatibility for published or independently
   updated clients;
8. test offline outbox/reconciliation behavior for any client that claims
   offline support.

Protovalidate annotations are the shared semantic-validation vocabulary.
Where a selected client runtime lacks an admitted implementation, the server
remains authoritative and the client runs the shared fixture corpus without
claiming local validation. Authorization, tenancy, state-dependent validation,
and external facts always remain server-authoritative.

## Primary references

- [Protobuf Editions overview](https://protobuf.dev/editions/overview/)
- [Buf breaking-change detection](https://buf.build/docs/breaking/)
- [Connect protocol](https://connectrpc.com/docs/protocol/)
- [Connect ecosystem](https://github.com/connectrpc)
- [Protovalidate](https://protovalidate.com/)
