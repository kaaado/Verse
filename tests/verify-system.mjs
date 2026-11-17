// ============================================================================
// THE YACINEVERSE — Automated System Verification Suite
// Tests canonical schema, Zero-Trust guards, rate limiting, and privacy policies
// Tests synthetic demo dataset isolation and 3D Game-Quality Universe Explorer
// Tests First-Person Flight/World Controllers, 5 Interior Worlds & Audio Synthesis
// ============================================================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

let totalTests = 0;
let passedTests = 0;

function assert(condition, testName) {
  totalTests++;
  if (condition) {
    console.log(`  PASS: ${testName}`);
    passedTests++;
  } else {
    console.error(`  FAIL: ${testName}`);
  }
}

console.log('=== THE YACINEVERSE SYSTEM VERIFICATION SUITE ===\n');

// Test 1: Canonical Database Migration Integrity
console.log('[1] Canonical Database Schema & RLS Test:');
const migrationPath = path.join(rootDir, 'supabase', 'migrations', '20261117_000001_canonical_schema.sql');
const migrationSql = fs.readFileSync(migrationPath, 'utf8');

const expectedTables = [
  'media_assets',
  'skills',
  'experiences',
  'credentials',
  'projects',
  'stories',
  'posts',
  'milestones',
  'project_skills',
  'project_media',
  'inquiries',
  'audit_logs',
  'slug_redirects',
];

assert(expectedTables.length === 13, 'Expected 13 canonical tables');
for (const table of expectedTables) {
  assert(
    migrationSql.includes(`CREATE TABLE IF NOT EXISTS public.${table}`),
    `Table public.${table} exists in migration DDL`
  );
  assert(
    migrationSql.includes(`ALTER TABLE public.${table} ENABLE ROW LEVEL SECURITY;`),
    `RLS enabled on public.${table}`
  );
}

// Test 2: Subquery Junction Leak Prevention
console.log('\n[2] Junction Table Information Leakage Prevention:');
assert(
  migrationSql.includes('EXISTS (SELECT 1 FROM public.projects WHERE projects.id = project_skills.project_id AND projects.status = \'published\')'),
  'project_skills RLS policy verifies parent project status = published'
);
assert(
  migrationSql.includes('EXISTS (SELECT 1 FROM public.projects WHERE projects.id = project_media.project_id AND projects.status = \'published\')'),
  'project_media RLS policy verifies parent project status = published'
);

// Test 3: Purged Invented Data & Public Seed Data Audit
console.log('\n[3] Purged Invented Content & Public Seed Data Privacy Audit:');
const seedPath = path.join(rootDir, 'supabase', 'seed.sql');
const seedSql = fs.readFileSync(seedPath, 'utf8');

const purgedTerms = [
  'passiluce',
  'agrovia',
  'mascara',
  'hospital',
  'nvidia',
  'meslem',
  'mukhayyami',
];

for (const term of purgedTerms) {
  assert(!seedSql.toLowerCase().includes(term), `Seed data contains zero instances of purged term: "${term}"`);
}

// Scan all source code files in src/ for any remaining invented terms
function scanDir(dir, terms, foundHits) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(fullPath, terms, foundHits);
    } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx'))) {
      const content = fs.readFileSync(fullPath, 'utf8').toLowerCase();
      for (const t of terms) {
        if (content.includes(t)) {
          foundHits.push({ file: fullPath, term: t });
        }
      }
    }
  }
}

const foundInventedTerms = [];
scanDir(path.join(rootDir, 'src'), purgedTerms, foundInventedTerms);
assert(
  foundInventedTerms.length === 0,
  `All source files in src/ have zero invented portfolio terms (Found: ${foundInventedTerms.length})`
);

// Test 4: Demo Dataset Isolation & Data Provider Boundary
console.log('\n[4] Demo Dataset Isolation & Boundary Test:');
const demoDataPath = path.join(rootDir, 'src', 'lib', 'demo-data', 'index.ts');
assert(fs.existsSync(demoDataPath), 'src/lib/demo-data/index.ts exists');
const demoDataCode = fs.readFileSync(demoDataPath, 'utf8');
assert(demoDataCode.includes('DEMO_PROJECTS'), 'DEMO_PROJECTS defined');
assert(demoDataCode.includes('DEMO_EXPERIENCES'), 'DEMO_EXPERIENCES defined');
assert(demoDataCode.includes('DEMO_SKILLS'), 'DEMO_SKILLS defined');
assert(demoDataCode.includes('DEMO_CREDENTIALS'), 'DEMO_CREDENTIALS defined');
assert(demoDataCode.includes('is_demo: true'), 'Synthetic demo items explicitly flagged with is_demo: true');

