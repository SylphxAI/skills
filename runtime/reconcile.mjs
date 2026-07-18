#!/usr/bin/env node

import {
  cpSync,
  existsSync,
  linkSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  realpathSync,
  renameSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { randomBytes } from 'node:crypto';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const scriptFile = fileURLToPath(import.meta.url);
const defaultStateDirectory = process.env.SYLPHX_SKILLS_STATE_DIR
  ? path.resolve(process.env.SYLPHX_SKILLS_STATE_DIR)
  : path.dirname(scriptFile);
const LOCK_TOKEN = /^[0-9a-f]{32}$/;

function processStartIdentity(pid) {
  const command = process.platform === 'win32' ? 'powershell.exe' : 'ps';
  const args = process.platform === 'win32'
    ? ['-NoProfile', '-NonInteractive', '-Command', `(Get-Process -Id ${pid} -ErrorAction Stop).StartTime.ToUniversalTime().Ticks`]
    : ['-o', 'lstart=', '-p', String(pid)];
  const result = spawnSync(command, args, { encoding: 'utf8', timeout: 2_000 });
  if (result.status !== 0) return null;
  return String(result.stdout).trim() || null;
}

const SELF_PROCESS_IDENTITY = processStartIdentity(process.pid);

function readJson(file, fallback) {
  if (!existsSync(file)) return structuredClone(fallback);
  try {
    return JSON.parse(readFileSync(file, 'utf8'));
  } catch {
    return structuredClone(fallback);
  }
}

function writeAtomic(file, bytes, mode = 0o600) {
  mkdirSync(path.dirname(file), { recursive: true });
  const temporary = `${file}.tmp-${process.pid}-${randomBytes(4).toString('hex')}`;
  writeFileSync(temporary, bytes, { mode });
  renameSync(temporary, file);
}

function execute(command, args, options = {}) {
  return spawnSync(command, args, {
    encoding: 'utf8',
    maxBuffer: 4 * 1024 * 1024,
    timeout: options.timeout || 30_000,
    env: options.env || process.env,
    stdio: options.stdio || 'pipe',
  });
}

function checked(run, command, args, options = {}) {
  const result = run(command, args, options);
  if (result.status !== 0) {
    const detail = String(result.stderr || result.stdout || result.error?.message || '').trim();
    throw new Error(`${command} ${args.join(' ')} failed${detail ? `: ${detail}` : ''}`);
  }
  return result;
}

function parseRemoteHead(output) {
  const match = String(output).trim().match(/^([0-9a-f]{40,64})\s+refs\/heads\//);
  if (!match) throw new Error('Remote main did not return one valid commit identity');
  return match[1];
}

function pathEntryExists(file) {
  try {
    lstatSync(file);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') return false;
    throw error;
  }
}

function validateLock(metadata, lockFile) {
  if (
    metadata?.schemaVersion !== 1
    || metadata?.owner !== 'SylphxAI/skills'
    || !Number.isInteger(metadata?.pid)
    || metadata.pid <= 0
    || !Number.isFinite(metadata?.createdAt)
    || metadata.createdAt <= 0
    || !(metadata?.processStartIdentity === null || typeof metadata?.processStartIdentity === 'string')
    || !LOCK_TOKEN.test(metadata?.token || '')
  ) throw new Error(`invalid reconcile lock: ${lockFile}`);
  return metadata;
}

function readLock(lockFile) {
  const stat = lstatSync(lockFile, { bigint: true });
  if (!stat.isFile()) throw new Error(`invalid reconcile lock: ${lockFile}`);
  let metadata;
  try {
    metadata = JSON.parse(readFileSync(lockFile, 'utf8'));
  } catch (error) {
    throw new Error(`invalid reconcile lock at ${lockFile}: ${error.message}`);
  }
  return {
    metadata: validateLock(metadata, lockFile),
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

function reclaimMarker(lockFile) {
  return `${lockFile}.reclaiming`;
}

function recoverReclaimMarker(lockFile) {
  const marker = reclaimMarker(lockFile);
  if (!pathEntryExists(marker)) return false;
  let marked;
  try {
    marked = readLock(marker);
  } catch {
    return false;
  }
  if (lockOwnerActive(marked.metadata)) return false;
  if (pathEntryExists(lockFile)) {
    let current;
    try {
      current = readLock(lockFile);
    } catch {
      return false;
    }
    if (current.identity !== marked.identity || current.metadata.token !== marked.metadata.token) {
      rmSync(marker, { force: true });
      return false;
    }
    rmSync(lockFile, { force: true });
  }
  rmSync(marker, { force: true });
  return true;
}

function reclaimObservedLock(lockFile, observed) {
  const marker = reclaimMarker(lockFile);
  try {
    linkSync(lockFile, marker);
  } catch (error) {
    if (error.code === 'ENOENT') return false;
    if (error.code === 'EEXIST') return recoverReclaimMarker(lockFile);
    throw error;
  }
  let marked;
  try {
    marked = readLock(marker);
  } catch {
    return false;
  }
  if (marked.identity !== observed.identity || marked.metadata.token !== observed.metadata.token) {
    rmSync(marker, { force: true });
    return false;
  }
  return recoverReclaimMarker(lockFile);
}

function claimLock(lockFile) {
  const token = randomBytes(16).toString('hex');
  const claim = `${lockFile}.claim-${process.pid}-${randomBytes(4).toString('hex')}`;
  writeFileSync(claim, `${JSON.stringify({
    schemaVersion: 1,
    owner: 'SylphxAI/skills',
    pid: process.pid,
    createdAt: Date.now(),
    processStartIdentity: SELF_PROCESS_IDENTITY,
    token,
  }, null, 2)}\n`, { mode: 0o600 });
  try {
    linkSync(claim, lockFile);
    if (pathEntryExists(reclaimMarker(lockFile))) {
      rmSync(lockFile, { force: true });
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

function acquireLock(lockFile) {
  mkdirSync(path.dirname(lockFile), { recursive: true });
  for (let attempt = 0; attempt < 8; attempt += 1) {
    if (pathEntryExists(reclaimMarker(lockFile))) {
      if (!recoverReclaimMarker(lockFile)) return null;
      continue;
    }
    const token = claimLock(lockFile);
    if (token) return token;
    let observed;
    try {
      observed = readLock(lockFile);
    } catch {
      return null;
    }
    if (lockOwnerActive(observed.metadata)) return null;
    reclaimObservedLock(lockFile, observed);
  }
  return null;
}

function assertLock(lockFile, token) {
  if (!pathEntryExists(lockFile) || readLock(lockFile).metadata.token !== token) {
    throw new Error(`reconcile lock ownership lost: ${lockFile}`);
  }
}

function releaseLock(lockFile, token) {
  assertLock(lockFile, token);
  rmSync(lockFile, { force: true });
}

function testHoldLock() {
  if (process.env.NODE_ENV !== 'test' || !process.env.SYLPHX_SKILLS_TEST_HOLD_RECONCILE_LOCK_MS) return;
  const milliseconds = Number(process.env.SYLPHX_SKILLS_TEST_HOLD_RECONCILE_LOCK_MS);
  if (!Number.isFinite(milliseconds) || milliseconds < 0 || milliseconds > 5_000) {
    throw new Error('invalid reconcile lock test hold duration');
  }
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, milliseconds);
}

function testHoldBeforeReconcileLock(stateDirectory) {
  if (process.env.NODE_ENV !== 'test' || !process.env.SYLPHX_SKILLS_TEST_HOLD_BEFORE_RECONCILE_LOCK_MS) return;
  const milliseconds = Number(process.env.SYLPHX_SKILLS_TEST_HOLD_BEFORE_RECONCILE_LOCK_MS);
  if (!Number.isFinite(milliseconds) || milliseconds < 0 || milliseconds > 5_000) {
    throw new Error('invalid pre-reconcile-lock test hold duration');
  }
  const marker = path.join(stateDirectory, '.test-before-reconcile-lock-ready');
  writeFileSync(marker, 'ready\n');
  try {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, milliseconds);
  } finally {
    rmSync(marker, { force: true });
  }
}

function withRuntimeLock(stateDirectory, name, operation) {
  const lockFile = path.join(stateDirectory, `${name}.lock`);
  const lockToken = acquireLock(lockFile);
  if (!lockToken) return { acquired: false };
  try {
    return { acquired: true, value: operation() };
  } finally {
    releaseLock(lockFile, lockToken);
  }
}

export function withReconcileLock(stateDirectory, operation) {
  return withRuntimeLock(stateDirectory, 'reconcile', operation);
}

export function withLifecycleLock(stateDirectory, operation) {
  return withRuntimeLock(stateDirectory, 'lifecycle', operation);
}

function ensureCleanManagedRepository(run, config) {
  const repository = config.repository;
  if (!existsSync(repository)) {
    mkdirSync(path.dirname(repository), { recursive: true });
    checked(run, 'git', [
      'clone', '--quiet', '--depth', '1', '--single-branch', '--branch', config.branch,
      config.remote, repository,
    ], { timeout: 60_000, env: { ...process.env, PATH: config.pathEnv || process.env.PATH } });
    return { created: true };
  }
  if (!existsSync(path.join(repository, '.git'))) {
    throw new Error(`Managed repository path is occupied by non-Git data: ${repository}`);
  }
  const env = { ...process.env, PATH: config.pathEnv || process.env.PATH };
  const origin = checked(run, 'git', ['-C', repository, 'remote', 'get-url', 'origin'], { env }).stdout.trim();
  if (origin !== config.remote) throw new Error(`Managed repository origin changed: ${origin}`);
  const dirty = checked(run, 'git', ['-C', repository, 'status', '--porcelain', '--untracked-files=all'], { env }).stdout;
  if (dirty.trim()) throw new Error(`Managed repository contains unexpected local changes: ${repository}`);
  return { created: false };
}

function installedTargetsCurrent(run, config, expectedSha) {
  if (!expectedSha || !/^[0-9a-f]{40,64}$/.test(expectedSha)) return false;
  const env = { ...process.env, PATH: config.pathEnv || process.env.PATH };
  const sourceCli = path.join(config.repository, 'runtime', 'sylphx-skills.mjs');
  const sourceReconciler = path.join(config.repository, 'runtime', 'reconcile.mjs');
  if (
    !existsSync(sourceCli)
    || !existsSync(sourceReconciler)
    || !existsSync(config.reconcilerPath)
    || !existsSync(path.join(config.repository, '.git'))
  ) return false;

  if (!readFileSync(config.reconcilerPath).equals(readFileSync(sourceReconciler))) return false;

  const head = run('git', ['-C', config.repository, 'rev-parse', 'HEAD'], { env });
  if (head.status !== 0 || String(head.stdout).trim() !== expectedSha) return false;
  const dirty = run('git', ['-C', config.repository, 'status', '--porcelain', '--untracked-files=all'], { env });
  if (dirty.status !== 0 || String(dirty.stdout).trim()) return false;

  const status = run(config.nodePath, [
    sourceCli,
    'status',
    '--agent',
    config.agents.join(','),
    '--json',
    '--quiet',
  ], {
    timeout: 120_000,
    env: {
      ...env,
      CODEX_HOME: config.homes.codexHome,
      CLAUDE_CONFIG_DIR: config.homes.claudeHome,
      GROK_HOME: config.homes.grokHome,
      SYLPHX_SKILLS_COMMIT_SHA: expectedSha,
    },
  });
  if (status.status !== 0) return false;
  let result;
  try {
    result = JSON.parse(status.stdout);
  } catch {
    return false;
  }
  if (!Array.isArray(result?.targets) || result.targets.length !== config.agents.length) return false;
  const byRuntime = new Map(result.targets.map((target) => [target.runtime, target]));
  return config.agents.every((agent) => byRuntime.get(agent)?.current === true);
}

function syncCandidate(run, config, candidate) {
  const env = { ...process.env, PATH: config.pathEnv || process.env.PATH };
  if (!/^[0-9a-f]{40,64}$/.test(candidate)) throw new Error('Candidate has an invalid commit identity');
  const sourceCli = path.join(config.repository, 'runtime', 'sylphx-skills.mjs');
  if (!existsSync(sourceCli)) throw new Error(`Candidate is missing ${sourceCli}`);
  checked(run, config.nodePath, [sourceCli, 'sync', '--agent', config.agents.join(','), '--quiet'], {
    timeout: 120_000,
    env: {
      ...env,
      CODEX_HOME: config.homes.codexHome,
      CLAUDE_CONFIG_DIR: config.homes.claudeHome,
      GROK_HOME: config.homes.grokHome,
      SYLPHX_SKILLS_COMMIT_SHA: candidate,
    },
  });

  const currentReconciler = path.join(config.repository, 'runtime', 'reconcile.mjs');
  if (existsSync(currentReconciler) && path.resolve(currentReconciler) !== path.resolve(scriptFile)) {
    const temporary = `${config.reconcilerPath}.tmp-${process.pid}-${randomBytes(4).toString('hex')}`;
    cpSync(currentReconciler, temporary);
    renameSync(temporary, config.reconcilerPath);
  }
}

function materializationStage(config) {
  const repositoryRoot = path.resolve(config.repository);
  return path.join(path.dirname(repositoryRoot), `.${path.basename(repositoryRoot)}.sylphx-materialize`);
}

function readMaterializationOwner(config, stage) {
  const stageStat = lstatSync(stage);
  const ownerFile = path.join(stage, 'owner.json');
  if (!stageStat.isDirectory() || !lstatSync(ownerFile).isFile()) {
    throw new Error(`Unowned exact-materialization journal: ${stage}`);
  }
  const owner = JSON.parse(readFileSync(ownerFile, 'utf8'));
  const repositoryRoot = path.resolve(config.repository);
  if (
    owner?.schemaVersion !== 1
    || owner?.owner !== 'SylphxAI/skills'
    || owner?.repository !== repositoryRoot
    || !/^[0-9a-f]{40,64}$/.test(owner?.candidate || '')
  ) throw new Error(`Unowned exact-materialization journal: ${stage}`);
  return owner;
}

function testCrashAfterMaterializedFile(count) {
  if (process.env.NODE_ENV !== 'test') return;
  const configured = Number(process.env.SYLPHX_SKILLS_TEST_CRASH_AFTER_MATERIALIZED_FILES || 0);
  if (Number.isInteger(configured) && configured > 0 && count === configured) process.exit(86);
}

function materializeTrackedFiles(run, config, { recovery = false } = {}) {
  const env = { ...process.env, PATH: config.pathEnv || process.env.PATH };
  const repositoryRoot = path.resolve(config.repository);
  const stage = materializationStage(config);
  const candidate = checked(run, 'git', ['-C', config.repository, 'rev-parse', 'HEAD'], { env }).stdout.trim();
  if (!/^[0-9a-f]{40,64}$/.test(candidate)) throw new Error('Candidate has an invalid commit identity');

  if (recovery) {
    const owner = readMaterializationOwner(config, stage);
    if (owner.candidate !== candidate) {
      throw new Error(`Exact-materialization journal candidate changed: ${stage}`);
    }
    const origin = checked(run, 'git', ['-C', config.repository, 'remote', 'get-url', 'origin'], { env }).stdout.trim();
    if (origin !== config.remote) throw new Error(`Managed repository origin changed: ${origin}`);
    checked(run, 'git', ['-C', config.repository, 'diff', '--cached', '--quiet', '--exit-code', 'HEAD'], { env });
  } else {
    const dirty = checked(run, 'git', [
      '-C', config.repository, 'status', '--porcelain', '--untracked-files=all',
    ], { env }).stdout;
    if (dirty.trim()) throw new Error(`Managed repository changed before exact materialization: ${config.repository}`);
    if (pathEntryExists(stage)) throw new Error(`Unrecovered exact-materialization journal: ${stage}`);
    const preparing = `${stage}.prepare-${process.pid}-${randomBytes(4).toString('hex')}`;
    mkdirSync(preparing, { mode: 0o700 });
    writeFileSync(path.join(preparing, 'owner.json'), `${JSON.stringify({
      schemaVersion: 1,
      owner: 'SylphxAI/skills',
      repository: repositoryRoot,
      candidate,
    })}\n`, { mode: 0o600 });
    renameSync(preparing, stage);
  }

  const tracked = checked(run, 'git', ['-C', config.repository, 'ls-files', '-z'], { env }).stdout
    .split('\0')
    .filter(Boolean);
  if (!tracked.length) throw new Error(`Managed repository has no tracked files: ${config.repository}`);

  const worktree = path.join(stage, 'worktree');
  let completed = false;
  rmSync(worktree, { recursive: true, force: true });
  mkdirSync(worktree, { recursive: true, mode: 0o700 });
  try {
    const prefix = `${worktree.replaceAll('\\', '/')}/`;
    checked(run, 'git', ['-C', config.repository, 'checkout-index', '--all', '--force', `--prefix=${prefix}`], { env });
    for (const [index, relative] of tracked.entries()) {
      const destination = path.resolve(repositoryRoot, relative);
      if (destination === repositoryRoot || !destination.startsWith(`${repositoryRoot}${path.sep}`)) {
        throw new Error(`Managed repository returned an unsafe tracked path: ${JSON.stringify(relative)}`);
      }
      const source = path.resolve(worktree, relative);
      if (source === worktree || !source.startsWith(`${worktree}${path.sep}`) || !lstatSync(source).isFile()) {
        throw new Error(`Managed repository returned an unsupported tracked entry: ${JSON.stringify(relative)}`);
      }
      renameSync(source, destination);
      testCrashAfterMaterializedFile(index + 1);
    }
    // Replacing an unchanged CRLF worktree file with the canonical LF bytes can
    // leave only the index stat cache looking dirty. Renormalization refreshes
    // that cache under the candidate's attributes; it must not change HEAD.
    checked(run, 'git', ['-C', config.repository, 'add', '--renormalize', '--', '.'], { env });
    const staged = run('git', ['-C', config.repository, 'diff', '--cached', '--quiet', '--exit-code'], { env });
    if (staged.status !== 0) {
      throw new Error(`Exact materialization changed the candidate index: ${config.repository}`);
    }
    const remaining = checked(run, 'git', [
      '-C', config.repository, 'status', '--porcelain', '--untracked-files=all',
    ], { env }).stdout;
    if (remaining.trim()) throw new Error(`Exact materialization left repository drift: ${config.repository}`);
    completed = true;
  } finally {
    if (completed) {
      const retired = `${stage}.completed-${process.pid}-${randomBytes(4).toString('hex')}`;
      renameSync(stage, retired);
      rmSync(retired, { recursive: true, force: true });
    }
  }
}

function recoverTrackedMaterialization(run, config) {
  const stage = materializationStage(config);
  if (!pathEntryExists(stage)) return false;
  materializeTrackedFiles(run, config, { recovery: true });
  return true;
}

function repairAppliedHead(run, config, expectedSha) {
  if (!existsSync(path.join(config.repository, '.git'))) return false;
  const env = { ...process.env, PATH: config.pathEnv || process.env.PATH };
  recoverTrackedMaterialization(run, config);
  ensureCleanManagedRepository(run, config);
  const candidate = checked(run, 'git', ['-C', config.repository, 'rev-parse', 'HEAD'], { env }).stdout.trim();
  if (candidate !== expectedSha) return false;
  materializeTrackedFiles(run, config);
  syncCandidate(run, config, candidate);
  return true;
}

function applyRemoteHead(run, config, expectedRemoteHead) {
  const env = { ...process.env, PATH: config.pathEnv || process.env.PATH };
  if (existsSync(path.join(config.repository, '.git'))) recoverTrackedMaterialization(run, config);
  const { created } = ensureCleanManagedRepository(run, config);
  let candidate;
  if (created) {
    candidate = checked(run, 'git', ['-C', config.repository, 'rev-parse', 'HEAD'], { env }).stdout.trim();
  } else {
    checked(run, 'git', [
      '-C', config.repository, 'fetch', '--quiet', '--depth', '1', '--no-tags',
      'origin', `refs/heads/${config.branch}`,
    ], { timeout: 60_000, env });
    candidate = checked(run, 'git', ['-C', config.repository, 'rev-parse', 'FETCH_HEAD'], { env }).stdout.trim();
    checked(run, 'git', ['-C', config.repository, 'checkout', '--quiet', '--detach', '--force', candidate], { env });
  }
  materializeTrackedFiles(run, config);
  // A new commit may land between ls-remote and fetch. Applying the fetched
  // branch head is fresher than retrying the older observation.
  syncCandidate(run, config, candidate);
  return { candidate, raced: candidate !== expectedRemoteHead };
}

export function reconcile({
  stateDirectory = defaultStateDirectory,
  maxAgeMs = 10_000,
  force = false,
  strict = false,
  bootstrap = false,
  now = Date.now(),
  run = execute,
} = {}) {
  const configPath = path.join(stateDirectory, 'config.json');
  const statePath = path.join(stateDirectory, 'state.json');
  testHoldBeforeReconcileLock(stateDirectory);
  const locked = withReconcileLock(stateDirectory, () => {
    testHoldLock();
    const config = readJson(configPath, null);
    if (!config || config.owner !== 'SylphxAI/skills' || config.schemaVersion !== 1) {
      const error = new Error(`Missing or invalid Sylphx Skills auto-sync config: ${configPath}`);
      if (strict) throw error;
      return { status: 'unconfigured', error: error.message };
    }
    if (!bootstrap && (config.enabled !== true || config.mode !== 'interval-scheduler')) {
      const error = new Error('Sylphx Skills automatic synchronization is disabled');
      if (strict) throw error;
      return { status: 'disabled' };
    }

    let state = readJson(statePath, { schemaVersion: 1, failureCount: 0 });
    let localRepaired = false;
    try {
      const lockedAge = now - Number(state.lastCheckedAt || 0);
      const fresh = !force && lockedAge >= 0 && lockedAge < maxAgeMs;
      const backingOff = !force && Number(state.retryAfterAt || 0) > now;
      const installedCurrent = installedTargetsCurrent(run, config, state.appliedSha);
      if (!installedCurrent && repairAppliedHead(run, config, state.appliedSha)) {
        localRepaired = true;
        state = { ...state, lastAppliedAt: now };
        writeAtomic(statePath, `${JSON.stringify(state, null, 2)}\n`);
      }
      if (fresh || backingOff) {
        if (localRepaired) {
          return { status: 'updated', appliedSha: state.appliedSha, repaired: true };
        }
        if (installedCurrent) {
          return fresh
            ? { status: 'fresh', appliedSha: state.appliedSha }
            : { status: 'backoff', retryAfterAt: state.retryAfterAt };
        }
      }

      const env = { ...process.env, PATH: config.pathEnv || process.env.PATH };
      const remote = checked(run, 'git', ['ls-remote', config.remote, `refs/heads/${config.branch}`], {
        timeout: 10_000,
        env,
      });
      const remoteHead = parseRemoteHead(remote.stdout);
      const repairing = remoteHead === state.appliedSha;
      if (repairing && installedTargetsCurrent(run, config, remoteHead)) {
        state = {
          ...state,
          schemaVersion: 1,
          lastCheckedAt: now,
          failureCount: 0,
          retryAfterAt: null,
          lastError: null,
        };
        writeAtomic(statePath, `${JSON.stringify(state, null, 2)}\n`);
        return localRepaired
          ? { status: 'updated', appliedSha: remoteHead, repaired: true }
          : { status: 'current', appliedSha: remoteHead };
      }

      const applied = applyRemoteHead(run, config, remoteHead);
      state = {
        schemaVersion: 1,
        appliedSha: applied.candidate,
        lastCheckedAt: now,
        lastAppliedAt: now,
        failureCount: 0,
        retryAfterAt: null,
        lastError: null,
      };
      writeAtomic(statePath, `${JSON.stringify(state, null, 2)}\n`);
      return {
        status: 'updated',
        appliedSha: applied.candidate,
        raced: applied.raced,
        repaired: repairing || localRepaired,
      };
    } catch (error) {
      const failureCount = Number(state.failureCount || 0) + 1;
      const retryDelay = Math.min(5_000 * (2 ** Math.min(failureCount - 1, 6)), 300_000);
      const failed = {
        ...state,
        schemaVersion: 1,
        failureCount,
        retryAfterAt: now + retryDelay,
        lastError: String(error.message).slice(0, 1_000),
      };
      writeAtomic(statePath, `${JSON.stringify(failed, null, 2)}\n`);
      if (strict) throw error;
      return {
        status: 'unavailable',
        retryAfterAt: failed.retryAfterAt,
        error: failed.lastError,
        repaired: localRepaired,
      };
    }
  });
  return locked.acquired ? locked.value : { status: 'busy' };
}

function directMain() {
  const args = process.argv.slice(2);
  const maxAgeIndex = args.indexOf('--max-age-ms');
  const maxAgeMs = maxAgeIndex >= 0 ? Number(args[maxAgeIndex + 1]) : 10_000;
  if (!Number.isFinite(maxAgeMs) || maxAgeMs < 0) throw new Error('--max-age-ms must be a non-negative number');
  const quiet = args.includes('--quiet');
  const strict = args.includes('--strict');
  const result = reconcile({ maxAgeMs, force: args.includes('--force'), strict });
  if (!quiet) console.log(JSON.stringify(result));
}

const invokedFile = process.argv[1] && existsSync(process.argv[1])
  ? realpathSync(process.argv[1])
  : path.resolve(process.argv[1] || '');
const reconcilerFile = existsSync(scriptFile) ? realpathSync(scriptFile) : path.resolve(scriptFile);

if (process.argv[1] && invokedFile === reconcilerFile) {
  try {
    directMain();
  } catch (error) {
    console.error(`sylphx-skills reconcile: ${error.message}`);
    process.exit(1);
  }
}
