---
name: build-product
description: "Build a missing product capability end to end. Use when an accepted direction needs a usable slice across code, interface, data, and delivery. Use the product's current identity, storage, job, and event providers; do not invent a second runtime."
---

# Build Product

Turn an accepted product outcome into a complete capability on a real user path.

## Method

1. Define the user, journey, capability, owning repository, constraints, and
   observable done condition.
2. Inspect the current path. Put each gap at its semantic owner: product
   domain, shared platform, interface, data, or operations.
3. Choose the smallest complete vertical slice with one source of truth.
4. Implement through the repository's established architecture and public
   contracts. For sign-in, durable data, background jobs, outbound events, or
   another managed capability, use the product's current provider and that
   provider's official docs. Prove the real user path, not only configuration.
5. Cover normal behavior, important failure, recovery, security, and
   operability on the changed path.
6. Update product documentation and public interfaces when behavior changes.
7. Run the changed path with the repository's compiler, tests, and the fastest
   representative user journey.
8. Land, release, or deploy only when the requested terminal and available
   authority include that layer.

Open [event contracts](references/event-contracts.md) when the slice creates,
publishes, consumes, delivers, measures, or observes something called an event.
Classify the kind before choosing schema or transport.

Payments, interface craft, distribution, and CI stay on their own listings.
Use `execute-hard-cutover` when the capability replaces an existing
implementation or data path.

## Ownership

Keep product rules with the product that owns them. Reuse an existing platform
capability when it already owns the infrastructure job. Do not hide required
durability in process memory or create a second live writer.

## Output

Return the capability and user path, files and contracts changed, checks run,
the truthful local / landed / released / live state, and any external blocker.
