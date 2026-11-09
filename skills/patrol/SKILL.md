---
name: patrol
description: "Use when inspecting external production surfaces for unanswered customer inbox queues, official email notices and dual-store revenue discrepancies; checking public stores, live services or delivered artifacts for missing releases, ownership gaps, spending-limit breaches or conflicting records; or replacing recurring LLM inbox polling with a zero-token file-watch trigger daemon. Do NOT use when collecting routine worker status or ETAs or inspecting private transcripts. Use prove-it to establish one claim or review a diff, unblock to restore stalled work, author-item to file a new outcome and challenge to compare designs."
---

# Patrol

Find missing deliveries, ownership gaps, limit breaches and contradictions at the real surface, and bring the person who can act a fact they can use. Patrol reads and reports external ground truth; it does not supervise workers' activity. The owner of the work changes it. Evidence standards live in [`prove-it`](../prove-it/SKILL.md).

## External Ground-Truth Patrol vs. Self-Report Reading

- **Inspect external production and customer surfaces directly:** Internal status summaries cannot establish what customers can use. Choose the relevant external ground-truth surfaces for the patrol's scope:
  1. **Unanswered customer inbox queues:** Read live support and social inbox threads directly for unanswered inbound customer messages or API messaging-window delivery failures.
  2. **Dual-store revenue reconciliation:** Reconcile payment-channel settlement records against the canonical order table that powers live revenue analytics so unprojected orders, cross-currency mismatches, or untracked grants surface immediately.
  3. **Live endpoint responses:** Probe public domains and health endpoints as an external client (without internal routing headers) to detect cached synthetic probe bodies, stale revisions, or failing routes.
  4. **Official platform, developer-account & email truths (`外部客觀真相`):** Inspect official email accounts and platform consoles for app store or developer-account warnings, payment-processor notices, ad-account/social-page anomalies, cloud/domain alerts, or statutory notices. Distinguish **Track 1 subjective user wishes** (bring inside as reference signals for domain specialists to evaluate from first principles, never as orders) from **Track 2 objective external truths** (developer-account issues, platform warnings, verified broken flows—escalate and follow through to a live resolution receipt immediately).
  5. **Post-delivery live surface & cross-domain quality spot-checks (`事後活體產出與跨視角質量抽檢`):** Without adding pre-send approval gates, sample recent shipped outputs on the live surface—such as published social posts and page follower/ad-delivery status, recent outbound VIP/support replies (checking for third-party privacy or internal-bug disclosures), and live store/checkout funnels—so blind spots and regressions are caught internally before the user has to point them out.
  6. **Release availability and ownership:** Compare the publicly installable store version, served revision or delivered artifact with the intended release. A missing delivery matters; whether its owner appears busy or idle does not establish it.
- **Zero-Token Event-Driven Watcher Pattern for Webhook-Less Surfaces:** Use a lightweight zero-token script or daemon to check a webhook-less external surface and write a `.trigger` file watched via `watch: "file:..."` only when `actionable_count > 0`; verify an actionable event wakes the agent before retiring polling, without recurring LLM turns (`every: 15m/1h`). Producer access to a trigger does not prove that the watcher's identity can traverse its parent directories: a permission-denied probe leaves wake coverage unavailable, not an observed missing file. Verify the native watch probe and event delivery; when access needs repair, expose only a known-nonsecret signal path or narrowly scoped read/traverse access, preserving private payloads and unrelated paths. A live observer and trigger file are insufficient wake coverage after a one-shot subscription fires. Each handoff needs active successor and failure/exit wake coverage, with changes reconciled across the successor's registration baseline so work arriving during registration is neither missed nor repeated. Keep observation availability separate from the condition being monitored: a null, unknown or failed read cannot clear the last known incident or become a synthetic recovery transition; retain its observation time until fresh authoritative evidence resolves it. **Bad:** turn an unavailable inbox count into zero and announce recovery; **Good:** report the current count as unknown, preserve the prior finding as historical, and accept a later verified zero as recovery.

## Read the original

