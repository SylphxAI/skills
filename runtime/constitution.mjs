import { createHash, randomBytes } from 'node:crypto';
import {
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  renameSync,
  writeFileSync,
} from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const CONSTITUTION_START = '<!-- sylphx-managed-constitution:start -->';
export const CONSTITUTION_END = '<!-- sylphx-managed-constitution:end -->';
export const constitutionSourcePath = fileURLToPath(new URL('./constitution.md', import.meta.url));

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

export function canonicalConstitution() {
  return readFileSync(constitutionSourcePath, 'utf8').trimEnd();
}

export function constitutionDigest(source = canonicalConstitution()) {
  return `sha256:${createHash('sha256').update(source).digest('hex')}`;
}

export function managedConstitutionBlock(source = canonicalConstitution()) {
  return [
    CONSTITUTION_START,
    `source: https://github.com/SylphxAI/skills/blob/main/runtime/constitution.md`,
    `content-digest: ${constitutionDigest(source)}`,
    '',
    source,
    CONSTITUTION_END,
  ].join('\n');
}

function assertRegularInstructionFile(file) {
  const runtimeHome = path.dirname(file);
  if (existsSync(runtimeHome)) {
    const homeStat = lstatSync(runtimeHome);
    if (!homeStat.isDirectory() || homeStat.isSymbolicLink()) {
      throw new Error(`Refusing instruction file under non-regular runtime home: ${runtimeHome}`);
    }
  }
  if (!existsSync(file)) return;
  const stat = lstatSync(file);
  if (!stat.isFile() || stat.isSymbolicLink()) {
    throw new Error(`Refusing to modify non-regular instruction file: ${file}`);
  }
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
  assertRegularInstructionFile(file);
  const current = existsSync(file) ? readFileSync(file, 'utf8') : '';
  const range = splitManagedBlock(current, file);
  const block = managedConstitutionBlock(source);
  const next = range
    ? `${current.slice(0, range.start)}${block}${current.slice(range.end)}`
    : appendBlock(current, block);
  return { file, current, next, changed: current !== next };
}

export function planConstitutionRemoval(file) {
  assertRegularInstructionFile(file);
  const current = existsSync(file) ? readFileSync(file, 'utf8') : '';
  const range = splitManagedBlock(current, file);
  if (!range) return { file, current, next: current, changed: false };
  const before = current.slice(0, range.start).trimEnd();
  const after = current.slice(range.end).trimStart();
  const next = before && after ? `${before}\n\n${after}` : `${before}${after}`;
  return { file, current, next: next ? `${next.trimEnd()}\n` : '', changed: true };
}

export function applyConstitutionPlan(plan) {
  if (!plan?.changed) return;
  const observed = existsSync(plan.file) ? readFileSync(plan.file, 'utf8') : '';
  if (observed !== plan.current) {
    throw new Error(`Instruction file changed during Sylphx constitution update: ${plan.file}`);
  }
  mkdirSync(path.dirname(plan.file), { recursive: true });
  const mode = existsSync(plan.file) ? lstatSync(plan.file).mode & 0o777 : 0o644;
  const temporary = `${plan.file}.sylphx-${process.pid}-${randomBytes(4).toString('hex')}`;
  writeFileSync(temporary, plan.next, { mode });
  renameSync(temporary, plan.file);
}

export function inspectConstitution(file, source = canonicalConstitution()) {
  try {
    assertRegularInstructionFile(file);
    if (!existsSync(file)) {
      return { path: file, installed: false, current: false, contentDigest: constitutionDigest(source), error: null };
    }
    const current = readFileSync(file, 'utf8');
    const range = splitManagedBlock(current, file);
    const expected = managedConstitutionBlock(source);
    const actual = range ? current.slice(range.start, range.end) : null;
    return {
      path: file,
      installed: Boolean(range),
      current: actual === expected,
      contentDigest: constitutionDigest(source),
      error: null,
    };
  } catch (error) {
    return {
      path: file,
      installed: false,
      current: false,
      contentDigest: constitutionDigest(source),
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
