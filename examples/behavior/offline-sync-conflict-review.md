# offline-sync-conflict-review behavior example

skill: offline-sync-conflict-review

## Positive prompt

> Design offline sync for a mobile field app with queued edits, attachments, reconnect conflicts, and data-loss recovery.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Classifies data and mutation types before choosing merge policies.
- Includes local queue, idempotency, tombstones, attachment retry, auth refresh, conflict UI, and support diagnostics.
- Flags unsafe last-write-wins and silent overwrite risks for high-impact records.

It should also produce the artifact shape requested by `skills/offline-sync-conflict-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Create a launch narrative for a new pricing page.

The skill should not load for this prompt unless the user adds an explicit offline-sync-conflict-review context.

## Expected behavior

- Classifies data and mutation types before choosing merge policies.
- Includes local queue, idempotency, tombstones, attachment retry, auth refresh, conflict UI, and support diagnostics.
- Flags unsafe last-write-wins and silent overwrite risks for high-impact records.
