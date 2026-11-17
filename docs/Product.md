# THE YACINEVERSE — PRODUCT SPECIFICATION

> **Document Status:** PROPOSAL / STAGE 01 SPECIFICATION (PENDING OWNER APPROVAL)  
> **Product Name:** THE YACINEVERSE  
> **Working Tagline:** *A journey through the mind of a builder.*  
> **Product Type:** Dynamic personal platform, immersive portfolio, professional dossier, and private content management system.  
> **Product Owner:** Yacine Abdelsoltane Kermame ("Kaaado")  
> **Primary Workspace:** `W:\Document\Verse`  
> **Target Repository:** `https://github.com/kaaado/Verse.git`  
> **Active Lifecycle Stage:** Stage 01 — Product Definition & Approval (`REVIEW_REQUIRED`)  
> **Prior Lifecycle Stage:** Stage 00 — Discovery & Workspace Organization (`COMPLETED`)  
> **Specification Version:** 2.0.0 (Stage 01 Final Proposal)  
> **Date:** November 2026  

---

## 1. VISION AND STRATEGIC POSITIONING

### 1.1 The Core Vision
> *"To transport every visitor into the intellectual, engineering, and entrepreneurial ecosystem of Yacine Kermame—letting them not merely observe what he has built, but experience how he thinks, solves complex systems problems, and creates tangible real-world impact under tight constraints."*

### 1.2 Multi-Audience Strategic Positioning
- **For Fast-Track Technical Recruiters:** An instantly scannable, verifiable proof-of-competence validating full-stack TypeScript/Next.js, Laravel/PHP, AI systems, and distributed architectures within a sub-45-second evaluation path.
- **For CTOs & Engineering Leaders:** An interactive case study demonstrating architectural depth, high-concurrency systems (PassiLuce Octane/Swoole), hospital RBAC, and offline-first agricultural engineering.
- **For Founders & Prospective Partners:** Proof of an entrepreneurial builder who drives products from zero to production under real-world market and infrastructure constraints.

---

## 2. APPROVED PRODUCT BASELINE

The following baseline decisions govern technical and product planning:

| Dimension | Approved Decision | Engineering Rationale |
|---|---|---|
| **Workspace** | Independent new project (`Verse`) | Decouples cleanly from legacy template debt in historical portfolio. |
| **Framework** | Next.js App Router (TypeScript) | React Server Components for SEO/performance; Client Components for spatial interactivity; native on-demand ISR. |
| **Backend & Database** | Supabase (PostgreSQL) | Robust relational modeling, native Row Level Security (RLS), Supabase Auth, and Storage. |
| **CMS Engine** | Custom Creator Studio | Tailored administrative CMS without third-party vendor lock-in or recurring SaaS subscriptions. |
| **Dynamic Content** | Fully dynamic via Supabase | Projects, experiences, skills, stories, media, and credentials queryable with instant cache revalidation. |
| **Media Architecture** | Hybrid: Managed Storage + External CDN | Supabase Storage for brand graphics and verified degrees; external CDN/YouTube for heavy video walkthroughs. |
| **Visual Approach** | Hybrid 2D + Selective 3D | High-fidelity CSS/Canvas 2D spatial canvas with lightweight Three.js accents for maximum 60fps mobile stability. |
| **Atmosphere** | Cinematic & Cosmic-Constructivist | Dark cosmic palette, neon/cyan accents, deep space gradients, elegant typography (`Inter`, `JetBrains Mono`). |
| **Hosting Model** | Free-tier-first | Vercel Hobby + Supabase Free Tier optimized to operate strictly within zero-cost quotas. |
| **Deployment** | Independent from old portfolio | Old portfolio (`portofoliokaaado.vercel.app`) remains untouched as fallback during development. |
| **Administration** | Single owner account initially | Hardened Supabase Auth restricted strictly to the owner UID with database-level RLS enforcement. |

---

## 3. AUDIENCES AND USER JOURNEYS

### 3.1 Primary Audience Personas
1. **Audience A — Fast-Track Technical Recruiters:**
   - *Time Budget:* 30–60 seconds.
   - *Key Objectives:* Verify core tech stack, years of experience, degree credentials, English/French proficiency, download PDF CV, copy contact email.
   - *Preferred Interface:* **Professional Dossier** with instant client-side tech stack filtering.
