import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';

const repoRoot = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const registryPath = path.join(repoRoot, 'registry', 'skills.json');
const keepTemp = process.argv.includes('--keep-temp');

function run(command, args, options) {
  const startedAt = new Date().toISOString();
  const result = spawnSync(command, args, {
    ...options,
    encoding: 'utf8',
    maxBuffer: 1024 * 1024 * 20,
  });
  return {
    command: [command, ...args].join(' '),
    startedAt,
    exitCode: result.status,
    stdout: result.stdout || '',
    stderr: result.stderr || '',
  };
}

async function main() {
  const registry = JSON.parse(await readFile(registryPath, 'utf8'));
  const expectedSkills = registry.skills.map((skill) => skill.name).sort();
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), 'sylphx-skills-install-proof-'));
  const home = path.join(tempRoot, 'home');
  const project = path.join(tempRoot, 'project');
  const env = {
    ...process.env,
    HOME: home,
    NPM_CONFIG_CACHE: path.join(tempRoot, 'npm-cache'),
    XDG_CACHE_HOME: path.join(tempRoot, 'xdg-cache'),
    XDG_CONFIG_HOME: path.join(tempRoot, 'xdg-config'),
    npm_config_update_notifier: 'false',
  };
  await mkdir(home, { recursive: true });
  await mkdir(project, { recursive: true });
  await mkdir(env.NPM_CONFIG_CACHE, { recursive: true });
  await mkdir(env.XDG_CACHE_HOME, { recursive: true });
  await mkdir(env.XDG_CONFIG_HOME, { recursive: true });

  const proof = {
    schemaVersion: 1,
    generatedBy: 'scripts/verify-open-skills-install.mjs',
    generatedAt: new Date().toISOString(),
    package: 'SylphxAI/skills',
    expectedSkillCount: expectedSkills.length,
    expectedSkills,
    tempRoot: keepTemp ? tempRoot : '<removed>',
    node: process.version,
    npm: execFileSync('npm', ['--version'], { encoding: 'utf8' }).trim(),
    steps: [],
    installedSkillCount: 0,
    installedSkills: [],
  };

  const listStep = run('npx', ['--yes', 'skills', 'add', 'SylphxAI/skills', '--list'], { cwd: project, env });
  proof.steps.push({ name: 'list', ...listStep, stdoutSample: listStep.stdout.slice(0, 4000) });
  if (listStep.exitCode !== 0) throw new Error(`list command failed with ${listStep.exitCode}`);
  const missingFromList = expectedSkills.filter((name) => !listStep.stdout.includes(name));
  if (missingFromList.length) {
    console.error('List stdout sample:');
    console.error(listStep.stdout.slice(0, 4000));
    console.error('List stderr sample:');
    console.error(listStep.stderr.slice(0, 2000));
    throw new Error(`list output missing ${missingFromList.length} skill(s): ${missingFromList.join(', ')}`);
  }

  const installStep = run('npx', ['--yes', 'skills', 'add', 'SylphxAI/skills', '--global', '--skill', '*', '--agent', 'codex', '-y', '--copy'], { cwd: project, env });
  proof.steps.push({ name: 'install-all', ...installStep, stdoutSample: installStep.stdout.slice(0, 4000) });
  if (installStep.exitCode !== 0) throw new Error(`install command failed with ${installStep.exitCode}`);

  const installedRoot = path.join(home, '.agents', 'skills');
  if (!existsSync(installedRoot)) throw new Error(`installed root missing: ${installedRoot}`);
  const installedSkills = (await readdir(installedRoot, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
  proof.installedSkillCount = installedSkills.length;
  proof.installedSkills = installedSkills;

  const missing = expectedSkills.filter((name) => !installedSkills.includes(name));
  const extra = installedSkills.filter((name) => !expectedSkills.includes(name));
  if (missing.length || extra.length) {
    throw new Error(`installed skill mismatch: missing=${missing.join(',')} extra=${extra.join(',')}`);
  }

  for (const name of expectedSkills) {
    const skillPath = path.join(installedRoot, name, 'SKILL.md');
    if (!existsSync(skillPath)) throw new Error(`installed skill missing SKILL.md: ${name}`);
  }

  const listInstalledStep = run('npx', ['--yes', 'skills', 'list', '--global', '--json'], { cwd: project, env });
  proof.steps.push({ name: 'list-installed-json', ...listInstalledStep, stdoutSample: listInstalledStep.stdout.slice(0, 4000) });
  if (listInstalledStep.exitCode !== 0) throw new Error(`list installed command failed with ${listInstalledStep.exitCode}`);

  const proofPath = path.join(tempRoot, 'install-proof.json');
  await writeFile(proofPath, `${JSON.stringify(proof, null, 2)}\n`);
  console.log(JSON.stringify({
    ok: true,
    expectedSkillCount: proof.expectedSkillCount,
    installedSkillCount: proof.installedSkillCount,
    tempRoot: keepTemp ? tempRoot : '<removed>',
    proofPath: keepTemp ? proofPath : '<removed>',
  }, null, 2));

  if (!keepTemp) await rm(tempRoot, { recursive: true, force: true });
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
