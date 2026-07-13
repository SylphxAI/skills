# Migration Contract and Mapping

## State model

```text
discovered -> authorized -> mapped -> rehearsed -> approved -> extracting
    |            |           |          |          |           |
    v            v           v          v          v           v
 unknown     scope_denied  semantic_gap gate_failed no_go   source_changed

extracting -> staged -> transformed -> loaded -> indexed -> reconciled -> accepted
    |           |            |            |         |             |
    v           v            v            v         v             v
 retry      quarantined  rule_failure  partial    stale_index   forward_fix_or_revert
```

Every transition binds source version/snapshot, target version, rule-set version, cohort, run ID, actor/automation, evidence, and next safe action.

## Mapping rule schema

```text
rule_id, source_entity_field_and_version, source_semantics,
target_entity_field_and_version, target_semantics, eligibility,
transform, normalization, default_and_missing_behavior, identity_strategy,
relationship_order, conflict_and_duplicate_policy, loss_class,
permission_and_visibility_effect, retention_hold_effect,
customer_visible_effect, fixtures, acceptance_invariants, owner
```

Loss classes: `lossless`, `normalized`, `derived`, `collapsed`, `truncated`, `redacted`, `unsupported`, `intentionally-excluded`, or `authority-pending`. Every non-lossless class needs a customer/owner decision and recovery or explanation.

## Identity and relationship rules

- Use stable source-to-target identity maps; do not rely on display names or mutable emails alone.
- Define collision behavior before loading. Never silently merge people, tenants, organizations, objects, or entitlements.
- Preserve relationship direction, ordering where meaningful, ownership, visibility, and deletion state.
- Load dependencies in a declared DAG and handle cycles with explicit staging identities.
- Keep provenance sufficient for reconciliation and support, then expire temporary mappings according to policy.

## Eligibility decision table

| Condition | Default | Required owner/evidence |
| --- | --- | --- |
| Tenant ownership unclear | quarantine | source/target admin authority |
| Region/residency mismatch | floor-block or approved regional path | current privacy/contract authority |
| Past retention or deleted | exclude/preserve tombstone | retention and deletion truth |
| Legal/security hold | preserve scoped record and restrictions | current hold owner |
| Malicious/unsafe attachment | quarantine | scan evidence and security owner |
| Unsupported semantic value | do not guess | product/data owner decision |
| Duplicate/conflict | apply versioned policy | provenance and customer-visible rule |
| Foreign-key dependency missing | quarantine/retry | dependency reconciliation |
