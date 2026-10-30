---
name: clear-writing
description: "Use when drafting, rewriting, editing, translating, or localizing any text for clarity, natural tone, or persuasion: customer-facing announcements, release notes, blog posts, articles, marketing and landing-page copy, partner/studio proposal emails, UI microcopy, documentation explanations, translating/localizing support FAQs or UI copy into natural target-locale phrasing (such as Traditional Chinese or written Cantonese) without stiff machine-translationese, or concise internal team/executive updates. Aligns Audience × Purpose × Channel and eliminates AI slop using concrete Bad-vs-Good examples. Use customer-support for live customer support ticket handling."
---

# Clear Writing & Communication (`clear-writing`)

Good writing keeps the complexity on the writer's side and hands the reader simplicity. Weak writing dumps internal thought processes, hedges every sentence, and leans on generic AI clichés ("delve into", "not just X, but Y", hollow triads, and performative filler).

Identify the audience, purpose and channel; read the reference relevant to the task:

- **Naming concepts or replacing internal shorthand in any document, skill, or agent instruction** → Load [references/terminology.md](references/terminology.md)
- **Internal engineering, team rooms, status updates, and executive decisions** → Load [references/work-communication.md](references/work-communication.md)
- **Public articles, blog posts, launch announcements, marketing/landing-page copy, and UI microcopy** → Load [references/articles-and-copy.md](references/articles-and-copy.md)
- **Agent persona and conversational voice defaults** → Load [../self-challenge/references/agent-voice.md](../self-challenge/references/agent-voice.md)
- *(If handling an active customer/user support ticket with case state and remedies, load [`../customer-support/SKILL.md`](../customer-support/SKILL.md) as well.)*

---

## Step 1: Lock Audience × Purpose × Channel

Choose wording and structure from three inputs:

| Dimension | Question to Answer | How It Shapes the Text |
| :--- | :--- | :--- |
| **1. Audience (Who?)** | Who is reading this, what do they already know, and what do they care about? | Match their vocabulary and language/script (e.g., natural written Cantonese for HK internal/player chat, idiomatic Traditional Chinese for localized HK/TW support FAQs without stiff machine-translationese, crisp English for technical docs). Strip private/internal machinery irrelevant to the reader (such as internal ticket IDs or dev-machine paths in customer copy), while retaining exact public symbols, file paths, and technical terms when writing for developers, SDK docs, or PR reviews. |
| **2. Purpose (Why?)** | What single conclusion, decision, or action should the reader take in the first 5 seconds? | Put the answer, outcome, or hook in sentence 1. If the text is informational, lead with the result; if persuasive, lead with the reader's problem and concrete benefit; if a decision request, lead with the recommended choice. |
| **3. Channel (Where?)** | Is this a chat reply, a PR review, a landing page, a long-form article, or an incident notice? | Chat replies use natural prose (not heading/bullet walls). Reference docs use scannable tables. Articles use narrative momentum, varied sentence length, and concrete examples. |

---

## Step 2: Anti-Slop Defaults for Newly Authored Prose

Use the following defaults for newly authored or rewritten prose (while preserving direct quotations, faithful translations of source meaning, approved legal/partner text, and exact code/API identifiers):

1. **Bottom Line Up Front (BLUF) — Result Before Process**:
   - Lead with what changed, what was decided, or why the reader should care (or the narrative hook / empathetic acknowledgment when the genre calls for storytelling or customer care). Never open by narrating your internal steps (*"First I looked at X, then I considered Y..."*) or repeating the prompt back to the reader.
2. **Avoid AI Clichés and Formulaic Contrast in Your Own Prose**:
   - **Do not write**: *"It's not just X—it's Y"*, *"不是…而是…"*, *"In today's fast-paced world"*, *"delve into"*, *"testament to"*, *"game-changer"*, *"seamless"*, *"robust"*, *"empower"*, or *"Let's break this down"*.
   - Replace abstract adjectives (*"ultra-fast, enterprise-grade reliability"*) with verifiable facts and numbers (*"p95 response in 18 ms across 4 regions"*).
