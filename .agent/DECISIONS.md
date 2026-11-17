# Architecture Decision Records (ADRs) — Farmer ERP

## ADR Status Legend
- **Accepted Direction:** Product Owner approved strategic direction; detailed technical design pending evidence and approval.
- **Accepted:** Formally approved by Product Owner and verified in codebase.
- **Proposed Implementation:** Concrete technical proposal awaiting Product Owner approval.
- **Superseded:** Replaced by a subsequent decision.
- **Rejected:** Evaluated and declined with documented rationale.

---

## ADR-000: Baseline Repository Inventory & Workspace Structure
- **Date:** 2026-10-15 (Reconciled 2026-10-16)
- **Status:** Accepted
- **Context:** An initial prototype built with Flutter and SQLite was located at the root of the repository alongside miscellaneous documents.
- **Decision:**
  1. Relocate the complete Flutter mobile application into `mobile/` as a coherent project without altering its code, features, or dependencies.
  2. Reserve the root `web/` directory for the future read-only investor web portal (Phase E).
  3. Reconcile engineering governance rules under `.agent/` and audit findings under `conception/`.
- **Consequences:** Provides clean workspace boundaries for mobile and web components while preserving Git history and prototype functionality.
- **Owner / Approval:** Product Owner approved.

---

## ADR-001: Incremental Flutter Modularization vs. Rewrite
- **Date:** 2026-10-17
- **Status:** Accepted Direction
- **Context:** The existing mobile prototype is written in Flutter/Dart using GetX (`GetBuilder`, manual `update()`) and direct raw SQLite database queries. While it has technical debt (compile errors in legacy debtor screens, lack of a repository layer, direct SQL in controllers), rewriting the app from scratch risks discarding working UI layouts, Arabic typography, and functional operational workflows.
- **Options Considered:**
  1. *Full Application Rewrite:* Discard prototype, re-implement from scratch with BLoC/Riverpod (Rejected: high risk, discards working UI, unjustified timeline inflation).
  2. *Incremental Modularization (Selected):* Preserve existing working UI and workflows; introduce a feature-first modular structure with presentation, application, domain, and data layers; adopt NestJS-inspired modularity, dependency injection, and explicit repository interfaces adapted to Flutter.
- **Consequences:** Existing working screens (Dashboard, Projects, Groups, Day Closing) remain operational while data access is incrementally decoupled from UI and routed through repository interfaces.
- **Evidence Still Required:** Detailed module dependency graph, repository interface specifications, and migration sequence planned in Phase B.
- **Owner / Approval:** Confirmed Product Owner Decision.

---

## ADR-002: SQLite as Local Persistence Layer for Offline Mobile Operations
- **Date:** 2026-10-17
- **Status:** Accepted Direction
- **Context:** Field managers operate in agricultural zones with intermittent or nonexistent cellular connectivity. The mobile app must operate reliably offline for day-to-day work logging, harvest income, expenses, and debtor tracking.
- **Options Considered:**
  1. *SQLite via sqflite (Selected):* Proven relational engine, robust transactional guarantees, already integrated in prototype (`orchard_manager.db`).
  2. *NoSQL / Key-Value (Hive, Isar):* Fast, but poor relational integrity and complex migration for relational accounting data.
  3. *Cloud-first with local cache:* Fails offline-first requirement; high risk of lockout and data loss.
- **Consequences:** Schema migrations must be strictly versioned (`onUpgrade`). Primary keys must evolve from local autoincrement integers to client-generated UUIDs (UUID v4/v7) to prevent cross-device collision during future sync.
- **Evidence Still Required:** Migration path from integer autoincrement IDs to UUIDs; transactional outbox schema design.
- **Owner / Approval:** Confirmed Product Owner Decision.

---

