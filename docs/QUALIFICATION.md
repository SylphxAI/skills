# Qualification

Qualification is the reproducible, version-scoped evidence that a capability
version is **safe, applicable, current and outcome-positive** in declared
environments. A named evaluator or attestor owns the result; the repository
only records and projects it.

Unqualified is the honest default. As of 2026-08-11 this repository declares
**24** qualified capabilities (57 packages) with version-scoped, expiring
evidence under `docs/qualification/evals/`; everything else is honestly
`unqualified`. Qualification is never inferred from structure, CI, or
installation — only from filed with-skill versus baseline evidence and, where
declared, native-activation evidence.

## What evidence qualifies a capability

Follow the eval methodology owned by
[`skills/design-skill-evals`](../skills/design-skill-evals/SKILL.md). The core
proof is a **with-skill versus baseline comparison** on realistic work:

1. Freeze the exact capability version (name, description, body, references,
   scripts) and bind candidate commit, catalog digest, task/rubric/runner/
   model-registry digests, parameters, seed, tool availability, retries, and
   expiry.
2. Run at least two answer-model and two independent judge families against:
   base model, length-matched generic expert instruction, exact skill, and the
   strongest reasonable public comparator where licensing permits.
3. Separate deterministic oracles from blind judgment; recompute metrics from
   complete raw artifacts in a protected eval store.
4. Cover incremental value, activation/selection, compatibility, provenance,
   security, and currentness. An automated pattern scan (secrets and dangerous instruction
   patterns) is mandatory before a package may be `qualified`; absence is a
   hard gate. It is a regex backstop, not a security review: no current gate
   evaluates malicious instructions, unsafe scripts, or capability
   permissions, and hashes prove bytes, not intent.
5. Record the result as a version-scoped, **expiring** qualification record.
   Any relevant byte change invalidates the matching proof.

An LLM judge is additional evidence, never the sole critical-safety oracle.
Do not manufacture confidence with benchmark suites, leaked holdouts,
authored-to-fit tasks, or self-attestation.

## How a record is filed

1. Author or run the eval program per `design-skill-evals`.
2. Update `skills/<id>/qualification.json` to `status: qualified` with:
   - a named `evaluator` (`author` is allowed only with independent
     verification; `independent`, `host`, or `vendor` are preferred),
   - `qualifiedAt` and a future `expiresAt` (currentness is perishable),
   - `evidence` entries (each with `id`, `kind`, `digest`, `uri`),
   - `compatibility` rows for declared environments.
3. Add the evidence artifact under `docs/qualification/evals/` and update
   `docs/qualification/LEDGER.md`.
4. Rebuild the catalog: `npm run build:catalog && npm test`. The integrity
   gate rejects qualified records without digest+uri evidence, a future
   expiry, or a schema violation. A stale expiry downgrades eligibility.

The schema is `schemas/qualification-record.schema.json`; the receipt contract
for outcomes is `schemas/outcome-receipt.schema.json`.

## Capability identity

The catalog `packageDigest` covers what an agent loads and what host discovery
consumes: `SKILL.md`, `references/`, `scripts/`, `capability.json` and
`agents/`. Evaluator-owned evidence metadata (`qualification.json`) and eval
material (`evals/`) are **excluded**: re-qualification or evidence relabeling
must not change the capability version identity. The qualification record's
`evidence[].digest` independently binds the exact eval bundle (raw artifacts,
task records, pattern scan, report), so evidence remains byte-bound without
churning capability identity.

## Promotion safety

- AutoSync applies only immutable annotated release tags carrying a verified
  promotion manifest (`docs/PROMOTION.md`); branch-following is retired and
  fails closed. A candidate is also refused if it would **downgrade** an
  installed capability from `qualified` to `unqualified`.
- `unqualified` packages are installable (open foundation) but their attempts
  are **not eligible** for a positive Verified Capability Yield contribution.
- AutoSync applies a candidate only if it does not **downgrade** an installed
  capability from `qualified` to `unqualified` (fail-closed promotion gate
  enforced by `syncTarget` in
  [`runtime/sylphx-skills.mjs`](../runtime/sylphx-skills.mjs), which AutoSync
  executes through [`runtime/reconcile.mjs`](../runtime/reconcile.mjs));
  explicit override is possible (`SYLPHX_SKILLS_ALLOW_QUALIFICATION_REGRESSION=1`)
  and the override is recorded in the target manifest and `status --json`.
- Qualification is scoped and expiring — never a universal "certified safe"
  badge.

## Running the harness

`scripts/run-qualification.mjs` executes a capability's eval suite
(`skills/<id>/evals/suite.json`, schema `schemas/eval-suite.schema.json`) and
records a digest-bound evidence bundle:

```bash
node scripts/run-qualification.mjs --capability <id>          # run + record
node scripts/run-qualification.mjs --capability <id> --apply  # run, record, file qualification.json
node scripts/run-qualification.mjs --capability <id> --apply-from <stamp>  # file from an existing verified run
```

Environment: `SYLPHX_QUALIFY_PYTHON` (python3 with Pillow for image oracles),
`SYLPHX_QUALIFY_CODEX` (codex CLI for agent tasks), `SYLPHX_QUALIFY_AGENT_ARGS`
(extra `codex exec` args, e.g. `-c model_provider=openmodel -c model=deepseek-v4-flash`).
Agent tasks run in temp dirs outside any git repository and are recorded as
fresh-context behavior tests. A suite may additionally declare
`activation.cases`: the capability is installed as the only native skill of a
fresh session under the always-on search-before-act floor, and the user prompt
never names the skill. A case passes only when the agent's visible transcript
references a declared selection keyword and every oracle assertion holds;
`injectionState` is `verified` only when every declared case passes, and stays
`not-verified` otherwise. Exec tasks are deterministic functional oracles. The bundle includes raw artifacts, task
records, an automated pattern scan (secrets + dangerous instruction patterns),
and `report.json` with an evidence digest; `--apply-from` refuses to apply if
the recorded digest does not match the bundle. Qualification files in the
ledger with a review of the bundle.

## Ledger

Current state: [`docs/qualification/LEDGER.md`](qualification/LEDGER.md).
Eval evidence: [`docs/qualification/evals/`](qualification/evals/).
