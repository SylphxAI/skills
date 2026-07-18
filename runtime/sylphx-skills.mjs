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
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceSkills = path.join(packageRoot, 'skills');
const catalogPath = path.join(packageRoot, 'catalog.json');
const packageJsonPath = path.join(packageRoot, 'package.json');
const home = os.homedir();
const argv = process.argv.slice(2);
const quiet = argv.includes('--quiet');
const jsonOutput = argv.includes('--json');
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
const catalogBytes = readFileSync(catalogPath);
const catalog = JSON.parse(catalogBytes);
const catalogDigest = createHash('sha256').update(catalogBytes).digest('hex');
const stateDirectory = path.join(home, '.sylphx-skills');
const updaterScript = path.join(stateDirectory, 'sync.sh');

function log(message) {
  if (!quiet && !jsonOutput) console.log(message);
}

function values(flag) {
  const found = [];
  for (let index = 0; index < argv.length; index += 1) {
    if (argv[index] === flag && argv[index + 1]) {
      found.push(argv[index + 1]);
      index += 1;
    }
  }
  return found;
}

function expand(input) {
  return path.resolve(input.replace(/^~(?=\/|$)/, home));
}

function runtimeDefinitions() {
  const codexHome = process.env.CODEX_HOME ? expand(process.env.CODEX_HOME) : path.join(home, '.codex');
  const claudeHome = process.env.CLAUDE_CONFIG_DIR ? expand(process.env.CLAUDE_CONFIG_DIR) : path.join(home, '.claude');
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
    synchronizedAt: new Date().toISOString(),
    runtime: target.runtime,
    skills: desired,
  };
  writeAtomic(manifestPath(target), `${JSON.stringify(manifest, null, 2)}\n`);
  rmSync(path.join(target.path, 'skills-binding-install-manifest.json'), { force: true });
  log(`synced ${desired.length} skills to ${target.runtime}: ${target.path}`);
  return manifest;
}