## ADR-003: Supabase as Initial Managed Backend Platform
- **Date:** 2026-10-17
- **Status:** Superseded — by ADR-012 (2026-10-22)
- **Context:** An initial backend platform is required for prototype and early MVP phases to support cloud backup, multi-device synchronization, user authentication, and investor dashboard reporting.
- **Supersession Note:** The Product Owner permanently rejected the Supabase approach during Phase C planning. All production backend work must use Laravel + PostgreSQL (ADR-012). This ADR is retained for historical traceability only.
- **Options Considered:**
  1. *Supabase Managed Backend (Selected):* Managed PostgreSQL, robust built-in authentication, Row Level Security (RLS) for tenant isolation, storage, and serverless Edge Functions. Accelerates prototype/MVP delivery without infrastructure overhead.
  2. *Custom NestJS from scratch:* Higher initial setup cost, custom auth and infrastructure maintenance before domain requirements stabilize.
  3. *Firebase Firestore:* Document-oriented NoSQL; poor fit for complex relational farm accounting, audit trails, and multi-farm aggregations.
- **Consequences:** Backend authorization will be enforced at the PostgreSQL level via RLS. Client-side Flutter code must interface with backend services through repository/service abstractions to avoid vendor lock-in.
- **Evidence Still Required:** PostgreSQL relational schema design, RLS policy definitions, and serverless Edge Function boundaries.
- **Owner / Approval:** Confirmed Product Owner Decision.

---

## ADR-004: React + Vite for Future Investor Web Dashboard
- **Date:** 2026-10-17 (Reconfirmed 2026-10-23)
- **Status:** Accepted
- **Context:** Farm investors and owners require a high-performance, desktop-optimized web portal for consolidated metrics, financial reports, multi-farm comparison, and audit oversight.
- **Options Considered:**
  1. *React + Vite SPA (Selected):* Fast load times, mature ecosystem for data visualization/charts, clean integration with Supabase/PostgreSQL backend contracts.
  2. *Flutter Web:* Larger initial bundle size, inferior desktop web accessibility and SEO compared to standard web stacks.
  3. *Next.js (SSR):* Viable, but adds SSR hosting complexity when a lightweight SPA against managed APIs suffices for initial scope.
- **Consequences:** Web code will reside in root `web/` and share the same trusted backend API contracts and authorization models as the mobile client.
- **Evidence Still Required:** Web portal prototype specifications and API schema contracts in Phase B.
- **Owner / Approval:** Confirmed Product Owner Decision.

---

## ADR-005: NestJS as Possible Later Backend Evolution
- **Date:** 2026-10-17
- **Status:** Superseded — by ADR-013 (2026-10-22)
- **Context:** As business complexity grows (custom ERP workflows, complex agricultural analytics, enterprise integrations), a dedicated NestJS backend service may become desirable.
- **Supersession Note:** With the selection of Laravel as the production backend framework (ADR-011, ADR-012), the NestJS evaluation pathway is no longer applicable. All backend work must use Laravel. This ADR is retained for historical traceability only.
- **Options Considered:**
  1. *Immediate NestJS implementation:* Premature; diverts focus from mobile prototype hardening and offline core.
  2. *NestJS as evaluated later evolution (Selected):* Minimize client-side coupling to Supabase APIs. In later phases, evaluate whether NestJS coexists with Supabase, replaces selected backend duties, or fronts the same managed PostgreSQL database.
- **Consequences:** Target architecture must define clean API contracts and data models so backend evolution does not require Flutter mobile rewrites.
- **Evidence Still Required:** Comparative complexity analysis in Phase E/F before considering any backend migration.
- **Owner / Approval:** Confirmed Product Owner Decision.

---

## ADR-006: Multi-Tenant Ownership & Farm-Scoped Membership Model
- **Date:** 2026-10-17
- **Status:** Accepted Direction
- **Context:** Agricultural operations involve investor accounts owning multiple farms, with managers assigned to one or more farms, and future roles (accountants, supervisors).
- **Options Considered:**
  1. *Single-farm local silo (Prototype baseline):* Records belong to device, no cross-farm or owner oversight.
  2. *Account-owned Farms with Membership Model (Selected):* Investor/account owns farms. Farm memberships grant users access to individual farms. One user may belong to multiple farms with distinct, farm-scoped permissions.
