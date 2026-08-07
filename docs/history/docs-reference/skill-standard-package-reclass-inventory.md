# `*-standard` package reclass inventory

Companion to
[ADR-20260801-package-classes-and-standard-composition](../adr/ADR-20260801-package-classes-and-standard-composition.md)
and [skill-package-classes-and-composition.md](skill-package-classes-and-composition.md).

**Snapshot:** 2026-08-03, 118 catalog skills, 22 `*-standard` packages (+ profile/prefer policy packs).  
**Change rule:** reclass + description first; rename only with ADR-0009/0016
discipline and routing cases. No mega-merge for count cosmetics.

Legend:

| Action | Meaning |
| --- | --- |
| KEEP-policy | Primary class is binding predicates/profile; `-standard` OK |
| RENAMED-workflow | Was mis-suffixed `*-standard`; hard-renamed to job noun (ADR-0016, no alias) |
| KEEP-separate | Investigated merge; rejected under ADR-0009 coincidence rule |
| RETIRE-candidate | Only if superseded with preserved mechanism; none forced here |

## Inventory

| Package | Primary class (decision) | Action | Notes |
| --- | --- | --- | --- |
| `agent-first-development-standard` | policy (+ workflow flavor for packets) | KEEP-policy | Constraints for no-human multi-agent delivery packets; not a continuous loop OS |
| `agent-native-standard` | policy | KEEP-policy | Product operability constraints for agents |
| `drive-to-delivery` | **workflow** | RENAMED-workflow | Hard-renamed from `drive-to-delivery-standard` |
| `ci-admission-standard` | policy | KEEP-policy | CI admission design predicates |
| `ci-runner-capacity-standard` | policy | KEEP-policy | Capacity design predicates |
| `commercial-decision-standard` | policy | KEEP-policy | Durable commercial decision predicates |
| `decision-quality-standard` | policy | KEEP-policy | Decision-process quality predicates |
| `delivery-standard` | policy | KEEP-policy | Delivery-terminal proof model; often compose-on |
| `documentation-standard` | policy | KEEP-policy | Doc scope/freshness predicates |
| `engineering-standard` | policy | KEEP-policy | Default engineering method floor / predicates |
| `enterprise-control-plane-standard` | policy | KEEP-policy | Org-wide control-plane layers; composes profiles; not absorb target |
| `enterprise-profile-standard` | policy | **KEEP-separate** (absorb rejected) | Distinct artifact: versioned selection/profile lifecycle vs org control-plane layers; compose, do not merge |
| `evidence-and-claims-standard` | policy | KEEP-policy | Claim grading predicates |
| `run-incident-response` | policy | KEEP-policy | Incident process predicates (standalone process is OK) |
| `instruction-evolution-standard` | policy | KEEP-policy | Instruction/profile evolution predicates |
| `parallel-change-integration-standard` | policy | KEEP-policy | Expand/contract migration predicates |
| `project-manifest-standard` | policy | KEEP-policy | Project declaration predicates; distinct from org control plane |
| `adopt-repo-standards` | policy (with onboarding procedure) | KEEP-policy | Prefer keep; if body is mostly procedure, consider workflow extract later |
| `risk-matched-verification-standard` | policy | KEEP-policy | Verification depth predicates |
| `select-next-work` | **workflow** | RENAMED-workflow | Hard-renamed from `select-next-work-standard` |
| `source-authoring-standard` | policy | KEEP-policy | Source identity/commit predicates |
| `specification-control-plane-standard` | policy | KEEP-policy | Spec lifecycle; check overlap with project-manifest / enterprise later only if coincident |

## Not `*-standard` but loop-critical (for exclusion discipline)

| Package | Class | Role |
| --- | --- | --- |
| `maintain-product` (see references/open-betterment) | workflow | Multi-aspect product betterment loop |
| `build-product` (see references/finish) | workflow | Whole-product finish pass |
| `technology-stack-profile` | policy | Stack defaults (profile naming, not `-standard`) |

## Immediate non-goals

- Mass rename of all 23 packages
- Mega-merge of `*-review` packages
- Meta-router skill
- Closing utilization residual without host behavior-oracle evidence

## Absorb investigations

### `enterprise-profile-standard` × `enterprise-control-plane-standard`

**Decision (2026-08-01): KEEP separate — absorb rejected.**

| Test (ADR-0009) | Profile | Control plane |
| --- | --- | --- |
| Primary artifact | Versioned selection package (selectors, defaults, exceptions, migration) | Org-wide control-plane **layers** and how process is enforced across repos |
| Acceptance | Profile contract completeness / collision-safe selection | Cross-repo control-plane outcomes (rulesets, CI compute, previews, scorecards, …) |
| Mechanism | Profile schema + lifecycle | Layer ownership table + defaults by surface |
| Body size / shape | ~105-line profile contract | ~349-line multi-layer defaults |

They **compose** (control plane names profiles for selections) but do not share
one job/artifact/acceptance/mechanism. Merging would re-bloat routing and hide
profile lifecycle under control-plane prose.

### Loop packages formerly named `*-standard`

Hard-renamed (ADR-0016, no discoverable alias):

| Predecessor | Current |
| --- | --- |
| `drive-to-delivery-standard` | `drive-to-delivery` |
| `select-next-work-standard` | `select-next-work` |

Bodies declare primary class `workflow` and soft composition. Historical
`runtime/legacy-agents-projection.mjs` keeps predecessor ids as frozen install
digests only (not current catalog discovery).