2. **Audience B — CTOs & Engineering Leaders:**
   - *Time Budget:* 3–10 minutes.
   - *Key Objectives:* Evaluate architectural depth, code quality, system complexity, algorithmic rigor, and real-world problem-solving under constraints.
   - *Preferred Interface:* **Universe Explorer** project deep dives + Dossier architecture notes.
3. **Audience C — Prospective Founders & Enterprise Clients:**
   - *Time Budget:* 2–5 minutes.
   - *Key Objectives:* Assess entrepreneurial track record, delivery reliability, full-stack capability, and product leadership.
   - *Preferred Interface:* Universe Explorer storytelling feed + Flagship showcases.
4. **Audience D — Product Owner (Yacine Kermame — Platform Administrator):**
   - *Key Objectives:* Effortlessly manage projects, publish field updates, add newly acquired certificates, upload media, and monitor inquiry telemetry.
   - *Preferred Interface:* **Creator Studio** CMS.

### 3.2 Formal User Journeys
- **Journey 01 (Fast Recruiter Evaluation):**
  1. Land on `/` → Automatic detection of `?view=dossier` or one-click toggle button.
  2. Scan executive summary & tech stack badges in $< 10s$.
  3. Filter projects by tech stack (e.g. Next.js, AI, Laravel).
  4. Click verified degree modal to inspect academic credentials.
  5. Click "Download CV (PDF)" or click email button (copies to clipboard with toast confirmation). Total elapsed time: $< 45$ seconds.
- **Journey 02 (Deep Technical Teardown):**
  1. Land on `/` in Universe Explorer view.
  2. Explore spatial canvas; click Sector 02 (Production Platforms).
  3. Select *PassiLuce*; click "Deep Dive Case Study".
  4. Read architecture breakdown (Laravel 12, Octane Swoole concurrency, SlickPay payment flow).
  5. Click GitHub repository link to inspect real commit history.
- **Journey 03 (Builder Story Discovery):**
  1. Select Sector 04 (AgroTech); view *Agrovia & FARMER ERP*.
  2. Open Chronicle story on offline orchard synchronization.
  3. Read authentic field test narrative and hardware/cellular constraints.
  4. Open Contact modal to initiate collaboration inquiry.
- **Journey 04 (Owner Publishing Flow):**
  1. Access `/studio` → Login with Supabase credentials.
  2. Navigate to `/studio/projects` → Click "New Project".
  3. Fill form, select skills, drag-and-drop cover image to upload.
  4. Click "Save Draft" → Click "Preview in Universe" (opens private preview modal).
  5. Click "Publish" → Supabase updates record; Next.js triggers on-demand ISR revalidation → Live visitors see update instantly.

---

## 4. EXPERIENCE & INFORMATION ARCHITECTURE

### 4.1 Universe Explorer (Spatial Narrative Plane)
- **Central Nexus:** Ambient coordinate origin ($[0, 0]$) anchoring the builder's philosophical and technical identity.
- **5 Thematic World Sectors:**
  1. *Sector 01 — Intelligent Systems & AI:* Academic thesis, computer vision research, NVIDIA DLI credentials, neural network experiments.
  2. *Sector 02 — Production Platforms & High-Concurrency:* Flagship enterprise software, PassiLuce (Laravel 12, Octane Swoole, national payment/logistics APIs), high-throughput architectures.
  3. *Sector 03 — Healthcare & Hospital Infrastructure:* Public health digitalization, Eph Meslem Tayeb Hospital RBAC, El Omaraa Clinic portal.
  4. *Sector 04 — AgroTech & Field Systems:* Agrovia, FARMER ERP offline orchard management, IoT sensors, hardware constraints.
  5. *Sector 05 — The Lab & Experimental Sandboxes:* Micro-utilities, ChatIn, GymNight, 3D WebGL experiments, algorithmic prototypes.