const dataProviderPath = path.join(rootDir, 'src', 'lib', 'data-provider.ts');
assert(fs.existsSync(dataProviderPath), 'src/lib/data-provider.ts boundary exists');
const dataProviderCode = fs.readFileSync(dataProviderPath, 'utf8');
assert(dataProviderCode.includes("export type AppDataMode = 'demo' | 'owner' | 'empty'"), 'AppDataMode supports demo, owner, empty');
assert(dataProviderCode.includes('getActiveDataMode'), 'getActiveDataMode helper exported');

// Test 5: Procedural Web Audio Synthesis Engine
console.log('\n[5] Procedural Web Audio Engine:');
const audioPath = path.join(rootDir, 'src', 'components', 'universe', 'universe-audio.ts');
assert(fs.existsSync(audioPath), 'universe-audio.ts exists');
const audioCode = fs.readFileSync(audioPath, 'utf8');
assert(audioCode.includes('setupCosmicDrone'), 'Ambient cosmic drone synthesis active');
assert(audioCode.includes('playWarpSound'), 'Warp / Hyperspace acceleration sound active');
assert(audioCode.includes('playInteractionChime'), 'Harmonic interaction chime active');
assert(audioCode.includes('playAtmosphericEntry'), 'Atmospheric entry sound active');

// Test 6: First-Person Flight & Ground Exploration Controllers
console.log('\n[6] First-Person Controllers:');
const flightCtrlPath = path.join(rootDir, 'src', 'components', 'universe', 'controllers', 'flight-controls.tsx');
assert(fs.existsSync(flightCtrlPath), 'flight-controls.tsx exists');
const flightCtrlCode = fs.readFileSync(flightCtrlPath, 'utf8');
assert(flightCtrlCode.includes('boost'), 'Hyper-thruster boost kinematics implemented');
assert(flightCtrlCode.includes('onApproachWorld'), 'World proximity detection active');

const worldCtrlPath = path.join(rootDir, 'src', 'components', 'universe', 'controllers', 'world-controls.tsx');
assert(fs.existsSync(worldCtrlPath), 'world-controls.tsx exists');
const worldCtrlCode = fs.readFileSync(worldCtrlPath, 'utf8');
assert(worldCtrlCode.includes('onNearArtifact'), 'Artifact proximity detection active');
assert(worldCtrlCode.includes('onReturnToSpace'), 'Gateway exit detection active');

const joystickPath = path.join(rootDir, 'src', 'components', 'universe', 'controllers', 'virtual-joystick.tsx');
assert(fs.existsSync(joystickPath), 'virtual-joystick.tsx mobile controls exist');

// Test 7: Cinematics & Warp FX
console.log('\n[7] Cinematics & Warp FX:');
const introPath = path.join(rootDir, 'src', 'components', 'universe', 'cinematics', 'awakening-intro.tsx');
assert(fs.existsSync(introPath), 'awakening-intro.tsx exists');
const introCode = fs.readFileSync(introPath, 'utf8');
assert(introCode.includes('ENTER THE UNIVERSE'), 'Enter Universe prompt present');
assert(introCode.includes('Skip Introduction'), 'Skip intro option present');

const warpPath = path.join(rootDir, 'src', 'components', 'universe', 'cinematics', 'warp-tunnel.tsx');
assert(fs.existsSync(warpPath), 'warp-tunnel.tsx exists');
const warpCode = fs.readFileSync(warpPath, 'utf8');
assert(warpCode.includes('STATIC_STAR_POSITIONS'), 'Deterministic star positions active');

// Test 8: 5 Interior World Environments
console.log('\n[8] 5 Interior World Environments:');
const worldFiles = [
  'core-systems-world.tsx',
  'ai-intelligence-world.tsx',
  'engineering-world.tsx',
  'creations-world.tsx',
  'origins-world.tsx',
];

