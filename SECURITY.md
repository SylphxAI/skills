# Security

This repository distributes public Markdown instructions and small executable
helpers. Installed scripts run with the permissions of the agent host, so
review a skill's scripts and requested tools before enabling it.

Contributions contain public, redistributable material. Credentials, private
keys, access tokens, customer data, private incident material, and private
third-party content stay in their owning secure systems.

Report vulnerabilities through a
[private GitHub security advisory](https://github.com/SylphxAI/skills/security/advisories/new).
Include the affected skill, revision, impact, and a minimal reproduction when
available. General quality issues belong in the public issue tracker.

The agent runtime owns process isolation, permissions, and tool authorization.
Each skill owns the safety of its instructions and bundled helpers.
