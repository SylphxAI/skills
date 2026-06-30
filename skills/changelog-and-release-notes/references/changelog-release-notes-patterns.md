# Changelog And Release Notes Patterns

## Release note types

| Type | Audience | Content |
| --- | --- | --- |
| App-store update | End users and reviewers | User-visible improvements, fixes, trust notes |
| SaaS product update | Customers/admins | New capabilities, changed workflows, admin impact |
| Developer changelog | Builders | API changes, migration, compatibility, examples |
| Game patch notes | Players/community | balance, events, fixes, known issues, compensation |
| Internal support note | Support/success | macros, risks, affected users, escalation |
| Incident follow-up | Affected customers | what happened, impact, fix, prevention where appropriate |

## Rule IDs

- `release-notes-1` — Lead with user impact, not internal implementation.
- `release-notes-2` — Separate added, changed, fixed, deprecated, removed, security, and known issues when detail matters.
- `release-notes-3` — Breaking changes need action required, deadline, compatibility, and migration examples.
- `release-notes-4` — Store release notes should be specific but concise and policy-safe.
- `release-notes-5` — Developer release notes need version numbers, code examples, deprecation windows, and links.
- `release-notes-6` — Game patch notes should explain balance intent and compensation when player value changes.
- `release-notes-7` — Security notes should inform affected users without creating an abuse guide.
- `release-notes-8` — Support notes should include who is affected, detection, workaround, macro, and escalation.
- `release-notes-9` — Changelog categories should be consistent across releases.
- `release-notes-10` — Release notes should link to docs, support, pricing, migration, or status pages when action is needed.

## Decision table

| Change | Public note | Support/internal note |
| --- | --- | --- |
| UI polish | Mention only if user-visible | None or screenshot reference |
| Bug fix | State symptom fixed | Detection and workaround if users reported it |
| Pricing change | Explain effective date and affected users | Escalation and exception handling |
| API breaking change | Migration guide and deadline | Outreach list and rollback plan |
| Security fix | Safe impact statement | Restricted technical detail and support routing |
| Game economy change | Explain balance intent | Refund/compensation/support stance |

## Validation checklist

Check: audience, version/date, user impact, action required, compatibility, support route, links, privacy/security review, localization, store/channel constraints, and consistency with actual shipped behavior.
