---
name: design-refund-support-flow
description: "Design the customer and entitlement consequence of a refund, cancellation, dispute, or chargeback. Use when spent value, access, and support action must stay consistent with payment truth. Do not use to own the money ledger."
---

# Design Refund and Support Flow

Do not silently rewrite spent consumables. Do not trade refunds for review deletion. Payment truth, access, and support action that disagree are the defect.

Open [refund support flow patterns](references/refund-support-flow-patterns.md) when entitlement consequence needs depth.

Use `build-payment-readiness` for the ledger. Use `resolve-customer-support-case` for one ticket.
