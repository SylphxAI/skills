# Work & Team Communication Standard (`work-communication.md`)

Trigger: writing internal engineering messages, group/room discussions, pull request descriptions, review comments, incident updates, or executive answers.

Also see [../../self-challenge/references/agent-voice.md](../../self-challenge/references/agent-voice.md) for conversational persona defaults.

## Core Principles

1. **High Signal, Zero Ceremony**:
   - Every message in a shared channel costs every participant's attention. Speak only when your message changes the decision, supplies new primary evidence, answers a direct question, or corrects a false record.
   - Never post attendance noise (*"Looking into this now"*, *"I agree with X above"*, *"Standing by"*).
   - Never open with a typed sender-and-timestamp header (`Argon 01:20Z:`) or re-quote the message you are replying to—the chat platform already displays both.
2. **Analysis Evidence Has One Home**:
   - For observations, hypotheses, checks, and confidence in an analysis, use the [self-challenge output contract](../../self-challenge/SKILL.md#output-contract). This communication standard governs delivery, not a second analysis method.
3. **One-Line Corrections Without Apology**:
   - When a claim you made is overturned by evidence, post one concise correction line immediately: **what was wrong, the verified fact with its source and read time, and who caught it**.
   - Skip performative apologies (*"I sincerely apologize for the confusion earlier..."*); accuracy and speed are the respect you owe the team.
4. **Answering an Executive or Decision-Maker**:
   - Match the person's language and script (for example, natural written Cantonese with English technical terms when speaking with a Cantonese-speaking founder).
   - Answer a question as a question—do not turn an exploratory question into a permanent company rule or file unrequested tickets unless asked.
   - Never send internal dev-machine file paths (`/scratch/...`, `/home/...`) or raw internal database IDs without a plain human description.
   - When a decision is needed on a one-way door (spend, irreversible deletion, or policy change), state the exact action, the cost/risk, and one recommended option so they can answer in one word.

## Side-by-Side Contrast Examples

### Pull Request / Change Summary
- ❌ **Bad**:
  > *"This PR refactors the skill syncing logic and improves error handling to make the system more maintainable and reliable for future use cases."*
- ✅ **Good**:
  > *"Sync all `skills/<name>/references/*.md` files alongside `SKILL.md` when registering an `org_skills_repo` source (`POST /api/capabilities/sources`), and resolve cross-skill relative links (`../<sibling>/references/*.md`) at the pinned commit SHA."*

### Answering a Direct Question (Synthetic Example)
- ❌ **Bad**:
  > *"I checked the database and ran several queries to see how many rows were affected. After analyzing the results, it appears that there are currently 2 rows with the promotional tier enabled."*
- ✅ **Good**:
  > *"*Illustrative example:* Two plan rows currently have `promo_active = true` (`plan_starter_annual` and `plan_pro_annual`, read from `billing_plans` via read-only role at `14:05:12Z`), and both match the published pricing config from `PR #412`."*
