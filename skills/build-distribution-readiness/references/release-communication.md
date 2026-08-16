# Release Communication

Own exact-release communication, not promotional positioning. Marketing may
turn an approved product claim into a campaign; Store Listing owns listing
narrative and conversion order. This module owns truthful communication of what
changed, who is affected, what action is required, and where support or recovery
lives for one exact release.

## Release facts

Start from the exact release ID, version, build digest, audience, channels,
locales, user-visible changes, compatibility, migration, data, price,
entitlement, support effects, publication owner, and correction route.

Bind each statement to the shipped candidate and its actual availability.

## Audience variants

| Variant | Primary audience | Required content |
| --- | --- | --- |
| Store update note | end users and platform reviewers | specific user-visible value, trust-relevant fixes, concise known limits |
| Product update | customers and admins | changed workflow, availability, admin/configuration and support impact |
| Developer changelog | API/SDK/CLI consumers | versions, compatibility, deprecation/removal window, migration examples and links |
| Game patch note | players and community | balance intent, economy/value change, affected modes, compensation where justified |
| Internal support brief | support and success | affected cohorts, detection, workaround, macro, escalation and current status |
| Incident follow-up | affected users | impact, verified recovery, safe prevention summary and remaining action |

Produce the variants that serve the release audience and keep dates,
availability, prices, limitations, and compatibility aligned across them.

## Rules

- Lead with user impact and observable behavior.
- Use stable categories when they help readers distinguish
  added, changed, fixed, deprecated, removed, security, and known issues.
- A breaking change states affected versions/cohorts,
  required action, deadline, compatibility window, migration path, example,
  rollback or support route.
- Name the material symptom, risk, data effect, or required action precisely.
- Keep store notes concise and policy-safe while including material purchase,
  privacy, permission, compatibility, and support effects.
- Developer notes include exact versions, deprecation and
  removal semantics, examples, documentation, and support ownership.
- Game balance or economy notes explain intent and player
  value effects; record compensation when an owned product policy requires it.
- Security communication informs affected users and gives
  safe action without exposing secrets, exploit instructions, or unverified
  attribution.
- Support briefs identify who is affected, how to detect the
  state, workaround/recovery, approved wording, escalation and correction path.
- Localize meaning as well as strings; preserve version,
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

Return release communication with:

1. exact release identity and source links;
2. selected audience/channel/locale variants;
3. compatibility, migration, deadline, known-issue and support records;
4. privacy, security, and localization approvals plus material open issues;
5. publication identifiers, live readback, correction, and supersession details.

Verify audience, version/date, user impact, required action, compatibility,
support route, links, localization, channel constraints, and parity with the
actual released behavior. Label draft, published, and live release states
separately.
