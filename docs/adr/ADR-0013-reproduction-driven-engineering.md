---
status: accepted
date: 2026-07-22
owners:
  - SylphxAI
---

# ADR-0013: Require reproduction-driven engineering for durable repairs

## Context

Agents can inspect and modify large code surfaces quickly, but that speed also
makes plausible-looking speculative repairs cheap. A guessed cause can produce
several fallbacks, retries, compatibility branches, weakened tests, and local
patches before the original symptom is understood. A green suite written or
changed only after the patch does not show that the patch corrected the
observed failure.

Traditional test-driven development contributes a valuable red-green-refactor
loop, but a universal unit-test-first mandate is the wrong abstraction. Static
failures may already have a compiler oracle; refactors need equivalence or
characterization evidence; concurrent and distributed failures may need replay
or simulation; and an active incident may require immediate containment before
diagnosis. A failing test can also encode the wrong hypothesis or mock away the
real cause.

## Decision

1. `engineering-standard` owns one reproduction-driven engineering method; no
   standalone TDD Skill or competing routing surface is created.
2. A confirmed defect binds its observed symptom and exact unmodified baseline
   plus authoritative expected behavior to the lowest capable faithful
   semantic oracle. When causal isolation needs a narrower oracle, retain a
   linked symptom-level regression oracle. The same oracle execution bundle
   fails for the expected reason on the baseline and passes on the exact
   candidate after the repair.
3. Agents distinguish materially credible causes with observations or
   experiments before claiming root cause. The repair changes the owning
   boundary rather than hiding the symptom with a fallback, retry, alias,
   suppression, duplicate path, or weakened assertion. Focused candidates or
   explicit ablation/counterfactual comparisons prevent unrelated material
   changes from confounding the causal contrast.
4. New behavior begins from an executable contract, example, or property where
   practical. Behavior-preserving refactors begin from characterization,
   differential, or equivalence evidence. Static, configuration,
   documentation, nondeterministic, distributed, and live-only failures use the
   lowest semantic oracle appropriate to their failure model rather than a
   ceremonial unit test.
5. Nondeterministic and live proof predeclares the failure model, harness, seed
   or schedule corpus or observation budget, and decision rule, then applies
   the same protocol to baseline and candidate. A bounded observation proves
   only that window; retry-until-green and arbitrary calendar soak are not
   acceptable evidence.
6. Emergency containment may precede reproduction when harm is active, but it
   remains labelled containment. Closure requires an owning-cause repair,
   unchanged-oracle proof, relevant broader regression evidence, recovery
   proof at the claimed lifecycle layer, and retirement of superseded temporary
   controls.
7. Security reproduction uses authorized isolated targets, least privilege,
   protected exploit evidence, and safe public regression invariants.
8. Instruction-contract tests protect this method because the prose is itself
   the product contract. Product repositories implement it through their
   native compilers, tests, simulations, and delivery evidence; they do not
   copy the standard or add duplicate gates.

## Consequences

- Speculative repair becomes diagnosis or containment, not a completed fix.
- Test-first discipline applies where it creates information without forcing
  every artifact into unit-test ceremony.
- Same-oracle baseline/candidate contrast makes causal claims reviewable and
  reduces reward-hacked green results.
- Parallel agents may widen hypothesis and test coverage, while exact baseline,
  oracle fidelity, ownership, and lifecycle proof remain shared constraints.
- Trivial failures already localized by a compiler, schema validator, or exact
  existing regression test do not acquire duplicate tests or process delay.

## Verification

- The `engineering-standard` entrypoint links the progressive-disclosure
  method for debugging, defect repair, behavior changes, and refactoring.
- Binding predicates require faithful pre-fix failure, evidence-discriminated
  cause, same-oracle post-fix success, broader regression proof, and removal of
  superseded workarounds or containment.
- Repository tests ensure the method continues to distinguish containment,
  root-cause correction, and change-class-specific oracles without creating a
  universal unit-test mandate.
