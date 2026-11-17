# THE YACINEVERSE — PRODUCT SPECIFICATION

> **Document Status:** PROPOSAL / BASELINE SUBMITTED FOR OWNER APPROVAL  
> **Product Name:** THE YACINEVERSE  
> **Working Tagline:** *A journey through the mind of a builder.*  
> **Product Type:** Dynamic personal platform, immersive portfolio, professional dossier, and private content management system.  
> **Product Owner:** Yacine Abdelsoltane Kermame ("Kaaado")  
> **Primary Workspace:** `W:\Document\Verse`  
> **Target Repository:** `https://github.com/kaaado/Verse.git`  
> **Current Lifecycle Stage:** Stage 00 — Discovery & Workspace Organization (`IN_PROGRESS`)  
> **Specification Version:** 1.0.0 (Stage 0 Baseline)  
> **Date:** November 2026  

---

## 1. VISION AND PRODUCT IDENTITY

### 1.1 The Core Vision
> *"To transport every visitor into the intellectual, engineering, and entrepreneurial ecosystem of Yacine Kermame—letting them not merely observe what he has built, but experience how he thinks, solves complex systems problems, and creates tangible real-world impact under tight constraints."*

### 1.2 The Dual-Plane Architecture
Unlike conventional developer portfolios that force visitors into either a gimmicky, unnavigable 3D scene or a dry, linear bulleted resume, **THE YACINEVERSE** introduces a synchronized **Dual-Plane Experience**:

1. **Universe Explorer (Spatial Narrative Plane):**
   - An atmospheric, cinematic, interactive journey through the builder's universe.
   - Organizes work into thematic "Worlds" or "Sectors" (e.g. *Intelligent Systems & AI*, *Enterprise & Production Platforms*, *Applied Health & Hospital Tech*, *Field Innovations & AgroTech*, *Origin Stories & Milestones*).
   - Utilizes a hybrid 2D spatial canvas with selective, performant 3D WebGL accents, responsive physics, and cosmic-constructivist aesthetics.
   - Respects user accessibility: full support for `prefers-reduced-motion` with instant, clean 2D transitions.

2. **Professional Dossier (Executive Fast-Track Plane):**
   - A direct, high-density, structured view purpose-built for technical recruiters, engineering leaders, prospective partners, and clients.
   - Delivers verified metrics, tech stacks, GitHub commit links, live system links, architecture summaries, and downloadable credentials in under 3 clicks (sub-5-second evaluation).
   - Fully searchable, keyboard-navigable, and optimized for instant scanning.

3. **Creator Studio (Private Custom CMS):**
   - A secure, custom-built administrative dashboard that empowers the owner to manage the entire platform dynamically.
   - Full CRUD workflows for Projects, Professional Experiences, Skills & Technologies, Stories & Chronicles, Media Assets, Credentials, and Milestones.
   - Supports drafts, live preview, scheduled publishing, content relationships, SEO metadata, and instantaneous cache invalidation via Supabase and Next.js revalidation.
   - Ensures no ordinary content update requires touching application source code or triggering full deployments.

---

## 2. APPROVED PRODUCT DECISIONS

The following baseline decisions have been formally approved to govern technical planning:

| Dimension | Approved Decision | Engineering Rationale |
|---|---|---|
| **Workspace** | New independent workspace & repository (`Verse`) | Decouples cleanly from legacy template debt in `Portofolio-v5`. |
| **Framework** | Next.js App Router (TypeScript) | Server Components for SEO/performance; Client Components for spatial interactivity; native ISR/revalidation. |
| **Backend & Database** | Supabase (PostgreSQL) | Robust relational modeling, native Row Level Security (RLS), Supabase Auth, and Storage. |
| **CMS Engine** | Custom Creator Studio | Tailored information architecture without third-party CMS bloat, vendor lock-in, or monthly SaaS fees. |
| **Dynamic Content** | Fully dynamic via Supabase | Projects, experiences, skills, stories, media, and credentials queryable with instant cache revalidation. |
| **Media Architecture** | Hybrid: Managed Storage + External Media | Supabase Storage for critical brand assets/docs; external CDN/YouTube/Vimeo for heavy video streaming. |
| **Visual Approach** | Hybrid 2D + Selective 3D | High-fidelity CSS/SVG/Canvas 2D spatial canvas with lightweight, lazy-loaded Three.js accents for maximum 60fps mobile stability. |
| **Atmosphere** | Cinematic & Cosmic-Constructivist | Dark cosmic palette, neon/cyan accents, deep space gradients, elegant typography (`Inter`, `JetBrains Mono`). |
| **Hosting Model** | Free-tier-first | Vercel Hobby + Supabase Free Tier optimized to operate strictly within zero-cost quotas. |
| **Deployment** | Independent from old portfolio | Old portfolio (`portofoliokaaado.vercel.app`) remains untouched as fallback during development. |
| **Administration** | Single owner account initially | Hardened Supabase Auth restricted strictly to the owner UID with database-level RLS enforcement. |
| **Primary Outcomes** | Professional opportunities + Personal storytelling | Dual focus on high-value client/recruiter conversions and authentic builder narrative. |

