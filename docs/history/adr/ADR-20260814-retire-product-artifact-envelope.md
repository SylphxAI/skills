# ADR-20260814 — Retire product-artifact-envelope

## Status

Accepted. Continues the same cut as
[ADR-20260813-retire-house-capability-json](ADR-20260813-retire-house-capability-json.md).

## Context

Skills taught a parallel JSON envelope (`artifactVersion`, `fulfillsHandoffId`,
`digestRule`) beside the markdown artifact. Hosts and agents load `SKILL.md`.
No product repository in the 2026-08-13 fleet scan committed an envelope file.
The schema existed only so agents would copy it.

## Decision

- Delete active `product-artifact-envelope.schema.json` copies.
- Teach markdown artifacts with named owners and sources.
- Do not restore a JSON envelope as a skill output contract.

## Consequences

Program, design, payment, listing, support, and feedback skills write prose.
Real interface contracts stay where a non-LLM consumer exists.
