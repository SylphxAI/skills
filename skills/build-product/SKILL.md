---
name: build-product
description: "Build a missing product capability end to end on a real user path. Use when an accepted direction needs a usable slice across code, interface, data, and delivery, especially when it involves events, webhooks, queues, entitlements, billing state, or sync between systems. Use the product's current identity, storage, job, and event providers; do not invent a second runtime."
---

# Build Product

Use the product's current identity, storage, job, and event providers. Do not invent a second live writer or hide required durability in process memory. Prove the real user path, not only configuration. A green check that never exercised the user path is not the slice.

## Read the reference before designing

If the slice involves any of these, read [event contracts](references/event-contracts.md) before designing, not after: events, webhooks, queues or jobs triggered by a fact, entitlements, billing or payment state, or keeping two systems in sync. Do not answer from memory; the reference holds the contract output and the rejection list.

Three rules people miss, each stated in your answer:

- Classify the event kind first (domain, integration, delivery, analytics, telemetry), then choose transport and owner. Analytics, delivery receipts and client success never decide money or entitlement.
- Name the fixtures: crash between commit and publish, duplicate delivery, reordered delivery.
- Define replay: poison messages go to a quarantine with retry limits and a way to replay, and a periodic resync repairs lost events.

Use `prototype-product` when the direction is still a probe. Use `maintain-product` for a live defect. Use `finish-product` to deepen an already integrated promise.
