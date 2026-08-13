---
name: establish-correct-approach
description: "Establishes the current correct method for an implementation or fix from live authority and competing alternatives. Use before building or patching when the right approach is not yet proven."
---

# Establish Correct Approach

Name the **current correct method** before mutating. A workaround, local
hack, or dual-path patch is not a method.

## When to use

- About to implement a capability or fix a bug
- The first idea is a patch, flag, extra process, or copied tutorial
- The owning contract, public API, or industry method may have moved

Skip only reversible local typos or a change whose correct method is already
named by an installed skill you just opened.

## Method

1. **Ask one question.** "What is the current correct method for *this*
   change?" Not "how do I make the symptom stop."
2. **Open installed skills first.** If a verb listing or recipe already owns
   the job, that *is* the method. Stop.
3. **Name live authorities.** Official docs, current CLI/SDK/schema, owning
   repo contract, and the code that actually runs. Training memory is not
   authority.
4. **Read the current contract.** Use host search and fetch for public
   surfaces. Record URL or command and date.
5. **Compete at least three approaches.** Include (a) the canonical owner
   path, (b) the status quo, (c) the tempting hack. Open
   `../analyze-critically/` when causes or methods actually compete. Try to
   **disprove** the favourite, not confirm it.
6. **Classify.** Correct = owning-layer, current-contract, no dual truth.
   Hack = symptom patch, wrong layer, copied analogy, or a second system.
   See [references/correct-vs-hack.md](references/correct-vs-hack.md).
7. **Chesterton's fence.** Do not remove or bypass existing structure until
   you can say why it is there. Then you may still replace it on the owner.
8. **Stop.** More reading that cannot change the method is waste. A full
   systematic review is `synthesize-evidence-brief`, not this job.

Do not implement in this skill. Hand the named method to `build-product`,
`maintain-product`, or the matching verb listing.

## Done

The Correct Approach Record names the method, the live authority, the
rejected hacks, and what would change the answer.

## Progressive disclosure

- [references/correct-vs-hack.md](references/correct-vs-hack.md) — classify correct vs hack
- [references/method-sources.md](references/method-sources.md) — industry sources for this gate
- `../analyze-critically/` — competing methods or causes
- `../select-dependency-versions/` — live versions, never remembered pins

## Boundaries

Does not implement. Does not own architecture cutover, systematic reviews,
or product-domain policy. Trivial reversible edits are out of scope.
