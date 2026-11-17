# Architecture Decision Records (ADRs) — THE YACINEVERSE

## Decision Status Vocabulary
- **ACCEPTED:** Formally approved by Product Owner and active as an architectural baseline.
- **PROPOSED:** Architectural proposal awaiting Product Owner sign-off.
- **SUPERSEDED:** Replaced by a subsequent approved ADR.
- **REJECTED:** Evaluated and declined with documented technical justification.

---

## ADR-001: Independent Workspace & Clean Repository Decoupling
- **Date:** 2026-11-17
- **Status:** ACCEPTED
- **Context:** The historical portfolio (`portofolio-v5`) resided in `W:\Document\Portofolio` as a Vite SPA carrying legacy template artifacts and dependency bloat. Attempting to refactor the old project in place would incur severe technical debt and risk breaking the active public site (`portofoliokaaado.vercel.app`).
- **Decision:** Establish a completely new, independent workspace (`W:\Document\Verse`) and target repository (`https://github.com/kaaado/Verse.git`). Maintain the historical portfolio as a read-only source for asset/content extraction.
- **Consequences:** Eliminates legacy template baggage; ensures zero downtime on the live portfolio while building THE YACINEVERSE.

---

## ADR-002: Framework Selection — Next.js App Router & TypeScript
- **Date:** 2026-11-17
- **Status:** ACCEPTED
- **Context:** The platform requires high-speed public loading, dynamic SEO structured data, fast recruiter navigation, and complex spatial interactivity.
- **Decision:** Standardize on **Next.js App Router** with strict **TypeScript**. Default to React Server Components (RSC) for data fetching and static page layouts, confining Client Components (`"use client"`) to leaf interactive elements.
- **Consequences:** Maximizes performance and SEO; eliminates client-side data fetching waterfalls; supports on-demand ISR cache revalidation.

---

## ADR-003: Backend Foundation — Supabase (PostgreSQL, Auth, Storage, RLS)
- **Date:** 2026-11-17
- **Status:** ACCEPTED
- **Context:** The product requires a robust relational database for dynamic content (projects, experiences, skills, stories), secure single-owner authentication, file storage for media assets, and bulletproof security without building a separate custom backend server.
- **Decision:** Adopt **Supabase** as the complete backend platform utilizing PostgreSQL, Supabase Auth, Supabase Storage, and mandatory Row Level Security (RLS).
- **Consequences:** Provides relational integrity, foreign key constraints, and declarative database-level authorization. Operates within generous free-tier quotas.

---

## ADR-004: CMS Architecture — Custom-Built Creator Studio
- **Date:** 2026-11-17
- **Status:** ACCEPTED
- **Context:** Content must be dynamically maintainable by the owner without editing application source code or triggering full site rebuilds. Traditional third-party headless CMS platforms (Sanity, Strapi, Contentful) introduce vendor lock-in, external subscription costs, or awkward schema limitations.
- **Decision:** Build a bespoke administrative CMS (**Creator Studio**) integrated directly into the Next.js application at `/studio`, backed by Supabase Auth and PostgreSQL CRUD operations.
- **Consequences:** Zero ongoing SaaS fees; perfect domain alignment with Yacine's exact entities; full control over draft/preview workflows and cache invalidation.

---

## ADR-005: Dual-Plane Experience Architecture
- **Date:** 2026-11-17
- **Status:** ACCEPTED
- **Context:** Developer portfolios typically suffer from an irreconcilable tension: creative 3D games frustrate time-constrained recruiters, while flat bulleted lists fail to convey vision, engineering depth, and storytelling.
- **Decision:** Implement a synchronized **Dual-Plane Narrative Architecture**:
  1. *Universe Explorer:* A cinematic, spatial interactive journey through project sectors and AI research.
  2. *Professional Dossier:* An instant, high-density, keyboard-navigable view tailored for technical leads and recruiters to evaluate qualifications in under 5 seconds.
- **Consequences:** Completely resolves the recruiter vs. builder tension; URL state synchronization (`/?view=dossier`) allows sending direct fast-track links.

---

## ADR-006: Media Architecture — Hybrid Managed Storage + External CDN Streaming
- **Date:** 2026-11-17
- **Status:** ACCEPTED
- **Context:** High-resolution videos and project demos consume substantial bandwidth and storage, rapidly exceeding free-tier hosting limits.
- **Decision:** Implement a hybrid media architecture:
  1. *Managed Storage (Supabase Storage):* Store optimized images (WebP/AVIF), verified degree scans, and static icons.
  2. *External CDN Streaming:* Embed video walkthroughs and origin story vlogs via unlisted YouTube or Vimeo players.
- **Consequences:** Preserves zero-cost hosting; guarantees smooth video streaming on global mobile networks without hitting storage limits.

---

