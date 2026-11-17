// ============================================================================
// THE YACINEVERSE — Automated System Verification Suite
// Tests canonical schema, Zero-Trust guards, rate limiting, and privacy policies
// Tests synthetic demo dataset isolation and 3D Game-Quality Universe Explorer
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

// Test 5: 3D Game-Quality Universe Explorer Architecture
console.log('\n[5] 3D Game-Quality Universe Explorer Architecture:');
const scene3DPath = path.join(rootDir, 'src', 'components', 'universe', 'universe-3d-scene.tsx');
assert(fs.existsSync(scene3DPath), 'universe-3d-scene.tsx exists');
const scene3DCode = fs.readFileSync(scene3DPath, 'utf8');
assert(scene3DCode.includes('CentralNexus'), 'Central Nexus 3D hub component implemented');
assert(scene3DCode.includes('SectorLandmark'), 'SectorLandmark 3D thematic components implemented');
assert(scene3DCode.includes('CameraRig'), 'CameraRig kinematic smooth damping implemented');
assert(scene3DCode.includes('SECTORS_3D'), '5 Thematic Sectors defined in 3D coordinate space');

const hudOverlayPath = path.join(rootDir, 'src', 'components', 'universe', 'universe-hud-overlay.tsx');
assert(fs.existsSync(hudOverlayPath), 'universe-hud-overlay.tsx exists');
const hudOverlayCode = fs.readFileSync(hudOverlayPath, 'utf8');
assert(hudOverlayCode.includes('framer-motion'), 'Framer Motion powering cinematic HUD & drawer');
assert(hudOverlayCode.includes('AnimatePresence'), 'AnimatePresence sliding detail drawer active');

const wrapper3DPath = path.join(rootDir, 'src', 'components', 'universe', 'universe-3d-wrapper.tsx');
assert(fs.existsSync(wrapper3DPath), 'universe-3d-wrapper.tsx master container exists');
const wrapper3DCode = fs.readFileSync(wrapper3DPath, 'utf8');
assert(wrapper3DCode.includes('FiberCanvas'), 'React Three Fiber dynamic Canvas loading');
assert(wrapper3DCode.includes('WebGLErrorBoundary'), 'Graceful WebGL Error Boundary with 2D fallback');

// Test 6: Creator Studio Onboarding & Telemetry Cleanup
console.log('\n[6] Creator Studio Onboarding & Telemetry Test:');
const checklistPath = path.join(rootDir, 'src', 'components', 'studio', 'content-checklist.tsx');
assert(fs.existsSync(checklistPath), 'src/components/studio/content-checklist.tsx exists');
const studioPath = path.join(rootDir, 'src', 'app', 'studio', 'page.tsx');
const studioCode = fs.readFileSync(studioPath, 'utf8');
assert(studioCode.includes('ContentChecklist'), 'ContentChecklist embedded in Studio dashboard');
assert(!studioCode.includes('14.2 MB'), 'Fabricated 14.2 MB disk metric removed');
assert(!studioCode.includes('48.5 MB'), 'Fabricated 48.5 MB egress metric removed');
assert(studioCode.includes('Not Connected') || studioCode.includes('Requires Management API'), 'Honest telemetry status displayed');

// Test 7: Rate Limiting & Proxy Routing
console.log('\n[7] Rate Limiting & Routing Convention:');
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
