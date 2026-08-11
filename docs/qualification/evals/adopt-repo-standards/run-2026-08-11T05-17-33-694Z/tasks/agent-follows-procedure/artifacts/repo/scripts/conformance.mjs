#!/usr/bin/env node
// Repository-baseline conformance entrypoint (deterministic, no network, no deps).
// Exit 0 when every check passes; exit 1 listing failures otherwise.

import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(ROOT, p), "utf8");
const has = (p) => existsSync(join(ROOT, p));

const failures = [];
let passed = 0;

function check(name, ok, detail = "") {
  if (ok) {
    passed += 1;
    console.log(`PASS  ${name}`);
  } else {
    failures.push({ name, detail });
    console.log(`FAIL  ${name}${detail ? ` — ${detail}` : ""}`);
  }
}

// --- 1. Manifest exists, parses, and structurally conforms to the canonical schema ---
const ID_PATTERN = /^[a-z0-9]+(?:[-_.][a-z0-9]+)*$/;
const ENUM = (value, list) => list.includes(value);
const nonEmptyStrings = (a) => Array.isArray(a) && a.length >= 1 && a.every((s) => typeof s === "string" && s.length >= 1);
const gapOk = (g) => g && typeof g.id === "string" && ID_PATTERN.test(g.id) &&
  typeof g.description === "string" && g.description.length >= 10 &&
  typeof g.owner === "string" && g.owner.length >= 1 &&
  typeof g.exitCondition === "string" && g.exitCondition.length >= 10;
const docHomeOk = (d) => d && typeof d.location === "string" && d.location.length >= 1 &&
  ENUM(d.status, ["present", "not-applicable", "planned"]);

let manifest = null;
if (has("project.manifest.json")) {
  try {
    manifest = JSON.parse(read("project.manifest.json"));
  } catch (e) {
    check("manifest parses as JSON", false, e.message);
  }
}

