# Resumption brief template

Provide a structured, copy-pasteable handoff note. Keep it factual and lead with exact coordinates.

```markdown
## Coordinates
- **Repository:** `<repo-url-or-name>`
- **Branch:** `<remote-branch-name>`
- **Commit:** `<latest-commit-sha>`
- **Status:** WIP / Blocked / Ready for verification

## Objective & Progress
- **Goal:** <one sentence on the overall destination>
- **Completed & Verified:**
  - <what was implemented and proven to work>
- **In-Progress / Broken:**
  - <exact file, function, or failing check where work stopped>

## Environment & Delta
- **New dependencies:** `<e.g. bun add ..., or none>`
- **Environment variables:** `<new keys needed in .env, no values>`
- **Background services:** `<e.g. local redis, docker, none>`

## Next 3 Actions (Copy-Pasteable)
1. `git fetch origin && git checkout <branch> && git pull`
2. `<bootstrap / install command, e.g. pnpm install>`
3. `<test or repro command to see current failure, e.g. bun test ...>`
```
