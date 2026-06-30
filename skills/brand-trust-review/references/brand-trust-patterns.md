# Brand Trust Patterns

## Trust-building state machine

```text
visitor_arrives -> claim_seen -> proof_checked -> risk_reduced -> action_attempted -> commitment_made -> expectation_confirmed -> trust_reinforced
       |              |             |              |                  |                  |                      |
       v              v             v              v                  v                  v                      v
 bounce_due_mismatch vague_claim  proof_missing  hidden_risk      checkout_doubt   support_needed        trust_broken
```

## Rule IDs

- `brand-trust-1` — Classify the trust surface: landing page, pricing, checkout, onboarding, store listing, privacy/security, AI feature, marketplace profile, or support flow.
- `brand-trust-2` — Every material claim needs proof, qualifier, source, date, and boundary.
- `brand-trust-3` — Risk reducers should match user fear: money-back, trial, cancellation, privacy, data export, human support, uptime, moderation, or security evidence.
- `brand-trust-4` — Social proof must be specific: user segment, use case, measurable result, review source, or credible testimonial.
- `brand-trust-5` — Pricing and cancellation trust beat clever persuasion when the user fears lock-in.
- `brand-trust-6` — AI features need transparent capability limits, user control, data handling, and fallback paths.
- `brand-trust-7` — Marketplace trust needs creator quality signals, moderation policy, refunds/disputes, and ranking transparency.
- `brand-trust-8` — Visual design should feel consistent, fast, accessible, and calm; polish is a trust signal when claims are serious.
- `brand-trust-9` — Support trust requires response expectations, escalation paths, status visibility, and recovery language.
- `brand-trust-10` — Track skepticism reduction with conversion quality, refund rate, support trust questions, review sentiment, and churn reasons.

## Decision table

| Trust gap | Better proof | UX/copy response | Avoid |
| --- | --- | --- | --- |
| New product with no logos | Founder credibility, demos, transparent roadmap | Show specific use cases and limitations | Fake popularity |
| Sensitive data workflow | Security/privacy evidence and export control | Explain data handling before asking | Vague “secure” badges |
| Expensive subscription | Trial, cancellation clarity, ROI examples | Show plan fit and risk reducer | Hidden fees or dark patterns |
| AI automation | Eval examples, human control, failure modes | Disclose confidence and fallback | Overclaiming autonomy |
| Marketplace purchase | Reviews, creator quality, refund/dispute path | Separate editorial and paid placement | Manipulated ranking claims |

## Trust audit checklist

- Audience skepticism and category trust baseline are named.
- Claims are specific, provable, qualified, and current.
- Pricing, cancellation, refund, privacy, and support expectations are visible.
- Social proof is real, relevant, and not overgeneralized.
- Visual design, performance, accessibility, and tone support the promise.
- Metrics monitor trust quality, not only short-term conversion.

## Event schema

Track: `trust_surface_viewed`, `proof_asset_clicked`, `pricing_trust_question_opened`, `privacy_detail_viewed`, `testimonial_clicked`, `refund_policy_viewed`, `support_expectation_viewed`, `trust_objection_submitted`, `trust_conversion_completed`.

Recommended properties: `surface`, `audience_segment`, `claim_type`, `proof_type`, `risk_reducer`, `plan`, `traffic_source`, `device_type`, `objection_type`, `support_needed`, `conversion_quality`, `refund_within_window`, `sentiment_bucket`.
