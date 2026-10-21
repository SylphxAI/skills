# Experience standard

Trigger: designing or building any surface a person uses.

A finished surface is useful, truthful, distinctive, fast, and operable by the
people it serves. Product design systems own their palette, typography, spacing,
density, radius, and motion.

## Hard lines

- A success message for money, entitlement, deletion, or another consequential
  effect waits for its owning authority (the server) to confirm it, and duplicate
  submission is prevented, because a false success message costs real money or
  data. This governs what the screen claims; it never asks a person to approve.
- A grant is the authorization. A permission given once (a
  platform admin right, an OS permission, a shared location, an OAuth scope) is
  used without asking again until it is revoked, as Apple's and Google's
  permission models and OAuth work. Ask again only where a market's law requires
  fresh consent, or for an action outside what was granted. A confirmation or
  approval step for something already granted is a defect; remove it.
- Binding a login never moves or loses data: a login that already belongs to
  another account offers a switch, not a silent merge.
- Consent the law requires follows its market's rule (EU and UK: no pre-ticked
  box).
- Public surfaces carry no internal artifacts, and brand files come only from the
  brand home (both below).

## Design from the task

Know the user, the job, the primary objects, the critical journeys, the
platforms and inputs, and the material failure and recovery states before
choosing presentation. Order actions by the user's goal and the consequence of
each effect, and give the path we prefer real emphasis. Acknowledge input
immediately; read price and policy from their owners. Every reachable surface
handles its applicable states: focus, hover, active, disabled with a reason,
pending, success, error, empty, offline, denial, cancellation, and recovery.

Design defaults to few words and one idea per screen: visual first, human
language, warm imagery and motion, never a dense terminal look. Supported
capabilities are reachable in plain language across the product's supported
channels; a slash command is only a shortcut.

A cross-platform product shares semantics and ships complete native adapters for
its target platforms, with accessible input paths (touch, keyboard, pointer,
controller, or assistive technology as applicable to the platform).

Web surfaces aim for [WCAG 2.2 AA](https://www.w3.org/TR/WCAG22/) as a quality
default, not a launch gate: semantic HTML and native controls first, custom
controls with native keyboard and screen-reader support, touch targets of at
least 44 by 44 CSS pixels (WCAG 2.2 success criterion 2.5.5; AA itself asks
for 24 in 2.5.8). Where a market's law requires conformance (for example the
EU Accessibility Act for e-commerce), that market's surfaces meet it.

## Show the outcome, not the machinery

A person sees what they need to decide or act, and the result. Technical
internals stay out of the default view: tool calls, step
counts, timings, internal ids, stack traces and raw errors. Optional detail sits
behind a deliberate "show more", or only in admin and audit views
([progressive disclosure](https://www.nngroup.com/articles/progressive-disclosure/)).
An agent at work shows at most that it is working, plus one short plain phrase.

A failure shows one calm sentence with the next step ("I couldn't finish that;
I'm on it", or "Try again"), never an internal error string. The detail goes to
our observability (logs, metrics, alerts), which alerts on the symptoms users
experience, as [Google's SRE practice](https://sre.google/sre-book/monitoring-distributed-systems/)
recommends, so we find and fix a problem early, often before anyone has to
report it.

Simplicity never hides what a person is owed, and the floor is exactly two
things: what each market's law requires, and what the leading companies in the
category actually do. In practice that is the price and recurring terms before
purchase, what happens to their data, an outage that affects them (on the status
surface), and what an action will do before they confirm it. How we meter
internally (tokens, per-request cost, exact limits, routing) is not owed: usage
may show as a share of the plan, a reset time, credits or fair use, as category
leaders show it ([commercial.md](commercial.md#usage-and-billing-disclosure)).

Why: most people who use our products are not technical, and visible machinery
reads as hard to use; a plain message with a next step leaves them less confused
and needing less support.

## International experience

- The source text is the message key (English unless the product says
  otherwise), with a context note only where the same text means two things.
  Format numbers, currency, dates, and plurals by locale, and build sentences
  whole, because concatenated translated pieces break grammar.
- Translation runs in CI through the platform localization pipeline and lands as committed
  catalog files in a pull request; builds and runtime call no translator. A
  translation a person pinned stays, since overwriting it discards human work.
- Ship the locales of the markets you launch in and add more as demand shows.
  The tier-1 set (`en`, `zh-Hans`, `zh-Hant-HK`, `zh-Hant-TW`, `ja`, `ko`, `es`,
  `pt-BR`, `de`, `fr`) is the default for a global launch, not a gate. Language,
  currency, and region are separate settings.
- Web locales live in path prefixes (`/ja/...`; the source locale at the root).
  Each page lists every locale and `x-default` in `hreflang`, has its own
  canonical URL and per-locale sitemap entry, and translated titles,
  descriptions, and social previews. The locale comes from the URL, then the
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

A public surface (marketing site, landing page, customer documentation, console
UI, callout, notification, error, search metadata) speaks in customer domain
terms. Keep out decision-record identifiers (`ADR-055`, `RFC-123`), internal
repository paths, internal architecture jargon (`Bounded Context`, `Outbox`,
`Worktree`), agent coordination rationale, task ids, prompt artifacts, our
platform and process vocabulary (kernel, gate, fail-closed, Cell, Hands,
price-list and policy identifiers), and every retired name in
the names record. Copy states the fact rather than defending its
truthfulness ("honest", "not fake", "no invented").

Every public site ships a real 404 status and page, a unique title, description,
and social preview per page, and no placeholder or loading text in rendered HTML.
A product's name and one-line description come from one source that the site,
README, and package or store listings render. Each surface declares its locale
(`zh-Hant-HK`, `zh-Hant-TW`, `zh-Hans`, `en`), keeps one register within it, and
uses no Simplified characters or mainland vocabulary in a Traditional locale.

## Brand home

Every brand has one home that every surface takes its identity from, so it looks
the same everywhere and can be picked up years later from one place.

- **Company brand:** the organization's `brand` repository - the organization's canonical `brand` repository.
- **Product or title brand:** a `brand/` folder in the product's repository
  (the portfolio record names it).

A home holds the name and spelling rules (running text, legal name, local-script
names, where capitals appear only as the logo image); vector masters in every
lockup and colour variant; small-size (pixel-snapped) and app-icon versions;
colour and type tokens; a usage sheet; each file's source, hashes, and
construction spec or generator, so it can be rebuilt; and the real trademark
status.

A surface consumes the home's files or tokens and keeps no redrawn copy, traced
logo, or hand-picked colour. A redesign lands in the home first. Before choosing
a new brand, a quick web search rules out a clash with a well-known mark; a
formal trademark search or filing waits for traction and does not gate a launch.
An existing name is never changed because a similar name exists elsewhere; act
only on a complaint, takedown or legal notice.

## How it is judged

Task completion and error recovery in the critical journeys, accessibility checks
on web surfaces, a locale sweep of the built site, and, for account protection,
bind rate and retention (reshape the ask if it costs retention). The product
review checks each surface's default view and failure states against "Show the
outcome, not the machinery".
