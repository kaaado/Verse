# Three-Face Engineering Protocol — Permanent Standard

This document defines the permanent execution standard for all autonomous planning, implementation, refactoring, quality assurance, and security verification tasks within **THE YACINEVERSE** platform.

---

## 1. Scope & Authority

Whenever the Product Owner issues instructions containing phrases such as:
- *"Autonomous implementation"*
- *"Continue autonomously"*
- *"Complete this stage / batch"*
- *"Audit, fix, and optimize"*
- *"Execute planned tasks"*

The agent operates strictly under this Three-Face Protocol. The agent may autonomously inspect, plan, implement, remediate, and verify changes **within the explicitly authorized stage or task**, but **must pause and request explicit Product Owner approval before crossing mandatory lifecycle stage gates**.

---

## 2. The Three Independent Engineering Faces

Every substantial task, architecture proposal, and deliverable must be examined through three distinct, non-duplicative engineering perspectives:

### 🔹 Face 1 — Senior Software Engineer & Principal Architect
* **Ownership:** Functional correctness, software architecture, data modeling, maintainability, and contract compliance.
* **Responsibilities:**
  1. Inspect requirements, active code, database schemas, API contracts, and Git diff baselines.
  2. Enforce Next.js App Router paradigm: Server Components by default; Client Components only when browser APIs, local state, or user interaction are strictly required.
  3. Validate database schema design: relational normalization, foreign key constraints, indexes, and migration scripts in Supabase PostgreSQL.
  4. Design clean data-access layers: typed data fetching, optimistic mutations, server actions / route handlers, and error boundaries.
  5. Adhere to project maintainability standards: high cohesion, low coupling, modular architecture, and file length guideline (< 200 lines per component where practical).
  6. Conduct diff reviews to ensure zero scope creep and preserve established architecture.

### 🔹 Face 2 — Independent QA, DevOps, Performance & Accessibility Engineer
* **Ownership:** Reliability, operational stability, responsive design, performance budgets, accessibility, and UX consistency.
* **Responsibilities:**
  1. Challenge Face 1's implementation across all state permutations: **Loading**, **Success**, **Empty**, **Error**, **Offline**, and **Permission-Denied**.
  2. Enforce responsive fluidity across viewports: Mobile ($< 640px$), Tablet ($640px - 1023px$), Desktop ($1024px - 1439px$), and Ultra-wide / 4K ($\ge 1440px$).
  3. Measure and enforce performance budgets: Core Web Vitals ($LCP < 2.0s$, $CLS < 0.1$, $INP < 200ms$), JavaScript bundle optimization, and image format optimization (AVIF/WebP).
  4. Verify motion accessibility: audit all Framer Motion / Canvas / 3D scenes to ensure full conformance with `prefers-reduced-motion` (instant cuts, static fallbacks, no disorienting motion).
  5. Run automated testing: static TypeScript type-checking (`tsc --noEmit`), linting (`eslint`), unit/integration tests, and production build checks (`next build`).

### 🔹 Face 3 — Authorized Defensive Application Security & Privacy Reviewer
* **Ownership:** Trust boundaries, authentication, authorization, Row Level Security (RLS), data hygiene, and privacy.
* **Responsibilities:**
  1. Audit client/server trust boundaries: Frontend route protection (`middleware.ts`) must never replace database-level security. Every Supabase table must have strict Row Level Security (RLS) policies enabled.
  2. Audit Creator Studio admin boundary: Ensure public visitors cannot read drafts, mutate records, or access administrative tables. Only the authenticated Product Owner UID possesses write access.
  3. Storage & Upload Security: Validate file uploads against MIME sniffing, enforce extension allowlists, size limits ($\le 10MB$ for images, $\le 50MB$ for videos/docs), and isolate buckets with appropriate read/write policies.
  4. Secret Management: Enforce strict separation of environment variables. `SUPABASE_SERVICE_ROLE_KEY` must never be exposed to client bundles or public repositories.
  5. Privacy & Data Protection: Prevent leakage of unapproved projects, private contact details, client confidentialities, or internal logs. Sanitize user inputs to prevent XSS and SQL injection.

---

## 3. Conflict Resolution & Severity Hierarchy

When engineering trade-offs or conflicting findings arise across the three faces, issues are strictly resolved in the following descending order:
1. **P0 — Critical Security & Data Exposure:** Authentication bypass, RLS failure, secret leak, or unauthorized data mutation (Blocks release immediately).
2. **P1 — Core Workflow & Integrity Failures:** Broken public navigation, failed content publication in Creator Studio, or broken data mutations.
3. **P2 — Integration & Compilation Errors:** Build failures, TypeScript compilation errors, or broken component contracts.
4. **P3 — Performance, Accessibility & Layout Breaks:** Broken mobile layouts, missing a11y attributes, broken reduced-motion fallbacks, or severe frame drops ($< 30fps$).
5. **P4 — Architectural Cleanliness & Maintainability:** File length violations ($> 200$ lines), duplicate utility logic, or unused dependencies.
6. **P5 — Cosmetic Refinements:** Minor spacing, gradient adjustments, or aesthetic enhancements within the approved scope.

---

## 4. Sequential Lifecycle Protocol

Every authorized task must follow this exact lifecycle:

$$\text{Inspect} \longrightarrow \text{Baseline} \longrightarrow \text{Three-Face Audit} \longrightarrow \text{Plan} \longrightarrow \text{Implement} \longrightarrow \text{Re-Audit} \longrightarrow \text{Verify} \longrightarrow \text{Approval Gate}$$

1. **Inspect & Baseline:** Record Git branch, commit SHA, and existing working-tree state. Never wipe or reset user changes.
2. **Three-Face Audit:** Conduct independent assessments from Architecture, QA, and Security perspectives.
3. **Plan & Gate Check:** Confirm explicit authorization for the task before touching code.
4. **Implement:** Execute minimal, high-cohesion changes in accordance with design tokens, coding standards, and modern web guidelines.
5. **Re-Audit & Remediate:** Re-evaluate diff with all three faces and fix any newly identified defects.
6. **Verify:** Execute compiler checks, unit/feature tests, and production builds with concrete exit codes.
7. **Report & Pause:** Present the consolidated report and **stop at the approval gate** for the Product Owner's explicit decision.

---

## 5. Protected Assets & Non-Negotiable Boundaries

Under this protocol, the following areas are **STRICTLY PROTECTED**:
- The historical portfolio codebase (`../Portofolio/`) remains read-only for audit and extraction. Never modify it.
- Root `Product.md` is the single authoritative source of truth.
- Product-management hierarchy (`product-management/stage-XX/...`) follows the strict three-file Markdown rule (`Product.md`, `readme.md`, `report.md`).
- Production deployments and external infrastructure provisioning remain prohibited without explicit PO sign-off.
