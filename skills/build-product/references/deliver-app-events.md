# Deliver App Events

Send one product event through a supported channel with clear ownership, retry behavior, and delivery status.

## Method

1. Classify the fact with [event contracts](./event-contracts.md).
   Continue here only when the job is delivery rather than a domain,
   integration, analytics, or operational-telemetry contract.
2. Define the product event, recipient, channel, content owner, urgency, privacy class, and user preference or consent requirement.
3. Read the active repository's event-service contract and the selected provider's current official documentation.
4. Create a stable event identity and idempotency key at the product boundary.
5. Queue delivery through the existing event service with the minimum data needed by the channel adapter.
6. Apply channel authentication, signing, templates, locale, unsubscribe or preference controls, and provider limits.
7. Define retry, expiry, dead-letter, duplicate suppression, and provider-callback handling.
8. Persist delivery state needed by product, support, and operations.
9. Exercise a successful delivery plus the important rejection, retry, and expired-recipient paths.

## Completion

Return the event contract, channel, provider boundary, idempotency behavior, delivery states, privacy controls, checks run, and strongest truthful delivery state.
