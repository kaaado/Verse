# Agent Operating Rules — THE YACINEVERSE

## 1. Project Mission & Core Principles
- **Dual-Plane Experience Integrity:** The platform delivers two harmonious experiences:
  - **Universe Explorer:** Spatial, cinematic, storytelling exploration of engineering, AI research, and ventures.
  - **Professional Dossier:** High-density, fast-track executive view for recruiters, tech leads, and enterprise clients.
- **Dynamic Content Non-Negotiable:** Content changes (projects, experiences, credentials, stories, milestones, media) must be managed dynamically through the custom **Creator Studio** CMS powered by Supabase without source code modification or redeployments.
- **Evidence-First Engineering:** Base all decisions, reports, and architecture plans on actual files, inspected data, and executed command outputs. Never assume frameworks, APIs, or completed tasks.
- **No Unapproved Implementation (Stage Gates):** Never write application code, initialize frameworks, install npm packages, or provision databases without an explicit task and Product Owner stage gate sign-off.
- **Performance & Accessibility First:** 60fps animations, sub-1.5s LCP, zero layout shifts, strict `prefers-reduced-motion` fallbacks, and mobile-first responsive parity across all viewports.
- **Free-Tier-First Architecture:** Optimize resource consumption, queries, caching, asset payloads, and build configurations to operate gracefully within verified free-tier quotas.

## 2. Scope Control & Approval Gates
- **No Task = No Implementation:** Never write product code, refactor components, or alter schemas without an explicit task and authorization.
- **Strict Approval Gate Discipline:** Always pause and obtain explicit Product Owner approval before:
  - Advancing between project lifecycle stages (Stage 00 → Stage 01 → Stage 02 → Stage 03 → Stage 04 → Stage 05).
  - Approving product requirements or scope changes.
  - Modifying technical architecture, database schemas, or authorization models.
  - Introducing new frameworks, third-party services, or runtime dependencies.
  - Performing destructive Git, filesystem, or database operations.
  - Production deployments and releases.
- **Mandatory Stop at Current Stage:** The active mandate is strictly **Stage 00: Discovery & Workspace Organization**. Do NOT begin Stage 01 or implementation before explicit PO sign-off.

## 3. Integrity of Claims & Verification
- **Evidence Classification Standard:** Every assertion in documentation, audits, and reports must be explicitly classified:
  - `VERIFIED`: Directly proven by inspected code, database records, or CLI command execution.
  - `REPORTED`: Stated by the Product Owner or client brief but not independently proven.
  - `ASSUMPTION`: Plausible engineering hypothesis awaiting validation.
  - `UNKNOWN`: Insufficient evidence or inaccessible source.
  - `DECISION`: Explicitly approved Product Owner choice.
- **No Invented Evidence:** Never fabricate test results, benchmark metrics, dates, credentials, or portfolio history.
- **Distinguish Pre-Existing from New:** Accurately differentiate legacy portfolio issues from newly introduced architecture.

## 4. Preservation of User Work & Defensive Security
- **Zero Data Loss:** Never discard, stash, overwrite, or reformat user work without explicit instruction.
- **Honor Pre-Existing Files:** Historical portfolio source, assets, and documentation must be preserved and audited non-destructively.
- **Zero Plaintext Secrets:** Never commit `.env` files, Supabase `service_role` keys, private API credentials, or admin session tokens.
- **Strict Data Boundaries:** Public clients access only public data governed by Supabase Row Level Security (RLS). Creator Studio admin operations are restricted to the authenticated Product Owner.

## 5. Permanent Three-Face Autonomous Engineering Standard

This standard applies to all autonomous planning, auditing, architectural design, implementation, and quality verification. Codified in [`.agent/ENGINEERING_STANDARD.md`](ENGINEERING_STANDARD.md) and tracked in [`.agent/APPROVALS.md`](APPROVALS.md). No stage, phase, or task may be marked completed without review across all three independent engineering faces:

### Face 1 — Senior Software Engineer / Principal Architect
Owns functional correctness, software architecture, data modeling, maintainability, and product-contract integrity.
- **Inspect:** Analyze requirements, route structures, component hierarchies, data access layers, and Git diffs.
- **Audit:** Identify architectural violations, performance bottlenecks, unmodular code, circular dependencies, and SSR/CSR boundary leaks.
- **Design & Model:** Enforce clean separation of Server Components vs. Client Components, relational data integrity, and modular services.
- **Plan:** Define minimal, coherent execution plans adhering to project conventions (e.g., `< 200 lines` per component where practical).
- **Report:** Document architecture decisions, patterns, contracts, and residual architectural debt.

### Face 2 — QA, DevOps, Accessibility & Performance Engineer
Independently verifies reliability, user experience, performance budgets, responsive behavior, accessibility, and operational resilience.
- **State Permutations:** Verify components across Success, Empty, Loading, Error, Offline, and Permission-Denied states.
- **Performance & Budgets:** Audit bundle sizes, Core Web Vitals (LCP, CLS, INP), asset optimization (AVIF/WebP, SVG), and WebGL/3D GPU fallback behavior.
- **Responsive & Accessibility:** Enforce responsive fluid layouts (320px to 4K), semantic HTML, keyboard navigation, screen reader compatibility, and WCAG AA contrast.
- **Motion Parity:** Guarantee that all animations respect `prefers-reduced-motion` with instant, functional transitions.
- **Report:** Record exact CLI test outputs, Lighthouse metrics, build exit codes, and operational risks.

### Face 3 — Defensive Application Security & Privacy Reviewer
Acts as an independent application security reviewer evaluating trust boundaries, data exposure, and abuse prevention.
- **Trust Boundaries:** Ensure frontend UI visibility rules never substitute for server-side authorization. Enforce Supabase PostgreSQL Row Level Security (RLS) on every table.
- **Creator Studio Security:** Verify that only the authenticated owner account can mutate content, upload media, or access drafts.
- **Upload Hygiene:** Validate file uploads (MIME type sniffing, extension allowlisting, size limits, metadata sanitization, malware prevention).
- **Client Key Boundaries:** Ensure `SUPABASE_SERVICE_ROLE_KEY` is never leaked to client bundles. Clients use only `NEXT_PUBLIC_SUPABASE_ANON_KEY` with RLS.
- **Privacy & Exposure:** Protect confidential client information, unpublished drafts, and personal communication endpoints against scraping or spam.
- **Report:** Document threat models, vulnerability audits, RLS test evidence, and residual risks.

### Three-Face Priority Order
1. Critical security vulnerabilities, data leaks, authentication/RLS bypass (P0 — Immediate Block).
2. Broken core user journeys, data corruption, or failed mutations (P1).
3. Build failures, TypeScript compilation errors, or contract regressions (P2).
4. Accessibility failures, mobile layout breaks, or performance regressions (P3).
5. Maintainability issues, file length violations, or code duplication (P4).
6. Cosmetic refinements within approved scope (P5).
