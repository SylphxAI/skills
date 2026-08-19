# Request Control and Fulfillment

## Request flow

```text
receive -> acknowledge -> confirm identity and authority -> scope -> decide
plan -> fulfil -> reconcile -> review quality -> deliver -> close
appeal or correction -> update scope or fulfilment -> reconcile again
```

Duplicate requests, missing information, holds, delivery failures, partial
fulfilment, scope disputes, and reopened cases keep the same request ID and a
clear customer status. Record the authority that controls each deadline.

## Identity and authorization

| Risk/context | Handling |
| --- | --- |
| Logged-in low-risk access | confirm session strength, recent authentication, account binding, and delivery address |
| Destructive deletion | use step-up authentication, explain shared impact, and provide the applicable recovery warning |
| Authorized agent/guardian | confirm subject identity, mandate, scope, and expiry |
| Enterprise workspace | apply tenant roles, data-controller boundaries, and member rights |
| Account unavailable | use proportional alternate evidence with anti-enumeration controls |
| High-risk fraud/security case | separate decision authority, scope the exception, and protect sensitive fraud signals |

Retain verification artifacts for their active purpose and any current minimum
record obligation, then expire them.

## Fulfilment by system and right

For every system or data class, record its expected presence, requested action,
dependency order, idempotency key, destination owner, dispatch and completion
result, retry policy, exception or redaction, customer explanation, and
reconciliation query.

Possible actions include collect/access, export, correct, annotate/dispute, suppress, restrict processing, detach identity, anonymize, delete, retain under scoped exception, or pending authority.

## Export quality

A useful export includes a manifest, stable field definitions, time zone and date range, source/provenance, content and relationship context, machine-readable encoding, human-readable guide, attachment handling, redactions/missing-category explanation, integrity checks, secure delivery, expiry, and support path. Scan for other subjects, secrets, internal-only risk logic, malicious content, and broken files before delivery.

## Completion

A case closes after expected-scope reconciliation across every destination.
Disclose retained data, partial failures, owner decisions, scoped denials, and
withdrawal directly in the customer status. Preserve the minimum record needed
to reconstruct the decision and expire the rest.
