# Social Media Operating Patterns

## 1. Account authority

### Official account register

```text
platform and account/handle ID:
official purpose and approved channel role:
legal/company owner and business container:
public verification/domain relationship:
primary and recovery identity:
credential/token vault reference, type, scopes and expiry:
roles: owner/admin/publisher/responder/analyst/vendor/recovery
MFA, trusted devices/sessions and break-glass:
API app/client, review status, quotas and callbacks:
locales/territories/audience/age mode:
data collected/exported and retention:
current sources and expiry:
transfer, succession, suspension and shutdown:
```

Keep credentials and recovery material in the owning secret or identity system;
this register contains only stable IDs and observable status.

Use least privilege and separate identities for content proposal, approval/verification, publication, community response, analytics export and account recovery. A contractor or agent loses access automatically at expiry or assignment end. Review active roles, API apps, sessions, recovery methods and domain/business ownership continuously.

## 2. Publishing and readback

### Content object

```text
content_id / revision / family / campaign_or_organic_ref
canonical message and claim sources
selected platform/account/audience/locale
copy variant and exact media digest
rights, consent, attribution and disclosure records
accessibility alternative and link/deep-link fallback
publish window, expiry and supersession
reply/moderation/incident posture
upstream approvals and current platform adapter version
```

### Publishing lifecycle

```text
brief_received
-> truth_rights_locale_validated
-> adapted
-> scheduled | held
scheduled
-> submission_pending -> provider_accepted | rejected | unknown
provider_accepted
-> live_readback_verified | missing_or_mutated
live_readback_verified
-> monitored -> edited | corrected | retracted | expired | archived
unknown | missing_or_mutated | rejected
-> reconciled -> retry_new_revision | held | withdrawn
```

Required mechanics:

- stable content and attempt IDs; platform idempotency where available and an internal duplicate ledger where not;
- scheduling in an explicit timezone with DST and locale behavior;
- exact-account and cross-post collision checks;
- provider object ID, submitted/live timestamps, rendered text/media/link/disclosure readback and platform mutation evidence;
- retry budget, backoff, quota reset, dead-letter/quarantine and operator/customer impact;
- edit versus correction versus retraction semantics, preserved history and superseding message;
- queue drain when claims, product availability, incident state, rights or authority expires;
- platform-specific adaptation of length, format, captions, hashtags, links, thumbnails and conversation mode without changing canonical truth.

Adapt text, format, and crop to the audience's use of each selected surface while
preserving meaning, claims, rights, and identity.

## 3. Listening and conversation routing

### Listening contract

For each source—comments, replies, mentions, tags, DMs, reviews, public search, authorized stream or platform webhook—declare purpose, legal/platform authority, query/filter, fields, provenance, user/account IDs, dedupe key, edit/delete handling, locale, spam/bot confidence, privacy sensitivity, retention, access, export, model use, sampling, freshness and shutdown.

Collect visible content only through an authorized source contract. Cross-platform
person merges require identity authority. Treat deleted, edited, private, child,
sensitive, and direct-message content according to the current source contract.

### Conversation decision table

| Signal | Operational action | Canonical owner |
| --- | --- | --- |
| Straight factual question | answer only from current approved source or route | product/docs/marketing truth |
| Praise or organic advocacy | acknowledge selectively and preserve authentic independence | social operations |
| Product feedback | preserve source/provenance and hand off | Product Feedback Learning Loop |
| Private customer issue | invite/use a privacy-safe support route; link case IDs | Customer Case Resolution / Support Ops |
| Billing/refund/account data | move diagnosis to a verified private channel | payment/refund/identity owner |
| Criticism or correction | assess truth and acknowledge or correct from current facts | product/marketing/support as applicable |
| Abuse/spam/harassment | apply current platform and company routing, preserve evidence, protect staff/users | trust/safety owner |
| Safety/security/privacy report | preserve minimum evidence, limit amplification, route urgently | owning safety/security/privacy process |
| Legal/regulator/media inquiry | acknowledge receipt only within authority and route | legal/comms authority |
| Active incident | use one incident source, cadence and approved public status | incident owner |
| Impersonation or scam | capture evidence, warn only from approved truth, use platform reporting | security/brand/legal owner |

Replies declare source IDs, allowed claim altitude, locale/register, personal-data boundary, reply/thread context, rate/cooldown, escalation trigger, expiry and verification. Auto-answer only high-confidence bounded questions with current sources; abstain on ambiguity, anger, high impact or protected decisions.

Moderation action is not reputation cleanup. Record content/account ID, observed behavior, current policy, action authority, evidence, expiry/review, appeal/restore route and platform readback. Hide/remove/restrict only through the owning rules.

## 4. Rights, disclosures and accessibility

For every content unit verify:

- product and availability truth at the selected release/territory;
- media source, creator/talent/UGC consent, license scope, music/audio, trademark and attribution;
- edit/derivative, platform, paid/organic, locale, territory, duration and archive rights;
- sponsorship, affiliate, employee, gifted product and material-connection disclosure;
- synthetic/AI media and manipulation disclosure under current platform/territory rules;
- captions, transcript, alt text or platform-native accessibility fields, readable on-image text, contrast, flashing/motion and audio meaning;
- child/audience suitability, privacy, personal data, location, secret/internal UI and third-party content;
- expiry, revocation, takedown, correction and evidence owner.

