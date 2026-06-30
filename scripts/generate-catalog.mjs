import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const repoRoot = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const registryPath = path.join(repoRoot, 'registry', 'skills.json');
const skillsShPath = path.join(repoRoot, 'skills.sh.json');
const catalogDir = path.join(repoRoot, 'catalog');
const check = process.argv.includes('--check');

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function slug(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'group';
}

function layout({ title, description, body, rootPrefix = '' }) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <style>
    :root { color-scheme: light dark; --bg: #0b0c10; --panel: #11131a; --text: #f4f7fb; --muted: #a9b2c3; --line: #273042; --accent: #8bd3ff; --chip: #1c2636; }
    @media (prefers-color-scheme: light) { :root { --bg: #fbfcff; --panel: #ffffff; --text: #101828; --muted: #526071; --line: #d9e1ec; --accent: #075985; --chip: #edf4ff; } }
    * { box-sizing: border-box; }
    body { margin: 0; font: 16px/1.55 ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: var(--bg); color: var(--text); }
    a { color: var(--accent); text-decoration: none; }
    a:hover { text-decoration: underline; }
    header, main, footer { width: min(1120px, calc(100% - 32px)); margin: 0 auto; }
    header { padding: 42px 0 22px; }
    nav { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 24px; color: var(--muted); }
    h1 { font-size: clamp(2rem, 5vw, 4.2rem); line-height: 1; letter-spacing: -0.05em; margin: 0 0 14px; }
    h2 { margin-top: 42px; letter-spacing: -0.025em; }
    p.lede { max-width: 760px; color: var(--muted); font-size: 1.08rem; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; }
    .card { border: 1px solid var(--line); background: var(--panel); border-radius: 18px; padding: 18px; min-height: 100%; }
    .card h3 { margin: 0 0 8px; letter-spacing: -0.02em; }
    .muted { color: var(--muted); }
    .chip { display: inline-block; padding: 4px 9px; border-radius: 999px; background: var(--chip); color: var(--muted); font-size: 0.84rem; margin: 0 6px 6px 0; }
    code, pre { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
    pre { overflow: auto; padding: 14px; border-radius: 14px; background: #05070b; color: #f4f7fb; border: 1px solid var(--line); }
    .meta { display: flex; gap: 8px; flex-wrap: wrap; margin: 14px 0; }
    footer { padding: 42px 0; color: var(--muted); font-size: 0.92rem; }
  </style>
</head>
<body>
  <header>
    <nav>
      <a href="${rootPrefix}index.html">Catalog</a>
      <a href="https://github.com/SylphxAI/skills">GitHub</a>
      <a href="https://github.com/SylphxAI/skills/blob/main/README.md">Install</a>
    </nav>
    <h1>${escapeHtml(title)}</h1>
    <p class="lede">${escapeHtml(description)}</p>
  </header>
  <main>
${body}
  </main>
  <footer>Generated from <code>registry/skills.json</code> and <code>skills.sh.json</code>. GitHub remains the source of truth.</footer>
</body>
</html>
`;
}

function skillCard(skill, prefix = '') {
  return `<article class="card">
  <h3><a href="${prefix}skills/${skill.name}.html">${escapeHtml(skill.name)}</a></h3>
  <p class="muted">${escapeHtml(skill.description)}</p>
  <div class="meta"><span class="chip">${escapeHtml(skill.status)}</span><span class="chip">${skill.references.length} refs</span><span class="chip">${skill.agents.length} agents</span></div>
  <pre>npx skills add https://github.com/SylphxAI/skills --skill ${escapeHtml(skill.name)}</pre>
</article>`;
}

async function writeGenerated(file, content, generated) {
  generated.push(path.relative(repoRoot, file));
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, content);
}

async function buildCatalog() {
  const registry = JSON.parse(await readFile(registryPath, 'utf8'));
  const skillsSh = JSON.parse(await readFile(skillsShPath, 'utf8'));
  const skillsByName = new Map(registry.skills.map((skill) => [skill.name, skill]));
  const generated = [];

  if (existsSync(catalogDir)) await rm(catalogDir, { recursive: true, force: true });
  await mkdir(catalogDir, { recursive: true });

  const groups = (skillsSh.groupings || []).map((group) => ({
    ...group,
    slug: slug(group.title),
    skills: (group.skills || []).map((name) => skillsByName.get(name)).filter(Boolean),
  }));

  const indexBody = `
<section class="grid">
${groups.map((group) => `<article class="card"><h3><a href="groups/${group.slug}.html">${escapeHtml(group.title)}</a></h3><p class="muted">${escapeHtml(group.description)}</p><div class="meta"><span class="chip">${group.skills.length} skills</span></div></article>`).join('\n')}
</section>
<h2>All skills</h2>
<section class="grid">
${registry.skills.map((skill) => skillCard(skill)).join('\n')}
</section>`;
  await writeGenerated(path.join(catalogDir, 'index.html'), layout({
    title: 'Sylphx Skills Catalog',
    description: `${registry.skills.length} eval-backed product, design, growth, operations, and agent skills for AI coding and product agents.`,
    body: indexBody,
  }), generated);

  for (const group of groups) {
    const body = `
<p><a href="../index.html">← Back to catalog</a></p>
<section class="grid">
${group.skills.map((skill) => skillCard(skill, '../')).join('\n')}
</section>`;
    await writeGenerated(path.join(catalogDir, 'groups', `${group.slug}.html`), layout({
      title: group.title,
      description: group.description,
      body,
      rootPrefix: '../',
    }), generated);
  }

  for (const skill of registry.skills) {
    const referenceLinks = skill.references.length
      ? skill.references.map((ref) => `<li><a href="https://github.com/SylphxAI/skills/blob/main/${skill.path}/references/${encodeURIComponent(ref)}">${escapeHtml(ref)}</a></li>`).join('\n')
      : '<li>No bundled references.</li>';
    const body = `
<p><a href="../index.html">← Back to catalog</a></p>
<section class="card">
  <h2>Install</h2>
  <pre>npx skills add https://github.com/SylphxAI/skills --skill ${escapeHtml(skill.name)}</pre>
  <h2>Description</h2>
  <p>${escapeHtml(skill.description)}</p>
  <h2>Source</h2>
  <p><a href="https://github.com/SylphxAI/skills/tree/main/${skill.path}">${escapeHtml(skill.path)}</a></p>
  <h2>References</h2>
  <ul>${referenceLinks}</ul>
</section>`;
    await writeGenerated(path.join(catalogDir, 'skills', `${skill.name}.html`), layout({
      title: skill.name,
      description: skill.description,
      body,
      rootPrefix: '../',
    }), generated);
  }

  const manifest = {
    schemaVersion: 1,
    generatedBy: 'scripts/generate-catalog.mjs',
    source: ['registry/skills.json', 'skills.sh.json'],
    skillCount: registry.skills.length,
    groupCount: groups.length,
    generated,
  };
  await writeGenerated(path.join(catalogDir, 'catalog-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, generated);
  return manifest;
}

async function main() {
  const manifest = await buildCatalog();
  if (check) {
    const diff = execFileSync('git', ['diff', '--', 'catalog'], { cwd: repoRoot, encoding: 'utf8' });
    if (diff) {
      console.error('catalog is not up to date; run node scripts/generate-catalog.mjs');
      process.exit(1);
    }
  }
  console.log(`Wrote catalog with ${manifest.skillCount} skills in ${manifest.groupCount} groups`);
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
