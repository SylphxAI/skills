import assert from 'node:assert/strict';
import {
  cpSync,
  existsSync,
  lstatSync,
  mkdirSync,
  mkdtempSync,
  closeSync,
  openSync,
  readdirSync,
  readFileSync,
  readlinkSync,
  renameSync,
  rmSync,
  symlinkSync,
  writeSync,
  writeFileSync,
} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import test from 'node:test';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { packageDigest } from '../runtime/package-digest.mjs';
import {
  inspectLegacyAgentsProjection,
  legacyAgentsProjectionReadback,
  retireLegacyAgentsProjection,
} from '../runtime/legacy-agents-projection.mjs';
import { mergeAutoSyncAgents, qualificationRegressions } from '../runtime/sylphx-skills.mjs';
import {
  applyConstitutionPlan,
  CONSTITUTION_END,
  CONSTITUTION_START,
  inspectConstitution,
  planConstitutionInstall,
  RETIRED_INSTRUCTION_PROJECTION,
} from '../runtime/constitution.mjs';
import { reconcile } from '../runtime/reconcile.mjs';
import { parseIntervalMinutes, schedulerDefinition, schedulerStatus } from '../runtime/scheduler.mjs';
import { targetGenerationTransactionNames } from '../runtime/target-generation.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cli = path.join(root, 'runtime', 'sylphx-skills.mjs');
const catalog = JSON.parse(readFileSync(path.join(root, 'catalog.json'), 'utf8'));

