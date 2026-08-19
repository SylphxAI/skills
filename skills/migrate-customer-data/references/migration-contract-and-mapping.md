# Migration Contract and Mapping

## Migration flow

```text
discover -> confirm scope and authority -> map -> rehearse -> approve cutover
extract -> stage -> transform -> load -> index -> reconcile -> accept
```

Each run records the source snapshot, target version, mapping revision, cohort,
run ID, operator or job, observed result, and next action. Failures route to
retry, quarantine, correction, or an authorized stop and restore path.

## Mapping decisions

For every mapped entity or field, record the source and target versions and
semantics, eligibility, transformation, defaults, identity strategy,
relationship order, conflict handling, permissions, retention effects,
customer-visible change, fixtures, acceptance conditions, and owner.

State whether the mapping preserves the exact value, normalizes or derives it,
combines it, truncates or redacts it, excludes it by approved scope, or requires
an owner decision. Record the customer-visible effect and recovery path for every
material change.

## Identity and relationship rules

- Use stable source-to-target identity maps; display names and mutable emails may supplement a stable identifier.
- Define collision behavior before loading. Every merge of people, tenants, organizations, objects, or entitlements follows an explicit reviewed rule.
- Preserve relationship direction, ordering where meaningful, ownership, visibility, and deletion state.
- Load dependencies in a declared DAG and handle cycles with explicit staging identities.
- Keep provenance sufficient for reconciliation and support, then expire temporary mappings according to policy.

## Eligibility decision table

| Condition | Default | Required owner/evidence |
| --- | --- | --- |
| Tenant ownership unclear | quarantine | source/target admin authority |
| Region/residency mismatch | pause for an approved regional path | current privacy/contract authority |
| Past retention or deleted | exclude/preserve tombstone | retention and deletion truth |
| Legal/security hold | preserve scoped record and restrictions | current hold owner |
| Malicious/unsafe attachment | quarantine | scan evidence and security owner |
| Unsupported semantic value | preserve as unresolved | product/data owner decision |
| Duplicate/conflict | apply versioned policy | provenance and customer-visible rule |
| Foreign-key dependency missing | quarantine/retry | dependency reconciliation |
