#!/usr/bin/env node

import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  realpathSync,
  renameSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { createHash, randomBytes } from 'node:crypto';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import {
  installRuntimeHooks,
  runtimeHookStatus,
  uninstallRuntimeHooks,
} from './hooks.mjs';
import { reconcile } from './reconcile.mjs';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceSkills = path.join(packageRoot, 'skills');
const catalogPath = path.join(packageRoot, 'catalog.json');
const packageJsonPath = path.join(packageRoot, 'package.json');
const home = path.resolve((process.env.SYLPHX_SKILLS_HOME || os.homedir()).replace(/^~(?=\/|$)/, os.homedir()));
const argv = process.argv.slice(2);
const quiet = argv.includes('--quiet');
const jsonOutput = argv.includes('--json');
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
const catalogBytes = readFileSync(catalogPath);
const catalog = JSON.parse(catalogBytes);
const catalogDigest = createHash('sha256').update(catalogBytes).digest('hex');
const stateDirectory = path.join(home, '.sylphx-skills');
const reconcilerScript = path.join(stateDirectory, 'reconcile.mjs');
const reconcilerConfig = path.join(stateDirectory, 'config.json');
const managedRepository = path.join(stateDirectory, 'repository');
const legacyUpdaterScript = path.join(stateDirectory, 'sync.sh');

function log(message) {
  if (!quiet && !jsonOutput) console.log(message);
}

function expand(input) {
  return path.resolve(input.replace(/^~(?=\/|$)/, home));
}

function runtimeHomes() {
  const codexHome = process.env.CODEX_HOME ? expand(process.env.CODEX_HOME) : path.join(home, '.codex');
  const claudeHome = process.env.CLAUDE_CONFIG_DIR ? expand(process.env.CLAUDE_CONFIG_DIR) : path.join(home, '.claude');
  return { codexHome, claudeHome };
}

function runtimeDefinitions() {
  const { codexHome, claudeHome } = runtimeHomes();
  return {
    codex: path.join(codexHome, 'skills'),
    claude: path.join(claudeHome, 'skills'),
  };
}

export function resolveTargets({ args = argv, homedir = home } = {}) {
  const custom = [];
  for (let index = 0; index < args.length; index += 1) {
    if (args[index] === '--dest' && args[index + 1]) {
      const input = args[index + 1].replace(/^~(?=\/|$)/, homedir);
      custom.push({ runtime: 'custom', path: path.resolve(input) });
      index += 1;
    }
  }
  if (custom.length) return custom;

  const definitions = runtimeDefinitions();
  const requested = [];
  for (let index = 0; index < args.length; index += 1) {
    if (args[index] === '--agent' && args[index + 1]) {
      requested.push(...args[index + 1].split(',').map((item) => item.trim().toLowerCase()).filter(Boolean));
      index += 1;
    }
  }
  const expanded = requested.includes('all') ? ['codex', 'claude'] : requested;
  const invalid = expanded.filter((name) => !Object.hasOwn(definitions, name));
  if (invalid.length) throw new Error(`Unsupported agent: ${invalid.join(', ')}. Supported: codex, claude, all.`);

  const selected = expanded.length
    ? [...new Set(expanded)]
    : Object.entries(definitions)
      .filter(([, skillRoot]) => existsSync(path.dirname(skillRoot)))
      .map(([name]) => name);

  // A fresh machine should not require a destination decision. Creating both
  // roots is harmless and lets whichever runtime is installed next discover
  // the same packages immediately.
  const automatic = selected.length ? selected : ['codex', 'claude'];
  return automatic.map((runtime) => ({ runtime, path: definitions[runtime] }));
}

