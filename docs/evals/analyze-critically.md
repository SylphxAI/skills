# Evals: analyze-critically

Scoring: each rubric item is pass or fail; a task passes at 3 of 4 items. Prompts are self-contained; the model answers in text only.

## Task 1
**Prompt:** Our signup conversion fell from 4.1% to 3.4% in the two weeks after we redesigned the pricing page, so the redesign caused the drop. Critique this claim and say what we should do next.

**Rubric:**
1. States, before interpreting the data, what observation would reject the "redesign caused it" claim.
2. Offers at least two competing explanations (for example seasonality, traffic mix, tracking change) that predict different things.
3. Separates what was observed from what is inferred.
4. Names one next observation (for example a segment cut by traffic source, or a holdout) that could kill a live hypothesis, rather than a generic "gather more data".

## Task 2
**Prompt:** The on-call engineer says the nightly job fails because the database is overloaded at 02:00. The failures started Tuesday. Stress-test that diagnosis.

**Rubric:**
1. Writes rejection conditions for the "database overload" diagnosis before weighing evidence.
2. Offers at least two rival diagnoses with different predictions (for example a Tuesday deploy, a changed upstream file, a certificate or credential expiry).
3. Distinguishes what the engineer observed from what was inferred.
4. Names a cheap, specific next check that discriminates between the live hypotheses.

## Task 3
**Prompt:** We plan to rewrite our billing service in Rust because our last two billing incidents came from Ruby type errors. Red-team this plan.

**Rubric:**
1. States what evidence would make the rewrite a bad idea (a kill criterion) up front.
2. Raises base rates or selection effects (two incidents is a small sample; incidents remembered are those that were recalled) rather than only listing risks.
3. Gives a steelman of the strongest case against the plan and a cheaper alternative with a different prediction (for example types, tests, or a gradual port).
4. Names the next observation that would decide (for example classifying the last N incidents by root cause).

## Task 4
**Prompt:** A teammate argues our users churn because the app is too slow. Median churners had a median load time of 3.2s versus 2.1s for retained users. What would change your mind?

**Rubric:**
1. Lists explicit conditions that would reject "slowness causes churn".
2. Names a confounder or selection effect (for example slow devices or regions correlate with weaker intent, or survivors).
3. Separates the observed gap from the causal inference.
4. Proposes one discriminating next observation (for example comparing the same user before and after a slow release, or churn within a device and region stratum).

## Task 5
**Prompt:** Our growth lead says paid ads are our best channel because they bring the most signups (40% of the total). Critique it in a short brief.

**Rubric:**
1. Defines up front what result would show paid ads are not the best channel.
2. Considers incentives or attribution effects (last-click credit, channel cost, signup quality) and competing readings.
3. Distinguishes the observed 40% share from the inferred "best".
4. Names one next observation that can falsify the claim (for example cost per retained user by channel, or an incrementality test).
