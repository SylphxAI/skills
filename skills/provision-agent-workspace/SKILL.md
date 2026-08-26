---
name: provision-agent-workspace
description: "Create or attach an isolated filesystem and shell for an agent — host workspace, sandbox, or VM — with explicit network, secret, lifetime, and cost bounds. Use when the user asks to provision a sandbox, code-execution environment, or throwaway VM. Do not use to write application features in an existing repo."
---

# Provision Agent Workspace

Isolation, lifetime, and network must match data sensitivity. Do not over-provision a VM for a file edit. Secrets, network, and lifetime that are "we'll tighten later" are the product.

Open [provider selection](references/provider-selection.md) for the selected isolate. Open [recipes](references/recipes.md) and [acceptance](references/acceptance.md) when attaching or tearing down a workspace.