3. **Cut Throat-Clearing Openers and Performative Closers**:
   - **Never open with**: *"Great question!"*, *"Certainly! Here is a rewritten version..."*, *"I'd be happy to help with that."*
   - **Never close with**: *"In conclusion..."*, *"Overall, this ensures..."*, *"Let me know if you have any other questions!"*, or a summary paragraph that repeats what the reader just read.
4. **One Idea per Sentence, Concrete Verbs and Nouns**:
   - Prefer active voice (*"The gateway rejected the expired token"*) over passive evasion (*"An authentication failure was experienced during the request lifecycle"*).
   - Vary sentence length so the prose reads like a sharp human wrote it: pair a short punchy sentence with a longer explanatory one.

---

## Step 3: Side-by-Side Contrast Examples (The Calibration Anchor)

Use these concrete `❌ Bad` vs `✅ Good` pairs to calibrate tone and density before outputting text:

### Scenario A: Rewriting a Technical / Internal Explanation for Customers
- ❌ **Bad (Jargon-heavy + AI Slop)**:
  > *"We have implemented a robust, next-generation idempotency-key deduplication layer in our payment webhook processor! It's not just a bug fix—it's a seamless upgrade that ensures your checkout pipeline never experiences race-condition double-charges during upstream gateway retries."*
- ✅ **Good (Synthetic Example — Customer-Facing, Clear Outcome, Zero Private Jargon)**:
  > *"*Illustrative example:* If your connection drops while you're paying, clicking 'Pay' a second time will not submit a duplicate order, and your receipt page shows the current payment status right away."*

### Scenario B: Team / Executive Update or Blocker Report
- ❌ **Bad (Narrating Process + Burying the Lead)**:
  > *"I spent some time looking into why the build was failing on the PR. First I checked the workflow YAML and then I inspected the runner logs. It looks like the database test ran for 60 seconds and timed out. We should probably think about what to do next."*
- ✅ **Good (Synthetic Example — High-Signal Observation + Verified Fix)**:
  > *"*Illustrative example:* Job `10042` (`read 14:20:08Z`) timed out at `60.008s` in `checkout::tests::concurrent_reservation_lock` (`test 412/412`). **Observation**: `pg_stat_activity` showed 2 connections blocked on `ShareUpdateExclusiveLock` held by an unclosed fixture transaction (`pid 8812`). **Action**: Closed the fixture transaction in `tests/common/db.rs`; local run (`cargo nextest run -E 'test(concurrent_reservation_lock)'`, `read 14:22:15Z`) passed in `0.18s`."*

### Scenario C: Product Launch / Article Hook
- ❌ **Bad (Empty Marketing Fluff)**:
  > *"In today's rapidly evolving AI landscape, developers are constantly struggling with complex deployment pipelines. Introducing our revolutionary platform—designed from the ground up to empower teams to build, scale, and innovate effortlessly."*
- ✅ **Good (Synthetic Example — Concrete Hook + Specific Proof)**:
  > *"*Illustrative example:* `acme deploy` gives your app an HTTPS endpoint and passkey sign-in in one command."*

---

## Step 4: Self-Check Before Sending

Read your draft once out loud against four checks (preserving direct quotations, faithful translations, approved legal/partner text, and code/API identifiers):
1. **Did sentence 1 deliver the value, answer, or hook immediately?** (If sentence 1 can be deleted without losing meaning, delete it.)
2. **Are there any banned AI clichés, `"not X, but Y"` contrasts, or abstract buzzwords in newly authored prose?** (Replace every one with a concrete fact or plain verb.)
3. **Did any private internal machinery leak to a non-technical reader?** (Strip internal ticket IDs, dev-machine paths, and private table names from customer-facing copy; keep public symbols, API names, and repository paths in developer docs and code reviews.)
4. **Does the ending stop cleanly once the point is made?** (Delete trailing summaries and *"feel free to ask"* sign-offs.)
