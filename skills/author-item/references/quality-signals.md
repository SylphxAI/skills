# Quality signals standard

Trigger: shipping or running a product that people use, giving a product an
AI agent, or opening a support channel.

Instrument important user journeys so failures can be detected before a
complaint. Combine product signals and customer reports into deduplicated
outcomes, ranked by their impact and cost of delay.

## Hard lines

- **One backlog.** A detected problem lands as one deduplicated work item (or a
  note on the open one), never in a second tracker, chat or inbox that nobody
  ranks ([work.md](work.md)).
- **Minimize sensitive data.** A shared signal carries the identifiers, codes
  and aggregates needed to group the failure. Keep personal content and payment
  details in access-controlled product records and link them through the normal
  authorized path. Scrub secrets before emitting a signal
  ([security.md](../../deliver-and-verify/references/security.md)).
- **Escalation and disclosure** follow
  [conduct.md](../../self-challenge/references/conduct.md#customers-and-players).

## Practices

- **Group related errors.** Emit failures through the shared observability path,
  grouped by kind and location, with the release on each occurrence. Reopen a
  regressed group or link its new outcome to the prior repair.
- **User-visible symptoms are signals too.** Besides errors, a product emits
  what a user feels: a failed or abandoned task, a repeated retry, a rage
  click, an error click, a dead end. The pattern matters more than one occurrence.
- **Use SLOs for important user journeys**, with alert windows matched to their
  traffic and impact; the method and example starting thresholds are in
  [priority.md](priority.md#the-size-of-an-impact). A burn files an item; it
  pages only at the severity priority.md gives it.
- **Capture agent failures through the owning runtime.** Instrument deterministic
  tool and turn failures where possible. Let an agent attach context through the
  available issue-reporting path. Treat a refusal as a signal to inspect its
  cause, rather than assuming that a valid access or spend refusal is a defect.
- **Connect support evidence to engineering.** A confirmed failure or a material
  unresolved contradiction becomes a signal on the existing problem group.
  Keep the case evidence and account link in its authorized internal record.
- **Review trends.** Summarize new, regressed and high-impact groups at a cadence
  suited to the product, so low-volume recurring problems remain visible.

Own shared event shape, grouping and work-tracker routing in one platform
capability. Products consume that pipeline where present; put a missing generic
capability upstream
([architecture.md](../../self-challenge/references/architecture.md)).

## How it is judged

Exercise a known failure through an authorized isolated test path and read
back its grouped outcome. Repeat it to check deduplication, then verify that
the signal contains only the diagnostic data its audience is permitted to see.
