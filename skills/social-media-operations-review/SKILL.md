---
name: social-media-operations-review
description: "Design or audit one recurring operating model for already-selected official social-media and community channels across account authority, publishing and platform readback, listening, replies, moderation routing, rights and disclosures, crisis correction, impersonation or takeover response, automation, measurement, archive, recovery, and shutdown. Use when the independent artifact is a Social Media Operating Model. Use Marketing Automation for channel strategy, audience, message, campaigns, spend, and incrementality; use specialists for one post, media pack, support case, review-learning loop, or product-wide trust policy."
---

# Social Media Operations Review

Produce one **Social Media Operating Model** that can run selected official accounts continuously, truthfully, safely, and autonomously—from approved input through live platform readback, conversation handling, correction, recovery, and verified shutdown.

## Atomic boundary

Own official-account and adapter operations after channel selection: account/handle authority, access roles and recovery, publishing queue and state, per-platform adaptation, scheduling, idempotency, live readback, listening, reply and moderation routing, rights/disclosures, incident and crisis freeze, correction/retraction, impersonation/takeover response, operational metrics, archive, caps, and shutdown.

Do not decide whether the company should use a channel, the target audience, positioning, canonical message, one campaign or offer, paid budget, incrementality model, product truth, enforcement policy, legal position, incident facts, support remedy, exact rendered media, or the prose of one fixed post. Consume those artifacts and never overwrite them.

## Agent-first invariant

Build every selected channel adapter to a complete production-shaped target now: current authority, least-privilege account access, localized publishing, rights and disclosure checks, queues, retries, readback, listening, response routing, moderation, crisis recovery, observability, archival, and zero-send shutdown. Missing followers, low current volume, human staffing, or speculative ROI may not justify a shared-password account, manual spreadsheet calendar, unobserved posting bot, or later safety/scale retrofit.

Selection, construction, activation, publication, amplification, and reply are separate. A complete adapter may remain dormant with no token, API call, scrape, data collection, job, notification, post, reply, or spend. Automation acts only inside approved claims, content, rights, channel, rate, audience, safety, legal, and reputation envelopes.

## Composition contract

Use the [shared product artifact envelope](references/product-artifact-envelope.schema.json). The model carries `schemaVersion`, `artifactId`, `productId`, `artifactKind`, `ownerSkill`, `artifactVersion`, `artifactRevision`, `artifactState`, `inputArtifacts`, `canonicalFactsOwned`, `handoffOutputs`, `assumptions`, `proofState`, and `proofEvidence`; it never self-hashes. Every input names `fulfillsHandoffId`; only sealed input references carry `artifactDigest` plus `digestRule: sha256-exact-bytes`.

```text
Marketing channel selection/message/campaign brief
+ Product truth + approved media/rights + current platform authority
-> Social Media Operating Model -> platform operation/readback
-> feedback, support, trust, incident and marketing evidence handoffs
```

Use stable handoff IDs. The later Marketing or Product Program observed-state revision may index this model; this skill does not consume that later revision.

Read [Social media operating patterns](references/social-media-operating-patterns.md) for every task.

## Workflow

1. **Freeze selected scope.** Identify official accounts, channel role already approved by Marketing, audience/locale/age/territory, allowed content families, operating hours, reply surfaces, business and trust outcomes, non-goals, current platform authority, and exact upstream artifact revisions.
2. **Establish account authority.** Map legal/company owner, handle/domain verification, platform business container, credential/token source, roles/scopes, MFA/recovery, break-glass, vendor/agent access, device/session inventory, succession, API/app review, rate/quota and audit. Secrets stay in their owning vault and never enter the artifact.
3. **Build the publishing state machine.** Join approved brief, claim proof, exact asset, rights, locale, disclosure and deep link; adapt without changing truth; validate; schedule; submit idempotently; reconcile provider acceptance; read back the live object; monitor; then expire, correct, retract, supersede or archive.
4. **Build listening deliberately.** Define mentions, comments, replies, DMs, tags, search queries, brand/product terms, impersonation and risk signals; use authorized collection, provenance, dedupe, privacy minimization, retention, locale, spam filtering, sampling and expiry. Public availability is not unlimited reuse authority.
5. **Route conversations.** Classify praise, question, support case, product feedback, complaint, misinformation, abuse, safety, security, privacy, legal, media, creator/partner, incident and crisis signals. Define when to answer, acknowledge, hide/restrict where authorized, preserve, hand off, abstain, or leave untouched.
6. **Protect rights and truth.** Verify claim/release compatibility, asset provenance, music/talent/UGC licenses, consent, attribution, sponsorship/affiliate/AI disclosures, accessibility, child/audience treatment and territory. A platform upload success is not rights approval.
7. **Prepare crisis and security recovery.** Define pause/freeze authority, single incident/legal truth source, scheduled-queue drain, pinned/status communication, correction/retraction, evidence preservation, false-rumor handling, impersonation reporting, account-takeover containment, token/session revocation, recovery, customer/support route and observed restoration.
8. **Bound automation.** Separate proposer, verifier, publisher, responder/moderator, risk controller and evidence recorder identities. Set per-account/content/reply/time caps, cooldown, anomaly detection, canaries, kill switch, retry/dead-letter, partial-platform failure, dependency staleness, and no-self-approval rules.
9. **Measure and learn.** Reconcile scheduled, submitted, accepted, live, edited, removed, replied, moderated, handed-off and cost state. Return operational and conversation evidence to Marketing, Product Feedback, Support, Trust, Incident and Security owners without claiming that reach or platform attribution proves incrementality.
10. **Prove shutdown.** Stop new publication/reply/listening, drain or cancel queues, retract/correct where required, revoke exports and tokens, preserve required evidence, verify platform-observed zero pending/live automation, archive or transfer accounts, and test recovery before calling the adapter dormant or withdrawn.

