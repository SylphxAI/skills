# Host utilization result sheets

Drop measured host runs here. **Install green is not a pass.**

## Filename

`{host}-{skillsCommit12}-{utcDate}.md`  
Example: `codex-d6c54a6-2026-08-03.md`

## Required front matter

```yaml
host: codex|claude|grok|other
hostVersion: 
model: 
skillsCommit: 
catalogDigest: 
ranAtUtc: 
promotable: false  # true only when full runbook min slice scored
```

## Body

Use the result sheet template from
`docs/reference/skill-utilization-host-runbook.md`.

## Claim rules

- `promotable: true` only when the runbook minimum case slice is scored
- Report pass/fail/inconclusive rates; never “utilization solved” from one host
- Authoring structural tests in CI are **not** host behavior-oracle results