if (manifest) {
  const requiredTop = ["$schema", "schemaVersion", "kind", "project", "intent", "boundaries", "architecture", "documentation", "delivery", "commercial", "adoption"];
  check("manifest: top-level keys", requiredTop.every((k) => k in manifest), `missing: ${requiredTop.filter((k) => !(k in manifest)).join(",")}`);
  check("manifest: schemaVersion", manifest.schemaVersion === 2, String(manifest.schemaVersion));
  check("manifest: kind", manifest.kind === "ProjectManifest", String(manifest.kind));
  check("manifest: $schema is a URL", typeof manifest.$schema === "string" && /^https?:\/\//.test(manifest.$schema), String(manifest.$schema));

  const p = manifest.project;
  const pOk = p && ["id", "repository", "name", "summary", "lifecycle", "layer", "visibility", "policyPool", "links"].every((k) => k in p) &&
    ID_PATTERN.test(p.id) && typeof p.repository === "string" && p.repository.length >= 3 &&
    typeof p.name === "string" && p.name.length >= 1 &&
    typeof p.summary === "string" && p.summary.length >= 20 &&
    ENUM(p.lifecycle, ["incubating", "active", "production", "commercial", "maintenance", "deprecated", "archived"]) &&
    ID_PATTERN.test(p.layer) && ENUM(p.visibility, ["private", "internal", "public"]) &&
    ID_PATTERN.test(p.policyPool) &&
    Array.isArray(p.links) && p.links.length >= 1 && p.links.every((l) => l && typeof l.type === "string" && typeof l.url === "string" && l.url.length >= 3 && typeof l.title === "string" && l.title.length >= 1);
  check("manifest: project facts", pOk, p ? `id=${p.id} lifecycle=${p.lifecycle}` : "missing/partial");

  const i = manifest.intent;
  check("manifest: intent goals/nonGoals", i && nonEmptyStrings(i.goals) && nonEmptyStrings(i.nonGoals), i ? `goals=${i.goals?.length} nonGoals=${i.nonGoals?.length}` : "missing");

  const b = manifest.boundaries;
  const ownsOk = (c) => c && typeof c.id === "string" && ID_PATTERN.test(c.id) && typeof c.name === "string" && c.name.length >= 1 && typeof c.description === "string" && c.description.length >= 20;
  const bOk = b && Array.isArray(b.owns) && b.owns.length >= 1 && b.owns.every(ownsOk) &&
    nonEmptyStrings(b.doesNotOwn) && Array.isArray(b.publicSurfaces) &&
    b.publicSurfaces.every((s) => s && typeof s.type === "string" && typeof s.name === "string" && typeof s.location === "string" && s.location.length >= 1) &&
    Array.isArray(b.allowedDependencies) &&
    b.allowedDependencies.every((d) => d && typeof d.owner === "string" && typeof d.surface === "string" && ID_PATTERN.test(d.direction)) &&
    nonEmptyStrings(b.forbiddenCouplings);
  check("manifest: boundaries", bOk, b ? `owns=${b.owns?.length} forbidden=${b.forbiddenCouplings?.length}` : "missing");

  const a = manifest.architecture;
  const aOk = a && typeof a.generationRef === "string" && a.generationRef.length >= 3 &&
    Array.isArray(a.standardPackages) && a.standardPackages.length >= 1 && new Set(a.standardPackages).size === a.standardPackages.length &&
    a.standardPackages.every((s) => ID_PATTERN.test(s)) &&
    Array.isArray(a.capabilities) && a.capabilities.length >= 1 && new Set(a.capabilities).size === a.capabilities.length &&
    a.capabilities.every((c) => ID_PATTERN.test(c)) &&
    ENUM(a.adoptionStatus, ["not-applicable", "not-started", "migrating", "adopted", "gapped"]) &&
    Array.isArray(a.gaps) && a.gaps.every(gapOk);
  check("manifest: architecture", aOk, a ? `adoptionStatus=${a.adoptionStatus} gaps=${a.gaps?.length}` : "missing");

  const d = manifest.documentation;
  const dOk = d && ["adrs", "specs", "catalog", "runbooks", "generatedReferences"].every((k) => docHomeOk(d[k]));
  check("manifest: documentation homes", dOk, d ? Object.entries(d).map(([k, v]) => `${k}=${v.status}`).join(" ") : "missing");

  const dl = manifest.delivery;
  const dlOk = dl && typeof dl.lane === "string" && dl.lane.length >= 3 &&
    nonEmptyStrings(dl.verificationCommands) &&
    typeof dl.terminalBoundary === "string" && dl.terminalBoundary.length >= 20 &&
    ID_PATTERN.test(dl.recoveryClass) && typeof dl.deployable === "boolean" &&
    (dl.ciModel === undefined || ID_PATTERN.test(dl.ciModel)) &&
    (dl.packageRelease === undefined || (dl.packageRelease && typeof dl.packageRelease.producer === "boolean" && ID_PATTERN.test(dl.packageRelease.strategy) &&
      (!dl.packageRelease.producer ||
        (Array.isArray(dl.packageRelease.artifactKinds) && dl.packageRelease.artifactKinds.length >= 1 &&
         Array.isArray(dl.packageRelease.registryRefs) && dl.packageRelease.registryRefs.length >= 1))));
  check("manifest: delivery", dlOk, dl ? `lane=${dl.lane} deployable=${dl.deployable}` : "missing");
  check("manifest: verificationCommands declares entrypoint", dlOk && dl.verificationCommands.includes("npm run check"), dl?.verificationCommands?.join(", "));

  const c = manifest.commercial;
  check("manifest: commercial", c && ENUM(c.status, ["not-applicable", "internal", "candidate", "commercial"]) && typeof c.decisionHome === "string" && c.decisionHome.length >= 5, c ? `status=${c.status}` : "missing");

  const ad = manifest.adoption;
  const adOk = ad && ENUM(ad.status, ["not-applicable", "not-started", "migrating", "adopted", "gapped"]) && Array.isArray(ad.gaps) && ad.gaps.every(gapOk);
  check("manifest: adoption", adOk, ad ? `status=${ad.status} gaps=${ad.gaps?.length}` : "missing");
}

// --- 2. PROJECT.md projection freshness ---
const proj = has("PROJECT.md") ? read("PROJECT.md") : "";
check("PROJECT.md exists and projects manifest", manifest && proj.length > 0 &&
  proj.includes(manifest.project.id) && proj.includes(manifest.project.name) &&
  proj.includes(manifest.project.lifecycle) &&
  proj.includes("project.manifest.json") && proj.includes("npm run check"),
  has("PROJECT.md") ? "projection drift or missing links" : "PROJECT.md missing");

// --- 3. AGENTS.md constitution projection ---
const agents = has("AGENTS.md") ? read("AGENTS.md") : "";
const legacyMarkers = [
  "Always ask the ops guild before changing anything.",
  "Keep all engineering rules in this file.",
  "Do not use any other instruction source.",
];
check("AGENTS.md projects constitution without copying it", agents.length > 0 &&
  agents.includes("https://github.com/SylphxAI/skills/blob/main/runtime/constitution.md") &&
  agents.includes("project.manifest.json") && agents.includes("PROJECT.md") &&
  !agents.includes("sylphx-managed-constitution:start") &&
  legacyMarkers.every((m) => !agents.includes(m)),
  has("AGENTS.md") ? "missing constitution link/fact links or legacy content present" : "AGENTS.md missing");

// --- 4. Fence with dated retirement record ---
const fence = has("docs/fences/instruction-authority.md") ? read("docs/fences/instruction-authority.md") : "";
check("fence present and active", fence.length > 0 && /Status: ACTIVE/.test(fence) && fence.includes("Instruction-authority fence"),
  has("docs/fences/instruction-authority.md") ? "missing ACTIVE status" : "fence missing");
check("fence records dated retirement with owner", fence.includes("Retired on: 2026-08-11") &&
  fence.includes("Owner: acme-app") && fence.includes("legacy-AGENTS-retired-2026-08-11.md"),
  "missing retirement date/owner/residual reference");

// --- 5. Dated residual preserves predecessor, marked retired ---
const residual = has("docs/history/legacy-AGENTS-retired-2026-08-11.md") ? read("docs/history/legacy-AGENTS-retired-2026-08-11.md") : "";
check("dated residual exists and is marked retired", residual.length > 0 &&
  residual.includes("RETIRED") && residual.includes("NOT instruction authority") &&
  legacyMarkers.every((m) => residual.includes(m)),
  has("docs/history/legacy-AGENTS-retired-2026-08-11.md") ? "missing RETIRED marker or legacy content" : "residual missing");

// --- 6. package.json wiring ---
let pkg = null;
try { pkg = JSON.parse(read("package.json")); } catch {}
check("package.json wired to conformance entrypoint", pkg && typeof pkg.scripts?.check === "string" &&
  pkg.scripts.check.includes("scripts/conformance.mjs") && !pkg.scripts.check.includes("legacy-check"),
  pkg?.scripts?.check ?? "no check script");

// --- Result ---
const total = passed + failures.length;
console.log(`\nconformance: ${failures.length === 0 ? "PASS" : "FAIL"} (${passed}/${total} checks)`);
if (failures.length > 0) {
  console.error(`failures: ${failures.map((f) => f.name).join("; ")}`);
  process.exit(1);
}
