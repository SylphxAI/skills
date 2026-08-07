# Pre-v3 entry method (write-high-signal-update)

> Archived entry procedure from `1ba07c46dce3f448e84374ba2b52aafc65e861ce` so clean-break rewrite of `SKILL.md` does not destroy researched method text. Prefer the current `SKILL.md` for routing; use this file when the deeper pre-v3 procedure is needed.

---

# Write High-Signal Update

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
6. Perform agent-owned actions before reporting them. Do not turn an available
   tool action into instructions for the user merely to shorten the response.
7. Run the signal test again and stop.

## Composition

When other injected Skills own the artifact schema, required fields, evidence
floor, or domain semantics, preserve those contracts. This Skill owns ordering,
deduplication, compression, and progressive disclosure only. In supporting
mode it produces no second artifact and never removes required content merely
to make the result shorter.

The runtime constitution's compact communication invariant applies to ordinary
replies without loading this full method. Load this Skill when compression or
restructuring is materially part of the requested artifact; do not turn it into
an always-on style body.

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
- Use professional complete sentences by default. Telegraphic grammar, forced
  slang, unexplained abbreviations, and artificial fragments can be shorter
  while taking longer to understand.

## Surface contracts

### Reply or explanation

Lead with the answer. Add rationale only until the answer is actionable and
correct. Do not restate the question, announce the response structure, or end
with a summary of the summary. Do not append a generic invitation, call to
action, or next step when the request is already complete.

When explaining a system, begin with one accurate primary causal path through
intent, owner, action or effect, and outcome. Reveal authority, state, recovery,
branches, contracts, and implementation detail only as the consumer drills
deeper. Do not flatten genuinely asynchronous or divergent behavior into a
false linear story, and do not make the explanation a second source of truth.

### Progress update

Report the delta since the last update: changed state, new evidence, current
blocker, or next action. Do not replay completed history. Include an ETA only
when requested or decision-useful.

### Failure or blocker

State the failed operation or object, observed cause, impact on the requested
terminal, and the smallest executable recovery or decision. Separate confirmed
cause from hypothesis. Omit apology loops, emotional framing, and the
investigation diary.

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
- Do not force an arbitrary number of bullets, steps, sentences, or headings.
  Number only real sequences; group peers only when the grouping improves
  retrieval.
- Preserve the user's requested language, register, and useful domain terms.
  Use ``edit-preserving-voice` when voice or locale shaping is separately in
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

Read [research-basis.md](research-basis.md) only when evolving or
auditing this standard.
