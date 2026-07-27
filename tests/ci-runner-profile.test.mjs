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
      assert.match(
        unquote(value),
        /^sylphx-[a-z0-9-]+$/,
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

  assert.match(standard, /Every company workflow selects a stable `sylphx-\*` runner profile\./);
  assert.match(standard, /GitHub-hosted labels such as `ubuntu-\*`, `windows-\*`,\s+and `macos-\*` are prohibited/i);
  assert.match(standard, /platform-capability gap/i);
  assert.doesNotMatch(standard, /github-hosted-hermetic-policy/i);
});
