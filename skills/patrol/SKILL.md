---
name: patrol
description: "Use when inspecting external production surfaces for unanswered customer inbox queues, official email notices and dual-store revenue discrepancies; checking published store releases, live sites or social posts for stalled outward results after a reasonable delivery interval; checking external effects against the accountable owner's scope and authorized spending or change limits; classifying live customer-triggered costs versus internal spend; verifying tenant release or promo freeze scope; identifying unused storage cleanup candidates; handing verified live defects to commercial operations; or replacing recurring LLM inbox polling with a zero-token file-watch trigger daemon. Do NOT use when the task is internal transcript inspection, routine progress reports or ETA solicitation. Use prove-it to establish one claim or review a diff, unblock to restore stalled work, author-item to file a new outcome and challenge to compare designs. Use deliver-and-verify for authorized cleanup."
---

# Patrol

Inspect live user, account and financial outcomes. Route verified scope mismatches, breaches or stalled results to the accountable owner; do not supervise private work or take over execution. Use the evidence standards in [`prove-it`](../prove-it/SKILL.md).

## External Ground-Truth Patrol vs. Self-Report Reading

Read the live surfaces directly; status reports only cover what their authors noticed.

- Check support and social inboxes for unanswered messages and messaging-window failures. Reconcile payment settlements against canonical orders for omissions, currency mismatches and untracked grants.
- Probe public domains and health endpoints without internal routing headers; check for canned probe responses, stale revisions and broken routes.
- Read official email and platform consoles for account, store, payment, ad, service or statutory notices. Route user preferences as feedback, not instructions; escalate verified warnings or broken flows promptly and follow through to a live resolution receipt.
- Sample shipped posts, follower and ad-delivery status, VIP/support replies and checkout flows for regressions or privacy and internal defect disclosures. Sample after delivery, not as a pre-send gate.

For a webhook-less surface, use a lightweight script or daemon that writes a nonsecret `.trigger` watched via `watch: "file:..."` only when `actionable_count > 0`.

- Prove the watcher identity can traverse the parent directories, observe the signal using the native watch probe, and wake the agent on a real actionable event before retiring recurring LLM polling. Permission denied means coverage is unavailable, not that the trigger is missing. Expose only the signal path or narrowly scoped read/traverse access, not private payloads or unrelated paths.
- A one-shot watch ends when it fires even if the daemon and trigger survive. Verify active successor and failure/exit wake coverage at each handoff. Reconcile changes across the successor's registration baseline without missing or repeating work.
- A null or failed read leaves current state unknown. Keep the last confirmed finding and its timestamp as history; require fresh authoritative evidence before reporting recovery.

## Read the original

Read the original post, change, ledger or database payload and the governing standard or approval. Titles, labels and summaries can disagree with what actually occurred. Compare the external effect with current ownership and authorized change scope.

- Read the whole result before saying something is missing. A `tail`, a row limit or a keyword filter can hide the row that disproves you. A high-volume sender can mix routine automation with security or account notices, so exclusions follow verified message type, not sender alone. When serial body downloads exceed the observation budget, a complete bounded header census followed by read-only/peek retrieval of candidate bodies preserves coverage; unread candidates remain explicit uncertainty.
- An empty incremental read can mean a stale cursor. Bind the cursor to the account, folder and source generation (`UIDVALIDITY` for IMAP); a changed generation, unknown cursor provenance or live high-watermark below the saved cursor calls for a bounded source read covering the requested window before claiming silence. Preserve read-only and peek semantics when recovering email coverage.
- Compare what runs with what is committed. A private script, a hand-edited config or a local copy can diverge from the reviewed source, and then the reviewed source tells you nothing.
- A permission refusal on private files is a boundary. Inspect permitted external effects; do not solicit private transcript copies as a supervision workaround.

## Measure against a limit

- Read every plausible limit in contracts, approvals, code and live configuration. Report actual vs. permitted amounts and their ratio where defined, with both sources. If limits conflict, show both comparisons and what holds under either; a looser limit is not authorization.
- Check the authoritative population for similar cases. Separate permitted and out-of-scope activity before totaling; report counts, share, economic impact and unresolved reconciliation gaps. Revenue can coexist with a breach.

