import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const workflowsRoot = path.join(repositoryRoot, '.github', 'workflows');
const RUNS_ON = /^\s*runs-on:\s*(?<value>[^#]+?)(?:\s+#.*)?$/;

function workflowPaths() {
  return readdirSync(workflowsRoot)
    .filter((name) => /\.ya?ml$/i.test(name))
    .sort()
    .map((name) => path.join(workflowsRoot, name));
}

function unquote(value) {
  return value.trim().replace(/^(?:"|')|(?:"|')$/g, '');
}

function isOwnedRunnerProfile(value) {
  const normalized = unquote(value);
  if (/^sylphx-linux-[a-z0-9-]+$/.test(normalized)) return true;

  const labels = normalized.match(/^\[\s*(?<labels>[^\]]+)\s*\]$/)?.groups?.labels
    ?.split(',')
    .map((label) => unquote(label).trim().toLowerCase());
  if (!labels) return false;

  return labels.length === 4
    && labels[0] === 'self-hosted'
    && labels[1] === 'sylphx'
    && labels[2] === 'macos'
    && ['nano', 'small', 'standard', 'large', 'xlarge', '2xlarge'].includes(labels[3]);
}

test('repository workflows use explicit owned runner profiles only', () => {
  const workflows = workflowPaths();
  assert.ok(workflows.length > 0, 'expected repository workflows');

  for (const workflow of workflows) {
    const content = readFileSync(workflow, 'utf8');
    const values = content.split(/\r?\n/)
      .map((line) => line.match(RUNS_ON)?.groups?.value)
      .filter(Boolean);
    assert.ok(values.length > 0, `${path.relative(repositoryRoot, workflow)} has no runs-on`);

    for (const value of values) {
      assert.doesNotMatch(value, /\$\{\{/, `${workflow}: dynamic runs-on is forbidden`);
      assert.equal(
        isOwnedRunnerProfile(value),
        true,
        `${workflow}: ${value.trim()} is not an owned runner profile`,
      );
    }
  }
});

test('runner standard rejects GitHub-hosted compute for every CI lane', () => {
  const standard = readFileSync(
    path.join(
      repositoryRoot,
      'skills',
      'ci-runner-capacity-standard',
      'references',
      'full-standard.md',
    ),
    'utf8',
  );

  assert.match(standard, /Every company workflow selects one static profile from the execution plane's\s+published owned-runner contract\./);
  assert.match(standard, /GitHub-hosted labels such as `ubuntu-\*`, `windows-\*`,\s+and `macos-\*` are\s+prohibited/i);
  assert.match(standard, /\[self-hosted, sylphx, macos, <size>\]/);
  assert.match(standard, /Windows is not an active CI profile/i);
  assert.match(standard, /platform-capability gap/i);
  assert.doesNotMatch(standard, /github-hosted-hermetic-policy/i);
});

test('owned runner grammar accepts only the published static forms', () => {
  for (const value of [
    'sylphx-linux-standard',
    'sylphx-linux-2xlarge',
    '[self-hosted, sylphx, macos, standard]',
    '["self-hosted", "sylphx", "macos", "large"]',
  ]) {
    assert.equal(isOwnedRunnerProfile(value), true, value);
  }

  for (const value of [
    'ubuntu-latest',
    'windows-latest',
    'sylphx-windows-standard',
    '[self-hosted, macos, standard]',
    '[self-hosted, sylphx, linux, standard]',
    '${{ matrix.runner }}',
  ]) {
    assert.equal(isOwnedRunnerProfile(value), false, value);
  }
});
