# Claim-Evidence Method

## Claim model

A material claim should bind:

| Field | Question |
| --- | --- |
| Proposition | What exactly is asserted? |
| Subject | Which artifact, revision, system, population, or event? |
| Scope | Where and when is it asserted to hold? |
| Authority | Which source can establish the fact? |
| Evidence | What observation supports or refutes it? |
| Freshness | When does that observation stop being sufficient? |
| Counterevidence | What credible observation would falsify it? |

Split conjunctions. “Merged and live” is at least two claims. “Tests pass, the
bug is fixed, and the migration is complete” is at least three.

## Evidence strength

Prefer, in order appropriate to the claim:

1. direct observation of the exact subject;
2. independently produced or executable evidence bound to that subject;
3. authoritative records with revision, time, and provenance;
4. reproducible analysis of primary material;
5. secondary summaries and testimony;
6. memory, expectation, agent consensus, or self-declaration.

Lower-ranked evidence can be sufficient for a low-risk claim. It cannot be
silently promoted when the claim requires a stronger authority.

Evidence must be relevant, attributable, current enough, and capable of
changing the verdict. Counting artifacts is not evidence quality. A file named
`proof.json` proves only that the file exists until its producer, subject,
semantics, and contents are verified.

## Lifecycle separation

Keep these claims separate unless one observation genuinely establishes more
than one layer:

- source changed;
- local checks passed;
- review accepted;
- candidate admitted;
- default branch contains the change;
- artifact built or published;
- environment deployed the artifact;
- runtime readback matches it;
- intended behavior is observed.

The correct answer may be “source complete, delivery unknown.” This is more
useful than flattening the state into `done` or `failed`.

## Comparative, SOTA, and frontier claims

`SOTA`, `state of the art`, `best`, `leading`, and `frontier` are comparative
empirical claims, not synonyms for modern, ambitious, high quality, latest,
future-proof, or preferred. Before using one, bind:

- the subject, exact versions, population, task, environment, and date;
- the comparison set and why it is sufficiently current and representative;
- the metric or utility function, constraints, uncertainty, and tradeoffs;
- the authoritative benchmark or reproducible evaluation protocol; and
- the observation that the claimed subject wins under those declared terms.

A system may be frontier-seeking, use frontier methods, or occupy a
Pareto-efficient design point without being proven globally state of the art.
When the comparison set is incomplete, rapidly changing, private, or
non-comparable, state the narrower verified property: for example “current
selected default,” “best among the evaluated candidates,” “high-upside
experimental design,” or “meets the declared target.” Never infer a global
rank from recency, architectural complexity, agent consensus, marketing
language, or one internal benchmark.

`risk-matched-verification-standard` owns how to select simulation, replay,
eval, model, and canary methods for a failure model. It does not establish that
the subject is frontier or SOTA; this claim method adjudicates that separate
comparison.

## Anti-overclaim checks

Before publishing a verdict, ask:

- Is the evidence about this exact subject rather than a nearby revision?
- Did the evidence producer merely repeat the claim?
- Could stale cache, wrong environment, selection bias, or missing population
  reverse the conclusion?
- Does a check demonstrate the behavior or only syntax and presence?
- Is absence proven, or was nothing observed?
- Does a local result support a remote or live claim?
- Is confidence being inferred from agreement among agents trained on similar
  data rather than from independent evidence?

## Research basis

This method synthesizes:

- Goal Structuring Notation's explicit claims, evidence, context, and argument:
  <https://scsc.uk/in-a-nutshell>
- NASA's separation of product verification from product validation:
  <https://www.nasa.gov/reference/5-3-product-verification/>
- Chain-of-Verification, which plans and answers verification questions rather
  than trusting an initial response:
  <https://aclanthology.org/2024.findings-acl.212/>
- RARR's research-and-revision approach to attribution and factual correction:
  <https://aclanthology.org/2023.acl-long.910/>
- NIST guidance on empirical evaluation, fact checking, citation verification,
  and avoiding broad extrapolation from anecdotal tests:
  <https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf>