### Classify spend by cause and margin

- Trace the charge to actual customer activity (such as sign-up, authentication, inference, payment or fulfillment). Independently reconcile net realized revenue and attributable variable costs from usage, settlement, invoices and effective rates for the same unit or cohort, period and currency. Account for refunds, credits and failed attempts; projected sales or unrelated profit do not establish coverage.
- Treat the charge as self-funded variable cost of goods sold only with verified positive contribution margin (net revenue minus all attributable variable costs) and enforced rate or usage limits that bound abuse and retry costs. A zero internal budget is not a reason to block eligible customer activity. Route missing evidence, nonpositive margin or missing limits as findings; do not assume eligibility or change service limits yourself.
- Internal operating expenses, paid ads, new vendors and unbacked pre-spend require current explicit approval in the authoritative spend record and a fail-closed cap at the approved limit. A saved payment method, existing account or projected payback grants no authority. If approval or the cap cannot be verified, do not treat the spend as authorized.

## Bound a live change

Measure exposure from the first write until the last reader stops using the old value. A restored row can still be served from cache; check lifetimes and process restarts, count affected activity across that window, and report the change, measured effects and unknowns separately.

For a release or promotional freeze, read the active tenant and time window, then trace the deployed dependencies to that tenant's live runtime, database and production routes. A shared change is in scope only if it affects those live surfaces; repo or team membership alone proves nothing. Do not extend a freeze to unrelated platform, engine or sibling-tenant work. Report any unverified dependency as unknown, not as proof of impact or isolation.

## Identify cleanup candidates

Check inventory, lifecycle, active references and retention or recovery records for terminal archived task volumes, expired or rolled-back staging storage, superseded clones and disposable snapshots with two verified backups. Age or inactivity alone does not prove an artifact is disposable. Promptly route verified candidates to the authorized owner; keep live, unique, protected or uncertain data intact. A patrol finding does not authorize deletion. Use the [cleanup and spending acceptance checks](../deliver-and-verify/SKILL.md#establish-the-acceptance-cases) for the change.

## Observe a reasonable external interval

Use the actual release, store-review, posting, settlement or support cycle and fresh external observations to judge progress. Work that just started or remains within that cycle needs no interruption. Only after a reasonable interval without the outward result, ask when it will appear or why the external surface has not advanced; do not solicit routine ETAs, milestone reports or internal explanations.

## Share external evidence without directing execution

- Give commercial operations four verified facts: affected surface and cohort share (including verified healthy surfaces); full or partial outage and measured failure rate; irreversible billing, data, legal, tenant-isolation or store-compliance risk; and evidence-backed time to a live fix, or unknown. Leave ad pauses, sales restrictions and customer notices to commercial operations, scoped to the affected surface.
- Send the observed discrepancy, authoritative source and uncertainty to the accountable owner. Acknowledgement is not evidence. A breach does not authorize clawbacks or other changes; preserve delivered entitlements.
- Correct changed findings where they were reported and say whether the conclusion changed. Apply the same standards to your own work. Do not repeat a fact already sent to the same recipient.

## Autonomous Skill Distillation Gate (Completion / Exit Gate)

Distill reusable lessons from detours, post-release defects and recurring blind spots. Use [`author-skill`](../author-skill/SKILL.md) to refine the owning skill when authorized; otherwise route the lesson to its owner.

## Read safely

- Keep reads within the authorized external account and audience; never use private agent conversations as patrol input. If unrelated private data appears, stop using it and report the scope error without copying the content.
- Masking secret-store values or URLs alone can still expose authentication codes delivered in ordinary inbox bodies. Keep credential-bearing source fields and authentication payloads out of logs and tool stdout, including expired codes; report metadata and nonsecret security context instead. **Bad:** dump a verification email after stripping URLs; **Good:** report its sender, purpose and expiry without the code or credential-bearing link.
- Use the store's read-only role. When a store has none, say which credential you used and file the missing role.
- Keep personal rows off the machine you read from: compare identifiers inside the query and print counts.
