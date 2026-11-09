---
name: patrol
description: "Use when inspecting external production surfaces for unanswered customer inbox queues, official email notices and dual-store revenue discrepancies; checking published store releases, live sites or social posts for stalled outward results after a reasonable delivery interval; checking external effects against the accountable owner's scope and authorized spending or change limits; or replacing recurring LLM inbox polling with a zero-token file-watch trigger daemon. Do NOT use when the task is internal transcript inspection, routine progress reports or ETA solicitation. Use prove-it to establish one claim or review a diff, unblock to restore stalled work, author-item to file a new outcome and challenge to compare designs."
---

# Patrol

Inspect actual user, customer, account and financial outcomes, and give the accountable owner verified external evidence of a scope mismatch, breach or stalled result. Patrol does not demand explanations, inspect private turn progress or direct another person's implementation. Evidence standards live in [`prove-it`](../prove-it/SKILL.md).

## External Ground-Truth Patrol vs. Self-Report Reading

- **Inspect external production and customer surfaces directly:** A worker's self-reported status file or chat summary only reflects what that worker noticed; blind spots happen outside the worker's attention. On every patrol pass, inspect external ground-truth surfaces directly rather than relying on workers' self-reported status files:
  1. **Unanswered customer inbox queues:** Read live support and social inbox threads directly for unanswered inbound customer messages or API messaging-window delivery failures.
  2. **Dual-store revenue reconciliation:** Reconcile payment-channel settlement records against the canonical order table that powers live revenue analytics so unprojected orders, cross-currency mismatches, or untracked grants surface immediately.
  3. **Live endpoint responses:** Probe public domains and health endpoints as an external client (without internal routing headers) to detect cached synthetic probe bodies, stale revisions, or failing routes.
  4. **Official platform, developer-account & email truths (`外部客觀真相`):** Inspect official email accounts and platform consoles for app store or developer-account warnings, payment-processor notices, ad-account/social-page anomalies, cloud/domain alerts, or statutory notices. Distinguish **Track 1 subjective user wishes** (bring inside as reference signals for domain specialists to evaluate from first principles, never as orders) from **Track 2 objective external truths** (developer-account issues, platform warnings, verified broken flows—escalate and follow through to a live resolution receipt immediately).
  5. **Post-delivery live surface & cross-domain quality spot-checks (`事後活體產出與跨視角質量抽檢`):** Without adding pre-send approval gates, sample recent shipped outputs on the live surface—such as published social posts and page follower/ad-delivery status, recent outbound VIP/support replies (checking for third-party privacy or internal-bug disclosures), and live store/checkout funnels—so blind spots and regressions are caught internally before the user has to point them out.
  6. **Responsibility and scope:** Compare the observed external action with the current authorized ownership and change contract. A role mismatch is a routing fact, not permission to take over execution or inspect private transcripts.
- **Zero-Token Event-Driven Watcher Pattern for Webhook-Less Surfaces:** Use a lightweight zero-token script or daemon to check a webhook-less external surface and write a `.trigger` file watched via `watch: "file:..."` only when `actionable_count > 0`; verify an actionable event wakes the agent before retiring polling, without recurring LLM turns (`every: 15m/1h`). Producer access to a trigger does not prove that the watcher's identity can traverse its parent directories: a permission-denied probe leaves wake coverage unavailable, not an observed missing file. Verify the native watch probe and event delivery; when access needs repair, expose only a known-nonsecret signal path or narrowly scoped read/traverse access, preserving private payloads and unrelated paths. A live observer and trigger file are insufficient wake coverage after a one-shot subscription fires. Each handoff needs active successor and failure/exit wake coverage, with changes reconciled across the successor's registration baseline so work arriving during registration is neither missed nor repeated. Keep observation availability separate from the condition being monitored: a null, unknown or failed read cannot clear the last known incident or become a synthetic recovery transition; retain its observation time until fresh authoritative evidence resolves it. **Bad:** turn an unavailable inbox count into zero and announce recovery; **Good:** report the current count as unknown, preserve the prior finding as historical, and accept a later verified zero as recovery.

## Read the original

