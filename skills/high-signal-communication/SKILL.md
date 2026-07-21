---
name: high-signal-communication
description: "Compress or restructure an agent communication into a concise, decision-complete, high-signal artifact. Use when the user explicitly asks to shorten, de-duplicate, hand off, summarize progress, reduce context cost, or repair a verbose/slow-to-understand reply, report, commit, PR, ADR, spec, incident note, or agent record. Do not inject by default for every ordinary reply or document."
---

# High-Signal Communication

Maximize useful meaning per token. The target is the shortest output that lets
its consumer interpret the state correctly and take the right next action.
Concise does not mean incomplete.

## Signal test

Keep a statement only when removing it could change at least one of:

- the answer, decision, or requested artifact;
- the consumer's next action;
- authority, ownership, scope, or current state;
- correctness, risk, uncertainty, recovery, or a material trade-off;
- the evidence needed to verify a claim.

Delete, merge, or replace everything else with a precise locator. Do not spend
tokens proving diligence, narrating routine work, or repeating shared context.

## Method

1. Identify the consumer's immediate job: decide, act, verify, continue, or
   understand.
2. Write the answer, decision, or strongest truthful state first.
3. Add only the material evidence, caveat, blocker, or next action needed for
   that job.
4. State each fact once. Link to the owning artifact instead of copying its
   content or raw history.
5. Compress language: direct verbs, one idea per sentence, concrete nouns,
   stable terms, no ceremonial opening or closing.
6. Run the signal test again and stop.

## Composition

When other injected Skills own the artifact schema, required fields, evidence
floor, or domain semantics, preserve those contracts. This Skill owns ordering,
deduplication, compression, and progressive disclosure only. In supporting
mode it produces no second artifact and never removes required content merely
to make the result shorter.

Use progressive disclosure. A short primary payload may point to detailed
evidence that remains available on demand. Do not preload every possible
question into the primary output.

## Agent-native shape

- Optimize for machine retrieval and future context cost, not literary flow.
- Prefer stable identifiers, exact states, paths, links, SHAs, commands, and
  predicates over narrative descriptions.
- Put important information at the beginning. Do not bury the decision or
  blocker in chronology.
- Preserve raw logs, transcripts, and exploration in their owning protected
  artifact; return only an audience-safe relevant excerpt and locator.
- Use headings or bullets only when they expose distinct peers. Use a paragraph
  for one conclusion. Use tables only when repeated fields materially reduce
  tokens. Avoid diagrams and decorative formatting by default.
- Use JSON, YAML, or another schema only when a machine contract requires it;
  structured-looking prose is not automatically clearer.

## Surface contracts

### Reply or explanation

Lead with the answer. Add rationale only until the answer is actionable and
correct. Do not restate the question, announce the response structure, or end
with a summary of the summary.

### Progress update

Report the delta since the last update: changed state, new evidence, current
blocker, or next action. Do not replay completed history. Include an ETA only
when requested or decision-useful.

### Handoff or checkpoint

Preserve objective, exact current state, unresolved blocker, next executable
action, and evidence locators. Exclude the reasoning diary and routine command
history. The next agent should be able to continue without reconstructing the
whole session.

### Commit or pull request

State the durable outcome in the subject or opening line. Add only non-obvious
rationale, invariant, compatibility, risk, recovery, and verification. A diff
does not need a prose transcription.

### ADR, spec, or documentation

Do not shorten away the contract. Keep the problem and forces, decision,
material alternatives and trade-offs, consequences, failure semantics,
migration or recovery, and verification when applicable. Remove chronology,
duplicated source facts, template filler, and implementation narration owned by
code, schema, or tests.

### Tool or research result

Project the fields and excerpts that answer the question. Preserve source
locators and uncertainty. Do not dump full search results, logs, DOM, JSON, or
command output when a bounded extraction proves the claim.

## Compression guardrails

- Never trade away truth, material evidence, safety, legal obligations,
  uncertainty, or a required public contract for brevity.
- Never collapse source, validation, merge, deploy, and live proof into one
  ambiguous `done` claim.
- Do not replace clear language with unexplained acronyms, dense fragments,
  vague pronouns, or private jargon.
- Do not hide a missing decision behind polished brevity.
- Preserve the user's requested language, register, and useful domain terms.
  Use `voice-preserving-editor` when voice or locale shaping is separately in
  scope.
- Do not impose a universal word count. Required length follows semantic load,
  not artifact type or template size.

## Final check

- Does the first sentence deliver the answer or state?
- Does every remaining sentence pass the signal test?
- Is any fact repeated or available through a better locator?
- Are authority, evidence, risk, uncertainty, and next action preserved where
  material?
- Can the consumer act without asking what the output means?

Read [research-basis.md](references/research-basis.md) only when evolving or
auditing this standard.
