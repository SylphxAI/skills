# Provider integration

Trigger: calling an outside service or receiving its webhooks.

Build the integration to survive a slow/unavailable provider and repeated or missed delivery without granting more access than the feature needs.

- Keep secrets in an authorized store and out of source/logs, following [security.md](security.md#hard-lines). Actual gateway, connection and credential-routing choices belong with the owning product.
- Follow [outbound-call discipline](code.md#outbound-calls): effective deadlines, a provider-supported idempotency key for a retryable create/charge, safe bounded backoff and short lock lifetimes. Identify and inspect an unknown in-flight result before creating another operation.
- Return a typed missing-permission state with a safe explanation and recovery route; an authorization failure should not resemble an empty successful result or stop unrelated work.
- Verify webhook authenticity using the provider's contract. Deduplicate by its stable delivery/event identity, persist accepted work before processing and acknowledge within the provider's required window.
- For outcomes needing recovery from dropped delivery, use the provider's supported reconciliation, replay or authoritative API and choose the schedule from the workload/cost. Verify that a missed event is recovered rather than assuming the webhook is the only truth.
- Request permissions when the feature needs them and keep vendor-specific workarounds at the integration boundary with a removal condition.

Verify replay, duplication, dropped delivery and timeout behavior for the affected contract. The resulting data stays correct and secrets do not appear in output.
