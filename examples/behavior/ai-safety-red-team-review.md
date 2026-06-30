# ai-safety-red-team-review behavior example

skill: ai-safety-red-team-review

## Positive prompt

> Plan an AI safety red-team for a tool-using support agent with private customer data, file uploads, retrieval, model fallback, account actions, and release gates.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines assets at risk, attack classes, system surfaces, severity model, fixtures, mitigations, owners, release gates, telemetry, regression tests, and incident triggers.
- Covers prompt injection, jailbreak, data leakage, tool misuse, unsafe autonomy, hallucinated actions, fallback regression, privacy, and over-blocking.
- Flags generic policy-only testing, broad tool permissions, missing audit/kill switches, unclosed severe findings, and no regression evidence.

It should also produce the artifact shape requested by `skills/ai-safety-red-team-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design a partner reseller channel program.

The skill should not load for this prompt unless the user adds an explicit ai-safety-red-team-review context.

## Expected behavior

- Defines assets at risk, attack classes, system surfaces, severity model, fixtures, mitigations, owners, release gates, telemetry, regression tests, and incident triggers.
- Covers prompt injection, jailbreak, data leakage, tool misuse, unsafe autonomy, hallucinated actions, fallback regression, privacy, and over-blocking.
- Flags generic policy-only testing, broad tool permissions, missing audit/kill switches, unclosed severe findings, and no regression evidence.
