import {
  cpSync,
  linkSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  readlinkSync,
  readdirSync,
  renameSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import { randomBytes } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { packageDigest } from './package-digest.mjs';

const OWNER = 'SylphxAI/skills';
const MANIFEST = '.sylphx-skills.json';
const LEGACY_MANIFEST = 'skills-binding-install-manifest.json';
const STORE = '.sylphx-managed-generations';
const STORE_OWNER = '.sylphx-managed-owner.json';
const CURRENT = '.sylphx-managed-current';
const PACKAGE_NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const GENERATION_NAME = /^generation-[0-9a-f]{16}$/;
const DIGEST = /^sha256:[0-9a-f]{64}$/;
const TOKEN = /^[0-9a-f]{32}$/;

function processStartIdentity(pid) {
  const command = process.platform === 'win32' ? 'powershell.exe' : 'ps';
  const args = process.platform === 'win32'
    ? ['-NoProfile', '-NonInteractive', '-Command', `(Get-Process -Id ${pid} -ErrorAction Stop).StartTime.ToUniversalTime().Ticks`]
    : ['-o', 'lstart=', '-p', String(pid)];
  const result = spawnSync(command, args, {
    encoding: 'utf8',
    timeout: 2_000,
  });
  if (result.status !== 0) return null;
  return String(result.stdout).trim() || null;
}

const SELF_PROCESS_IDENTITY = processStartIdentity(process.pid);

function pathExists(file) {
  try {
    lstatSync(file);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') return false;
    throw error;
  }
}

function readJson(file) {
  try {
    return JSON.parse(readFileSync(file, 'utf8'));
  } catch (error) {
    throw new Error(`invalid target-generation metadata at ${file}: ${error.message}`);
  }
}

function writeAtomicJson(file, value) {
  const temporary = `${file}.tmp-${process.pid}-${randomBytes(4).toString('hex')}`;
  writeFileSync(temporary, `${JSON.stringify(value, null, 2)}\n`, { mode: 0o600 });
  renameSync(temporary, file);
}

function generationRoot(targetPath) {
  return path.join(path.dirname(targetPath), `.${path.basename(targetPath)}.sylphx-generation`);
}

function transactionRoots(targetPath) {
  const root = generationRoot(targetPath);
  if (!pathExists(root)) return [];
  if (!lstatSync(root).isDirectory()) throw new Error(`invalid target-generation entry: ${root}`);
  return [root];
}

function removeTransaction(transactionRoot) {
  if (!pathExists(transactionRoot)) return;
  const discard = `${transactionRoot}-discard-${process.pid}-${randomBytes(4).toString('hex')}`;
  renameSync(transactionRoot, discard);
  rmSync(discard, { recursive: true, force: true });
}

function lockRoot(targetPath) {
  return path.join(path.dirname(targetPath), `.${path.basename(targetPath)}.sylphx-generation-lock`);
}

function validateLock(metadata, targetPath, root) {
  if (
    metadata?.schemaVersion !== 1
    || metadata?.owner !== OWNER
    || metadata?.target !== path.basename(targetPath)
    || !Number.isInteger(metadata?.pid)
    || metadata.pid <= 0
    || !Number.isFinite(metadata?.createdAt)
    || metadata.createdAt <= 0
    || !(metadata?.processStartIdentity === null || typeof metadata?.processStartIdentity === 'string')
    || !TOKEN.test(metadata?.token || '')
  ) throw new Error(`invalid target-generation lock: ${root}`);
  return metadata;
}

function readLock(root, targetPath) {
  const stat = lstatSync(root, { bigint: true });
  if (!stat.isFile()) throw new Error(`invalid target-generation lock: ${root}`);
  return {
    metadata: validateLock(readJson(root), targetPath, root),
    identity: `${stat.dev}:${stat.ino}`,
  };
}

function processAlive(pid) {
  if (pid === process.pid) return true;
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    if (error.code === 'ESRCH') return false;
    if (error.code === 'EPERM') return true;
    throw error;
  }
}

function lockOwnerActive(metadata) {
  if (!processAlive(metadata.pid)) return false;
  const observedIdentity = processStartIdentity(metadata.pid);
  if (metadata.processStartIdentity && observedIdentity) {
    return metadata.processStartIdentity === observedIdentity;
  }
  return true;
}

