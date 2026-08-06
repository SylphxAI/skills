import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { packageDigest } from '../runtime/package-digest.mjs';
import { buildCatalog, parseFrontmatter, repositoryRoot } from '../scripts/build-catalog.mjs';

test('frontmatter parsing is identical for LF and CRLF checkouts', () => {
  const lf = '---\nname: example\ndescription: Use for a checkout portability test.\n---\n\n# Example\n';
  const crlf = lf.replaceAll('\n', '\r\n');
  assert.deepEqual(parseFrontmatter(crlf, 'CRLF.md'), parseFrontmatter(lf, 'LF.md'));
});

test('catalog is deterministic and covers every canonical package', () => {
  const catalog = buildCatalog(repositoryRoot);
  assert.equal(catalog.schemaVersion, 1);
  assert.ok(catalog.count > 0);
  assert.equal(catalog.skills.length, catalog.count);
  assert.deepEqual(
    catalog.skills.map((skill) => skill.name),
    [...catalog.skills.map((skill) => skill.name)].sort(),
  );
  assert.equal(new Set(catalog.skills.map((skill) => skill.name)).size, catalog.count);
  const stored = JSON.parse(readFileSync(new URL('../catalog.json', import.meta.url), 'utf8'));
  assert.deepEqual(stored, catalog);
});

test('package digests preserve file boundaries and reject symbolic links', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-package-digest-'));
  const splitPackage = path.join(sandbox, 'split');
  const embeddedPackage = path.join(sandbox, 'embedded');
  try {
    mkdirSync(path.join(splitPackage, 'references'), { recursive: true });
    writeFileSync(path.join(splitPackage, 'SKILL.md'), 'a');
    writeFileSync(path.join(splitPackage, 'references', 'note.md'), 'b');
    mkdirSync(embeddedPackage, { recursive: true });
    writeFileSync(path.join(embeddedPackage, 'SKILL.md'), 'ab');
    assert.notEqual(packageDigest(splitPackage), packageDigest(embeddedPackage));

    const linked = path.join(sandbox, 'linked');
    mkdirSync(linked, { recursive: true });
    writeFileSync(path.join(linked, 'SKILL.md'), 'x');
    symlinkSync(path.join(linked, 'SKILL.md'), path.join(linked, 'alias.md'));
    assert.throws(() => packageDigest(linked), /symbolic link|symlink|not a regular file/i);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});
