#!/usr/bin/env node

import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  realpathSync,
  renameSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { createHash, randomBytes } from 'node:crypto';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { uninstallRuntimeHooks } from './hooks.mjs';
import { reconcile } from './reconcile.mjs';
import { installScheduler, parseIntervalMinutes, removeScheduler } from './scheduler.mjs';

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
const schedulerPlatform = process.env.SYLPHX_SKILLS_TEST_PLATFORM || process.platform;
const reconcilerScript = path.join(stateDirectory, 'reconcile.mjs');
const reconcilerConfig = path.join(stateDirectory, 'config.json');
const managedRepository = path.join(stateDirectory, 'repository');
const legacyUpdaterScript = path.join(stateDirectory, 'sync.sh');
const transactionPrefix = '.sylphx-transaction-';

function executableFromPath(name, pathEnv) {
  const executable = process.platform === 'win32' ? `${name}.exe` : name;
  for (const directory of String(pathEnv).split(path.delimiter)) {
    if (!directory) continue;
    const candidate = path.join(directory, executable);
    if (existsSync(candidate)) return candidate;
  }
  return process.execPath;
}

function log(message) {
  if (!quiet && !jsonOutput) console.log(message);
}

function expand(input) {
  return path.resolve(input.replace(/^~(?=\/|$)/, home));
}

function runtimeHomes() {
  const codexHome = process.env.CODEX_HOME ? expand(process.env.CODEX_HOME) : path.join(home, '.codex');
  const claudeHome = process.env.CLAUDE_CONFIG_DIR ? expand(process.env.CLAUDE_CONFIG_DIR) : path.join(home, '.claude');
  const grokHome = process.env.GROK_HOME ? expand(process.env.GROK_HOME) : path.join(home, '.grok');
  return { codexHome, claudeHome, grokHome };
}

