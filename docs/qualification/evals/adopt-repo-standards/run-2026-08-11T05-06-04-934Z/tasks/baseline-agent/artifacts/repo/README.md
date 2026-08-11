# acme-app

Example product repository used as an eval fixture for adopt-repo-standards.

- Language: TypeScript (node >= 20)
- CI: GitHub Actions stub
- Agent instructions: [`AGENTS.md`](./AGENTS.md)
- Project facts: [`PROJECT.md`](./PROJECT.md) and
  [`project.manifest.json`](./project.manifest.json)

## Verification

```bash
npm run check
```

The conformance entrypoint validates the project manifest contract and the
required baseline surfaces (constitution, project facts, entrypoint) and fails
if the retired predecessor instruction layout is resurrected.
