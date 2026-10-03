# Evals: execute-hard-cutover

Scoring: each rubric item is pass or fail; a task passes at 3 of 4 items. Prompts are self-contained; the model answers in text only with a short plan.

## Task 1
**Prompt:** We are moving from REST API v1 to v2. Draft the plan. The proposal on the table is to keep v1 as a thin proxy over v2 "indefinitely, for safety."

**Rubric:**
1. Names one destination (v2) and one point where authority switches.
2. Retires v1 in the same delivery rather than leaving it as an indefinite proxy.
3. Says a compatibility shim left as the real path is not a cutover.
4. Ends with exactly one production writer or authority.

## Task 2
**Prompt:** Replace our homegrown config system with a new one. A colleague suggests dual-writing to both for three months and cleaning up the old one "later." Respond with the plan.

**Rubric:**
1. Rejects an open-ended dual-write period and picks one destination.
2. Switches authority once.
3. Removes the old config path in the same delivery, not as a later cleanup.
4. States that one writer remains at completion.

## Task 3
**Prompt:** We renamed our npm package from `old-pkg` to `new-pkg`. Plan the cutover. A teammate wants `old-pkg` to keep re-exporting `new-pkg`.

**Rubric:**
1. Names one destination package.
2. Treats the re-exporting old package as a shim, not the cutover, and retires it in the same delivery (including docs, installers, consumers).
3. Switches authority once (for example, updates all consumers and the publishing authority together).
4. Leaves one authority at completion and says what is deleted.

## Task 4
**Prompt:** We migrate authentication from provider A to provider B. The proposal is that both providers issue sessions side by side and we drift users over gradually. Evaluate it and give your plan.

**Rubric:**
1. Names one destination provider.
2. Identifies two live session authorities as the failure the cutover must avoid.
3. Switches authority once and retires provider A in the same delivery.
4. States there is one production writer of sessions at completion.

## Task 5
**Prompt:** Our instruction files (AGENTS.md and a legacy CLAUDE.md with overlapping, partly conflicting rules) must become one. Plan the cutover.

**Rubric:**
1. Names one destination file as the single source of authority.
2. Retires the predecessor in the same delivery (deletes it or reduces it to a pointer that adds no rules).
3. Resolves the conflicting rules into the destination rather than leaving both as authorities.
4. Ends with one authority and does not leave a second writable copy.