function run(args) {
  const result = spawnSync(process.execPath, [cli, ...args], { cwd: root, encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr || result.stdout);
  return result;
}

function runWithEnvironment(args, environment) {
  const result = spawnSync(process.execPath, [cli, ...args], {
    cwd: root,
    encoding: 'utf8',
    env: { ...process.env, ...environment },
  });
  assert.equal(result.status, 0, result.stderr || result.stdout);
  return result;
}

function git(cwd, args) {
  const result = spawnSync('git', args, { cwd, encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr || result.stdout);
  return result.stdout.trim();
}

function commit(cwd, message) {
  git(cwd, ['add', '.']);
  git(cwd, ['-c', 'user.name=Sylphx Test', '-c', 'user.email=test@sylphx.invalid', 'commit', '-m', message]);
  return git(cwd, ['rev-parse', 'HEAD']);
}

function promotionManifest(cwd, sourceRevision, { qualifiedNames } = {}) {
  const catalogBytes = readFileSync(path.join(cwd, 'catalog.json'), 'utf8');
  const catalog = JSON.parse(catalogBytes);
  // The promotion manifest must carry the candidate tree's own qualification
  // projection; fixtures that copy real packages into a smaller catalog must
  // keep the projection consistent with the copied catalog.
  const names = qualifiedNames !== undefined
    ? qualifiedNames
    : (Array.isArray(catalog?.qualification?.qualifiedNames) ? catalog.qualification.qualifiedNames : []);
  return {
    schemaVersion: 1,
    owner: 'SylphxAI/skills',
    channel: 'release-tag',
    sourceRevision,
    catalogDigest: `sha256:${createHash('sha256').update(catalogBytes).digest('hex')}`,
    qualifiedNames: [...names].sort(),
    promotedAt: new Date().toISOString(),
  };
}

/**
 * Fixture equivalent of the release-promotion workflow: the content commit is
 * the promoted main revision, the manifest commit carries promotion.json, and
 * the annotated tag is the immutable promotion candidate AutoSync may apply.
 */
function promoteFixtureRelease(cwd, version, sourceRevision) {
  writeFileSync(
    path.join(cwd, 'promotion.json'),
    `${JSON.stringify(promotionManifest(cwd, sourceRevision), null, 2)}\n`,
  );
  const manifestSha = commit(cwd, `promotion manifest skills-v${version}`);
  annotatedTag(cwd, `skills-v${version}`, `release skills-v${version}`, manifestSha);
  return manifestSha;
}
function annotatedTag(cwd, name, message, target) {
  git(cwd, ['-c', 'user.name=Sylphx Test', '-c', 'user.email=test@sylphx.invalid', 'tag', '-a', name, '-m', message, target]);
}


function fixtureCatalogFile(entries) {
  return {
    schemaVersion: 1,
    source: 'skills/*/SKILL.md',
    count: entries.length,
    qualification: { total: entries.length, qualified: 0, qualifiedNames: [] },
    skills: entries,
  };
}

function exactLocalSourceCommit() {
  return git(root, ['status', '--porcelain', '--untracked-files=normal'])
    ? null
    : git(root, ['rev-parse', 'HEAD']);
}

function retiredInstructionProjection(localNotes = '') {
  return [
    '# Sylphx Agent Runtime Constitution',
    '',
    'Active topology:',
    '- **Static instructions SSOT:** `SylphxAI/skills`',
    // Historical on-disk recognition marker only — not live Enact/MCP authority.
    '- **Live fleet / work / ingestion / effects:** `SylphxAI/control-plane`',
    '',
    '<!-- local runtime notes may follow this block -->',
    localNotes,
  ].filter((line, index, lines) => line || index < lines.length - 1).join('\n');
}

function writeLegacyAgentsProjection(home, {
  sourceCommit = 'a'.repeat(40),
  // historical package ids from the exact captured projection only
  skills = [
    'mission-control-standard',
    'roleless-speculative-development-standard',
    'sota-execution-standard',
  ],
  mutateManifest = (manifest) => manifest,
} = {}) {
  const root = path.join(home, '.agents', 'skills');
  mkdirSync(root, { recursive: true });
  const digests = {};
  for (const name of skills) {
    const packageRoot = path.join(root, name);
    mkdirSync(packageRoot);
    writeFileSync(path.join(packageRoot, 'SKILL.md'), `---\nname: ${name}\ndescription: fixture\n---\n`);
    digests[name] = packageDigest(packageRoot);
  }
  const manifest = mutateManifest({
    installed_at: '2026-07-18T15:34:19.308Z',
    source: 'SylphxAI/skills',
    source_commit: sourceCommit,
    authority: 'binding',
    package_kind: 'standard',
    skills,
    count: skills.length,
    removed_retired_dual_discovery: 0,
  });
  writeFileSync(
    path.join(root, 'skills-binding-install-manifest.json'),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );
  return { root, sourceCommit, skills, digests };
}

test('verified legacy ~/.agents projection is archived outside discovery without touching unrelated Skills', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-legacy-agents-'));
  try {
    const fixture = writeLegacyAgentsProjection(sandbox);
    const unrelated = path.join(fixture.root, 'third-party-skill');
    mkdirSync(unrelated);
    writeFileSync(path.join(unrelated, 'SKILL.md'), 'third party\n');
    writeFileSync(path.join(fixture.root, 'KEEP'), 'unrelated root file\n');

    const plan = inspectLegacyAgentsProjection({
      home: sandbox,
      projections: { [fixture.sourceCommit]: fixture.digests },
    });
    assert.deepEqual(legacyAgentsProjectionReadback({
      home: sandbox,
      projections: { [fixture.sourceCommit]: fixture.digests },
    }), {
      state: 'recognized',
      sourceCommit: fixture.sourceCommit,
      skills: fixture.skills,
      error: null,
    });
    const result = retireLegacyAgentsProjection(plan);

    assert.deepEqual(result.removedFromDiscovery, fixture.skills);
    assert.equal(existsSync(path.join(fixture.root, 'skills-binding-install-manifest.json')), false);
    for (const name of fixture.skills) {
      assert.equal(existsSync(path.join(fixture.root, name)), false, `${name} remained discoverable`);
      assert.equal(packageDigest(path.join(result.archive, name)), fixture.digests[name]);
    }
    assert.equal(readFileSync(path.join(unrelated, 'SKILL.md'), 'utf8'), 'third party\n');
    assert.equal(readFileSync(path.join(fixture.root, 'KEEP'), 'utf8'), 'unrelated root file\n');
    assert.equal(existsSync(path.join(result.archive, 'skills-binding-install-manifest.json')), true);
    assert.equal(existsSync(path.join(result.archive, 'retirement.json')), true);
    assert.equal(legacyAgentsProjectionReadback({
      home: sandbox,
      projections: { [fixture.sourceCommit]: fixture.digests },
    }).state, 'absent');
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('interrupted legacy projection retirement resumes from verified archived and native bytes', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-legacy-agents-resume-'));
  try {
    const fixture = writeLegacyAgentsProjection(sandbox);
    const projections = { [fixture.sourceCommit]: fixture.digests };
    const plan = inspectLegacyAgentsProjection({ home: sandbox, projections });
    mkdirSync(plan.archiveRoot, { recursive: true });
    mkdirSync(plan.transactionRoot);
    writeFileSync(path.join(plan.transactionRoot, 'retirement.json'), `${JSON.stringify({
      schemaVersion: 1,
      owner: 'SylphxAI/skills',
      sourceRoot: plan.nativeRoot,
      sourceCommit: fixture.sourceCommit,
      manifest: plan.manifest,
      packageDigests: fixture.digests,
    }, null, 2)}\n`);
    renameSync(
      path.join(fixture.root, fixture.skills[0]),
      path.join(plan.transactionRoot, fixture.skills[0]),
    );

    const resumed = inspectLegacyAgentsProjection({ home: sandbox, projections });
    assert.equal(resumed.resuming, true);
    assert.equal(legacyAgentsProjectionReadback({ home: sandbox, projections }).state, 'retirement-interrupted');
    const result = retireLegacyAgentsProjection(resumed);
    for (const name of fixture.skills) {
      assert.equal(existsSync(path.join(fixture.root, name)), false);
      assert.equal(packageDigest(path.join(result.archive, name)), fixture.digests[name]);
    }
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('legacy projection retirement rejects a symlinked native discovery root', { skip: process.platform === 'win32' }, () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-legacy-agents-link-'));
  const external = mkdtempSync(path.join(os.tmpdir(), 'sylphx-legacy-agents-external-'));
  try {
    const fixture = writeLegacyAgentsProjection(external);
    mkdirSync(path.join(sandbox, '.agents'), { recursive: true });
    symlinkSync(fixture.root, path.join(sandbox, '.agents', 'skills'), 'dir');
    assert.throws(
      () => inspectLegacyAgentsProjection({
        home: sandbox,
        projections: { [fixture.sourceCommit]: fixture.digests },
      }),
      /legacy Agent Skills root is not a regular directory/,
    );
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
    rmSync(external, { recursive: true, force: true });
  }
});

test('legacy projection retirement fails closed on unknown, lookalike, and tampered ownership evidence', () => {
  for (const attack of ['unknown-source', 'lookalike-manifest', 'tampered-package']) {
    const sandbox = mkdtempSync(path.join(os.tmpdir(), `sylphx-legacy-agents-${attack}-`));
    try {
      const fixture = writeLegacyAgentsProjection(sandbox, {
        mutateManifest: attack === 'lookalike-manifest'
          ? (manifest) => ({ ...manifest, attackerControlled: true })
          : (manifest) => manifest,
      });
      const projections = attack === 'unknown-source'
        ? {}
        : { [fixture.sourceCommit]: fixture.digests };
      if (attack === 'tampered-package') {
        writeFileSync(path.join(fixture.root, fixture.skills[0], 'SKILL.md'), 'tampered\n');
      }

      assert.throws(
        () => inspectLegacyAgentsProjection({ home: sandbox, projections }),
        attack === 'unknown-source'
          ? /unknown legacy Sylphx Skills projection/
          : attack === 'lookalike-manifest'
            ? /unrecognized legacy ownership manifest/
            : /legacy managed package digest mismatch/,
      );
      assert.equal(existsSync(path.join(fixture.root, 'skills-binding-install-manifest.json')), true);
      assert.equal(existsSync(path.join(fixture.root, fixture.skills[0])), true);
    } finally {
      rmSync(sandbox, { recursive: true, force: true });
    }
  }
});

test('Codex install rejects an unknown legacy shared projection before mutating the receiving runtime', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-legacy-agents-cli-'));
  const codexHome = path.join(sandbox, '.codex');
  try {
    const fixture = writeLegacyAgentsProjection(sandbox);
    const result = spawnSync(process.execPath, [cli, 'install', '--agent', 'codex', '--quiet'], {
      cwd: root,
      encoding: 'utf8',
      env: {
        ...process.env,
        SYLPHX_SKILLS_HOME: sandbox,
        CODEX_HOME: codexHome,
      },
    });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /unknown legacy Sylphx Skills projection/);
    assert.equal(existsSync(path.join(codexHome, 'skills')), false);
    assert.equal(existsSync(path.join(fixture.root, fixture.skills[0])), true);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('Codex status reports invalid legacy discovery and clear refuses a false-green result', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-legacy-agents-status-'));
  const codexHome = path.join(sandbox, '.codex');
  try {
    const fixture = writeLegacyAgentsProjection(sandbox);
    const environment = {
      SYLPHX_SKILLS_HOME: sandbox,
      CODEX_HOME: codexHome,
    };
    const status = JSON.parse(runWithEnvironment(['status', '--agent', 'codex', '--json'], environment).stdout);
    assert.equal(status.targets[0].current, false);
    assert.equal(status.targets[0].legacyNativeProjection.state, 'invalid');
    assert.match(status.targets[0].legacyNativeProjection.error, /unknown legacy Sylphx Skills projection/);

    const sentinel = path.join(codexHome, 'skills', 'unrelated');
    mkdirSync(sentinel, { recursive: true });
    writeFileSync(path.join(sentinel, 'KEEP'), 'preserve\n');
    const clearing = spawnSync(process.execPath, [cli, 'clear', '--agent', 'codex', '--quiet'], {
      cwd: root,
      encoding: 'utf8',
      env: { ...process.env, ...environment },
    });
    assert.equal(clearing.status, 1);
    assert.match(clearing.stderr, /unknown legacy Sylphx Skills projection/);
    assert.equal(readFileSync(path.join(sentinel, 'KEEP'), 'utf8'), 'preserve\n');
    assert.equal(existsSync(path.join(fixture.root, fixture.skills[0])), true);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('sync, status, update, and clear own only the declared packages', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-skills-'));
  const destination = path.join(sandbox, 'skills');
  try {
    run(['sync', '--dest', destination, '--quiet']);
    const manifest = JSON.parse(readFileSync(path.join(destination, '.sylphx-skills.json'), 'utf8'));
    assert.equal(manifest.owner, 'SylphxAI/skills');
    assert.equal(manifest.skills.length, catalog.count);
    assert.deepEqual(manifest.packageDigests, Object.fromEntries(catalog.skills.map((skill) => [skill.name, skill.packageDigest])));
    assert.deepEqual(manifest.profiles || [], catalog.skills.filter((skill) => skill.profile).map((skill) => skill.profile));
    assert.equal(existsSync(path.join(destination, 'author-skill', 'SKILL.md')), true);
    assert.equal(existsSync(path.join(destination, 'verify-local-web-preview', 'SKILL.md')), true);

    const status = run(['status', '--dest', destination, '--json']);
    const parsed = JSON.parse(status.stdout);
    assert.equal(parsed.targets[0].current, true);
    assert.equal(parsed.targets[0].sourceCommit, exactLocalSourceCommit());
    assert.equal(typeof parsed.targets[0].packageVersion, 'string');
    assert.match(parsed.targets[0].generation, /^generation-[0-9a-f]{16}$/);
    assert.deepEqual(parsed.targets[0].driftedPackages, []);

    const committed = runWithEnvironment(['sync', '--dest', destination, '--quiet'], {
      SYLPHX_SKILLS_COMMIT_SHA: 'abc123deadbeef',
    });
    assert.equal(committed.status ?? 0, 0);
    const committedStatus = JSON.parse(runWithEnvironment(['status', '--dest', destination, '--json'], {
      SYLPHX_SKILLS_COMMIT_SHA: 'abc123deadbeef',
    }).stdout);
    assert.equal(committedStatus.targets[0].current, true);
    assert.equal(committedStatus.targets[0].sourceCommit, 'abc123deadbeef');
    assert.equal(committedStatus.targets[0].sourceCommitCurrent, true);

    const installedSkill = path.join(destination, 'author-skill', 'SKILL.md');
    writeFileSync(installedSkill, `${readFileSync(installedSkill, 'utf8')}\nmutated\n`);
    const drifted = JSON.parse(run(['status', '--dest', destination, '--json']).stdout);
    assert.equal(drifted.targets[0].current, false);
    assert.equal(drifted.targets[0].packagesCurrent, false);
    assert.ok(drifted.targets[0].driftedPackages.includes('author-skill'));
    run(['sync', '--dest', destination, '--quiet']);

    writeFileSync(path.join(destination, '.sylphx-skills.json'), `${JSON.stringify({ ...manifest, skills: [] }, null, 2)}\n`);
    const driftedSkills = JSON.parse(run(['status', '--dest', destination, '--json']).stdout);
    assert.equal(driftedSkills.targets[0].current, false);
    assert.equal(driftedSkills.targets[0].skillsCurrent, false);
    run(['sync', '--dest', destination, '--quiet']);

    const installedSkillPath = path.join(destination, 'author-skill', 'SKILL.md');
    writeFileSync(installedSkillPath, `${readFileSync(installedSkillPath, 'utf8')}\nmutated\n`);
    const driftedSkill = JSON.parse(run(['status', '--dest', destination, '--json']).stdout);
    assert.equal(driftedSkill.targets[0].current, false);

    run(['sync', '--dest', destination, '--quiet']);
    const installedLink = path.join(destination, 'author-skill', 'linked.md');
    symlinkSync('SKILL.md', installedLink);
    const linkedStatus = spawnSync(process.execPath, [cli, 'status', '--dest', destination, '--json'], {
      cwd: root,
      encoding: 'utf8',
    });
    assert.equal(linkedStatus.status, 1);
    assert.match(linkedStatus.stderr, /unsupported symbolic link: linked\.md/);

    run(['sync', '--dest', destination, '--quiet']);
    const interruptedPackage = 'author-skill';
    const interruptedDestination = path.join(destination, interruptedPackage);
    const interruptedTransaction = path.join(destination, '.sylphx-transaction-test-recovery');
    mkdirSync(interruptedTransaction);
    writeFileSync(path.join(interruptedTransaction, 'transaction.json'), `${JSON.stringify({
      schemaVersion: 1,
      owner: 'SylphxAI/skills',
      package: interruptedPackage,
    }, null, 2)}\n`);
    cpSync(interruptedDestination, path.join(interruptedTransaction, 'stage'), { recursive: true });
    renameSync(interruptedDestination, path.join(interruptedTransaction, 'backup'));

    run(['sync', '--dest', destination, '--quiet']);
    assert.equal(existsSync(interruptedDestination), true);
    assert.equal(existsSync(interruptedTransaction), false);
    assert.deepEqual(readdirSync(destination).filter((name) => name.startsWith('.sylphx-transaction-')), []);

    writeFileSync(path.join(destination, '.sylphx-skills.json'), '{"owner":"attacker","skills":["../unowned"]}\n');
    run(['sync', '--dest', destination, '--quiet']);
    assert.equal(existsSync(path.join(sandbox, 'unowned')), false);
    assert.equal(JSON.parse(readFileSync(path.join(destination, '.sylphx-skills.json'), 'utf8')).owner, 'SylphxAI/skills');

    run(['clear', '--dest', destination, '--quiet']);
    assert.equal(existsSync(path.join(destination, 'author-skill')), false);
    assert.equal(existsSync(path.join(destination, '.sylphx-skills.json')), false);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('agent override targets Codex, Claude, and Grok without upstream tooling', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-targets-'));
  try {
    const script = `import { resolveTargets } from ${JSON.stringify(new URL('../runtime/sylphx-skills.mjs', import.meta.url).href)}; console.log(JSON.stringify(resolveTargets({args:['--agent','all'],homedir:${JSON.stringify(sandbox)}})));`;
    const result = spawnSync(process.execPath, ['--input-type=module', '--eval', script], { cwd: root, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr || result.stdout);
    const targets = JSON.parse(result.stdout);
    assert.deepEqual(targets.map((target) => target.runtime), ['codex', 'claude', 'grok']);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('agent install converges native Skills and managed constitutions without owning user instructions', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-agent-install-'));
  const codexHome = path.join(sandbox, '.codex');
  const claudeHome = path.join(sandbox, '.claude');
  const grokHome = path.join(sandbox, '.grok');
  const environment = {
    SYLPHX_SKILLS_HOME: sandbox,
    CODEX_HOME: codexHome,
    CLAUDE_CONFIG_DIR: claudeHome,
    GROK_HOME: grokHome,
  };
  const instructionFiles = [
    path.join(codexHome, 'AGENTS.md'),
    path.join(claudeHome, 'CLAUDE.md'),
    path.join(grokHome, 'AGENTS.md'),
  ];
  try {
    for (const [index, file] of instructionFiles.entries()) {
      mkdirSync(path.dirname(file), { recursive: true });
      writeFileSync(file, `# Local runtime note ${index + 1}\n\nPreserve this text.\n`);
    }

    runWithEnvironment(['install', '--agent', 'all', '--quiet'], environment);
    const firstInstructions = instructionFiles.map((file) => readFileSync(file, 'utf8'));
    for (const [index, file] of instructionFiles.entries()) {
      const content = firstInstructions[index];
      assert.match(content, new RegExp(`^# Local runtime note ${index + 1}`));
      assert.equal(content.includes(CONSTITUTION_START), true);
      assert.equal(content.includes(CONSTITUTION_END), true);
      assert.equal(inspectConstitution(file).current, true);
    }

    const installed = JSON.parse(runWithEnvironment(['status', '--agent', 'all', '--json'], environment).stdout);
    assert.deepEqual(installed.targets.map((target) => target.runtime), ['codex', 'claude', 'grok']);
    assert.equal(installed.targets.every((target) => target.current), true);
    assert.equal(installed.targets.every((target) => target.constitution.current), true);
    assert.equal(installed.targets.every((target) => target.installed === catalog.count), true);
    assert.equal(installed.targets.every((target) => target.sourceCommit === exactLocalSourceCommit()), true);
    assert.equal(installed.targets.every((target) => Number.isFinite(Date.parse(target.synchronizedAt))), true);
    const firstManifests = installed.targets.map((target) => (
      JSON.parse(readFileSync(path.join(target.path, '.sylphx-skills.json'), 'utf8'))
    ));

    runWithEnvironment(['install', '--agent', 'all', '--quiet'], environment);
    assert.deepEqual(instructionFiles.map((file) => readFileSync(file, 'utf8')), firstInstructions);
    const second = JSON.parse(runWithEnvironment(['status', '--agent', 'all', '--json'], environment).stdout);
    assert.deepEqual(
      second.targets.map(({ runtime, generation, sourceCommit, synchronizedAt }) => ({
        runtime,
        generation,
        sourceCommit,
        synchronizedAt,
      })),
      installed.targets.map(({ runtime, generation, sourceCommit, synchronizedAt }) => ({
        runtime,
        generation,
        sourceCommit,
        synchronizedAt,
      })),
    );
    second.targets.forEach((target, index) => {
      const manifest = JSON.parse(readFileSync(path.join(target.path, '.sylphx-skills.json'), 'utf8'));
      assert.equal(manifest.synchronizedAt, firstManifests[index].synchronizedAt);
    });

    writeFileSync(
      instructionFiles[0],
      readFileSync(instructionFiles[0], 'utf8').replace(
        '# Sylphx Agent Runtime Constitution',
        '# Stale Sylphx Agent Runtime Constitution',
      ),
    );
    const drifted = JSON.parse(runWithEnvironment(['status', '--agent', 'codex', '--json'], environment).stdout);
    assert.equal(drifted.targets[0].current, false);
    assert.equal(drifted.targets[0].constitution.current, false);
    runWithEnvironment(['install', '--agent', 'codex', '--quiet'], environment);
    assert.equal(inspectConstitution(instructionFiles[0]).current, true);
    assert.match(readFileSync(instructionFiles[0], 'utf8'), /^# Local runtime note 1/);

    writeFileSync(instructionFiles[1], `${readFileSync(instructionFiles[1], 'utf8')}\n${CONSTITUTION_START}\n`);
    assert.throws(
      () => planConstitutionInstall(instructionFiles[1]),
      /malformed Sylphx constitution markers/,
    );
    writeFileSync(instructionFiles[1], firstInstructions[1]);

    runWithEnvironment(['clear', '--agent', 'all', '--quiet'], environment);
    for (const [index, file] of instructionFiles.entries()) {
      assert.equal(readFileSync(file, 'utf8'), `# Local runtime note ${index + 1}\n\nPreserve this text.\n`);
      assert.equal(existsSync(path.join(path.dirname(file), 'skills', 'author-skill')), false);
    }
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('install is static reconciliation only: AutoSync stays disabled and status projects qualification', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-install-static-'));
  const codexHome = path.join(sandbox, '.codex');
  const environment = {
    SYLPHX_SKILLS_HOME: sandbox,
    CODEX_HOME: codexHome,
    CLAUDE_CONFIG_DIR: path.join(sandbox, '.claude'),
    GROK_HOME: path.join(sandbox, '.grok'),
  };
  try {
    mkdirSync(codexHome, { recursive: true });
    writeFileSync(path.join(codexHome, 'AGENTS.md'), '# Local runtime note\n\nPreserve this text.\n');

    runWithEnvironment(['install', '--agent', 'codex', '--quiet'], environment);

    // The documented contract: install is static; it never creates schedulers.
    const autoSync = JSON.parse(
      runWithEnvironment(['auto-sync', 'status', '--json'], environment).stdout,
    );
    assert.equal(autoSync.configured, false);
    assert.equal(autoSync.enabled, false);

    // status projects the catalog's qualification state per installed target.
    const installed = JSON.parse(runWithEnvironment(['status', '--agent', 'codex', '--json'], environment).stdout);
    assert.equal(installed.targets[0].current, true);
    assert.deepEqual(installed.targets[0].qualification, {
      total: catalog.qualification.total,
      qualified: catalog.qualification.qualified,
      installedQualifiedNames: catalog.qualification.qualifiedNames,
    });
    const manifest = JSON.parse(readFileSync(path.join(installed.targets[0].path, '.sylphx-skills.json'), 'utf8'));
    assert.deepEqual(manifest.qualifiedNames, catalog.qualification.qualifiedNames);
    assert.deepEqual(manifest.qualification, {
      total: catalog.qualification.total,
      qualified: catalog.qualification.qualified,
    });
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('qualification promotion gate detects qualified-to-unqualified downgrades', () => {
  assert.deepEqual(qualificationRegressions(['a', 'b'], ['a', 'b', 'c']), []);
  assert.deepEqual(qualificationRegressions(['a', 'b'], ['a']), ['b']);
  assert.deepEqual(qualificationRegressions(['a', 'b'], []), ['a', 'b']);
  assert.deepEqual(qualificationRegressions(undefined, ['a']), []);
  assert.deepEqual(qualificationRegressions(['a'], ['a']), []);
});

test('agent install safely retires recognized instruction projections and preserves local notes', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-retired-instruction-'));
  const codexHome = path.join(sandbox, '.codex');
  const claudeHome = path.join(sandbox, '.claude');
  const grokHome = path.join(sandbox, '.grok');
  const retiredTarget = path.join(sandbox, '.doctrine-runtime-current', 'templates', 'AGENTS.md');
  const codexInstructions = path.join(codexHome, 'AGENTS.md');
  const claudeInstructions = path.join(claudeHome, 'CLAUDE.md');
  const targetContent = retiredInstructionProjection('# Retained Codex note\n\nKeep this.\n');
  const claudeLocalNotes = [
    '- Preserve Claude worktree behavior.',
    '- Preserve denied-permission behavior.',
    '',
  ].join('\n');
  const environment = {
    SYLPHX_SKILLS_HOME: sandbox,
    CODEX_HOME: codexHome,
    CLAUDE_CONFIG_DIR: claudeHome,
    GROK_HOME: grokHome,
  };
  try {
    mkdirSync(path.dirname(retiredTarget), { recursive: true });
    mkdirSync(codexHome);
    mkdirSync(claudeHome);
    writeFileSync(retiredTarget, targetContent, { mode: 0o644 });
    symlinkSync(retiredTarget, codexInstructions, 'file');
    writeFileSync(
      claudeInstructions,
      `# Claude Code runtime mapping\n\n@${retiredTarget}\n\n${claudeLocalNotes}`,
    );

    const beforeCodex = JSON.parse(
      runWithEnvironment(['status', '--agent', 'codex', '--json'], environment).stdout,
    );
    assert.equal(beforeCodex.targets[0].current, false);
    assert.equal(beforeCodex.targets[0].constitution.error, null);
    assert.equal(
      beforeCodex.targets[0].constitution.migrationRequired,
      RETIRED_INSTRUCTION_PROJECTION,
    );
    const beforeClaude = JSON.parse(
      runWithEnvironment(['status', '--agent', 'claude', '--json'], environment).stdout,
    );
    assert.equal(
      beforeClaude.targets[0].constitution.migrationRequired,
      RETIRED_INSTRUCTION_PROJECTION,
    );

    runWithEnvironment(['install', '--agent', 'all', '--quiet'], environment);
    const codexAfter = readFileSync(codexInstructions, 'utf8');
    const claudeAfter = readFileSync(claudeInstructions, 'utf8');
    assert.equal(lstatSync(codexInstructions).isFile(), true);
    assert.equal(lstatSync(codexInstructions).isSymbolicLink(), false);
    assert.equal(readFileSync(retiredTarget, 'utf8'), targetContent);
    assert.match(codexAfter, /^# Retained Codex note/);
    assert.equal(codexAfter.includes('# Sylphx Agent Runtime Constitution'), true);
    assert.equal(codexAfter.includes('.doctrine-runtime-current'), false);
    assert.match(claudeAfter, /^- Preserve Claude worktree behavior\./);
    assert.equal(claudeAfter.includes(`@${retiredTarget}`), false);
    assert.equal(claudeAfter.includes('.doctrine-runtime-current'), false);
    assert.equal(inspectConstitution(codexInstructions).current, true);
    assert.equal(inspectConstitution(claudeInstructions).current, true);

    const firstInstructions = [codexAfter, claudeAfter];
    runWithEnvironment(['install', '--agent', 'all', '--quiet'], environment);
    assert.deepEqual(
      [readFileSync(codexInstructions, 'utf8'), readFileSync(claudeInstructions, 'utf8')],
      firstInstructions,
    );

    const installed = JSON.parse(
      runWithEnvironment(['status', '--agent', 'all', '--json'], environment).stdout,
    );
    assert.equal(installed.targets.every((target) => target.current), true);
    assert.equal(
      installed.targets.every((target) => target.constitution.migrationRequired === null),
      true,
    );

    runWithEnvironment(['clear', '--agent', 'all', '--quiet'], environment);
    assert.equal(readFileSync(codexInstructions, 'utf8'), '# Retained Codex note\n\nKeep this.\n');
    assert.equal(readFileSync(claudeInstructions, 'utf8'), claudeLocalNotes);
    assert.equal(readFileSync(retiredTarget, 'utf8'), targetContent);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('retired projection migration keeps arbitrary links fail-closed and detects target races', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-retired-instruction-fence-'));
  const codexHome = path.join(sandbox, '.codex');
  const instructionFile = path.join(codexHome, 'AGENTS.md');
  const retiredTarget = path.join(sandbox, '.doctrine-runtime-current', 'templates', 'AGENTS.md');
  const unrelatedTarget = path.join(sandbox, 'unrelated.md');
  try {
    mkdirSync(codexHome);
    writeFileSync(unrelatedTarget, retiredInstructionProjection());
    symlinkSync(unrelatedTarget, instructionFile, 'file');
    assert.throws(
      () => planConstitutionInstall(instructionFile),
      /Refusing to modify non-regular instruction file/,
    );
    assert.equal(readFileSync(unrelatedTarget, 'utf8'), retiredInstructionProjection());

    rmSync(instructionFile);
    mkdirSync(path.dirname(retiredTarget), { recursive: true });
    writeFileSync(retiredTarget, retiredInstructionProjection(), { mode: 0o644 });
    symlinkSync(retiredTarget, instructionFile, 'file');
    const plan = planConstitutionInstall(instructionFile);
    writeFileSync(retiredTarget, retiredInstructionProjection('# concurrent note\n'), { mode: 0o644 });
    assert.throws(
      () => applyConstitutionPlan(plan),
      /Instruction file changed during Sylphx constitution update/,
    );
    assert.equal(lstatSync(instructionFile).isSymbolicLink(), true);

    rmSync(instructionFile);
    writeFileSync(retiredTarget, '# not a recognized projection\n', { mode: 0o644 });
    symlinkSync(retiredTarget, instructionFile, 'file');
    assert.throws(
      () => planConstitutionInstall(instructionFile),
      /unrecognized retired instruction projection/,
    );
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('help is read-only and never falls through to installation', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-help-'));
  try {
    const result = runWithEnvironment(['--help'], {
      SYLPHX_SKILLS_HOME: sandbox,
      CODEX_HOME: path.join(sandbox, '.codex'),
    });
    assert.match(result.stdout, /sylphx-skills install/);
    assert.equal(existsSync(path.join(sandbox, '.codex')), false);
    assert.equal(existsSync(path.join(sandbox, '.sylphx-skills')), false);

    const bare = runWithEnvironment([], {
      SYLPHX_SKILLS_HOME: sandbox,
      CODEX_HOME: path.join(sandbox, '.codex'),
    });
    assert.match(bare.stdout, /Every mutating native operation requires an explicit runtime selection/);
    assert.equal(existsSync(path.join(sandbox, '.codex')), false);
    assert.equal(existsSync(path.join(sandbox, '.sylphx-skills')), false);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('mutating operations fail closed without one explicit target mode', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-mutation-scope-'));
  const environment = {
    ...process.env,
    SYLPHX_SKILLS_HOME: sandbox,
    CODEX_HOME: path.join(sandbox, '.codex'),
    CLAUDE_CONFIG_DIR: path.join(sandbox, '.claude'),
    GROK_HOME: path.join(sandbox, '.grok'),
  };
  try {
    for (const args of [
      ['sync'],
      ['clear'],
      ['auto-sync', 'enable'],
      ['sync', '--agent'],
      ['sync', '--dest'],
      ['sync', '--agent', 'codex', '--dest', path.join(sandbox, 'custom')],
    ]) {
      const result = spawnSync(process.execPath, [cli, ...args], {
        cwd: root,
        encoding: 'utf8',
        env: environment,
      });
      assert.equal(result.status, 1, `${args.join(' ')} unexpectedly succeeded`);
    }
    assert.equal(existsSync(path.join(sandbox, '.codex')), false);
    assert.equal(existsSync(path.join(sandbox, '.claude')), false);
    assert.equal(existsSync(path.join(sandbox, '.grok')), false);
    assert.equal(existsSync(path.join(sandbox, '.sylphx-skills')), false);
    assert.equal(existsSync(path.join(sandbox, 'custom')), false);

    runWithEnvironment(['sync', '--agent', 'codex', '--quiet'], environment);
    assert.equal(existsSync(path.join(sandbox, '.codex', 'skills', '.sylphx-skills.json')), true);
    assert.equal(existsSync(path.join(sandbox, '.claude')), false);
    assert.equal(existsSync(path.join(sandbox, '.grok')), false);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('agent install requires one explicit native runtime and rejects custom destinations', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-install-target-'));
  const environment = {
    ...process.env,
    SYLPHX_SKILLS_HOME: sandbox,
    CODEX_HOME: path.join(sandbox, '.codex'),
  };
  try {
    const implicit = spawnSync(process.execPath, [cli, 'install'], {
      cwd: root,
      encoding: 'utf8',
      env: environment,
    });
    assert.equal(implicit.status, 1);
    assert.match(implicit.stderr, /install requires --agent/);
    assert.equal(existsSync(path.join(sandbox, '.claude')), false);
    assert.equal(existsSync(path.join(sandbox, '.grok')), false);

    const custom = spawnSync(process.execPath, [cli, 'install', '--dest', path.join(sandbox, 'custom')], {
      cwd: root,
      encoding: 'utf8',
      env: environment,
    });
    assert.equal(custom.status, 1);
    assert.match(custom.stderr, /custom destinations support Skills sync only/);
    assert.equal(existsSync(path.join(sandbox, 'custom')), false);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('agent install fails closed when the native runtime home is a symbolic link', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-install-home-link-'));
  const actualHome = path.join(sandbox, 'actual-codex-home');
  const codexHome = path.join(sandbox, '.codex');
  try {
    mkdirSync(actualHome);
    symlinkSync(actualHome, codexHome, 'dir');
    const result = spawnSync(process.execPath, [cli, 'install', '--agent', 'codex'], {
      cwd: root,
      encoding: 'utf8',
      env: {
        ...process.env,
        SYLPHX_SKILLS_HOME: sandbox,
        CODEX_HOME: codexHome,
      },
    });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /non-regular runtime home/);
    assert.equal(existsSync(path.join(actualHome, 'AGENTS.md')), false);
    assert.equal(existsSync(path.join(actualHome, 'skills')), false);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});


test('mandatory AutoSync adds a receiving runtime without dropping prior selection', () => {
  assert.deepEqual(mergeAutoSyncAgents(null, ['codex']), ['codex']);
  assert.deepEqual(
    mergeAutoSyncAgents({ enabled: true, agents: ['codex'] }, ['claude']),
    ['codex', 'claude'],
  );
  assert.deepEqual(
    mergeAutoSyncAgents({ enabled: true, agents: null }, ['codex']),
    ['codex', 'claude', 'grok'],
  );
  assert.throws(
    () => mergeAutoSyncAgents({ enabled: true, agents: ['unknown'] }, ['codex']),
    /Invalid existing AutoSync runtime selection/,
  );
});

test('sync rejects symbolic links before replacing the affected installed package', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-sync-symlink-'));
  const source = path.join(sandbox, 'source');
  const destination = path.join(sandbox, 'destination');
  const installedPackage = path.join(destination, 'author-skill');
  try {
    for (const entry of ['runtime', 'skills']) cpSync(path.join(root, entry), path.join(source, entry), { recursive: true });
    for (const entry of ['catalog.json', 'package.json']) cpSync(path.join(root, entry), path.join(source, entry));
    const initial = spawnSync(
      process.execPath,
      [path.join(source, 'runtime', 'sylphx-skills.mjs'), 'sync', '--dest', destination, '--quiet'],
      { cwd: source, encoding: 'utf8' },
    );
    assert.equal(initial.status, 0, initial.stderr || initial.stdout);
    symlinkSync(
      'SKILL.md',
      path.join(source, 'skills', 'author-skill', 'linked.md'),
    );
    writeFileSync(path.join(installedPackage, 'preserved.txt'), 'existing installation\n');

    const result = spawnSync(
      process.execPath,
      [path.join(source, 'runtime', 'sylphx-skills.mjs'), 'sync', '--dest', destination, '--quiet'],
      { cwd: source, encoding: 'utf8' },
    );
    assert.equal(result.status, 1);
    assert.match(result.stderr, /unsupported symbolic link: linked\.md/);
    assert.equal(readFileSync(path.join(installedPackage, 'preserved.txt'), 'utf8'), 'existing installation\n');
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

function writeFixtureCatalog(source, names) {
  const skills = [...names].sort().map((name) => ({
    name,
    description: `Use for the ${name} transaction fixture.`,
    path: `skills/${name}/SKILL.md`,
    packageDigest: packageDigest(path.join(source, 'skills', name)),
    qualified: false,
    qualificationStatus: 'unqualified',
  }));
  writeFileSync(path.join(source, 'catalog.json'), `${JSON.stringify({
    schemaVersion: 1,
    source: 'skills/*/SKILL.md',
    count: skills.length,
    qualification: {
      total: skills.length,
      qualified: 0,
      qualifiedNames: [],
    },
    skills,
  }, null, 2)}\n`);
}

function writeFixtureSkill(source, name, generation) {
  const packageRoot = path.join(source, 'skills', name);
  mkdirSync(packageRoot, { recursive: true });
  writeFileSync(
    path.join(packageRoot, 'SKILL.md'),
    `---\nname: ${name}\ndescription: Use for the ${name} transaction fixture.\n---\n\n${generation}\n`,
  );
}

function createGenerationFixture(sandbox) {
  const source = path.join(sandbox, 'source');
  const destination = path.join(sandbox, 'installed', 'skills');
  cpSync(path.join(root, 'runtime'), path.join(source, 'runtime'), { recursive: true });
  cpSync(path.join(root, 'package.json'), path.join(source, 'package.json'));
  writeFixtureSkill(source, 'alpha', 'generation-one');
  writeFixtureSkill(source, 'beta', 'generation-one');
  writeFixtureCatalog(source, ['alpha', 'beta']);
  const fixtureCli = path.join(source, 'runtime', 'sylphx-skills.mjs');
  const result = spawnSync(process.execPath, [fixtureCli, 'sync', '--dest', destination, '--quiet'], {
    cwd: source,
    encoding: 'utf8',
  });
  assert.equal(result.status, 0, result.stderr || result.stdout);
  return { source, destination, fixtureCli };
}

function managedGenerationName(pointer) {
  assert.equal(lstatSync(pointer).isSymbolicLink(), true);
  const target = readlinkSync(pointer);
  const generationName = path.basename(path.normalize(target));
  assert.match(generationName, /^generation-[0-9a-f]{16}$/);
  const actual = path.isAbsolute(target)
    ? path.normalize(target)
    : path.resolve(path.dirname(pointer), target);
  const expected = path.join(path.dirname(pointer), '.sylphx-managed-generations', generationName);
  assert.ok(
    actual === expected || actual === path.toNamespacedPath(expected),
    `managed generation pointer escaped its store: ${target}`,
  );
  return generationName;
}

function replaceManagedLinkWithAbsoluteTarget(file, type) {
  const absoluteTarget = path.resolve(path.dirname(file), readlinkSync(file));
  rmSync(file, { force: true });
  symlinkSync(absoluteTarget, file, type);
}

for (const scenario of [
  { boundary: 'after-package:alpha', beforeStatus: 'old', statusCurrent: false },
  { boundary: 'after-removal:beta', beforeStatus: 'old', statusCurrent: false },
  { boundary: 'after-manifest', beforeStatus: 'old', statusCurrent: false },
  { boundary: 'after-backup', beforeStatus: 'old', statusCurrent: true },
  { boundary: 'after-target', beforeStatus: 'new', statusCurrent: true },
]) {
  test(`whole-target generation recovers a crash at ${scenario.boundary}`, () => {
    const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-generation-crash-'));
    const source = path.join(sandbox, 'source');
    const destination = path.join(sandbox, 'installed', 'skills');
    const fixtureCli = path.join(source, 'runtime', 'sylphx-skills.mjs');
    try {
      cpSync(path.join(root, 'runtime'), path.join(source, 'runtime'), { recursive: true });
      cpSync(path.join(root, 'package.json'), path.join(source, 'package.json'));
      writeFixtureSkill(source, 'alpha', 'generation-one');
      writeFixtureSkill(source, 'beta', 'generation-one');
      writeFixtureCatalog(source, ['alpha', 'beta']);
      let result = spawnSync(process.execPath, [fixtureCli, 'sync', '--dest', destination, '--quiet'], {
        cwd: source,
        encoding: 'utf8',
      });
      assert.equal(result.status, 0, result.stderr || result.stdout);
      mkdirSync(path.join(destination, 'third-party'), { recursive: true });
      writeFileSync(path.join(destination, 'third-party', 'KEEP'), 'user-owned\n');

      writeFixtureSkill(source, 'alpha', 'generation-two');
      rmSync(path.join(source, 'skills', 'beta'), { recursive: true, force: true });
      writeFixtureSkill(source, 'gamma', 'generation-two');
      writeFixtureCatalog(source, ['alpha', 'gamma']);

      result = spawnSync(process.execPath, [fixtureCli, 'sync', '--dest', destination, '--quiet'], {
        cwd: source,
        encoding: 'utf8',
        env: {
          ...process.env,
          NODE_ENV: 'test',
          SYLPHX_SKILLS_TEST_CRASH_AT: scenario.boundary,
        },
      });
      assert.equal(result.status, 86, result.stderr || result.stdout);

      if (scenario.beforeStatus === 'old') {
        assert.match(readFileSync(path.join(destination, 'alpha', 'SKILL.md'), 'utf8'), /generation-one/);
        assert.equal(existsSync(path.join(destination, 'beta', 'SKILL.md')), true);
        assert.equal(existsSync(path.join(destination, 'gamma')), false);
      } else if (scenario.beforeStatus === 'missing') {
        assert.equal(existsSync(destination), false);
      } else {
        assert.match(readFileSync(path.join(destination, 'alpha', 'SKILL.md'), 'utf8'), /generation-two/);
        assert.equal(existsSync(path.join(destination, 'beta')), false);
        assert.equal(existsSync(path.join(destination, 'gamma', 'SKILL.md')), true);
      }

      const status = spawnSync(process.execPath, [fixtureCli, 'status', '--dest', destination, '--json'], {
        cwd: source,
        encoding: 'utf8',
      });
      assert.equal(status.status, 0, status.stderr || status.stdout);
      assert.equal(JSON.parse(status.stdout).targets[0].current, scenario.statusCurrent);

      result = spawnSync(process.execPath, [fixtureCli, 'sync', '--dest', destination, '--quiet'], {
        cwd: source,
        encoding: 'utf8',
      });
      assert.equal(result.status, 0, result.stderr || result.stdout);
      assert.match(readFileSync(path.join(destination, 'alpha', 'SKILL.md'), 'utf8'), /generation-two/);
      assert.equal(existsSync(path.join(destination, 'beta')), false);
      assert.equal(existsSync(path.join(destination, 'gamma', 'SKILL.md')), true);
      assert.equal(readFileSync(path.join(destination, 'third-party', 'KEEP'), 'utf8'), 'user-owned\n');
      assert.deepEqual(targetGenerationTransactionNames(destination), []);
      assert.equal(existsSync(path.join(path.dirname(destination), `.${path.basename(destination)}.sylphx-generation-lock`)), false);
      const finalStatus = JSON.parse(spawnSync(
        process.execPath,
        [fixtureCli, 'status', '--dest', destination, '--json'],
        { cwd: source, encoding: 'utf8' },
      ).stdout);
      assert.equal(finalStatus.targets[0].current, true);
    } finally {
      rmSync(sandbox, { recursive: true, force: true });
    }
  });
}

test('target generation preserves unproven lookalikes and fails closed on an unowned exact journal', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-generation-ownership-'));
  try {
    const { source, destination, fixtureCli } = createGenerationFixture(sandbox);
    const lookalike = path.join(path.dirname(destination), `.${path.basename(destination)}.sylphx-generation-user-owned`);
    mkdirSync(path.join(lookalike, 'stage'), { recursive: true });
    writeFileSync(path.join(lookalike, 'stage', 'KEEP'), 'user-owned\n');
    let result = spawnSync(process.execPath, [fixtureCli, 'status', '--dest', destination, '--json'], {
      cwd: source,
      encoding: 'utf8',
    });
    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.equal(readFileSync(path.join(lookalike, 'stage', 'KEEP'), 'utf8'), 'user-owned\n');

    const exact = path.join(path.dirname(destination), `.${path.basename(destination)}.sylphx-generation`);
    mkdirSync(path.join(exact, 'stage'), { recursive: true });
    writeFileSync(path.join(exact, 'stage', 'KEEP'), 'unproven\n');
    result = spawnSync(process.execPath, [fixtureCli, 'status', '--dest', destination, '--json'], {
      cwd: source,
      encoding: 'utf8',
    });
    assert.notEqual(result.status, 0, result.stderr || result.stdout);
    assert.equal(readFileSync(path.join(exact, 'stage', 'KEEP'), 'utf8'), 'unproven\n');
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('target generation refuses to adopt or delete an unproven internal store', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-generation-unowned-store-'));
  const destination = path.join(sandbox, 'installed', 'skills');
  try {
    const source = path.join(sandbox, 'source');
    cpSync(path.join(root, 'runtime'), path.join(source, 'runtime'), { recursive: true });
    cpSync(path.join(root, 'package.json'), path.join(source, 'package.json'));
    writeFixtureSkill(source, 'alpha', 'generation-one');
    writeFixtureCatalog(source, ['alpha']);
    const unproven = path.join(destination, '.sylphx-managed-generations', 'generation-aaaaaaaaaaaaaaaa');
    mkdirSync(unproven, { recursive: true });
    writeFileSync(path.join(unproven, 'KEEP'), 'unproven user data\n');
    const result = spawnSync(process.execPath, [path.join(source, 'runtime', 'sylphx-skills.mjs'), 'sync', '--dest', destination], {
      cwd: source,
      encoding: 'utf8',
    });
    assert.notEqual(result.status, 0, result.stderr || result.stdout);
    assert.equal(readFileSync(path.join(unproven, 'KEEP'), 'utf8'), 'unproven user data\n');
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('target generation refuses a fresh desired-name collision without deleting it', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-generation-name-collision-'));
  const destination = path.join(sandbox, 'installed', 'skills');
  try {
    const source = path.join(sandbox, 'source');
    cpSync(path.join(root, 'runtime'), path.join(source, 'runtime'), { recursive: true });
    cpSync(path.join(root, 'package.json'), path.join(source, 'package.json'));
    writeFixtureSkill(source, 'alpha', 'generation-one');
    writeFixtureCatalog(source, ['alpha']);
    const collision = path.join(destination, 'alpha');
    mkdirSync(collision, { recursive: true });
    writeFileSync(path.join(collision, 'KEEP'), 'unowned desired-name collision\n');

    const result = spawnSync(process.execPath, [path.join(source, 'runtime', 'sylphx-skills.mjs'), 'sync', '--dest', destination], {
      cwd: source,
      encoding: 'utf8',
    });
    assert.notEqual(result.status, 0, result.stderr || result.stdout);
    assert.match(result.stderr, /refusing to adopt unrelated target entry/);
    assert.equal(readFileSync(path.join(collision, 'KEEP'), 'utf8'), 'unowned desired-name collision\n');
    assert.equal(existsSync(path.join(destination, '.sylphx-managed-generations')), false);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('sync repairs an owned managed-current control path replaced by a regular file', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-generation-current-drift-'));
  try {
    const { source, destination, fixtureCli } = createGenerationFixture(sandbox);
    const pointer = path.join(destination, '.sylphx-managed-current');
    rmSync(pointer, { force: true });
    writeFileSync(pointer, 'managed pointer drift\n');

    const result = spawnSync(process.execPath, [fixtureCli, 'sync', '--dest', destination, '--quiet'], {
      cwd: source,
      encoding: 'utf8',
    });
    assert.equal(result.status, 0, result.stderr || result.stdout);
    managedGenerationName(pointer);
    assert.match(readFileSync(path.join(destination, 'alpha', 'SKILL.md'), 'utf8'), /generation-one/);
    assert.deepEqual(targetGenerationTransactionNames(destination), []);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('sync restores a missing managed-current pointer from exactly one owned generation', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-generation-current-missing-'));
  try {
    const { source, destination, fixtureCli } = createGenerationFixture(sandbox);
    const pointer = path.join(destination, '.sylphx-managed-current');
    rmSync(pointer, { force: true });

    const result = spawnSync(process.execPath, [fixtureCli, 'sync', '--dest', destination, '--quiet'], {
      cwd: source,
      encoding: 'utf8',
    });
    assert.equal(result.status, 0, result.stderr || result.stdout);
    managedGenerationName(pointer);
    assert.match(readFileSync(path.join(destination, 'alpha', 'SKILL.md'), 'utf8'), /generation-one/);
    assert.deepEqual(targetGenerationTransactionNames(destination), []);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('sync repairs a valid-shaped managed-current pointer to a nonexistent generation', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-generation-current-dangling-'));
  try {
    const { source, destination, fixtureCli } = createGenerationFixture(sandbox);
    const pointer = path.join(destination, '.sylphx-managed-current');
    rmSync(pointer, { force: true });
    symlinkSync('.sylphx-managed-generations/generation-0000000000000000', pointer, 'dir');

    const result = spawnSync(process.execPath, [fixtureCli, 'sync', '--dest', destination, '--quiet'], {
      cwd: source,
      encoding: 'utf8',
    });
    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.notEqual(managedGenerationName(pointer), 'generation-0000000000000000');
    assert.match(readFileSync(path.join(destination, 'alpha', 'SKILL.md'), 'utf8'), /generation-one/);
    assert.deepEqual(targetGenerationTransactionNames(destination), []);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('sync and status accept only exact absolute forms of managed symlink targets', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-generation-absolute-targets-'));
  try {
    const { source, destination, fixtureCli } = createGenerationFixture(sandbox);
    const pointer = path.join(destination, '.sylphx-managed-current');
    const manifest = path.join(destination, '.sylphx-skills.json');
    const packageLink = path.join(destination, 'alpha');
    replaceManagedLinkWithAbsoluteTarget(pointer, 'dir');
    replaceManagedLinkWithAbsoluteTarget(manifest, 'file');
    replaceManagedLinkWithAbsoluteTarget(packageLink, 'dir');

    let result = spawnSync(process.execPath, [fixtureCli, 'status', '--dest', destination, '--json'], {
      cwd: source,
      encoding: 'utf8',
    });
    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.equal(JSON.parse(result.stdout).targets[0].current, true);

    result = spawnSync(process.execPath, [fixtureCli, 'sync', '--dest', destination, '--quiet'], {
      cwd: source,
      encoding: 'utf8',
    });
    assert.equal(result.status, 0, result.stderr || result.stdout);
    managedGenerationName(pointer);
    assert.deepEqual(targetGenerationTransactionNames(destination), []);

    writeFixtureCatalog(source, ['beta']);
    result = spawnSync(process.execPath, [fixtureCli, 'sync', '--dest', destination, '--quiet'], {
      cwd: source,
      encoding: 'utf8',
    });
    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.equal(existsSync(packageLink), false, 'an exact absolute managed link must be removable after catalog retirement');
    assert.deepEqual(targetGenerationTransactionNames(destination), []);

    const betaLink = path.join(destination, 'beta');
    const outside = path.join(sandbox, 'outside-beta');
    mkdirSync(outside);
    writeFileSync(path.join(outside, 'KEEP'), 'unrelated user data\n');
    rmSync(betaLink, { force: true });
    symlinkSync(outside, betaLink, 'dir');
    result = spawnSync(process.execPath, [fixtureCli, 'status', '--dest', destination, '--json'], {
      cwd: source,
      encoding: 'utf8',
    });
    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.equal(JSON.parse(result.stdout).targets[0].current, false);
    result = spawnSync(process.execPath, [fixtureCli, 'sync', '--dest', destination, '--quiet'], {
      cwd: source,
      encoding: 'utf8',
    });
    assert.equal(result.status, 0, result.stderr || result.stdout);
    result = spawnSync(process.execPath, [fixtureCli, 'status', '--dest', destination, '--json'], {
      cwd: source,
      encoding: 'utf8',
    });
    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.equal(JSON.parse(result.stdout).targets[0].current, true);
    assert.equal(readFileSync(path.join(outside, 'KEEP'), 'utf8'), 'unrelated user data\n');
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('clear uses the owned internal generation after projected-manifest loss', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-generation-clear-fallback-'));
  try {
    const { destination, fixtureCli } = createGenerationFixture(sandbox);
    const unrelated = path.join(destination, 'third-party', 'KEEP');
    mkdirSync(path.dirname(unrelated), { recursive: true });
    writeFileSync(unrelated, 'user-owned\n');
    rmSync(path.join(destination, '.sylphx-skills.json'), { force: true });
    rmSync(path.join(destination, '.sylphx-managed-current'), { force: true });

    const result = spawnSync(process.execPath, [fixtureCli, 'clear', '--dest', destination, '--quiet'], {
      cwd: path.dirname(path.dirname(fixtureCli)),
      encoding: 'utf8',
    });
    assert.equal(result.status, 0, result.stderr || result.stdout);
    for (const name of ['alpha', 'beta', '.sylphx-skills.json', '.sylphx-managed-current', '.sylphx-managed-generations']) {
      assert.equal(existsSync(path.join(destination, name)), false, `${name} should be cleared`);
    }
    assert.equal(readFileSync(unrelated, 'utf8'), 'user-owned\n');
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('clear removes owned links after a valid-shaped managed-current pointer becomes dangling', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-generation-clear-dangling-'));
  try {
    const { destination, fixtureCli } = createGenerationFixture(sandbox);
    const pointer = path.join(destination, '.sylphx-managed-current');
    rmSync(pointer, { force: true });
    symlinkSync('.sylphx-managed-generations/generation-0000000000000000', pointer, 'dir');

    const result = spawnSync(process.execPath, [fixtureCli, 'clear', '--dest', destination, '--quiet'], {
      cwd: path.dirname(path.dirname(fixtureCli)),
      encoding: 'utf8',
    });
    assert.equal(result.status, 0, result.stderr || result.stdout);
    for (const name of ['alpha', 'beta', '.sylphx-skills.json', '.sylphx-managed-current', '.sylphx-managed-generations']) {
      assert.equal(existsSync(path.join(destination, name)), false, `${name} should be cleared`);
    }
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('clear ignores a spoofed projected manifest when an owned generation proves the deletion boundary', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-generation-clear-spoof-'));
  try {
    const { destination, fixtureCli } = createGenerationFixture(sandbox);
    rmSync(path.join(destination, '.sylphx-managed-current'), { force: true });
    rmSync(path.join(destination, '.sylphx-skills.json'), { force: true });
    const replacedOwnedName = path.join(destination, 'alpha', 'KEEP');
    rmSync(path.dirname(replacedOwnedName), { force: true });
    mkdirSync(path.dirname(replacedOwnedName));
    writeFileSync(replacedOwnedName, 'unrelated replacement\n');
    const victim = path.join(destination, 'victim', 'KEEP');
    mkdirSync(path.dirname(victim), { recursive: true });
    writeFileSync(victim, 'unrelated user data\n');
    writeFileSync(path.join(destination, '.sylphx-skills.json'), `${JSON.stringify({
      schemaVersion: 1,
      owner: 'SylphxAI/skills',
      skills: ['victim'],
    })}\n`);

    const result = spawnSync(process.execPath, [fixtureCli, 'clear', '--dest', destination, '--quiet'], {
      cwd: path.dirname(path.dirname(fixtureCli)),
      encoding: 'utf8',
    });
    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.equal(readFileSync(victim, 'utf8'), 'unrelated user data\n');
    assert.equal(readFileSync(replacedOwnedName, 'utf8'), 'unrelated replacement\n');
    assert.equal(existsSync(path.join(destination, '.sylphx-managed-generations')), false);
    assert.equal(existsSync(path.join(destination, 'beta')), false);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('target generation rejects a concurrent writer without creating multiple journals', async () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-generation-concurrent-'));
  const holdReady = path.join(sandbox, 'target-generation-hold-ready');
  const holdRelease = path.join(sandbox, 'target-generation-hold-release');
  let first = null;
  try {
    const { source, destination, fixtureCli } = createGenerationFixture(sandbox);
    writeFixtureSkill(source, 'alpha', 'generation-two');
    writeFixtureCatalog(source, ['alpha', 'beta']);
    const environment = {
      ...process.env,
      NODE_ENV: 'test',
      SYLPHX_SKILLS_TEST_HOLD_AT: 'before-switch',
      SYLPHX_SKILLS_TEST_HOLD_READY: holdReady,
      SYLPHX_SKILLS_TEST_HOLD_RELEASE: holdRelease,
    };
    first = spawn(process.execPath, [fixtureCli, 'sync', '--dest', destination, '--quiet'], {
      cwd: source,
      env: environment,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let firstError = '';
    first.stderr.on('data', (chunk) => { firstError += chunk; });
    const firstExit = new Promise((resolve) => first.once('exit', resolve));
    const waiter = new Int32Array(new SharedArrayBuffer(4));
    for (let attempt = 0; attempt < 250 && !existsSync(holdReady); attempt += 1) Atomics.wait(waiter, 0, 0, 20);
    assert.equal(existsSync(holdReady), true, 'first writer did not reach the held switch boundary');
    const lock = path.join(path.dirname(destination), `.${path.basename(destination)}.sylphx-generation-lock`);
    assert.equal(existsSync(lock), true, 'first writer did not acquire the target lock');
    const liveLock = JSON.parse(readFileSync(lock, 'utf8'));
    liveLock.createdAt = 1;
    writeFileSync(lock, `${JSON.stringify(liveLock)}\n`);

    const second = spawnSync(process.execPath, [fixtureCli, 'sync', '--dest', destination, '--quiet'], {
      cwd: source,
      encoding: 'utf8',
      timeout: 5_000,
    });
    writeFileSync(holdRelease, 'release\n');
    assert.notEqual(second.status, 0, second.stderr || second.stdout);
    assert.match(second.stderr, /target generation is busy/);
    const firstCode = await firstExit;
    assert.equal(firstCode, 0, firstError);
    assert.deepEqual(targetGenerationTransactionNames(destination), []);
    assert.equal(existsSync(lock), false);
    assert.match(readFileSync(path.join(destination, 'alpha', 'SKILL.md'), 'utf8'), /generation-two/);
  } finally {
    if (first?.exitCode === null) {
      writeFileSync(holdRelease, 'release\n');
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 100);
      if (first.exitCode === null) first.kill('SIGTERM');
    }
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('two contenders CAS-reclaim one expired lock without overlapping target writers', async () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-generation-stale-lock-'));
  try {
    const { source, destination, fixtureCli } = createGenerationFixture(sandbox);
    writeFixtureSkill(source, 'alpha', 'generation-two');
    writeFixtureCatalog(source, ['alpha', 'beta']);
    const lock = path.join(path.dirname(destination), `.${path.basename(destination)}.sylphx-generation-lock`);
    writeFileSync(lock, `${JSON.stringify({
      schemaVersion: 1,
      owner: 'SylphxAI/skills',
      target: path.basename(destination),
      pid: process.pid,
      createdAt: Date.now() - (11 * 60 * 1_000),
      processStartIdentity: 'expired process identity fixture',
      token: 'a'.repeat(32),
    })}\n`);
    const environment = {
      ...process.env,
      NODE_ENV: 'test',
      SYLPHX_SKILLS_TEST_HOLD_AT: 'before-switch',
      SYLPHX_SKILLS_TEST_HOLD_MS: '500',
    };
    const start = () => {
      const child = spawn(process.execPath, [fixtureCli, 'sync', '--dest', destination, '--quiet'], {
        cwd: source,
        env: environment,
        stdio: ['ignore', 'pipe', 'pipe'],
      });
      let stderr = '';
      child.stderr.on('data', (chunk) => { stderr += chunk; });
      return new Promise((resolve) => child.once('exit', (code) => resolve({ code, stderr })));
    };
    const results = await Promise.all([start(), start()]);
    assert.equal(results.filter((result) => result.code === 0).length, 1, JSON.stringify(results));
    assert.match(results.find((result) => result.code !== 0).stderr, /target generation is busy/);
    assert.equal(existsSync(lock), false);
    assert.equal(existsSync(`${lock}-reclaiming`), false);
    assert.deepEqual(targetGenerationTransactionNames(destination), []);
    assert.match(readFileSync(path.join(destination, 'alpha', 'SKILL.md'), 'utf8'), /generation-two/);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('target generation never moves a late unrelated write during the managed pointer switch', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-generation-late-write-'));
  try {
    const { source, destination, fixtureCli } = createGenerationFixture(sandbox);
    writeFixtureSkill(source, 'alpha', 'generation-two');
    writeFixtureCatalog(source, ['alpha', 'beta']);
    let result = spawnSync(process.execPath, [fixtureCli, 'sync', '--dest', destination, '--quiet'], {
      cwd: source,
      encoding: 'utf8',
      env: { ...process.env, NODE_ENV: 'test', SYLPHX_SKILLS_TEST_LATE_UNOWNED_WRITE: '1' },
    });
    assert.equal(result.status, 0, result.stderr || result.stdout);
    const lateFile = path.join(destination, 'third-party-late-write', 'KEEP');
    assert.equal(readFileSync(lateFile, 'utf8'), 'late user-owned write\n');
    assert.match(readFileSync(path.join(destination, 'alpha', 'SKILL.md'), 'utf8'), /generation-two/);
    assert.deepEqual(targetGenerationTransactionNames(destination), []);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('an unrelated open file descriptor remains live across the managed generation switch', async () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-generation-open-fd-'));
  let descriptor;
  let childExit;
  try {
    const { source, destination, fixtureCli } = createGenerationFixture(sandbox);
    const unrelated = path.join(destination, 'third-party-open-fd');
    mkdirSync(unrelated);
    const unrelatedFile = path.join(unrelated, 'KEEP');
    writeFileSync(unrelatedFile, 'before\n');
    descriptor = openSync(unrelatedFile, 'a');
    const oldPointer = readlinkSync(path.join(destination, '.sylphx-managed-current'));
    writeFixtureSkill(source, 'alpha', 'generation-two');
    writeFixtureCatalog(source, ['alpha', 'beta']);
    const child = spawn(process.execPath, [fixtureCli, 'sync', '--dest', destination, '--quiet'], {
      cwd: source,
      env: {
        ...process.env,
        NODE_ENV: 'test',
        SYLPHX_SKILLS_TEST_HOLD_AT: 'after-switch',
        SYLPHX_SKILLS_TEST_HOLD_MS: '1000',
      },
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let stderr = '';
    child.stderr.on('data', (chunk) => { stderr += chunk; });
    childExit = new Promise((resolve) => child.once('exit', resolve));
    const pointer = path.join(destination, '.sylphx-managed-current');
    let observedPointer = oldPointer;
    for (let attempt = 0; attempt < 1_000 && observedPointer === oldPointer; attempt += 1) {
      try {
        observedPointer = readlinkSync(pointer);
      } catch (error) {
        if (error.code !== 'ENOENT') throw error;
      }
      if (observedPointer === oldPointer) await new Promise((resolve) => setTimeout(resolve, 20));
    }
    assert.notEqual(observedPointer, oldPointer, 'managed pointer did not switch');
    writeSync(descriptor, 'after\n');
    closeSync(descriptor);
    descriptor = undefined;
    assert.equal(await childExit, 0, stderr);
    childExit = undefined;
    assert.equal(readFileSync(unrelatedFile, 'utf8'), 'before\nafter\n');
    assert.match(readFileSync(path.join(destination, 'alpha', 'SKILL.md'), 'utf8'), /generation-two/);
  } finally {
    if (descriptor !== undefined) closeSync(descriptor);
    if (childExit) await childExit;
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('scheduler supports one configurable interval across macOS, Linux, and Windows', () => {
  assert.equal(parseIntervalMinutes([]), 10);
  assert.equal(parseIntervalMinutes(['--interval', '5m']), 5);
  assert.equal(parseIntervalMinutes(['--interval', '2h']), 120);
  assert.equal(parseIntervalMinutes(['--interval', '30']), 30);
  assert.throws(() => parseIntervalMinutes(['--interval', '10s']), /whole minutes/);

  const options = {
    home: '/home/sylphx',
    nodePath: '/runtime/node',
    reconcilerPath: '/home/sylphx/.sylphx-skills/reconcile.mjs',
    pathEnv: '/usr/local/bin:/usr/bin:/bin',
    intervalMinutes: 10,
  };
  const mac = schedulerDefinition({ ...options, platform: 'darwin' });
  const linux = schedulerDefinition({ ...options, platform: 'linux' });
  const windows = schedulerDefinition({ ...options, platform: 'win32' });
  assert.equal(mac.kind, 'launchd');
  assert.match(mac.files[0].contents, /<key>StartInterval<\/key><integer>600<\/integer>/);
  assert.equal(linux.kind, 'systemd-user');
  assert.match(linux.files[1].contents, /OnUnitActiveSec=10min/);
  assert.equal(windows.kind, 'windows-task-scheduler');
  assert.deepEqual(windows.activate[0][1].slice(-3), ['/MO', '10', '/F']);
});

test('scheduler status rejects inert Linux timer files when the user manager is unavailable', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-scheduler-status-'));
  try {
    const options = {
      platform: 'linux',
      home: sandbox,
      nodePath: '/runtime/node',
      reconcilerPath: path.join(sandbox, '.sylphx-skills', 'reconcile.mjs'),
      pathEnv: '/usr/local/bin:/usr/bin:/bin',
      intervalMinutes: 10,
    };
    const definition = schedulerDefinition(options);
    for (const file of definition.files) {
      mkdirSync(path.dirname(file.path), { recursive: true });
      writeFileSync(file.path, file.contents);
    }
    const unavailable = schedulerStatus(options, {
      run(_command, args) {
        if (args.includes('is-enabled')) return { status: 0, stdout: 'enabled\n', stderr: '' };
        return { status: 1, stdout: 'inactive\n', stderr: 'Failed to connect to bus: No medium found\n' };
      },
    });
    assert.equal(unavailable.configured, true);
    assert.equal(unavailable.active, false);
    assert.equal(unavailable.evidence, 'systemd-user-timer-inactive');
    assert.match(unavailable.error, /No medium found/);

    const live = schedulerStatus(options, {
      run(_command, args) {
        return args.includes('is-enabled')
          ? { status: 0, stdout: 'enabled\n', stderr: '' }
          : { status: 0, stdout: 'active\n', stderr: '' };
      },
    });
    assert.equal(live.configured, true);
    assert.equal(live.active, true);
    assert.equal(live.error, null);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('reconciler applies only immutable promoted release tags, honors TTL, and fences concurrent scheduler ticks', async () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-reconcile-'));
  const remote = path.join(sandbox, 'source');
  const stateDirectory = path.join(sandbox, 'state');
  const codexHome = path.join(sandbox, 'codex');
  const claudeHome = path.join(sandbox, 'claude');
  const grokHome = path.join(sandbox, 'grok');
  try {
    mkdirSync(path.join(remote, 'runtime'), { recursive: true });
    git(remote, ['init', '--initial-branch=main']);
    const fixtureCli = `import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';\nimport path from 'node:path';\nconst args = process.argv.slice(2);\nconst agentIndex = args.indexOf('--agent');\nconst agents = agentIndex >= 0 ? args[agentIndex + 1].split(',') : ['codex', 'claude', 'grok'];\nconst homes = { codex: process.env.CODEX_HOME, claude: process.env.CLAUDE_CONFIG_DIR, grok: process.env.GROK_HOME };\nif (args[0] === 'status') {\n  const targets = agents.map((runtime) => {\n    const marker = path.join(homes[runtime], 'applied-sha.txt');\n    return { runtime, current: existsSync(marker) && readFileSync(marker, 'utf8').trim() === process.env.SYLPHX_SKILLS_COMMIT_SHA };\n  });\n  console.log(JSON.stringify({ command: 'status', targets }));\n} else {\n  for (const runtime of agents) {\n    mkdirSync(homes[runtime], { recursive: true });\n    writeFileSync(path.join(homes[runtime], 'applied-sha.txt'), process.env.SYLPHX_SKILLS_COMMIT_SHA + '\\n');\n  }\n}\n`;
    writeFileSync(path.join(remote, 'runtime', 'sylphx-skills.mjs'), fixtureCli);
    cpSync(path.join(root, 'runtime', 'reconcile.mjs'), path.join(remote, 'runtime', 'reconcile.mjs'));
    writeFileSync(path.join(remote, 'content.txt'), 'one\n');
    writeFileSync(path.join(remote, 'catalog.json'), `${JSON.stringify(fixtureCatalogFile([]), null, 2)}\n`);
    const firstSha = commit(remote, 'first');
    const firstRelease = promoteFixtureRelease(remote, '7.0.0', firstSha);

    mkdirSync(stateDirectory, { recursive: true });
    const config = {
      schemaVersion: 2,
      owner: 'SylphxAI/skills',
      enabled: true,
      mode: 'interval-scheduler',
      channel: 'release-tag',
      tagPrefix: 'skills-v',
      remote,
      branch: 'main',
      repository: path.join(stateDirectory, 'repository'),
      reconcilerPath: path.join(stateDirectory, 'reconcile.mjs'),
      nodePath: process.execPath,
      pathEnv: process.env.PATH,
      agents: ['codex', 'claude', 'grok'],
      homes: { codexHome, claudeHome, grokHome },
    };
    writeFileSync(path.join(stateDirectory, 'config.json'), `${JSON.stringify(config, null, 2)}\n`);
    cpSync(path.join(root, 'runtime', 'reconcile.mjs'), config.reconcilerPath);

    const crlfCheckoutRun = (command, args, options) => {
      const clone = command === 'git' && args[0] === 'clone';
      const result = spawnSync(command, clone ? ['-c', 'core.autocrlf=true', ...args] : args, {
        encoding: 'utf8',
        ...options,
      });
      if (clone && result.status === 0) git(config.repository, ['config', 'core.autocrlf', 'true']);
      return result;
    };
    const first = reconcile({ stateDirectory, force: true, strict: true, now: 1_000, run: crlfCheckoutRun });
    assert.equal(first.status, 'updated');
    assert.equal(first.appliedSha, firstRelease);
    assert.equal(first.appliedTag, 'skills-v7.0.0');
    assert.equal(readFileSync(path.join(codexHome, 'applied-sha.txt'), 'utf8').trim(), firstRelease);
    assert.equal(readFileSync(path.join(config.repository, 'content.txt'), 'utf8'), 'one\r\n');
    assert.equal(
      JSON.parse(readFileSync(path.join(config.repository, 'promotion.json'), 'utf8')).sourceRevision,
      firstSha,
      'the applied candidate must carry the promoted main revision in its manifest',
    );

    let remoteChecks = 0;
    const countingRun = (command, args, options) => {
      if (command === 'git' && args.includes('ls-remote')) remoteChecks += 1;
      return spawnSync(command, args, { encoding: 'utf8', ...options });
    };
    const fresh = reconcile({ stateDirectory, maxAgeMs: 10_000, now: 5_000, run: countingRun });
    assert.equal(fresh.status, 'fresh');
    assert.equal(remoteChecks, 0);

    writeFileSync(path.join(codexHome, 'applied-sha.txt'), 'locally drifted\n');
    const repaired = reconcile({ stateDirectory, maxAgeMs: 10_000, strict: true, now: 6_000, run: countingRun });
    assert.equal(repaired.status, 'updated');
    assert.equal(repaired.repaired, true);
    assert.equal(repaired.appliedSha, firstRelease);
    assert.equal(readFileSync(path.join(codexHome, 'applied-sha.txt'), 'utf8').trim(), firstRelease);
    assert.equal(remoteChecks, 0);

    writeFileSync(path.join(codexHome, 'applied-sha.txt'), 'offline local drift\n');
    const offlineRun = (command, args, options) => {
      if (command === 'git' && args.includes('ls-remote')) {
        return { status: 1, stdout: '', stderr: 'offline fixture' };
      }
      return spawnSync(command, args, { encoding: 'utf8', ...options });
    };
    const offlineRepaired = reconcile({ stateDirectory, force: true, now: 7_000, run: offlineRun });
    assert.equal(offlineRepaired.status, 'unavailable');
    assert.equal(offlineRepaired.repaired, true);
    assert.equal(readFileSync(path.join(codexHome, 'applied-sha.txt'), 'utf8').trim(), firstRelease);

    assert.equal(git(config.repository, ['status', '--porcelain', '--untracked-files=all']), '');
    writeFileSync(path.join(remote, '.gitattributes'), '* text=auto eol=lf\n');
    const attributesSha = commit(remote, 'bind exact checkout line endings');
    const attributesRelease = promoteFixtureRelease(remote, '7.0.1', attributesSha);
    const interrupted = spawnSync(process.execPath, [config.reconcilerPath, '--force'], {
      cwd: root,
      encoding: 'utf8',
      env: {
        ...process.env,
        NODE_ENV: 'test',
        SYLPHX_SKILLS_STATE_DIR: stateDirectory,
        SYLPHX_SKILLS_TEST_CRASH_AFTER_MATERIALIZED_FILES: '2',
      },
    });
    assert.equal(interrupted.status, 86, interrupted.stderr || interrupted.stdout);
    const materializationStage = path.join(stateDirectory, '.repository.sylphx-materialize');
    assert.equal(existsSync(materializationStage), true, 'interrupted materialization must retain its owned journal');
    assert.notEqual(
      git(config.repository, ['status', '--porcelain', '--untracked-files=all']),
      '',
      'the fixture must interrupt after canonical bytes make the worktree look dirty',
    );

    const attributesUpdate = reconcile({ stateDirectory, force: true, strict: true, now: 16_000 });
    assert.equal(attributesUpdate.status, 'updated');
    assert.equal(attributesUpdate.appliedSha, attributesRelease);
    assert.equal(attributesUpdate.appliedTag, 'skills-v7.0.1');
    assert.equal(existsSync(materializationStage), false, 'successful recovery must remove the owned journal');
    assert.equal(git(config.repository, ['status', '--porcelain', '--untracked-files=all']), '');
    assert.equal(
      readFileSync(path.join(config.repository, 'content.txt'), 'utf8'),
      'one\n',
      'candidate application must rematerialize unchanged tracked files under new attributes',
    );

    writeFileSync(path.join(remote, 'content.txt'), 'temporary index recovery\n');
    const temporaryIndexSha = commit(remote, 'exercise temporary index recovery');
    const temporaryIndexRelease = promoteFixtureRelease(remote, '7.0.2', temporaryIndexSha);
    const interruptedIndex = spawnSync(process.execPath, [config.reconcilerPath, '--force'], {
      cwd: root,
      encoding: 'utf8',
      env: {
        ...process.env,
        NODE_ENV: 'test',
        SYLPHX_SKILLS_STATE_DIR: stateDirectory,
        SYLPHX_SKILLS_TEST_CRASH_AFTER_TEMP_INDEX: '1',
      },
    });
    assert.equal(interruptedIndex.status, 87, interruptedIndex.stderr || interruptedIndex.stdout);
    assert.equal(existsSync(path.join(materializationStage, 'candidate.index.lock')), true);
    const recoveredIndex = reconcile({ stateDirectory, force: true, strict: true, now: 16_125 });
    assert.equal(recoveredIndex.status, 'updated');
    assert.equal(recoveredIndex.appliedSha, temporaryIndexRelease);
    assert.equal(recoveredIndex.appliedTag, 'skills-v7.0.2');
    assert.equal(existsSync(materializationStage), false);
    assert.equal(git(config.repository, ['status', '--porcelain', '--untracked-files=all']), '');

    writeFileSync(path.join(remote, 'content.txt'), 'invalid candidate\r\n');
    const invalidBlob = git(remote, ['hash-object', '-w', '--no-filters', 'content.txt']);
    git(remote, ['update-index', '--cacheinfo', `100644,${invalidBlob},content.txt`]);
    git(remote, ['-c', 'user.name=Sylphx Test', '-c', 'user.email=test@sylphx.invalid', 'commit', '-m', 'noncanonical candidate']);
    const invalidSha = git(remote, ['rev-parse', 'HEAD']);
    annotatedTag(remote, 'skills-v7.0.3', 'noncanonical promoted candidate', invalidSha);
    const rejected = reconcile({ stateDirectory, force: true, now: 16_250 });
    assert.equal(rejected.status, 'unavailable');
    assert.match(rejected.error, /do not normalize to the committed tree/);
    assert.equal(git(config.repository, ['rev-parse', 'HEAD']), invalidSha);
    assert.equal(git(config.repository, ['status', '--porcelain', '--untracked-files=all']), '');
    assert.equal(existsSync(materializationStage), false, 'deterministically rejected candidate must not trap recovery');

    writeFileSync(path.join(remote, 'content.txt'), 'fixed candidate\n');
    const fixedSha = commit(remote, 'fix candidate normalization');
    const fixedRelease = promoteFixtureRelease(remote, '7.0.4', fixedSha);
    const fixed = reconcile({ stateDirectory, force: true, strict: true, now: 16_500 });
    assert.equal(fixed.status, 'updated');
    assert.equal(fixed.appliedSha, fixedRelease);
    assert.equal(fixed.appliedTag, 'skills-v7.0.4');
    assert.equal(git(config.repository, ['status', '--porcelain', '--untracked-files=all']), '');

    writeFileSync(path.join(remote, 'content.txt'), 'two\n');
    const secondSha = commit(remote, 'second');
    const secondRelease = promoteFixtureRelease(remote, '7.0.5', secondSha);
    const second = reconcile({ stateDirectory, force: true, maxAgeMs: 10_000, strict: true, now: 17_000 });
    assert.equal(second.status, 'updated');
    assert.equal(second.appliedSha, secondRelease);
    assert.equal(readFileSync(path.join(codexHome, 'applied-sha.txt'), 'utf8').trim(), secondRelease);

    const held = spawn(process.execPath, [config.reconcilerPath, '--force'], {
      cwd: root,
      env: {
        ...process.env,
        NODE_ENV: 'test',
        SYLPHX_SKILLS_STATE_DIR: stateDirectory,
        SYLPHX_SKILLS_TEST_HOLD_RECONCILE_LOCK_MS: '1000',
      },
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let heldStderr = '';
    held.stderr.on('data', (chunk) => { heldStderr += chunk; });
    const heldExit = new Promise((resolve) => held.once('exit', resolve));
    const lockFile = path.join(stateDirectory, 'reconcile.lock');
    const waiter = new Int32Array(new SharedArrayBuffer(4));
    for (let attempt = 0; attempt < 250 && !existsSync(lockFile); attempt += 1) Atomics.wait(waiter, 0, 0, 20);
    assert.equal(existsSync(lockFile), true, 'first scheduler tick did not acquire its lock');
    const liveLock = JSON.parse(readFileSync(lockFile, 'utf8'));
    liveLock.createdAt = 1;
    writeFileSync(lockFile, `${JSON.stringify(liveLock)}\n`);

    const overlapping = spawnSync(process.execPath, [config.reconcilerPath, '--force'], {
      cwd: root,
      encoding: 'utf8',
      env: { ...process.env, SYLPHX_SKILLS_STATE_DIR: stateDirectory },
    });
    assert.equal(overlapping.status, 0, overlapping.stderr || overlapping.stdout);
    assert.equal(JSON.parse(overlapping.stdout).status, 'busy');
    assert.equal(await heldExit, 0, heldStderr);
    assert.equal(existsSync(lockFile), false);

    writeFileSync(lockFile, `${JSON.stringify({
      schemaVersion: 1,
      owner: 'SylphxAI/skills',
      pid: process.pid,
      createdAt: 1,
      processStartIdentity: 'reused pid identity fixture',
      token: 'b'.repeat(32),
    })}\n`);
    const reclaimed = reconcile({ stateDirectory, force: true, strict: true, now: 17_500, run: countingRun });
    assert.notEqual(reclaimed.status, 'busy');
    assert.equal(existsSync(lockFile), false);

    mkdirSync(path.join(stateDirectory, 'reconcile.lock'));
    const busy = reconcile({ stateDirectory, force: true, now: 18_000, run: countingRun });
    assert.equal(busy.status, 'busy');
    rmSync(path.join(stateDirectory, 'reconcile.lock'), { recursive: true, force: true });

    const unavailableCommands = [];
    const unavailable = reconcile({
      stateDirectory,
      maxAgeMs: 10_000,
      now: 28_000,
      run: (command, args, options) => {
        unavailableCommands.push([command, ...args]);
        if (command === 'git' && args.includes('ls-remote')) {
          return { status: 1, stdout: '', stderr: 'offline' };
        }
        return spawnSync(command, args, { encoding: 'utf8', ...options });
      },
    });
    assert.equal(unavailable.status, 'unavailable');
    assert.equal(
      unavailableCommands.some(([command, ...args]) => command === 'git' && args.includes('rev-parse')),
      true,
      'a due tick must verify its exact local source before checking the remote',
    );
    assert.equal(
      unavailableCommands.filter(([command, ...args]) => command === 'git' && args.includes('ls-remote')).length,
      1,
    );
    const backoff = reconcile({ stateDirectory, maxAgeMs: 10_000, now: 29_000, run: countingRun });
    assert.equal(backoff.status, 'backoff');

    config.enabled = false;
    writeFileSync(path.join(stateDirectory, 'config.json'), `${JSON.stringify(config, null, 2)}\n`);
    writeFileSync(path.join(codexHome, 'applied-sha.txt'), 'disabled scheduler fence\n');
    const disabledTick = spawnSync(process.execPath, [config.reconcilerPath, '--force'], {
      cwd: root,
      encoding: 'utf8',
      env: { ...process.env, SYLPHX_SKILLS_STATE_DIR: stateDirectory },
    });
    assert.equal(disabledTick.status, 0, disabledTick.stderr || disabledTick.stdout);
    assert.equal(JSON.parse(disabledTick.stdout).status, 'disabled');
    assert.equal(
      readFileSync(path.join(codexHome, 'applied-sha.txt'), 'utf8').trim(),
      'disabled scheduler fence',
      'a scheduled entry must not perform target effects before enable promotion commits',
    );
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

function promotionFixture(sandbox) {
  const remote = path.join(sandbox, 'source');
  const stateDirectory = path.join(sandbox, 'state');
  const codexHome = path.join(sandbox, 'codex');
  const claudeHome = path.join(sandbox, 'claude');
  const grokHome = path.join(sandbox, 'grok');
  mkdirSync(path.join(remote, 'runtime'), { recursive: true });
  git(remote, ['init', '--initial-branch=main']);
  const fixtureCli = `import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';\nimport path from 'node:path';\nconst args = process.argv.slice(2);\nconst agentIndex = args.indexOf('--agent');\nconst agents = agentIndex >= 0 ? args[agentIndex + 1].split(',') : ['codex', 'claude', 'grok'];\nconst homes = { codex: process.env.CODEX_HOME, claude: process.env.CLAUDE_CONFIG_DIR, grok: process.env.GROK_HOME };\nif (args[0] === 'status') {\n  const targets = agents.map((runtime) => {\n    const marker = path.join(homes[runtime], 'applied-sha.txt');\n    return { runtime, current: existsSync(marker) && readFileSync(marker, 'utf8').trim() === process.env.SYLPHX_SKILLS_COMMIT_SHA };\n  });\n  console.log(JSON.stringify({ command: 'status', targets }));\n} else {\n  for (const runtime of agents) {\n    mkdirSync(homes[runtime], { recursive: true });\n    writeFileSync(path.join(homes[runtime], 'applied-sha.txt'), process.env.SYLPHX_SKILLS_COMMIT_SHA + '\\n');\n  }\n}\n`;
  writeFileSync(path.join(remote, 'runtime', 'sylphx-skills.mjs'), fixtureCli);
  cpSync(path.join(root, 'runtime', 'reconcile.mjs'), path.join(remote, 'runtime', 'reconcile.mjs'));
  writeFileSync(path.join(remote, 'content.txt'), 'one\n');
  writeFileSync(path.join(remote, 'catalog.json'), `${JSON.stringify(fixtureCatalogFile([]), null, 2)}\n`);
  const contentSha = commit(remote, 'content');
  mkdirSync(stateDirectory, { recursive: true });
  const config = {
    schemaVersion: 2,
    owner: 'SylphxAI/skills',
    enabled: true,
    mode: 'interval-scheduler',
    channel: 'release-tag',
    tagPrefix: 'skills-v',
    remote,
    branch: 'main',
    repository: path.join(stateDirectory, 'repository'),
    reconcilerPath: path.join(stateDirectory, 'reconcile.mjs'),
    nodePath: process.execPath,
    pathEnv: process.env.PATH,
    agents: ['codex', 'claude', 'grok'],
    homes: { codexHome, claudeHome, grokHome },
  };
  writeFileSync(path.join(stateDirectory, 'config.json'), `${JSON.stringify(config, null, 2)}\n`);
  cpSync(path.join(root, 'runtime', 'reconcile.mjs'), config.reconcilerPath);
  return { remote, stateDirectory, config, contentSha, codexHome, claudeHome, grokHome };
}

test('promotion channel fails closed on lightweight tags, legacy configs, and invalid manifests', () => {
  // 1. A lightweight tag is never a promotion candidate.
  {
    const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-promo-lightweight-'));
    try {
      const { remote, stateDirectory, config, contentSha } = promotionFixture(sandbox);
      git(remote, ['tag', 'skills-v7.0.0', contentSha]);
      const result = reconcile({ stateDirectory, force: true });
      assert.equal(result.status, 'unavailable');
      assert.match(result.error, /not an annotated release tag/);
    } finally {
      rmSync(sandbox, { recursive: true, force: true });
    }
  }

  // 2. A legacy branch-following config is retired and never silently migrates.
  {
    const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-promo-legacy-'));
    try {
      const { remote, stateDirectory, config, contentSha } = promotionFixture(sandbox);
      const legacy = { ...config, schemaVersion: 1, branch: 'main' };
      delete legacy.channel;
      delete legacy.tagPrefix;
      delete legacy.requireVerifiedTag;
      writeFileSync(path.join(stateDirectory, 'config.json'), `${JSON.stringify(legacy, null, 2)}\n`);
      const result = reconcile({ stateDirectory, force: true });
      assert.equal(result.status, 'unconfigured');
      assert.match(result.error, /legacy branch-following auto-sync config .* retired/);
      assert.equal(existsSync(path.join(stateDirectory, 'repository')), false);
    } finally {
      rmSync(sandbox, { recursive: true, force: true });
    }
  }

  // 3. An annotated tag without a promotion manifest is refused before its
  //    repository-owned CLI runs.
  {
    const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-promo-manifest-'));
    try {
      const { remote, stateDirectory, config, contentSha } = promotionFixture(sandbox);
      annotatedTag(remote, 'skills-v7.0.0', 'unsigned release', contentSha);
      const result = reconcile({ stateDirectory, force: true });
      assert.equal(result.status, 'unavailable');
      assert.match(result.error, /invalid promotion manifest/);
    } finally {
      rmSync(sandbox, { recursive: true, force: true });
    }
  }

  // 4. A manifest whose catalog digest does not match the candidate tree is
  //    refused (transplanted or tampered manifest).
  {
    const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-promo-digest-'));
    try {
      const { remote, stateDirectory, config, contentSha } = promotionFixture(sandbox);
      const manifest = promotionManifest(remote, contentSha);
      manifest.catalogDigest = `sha256:${'0'.repeat(64)}`;
      writeFileSync(path.join(remote, 'promotion.json'), `${JSON.stringify(manifest, null, 2)}\n`);
      const manifestSha = commit(remote, 'tampered manifest');
      annotatedTag(remote, 'skills-v7.0.0', 'tampered', manifestSha);
      const result = reconcile({ stateDirectory, force: true });
      assert.equal(result.status, 'unavailable');
      assert.match(result.error, /catalog digest does not match the candidate tree/);
    } finally {
      rmSync(sandbox, { recursive: true, force: true });
    }
  }

  // 5. A manifest whose sourceRevision does not match the tag commit parent is
  //    refused.
  {
    const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-promo-source-'));
    try {
      const { remote, stateDirectory, config, contentSha } = promotionFixture(sandbox);
      writeFileSync(path.join(remote, 'content.txt'), 'another revision\n');
      const nextSha = commit(remote, 'next content');
      const manifest = promotionManifest(remote, contentSha);
      writeFileSync(path.join(remote, 'promotion.json'), `${JSON.stringify(manifest, null, 2)}\n`);
      const manifestSha = commit(remote, 'manifest over next content');
      annotatedTag(remote, 'skills-v7.0.0', 'wrong source', manifestSha);
      const result = reconcile({ stateDirectory, force: true });
      assert.equal(result.status, 'unavailable');
      assert.match(result.error, /sourceRevision does not match the tag commit parent/);
      assert.equal(result.appliedSha, undefined);
    } finally {
      rmSync(sandbox, { recursive: true, force: true });
    }
  }

  // 6. Requiring a verified tag fails closed when the tag is unsigned.
  {
    const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-promo-verified-'));
    try {
      const { remote, stateDirectory, config, contentSha } = promotionFixture(sandbox);
      const manifestSha = promoteFixtureRelease(remote, '7.0.0', contentSha);
      config.requireVerifiedTag = true;
      writeFileSync(path.join(stateDirectory, 'config.json'), `${JSON.stringify(config, null, 2)}\n`);
      const result = reconcile({ stateDirectory, force: true });
      assert.equal(result.status, 'unavailable');
      assert.match(result.error, /verify-tag .* failed/);
    } finally {
      rmSync(sandbox, { recursive: true, force: true });
    }
  }

  // 7. Applying an older promotion than the applied one is a regression and is
  //    refused even when the older tag is otherwise valid.
  {
    const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-promo-regression-'));
    try {
      const { remote, stateDirectory, config, contentSha } = promotionFixture(sandbox);
      const firstRelease = promoteFixtureRelease(remote, '7.1.0', contentSha);
      const first = reconcile({ stateDirectory, force: true });
      assert.equal(first.status, 'updated');
      assert.equal(first.appliedTag, 'skills-v7.1.0');
      git(remote, ['tag', '-d', 'skills-v7.1.0']);
      annotatedTag(remote, 'skills-v7.0.0', 'older release', contentSha);
      const result = reconcile({ stateDirectory, force: true });
      assert.equal(result.status, 'unavailable');
      assert.match(result.error, /promotion regression/);
    } finally {
      rmSync(sandbox, { recursive: true, force: true });
    }
  }
});

test('auto-sync enables a configurable scheduler, repairs exact-source drift, and removes legacy hooks', async () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-auto-sync-'));
  const source = path.join(sandbox, 'source');
  const managedHome = path.join(sandbox, 'home');
  const codexHome = path.join(managedHome, '.codex');
  const claudeHome = path.join(managedHome, '.claude');
  const grokHome = path.join(managedHome, '.grok');
  let lifecycleRelease;
  let enableExit;
  try {
    mkdirSync(source, { recursive: true });
    git(source, ['init', '--initial-branch=main']);
    cpSync(path.join(root, 'runtime'), path.join(source, 'runtime'), { recursive: true });
    mkdirSync(path.join(source, 'skills'));
    const fixtureSkillNames = [
      'author-skill',
      'verify-local-web-preview',
      'build-product',
    ];
    for (const name of fixtureSkillNames) {
      cpSync(path.join(root, 'skills', name), path.join(source, 'skills', name), { recursive: true });
    }
    const fixtureCatalog = {
      ...catalog,
      count: fixtureSkillNames.length,
      skills: catalog.skills.filter((skill) => fixtureSkillNames.includes(skill.name)),
    };
    writeFileSync(path.join(source, 'catalog.json'), `${JSON.stringify(fixtureCatalog, null, 2)}\n`);
    for (const entry of ['.gitattributes', 'package.json']) cpSync(path.join(root, entry), path.join(source, entry));
    const remoteReconciler = path.join(source, 'runtime', 'reconcile.mjs');
    writeFileSync(remoteReconciler, `${readFileSync(remoteReconciler, 'utf8')}\n// exact remote candidate fixture\n`);
    const sourceSha = commit(source, 'fixture source');
    const firstRelease = promoteFixtureRelease(source, '7.0.0', sourceSha);

    const legacyCommand = `'${process.execPath}' '${path.join(managedHome, '.sylphx-skills', 'reconcile.mjs')}' --quiet`;
    const legacyHooks = { UserPromptSubmit: [{ hooks: [{ type: 'command', command: legacyCommand }] }] };
    mkdirSync(claudeHome, { recursive: true });
    writeFileSync(path.join(claudeHome, 'settings.json'), `${JSON.stringify({ language: 'en', hooks: legacyHooks }, null, 2)}\n`);
    mkdirSync(path.join(grokHome, 'hooks'), { recursive: true });
    writeFileSync(path.join(grokHome, 'hooks', 'sylphx-skills.json'), `${JSON.stringify({ hooks: legacyHooks }, null, 2)}\n`);
    mkdirSync(path.join(managedHome, '.sylphx-skills'), { recursive: true });
    writeFileSync(path.join(managedHome, '.sylphx-skills', 'sync.sh'), 'legacy\n');
    const environment = {
      SYLPHX_SKILLS_HOME: managedHome,
      SYLPHX_SKILLS_REMOTE: pathToFileURL(source).href,
      CODEX_HOME: codexHome,
      CLAUDE_CONFIG_DIR: claudeHome,
      GROK_HOME: grokHome,
      SYLPHX_SKILLS_TEST_SKIP_SCHEDULER_ACTIVATION: '1',
      SYLPHX_SKILLS_TEST_PLATFORM: 'darwin',
    };

    const lifecycleReady = path.join(managedHome, '.sylphx-skills', '.test-enable-after-reconcile-ready');
    lifecycleRelease = path.join(managedHome, '.sylphx-skills', '.test-enable-after-reconcile-release');
    const enabling = spawn(process.execPath, [cli, 'auto-sync', 'enable', '--agent', 'codex,claude', '--interval', '7m', '--quiet'], {
      cwd: root,
      env: {
        ...process.env,
        ...environment,
        NODE_ENV: 'test',
        SYLPHX_SKILLS_TEST_HOLD_ENABLE_AFTER_RECONCILE_RELEASE: lifecycleRelease,
      },
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let enableStdout = '';
    let enableStderr = '';
    enabling.stdout.on('data', (chunk) => { enableStdout += chunk; });
    enabling.stderr.on('data', (chunk) => { enableStderr += chunk; });
    enableExit = new Promise((resolve) => enabling.once('exit', resolve));
    const waiter = new Int32Array(new SharedArrayBuffer(4));
    for (
      let attempt = 0;
      attempt < 3_000 && !existsSync(lifecycleReady) && enabling.exitCode === null;
      attempt += 1
    ) await new Promise((resolve) => setTimeout(resolve, 20));
    assert.equal(
      existsSync(lifecycleReady),
      true,
      `enable did not reach its post-reconcile lifecycle phase${enableStderr || enableStdout ? `: ${enableStderr || enableStdout}` : ''}`,
    );
    const busyDisableDuringEnable = spawnSync(process.execPath, [cli, 'auto-sync', 'disable', '--quiet'], {
      cwd: root,
      encoding: 'utf8',
      env: { ...process.env, ...environment },
    });
    assert.notEqual(busyDisableDuringEnable.status, 0);
    assert.match(busyDisableDuringEnable.stderr, /lifecycle is busy/);
    assert.equal(JSON.parse(readFileSync(path.join(managedHome, '.sylphx-skills', 'config.json'), 'utf8')).enabled, false);
    const tickBetweenEnablePhases = spawnSync(process.execPath, [
      path.join(managedHome, '.sylphx-skills', 'reconcile.mjs'),
      '--force',
    ], {
      cwd: root,
      encoding: 'utf8',
      env: { ...process.env, ...environment },
    });
    assert.equal(tickBetweenEnablePhases.status, 0, tickBetweenEnablePhases.stderr || tickBetweenEnablePhases.stdout);
    assert.equal(JSON.parse(tickBetweenEnablePhases.stdout).status, 'disabled');
    writeFileSync(lifecycleRelease, 'release\n');
    assert.equal(await enableExit, 0, enableStderr || enableStdout);
    enableExit = undefined;

    assert.equal(existsSync(path.join(managedHome, '.sylphx-skills', 'sync.sh')), false);
    assert.equal(
      readFileSync(path.join(managedHome, '.sylphx-skills', 'reconcile.mjs'), 'utf8'),
      readFileSync(remoteReconciler, 'utf8'),
      'scheduler adapter must remain sourced from the exact remote candidate applied during enable',
    );
    const installedManifest = path.join(codexHome, 'skills', '.sylphx-skills.json');
    assert.equal(existsSync(installedManifest), true, `installed paths: ${readdirSync(managedHome, { recursive: true }).join(', ')}`);
    assert.equal(readFileSync(installedManifest, 'utf8').includes(firstRelease), true);
    assert.equal(existsSync(path.join(grokHome, 'skills', '.sylphx-skills.json')), false);
    const status = JSON.parse(runWithEnvironment(['auto-sync', 'status', '--json'], environment).stdout);
    assert.equal(status.enabled, true);
    assert.equal(status.current, true);
    assert.equal(status.healthy, true);
    assert.equal(status.scheduler.active, true);
    assert.equal(status.source.managedHead, firstRelease);
    assert.equal(status.source.remoteHead, firstRelease);
    assert.equal(status.intervalMinutes, 7);
    assert.equal(status.mode, 'interval-scheduler');
    assert.deepEqual(status.agents, ['codex', 'claude']);
    const plist = path.join(managedHome, 'Library', 'LaunchAgents', 'ai.sylphx.skills-sync.plist');
    assert.match(readFileSync(plist, 'utf8'), /<key>StartInterval<\/key><integer>420<\/integer>/);
    assert.equal(Object.hasOwn(JSON.parse(readFileSync(path.join(claudeHome, 'settings.json'), 'utf8')), 'hooks'), false);
    assert.deepEqual(
      JSON.parse(readFileSync(path.join(grokHome, 'hooks', 'sylphx-skills.json'), 'utf8')).hooks,
      legacyHooks,
    );

    const driftedManifest = JSON.parse(readFileSync(installedManifest, 'utf8'));
    driftedManifest.catalogDigest = `sha256:${'0'.repeat(64)}`;
    driftedManifest.skills = [];
    writeFileSync(installedManifest, `${JSON.stringify(driftedManifest, null, 2)}\n`);
    const driftedSkill = path.join(codexHome, 'skills', 'author-skill', 'SKILL.md');
    writeFileSync(driftedSkill, `${readFileSync(driftedSkill, 'utf8')}\nlocal drift\n`);
    const repaired = spawnSync(process.execPath, [
      path.join(managedHome, '.sylphx-skills', 'reconcile.mjs'),
      '--force', '--strict',
    ], { encoding: 'utf8', env: { ...process.env, ...environment } });
    assert.equal(repaired.status, 0, repaired.stderr || repaired.stdout);
    const repairResult = JSON.parse(repaired.stdout);
    assert.equal(repairResult.status, 'updated');
    assert.equal(repairResult.repaired, true);
    assert.equal(repairResult.appliedSha, firstRelease);
    const repairedManifest = JSON.parse(readFileSync(installedManifest, 'utf8'));
    assert.notEqual(repairedManifest.catalogDigest, driftedManifest.catalogDigest);
    assert.deepEqual(repairedManifest.skills, fixtureCatalog.skills.map((skill) => skill.name));
    assert.equal(repairedManifest.sourceCommit, firstRelease);
    assert.equal(readFileSync(driftedSkill, 'utf8').includes('local drift'), false);

    rmSync(installedManifest, { force: true });
    writeFileSync(installedManifest, '{"owner":"invalid projection"}\n');
    const installedSkillLink = path.join(codexHome, 'skills', 'author-skill');
    rmSync(installedSkillLink, { recursive: true, force: true });
    mkdirSync(installedSkillLink);
    writeFileSync(path.join(installedSkillLink, 'SKILL.md'), 'managed link drift\n');
    const repairedLinks = spawnSync(process.execPath, [
      path.join(managedHome, '.sylphx-skills', 'reconcile.mjs'),
      '--force', '--strict',
    ], { encoding: 'utf8', env: { ...process.env, ...environment } });
    assert.equal(repairedLinks.status, 0, repairedLinks.stderr || repairedLinks.stdout);
    assert.equal(JSON.parse(repairedLinks.stdout).repaired, true);
    assert.equal(lstatSync(installedManifest).isSymbolicLink(), true);
    assert.equal(lstatSync(installedSkillLink).isSymbolicLink(), true);
    assert.equal(readFileSync(path.join(installedSkillLink, 'SKILL.md'), 'utf8').includes('managed link drift'), false);

    const managedCurrent = path.join(codexHome, 'skills', '.sylphx-managed-current');
    rmSync(managedCurrent, { force: true });
    writeFileSync(managedCurrent, 'managed current pointer drift\n');
    const repairedCurrent = spawnSync(process.execPath, [
      path.join(managedHome, '.sylphx-skills', 'reconcile.mjs'),
      '--force', '--strict',
    ], { encoding: 'utf8', env: { ...process.env, ...environment } });
    assert.equal(repairedCurrent.status, 0, repairedCurrent.stderr || repairedCurrent.stdout);
    assert.equal(JSON.parse(repairedCurrent.stdout).repaired, true);
    managedGenerationName(managedCurrent);
    assert.equal(JSON.parse(readFileSync(installedManifest, 'utf8')).sourceCommit, firstRelease);

    const residualSkill = path.join(codexHome, 'skills', '.sylphx-managed-current', 'residual-owned-skill');
    mkdirSync(residualSkill);
    writeFileSync(path.join(residualSkill, 'SKILL.md'), 'stale owned package\n');
    symlinkSync('.sylphx-managed-current/residual-owned-skill', path.join(codexHome, 'skills', 'residual-owned-skill'), 'dir');
    const repairedResidual = spawnSync(process.execPath, [
      path.join(managedHome, '.sylphx-skills', 'reconcile.mjs'),
      '--force', '--strict',
    ], { encoding: 'utf8', env: { ...process.env, ...environment } });
    assert.equal(repairedResidual.status, 0, repairedResidual.stderr || repairedResidual.stdout);
    assert.equal(JSON.parse(repairedResidual.stdout).repaired, true);
    assert.equal(existsSync(path.join(codexHome, 'skills', 'residual-owned-skill')), false);
    assert.equal(existsSync(residualSkill), false);

    const staleAuthoredFields = JSON.parse(readFileSync(installedManifest, 'utf8'));
    staleAuthoredFields.packageVersion = '0.0.0-stale';
    staleAuthoredFields.runtime = 'wrong-runtime';
    staleAuthoredFields.unexpected = 'stale field';
    writeFileSync(installedManifest, `${JSON.stringify(staleAuthoredFields, null, 2)}\n`);
    const repairedAuthoredFields = spawnSync(process.execPath, [
      path.join(managedHome, '.sylphx-skills', 'reconcile.mjs'),
      '--force', '--strict',
    ], { encoding: 'utf8', env: { ...process.env, ...environment } });
    assert.equal(repairedAuthoredFields.status, 0, repairedAuthoredFields.stderr || repairedAuthoredFields.stdout);
    assert.equal(JSON.parse(repairedAuthoredFields.stdout).repaired, true);
    const exactManifest = JSON.parse(readFileSync(installedManifest, 'utf8'));
    assert.equal(exactManifest.packageVersion, JSON.parse(readFileSync(path.join(source, 'package.json'), 'utf8')).version);
    assert.equal(exactManifest.runtime, 'codex');
    assert.equal(Object.hasOwn(exactManifest, 'unexpected'), false);

    const unmanaged = path.join(codexHome, 'skills', 'third-party-skill');
    mkdirSync(unmanaged, { recursive: true });
    writeFileSync(path.join(unmanaged, 'SKILL.md'), 'third party\n');

    const removedSkill = 'build-product';
    const removedFile = path.join(
      codexHome,
      'skills',
      'author-skill',
      'references',
      'industry-sources.md',
    );
    rmSync(path.join(source, 'skills', removedSkill), { recursive: true, force: true });
    rmSync(path.join(
      source,
      'skills',
      'author-skill',
      'references',
      'industry-sources.md',
    ));
    const addedSkill = 'sync-fixture-added';
    mkdirSync(path.join(source, 'skills', addedSkill), { recursive: true });
    const addedDescription = 'Validate exact package-set synchronization. Use for this runtime fixture only.';
    writeFileSync(path.join(source, 'skills', addedSkill, 'SKILL.md'), `---\nname: ${addedSkill}\ndescription: ${addedDescription}\n---\n\n# Fixture\n`);
    const updatedCatalog = JSON.parse(readFileSync(path.join(source, 'catalog.json'), 'utf8'));
    updatedCatalog.skills = updatedCatalog.skills
      .filter((skill) => skill.name !== removedSkill)
      .concat([{ name: addedSkill, description: addedDescription, path: `skills/${addedSkill}/SKILL.md` }])
      .sort((left, right) => left.name.localeCompare(right.name));
    for (const skill of updatedCatalog.skills) {
      skill.packageDigest = packageDigest(path.join(source, 'skills', skill.name));
    }
    updatedCatalog.count = updatedCatalog.skills.length;
    writeFileSync(path.join(source, 'catalog.json'), `${JSON.stringify(updatedCatalog, null, 2)}\n`);

    const updatedSha = commit(source, 'change exact fixture package set');
    const updatedRelease = promoteFixtureRelease(source, '7.0.1', updatedSha);
    const staleReadback = JSON.parse(runWithEnvironment(['auto-sync', 'status', '--json'], environment).stdout);
    assert.equal(staleReadback.enabled, true, 'scheduler capability remains live while source is stale');
    assert.equal(staleReadback.current, false);
    assert.equal(staleReadback.healthy, false);
    assert.equal(staleReadback.source.managedHead, firstRelease);
    assert.equal(staleReadback.source.remoteHead, updatedRelease);
    const scheduledRun = spawnSync(process.execPath, [
      path.join(managedHome, '.sylphx-skills', 'reconcile.mjs'),
      '--force', '--strict', '--quiet',
    ], { encoding: 'utf8', env: { ...process.env, ...environment } });
    assert.equal(scheduledRun.status, 0, scheduledRun.stderr || scheduledRun.stdout);
    const updatedManifest = JSON.parse(readFileSync(installedManifest, 'utf8'));
    assert.equal(updatedManifest.sourceCommit, updatedRelease);
    assert.deepEqual(updatedManifest.skills, updatedCatalog.skills.map((skill) => skill.name));
    assert.equal(existsSync(path.join(codexHome, 'skills', addedSkill, 'SKILL.md')), true);
    assert.equal(existsSync(path.join(claudeHome, 'skills', addedSkill, 'SKILL.md')), true);
    assert.equal(existsSync(path.join(grokHome, 'skills', addedSkill, 'SKILL.md')), false);
    assert.equal(existsSync(path.join(codexHome, 'skills', removedSkill)), false);
    assert.equal(existsSync(path.join(grokHome, 'skills', removedSkill)), false);
    assert.equal(existsSync(removedFile), false);
    const convergedReadback = JSON.parse(runWithEnvironment(['auto-sync', 'status', '--json'], environment).stdout);
    assert.equal(convergedReadback.enabled, true);
    assert.equal(convergedReadback.current, true);
    assert.equal(convergedReadback.healthy, true);
    assert.equal(convergedReadback.source.managedHead, updatedRelease);
    assert.equal(convergedReadback.source.remoteHead, updatedRelease);
    assert.equal(existsSync(path.join(unmanaged, 'SKILL.md')), true);
    assert.deepEqual(
      readdirSync(path.join(codexHome, 'skills')).filter((name) => name.startsWith('.sylphx-transaction-')),
      [],
    );

    const held = spawn(process.execPath, [path.join(managedHome, '.sylphx-skills', 'reconcile.mjs'), '--force'], {
      cwd: root,
      env: {
        ...process.env,
        ...environment,
        NODE_ENV: 'test',
        SYLPHX_SKILLS_TEST_HOLD_RECONCILE_LOCK_MS: '1000',
      },
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let heldStdout = '';
    let heldStderr = '';
    held.stdout.on('data', (chunk) => { heldStdout += chunk; });
    held.stderr.on('data', (chunk) => { heldStderr += chunk; });
    const heldExit = new Promise((resolve) => held.once('exit', resolve));
    const reconcileLock = path.join(managedHome, '.sylphx-skills', 'reconcile.lock');
    for (let attempt = 0; attempt < 250 && !existsSync(reconcileLock); attempt += 1) Atomics.wait(waiter, 0, 0, 20);
    assert.equal(existsSync(reconcileLock), true, 'scheduler tick did not acquire its reconcile lock');
    const busyDisableDuringReconcile = spawnSync(process.execPath, [cli, 'auto-sync', 'disable', '--quiet'], {
      cwd: root,
      encoding: 'utf8',
      env: { ...process.env, ...environment },
    });
    assert.notEqual(busyDisableDuringReconcile.status, 0);
    assert.match(busyDisableDuringReconcile.stderr, /automatic synchronization is busy/);
    assert.equal(existsSync(path.join(managedHome, '.sylphx-skills', 'config.json')), true);
    assert.equal(existsSync(path.join(managedHome, '.sylphx-skills', 'reconcile.mjs')), true);
    assert.equal(existsSync(plist), false, 'disable admission must stop future scheduler ticks before waiting');
    assert.equal(await heldExit, 0, heldStderr || heldStdout);

    const preLockReady = path.join(managedHome, '.sylphx-skills', '.test-before-reconcile-lock-ready');
    const preLockTick = spawn(process.execPath, [path.join(managedHome, '.sylphx-skills', 'reconcile.mjs'), '--force'], {
      cwd: root,
      env: {
        ...process.env,
        ...environment,
        NODE_ENV: 'test',
        SYLPHX_SKILLS_TEST_HOLD_BEFORE_RECONCILE_LOCK_MS: '1000',
      },
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let preLockStdout = '';
    let preLockStderr = '';
    preLockTick.stdout.on('data', (chunk) => { preLockStdout += chunk; });
    preLockTick.stderr.on('data', (chunk) => { preLockStderr += chunk; });
    const preLockExit = new Promise((resolve) => preLockTick.once('exit', resolve));
    for (let attempt = 0; attempt < 250 && !existsSync(preLockReady); attempt += 1) Atomics.wait(waiter, 0, 0, 20);
    assert.equal(existsSync(preLockReady), true, 'scheduler tick did not reach its pre-lock test boundary');
    runWithEnvironment(['auto-sync', 'disable', '--quiet'], environment);
    assert.equal(await preLockExit, 0, preLockStderr || preLockStdout);
    assert.equal(JSON.parse(preLockStdout).status, 'unconfigured');
    assert.equal(
      JSON.parse(readFileSync(installedManifest, 'utf8')).sourceCommit,
      updatedRelease,
      'a tick admitted before disable must re-read config under lock and perform no later target effects',
    );
    const claude = JSON.parse(readFileSync(path.join(claudeHome, 'settings.json'), 'utf8'));
    const grok = JSON.parse(readFileSync(path.join(grokHome, 'hooks', 'sylphx-skills.json'), 'utf8'));
    assert.equal(claude.language, 'en');
    assert.equal(Object.hasOwn(claude, 'hooks'), false);
    assert.deepEqual(grok.hooks, legacyHooks);
    assert.equal(existsSync(plist), false);
    assert.equal(existsSync(path.join(managedHome, '.sylphx-skills', 'repository')), true);
    assert.equal(existsSync(path.join(managedHome, '.sylphx-skills', 'config.json')), false);
  } finally {
    if (lifecycleRelease) {
      mkdirSync(path.dirname(lifecycleRelease), { recursive: true });
      writeFileSync(lifecycleRelease, 'release\n');
    }
    if (enableExit) await enableExit;
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('auto-sync supports a host-supervised scheduler with freshness-backed status', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-external-auto-sync-'));
  const source = path.join(sandbox, 'source');
  const managedHome = path.join(sandbox, 'home');
  const codexHome = path.join(managedHome, '.codex');
  try {
    mkdirSync(source, { recursive: true });
    git(source, ['init', '--initial-branch=main']);
    cpSync(path.join(root, 'runtime'), path.join(source, 'runtime'), { recursive: true });
    mkdirSync(path.join(source, 'skills'));
    const fixtureName = 'author-skill';
    cpSync(path.join(root, 'skills', fixtureName), path.join(source, 'skills', fixtureName), {
      recursive: true,
    });
    const fixtureCatalog = {
      ...catalog,
      count: 1,
      skills: catalog.skills.filter((skill) => skill.name === fixtureName),
    };
    writeFileSync(path.join(source, 'catalog.json'), `${JSON.stringify(fixtureCatalog, null, 2)}\n`);
    for (const entry of ['.gitattributes', 'package.json']) {
      cpSync(path.join(root, entry), path.join(source, entry));
    }
    const sourceSha = commit(source, 'external supervisor fixture');
    const firstRelease = promoteFixtureRelease(source, '7.0.0', sourceSha);
    const environment = {
      SYLPHX_SKILLS_HOME: managedHome,
      SYLPHX_SKILLS_REMOTE: pathToFileURL(source).href,
      CODEX_HOME: codexHome,
    };

    const enabled = runWithEnvironment([
      'auto-sync',
      'enable',
      '--agent',
      'codex',
      '--interval',
      '1m',
      '--scheduler',
      'external',
      '--quiet',
    ], environment);
    assert.equal(enabled.status, 0, enabled.stderr || enabled.stdout);
    const config = JSON.parse(
      readFileSync(path.join(managedHome, '.sylphx-skills', 'config.json'), 'utf8'),
    );
    assert.equal(config.mode, 'external-supervisor');
    assert.equal(config.enabled, true);
    assert.equal(config.externalSupervisorHeartbeat, path.join(
      managedHome,
      '.sylphx-skills',
      'external-supervisor.json',
    ));
    assert.equal(
      JSON.parse(readFileSync(path.join(codexHome, 'skills', '.sylphx-skills.json'), 'utf8'))
        .sourceCommit,
      firstRelease,
    );

    const awaitingSupervisor = JSON.parse(
      runWithEnvironment(['auto-sync', 'status', '--json'], environment).stdout,
    );
    assert.equal(awaitingSupervisor.configured, true);
    assert.equal(awaitingSupervisor.enabled, false);
    assert.equal(awaitingSupervisor.current, true);
    assert.equal(awaitingSupervisor.healthy, false);
    assert.equal(awaitingSupervisor.scheduler.kind, 'external-supervisor');
    assert.match(awaitingSupervisor.scheduler.error, /heartbeat is missing/);

    const heartbeat = config.externalSupervisorHeartbeat;
    writeFileSync(heartbeat, `${JSON.stringify({
      schemaVersion: 1,
      owner: 'SylphxAI/skills-external-supervisor',
      supervisor: 'fixture',
      status: 'running',
      lastHeartbeatAt: new Date().toISOString(),
      lastReconcileStatus: 'current',
    })}\n`);
    const live = JSON.parse(
      runWithEnvironment(['auto-sync', 'status', '--json'], environment).stdout,
    );
    assert.equal(live.enabled, true);
    assert.equal(live.current, true);
    assert.equal(live.healthy, true);
    assert.equal(live.scheduler.active, true);
    assert.equal(live.scheduler.supervisor, 'fixture');
    assert.equal(live.source.runtimeHomes.current, true);
    assert.deepEqual(live.source.runtimeHomes.configured, { codex: codexHome });
    assert.deepEqual(live.source.runtimeHomes.expected, { codex: codexHome });

    const shadowCodexHome = path.join(managedHome, 'shadow-codex');
    const shadowContext = JSON.parse(
      runWithEnvironment(['auto-sync', 'status', '--json'], {
        ...environment,
        CODEX_HOME: shadowCodexHome,
      }).stdout,
    );
    assert.equal(shadowContext.configured, true);
    assert.equal(shadowContext.enabled, true);
    assert.equal(shadowContext.current, false);
    assert.equal(shadowContext.healthy, false);
    assert.equal(shadowContext.source.error, 'runtime_home_mismatch');
    assert.equal(shadowContext.source.runtimeHomes.current, false);
    assert.deepEqual(shadowContext.source.runtimeHomes.mismatches, [{
      runtime: 'codex',
      configured: codexHome,
      expected: shadowCodexHome,
      reason: 'different_runtime_home',
    }]);

    const tick = spawnSync(process.execPath, [
      path.join(managedHome, '.sylphx-skills', 'reconcile.mjs'),
      '--force',
      '--strict',
    ], {
      cwd: root,
      encoding: 'utf8',
      env: { ...process.env, ...environment },
    });
    assert.equal(tick.status, 0, tick.stderr || tick.stdout);
    assert.equal(JSON.parse(tick.stdout).appliedSha, firstRelease);

    writeFileSync(heartbeat, `${JSON.stringify({
      schemaVersion: 1,
      owner: 'SylphxAI/skills-external-supervisor',
      supervisor: 'fixture',
      status: 'running',
      lastHeartbeatAt: '2020-01-01T00:00:00.000Z',
      lastReconcileStatus: 'current',
    })}\n`);
    const stale = JSON.parse(
      runWithEnvironment(['auto-sync', 'status', '--json'], environment).stdout,
    );
    assert.equal(stale.enabled, false);
    assert.equal(stale.healthy, false);
    assert.match(stale.scheduler.error, /heartbeat is stale/);

    runWithEnvironment(['auto-sync', 'disable', '--quiet'], environment);
    assert.equal(existsSync(heartbeat), false);

    const outsideHome = spawnSync(process.execPath, [cli,
      'auto-sync',
      'enable',
      '--agent',
      'codex',
      '--scheduler',
      'external',
      '--supervisor-heartbeat',
      path.join(sandbox, 'outside.json'),
      '--quiet',
    ], {
      cwd: root,
      encoding: 'utf8',
      env: { ...process.env, ...environment },
    });
    assert.notEqual(outsideHome.status, 0);
    assert.match(outsideHome.stderr, /must stay within the receiving runtime home/);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});
