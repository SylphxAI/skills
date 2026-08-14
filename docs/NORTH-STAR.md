# Sylphx Verified Capabilities — Product North Star

**Audience:** humans and agents who author, curate, install, or evaluate skills.  
**Purpose:** what this catalog is for.  
**Authority:** `SylphxAI/skills` product identity. Not a universal principles doc.

---

## One line

Agents load one real method for a real job. Do not claim more trust than
measured evidence allows. Unqualified packages stay usable.

---

## What this repository is

An **open skill catalog**: job-shaped Agent Skill packages, honest
qualification records, and release-tag install for Codex, Claude Code, and
Grok Build. Not a marketplace, agent runtime, or Control Plane.

Every listing under `skills/<id>/` is installable. Hosts discover
`name` + `description`. Qualification never hides a package from discovery.

---

## Industry evaluation (what we follow)

Public practice in 2026 (SkillsBench, NVIDIA SkillEvaluator T3, Anthropic
eval notes) is:

1. **Usable by default.** A skill catalog installs and loads packages that
   have not been evaluated. Verified is a claim, not a power switch.
2. **Scan ≠ value.** Static checks (schema, secrets, dangerous instructions)
   can fail a *claim*. They do not prove the skill helps.
3. **Paired evaluation claims lift.** Same user task, with the skill and
   without it. Deterministic checks on the artifact or a predeclared harm.
   Do not leak the method into the user prompt.
4. **Harm can veto an average win.** A skill that makes the agent skip host
   search, or otherwise regresses a safety/tool floor, is not an improvement.
5. **One working harness is enough to file a claim.** Extra model families
   are only for a portability claim. They are not a daily gate.

We do **not** operate invented house metrics or required outcome receipts.
We do **not** require four-way controls or dual judge families to keep a
package in the catalog. Retirement of predecessor private names lives in
[`docs/history/adr/ADR-20260813-retire-house-nsm-follow-industry-eval.md`](history/adr/ADR-20260813-retire-house-nsm-follow-industry-eval.md).

---

## Qualification in this repo

| State | Meaning | Use |
| --- | --- | --- |
| Installed | In the catalog; agent can load it | Always |
| `unqualified` | No current digest-bound eval claim | Normal default |
| `qualified` | Current package digest has filed scan + task evidence | Optional badge |

`qualified` is perishable: any material change to what the agent loads
invalidates it. Incremental-value is a **separate** kind and is only filed
for a same-prompt pair that does not hand `SKILL.md` as a fixture.

How to file: [`docs/QUALIFICATION.md`](QUALIFICATION.md). Method:
[`skills/design-skill-evals`](../skills/design-skill-evals/SKILL.md).

---

## What we refuse

- False verified (badge on drifted bytes, or leaked-method keyword oracles)
- Using qualification to block install or load
- Requiring a proof stack to start ordinary reversible work
- Inventing live success dashboards with zero external results
- Batch-qualifying the catalog to make a coverage number move
- Minting an abbreviation for a standard concept. Name customer value in
  English with an industry quantity. See documentation-standard
  § North Star Metric (naming).

---

## Related

| Document | Role |
| --- | --- |
| `docs/MODEL.md` | Package model |
| `docs/QUALIFICATION.md` | How evidence is filed |
| `docs/PROMOTION.md` | Release-tag AutoSync |
| `docs/prd.md` | Feature inventory |
| `docs/history/adr/ADR-20260813-retire-house-nsm-follow-industry-eval.md` | This cut |
