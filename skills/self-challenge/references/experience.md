# Experience standard

Trigger: designing or building any surface a person uses.

A finished surface is useful, truthful, distinctive, fast, and operable by the
people it serves. Product design systems own their palette, typography, spacing,
density, radius, and motion.

## Hard lines

- A success message for money, entitlement, deletion, or another consequential
  effect waits for its owning authority (the server) to confirm it, and duplicate
  submission is prevented, because a false success message costs real money or
  data.
- Use a current grant within its scope and lifetime. Request a missing or
  expired permission through the platform's supported flow. Confirm an action
  when its consent or error-prevention contract requires it; reuse authorization
  already supplied. OS and OAuth grants can expire or require reauthorization
  ([Android permissions](https://developer.android.com/training/permissions/requesting)).
- Binding a login never moves or loses data: a login that already belongs to
  another account offers a switch, not a silent merge.
- Where processing relies on EU or UK data-protection consent, collect an
  affirmative choice; a pre-ticked box does not supply it. Check other consent
  requirements against the applicable market and action.
- Public surfaces carry the information their audience needs; private records
  stay within their sharing scope. Brand assets come from their canonical home
  (both below).

## Design from the task

Know the user, the job, the primary objects, the critical journeys, the
platforms and inputs, and the material failure and recovery states before
choosing presentation. Order actions by the user's goal and the consequence of
each effect, and give the path we prefer real emphasis. Acknowledge input
immediately; read price and policy from their owners. Every reachable surface
handles its applicable states: focus, hover, active, disabled with a reason,
pending, success, error, empty, offline, denial, cancellation, and recovery.

Design defaults to few words, a clear hierarchy and the audience's vocabulary.
Choose imagery, motion, density and command-oriented controls for the actual
task. Make supported capabilities discoverable in the channels where they are
useful.

A cross-platform product shares semantics and ships complete native adapters for
its target platforms, with accessible input paths (touch, keyboard, pointer,
controller, or assistive technology as applicable to the platform).

Web surfaces aim for [WCAG 2.2 AA](https://www.w3.org/TR/WCAG22/) as a quality
default, not a launch gate: semantic HTML and native controls first, custom
controls with native keyboard and screen-reader support, touch targets of at
least 44 by 44 CSS pixels (WCAG 2.2 success criterion 2.5.5; AA itself asks
for 24 in 2.5.8). Where a market's law requires conformance (for example the
EU Accessibility Act for e-commerce), that market's surfaces meet it.

## Spatial rhythm, breathing room, and fluid motion

An interface feels rigid ("死板") when every group has the same spacing density,
borders replace spatial hierarchy, and motion moves at constant velocity or
snaps abruptly. Letting a design breathe means deliberate contrast in space,
hierarchy, and timing: the eye rests on what matters and motion feels physical.

Use the product's design tokens and compare the affected journey with its
category benchmark.

- Group related items through proximity and surface hierarchy. Make separation
  between groups clear without nesting borders around every element.
- Give the primary action or content visual emphasis; supporting metadata
  recedes in weight. Dense expert surfaces may need several comparable objects.
- Keep motion interruptible and feedback prompt. Choose easing and staggering
  for the transition; honor reduced-motion preferences with instant states or
  subtle fades. Anchor a popover or menu to its trigger when that preserves
  spatial understanding.
- Judge screenshots and interactions for hierarchy, spacing and pacing. Add a
  mechanical check only when it distinguishes a recurring concrete defect from
  valid designs.

## Show the outcome, not the machinery

Show the result, progress and controls this audience needs. Put incidental
implementation detail behind deliberate disclosure; include timings, public
identifiers and technical detail where they help the user's task
([progressive disclosure](https://www.nngroup.com/articles/progressive-disclosure/)).

A failure shows the known state and a safe next action. Say recovery is running
only when it is. Offer retry when the request can safely be repeated; otherwise
show its existing receipt and status. Send diagnostic detail to observability
and alert on symptoms users experience
([Google SRE](https://sre.google/sre-book/monitoring-distributed-systems/)).

Disclose the price, recurring terms, purchased entitlement and material limits
needed for the customer's decision. Explain data handling and consequential
actions at the relevant point. Derive additional obligations from the current
market, contract and channel ([commercial.md](commercial.md#usage-and-billing-disclosure)).

## International experience

- Use source text as message keys by default (English unless the product says
  otherwise), or follow the established catalogue's stable-key contract. Add
  context where the same text means different things.
  Format numbers, currency, dates, and plurals by locale, and build sentences
  whole, because concatenated translated pieces break grammar.
- For static interface text, default to the project's localization pipeline
  producing reviewed, versioned catalogues before release. Preserve pinned
  human translations. Evaluate live translation separately when it is a product
  capability, including latency, cost and required quality.
- Ship the locales of the markets you launch in and add more as demand shows.
  The tier-1 set (`en`, `zh-Hans`, `zh-Hant-HK`, `zh-Hant-TW`, `ja`, `ko`, `es`,
  `pt-BR`, `de`, `fr`) is the default for a global launch, not a gate. Language,
  currency, and region are separate settings.
- Web locales live in path prefixes (`/ja/...`; the source locale at the root).
  Use reciprocal `hreflang` links for available equivalent language/region
  pages and an appropriate `x-default`. Maintain canonical URLs, sitemap entries,
  and localized titles, descriptions and social previews. The locale comes from the URL, then the
  person's choice, then `Accept-Language`; IP redirects trap travellers, so a
  language suggestion is a banner and the requested page stays.
- Test long text, CJK, right-to-left text, and emoji where user text shows.
  Purchase, consent, safety, and recovery text is translated in every supported
  locale.

## Account protection

A product that lets a person start without an account (guest, device, single
platform login) helps them protect what they build before they can lose it:

- The server decides when to ask, from the value at risk (spend, time played,
  progress) and the recovery methods on file; the client only renders.
- Ask at a natural pause (after a purchase, a finished match, a claimed reward),
  not mid-task. Start with a quiet status mark, raise it with the value at risk,
  cap the frequency, and let the person choose later.
- Say what they keep ("change phones and keep your progress"), offer one-tap
  native sign-in first, add a small thank-you where the product has one, and ask
  an account with one recovery method to add a second.

## Public surfaces

Write in the audience's vocabulary. Include public technical identifiers when
they help the task; keep private coordination records and unrelated
implementation detail out. State the fact directly.

Public sites provide a useful 404 page with the correct status and distinct
metadata for meaningful pages. Remove permanent placeholders and misleading
empty HTML; preserve accessible pending states for asynchronous work. A product
name and description come from one source used by its site and listings.
Declare the locale and use its natural script, terminology and register,
preserving exact names and quotations.

## Brand home

Give each brand one canonical home for the identity assets shared across its
surfaces, so later work can find and reuse them.

- **Company brand:** the organization's canonical brand repository.
- **Product or title brand:** the product's declared asset location, such as a
  `brand/` folder in its repository.

Keep the name and spelling rules, source assets, required size and colour
variants, design tokens, usage guidance and known rights status together. Record
provenance and build inputs for generated assets; preserve the approved bytes
where regeneration is not deterministic.

Surfaces consume the canonical files or derived variants and design tokens.
Update the home with a redesign and migrate its consumers together. Before
choosing a new brand, check for obvious collisions with established marks;
choose further clearance work from the market, exposure and cost.
Assess an existing name by user confusion, business value, legal exposure and
migration cost. Rename it, including its references, when that decision supports
the change.

## How it is judged

Task completion and error recovery in the critical journeys, accessibility checks
on web surfaces, a locale sweep of the built site, and, for account protection,
bind rate and retention (reshape the ask if it costs retention). The product
review checks each surface's default view and failure states against "Show the
outcome, not the machinery" and compares the affected visual and interaction
journey with its category benchmark. For delivery, use the shared
[product parity and live verification method](../../deliver-and-verify/references/parity.md)
for the comparison, serving-revision evidence and machine checks.