function claimLock(root, targetPath) {
  const token = randomBytes(16).toString('hex');
  const claim = `${root}-claim-${process.pid}-${randomBytes(4).toString('hex')}`;
  writeFileSync(claim, `${JSON.stringify({
    schemaVersion: 1,
    owner: OWNER,
    target: path.basename(targetPath),
    pid: process.pid,
    createdAt: Date.now(),
    processStartIdentity: SELF_PROCESS_IDENTITY,
    token,
  }, null, 2)}\n`, { mode: 0o600 });
  try {
    linkSync(claim, root);
    if (pathExists(reclaimMarker(root))) {
      rmSync(root, { force: true });
      rmSync(claim, { force: true });
      return null;
    }
    rmSync(claim, { force: true });
    return token;
  } catch (error) {
    rmSync(claim, { force: true });
    if (error.code === 'EEXIST') return null;
    throw error;
  }
}

function reclaimMarker(root) {
  return `${root}-reclaiming`;
}

function recoverReclaimMarker(root, targetPath) {
  const marker = reclaimMarker(root);
  if (!pathExists(marker)) return false;
  let marked;
  try {
    marked = readLock(marker, targetPath);
  } catch (error) {
    if (String(error.message).includes('ENOENT')) return false;
    throw error;
  }
  if (lockOwnerActive(marked.metadata)) {
    throw new Error(`target generation is busy: ${targetPath}`);
  }
  if (pathExists(root)) {
    let current;
    try {
      current = readLock(root, targetPath);
    } catch (error) {
      if (!String(error.message).includes('ENOENT')) throw error;
    }
    if (current) {
      if (current.identity !== marked.identity || current.metadata.token !== marked.metadata.token) {
        rmSync(marker, { force: true });
        if (lockOwnerActive(current.metadata)) throw new Error(`target generation is busy: ${targetPath}`);
        return false;
      }
      rmSync(root, { force: true });
    }
  }
  rmSync(marker, { force: true });
  return true;
}

function reclaimObservedLock(root, targetPath, observed) {
  const marker = reclaimMarker(root);
  try {
    linkSync(root, marker);
  } catch (error) {
    if (error.code === 'ENOENT') return false;
    if (error.code === 'EEXIST') return recoverReclaimMarker(root, targetPath);
    throw error;
  }
  let marked;
  try {
    marked = readLock(marker, targetPath);
  } catch (error) {
    if (String(error.message).includes('ENOENT')) return false;
    throw error;
  }
  if (marked.identity !== observed.identity || marked.metadata.token !== observed.metadata.token) {
    rmSync(marker, { force: true });
    return false;
  }
  return recoverReclaimMarker(root, targetPath);
}

function acquireTargetLock(targetPath) {
  mkdirSync(path.dirname(targetPath), { recursive: true });
  const root = lockRoot(targetPath);
  for (let attempt = 0; attempt < 8; attempt += 1) {
    if (pathExists(reclaimMarker(root))) {
      recoverReclaimMarker(root, targetPath);
      continue;
    }
    const token = claimLock(root, targetPath);
    if (token) return token;
    let observed;
    try {
      observed = readLock(root, targetPath);
    } catch (error) {
      if (String(error.message).includes('ENOENT')) continue;
      throw error;
    }
    if (lockOwnerActive(observed.metadata)) {
      throw new Error(`target generation is busy: ${targetPath}`);
    }
    reclaimObservedLock(root, targetPath, observed);
  }
  throw new Error(`could not acquire target-generation lock: ${targetPath}`);
}

function assertTargetLock(targetPath, token) {
  const root = lockRoot(targetPath);
  if (!pathExists(root) || readLock(root, targetPath).metadata.token !== token) {
    throw new Error(`target-generation lock ownership lost: ${targetPath}`);
  }
}

function releaseTargetLock(targetPath, token) {
  assertTargetLock(targetPath, token);
  rmSync(lockRoot(targetPath), { force: true });
}

/** Serialize every read or mutation that can recover or switch one target. */
export function withTargetGenerationLock(targetPath, operation) {
  const token = acquireTargetLock(targetPath);
  try {
    return operation(token);
  } finally {
    releaseTargetLock(targetPath, token);
  }
}

function storeRoot(targetPath) {
  return path.join(targetPath, STORE);
}

