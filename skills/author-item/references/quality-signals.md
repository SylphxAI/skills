# Quality signals standard

Trigger: shipping or running a product that people use, giving a product an
AI agent, or opening a support channel.

Problems are found by the product, not reported by its users. Most users who
hit a problem never report it; they retry, give up, or leave. Every product
therefore detects its own failures and user-visible symptoms, groups them, and
lands each group once in the work system, where its score orders the fix. We
fix in batches from that queue instead of from complaints.

## Hard lines

- **One backlog.** A detected problem lands as one deduplicated work item (or a
  note on the open one), never in a second tracker, chat or inbox that nobody
  ranks ([work.md](work.md)).
- **No personal data or secrets in a signal or an item.** A signal carries
  opaque ids, enumerated codes and counts only: never message text, a prompt,
  a tool argument, an email, a token or a payment detail
  ([security.md](../../deliver-and-verify/references/security.md)). Detail stays in the product's own records,
  read through its normal access path.
- **Escalation and disclosure** follow
  [conduct.md](../../self-challenge/references/conduct.md#customers-and-players).

## Practices

- **Errors are grouped, not counted one by one.** Every product emits its
  errors to the platform observability service, grouped by a fingerprint (the failure kind
  and where it happened), with the release recorded on each occurrence; a
  group that comes back after it was closed is a regression and opens a new
  item (Sentry issue grouping and regressions; Firebase Crashlytics).
- **User-visible symptoms are signals too.** Besides errors, a product emits
  what a user feels: a failed or abandoned task, a repeated retry, a rage
  click, an error click, a dead end (Datadog RUM and Sentry frustration
  signals). The pattern matters more than one occurrence.
- **Every user journey has an SLO on its symptom**, with multiwindow burn-rate
  alerts (Google SRE workbook, "Alerting on SLOs"); the thresholds are in
  [priority.md](priority.md#the-size-of-an-impact). A burn files an item; it
  pages only at the severity priority.md gives it.
- **Every agent has a report-issue tool, and the runtime calls it.** An agent
  reports when a tool fails, when an action it needed was refused, when the
  person it serves shows frustration, and when it gives up on a task. The
  runtime fires the deterministic cases itself, so a report never depends on
  the model remembering. The user is never asked to report.
- **Every support channel files an internal ticket.** A report the support
  agent cannot verify against the product's own source of truth, or one where
  what the person sees contradicts the expected behaviour, becomes a signal of
  the same shape (one group per problem, not per message). The evidence and
  the person's account link stay in the case's internal record, which names
  the group.
- **Weekly digest.** Once a week the new, regressed and largest groups of
  every product are summarised for the owner assistant with their item ids, so trends are
  seen even when no single item ranks high.

The event shape, grouping, and routing into the work tracker form one shared
platform capability; each product uses that shared pipeline rather than
building a local copy
([architecture.md](../../self-challenge/references/architecture.md)).

## How it is judged

By induction in production: make one known failure in a product (a test agent
calling a broken tool, a test account abandoning a task) and read back one
grouped item in the work system, with no personal data in it, and a second
occurrence as a note on the same item rather than a new one.
