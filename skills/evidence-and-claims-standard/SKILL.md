---
name: evidence-and-claims-standard
description: "Evidence-bound factual, status, completion, causality, and delivery claims. Use when reporting what happened, whether work is done, whether a check passed, whether a stated cause is proven, or whether source, merge, release, deploy, and live behavior are established. Use for audits and handoffs that must prevent hallucination or overclaim."
---

# Evidence and Claims Standard

Make the strongest claim current evidence supports, and no stronger. Read
[references/claim-evidence-method.md](references/claim-evidence-method.md) before
assessing a material or disputed claim.

## Method

1. State the claim precisely enough to be falsifiable.
2. Split compound claims and separate source, review, checks, merge, release,
   deploy, and live behavior.
3. Identify the authority, subject, revision, observation time, and evidence
   required for each claim.
4. Inspect current primary evidence; treat memory, summaries, agent consensus,
   and self-authored status fields as leads only.
5. Test plausible contradiction and staleness paths.
6. Assign `supported`, `refuted`, `unknown`, or `partially supported`.
7. Report residual uncertainty and the narrowest next evidence that could
   change the verdict.

Do not turn unavailable evidence into success or failure. A timeout, missing
permission, absent observation, or unrun check means unknown unless the
authoritative contract proves otherwise.

## Completion claims

Before saying `done`, `fixed`, `converged`, `shipped`, or an equivalent:

- bind the terminal condition before evaluating it;
- verify the exact candidate or live subject named by the claim;
- require evidence that exercises the claimed behavior, not merely nearby
  files, prose, or a self-declared status;
- check that no open finding contradicts the terminal; and
- stop at the lifecycle layer actually proven.

## Output

Produce a **Claim-Evidence Record**:

- **Claim** — one falsifiable statement.
- **Verdict** — supported, refuted, partially supported, or unknown.
- **Subject** — exact artifact, revision, environment, and time where relevant.
- **Evidence** — primary observations and what each proves.
- **Contradictions checked** — material disconfirming paths considered.
- **Boundary** — nearby claims the evidence does not establish.
- **Next evidence** — only if it could materially change the verdict.

## Boundaries

- This skill governs what may be claimed; domain skills define what must be
  built or tested.
- Use `delivery-standard` for delivery mechanics and
  `frontier-verification-standard` for nondeterministic verification design.
- Use `critical-analysis` when several explanations remain credible.
- Do not demand ceremonial evidence that cannot change the claim.

## Routing examples

Use for “is this migration complete?”, “did this deploy reach production?”,
“does the evidence prove this claimed cause?”, and “audit this executor report.” Do not route a
request that merely asks to implement a known code change unless it also asks
for a material status or completion judgment.
