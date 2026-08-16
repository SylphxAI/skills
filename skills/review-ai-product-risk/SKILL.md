---
name: review-ai-product-risk
description: "Review ai product risk and produce one actionable assessment."
---

# review-ai-product-risk

# Review AI Product Risk Review

Decide what an AI feature may promise, observe, decide, and do before its
implementation or launch outruns the product's evidence and recovery capacity.

## Workflow

1. Define the decision, user job, affected parties, business value, non-AI
   baseline, feature stage, and consequence if the AI is wrong or unavailable.
2. Confirm the current sources: product specification, data-flow inventory,
   model/provider route, tool/action contract, permissions, policy, current eval
   results, support capability, unit cost, latency, and launch state. Assign any
   unresolved fact to the owner who can supply it.
3. Read `references/ai-product-risk-systems.md`.
4. Decompose the experience into input/context, inference, output, user
   interpretation, optional action, downstream effect, feedback, and recovery.
5. Classify autonomy, reversibility, affected-party reach, data sensitivity,
   misuse potential, failure detectability, and recovery difficulty. Record both
   intended use and predictable misuse.
6. Design product controls: narrower scope or deterministic path, disclosure and
   provenance, editable draft, confirmation, permission, preview, bounded action,
   fallback, undo, appeal/reporting, support trace, and safe degraded state.
7. Specify the evidence obligations and hand them to
   `engineer-testable-requirements`, the owning product repository, privacy
   owner, and release path. Consume their exact results here.
8. Define explicit launch states and predeclared hold, narrow, resume,
   withdraw, and model/provider-change decisions. Automate safe state transitions
   from authoritative evidence while preserving audit and recovery.
9. Produce the AI product-risk dossier, UX/action contract, dependency handoffs,
   release decision, unresolved facts, and post-launch learning plan.

## Source verification

Retrieve drift-prone product, route, provider, data, policy, evidence, cost,
latency, and launch facts from their current typed or primary sources. Separate
verified facts, measurements, assumptions, and product judgment. Leave a
decision with its owner when the required source is unavailable, and name the
source needed to proceed. This procedure supplies a review method; live provider,
policy, tool, and production authority remain with their owners.

## Routing boundaries

- Use `engineer-testable-requirements` for eval design, judges, replay, simulation,
  red-team execution, and nondeterministic release proof.
- Use `model-security-threats` for threat and security-design contracts;
  engineering owns implementation and vulnerability remediation, while
  `run-incident-response` owns active incident response.
- Use `review-product-analytics-instrumentation` for event/identity pipeline
  implementation after this dossier states the required product signals.
- Use `design-app-product` or `design-game-product` when the primary artifact
  is the whole product rather than one AI behavior contract.
- Use current provider/model retrieval for capabilities, prices, limits, latency,
  and policy. Current provider sources remain the live authority; this skill
  supplies the review method.

## Path

- Use AI when it is the better job path. A deterministic interaction stays the default when it is more reliable, cheap, transparent, or accessible.
- Generated and inferred output stay labeled as generated or inferred until verified.
- Irreversible, financial, legal, safety, privacy, access, account, and external-communication actions wait for an unambiguous authorized confirmation.
- Training, retention, logging, retrieval, and provider use stay inside the verified purpose and user/enterprise controls.
- Fallback keeps user rights visible and names any change to safety, data, cost, or quality.
- Model, prompt, retrieval, tool, policy, and provider changes are product behavior changes with current evidence and a recoverable release.
- Support traces stay minimal, redacted, and explicit about access, retention, visibility, deletion, and audit.

## Output

```text
Decision and current facts:
- job / affected parties / non-AI baseline / route / autonomy / verified facts

Product-risk register:
| Stage | Failure or misuse | Affected party | Consequence | Detectability | Product control | Evidence owner | Recovery |
| --- | --- | --- | --- | --- | --- | --- | --- |

UX and action contract:
- generated-state disclosure / provenance / edit-review-confirm / permissions
- pending-success-failure states / fallback / undo-appeal-report / support trace

Evidence and owner handoffs:
- exact question / canonical owner / required artifact / blocked decision

Launch decision:
- hold / narrow / limited exposure / expand / withdraw
- machine trigger / audit record / recovery path / unresolved facts
```
