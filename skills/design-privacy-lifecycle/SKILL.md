---
name: design-privacy-lifecycle
description: "Design a privacy lifecycle across collection, purpose, consent, retention, access, and deletion. Use also when fulfilling a specific data-rights request."
---

# Design Privacy Lifecycle

Make every material personal-data flow purpose-bound, controllable,
time-bounded, and change-safe. This is a product design artifact, not legal
advice or a compliance claim.

## Method

1. Start with people and purposes, not databases. Name data subjects, expected
   value, harm, audience or age mode, and territory. Ask whether less data or
   on-device processing would serve the same purpose.
2. Give every field or derived signal one row: source, subject, sensitivity,
   purpose, authority, collection surface, processors, destinations, access,
   retention trigger, terminal action, and proof owner.
3. Separate necessary service processing, security, user-requested
   personalization, analytics, marketing, advertising, model improvement,
   automated decisions, and speculative future use. Availability is not reuse
   authority.
4. Design notice, choice, withdrawal, and downstream suppression as a versioned
   state machine. A toggle without enforceable propagation is not a control.
5. Bound retention from an event or obligation. Separate active retention,
   grace, deletion or anonymization, legal hold, backups, and proof retention.
6. Treat children, sensitive data, profiling, precise location, biometrics,
   health or financial data, and consequential automation as elevated review.
7. For a specific access, export, correction, deletion, restriction, or appeal
   request, open
   [request control](references/operate-data-rights/request-control-and-fulfillment.md)
   and
   [rights edge cases](references/operate-data-rights/rights-edge-cases-and-proof.md).
8. Open
   [data inventory](references/data-inventory-purpose-and-controls.md) or
   [consent and retention](references/consent-retention-and-change.md)
   when the map or control machine needs depth.

A disabled capability must create no undeclared collection, permission,
network, or retention cost. Current legal conclusions stay with authorized
counsel.

## Output

A privacy lifecycle contract: purpose and field map, controls, retention and
deletion, elevated-risk decisions, rights-request path, and residuals.
