# Binding predicates — `ci-admission-standard`

Rule IDs for progressive disclosure. Full prose: [full-standard.md](full-standard.md).

## Rule IDs

| Rule ID | Predicate |
| --- | --- |
| `ci-admission-01` | Apply the strongest relevant subset of this standard to in-scope durable work. |
| `ci-admission-02` | Prefer schema, test, and ADR homes over copying standard prose into product repos. |
| `ci-admission-03` | Separate local proof, trunk landing, and production/effect proof when delivery is claimed. |
| `ci-admission-04` | Fail closed on unknown authority; do not invent live fleet or credential state. |
| `ci-admission-05` | Record material tradeoffs with owner and residual risk. |

## Decision table

| Situation | Durable home | Evidence |
| --- | --- | --- |
| Local method choice | code/comment + unit test | exact-head green |
| Material architecture/ops policy | ADR | accepted ADR + gate |
| Fleet rollout / exception / deadline | Control Plane work + policy | CP ledger readback |
| Shared contract change | schema + expand-contract plan | dual-path or rollback proof |

## Checklist

- [ ] Rule IDs in scope listed for the change.
- [ ] Evidence attached for each selected rule ID.
- [ ] No secret material introduced.
- [ ] Control Plane used for live work/effects only, not for static standard text.