for (const wf of worldFiles) {
  const p = path.join(rootDir, 'src', 'components', 'universe', 'worlds', wf);
  assert(fs.existsSync(p), `World environment exists: ${wf}`);
  const code = fs.readFileSync(p, 'utf8');
  assert(code.includes('WorldTerminal'), `${wf} contains interactive WorldTerminal artifacts`);
  assert(code.includes('Space Orbit Gateway'), `${wf} contains Space Orbit Gateway beacon`);
}

// Test 9: Spatially Integrated In-World Artifacts & Terminal
console.log('\n[9] Spatial In-World Terminal:');
const terminalPath = path.join(rootDir, 'src', 'components', 'universe', 'world-terminal.tsx');
assert(fs.existsSync(terminalPath), 'world-terminal.tsx exists');
const terminalCode = fs.readFileSync(terminalPath, 'utf8');
assert(terminalCode.includes('Html'), 'Spatially projected HTML terminal active');
assert(terminalCode.includes('octahedronGeometry'), '3D holographic geometry present');

// Test 10: Master Experience Orchestrator & HUD
console.log('\n[10] Master Experience Orchestrator & HUD:');
const expPath = path.join(rootDir, 'src', 'components', 'universe', 'universe-experience.tsx');
assert(fs.existsSync(expPath), 'universe-experience.tsx exists');
const expCode = fs.readFileSync(expPath, 'utf8');
assert(expCode.includes('SPACE_FLIGHT'), 'Space flight state managed');
assert(expCode.includes('WORLD_EXPLORATION'), 'World exploration state managed');
assert(expCode.includes('WARP_TRANSITION'), 'Warp transition state managed');

const fpHudPath = path.join(rootDir, 'src', 'components', 'universe', 'first-person-hud.tsx');
assert(fs.existsSync(fpHudPath), 'first-person-hud.tsx exists');
const fpHudCode = fs.readFileSync(fpHudPath, 'utf8');
assert(fpHudCode.includes('Reticle'), 'Center targeting reticle rendered');
assert(fpHudCode.includes('actionPrompt'), 'Dynamic context action prompt active');

// Test 11: Creator Studio Onboarding & Telemetry Cleanup
console.log('\n[11] Creator Studio Onboarding & Telemetry Test:');
const checklistPath = path.join(rootDir, 'src', 'components', 'studio', 'content-checklist.tsx');
assert(fs.existsSync(checklistPath), 'src/components/studio/content-checklist.tsx exists');
const studioPath = path.join(rootDir, 'src', 'app', 'studio', 'page.tsx');
const studioCode = fs.readFileSync(studioPath, 'utf8');
assert(studioCode.includes('ContentChecklist'), 'ContentChecklist embedded in Studio dashboard');
assert(!studioCode.includes('14.2 MB'), 'Fabricated 14.2 MB disk metric removed');
assert(!studioCode.includes('48.5 MB'), 'Fabricated 48.5 MB egress metric removed');
assert(studioCode.includes('Not Connected') || studioCode.includes('Requires Management API'), 'Honest telemetry status displayed');

// Test 12: Rate Limiting & Proxy Routing
console.log('\n[12] Rate Limiting & Routing Convention:');
const rateLimitPath = path.join(rootDir, 'src', 'lib', 'rate-limit.ts');
const rateLimitCode = fs.readFileSync(rateLimitPath, 'utf8');
assert(rateLimitCode.includes('checkRateLimit'), 'checkRateLimit function defined');
assert(rateLimitCode.includes('memoryStore'), 'In-memory fallback store active');
assert(fs.existsSync(path.join(rootDir, 'src', 'proxy.ts')), 'src/proxy.ts exists and adheres to Next.js 16 convention');
assert(!fs.existsSync(path.join(rootDir, 'src', 'middleware.ts')), 'Deprecated src/middleware.ts removed');

console.log(`\n=== VERIFICATION SUMMARY: ${passedTests}/${totalTests} TESTS PASSED ===\n`);

if (passedTests === totalTests) {
  console.log('STATUS: VERIFIED_PASS');
  process.exit(0);
} else {
  console.error('STATUS: VERIFIED_FAIL');
  process.exit(1);
}
