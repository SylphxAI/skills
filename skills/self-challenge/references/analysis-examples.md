# Analysis Contract Examples

Trigger: comparing owners' analyses or checking the shared output structure. Use the [output contract](../SKILL.md#output-contract) for the rules; this file supplies examples, not another rule set.

All objects, times, reads, and owners below are **synthetic fixtures**, not historical evidence. No past owners' analyses were supplied for these examples.

## Same Question, Different Coverage

Question for both owners: **Did release R cause the checkout timeout, and should we roll it back?**

Fixture evidence packet:
- **S1** — `request-log/q17`, read `2030-01-01T10:10:00Z`: checkout timed out at `10:05Z`.
- **S2** — `release/R`, read `2030-01-01T10:11:00Z`: R started serving at `10:00Z`.
- **S3** — `request-log/q09`, read `2030-01-01T10:12:00Z`: the same timeout signature occurred at `09:50Z`.
- **S4** — `checkout/handler.py:42-55` at revision R, read `2030-01-01T10:13:00Z`: the timeout path was unchanged from the prior revision.

Owner A has S1 and S2 only; owner B has the full packet. Neither has rate data or a controlled rollback test. The entries below describe fixture reads only.

### Owner A

#### 1. Question & boundary
Did R cause checkout timeouts? Target: checkout runtime release; a rollback changes serving code, not customer data or unrelated services.

#### 2. Sources read
S1 and S2, with the object IDs, read times, and values in the fixture packet. S3 and S4 are unavailable to this owner; Step 0 architecture/stack references have not been read in this fixture, so domain review is incomplete.

#### 3. Observations
One checkout timeout occurred after R began serving (S1, S2). This establishes sequence, not causality.

#### 4. Hypotheses & disconfirming checks
Hypothesis: R introduced the timeout failure mode. Falsifier: the same signature predates R. Historical-log check: **not run — earlier logs unavailable**. Hypothesis remains unresolved.

#### 5. Confidence & gaps
Low confidence in release causation: the decisive historical check and governing code read are missing. Earlier logs, code, and before/after failure rates could change the conclusion.

#### 6. Recommendation & counterexample
Obtain the missing reads before attributing cause or recommending a rollback on causal grounds. Counterexample: a pre-existing upstream outage would survive a rollback. Any urgent mitigation needs its own evidence and authority.

### Owner B

#### 1. Question & boundary
Did R cause checkout timeouts? Target: checkout runtime release; a rollback changes serving code, not customer data or unrelated services.

#### 2. Sources read
S1–S4, with the object IDs, versions, read times, and values in the fixture packet. Step 0 architecture/stack references have not been read in this fixture, so domain review is incomplete.

#### 3. Observations
The signature appears both before and after R (S1–S3); the inspected timeout path is unchanged (S4). These reads do not establish the actual cause or exclude an increased failure rate.

#### 4. Hypotheses & disconfirming checks
Hypothesis: R introduced this failure mode. Falsifier: the same signature predates R. Historical-log check returns S3, so this hypothesis is **rejected**. A separate hypothesis that R increased frequency remains unresolved; comparable before/after traffic and failure counts are unavailable.

#### 5. Confidence & gaps
High confidence in the narrow conclusion that the signature predates R: the timeline check directly contradicts introduction by R. Low confidence in the actual cause or rollback benefit: rate data and controlled intervention evidence are missing.

#### 6. Recommendation & counterexample
Do not recommend rollback solely because R introduced this signature; investigate the shared dependency and compare failure rates. Counterexample: an unchanged handler can still fail more often after another release change, so the rejected introduction claim does not prove R harmless.

## What the Contrast Explains

❌ **Bad:** “A is decisive; B is cautious. R caused it because the failure followed deployment.”

✅ **Good:** “A lacks the historical falsifier and code read; B's S3 rejects the introduction claim. Both leave frequency and actual cause unresolved. The difference is source coverage and hypothesis scope, not personality.”

Both answers have the same six headings, including explicit gaps and confidence. This is a worked structural example, not an empirical test of two real owners. A real historical comparison would link both original analyses and attribute each difference to their actual reads and checks; these synthetic examples cannot substitute for that evidence.
