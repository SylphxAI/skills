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
- **Protobuf with Google AIP** as the only API schema, generating the
  HTTP/JSON and gRPC surfaces, OpenAPI, the SDKs, the CLI and the MCP server
  ([agent-first APIs](architecture.md#agent-first-apis-and-operations)).
- **Dependencies:** pin the app graph with a lock file and treat source
  replacement as a security boundary. Take a supported stable update within an
  adopted line after reading the release changes and running the affected
  checks; a new line, a major contract, or a substitution is a decision for the
  authority that owns it. Update shared substrate before its consumers.
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

## How it is judged

A clean checkout builds and tests with the documented commands, dependency
updates pass their affected checks, and a media build reproduces from the lock.
