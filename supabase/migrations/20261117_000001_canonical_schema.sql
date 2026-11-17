-- ============================================================================
-- THE YACINEVERSE — Canonical Database Schema Migration
-- Migration ID: 20261117_000001_canonical_schema.sql
-- Entities: 12 Core Tables + 1 Operational Redirect Table
-- Security: 100% Row Level Security (RLS) with Subquery Junction Leak Prevention
-- ============================================================================

-- Step 1: Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Step 2: Custom Enumerations
DO $$ BEGIN
    CREATE TYPE content_status_enum AS ENUM ('draft', 'published', 'archived');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE TYPE sector_type_enum AS ENUM ('core_systems', 'ai_intelligence', 'engineering', 'creations', 'origins');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE TYPE media_type_enum AS ENUM ('image', 'video', 'document', 'audio', 'model_3d');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE TYPE credential_type_enum AS ENUM ('certification', 'degree', 'license', 'award');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE TYPE inquiry_status_enum AS ENUM ('unread', 'read', 'replied', 'spam');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Step 3: Tier 1 - Independent Supporting Tables
-- 3.1 Media Assets
CREATE TABLE IF NOT EXISTS public.media_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    storage_path TEXT NOT NULL UNIQUE,
    public_url TEXT NOT NULL,
    media_type media_type_enum NOT NULL DEFAULT 'image',
    mime_type VARCHAR(100) NOT NULL,
    file_size_bytes BIGINT NOT NULL DEFAULT 0,
    width INTEGER,
    height INTEGER,
    focal_x FLOAT NOT NULL DEFAULT 0.5,
    focal_y FLOAT NOT NULL DEFAULT 0.5,
    blur_data_url TEXT,
    alt_text TEXT NOT NULL DEFAULT '',
    caption TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3.2 Skills Taxonomy
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(60) NOT NULL, -- e.g. 'Languages', 'Frontend', 'Backend', 'AI/ML', 'DevOps', 'Systems'
    proficiency INTEGER NOT NULL DEFAULT 85 CHECK (proficiency >= 0 AND proficiency <= 100),
    is_top_skill BOOLEAN NOT NULL DEFAULT false,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_visible BOOLEAN NOT NULL DEFAULT true,
    icon_slug VARCHAR(60),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Step 4: Tier 2 - Core Content Entities
-- 4.1 Experiences
CREATE TABLE IF NOT EXISTS public.experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role VARCHAR(150) NOT NULL,
    organization VARCHAR(150) NOT NULL,
    organization_url TEXT,
    employment_type VARCHAR(60) NOT NULL DEFAULT 'Full-time',
    location VARCHAR(120),
    start_date DATE NOT NULL,
    end_date DATE, -- NULL indicates current role
    is_current BOOLEAN NOT NULL DEFAULT false,
    description TEXT NOT NULL DEFAULT '',
    highlights TEXT[] NOT NULL DEFAULT '{}',
    status content_status_enum NOT NULL DEFAULT 'draft',
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4.2 Credentials (Degrees & Certifications)
CREATE TABLE IF NOT EXISTS public.credentials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    issuer VARCHAR(150) NOT NULL,
    credential_type credential_type_enum NOT NULL DEFAULT 'certification',
    issue_date DATE NOT NULL,
    expiration_date DATE,
    credential_url TEXT,
    credential_id_number VARCHAR(100),
    certificate_media_id UUID REFERENCES public.media_assets(id) ON DELETE SET NULL,
    status content_status_enum NOT NULL DEFAULT 'draft',
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4.3 Projects
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(120) NOT NULL UNIQUE,
    title VARCHAR(200) NOT NULL,
    tagline VARCHAR(250) NOT NULL,
    summary TEXT NOT NULL DEFAULT '',
    sector sector_type_enum NOT NULL DEFAULT 'engineering',
    status content_status_enum NOT NULL DEFAULT 'draft',
    is_featured BOOLEAN NOT NULL DEFAULT false,
    is_flagship BOOLEAN NOT NULL DEFAULT false,
    cover_image_id UUID REFERENCES public.media_assets(id) ON DELETE SET NULL,
    live_url TEXT,
    github_url TEXT,
    challenge_narrative TEXT,
    solution_narrative TEXT,
    architecture_overview TEXT,
    impact_metrics JSONB NOT NULL DEFAULT '[]', -- Array of {label, value, prefix, suffix}
    display_order INTEGER NOT NULL DEFAULT 0,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4.4 Stories (Chronicle)
