# Qualification

Qualification is optional, version-scoped evidence that a **specific package
digest** was scanned and exercised. It is **not** a use gate.

Every listing installs and loads whether or not it is `qualified`.
`unqualified` is the honest default.

As of 2026-08-13 this repository declares **0** qualified capabilities
(60 packages). Prior house metrics (TJC / VCY) and the required
outcome-receipt field are retired. Industry practice is paired evaluation
when claiming lift — not coverage KPIs.

## What industry evaluation is

Follow [`skills/design-skill-evals`](../skills/design-skill-evals/SKILL.md)
(SkillsBench / NVIDIA SkillEvaluator T3 shape):

1. Freeze the exact bytes (name, description, body, references, scripts).
2. Run the **same user prompt** with the skill as a condition and without it.
   Do not put `Read ./SKILL.md` or the expected headings in the user prompt.
3. Judge with deterministic artifact checks. Predeclare harms (for example
   banning host web search). Harm fails the claim even if other checks pass.
4. One harness is enough to file. A second model family is only for a
   portability claim.
5. Bind `packageDigest`. Any later material edit invalidates the record.

A fixture-read “follow this file” task is a behavior smoke test, not
incremental-value. Agent tasks run in an isolated `CODEX_HOME`: the
with-skill arm installs only that package; the baseline arm installs
none. The host catalog must not leak into either arm.

## How a record is filed

```bash
node scripts/run-qualification.mjs --capability <id>
node scripts/run-qualification.mjs --capability <id> --apply
```

`--apply` writes `skills/<id>/qualification.json` only when every non-baseline
task passes, the pattern scan is clean (including host-search bans), and
`packageDigest` matches the live package. Incremental-value is added only
for an eligible same-prompt pair whose with-skill run passes and baseline
fails.

The integrity gate rejects:

- `qualified` without a matching live `packageDigest`
- host-search bans in the package or eval prompts
- `incremental-value` on a fixture-read suite

Rebuild: `npm run build:catalog && npm test`.

Schema: `schemas/qualification-record.schema.json`.

## Identity

`packageDigest` covers what an agent loads: `SKILL.md`, `references/`,
`scripts/`, `capability.json`, `agents/`. `qualification.json` and `evals/`
are excluded.

## AutoSync

AutoSync applies annotated `skills-v*` tags only. It refuses to apply a
candidate that would downgrade an installed name from `qualified` to
`unqualified` unless `SYLPHX_SKILLS_ALLOW_QUALIFICATION_REGRESSION=1`.
That gate protects badge honesty on already-installed hosts. It does not
block using unqualified packages.

## Ledger

[`docs/qualification/LEDGER.md`](qualification/LEDGER.md).  
Eval bundles: [`docs/qualification/evals/`](qualification/evals/).
