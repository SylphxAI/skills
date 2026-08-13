# Security

## What this repository is

Public static capability packages (Markdown and small helpers) plus a local
install/sync CLI. There is **no hosted multi-tenant service** in this tree and
no requirement to send credentials to Sylphx to install.

## What the integrity gates do and do not prove

- CI validates package shape, capability contracts, qualification records,
  secrets hygiene, link integrity, and catalog digests. Hashes prove **bytes**,
  not publisher intent or semantic safety.
- `qualified` in this repository means version-scoped, expiring evidence from
  a named evaluator, including a mandatory automated pattern scan for secrets
  and dangerous instruction patterns. As of 2026-08-13, 39 of 56 packages
  carry that evidence; the rest are honestly
  `unqualified`. The pattern scan
  is a regex backstop, not a security review.
- There is **no current automated gate that evaluates malicious instructions,
  unsafe scripts, or capability permissions**. Treat any installed package as
  code from its author. This gap is tracked as a qualification gate, not
  silently covered by hashes.

## AutoSync distribution model

AutoSync applies **only immutable annotated release tags** carrying a verified
promotion manifest — never the current head of a mutable branch — and verifies
the manifest (catalog digest, qualification projection, sourceRevision) against
the exact candidate tree **before** the candidate's repository-owned CLI runs
under the user's privileges (see [docs/PROMOTION.md](docs/PROMOTION.md)).
Without `requireVerifiedTag: true`, the authority is repository governance plus
tag immutability; with it, the authority is cryptographic (GPG/SSH `git
verify-tag`). Branch-following AutoSync configs (schemaVersion 1) are retired
and fail closed. Qualification is the value-trust model: 39 of 56 packages
currently carry expiring qualification evidence, and `unqualified` remains
the honest default. AutoSync also refuses to downgrade an installed
`qualified` capability to `unqualified`.

## Do not commit

- Credentials, private keys, access tokens, or API secrets
- Customer data, private incident material, or proprietary third-party content
- Personal identifiable information that is not already public by design

The integrity CI scans for common secret patterns; treat that as a backstop,
not a guarantee.

## Reporting a vulnerability

Use GitHub's **private security advisory** for this repository:

https://github.com/SylphxAI/skills/security/advisories/new

Do **not** open a public issue with exploit details, tokens, or customer data.

If the issue is only "a skill gives bad advice," prefer a Discussion or a
normal bug report without sensitive context.

## Scope notes

- Skill **quality and judgment** failures are product issues, not always
  security issues.
- Compromise of a third-party agent runtime (Codex / Claude / Grok) is outside
  this repository's control; report those to the runtime vendor as well.