function runtimeDefinitions() {
  const { codexHome, claudeHome, grokHome } = runtimeHomes();
  return {
    codex: path.join(codexHome, 'skills'),
    claude: path.join(claudeHome, 'skills'),
    grok: path.join(grokHome, 'skills'),
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
  const expanded = requested.includes('all') ? ['codex', 'claude', 'grok'] : requested;
  const invalid = expanded.filter((name) => !Object.hasOwn(definitions, name));
  if (invalid.length) throw new Error(`Unsupported agent: ${invalid.join(', ')}. Supported: codex, claude, grok, all.`);

  const selected = expanded.length
    ? [...new Set(expanded)]
    : Object.entries(definitions)
      .filter(([, skillRoot]) => existsSync(path.dirname(skillRoot)))
      .map(([name]) => name);

  // A fresh machine should not require a destination decision. Creating both
  // roots is harmless and lets whichever runtime is installed next discover
  // the same packages immediately.
  const automatic = selected.length ? selected : ['codex', 'claude', 'grok'];
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
  const expanded = names.includes('all') || !names.length ? ['codex', 'claude', 'grok'] : names;
  const invalid = expanded.filter((name) => !['codex', 'claude', 'grok'].includes(name));
  if (invalid.length) throw new Error(`Unsupported agent: ${invalid.join(', ')}. Supported: codex, claude, grok, all.`);
  return [...new Set(expanded)];
}

function manifestPath(target) {
  return path.join(target.path, '.sylphx-skills.json');
}

function readManifest(target) {
  const file = manifestPath(target);
  if (!existsSync(file)) return null;
  try {
    const manifest = JSON.parse(readFileSync(file, 'utf8'));
    if (
      manifest?.schemaVersion !== 1
      || manifest?.owner !== 'SylphxAI/skills'
      || !Array.isArray(manifest.skills)
      || manifest.skills.some((name) => typeof name !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name))
    ) {
      throw new Error('invalid ownership manifest');
    }
    return manifest;
  } catch (error) {
    throw new Error(`Refusing to replace invalid ownership manifest ${file}: ${error.message}`);
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

function recoverInterruptedTransactions(skillRoot) {
  if (!existsSync(skillRoot)) return;
  for (const entry of readdirSync(skillRoot, { withFileTypes: true })) {
    if (!entry.isDirectory() || !entry.name.startsWith(transactionPrefix)) continue;
    const transactionRoot = path.join(skillRoot, entry.name);
    const metadataPath = path.join(transactionRoot, 'transaction.json');
    let metadata;
    try {
      metadata = JSON.parse(readFileSync(metadataPath, 'utf8'));
    } catch {
      throw new Error(`Refusing to remove an unrecognized transaction directory: ${transactionRoot}`);
    }
    if (
      metadata?.owner !== 'SylphxAI/skills'
      || typeof metadata.package !== 'string'
      || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(metadata.package)
    ) {
      throw new Error(`Refusing to recover an invalid transaction directory: ${transactionRoot}`);
    }
    const destination = path.join(skillRoot, metadata.package);
    const backup = path.join(transactionRoot, 'backup');
    if (!existsSync(destination) && existsSync(backup)) renameSync(backup, destination);
    rmSync(transactionRoot, { recursive: true, force: true });
  }
}

function replaceDirectory(source, destination) {
  const skillRoot = path.dirname(destination);
  mkdirSync(skillRoot, { recursive: true });
  const suffix = `${process.pid}-${randomBytes(4).toString('hex')}`;
  const transactionRoot = path.join(skillRoot, `${transactionPrefix}${path.basename(destination)}-${suffix}`);
  const stage = path.join(transactionRoot, 'stage');
  const backup = path.join(transactionRoot, 'backup');
  mkdirSync(transactionRoot);
  writeFileSync(path.join(transactionRoot, 'transaction.json'), `${JSON.stringify({
    schemaVersion: 1,
    owner: 'SylphxAI/skills',
    package: path.basename(destination),
  }, null, 2)}\n`, { mode: 0o600 });
  cpSync(source, stage, { recursive: true, preserveTimestamps: true });
  let movedExisting = false;
  try {
    if (existsSync(destination)) {
      renameSync(destination, backup);
      movedExisting = true;
    }
    renameSync(stage, destination);
    if (movedExisting) rmSync(backup, { recursive: true, force: true });
    rmSync(transactionRoot, { recursive: true, force: true });
  } catch (error) {
    rmSync(stage, { recursive: true, force: true });
    if (movedExisting && !existsSync(destination) && existsSync(backup)) renameSync(backup, destination);
    if (existsSync(destination) || !existsSync(backup)) rmSync(transactionRoot, { recursive: true, force: true });
    throw error;
  }
}

function syncTarget(target) {
  mkdirSync(target.path, { recursive: true });
  recoverInterruptedTransactions(target.path);
  const previous = readManifest(target);
  const desired = catalog.skills.map((skill) => skill.name);
  const desiredSet = new Set(desired);
  const previousSkills = Array.isArray(previous?.skills) ? previous.skills : [];

  for (const name of desired) replaceDirectory(path.join(sourceSkills, name), path.join(target.path, name));
  for (const name of previousSkills) {
    if (!desiredSet.has(name)) rmSync(path.join(target.path, name), { recursive: true, force: true });
  }

  const manifest = {
    schemaVersion: 1,
    owner: 'SylphxAI/skills',
    packageVersion: packageJson.version,
    catalogDigest: `sha256:${catalogDigest}`,
    sourceCommit: process.env.SYLPHX_SKILLS_COMMIT_SHA || null,
    synchronizedAt: new Date().toISOString(),
    runtime: target.runtime,
    skills: desired,
    profiles: catalog.skills
      .filter((skill) => skill.profile)
      .map((skill) => skill.profile),
  };
  writeAtomic(manifestPath(target), `${JSON.stringify(manifest, null, 2)}\n`);
  rmSync(path.join(target.path, 'skills-binding-install-manifest.json'), { force: true });
  log(`synced ${desired.length} skills to ${target.runtime}: ${target.path}`);
  return manifest;
}

function refreshAutoSyncInstallation() {
  const config = readJson(reconcilerConfig);
  // Only the exact-commit reconciler may replace the persistent sync adapter.
  // A manual sync from an arbitrary working tree updates Skills content but
  // must not silently turn uncommitted runtime code into the auto-sync owner.
  if (!process.env.SYLPHX_SKILLS_COMMIT_SHA || !config?.enabled || config.owner !== 'SylphxAI/skills') return;
  const currentHomes = runtimeHomes();
  const agents = [...new Set(config.agents || [])];
  // Existing installations add newly detected runtimes without a second CLI.
  if (existsSync(currentHomes.grokHome) && !agents.includes('grok')) {
    syncTarget({ runtime: 'grok', path: path.join(currentHomes.grokHome, 'skills') });
    agents.push('grok');
  }
  config.agents = agents;
  config.homes = { ...config.homes, ...currentHomes };
  const needsSchedulerMigration = config.mode !== 'interval-scheduler';
  config.mode = 'interval-scheduler';
  config.intervalMinutes = Number(config.intervalMinutes) || 10;
  config.adapterVersion = packageJson.version;
  writeAtomic(reconcilerConfig, `${JSON.stringify(config, null, 2)}\n`, 0o600);
  writeAtomic(reconcilerScript, readFileSync(path.join(packageRoot, 'runtime', 'reconcile.mjs')), 0o755);
  if (needsSchedulerMigration) {
    uninstallRuntimeHooks({ agents, homes: config.homes });
    installScheduler({
      platform: schedulerPlatform,
      home,
      nodePath: config.nodePath,
      reconcilerPath: reconcilerScript,
      pathEnv: config.pathEnv,
      intervalMinutes: config.intervalMinutes,
    });
  }
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
    const names = new Set(previous?.skills || []);
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

function enableAutoSync() {
  if (argv.includes('--dest')) throw new Error('auto-sync uses native runtime roots; --dest is not supported');
  const intervalMinutes = parseIntervalMinutes(argv);
  removeScheduler({ platform: schedulerPlatform, home });
  mkdirSync(stateDirectory, { recursive: true });
  const agents = requestedAgents();
  const pathEnv = process.env.PATH || '/usr/local/bin:/usr/bin:/bin';
  const config = {
    schemaVersion: 1,
    owner: 'SylphxAI/skills',
    enabled: false,
    remote: process.env.SYLPHX_SKILLS_REMOTE || 'https://github.com/SylphxAI/skills.git',
    branch: 'main',
    repository: managedRepository,
    reconcilerPath: reconcilerScript,
    nodePath: executableFromPath('node', pathEnv),
    pathEnv,
    mode: 'interval-scheduler',
    intervalMinutes,
    agents,
    homes: runtimeHomes(),
    adapterVersion: packageJson.version,
  };
  writeAtomic(reconcilerConfig, `${JSON.stringify(config, null, 2)}\n`, 0o600);
  writeAtomic(reconcilerScript, readFileSync(path.join(packageRoot, 'runtime', 'reconcile.mjs')), 0o755);
  reconcile({ stateDirectory, force: true, strict: true });
  // A pre-1.4 source may briefly refresh its old hooks during the first exact
  // sync. Remove them after convergence so this command's scheduler is the only
  // recurring owner.
  uninstallRuntimeHooks({ agents: ['codex', 'claude', 'grok'], homes: runtimeHomes() });
  writeAtomic(reconcilerScript, readFileSync(path.join(packageRoot, 'runtime', 'reconcile.mjs')), 0o755);
  installScheduler({
    platform: schedulerPlatform,
    home,
    nodePath: config.nodePath,
    reconcilerPath: reconcilerScript,
    pathEnv: config.pathEnv,
    intervalMinutes,
  });
  config.enabled = true;
  writeAtomic(reconcilerConfig, `${JSON.stringify(config, null, 2)}\n`, 0o600);
  rmSync(legacyUpdaterScript, { force: true });
  log(`enabled automatic sync every ${intervalMinutes} minute${intervalMinutes === 1 ? '' : 's'} for ${agents.join(', ')}`);
}

function disableAutoSync() {
  const config = readJson(reconcilerConfig);
  const agents = config?.agents || ['codex', 'claude', 'grok'];
  const homes = config?.homes || runtimeHomes();
  uninstallRuntimeHooks({ agents, homes });
  removeScheduler({ platform: schedulerPlatform, home });
  rmSync(path.join(stateDirectory, 'reconcile.lock'), { recursive: true, force: true });
  rmSync(reconcilerScript, { force: true });
  rmSync(reconcilerConfig, { force: true });
  log('disabled Sylphx Skills automatic sync');
}

function autoSyncStatus() {
  const config = readJson(reconcilerConfig);
  const result = {
    mode: config?.mode || null,
    enabled: Boolean(config?.enabled) && config?.mode === 'interval-scheduler',
    intervalMinutes: config?.intervalMinutes || null,
    remote: config?.remote || null,
    managedRepository: config?.repository || null,
  };
  if (jsonOutput) console.log(JSON.stringify(result, null, 2));
  else log(`auto-sync: ${result.enabled ? `every ${result.intervalMinutes} minutes` : 'disabled'}`);
}

function help() {
  console.log(`Sylphx Skills ${packageJson.version}\n\nUsage:\n  sylphx-skills sync [--agent codex|claude|grok|all] [--dest PATH]\n  sylphx-skills status [--json]\n  sylphx-skills clear\n  sylphx-skills auto-sync enable [--interval 10m]\n  sylphx-skills auto-sync disable|status\n\nDefault behavior auto-detects Codex, Claude Code, and Grok Build. Automatic\nsynchronization uses the operating system scheduler every 10 minutes by default.`);
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