- **Consequences:** All operational tables (`projects/farms`, `work_logs`, `expenses`, `daily_income`, `debtors`, `inventory`) must include `farm_id`. Authorization must be enforced on the trusted backend via Laravel multi-tenancy middleware and PostgreSQL query scoping — not via client-side checks.
- **Evidence Still Required:** Schema specification for `organizations`, `farms`, `farm_memberships`, `users`, and Laravel multi-tenancy middleware isolation tests.
- **MVP Scope Note:** In the MVP, system users are: (1) Farm Owner/Investor (read-only web dashboard) and (2) Farm Manager (operational mobile app). Workers/employees are **managed entities, not system users** — no employee login exists in the MVP. Future roles (Accountant, Supervisor, Seasonal Clerk) are explicitly post-MVP.
- **Owner / Approval:** Confirmed Product Owner Decision.

---

## ADR-007: Built-in Roles Initially, Configurable Roles Designed for Later
- **Date:** 2026-10-17
- **Status:** Accepted Direction
- **Context:** The system needs immediate clear role boundaries between Owners/Investors and Farm Managers, but must allow future granular roles (e.g., Accountant, Field Supervisor, Seasonal Clerk).
- **Options Considered:**
  1. *Hardcoded boolean flags (e.g. `is_admin`, `is_manager`):* Brittle, cannot scale to new roles.
  2. *Dynamic RBAC from Day 1:* Over-engineered for early MVP; requires complex role management UI.
  3. *Built-in Roles with Extensible Permission Schema (Selected):* Implement built-in roles (`owner`, `manager`, `viewer`) mapped to explicit permission sets (`farm:read`, `worklog:write`, `finance:write`). Configurable custom roles can be introduced later by storing custom role-to-permission mappings.
- **Consequences:** Code checks permissions (`can(Permission.writeWorkLog)`), not hardcoded role names, ensuring seamless transition to configurable roles. Authorization is enforced by the trusted backend (Laravel middleware), not by client-side UI visibility.
- **MVP Scope Note:** Built-in MVP roles are strictly: `owner` (read-only web dashboard) and `manager` (operational mobile app). The `viewer` role and any future granular roles (`accountant`, `supervisor`, `seasonal_clerk`) are **post-MVP only**. No employee authentication exists in MVP scope.
- **Evidence Still Required:** Permission enumeration and role-permission matrix defined in Phase D/E planning.
- **Owner / Approval:** Confirmed Product Owner Decision.

---

## ADR-008: Financial Traceability, Corrections, and Audit Trails
- **Date:** 2026-10-17
- **Status:** Accepted Direction
- **Context:** Farm accounting involves daily wage logs, material expenses, debt repayments, and harvest incomes. Prototype allows silent modification and hard deletes (`DELETE CASCADE`), destroying audit trails.
- **Options Considered:**
  1. *Hard deletes & in-place updates (Prototype):* Risk of silent financial tampering and sync corruption.
  2. *Immutable Transaction Ledger with Reversal Entries (Selected):* Financial operations must be traceable. Corrections and reversals must preserve audit history. Currency stored as **integer Centimes** (1 DZD = 100 Centimes — confirmed project-specific rule; not millimes). Snapshots of wage rates preserved at logging time.
- **Consequences:** Financial tables will disallow hard deletes; adjustments will be recorded as balancing entries or auditable revisions. No floating-point monetary amounts in any storage layer (SQLite or PostgreSQL).
- **Financial Precision Rule:** `1 DZD = 100 Centimes` (integer minor units). The term "millimes" is not used in this project. All existing prototype SQLite amounts in DZD float must be converted to Centime integers during Phase D/F migration.
- **Evidence Still Required:** Canonical audit journal schema, reversal entry pattern, and legacy-data migration reconciliation verification (zero Centime discrepancy guarantee).
- **Owner / Approval:** Confirmed Product Owner Decision.

