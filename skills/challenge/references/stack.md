# Stack and toolchain

Trigger: choosing or changing a language, runtime, framework, build tool,
database engine, or dependency.

A small default stack keeps every repository readable by every agent and
reviewer. Depart from it for a measured reason, and record that reason with the
owning decision.

When starting a greenfield service or converging a multi-service platform
that has not declared its own stack in the repository's `AGENTS.md`, use
these reference defaults so every service stays readable by every agent and
reviewer. Existing repositories follow their established language and
toolchain unless a scored migration outcome explicitly authorizes a port.

## Asset rights

Use [conduct](conduct.md) and [risk](risk.md) to assess likeness rights, consent
and commercial-use terms for the actual asset and market. Keep applicable
provider restrictions and rights records with the asset's owning product. Use
the least intrusive adequate way to verify the required permission.

## Defaults

When a repository does not specify another stack, these reference defaults
provide a common starting point:

- **Rust** (edition 2024, current stable toolchain) for compiled backends,
  services, data planes, durable workers, and CLI tools: safe Rust by default,
  isolated `unsafe` behind a safe API with a written safety contract, typed
  failures on recoverable paths, explicit ownership and cancellation, and
  measurement before low-level tuning.
- **One unified frontend/UI engine per product line** (such as a shared
  cross-platform web/mobile/game engine or the repository's declared web
  framework) rather than maintaining parallel UI stacks in the same product.
  When a shared engine lacks a needed capability, build the capability into
  the shared engine rather than working around it in individual callers.
- **Incremental replacement of superseded stacks:** when a repository migrates
  from a legacy stack, complete each vertical slice in one pass rather than
  leaving half-ported modules.
- **PostgreSQL** is the reference relational default. Use one versioned schema
  migration owner per repository; Atlas is the reference tool.
- **Choose engines by lifecycle value.** Compare workload correctness,
  performance, operating maturity, security, licensing and migration cost using
  relevant measurements. Published benchmarks can select contenders; verify the
  deciding behavior on representative workloads. Assess licence compatibility
  for the intended deployment rather than prohibiting unrelated permitted uses.
