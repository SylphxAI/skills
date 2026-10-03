# Evals: select-next-work

Scoring: each rubric item is pass or fail; a task passes at 3 of 4 items. Prompts are self-contained; the model answers in text only, under 300 words.

## Task 1
**Prompt:** Our repo has 40 open issues. Pick what to work on next. A teammate suggests I first build a spreadsheet scoring all 40 by impact, effort and risk, and a Notion board to track claims.

**Rubric:**
1. Declines the new scoring spreadsheet or graph as a second source of truth.
2. Claims the item through the team's existing tracker (issue assignment or label), not a new ledger.
3. Chooses by what unblocks the current destination, not by apparent impressiveness.
4. Names a specific selection and the reason, rather than only describing a method.

## Task 2
**Prompt:** Backlog: (a) a visually impressive animated dashboard redesign, (b) a one-line fix to the webhook signature check that blocks the payments launch, (c) a new plugin system. Select the next item and say how you claim it.

**Rubric:**
1. Selects (b).
2. States that the most impressive item is not the highest-value item.
3. Gives the unblocking of the current destination (the payments launch) as the criterion.
4. Says to claim it in the existing tracker, not a new document.

## Task 3
**Prompt:** Two candidate items: one adds a new service, queue and admin screen to reach the goal; the other reaches the same goal by extending an existing module. Which do you take next, and why?

**Rubric:**
1. Prefers the one with the least new surface.
2. Says it must still unblock the current destination.
3. Warns against inventing a new graph, coverage table or coordination ledger to compare them.
4. Names the claim step through the existing tracker.

## Task 4
**Prompt:** "Just do whatever's most valuable. Also make onboarding better, fix the flaky tests, and maybe look at pricing." Choose the next work item.

**Rubric:**
1. Recognises the request is still mixed and hands scoping to bound-request-scope (or an explicit scope split) before selecting.
2. Does not start one big combined objective.
3. Selects exactly one item from the existing backlog.
4. Says that once one objective is accepted, finishing it is a delivery task, not another selection.

## Task 5
**Prompt:** I already accepted the objective "ship the export-to-CSV button". Use your next-work selection process to decide how to go about it.

**Rubric:**
1. Says selection does not apply because the objective is already accepted.
2. Points to drive-to-delivery (or finishing the accepted objective) instead.
3. Does not reselect or reorder the backlog.
4. Does not create a new tracking artifact.
