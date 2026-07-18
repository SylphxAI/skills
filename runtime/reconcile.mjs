#!/usr/bin/env node

import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  realpathSync,
  renameSync,
  rmSync,
  statSync,
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

function acquireLock(lockDirectory, now) {
  try {
    mkdirSync(lockDirectory);
    return true;
  } catch (error) {
    if (error.code !== 'EEXIST') throw error;
  }

  try {
    if (now - statSync(lockDirectory).mtimeMs > 120_000) {
      rmSync(lockDirectory, { recursive: true, force: true });
      mkdirSync(lockDirectory);
      return true;
    }
  } catch {
    return false;
  }
  return false;
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

function applyRemoteHead(run, config, expectedRemoteHead) {
  const env = { ...process.env, PATH: config.pathEnv || process.env.PATH };
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
  if (!/^[0-9a-f]{40,64}$/.test(candidate)) throw new Error('Fetched candidate has an invalid commit identity');

  // A new commit may land between ls-remote and fetch. Applying the fetched
  // branch head is fresher than retrying the older observation.
  const sourceCli = path.join(config.repository, 'runtime', 'sylphx-skills.mjs');
  if (!existsSync(sourceCli)) throw new Error(`Fetched candidate is missing ${sourceCli}`);
  checked(run, config.nodePath, [sourceCli, 'sync', '--agent', config.agents.join(','), '--quiet'], {
    timeout: 120_000,
    env: {
      ...env,
      CODEX_HOME: config.homes.codexHome,
      CLAUDE_CONFIG_DIR: config.homes.claudeHome,
      SYLPHX_SKILLS_COMMIT_SHA: candidate,
    },
  });

  const currentReconciler = path.join(config.repository, 'runtime', 'reconcile.mjs');
  if (existsSync(currentReconciler) && path.resolve(currentReconciler) !== path.resolve(scriptFile)) {
    const temporary = `${config.reconcilerPath}.tmp-${process.pid}-${randomBytes(4).toString('hex')}`;
    cpSync(currentReconciler, temporary);
    renameSync(temporary, config.reconcilerPath);
  }
  return { candidate, raced: candidate !== expectedRemoteHead };
}

export function reconcile({
  stateDirectory = defaultStateDirectory,
  maxAgeMs = 10_000,
  force = false,
  strict = false,
  now = Date.now(),
  run = execute,
} = {}) {
  const configPath = path.join(stateDirectory, 'config.json');
  const statePath = path.join(stateDirectory, 'state.json');
  const lockDirectory = path.join(stateDirectory, 'reconcile.lock');
  const config = readJson(configPath, null);
  if (!config || config.owner !== 'SylphxAI/skills' || config.schemaVersion !== 1) {
    const error = new Error(`Missing or invalid Sylphx Skills auto-sync config: ${configPath}`);
    if (strict) throw error;
    return { status: 'unconfigured', error: error.message };
  }

  let state = readJson(statePath, { schemaVersion: 1, failureCount: 0 });
  const age = now - Number(state.lastCheckedAt || 0);
  if (!force && age >= 0 && age < maxAgeMs) return { status: 'fresh', appliedSha: state.appliedSha || null };
  if (!force && Number(state.retryAfterAt || 0) > now) return { status: 'backoff', retryAfterAt: state.retryAfterAt };
  if (!acquireLock(lockDirectory, now)) return { status: 'busy' };

  try {
    state = readJson(statePath, { schemaVersion: 1, failureCount: 0 });
    const lockedAge = now - Number(state.lastCheckedAt || 0);
    if (!force && lockedAge >= 0 && lockedAge < maxAgeMs) return { status: 'fresh', appliedSha: state.appliedSha || null };

    const env = { ...process.env, PATH: config.pathEnv || process.env.PATH };
    const remote = checked(run, 'git', ['ls-remote', config.remote, `refs/heads/${config.branch}`], {
      timeout: 10_000,
      env,
    });
    const remoteHead = parseRemoteHead(remote.stdout);
    if (remoteHead === state.appliedSha) {
      state = {
        ...state,
        schemaVersion: 1,
        lastCheckedAt: now,
        failureCount: 0,
        retryAfterAt: null,
        lastError: null,
      };
      writeAtomic(statePath, `${JSON.stringify(state, null, 2)}\n`);
      return { status: 'current', appliedSha: remoteHead };
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
    return { status: 'updated', appliedSha: applied.candidate, raced: applied.raced };
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
    return { status: 'unavailable', retryAfterAt: failed.retryAfterAt, error: failed.lastError };
  } finally {
    rmSync(lockDirectory, { recursive: true, force: true });
  }
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
