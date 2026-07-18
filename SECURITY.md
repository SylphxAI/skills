# Security

## What this repository is

Public static Agent Skill packages (Markdown and small helpers) plus a local
install/sync CLI. There is **no hosted multi-tenant service** in this tree and
no requirement to send credentials to Sylphx to install.

## Do not commit

- Credentials, private keys, access tokens, or API secrets  
- Customer data, private incident material, or proprietary third-party content  
- Personal identifiable information that is not already public by design  

The integrity CI scans for common secret patterns; treat that as a backstop,
not a guarantee.

## Reporting a vulnerability

Use GitHub’s **private security advisory** for this repository:

https://github.com/SylphxAI/skills/security/advisories/new

Do **not** open a public issue with exploit details, tokens, or customer data.

If the issue is only “a skill gives bad advice,” prefer a Discussion or a
normal bug report without sensitive context.

## Scope notes

- Skill **quality and judgment** failures are product issues, not always
  security issues.
- Compromise of a third-party agent runtime (Codex / Claude / Grok) is outside
  this repository’s control; report those to the runtime vendor as well.
