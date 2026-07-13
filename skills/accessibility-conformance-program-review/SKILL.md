---
name: accessibility-conformance-program-review
description: Design or audit a product accessibility conformance program spanning target standards, representative workflows, manual and assistive-technology testing, issue governance, release evidence, VPAT/ACR inputs, remediation, and exceptions. Use when the requested artifact is a durable conformance program, claim-evidence review, or release/procurement decision. Do not use for a single UI critique, a code-level accessibility fix, generic QA planning, or legal advice.
---

# Accessibility Conformance Program Review

Build an evidence-backed program that can support product decisions without
turning a scanner result into a conformance claim.

## Workflow

1. Define the decision: internal readiness, release gate, procurement response,
   VPAT/ACR input, remediation portfolio, or claim review.
2. Inventory in-scope products, platforms, user roles, languages, content,
   third-party surfaces, and representative end-to-end tasks. Record exclusions.
3. Read `references/accessibility-conformance-program-patterns.md`.
4. Run the current-authority-at-use protocol before citing standards, templates,
   laws, or platform requirements. Mark unresolved authority as a blocker rather
   than filling it from memory.
5. Build the requirement-to-evidence matrix. Combine automated checks with
   keyboard, screen reader, zoom/reflow, contrast, target size, motion,
   captions/audio, cognitive, and platform-native testing as applicable.
6. Triage findings by user-task impact, reach, workaround quality, recurrence,
   and evidence confidence. Assign remediation, prevention, and retest owners.
7. Decide release and claim status independently. A product may ship with a
   recorded exception without earning an unqualified conformance claim.
8. Produce the conformance program, claim ledger, issue portfolio, release
   decision, exception register, and evidence-refresh cadence.

## When not to use

- For a component or flow design critique, use the relevant interface or
  accessibility implementation workflow; do not create a company-wide program.
- For source-code remediation, hand off verified findings and acceptance tests
  to the owning implementation agent.
- For legal applicability or contractual interpretation, identify the question
  and evidence gap, then defer the conclusion to authorized counsel.
- For generic test planning with no accessibility claim or governance decision,
  use the product's QA process.

## Source verification

- Resolve the exact product version, standard or platform requirement, version,
  jurisdiction or contract scope, retrieval time, evaluator method, assistive
  technology/browser/platform combination, and evidence owner at task time.
- Prefer current primary standards, official templates, platform requirements,
  and signed procurement terms. Treat summaries and model memory as discovery
  leads only; block the affected claim when primary authority is unavailable.
- Keep supplied test results immutable and source-linked. Never infer an
  untested workflow, platform, disability need, or conformance status from a
  neighbouring result.

## Guardrails

- Never claim conformance from automated scans alone.
- Never claim legal compliance, certification, or a completed VPAT/ACR without
  scoped, current, reviewable evidence and known exceptions.
- Never average away a blocker that prevents a disabled user from completing a
  core task.
- Never treat a design-system pass as proof that composed product workflows pass.
- Keep disability-related research data minimal, consented, and access-controlled.
- Distinguish `observed`, `inferred`, `not_tested`, and `blocked` evidence states.

## Output

```text
Decision and scope:
- audience / release or claim decision / surfaces / workflows / exclusions

Authority ledger:
| Requirement source | Version/date | Retrieved at | Scope | Status | Evidence owner |
| --- | --- | --- | --- | --- | --- |

Requirement-to-evidence matrix:
| Requirement | Workflow/surface | Method + AT/browser/platform | Result | Confidence | Evidence |
| --- | --- | --- | --- | --- | --- |

Issue and remediation portfolio:
| Finding | User-task impact | Reach | Workaround | Owner | Due | Retest | Release effect |
| --- | --- | --- | --- | --- | --- | --- | --- |

Claim, release, and exception decisions:
- claim status / release status / caveats / exception owner / expiry

Prevention and refresh plan:
- design-system contracts / regression tests / training / evidence review cadence
```
