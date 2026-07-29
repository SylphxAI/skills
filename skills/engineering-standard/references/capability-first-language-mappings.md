# Capability-first Language Mappings

## Contents

1. Shared invariants
2. Rust
3. TypeScript
4. Python
5. Dart
6. Cross-language contracts

## Shared invariants

Every language implements the same semantic architecture. Language conventions
change filenames and packaging, not ownership or dependency direction.

- Capability/bounded context is the macro ownership unit.
- Feature/use case is the application vertical slice.
- Domain is framework-independent and effects are explicit.
- Interfaces and adapters translate; they do not author domain semantics.
- Cross-language boundaries derive from one language-neutral contract.
- Module boundaries outrank file counts.
- Domain/application logic emits semantic observability facts; adapter shells
  bind them to telemetry SDKs.
- FRP is used for genuinely time-varying/event-stream semantics, not as a
  compulsory wrapper around ordinary use cases.
- Cross-capability events are versioned contracts; convergent controllers pair
  event wake-ups with periodic level-triggered reconciliation.
- The module graph is enforced through language/package visibility and
  compiler/build dependency data: no cycles, internal cross-module imports,
  undeclared edges, or accidental public surface.

## Rust

Prefer Rust modules as the semantic unit; a module may be one file or a
directory. Split crates only for a real independent compile, dependency,
release, capability ownership, or isolation boundary.

```text
src/
├── capabilities/
│   └── work_progress/
│       ├── mod.rs
│       ├── domain/
│       │   ├── mod.rs
│       │   ├── progress.rs
│       │   └── narration.rs
│       ├── application/
│       │   ├── mod.rs
│       │   ├── render_progress.rs
│       │   └── ports.rs
│       ├── adapters/
│       │   └── semantic_summarizer.rs
│       └── interfaces/
│           └── http.rs
└── bootstrap.rs
```

- Use enums and newtypes for domain states, identities, units, and expected
  failures.
- Keep async, framework extractors, SQL clients, provider SDKs, and runtime
  configuration outside the domain.
- Expose a narrow `pub` surface from the capability root. Use `pub(crate)` or
  private modules for implementation details.
- Treat module privacy as the first boundary and use separate crates only where
  compile or ownership isolation is real. For cross-crate rules, verify the
  resolved Cargo dependency graph (for example through `cargo metadata`) against
  declared allowed edges; do not grep `use` statements.
- Repository traits and other ports belong to the application/domain boundary;
  concrete SQL/HTTP implementations belong to adapters.
- Avoid both a single `mod.rs` god module and a micro-file system where every
  function becomes a file.
- For reactive streams, keep reducers/state machines pure; Tokio channels,
  subscriptions, clocks, and tracing subscribers remain at the shell.
- Model reconcilers as pure desired/observed-to-plan functions; async consumers,
  outbox persistence, retry, and effect execution remain adapters.
- Wire traits to adapters in bootstrap; do not pass a global container into
  domain modules. Reactive watch/channel projections remain at interfaces.

## TypeScript

Organize by capability/package before technical layer. Use strict type checking
and schema-derived runtime validation at external boundaries.

```text
src/capabilities/work-progress/
├── domain/
│   ├── progress-state.ts
│   └── temporal-narration.ts
├── application/
│   ├── features/render-progress-card.ts
│   └── ports/command-summarizer.ts
├── adapters/ai-command-summarizer.ts
├── interfaces/http-progress-route.ts
├── contract.ts
└── index.ts
```

- Use discriminated unions for domain states and failures; reject boolean
  combinations that permit invalid states.
- Keep React/Vue/Svelte, HTTP framework, ORM, Effect runtime, and provider types
  in interfaces/adapters unless they are generated contract projections.
- Export only the capability contract and intended application entrypoints.
- Use package `exports`, TypeScript project/package boundaries, and the resolved
  module dependency graph to reject internal imports, cycles, and undeclared
  edges. An AST-aware boundary rule may fill gaps; path-string lint alone is not
  the authority.