function currentPath(targetPath) {
  return path.join(targetPath, CURRENT);
}

function currentTarget(generationName) {
  return `${STORE}/${generationName}`;
}

function packageLinkTarget(name) {
  return `${CURRENT}/${name}`;
}

function managedSymlinkTargetMatches(file, actualTarget, expectedTarget) {
  if (
    typeof actualTarget !== 'string'
    || actualTarget.length === 0
    || /[\\/]$/.test(actualTarget)
    || actualTarget.split(/[\\/]+/).some((segment) => segment === '.' || segment === '..')
  ) return false;
  const actual = path.normalize(actualTarget);
  const relative = path.normalize(expectedTarget);
  if (actual === relative) return true;
  if (!path.isAbsolute(actual)) return false;
  const absolute = path.resolve(path.dirname(file), relative);
  return actual === absolute || actual === path.toNamespacedPath(absolute);
}

function existingCurrentGeneration(targetPath) {
  const current = currentPath(targetPath);
  if (!pathExists(current)) return null;
  const stat = lstatSync(current);
  if (!stat.isSymbolicLink()) throw new Error(`managed generation pointer is not a symbolic link: ${current}`);
  const target = readlinkSync(current);
  const generationName = path.basename(path.normalize(target));
  if (
    !GENERATION_NAME.test(generationName)
    || !managedSymlinkTargetMatches(current, target, currentTarget(generationName))
  ) {
    throw new Error(`managed generation pointer has an invalid target: ${current}`);
  }
  return generationName;
}

function exactSymlink(file, expectedTarget, expectedLocation = file) {
  if (!pathExists(file)) return false;
  const stat = lstatSync(file);
  return stat.isSymbolicLink()
    && managedSymlinkTargetMatches(expectedLocation, readlinkSync(file), expectedTarget);
}

function validateStoreOwner(targetPath, store) {
  const metadata = readJson(path.join(store, STORE_OWNER));
  if (
    metadata?.schemaVersion !== 1
    || metadata?.owner !== OWNER
    || metadata?.target !== path.basename(targetPath)
  ) throw new Error(`invalid managed generation store owner: ${store}`);
}

function ensureStore(targetPath, allowCreate = false) {
  const store = storeRoot(targetPath);
  if (!pathExists(store)) {
    if (!allowCreate) throw new Error(`managed generation store is missing: ${store}`);
    const claim = `${store}-claim-${process.pid}-${randomBytes(4).toString('hex')}`;
    mkdirSync(claim, { mode: 0o700 });
    writeAtomicJson(path.join(claim, STORE_OWNER), {
      schemaVersion: 1,
      owner: OWNER,
      target: path.basename(targetPath),
    });
    try {
      renameSync(claim, store);
    } catch (error) {
      rmSync(claim, { recursive: true, force: true });
      throw error;
    }
  } else if (lstatSync(store).isSymbolicLink() || !lstatSync(store).isDirectory()) {
    throw new Error(`managed generation store is not a regular directory: ${store}`);
  }
  validateStoreOwner(targetPath, store);
  return store;
}

function storeGenerationNames(targetPath) {
  const store = ensureStore(targetPath, false);
  const generations = [];
  for (const entry of readdirSync(store, { withFileTypes: true })) {
    if (entry.name === STORE_OWNER) continue;
    if (!GENERATION_NAME.test(entry.name) || !entry.isDirectory() || entry.isSymbolicLink()) {
      throw new Error(`unrecognized managed generation store entry: ${path.join(store, entry.name)}`);
    }
    generations.push(entry.name);
  }
  return generations.sort();
}

function recoverableCurrentGeneration(targetPath) {
  let current;
  let pointerError;
  try {
    current = existingCurrentGeneration(targetPath);
  } catch (error) {
    pointerError = error;
  }
  const generations = storeGenerationNames(targetPath);
  if (!pointerError && current !== null && generations.includes(current)) return current;
  if (generations.length === 1) return generations[0];
  if (pointerError) throw pointerError;
  if (generations.length === 0) return null;
  if (current === null) {
    throw new Error(`managed generation pointer is missing with multiple owned generations: ${currentPath(targetPath)}`);
  }
  throw new Error(`managed generation pointer references a missing generation: ${currentPath(targetPath)}`);
}

