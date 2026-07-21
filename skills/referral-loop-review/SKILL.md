---
name: referral-loop-review
description: Design or audit one referral, invite, friend/team sharing, affiliate, ambassador, creator, waitlist, or viral loop across value moment, inviter/invitee states, consented channels, deep links, deterministic attribution, qualification, pending grants, caps, reversals, fraud/self-referral, privacy/contact handling, social interaction, support, experiments, and shutdown. Use when the independent artifact is a persistent referral state machine; use Marketing Automation for the full channel portfolio.
---

# Referral Loop Review

Produce a **Referral and Invite Contract** that spreads real product value
through trusted relationships without spam, coerced contact upload, fake
scarcity, or unearned rewards.

## Atomic boundary

Own one persistent inviter/invitee or partner referral loop: value trigger,
invitation/share, identity/deep link, attribution, qualification, optional
incentive grant/reversal, caps, fraud, privacy, support, experiments, and shutdown. Do
not own the whole marketing operating system, generic social/community design, one
temporary promotion, or payment settlement.

Use a draft artifact ID and consume product, identity, payment, promotion,
analytics, notification, privacy, and support decisions by owner and explicit
contract. Let deterministic delivery tooling seal versions/digests later; never
invent them during design.

## Agent-first invariant

Build all selected invitation channels, link/deferred-deep-link states,
identity merge, attribution, qualification, fraud, consent/privacy, support,
observability, experiments, caps, and kill switches now. Population
zero must still support useful known-friend invites/sharing where applicable.
Separate construction, sharing, attribution, qualification, and grant. A
dormant loop accesses no contacts, sends nothing, and grants nothing.
Build reward ledger/grant/reversal machinery only when the declared mode is
incentivized; organic sharing and team invites record it as non-applicable.

## Workflow

1. Define product value worth sharing, inviter/invitee/partner roles, organic vs
   incentivized mode, platforms/territories/age modes, qualification horizon,
   reward economics, caps, authority, and abuse/ruin boundaries.
2. Read `references/referral-loop-systems.md`. Identify legitimate value moments
   and channels: user-chosen link/share sheet, QR/code, email/SMS initiated by
   the user, team invite, friend/co-op request, creator/affiliate link, or
   waitlist. Do not scrape or auto-message contacts.
3. Model `created -> shared -> opened -> identity_pending -> attributed ->
   activated -> qualification_pending -> qualified`, with `grant_pending ->
   granted` only for incentivized mode, plus expired, duplicate, already-user,
   multi-touch, merge, rejected,
   cancelled, refunded, fraud-review, reversed, appealed, and corrected states.
4. Define attribution priority/window, stable referral ID, first/last/explicit
   touch, cross-device/deferred deep link, app install/web fallback, identity
   merge, duplicate/self/referral rings, and deterministic reason codes.
5. Define qualification from authoritative value—not install/click alone—and
   pending duration, caps, ownership overlap, and support. For incentivized
   mode, additionally define inviter/invitee reward, currency/entitlement
   authority, idempotency, refund/chargeback/reversal, and ledger reconciliation.
6. Design privacy/consent, minimal data exchange, contact redaction/retention,
   block/report, child/age modes, share preview, localization, accessibility,
   and user controls. Friendship, collaboration, or support cannot be contingent
   on public sharing or a reward.
7. Compute incremental retained value after reward, fraud, cannibalization,
   refunds, support, spam complaints, block/report, privacy, and low-quality
   acquisition. Define experiments, holdouts, scale/hold/pause/withdraw, and
   live readback.

## Source verification

Retrieve current platform share/deep-link/contact, messaging, privacy/consent,
child/age, referral/affiliate, advertising/endorsement, payment/reward, tax,
store, territory, and anti-spam authority. Unknown authority disables the
affected channel or incentive; it does not justify covert collection.

## When not to use

- Use `marketing-automation-blueprint` for the complete organic/lifecycle/paid,
  creative, attribution, spend, reputation, and shutdown system.
- Use `promotion-campaign-review` for one time-bounded referral push or offer
  after the persistent referral contract already exists.
- Use `app-design-blueprint` or `game-design-blueprint` when friendship,
  co-op/guild, collaboration, identity, or sharing semantics are unresolved as
  part of the whole product.
- Use `marketplace-payouts-review` when affiliate/creator earnings, holds,
  settlement, tax, and payout reconciliation are the primary artifact.

## Guardrails

- No spam, forced contact upload, address-book dark patterns, preselected
  recipients, misleading sender identity, public-post requirement, or fake
  waitlist scarcity.
- Do not grant irreversible value before authoritative qualification and fraud
  checks; do not silently confiscate unrelated value on reversal.
- Terms, attribution, eligibility, caps, expiry, pending state, reversal, and
  support/appeal are visible to both sides where relevant.
- Protect genuine household/team/friend cases from crude multi-account bans;
  use evidence bands, false-positive controls, and correction.
- Measure retained qualified value, not invites or installs alone. Spam,
  complaint, block/report, fraud, refund, support, fairness, and privacy are
  mandatory countermetrics.
- Autonomous optimization cannot expand contact access, change qualification/
  rewards/caps, weaken fraud/privacy, or approve its own scale gate.

## Output contract

Return one typed Referral and Invite Contract with:

1. value hypothesis, roles/modes, channels, age/territory, economics, authority,
   caps, assumptions, and ruin boundaries;
2. complete invite/open/deep-link/identity/attribution/qualification/appeal/
   support state machine, plus grant/reversal states only when incentivized;
3. attribution priority/window, identity merge, duplicate/already-user,
   cross-device and deferred-deep-link rules;
4. qualification/cap/expiry matrix and, when incentivized, reward/ledger/
   refund/reversal controls;
5. consent/privacy/contact, block/report, child, localization/accessibility, and
   support controls;
6. fraud/ring/false-positive evidence and correction ladder;
7. event schema, incremental economics, experiment/holdout, scale/hold/pause/
   withdraw, kill switch, and live readback;
8. sibling handoffs with draft IDs, owners, required inputs/outputs, acceptance
   questions, and no fabricated proof.

Complete only when each invitation and any applicable reward is consented,
attributable, qualified, reversible where applicable, support-explainable, and
safe under duplicate, merge, fraud, refund, and cross-device tests.