- Avoid repository-wide `services/`, `models/`, `types/`, and `utils/` dumping
  grounds. A genuinely shared primitive needs a named stable contract.
- Do not let framework schemas independently re-author a boundary contract.
- RxJS/Signals may implement reactive interfaces or projections; domain state
  evolution remains framework-neutral and testable as pure event reducers.
- Broker/framework event envelopes map to versioned integration-event contracts
  at the adapter; they do not enter the domain unchanged.
- DI containers compose ports/adapters at startup. Signals/providers may own
  UI/query projections but never become hidden domain service locators.

## Python

Use packages as capability boundaries. Preserve explicit types and runtime
validation at boundaries even though the language is dynamic.

```text
src/product/capabilities/work_progress/
├── domain/
│   ├── progress.py
│   └── narration.py
├── application/
│   ├── render_progress.py
│   └── ports.py
├── adapters/
│   └── semantic_summarizer.py
├── interfaces/
│   └── api.py
└── contract.py
```

- Use frozen dataclasses, enums, typed protocols, exhaustive match checks, and
  explicit result/error types for domain semantics.
- Keep Django/FastAPI/Flask, ORM models, task queues, provider clients, and
  settings outside the domain.
- Pydantic or equivalent boundary models validate transport input; map them to
  domain values instead of using them as the domain authority.
- Enforce dependency direction with import rules/static analysis and run strict
  type checking on durable paths.
- Keep public package entrypoints explicit and evaluate the resolved import
  graph for cycles, internal-package access, and allowed dependencies; do not
  infer architecture from filename conventions.
- Avoid generic `helpers.py`, `services.py`, or `models.py` files spanning
  multiple capabilities.
- Async iterators or reactive libraries may carry streams at the edge; pure
  state transitions remain callable without an event loop or telemetry SDK.
- Keep broker/task-queue consumers and outbox implementations in adapters;
  reconciliation policy stays importable without Celery or an async runtime.
- Framework DI resolves boundary adapters; domain functions and objects receive
  explicit values/protocols rather than importing a global injector.

## Dart

Use feature packages/directories under capability ownership. Keep Flutter and
platform plugins at the interface/adapter shell.

```text
lib/src/capabilities/work_progress/
├── domain/
│   ├── progress_state.dart
│   └── temporal_narration.dart
├── application/
│   ├── render_progress.dart
│   └── command_summarizer_port.dart
├── adapters/
│   └── semantic_summarizer_adapter.dart
├── interfaces/
│   └── progress_card.dart
└── contract.dart
```

- Use sealed classes, exhaustive pattern matching, immutable value types, and
  explicit failure values.
- Domain/application code does not import Flutter widgets, platform channels,
  persistence plugins, HTTP clients, or generated provider SDK internals.
- Widgets render application view data and send intents; they do not own domain
  state transitions.
- Split packages only for a genuine independently versioned/reused capability
  or platform boundary, not to simulate architecture through package count.
- Use Dart library privacy, explicit package exports/imports, analyzer proof,
  and a package dependency-graph check for allowed edges and cycles. An
  underscore-private declaration is not a substitute for a coherent
  Capability API.
- Dart Streams and Flutter reactive state belong to the shell/interface;
  reducers and temporal rules remain framework-independent.
- Platform push/stream events are interface facts mapped into domain or
  integration events before reconciliation.
- Riverpod/Provider may own UI/session/query projections and adapter lifecycles;
  domain/application decisions remain plain Dart and receive explicit ports.

## Cross-language contracts

When two languages share a boundary, the canonical contract is language-neutral
and versioned. Generate or mechanically validate Rust, TypeScript, Python, and
Dart projections from the same authority. Each projection compiles and decodes
the same positive/negative fixture corpus. Language-native facades may add
ergonomics, cancellation, pagination, and typed failure mapping but may not
copy or redefine payload semantics. Apply the complete
[cross-platform contract architecture](cross-platform-contract-architecture.md)
for backend, web, native applications, SDKs, transport selection, offline state,
and the supported-language generation matrix.