function ensureManagedLink(targetPath, name) {
  const destination = path.join(targetPath, name);
  const expected = packageLinkTarget(name);
  if (exactSymlink(destination, expected)) return;
  if (pathExists(destination)) throw new Error(`refusing to replace unrelated target entry: ${destination}`);
  symlinkSync(expected, destination, name === MANIFEST ? 'file' : 'dir');
}

function quarantineManagedDrift(targetPath, transactionRoot, name) {
  const destination = path.join(targetPath, name);
  if (!pathExists(destination)) return;
  const quarantineRoot = path.join(transactionRoot, 'managed-drift');
  mkdirSync(quarantineRoot, { recursive: true });
  const quarantine = path.join(quarantineRoot, name === MANIFEST ? 'manifest' : name);
  if (pathExists(quarantine)) throw new Error(`multiple managed target drifts require reconciliation: ${destination}`);
  renameSync(destination, quarantine);
}

function ensureBootstrap(targetPath, transactionRoot, metadata) {
  mkdirSync(targetPath, { recursive: true });
  const store = ensureStore(targetPath, !metadata.storeWasEstablished);
  const base = path.join(store, metadata.baseGenerationName);
  if (!pathExists(base)) mkdirSync(base, { mode: 0o700 });
  else if (!lstatSync(base).isDirectory() || lstatSync(base).isSymbolicLink()) {
    throw new Error(`invalid base managed generation: ${base}`);
  }

  const current = currentPath(targetPath);
  let observedCurrent;
  try {
    observedCurrent = existingCurrentGeneration(targetPath);
    if (observedCurrent !== null && !pathExists(path.join(store, observedCurrent))) {
      throw new Error(`managed generation pointer references a missing generation: ${current}`);
    }
  } catch (error) {
    if (!metadata.storeWasEstablished || !metadata.baseWasManaged || !pathExists(base)) throw error;
    quarantineManagedDrift(targetPath, transactionRoot, CURRENT);
    symlinkSync(currentTarget(metadata.baseGenerationName), current, 'dir');
    observedCurrent = metadata.baseGenerationName;
  }
  if (observedCurrent === null) symlinkSync(currentTarget(metadata.baseGenerationName), current, 'dir');
  else if (observedCurrent !== metadata.baseGenerationName) {
    throw new Error(`base managed generation changed during recovery: ${targetPath}`);
  }

  for (const name of metadata.previousSkills) {
    const destination = path.join(targetPath, name);
    const preserved = path.join(base, name);
    if (exactSymlink(destination, packageLinkTarget(name))) {
      if (!pathExists(preserved)) mkdirSync(preserved, { mode: 0o700 });
      continue;
    }
    if (metadata.baseWasManaged && pathExists(preserved)) {
      quarantineManagedDrift(targetPath, transactionRoot, name);
      symlinkSync(packageLinkTarget(name), destination, 'dir');
      continue;
    }
    if (pathExists(destination)) {
      if (pathExists(preserved)) throw new Error(`ambiguous legacy managed package: ${destination}`);
      renameSync(destination, preserved);
    } else if (!pathExists(preserved)) {
      mkdirSync(preserved, { mode: 0o700 });
    }
    symlinkSync(packageLinkTarget(name), destination, 'dir');
  }

  const manifestFile = path.join(targetPath, MANIFEST);
  const preservedManifest = path.join(base, MANIFEST);
  if (!exactSymlink(manifestFile, packageLinkTarget(MANIFEST))) {
    if (metadata.baseWasManaged && pathExists(preservedManifest)) {
      quarantineManagedDrift(targetPath, transactionRoot, MANIFEST);
      symlinkSync(packageLinkTarget(MANIFEST), manifestFile, 'file');
      return;
    }
    if (pathExists(manifestFile)) {
      if (pathExists(preservedManifest)) throw new Error(`ambiguous legacy ownership manifest: ${manifestFile}`);
      renameSync(manifestFile, preservedManifest);
    } else if (!pathExists(preservedManifest) && metadata.previousManifest) {
      writeAtomicJson(preservedManifest, metadata.previousManifest);
    }
    if (pathExists(manifestFile)) throw new Error(`refusing to replace unrelated ownership manifest: ${manifestFile}`);
    symlinkSync(packageLinkTarget(MANIFEST), manifestFile, 'file');
  }
}