Give every specific material connection a clear disclosure proximate to the
content. Verify the platform music library's exact commercial, territory, and
cross-posting rights for each use.

## 5. Crisis, impersonation and takeover

### Crisis control

```text
signal -> verify against incident/legal/security truth
-> freeze affected scheduled publishing and auto-replies
-> preserve evidence and assign one source/message revision
-> acknowledge or publish approved status at the defined cadence
-> monitor material questions and misinformation without arguing
-> correct/retract stale or false posts across affected accounts
-> verify live state -> resume through a new approved revision
```

Freeze evergreen scheduled content across the affected scope during a severe
incident, with a global pause available for correlated risk. Maintain a public
correction trail when deletion alone would hide a material false statement.

### Impersonation/scam

Maintain known official account IDs and public verification routes. Detect lookalike handles/domains, cloned media, fake support, payment/crypto requests and executive impersonation. Preserve URLs, IDs, timestamps and captures; route platform reports and applicable brand/security/legal action; warn users from verified channels without amplifying malicious links or teaching evasion.

### Account takeover

```text
detect suspicious session/post/token change
-> stop schedulers/responders and revoke affected tokens/sessions
-> preserve audit/provider evidence
-> recover through verified company-owned path
-> inspect live/edited/deleted posts, DMs, exports and connected apps
-> correct affected public state and notify owning incident/privacy/support routes
-> rotate/re-scope, verify readback, and restore gradually
```

Recovery proof includes current owner/admin/recovery methods, zero unknown sessions/apps, expected live content, corrected messages, working monitors and bounded reactivation.

## 6. Autonomous operations and measurement

### Role separation

| Role | May | Authority retained elsewhere |
| --- | --- | --- |
| Proposer | create candidates from approved truth | verifier and publisher approve and publish claims/rights |
| Verifier | check source, rights, locale, disclosure and adapter | product/campaign owner supplies truth |
| Publisher | submit exact accepted revisions inside caps | content and risk owners set message, media, and caps |
| Responder | answer bounded current questions and route | refund, legal, safety, and enforcement owners decide policy |
| Risk controller | hold/pause/revoke within policy | content owner creates content; policy owner sets exposure caps |
| Evidence recorder | reconcile provider/live state | edit source or outcome truth |

### Controls

Define per account/platform/hour/day caps for posts, replies, edits, deletions, DMs, follows or other selected actions; queue capacity and age; concurrency; rate/quota behavior; anomaly thresholds; canary account/audience; cooldown; global and scoped pause; retries/dead letters; dependency freshness; credentials; cost; audit; recovery and shutdown.

### Metrics

Separate:

- operations: queue age, submission outcome, live-readback mismatch, duplicate, correction/retraction, rights or policy failure, adapter freshness and recovery time;
- conversation: categorized questions, response usefulness, handoff acceptance, unresolved age, moderation false action, appeal/restoration and safety load;
- trust: complaint, privacy/rights incident, misinformation correction, impersonation/takeover, block/mute/unfollow and reputation themes;
- channel diagnostics: reach, view, watch, click, share, save, reply, follower and platform attribution;
- downstream owner evidence: qualified product actions, retained value, support/product feedback closure and campaign/incrementality inputs.

Platform diagnostics establish descriptive channel behavior; Marketing owns
causal allocation for marketing and revenue impact. Use sampling and replay to
test classification, reply grounding, locale quality, moderation routing,
rights/disclosure, crisis freeze, and shutdown.

### Channel withdrawal

Pause new scheduling, drain or cancel pending work, reconcile corrections and
required replies, archive or transfer the required records, revoke automation
tokens and spend authority, and read back the platform state and account owner.
The withdrawal is complete when pending jobs, posts, replies, listeners, and
exports have reached their declared terminal handling.

## 7. Current sources

Refresh only the selected platforms at execution. Starting routes include:

- [YouTube Data API](https://developers.google.com/youtube/v3/docs) and [YouTube Community Guidelines](https://www.youtube.com/howyoutubeworks/policies/community-guidelines/)
- [Instagram content publishing](https://developers.facebook.com/documentation/instagram-platform/content-publishing) and [Meta Community Standards](https://transparency.meta.com/policies/community-standards/)
- [TikTok Content Posting API](https://developers.tiktok.com/doc/content-posting-api-get-started/) and [TikTok Community Guidelines](https://www.tiktok.com/community-guidelines)
- [X create post API](https://docs.x.com/x-api/posts/create-post) and [X automation rules](https://help.x.com/en/rules-and-policies/x-automation)
- [LinkedIn Posts API](https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/posts-api) and [LinkedIn Professional Community Policies](https://www.linkedin.com/legal/professional-community-policies)
- [FTC disclosures for social media influencers](https://www.ftc.gov/business-guidance/resources/disclosures-101-social-media-influencers)

Platform availability and URLs can move. Record publisher, exact page, selected product/API/policy, version or effective date, account/territory scope, retrieval and expiry, then test actual platform behavior in a safe account before activation.