## ADR-007: Visual Approach — Hybrid 2D Spatial Canvas with Selective 3D WebGL
- **Date:** 2026-11-17
- **Status:** ACCEPTED
- **Context:** Full 3D WebGL canvas implementations frequently drop frames, crash mobile GPUs, drain battery, and fail accessibility audits.
- **Decision:** Use a **Hybrid 2D + Selective 3D** approach:
  - 90% of spatial movement, layout, and card physics implemented via hardware-accelerated CSS and Canvas.
  - Three.js / WebGL utilized selectively for ambient celestial shaders and interactive constellation nodes, lazily loaded and feature-detected.
- **Consequences:** Guarantees 60fps performance on mid-tier mobile hardware; eliminates WebGL crashing risks.

---

## ADR-008: Hosting Model — Free-Tier-First Architecture
- **Date:** 2026-11-17
- **Status:** ACCEPTED
- **Context:** The owner requires a sustainable, production-grade deployment model without mandatory recurring monthly infrastructure expenses.
- **Decision:** Target **Vercel Hobby** (edge CDN, Next.js hosting, serverless functions) + **Supabase Free Tier** (500MB PostgreSQL, 1GB Storage, 50k monthly active users). Enforce bundle budgets ($< 200KB$ JS) and on-demand ISR to minimize compute execution time.
- **Consequences:** Operates at zero monthly cost; includes safeguards and monitoring to detect approaching quotas.

---

## ADR-009: Identity & Authorization — Single-Owner Authentication with Mandatory RLS
- **Date:** 2026-11-17
- **Status:** ACCEPTED
- **Context:** The platform serves one creator initially. Public visitors must never access administrative mutation endpoints or private drafts.
- **Decision:** Enforce single-owner administrative access via Supabase Auth. Mandate PostgreSQL Row Level Security (RLS) on 100% of tables: public `anon` role restricted to `SELECT` on published records; authenticated owner granted full CRUD.
- **Consequences:** Database-level security eliminates frontend authorization bypass vulnerabilities.

---

## ADR-010: Governance Protocol — Permanent Three-Face Autonomous Standard
- **Date:** 2026-11-17
- **Status:** ACCEPTED
- **Context:** Autonomous development requires disciplined oversight to prevent scope creep, architectural degradation, and security vulnerabilities.
- **Decision:** Permanently codify the Three-Face Autonomous Engineering Standard (Face 1: Software Architecture, Face 2: QA & Performance, Face 3: Defensive Application Security) with strict Product Owner stage exit gates.
- **Consequences:** Guarantees objective, multi-perspective quality and security validation across every task and deliverable.

---

## ADR-011: Complete Rebuild over Historical Codebase Migration
- **Date:** 2026-11-17
- **Status:** ACCEPTED
- **Context:** Audit of `portofolio-v5` revealed 1.41 MB bundle bloat, 5 conflicting UI libraries, 6 overlapping animation engines, and hardcoded Firebase keys.
- **Decision:** Completely rebuild the application from scratch in `Verse` rather than migrating or refactoring legacy template code. Reuse only verified content metadata and static SVG icons.
- **Consequences:** Eliminates all legacy technical debt; produces clean, modern, type-safe architecture.

---

## ADR-012: On-Demand ISR Cache Invalidation for Dynamic Content
- **Date:** 2026-11-17
- **Status:** ACCEPTED
- **Context:** Public visitors require instant page loads, but dynamic CMS updates must reflect immediately without full static rebuilds.
- **Decision:** Implement Next.js On-Demand Incremental Static Regeneration (ISR). Creator Studio mutation endpoints trigger `revalidatePath` and `revalidateTag` on publication.
- **Consequences:** Combines the speed of static CDN hosting with the immediacy of dynamic CMS publishing.

---

## ADR-013: Strict Accessibility & `prefers-reduced-motion` Parity
- **Date:** 2026-11-17
- **Status:** ACCEPTED
- **Context:** Atmospheric spatial animations can cause vestibular discomfort or motion sickness for sensitive users.
- **Decision:** Enforce mandatory `prefers-reduced-motion` detection across all Framer Motion and WebGL components. When enabled, disable camera fly-throughs, continuous floating, and intense parallax; replace with instantaneous, functional opacity cuts.
- **Consequences:** Full WCAG 2.1 AA accessibility compliance; guarantees an inclusive, comfortable experience for all visitors.

---

## ADR-014: Secure Inquiries — Serverless Endpoint with Bot Mitigation
- **Date:** 2026-11-17
- **Status:** ACCEPTED
- **Context:** Historical portfolio exposed personal email in plain HTML via FormSubmit, causing spam exposure.
- **Decision:** Replace FormSubmit with a serverless Next.js Server Action / Route Handler integrated with Cloudflare Turnstile bot verification and IP rate limiting. Store messages in a private Supabase `inquiries` table accessible only in Creator Studio.
- **Consequences:** Completely eliminates email scraper spam; provides clean inquiry telemetry in the Studio dashboard.
