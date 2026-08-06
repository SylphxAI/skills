# Request Control and Fulfillment

## Canonical state machine

```text
received -> acknowledged -> identity_authority_checked -> scoped -> decisioned
   |             |                    |                    |          |
   v             v                    v                    v          v
 duplicate   delivery_failed     more_info_safe      scope_dispute  authority_pending
                                                                |
                                                                v
planned -> executing -> reconciling -> quality_review -> delivered -> closed
   |           |              |              |              |
   v           v              v              v              v
 held      partial_failure  receipt_gap   redaction_gap   appealed_or_reopened
```

Do not let clock-pausing behavior be inferred. Record the current scoped authority for whether and when a clock pauses.

## Identity and authority matrix

| Risk/context | Minimum design concern | Unsafe shortcut |
| --- | --- | --- |
| Logged-in low-risk access | session strength, recent auth, account binding | emailing data to an unverified address |
| Destructive deletion | step-up auth, shared impact, recovery warning | relying only on knowledge questions |
| Authorized agent/guardian | subject identity, mandate, scope, expiry | accepting an unsigned generic request |
| Enterprise workspace | tenant role, data-controller boundary, member rights | letting any admin erase all member data |
| Account unavailable | proportional alternate evidence, anti-enumeration | collecting unrestricted ID copies by email |
| High-risk fraud/security case | separation of duties, scoped exception | revealing hidden fraud signals to prove identity |

Delete verification artifacts when their purpose expires unless a current obligation requires minimal proof.

## Transformation matrix

For every system/data class and requested right, specify:

```text
expected_presence, action, dependency_order, idempotency_key,
destination_owner, dispatch_proof, completion_receipt, retry_policy,
exception_or_redaction, customer_explanation, reconciliation_query
```

Possible actions include collect/access, export, correct, annotate/dispute, suppress, restrict processing, detach identity, anonymize, delete, retain under scoped exception, or pending authority.

## Export quality

A useful export includes a manifest, stable field definitions, time zone and date range, source/provenance, content and relationship context, machine-readable encoding, human-readable guide, attachment handling, redactions/missing-category explanation, integrity checks, secure delivery, expiry, and support path. Scan for other subjects, secrets, internal-only risk logic, malicious content, and broken files before delivery.

## Completion proof

A case closes from expected-scope reconciliation, not a green workflow badge. Compare canonical inventory coverage with per-destination observed receipts; classify `complete`, `complete_with_disclosed_retention`, `partial_failure`, `authority_pending`, `denied_with_scoped_reason`, or `withdrawn`. Preserve exactly enough proof to reconstruct the decision and expire the rest.
