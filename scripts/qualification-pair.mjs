/**
 * Isolated with-skill vs baseline homes for industry paired evaluation.
 *
 * SkillsBench / NVIDIA SkillEvaluator T3: same prompt, skill present or
 * absent. The host catalog must not leak into either arm.
 */

import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

export const SEARCH_BEFORE_ACT_FLOOR = `# Instructions

- Search before you act: before doing any work, search your installed skills. If a matching skill exists, load it and follow its procedure.
- Complete the user's requested output in this workspace.
`;

export function hostCodexHome(env = process.env) {
  return env.CODEX_HOME || path.join(env.HOME || '.', '.codex');
}

export function createIsolatedCodexHome(label, { hostHome, tmp = os.tmpdir() } = {}) {
  const dir = path.join(tmp, `sylphx-qualify-home-${label}`);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  if (hostHome) {
    for (const name of ['config.toml', 'auth.json']) {
      const source = path.join(hostHome, name);
      if (existsSync(source)) cpSync(source, path.join(dir, name));
    }
  }
  mkdirSync(path.join(dir, 'skills'), { recursive: true });
  return dir;
}

export function installCapabilityPackage(codexHome, packageRoot, capability) {
  const dest = path.join(codexHome, 'skills', capability);
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(packageRoot, { withFileTypes: true })) {
    if (entry.name === 'evals') continue;
    cpSync(path.join(packageRoot, entry.name), path.join(dest, entry.name), { recursive: true });
  }
  return dest;
}

export function prepareAgentPairHome({
  label,
  baseline,
  packageRoot,
  capability,
  hostHome,
  tmp,
}) {
  const home = createIsolatedCodexHome(label, { hostHome, tmp });
  if (!baseline) installCapabilityPackage(home, packageRoot, capability);
  return home;
}

export function writeSearchFloor(workDir) {
  writeFileSync(path.join(workDir, 'AGENTS.md'), SEARCH_BEFORE_ACT_FLOOR);
}

export function installedSkillNames(codexHome) {
  const skillsDir = path.join(codexHome, 'skills');
  if (!existsSync(skillsDir)) return [];
  return readdirSync(skillsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}
