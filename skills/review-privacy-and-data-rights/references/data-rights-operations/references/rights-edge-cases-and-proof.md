# Rights Edge Cases and Proof

## Decision table

| Scenario | Primary decision | Required evidence | Recovery/communication |
| --- | --- | --- | --- |
| Shared workspace deletion | separate personal, tenant, shared, and other-member scope | role and ownership map | warn affected parties without leaking request details |
| Active legal/security hold | freeze only covered terminal actions | current hold owner, scope, basis, review/expiry | fulfill unaffected rights; explain scoped limit |
| Billing/tax record | retain required fields, suppress unrelated use | authoritative obligation and field map | disclose category and duration/rule, not a vague refusal |
| Backup data | tombstone and prevent normal restore until expiry | backup policy, restore test, tombstone receipt | disclose delayed physical expiry accurately |
| Derived analytics/model data | assess identifiability and reversible joins | lineage, training/use record, method validation | delete/detach/retrain/suppress as supported and explain limits |
| Subprocessor failure | retry, escalate, and keep case partial | dispatch and callback evidence | update requester; do not mark complete |
| Correction dispute | annotate or contest where direct overwrite is unsafe | source provenance and decision owner | expose appeal/review path |
| Deceased/minor/agent request | validate scoped representation and local authority | mandate/relationship/age context | safe pending state; minimize evidence |
| Account takeover suspicion | protect data and route security incident | risk signal without over-disclosure | pause delivery; preserve clock handling authority |
| Appeal/reopen | bind to original facts and new evidence | prior decision and delta | independent owner where required |

## Deletion and restore invariants

- A deletion job is idempotent and monotonic unless an explicitly allowed recovery window remains.
- A restore must reapply tombstones, suppression, consent/preference state, and post-backup corrections before data becomes reachable.
- Shared records require ownership semantics; deleting one subject must not silently destroy another person's independent data.
- Anonymization is a claim to validate against available joins, not a rename or nulling operation.
- Proof records contain request/decision/receipt identifiers and minimal metadata, not a second copy of deleted content.

## Operational metrics

Track by right, jurisdictional clock class, channel, risk tier, system, and processor: intake volume, acknowledgment latency, identity friction/failure, age of open cases, deadline risk, coverage completeness, job/receipt failures, exceptions, partial completions, reopens, appeals, complaints, and sampled accuracy. Use distributions and cohorts; averages hide deadline tails and specific-system failure.

## Incident triggers

Treat wrong-recipient delivery, other-subject disclosure, unauthorized deletion, missed suppression, unsafe restore, expired export exposure, processor non-fulfillment, systematic inventory gaps, and false completion messages as incidents. Contain access or processing, preserve evidence, notify the owning incident/privacy authority, correct affected cases, and run a root-cause-class fix.
