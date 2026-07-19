---
name: critical-analysis
description: "Analyze an uncertain material question while multiple credible hypotheses or explanations remain, using assumptions, disconfirming evidence, base rates, Bayesian updates, and calibrated conclusions. Use for root-cause, architecture, policy, or ambiguous-evidence analysis. Do not use for fixed-predicate candidate acceptance or as the final owner of a durable option decision."
---

# Critical Analysis

Investigate uncertainty without confusing fluency, consensus, or exhaustive
prose with truth. Read
[references/critical-analysis-method.md](references/critical-analysis-method.md)
for the method and templates.
Read [references/bayesian-evidence-updates.md](references/bayesian-evidence-updates.md)
when evidence should update ranked hypotheses quantitatively or
semi-quantitatively.

## Method

1. Frame the exact question, decision relevance, boundary, and deadline.
2. Separate observations, inferences, assumptions, and unknowns.
3. Generate the smallest complete set of materially distinct hypotheses or
   contributing explanations, including the status quo and a credible opposing
   explanation.
4. Identify evidence expected under each hypothesis and prioritize evidence
   that discriminates between them.
5. Search for disconfirmation, missing causes, base rates, incentives,
   survivorship, selection effects, and reversible alternatives.
6. Run the risk-matched challenge method: assumptions check, premortem,
   competing-hypothesis matrix, devil's advocate, or independent perspective.
7. Update the ranking and express a calibrated conclusion, alternatives still
   alive, and what would change the answer.

Do not mechanically enumerate remote possibilities. Include a possibility only
when it could change the conclusion, action, risk floor, or evidence plan.

## Output

Produce a **Critical Analysis Brief**:

- **Question and stakes**
- **Observed facts and evidence quality**
- **Competing hypotheses or explanations**
- **Discriminating evidence**
- **Strongest case for and against the leading conclusion**
- **Assumptions and failure paths**
- **Conclusion and calibrated confidence**
- **What would change the conclusion**

## Boundaries

- This skill diagnoses and challenges; `decision-quality-standard` owns final
  material option selection and durable decision tradeoffs.
- Use `design-space-exploration` to generate materially different solution
  options before selection.
- Use `evidence-and-claims-standard` to adjudicate whether an individual claim
  is supportable.
- Use a domain skill for technical, commercial, security, legal, or product
  requirements.
- Multiple agents may provide independent perspectives, but agreement is not
  evidence and disagreement is not automatically uncertainty.

## Routing examples

Use for “critical think why agents keep doing half a migration,” “compare the
credible causes,” “challenge this architecture thesis,” and “what evidence
would distinguish these explanations?” Do not route a settled implementation
task with a known cause and acceptance test.
