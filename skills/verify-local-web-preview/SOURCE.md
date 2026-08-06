# Source

`scripts/browser-guard.mjs` and `scripts/browser-smoke.mjs` are adapted from a
Grok App Builder **workspace-kit** companion dump (fork session 2026-08-06):
loopback URL checks, path allowlisting, Playwright load + PNG + console gate.

Rewritten for Sylphx:

- defaults to cwd `./screenshots/` (not sandbox `/workspace`);
- default port `5173` (common Vite) overridable by argv/env;
- missing Playwright is exit 3 with an honest gap (not a hard host lock);
- method skill is portable—no Grok broker, TanStack, or PGLite defaults.