---

## 3. AUDIENCES AND USER JOURNEYS

### 3.1 Primary Audiences
1. **Technical Recruiters & Talent Acquisition (Fast-Track Evaluators):**
   - *Goal:* Verify candidate qualifications, tech stack alignment, education, English/French proficiency, and contact info in under 60 seconds.
   - *Primary Journey:* Entry → Switch to **Professional Dossier** → Scan Experience & Education → Filter Projects by Stack (Laravel, Next.js, AI/Python) → Download CV / Copy Email.
2. **Engineering Leaders & CTOs (Deep Technical Evaluators):**
   - *Goal:* Evaluate architectural depth, code quality, system complexity, algorithmic rigor, and real-world problem-solving under constraints.
   - *Primary Journey:* Entry → Explore **Universe Explorer** → Inspect Flagship Projects (PassiLuce Octane/Swoole concurrency, Eph Meslem Tayeb RBAC, Agrovia IoT) → Click to Architecture Deep Dives → Inspect GitHub repositories.
3. **Clients, Founders & Commercial Partners (Business Impact Evaluators):**
   - *Goal:* Assess entrepreneurial track record, delivery reliability, full-stack capability, and product leadership.
   - *Primary Journey:* Entry → Explore Projects & Chronology → Read origin stories (Agrovia, Mukhayyami camp testing) → View client testimonials/recommendations → Submit direct contact inquiry.
4. **Product Owner (Yacine Kermame — Platform Administrator):**
   - *Goal:* Effortlessly manage projects, publish field updates, add newly acquired certificates, upload project media, and monitor inquiry telemetry.
   - *Primary Journey:* Login via `/studio` → Authenticate → Creator Studio Dashboard → Create/Edit Project → Upload Media → Toggle Publish → Instant Cache Invalidation on live universe.

---

## 4. VERIFIED OWNER PROFILE & CONTENT BASELINE

### 4.1 Verified Identity & Footprint
- **Full Legal Name:** Yacine Abdelsoltane Kermame [VERIFIED: Identity / Scanned Credentials]
- **Developer Handle:** Kaaado (`github.com/kaaado`) [VERIFIED: GitHub & Portfolio repository]
- **Location:** Mascara, Algeria [VERIFIED: Academic & Healthcare institutions]
- **Direct Contact:** `yacineyoyoker@gmail.com` | `+213 796 44 18 33` [VERIFIED: Legacy codebase & documents]
- **LinkedIn:** `linkedin.com/in/yacinekermam7` [VERIFIED: Active profile link]
- **Current Live Site:** `https://portofoliokaaado.vercel.app/` [VERIFIED: Active Vercel deployment]

### 4.2 Verified Academic Credentials
- **Master's Degree:** Master of Science in Computer Science — Intelligent Systems Engineering (*Systèmes Intelligents*), Université Mustapha Stambouli de Mascara. [VERIFIED]
- **Bachelor's Degree (Licence):** Computer Science (*Informatique*), Université Mustapha Stambouli de Mascara. [VERIFIED: Scanned degree `MxZXLgRegwrfT3tut0q1`]
- **NVIDIA Deep Learning Institute Credential:** Computer Vision / Deep Learning certification. [VERIFIED: Certificate `5nErK3BNrla3cSMaeszz`]

### 4.3 Verified Project Inventory (Extracted from Firestore & Codebase Audit)
1. **PassiLuce (`passiluce.com`):** Algerian Footwear E-Commerce. Full-stack production enterprise platform. High concurrency stack: Laravel 12, PHP 8.2, Octane (Swoole), Livewire, Alpine.js, SlickPay payment gateway, Yalidine logistics API. (*Tier 1 Flagship — VERIFIED*)
2. **Eph Meslem Tayeb:** Hospital Operations & Multi-role RBAC System for public hospital in Mascara. (*Tier 1 Flagship — VERIFIED*)
3. **El Omaraa Clinic:** Public portal and administrative clinic management dashboard for private medical facility in Mascara. (*Tier 2 Highlight — VERIFIED*)
4. **ChatIn:** Real-time messaging platform using React.js, Express, Node.js, Stream Chat API, and Twilio. (*Tier 2 Highlight — VERIFIED*)
5. **GymNight:** Fitness & workout tracking application built with React.js (`gymnight.vercel.app`). (*Tier 2 Highlight — VERIFIED*)
6. **3D Portfolio:** WebGL exploration with Three.js, React Three Fiber, React Three Drei, Framer Motion. (*Tier 2 Highlight — VERIFIED*)
7. **Stock Management System:** Inventory and stock control application built with React.js and Laravel. (*Tier 2 Highlight — VERIFIED*)
8. **Lab Projects (Tiers 2/3):** FitClub Gym, Shopping E-Commerce, Analytics Dashboard, ChatWay, QRWiz, Tasko, School Portal, Bondi Theme, Air Travel, Jokes App. (*VERIFIED in repository*)

