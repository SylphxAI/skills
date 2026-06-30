# Partner Ecosystem Patterns

## Partner lifecycle state machine

```text
partner_interest -> application_review -> sandbox_access -> integration_built -> certification -> listing_published -> active_partner -> renewal_or_removal
       |                    |                  |                 |              |
       v                    v                  v                 v              v
 rejected             scope_limited       test_failed       policy_hold    suspended
```

## Rule IDs

- `partner-eco-1` — Start from a user workflow that integration improves, not partner logos alone.
- `partner-eco-2` — Define partner tier, access level, support model, commercial model, and review owner.
- `partner-eco-3` — API scopes, OAuth grants, webhooks, rate limits, and logs must match least-privilege access.
- `partner-eco-4` — Certification should test security, data handling, UX, reliability, and support readiness.
- `partner-eco-5` — Partner directory ranking must separate user quality, strategic value, freshness, and paid promotion.
- `partner-eco-6` — Co-marketing claims need proof and mutual approval.
- `partner-eco-7` — Revenue share or referral fees need payout, tax, dispute, and refund handling.
- `partner-eco-8` — Support boundaries need triage: platform bug, partner bug, user setup, billing, or policy issue.
- `partner-eco-9` — Partner abuse, data misuse, spam, and broken integrations need suspension and user protection paths.
- `partner-eco-10` — Ecosystem health should measure retained user value, integration reliability, partner activation, and support load.

## Decision table

| Partner type | Access | Gate | Risk | Metric |
| --- | --- | --- | --- | --- |
| Strategic platform partner | Broad API and joint launch | Security/commercial review | Overcommitment | Retained accounts influenced |
| App directory developer | Scoped OAuth/webhooks | Certification | Data misuse/support load | Active installs and low incidents |
| Affiliate/referral partner | Attribution and payouts | Fraud review | Spam/low-quality leads | Qualified retained revenue |
| Implementation partner | Admin or services access | Training and contract | Customer trust | Successful deployments |
| Data partner | Export/import or sync | Privacy/legal review | Unauthorized data transfer | Sync reliability and opt-outs |
| Community creator partner | Listing/content tools | Quality/moderation | Brand/policy risk | Creator retention and quality |

## Ecosystem checklist

- Partner tiers, incentives, and admission criteria are explicit.
- API scopes, webhooks, rate limits, revocation, and audit logs are ready.
- Certification covers security, UX, reliability, support, and data handling.
- Directory listing, ranking, and removal policies are documented.
- Support routing, incident handling, and partner communications are owned.

## Event schema

Track: `partner_application_submitted`, `partner_scope_granted`, `partner_integration_tested`, `partner_certification_completed`, `partner_listing_published`, `partner_install_completed`, `partner_webhook_failed`, `partner_support_case_opened`, `partner_policy_action_taken`, `partner_health_reviewed`.

Minimum properties: partner ID, tier, integration type, scopes, user segment, certification status, listing state, install count, error class, support owner, and policy status.
