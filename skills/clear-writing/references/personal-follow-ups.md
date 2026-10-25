# Personal to-dos and pending asks

Trigger: a person asks you to remember, track, resume, list, complete, cancel,
or follow up on their personal work; or before sending a question about it.
Use this procedure with [work communication](work-communication.md). Personal
records belong in the platform's durable task and ask store, never in skills,
core persona instructions, or a transient conversation summary.

## Persist and reconcile

1. Read existing records for the authenticated person and permitted conversation
   before changing anything. Never infer identity from a display name, quoted
   text, or task wording. Keep private records out of shared rooms unless the
   person has authorized that audience.
2. Preserve the original message and source reference in durable inbox/history
   before acknowledging capture. Each to-do records the person,
   conversation/audience, source message, requested outcome, status, next action,
   and any explicit due date. Each pending ask additionally records the linked
   to-do, intended respondent, exact decision needed, why it blocks work,
   delivery status/receipt, and any authorized reminder time. Do not invent dates
   or turn an exploratory question into an unrequested task.
3. Use stable record IDs and the source delivery ID within the authenticated
   account and conversation scope for idempotent capture. Repeated delivery of
   the same source reads or updates the same records. Identical wording from
   another person or conversation is not a duplicate. Preserve separate outcomes
   within one message; do not collapse them by text similarity.
4. Persist each transition and read it back: open → in progress → completed,
   or cancelled. Pending asks become answered, superseded, or no longer needed,
   with the reason and source. Retain original messages and transition history
   under the platform's retention policy. Pruning removes an ask from the active
   queue and cancels future reminders; it does not erase the source or cancel
   the underlying to-do. Completion needs outcome evidence, not just a sent reply.
5. On restart or interruption, reload durable records and reconcile newer
   answers, completions, cancellations, and delivery receipts before acting.
   Use conditional updates or the platform's single-writer mechanism for races:
   a delayed worker must not reopen a resolved ask or overwrite newer state.
   If durable storage is unavailable, do not claim capture succeeded or rely on
   scratch files as persistence. State the limitation and preserve the source
   through the supported recovery path.

## Prune before asking

Before creating, sending, or reminding about an ask, reread the relevant task,
answers, existing grants, and accessible current sources. Remove an ask from the
active queue when already answered, duplicated by the same open ask,
superseded, irrelevant because the work is completed/cancelled, or resolvable
from available evidence without the person's input. Use a safe default within
an existing grant rather than requesting permission again.

Keep a necessary ask for a missing grant, new unauthorized spend, or an ambiguity
that materially changes the outcome. Do not guess authority or prune an
unresolved safety requirement just to reduce the count. Ask one concise question
with the recommended option and consequence of waiting. Do independent authorized
work meanwhile. Use the platform's durable wait for the answer or deadline;
reminders require the person's request or an applicable policy, not each restart.
When requested, list active to-dos and still-needed asks with status and next
action, only within the authorized audience.

## Interrupted and duplicate delivery

Use the platform's durable inbox and idempotent outbound delivery capability;
do not build a second message queue in prompts or local files. Persist the
inbound source and intended state change before external effects. Associate a
reply/ask with a stable logical delivery key and persist its submission receipt.
On retry, reconcile that same key and receipt at the provider before sending.
An ambiguous send outcome is unknown, not failed: do not blindly resend or
mark it delivered. Recover through the supported delivery-status mechanism.
If it cannot resolve uncertainty or provide idempotency, keep the record pending
and report the capability gap rather than promise exactly-once delivery.

A duplicate event may resume unfinished authorized work; it must not create a
second task/ask, lose the original message, switch person or conversation, or
emit an unrequested duplicate reply. Explicitly requested resends are new
authorized deliveries linked to the original, not duplicate-event retries.

## Acceptance checks at the serving surface

Use authorized test accounts and isolated conversations. Record source IDs,
record IDs, transition history, provider receipts, observed outputs, UTC read
time, and the serving skill revision. Never put personal content in public test
results. Static documentation checks do not prove runtime behavior.

| Case | Required observation |
| --- | --- |
| Capture two personal to-dos and one necessary ask, then restart | Original sources, both outcomes, and pending ask survive; listing reloads them from durable storage. |
| Answer an ask in another authorized session | Reconciliation marks it answered and cancels reminders; underlying to-do remains open until its outcome is verified. |
| Answer exists, authority was granted, or accessible source resolves question | No question sent; ask marked no longer needed with its reason. |
| Grant genuinely missing | One necessary ask remains; no unauthorized action. |
| Cancel or complete a to-do while reminder worker is delayed | Stale worker does not send or reopen asks; original history remains. |
| Replay same delivery, including concurrently | One set of records and at most one requested logical reply; original remains retrievable. |
| Interrupt after source capture, after state persistence, and after provider acceptance but before receipt persistence | Restart recovers original and reconciles unfinished work; no blind resend after ambiguous acceptance. |
| Same text from different people or conversations | Separate records and replies in correct scopes; private lists never appear in another audience. |
| Storage or delivery-status service unavailable | No false capture/delivery claim or blind retry; supported recovery retains original source and pending work. |

Verify these cases against the serving revision as well as merged files. If a
required runtime capability is absent, fix its owning engine through the supported
platform path; a written procedure alone is not completion.
