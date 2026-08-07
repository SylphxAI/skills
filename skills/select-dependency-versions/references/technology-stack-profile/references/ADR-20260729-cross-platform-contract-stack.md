---
status: accepted
date: 2026-07-29
owners:
  - SylphxAI/skills
---

# Select one Protobuf and Connect stack across backend, web, native, and SDK clients

## Context

The existing profile selects Rust for backend roles and TypeScript/Bun/Next for
product-web roles, but it does not select the contract authority, transport
family, generated client libraries, or native-client composition. That gap lets
each repository or agent invent a REST model, a web-only schema, a Flutter
model, and a mobile state architecture for the same product semantics.

The required target is the ideal cross-platform design, not a description of
the current implementation or a migration plan. A backend language must not
become the wire authority, and a client framework must not create a second
business contract.

The evaluated design space included hand-authored REST/OpenAPI, GraphQL, tRPC,
gRPC-only, and Protobuf with the Connect protocol family. A TypeScript-only
contract cannot cover Rust and native clients. Hand-authored REST duplicates
models and client plumbing. gRPC-only requires browser-specific mediation.
GraphQL remains useful for a product surface that genuinely requires
client-selected graph traversal, but it adds an independent execution and
compatibility model when used as the default internal transport.

Connect uses Protobuf services while serving Connect, gRPC, and gRPC-Web from
one contract. Its current official ecosystem includes Rust, TypeScript/Web,
Dart, Swift, Kotlin, Go, and Python implementations, with standard gRPC as the
fallback for other languages.

## Decision

Revision `2026-07-29.1` preserves the accepted Rust backend and
TypeScript/Bun/Next web ownership boundary and adds one required
cross-platform contract stack:

1. Protobuf Editions is the sole semantic authority for public, cross-runtime,
   cross-repository, or independently versioned RPC contracts. Use the latest
   released edition that passes the complete selected generator matrix.
2. Buf owns module resolution, lint, generation, and compatibility analysis.
   Protovalidate annotations own portable semantic-validation intent.
3. The Rust service adapter uses `connectrpc`/Connect Rust, Buffa-generated
   message types, and Axum/Tower. It serves Connect, gRPC, and gRPC-Web from one
   generated service.
4. Connect is the default protocol. Native and service clients use binary
   Protobuf by default. Browser clients use ProtoJSON by default for native HTTP
   inspection and may select binary format from measured performance evidence.
5. Web React uses Protobuf-ES, Connect Web, Connect Query, and TanStack Query.
   Remote server state stays in that cache; React owns local state and Zustand
   is limited to genuinely cross-component, client-owned state.
6. Flutter uses Protobuf Dart and Connect Dart with Riverpod at the
   composition/UI-projection boundary. Swift uses SwiftProtobuf and Connect
   Swift with Swift Observation. Android uses Protobuf Kotlin and Connect
   Kotlin with coroutines/Flow and Compose/ViewModel state.
7. Rust, Go, Python, and Node clients use their native Connect implementations.
   .NET and an otherwise unsupported ecosystem use a generated standard gRPC
   client against the same service contract.
8. Offline support is not implied by a UI state library. When required, the
   client uses an explicit durable store and outbox/reconciliation contract;
   Drift, GRDB, and Room are the selected Flutter, Apple, and Android stores.
9. OAuth/OIDC, WebAuthn, webhooks, signed transfers, redirects, and other
   standards-bound surfaces keep their protocol-native contracts. REST or
   GraphQL is admitted as a distinct product surface only for an evidenced
   consumer job, with shared payload lineage rather than duplicated models.
10. Generated wire DTOs remain outside the domain core. Language-native
    facades may add ergonomics but may not re-author payload or method
    semantics.

Library versions are resolved from live authoritative registries by the
select-dependency-versions procedure. The profile selects package families
and roles, not stale version numbers.

## Consequences

- Rust backend, React web, Flutter, iOS, Android, and SDKs share one contract
  and compatibility history.
- A new client platform adds a generated projection and native facade rather
  than a new API.
- Public protocol exceptions remain explicit instead of forcing every
  interaction into RPC.
- Server state, local UI state, offline state, and backend business truth have
  separate owners.
- Repositories cannot claim cross-platform conformance from a single generated
  target; every declared client must compile and pass the shared contract suite.

## Verification

- Validate the digest-bound machine profile and exact client-platform matrix.
- Regenerate every selected target from a clean tree and reject drift.
- Run Buf lint and source/wire compatibility analysis.
- Compile/package each generated SDK and run a shared fixture corpus.
- Run clients against an ephemeral Rust server for success, typed failures,
  auth metadata, cancellation, deadlines, pagination, and supported streaming.
- Prove old-client/new-server behavior for independently released clients.
- Requalify the selection when an official client disappears, cannot implement
  the selected Protobuf edition, fails protocol conformance, or is dominated by
  a stronger current implementation.

## Primary sources

- [Protobuf Editions overview](https://protobuf.dev/editions/overview/)
- [Buf breaking-change detection](https://buf.build/docs/breaking/)
- [Connect protocol](https://connectrpc.com/docs/protocol/)
- [Connect Rust](https://github.com/connectrpc/connect-rust)
- [Connect ES and Web](https://github.com/connectrpc/connect-es)
- [Connect Query](https://github.com/connectrpc/connect-query-es)
- [Connect Dart](https://github.com/connectrpc/connect-dart)
- [Connect Swift](https://github.com/connectrpc/connect-swift)
- [Connect Kotlin](https://github.com/connectrpc/connect-kotlin)
- [Connect Go](https://github.com/connectrpc/connect-go)
- [Connect Python](https://github.com/connectrpc/connect-python)
- [Protovalidate](https://protovalidate.com/)
