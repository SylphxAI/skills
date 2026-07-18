# Capability-first Examples

## Contents

1. Work Progress example
2. Capability record
3. Code ownership map
4. Test map
5. Classification examples

## Work Progress example

Consider a product that shows an agent Progress Card. The visible card is a
feature/surface, not the complete capability boundary:

```text
Capability: Work Progress Communication
├── Sub-capability: Progress State Projection
├── Sub-capability: Command Intent Summarization
├── Sub-capability: Temporal Status Narration
└── Sub-capability: Progress Evidence Presentation

Feature: View Progress Card
Surfaces:
├── progress-card.command-row
├── agent-run.timeline
└── work-activity-feed
```

Examples of details that remain behaviors/rules rather than independent
capabilities:

```text
running   -> "Running workspace tests"
completed -> "Ran workspace tests"
failed    -> "Workspace tests failed"
unknown command intent -> explicit unknown; never invent a semantic summary
```

The tense rule may be complex and deeply optimized. Complexity alone does not
make it a capability. It becomes a sub-capability only if it gains an
independent consumer promise, contract, reuse, version, and proof boundary.

## Capability record

A capability definition must retain important detail without turning every
line into another capability:

```yaml
id: command-intent-summarization
partOf: work-progress-communication
outcome: Owner understands what an agent is executing without reading shell syntax

behaviors:
  - classify command intent from structured execution facts
  - remove irrelevant flags and machine-specific paths
  - preserve safety-significant targets and effects
  - return explicit unknown when intent cannot be established

invariants:
  - never claim execution that has not started
  - never erase destructive or production-relevant intent
  - rendered tense derives from authoritative execution state

surfaces:
  - progress-card.command-row
  - agent-run.timeline

scenarios:
  - input: { command: "cargo test --workspace", state: running }
    output: "Running all workspace tests"
  - input: { command: "cargo test --workspace", state: completed }
    output: "Ran all workspace tests"
  - input: { command: "unknown-tool --opaque", state: running }
    output: "Running an unclassified command"

evidence:
  - domain scenario tests
  - command corpus property tests
  - rendered accessibility test
```

FCCP may govern this definition, its relations, surfaces, gaps, and evidence.
The code architecture below owns its implementation shape; Control Plane Work
tracks changes to it.

## Code ownership map

```text
capabilities/work_progress/
├── domain/
│   ├── progress_state
│   ├── command_intent
│   └── temporal_narration
├── application/
│   ├── features/render_progress_card
│   └── ports/semantic_command_summarizer
├── adapters/
│   └── model_command_summarizer
├── interfaces/
│   └── progress_card
└── contracts/
    └── progress_view
```

The functional core accepts structured values:

```text
derive_progress_view(work_facts, run_facts, evidence, command_intent)
  -> ProgressView | ProgressDerivationFailure
```

The imperative shell obtains Work/Run facts, invokes an optional semantic model
through a port, applies timeouts and typed fallback, and renders the returned
view. The UI never infers truth from display strings.

For a live Progress Card, an FRP-style projection is appropriate:

```text
reduce_progress(previous_view, work_event) -> next_view | ProjectionFailure
```

That reducer is pure and virtual-time testable. Control Plane subscriptions,
reconnect/backpressure, clocks, UI streams, and telemetry export remain in the
imperative shell. Semantic events include capability/use-case identity and
decision reason; OpenTelemetry or UI framework types never enter the domain.

If progress is projected asynchronously, a Work/Run event wakes the projector,
but the projector re-reads authoritative Work/Run state before deriving the
view. A periodic resync repairs missed or reordered events:

```text
reconcile_progress(authoritative_work, authoritative_run, stored_projection)
  -> NoChange | ReplaceProjection(ProgressView)
```

The event is neither the state authority nor proof that rendering completed.
This does not require Event Sourcing.

At composition time, DI binds `WorkReader`, `RunReader`, `Clock`, and
`CommandSummarizer` ports to adapters. A reactive provider may subscribe to
those adapters and recompute `ProgressView`, but it calls the same pure
`derive_progress_view` core. The provider container never enters domain code
and its cache never becomes Work truth.

## Test map

| Boundary | Proof |
| --- | --- |
| Progress state | table/property tests over valid and invalid state combinations |
| Temporal narration | scenario corpus for running/completed/failed/cancelled/unknown |
| Command summarizer port | contract tests including timeout, malformed, and unknown output |
| Model/provider adapter | fixture/replay tests; no provider types in domain |
| Progress Card surface | browser/component tests for semantics, accessibility, overflow, and stale state |
| Capability definition | surface, scenario, and evidence references resolve to exact implementation/test identities |

## Classification examples

| Candidate | Classification | Reason |
| --- | --- | --- |
| Work Progress Communication | Capability | Stable consumer outcome and independent proof boundary |
| Command Intent Summarization reused in card and timeline | Sub-capability | Independent contract, reuse, and failure semantics |
| View Progress Card | Feature/use case | Composes capabilities into one owner workflow |
| Use past tense after completion | Behavior/rule | Important semantic detail but not an independent promise |
| Command row | Surface | Presentation location |
| Improve tense handling | Work | A bounded change, not product semantics |
| Split a 900-line mixed progress module | Refactor Work | Physical correction; capability identity remains stable |
