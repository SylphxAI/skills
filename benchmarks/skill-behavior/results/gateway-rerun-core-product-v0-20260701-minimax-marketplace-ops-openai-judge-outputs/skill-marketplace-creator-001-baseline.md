<think>
The user wants a design for a public skill marketplace repository for AI agents that avoids prompt spam. They want me to include:
1. Skill quality bar
2. Contribution review
3. Install surface
4. Catalog metadata
5. Evals
6. Examples
7. Benchmark proof
8. Roadmap governance

Budget: 650 words, concise and audit-friendly. Prioritize artifacts and rubric-critical decisions over explanation.

Let me design this as a tight, structured spec. I'll use headings and tables/lists to be audit-friendly. I need to think about what "prompt spam" means in this context — it's likely low-quality, repetitive, malicious, or junk skills that flood a marketplace. So the design needs anti-spam mechanisms baked in.

Let me draft a structure:

1. **Anti-Spam Core Principles** (brief framing)
2. **Skill Quality Bar** — what makes a skill acceptable
3. **Contribution Review** — how submissions are vetted
4. **Install Surface** — how users install
5. **Catalog Metadata** — schema
6. **Evals** — evaluation harness
7. **Examples** — usage examples
8. **Benchmark Proof** — performance evidence
9. **Roadmap Governance** — how the project evolves

I need to be tight. Let me aim for ~600 words to stay safe under 650.

Let me write it out and count roughly.

---

Draft:

# Skill Marketplace Repository Design

## Anti-Spam Posture
- One skill = one capability contract; duplicates auto-merged.
- No free-form prompt dumps; only versioned, structured artifacts.
- Provenance required: author key + signature; reputation gated.
- Auto-quarantine on eval failure; manual unblock only.

## 1. Skill Quality Bar
| Criterion | Threshold |
|---|---|
| Determinism | ≥95% same-output on identical input (3 runs) |
| Latency p95 | ≤2× model baseline |
| Token efficiency | ≤1.3× of inline baseline |
| Safety | Blocks PII exfil, injection, exfiltration patterns |
| Doc coverage | Every param described; ≥2 examples |
| Eval pass rate | ≥90% on harness suite |

Skills failing any threshold are `draft` and unsearchable.

## 2. Contribution Review
1. **Pre-submit lint**: schema, signature, license, secret-scan.
2. **Automated eval**: red-team + functional + regression suite.
3. **Peer review**: 2 maintainers from rotated pool; SLA 7 days.
4. **Reputation gate**: new authors publish to `sandbox` only; after 3 approved skills → `general`.
5. **Rate limits**: 5 submissions/author/week; bulk uploads flagged.
6. **Duplicate detection**: embedding similarity >0.92 → merge or reject.

## 3. Install Surface
```
skill install <name>@<version>
skill lock --update
skill audit <name> --provenance
```
- Skills pinned by semver; yanked versions remain resolvable but warned.
- Sandboxed runtime: no network, fs, or shell by default; capabilities declared in manifest, granted per-session.
- Rollback atomic; rollback reasons logged.

## 4. Catalog Metadata (manifest schema)
```yaml
name: web.search
version: 1.4.2
author: did:key:z6Mk...
signature: ed25519:...
license: Apache-2.0
capabilities: [network.http.read]
inputs: { query: string, max: int<=20 }
outputs: { results: array }
dependencies: []
evals: evals/v1.json
hash: sha256:...
```
Catalog index rebuilt on signed release; unsigned = invisible.

## 5. Evals
- **Functional suite**: input→expected output pairs, ≥30 cases.
- **Adversarial suite**: prompt injection, jailbreak, PII, hallucination triggers.
- **Regression suite**: pin against 3 prior model versions.
- **Cost suite**: tokens, wall-clock, retries.
- Results stored as `evals/<skill>-<sha>.json`; signed by CI.

## 6. Examples
- `examples/basic.md` — minimal invocation.
- `examples/edge.md` — boundary inputs.
- `examples/anti-pattern.md` — what NOT to do; why rejected.
Examples must execute against the published eval harness; broken examples block release.

## 7. Benchmark Proof
- Public leaderboard per skill category: pass-rate, p95 latency, cost/1k calls.
- Reproducible: `skill bench <name> --seed=42 --model=gpt-x` re-runs in CI.
- Skills dropping >5% on new model versions trigger `revalidation` flag.
- Benchmark code is itself a versioned skill (`bench.runner`) — auditable.

## 8. Roadmap Governance
| Stage | Vote | Veto |
|---|---|---|
| Spec change (manifest schema) | ⅔ maintainers | Security WG |
| Deprecation | Simple majority | Affected author |
| Emergency takedown | 2/2 Security WG | — |
| Promotion sandbox→general | 3 maintainers | — |

