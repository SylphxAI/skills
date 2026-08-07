---
name: record-structured-deliberation
description: "Record a structured deliberation: options, criteria, decision, actions."
---

# Record Structured Deliberation

Produce a **Deliberation Record** that preserves genuine alternatives and makes
the remaining choice legible. Read
[references/deliberation-methods.md](references/deliberation-methods.md) before
choosing a protocol.

## Method

1. Define the question, decision owner, participants, material constraints,
   evidence boundary, deadline, what the discussion may decide, and the
   visibility, access, attribution, retention, and publication rule for raw
   positions, transcripts, evidence, and the final record.
2. Elicit initial positions independently. Do not reveal a proposed consensus,
   majority, senior participant's answer, or other agents' drafts first.
3. Normalize positions without erasing disagreement. Separate proposals,
   supporting reasons, objections, rebuttals, assumptions, evidence, and open
   questions.
4. Map the argument. Record which reason or objection addresses which proposal;
   avoid a flat transcript or an untraceable prose summary.
5. Run the smallest useful challenge round: anonymous Delphi feedback,
   argument-focused critique, or adversarial collaboration on a disputed claim.
6. Ask participants to update or retain their positions with reasons. Treat
   stable dissent as information, not a process failure.
7. Close when another round is unlikely to change the option set, evidence
   needs, material objections, or next action. Hand final selection to its
   decision owner.

## Output

Create a **Deliberation Record** with:

- question, scope, owner, participants, and protocol;
- independently formed positions and declared assumptions;
- proposal-reason-objection-rebuttal links;
- evidence used, disputed claims, and missing discriminating evidence;
- position changes and the evidence or argument that caused them;
- agreements, unresolved objections, minority or dissenting views;
- commitments, owners, and unresolved questions; and
- handoff to a decision, experiment, investigation, or work item; and
- audience classification plus protected-source locators and an intentionally
  shareable projection where one is authorized.

## Integrity rules

- Consensus is not truth, a vote is not evidence, and repetition is not an
  independent signal.
- Do not manufacture independence by asking near-identical agents the same
  leading prompt. Vary evidence sources or assigned hypotheses when useful.
- Do not let rhetoric, status, verbosity, or early anchoring substitute for an
  argument or source.
- Preserve attributable commitments while allowing anonymous first-round
  positions when hierarchy or conformity pressure would distort the result.
- Raw private positions, transcripts, internal hypotheses, customer facts, and
  protected evidence stay in the authorized deliberation store. A public or
  broadly shared record uses an audience-safe minimum summary and must not make
  hidden participants or evidence reconstructable.
- Do not keep deliberating after a decision owner has enough evidence to act;
  record residual dissent instead.


## Progressive disclosure

- [references/decision-quality-standard/](references/decision-quality-standard/) — open when this topic applies
- [references/deliberation-methods.md](references/deliberation-methods.md) — open when needed for depth

## Boundaries

- Use `design-space-exploration` for generic brainstorming and generation of
  materially different solution concepts before participants take positions.
- Use ``analyze-critically` for one analyst comparing hypotheses or diagnosing a
  cause.
- Use `references/decision-quality-standard/` for final material option selection and its
  durable Decision Record or ADR.
- Use `review-multi-review-synthesis` for pass/fail review of an exact candidate.
- Use a domain skill to supply technical, commercial, legal, security, or
  product-specific criteria.
