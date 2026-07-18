import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createServer } from 'node:net';
import test from 'node:test';
import { packageDigest } from '../runtime/package-digest.mjs';
import { buildCatalog, parseFrontmatter, repositoryRoot } from '../scripts/build-catalog.mjs';

test('frontmatter parsing is identical for LF and CRLF checkouts', () => {
  const lf = '---\nname: example\ndescription: Use for a checkout portability test.\n---\n\n# Example\n';
  assert.deepEqual(parseFrontmatter(lf.replaceAll('\n', '\r\n'), 'CRLF.md'), parseFrontmatter(lf, 'LF.md'));
});

test('catalog is deterministic and covers every canonical package', () => {
  const catalog = buildCatalog(repositoryRoot);
  assert.equal(catalog.schemaVersion, 1);
  assert.ok(catalog.count > 0);
  assert.equal(catalog.skills.length, catalog.count);
  assert.deepEqual(catalog.skills.map((skill) => skill.name), [...catalog.skills.map((skill) => skill.name)].sort());
  assert.equal(new Set(catalog.skills.map((skill) => skill.name)).size, catalog.count);
  const technologyProfile = catalog.skills.find((skill) => skill.name === 'technology-stack-profile').profile;
  assert.deepEqual(technologyProfile, {
    id: 'technology-stack-profile',
    revision: '2026-07-18.2',
    contentDigest: 'sha256:ce4b7cd6071807f89754c885c071dee2e70b24c0dc370739da19fec3811cc88c',
    lifecycle: 'active',
    authorityClass: 'governance-constraint',
  });
  const stored = JSON.parse(readFileSync(new URL('../catalog.json', import.meta.url), 'utf8'));
  assert.deepEqual(stored, catalog);
});

test('package digests preserve file boundaries and reject symbolic links', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-package-digest-'));
  const splitPackage = path.join(sandbox, 'split');
  const embeddedPackage = path.join(sandbox, 'embedded');
  try {
    mkdirSync(path.join(splitPackage, 'references'), { recursive: true });
    mkdirSync(embeddedPackage, { recursive: true });
    writeFileSync(path.join(splitPackage, 'SKILL.md'), 'body');
    writeFileSync(path.join(splitPackage, 'references', 'x.md'), 'reference');
    writeFileSync(path.join(embeddedPackage, 'SKILL.md'), Buffer.from('body\0references/x.md\0reference'));
    assert.notEqual(packageDigest(splitPackage), packageDigest(embeddedPackage));

    symlinkSync('SKILL.md', path.join(splitPackage, 'linked.md'));
    assert.throws(() => packageDigest(splitPackage), /unsupported symbolic link: linked\.md/);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});
test('catalog generation rejects symbolic links inside canonical packages', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-catalog-symlink-'));
  const packageRoot = path.join(sandbox, 'skills', 'example');
  try {
    mkdirSync(packageRoot, { recursive: true });
    writeFileSync(path.join(packageRoot, 'SKILL.md'), '---\nname: example\ndescription: Use for a test fixture.\n---\n');
    symlinkSync('SKILL.md', path.join(packageRoot, 'linked.md'));
    assert.throws(() => buildCatalog(sandbox), /unsupported symbolic link: linked\.md/);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('package digests reject non-regular filesystem entries', { skip: process.platform === 'win32' }, async () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-package-socket-'));
  const socketPath = path.join(sandbox, 'entry.sock');
  const server = createServer();
  try {
    writeFileSync(path.join(sandbox, 'SKILL.md'), 'body');
    await new Promise((resolve, reject) => {
      server.once('error', reject);
      server.listen(socketPath, resolve);
    });
    assert.throws(() => packageDigest(sandbox), /unsupported non-regular entry: entry\.sock/);
  } finally {
    if (server.listening) await new Promise((resolve) => server.close(resolve));
    rmSync(sandbox, { recursive: true, force: true });
  }
});
