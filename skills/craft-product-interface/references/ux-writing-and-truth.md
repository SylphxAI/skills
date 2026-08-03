# UX Writing and Truth-Bound Surfaces

Words are interface material. This skill may shape approved product, marketing, pricing, policy, and entitlement truth into clear UI copy; it must not decide or fabricate that truth.

## Copy contract

For every material string, identify its job and source:

| Copy role | Must answer | Truth owner |
| --- | --- | --- |
| Heading | where am I and what can I accomplish? | product/interface brief |
| Label | what is this object or field? | domain model/product language |
| Action | what will happen now? | implemented behavior |
| Helper | why, format, constraint, or consequence | product/policy/technical truth |
| Status | what is happening or what became durable? | runtime state |
| Error | what failed and how can I continue? | failure/recovery contract |
| Price/plan | amount, unit, term, inclusion, renewal, limit | approved pricing artifact |
| Claim/proof | value, capability, availability, evidence | approved product/marketing truth |
| Consent/permission | data/access requested, purpose, choice, consequence | privacy/policy owner |

If the truth owner is missing, mark a reviewable placeholder and block publication or irreversible implementation of the claim. Do not “improve” copy by changing price, scope, renewal, cancellation, eligibility, risk, or consequence.

## Writing rules

- `ic-copy-1` — Name objects using user vocabulary, not backend or internal team language.
- `ic-copy-2` — Use concrete verbs: “Publish,” “Invite member,” and “Save changes,” then confirm with the same verb family.
- `ic-copy-3` — Labels label, helper text helps, examples demonstrate, and errors recover. Do not make one string perform every job.
- `ic-copy-4` — State errors without vague apology: what failed, why if safely known, whether work was retained, and the next valid action.
- `ic-copy-5` — Match tone to stakes. Playful language is inappropriate during payment failure, account recovery, safety, permission, or data-loss risk.
- `ic-copy-6` — Preserve exact product names, user-provided capitalization, numbers, units, pluralization, and locale-aware date/currency formatting.
- `ic-copy-7` — Avoid shame, coercion, disguised ads, fake urgency, hidden conditions, preselected consent, and ambiguous destructive labels.
- `ic-copy-8` — Write for translation: short complete sentences, no string concatenation, no untranslatable wordplay for essential meaning, and enough layout room for expansion.

## Conversion-surface boundary

When implementing an onboarding, landing, checkout, upgrade, or pricing interface, arrange only supplied truth:

1. audience and recognizable problem;
2. concrete outcome and differentiation;
3. how it works or what is included;
4. proof whose source is available;
5. price, term, conditions, risk, and support where applicable;
6. one clear primary action and honest secondary path;
7. relevant objections and recovery/cancellation consequences.

Interface Craft owns hierarchy, legibility, interaction, state, and responsive presentation. Pricing owns value metric, packages, limits, discounts, and commercial decision. Marketing owns audience/message strategy, campaign concepts, and claims. Product Asset Production owns exact promotional captures and media. Never create fake testimonials, customer logos, awards, live-user counters, scarcity, savings anchors, or product screenshots.

## Settings and preferences

Separate ordinary preferences from consent, security, organization policy, entitlement, and account lifecycle. For each control, show scope, current value, source of truth, save behavior, cross-device effect, and reset or reversal. A disabled or inherited setting explains why and who can change it. Experiments must not silently override explicit user preferences, consent, accessibility needs, or safety settings.

## First-use and education

Ask only for setup effort that accelerates value or creates durable ownership. Show why a profile, workspace, avatar, import, permission, or personalization step matters; allow skip or defer when it is not essential. Education appears at the moment of need, supports dismissal and later recovery, and never blocks experts merely to increase time spent.

## Copy review checklist

- Does each action label match the actual transition and durable outcome?
- Are totals, renewal, limits, permissions, destructive consequences, and unavailable states explicit?
- Can a user recover using the words on screen without external interpretation?
- Does text remain understandable out of layout context and under screen-reader navigation?
- Are strings localizable, culturally neutral where needed, and robust under expansion or RTL?
- Are claims tied to approved evidence rather than inferred from visual ambition?
- Is consent freely chosen and is the decline path legible and functional?

Clear copy may improve conversion, but conversion cannot override truth, autonomy, accessibility, or recovery.