---

## ADR-009: Unsafe Synchronization Conflict Handling & Review Policy
- **Date:** 2026-10-17
- **Status:** Accepted Direction
- **Context:** Offline mobile devices will sync changes asynchronously. Naive Last-Write-Wins (LWW) would silently overwrite concurrent edits (e.g., conflicting work log quantities, overlapping expense adjustments).
- **Options Considered:**
  1. *Last-Write-Wins (LWW):* Silent data loss, unacceptable for financial and inventory data.
  2. *Domain-Specific Merge & Review Policy (Selected):* Additive operations (work logs, income entries) append monotonically; state mutations check versions (`entity_version`); unsafe conflicts flag the record for user review rather than silently overwriting.
- **Consequences:** Sync engine requires explicit sync status (`pending`, `synced`, `conflict`), conflict payloads, and resolution UI.
- **Evidence Still Required:** Domain-by-domain conflict classification table in Phase B.
- **Owner / Approval:** Confirmed Product Owner Decision.

---

## ADR-010: Backend-Enforced Account Activation & Farm Limits
- **Date:** 2026-10-17
- **Status:** Accepted Direction
- **Context:** Commercial licensing currently relies on client-side Firestore checks (`LicenseService`), which wipe local data when offline (AUD-001) and can be easily bypassed. Commercial plans require enforcing farm capacity limits.
- **Options Considered:**
  1. *Client-side license checks (Prototype):* Easily tampered, causes offline lockout.
  2. *Backend-Enforced Entitlements with Offline Grace (Selected):* Investor account activation, subscription status, and farm limits are validated and enforced by trusted backend logic (Laravel middleware and PostgreSQL constraints — see ADR-012 superseding ADR-003). Mobile app caches signed activation tokens locally with grace periods; offline operations are never locked out or wiped. Lowering a limit never silently deletes farms.
- **Consequences:** Eliminates AUD-001 offline lockout. Ensures farm creation limits are transactionally enforced on the server.
- **Evidence Still Required:** Cryptographic token format, offline grace policy, and backend limit trigger logic.
- **Owner / Approval:** Confirmed Product Owner Decision.


---

## ADR-011: Target Backend Technology Stack — Laravel, PHP, PostgreSQL Versions
- **Date:** 2026-10-22 (Reconciled & Stack Selected 2026-10-23)
- **Status:** Accepted (Stack Decisions Confirmed; Infrastructure/Deployment Pending PO Gate D0)
- **Context:** The Master Roadmap specifies Laravel + PostgreSQL as the canonical backend. The specific versions must be selected based on current support lifecycles, compatibility, and deployment feasibility. The original roadmap referenced "Laravel 11+" and "PostgreSQL 16+" — both require updated verification against current support windows.
- **Research Date:** 2026-10-22
- **Authoritative Sources Consulted:**
  - Laravel release policy: https://laravel.com/docs, https://endoflife.date/laravel, https://laravelversions.com
  - PHP supported versions: https://www.php.net/supported-versions.php, https://endoflife.date/php
  - PostgreSQL versioning policy: https://www.postgresql.org/support/versioning/, https://endoflife.date/postgresql

### Findings