function validateMetadata(metadata, targetPath, transactionRoot) {
  const skills = metadata?.manifest?.skills;
  const packageDigests = metadata?.manifest?.packageDigests;
  const previousSkills = metadata?.previousSkills;
  const removedSkills = metadata?.removedSkills;
  const validSkills = Array.isArray(skills)
    && new Set(skills).size === skills.length
    && skills.every((name) => PACKAGE_NAME.test(name));
  const validDigests = packageDigests
    && typeof packageDigests === 'object'
    && !Array.isArray(packageDigests)
    && validSkills
    && Object.keys(packageDigests).length === skills.length
    && skills.every((name) => DIGEST.test(packageDigests[name] || ''));
  if (
    metadata?.schemaVersion !== 2
    || metadata?.owner !== OWNER
    || metadata?.target !== path.basename(targetPath)
    || !['preparing', 'prepared', 'switched'].includes(metadata?.phase)
    || metadata?.manifest?.schemaVersion !== 1
    || metadata?.manifest?.owner !== OWNER
    || !DIGEST.test(metadata?.manifest?.catalogDigest || '')
    || !validSkills
    || !validDigests
    || !Array.isArray(metadata?.manifest?.profiles)
    || !Array.isArray(previousSkills)
    || new Set(previousSkills).size !== previousSkills.length
    || !previousSkills.every((name) => PACKAGE_NAME.test(name))
    || !Array.isArray(removedSkills)
    || new Set(removedSkills).size !== removedSkills.length
    || !removedSkills.every((name) => previousSkills.includes(name) && !skills.includes(name))
    || !GENERATION_NAME.test(metadata?.baseGenerationName || '')
    || !GENERATION_NAME.test(metadata?.generationName || '')
    || metadata.baseGenerationName === metadata.generationName
    || typeof metadata?.storeWasEstablished !== 'boolean'
    || typeof metadata?.baseWasManaged !== 'boolean'
  ) throw new Error(`invalid target-generation transaction: ${transactionRoot}`);
  return metadata;
}

function readMetadata(transactionRoot, targetPath) {
  const file = path.join(transactionRoot, 'transaction.json');
  if (!pathExists(file)) throw new Error(`unowned or incomplete target-generation transaction: ${transactionRoot}`);
  return validateMetadata(readJson(file), targetPath, transactionRoot);
}

