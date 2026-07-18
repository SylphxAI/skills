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

## Completion assurance case

For a material completion claim, write a compact assurance case:

- **Top claim:** the declared terminal is satisfied for the exact subject.
- **Context:** objective, active lane, environment, time, and constraints.
- **Subclaims:** each acceptance predicate and delivery layer.
- **Evidence:** direct proof for each subclaim.
- **Rebuttals:** known contradictions or defeaters and their resolution.
- **Residual:** uncertainty that remains outside the terminal.

This is an argument structure, not extra ceremony. For a small reversible edit,
it may be only a sentence plus one check result.

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
