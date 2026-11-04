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

## The home screen is the loading screen

The first frame after launch is the real home screen, drawn by the engine itself, and the engine is thin enough to draw it at once. That frame waits only for what it uses. Everything else (pipelines, code modules, textures, meshes, fonts, audio, effects, data and account state) arrives afterwards in place, without blocking or shifting a pixel. The home accepts input while network and account work catches up in the background; a control that truly needs that state shows its own pending state, and a balance never shows a guess. A separate splash, logo card or loading scene earns its place only when a store, licence or contract requires it. Optional updates, announcements and promotions never gate startup.

On the web, nothing outside the engine shows loading: no poster, splash, image or DOM loading element around the canvas. Until the engine's first frame the page shows only its plain colour. Fix a slow first frame by removing the work that blocks it, never by covering it with a picture. In one witnessed boot, files finished at 3.7 s and home arrived at 22 s because the engine built 123 pipelines first and that frame used 32; deferring the rest saved about 10.7 s on a software GPU and still left 15 s of other work, so measure each remaining interval rather than stopping at the first cause.

Where a platform shows a launch image before any code runs, keep it nearly identical to the home's first frame.

When a native view shows that launch image over an engine surface, remove it only after the engine has presented a frame of its own; an engine signal that an object exists is not a presented frame. Removing it early shows black, and covering the engine's surface for long can stall the engine itself. Read video frames on both sides of the handoff for black, and time the engine with and without the cover.

Brand recognition comes from the product itself, so the mark sits on the home screen. Sources, read 2026-11-02: [Apple Launching](https://developer.apple.com/design/human-interface-guidelines/launching) (nearly identical to the first screen, no branding unless a fixed part of it) and [Android splash screens](https://developer.android.com/develop/ui/views/launch/splash-screen) (dismissed at the first frame, animation at most 1,000 ms, no branding image recommended).

## Game experience

- Until a new player finishes the first game or task, show only the primary
  action, profile, currency and shop. Introduce events, social feeds and
  promotions afterwards, so the first session teaches the core loop.
- Focus each tutorial step with a strong mask, a pulsing target and a large
  pointer. Localize every control, including tutorial prompts and navigation;
  honor the reduced-motion preference for the pulse.
- Measure the first-session funnel daily with one frozen, versioned query.
  Fix the cohort-day definition, the first core action within 24 hours and
  test-device exclusions, so a query change cannot masquerade as improvement.
- Register every fresh-install test account. Exclude registered test accounts,
  test devices and test egress IPs from player reports, including the funnel.
- Ship look-only content on a steady cadence. Players read visible change as a
  live, cared-for game; keep that signal independent of changes to game balance.
- Review the play surface against a real-table or category-leader reference
  before judging the HUD or polish. Conserve pieces across zones, put each hand
  and discard area in front of its seat, use one coherent scale and leave
  nothing floating. Adopt the leader's readable screen layout rather than a
  literal model of the table.
- Show owners real engine renders, never HTML or SVG mockups of game screens.
  Avoid web-page composition: app bars, card grids and flat slabs. Use in-world
  materials with depth and a visible pressed state for interactive surfaces.

## Game-owned SDK entry

Games reach one account page through one entry in the game's own Settings,
styled to fit the game, without a floating button over play. Before removing an
old SDK entry, inventory every function it offers and verify a working route to
each from the account page; account and support are not the whole inventory.

Keep the floating entry only on shipped clients that lack the replacement,
until they update, so no player loses access. Remove it from each updated client
once the game-owned route covers every inventoried function.

After each scene change, verify that Settings still reaches the account page
and its functions. On legacy clients, check that the floating entry remains
operable; a full-screen view drawn later can cover it without an error.

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

- Before each release, census all shipped text in every supported locale.
  Check the locale's script, spelling, glyph coverage in the shipped font
  subset and overlays covering profile data. Fix the whole defect class and
  repeat the census; do not repair isolated strings one at a time.
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
