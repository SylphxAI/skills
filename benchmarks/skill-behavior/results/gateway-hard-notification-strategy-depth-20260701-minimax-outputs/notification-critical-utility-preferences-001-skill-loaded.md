```text
Notification objective: Deliver reliable P0/P1 developer alerts, treat build/backup/quota as quiet utility, and isolate education/upgrade as opt-in only. Stop cross-channel marketing noise, expose per-category controls, and reserve emergency override for security and continuity events.

Channels: desktop push, browser push, email, in-app.

Lifecycle matrix
| Lifecycle state | Trigger | User value | Channel priority | Consent/preference state | Frequency/suppression | Metric |
| --- | --- | --- | --- | --- | --- | --- |
| New user | First build or first project | Preview real alert value | In-app soft ask | unknown / soft-asked | Stop asking after deny; re-educate in-product | opt-in rate, ask→grant |
| Active developer | Build/deploy/backup/quota events | Know status without polling | Desktop push > email > in-app; browser push opt-in | granted + category on | Category + global cap | delivery, open, mute |
| Returning user | Inactive ≥14 days | One factual digest | Email digest | digest allowed | Max 1/30d, then suppress | open, retention |
| At-risk (quota/billing) | Storage near/exceeded | Avoid data loss or failed builds | Email > desktop push > in-app | granted or soft | Cap 2/lifecycle; stop on resolve | conversion to fix |
| Upgrade-eligible | Plan limit hit | Honest path to right plan | In-app > email; push only if lifecycle-opted | marketing opt-in | Cap 2/month, 3/90d | opt-out, complaint |
| Security event | Login from new device/IP | Confirm or revoke session | Email + desktop push; SMS optional | required | Event-based; never digest | time-to-ack, support tickets |

Consent and regional control matrix
| Channel/region | Permission timing | Required consent/preference | Unsubscribe/opt-out | Fallback if denied | Evidence |
| --- | --- | --- | --- | --- | --- |
| Desktop push | After first successful build | push_granted + category on | OS settings + per-category mute | In-app + email same event | permission_result, mute |
| Browser push | User enables in settings | browser_push_granted | Site settings + category toggle | Email + in-app | permission_result |
| Email | At signup, reconfirm at marketing scope | email_subscribed; List-Unsubscribe header | List-Unsubscribe + preference center | In-app only | unsub_source, scope |
| In-app | Always allowed; user configures frequency | category preference per surface | Per-category mute, digest mode | n/a | preference_changed |
| Region (EU/UK/CA) | Pre-prompt consent record before marketing | consent_policy_version, legal_basis | Suppression_required state until re-opt | In-app education only | policy_owner, audit |

Privacy/redaction and deep-link policy
| Content type | Sensitive fields to exclude | Lock-screen/subject/SMS copy | Deep-link auth | Support-safe evidence |
| --- | --- | --- | --- | --- |
| Security login | IP, device fingerprint, session token, geo-coords | "New sign-in to {app}. Review now." | Auth-gated session detail; short-lived token | consent_state, suppression_reason |
| Deployment/build/quota | Secrets, env names, customer data, repo path | "Build #124 failed on {project}" | Auth-gated project view | message_version only |
| Billing/upgrade | Card, tax ID, invoice line items | "Quota at 90% — upgrade or free space" | Auth-gated billing | scope, campaign_id |
| Maintenance incident | Customer identifiers, stack traces | "Region {r} degraded; status updates posted" | Auth-gated status page | incident_id, severity |

Role/severity routing
| Audience role | Severity | Allowed channels | Escalation | Audit/owner |
| --- | --- | --- | --- | --- |
| Owner/admin/on-call | P0 security, P1 incident | Email + desktop push (bypass quiet hours for P0) | Re-send once after 10m if unacked | security@oncall |
| Member on resource | P1 deployment, P2 build/quota | Desktop push + in-app by role pref | Cooldown 15m; digest if multi-queue | product-eng owner |
| End user | P2 utility, P3 education/upgrade | Preferred channel; push only if opted in | None | growth owner |

Taxonomy and channel policy
- security_login_alert → trigger: new-device login; value: confirm/revoke; channel: email + desktop push; priority: P0; freq: event-based; control: required; dedupe: auth_event_id 10m; no marketing content.
- deployment_failed → trigger: pipeline status=failed; channel: desktop push + in-app; priority: P1; freq: 1/pipeline-id/10m; control: category toggle; dedupe: pipeline_run_id.
- build_finished → trigger: build status=success/fail; channel: desktop push (opt-in) + in-app; priority: P2; freq: 2/day cap; control: category toggle; dedupe: build_id; digest if >2 queued.
- backup_complete → trigger: backup status=success/fail; channel: in-app; priority: P2; freq: 1/job/day; dedupe: backup_job_id.
- storage_quota_warning → trigger: usage ≥80/95/100%; channel: email + desktop push; priority: P2→P1 at 100%; freq: max 2/lifecycle; stop on upgrade or cleanup.
- maintenance_incident → trigger: declared sev-1/2; channel: email + desktop push for owners; priority: P1; freq: state-change only; dedupe: incident_id.
- product_education → trigger: feature release relevant to user; channel: in-app + email digest; priority: P3; freq: 1/week; opt-in only.
- upgrade_promotion → trigger: plan-limit hit or annual window; channel: in-app + email; priority: P3; freq: 2/month, 3/90d; opt-in only; stop on upgrade, cancel, or unsubscribe.

Frequency and suppression budget
- Global cap: 3 non-critical notifications/day, 1 push/day, 10/week; security exempt.
- Category caps: build 2/day; deploy 1/pipeline; backup 1/job/day; quota 2/lifecycle; education 1/week; upgrade 2/month.
- Lifecycle-event cap: 3 per dedupe_key lifecycle window.
- Cooldowns: 10m same-event dedupe; 24h after open/complete/convert/support/unsubscribe.
- Digest rules: queue low-urgency until 2 pending or quiet-hour end; weekly digest default.
- Quiet hours: user timezone 22:00–07:00; defer non-critical; never defer P0 security or user-requested reminders.
- Emergency override: security, safety, service continuity, and user-requested exact reminders only; recorded with override_reason and 24h expiry.

Cross-channel dedupe and stop rules
| Lifecycle event | Dedupe key | Priority order | Stop condition | Suppression reason | Owner |
| --- | --- | --- | --- | --- | --- |
| Build | build:<id> | desktop push → email → in-app | Pass/fail opened or 2 sends | resolved, dedupe | product-eng |
| Deploy failure | pipeline:<run_id> | email → desktop → in-app | Ack or fix deployed | resolved, dedupe | platform |
| Quota | quota:<workspace_id>:<tier> | email → desktop → in-app | Upgrade, cleanup, cancel | resolved, opt-out | growth |
| Security | auth:<event_id> | email → desktop → SMS opt-in | Acknowledged or revoked | acknowledged | security |
| Education/upgrade | camp:<campaign_id>:<user_id> | in-app → email | Convert, unsub, support | resolved, opt-out | growth |

Preference and recovery model
| State | Allowed action | Recovery path | Prohibited action | Evidence |
| --- | --- | --- | --- | --- |
| unknown | In-app value preview | Soft ask after first build | First-launch OS prompt | ask_context |
| soft-asked / not now | Respect, re-educate later | Value-led in-product card | Immediate repeat prompt | cooldown_until |
| platform denied | In-app + email only | Preference center; user-initiated OS steps | Repeated prompts, nag banners | denied_at |
| granted, category off | Respect category | Category toggle with examples | Send through adjacent category | preference_changed |
| unsubscribed/complaint | Stop scope immediately | Confirmation + opt-back only if user-initiated | Win-back via other channel | unsub_source |

Fatigue/incident readback
| Cohort | Channel | Lifecycle event | Frequency bucket | Harm signal | Decision | Owner |
| --- | --- | --- | --- | --- | --- | --- |
| New users | desktop push | build_finished | >2/day | mute, opt-out | digest only | product-eng |
| Paying | email | upgrade_promotion | >2/month | unsub, complaint | pause 30d, copy review | growth |
| All | browser push | maintenance_incident | bypass quiet hours | complaint, support contact | quiet-hours respect unless P0 | platform |

Risks and guardrails
- Marketing bundled with transactional → split transactional and marketing consent; audit message_version.
- Sensitive payload on lock screen → redact IPs, secrets, paths; use generic titles.
- Repeated push prompts after deny → user-initiated OS recovery only.
- Caps bypassed for promo → emergency override never applies to education/upgrade.
- Dedupe drift across channels → persist dedupe_key in notification_suppressed event.

Events and trust metrics
- Track: notification_eligible, permission_prompt_shown, permission_result, notification_scheduled, notification_suppressed, notification_sent, notification_delivered, notification_opened, notification_dismissed, preference_changed, unsubscribe_clicked, conversion_after_notification, retention_after_notification, complaint_or_spam_signal, support_contact_after_notification.
- Properties: channel, category, campaign_id, trigger_event, lifecycle_state, dedupe_key, locale, region, timezone, quiet_hours_applied, frequency_bucket, priority, consent_state, preference_state, suppression_reason, unsubscribe_scope, delivery_status, message_version, frequency_budget_id, global_cap_remaining, category_cap_remaining, lifecycle_event_cap_remaining, cooldown_until, digest_candidate, override_reason.
- Guardrails: delivery ≥98% P0; opt-out ≤+2pp vs holdout per campaign; complaint ≤0.1%; support contacts per 1k sends trending flat; retention ≥control in upgrade cohort; dedupe/suppression rate trending up; permission-prompts-per-user ≤1.2.
```