function sameJson(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function generationMatches(candidateRoot, metadata) {
  if (!pathExists(candidateRoot)) return false;
  const stat = lstatSync(candidateRoot);
  if (stat.isSymbolicLink() || !stat.isDirectory()) return false;
  let manifest;
  try {
    manifest = readJson(path.join(candidateRoot, MANIFEST));
  } catch {
    return false;
  }
  if (!sameJson(manifest, metadata.manifest)) return false;
  try {
    return Object.entries(metadata.manifest.packageDigests)
      .every(([name, digest]) => packageDigest(path.join(candidateRoot, name)) === digest);
  } catch {
    return false;
  }
}

function removeNewLinks(targetPath, metadata) {
  for (const name of metadata.manifest.skills) {
    if (metadata.previousSkills.includes(name)) continue;
    const destination = path.join(targetPath, name);
    if (exactSymlink(destination, packageLinkTarget(name))) rmSync(destination, { force: true });
  }
}

function ensureDesiredLinks(targetPath, metadata) {
  for (const name of metadata.manifest.skills) ensureManagedLink(targetPath, name);
}

function removeManagedLink(targetPath, transactionRoot, name) {
  const destination = path.join(targetPath, name);
  if (!pathExists(destination)) return;
  const quarantineRoot = path.join(transactionRoot, 'removed-links');
  mkdirSync(quarantineRoot, { recursive: true });
  const quarantine = path.join(quarantineRoot, name);
  renameSync(destination, quarantine);
  if (!exactSymlink(quarantine, packageLinkTarget(name), destination)) {
    if (!pathExists(destination)) renameSync(quarantine, destination);
    throw new Error(`refusing to remove changed unrelated target entry: ${destination}`);
  }
  rmSync(quarantine, { force: true });
}

function switchCurrent(targetPath, transactionRoot, generationName) {
  const current = currentPath(targetPath);
  if (process.platform === 'win32') {
    // Windows resolves directory symlink targets at creation time and cannot
    // atomically replace the existing link with rename(). Publish a fixed,
    // transaction-recoverable sibling so its resolved target is anchored to
    // the final directory, then remove only a validated managed current link.
    const temporary = path.join(targetPath, `${CURRENT}.next`);
    if (pathExists(temporary)) {
      if (!exactSymlink(temporary, currentTarget(generationName), current)) {
        throw new Error(`unowned managed generation successor: ${temporary}`);
      }
    } else {
      symlinkSync(currentTarget(generationName), temporary, 'dir');
    }
    if (pathExists(current)) {
      existingCurrentGeneration(targetPath);
      rmSync(current, { force: true });
    }
    renameSync(temporary, current);
    return;
  }
  const temporary = path.join(transactionRoot, 'current-link');
  rmSync(temporary, { force: true });
  symlinkSync(currentTarget(generationName), temporary, 'dir');
  renameSync(temporary, current);
}

function finalizeCommitted(targetPath, transactionRoot, metadata) {
  ensureDesiredLinks(targetPath, metadata);
  for (const name of metadata.removedSkills) removeManagedLink(targetPath, transactionRoot, name);
  rmSync(path.join(targetPath, LEGACY_MANIFEST), { force: true });
  for (const entry of readdirSync(storeRoot(targetPath), { withFileTypes: true })) {
    if (entry.name === metadata.generationName || entry.name === STORE_OWNER) continue;
    if (!GENERATION_NAME.test(entry.name) || !entry.isDirectory()) {
      throw new Error(`unrecognized managed generation store entry: ${path.join(storeRoot(targetPath), entry.name)}`);
    }
    rmSync(path.join(storeRoot(targetPath), entry.name), { recursive: true, force: true });
  }
  removeTransaction(transactionRoot);
  return 'completed';
}

function recoverOne(targetPath, transactionRoot) {
  const metadata = readMetadata(transactionRoot, targetPath);
  const stage = path.join(transactionRoot, 'generation');
  const installed = path.join(storeRoot(targetPath), metadata.generationName);
  let current;
  try {
    current = existingCurrentGeneration(targetPath);
  } catch {
    ensureBootstrap(targetPath, transactionRoot, metadata);
    current = existingCurrentGeneration(targetPath);
  }
  if (current !== metadata.generationName) {
    ensureBootstrap(targetPath, transactionRoot, metadata);
    current = existingCurrentGeneration(targetPath);
  } else {
    ensureStore(targetPath, false);
  }

  if (metadata.phase === 'preparing') {
    if (current === metadata.generationName && generationMatches(installed, metadata)) {
      metadata.phase = 'switched';
      writeAtomicJson(path.join(transactionRoot, 'transaction.json'), metadata);
      return finalizeCommitted(targetPath, transactionRoot, metadata);
    }
    removeNewLinks(targetPath, metadata);
    rmSync(installed, { recursive: true, force: true });
    removeTransaction(transactionRoot);
    return 'rolled-back';
  }

  ensureDesiredLinks(targetPath, metadata);
  if (!pathExists(installed)) {
    if (!generationMatches(stage, metadata)) {
      throw new Error(`prepared target generation is missing or invalid: ${transactionRoot}`);
    }
    renameSync(stage, installed);
  }
  if (!generationMatches(installed, metadata)) {
    throw new Error(`installed target generation failed verification: ${installed}`);
  }
  if (existingCurrentGeneration(targetPath) !== metadata.generationName) {
    switchCurrent(targetPath, transactionRoot, metadata.generationName);
  }
  metadata.phase = 'switched';
  writeAtomicJson(path.join(transactionRoot, 'transaction.json'), metadata);
  return finalizeCommitted(targetPath, transactionRoot, metadata);
}

export function recoverTargetGeneration(targetPath, lockToken) {
  assertTargetLock(targetPath, lockToken);
  const transactions = transactionRoots(targetPath);
  return transactions.length ? recoverOne(targetPath, transactions[0]) : 'none';
}

function testCrash(boundary) {
  if (process.env.NODE_ENV === 'test' && process.env.SYLPHX_SKILLS_TEST_CRASH_AT === boundary) process.exit(86);
}

function testHold(boundary) {
  if (process.env.NODE_ENV !== 'test' || process.env.SYLPHX_SKILLS_TEST_HOLD_AT !== boundary) return;
  const milliseconds = Number(process.env.SYLPHX_SKILLS_TEST_HOLD_MS || 500);
  if (!Number.isFinite(milliseconds) || milliseconds < 0 || milliseconds > 5_000) {
    throw new Error('invalid test hold duration');
  }
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, milliseconds);
}

