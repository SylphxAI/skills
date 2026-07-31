import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import {
  checkAdrLifecycle,
  loadAdrRecords,
  repositoryRoot,
  validateAdrCorpus,
} from '../scripts/adr-lifecycle.mjs';

test('ADR corpus passes structural check', () => {
  const { errors, records } = checkAdrLifecycle(repositoryRoot);
  assert.equal(errors.length, 0, errors.join('\n'));
  assert.ok(records.length >= 30);
});

test('unknown frontmatter fields fail closed', () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'adr-lite-'));
  mkdirSync(path.join(dir, 'docs', 'adr'), { recursive: true });
  writeFileSync(
    path.join(dir, 'docs/adr/ADR-FAKE.md'),
    `---
id: ADR-FAKE
status: accepted
unexpected: true
---

# Fake
`,
  );
  const { errors } = loadAdrRecords(dir);
  assert.ok(errors.some((e) => e.includes('unexpected')), errors.join('\n'));
});

test('dangling supersedes fails', () => {
  const records = [
    {
      file: 'docs/adr/ADR-A.md',
      filename: 'ADR-A.md',
      id: 'ADR-A',
      filenameId: 'ADR-A',
      status: 'accepted',
      date: '2026-07-31',
      decision_owner: 'x',
      supersedes: ['ADR-MISSING'],
      amends: [],
      scope: [],
      markdown: '',
    },
  ];
  const { errors } = validateAdrCorpus(records, []);
  assert.ok(errors.some((e) => e.includes('dangling')), errors.join('\n'));
});

test('superseded without superseder fails', () => {
  const records = [
    {
      file: 'docs/adr/ADR-A.md',
      filename: 'ADR-A.md',
      id: 'ADR-A',
      filenameId: 'ADR-A',
      status: 'superseded',
      date: '2026-07-31',
      decision_owner: 'x',
      supersedes: [],
      amends: [],
      scope: [],
      markdown: '',
    },
  ];
  const { errors } = validateAdrCorpus(records, []);
  assert.ok(errors.some((e) => e.includes('requires another ADR')), errors.join('\n'));
});

test('fixtures directory no longer requires bundle fixtures', () => {
  // residual fixtures may exist; structural check must not depend on them
  const { errors } = checkAdrLifecycle(repositoryRoot);
  assert.equal(errors.length, 0, errors.join('\n'));
});
