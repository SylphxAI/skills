#!/usr/bin/env node

/**
 * Promotion authority for the release-tag AutoSync channel.
 *
 * Usage (inside a clean checkout of main, from the CI release job):
 *   node scripts/promote-release.mjs --version 7.0.0 [--tag-prefix skills-v]
 *
 * Contract:
 *   1. The working tree must be clean and the checkout must be a full clone
 *      (the tag commit's first parent must resolve).
 *   2. version must be X.Y.Z without prerelease/build metadata; the promoted
 *      tag is `<tagPrefix><version>`.
 *   3. promotion.json is generated from the candidate tree at HEAD:
 *      sourceRevision = HEAD (the promoted main revision), catalogDigest =
 *      sha256(catalog.json bytes), qualifiedNames from catalog.json.
 *   4. The script commits exactly one manifest commit and creates an annotated
 *      tag at it. The reconciler later verifies the manifest against the tag
 *      commit's tree and its first parent, so the manifest cannot be
 *      transplanted onto another tree.
 *
 * The script never pushes. The release workflow pushes the tag (the manifest
 * commit lives only inside the tag, which keeps main free of promotion
 * artifacts and avoids branch-protection push requirements).
 */

import { createHash } from 'node:crypto';
import { existsSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const VERSION = /^(\d+)\.(\d+)\.(\d+)$/;

function git(args, { tolerate = false } = {}) {
  const result = spawnSync('git', args, { encoding: 'utf8', cwd: root });
  if (result.status !== 0 && !tolerate) {
    throw new Error(`git ${args.join(' ')} failed: ${String(result.stderr || result.stdout).trim()}`);
  }
  return result;
}

function argumentValue(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function main() {
  const version = argumentValue('--version') || '';
  const tagPrefix = argumentValue('--tag-prefix') || 'skills-v';
  const match = version.match(VERSION);
  if (!match) throw new Error('--version must be X.Y.Z without prerelease or build metadata');
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(tagPrefix)) throw new Error(`invalid tag prefix: ${tagPrefix}`);
  const tagName = `${tagPrefix}${version}`;

  const dirty = git(['status', '--porcelain', '--untracked-files=all']).stdout.trim();
  if (dirty) throw new Error(`refusing to promote from a dirty working tree:\n${dirty}`);
  const head = git(['rev-parse', 'HEAD']).stdout.trim();
  if (!/^[0-9a-f]{40,64}$/.test(head)) throw new Error('cannot resolve HEAD');

  const existingTag = git(['rev-parse', '--verify', `refs/tags/${tagName}`], { tolerate: true });
  if (existingTag.status === 0) throw new Error(`tag ${tagName} already exists; promotion is immutable`);

  const catalogPath = path.join(root, 'catalog.json');
  if (!existsSync(catalogPath) || !statSync(catalogPath).isFile()) throw new Error('catalog.json missing');
  const catalogBytes = readFileSync(catalogPath, 'utf8');
  let catalog;
  try {
    catalog = JSON.parse(catalogBytes);
  } catch (error) {
    throw new Error(`catalog.json is invalid: ${error.message}`);
  }
  const qualifiedNames = (Array.isArray(catalog?.qualification?.qualifiedNames)
    ? catalog.qualification.qualifiedNames
    : [])
    .slice()
    .sort();

  const manifest = {
    schemaVersion: 1,
    owner: 'SylphxAI/skills',
    channel: 'release-tag',
    sourceRevision: head,
    catalogDigest: `sha256:${createHash('sha256').update(catalogBytes).digest('hex')}`,
    qualifiedNames,
    promotedAt: new Date().toISOString(),
  };
  const manifestPath = path.join(root, 'promotion.json');
  if (existsSync(manifestPath) && readFileSync(manifestPath, 'utf8') !== `${JSON.stringify(manifest, null, 2)}\n`) {
    throw new Error('promotion.json already exists with different content; resolve before promoting');
  }
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  git(['config', 'user.name', 'sylphx-release-bot']);
  git(['config', 'user.email', 'release@sylphx.ai']);
  git(['add', 'promotion.json']);
  git(['commit', '-m', `release: ${tagName} promotion manifest`]);
  const manifestSha = git(['rev-parse', 'HEAD']).stdout.trim();
  git(['tag', '-a', tagName, '-m', `Sylphx Verified Capabilities promotion ${tagName}`, manifestSha]);

  console.log(JSON.stringify({
    tag: tagName,
    tagSha: git(['rev-parse', '--verify', `${tagName}^{}`]).stdout.trim(),
    manifestCommit: manifestSha,
    sourceRevision: head,
    catalogDigest: manifest.catalogDigest,
    qualifiedNames,
  }, null, 2));
}

try {
  main();
} catch (error) {
  console.error(`promote-release: ${error.message}`);
  process.exit(1);
}
