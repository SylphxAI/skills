---
name: patrol
description: "Use when checking other workers' output for a broken rule, a late finish time, spend against a cap or a contradiction, inspecting external production surfaces for unanswered customer inbox queues and dual-store revenue discrepancies, or replacing recurring LLM inbox polling with a zero-token file-watch trigger daemon: reading progress reports and group posts; a finish time passed with no new one; a worker reports changing live data, sending a grant or reverting a config; judging whether a spend, grant or change stayed within its written limit; or two documents or workers disagree on a number. Use prove-it to establish one claim or review a diff, unblock to restore stalled work, author-item to file a new outcome and self-challenge to compare designs."
---

# Patrol

Find what is late, over a limit or contradictory while it is still cheap to fix, and bring the person who can act a fact they can use. Patrol reads and reports. The owner of the work changes it. Evidence standards live in [`prove-it`](../prove-it/SKILL.md).

## External Ground-Truth Patrol vs. Self-Report Reading

- **Inspect external production and customer surfaces directly:** A worker's self-reported status file or chat summary only reflects what that worker noticed; blind spots happen outside the worker's attention. On every patrol pass, inspect external ground-truth surfaces directly rather than relying on workers' self-reported status files:
  1. **Unanswered customer inbox queues:** Read live support and social inbox threads directly for unanswered inbound customer messages or API messaging-window delivery failures.
  2. **Dual-store revenue reconciliation:** Reconcile payment-channel settlement records against the canonical order table that powers live revenue analytics so unprojected orders, cross-currency mismatches, or untracked grants surface immediately.
  3. **Live endpoint responses:** Probe public domains and health endpoints as an external client (without internal routing headers) to detect cached synthetic probe bodies, stale revisions, or failing routes.
  4. **Sub-agent turn progress:** Read active and idle worker transcripts, tool receipts, and commit/PR state directly.
- **Zero-Token Event-Driven Watcher Pattern for Webhook-Less Surfaces:** Never poll external inboxes or queues with recurring LLM turns (`every: 15m/1h`), and never cancel polling without an active wake wire in place. Instead, run a lightweight zero-token script or daemon that checks the external surface on a timer and writes a `.trigger` file watched via `watch: "file:..."` only when `actionable_count > 0`, waking the agent only when real customer or operational work exists. Verify the wire end to end before cancelling the poll: create a test actionable item, see the trigger file written, and see the agent wake and act. A script that only writes results to disk wakes no one: one scanner found new customer messages every 60 seconds but never woke its agent, and seven conversations waited an hour unanswered.

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

## Report and Symmetric Tension Questioning

- Send one short message: what, where, when and source. Across an ownership line it carries facts only, never an instruction.
- **Symmetric Tension Questioning (Overcoming RLHF Sycophancy):** When raising an issue across a domain boundary, present the conflicting primary-source facts and constraints symmetrically without embedding a disguised command or preferred conclusion in a rhetorical question, leaving the design and decision to the domain owner. Because language models trained with RLHF are biased toward sycophantic compliance when questioned by a coordinator or patrol agent, a rhetorical question (*"Why did you grant X? Shouldn't we switch to Y immediately?"*) causes the domain owner to flip-flop on a live commitment without checking whether the original action served its goal. State both competing primary facts neutrally and never ask a worker to claw back an already delivered customer commitment unless a measured input (such as verified fraud or chargeback) changed.

```text
❌ Leading / rhetorical question (triggers RLHF sycophancy and commitment flip-flop):
   "Why did you issue 500B coins to <user_name>? Isn't that over the tier cap and shouldn't you switch it to materials?"
✅ Symmetric tension question (presents both primary facts neutrally; owner decides):
   "In transaction #4821, <user_name> (recent spend: $1,200) received 500B positional leaderboard coins, which places them within 5% of top spender <rival_user_name> ($18,000) on the public wealth board while resolving <user_name>'s ticket. Keep the already delivered grant intact; for future mid-tier retention grants, how should the budget weigh immediate coin appeal against zero leaderboard spillover onto top spenders?"
```

- Raise observations, questions and possible problems. Leave the method and the decision to the owner: a recommendation or a plan from patrol reads as an order, and it can stop work that was earning. Say plainly what you have not read.
- After reporting a breach to the person who set the rule, ask the worker a few open questions as well: what went wrong, what it could lead to, and how it could be solved. Ask whether the cause is the worker or a capability the system lacks. Leave the answer to the worker; someone in the middle of the work often can't see the pattern.
- When a read changes your number, correct it at once in the same place, showing which number replaced which and whether the conclusion moved.
- Hold your own work to the same standard and report your own breaches with the same words.
- Stay silent when the owner has already told the same person the same fact.

## Autonomous Skill Distillation Gate (Completion / Exit Gate)

- Whenever a patrol check or incident review surfaces a **second-attempt detour** (an initial approach hit an undocumented trap and a fallback approach was needed), a **post-ship defect or rework** (an existing verification checklist missed a dimension), or a **recurring cross-agent blind spot**, distill the role-neutral governing mechanism into the owning skill in the shared skills repository following [`author-skill`](../author-skill/SKILL.md)—refining the existing skill in place 90% of the time rather than creating fragmented micro-skills—as part of completing the patrol cycle, without waiting for a human prompt.

## Read safely

- Scope history searches to a named worker or conversation. A search across everything can return private chats; if it does, do not use the result, and report it.
- A masking filter can miss a value. When reading source that may hold a credential, exclude those lines from the output.
- Use the store's read-only role. When a store has none, say which credential you used and file the missing role.
- Keep personal rows off the machine you read from: compare identifiers inside the query and print counts.
