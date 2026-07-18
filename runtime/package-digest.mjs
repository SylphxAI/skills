import { createHash } from 'node:crypto';
import { lstatSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

function relativePackagePath(packageRoot, file) {
  return path.relative(packageRoot, file).split(path.sep).join('/');
}

function rejectUnsupportedEntry(packageRoot, absolute, kind) {
  const relative = relativePackagePath(packageRoot, absolute) || '.';
  throw new Error(`skill package contains unsupported ${kind}: ${relative}`);
}

/** Hash one package from a platform-neutral manifest of paths and file hashes. */
export function packageDigest(packageRoot) {
  let rootStat;
  try {
    rootStat = lstatSync(packageRoot);
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
  if (rootStat.isSymbolicLink()) rejectUnsupportedEntry(packageRoot, packageRoot, 'symbolic link');
  if (!rootStat.isDirectory()) rejectUnsupportedEntry(packageRoot, packageRoot, 'non-directory root');

  const records = [];
  const visit = (directory) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const absolute = path.join(directory, entry.name);
      if (entry.isSymbolicLink()) rejectUnsupportedEntry(packageRoot, absolute, 'symbolic link');
      if (entry.isDirectory()) {
        visit(absolute);
        continue;
      }
      if (!entry.isFile()) rejectUnsupportedEntry(packageRoot, absolute, 'non-regular entry');
      const stat = lstatSync(absolute);
      if (stat.isSymbolicLink()) rejectUnsupportedEntry(packageRoot, absolute, 'symbolic link');
      if (!stat.isFile()) rejectUnsupportedEntry(packageRoot, absolute, 'non-regular entry');
      records.push({
        path: relativePackagePath(packageRoot, absolute),
        contentSha256: createHash('sha256').update(readFileSync(absolute)).digest('hex'),
      });
    }
  };
  visit(packageRoot);
  records.sort((left, right) => (left.path < right.path ? -1 : left.path > right.path ? 1 : 0));
  const canonical = JSON.stringify({ schemaVersion: 1, files: records });
  return `sha256:${createHash('sha256').update(canonical).digest('hex')}`;
}
