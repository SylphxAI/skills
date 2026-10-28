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

## Hard lines

- **A real person's voice, face, or body needs that person's recorded consent**,
  because a cloned likeness without it is a legal and reputational harm. A
  customer may use their own likeness after proving it is theirs (a live capture
  matched to the signed-in account); anyone else's needs that person's own
  consent on file. Public figures and people who have not consented are refused,
  on top of the model provider's own filters. The consent record is part of the
  lock, the output is labelled AI-generated (content credentials), and consent
  can be withdrawn, which retires the outputs. Otherwise voices and characters
  are designed. Provider terms must allow commercial use.

## Defaults

When a repository does not specify another stack, these reference defaults
provide a unified, high-performance baseline:

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
- **PostgreSQL** as the relational store, provisional per workload until our
  benchmark reports (next line); one versioned migration tool (Atlas)
  applies and owns first-party production schema.
- **Engines are chosen by our own benchmark.** A database or other engine
  serves a workload because it won our benchmark on our hardware with a
  workload taken from our products; until that benchmark reports, the current
  engine is provisional. Neither maturity, market share nor a published
  benchmark decides; published numbers only pick the contenders. An engine
  whose licence forbids offering it as a managed service is a reference only.
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
    do not add a second REST design beside it. ProtoJSON parsing rejects
    unknown fields and 64-bit integers travel as strings; generator defaults
    differ, so a negative test proves both.
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
- **Portable product logic is Rust that builds both native and Wasm**; hosts
  stay native for the OS, GPU, audio, payments, permissions and identity.
  Wasm buys portability and isolation, not speed: choose each target's
  execution strategy from a measured workload, and never ship downloaded code
  that changes an iOS app's behaviour. Pin the component toolchain (runtime,
  bindgen, linker) as one tested set. Our own WIT worlds do not depend on the
  experimental WASI 0.3 host adapters.
- **Dependencies & Agent-Native Build vs. Buy:**
  - Separate **adopting an open standard/protocol** (for interoperability) from **owning the implementation**. Traditional *"never reinvent the wheel"* heuristics assumed writing and maintaining code was the bottleneck; for agents, implementing a focused, well-bounded library, system, or engine against an open specification, conformance suite, or differential test harness (respecting test-suite licensing) is often low-cost while eliminating third-party bloat, mismatched abstractions, transitive supply-chain risk, and waiting on external release cycles.
  - Evaluate **building in-house vs. adopting an external dependency/system** case by case over full lifecycle cost (implementation, verification, security, maintenance, value of control/optimization freedom, and blocker recovery speed):
    - **Build and own in our shared platform/engine** (once for all products, never DIY per product) when owning control and customization delivers higher value, the specification is clear, and the contract can be verified with specification, conformance, differential, or property tests without carrying third-party baggage or waiting on external release cycles.
    - **Adopt established external engines or dependencies** when the domain carries deep irreducible complexity or formal certification requirements (such as cryptographic primitives, database storage kernels, OS/browser runtimes, or regulated payment rails) or when an external engine wins our workload benchmark on our hardware.
  - Pin the dependency graph with a lock file and treat source replacement as a security boundary. Take a supported stable update within an adopted line after reading the release changes and running the affected checks; a new line, a major contract, or a substitution is a decision for the authority that owns it. Update shared substrate before its consumers.
- **Developer commands:** one command each for bootstrap, edit-feedback, build,
  test, and release, documented in the owning repository and runnable from a
  clean checkout.

## Media and content assets

Voice, music, sound effects, images, and characters are declared in code as
recipes and produced by the platform asset pipeline
; text goes
through the platform localization pipeline
.

- A recipe is the source: its key hashes the kind, prompt or text, voice,
  locale, and parameters. A committed lock file pins the model, seed, and
  approved output, so builds are reproducible and every change is reviewed.
- Outputs are cached once for everyone and loaded on demand from the CDN rather
  than bundled. Variety comes from pinned variants, not generation per player
  or per play.
- Choose the newest model with the best quality per cost, not a tier name.
  Upgrading regenerates from the approved output and the brand's reference
  sheets, passes a similarity gate, shows a before/after review, and rolls back
  by reverting the lock.

## References

- Rust(edition 2024), checked 2026-10-20: https://doc.rust-lang.org/edition-guide/rust-2024/index.html
- Protobuf, read 2026-10-28: deterministic serialization is not canonical, https://protobuf.dev/programming-guides/serialization-not-canonical/ ; ProtoJSON int64 as strings and reject-unknown default, https://protobuf.dev/programming-guides/json/
- Wasmtime v50 WASIp3 module, read 2026-10-28: "Experimental, unstable and incomplete … not ready for production use", https://github.com/bytecodealliance/wasmtime/blob/v50.0.0/crates/wasi/src/p3/mod.rs
- Component Model FAQ, read 2026-10-28: "WASI is layered on top of the Component Model", https://github.com/WebAssembly/component-model/blob/main/design/high-level/FAQ.md
- Connect protocol: https://connectrpc.com/docs/protocol/
- App Store Review Guideline 2.5.2, read 2026-10-28: apps may not "download, install, or execute code which introduces or changes features or functionality", https://developer.apple.com/app-store/review/guidelines/#software-requirements

## How it is judged

A clean checkout builds and tests with the documented commands, dependency
updates pass their affected checks, and a media build reproduces from the lock.
Each contract boundary has one writable authority, its generated projections
are checked fresh, and the ProtoJSON negative tests pass.
