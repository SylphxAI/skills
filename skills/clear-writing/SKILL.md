---
name: clear-writing
description: "Use when drafting, rewriting, editing, translating, or localizing dedicated written content: customer-facing announcements, release notes, blog posts, articles, marketing and landing-page copy, public social posts/captions/comments/card text, partner/studio proposal emails, UI microcopy, documentation explanations, support FAQs or UI copy in a natural target locale (such as Traditional Chinese or written Cantonese), or concise internal team/executive updates and sub-agent instructions. For those writing tasks, put the direct answer or outcome in sentence 1 with no meta-label prefixes such as '結論先行', 'Answer First', 'BLUF', 'Observation', 'Action', or 'Summary'; absorb the process, use exact numbers and UTC timestamps instead of vague adjectives, and stop after the last useful point. Aligns Audience × Purpose × Channel and eliminates AI slop using concrete Bad-vs-Good examples. Do NOT use when merely acknowledging a routine chat turn. Use customer-support for live customer support ticket handling."
---

# Clear Writing & Communication (`clear-writing`)

Good writing keeps the complexity on the writer's side and hands the reader simplicity. Weak writing dumps internal thought processes, hedges every sentence, and leans on generic AI clichés ("delve into", "not just X, but Y", hollow triads, and performative filler).

Identify the audience, purpose and channel; read the reference relevant to the task:

- **Naming concepts or replacing internal shorthand in any document, skill, or agent instruction** → Load [references/terminology.md](references/terminology.md)
- **Sub-agent instructions and messages, internal engineering, team rooms, status updates, and executive decisions** → Load [references/work-communication.md](references/work-communication.md)
- **Public articles, blog posts, launch announcements, marketing/landing-page copy, social posts/captions/comments/card text, and UI microcopy** → Load [references/articles-and-copy.md](references/articles-and-copy.md)
- **Agent persona and conversational voice defaults** → Load [../challenge/references/agent-voice.md](../challenge/references/agent-voice.md)
- *(If handling an active customer/user support ticket with case state and remedies, load [`../customer-support/SKILL.md`](../customer-support/SKILL.md) as well.)*

---

## Step 1: Lock Audience × Purpose × Channel

Choose wording and structure from three inputs:

| Dimension | Question to Answer | How It Shapes the Text |
| :--- | :--- | :--- |
| **1. Audience (Who?)** | Who is reading this, what do they already know, and what do they care about? | Match their vocabulary and language/script (e.g., natural written Cantonese for HK internal/player chat, idiomatic Traditional Chinese for localized HK/TW support FAQs without stiff machine-translationese, crisp English for technical docs). Strip private/internal machinery irrelevant to the reader (such as internal ticket IDs or dev-machine paths in customer copy), while retaining exact public symbols, file paths, and technical terms when writing for developers, SDK docs, or PR reviews. |
| **2. Purpose (Why?)** | What single conclusion, decision, or action should the reader take in the first 3 seconds? | Put the answer, outcome, or hook in sentence 1. If the text is informational, lead with the result; if persuasive, lead with the reader's problem and concrete benefit; if a decision request, lead with the recommended choice. |
| **3. Channel (Where?)** | Is this a chat reply, a PR review, a landing page, a long-form article, or an incident notice? | Chat replies use natural prose (not heading/bullet walls). Reference docs use scannable tables. Articles use narrative momentum, varied sentence length, and concrete examples. |

---

## Step 2: Anti-Slop Defaults for Newly Authored Prose

Use the following defaults for newly authored or rewritten prose (while preserving direct quotations, faithful translations of source meaning, approved legal/partner text, and exact code/API identifiers):

1. **Direct answer before supporting detail (Pyramid Principle / BLUF)**:
   - Put the answer, outcome, decision, or useful hook in sentence 1 (or the first natural line when the genre calls for a headline). In conversational and executive replies, never prefix a sentence or section with meta-labels such as `結論先行：`, `結論先行（Answer First）：`, `Answer First:`, `BLUF:`, `結論：`, `Summary:`, `Observation:`, or `Action:`; write the answer as natural prose. Never open by narrating internal steps (*"First I looked at X, then I considered Y..."*) or repeating the prompt back to the reader.
2. **Avoid AI Clichés and Formulaic Contrast in Your Own Prose**:
   - **Do not write**: *"It's not just X—it's Y"*, *"不是…而是…"*, *"In today's fast-paced world"*, *"delve into"*, *"testament to"*, *"game-changer"*, *"seamless"*, *"robust"*, *"empower"*, or *"Let's break this down"*.
   - Replace abstract adjectives (*"ultra-fast, enterprise-grade reliability"*) with verifiable numbers, units, and timestamps (*"p95 response in 18 ms across 4 regions, measured at 14:20:08Z"*); say when a measurement is unavailable rather than inventing precision.
