# Event Contracts

Open this reference when a product capability creates, publishes, consumes,
delivers, measures, or observes something called an event. Classify the fact
before choosing its schema, owner, transport, or specialist.

## Classify first

| Kind | Meaning and authority | Method owner |
| --- | --- | --- |
| Domain event | In-process fact already decided by the owning domain or capability | `build-product` with this reference |
| Integration event | The same fact crossing a capability, process, repository, runtime, or external-consumer boundary | `build-product` with this reference |
| Delivery | A message sent to a person or another system, with a delivery operation and receipt | [deliver app events](deliver-app-events.md) |
| Analytics | Measurement used by a declared product decision; never money, entitlement, or policy truth | `review-domain` (`product-analytics-instrumentation`) |
| Operational telemetry | Protected evidence used to operate a system | `review-domain` (`operational-observability`) |

Notifications add user-value, consent, preference, cadence, and suppression
policy through `review-domain` (`notification-strategy`); sending them still uses
`build-product`. Do not use a delivery or analytics event as proof that the
domain transition committed.

## Domain and integration method

1. Name the owning capability, decision already made, payload authority,
   producer, consumers, and boundary crossed.
2. Keep an in-process domain event native. Do not wrap it in a transport model
   or let a broker type enter domain policy.
3. Use the product's versioned schema as payload authority for an integration
   event. CloudEvents may carry cross-boundary occurrence context; it does not
   re-author the payload or own ordering, idempotency, replay, causation, or
   failure.
4. Publish only after the authoritative state transition commits. Use an outbox
   or an equivalently atomic owner when a failed publish would otherwise lose
   the fact.
5. Define event identity, subject, schema version, occurred time, producer,
   causation/correlation, ordering scope, idempotency key, retention, privacy
   class, authorization, and compatibility policy.
6. Treat an event as an immutable fact and wake-up, not completion. Consumers
   reconcile desired and observed state idempotently; periodic resync repairs
   loss, delay, duplication, and reordering.
7. Exercise commit-before-publish, duplicate, delayed, reordered, incompatible,
   unauthorized, poison, retry, dead-letter or quarantine, replay, and resync
   paths that apply.

## Contract output

Return the event kind, domain decision and owner, schema authority, boundary,
producer/consumer map, envelope, identity and ordering scope, publication
atomicity, compatibility, privacy and authorization, retry/replay/resync
behavior, observability, and executable fixtures.

Reject a contract that collapses kinds, treats CloudEvents as a domain model,
imports telemetry types into product policy, accepts client purchase success as
entitlement truth, or treats message acceptance as observed completion.