- **4-Level Node Depth Hierarchy:**
  - *Level 1 (Sector Node):* Thematic sphere with ambient glow and summary metrics.
  - *Level 2 (Project Cluster):* Group of related initiatives within the sector.
  - *Level 3 (Project Entity):* Interactive card displaying title, role, tech stack badges, live link, and deep dive modal trigger.
  - *Level 4 (Case Study Modal / Page):* Comprehensive architecture breakdown, problem narrative, and code links.
- **Multi-Modal Controls:** Mouse drag/zoom, touch gestures, full keyboard navigation (WASD / Arrows / `Enter` / `Esc`), and a fixed HUD Sector Radar overlay.
- **Motion Parity:** When `prefers-reduced-motion` is enabled, smooth camera lerp transitions are replaced with instantaneous, functional crossfade cuts.

### 4.2 Professional Dossier (Executive Fast-Track Plane)
- Single-page, high-density executive layout:
  - Header with verified identity, Master's degree, availability badge, and quick action buttons (Download CV, Copy Email, Schedule Inquiry).
  - Categorized Tech Stack Matrix (Languages, Frontend, Backend, AI/ML, Databases, Systems/DevOps) that double as instant project filter triggers.
  - Chronological career experience timeline with measurable bulleted achievements.
  - Dense tabular project grid with direct GitHub and live demo links.
  - Verifiable university degrees and NVIDIA certification with instant high-res modal viewer.
  - Keyboard shortcut `D` (Dossier), `U` (Universe), `/` (Search). Direct URL: `/?view=dossier` or `/dossier`.

### 4.3 Creator Studio (Private Custom CMS)
- Layout adhering strictly to `dashboard-design` skill standards:
  - Collapsible left sidebar navigation (`Dashboard`, `Projects`, `Experiences`, `Skills`, `Chronicle`, `Credentials`, `Media Library`, `Inquiries`, `Settings`).
  - Overview telemetry cards: Published Projects, Storage Quota consumed, Unread Inquiries, and Activity Ledger.
  - High-density data tables with right-aligned numeric metadata, tabular figures, and status badges (`draft`, `published`, `archived`).
  - Form editors with real-time validation, markdown editors with split-screen preview, and media pickers.
  - Protected behind Supabase Auth middleware at `/studio`.

---

## 5. FUNCTIONAL REQUIREMENTS

### 5.1 Public Platform (Universe Explorer & Dossier)
- **FR-01 (Dual View Navigation):** Immediate toggle between Universe Explorer and Professional Dossier with preserved state and URL synchronization (`/?view=dossier`).
- **FR-02 (World Exploration):** Interactive spatial navigation through project sectors with zoom, pan, node expansion, and contextual preview cards.
- **FR-03 (Project Detail View):** Comprehensive project pages featuring problem statement, architecture diagrams, role/responsibilities, tech stack badges, live demo links, GitHub links, and challenge-resolution narratives.
- **FR-04 (Chronicle & Stories):** Narrative feed chronicling builder milestones, field experiments, reflections, and technical articles.
- **FR-05 (Search & Multi-Filtering):** Instant client-side search ($< 10ms$) and multi-dimensional filtering across projects by Technology, Domain, Tier (Flagship vs Lab), and Role.
- **FR-06 (Verified Credential Viewer):** Interactive viewer for university degrees, certifications, and academic transcripts with verifiable metadata and high-res preview modals.
- **FR-07 (Secure Inquiries):** Contact inquiry form backed by serverless processing, rate limiting, input validation, and Cloudflare Turnstile bot protection.

### 5.2 Private Creator Studio (Custom CMS)
- **FR-08 (Secure Authentication):** Protected `/studio` route backed by Supabase Auth with session persistence and automatic redirection for unauthorized access.
- **FR-09 (Studio Dashboard):** High-level operational overview displaying publication status, recent edits, storage quota consumption, and quick action shortcuts.
- **FR-10 (Content Management CRUD):** Dedicated management interfaces for:
  - Projects (Metadata, Slugs, Tier, Featured Flag, Tech Stack relations, Live URLs, Repositories).
  - Experiences (Company, Role, Dates, Highlights, Achievements).
  - Skills (Categories, Proficiency level, Display priority, Icon mappings).
  - Chronicle Stories (Rich text / Markdown editor, Excerpts, Read time, Tags).
  - Credentials & Certifications (Issuer, Date, Image URL, Verification link).
