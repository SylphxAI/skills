# Writing a Bug Report in This Repository

A good bug report lets a human or an AI agent find the cause and fix it without
asking follow-up questions. Follow this guide and use the template below.

## Before you write

1. Search existing issues/PRs for the same bug. If it already exists, add a
   comment instead of duplicating.
2. Confirm the bug is real and repeatable:
   - For humans: reproduce it at least once from a clean checkout/state.
   - For agents: reproduce it by running the code, not by reading it.
3. Identify the exact version: `git rev-parse HEAD`, branch, and any relevant
   dependency versions. A bug report without a revision cannot be verified.

## What every report must include

- **Title** — one sentence: what breaks, where, and (if known) since when.
- **Environment** — exact revision/commit SHA, branch, platform, and runtime
  versions. State clearly whether this is from source, CI, or a deployed
  artifact; do not mix them.
- **Steps to reproduce** — minimal, ordered, copy-pasteable commands or exact
  inputs. Assume the reader starts from a clean checkout.
- **Expected behavior** — what should happen, ideally with a reference
  (contract, test, or documented behavior).
- **Actual behavior** — what happened instead. Include the full error message,
  exit code, or observed output.
- **Evidence** — logs, stack traces, screenshots, or test output. Prefer raw
  output over summaries; trim unrelated noise but keep the failing part intact.
- **Impact** — what is affected, how badly, and any workaround that exists.
- **Possible cause (optional)** — only if you have evidence, not just a guess.
  Label it as a hypothesis, never as a fact.

## Template

```markdown
## Title
<One sentence: component + what breaks>

## Environment
- Commit SHA: <git rev-parse HEAD>
- Branch: <branch>
- Platform/runtime: <OS, versions, relevant dependencies>

## Steps to reproduce
1. <command or action>
2. <command or action>
3. <command or action>

## Expected behavior
<What should happen>

## Actual behavior
<What happens instead, with error output>

## Evidence
<Logs, stack traces, screenshots, test output>

## Impact
<Who/what is affected and how severely>
```

## Extra guidance for AI agents

- Report only what you observed; separate facts from inferences. Say
  "reproduced locally at SHA X" or "not yet reproduced", not "the code is
  broken".
- Gather evidence from the repo first: `git log`, `git blame`, tests, and docs.
  Do not speculate about causes you cannot back with evidence.
- If you cannot reproduce, say exactly what you tried and what the
  environment was, so the next agent can take over.
- Do not report unrelated problems you noticed along the way; file those
  separately.
- Never edit files, open PRs, or change behavior based on an unverified bug
  report — verify the postcondition of the fix first.

## Definition of done for a report

The reader can, from your report alone: check out the exact revision,
reproduce the failure, understand the expected behavior, and start fixing.
