---
name: skill-eval-designer
description: "Design or audit a falsifiable, exact-candidate routing and behavior evaluation for one Agent Skill or a complete skill catalog: positive/near-neighbour/abstention/compound routing, hidden tasks, base and length-matched controls, public competitor, multiple answer/judge families, deterministic artifact and safety checks, digests, provider receipts, uncertainty, replay, attestation, expiry, and forward-test regressions. Use when proving incremental behavior—not when authoring the skill or inferring adoption from fixtures."
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
   intended job/artifact, nearest neighbours, risks, output budget, supported
   runtimes/tools, and claim that the eval may falsify.
2. Read `references/skill-eval-systems.md`. Compute a routing digest over
   name+description and behavior digest over the complete ordered bundle. Bind
   candidate commit, catalog digest, task/rubric/runner/policy/model-registry
   digests, parameters, seed, tool availability, retries, and expiry.
3. Build full-catalog routing cases: at least five realistic positives and five
   near-neighbour negatives per candidate, abstentions, multilingual/ambiguous
   forms, and compound tasks with an exact expected set and primary artifact
   owner. Do not evaluate descriptions in isolation.
4. Build unseen behavior tasks from real job shapes and adversarial failure
   modes. Expected behavior is observable assertions and deterministic artifact
   checks, not a leaked golden answer. Include unsafe shortcuts, prompt
   injection, missing authority, uncertainty, and recovery.
5. Compare under one declared budget: base model, length-matched generic expert
   instruction, exact skill, and strongest reasonable public comparator where
   licensing permits. Use at least two answer-model and two independent judge
   families for promotable evidence.
6. Separate deterministic oracles from blind judgment. Recompute metrics from
   complete raw artifacts; retain per-case outputs, critical failures, costs,
   latency, variance, model/provider identities, and hashed response receipts.
7. Keep promotion holdouts hidden at inference through a one-use pre-run
   commitment; disclose after the attested protected run. Reject duplicate,
   leaked, authored-to-fit, or post-result-edited tasks.
8. Report per-skill F1, primary-owner accuracy, abstention precision/recall,
   exact-set and compound exact-set accuracy, win rates versus every control,
   paired/task-clustered confidence, critical failures, cost/latency, and
   family-specific effects. Aggregates may not hide one broken route.
9. Save failures as minimal regression cases, edit the skill—not the threshold
   to chase green—and rerun from a newly frozen candidate. Any relevant byte
   change invalidates the matching proof.

## When not to use

- Use `source-to-skill-distiller` to author or repair the procedure from source
  material before evaluation.
- Use `skill-marketplace-creator` to decide portfolio admission, access,
  provenance, lifecycle, retirement, and distribution across a repository.
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
- A green score is invalid without exact candidate binding, complete artifacts,
  independent recomputation, provenance, and replay.
- Separate behavior improvement from demand, business outcome, current
  authority, and production proof.

## Output contract

Return one Skill Evaluation Program containing:

1. falsifiable claim, exact candidate/catalog identities and all digests;
2. routing dataset design with positive, neighbour, abstention, compound,
   multilingual, and injection cases;
3. behavior tasks, assertions, deterministic artifacts, critical failures, and
   output budget;
4. base/expert/skill/competitor and answer/judge/provider matrix;
5. hidden holdout commitment/disclosure, receipts, provenance/attestation,
   replay, raw artifact, and expiry contract;
6. thresholds plus per-skill/per-case/per-family metrics, uncertainty, cost, and
   latency;
7. failure triage, regression fixtures, proof invalidation, and next run.

Complete only when an independent runner can reproduce the candidate, tasks,
outputs, metrics, and verdict without trusting the author narrative.
