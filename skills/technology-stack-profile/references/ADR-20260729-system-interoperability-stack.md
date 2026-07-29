---
status: accepted
date: 2026-07-29
owners:
  - SylphxAI/skills
---

# Select CloudEvents and OpenTelemetry without creating competing semantic contracts

## Context

Technology Profile revision `2026-07-29.1` selects one Protobuf/Buf/Connect
stack across backend, web, native applications, and SDKs. The complete system
architecture also needs a current organization-wide event-envelope and
operational-telemetry selection.

The selections must preserve three distinct meanings:

- a domain or integration-event payload is business semantics;
- an event envelope is interoperable occurrence context; and
- telemetry is protected evidence about execution.

Without the separation, agents may independently design broker envelopes,
duplicate payload schemas in CloudEvents, treat telemetry events as business
truth, or publish internal diagnostic fields through a customer API.

## Decision

Revision `2026-07-29.2` preserves every selection from
`2026-07-29.1` and adds one digest-bound interoperability assertion:

1. Integration events crossing a Capability, process, runtime, repository, or
   external-consumer boundary use CloudEvents.
2. CloudEvents is the outer event context. The schema-first contract remains
   the payload authority. In-process native domain events need no CloudEvents
   wrapper.
3. Implementations target the latest stable CloudEvents specification admitted
   by the complete producer/consumer matrix.
4. Production operational telemetry uses OpenTelemetry with stable semantic
   conventions and W3C Trace Context.
5. OpenTelemetry APIs/SDKs bind at adapters and bootstrap. Domain/application
   policy emits semantic outcomes without importing telemetry SDK types.
6. Raw operator evidence is protected by default. A public or customer
   projection requires its own explicit allowlisted product, status, support,
   incident, audit, legal, or protocol contract.

Library versions continue to resolve from current authoritative release sources
through `dependency-version-selection`; the Profile selects roles and standards,
not stale package versions.

## Consequences

- Event routers and consumers receive standard occurrence context without a
  second business schema.
- Event delivery, ordering, idempotency, causation, replay, transactional
  publication, and failure semantics remain explicit obligations; CloudEvents
  does not pretend to solve them.
- Telemetry correlation composes with event/RPC contracts without turning
  traces or logs into customer data.
- The public/internal observability boundary remains machine-testable.

## Verification

- The profile schema accepts exactly one interoperability assertion.
- Every default assertion is referenced exactly once and remains
  non-exceptable.
- Tests reject missing CloudEvents scope, a different payload authority,
  domain-bound telemetry SDKs, or a public projection other than explicit
  allowlist.
- The profile content digest covers the complete revised machine document.

## Primary sources

- [CloudEvents specification](https://github.com/cloudevents/spec)
- [OpenTelemetry specification](https://opentelemetry.io/docs/specs/otel/)
- [OpenTelemetry semantic conventions](https://opentelemetry.io/docs/specs/semconv/)
- [W3C Trace Context](https://www.w3.org/TR/trace-context/)
