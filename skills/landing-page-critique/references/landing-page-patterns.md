# Landing Page Patterns

## Conversion argument

A strong landing page answers, in order: who it is for, what painful outcome changes, why this product is different, how it works, why to trust it, what to do next, and what happens after clicking.

## Rule IDs

- `landing-1` — The hero should name the audience, promise an outcome, and show the product or result quickly.
- `landing-2` — Replace vague adjectives with concrete before/after evidence.
- `landing-3` — CTA copy should describe the next step, not only say "Get started".
- `landing-4` — Above-the-fold proof should match product maturity: demo, screenshot, metric, customer quote, or founder credibility.
- `landing-5` — Feature sections should ladder from pain to capability to proof, not list internal modules.
- `landing-6` — Handle objections explicitly: price, setup effort, trust, migration, cancellation, compatibility, support.
- `landing-7` — Use one primary CTA path per page section; secondary CTAs should reduce risk, such as demo, docs, or examples.
- `landing-8` — For technical products, show docs/API/CLI quickly enough for builders to trust the product.
- `landing-9` — For games and consumer apps, show the core loop or emotional payoff before listing systems.
- `landing-10` — Instrument conversion events without dark patterns or inflated success metrics.

## Section matrix

| Section | Job | Failure to avoid |
| --- | --- | --- |
| Hero | Clarify audience and outcome | Slogan with no product reality |
| Product demo | Make value tangible | Generic illustrations only |
| Benefits | Translate features into outcomes | Feature dump |
| Proof | Reduce risk | Unsupported claims |
| Objections | Remove anxiety | Hiding limits/pricing/cancellation |
| CTA | Move to next step | Multiple competing next steps |
| FAQ | Close late-stage doubts | Random low-stakes questions |

## Event schema

Track: `landing_viewed`, `hero_cta_clicked`, `demo_played`, `pricing_clicked`, `docs_clicked`, `signup_started`, `signup_completed`, `contact_sales_started`, `faq_expanded`, `scroll_depth_bucket`.
