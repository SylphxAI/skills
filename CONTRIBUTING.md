# Contributing

Thanks for improving Sylphx Skills.

## Add a skill

1. Create `skills/<skill-name>/SKILL.md`.
2. Use lowercase kebab-case for `<skill-name>`.
3. Include only `name` and `description` in frontmatter.
4. Keep `SKILL.md` concise. Move detailed material to `references/`.
5. Add examples or eval prompts under `evals/` when useful.
6. Run:

```bash
node scripts/generate-registry.mjs
node scripts/validate-skills.mjs --check-registry
```

## Acceptance bar

We accept skills that are useful, safe, original, agent-readable, and testable. We reject prompt dumps, vague advice, dark-pattern growth tactics, malware-like scripts, copied expression, and lightly rewritten source material. General ideas and public knowledge do not need per-source attribution, but direct quotes, third-party code/assets, or license-bound excerpts require permission and attribution.
