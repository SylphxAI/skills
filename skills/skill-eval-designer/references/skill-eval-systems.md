# Exact-Current Skill Evaluation Systems

## Evidence layers

| Layer | Question | Evidence | Cannot prove |
| --- | --- | --- | --- |
| Static | Is the package structurally valid? | schema, links, secrets, scripts, generated freshness | better agent behavior |
| Injection fixture | Is the intended native auto-injection boundary coherent? | authored positives/negatives/compound cases | generalization |
| Forward test | Does a fresh agent use it on realistic work? | raw prompt/artifact/output and independent review | catalog-wide or model-family effects |
| Injection benchmark | Does the runtime inject every useful and no contradictory Skill? | one-use hidden catalog suite and exact-set/composition metrics | behavior quality |
| Behavior benchmark | Does the exact bundle beat controls? | unseen tasks, controls, deterministic checks, blind judges | demand or production outcome |
| Live use | Does it improve real work? | task receipts, accepted artifacts, outcome/cost/readback | general causal effect without design |

Keep these states independent.

Static authored fixtures are a design contract, not evidence that a supported
runtime injected the expected packages. Native proof requires the runtime's own
selection/load trace bound to the exact catalog and context. When a runtime
does not expose that trace, report only observable fresh-context behavior and
keep the injection state `not verified`; model self-report is not a substitute.

## Candidate binding

Routing identity:

```text
SHA-256(canonical({name, description}))
```

Behavior identity:

```text
SHA-256(canonical({skill, ordered files with path and content digest}))
```

Bind candidate Git SHA, complete catalog digest, dataset/task/rubric/runner/
policy/model-registry digests, tool/runtime contract, parameters, seed, output
budget, provider receipts, protected raw-artifact locators, result digest,
attestation, expiry, audience, access, and retention policy.

## Full-catalog auto-injection matrix

Include:

- five or more varied positive prompts per skill;
- five or more near-neighbour negative prompts per skill;
- explicit abstentions with no material skill value;
- compound tasks with exact expected Skill sets, expected artifacts, one
  semantic owner per artifact, supporting constraints, and forbidden
  contradictions;
- multilingual, short/long, ambiguous, colloquial, and correction forms;
- adversarial prompt injection and misleading keyword cases;
- per-cluster reporting for dense collision areas.

Run the matrix at realistic installed catalog size. Record the runtime version,
context window, configured listing budget, which names/descriptions were
visible, which descriptions were shortened, which entries were omitted, and
whether an explicit invocation path differs from implicit semantic selection.
Test both the documented normal listing and the smallest supported or observed
listing budget. A full installation is not proof that every description was in
initial context.

Assert that injection order does not change obligations, all required fields
can coexist, supporting Skills do not demand duplicate compliance reports, and
no Skill weakens another Skill's floor. Multiple useful Skills in one compound
task are expected composition, not false positives.

Promotion metrics include macro/per-skill F1, artifact-owner accuracy,
abstention precision/recall, exact-set accuracy, compound exact-set accuracy,
and contradiction-free composition. A single aggregate cannot hide one
unusable skill.

## Behavior experiment

Run the same task and output budget under:

1. base model;
2. length-matched generic expert instruction;
3. exact candidate skill bundle;
4. strongest reasonable public comparator when license-safe.

Use unseen realistic tasks, at least two answer-model families and two
independent judge families for promotable evidence, blind randomized condition
labels, complete raw outputs in the protected eval store, and deterministic
artifact/safety checks. Share only authorized aggregates, safe excerpts, and
opaque locators outside that boundary.

Assertions should examine observable decisions and artifacts: state machines,
tables, code diffs, schemas, recovery, source labels, exact commands, or
critical prohibitions. Do not encode a full hidden answer in the user task.

## One-use holdout and attestation

1. Freeze candidate/catalog and policy.
2. Commit a digest of the hidden challenge plus task count and candidate
   identity.
3. Execute on the protected exact commit with the challenge unavailable to the
   candidate/author context.
4. Capture provider response identities/receipts and raw artifacts in the
   protected eval store.
5. Disclose the complete challenge only when its audience and source material
   were classified for disclosure; otherwise publish the commitment, receipts,
   safe excerpts, and aggregate result while the challenge stays protected.
6. Independently recompute every metric and critical-failure verdict.
7. Attest the exact result bytes from the protected workflow.
8. Mark proof stale on candidate, catalog, dataset, runner, policy, model,
   threshold, or expiry change.

## Statistical and failure rules

- Report task-clustered paired effects and confidence intervals, not only means.
- Retain per-answer-family effects; one model family cannot hide regression in
  another.
- Define critical failure classes before inference. Any prohibited safety,
  authority, data-loss, deceptive, or irreversible error can block promotion
  regardless of average score.
- Track tokens, latency, tool calls, retries, and judge variance. A skill that
  wins by using an unconstrained budget did not win the declared comparison.
- Never retry-until-green or drop failed provider calls without a declared,
  capped, symmetric missingness policy.

## Forward-test protocol

Give a fresh agent only the skill path and a realistic task. Pass the complete
task artifacts through the protected eval channel, not through a public report,
and do not pass the diagnosis. Review the result for artifact completeness, boundary use,
unnecessary loading, unsafe shortcuts, and transferable reasoning. Remove test
artifacts between runs to avoid contamination. Convert failures into regression
cases without leaking their intended fix.

## Evaluation state machine

```text
hypothesis -> candidate_frozen -> fixtures_validated -> forward_tested
candidate_frozen -> holdout_committed -> protected_run -> disclosed
protected_run -> independently_recomputed -> attested -> current
current -> stale_on_relevant_change_or_expiry
failure -> triaged -> candidate_revised -> new_freeze
```
