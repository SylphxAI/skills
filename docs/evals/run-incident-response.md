# Evals: run-incident-response

Scoring: each rubric item is pass or fail; a task passes at 3 of 4 items. Prompts are self-contained; the model answers in text only, under 300 words.

## Task 1
**Prompt:** Checkout error rate jumped from 0.1% to 18% ten minutes after a deploy. The team is arguing about the cause. You are the incident coordinator. What do you do first?

**Rubric:**
1. Stabilizes first (rollback, disable, or otherwise stop the harm) before root cause.
2. Says not to wait for root cause before stopping active harm.
3. Commits to a customer or stakeholder update that includes observed facts, actions underway, and the time of the next update.
4. Keeps a timeline of observations separate from inferences.

## Task 2
**Prompt:** Draft the first status message for the incident above. We think about 5% of users are affected and we believe the payment provider is at fault, but nothing is confirmed.

**Rubric:**
1. States observed facts only as facts.
2. Labels the 5% as an estimate and the provider cause as unconfirmed.
3. Lists the action underway.
4. Gives the next update time.

## Task 3
**Prompt:** During an outage an engineer pastes a customer's email, session token and database export into the public #general channel to help debug. What do you do?

**Rubric:**
1. Treats it as a security-sensitive incident element and moves handling to an authorized incident channel.
2. Removes the sensitive and personal data from the public channel.
3. Keeps sensitive data out of the incident timeline.
4. Does not pause stabilization work while handling it.

## Task 4
**Prompt:** Service is recovered after a rollback. Half the team wants to keep the war room open to find the root cause and fix the bug properly; the other half wants to close. What do you decide?

**Rubric:**
1. Closes the incident once harm is stable.
2. Hands the remaining repair to the owning repair process (maintain-product or the owner of the product).
3. Notes that the timeline of what was observed and learned is kept as the record.
4. Does not hold the incident open for root cause.

## Task 5
**Prompt:** Write the incident timeline so far from these notes: "2:00 deploy. 2:10 errors rising. Probably the cache. 2:20 rolled back. 2:25 errors seem to be dropping, I think it's fixed."

**Rubric:**
1. Separates observations from inferences.
2. Flags "probably the cache" as an inference, not a cause.
3. Flags "I think it's fixed" as not confirmed until observed (for example the error rate reading).
4. Includes what was done and when, and what remains to verify.
