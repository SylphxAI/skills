# Constraint pack authority map

Binding constraint packs are **not** top-level listing skills. They live under
the applying job skill. Listing paths `skills/<pack>/` for `*-standard` packs
are retired.

| Pack | Owner path |
| --- | --- |
| engineering-standard | skills/build-product/references/engineering-standard |
| risk-matched-verification-standard | skills/build-product/references/risk-matched-verification-standard |
| frontier-verification-standard | skills/build-product/references/frontier-verification-standard |
| delivery-standard | skills/drive-to-delivery/references/delivery-standard |
| autonomous-execution-standard | skills/drive-to-delivery/references/autonomous-execution-standard |
| source-authoring-standard | skills/drive-to-delivery/references/source-authoring-standard |
| ci-admission-standard | skills/drive-to-delivery/references/ci-admission-standard |
| ci-runner-capacity-standard | skills/drive-to-delivery/references/ci-runner-capacity-standard |
| parallel-change-integration-standard | skills/drive-to-delivery/references/parallel-change-integration-standard |
| sota-execution-standard | skills/record-structured-deliberation/references/sota-execution-standard |
| decision-quality-standard | skills/record-structured-deliberation/references/decision-quality-standard |
| agent-first-development-standard | skills/engineer-agent-context/references/agent-first-development-standard |
| agent-native-standard | skills/engineer-agent-context/references/agent-native-standard |
| commercial-decision-standard | skills/compose-product-portfolio/references/commercial-decision-standard |
| instruction-evolution-standard | skills/author-skill/references/instruction-evolution-standard |
| enterprise-profile-standard | skills/adopt-repo-standards/references/enterprise-profile-standard |
| enterprise-control-plane-standard | skills/adopt-repo-standards/references/enterprise-control-plane-standard |
| project-manifest-standard | skills/adopt-repo-standards/references/project-manifest-standard |
| evidence-and-claims-standard | skills/synthesize-evidence-brief/references/evidence-and-claims-standard |
| specification-control-plane-standard | skills/engineer-testable-requirements/references/specification-control-plane-standard |
| work-coordination-standard | skills/select-next-work/references/work-coordination-standard |
| documentation-standard | skills/drive-to-delivery/references/source-authoring-standard/references/documentation-standard |

Quality vocabulary: **Quality North Star** (`q-*`, 14 primaries + `q-readability`
alias; `q-economy` = agent-native entropy/verification/attention/runtime/
coordination/reversal cost — not person-days; meta *Simple concepts, powerful
usage* = maximize capability per concept) owned by `engineering-standard` under
`build-product`. Default quality precedence and usage guidance live there.
Universal doctrine: [PRINCIPLES.md](policies/PRINCIPLES.md).
The phrase Modern Technical Bar is retired.

## Verified Capabilities boundary (2026-08-10)

The repository is the **open foundation** of Sylphx Verified Capabilities (see
[docs/NORTH-STAR.md](NORTH-STAR.md) and
[docs/history/adr/ADR-20260810-verified-capabilities-model.md](history/adr/ADR-20260810-verified-capabilities-model.md)).

| Authority | Owns | Does not own |
| --- | --- | --- |
| Package source (`skills/<id>/capability.json`) | The capability declaration (job, boundaries, inputs/outputs, required, failure semantics, outcome contract) | The truth of its claims |
| Named evaluator / attestor | The qualification result (incremental value, compatibility, provenance, security, currentness) | The package content |
| User product/system | The outcome oracle for the user's actual result | Qualification or catalog truth |
| Control Plane (live product) | Live recording, activation, policy, evidence and reconciliation of outcome receipts | Static capability packages (SylphxAI/skills owns those) |
| This repository | Static packages, qualification records, recording contracts, install/sync runtime | Live work, organization-wide adoption state, hosted services |

Unqualified is the honest default; structural and runtime green is never
qualification evidence. `catalog.json` projects per-package and repo-wide
qualification state; `docs/qualification/LEDGER.md` is the human ledger.
