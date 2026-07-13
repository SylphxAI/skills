# Release Communication

Own exact-release communication, not promotional positioning. Marketing may
turn an approved product claim into a campaign; Store Listing owns listing
narrative and conversion order. This module owns truthful communication of what
changed, who is affected, what action is required, and where support or recovery
lives for one exact release.

## Input and state

Record before drafting:

```text
release ID, version, build/artifact digest and live target:
change source and evidence owner:
audiences, channels, locales and accessibility needs:
added/changed/fixed/deprecated/removed/security/known-issue classification:
compatibility, migration, data, price, entitlement and support effects:
publication owner, approval authority, embargo and correction route:
```

```text
raw_change -> evidence_bound -> audience_variants_drafted
-> technical_and_support_reviewed -> approved_for_exact_release
-> published -> live_readback -> corrected_or_superseded
```

A merged commit, issue title, or generated summary is not release truth. Bind
claims to the exact candidate and omit changes that did not ship.

## Audience variants

| Variant | Primary audience | Required content |
| --- | --- | --- |
| Store update note | end users and platform reviewers | specific user-visible value, trust-relevant fixes, concise known limits |
| Product update | customers and admins | changed workflow, availability, admin/configuration and support impact |
| Developer changelog | API/SDK/CLI consumers | versions, compatibility, deprecation/removal window, migration examples and links |
| Game patch note | players and community | balance intent, economy/value change, affected modes, compensation where justified |
| Internal support brief | support and success | affected cohorts, detection, workaround, macro, escalation and current status |
| Incident follow-up | affected users | impact, verified recovery, safe prevention summary and remaining action |

Produce only applicable variants, but reconcile them to one change ledger so
dates, availability, prices, limitations, and compatibility cannot drift.

## Rules

- `release-comms-1` — Lead with user impact and observable behavior, not internal
  implementation or a commit dump.
- `release-comms-2` — Use stable categories when they help readers distinguish
  added, changed, fixed, deprecated, removed, security, and known issues.
- `release-comms-3` — A breaking change states affected versions/cohorts,
  required action, deadline, compatibility window, migration path, example,
  rollback or support route.
- `release-comms-4` — Never write “bug fixes and improvements” when a material
  symptom, risk, data effect, or required action is known.
- `release-comms-5` — Store notes are concise and policy-safe but do not hide
  material purchase, privacy, permission, compatibility, or support effects.
- `release-comms-6` — Developer notes include exact versions, deprecation and
  removal semantics, examples, documentation, and support ownership.
- `release-comms-7` — Game balance or economy notes explain intent and player
  value effects; record compensation when an owned product policy requires it.
- `release-comms-8` — Security communication informs affected users and gives
  safe action without exposing secrets, exploit instructions, or unverified
  attribution.
- `release-comms-9` — Support briefs identify who is affected, how to detect the
  state, workaround/recovery, approved wording, escalation and correction path.
- `release-comms-10` — Localize meaning, not only strings; preserve version,
  deadline, price, compatibility, safety and support parity across channels.

## Decision table

| Change | Public treatment | Restricted/support treatment |
| --- | --- | --- |
| Visible UI or workflow | describe the user outcome and availability | screenshots or diagnostics only when useful |
| Defect fix | name the symptom and affected release when verified | detection, workaround and escalation for open cases |
| Price or entitlement | effective date, affected users, action and support | exception, refund and entitlement specialist handoff |
| API breaking change | deadline, compatibility and migration guide | affected-consumer outreach and rollback plan |
| Security fix | safe impact and user action | restricted technical detail and incident ownership |
| Game economy/balance | intent, scope and effective version | compensation/support stance and abuse-sensitive detail |

## Output and verification

Return a release communication pack with:

1. exact release/change ledger and evidence links;
2. selected audience/channel/locale variants;
3. compatibility, migration, deadline, known-issue and support records;
4. claim/privacy/security/localization approvals and unresolved blockers;
5. publication identifiers, live readback, correction and supersession state.

Verify audience, version/date, user impact, required action, compatibility,
support route, links, localization, channel constraints, and parity with the
actual released behavior. A draft note is never proof that the release is live.
