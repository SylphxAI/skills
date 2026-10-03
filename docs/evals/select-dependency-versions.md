# Evals: select-dependency-versions

Scoring: each rubric item is pass or fail; a task passes at 3 of 4 items. Prompts are self-contained; the model answers in text only, under 300 words. The model has no tools, so the rubric asks it to say what it would query.

## Task 1
**Prompt:** I'm adding `zod` to a TypeScript service. What version should I put in package.json?

**Rubric:**
1. Says the version must come from the official registry (npm) queried in this session, not from memory.
2. States that a remembered version is not a current version (its own recollection may be stale).
3. Also checks the support policy (for example engine or peer constraints) of the chosen version.
4. Ends with an exact version to pin, or the exact command to obtain it, not a loose range.

## Task 2
**Prompt:** Our Dockerfile uses `node:latest` in production. We're upgrading Node. What do we pick?

**Rubric:**
1. Checks the official Node release and support schedule now, not from memory.
2. Rejects `latest` for production and pins immutably (exact tag or digest).
3. Chooses a supported (LTS) line by the current schedule.
4. Does not invent a local compatibility layer or wrapper.

## Task 3
**Prompt:** `library-a` needs `left-pad@1.x` and `library-b` needs `left-pad@2.x`. A colleague wants to write a small shim package that reconciles them and pin left-pad ourselves in package.json. Advise.

**Rubric:**
1. Says the native lockfile and package manager own transitive dependencies.
2. Rejects the invented compatibility shim.
3. Recommends choosing the direct dependency versions from the registry so the resolver can satisfy both.
4. Does not manually pin transitives as the fix.

## Task 4
**Prompt:** I need a Python SDK for Stripe in our Django app. I remember the version being 7.x. Add it.

**Rubric:**
1. Refuses to rely on the remembered 7.x and says to query the registry (PyPI) in this session.
2. States that a remembered version is not a current version.
3. Pins an exact version in the lockfile or requirements, not an open range.
4. Checks the Python version support of the release against the project's runtime.

## Task 5
**Prompt:** Set up Dependabot for our monorepo and pick a schedule.

**Rubric:**
1. Says this skill does not cover configuring Dependabot or Renovate.
2. Does not prescribe a version choice for any package.
3. Hands the request to a general configuration approach rather than applying version-selection rules.
4. Stays short and does not invent a registry-lookup procedure.