| Technology | Original Roadmap Assumption | Current Status (Oct 2026) | Finding |
|------------|---------------------------|--------------------------|---------|
| **Laravel 11** | "Laravel 11+" | ❌ **EOL** — Security support ended Mar 12, 2026 | Cannot be selected for new project |
| **Laravel 12** | N/A | ⚠️ Security-only since Aug 2026, EOL Feb 2027 | Short runway, not recommended for new project |
| **Laravel 13** | N/A | ✅ Active — Bug fixes until ~Sep 2027, Security until Mar 2028 | Recommended |
| **PHP 8.2** | Implied by Laravel 11 | ⚠️ Security-only, EOL Dec 31, 2026 | Inadequate for new project |
| **PHP 8.4** | N/A | ✅ Active support ending Dec 2026, Security until Dec 2028 | Viable but short active window |
| **PHP 8.5** | N/A | ✅ Active — Support until Dec 2027, Security until Dec 2029 | Recommended |
| **PostgreSQL 16** | "PostgreSQL 16+" | ✅ Supported until Nov 2028 | Viable but lacks native UUIDv7 |
| **PostgreSQL 17** | N/A | ✅ Supported until Nov 2029 | Proven stability, lacks native UUIDv7 |
| **PostgreSQL 18** | N/A | ✅ Current — Supported until Nov 2030 | Native `uuidv7()` function, maximum support window |

### Proposed Selection

| Component | Selected Version | Support Window | Rationale |
|-----------|-----------------|----------------|-----------|
| **Laravel** | 13 | Active until ~Sep 2027, Security until Mar 2028 | Only actively-supported Laravel version; Laravel 11 is EOL |
| **PHP** | 8.5 | Active until Dec 2027, Security until Dec 2029 | Required by Laravel 13 (range 8.3–8.5); maximum support runway |
| **PostgreSQL** | 17 or 18 | 17: until Nov 2029 / 18: until Nov 2030 | Both fully supported; PG 18 offers native `uuidv7()` eliminating extension dependency; PG 17 offers proven production stability. **Final selection deferred to deployment environment assessment.** |
| **API Authentication** | Laravel Sanctum | Bundled with Laravel 13 | Officially recommended; supports token-based mobile auth and cookie-based SPA auth |
| **UUIDv7 Strategy** | Application-generated via `Str::uuid7()` (cross-DB compatible) OR database-generated via native `uuidv7()` if PostgreSQL 18 selected | N/A | Decision linked to PostgreSQL version selection |

### Compatibility Assessment

| Requirement | Compatible? | Notes |
|-------------|-------------|-------|
| Laravel 13 + PostgreSQL 17/18 | ✅ | Native `pgsql` driver, no special packages |
| Laravel 13 + Sanctum (mobile tokens) | ✅ | Built-in, `php artisan install:api` |
| PHP 8.5 + PDO PostgreSQL | ✅ | `pdo_pgsql` extension included |
| UUIDv7 primary keys | ✅ | Application-side `Str::uuid7()` or PG 18 native |
| Phone OTP adapters | ✅ | Custom `OtpProviderInterface` — no framework constraint |
| Queue/Cache (Redis/Database) | ✅ | Laravel 13 supports both |
| Flutter REST API client | ✅ | Standard JSON API, no framework coupling |
| Backup/PITR | ✅ | PostgreSQL PITR supported on all versions ≥15 |

### Risks & Migration Implications
1. **Hosting environment unknown:** The deployment target (shared hosting, VPS, managed cloud) is not yet confirmed. PHP 8.5 and PostgreSQL 18 availability depends on the hosting provider.
2. **No Laravel 13 LTS:** Laravel no longer provides LTS versions. The project must plan for annual Laravel upgrades.
3. **PostgreSQL 17 vs 18 trade-off:** PG 18 provides native UUIDv7 but is newer (Sep 2025 release). PG 17 is more battle-tested but requires the `pg_uuidv7` extension.

### Decisions Requiring Product Owner Approval
1. Confirm Laravel 13 + PHP 8.5 as the target backend stack.
2. Select PostgreSQL 17 or 18 based on hosting environment capabilities.
3. Confirm deployment target (VPS, cloud provider, or managed hosting).

- **Owner / Approval:** **PENDING** — Requires Product Owner review and sign-off before D0 implementation.

---

