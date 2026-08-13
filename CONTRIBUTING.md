# Contributing

## What belongs here

Specialized **task capabilities** the agent cannot do well without packaged
procedure, scripts, or org-specific gotchas. Every package is a `SKILL.md`
job. Qualification is optional.

## What does not

- Generic textbook checklists
- Company-wide policy encyclopedias
- Always-on essays
- Skills that only exist to route to other skills

## Authoring

1. Prove a real agent gap on a recurring job.
2. Follow `skills/author-skill`.
3. Keep `SKILL.md` under ~500 lines; put depth in `references/`.
4. Do not add `capability.json`. The job lives in `SKILL.md`.
5. Do not add `qualification.json` unless you filed a qualify run.
6. Keep the catalog inside the Codex ~8k description listing class.
7. Run `npm test`.

## PR complete

Exact branch passes `npm test`; catalog rebuilt with qualification projection;
no residual references to deleted packages; no capability claims qualification
without evidence.
