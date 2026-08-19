---
name: build-payment-readiness
description: "Design and verify production payments — checkout, provider events, ledger, entitlements, refunds, disputes, settlement, and finance close. Use when the user mentions Stripe, app-store billing, webhooks, invoices, chargebacks, or taking money in production. Do not use for seller marketplace payouts, first-time packaging, or a live price increase."
---

# Build Payment Readiness

Keep the money ledger append-only. Entitlements, invoices, support, and finance views are projections from owned events. Support corrections are new reason-coded ledger events, not silent edits. Do not confiscate value because a score moved.

Read current official provider, store, tax, and dispute docs for the selected channels. Open [payment platform patterns](references/payment-platform-patterns.md) for channel behavior and [billing reconciliation](references/billing-reconciliation-patterns.md) for settlement and close.
