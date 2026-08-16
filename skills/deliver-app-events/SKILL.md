---
name: deliver-app-events
description: Deliver application email, webhooks, realtime updates, push notifications, or other outbound events through the product's active event service.
---

# Deliver App Events

Send one product event through a supported channel with clear ownership, retry behavior, and delivery status.

## Method

1. Define the product event, recipient, channel, content owner, urgency, privacy class, and user preference or consent requirement.
2. Read the active repository's event-service contract and the selected provider's current official documentation.
3. Create a stable event identity and idempotency key at the product boundary.
4. Queue delivery through the existing event service with the minimum data needed by the channel adapter.
5. Apply channel authentication, signing, templates, locale, unsubscribe or preference controls, and provider limits.
6. Define retry, expiry, dead-letter, duplicate suppression, and provider-callback handling.
7. Persist delivery state needed by product, support, and operations.
8. Exercise a successful delivery plus the important rejection, retry, and expired-recipient paths.

## Completion

Return the event contract, channel, provider boundary, idempotency behavior, delivery states, privacy controls, checks run, and strongest truthful delivery state.
