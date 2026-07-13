---
name: review-solicitation-policy
description: Design or audit platform-specific public rating and review request eligibility, native request surfaces, cooldowns, policy-required audience exclusions, no-display behavior, and request-state evidence for apps, games, web products, and storefronts. Use when the requested artifact is an authentic public review solicitation policy or request state machine, including an audit of sentiment gating, star steering, review rewards, suppression, or retaliation. For private feedback intake, review ingestion or response, evidence clustering, support routing, product action, or close-loop learning, use product-feedback-learning-loop; compose both only when the request asks for both artifacts.
---

# Review Solicitation Policy

Produce one platform-current public review request policy. Optimize for authentic
participation and durable trust, never predicted star value.

## Resource guide

Read [references/review-platform-policy-and-state.md](references/review-platform-policy-and-state.md)
for the adapter record, eligibility rules, request state machine, current
official platform findings, prohibited transitions, and tests. Refresh every
platform rule from current first-party authority before execution.

## Composition contract

Begin a composed artifact with the
[product artifact envelope](references/product-artifact-envelope.schema.json).
Set `ownerSkill: review-solicitation-policy` and give the public request policy
its own `artifactId`, `artifactVersion`, `artifactRevision`, and
`artifactState`. The top-level artifact never self-hashes.

Every typed input names the exact producer contract through
`fulfillsHandoffId`. A draft input carries identity/revision/state but no digest;
a sealed input additionally requires `artifactDigest` and
`digestRule: sha256-exact-bytes`. Never invent a digest or resolve a moving
“latest” alias.

For a combined public-review/private-feedback request, produce two sibling
artifacts with distinct identities and stable producer-owned `handoffId`s.
They may share exact upstream product/value-event inputs. Add a one-way input
edge only when one sibling truly consumes a contract emitted by the other;
never create a cycle or merge their state machines.

## Workflow

1. Record each platform, storefront, territory, audience, product surface,
   meaningful-value event, accessibility context, current authority, and policy
   evidence gap. Treat each platform as an independent adapter.
2. Retrieve current first-party policy and native API documentation. Record the
   publisher, effective/retrieved/expiry times, exact allowed surface, quotas,
   wording constraints, and no-display behavior. Disable an adapter whose
   authority is unknown or stale.
3. Define neutral eligibility from verified meaningful value and a stable
   product context. Exclude cold launch, failures, outages, payment/refund or
   support pressure, safety incidents, purchase/reward moments, ineligible
   audiences, excess frequency, and accessibility blockers.
4. Specify the independent request state machine from ineligible through native
   invocation and cooldown. A platform may suppress the sheet; the underlying
   product flow must still complete. Never infer a displayed sheet or selected
   star unless the platform supplies an authorized result.
5. Prove that sentiment, predicted positivity, payer value, spend, tier,
   vulnerability, private feedback, complaint absence, or support outcome cannot
   affect public eligibility. Prove that review state cannot affect money,
   access, remedies, support, rewards, accounts, or product behavior.
6. Hand authorized review ingestion, response, clustering, and product learning
   to `product-feedback-learning-loop`. Hand event implementation to Product
   Analytics and store submission/rejection work to Distribution Readiness.
7. For a combined public-review and private-feedback request, invoke
   `product-feedback-learning-loop` as a sibling and return two independently
   accepted, versioned artifacts with stable handoff IDs and explicit one-way
   evidence handoffs where a real dependency exists.

## When not to use

- For private feedback intake, review ingestion or response, evidence
  clustering, product action, or customer close-loop state, use
  `product-feedback-learning-loop`.
- For listing conversion, analytics implementation, support operations, or
  store submission, use the corresponding specialist instead of expanding
  public review solicitation into those jobs.

## Boundaries

- Never ask whether the user likes the product before deciding whether to show
  the public route. Do not target likely-positive users or hide the route from
  likely-negative users.
- Never steer toward five stars, draw a five-star cue, fabricate or filter
  reviews, ask for a higher rating, or reward posting, rating, editing, deleting,
  or improving a review.
- Never condition flow, compensation, refund, warranty, appeal, dispute,
  entitlement, account, data, or support treatment on a review action.
- Do not import one platform's rules into another. In particular, do not add an
  in-product Steam review prompt while current Steam rules prohibit it.
- Do not own private feedback, public review ingestion or replies, product
  prioritization, support operations, analytics implementation, listing
  conversion, or platform submission.

## Output

Artifact envelope, exact inputs, proof state, stable handoff outputs, and
assumptions:

Scope and current authority:

Adapter matrix:
- platform/territory/audience
- allowed native surface and policy proof
- meaningful-value event and neutral eligibility
- suppression, cooldown, no-display, error, and offline behavior

Request state machine and persisted fields:

Prohibited couplings and audit findings:

Sibling handoffs:

Validation, unresolved authority, and next proof:
