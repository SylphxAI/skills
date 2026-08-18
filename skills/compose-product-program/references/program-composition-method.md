# Program Composition Method

Use this depth when a selected outcome crosses several independently owned
artifacts or external authorities. The program is a coordination artifact, not
a replacement for those owners.

## Owner map

Record one canonical owner for each fact:

| Fact | Typical owner |
| --- | --- |
| Product promise and user experience | App, game, SaaS, or other product design skill |
| Capability semantics and implementation | Owning product repository and `build-product` |
| Identity, data, privacy, and security | Their product or platform owner |
| Money, catalog, entitlement, refund, and support consequence | Payment, pricing, refund, and support owners |
| Feedback, growth, referral, or campaign behavior | The matching lifecycle skill |
| Finished localized media | `produce-product-assets` |
| Channel package, submission, certification, and release | `build-distribution-readiness` |
| Runtime, deployment, customer state, and live behavior | The owning product or host |

The program brief may point to these facts and test their handoffs. It never
becomes a second source for them.

## Lifecycle sweep

For each selected capability, answer:

- What user outcome and acceptance artifact does it provide?
- Which source owns its state, policy, identity, and permissions?
- What are normal, degraded, blocked, recovery, migration, and retirement
  states?
- What security, privacy, accessibility, localization, support, and cost
  obligations apply?
- Which exact upstream revision does it consume, and which downstream owner
  consumes its result?
- What evidence proves local correctness, landed source, released artifact,
  or live behavior at the claimed layer?

An omitted capability needs a semantic or hard-floor reason. “Later,” missing
staff, or an unmeasured preference is not a lifecycle decision.

## Handoff graph

Prefer a graph like:

```text
product truth -> selected capability contract -> finished asset or artifact
-> channel submission/release -> owning live readback
```

Every edge records its contract owner, revision, input/output, acceptance test,
authentication and authorization boundary, idempotency or ordering rule,
timeout/retry or reconciliation behavior, observability, and replacement path.
Reject hidden database reads, private imports, synchronous cycles, and a
connector that owns either peer's business policy.

Planning and observed state are separate. A later observation can index exact
accepted outputs, but a planning brief must not consume its own future result or
silently refer to “latest.”

## External and live truth

Retrieve volatile platform, policy, fee, quota, SDK, locale, store, and
certification facts from their current owner at execution. Record the source,
scope, retrieval time, and expiry when the decision depends on them. A source
diff, green CI run, submission, or release is not live proof; the owning system
must read back the exact installed, deployed, published, or observed state.

## Completion

The brief is complete when every selected capability has one owner, a complete
target, an acyclic dependency, an executable handoff test, recovery behavior,
and a truthful delivery state. Unresolved external authority remains an exact
blocker with an owner and next action.