function requestedAgents(args = argv) {
  const names = [];
  for (let index = 0; index < args.length; index += 1) {
    if (args[index] === '--agent' && args[index + 1]) {
      names.push(...args[index + 1].split(',').map((item) => item.trim().toLowerCase()).filter(Boolean));
      index += 1;
    }
  }
  const expanded = names.includes('all') || !names.length ? ['codex', 'claude'] : names;
  const invalid = expanded.filter((name) => !['codex', 'claude'].includes(name));
  if (invalid.length) throw new Error(`Unsupported agent: ${invalid.join(', ')}. Supported: codex, claude, all.`);
  return [...new Set(expanded)];
}

function manifestPath(target) {
  return path.join(target.path, '.sylphx-skills.json');
}

function readManifest(target) {
  const file = manifestPath(target);
  if (!existsSync(file)) return null;
  try {
    return JSON.parse(readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
}

function readJson(file) {
  if (!existsSync(file)) return null;
  try {
    return JSON.parse(readFileSync(file, 'utf8'));
  } catch (error) {
    throw new Error(`Invalid JSON at ${file}: ${error.message}`);
  }
}

function writeAtomic(file, bytes, mode) {
  mkdirSync(path.dirname(file), { recursive: true });
  const temp = `${file}.tmp-${process.pid}-${randomBytes(4).toString('hex')}`;
  writeFileSync(temp, bytes, mode ? { mode } : undefined);
  renameSync(temp, file);
}

function replaceDirectory(source, destination) {
  mkdirSync(path.dirname(destination), { recursive: true });
  const suffix = `${process.pid}-${randomBytes(4).toString('hex')}`;
  const stage = `${destination}.sylphx-stage-${suffix}`;
  const backup = `${destination}.sylphx-backup-${suffix}`;
  cpSync(source, stage, { recursive: true, preserveTimestamps: true });
  let movedExisting = false;
  try {
    if (existsSync(destination)) {
      renameSync(destination, backup);
      movedExisting = true;
    }
    renameSync(stage, destination);
    if (movedExisting) rmSync(backup, { recursive: true, force: true });
  } catch (error) {
    rmSync(stage, { recursive: true, force: true });
    if (movedExisting && !existsSync(destination) && existsSync(backup)) renameSync(backup, destination);
    throw error;
  }
}

function syncTarget(target) {
  mkdirSync(target.path, { recursive: true });
  const previous = readManifest(target);
  const desired = catalog.skills.map((skill) => skill.name);
  const desiredSet = new Set(desired);
  const previousSkills = Array.isArray(previous?.skills) ? previous.skills : [];

  for (const name of previousSkills) {
    if (!desiredSet.has(name)) rmSync(path.join(target.path, name), { recursive: true, force: true });
  }
  for (const name of desired) replaceDirectory(path.join(sourceSkills, name), path.join(target.path, name));

  const manifest = {
    schemaVersion: 1,
    owner: 'SylphxAI/skills',
    packageVersion: packageJson.version,
    catalogDigest: `sha256:${catalogDigest}`,
    sourceCommit: process.env.SYLPHX_SKILLS_COMMIT_SHA || null,
    synchronizedAt: new Date().toISOString(),
    runtime: target.runtime,
    skills: desired,
  };
  writeAtomic(manifestPath(target), `${JSON.stringify(manifest, null, 2)}\n`);
  rmSync(path.join(target.path, 'skills-binding-install-manifest.json'), { force: true });
  log(`synced ${desired.length} skills to ${target.runtime}: ${target.path}`);
  return manifest;
}

function refreshAutoSyncInstallation() {
  const config = readJson(reconcilerConfig);
  // Only the exact-commit reconciler may replace the persistent hook adapter.
  // A manual sync from an arbitrary working tree updates Skills content but
  // must not silently turn uncommitted runtime code into the auto-sync owner.
  if (!process.env.SYLPHX_SKILLS_COMMIT_SHA || !config?.enabled || config.owner !== 'SylphxAI/skills') return;
  writeAtomic(reconcilerScript, readFileSync(path.join(packageRoot, 'runtime', 'reconcile.mjs')), 0o755);
  installRuntimeHooks({
    agents: config.agents,
    homes: config.homes,
    nodePath: config.nodePath,
    reconcilerPath: reconcilerScript,
  });
}

function sync() {
  const targets = resolveTargets();
  const result = targets.map((target) => ({ target, manifest: syncTarget(target) }));
  refreshAutoSyncInstallation();
  if (jsonOutput) console.log(JSON.stringify({ command: 'sync', catalogDigest: `sha256:${catalogDigest}`, targets: result }, null, 2));
}

function status() {
  const targets = resolveTargets();
  const result = targets.map((target) => {
    const manifest = readManifest(target);
    const present = catalog.skills.filter((skill) => existsSync(path.join(target.path, skill.name, 'SKILL.md'))).length;
    return {
      runtime: target.runtime,
      path: target.path,
      installed: present,
      expected: catalog.count,
      current: manifest?.catalogDigest === `sha256:${catalogDigest}` && present === catalog.count,
      catalogDigest: manifest?.catalogDigest || null,
    };
  });
  if (jsonOutput) console.log(JSON.stringify({ command: 'status', targets: result }, null, 2));
  else for (const item of result) log(`${item.runtime}: ${item.current ? 'current' : 'outdated'} (${item.installed}/${item.expected}) ${item.path}`);
}

function clear() {
  const targets = resolveTargets();
  const result = [];
  for (const target of targets) {
    const previous = readManifest(target);
    const names = new Set([...(previous?.skills || []), ...catalog.skills.map((skill) => skill.name)]);
    let removed = 0;
    for (const name of names) {
      const destination = path.join(target.path, name);
      if (!existsSync(destination)) continue;
      rmSync(destination, { recursive: true, force: true });
      removed += 1;
    }
    rmSync(manifestPath(target), { force: true });
    result.push({ runtime: target.runtime, path: target.path, removed });
    log(`cleared ${removed} Sylphx skills from ${target.runtime}: ${target.path}`);
  }
  if (jsonOutput) console.log(JSON.stringify({ command: 'clear', targets: result }, null, 2));
}

function run(command, args, { tolerateFailure = false, env = process.env, timeout = 30_000 } = {}) {
  const result = spawnSync(command, args, {
    encoding: 'utf8',
    env,
    timeout,
    stdio: quiet ? 'ignore' : 'pipe',
  });
  if (result.status !== 0 && !tolerateFailure) {
    throw new Error(`${command} ${args.join(' ')} failed: ${(result.stderr || result.stdout || result.error?.message || '').trim()}`);
  }
  return result;
}

function removeLegacyScheduler() {
  if (process.platform === 'darwin') {
    const plist = path.join(home, 'Library', 'LaunchAgents', 'ai.sylphx.skills-sync.plist');
    if (existsSync(plist)) run('launchctl', ['bootout', `gui/${process.getuid()}`, plist], { tolerateFailure: true });
    rmSync(plist, { force: true });
  } else if (process.platform === 'linux') {
    const units = path.join(home, '.config', 'systemd', 'user');
    const timer = path.join(units, 'sylphx-skills-sync.timer');
    if (existsSync(timer)) run('systemctl', ['--user', 'disable', '--now', 'sylphx-skills-sync.timer'], { tolerateFailure: true });
    rmSync(path.join(units, 'sylphx-skills-sync.service'), { force: true });
    rmSync(timer, { force: true });
    if (existsSync(units)) run('systemctl', ['--user', 'daemon-reload'], { tolerateFailure: true });
  } else if (process.platform === 'win32') {
    run('schtasks', ['/Delete', '/TN', 'SylphxSkillsSync', '/F'], { tolerateFailure: true });
  }
  rmSync(legacyUpdaterScript, { force: true });
}

function enableAutoSync() {
  if (argv.includes('--dest')) throw new Error('auto-sync uses native runtime roots; --dest is not supported');
  removeLegacyScheduler();
  mkdirSync(stateDirectory, { recursive: true });
  const agents = requestedAgents();
  const config = {
    schemaVersion: 1,
    owner: 'SylphxAI/skills',
    enabled: false,
    remote: process.env.SYLPHX_SKILLS_REMOTE || 'https://github.com/SylphxAI/skills.git',
    branch: 'main',
    repository: managedRepository,
    reconcilerPath: reconcilerScript,
    nodePath: process.execPath,
    pathEnv: process.env.PATH || '/usr/local/bin:/usr/bin:/bin',
    agents,
    homes: runtimeHomes(),
    adapterVersion: packageJson.version,
  };
  writeAtomic(reconcilerConfig, `${JSON.stringify(config, null, 2)}\n`, 0o600);
  writeAtomic(reconcilerScript, readFileSync(path.join(packageRoot, 'runtime', 'reconcile.mjs')), 0o755);
  reconcile({ stateDirectory, force: true, strict: true });
  config.enabled = true;
  writeAtomic(reconcilerConfig, `${JSON.stringify(config, null, 2)}\n`, 0o600);
  installRuntimeHooks({ agents, homes: config.homes, nodePath: config.nodePath, reconcilerPath: reconcilerScript });
  log(`enabled event-driven auto-sync for ${agents.join(', ')} (10s active-turn freshness)`);
}

function disableAutoSync() {
  const config = readJson(reconcilerConfig);
  const agents = config?.agents || ['codex', 'claude'];
  const homes = config?.homes || runtimeHomes();
  uninstallRuntimeHooks({ agents, homes });
  removeLegacyScheduler();
  rmSync(path.join(stateDirectory, 'reconcile.lock'), { recursive: true, force: true });
  rmSync(reconcilerScript, { force: true });
  rmSync(reconcilerConfig, { force: true });
  log('disabled Sylphx Skills event-driven auto-sync');
}

function autoSyncStatus() {
  const config = readJson(reconcilerConfig);
  const agents = config?.agents || ['codex', 'claude'];
  const homes = config?.homes || runtimeHomes();
  const hooks = runtimeHookStatus({ agents, homes });
  const result = {
    mode: 'consumption-boundary-reconciliation',
    enabled: Boolean(config?.enabled) && hooks.every((item) => item.installed),
    remote: config?.remote || null,
    managedRepository: config?.repository || null,
    activeTurnMaxLagMs: 10_000,
    hooks,
  };
  if (jsonOutput) console.log(JSON.stringify(result, null, 2));
  else log(`auto-sync: ${result.enabled ? 'enabled' : 'disabled'} (${result.mode})`);
}

function help() {
  console.log(`Sylphx Skills ${packageJson.version}\n\nUsage:\n  sylphx-skills sync [--agent codex|claude|all] [--dest PATH]\n  sylphx-skills status [--json]\n  sylphx-skills clear\n  sylphx-skills auto-sync enable|disable|status\n\nDefault behavior auto-detects Codex and Claude Code. Auto-sync reconciles at\nsession, prompt, sub-agent, and active tool-loop boundaries without a daemon.`);
}

function main() {
  const command = argv.find((item) => !item.startsWith('-')) || 'sync';
  if (command === 'sync') return sync();
  if (command === 'status') return status();
  if (command === 'clear') return clear();
  if (command === 'auto-sync') {
    const actionIndex = argv.indexOf('auto-sync') + 1;
    const action = argv[actionIndex] || 'status';
    if (action === 'enable') return enableAutoSync();
    if (action === 'disable') return disableAutoSync();
    if (action === 'status') return autoSyncStatus();
    throw new Error(`Unknown auto-sync action: ${action}`);
  }
  if (['help', '--help', '-h'].includes(command)) return help();
  throw new Error(`Unknown command: ${command}`);
}

const invokedFile = process.argv[1] && existsSync(process.argv[1])
  ? realpathSync(process.argv[1])
  : path.resolve(process.argv[1] || '');

if (invokedFile === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (error) {
    console.error(`sylphx-skills: ${error.message}`);
    process.exit(1);
  }
}