function testLateUnownedWrite(targetPath) {
  if (process.env.NODE_ENV !== 'test' || process.env.SYLPHX_SKILLS_TEST_LATE_UNOWNED_WRITE !== '1') return;
  const directory = path.join(targetPath, 'third-party-late-write');
  mkdirSync(directory, { recursive: true });
  writeFileSync(path.join(directory, 'KEEP'), 'late user-owned write\n');
}

export function installTargetGeneration({
  targetPath,
  sourceSkills,
  catalog,
  manifest,
  previousSkills = [],
  previousManifest = null,
  lockToken,
}) {
  assertTargetLock(targetPath, lockToken);
  recoverTargetGeneration(targetPath, lockToken);
  mkdirSync(targetPath, { recursive: true });
  const storeWasEstablished = pathExists(storeRoot(targetPath));
  if (storeWasEstablished) ensureStore(targetPath, false);
  const existingGeneration = storeWasEstablished
    ? recoverableCurrentGeneration(targetPath)
    : existingCurrentGeneration(targetPath);
  if (existingGeneration && !storeWasEstablished) {
    throw new Error(`managed generation pointer exists without an owned store: ${targetPath}`);
  }
  const ownedSkills = [...new Set(previousSkills)]
    .filter((name) => PACKAGE_NAME.test(name))
    .sort();
  for (const name of manifest.skills) {
    if (ownedSkills.includes(name)) continue;
    const destination = path.join(targetPath, name);
    if (pathExists(destination)) {
      throw new Error(`refusing to adopt unrelated target entry: ${destination}`);
    }
  }
  const metadata = {
    schemaVersion: 2,
    owner: OWNER,
    target: path.basename(targetPath),
    phase: 'preparing',
    manifest,
    previousManifest,
    previousSkills: ownedSkills,
    removedSkills: ownedSkills
      .filter((name) => PACKAGE_NAME.test(name) && !manifest.skills.includes(name))
      .sort(),
    baseGenerationName: existingGeneration || `generation-${randomBytes(8).toString('hex')}`,
    generationName: `generation-${randomBytes(8).toString('hex')}`,
    storeWasEstablished,
    baseWasManaged: existingGeneration !== null,
  };
  validateMetadata(metadata, targetPath, generationRoot(targetPath));

  const transactionRoot = generationRoot(targetPath);
  const claim = `${transactionRoot}-claim-${process.pid}-${randomBytes(4).toString('hex')}`;
  mkdirSync(claim, { mode: 0o700 });
  try {
    writeAtomicJson(path.join(claim, 'transaction.json'), metadata);
    renameSync(claim, transactionRoot);
  } catch (error) {
    rmSync(claim, { recursive: true, force: true });
    throw error;
  }

  try {
    ensureBootstrap(targetPath, transactionRoot, metadata);
    const stage = path.join(transactionRoot, 'generation');
    mkdirSync(stage, { mode: 0o700 });
    for (const skill of catalog.skills) {
      const destination = path.join(stage, skill.name);
      cpSync(path.join(sourceSkills, skill.name), destination, { recursive: true, preserveTimestamps: true });
      if (packageDigest(destination) !== skill.packageDigest) {
        throw new Error(`synchronized package digest mismatch: ${skill.name}`);
      }
      testCrash(`after-package:${skill.name}`);
    }
    for (const name of metadata.removedSkills) testCrash(`after-removal:${name}`);
    writeAtomicJson(path.join(stage, MANIFEST), manifest);
    testCrash('after-manifest');
    if (!generationMatches(stage, metadata)) throw new Error(`staged target generation failed verification: ${targetPath}`);
    metadata.phase = 'prepared';
    writeAtomicJson(path.join(transactionRoot, 'transaction.json'), metadata);
    ensureDesiredLinks(targetPath, metadata);
    testHold('before-switch');
    assertTargetLock(targetPath, lockToken);
    testLateUnownedWrite(targetPath);
    const installed = path.join(storeRoot(targetPath), metadata.generationName);
    renameSync(stage, installed);
    testCrash('after-backup');
    switchCurrent(targetPath, transactionRoot, metadata.generationName);
    testCrash('after-target');
    testHold('after-switch');
    metadata.phase = 'switched';
    writeAtomicJson(path.join(transactionRoot, 'transaction.json'), metadata);
    finalizeCommitted(targetPath, transactionRoot, metadata);
    return manifest;
  } catch (error) {
    assertTargetLock(targetPath, lockToken);
    recoverOne(targetPath, transactionRoot);
    throw error;
  }
}

