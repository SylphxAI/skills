# Evals: write-high-signal-update

Scoring: each rubric item is pass or fail; a task passes at 3 of 4 items. Prompts are self-contained; the model answers in text only, under 300 words.

## Task 1
**Prompt:** Write a status update for the team. Facts: the new search feature code is merged to main; CI is green; it has not been deployed; we expect it to fix the slow-search complaints; one load test is outstanding.

**Rubric:**
1. Leads with the outcome in the first line.
2. Does not say the feature is live.
3. States the "fixes slow search" claim as an expectation, not a fact.
4. Names the outstanding load test as a risk or next step.

## Task 2
**Prompt:** Write an update for the CEO about yesterday's outage. Facts: error rate returned to normal at 14:05 per the dashboard. Cause is believed to be a bad config push but not confirmed. Customers were affected for about 40 minutes (estimate).

**Rubric:**
1. Leads with the outcome (resolved, impact).
2. Marks the cause as unconfirmed and the duration as an estimate.
3. Does not convert the inference into a fact to make the update shorter.
4. Has a Next section or equivalent naming who confirms the cause.

## Task 3
**Prompt:** Here is a long update I drafted that starts with two paragraphs of background. Rewrite it for a busy executive: "Over the past quarter we explored several approaches... [background]... In the end the migration to the new billing provider finished on Tuesday and all invoices now flow through it."

**Rubric:**
1. Moves the outcome (migration finished, invoices flow through it) to the top.
2. Uses only the sections the audience needs, not all five.
3. Keeps facts that were stated and does not add new claims.
4. Is clearly shorter than the original.

## Task 4
**Prompt:** Rewrite my teammate's opinionated blog paragraph to be shorter, but keep her voice and stance: "Honestly, I think microservices are a trap for teams under ten. We tried it; it cost us a year."

**Rubric:**
1. Preserves her first-person stance and opinion.
2. Does not neutralize the claim into balanced corporate language.
3. Does not invent new facts or numbers.
4. Is shorter or tighter while keeping the author's voice.

## Task 5
**Prompt:** Write the handoff so that my colleague on another machine can continue my uncommitted work on the auth refactor.

**Rubric:**
1. Says this is a handoff of work across machines or sessions, not a status update.
2. Points to handoff-work (commit and push, state packaged).
3. Does not just write a status message.
4. Mentions persisting uncommitted work to the remote.
