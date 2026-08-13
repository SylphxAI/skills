---
name: deliver-app-events
description: "Sends email, webhooks, realtime, or push through Platform Events. Use when the app must deliver a message and prove the receipt."
---

# Deliver App Events

Send a message through Sylphx Platform Events. Submit a typed message, watch
one Operation, inspect the receipt.

## When to use

- Transactional email
- Inbound or outbound webhooks
- Realtime channels
- Push when that connector is shipped

## Method

1. **Name** the channel.
2. **Open** `../build-product/references/sylphx-platform-first-policy/references/events.md`.
3. **Bind** the connector on the management plane.
4. **Send** from the runtime plane with a caller request id.
5. **Prove** with the provider accept id or delivery receipt.

## Done

Connector bound; Delivery Operation reached a terminal; receipt recorded.

## Progressive disclosure

- `../build-product/references/sylphx-platform-first-policy/references/events.md`
- `../build-product/references/sylphx-platform-first-policy/references/cli-and-planes.md`

## Boundaries

Campaign copy stays in the product repo. Time-based activation is a Work job.