export function managedPackagePath(targetPath, name) {
  return path.join(targetPath, CURRENT, name);
}

export function managedOwnedPackagePath(targetPath, name) {
  if (!managedGenerationEstablished(targetPath)) return null;
  return path.join(storeRoot(targetPath), recoverableCurrentGeneration(targetPath), name);
}

export function managedGenerationEstablished(targetPath) {
  try {
    ensureStore(targetPath, false);
    const generation = recoverableCurrentGeneration(targetPath);
    if (!generation) return false;
    const installed = path.join(storeRoot(targetPath), generation);
    return pathExists(installed) && lstatSync(installed).isDirectory();
  } catch {
    return false;
  }
}

export function managedCurrentGeneration(targetPath) {
  try {
    if (!managedGenerationEstablished(targetPath)) return null;
    return recoverableCurrentGeneration(targetPath) || null;
  } catch {
    return null;
  }
}

export function managedGenerationSkills(targetPath) {
  if (!managedGenerationEstablished(targetPath)) return [];
  const generation = recoverableCurrentGeneration(targetPath);
  const names = readdirSync(path.join(storeRoot(targetPath), generation), { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && PACKAGE_NAME.test(entry.name))
    .map((entry) => entry.name);
  for (const entry of readdirSync(targetPath, { withFileTypes: true })) {
    if (!entry.isSymbolicLink() || !PACKAGE_NAME.test(entry.name)) continue;
    if (exactSymlink(path.join(targetPath, entry.name), packageLinkTarget(entry.name))) names.push(entry.name);
  }
  return [...new Set(names)].sort();
}

export function managedTargetCurrent(targetPath, names) {
  try {
    if (!managedGenerationEstablished(targetPath)) return false;
    const generation = existingCurrentGeneration(targetPath);
    if (!generation || !pathExists(path.join(storeRoot(targetPath), generation))) return false;
    if (!exactSymlink(path.join(targetPath, MANIFEST), packageLinkTarget(MANIFEST))) return false;
    const expected = [...new Set(names)].sort();
    if (JSON.stringify(managedGenerationSkills(targetPath)) !== JSON.stringify(expected)) return false;
    return expected.every((name) => exactSymlink(path.join(targetPath, name), packageLinkTarget(name)));
  } catch {
    return false;
  }
}

export function clearTargetGeneration(targetPath, names, lockToken) {
  assertTargetLock(targetPath, lockToken);
  recoverTargetGeneration(targetPath, lockToken);
  const store = storeRoot(targetPath);
  const managedStore = pathExists(store);
  if (managedStore) ensureStore(targetPath, false);
  const currentGeneration = managedStore ? recoverableCurrentGeneration(targetPath) : existingCurrentGeneration(targetPath);
  for (const name of names) {
    const destination = path.join(targetPath, name);
    if (exactSymlink(destination, packageLinkTarget(name)) || (!managedStore && pathExists(destination) && !currentGeneration)) {
      rmSync(destination, { recursive: true, force: true });
    }
  }
  const manifest = path.join(targetPath, MANIFEST);
  if (exactSymlink(manifest, packageLinkTarget(MANIFEST)) || (!managedStore && pathExists(manifest) && !currentGeneration)) {
    rmSync(manifest, { force: true });
  }
  const current = currentPath(targetPath);
  if (pathExists(current)) {
    existingCurrentGeneration(targetPath);
    rmSync(current, { force: true });
  }
  if (managedStore) rmSync(store, { recursive: true, force: true });
}

export function targetGenerationTransactionNames(targetPath) {
  return transactionRoots(targetPath).map((entry) => path.basename(entry));
}
