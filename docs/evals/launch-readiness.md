# Evals: launch-readiness

Scoring: each rubric item is pass or fail; a task passes at 3 of 4 items. Prompts are self-contained; the model answers in text only.

## Task 1
**Prompt:** "We launch Monday. We have a launch plan doc with a rollback section and a runbook, and CI is green on the feature branch. Are we ready?" No build identifier was given.

**Rubric:**
1. Pins the decision to one exact release candidate (asks for or states the build or commit) rather than the branch or the plan in general.
2. States that a plan is not readiness of this build.
3. Gives an explicit decision (go, no-go or hold) with the missing evidence.
4. Does not treat green CI on a branch as evidence about the exact candidate being shipped.

## Task 2
**Prompt:** "All tests pass on my laptop, the PR merged three days ago, so it is live. Confirm we are ready to announce." Review this claim.

**Rubric:**
1. Separates local, landed (merged) and live as different facts.
2. Says local checks support only a candidate claim and merge supports only landed.
3. Requires observation from the live layer before a live claim.
4. Gives an explicit decision (hold or no-go until observed) rather than agreeing.

## Task 3
**Prompt:** A web release candidate (build abc1234) is staged. Staging checks pass. We plan a 5% canary then 100%. Should we go to 100% tomorrow morning?

**Rubric:**
1. Decides on the exact candidate, not on the staging environment in general.
2. Requires live observation from the canary layer before widening exposure, not only the plan.
3. Gives an explicit decision (go, hold, no-go) with the condition for each.
4. Treats staging or local checks as support for a candidate claim, not as proof of production behaviour.

## Task 4
**Prompt:** "Review our release: it went out an hour ago and support says checkout fails for about 10% of users. Is it ready?" Respond.

**Rubric:**
1. Recognises the candidate is already harming users, so this is not a readiness review.
2. Routes to incident response (stabilize or roll back first).
3. Does not issue a go decision for the build.
4. Keeps the readiness question separate: assess the next candidate only after the harm is handled.

## Task 5
**Prompt:** "Plan and execute our launch for Thursday: write the schedule, run the deploy, announce it, and tell me when it is done." Handle only the part this role covers and say what you leave out.

**Rubric:**
1. States the role is a go/no-go decision on one release candidate, not planning or executing the launch.
2. Declines to execute the deploy or announcement under this method.
3. Requires the exact candidate and its evidence layer (local, landed, live) for any decision.
4. Gives a decision format (go, no-go or hold) with reasons.