CREATE TABLE IF NOT EXISTS public.stories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(140) NOT NULL UNIQUE,
    title VARCHAR(250) NOT NULL,
    excerpt TEXT NOT NULL DEFAULT '',
    content_mdx TEXT NOT NULL,
    read_time_minutes INTEGER NOT NULL DEFAULT 5,
    cover_image_id UUID REFERENCES public.media_assets(id) ON DELETE SET NULL,
    tags TEXT[] NOT NULL DEFAULT '{}',
    status content_status_enum NOT NULL DEFAULT 'draft',
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4.5 Posts (Builder Dispatches)
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(140) NOT NULL UNIQUE,
    title VARCHAR(200) NOT NULL,
    summary TEXT NOT NULL DEFAULT '',
    content_mdx TEXT NOT NULL,
    media_id UUID REFERENCES public.media_assets(id) ON DELETE SET NULL,
    status content_status_enum NOT NULL DEFAULT 'draft',
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Step 5: Tier 3 - Dependent Supporting Entities
-- 5.1 Milestones
CREATE TABLE IF NOT EXISTS public.milestones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    milestone_date DATE NOT NULL,
    linked_experience_id UUID REFERENCES public.experiences(id) ON DELETE SET NULL,
    linked_project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
    status content_status_enum NOT NULL DEFAULT 'draft',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Step 6: Tier 4 - Junction Tables
-- 6.1 Project Skills (M:N)
CREATE TABLE IF NOT EXISTS public.project_skills (
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES public.skills(id) ON DELETE RESTRICT,
    is_primary BOOLEAN NOT NULL DEFAULT false,
    display_order INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (project_id, skill_id)
);

-- 6.2 Project Media (M:N)
CREATE TABLE IF NOT EXISTS public.project_media (
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    media_id UUID NOT NULL REFERENCES public.media_assets(id) ON DELETE RESTRICT,
    is_hero BOOLEAN NOT NULL DEFAULT false,
    display_order INTEGER NOT NULL DEFAULT 0,
    caption TEXT,
    PRIMARY KEY (project_id, media_id)
);

-- Step 7: Tier 5 - Operational & Forensic Tables
-- 7.1 Inquiries
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_name VARCHAR(120) NOT NULL,
    sender_email VARCHAR(200) NOT NULL,
    subject VARCHAR(200) NOT NULL DEFAULT 'Portfolio Contact',
    message TEXT NOT NULL,
    status inquiry_status_enum NOT NULL DEFAULT 'unread',
    ip_hash VARCHAR(64) NOT NULL,
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7.2 Audit Logs
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID NOT NULL,
    action VARCHAR(60) NOT NULL, -- e.g. 'INSERT', 'UPDATE', 'DELETE', 'PUBLISH'
    entity_type VARCHAR(60) NOT NULL,
    entity_id UUID NOT NULL,
    diff_payload JSONB NOT NULL DEFAULT '{}',
    ip_address VARCHAR(45),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7.3 Slug Redirects
CREATE TABLE IF NOT EXISTS public.slug_redirects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_path TEXT NOT NULL UNIQUE,
    target_path TEXT NOT NULL,
    status_code INTEGER NOT NULL DEFAULT 308, -- Permanent redirect
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================================
-- INDEXES FOR HIGH-THROUGHPUT SEARCH & INTEGRITY
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_sector ON public.projects(sector);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_projects_display_order ON public.projects(display_order);
CREATE INDEX IF NOT EXISTS idx_experiences_status ON public.experiences(status);
CREATE INDEX IF NOT EXISTS idx_credentials_status ON public.credentials(status);
CREATE INDEX IF NOT EXISTS idx_stories_status ON public.stories(status);
CREATE INDEX IF NOT EXISTS idx_posts_status ON public.posts(status);
CREATE INDEX IF NOT EXISTS idx_skills_visible ON public.skills(is_visible, category);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries(status);
CREATE INDEX IF NOT EXISTS idx_slug_redirects_source ON public.slug_redirects(source_path) WHERE is_active = true;

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.slug_redirects ENABLE ROW LEVEL SECURITY;

