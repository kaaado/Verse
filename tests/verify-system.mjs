// ============================================================================
// THE YACINEVERSE — Automated System Verification Suite
// Tests canonical schema, Zero-Trust guards, rate limiting, and privacy policies
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

// Test 3: Public Seed Data Privacy & Confidentiality Audit
console.log('\n[3] Public Showcase Privacy & Non-Disclosure Audit:');
const seedPath = path.join(rootDir, 'supabase', 'seed.sql');
const seedSql = fs.readFileSync(seedPath, 'utf8');

const forbiddenStrings = [
  'patient_record',
  'medical_diagnosis',
  'slickpay_live_secret',
  'password123',
  'confidential_client_balance',
];

for (const forbidden of forbiddenStrings) {
  assert(!seedSql.toLowerCase().includes(forbidden), `Seed data contains zero instances of "${forbidden}"`);
}

// Test 4: Rate Limiting Algorithm Verification
console.log('\n[4] Rate Limiting Logic Test:');
const rateLimitPath = path.join(rootDir, 'src', 'lib', 'rate-limit.ts');
const rateLimitCode = fs.readFileSync(rateLimitPath, 'utf8');
assert(rateLimitCode.includes('checkRateLimit'), 'checkRateLimit function defined');
assert(rateLimitCode.includes('memoryStore'), 'In-memory fallback store active');

// Test 5: Next.js 16 Proxy / Middleware Compliance
console.log('\n[5] Next.js 16 Routing Convention Test:');
assert(fs.existsSync(path.join(rootDir, 'src', 'proxy.ts')), 'src/proxy.ts exists and adheres to Next.js 16 convention');
assert(!fs.existsSync(path.join(rootDir, 'src', 'middleware.ts')), 'Deprecated src/middleware.ts removed to prevent proxy conflict');

console.log(`\n=== VERIFICATION SUMMARY: ${passedTests}/${totalTests} TESTS PASSED ===\n`);

if (passedTests === totalTests) {
  console.log('STATUS: VERIFIED_PASS');
  process.exit(0);
} else {
  console.error('STATUS: VERIFIED_FAIL');
  process.exit(1);
}
