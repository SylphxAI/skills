# ADR-20260813 — Retire house `capability.json`

## Status

Accepted. Amends the *operating* package contract in
[ADR-20260810](ADR-20260810-verified-capabilities-model.md). That ADR remains
history.

## Context

Every listing carried a house JSON job contract (`capability.json`) beside
`SKILL.md`. Hosts and agents load `name`+`description` and the markdown body.
The only consumers of the JSON were this repository's catalog builder and
schema CI.

[Agent Skills](https://agentskills.io/specification) requires `SKILL.md` only.
A second JSON restatement of the same job is a duplicate source of truth,
harder to write, unused by the model, and copied into other repos as if it
were industry format.

## Decision

- Delete `skills/*/capability.json`.
- Do not teach or require a parallel JSON job contract.
- Integrity fails closed if a listing grows a leftover `capability.json`.
- `qualification.json` stays optional evidence after a filed eval.
- Product interface contracts (OpenAPI, proto, tests) stay where a non-LLM
  consumer exists.

## Consequences

Catalog rows are `name`, `description`, `path`, `packageDigest`, and
qualification projection. Authors write one file for the job. Agents stop
minting house JSON in other repositories from this catalog's example.
