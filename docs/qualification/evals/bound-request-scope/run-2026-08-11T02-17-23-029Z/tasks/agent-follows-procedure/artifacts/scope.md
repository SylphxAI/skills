# Scope Contract — Add a Payment Feature to the App

## Objective
Enable an end user of the app to complete a one-time payment for a single priced item or service, with an exactly-once receipt and a minimal reconciliation trail for the operator. The request is ambiguous ("the app", "payment"); this contract binds it to the smallest complete path below and records what is assumed vs. unresolved.

## Owning Boundary
- **Owner:** the active product repository/app team. No app code exists in this workspace (`/tmp/sylphx-qualify-run-2026-08-11T02-17-23-029Z-agent-follows-procedure` contains only this contract), so the app's stack, auth model, and delivery boundary are **unverified assumptions**, not authority.
- **In scope:** the payment feature only, inside the app's existing boundary.
- **Out of scope authority:** payment provider selection, credentials, merchant-of-record, and any PCI/certification posture — these are external blockers, not decisions to be made silently here.

## In
- One-time checkout for one priced item/service at a fixed price.
- Payment processing delegated to an existing processor (SDK/webhook) — no payment rails built or self-hosted.
- Idempotent confirmation handling (webhook or return URL) that records payment status exactly once.
- Durable receipt record: order ref, payment ref, amount, status, timestamps.
- Success / failure / cancel outcomes surfaced to the user in the app's normal UI.
- Minimal operator visibility: queryable or exportable payment status for reconciliation.

## Out
- Subscriptions or recurring billing.
- Wallets, stored balances, transfers, payouts.
- Multi-currency or extra payment methods beyond the processor default.
- Card storage, PCI-sensitive data handling, or custom payment infrastructure.
- Refunds, disputes, fraud tooling, tax/invoice features.

## Non-Goals
- No new infrastructure; no provider certification; no change to PCI scope.
- No pricing catalog or entitlement system.
- No changes to existing auth/identity unless the processor flow requires it.

## Cut Lines
- **Cut now:** subscriptions, refunds UI, multi-currency, wallets, payouts, custom billing engine.
- **Cut until volume justifies it:** fraud tooling, invoicing, advanced reconciliation.
- **Cut if any prerequisite fails:** live-mode launch — test-mode payment remains the honest terminal until provider credentials and merchant-of-record are explicitly authorized.

## Smallest Complete Path
1. Confirm the app's stack, auth, and the source of truth for the priced item (first verification gate).
2. Reuse an existing processor SDK/integration for a single fixed-price checkout (avoid building; no new dep unless required).
3. Add one idempotent confirmation handler that writes a single receipt record.
4. Surface success / failure / cancel states in the app.
5. Add minimal operator visibility (status query or export) for reconciliation.
6. Deliver via the app's normal delivery boundary; smoke-test end-to-end with a test-payment credential before any live credential is used.

## Terminal Condition
A real user can complete one payment for one priced item, and both the user and the operator can see one matching, exactly-once receipt record for that payment.

## Risk Floor
Money movement is irreversible and high-risk: live credentials, provider contracts, and PCI-sensitive handling are **not** added without explicit authority. Test-mode-only is the honest default until then.

## Residuals
- Payment provider and merchant-of-record undecided.
- App stack, auth model, and delivery boundary unverified (no app code in this workspace).
- Live credentials and provider certification are external blockers.
