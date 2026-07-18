---
name: ai-product-risk-review
description: "Design or audit one AI product behavior and launch contract covering the user job, AI necessity, model role, autonomy and action rights, data use, affected parties, failure and abuse, UX disclosure, fallback, cost and latency, support, evidence dependencies, and release boundaries. Use when an assistant, copilot, generator, classifier, recommender, or agent needs a product-risk dossier. Do not use for eval implementation, adversarial red teaming, security threat modeling, provider selection, a whole-product blueprint, or incident response."
---

# AI Product Risk Review

Decide what an AI feature may promise, observe, decide, and do before its
implementation or launch outruns the product's evidence and recovery capacity.

## Workflow

1. Define the decision, user job, affected parties, business value, non-AI
   baseline, feature stage, and consequence if the AI is wrong or unavailable.
2. Establish current authority: product specification, data-flow inventory,
   model/provider route, tool/action contract, permissions, policy, current eval
   evidence, support capability, unit cost, latency, and launch state. Label
   absent facts `not_verified`; never infer them from model memory.
3. Read `references/ai-product-risk-systems.md`.
4. Decompose the experience into input/context, inference, output, user
   interpretation, optional action, downstream effect, feedback, and recovery.
5. Classify autonomy, reversibility, affected-party reach, data sensitivity,
   misuse potential, failure detectability, and recovery difficulty. Record both
   intended use and predictable misuse.
6. Design product controls: narrower scope or deterministic path, disclosure and
   provenance, editable draft, confirmation, permission, preview, bounded action,
   fallback, undo, appeal/reporting, support trace, and safe degraded state.
7. Specify the evidence obligations and hand them to the applicable
   `frontier-verification-standard`, `engineering-standard`, privacy, and
   `delivery-standard` owners.
   Consume their exact evidence; do not recreate eval or red-team standards here.
8. Define machine-readable launch states and predeclared hold, narrow, resume,
   withdraw, and model/provider-change decisions. Automate safe state transitions
   from authoritative evidence while preserving audit and recovery.
9. Produce the AI product-risk dossier, UX/action contract, dependency handoffs,
   release decision, unresolved facts, and post-launch learning plan.

## Source verification

Retrieve drift-prone product, route, provider, data, policy, evidence, cost,
latency, and launch facts from their current typed or primary sources. Separate
verified facts, measurements, assumptions, and product judgment. If authority is
unavailable, mark the affected decision blocked; this procedure grants no live
provider, policy, tool, or production authority.

## Routing boundaries

- Use `frontier-verification-standard` for eval design, judges, replay, simulation,
  red-team execution, and nondeterministic release proof.
- Use the security owner for threat models, prompt-injection defenses, tool
  security, vulnerability remediation, and incident response.
- Use `product-analytics-instrumentation-review` for event/identity pipeline
  implementation after this dossier states the required product signals.
- Use `app-design-blueprint` or `game-design-blueprint` when the primary artifact
  is the whole product rather than one AI behavior contract.
- Use current provider/model retrieval for capabilities, prices, limits, latency,
  and policy. This skill never acts as live provider authority.

## Guardrails

- Do not add AI when a deterministic interaction can satisfy the job more
  reliably, cheaply, transparently, or accessibly.
- Do not present generated or inferred output as verified fact, completed action,
  professional judgment, or authoritative source when it is not.
- Do not let ambiguous model output directly perform irreversible, financial,
  legal, safety, privacy, access, account, or external-communication actions.
- Do not expand training, retention, logging, retrieval, or provider use beyond
  the verified purpose and user/enterprise controls.
- Do not make fallback remove user rights, hide failure, or silently switch to a
  route whose safety, data, cost, or quality contract differs.
- Treat model, prompt, retrieval, tool, policy, and provider changes as product
  behavior changes requiring current evidence and a recoverable release decision.
- Store only the minimum support trace; redact sensitive content and keep access,
  retention, user visibility, deletion, and audit semantics explicit.

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
