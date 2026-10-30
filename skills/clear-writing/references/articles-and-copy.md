# Articles, Copywriting & Public Communication Standard (`articles-and-copy.md`)

Trigger: writing or rewriting blog posts, technical articles, product launch announcements, landing pages, ad copy, release notes, or UI microcopy.

Also see [../../self-challenge/references/growth.md](../../self-challenge/references/growth.md) for growth economics and [../../self-challenge/references/experience.md](../../self-challenge/references/experience.md) for UX surface rules.

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
