# Accessibility Conformance Program Patterns

## Current sources

Identify the product and platform, jurisdiction or procurement scope, target
standard and version, conformance level, and reporting template. Retrieve the
current primary standard, government source, platform guidance, or supplied
contract requirement. Record the source and retrieval date with the product
decision. Legal applicability and contract interpretation stay with their
authorized owners.

## Representative scope

Select core user tasks, product surfaces, platforms, input modes, languages,
content, and third-party boundaries that represent actual use. Include reusable
components and composed end-to-end workflows. State the product version,
browser, operating system, assistive technology, and evaluator method for each
result.

## Test selection

Combine automated checks with the human and assistive-technology methods needed
for the selected tasks.

| Surface | Useful checks |
| --- | --- |
| Keyboard | order, focus visibility, traps, shortcuts, dialogs, recovery |
| Screen reader | names, roles, states, announcements, navigation, errors, task completion |
| Zoom and reflow | text resize, reflow, orientation, magnification |
| Visual perception | contrast, non-color cues, text spacing, focus |
| Touch and mobile | target size, gestures, alternatives, platform assistive technology |
| Motion and media | reduced motion, pause, captions, transcripts, audio description |
| Cognitive clarity | instructions, errors, recovery, timeout, consistency |
| Third-party content | accessible boundary, fallback, vendor result, escape path |

Automated tools efficiently find detectable rule violations. Representative
task testing establishes whether disabled users can understand and complete the
workflow.

## Findings and decisions

For each material finding, record the affected task and users, observed impact,
reach, available workaround, recurrence, owning cause, correction owner, and
retest result. Prioritize restored access on core tasks and prevention of the
same defect across components and composed flows.

Decide product release, procurement response, exception, and public conformance
claim separately. A claim states the exact product version, scope, methods,
date, exceptions, and limitations supported by current results. A material
product, standard, or workflow change triggers focused retesting of the affected
claim.

Protect disability-related research data through consent, minimization,
controlled access, and appropriate retention.