## Source verification

Retrieve current official platform account, API, automation, rate, publishing, synthetic-media, branded-content, music/UGC rights, moderation, privacy, youth, security, impersonation, archive, deletion, and regional rules at use. Record publisher, canonical URL, API/policy version and product, territory/account scope, retrieval/effective/expiry time, uncertainty, and failure behavior. Portal fields, quotas, content formats, automation rules, verification processes, and enforcement paths are volatile; never rely on memory.

## Hard gates

Reject or redesign an operating model that:

- creates channel strategy, audiences, campaign claims, offers, spend, or “viral” content without the owning Marketing artifact;
- uses shared passwords, personal ownership, unscoped permanent tokens, unknown sessions, missing recovery, or credentials in prompts, tickets, code, logs, or artifacts;
- calls an API response “published” without provider/live readback, or retries posts/replies without idempotency and duplicate control;
- fabricates customers, testimonials, activity, consensus, trends or organic advocacy; astroturfs; buys fake engagement; or impersonates independent users;
- auto-replies to every mention, argues with criticism, amplifies abuse, discloses private case facts, invents incident/legal state, or lets a model make irreversible enforcement decisions;
- republishes UGC, music, faces, private messages, screenshots or synthetic media without applicable rights, consent, attribution and disclosure;
- deletes criticism, blocks users, offers compensation, or changes support outcomes merely to improve reputation, unless the owning safety/abuse/support policy independently authorizes the action;
- leaves scheduled content live during a contradictory incident, fails to preserve/correct material falsehood, or lets every account improvise crisis truth;
- optimizes followers, impressions, engagement rate or response speed while retained value, support, complaint, safety, rights, brand or trust outcomes worsen;
- treats “paused” as dormant while tokens, listeners, exports, jobs, queued posts, auto-replies, spend or undeclared collection remain active.

## Output contract

Return one Social Media Operating Model containing:

1. artifact identity/state, evidence labels, selected official accounts/channels, approved role, audiences/locales, upstream artifact refs, current-authority register, non-goals and ruin floors;
2. account/handle/domain/business-container ownership, roles/scopes, credential/token references, MFA/recovery, vendor/agent access, API/app, rate/quota, session/device and audit matrix;
3. content family, claim, asset, rights, disclosure, locale, accessibility, deep-link, cadence and platform-adaptation contracts;
4. publishing, approval, scheduling, idempotency, submission, live-readback, edit/correction, retraction, expiry, archive and supersession state machines;
5. authorized listening sources, provenance, query, dedupe, privacy, retention, language, sampling, spam and signal-quality contract;
6. reply/abstain, support, feedback, moderation, safety, security, privacy, legal, media, creator, incident and crisis routing matrix with evidence, owner, timer and customer/public promise;
7. impersonation, takeover, compromised-token, platform outage, false-post, rights claim, misinformation, coordinated abuse and crisis freeze/recovery playbooks;
8. agent roles and separation, queues, caps, canaries, anomaly rules, kill switches, dead letters, partial failure, reconciliation, archive, shutdown and observed readback;
9. operational, conversation, trust, safety, support and marketing handoff metrics, evidence events, QA/replay, learning cadence and unresolved proofs.

## Routing boundaries

- `marketing-automation-blueprint` owns the full channel portfolio, audience, positioning/message hierarchy, campaign briefs, allocation/spend, causal measurement and incrementality. This skill operates only already-selected official social channels.
- `promotion-campaign-review` owns one campaign/offer; `product-asset-production` owns exact media; `voice-preserving-editor` owns one fixed post/reply rewrite.
- `customer-support-case-resolution` owns one private customer case; `customer-support-operations` owns the whole support system.
- `product-feedback-learning-loop` owns authorized review/social feedback ingestion, public response evidence and product learning; this skill routes signals and operates the platform response surface.
- Product Abuse, Marketplace Trust, Security, Incident and Legal owners define enforcement and authoritative high-risk decisions; this skill applies and routes them on official accounts.

## Completion check

Complete only when every selected official account can publish, listen, route, correct, recover, and stop through current authority and observable state; no credential, claim, right, reply, enforcement, incident fact, metric, or public commitment is invented; and no routine manual queue or unverified platform state remains.