## ADR-012: Supabase Backend Rejection — Supersedes ADR-003
- **Date:** 2026-10-22
- **Status:** Accepted Direction
- **Supersedes:** ADR-003 (Supabase as Initial Managed Backend Platform)
- **Context:** During Phase C planning and the Master Roadmap formalization, the Product Owner permanently rejected the Supabase proof-of-concept approach. All production backend work must use Laravel + PostgreSQL from inception, with server-side authorization enforced by Laravel middleware and PostgreSQL constraints rather than Supabase RLS and Edge Functions.
- **Decision:**
  1. ADR-003 is **SUPERSEDED**. Supabase is not part of the target architecture.
  2. Backend authorization previously planned via Supabase RLS will be implemented via Laravel multi-tenancy middleware and PostgreSQL query scoping.
  3. Server-side trusted functions previously planned as Supabase Edge Functions will be implemented as Laravel controllers/services.
  4. Authentication previously planned via Supabase Auth will be implemented via Laravel Sanctum + Phone OTP adapters.
- **Consequences:**
  - All references to "Supabase" in Phase B design documents are historical context, not implementation targets.
  - The Flutter mobile client must interface with a standard Laravel REST/JSON API, not Supabase client SDKs.
  - The `ARCHITECTURE.md` file still references Supabase in its "Confirmed Product Direction" section — this reflects the historical decision at the time of writing and should be read in conjunction with this supersession.
- **Owner / Approval:** Confirmed Product Owner Decision (Supabase rejection documented in Master Roadmap).

---

## ADR-013: NestJS Backend Evaluation — Supersedes ADR-005
- **Date:** 2026-10-22
- **Status:** Superseded
- **Supersedes:** ADR-005 (NestJS as Possible Later Backend Evolution)
- **Context:** With the selection of Laravel as the production backend framework (ADR-011, ADR-012), the NestJS evaluation pathway described in ADR-005 is no longer applicable.
- **Decision:** ADR-005 is **SUPERSEDED**. Laravel is the selected backend framework for all phases. NestJS is not part of the target architecture.
- **Consequences:** No NestJS evaluation is planned. Backend evolution will occur within the Laravel ecosystem.
- **Owner / Approval:** Implicit from the Laravel + PostgreSQL decision; formal confirmation pending with ADR-011 approval.

---

## ADR-014: Web Dashboard Technology — Updates ADR-004
- **Date:** 2026-10-22
- **Status:** Accepted Direction (Under Review)
- **Updates:** ADR-004 (React + Vite for Future Investor Web Dashboard)
- **Context:** ADR-004 selected React + Vite for the investor web dashboard. With the backend pivot from Supabase to Laravel, the web dashboard options expand to include Laravel Blade/Inertia.js as an alternative to a separate React SPA.
- **Decision:**
  1. ADR-004 remains an **ACCEPTED DIRECTION** — React + Vite is still a valid option.
  2. An additional option is now available: **Laravel + Inertia.js + Vue/React** (server-driven SPA with Laravel as the backend).
  3. The final web dashboard technology selection is **DEFERRED** to Phase E (E5 — Owner Web Dashboard) when the actual dashboard requirements and API contracts are defined.
- **Consequences:** The `web/` directory reservation remains. No web dashboard implementation is authorized until Phase E.
- **Evidence Still Required:** Dashboard feature requirements, API contract specifications, and hosting/deployment constraints.
- **Owner / Approval:** Confirmed direction; final technology selection pending Phase E.


---

