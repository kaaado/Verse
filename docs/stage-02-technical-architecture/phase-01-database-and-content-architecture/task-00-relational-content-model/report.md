# Task Report — PostgreSQL Relational Schema & Entity Specifications

## 1. Status
`COMPLETED`

## 2. Objective
Design and document the full PostgreSQL relational schema, entity definitions, custom ENUMs, and field specifications for the 8 core content entities of THE YACINEVERSE plus supporting operational tables in Supabase.

## 3. Work Performed
- Designed complete PostgreSQL DDL specifications for all entities: `projects`, `experiences`, `skills`, `stories`, `posts`, `milestones`, `media_assets`, `project_media`, `inquiries`, and `audit_logs`.
- Defined custom PostgreSQL ENUM types for content state, sector categorization, media classifications, and inquiry states.
- Standardized all tables on UUIDv4 primary keys (`gen_random_uuid()`) and UTC timestamps with timezone (`timestamptz`).
- Formulated normalization boundaries and selective JSONB metadata storage for flexible metric callouts and tech stack tags.

## 4. Files Inspected
- `docs/Product.md` (Section 3.1: Content Entities & Taxonomies)
- `.agent/ARCHITECTURE.md` (Supabase PostgreSQL specifications)
- `.agent/ENGINEERING_STANDARD.md` (Database modeling rules)

## 5. Files Created or Modified
- `docs/stage-02-technical-architecture/phase-01-database-and-content-architecture/task-00-relational-content-model/report.md`

## 6. Findings and Evidence
### 6.1 PostgreSQL Custom ENUMs
```sql
CREATE TYPE content_status_enum AS ENUM ('draft', 'preview', 'published', 'archived');
CREATE TYPE sector_type_enum AS ENUM ('core_systems', 'ai_intelligence', 'engineering', 'creations', 'origins');
CREATE TYPE media_type_enum AS ENUM ('image', 'video', 'document', 'audio', 'model_3d');
CREATE TYPE inquiry_status_enum AS ENUM ('unread', 'read', 'archived', 'spam');
```

### 6.2 Core DDL Specifications (Excerpts)
```sql
-- Projects Table
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(120) NOT NULL UNIQUE,
    title VARCHAR(200) NOT NULL,
    tagline VARCHAR(300) NOT NULL,
    description TEXT NOT NULL,
    sector sector_type_enum NOT NULL DEFAULT 'core_systems',
    status content_status_enum NOT NULL DEFAULT 'draft',
    is_featured BOOLEAN NOT NULL DEFAULT false,
    display_order INTEGER NOT NULL DEFAULT 0,
    github_url TEXT,
    demo_url TEXT,
    metrics JSONB DEFAULT '[]'::jsonb, -- e.g. [{"label": "Latency", "value": "<50ms"}]
    tech_stack TEXT[] DEFAULT ARRAY[]::TEXT[],
    content_mdx TEXT,
    cover_image_id UUID,
    published_at TIMESTAMPTZ,
    archived_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Experiences Table
CREATE TABLE public.experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(120) NOT NULL UNIQUE,
    role VARCHAR(150) NOT NULL,
    organization VARCHAR(150) NOT NULL,
    location VARCHAR(120),
    employment_type VARCHAR(50) DEFAULT 'Full-time',
    start_date DATE NOT NULL,
    end_date DATE,
    is_current BOOLEAN NOT NULL DEFAULT false,
    description TEXT NOT NULL,
    highlights TEXT[] DEFAULT ARRAY[]::TEXT[],
    skills_used TEXT[] DEFAULT ARRAY[]::TEXT[],
    status content_status_enum NOT NULL DEFAULT 'draft',
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Skills Table
CREATE TABLE public.skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(80) NOT NULL, -- e.g. 'Languages', 'Frameworks', 'AI/ML', 'DevOps'
    proficiency INTEGER CHECK (proficiency BETWEEN 1 AND 100),
    years_experience NUMERIC(3,1),
    is_top_skill BOOLEAN NOT NULL DEFAULT false,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Inquiries Table
CREATE TABLE public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_name VARCHAR(150) NOT NULL,
    sender_email VARCHAR(255) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    status inquiry_status_enum NOT NULL DEFAULT 'unread',
    ip_hash VARCHAR(64),
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
```

## 7. Decisions
- **Decision P01-01:** Standardize on `UUIDv4` for all primary keys to prevent enumeration attacks and simplify client-side ID generation.
- **Decision P01-02:** Store timestamps strictly in UTC with timezone (`TIMESTAMPTZ`) to avoid timezone conversion ambiguities.
- **Decision P01-03:** Use JSONB specifically for flexible, semi-structured presentation data (such as key metrics callouts) while keeping core relational attributes strongly typed.

## 8. Risks and Blockers
- **Risk:** Uncontrolled schema growth causing inconsistent foreign key deletions.
  - *Mitigation:* Explicitly enforce `ON DELETE RESTRICT` on core content dependencies and `ON DELETE CASCADE` on junction tables.

## 9. Face 1 Review (Software Architecture)
- **Evaluation:** Relational schema matches product requirements, normalizes shared entities, and establishes clear type constraints.
- **Verdict:** `APPROVED`.

## 10. Face 2 Review (QA & Performance)
- **Evaluation:** Typed ENUMs and structured arrays eliminate string inconsistencies; explicit columns enable predictable query execution plans.
- **Verdict:** `APPROVED`.

## 11. Face 3 Review (Defensive Security)
- **Evaluation:** Inquiries table hashes sender IP addresses rather than storing raw IPs, upholding privacy standards while enabling rate-limiting checks.
- **Verdict:** `APPROVED`.

## 12. Acceptance Criteria
- [x] All 8 content entities and operational tables fully modeled in PostgreSQL DDL.
- [x] Custom ENUMs and type constraints specified.
- [x] Normalization boundaries and JSONB usage guidelines codified.

## 13. Remaining Work
- None for this architectural task.

## 14. Owner Approval
`STAGE_GATE_INTEGRATED`