- Read the post, pull request, ledger row or database row itself. A summary drops the detail that matters.
- Read the payload, not its label. A title, a commit subject or a status line states an intent; the stored row states what happened. They can differ on the amount.
- Open the governing table, standard or approval before judging an external effect; a cited summary is not its authoritative row.
- Read the whole result before saying something is missing. A `tail`, a row limit or a keyword filter can hide the row that disproves you. A high-volume sender can mix routine automation with security or account notices, so exclusions follow verified message type, not sender alone. When serial body downloads exceed the observation budget, a complete bounded header census followed by read-only/peek retrieval of candidate bodies preserves coverage; unread candidates remain explicit uncertainty.
- An empty incremental read can mean a stale cursor. Bind the cursor to the account, folder and source generation (`UIDVALIDITY` for IMAP); a changed generation, unknown cursor provenance or live high-watermark below the saved cursor calls for a bounded source read covering the requested window before claiming silence. Preserve read-only and peek semantics when recovering email coverage.
- Judge outward progress through the promised external result and its actual delivery cycle. Internal status tables and private transcripts are not the patrol's evidence source.
- Compare what runs with what is committed. A private script, a hand-edited config or a local copy can diverge from the reviewed source, and then the reviewed source tells you nothing.
- A permission refusal on private files is a boundary. Inspect permitted external effects; do not solicit private transcript copies as a supervision workaround.

## Measure against a limit

- Before quoting a limit, search every place it could be written: documents, contract files, code and live configuration. When two versions disagree, report both and say which result each gives. Report the conclusion that survives the loosest version.
- State the amount, the permitted amount and the multiple, with both sources.
- After finding one case, sweep the population for the same kind. Report the count, the total and a size the reader can judge, such as the share of the whole stock.
- Count from the external authoritative population. When settlement and published analytics disagree, retain both sources and the gap instead of selecting a preferred total.
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

## Observe a reasonable external interval

Use the actual release, store-review, posting, settlement or support cycle and fresh external observations to judge progress. Work that just started or remains within that cycle needs no interruption. Only after a reasonable interval without the outward result, ask when it will appear or why the external surface has not advanced; do not solicit routine ETAs, milestone reports or internal explanations.

## Share external evidence without directing execution

- Send a concise useful fact about the external object, discrepancy or scope mismatch and its authoritative source. State uncertainty; leave domain decisions and implementation with the accountable owner.
- An acknowledgement confirms receipt only. Read the relevant authoritative source before answering substance or routing an issue; neither a quick reply nor a report label proves the facts.

```text
❌ "Send a new ETA and your transcript; why have you not changed the deployment yet?"
✅ "The published download still serves the previous version after the normal release interval; the release page also shows the old artifact. When will the new outward version be available?"
```

- A measured external breach does not authorize clawbacks or another operation. Preserve delivered entitlements and existing authority while the owner assesses the evidence.
- When a read changes your number, correct it at once in the same place, showing which number replaced which and whether the conclusion moved.
- Hold your own work to the same standard and report your own breaches with the same words.
- Stay silent when the owner has already told the same person the same fact.

## Autonomous Skill Distillation Gate (Completion / Exit Gate)

- Whenever a patrol check or incident review surfaces a **second-attempt detour** (an initial approach hit an undocumented trap and a fallback approach was needed), a **post-ship defect or rework** (an existing verification checklist missed a dimension), or a **recurring cross-agent blind spot**, distill the role-neutral governing mechanism into the owning skill in the shared skills repository following [`author-skill`](../author-skill/SKILL.md)—refining the existing skill in place 90% of the time rather than creating fragmented micro-skills—as part of completing the patrol cycle, without waiting for a human prompt.

## Read safely

- Keep reads within the authorized external account and audience; never use private agent conversations as patrol input. If unrelated private data appears, stop using it and report the scope error without copying the content.
- Masking secret-store values or URLs alone can still expose authentication codes delivered in ordinary inbox bodies. Keep credential-bearing source fields and authentication payloads out of logs and tool stdout, including expired codes; report metadata and nonsecret security context instead. **Bad:** dump a verification email after stripping URLs; **Good:** report its sender, purpose and expiry without the code or credential-bearing link.
- Use the store's read-only role. When a store has none, say which credential you used and file the missing role.
- Keep personal rows off the machine you read from: compare identifiers inside the query and print counts.