### 4.4 Strategic Ventures & Field Innovations (Reported / In Discovery)
- **Agrovia & FARMER ERP:** Smart agricultural platform, IoT sensors, orchard harvest tracking, and offline-first ERP for Algerian producers. (*Founder & CTO — REPORTED / AUDITED IN .AGENT GOVERNANCE*)
- **Mukhayyami (CampApp):** Summer camp operations and child tracking platform field-tested with ~160 children. (*REPORTED — Requires Owner Confirmation of Dates & Outcome Metrics*)
- **GIZ Algeria Agripreneur / ProtoMarket II:** Agricultural entrepreneurship acceleration and prototype innovation showcases. (*REPORTED — Requires Confirmation of Cohort Year & Awards*)
- **AlgeriaBuilders / CERIST Collaboration:** National developer ecosystem and research infrastructure engagement. (*REPORTED — Requires Confirmation of Public Disclosure Permissions*)

---

## 5. FUNCTIONAL REQUIREMENTS

### 5.1 Public Platform (Universe Explorer & Dossier)
- **FR-01 (Dual View Navigation):** Immediate toggle between Universe Explorer and Professional Dossier with preserved state and seamless URL sync (`/` vs `/?view=dossier` or `/dossier`).
- **FR-02 (World Exploration):** Interactive spatial navigation through project sectors with zoom, pan, node expansion, and contextual preview cards.
- **FR-03 (Project Detail View):** Comprehensive project pages featuring problem statement, architecture diagrams, role/responsibilities, tech stack badges, live demo links, GitHub links, and challenge-resolution narratives.
- **FR-04 (Chronicle & Stories):** Narrative feed chronicling builder milestones, field experiments, reflections, and technical articles.
- **FR-05 (Search & Filter):** Instant multi-dimensional filtering across projects by Technology, Domain, Tier (Flagship vs Lab), and Role.
- **FR-06 (Verified Credential Viewer):** Interactive viewer for university degrees, certifications, and academic transcripts with verifiable metadata and high-res preview modals.
- **FR-07 (Secure Inquiries):** Contact inquiry form backed by serverless processing, rate limiting, input validation, and spam protection (Cloudflare Turnstile or similar).

### 5.2 Private Creator Studio (Custom CMS)
- **FR-08 (Secure Authentication):** Protected `/studio` route backed by Supabase Auth with session persistence and automatic redirection for unauthorized access.
- **FR-09 (Studio Dashboard):** High-level operational overview displaying publication status, recent edits, storage quota consumption, and quick action shortcuts.
- **FR-10 (Content Management CRUD):** Dedicated management interfaces for:
  - Projects (Metadata, Slugs, Tier, Featured Flag, Tech Stack relations, Live URLs, Repositories).
  - Experiences (Company, Role, Dates, Highlights, Achievements).
  - Skills (Categories, Proficiency level, Display priority, Icon mappings).
  - Chronicle Stories (Rich text / Markdown editor, Excerpts, Read time, Tags).
  - Credentials & Certifications (Issuer, Date, Image URL, Verification link).
- **FR-11 (Draft & Live Preview):** Ability to draft content privately and preview its exact rendering in the Universe Explorer before publishing.
- **FR-12 (Instant Cache Invalidation):** Publishing or updating content triggers on-demand Next.js ISR revalidation (`revalidatePath` / `revalidateTag`) so live visitors see updates instantly without site rebuilding.
- **FR-13 (Media Library Manager):** Drag-and-drop media uploader to Supabase Storage with automatic WebP conversion, file-size enforcement, and copyable CDN URLs.

---

## 6. NON-FUNCTIONAL REQUIREMENTS

