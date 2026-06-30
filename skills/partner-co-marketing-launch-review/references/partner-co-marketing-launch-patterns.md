# Partner Co-Marketing Launch Patterns

## Partner launch state machine

```text
partner_motion_proposed -> value_aligned -> narrative_drafted -> assets_approved -> launch_scheduled -> channels_live -> leads_routed -> performance_reviewed
          |                    |                 |                  |                 |                |              |
          v                    v                 v                  v                 v                v              v
 rejected                audience_mismatch   proof_missing     approval_blocked   launch_paused   routing_failed  followup_missing
```

## Rule IDs

- `partner-launch-1` — Classify motion: integration launch, marketplace listing, webinar, case study, bundle, referral, reseller enablement, or ecosystem announcement.
- `partner-launch-2` — Define shared audience, joint problem, integration value, proof asset, CTA, and success metric.
- `partner-launch-3` — Claims need partner approval, source, date, allowed usage, and expiry.
- `partner-launch-4` — Launch assets should include landing page, partner listing, screenshots, demo script, email/social copy, FAQ, sales brief, and support note.
- `partner-launch-5` — Attribution needs UTMs, referral IDs, marketplace source, lead ownership, CRM routing, and privacy boundaries.
- `partner-launch-6` — Partner commitments should record who posts, when, where, asset owner, approval SLA, and fallback plan.
- `partner-launch-7` — Integration launches need technical support readiness, known limitations, and incident contact path.
- `partner-launch-8` — Incentives and referrals need fraud, discount, payout, and terms review.
- `partner-launch-9` — Post-launch review should measure qualified leads, activation, retention, partner-sourced revenue, support load, and trust impact.
- `partner-launch-10` — Keep positioning consistent so partner value expands the category story instead of fragmenting it.

## Decision table

| Motion | Key asset | Risk | Follow-up |
| --- | --- | --- | --- |
| Integration launch | Joint demo and docs | Overclaiming integration depth | Activation and support review |
| Marketplace listing | Listing copy and proof | Poor discoverability | Ranking/search optimization |
| Webinar | Narrative and speaker prep | Low-quality leads | Lead scoring and nurture |
| Case study | Customer proof | Approval/legal delay | Reusable proof library |
| Referral bundle | Offer terms | Fraud or attribution disputes | Reconciliation and partner report |

## Launch checklist

- Shared audience, value proposition, and CTA are clear.
- Claims, logos, screenshots, and proof are approved.
- Launch assets, channel owners, and calendar are complete.
- Attribution, lead routing, and privacy boundaries are tested.
- Support, sales, and partner teams have enablement notes.
- Post-launch review includes activation, revenue, support, and trust outcomes.

## Event schema

Track: `partner_launch_proposed`, `partner_asset_approved`, `partner_campaign_scheduled`, `partner_channel_published`, `partner_lead_captured`, `partner_lead_routed`, `partner_integration_activated`, `partner_campaign_reviewed`.

Recommended properties: `partner_type`, `motion_type`, `audience_segment`, `asset_type`, `claim_type`, `approval_status`, `channel`, `utm_campaign`, `lead_source`, `lead_owner`, `activation_event`, `support_contacted`, `revenue_bucket`, `partner_followup_required`.