- **FR-11 (Draft & Live Preview):** Ability to draft content privately and preview its exact rendering in the Universe Explorer before publishing using Next.js Draft Mode.
- **FR-12 (Instant Cache Invalidation):** Publishing or updating content triggers on-demand Next.js ISR revalidation (`revalidatePath` / `revalidateTag`) so live visitors see updates in $< 200ms$ without site rebuilding.
- **FR-13 (Media Library Manager):** Drag-and-drop media uploader to Supabase Storage with magic-byte MIME validation, SVG sanitization, and copyable CDN URLs.

---

## 6. NON-FUNCTIONAL REQUIREMENTS & PERFORMANCE BUDGETS

- **NFR-01 (Performance):** Sub-1.5s Largest Contentful Paint (LCP) on desktop, sub-2.0s on 4G mobile; Cumulative Layout Shift (CLS) $< 0.05$; Interaction to Next Paint (INP) $< 150ms$; initial JavaScript bundle $< 200KB$ gzipped; sustained 60fps animations during spatial canvas pan/zoom.
- **NFR-02 (Accessibility):** 100% conformance with WCAG 2.1 Level AA. Strict adherence to `prefers-reduced-motion` across all Canvas/WebGL and Framer Motion transitions. Full keyboard navigability in Professional Dossier and Studio.
- **NFR-03 (Responsiveness):** Flawless fluid layout across mobile ($< 640px$), tablet ($640px - 1023px$), desktop ($1024px - 1439px$), and wide displays ($\ge 1440px$). Minimum touch target size: $44 \times 44px$.
- **NFR-04 (Security):** Supabase PostgreSQL Row Level Security (RLS) on 100% of tables. Zero client-side exposure of `SUPABASE_SERVICE_ROLE_KEY`. CSRF, XSS protection, and magic-byte upload validation.
- **NFR-05 (Free-Tier Efficiency):** Keep storage consumption comfortably within Supabase 1GB limit and bandwidth within Vercel 100GB monthly limit. Database queries indexed on foreign keys and slugs.
- **NFR-06 (SEO & Discoverability):** Dynamic Open Graph images, Twitter cards, semantic JSON-LD structured data (`Person`, `SoftwareSourceCode`, `CreativeWork`, `Article`), canonical URLs, and automated `sitemap.xml`.

---

## 7. NON-GOALS & RELEASE BOUNDARIES

### 7.1 Explicit Non-Goals
- **NG-01 (Generic Page Builder):** Creator Studio is not a drag-and-drop block builder (Wix/WordPress). It manages structured domain entities.
- **NG-02 (Heavy Video Game):** We will NOT build an unplayable, heavy 3D game with WASD controls that melts mobile phones and blocks recruiters.
- **NG-03 (Unauthenticated Public Forum):** We will NOT maintain an unauthenticated public comment board. Inquiries are private, rate-limited direct messages.
- **NG-04 (Multi-Tenant SaaS):** THE YACINEVERSE is exclusively built for Yacine Kermame. It is not a multi-user portfolio builder.

### 7.2 Release Scope Boundaries
- **Release 1.0 (MVP Scope — Stages 01–05):**
  - Dual-Plane Experience: Universe Explorer + Professional Dossier.
  - Content Foundation: 17 cataloged projects (Flagships, Highlights, Lab apps).
  - Academic Credentials: 4 verified degrees/certifications with high-res modal viewer.
  - Chronicle: 4 signature builder stories (PassiLuce, Mascara Hospital, Agrovia, Mukhayyami).
  - Creator Studio CMS: Secure single-owner dashboard with full CRUD and ISR cache invalidation.
  - Inquiries: Secure contact modal with Turnstile and rate limiting.
  - SEO: Dynamic OpenGraph, JSON-LD schemas, and automated sitemap.
- **Release 2.0 (Post-Launch Backlog):**
  - Fully interactive 3D WebGL constellation graph with custom particle physics.
  - Visitor newsletter subscription engine.
  - Multilingual internationalization (Arabic RTL / French / English).
  - Advanced telemetry heatmaps in Creator Studio.

