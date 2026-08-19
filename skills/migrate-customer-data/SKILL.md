---
name: migrate-customer-data
description: 'Migrate customer data so meaning, ownership, access, and history survive. Use when acceptance is preserved semantics, not row-count equality. Authority switch of a live writer is `execute-hard-cutover`.'
---

# Migrate Customer Data

Preserve meaning, ownership, access, and customer trust across a source-to-target data transition. Count equality is weak proof.

## Method

1. Name source, target, authority, data classes, tenants, and what “same customer” means after the move.
2. Build a field-level mapping with lossiness, provenance, defaults, and rejected fields. Open [mapping contract](references/migration-contract-and-mapping.md).
3. Order dependencies: identity before entitlements, entitlements before history.
4. Rehearse on a production-shaped copy. Open [rehearsal and cutover](references/rehearsal-cutover-and-acceptance.md).
5. Validate with semantic checks: sampled records, access, history continuity, and customer-visible outcomes — not only row counts.
6. Define coexistence, rollback or forward-fix, communication, and support during the window.
7. If the job is also retiring a live writer, hand the authority switch to `execute-hard-cutover` after meaning is preserved.

## Output

Migration contract: mapping, rehearsal evidence, semantic acceptance, coexistence, and residuals.
