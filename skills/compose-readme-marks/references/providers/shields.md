# shields.io

## Surface

- `https://img.shields.io/badge/<label>-<message>-<color>`
- Dynamic badges for GitHub, npm, CI, etc. per current shields docs.

## Auth

- None for public badge rendering.
- Upstream data sources (GitHub API) have their own limits.

## Example

```markdown
![build](https://img.shields.io/badge/build-passing-brightgreen)
![license](https://img.shields.io/badge/license-MIT-blue)
```

## Proof

```bash
curl -sI "https://img.shields.io/badge/test-ok-blue"
```

## Prefer / avoid

- Prefer universal CI/version chips readers already recognize.
- Avoid overloading README with dozens of dynamic badges (rate + visual noise).
