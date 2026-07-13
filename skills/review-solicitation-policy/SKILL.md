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
   accepted artifacts with explicit one-way evidence handoffs.

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