function sync() {
  const targets = resolveTargets();
  const result = targets.map((target) => ({ target, manifest: syncTarget(target) }));
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

function updaterSource() {
  const source = process.env.SYLPHX_SKILLS_SOURCE || 'github:SylphxAI/skills';
  if (!/^[A-Za-z0-9@/:._-]+$/.test(source)) throw new Error('SYLPHX_SKILLS_SOURCE contains unsupported characters');
  return source;
}

function writeUpdaterScript() {
  mkdirSync(stateDirectory, { recursive: true });
  const safePath = String(process.env.PATH || '/usr/local/bin:/usr/bin:/bin').replace(/'/g, "'\\''");
  const script = `#!/bin/sh\nexport PATH='${safePath}'\nexec npx --yes ${updaterSource()} sync --quiet\n`;
  writeAtomic(updaterScript, script, 0o755);
}

function run(command, args, { tolerateFailure = false } = {}) {
  const result = spawnSync(command, args, { encoding: 'utf8', stdio: quiet ? 'ignore' : 'pipe' });
  if (result.status !== 0 && !tolerateFailure) {
    throw new Error(`${command} ${args.join(' ')} failed: ${(result.stderr || result.stdout || '').trim()}`);
  }
  return result;
}

function xmlEscape(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function enableAutoSync() {
  writeUpdaterScript();
  if (process.platform === 'darwin') {
    const launchAgents = path.join(home, 'Library', 'LaunchAgents');
    const plist = path.join(launchAgents, 'ai.sylphx.skills-sync.plist');
    mkdirSync(launchAgents, { recursive: true });
    const body = `<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">\n<plist version="1.0"><dict>\n<key>Label</key><string>ai.sylphx.skills-sync</string>\n<key>ProgramArguments</key><array><string>/bin/sh</string><string>${xmlEscape(updaterScript)}</string></array>\n<key>RunAtLoad</key><true/>\n<key>StartInterval</key><integer>3600</integer>\n<key>StandardOutPath</key><string>${xmlEscape(path.join(stateDirectory, 'sync.log'))}</string>\n<key>StandardErrorPath</key><string>${xmlEscape(path.join(stateDirectory, 'sync-error.log'))}</string>\n</dict></plist>\n`;
    writeAtomic(plist, body);
    const domain = `gui/${process.getuid()}`;
    run('launchctl', ['bootout', domain, plist], { tolerateFailure: true });
    run('launchctl', ['bootstrap', domain, plist]);
    log(`enabled hourly auto-sync: ${plist}`);
    return;
  }
  if (process.platform === 'linux') {
    const units = path.join(home, '.config', 'systemd', 'user');
    const service = path.join(units, 'sylphx-skills-sync.service');
    const timer = path.join(units, 'sylphx-skills-sync.timer');
    mkdirSync(units, { recursive: true });
    writeAtomic(service, `[Unit]\nDescription=Synchronize Sylphx Agent Skills\n\n[Service]\nType=oneshot\nExecStart=/bin/sh ${updaterScript}\n`);
    writeAtomic(timer, '[Unit]\nDescription=Synchronize Sylphx Agent Skills hourly\n\n[Timer]\nOnBootSec=5m\nOnUnitActiveSec=1h\nPersistent=true\n\n[Install]\nWantedBy=timers.target\n');
    run('systemctl', ['--user', 'daemon-reload']);
    run('systemctl', ['--user', 'enable', '--now', 'sylphx-skills-sync.timer']);
    log(`enabled hourly auto-sync: ${timer}`);
    return;
  }
  if (process.platform === 'win32') {
    run('schtasks', ['/Create', '/SC', 'HOURLY', '/TN', 'SylphxSkillsSync', '/TR', `cmd /c "${updaterScript}"`, '/F']);
    log('enabled hourly auto-sync: Windows Task Scheduler / SylphxSkillsSync');
    return;
  }
  throw new Error(`Auto-sync is not supported on ${process.platform}`);
}

function disableAutoSync() {
  if (process.platform === 'darwin') {
    const plist = path.join(home, 'Library', 'LaunchAgents', 'ai.sylphx.skills-sync.plist');
    run('launchctl', ['bootout', `gui/${process.getuid()}`, plist], { tolerateFailure: true });
    rmSync(plist, { force: true });
  } else if (process.platform === 'linux') {
    run('systemctl', ['--user', 'disable', '--now', 'sylphx-skills-sync.timer'], { tolerateFailure: true });
    rmSync(path.join(home, '.config', 'systemd', 'user', 'sylphx-skills-sync.service'), { force: true });
    rmSync(path.join(home, '.config', 'systemd', 'user', 'sylphx-skills-sync.timer'), { force: true });
    run('systemctl', ['--user', 'daemon-reload'], { tolerateFailure: true });
  } else if (process.platform === 'win32') {
    run('schtasks', ['/Delete', '/TN', 'SylphxSkillsSync', '/F'], { tolerateFailure: true });
  }
  rmSync(updaterScript, { force: true });
  log('disabled Sylphx Skills auto-sync');
}

function autoSyncStatus() {
  const scheduler = process.platform === 'darwin'
    ? path.join(home, 'Library', 'LaunchAgents', 'ai.sylphx.skills-sync.plist')
    : process.platform === 'linux'
      ? path.join(home, '.config', 'systemd', 'user', 'sylphx-skills-sync.timer')
      : null;
  const result = { platform: process.platform, enabled: scheduler ? existsSync(scheduler) : null, scheduler, updaterScript };
  if (jsonOutput) console.log(JSON.stringify(result, null, 2));
  else log(`auto-sync: ${result.enabled ? 'enabled' : 'disabled'}${scheduler ? ` (${scheduler})` : ''}`);
}

function help() {
  console.log(`Sylphx Skills ${packageJson.version}\n\nUsage:\n  sylphx-skills sync [--agent codex|claude|all] [--dest PATH]\n  sylphx-skills status [--json]\n  sylphx-skills clear\n  sylphx-skills auto-sync enable|disable|status\n\nDefault behavior auto-detects Codex and Claude Code. On a fresh machine it\nprepares both roots so no destination choice is required.`);
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
