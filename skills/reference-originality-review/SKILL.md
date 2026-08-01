---
name: reference-originality-review
description: "Review originality against references: influence, copying risk, transformation quality, and disclosure needs. Use for originality/reference reviews. Not formal legal opinions and not running plagiarism software alone."
---

# Reference Originality Review

Determine whether a declared subject is independently expressed relative to its
declared references. Produce one **Reference Originality Review** grounded in
exact source pairs, not a visual impression or unsupported legal conclusion.

Read
[references/reference-originality-method.md](references/reference-originality-method.md)
before collecting or classifying similarity evidence.

## Method

1. Freeze the subject revision, reference set, authorized access, intended
   audience, requested comparison boundary, and excluded legal questions.
2. Build the source registry before reaching a verdict. Include current
   artifacts and material history on both sides when history could distinguish
   independent evolution from late convergence.
3. Inspect applicable expression across wording and numeric claims, branding,
   imagery and media, assets, page or flow structure, interaction, motion,
   responsive behavior, and implementation-visible composition.
4. Record exact paired evidence with stable locators. Separate common product
   grammar, functional constraints, and standard platform conventions from
   distinctive expression and distinctive combinations.
5. Test credible alternative explanations: shared requirements, a common
   upstream library or template, chronology, convergent usability choices,
   authorized reuse, and incomplete evidence.
6. Classify the declared comparison only as `clear_on_reviewed_evidence`,
   `changes_recommended`, `hold_for_redesign`, or `evidence_incomplete`.
   State confidence and denominator; no verdict proves universal originality.
7. Where change is needed, identify the smallest coherent redesign that removes
   the distinctive dependency while preserving the product's own requirements.
   Re-review the exact changed artifact against the same evidence set.

## Evidence rules

- Never infer copying from a mood, genre, color family, or common layout alone.
- Never clear a subject after inspecting only a screenshot when wording,
  motion, state transitions, assets, or history are material.
- Treat image hashes, text similarity, DOM diffs, and motion traces as leads;
  a metric is not the verdict.
- Preserve uncertainty and contradictory evidence. Missing source access is an
  evidence gap, not permission to claim either copying or originality.
- Keep private references and internal analysis within their authorized
  audience. A public derivative must contain only intentionally releasable
  evidence.
- Describe design risk and observed similarity. Legal infringement,
  fair-use, trademark, and jurisdiction-specific conclusions require qualified
  legal authority.

## Output contract

Produce one **Reference Originality Review** containing:

- exact subject identity, revision, scope, authorized audience, reference
  denominator, exclusions, and evidence gaps;
- source registry with current and historical locators, chronology,
  provenance/authorization, and confidence;
- pairwise evidence ledger covering each applicable expression category;
- alternative-explanation analysis distinguishing conventions, constraints,
  shared sources, and distinctive expression;
- calibrated verdict, rationale, confidence, and the boundary within which the
  verdict is valid;
- ranked redesign actions with the distinctive dependency each action removes;
  and
- exact re-review evidence for a changed candidate, or a clearly owned next
  action when evidence remains incomplete.

## Routing boundaries

- `design-system-extractor` owns evidence-backed recovery of the subject
  product's own existing tokens, components, states, and design rules.
- `interface-craft` owns designing, building, polishing, or reviewing a bounded
  interface or flow; this Skill supplies an originality finding when that is an
  independently requested artifact.
- `product-asset-production` owns rights-safe production, provenance, and exact
  QA of a declared media pack.
- Comparative product research may inform the reference set, but does not
  authorize copying another product's identity or private material.
- Route legal conclusions to qualified legal review; do not manufacture a
  legal artifact because no specialist is available.

Complete only when another reviewer can locate every material source pair,
understand why alternatives were accepted or rejected, and reproduce the
declared verdict without relying on the author's intuition.
