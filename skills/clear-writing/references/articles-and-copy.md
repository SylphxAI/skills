# Articles, Copywriting & Public Communication Standard (`articles-and-copy.md`)

Trigger: writing or rewriting blog posts, technical articles, product launch announcements, landing pages, ad copy, release notes, or UI microcopy.

Also see [../../challenge/references/growth.md](../../challenge/references/growth.md) for growth economics and [../../challenge/references/experience.md](../../challenge/references/experience.md) for UX surface rules.

## Core Principles (Ogilvy & High-Conversion Copywriting)

1. **The First 3 Seconds (The Hook)**:
   - Readers do not owe you their attention. Your headline and opening sentence must immediately name either:
     - **A sharp, recognizable pain** the reader has felt today,
     - **A concrete, surprising result or number**, or
     - **The exact new capability** they can use right now.
   - Never open an article with throat-clearing history (*"Since the dawn of cloud computing..."*, *"In 2026, AI agents are everywhere..."*).
2. **Benefits and Concrete Pictures Beat Abstract Features**:
   - **Feature**: *"Built-in WebAuthn passkey authentication with automatic session refresh."*
   - **Benefit**: *"Sign in with Touch ID and stay signed in across your tabs."*
   - Show the outcome on the user's screen, wallet, or calendar—never our internal architecture diagram, unless the audience is specifically reading a deep-dive engineering post.
3. **Specificity Is Credibility**:
   - Round, vague claims (*"much faster builds"*, *"save tons of money"*) trigger reader skepticism.
   - Specific, accurate facts (*"cuts CI compile time from 14m 20s to 3m 05s"*, *"$0 base fee, billed per active second"*) build immediate trust. Never fabricate numbers or fake urgency (such as countdown timers that reset).
4. **Rhythm, Scannability, and Visual Breathing Room**:
   - Break long walls of text with informative subheadings that tell the story on their own if a reader only skims the bold lines.
   - Vary sentence length to make the point easy to follow. Cut adverbs that add no information (*"very"*, *"extremely"*, *"seamlessly"*, *"actually"*).
5. **One Clear Call to Action (CTA)**:
   - For an announcement or page that asks the reader to act, give **one clear primary next step** (e.g., `npx my-cli deploy`, a live interactive demo with no signup wall, or a single button naming what happens when clicked: *"Start free — no card required"*).

## Correcting public copy

Routine marketing cleanup should leave truthful, natural copy without narrating
irrelevant drafting errors, internal causes or self-critical admissions. Correct
false or misleading claims; keep material customer-impact facts, applicable
remedies and legally or platform-required notices. Evidence that an earlier
misleading claim materially affected a purchase or use calls for a clear
correction and any applicable remedy, rather than a silent rewrite that hides
the impact.

Synthetic contrasts:

- **Game blurb; verified features unchanged, only awkward wording needs repair.**
  ❌ “Our writer misunderstood the feature names. Sorry about our sloppy draft.”
  ✅ “Choose a shield and skill cards to build your match strategy.”
- **SaaS notice; customers were charged for a plan promising unavailable exports.**
  ❌ “We've refreshed our plan description. Enjoy the features available today.”
  ✅ “Our plan page said PDF exports were included, but they are unavailable.
  If you paid for that feature, contact support to request a refund.”
  The refund route must be verified and authorized before using this wording.

## UI Microcopy (Buttons, Empty States, and Error Messages)

Use enough plain language to explain the relevant facts in an error or empty state:
1. **What happened?** (without blaming the user or printing raw error codes like `ERR_CONSTRAINT_23505`)
2. **Is my data/money safe?** (when relevant to payments, saves, or account state)
3. **What is the one button or step to fix it right now?**

## Side-by-Side Contrast Examples

### Error Message / UI Microcopy
- ❌ **Bad**:
  > *"Error 409: Workspace slug conflict detected in database table `tenants`. Please modify your input payload and retry the request."*
- ✅ **Good**:
  > *"That workspace URL (`acme`) is already taken. Try `acme-hq` or `acme-labs`."*

### Release Note / Customer Update
- ❌ **Bad**:
  > *"We are thrilled to announce a game-changing enhancement to our export module! We've completely re-architected our CSV streaming pipeline to empower you to export your data more seamlessly than ever before."*
- ✅ **Good**:
  > *"Exporting 100,000+ rows to CSV now starts downloading immediately instead of timing out, and includes your custom tag columns."*

## Money and time in consumer copy

Checkout copy must match the money the person will actually use. Read the
wallet's currency and format its amounts with the user's locale; never hardcode
a currency symbol. If settlement uses another currency, label that real charge
explicitly rather than silently relabeling the wallet amount. Check a second
currency and a locale with different number formatting before publishing.

Show one local time on consumer pages, with an unambiguous zone when needed;
do not ask the reader to decode parallel times such as “HKT / UTC”. Technical
logs can keep UTC. Read the whole rendered component: do not repeat a number
already supplied by its badge. Keep finance-only calculations such as “effective
price %” out of consumer purchase copy; show the actual amount and what it buys.

Describe a payment check as an action, not a judgment about the payer:
- Bad: “You are flagged high risk.”
- Good: “Your bank may ask for an extra check (3D Secure).”

Use that wording only when the payment flow supports that possibility; internal
risk labels neither explain what to do nor establish that the bank rejected it.

## Public social feed posts

Product names and publication locales are source facts, not prose to translate.
Read the current canonical title roster and the target Page's language/region
contract; never infer a localized name from an English brand word or borrow a
neighbouring region's copy or offers. Unknown titles, Pages, language mappings
or unavailable source documents refuse publication rather than fall back to a
model's preferred spelling or voice.

A caption-only check misses comments and text inside a card. The maintained
publisher's executable gate must validate the complete send plan—body, every
supplied comment, OCR and media metadata—against that current source **before
any upload**. A request-builder helper tested in isolation is not enforcement:
the actual sender must call it, and an old direct-API prompt or script is not an
alternate publishing route. Use the company's maintained entrypoint recorded in
the product's operating docs; a missing gate is an implementation task, not a
reason to send directly.

❌ Translate a product's brand word into a pleasant synonym, reuse local-language
copy on a global Page, and approve a clean caption despite a wrong card title.
✅ Preserve the source's exact title (including spacing), select that Page's
approved locale, and pass the entire plan through the sender's gate. Ordinary
prose remains free to use the same word when it is not a product-name claim.

For Facebook, X and LinkedIn, never publish a text-only feed post (`media=[]`)
or raw `https://` or `m.me/` URLs in post bodies or comments. Use native media
uploads or native Page Share Cards; on Facebook upload photos through
`POST /{page_id}/photos`. Keep destination links in the native card or platform
CTA, not pasted into copy. Raw links can trigger `l.facebook.com` LinkShim
warnings or `OAuthException 1893063`; do not retry the rejected copy unchanged.

Before publishing a rendered social card (4:5 at 1080×1350, or 1:1), open the
**final PNG with `read_file`** and visually inspect it, not just its source or
render log. Require zero player names/IDs from world chat, sliced character
heads/icons, legacy floating badges, or orphan punctuation wraps. Use distinct
art per post, not the same image with a new caption. Fix and inspect the final
PNG again after any change.

After publishing, read the post through the API and verify
`attachments.data[0].media.image` has a non-empty image URL and positive width
and height (or the platform's equivalent native-media fields). A successful
publish response alone does not prove the image is attached. Inspect the live
post as well; record its identifier and media verification before reporting it
published.
