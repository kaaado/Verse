-- ============================================================================
-- THE YACINEVERSE — Synthetic & Baseline Seed Data
-- File: supabase/seed.sql
-- Strictly non-confidential, sanitized, approved showcase records
-- ============================================================================

-- Step 1: Seed Media Assets
INSERT INTO public.media_assets (id, storage_path, public_url, media_type, mime_type, file_size_bytes, width, height, alt_text)
VALUES
('a0000000-0000-0000-0000-000000000001', 'media/passiluce-cover.webp', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80', 'image', 'image/webp', 145000, 1920, 1080, 'PassiLuce Production Platform Architecture'),
('a0000000-0000-0000-0000-000000000002', 'media/agrovia-cover.webp', 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1200&q=80', 'image', 'image/webp', 182000, 1920, 1080, 'Agrovia Offline Orchard Management System'),
('a0000000-0000-0000-0000-000000000003', 'media/hospital-cover.webp', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80', 'image', 'image/webp', 160000, 1920, 1080, 'Eph Meslem Tayeb Hospital Digitalization Portal'),
('a0000000-0000-0000-0000-000000000004', 'media/camp-cover.webp', 'https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?auto=format&fit=crop&w=1200&q=80', 'image', 'image/webp', 190000, 1920, 1080, 'Mukhayyami Summer Camp Logistics Platform'),
('a0000000-0000-0000-0000-000000000005', 'media/ai-cv-cover.webp', 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1200&q=80', 'image', 'image/webp', 135000, 1920, 1080, 'Computer Vision Neural Architecture Thesis')
ON CONFLICT (id) DO NOTHING;

-- Step 2: Seed Skills
INSERT INTO public.skills (id, name, category, proficiency, is_top_skill, display_order, icon_slug)
VALUES
('b0000000-0000-0000-0000-000000000001', 'TypeScript', 'Languages', 95, true, 1, 'typescript'),
('b0000000-0000-0000-0000-000000000002', 'PHP / Modern PHP', 'Languages', 92, true, 2, 'php'),
('b0000000-0000-0000-0000-000000000003', 'Python', 'Languages', 90, true, 3, 'python'),
('b0000000-0000-0000-0000-000000000004', 'Next.js App Router', 'Frontend', 94, true, 4, 'nextjs'),
('b0000000-0000-0000-0000-000000000005', 'React 19', 'Frontend', 95, true, 5, 'react'),
('b0000000-0000-0000-0000-000000000006', 'Tailwind CSS', 'Frontend', 95, false, 6, 'tailwind'),
('b0000000-0000-0000-0000-000000000007', 'Laravel 12', 'Backend', 94, true, 7, 'laravel'),
('b0000000-0000-0000-0000-000000000008', 'Octane / Swoole', 'Backend', 88, true, 8, 'swoole'),
('b0000000-0000-0000-0000-000000000009', 'PostgreSQL / Supabase', 'Databases', 92, true, 9, 'postgresql'),
('b0000000-0000-0000-0000-000000000010', 'Computer Vision / PyTorch', 'AI/ML', 86, true, 10, 'pytorch'),
('b0000000-0000-0000-0000-000000000011', 'Autonomous Agents', 'AI/ML', 88, true, 11, 'ai-agents'),
('b0000000-0000-0000-0000-000000000012', 'Docker / DevSecOps', 'DevOps', 85, false, 12, 'docker')
ON CONFLICT (id) DO NOTHING;

-- Step 3: Seed Credentials
INSERT INTO public.credentials (id, title, issuer, credential_type, issue_date, credential_url, status, display_order)
VALUES
('c0000000-0000-0000-0000-000000000001', 'Master of Science in Computer Science', 'University of Mascara', 'degree', '2024-06-30', 'https://univ-mascara.dz', 'published', 1),
('c0000000-0000-0000-0000-000000000002', 'Bachelor of Science in Computer Science', 'University of Mascara', 'degree', '2022-06-30', 'https://univ-mascara.dz', 'published', 2),
('c0000000-0000-0000-0000-000000000003', 'Fundamentals of Deep Learning', 'NVIDIA Deep Learning Institute', 'certification', '2023-11-15', 'https://www.nvidia.com/en-us/training/', 'published', 3),
('c0000000-0000-0000-0000-000000000004', 'Building Real-Time Video AI Applications', 'NVIDIA Deep Learning Institute', 'certification', '2024-02-20', 'https://www.nvidia.com/en-us/training/', 'published', 4)
ON CONFLICT (id) DO NOTHING;

-- Step 4: Seed Experiences
INSERT INTO public.experiences (id, role, organization, employment_type, location, start_date, is_current, description, highlights, status, display_order)
VALUES
('d0000000-0000-0000-0000-000000000001', 'Lead Software Architect & Engineer', 'PassiLuce', 'Contract / Project Lead', 'Algiers, Algeria (Remote)', '2023-09-01', true, 'Architected and implemented high-concurrency national e-commerce platform using modern Laravel 12 and Octane Swoole runtime.', ARRAY['Engineered payment integrations with national SlickPay gateway and automated logistics APIs.', 'Achieved sub-100ms response times under high-concurrency simulation loads.', 'Implemented comprehensive automated test suite across checkout and order processing workflows.'], 'published', 1),
('d0000000-0000-0000-0000-000000000002', 'Systems & Digitalization Consultant', 'Eph Meslem Tayeb Public Hospital', 'Consulting', 'Mascara, Algeria', '2023-01-01', false, 'Designed and digitized hospital internal administrative and inventory role-based management workflows.', ARRAY['Spearheaded zero-paper patient queue and pharmaceutical allocation portal.', 'Designed strict Role-Based Access Control (RBAC) security matrix.', 'Trained hospital administrative staff on electronic inventory management.'], 'published', 2),
('d0000000-0000-0000-0000-000000000003', 'Founder & Systems Engineer', 'Agrovia Systems', 'Entrepreneurial', 'Algeria', '2022-03-01', false, 'Developed offline-first orchard management ERP connecting field sensors with cloud synchronization.', ARRAY['Engineered offline SQLite to cloud PostgreSQL reconciliation protocol for poor connectivity zones.', 'Integrated microclimate sensor arrays for real-time orchard moisture alerts.', 'Delivered production ERP deployed across private agricultural estates.'], 'published', 3)
ON CONFLICT (id) DO NOTHING;

-- Step 5: Seed Projects
INSERT INTO public.projects (id, slug, title, tagline, summary, sector, status, is_featured, is_flagship, cover_image_id, live_url, github_url, impact_metrics, display_order)
VALUES
(
    'e0000000-0000-0000-0000-000000000001',
    'passiluce',
    'PassiLuce High-Concurrency Platform',
    'High-throughput e-commerce architecture powered by Laravel 12 & Octane/Swoole',
    'Production e-commerce platform engineered for the Algerian commercial ecosystem, featuring high-concurrency request handling, automated national logistics integration, and multi-step payment gateway orchestration with SlickPay.',
    'core_systems',
    'published',
    true,
    true,
    'a0000000-0000-0000-0000-000000000001',
    'https://passiluce.dz',
    'https://github.com/kaaado/passiluce-core',
    '[{"label": "Concurrent RPS", "value": "2400+", "prefix": "", "suffix": " req/s"}, {"label": "P95 Latency", "value": "85", "prefix": "", "suffix": "ms"}, {"label": "Payment Uptime", "value": "99.9", "prefix": "", "suffix": "%"}]',
    1
),
(
    'e0000000-0000-0000-0000-000000000002',
    'agrovia-farmer-erp',
    'Agrovia & FARMER ERP',
    'Offline-first orchard management platform with multi-node sync & IoT telemetry',
    'Agricultural resource planning system engineered for rugged rural environments with erratic cellular coverage. Employs conflict-free delta synchronization and hardware sensor ingestion.',
    'engineering',
    'published',
    true,
    true,
    'a0000000-0000-0000-0000-000000000002',
    NULL,
    'https://github.com/kaaado/agrovia-core',
    '[{"label": "Sync Reliability", "value": "100", "prefix": "", "suffix": "%"}, {"label": "Offline Battery", "value": "18", "prefix": "", "suffix": "hrs"}]',
    2
),
(
    'e0000000-0000-0000-0000-000000000003',
    'computer-vision-thesis',
    'Real-Time Computer Vision & Neural Thesis',
    'Academic research and neural architecture for low-latency visual detection',
    'Master of Science thesis research developing optimized convolutional and transformer models for visual perception under constrained compute environments.',
    'ai_intelligence',
    'published',
    true,
    false,
    'a0000000-0000-0000-0000-000000000005',
    NULL,
    'https://github.com/kaaado/cv-thesis-models',
    '[{"label": "mAP Score", "value": "87.4", "prefix": "", "suffix": "%"}, {"label": "Inference FPS", "value": "45", "prefix": "", "suffix": " fps"}]',
    3
),
(
    'e0000000-0000-0000-0000-000000000004',
    'hospital-rbac-portal',
    'Hospital Workflow & RBAC Digitalization',
    'Mission-critical healthcare resource allocation and security-hardened RBAC',
    'Digitalization infrastructure for Eph Meslem Tayeb Public Hospital, providing audit-logged staff privileges, medicine distribution queues, and administrative oversight.',
    'core_systems',
    'published',
    false,
    false,
    'a0000000-0000-0000-0000-000000000003',
    NULL,
    NULL,
    '[{"label": "Paper Elimination", "value": "100", "prefix": "", "suffix": "%"}, {"label": "Daily Dispatches", "value": "650+", "prefix": "", "suffix": ""}]',
    4
),
(
    'e0000000-0000-0000-0000-000000000005',
    'mukhayyami-logistics',
    'Mukhayyami Camp Logistics',
    'Youth summer camp operational coordination and attendance state machine',
    'Field-tested operational logistics platform successfully managing ~160 children across activities, transportation, medical dietary alerts, and staff scheduling.',
    'creations',
    'published',
    false,
    false,
    'a0000000-0000-0000-0000-000000000004',
    NULL,
    NULL,
    '[{"label": "Participants", "value": "160", "prefix": "~", "suffix": ""}, {"label": "Incident Rate", "value": "0", "prefix": "", "suffix": "%"}]',
    5
)
ON CONFLICT (id) DO NOTHING;

-- Step 6: Seed Project Skills Junction
INSERT INTO public.project_skills (project_id, skill_id, is_primary, display_order)
VALUES
('e0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000007', true, 1), -- PassiLuce -> Laravel
('e0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000008', true, 2), -- PassiLuce -> Octane
('e0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000009', false, 3),-- PassiLuce -> PostgreSQL
('e0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000003', true, 1), -- Agrovia -> Python
('e0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000009', false, 2),-- Agrovia -> PostgreSQL
('e0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000003', true, 1), -- CV Thesis -> Python
('e0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000010', true, 2), -- CV Thesis -> PyTorch
('e0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000002', true, 1), -- Hospital -> PHP
('e0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000009', true, 2)  -- Hospital -> PostgreSQL
ON CONFLICT (project_id, skill_id) DO NOTHING;

-- Step 7: Seed Stories
INSERT INTO public.stories (id, slug, title, excerpt, content_mdx, read_time_minutes, tags, status)
VALUES
(
    'f0000000-0000-0000-0000-000000000001',
    'architecting-passiluce-octane-swoole',
    'Architecting PassiLuce: Concurrency and Resilience under Modern PHP',
    'How we achieved 2,400+ RPS and sub-100ms P95 latency in a production Laravel application using Octane and Swoole process workers.',
    '# Architecting PassiLuce: Concurrency and Resilience under Modern PHP\n\nWhen designing an e-commerce backbone for high-demand flash sales and concurrent checkout sessions, the traditional PHP-FPM process-per-request model encounters distinct memory and CPU bottlenecks.\n\nIn this article, we dive into how we re-architected the PassiLuce core using Laravel Octane with the Swoole engine, keeping the application state resident in memory and handling thousands of requests per second cleanly.\n\n## The Concurrency Challenge\n\nTraditional PHP creates a fresh request lifecycle for each HTTP query. By leveraging persistent workers in Swoole, boot overhead is dropped from 35ms to under 2ms...',
    6,
    ARRAY['Laravel', 'Swoole', 'High Concurrency', 'Architecture'],
    'published'
),
(
    'f0000000-0000-0000-0000-000000000002',
    'offline-sync-agrovia-orchard',
    'Offline-First Data Sync in Erratic Cellular Environments',
    'Lessons from deploying IoT sensors and agricultural ERP synchronization across rural Algerian orchards with zero internet.',
    '# Offline-First Data Sync in Erratic Cellular Environments\n\nBuilding software for high-tech urban offices is easy; building software for rural olive and date orchards where 4G signals disappear every 50 meters is a completely different engineering reality.\n\nHere is how Agrovia handles local SQLite change capture, delta queues, and idempotent cloud reconciliation...',
    7,
    ARRAY['Distributed Systems', 'Offline-First', 'PostgreSQL', 'IoT'],
    'published'
)
ON CONFLICT (id) DO NOTHING;
