---
name: frontend-design
description: "Use when designing, redesigning, styling, or building web, mobile, or desktop UI surfaces, landing pages, storefronts, pricing, checkout or top-up pages, dashboards, onboarding flows, or interactive visual components, or reviewing visual and UX quality. Use clear-writing for standalone prose or copy editing without visual design. Use challenge for backend or commercial architecture without interface design. Use deliver-and-verify for deployment and release execution."
---

# Frontend design

Build an intentional whole experience that makes the audience want to act and
helps them succeed. A collection of individually tidy components is not a visual
direction. Optimize clarity, attraction and task completion together; preserve
truthful offers, accessibility, payment safety and supported workflows.

## Establish the direction before coding

Read the existing surface, real content, assets and product constraints. Identify
the audience, their immediate desire, the primary action, and the emotional tone:
for example, calm confidence for a financial task versus playful discovery for a
creative tool. Choose a direction specific to that audience, not a default theme.

Set the whole-surface design in one short brief before implementing components:

- **Palette and surfaces:** choose a cohesive palette with roles for background,
  raised surfaces, text, accents, actions and status. Establish contrast and depth;
  do not assign a different decorative treatment to every section.
- **Typography:** choose a deliberate display/body pairing or a single versatile
  family, then define the type scale, weight, line height and measure. Verify font
  availability, fallback metrics and coverage for the actual writing systems.
- **Spatial rhythm:** set spacing, content width, alignment, density and a clear
  section rhythm. Let content and task geometry determine responsive changes;
  shrinking a desktop composition does not create a usable phone experience.
- **Visual identity:** choose a recognizable composition, image or illustration
  language, and one focal point. Use genuine assets and intentional negative space
  rather than filling every gap with another card or badge.
- **Anti-goals:** explicitly name what this surface must not look or read like.
  Reject generic SaaS card-grid templates, purple-gradient AI clichés and patchwork
  CRUD forms as defaults. A necessary data table is not a failure of art direction;
  a decorative template that obscures the task is.

Compare the direction with relevant high-quality delivered interfaces, then commit
to a coherent system. Do not imitate a screenshot's decoration while losing its
hierarchy or inventing unsupported product capabilities. For journey trade-offs,
checkout geometry and remake parity, read
[experience design](../challenge/references/experience.md).

## Frame the offer around user desire

Customer-facing UI, storefronts and pricing or checkout cards speak to user value,
attraction, trust and action. Translate internal mechanics into what the user gets,
what it costs and what happens next. Database fields, ledger ratios, reconciliation
rules and engineering constraints are not marketing copy.

These examples illustrate framing, not product claims to invent:

| Bad: exposes machinery or withholds value | Good: helps the user decide |
| --- | --- |
| “Create a customer record and initialize entitlement rows.” | “Create your account and start your first project.” |
| “Settlement ratio 0.72; ledger reconciles hourly.” | “Choose an amount. Review the total before you pay.” |
| “Submit the onboarding payload.” | “Save your preferences.” |
| “Processor status: asynchronous reconciliation pending.” | “We’re checking your payment. Check its status before trying again.” |

Every promise in the actual interface must be supported. Show the actual currency,
quantity, total, material fees, renewal terms and relevant restrictions where the
user decides; translating machinery is not permission to hide a required disclosure.
Do not fabricate urgency, testimonials, security claims or guarantees. Use concrete
benefits and specific action labels instead of technical field names or vague
“Continue” buttons when the consequence matters. Keep related selection, total and
pay actions visibly connected, especially on a phone.

Use [clear-writing](../clear-writing/SKILL.md) for dedicated copy work and
[consumer money and time copy](../clear-writing/references/articles-and-copy.md#money-and-time-in-consumer-copy)
when describing balances, prices, waiting or expiry.

## Design behavior as carefully as the first frame

Keep hierarchy and controls consistent across the complete interaction:

- **Empty:** explain what belongs here and offer the next useful action; do not
  dress a broken request as an empty account.
- **Loading:** reserve layout space, distinguish work in progress from completion,
  and avoid flashing skeletons or layout shifts that move the target under a tap.
- **Error and recovery:** explain what happened, what is safe and one recovery
  action. Preserve valid input. For an unknown payment result, reconcile status
  rather than inviting another charge. Never claim a payment failed without evidence.
- **Hover, focus and selection:** expose interactive affordances without relying on
  hover alone. Use semantic controls, visible keyboard focus and clear selected,
  disabled and invalid states. An ordinary focus ring must not look like an error;
  errors need text or an icon as well as color.
- **Success:** show the actual outcome and next step, not a generic animation that
  masks a pending save, purchase or entitlement.

Choose one deliberate entrance or transition rhythm that reinforces hierarchy or
explains a state change. Keep duration, easing and sequencing consistent. Do not
animate every card, delay the main action or run decorative motion indefinitely.
Respect reduced-motion preferences and keep the same information and controls
available without animation. Test keyboard and touch paths, not just pointer demos.

## Verify rendered pixels before completion

Source, component previews and a successful build do not establish visual quality.
Open the functioning implementation in a real browser and inspect rendered desktop
and mobile viewports, using screenshots as well as interaction. For native mobile
or desktop interfaces, also inspect the actual application renderer; a web preview
cannot certify a different shipping host. Read
[UI coverage, geometry and painted output](../deliver-and-verify/references/parity.md#ui-coverage-geometry-and-painted-output)
for coverage and evidence requirements.

Inspect the whole page and focused crops with real content, not only the hero:

- Check alignment, spacing rhythm, surface hierarchy, image quality, contrast and
  typography hierarchy at the intended desktop size and a narrow phone viewport.
- Check horizontal overflow, clipped or overlapping text, scrolling, sticky actions,
  safe areas and the software keyboard. Content and required terms must remain reachable.
- Exercise empty, loading, error, success, hover and keyboard-focus states. Verify
  that controls do what their labels promise and disabled states explain recovery.
- Render the target locales, including long translations and mixed writing systems;
  inspect line breaks, fallback fonts, numerals, currency and button wrapping.
  If translations are unavailable, label expansion tests as synthetic, not locale proof.
- Check responsive transitions between endpoints, zoom or larger text, touch targets
  and reduced motion. A screenshot alone does not prove accessible behavior.

Compare the result with the chosen direction, fix the weakest visible problem and
capture again until the composition and task hold together at both sizes. Do not
call it studio quality while ignoring obvious overflow, weak hierarchy or an
unfinished state. If rendered access is unavailable, report visual verification as
incomplete rather than substituting a code review. State which viewports, locales
and interactions were actually inspected and any remaining gaps.

Use [deliver-and-verify](../deliver-and-verify/SKILL.md) for publishing and deployment;
a locally polished interface is not evidence that the released surface uses it.