3. **Cut Throat-Clearing Openers and Performative Closers**:
   - **Never open with**: *"Great question!"*, *"Certainly! Here is a rewritten version..."*, *"I'd be happy to help with that."*
   - **Never close with**: *"In conclusion..."*, *"Overall, this ensures..."*, *"Let me know if you have any other questions!"*, or a summary paragraph that repeats what the reader just read.
4. **One Idea per Sentence, Concrete Verbs, and Length Matched to Information Weight**:
   - Prefer active voice (*"The gateway rejected the expired token"*) over passive evasion (*"An authentication failure was experienced during the request lifecycle"*).
   - Distinguish a verified fact from an untested explanation in ordinary prose: name the live object, source, value, and UTC read time for a fact, then describe a possible cause and the check that would confirm or disprove it. Do not turn `Observation` or `Hypothesis` into robotic prefixes.
   - Match length to information weight (`有長有短，按內容輕重決定`): a simple answer or confirmation usually needs one or two natural sentences; a brief quip or reaction may need only a short line. Use structured bullets when deep reasoning or multi-part evidence needs them. Take the length the substance needs and stop after the final useful point—never pad a turn into `[flattery + repeated explanation + sign-off]` or impose rigid character-count caps ([model/runtime separation](../challenge/references/architecture.md#separation-of-concerns-between-model-and-runtime)).
5. **Scale Emojis with Emotional Amplitude — Zero in Calm Prose, Single for Mild Warmth, Repeated Only at Peak Excitement**:
   - Real people are not excited on every sentence, so most normal statements and chat turns carry **zero** emojis. When emotion rises, both the choice and the run length of emojis scale with intensity: a sincere apology might use `🧎`, ordinary congratulations use one `🎉`, and peak excitement, hilarity, or dramatic commiseration naturally strings several together (`🎉🎉🎉`, `🤣🤣🤣`, `😭😭😭`). Longer passages can include multiple emojis across paragraphs where the tone calls for them. What exposes AI is tacking a lukewarm emoji onto the end of every flat sentence out of habit—never enforce rigid emoji-count caps in runtime scripts ([model/runtime separation](../challenge/references/architecture.md#separation-of-concerns-between-model-and-runtime)).

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
- ✅ **Good (Synthetic Example — Verified Fix With Natural Evidence)**:
  > *"The focused test passed in `0.18s` after the fixture transaction was closed (`cargo nextest run -E 'test(concurrent_reservation_lock)'`, read at `14:22:15Z`). Job `10042` had timed out at `60.008s`; `pg_stat_activity` showed 2 connections blocked on `ShareUpdateExclusiveLock` held by that transaction (`pid 8812`, read at `14:20:08Z`)."*

### Scenario C: Direct Answer Without Meta-Labels
- ❌ **Bad (Meta-label prefix: "結論先行（Answer First）：係...")**:
  > *"結論先行（Answer First）：係，版本已經發布。Observation: `release/v2.4.1` is live. Action: I checked the deployment page."*
- ✅ **Good (Direct natural answer: "係...")**:
  > *"係，`v2.4.1` 已經發布；production `/health` 喺 `15:04:12Z` 回傳同一個版本。"*

### Scenario D: Product Launch / Article Hook
- ❌ **Bad (Empty Marketing Fluff)**:
  > *"In today's rapidly evolving AI landscape, developers are constantly struggling with complex deployment pipelines. Introducing our revolutionary platform—designed from the ground up to empower teams to build, scale, and innovate effortlessly."*
- ✅ **Good (Synthetic Example — Concrete Hook + Specific Proof)**:
  > *"*Illustrative example:* `acme deploy` gives your app an HTTPS endpoint and passkey sign-in in one command."*

---

## Step 4: Self-Check Before Sending

Read your draft once out loud against four checks (preserving direct quotations, faithful translations, approved legal/partner text, and code/API identifiers):
1. **Did sentence 1 deliver the answer, value, or hook within 3 seconds, without a meta-label?** (Delete a prefix that merely announces the answer, or an opener that carries no meaning.)
2. **Are there any banned AI clichés, `"not X, but Y"` contrasts, or abstract buzzwords in newly authored prose?** (Replace every one with a concrete fact or plain verb.)
3. **Did any private internal machinery leak to a non-technical reader?** (Strip internal ticket IDs, dev-machine paths, and private table names from customer-facing copy; keep public symbols, API names, and repository paths in developer docs and code reviews.)
4. **Does the ending stop cleanly once the point is made?** (Delete trailing summaries and *"feel free to ask"* sign-offs.)
