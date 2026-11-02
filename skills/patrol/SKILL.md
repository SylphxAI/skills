---
name: patrol
description: "Use when checking other workers' output for a broken rule, a late finish time, spend against a cap or a contradiction: reading progress reports and group posts; a finish time passed with no new one; a worker reports changing live data, sending a grant or reverting a config; judging whether a spend, grant or change stayed within its written limit; or two documents or workers disagree on a number. Use prove-it to establish one claim or review a diff, unblock to restore stalled work, author-item to file a new outcome and self-challenge to compare designs."
---

# Patrol

Find what is late, over a limit or contradictory while it is still cheap to fix, and bring the person who can act a fact they can use. Patrol reads and reports. The owner of the work changes it. Evidence standards live in [`prove-it`](../prove-it/SKILL.md).

## Read the original

- Read the post, pull request, ledger row or database row itself. A summary drops the detail that matters.
- Read the payload, not its label. A title, a commit subject or a status line states an intent; the stored row states what happened. They can differ on the amount.
- When a worker cites a table, a standard or an approval, open it and find the row. "According to the table" stays a claim until the row is on your screen.
- Read the whole result before saying something is missing. A `tail`, a row limit or a keyword filter can hide the row that disproves you.
- Judge a worker's state by its transcript and file times. A status table can show working while nothing moves, or idle while work continues.
- Compare what runs with what is committed. A private script, a hand-edited config or a local copy can diverge from the reviewed source, and then the reviewed source tells you nothing.
- A permission refusal on another worker's private files is a boundary. Ask for a readable copy, or read the effects in the live store.

## Measure against a limit

- Before quoting a limit, search every place it could be written: documents, contract files, code and live configuration. When two versions disagree, report both and say which result each gives. Report the conclusion that survives the loosest version.
- State the amount, the permitted amount and the multiple, with both sources.
- After finding one case, sweep the population for the same kind. Report the count, the total and a size the reader can judge, such as the share of the whole stock.
- Count independently of the worker's own audit. When the two counts differ, report both and the gap instead of choosing one.
- Separate work inside the rule from work outside it before totalling, so an automated, published reward is not counted with a custom one.
- Before calling something over a limit harmful, read what it earned. A breach and a revenue driver can be the same thing, so report both.

## Bound a live change

A live change lasts from the first write until the last reader stops using the old value. The moment the row was restored is only part of that.

```text
❌ The worker restored the row at 14:12, so the exposure ended at 14:12.
✅ The row was restored at 14:12. The server caches it for five minutes, so the value could
   still apply until 14:17. Measure everything that acted on it through 14:18.
```

- Read cache lifetimes and process restarts in the code, then set the window from them.
- Measure what acted under the changed value inside that window, as aggregates.
- Report three things apart: what changed, what it caused, and what is still unread.

## Push a time

- A finish time is a UTC time and a named carrier. When it passes with no new one, ask the carrier once for a UTC time or a named blocker.
- Set a timed check for the end of the answer window. Timed wakes can be dropped while you are busy or out of quota, so after any gap run the missed checks by hand.
- With no answer in that window, tell the person who can act: who, where it is stuck, what is known and what is not.
- Before calling work stuck, read whether its worker is still writing. An idle worker may have slept through a dependency that has since finished, which a single wake fixes.
- Count repeated ranges. The seventh new finish time for one outcome is itself a finding; ask what changed since the sixth.

## Report

- Send one short message: what, where, when and source. Across an ownership line it carries facts only, never an instruction.
- Raise observations, questions and possible problems. Leave the method and the decision to the owner: a recommendation or a plan from patrol reads as an order, and it can stop work that was earning. Say plainly what you have not read.
- When a read changes your number, correct it at once in the same place, showing which number replaced which and whether the conclusion moved.
- Hold your own work to the same standard and report your own breaches with the same words.
- Stay silent when the owner has already told the same person the same fact.

## Read safely

- Scope history searches to a named worker or conversation. A search across everything can return private chats; if it does, do not use the result, and report it.
- A masking filter can miss a value. When reading source that may hold a credential, exclude those lines from the output.
- Use the store's read-only role. When a store has none, say which credential you used and file the missing role.
- Keep personal rows off the machine you read from: compare identifiers inside the query and print counts.
