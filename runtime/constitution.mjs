import { createHash, randomBytes } from 'node:crypto';
import {
  lstatSync,
  mkdirSync,
  readFileSync,
  readlinkSync,
  renameSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const CONSTITUTION_START = '<!-- sylphx-managed-constitution:start -->';
export const CONSTITUTION_END = '<!-- sylphx-managed-constitution:end -->';
export const RETIRED_DOCTRINE_MIGRATION = 'retired_doctrine_projection';
export const constitutionSourcePath = fileURLToPath(new URL('./constitution.md', import.meta.url));

const LEGACY_LOCAL_NOTES_MARKER = '<!-- local runtime notes may follow this block -->';
const MAX_LEGACY_INSTRUCTION_BYTES = 8 * 1024;

function occurrences(value, needle) {
  const indexes = [];
  let cursor = 0;
  while (cursor < value.length) {
    const index = value.indexOf(needle, cursor);
    if (index === -1) break;
    indexes.push(index);
    cursor = index + needle.length;
  }
  return indexes;
}

function lstatIfPresent(file) {
  try {
    return lstatSync(file);
  } catch (error) {
    if (error?.code === 'ENOENT') return null;
    throw error;
  }
}

function assertRegularRuntimeHome(file) {
  const runtimeHome = path.dirname(file);
  const homeStat = lstatIfPresent(runtimeHome);
  if (homeStat && (!homeStat.isDirectory() || homeStat.isSymbolicLink())) {
    throw new Error(`Refusing instruction file under non-regular runtime home: ${runtimeHome}`);
  }
}

function retiredDoctrineInstructionPath(file) {
  return path.join(path.dirname(path.dirname(file)), '.doctrine-runtime-current', 'templates', 'AGENTS.md');
}

function validateLegacyConstitution(content, target) {
  const markerIndexes = occurrences(content, LEGACY_LOCAL_NOTES_MARKER);
  if (
    !content.startsWith('# Sylphx Agent Runtime Constitution\n')
    || !content.includes('**Static instructions SSOT:** `SylphxAI/skills`')
    || !content.includes('**Live fleet / work / ingestion / effects:** `SylphxAI/control-plane`')
    || markerIndexes.length !== 1
    || content.includes(CONSTITUTION_START)
    || content.includes(CONSTITUTION_END)
  ) {
    throw new Error(`Refusing unrecognized retired Doctrine instruction projection: ${target}`);
  }
  return content.slice(markerIndexes[0] + LEGACY_LOCAL_NOTES_MARKER.length).trimStart();
}

function validateLegacyTarget(target, ownerStat) {
  const targetStat = lstatIfPresent(target);
  if (!targetStat || !targetStat.isFile() || targetStat.isSymbolicLink()) {
    throw new Error(`Refusing non-regular retired Doctrine instruction target: ${target}`);
  }
  if (targetStat.size > MAX_LEGACY_INSTRUCTION_BYTES) {
    throw new Error(`Refusing oversized retired Doctrine instruction target: ${target}`);
  }
  if ((targetStat.mode & 0o022) !== 0) {
    throw new Error(`Refusing group/world-writable retired Doctrine instruction target: ${target}`);
  }
  if (ownerStat && ownerStat.uid !== targetStat.uid) {
    throw new Error(`Refusing cross-owner retired Doctrine instruction target: ${target}`);
  }
  if (typeof process.getuid === 'function' && targetStat.uid !== process.getuid()) {
    throw new Error(`Refusing retired Doctrine instruction target not owned by the current user: ${target}`);
  }
  const content = readFileSync(target, 'utf8');
  const localNotes = validateLegacyConstitution(content, target);
  return {
    content,
    localNotes,
    snapshot: {
      path: target,
      dev: targetStat.dev,
      ino: targetStat.ino,
      uid: targetStat.uid,
      mode: targetStat.mode,
      size: targetStat.size,
      contentDigest: constitutionDigest(content),
    },
  };
}

function legacyClaudeMapping(file, current, fileStat) {
  if (path.basename(file) !== 'CLAUDE.md') return null;
  const target = retiredDoctrineInstructionPath(file);
  const prefix = `# Claude Code runtime mapping\n\n@${target}\n\n`;
  if (!current.startsWith(prefix)) {
    if (/(?:^|\n)@[^\n]*\.doctrine-runtime-current[\\/]/u.test(current)) {
      throw new Error(`Refusing unrecognized retired Doctrine runtime mapping in ${file}`);
    }
    return null;
  }
  const legacy = validateLegacyTarget(target, fileStat);
  return {
    localNotes: current.slice(prefix.length),
    migrationRequired: RETIRED_DOCTRINE_MIGRATION,
    legacyTarget: legacy.snapshot,
  };
}

function captureInstruction(file, { allowLegacySymlink = true } = {}) {
  assertRegularRuntimeHome(file);
  const stat = lstatIfPresent(file);
  if (!stat) return { kind: 'missing', content: '', mode: 0o644 };
  if (stat.isFile() && !stat.isSymbolicLink()) {
    const content = readFileSync(file, 'utf8');
    const mapping = legacyClaudeMapping(file, content, stat);
    return {
      kind: 'file',
      content,
      effectiveContent: mapping?.localNotes ?? content,
      migrationRequired: mapping?.migrationRequired ?? null,
      legacyTarget: mapping?.legacyTarget ?? null,
      mode: stat.mode & 0o777,
      dev: stat.dev,
      ino: stat.ino,
      uid: stat.uid,
    };
  }
  if (stat.isSymbolicLink() && allowLegacySymlink) {
    const expectedTarget = retiredDoctrineInstructionPath(file);
    const linkTarget = readlinkSync(file);
    const resolvedTarget = path.resolve(path.dirname(file), linkTarget);
    if (resolvedTarget !== expectedTarget) {
      throw new Error(`Refusing to modify non-regular instruction file: ${file}`);
    }
    const legacy = validateLegacyTarget(expectedTarget, stat);
    return {
      kind: 'legacy-symlink',
      content: legacy.content,
      effectiveContent: legacy.localNotes,
      migrationRequired: RETIRED_DOCTRINE_MIGRATION,
      legacyTarget: legacy.snapshot,
      linkTarget,
      mode: 0o644,
      dev: stat.dev,
      ino: stat.ino,
      uid: stat.uid,
    };
  }
  throw new Error(`Refusing to modify non-regular instruction file: ${file}`);
}

function sameSnapshot(expected, observed) {
  if (expected.kind !== observed.kind) return false;
  if (expected.kind === 'missing') return true;
  if (
    expected.content !== observed.content
    || expected.dev !== observed.dev
    || expected.ino !== observed.ino
    || expected.uid !== observed.uid
  ) return false;
  if (expected.kind === 'legacy-symlink' && expected.linkTarget !== observed.linkTarget) return false;
  const expectedLegacy = expected.legacyTarget;
  const observedLegacy = observed.legacyTarget;
  return (!expectedLegacy && !observedLegacy) || (
    expectedLegacy
    && observedLegacy
    && expectedLegacy.path === observedLegacy.path
    && expectedLegacy.dev === observedLegacy.dev
    && expectedLegacy.ino === observedLegacy.ino
    && expectedLegacy.uid === observedLegacy.uid
    && expectedLegacy.mode === observedLegacy.mode
    && expectedLegacy.size === observedLegacy.size
    && expectedLegacy.contentDigest === observedLegacy.contentDigest
  );
}

export function canonicalConstitution() {
  return readFileSync(constitutionSourcePath, 'utf8').trimEnd();
}

export function constitutionDigest(source = canonicalConstitution()) {
  return `sha256:${createHash('sha256').update(source).digest('hex')}`;
}

export function managedConstitutionBlock(source = canonicalConstitution()) {
  return [
    CONSTITUTION_START,
    'source: https://github.com/SylphxAI/skills/blob/main/runtime/constitution.md',
    `content-digest: ${constitutionDigest(source)}`,
    '',
    source,
    CONSTITUTION_END,
  ].join('\n');
}

function splitManagedBlock(current, file) {
  const starts = occurrences(current, CONSTITUTION_START);
  const ends = occurrences(current, CONSTITUTION_END);
  if (!starts.length && !ends.length) return null;
  if (starts.length !== 1 || ends.length !== 1 || starts[0] >= ends[0]) {
    throw new Error(`Refusing malformed Sylphx constitution markers in ${file}`);
  }
  return {
    start: starts[0],
    end: ends[0] + CONSTITUTION_END.length,
  };
}

function appendBlock(current, block) {
  if (!current) return `${block}\n`;
  return `${current.trimEnd()}\n\n${block}\n`;
}

export function planConstitutionInstall(file, source = canonicalConstitution()) {
  const snapshot = captureInstruction(file);
  const active = snapshot.effectiveContent ?? snapshot.content;
  const range = splitManagedBlock(active, file);
  const block = managedConstitutionBlock(source);
  const next = range
    ? `${active.slice(0, range.start)}${block}${active.slice(range.end)}`
    : appendBlock(active, block);
  return {
    file,
    current: snapshot.content,
    next,
    changed: snapshot.content !== next || snapshot.migrationRequired !== null,
    migrationRequired: snapshot.migrationRequired ?? null,
    snapshot,
  };
}

export function planConstitutionRemoval(file) {
  const snapshot = captureInstruction(file);
  if (snapshot.kind === 'legacy-symlink') {
    return { file, current: snapshot.content, next: snapshot.content, changed: false, snapshot };
  }
  const current = snapshot.content;
  const range = splitManagedBlock(current, file);
  if (!range) return { file, current, next: current, changed: false, snapshot };
  const before = current.slice(0, range.start).trimEnd();
  const after = current.slice(range.end).trimStart();
  const next = before && after ? `${before}\n\n${after}` : `${before}${after}`;
  return { file, current, next: next ? `${next.trimEnd()}\n` : '', changed: true, snapshot };
}

export function applyConstitutionPlan(plan) {
  if (!plan?.changed) return;
  const observed = captureInstruction(plan.file);
  if (!sameSnapshot(plan.snapshot, observed)) {
    throw new Error(`Instruction file changed during Sylphx constitution update: ${plan.file}`);
  }
  mkdirSync(path.dirname(plan.file), { recursive: true });
  const temporary = `${plan.file}.sylphx-${process.pid}-${randomBytes(4).toString('hex')}`;
  try {
    writeFileSync(temporary, plan.next, { mode: plan.snapshot.mode ?? 0o644 });
    renameSync(temporary, plan.file);
  } finally {
    rmSync(temporary, { force: true });
  }
}

export function inspectConstitution(file, source = canonicalConstitution()) {
  try {
    const snapshot = captureInstruction(file);
    if (snapshot.kind === 'missing') {
      return {
        path: file,
        installed: false,
        current: false,
        contentDigest: constitutionDigest(source),
        migrationRequired: null,
        error: null,
      };
    }
    const active = snapshot.effectiveContent ?? snapshot.content;
    const range = splitManagedBlock(active, file);
    const expected = managedConstitutionBlock(source);
    const actual = range ? active.slice(range.start, range.end) : null;
    return {
      path: file,
      installed: Boolean(range),
      current: actual === expected && snapshot.migrationRequired === null,
      contentDigest: constitutionDigest(source),
      migrationRequired: snapshot.migrationRequired ?? null,
      error: null,
    };
  } catch (error) {
    return {
      path: file,
      installed: false,
      current: false,
      contentDigest: constitutionDigest(source),
      migrationRequired: null,
      error: error.message,
    };
  }
}

export function runtimeInstructionPath(target) {
  const runtimeHome = path.dirname(target.path);
  if (target.runtime === 'codex' || target.runtime === 'grok') return path.join(runtimeHome, 'AGENTS.md');
  if (target.runtime === 'claude') return path.join(runtimeHome, 'CLAUDE.md');
  return null;
}