- **One writable contract per boundary**, never one schema forced across all
  of them. Write a fact once at its boundary's authority and generate the rest;
  a hand-written copy beside a generated one is a defect.
  - *Domain rules and invariants* (game rules, policy, accounting): Rust types
    and functions. No IDL wrapper inside one process.
  - *Our remote APIs and events*: Protobuf descriptors served with Connect
    (binary or ProtoJSON). HTTP routes, OpenAPI, SDKs, the CLI, the MCP server
    and our own model tool schemas are generated from them, with a check that
    the generated output is fresh. Resource-shaped APIs follow AIP resource
    design ([agent-first APIs](architecture.md#agent-first-apis-and-operations));
    keep one design for the boundary. Serialize 64-bit integers as decimal
    strings, and accept the numeric and string inputs required by ProtoJSON.
    Test precision and round trips separately from the negative test for unknown
    fields under the API's chosen parsing policy.
  - *Components a host loads at run time* (plugins, tools, game rules, policy
    units): a WIT world with generated bindings. The host offers narrow
    capabilities we define instead of ambient filesystem or network, and each
    effect carries the caller's grant. A component sandbox never replaces
    authorization.
  - *Third-party tools discovered at run time*: the provider's JSON Schema at
    a pinned catalogue revision. A model-specific strict subset is a
    projection, never an edit of the source schema.
  - *Durable state*: the database schema and its transaction invariants.
  - *Hashes, signatures and idempotency keys*: an explicit canonical form.
    Deterministic Protobuf serialization is not canonical.
- **Portable product logic** can use Rust building to native and Wasm while
  hosts provide OS, GPU, audio, payments, permissions and identity capabilities.
  Choose the execution strategy from the target workload. For App Store
  distribution, assess downloaded code under current Guideline 2.5.2 and the
  applicable software rules in 4.7, including their scope and exceptions. Pin
  runtime, bindings and linker as one tested set; assess WASI adapter maturity
  for that exact version and the features the product needs.
- **Dependencies & Agent-Native Build vs. Buy:**
  - Distinguish adopting an open standard from owning its implementation.
    Compare implementation, contract verification, maintenance, security,
    optimization freedom and waiting costs for both owned and external paths.
  - Build a verifiable capability once in the shared platform when ownership
    wins that lifecycle comparison; products consume it rather than duplicate
    or bypass it. Adopt an established engine when its relevant cost,
    complexity, certification or workload performance wins.
  - Pin the dependency graph with a lock file and treat source replacement as a security boundary. Take a supported stable update within an adopted line after reading the release changes and running the affected checks; a new line, a major contract, or a substitution is a decision for the authority that owns it. Update shared substrate before its consumers.
- **Developer commands:** one command each for bootstrap, edit-feedback, build,
  test, and release, documented in the owning repository and runnable from a
  clean checkout.

## Native output and first load

**Proposed; under first-principles review (2026-10-30).** Rendering defaults
below are a proposal; the measured, shrink-only first-load baseline applies
independently of the rendering choice.

A shared cross-platform engine compiles one codebase to each host's native
execution and presentation by default, with zero configuration: the compiler
chooses HTML, JavaScript, native code and compute boundaries. On the web, serve
HTML for first paint and use compiled fine-grained DOM updates, a small
JavaScript runtime and hydrated islands for interaction, in the SolidJS style.
Load WASM only as an on-demand heavy-compute module; whole-app WASM does not meet
this default. Use Canvas for game/3D surfaces or an explicit identical-pixels
mode in the Flutter style. Require a measured per-title first-load byte baseline
(compressed HTML, JS, WASM and required assets) that can only shrink, with a
small fixed tolerance for growth, and reuse existing first-paint and ready-frame
budgets. A compiled native binary alone does not prove platform-native controls
are delivered. Engine writers implement this output standard upstream and
products consume the published capability.

## Media and content assets

Use the project's declared asset and localization pipelines. Visuals run in the
target engine and may be drawn by code (shaders, procedural meshes, particles,
spring motion, camera shake, synthesized audio) or authored in Blender and
imported as glTF/GLB on the same animator; each team chooses per asset, never
flat placeholder boxes. Generated media records the recipe and pins the approved
artifact bytes or content hash, model version and required rights. A model name
and seed alone do not guarantee that a hosted generation service reproduces the
bytes.

Builds consume the pinned output, loaded on demand and versioned per individual
asset (by content hash or manifest revision, like the web) rather than packed
into one monolithic bundle, so the initial download stays minimal and single
assets update independently while meeting the product's latency and offline
needs. Compare upgrades by task quality and total cost, keep a reference to the
prior approved artifact, and verify the resulting product.

## References

- Rust(edition 2024), checked 2026-10-30: https://doc.rust-lang.org/edition-guide/rust-2024/index.html
- Protobuf, checked 2026-10-30: deterministic serialization is not canonical, https://protobuf.dev/programming-guides/serialization-not-canonical/ ; ProtoJSON serializes int64 as strings and accepts numeric or string input, https://protobuf.dev/programming-guides/json/
- Wasmtime v50 WASIp3 module, read 2026-10-30: "Experimental, unstable and incomplete … not ready for production use", https://github.com/bytecodealliance/wasmtime/blob/v50.0.0/crates/wasi/src/p3/mod.rs
- Component Model FAQ, read 2026-10-30: "WASI is layered on top of the Component Model", https://github.com/WebAssembly/component-model/blob/main/design/high-level/FAQ.md
- Connect protocol: https://connectrpc.com/docs/protocol/
- App Store Review Guideline 2.5.2, read 2026-10-30: apps may not "download, install, or execute code which introduces or changes features or functionality", https://developer.apple.com/app-store/review/guidelines/#software-requirements

## How it is judged

A clean checkout builds and tests with the documented commands, dependency
updates pass their affected checks, and a media build reproduces from the lock.
Each contract boundary has one writable authority, its generated projections
are checked fresh, and the ProtoJSON negative tests pass.