- **NFR-01 (Performance):** Sub-1.5s Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS) < 0.05, First Input Delay / Interaction to Next Paint (INP) < 150ms. 60fps animations on mid-tier hardware.
- **NFR-02 (Accessibility):** Conformance with WCAG 2.1 Level AA. Strict adherence to `prefers-reduced-motion` across all Canvas/WebGL and Framer Motion transitions. Full keyboard navigability in Professional Dossier and Studio.
- **NFR-03 (Responsiveness):** Flawless fluid layout across mobile ($320px - 639px$), tablet ($640px - 1023px$), desktop ($1024px - 1439px$), and wide displays ($\ge 1440px$).
- **NFR-04 (Security):** Supabase PostgreSQL Row Level Security (RLS) on 100% of tables. Zero client-side exposure of `SUPABASE_SERVICE_ROLE_KEY`. CSRF and XSS protection on all form inputs and markdown renderers.
- **NFR-05 (Free-Tier Efficiency):** Keep initial bundle weight $< 200KB$ gzipped. Database queries optimized with foreign key indexes. Image delivery served via responsive modern formats (AVIF/WebP) to operate comfortably within Vercel and Supabase free-tier limits.
- **NFR-06 (SEO & Discoverability):** Dynamic Open Graph images, Twitter cards, semantic JSON-LD structured data (`Person`, `SoftwareSourceCode`, `CreativeWork`), canonical URLs, and automated `sitemap.xml`.

---

## 7. NON-GOALS (WHAT WE ARE NOT BUILDING)

- **NG-01 (Generic Page Builder):** Creator Studio is not a drag-and-drop block builder like WordPress or Wix. It is a structured content management system for defined domain entities.
- **NG-02 (Heavy Video Game Experience):** We will NOT build an unplayable, heavy 3D game with WASD controls that melts mobile phones and blocks recruiters from viewing credentials.
- **NG-03 (Unauthenticated Public Forum):** We will NOT maintain the legacy unauthenticated comment board that is prone to spam. Visitor inquiries are private direct messages.
- **NG-04 (Multi-Tenant Platform):** THE YACINEVERSE is built exclusively for one builder. We are not building a multi-user portfolio SaaS.

---

## 8. STAGED LIFECYCLE ROADMAP

```text
Stage 00: Discovery & Workspace Organization (ACTIVE)
    └── Phase 00: Workspace Governance
    └── Phase 01: Existing Portfolio Audit
    └── Phase 02: Product Discovery
    └── Phase 03: Discovery Synthesis
    [APPROVAL GATE: Owner Approval to Enter Stage 01]

Stage 01: Product Definition & Approval (PLANNED)
    └── Phase 00: Product Strategy & Scope Boundaries
    └── Phase 01: Experience & Information Architecture
    └── Phase 02: Functional Requirements & CMS Workflows
    └── Phase 03: Product Specification Validation & Sign-Off
    [APPROVAL GATE: Owner Approval of Final Product.md]

Stage 02: Technical Architecture & Engineering Design (PLANNED)
    └── Phase 00: Next.js App Router Architecture
    └── Phase 01: Relational Database & Content Architecture
    └── Phase 02: Security, Identity & RLS Matrix
    └── Phase 03: Media, Publishing & Hosting Architecture
    └── Phase 04: Three-Face Engineering Validation
    [APPROVAL GATE: Owner Approval of Architecture Plan]

Stage 03: Experience, Design System & Prototyping (PLANNED)
    └── Phase 00: Creative Direction & Design Tokens
    └── Phase 01: Public Experience & Spatial Design
    └── Phase 02: Creator Studio UI & Form Design
    └── Phase 03: Motion & Interaction Prototype Validation
    [APPROVAL GATE: Owner Approval of Visual System]

Stage 04: Implementation (PLANNED)
    └── Phase 00: Engineering Foundation & Tooling
    └── Phase 01: Supabase Backend & RLS Implementation
    └── Phase 02: Creator Studio Implementation
    └── Phase 03: Public Platform (Universe & Dossier)
    └── Phase 04: Motion, 3D Integration & Optimization
    └── Phase 05: Three-Face Engineering Implementation Review
    [APPROVAL GATE: Owner Approval of Feature-Complete Build]

Stage 05: Verification, Release & Handover (PLANNED)
    └── Phase 00: Functional & Integration QA
    └── Phase 01: Security, Privacy & RLS Penetration Testing
    └── Phase 02: Experience, Accessibility & CWV Performance QA
    └── Phase 03: Hosting, Domain & Deployment Validation
    └── Phase 04: Operational Handover & Production Launch
    [APPROVAL GATE: Owner Authorization to Launch]
```

---

## 9. OPEN QUESTIONS AND DECISIONS REQUIRED FROM OWNER

1. **Agrovia & FARMER ERP Public Disclosure:** Which architecture details, screenshots, and metrics are authorized for public showcase?
2. **Mukhayyami (CampApp) Validation:** Confirm field-test dates, organization name, and publishable outcome metrics.
3. **Domain Name Strategy:** Confirm whether the final production domain will be `yacineverse.com`, `kaaado.dev`, a custom subdomain on Vercel, or another custom domain.
4. **Third-Party Video Hosting:** Confirm preference for video embeds (YouTube unlisted / Vimeo vs. self-hosted video clips in Supabase Storage).
5. **Stage 00 Sign-Off:** Review the Stage 00 Discovery Report and authorize progression to Stage 01 (Product Definition & Approval).
