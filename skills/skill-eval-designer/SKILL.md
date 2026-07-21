---
name: skill-eval-designer
description: "Design or audit a falsifiable, exact-candidate runtime auto-injection and behavior evaluation for one Agent Skill or a complete catalog: positive, near-neighbour, abstention, compound injection, hidden tasks, controls, independent model families, deterministic artifact and safety checks, provenance, uncertainty, replay, and regressions. Use when proving incremental behavior, not when authoring a skill or building a router."
---

# Skill Eval Designer

Produce a **Skill Evaluation Program** that can disprove whether an exact skill
bundle improves realistic work while preserving routing boundaries, safety,
cost, and evidence integrity.

## Atomic boundary

Own the eval contract: candidate digests, routing/behavior tasks, controls,
rubrics/oracles, artifact checks, model/provider matrix, hidden-data handling,
metrics/uncertainty, provenance, replay, attestation, expiry, and regression
triage. Do not own the skill procedure, repository portfolio decision, runtime
capability, or adoption/outcome telemetry.

## Workflow

1. Freeze the question: exact skill name/description/body/references/scripts,
   intended jobs/artifacts, nearest neighbours, risks, output budget, supported
   runtimes/tools, and claim that the eval may falsify.
2. Read `references/skill-eval-systems.md`. Compute an injection-contract digest over
   name+description and behavior digest over the complete ordered bundle. Bind
   candidate commit, catalog digest, task/rubric/runner/policy/model-registry
   digests, parameters, seed, tool availability, retries, and expiry.
   For repeated or continuously monitored evaluations, also apply
   `references/holdout-sequential-evaluation.md`.
3. Build full-catalog runtime auto-injection cases: at least five realistic
   positives and five near-neighbour negatives per candidate, abstentions,
   multilingual/ambiguous/correction/misleading-keyword forms, and compound
   tasks with an exact expected injected set, expected artifacts, one semantic
   owner per artifact, supporting constraints, and forbidden contradictions.
   Exercise realistic catalog size and the runtime's documented description
   shortening/omission state. Test the native mechanism; do not build a
   meta-router or evaluate descriptions in isolation.
4. Build unseen behavior tasks from real job shapes and adversarial failure
   modes. Expected behavior is observable assertions and deterministic artifact
   checks, not a leaked golden answer. Include unsafe shortcuts, prompt
   injection, missing authority, uncertainty, and recovery.
5. Compare under one declared budget: base model, length-matched generic expert
   instruction, exact skill, and strongest reasonable public comparator where
   licensing permits. Use at least two answer-model and two independent judge
   families for promotable evidence.
6. Separate deterministic oracles from blind judgment. Recompute metrics from
   complete raw artifacts in a protected eval store with declared audience,
   access, retention, and deletion. Retain per-case outputs, critical failures,
   costs, latency, variance, model/provider identities, and hashed response
   receipts there; a public/shareable report uses redacted aggregates, safe
   excerpts, and opaque locators rather than copying protected prompts or data.
7. Keep promotion holdouts hidden at inference through a one-use pre-run
   commitment. Disclose their content after the attested run only when the
   dataset was explicitly classified and authorized for that audience;
   confidential tasks remain protected while commitments, receipts, aggregate
   results, and safe excerpts support independent verification. Reject
   duplicate, leaked, authored-to-fit, or post-result-edited tasks.
8. Report per-skill F1, artifact-owner accuracy, abstention precision/recall,
   exact-set and compound exact-set accuracy, win rates versus every control,
   paired/task-clustered confidence, critical failures, cost/latency, and
   family-specific effects. Aggregates may not hide one broken route.
9. Save failures as minimal regression cases, edit the skill—not the threshold
   to chase green—and rerun from a newly frozen candidate. Any relevant byte
   change invalidates the matching proof.

## When not to use

- Use `source-to-skill-distiller` to author or repair the procedure from source
  material before evaluation.
- Use `skill-repository-curator` to audit portfolio value, content quality,
  collisions, consolidation, and retirement across a repository.
- Use deterministic unit/contract/property/model tests directly when no model
  behavior or routing judgment is involved.
- Do not use authored evals, self-installs, catalog presence, or historical
  scores as adoption or current behavior proof.

## Guardrails

- Do not leak the intended answer, suspected bug, fix, or expected verdict into
  tasks, subagents, judges, or holdouts.
- An LLM judge is additional evidence, never the sole critical-safety oracle.
  Calibrate it on prompt injection, sycophancy, verbosity, and control order.
- Never let the author agent self-attest provider/model identity, omit failed
  samples, rewrite raw outputs, relabel families, or average away critical
  regressions.
- Do not publish raw customer context, private prompts, hidden holdouts,
  credentials, internal topology/process state, provider secrets, or
  reconstructable protected outputs merely to make an evaluation auditable.
- A green score is invalid without exact candidate binding, complete artifacts,
  independent recomputation, provenance, and replay.
- A model saying that it loaded or followed a Skill is not injection evidence.
  Prefer runtime-native selection/load traces; where the runtime exposes none,
  label the result a fresh-context behavior test and do not upgrade it to an
  exact injection claim.
- Separate behavior improvement from demand, business outcome, current
  authority, and production proof.

## Output contract

Return one Skill Evaluation Program containing:

1. falsifiable claim, exact candidate/catalog identities and all digests;
2. runtime auto-injection dataset design with positive, neighbour, abstention, compound,
   multilingual, and injection cases;
3. behavior tasks, assertions, deterministic artifacts, critical failures, and
   output budget;
4. base/expert/skill/competitor and answer/judge/provider matrix;
5. protected holdout/raw-artifact store, commitment and authorized disclosure
   rule, receipts, provenance/attestation, replay, retention, and expiry;
6. thresholds plus per-skill/per-case/per-family metrics, uncertainty, cost, and
   latency;
7. failure triage, regression fixtures, proof invalidation, and next run.

Complete only when an independent runner can reproduce the candidate, tasks,
outputs, metrics, and verdict without trusting the author narrative.
