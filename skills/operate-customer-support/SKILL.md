---
name: operate-customer-support
description: "Design or improve the support system: contact taxonomy, routing, waiting-state clocks, authority, and quality loops. Use for the operating model, not for answering one ticket."
---

# Operate Customer Support

Design or improve the support system that resolves customer jobs and turns
recurring product problems into owned corrections.

## Method

1. Open [support operations patterns](references/support-ops-patterns.md).
2. Define products, customers, locales, accessibility needs, channels,
   operating hours, contact reasons, service expectations, and risk boundaries.
3. Give each contact reason a source of truth, required context, priority,
   queue, authority, owner, response expectation, and escalation route.
4. Model intake, identity and consent, classification, investigation, waiting,
   correction, customer confirmation, resolution, reopen, appeal, and closure.
   Every waiting state has an owner and next update time.
5. Join self-service and assisted support through current knowledge, search,
   guided actions, consented diagnostics, and context-preserving handoff.
6. Authorize routine agents to retrieve, classify, explain, collect bounded
   context, execute approved reversible actions, update status, and confirm
   resolution. Money, entitlement, identity recovery, deletion, enforcement,
   safety, and legal commitments stay with their owners.
7. Route payment/refund, identity/security, data/sync, safety, incidents,
   accessibility, legal/policy, and product defects to their owning systems.
8. Review resolution, recurrence, reopen, tail latency, accessibility, trust,
   source freshness, and false-positive correction. Send confirmed recurring
   defects to the product-feedback owner.

For one customer case, use `resolve-customer-support-case`. For the product-wide
refund consequence flow, use `design-refund-support-flow`.

## Output

Return one Support Operating Model with scope, channels, contact taxonomy,
routing and authority, case lifecycle, self-service and assisted handoff,
approved agent actions, specialist routes, service expectations, quality
measures, recovery, and product-feedback closure.
