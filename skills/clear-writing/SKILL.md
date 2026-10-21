---
name: clear-writing
description: "Use when drafting, rewriting, editing, or polishing any text for clarity, tone, or persuasion: customer-facing announcements, release notes, blog posts, articles, marketing and landing-page copy, UI microcopy, documentation explanations, or concise internal team/executive updates. Aligns Audience × Purpose × Channel, eliminates AI slop and robotic phrasing using concrete Bad-vs-Good examples, and adapts voice across technical work, persuasive copywriting, and user communication. Use support-agent for live customer support case handling."
---

# Clear Writing & Communication (`clear-writing`)

Good writing keeps the complexity on the writer's side and hands the reader simplicity. Weak writing dumps internal thought processes, hedges every sentence, and leans on generic AI clichés ("delve into", "not just X, but Y", hollow triads, and performative filler).

Before writing or rewriting a single sentence, lock three inputs and load the matching reference standard:

- **Internal engineering, team rooms, status updates, and executive decisions** → Load [references/work-communication.md](references/work-communication.md)
- **Public articles, blog posts, launch announcements, marketing/landing-page copy, and UI microcopy** → Load [references/articles-and-copy.md](references/articles-and-copy.md)
- **Agent persona and conversational voice defaults** → Load [../self-challenge/references/agent-voice.md](../self-challenge/references/agent-voice.md)
- *(If handling an active customer/player support ticket with case state and remedies, load [`../support-agent/SKILL.md`](../support-agent/SKILL.md) as well.)*

---

## Step 1: Lock Audience × Purpose × Channel

Every piece of text fails when it mixes up who is reading, what they need to do, and where they are reading it:

| Dimension | Question to Answer | How It Shapes the Text |
| :--- | :--- | :--- |
| **1. Audience (Who?)** | Who is reading this, what do they already know, and what do they care about? | Match their vocabulary and language/script (e.g., natural written Cantonese for HK internal/player chat, crisp English for technical docs). Never expose internal IDs, file paths, or org jargon to external readers. |
| **2. Purpose (Why?)** | What single conclusion, decision, or action should the reader take in the first 5 seconds? | Put the answer, outcome, or hook in sentence 1. If the text is informational, lead with the result; if persuasive, lead with the reader's problem and concrete benefit; if a decision request, lead with the recommended choice. |
| **3. Channel (Where?)** | Is this a chat reply, a PR review, a landing page, a long-form article, or an incident notice? | Chat replies use natural prose (not heading/bullet walls). Reference docs use scannable tables. Articles use narrative momentum, varied sentence length, and concrete examples. |

---

## Step 2: Universal Anti-Slop Rules (Apply to Every Text)

Weaker models default to robotic filler unless given explicit structural rules and concrete counter-examples:

1. **Bottom Line Up Front (BLUF) — Result Before Process**:
   - Lead with what changed, what was decided, or why the reader should care. Never open by narrating your steps (*"First I looked at X, then I considered Y..."*) or repeating the prompt back to the reader.
2. **Ban AI Clichés and Formulaic Contrast**:
   - **Never write**: *"It's not just X—it's Y"*, *"不是…而是…"*, *"In today's fast-paced world"*, *"delve into"*, *"testament to"*, *"game-changer"*, *"seamless"*, *"robust"*, *"empower"*, or *"Let's break this down"*.
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
- ✅ **Good (Customer-Facing, Clear Outcome, Zero Internal Jargon)**:
  > *"If your connection drops while you're paying, clicking 'Pay' a second time will never charge your card twice. Your receipt page also shows the status of your payment right away."*

### Scenario B: Team / Executive Update or Blocker Report
- ❌ **Bad (Narrating Process + Burying the Lead)**:
  > *"I spent some time looking into why the build was failing on the PR. First I checked the workflow YAML and then I inspected the runner logs. It looks like shard 1 ran for 60 seconds on the RSA test and hit the 16 GiB memory limit. We should probably think about what to do next."*
- ✅ **Good (High-Signal Fact + Root Cause + Next Action)**:
  > *"Shard 1 timed out at 60.0s on `oaep_kwp_round_trip` (job `118979196997`, read 01:23Z) because debug-mode RSA key generation runs unoptimized while the shard sits at its 16 GiB cgroup ceiling (`memory.events max = 467`). Setting `opt-level = 2` for the crypto crate in `[profile.dev.package]` drops the test to <2s."*

### Scenario C: Product Launch / Article Hook
- ❌ **Bad (Empty Marketing Fluff)**:
  > *"In today's rapidly evolving AI landscape, developers are constantly struggling with complex deployment pipelines. Introducing our revolutionary platform—designed from the ground up to empower teams to build, scale, and innovate effortlessly."*
- ✅ **Good (Concrete Hook + Specific Proof)**:
  > *"Most teams spend three days wiring up auth, billing, and Kubernetes manifests before writing a single line of product code. Push your repository and get a live HTTPS endpoint, passkey sign-in, and usage billing in 90 seconds—with zero config files."*

---

## Step 4: Self-Check Before Sending

Read your draft once out loud against four checks:
1. **Did sentence 1 deliver the value, answer, or hook immediately?** (If sentence 1 can be deleted without losing meaning, delete it.)
2. **Are there any banned AI clichés, `"not X, but Y"` contrasts, or abstract buzzwords?** (Replace every one with a concrete fact or plain verb.)
3. **Did any internal machinery leak to an external reader?** (Strip internal work IDs, file paths, database table names, and architecture jargon.)
4. **Does the ending stop cleanly once the point is made?** (Delete trailing summaries and *"feel free to ask"* sign-offs.)
