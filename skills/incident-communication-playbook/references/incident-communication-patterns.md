# Incident Communication Patterns

## Communication state machine

```text
detected -> triaged -> acknowledged -> updating -> mitigated -> resolved -> postmortem/follow-up
```

## Rule IDs

- `incident-comms-1` — Lead with user impact, not internal component names.
- `incident-comms-2` — Separate facts, assumptions, unknowns, mitigation, workaround, and next update time.
- `incident-comms-3` — Update cadence should match severity and uncertainty.
- `incident-comms-4` — Payment, data loss, privacy, security, and account-access incidents need heightened review and precise wording.
- `incident-comms-5` — Support macros should match public status language to prevent contradictory answers.
- `incident-comms-6` — Do not overpromise root cause or prevention before investigation completes.
- `incident-comms-7` — Compensations or credits need eligibility, fulfillment, and support handling.
- `incident-comms-8` — Post-incident notes should explain impact, resolution, prevention, and user action where appropriate.
- `incident-comms-9` — Internal incident rooms need owner, scribe, comms lead, support lead, and decision log.
- `incident-comms-10` — For store/platform incidents, distinguish your product issue from upstream provider issue without blaming users.

## Message template

```text
We are investigating <impact> affecting <users/surfaces>. <Known user effect>. We are <mitigation>. Next update by <time>. If you need to <workaround>, use <path>.
```

## Decision table

| Incident | Public channel | Extra handling |
| --- | --- | --- |
| Full outage | Status page, in-app, social if appropriate | Frequent updates |
| Payment failure | Status/support, checkout banner | Refund/entitlement support macro |
| Data loss risk | Direct customer notice | Legal/privacy/security review |
| Game economy exploit | In-game/community/support | Compensation/rollback explanation |
| Store review rejection | Internal/launch stakeholders | Launch plan update, not broad public panic |
| Support backlog | Help center/banner | SLA expectation and prioritization |

## Post-incident checklist

Include: timeline, impact, user action needed, root cause confidence, mitigation, prevention, compensation if any, support routing, and follow-up owner.
