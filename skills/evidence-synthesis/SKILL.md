---
name: evidence-synthesis
description: "Conduct a reproducible cross-domain review of multiple sources and produce an Evidence Synthesis with a protocol, search and screening record, evidence table, quality and applicability assessment, conflicts or heterogeneity, calibrated certainty, and claim boundaries. Use for systematic, rapid, scoping, or structured evidence reviews across research, policy, science, engineering, or operations. Do not use for market or competitor recommendations, summarizing one supplied source, root-cause hypothesis analysis, adjudicating one disputed claim, or collecting references without synthesis."
---

# Evidence Synthesis

Produce one **Evidence Synthesis** whose coverage, exclusions, conflicts, and
certainty can be audited and reproduced. Read
[references/reproducible-evidence-synthesis.md](references/reproducible-evidence-synthesis.md)
before defining the review protocol.

## Method

1. Frame the answerable question, intended decision, population/system/context,
   intervention or exposure where relevant, outcomes, time horizon, scope, and
   claim boundary. Define what evidence could change the conclusion.
2. Predeclare a proportionate protocol: review type, sources, search strings,
   dates, languages, inclusion/exclusion rules, deduplication, screening,
   extraction fields, quality assessment, synthesis method, and deviations.
3. Search multiple appropriate channels. Preserve exact queries, filters,
   timestamps, result counts, unavailable sources, and citation chaining.
   Prefer primary studies or original records while using reviews to locate and
   contextualize them.
4. Screen against declared criteria. Record reasons for material exclusions.
   Use independent duplicate screening or targeted second review when a
   consequential inclusion judgment is ambiguous; do not add ceremony when a
   deterministic criterion resolves it.
5. Extract comparable facts into an evidence table: source identity, design,
   context/sample, intervention/exposure, comparator, outcome, estimate,
   uncertainty, limitations, funding/conflicts, and applicability.
6. Assess risk of bias, source dependence, measurement validity, missingness,
   selective reporting, indirectness, precision, consistency, and relevance
   using a framework suited to the domain. Do not count repeated reports of one
   underlying dataset as independent evidence.
7. Synthesize results. Preserve direction, magnitude, uncertainty, conflicts,
   and heterogeneity. Pool quantitatively only when the measures and contexts
   make the result meaningful; otherwise use a structured qualitative
   synthesis.
8. State conclusion, certainty, applicability, evidence gaps, and exact limits.
   Separate absence of evidence from evidence of no effect and association from
   causation.

## Output contract

Produce an **Evidence Synthesis** containing:

- question, decision use, scope, review type, protocol, and deviations;
- search log with sources, exact queries, dates, filters, coverage, and access
  limitations;
- screening flow and inclusion/exclusion reasons;
- evidence table with provenance, design, context, measures, findings,
  uncertainty, quality, dependence, and applicability;
- conflict, heterogeneity, bias, missing-evidence, and sensitivity analysis;
- synthesis by outcome or claim, including contrary and null evidence;
- calibrated certainty and the strongest supportable claim boundary; and
- evidence gaps, update triggers, and next research that has positive expected
  information value.

## Integrity rules

- Freeze the protocol before reading toward a preferred conclusion; record any
  justified amendment rather than silently changing criteria.
- Search-result rank, citation count, prestige, repetition, and agent consensus
  are not independent evidence quality.
- PRISMA improves transparent reporting; it does not itself prove review
  quality, causal validity, or certainty.
- Do not fabricate inaccessible methods, sample sizes, effect estimates,
  quotations, or conclusions from titles and abstracts.
- Do not average incompatible evidence until disagreement disappears.
- A rapid review may narrow scope or duplicate work explicitly; it may not hide
  the resulting uncertainty.

## Boundaries

- `market-research-synthesis` owns market, category, competitor, positioning,
  pricing, or demand recommendations.
- `critical-analysis` owns competing hypotheses and diagnosis for one uncertain
  material question.
- `evidence-and-claims-standard` owns the verdict on one material or disputed
  factual, completion, causality, or delivery claim.
- `causal-inference-analysis` owns identification and estimation of a causal
  effect from data; this Skill may synthesize multiple causal studies without
  replacing their identification analyses.
- A domain Skill owns domain-specific interpretation and decisions that consume
  this synthesis.
