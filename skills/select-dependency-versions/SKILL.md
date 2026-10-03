---
name: select-dependency-versions
description: "Select an exact package, runtime, framework, SDK, or tool version from the current official registry and support policy. Use when adding, upgrading, pinning, or replacing a dependency, or when the user asks what version to use. Do not use to configure Dependabot or renovate."
---

# Select Dependency Versions

Take the version from the official registry and support schedule queried in this session; a remembered version is not a current version. Then three rules:

- **Exact, immutable pins.** Write the exact version (or image digest) the registry returned. No caret or tilde ranges, no `latest`, no floating tag in production.
- **No local compatibility layer.** Do not write a shim, wrapper, fork, or alias package to reconcile conflicting versions. Choose direct versions the resolver can satisfy together, or upgrade the dependency that forces the conflict.
- **The lockfile owns transitives.** Pin only what you import or run directly. Let the native package manager and lockfile resolve everything beneath it; do not hand-pin transitives to fix a conflict.