- Read the published post, store listing, ledger row or authorized production record itself. A summary drops the detail that matters.
- Read the payload, not its label. A title, a commit subject or a status line states an intent; the stored row states what happened. They can differ on the amount.
- When a finding depends on a table, a standard or an approval, open the authoritative source and find the applicable entry.
- Read the whole result before saying something is missing. A `tail`, a row limit or a keyword filter can hide the row that disproves you. A high-volume sender can mix routine automation with security or account notices, so exclusions follow verified message type, not sender alone. When serial body downloads exceed the observation budget, a complete bounded header census followed by read-only/peek retrieval of candidate bodies preserves coverage; unread candidates remain explicit uncertainty.
- An empty incremental read can mean a stale cursor. Bind the cursor to the account, folder and source generation (`UIDVALIDITY` for IMAP); a changed generation, unknown cursor provenance or live high-watermark below the saved cursor calls for a bounded source read covering the requested window before claiming silence. Preserve read-only and peek semantics when recovering email coverage.
- Compare what runs with what is committed. A private script, a hand-edited config or a local copy can diverge from the reviewed source, and then the reviewed source tells you nothing.

## Measure against a limit

- Before quoting a limit, search every place it could be written: documents, contract files, code and live configuration. When two versions disagree, report both and say which result each gives. Report the conclusion that survives the loosest version.
- State the amount, the permitted amount and the multiple, with both sources.
- After finding one case, sweep the population for the same kind. Report the count, the total and a size the reader can judge, such as the share of the whole stock.
- Count from authoritative records independently of an existing summary. When the two counts differ, report both and the gap instead of choosing one.
- Separate work inside the rule from work outside it before totalling, so an automated, published reward is not counted with a custom one.
- Before calling something over a limit harmful, read what it earned. A breach and a revenue driver can be the same thing, so report both.

## Bound a live change

A live change lasts from the first write until the last reader stops using the old value. The moment the row was restored is only part of that.

```text
❌ The row was restored at 14:12, so the exposure ended at 14:12.
✅ The row was restored at 14:12. The server caches it for five minutes, so the value could
   still apply until 14:17. Measure everything that acted on it through 14:18.
```

- Read cache lifetimes and process restarts in the code, then set the window from them.
- Measure what acted under the changed value inside that window, as aggregates.
- Report three things apart: what changed, what it caused, and what is still unread.

## Missing releases and ownership gaps

An unchanged public version is not by itself stalled work: use the intended release, normal publishing cycle and observed customer effect to judge the gap. When external evidence shows a prolonged lack of delivery, ask the responsible owner a concrete delivery question, such as "When will the new version be available?" or "When will the store listing go live?" The finding is the missing outcome, not a missing progress report. An unclear owner is itself a routing gap to report; routine ETA collection, repeated reminders and private transcript inspection add no delivery evidence.

## Report external findings

- Send one short message with the affected surface, observed result, source and material impact. Present conflicting records together without embedding an instruction or preferred conclusion in a rhetorical question.
- Leave the method and decision to the owner. Do not turn a finding into an order to undo an already delivered customer commitment; a changed input such as verified fraud or chargeback belongs with the responsible specialist. Say plainly what remains unread.
- When a read changes your number, correct it at once in the same place, showing which number replaced which and whether the conclusion moved.
- Hold your own work to the same standard and report your own breaches with the same words.
- Stay silent when the owner has already told the same person the same fact.

## Autonomous Skill Distillation Gate (Completion / Exit Gate)

- Whenever a patrol check or incident review surfaces a **second-attempt detour** (an initial approach hit an undocumented trap and a fallback approach was needed), a **post-ship defect or rework** (an existing verification checklist missed a dimension), or a **recurring cross-agent blind spot**, distill the role-neutral governing mechanism into the owning skill in the shared skills repository following [`author-skill`](../author-skill/SKILL.md)—refining the existing skill in place 90% of the time rather than creating fragmented micro-skills—as part of completing the patrol cycle, without waiting for a human prompt.

## Read safely

- Scope reads to the authorized external account, queue or delivered artifact. Private worker conversations are not patrol evidence.
- Masking secret-store values or URLs alone can still expose authentication codes delivered in ordinary inbox bodies. Keep credential-bearing source fields and authentication payloads out of logs and tool stdout, including expired codes; report metadata and nonsecret security context instead. **Bad:** dump a verification email after stripping URLs; **Good:** report its sender, purpose and expiry without the code or credential-bearing link.
- Use the store's read-only role. When a store has none, say which credential you used and file the missing role.
- Keep personal rows off the machine you read from: compare identifiers inside the query and print counts.
