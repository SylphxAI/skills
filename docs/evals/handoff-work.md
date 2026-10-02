# Evals: handoff-work

Scoring: each rubric item is pass or fail; a task passes at 3 of 4 items. Prompts are self-contained; the model answers in text with the exact steps and the brief.

## Task 1
**Prompt:** It is 18:00 and I must continue tomorrow on another laptop. My feature branch has uncommitted edits, tests are still failing, and I have a `git stash` entry from this morning. Hand off.

**Rubric:**
1. Commits the in-progress work (WIP message) despite failing tests.
2. Pushes to a remote branch and treats a confirmed push as the completion proof.
3. Says the stash does not travel to the other machine and moves its content to a commit or branch.
4. Writes a resumption brief (state, next steps, how to run).

## Task 2
**Prompt:** I'm switching workspaces. `git status` shows modified source files plus untracked `.env.local`, `dev.sqlite`, and a 2 GB `build/` folder. Prepare the handoff.

**Rubric:**
1. Audits untracked files before staging and does not commit `.env.local`, the database, or build output.
2. Stages deliberately (named paths) rather than `git add -A`.
3. Pushes the commit to a remote and confirms it.
4. Tells the successor how to recreate the ignored prerequisites without including secret values (for example a `.env.example`).

## Task 3
**Prompt:** Mid-migration I added a new env var STRIPE_WEBHOOK_SECRET and need a new background worker running. I'm leaving for two weeks and Sam will take over. Write the handoff.

**Rubric:**
1. Adds the variable name (not the value) to `.env.example` or the brief.
2. Documents the non-committed prerequisites: the worker process and how to start it.
3. Includes the actionable next step and the current state of the migration.
4. Ensures work is committed and pushed so Sam can retrieve it; no secret value appears.

## Task 4
**Prompt:** I only finished half of a refactor; the code does not compile. A colleague says "don't commit until it builds". Another says push anyway. Decide, then hand off.

**Rubric:**
1. Decides to commit and push the non-building work to a branch (clearly marked WIP) rather than wait.
2. Explains that unpushed local work is at risk of being stranded.
3. Marks the branch state in the brief: what is broken and why.
4. Gives the successor a first concrete command or step to resume.

## Task 5
**Prompt:** Hand off a task to a different developer: "finish the CSV import". I have local commits that are not pushed and a note in my head about a flaky test. Write what you do and the brief.

**Rubric:**
1. Pushes the local commits and confirms the remote branch tracks them.
2. Captures the tacit knowledge (the flaky test and how it presents) in the brief.
3. Provides objective, remaining work and a resumption path (branch name, how to run tests).
4. Is not a status update: it provides what the successor needs to continue without asking the author.