-- Policy Helpers: Authenticated Owner Check
-- (Owner has full CRUD across all tables)
CREATE OR REPLACE FUNCTION public.is_owner()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN auth.role() = 'authenticated';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. Media Assets: Public can read, Owner can write
CREATE POLICY media_public_read ON public.media_assets FOR SELECT USING (true);
CREATE POLICY media_owner_all ON public.media_assets FOR ALL USING (public.is_owner());

-- 2. Skills: Public can read visible, Owner can write
CREATE POLICY skills_public_read ON public.skills FOR SELECT USING (is_visible = true);
CREATE POLICY skills_owner_all ON public.skills FOR ALL USING (public.is_owner());

-- 3. Experiences: Public can read published, Owner can write
CREATE POLICY exp_public_read ON public.experiences FOR SELECT USING (status = 'published');
CREATE POLICY exp_owner_all ON public.experiences FOR ALL USING (public.is_owner());

-- 4. Credentials: Public can read published, Owner can write
CREATE POLICY cred_public_read ON public.credentials FOR SELECT USING (status = 'published');
CREATE POLICY cred_owner_all ON public.credentials FOR ALL USING (public.is_owner());

-- 5. Projects: Public can read published, Owner can write
CREATE POLICY proj_public_read ON public.projects FOR SELECT USING (status = 'published');
CREATE POLICY proj_owner_all ON public.projects FOR ALL USING (public.is_owner());

-- 6. Stories: Public can read published, Owner can write
CREATE POLICY stories_public_read ON public.stories FOR SELECT USING (status = 'published');
CREATE POLICY stories_owner_all ON public.stories FOR ALL USING (public.is_owner());

-- 7. Posts: Public can read published, Owner can write
CREATE POLICY posts_public_read ON public.posts FOR SELECT USING (status = 'published');
CREATE POLICY posts_owner_all ON public.posts FOR ALL USING (public.is_owner());

-- 8. Milestones: Public can read published, Owner can write
CREATE POLICY milestones_public_read ON public.milestones FOR SELECT USING (status = 'published');
CREATE POLICY milestones_owner_all ON public.milestones FOR ALL USING (public.is_owner());

-- 9. Project Skills (Junction): Public can read ONLY IF parent project is published (Prevent draft leak)
CREATE POLICY ps_public_read ON public.project_skills FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.projects WHERE projects.id = project_skills.project_id AND projects.status = 'published')
);
CREATE POLICY ps_owner_all ON public.project_skills FOR ALL USING (public.is_owner());

-- 10. Project Media (Junction): Public can read ONLY IF parent project is published (Prevent draft leak)
CREATE POLICY pm_public_read ON public.project_media FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.projects WHERE projects.id = project_media.project_id AND projects.status = 'published')
);
CREATE POLICY pm_owner_all ON public.project_media FOR ALL USING (public.is_owner());

-- 11. Inquiries: Public can INSERT only; Owner has full access
CREATE POLICY inquiries_public_insert ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY inquiries_owner_all ON public.inquiries FOR ALL USING (public.is_owner());

-- 12. Audit Logs: Owner only
CREATE POLICY audit_owner_all ON public.audit_logs FOR ALL USING (public.is_owner());

-- 13. Slug Redirects: Public can read active redirects, Owner can write
CREATE POLICY redirects_public_read ON public.slug_redirects FOR SELECT USING (is_active = true);
CREATE POLICY redirects_owner_all ON public.slug_redirects FOR ALL USING (public.is_owner());