## ADR-015: Hostinger KVM VPS as Candidate Deployment Target (D0 Feasibility Assessment)
- **Date:** 2026-10-23
- **Status:** Accepted Direction (Feasibility Verified; Production Deployment Pending PO Approval)
- **Context:** The project requires a reliable, cost-effective hosting target for the Laravel REST/JSON API and PostgreSQL database. Hostinger KVM VPS was proposed by the Product Owner as a candidate environment to evaluate during Phase D0.
- **Evaluation Findings (D0):**
  1. *Hostinger Infrastructure:* Hostinger provides KVM-based virtual private servers with full root access, dedicated IPv4/IPv6, automated weekly/daily snapshots, and customizable Linux distributions.
  2. *OS Recommendation:* **Ubuntu 24.04 LTS (Noble Numbat)** or **Debian 12 (Bookworm)**.
  3. *Deployment Architecture:* **Containerized via Docker & Docker Compose** rather than bare-metal PHP/PostgreSQL. Containerization decouples application runtimes from host package management, ensures identical local/staging/production parity, enables zero-downtime rolling deploys, and isolates PostgreSQL storage via named volumes.
  4. *Minimum Hardware Recommendation:* **Hostinger KVM 2** (2 vCPU, 8 GB RAM, 100 GB NVMe storage). This accommodates PHP-FPM workers, PostgreSQL buffer pools, Redis queue/cache, and background sync workers without swapping.
  5. *Reverse Proxy & TLS:* Nginx or Caddy with automated Let's Encrypt certificates (TLS 1.3).
  6. *PostgreSQL Operational Ownership:* Because Hostinger VPS is unmanaged, database backups (pg_dump + WAL archiving / PITR), security patches, and vacuuming are developer/DevOps responsibility.
- **Decision:**
  1. Hostinger VPS is **feasible and recommended** as the candidate deployment target.
  2. Production provisioning, plan purchase, domain DNS, and actual server setup remain **strictly blocked** until Phase D5 / Phase F deployment gate.
  3. No credentials or instances shall be created in Phase D0.
- **Consequences:** Docker Compose manifests (`docker-compose.prod.yml`, Dockerfile) will be authored in future deployment packages. Staging and production separation must be maintained.
- **Owner / Approval:** Confirmed Candidate Target; Purchase & Provisioning Pending PO Gate.

---

## ADR-016: Mobile Offline-First Session Lifecycle & Grace Authentication Policy
- **Date:** 2026-10-23
- **Status:** Accepted Direction (D0 Specification; Implementation Scheduled for D1/D4)
- **Context:** The mobile application operates in rural agricultural environments with intermittent or nonexistent cellular connectivity. The project must maintain offline-first operational continuity while ensuring strict server-side authorization and non-repudiation.
- **Decision:**
  1. **First-Time Activation:** Requires active connectivity. User submits Phone Number + OTP. The Laravel backend verifies OTP and issues a cryptographically signed Sanctum API token + Farm Membership Entitlement Payload.
  2. **Local Token Caching:** Token and user entitlements are stored in `FlutterSecureStorage` (encrypted with hardware-backed Keystore on Android / Keychain on iOS).
  3. **Offline Boot & Enter Session:** The mobile application boots directly into the local session using SQLite v4 data and validated local PIN/biometrics. **Network unavailability never locks out the user or wipes local data.**
  4. **Offline Operations Authority:** All operational entries (work logs, expenses, harvest daily income, debtor transactions) are written durably to local SQLite and appended to `_sync_outbox` with client-generated `UUIDv7` primary keys and monotonic sequence numbers.
  5. **Token Expiry & Offline Grace:** Access tokens have a standard 30-day lifetime with an explicit 14-day offline grace period. When connectivity resumes, background refresh automatically cycles the token.
  6. **Revocation / Farm Access Loss:** When the device contacts the server, if the server returns `401 Unauthorized` or `403 Farm Access Revoked`, the mobile client:
     - Prompts the user with a non-destructive notice.
     - Never purges historical un-synced operational records silently.
     - Restricts new write operations until re-authenticated.
  7. **Logout Policy:** Logout unsets the authentication token and PIN hash in secure storage. Existing local farm operational database records are preserved locally unless the user explicitly performs an authenticated local wipe.
- **Consequences:** Eliminates any possibility of AUD-001 regression (offline data wipe). Establishes formal contract for Phase D1 and D4 implementation.
- **Owner / Approval:** Confirmed Product Owner Direction.
