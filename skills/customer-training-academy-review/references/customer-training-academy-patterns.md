# Customer Training Academy Patterns

## Customer Training Academy Review state machine

```text
learner_segmented -> path_assigned -> module_started -> practice_completed -> assessment_passed -> outcome_measured
        |                 |                |                  |                   |
        v                 v                v                  v                   v
 wrong_path        content_gap       drop_off          assessment_failed    product_fix_needed
```

## Rule IDs

- `customer-training-1` — Start from learner persona, job, success milestone, product area, support driver, and business outcome rather than content inventory.
- `customer-training-2` — Separate admin setup, end-user workflow, executive value, developer/integration, partner, and certification curricula.
- `customer-training-3` — Choose format by learning need: checklist, template, sandbox lab, short video, article, live workshop, office hours, webinar, or certification exam.
- `customer-training-4` — Link training triggers to onboarding stage, feature adoption, lifecycle email, in-app education, support macro, release note, renewal risk, and expansion motion.
- `customer-training-5` — Version content with product releases, screenshots, permissions, localization, accessibility, and deprecated workflows.
- `customer-training-6` — Assess learning through practice, rubric, quiz, certification, job outcome, and support-case reduction where appropriate.
- `customer-training-7` — Route repeated training confusion to product, design, docs, onboarding, and support improvements.
- `customer-training-8` — Measure activation, time-to-value, adoption depth, support deflection quality, retention, expansion, partner quality, and learner satisfaction.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| New customer onboarding | Assign role-based path | Persona and success milestone | Generic course drop-off |
| Feature confusion | Choose in-context or academy format | Support tickets and usage data | Training masks broken UX |
| Certification | Define assessment and versioning | Role competency and product version | Credential without skill |
| Global rollout | Localize and check accessibility | Locale and learner needs | Exclusion or mistranslation |
| Support deflection | Measure resolved outcomes | Ticket/contact data | Deflection hides unresolved issues |

## Training academy checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `training_path_assigned`, `training_module_started`, `training_module_completed`, `training_assessment_passed`, `training_certification_issued`, `training_content_stale`, `training_outcome_measured`.

Recommended properties: `learner_segment, role, account_id, product_area, path_id, module_id, locale, accessibility_need, completion_status, assessment_score, activation_metric, support_deflection, content_version, decision`.