- Quarterly roadmap RFCs; public comment 14 days.
- WG seats rotate; COI disclosed.
- All decisions in `governance/decisions/<id>.md` (ADR style).

## Spam-Deterrence Budget
- Compute for eval gates caps spammer ROI.
- Signed manifests + reputation tiers raise effort floor.
- Duplicate embedding + rate limits cap volume.
- Public failure ledger deters low-effort submissions.

---

Let me count words... This is roughly 550-600 words. Good.

Let me check it again and tighten where possible. I think this hits all 8 requested areas with concrete artifacts (tables, code blocks, schema) which is what "audit-friendly" calls for.

I should make sure I'm not exceeding 650. Let me do a rough count: each section is roughly 60-90 words. 8 sections × ~75 = 600. Plus the opening posture = ~620. Safe.

I'll deliverthis as-is.
</think>

# Skill Marketplace Repository Design

## Anti-Spam Posture
- One skill = one capability contract; near-duplicates auto-merged via embedding similarity.
- No free-form prompt dumps — only versioned, signed, structured artifacts.
- Auto-quarantine on eval failure; manual unblock required.
- Reputation + rate limits raise the spammer effort floor above the reward floor.

## 1. Skill Quality Bar
| Criterion | Threshold |
|---|---|
| Determinism | ≥95% identical output across 3 runs |
| Latency p95 | ≤2× inline baseline |
| Token efficiency | ≤1.3× of inline baseline |
| Safety | Blocks PII exfil, injection, tool-escape |
| Doc coverage | Every param described; ≥2 runnable examples |
| Eval pass rate | ≥90% on harness suite |

Skills failing any threshold stay in `draft` and are not catalog-visible.

## 2. Contribution Review
1. **Pre-submit lint** — schema, signature, license, secret-scan.
2. **Automated eval** — functional + adversarial + regression + cost suites.
3. **Peer review** — 2 maintainers from rotated pool, 7-day SLA.
4. **Reputation gate** — new authors publish to `sandbox` only; 3 approved skills → `general`.
5. **Rate limits** — 5 submissions/author/week; bulk uploads flagged.
6. **Duplicate detection** — similarity >0.92 → merge or reject with reason.

## 3. Install Surface
```
skill install <name>@<version>
skill lock --update
skill audit <name> --provenance
```
- Semver-pinned; yanked versions remain resolvable but warn.
- Sandboxed runtime: no net/fs/shell by default; capabilities declared in manifest, granted per-session.
- Rollback is atomic; reasons appended to public ledger.

## 4. Catalog Metadata (manifest schema)
```yaml
name: web.search
version: 1.4.2
author: did:key:z6Mk...
signature: ed25519:...
license: Apache-2.0
capabilities: [network.http.read]
inputs:  { query: string, max: int<=20 }
outputs: { results: array }
dependencies: []
evals: evals/v1.json
hash: sha256:...
```
Catalog index rebuilds only on signed releases; unsigned entries are invisible.

## 5. Evals
- **Functional** — ≥30 input→expected-output pairs.
- **Adversarial** — injection, jailbreak, PII, hallucination triggers.
- **Regression** — pinned against 3 prior model versions.
- **Cost** — tokens, wall-clock, retries.
Results stored as `evals/<skill>-<sha>.json`, signed by CI; failing runs block release.

## 6. Examples
- `examples/basic.md` — minimal invocation.
- `examples/edge.md` — boundary inputs.
- `examples/anti-pattern.md` — rejected patterns and rationale.
Examples must execute against the published harness; broken examples block release.

## 7. Benchmark Proof
- Public leaderboard per category: pass-rate, p95 latency, cost per 1k calls.
- Reproducible: `skill bench <name> --seed=42 --model=gpt-x` re-runs in CI.
- Drop >5% on a new model version → `revalidation` flag and visibility penalty.
- Benchmark harness itself is a versioned skill (`bench.runner`) — fully auditable.

## 8. Roadmap Governance
| Decision | Vote | Veto |
|---|---|---|
| Spec change (manifest schema) | ⅔ maintainers | Security WG |
| Deprecation | Simple majority | Affected author |
| Emergency takedown | 2/2 Security WG | — |
| Promotion sandbox → general | 3 maintainers | — |

- Quarterly RFCs, 14-day public comment.
- WG seats rotate; conflicts of interest disclosed.
- All decisions recorded as ADRs in `governance/decisions/<id>.md`.

## Spam-Deterrence Budget Summary
Compute cost of eval gates + signed manifests + reputation tiers + duplicate detection + rate limits collectively make low-effort prompt-spam submissions economically unviable while keeping the path open for legitimate contributors.
