# Accessibility Conformance Program Patterns

## Contents

- [Current-authority-at-use protocol](#current-authority-at-use-protocol)
- [Evidence model](#evidence-model)
- [Program state model](#program-state-model)
- [Rule IDs](#rule-ids)
- [Test-selection matrix](#test-selection-matrix)
- [Severity and decision table](#severity-and-decision-table)
- [Metrics and events](#metrics-and-events)

## Current-authority-at-use protocol

Accessibility standards, reporting templates, platform guidance, procurement
requirements, and law change. Before making a current claim:

1. Identify the decision, jurisdiction, product/platform, target standard,
   requested conformance level, and reporting template.
2. Retrieve the current primary authority: the standards body's publication,
   official government source, official platform guidance, or the customer's
   supplied procurement requirement. Prefer normative text over summaries.
3. Record title, version/date, canonical location, retrieval date, applicable
   scope, and unresolved interpretation. Separate normative requirements from
   techniques, advisory guidance, and organizational policy.
4. If primary authority cannot be retrieved, label the item `authority_blocked`.
   Continue with evidence collection, but do not make the affected claim.
5. Treat legal applicability and contract interpretation as counsel decisions;
   provide the evidence packet and exact open question.

## Evidence model

Use four separate ledgers:

| Ledger | Question | Never substitute |
| --- | --- | --- |
| Requirements | What current obligation or target applies? | remembered standard text |
| Coverage | Which representative surfaces and tasks were tested? | component count |
| Findings | What user impact was observed, with what confidence? | raw scanner count |
| Claims | What may be stated externally, with which caveats? | release approval |

Evidence states are `observed_pass`, `observed_fail`, `not_tested`,
`not_applicable_with_reason`, `inconclusive`, and `authority_blocked`. A missing
result is never a pass.

## Program state model

```text
decision_scoped -> authority_verified -> workflows_sampled -> evidence_collected
evidence_collected -> findings_triaged -> remediation_retested -> claim_reviewed
claim_reviewed -> release_decided -> evidence_refresh_scheduled

authority_blocked -> claim_blocked
critical_task_blocked -> release_blocked_or_exception_review
evidence_stale -> claim_withdrawn_or_revalidated
```

## Rule IDs

- `a11y-program-1` — Define the decision, scope, representative user tasks,
  exclusions, target, and evidence freshness before testing.
- `a11y-program-2` — Verify current external authority at use and retain a
  source ledger; do not quote requirements from model memory.
- `a11y-program-3` — Combine automated checks with task-based manual and
  assistive-technology testing selected for the actual platform and audience.
- `a11y-program-4` — Triage by blocked task, reach, severity, workaround,
  recurrence, and confidence rather than scanner count alone.
- `a11y-program-5` — Test both reusable components and representative composed
  workflows; neither evidence set substitutes for the other.
- `a11y-program-6` — Give every finding an owner, due date, acceptance evidence,
  retest state, user workaround, and recurrence-prevention action.
- `a11y-program-7` — Keep release, exception, procurement response, and public
  conformance claim as separate decisions with separate approvers.
- `a11y-program-8` — A VPAT/ACR input records scope, product/version, evaluator,
  methods, evidence date, exceptions, and unsupported assertions.
- `a11y-program-9` — Expire claims and exceptions when the product, standard,
  evidence, or representative workflow changes materially.
- `a11y-program-10` — Protect research participants and disability-related
  data through consent, minimization, controlled access, and retention limits.
- `a11y-program-11` — Convert repeated defects into design-system contracts,
  component tests, content rules, and release regressions.
- `a11y-program-12` — Use `not_tested` or `authority_blocked`, never silence or
  fabricated evidence, when coverage or authority is missing.

## Test-selection matrix

| Risk or surface | Required evidence examples | Common false confidence |
| --- | --- | --- |
| Keyboard workflow | order, focus visibility, traps, shortcuts, dialogs | all elements technically focusable |
| Screen-reader workflow | names/roles/states, announcements, navigation, errors | DOM semantics without task completion |
| Zoom/reflow | text resize, reflow, orientation, magnification | desktop viewport screenshot |
| Visual perception | contrast, non-color cues, text spacing, focus | token-level contrast only |
| Touch/mobile | target size, gestures, alternatives, platform AT | desktop keyboard result |
| Motion/media | reduced motion, pause/stop, captions, transcripts, audio | muted autoplay check |
| Cognitive/task clarity | instructions, errors, recovery, timeout, consistency | readability score alone |
| Third-party/embedded | boundary, fallback, vendor evidence, escape path | vendor assertion without workflow test |

## Severity and decision table

| Condition | Default decision | Required record |
| --- | --- | --- |
| Core task blocked with no practical workaround | block release or require explicit expiring exception | affected users, evidence, owner, mitigation |
| Serious defect with documented workaround | bounded exception may be considered | workaround quality, communication, retest date |
| Scanner pass but manual coverage absent | claim remains blocked | missing test matrix and owner |
| Component passes but composed flow fails | remediate flow and regression | composition root cause |
| Authority version or product changed | expire affected claim | revalidation scope and due date |
| Procurement response exceeds evidence | narrow or caveat response | assertion-to-evidence mapping |

## Metrics and events

Measure critical-task pass rate, representative-workflow coverage, time to
remediate by impact tier, regression recurrence, exception age, claim freshness,
and user-reported blocker recurrence. Do not optimize raw issue closure alone.

Track `a11y_scope_locked`, `a11y_authority_verified`, `a11y_workflow_tested`,
`a11y_finding_triaged`, `a11y_exception_approved`, `a11y_retest_completed`,
`a11y_claim_released`, and `a11y_claim_expired` with product version, workflow,
method, evidence state, impact tier, owner, exception expiry, and source version.
