---
name: build-product
description: Build a missing product capability end to end. Use when an accepted product direction needs a usable vertical slice across its owning code, interface, data, and delivery path.
---

# Build Product

Turn an accepted product outcome into a complete capability on a real user path.

## Method

1. Define the user, journey, capability, owning repository, constraints, and observable done condition.
2. Inspect the current path and locate each gap at its semantic owner: product domain, shared platform, interface, data, or operations.
3. Choose the smallest complete vertical slice that delivers the capability with one source of truth.
4. Implement the slice through the repository's established architecture and public contracts.
5. Cover normal behavior, important failure behavior, recovery, security, and operability on the changed path.
6. Update product documentation and public interfaces when the delivered behavior changes them.
7. Run the changed path with the repository's compiler, tests, and the fastest representative user journey.
8. Land, release, or deploy when the requested terminal and available authority include that layer.

## Ownership

- Keep product rules with the product that owns them.
- Reuse an existing platform capability when it already owns the infrastructure job.
- Use a specialist skill when the whole request is authentication, storage, background work, event delivery, payments, interface craft, distribution, or CI.
- Use `execute-hard-cutover` when the capability replaces an existing implementation or data path.

## Completion

Return:

- the capability delivered and the user path it enables;
- the owning files and contracts changed;
- the checks and representative journey run;
- the truthful local, landed, released, or live state; and
- any external blocker or remaining product gap.