---

## 8. STAGED LIFECYCLE ROADMAP

```text
Stage 00: Discovery & Workspace Organization (COMPLETED)
    └── Phase 00: Workspace Governance (COMPLETED)
    └── Phase 01: Existing Portfolio Audit (COMPLETED)
    └── Phase 02: Product Discovery (COMPLETED)
    └── Phase 03: Discovery Synthesis (COMPLETED)
    [APPROVAL GATE: Passed — Owner Authorized Stage 01]

Stage 01: Product Definition & Approval (REVIEW_REQUIRED)
    └── Phase 00: Product Strategy & Scope Boundaries (COMPLETED)
    └── Phase 01: Experience & Information Architecture (COMPLETED)
    └── Phase 02: Functional Requirements & CMS Workflows (COMPLETED)
    └── Phase 03: Product Specification Validation & Sign-Off (REVIEW_REQUIRED)
    [APPROVAL GATE: Pending Owner Review & Approval of docs/Product.md]

Stage 02: Technical Architecture & Engineering Design (REVIEW_REQUIRED)
    └── Phase 00: Next.js App Router Architecture (COMPLETED)
    └── Phase 01: Relational Database & Content Architecture (COMPLETED)
    └── Phase 02: Security, Identity & RLS Matrix (COMPLETED)
    └── Phase 03: Media, Publishing & Hosting Architecture (COMPLETED)
    └── Phase 04: Three-Face Engineering Validation (COMPLETED)
    [APPROVAL GATE: Pending Owner Review & Approval of Stage 02 Architecture]

Stage 03: Experience, Design System & Prototyping (NOT_STARTED)
    └── Phase 00: Creative Direction & Design Tokens
    └── Phase 01: Public Experience & Spatial Design
    └── Phase 02: Creator Studio UI & Form Design
    └── Phase 03: Motion & Interaction Prototype Validation
    [APPROVAL GATE: Owner Approval of Visual System]

Stage 04: Implementation (NOT_STARTED)
    └── Phase 00: Engineering Foundation & Tooling
    └── Phase 01: Supabase Backend & RLS Implementation
    └── Phase 02: Creator Studio Implementation
    └── Phase 03: Public Platform (Universe & Dossier)
    └── Phase 04: Motion, 3D Integration & Optimization
    └── Phase 05: Three-Face Engineering Implementation Review
    [APPROVAL GATE: Owner Approval of Feature-Complete Build]

Stage 05: Verification, Release & Handover (NOT_STARTED)
    └── Phase 00: Functional & Integration QA
    └── Phase 01: Security, Privacy & RLS Penetration Testing
    └── Phase 02: Experience, Accessibility & CWV Performance QA
    └── Phase 03: Hosting, Domain & Deployment Validation
    └── Phase 04: Operational Handover & Production Launch
    [APPROVAL GATE: Owner Authorization to Launch]
```

---

## 9. OPEN OWNER DECISIONS & SUBMISSION PACKAGE

The following items are presented to the Product Owner for final confirmation alongside Stage 01 sign-off:

1. **Agrovia & FARMER ERP Public Showcase:** Recommend showcasing architectural engineering diagrams, offline sync mechanics, and technology stack while masking specific client farm financial totals. *(Confirm approval).*
2. **Mukhayyami (CampApp) Validation:** Recommend including the field-tested summer camp management system (~160 children) as an applied systems case study. *(Confirm approval).*
3. **Production Domain Target:** Recommend `yacineverse.com` as the primary production brand with fallback to `kaaado.dev` or Vercel subdomain during development. *(Confirm preference).*
4. **Video Hosting Preference:** Recommend external unlisted YouTube / Vimeo players for long video walkthroughs to protect Supabase free-tier storage, reserving Supabase Storage for short looping WebM UI clips ($< 5MB$). *(Confirm approval).*
5. **Stage 01 Sign-Off:** Formally approve this `docs/Product.md` specification to authorize the commencement of **Stage 02: Technical Architecture & Engineering Design**.
