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
  a named evaluator, including a mandatory security review. No package is
  currently qualified; every package is honestly `unqualified`.
- There is **no current automated gate that evaluates malicious instructions,
  unsafe scripts, or capability permissions**. Treat any installed package as
  code from its author. This gap is tracked as a qualification gate, not
  silently covered by hashes.

## AutoSync distribution model

AutoSync follows the declared remote branch, fetches its current head, and
executes that candidate's repository-owned CLI under the user's privileges.
Branch protection and exact-digest application mitigate risk, but there is no
immutable signed promotion authority between "landed on main" and "executed on
user machines"; qualification is the trust model and it is currently empty.
AutoSync refuses to downgrade an installed `qualified` capability to
`unqualified`. Users who do not want mutable-main tracking should install
statically and update explicitly.

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
