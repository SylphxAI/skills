import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import {
  installedSkillNames,
  prepareAgentPairHome,
} from '../scripts/qualification-pair.mjs';

test('paired homes isolate the host catalog', () => {
  const tmp = mkdtempSync(path.join(os.tmpdir(), 'sylphx-pair-'));
  const hostHome = path.join(tmp, 'host');
  const packageRoot = path.join(tmp, 'pkg');
  mkdirSync(path.join(hostHome, 'skills', 'leaked-host-skill'), { recursive: true });
  writeFileSync(path.join(hostHome, 'config.toml'), 'model = "test"\n');
  writeFileSync(path.join(hostHome, 'auth.json'), '{}\n');
  mkdirSync(path.join(packageRoot, 'evals'), { recursive: true });
  writeFileSync(path.join(packageRoot, 'SKILL.md'), '# skill\n');
  writeFileSync(path.join(packageRoot, 'evals', 'suite.json'), '{}\n');

  try {
    const withSkill = prepareAgentPairHome({
      label: 'with',
      baseline: false,
      packageRoot,
      capability: 'design-skill-evals',
      hostHome,
      tmp,
    });
    const baseline = prepareAgentPairHome({
      label: 'base',
      baseline: true,
      packageRoot,
      capability: 'design-skill-evals',
      hostHome,
      tmp,
    });

    assert.deepEqual(installedSkillNames(withSkill), ['design-skill-evals']);
    assert.deepEqual(installedSkillNames(baseline), []);
    assert.equal(existsSync(path.join(withSkill, 'skills', 'leaked-host-skill')), false);
    assert.equal(existsSync(path.join(baseline, 'skills', 'leaked-host-skill')), false);
    assert.equal(existsSync(path.join(withSkill, 'skills', 'design-skill-evals', 'evals')), false);
    assert.equal(readFileSync(path.join(withSkill, 'config.toml'), 'utf8'), 'model = "test"\n');
    assert.equal(readFileSync(path.join(baseline, 'auth.json'), 'utf8'), '{}\n');
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});
