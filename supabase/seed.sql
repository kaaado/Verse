-- ============================================================================
-- THE YACINEVERSE — Minimal Synthetic Demonstration Seed Data
-- File: supabase/seed.sql
--
-- NOTICE: 100% FICTIONAL DEMONSTRATION RECORDS.
-- Contains ZERO real personal information, client records, or assumed claims.
-- Used solely for local verification and interface testing.
-- ============================================================================

-- Step 1: Demo Skills
INSERT INTO public.skills (id, name, category, proficiency, is_top_skill, display_order, is_visible)
VALUES
('b0000000-0000-0000-0000-000000000001', 'Distributed Systems (Demo)', 'Architecture', 90, true, 1, true),
('b0000000-0000-0000-0000-000000000002', 'Cloud Infrastructure (Demo)', 'DevOps & Systems', 88, true, 2, true),
('b0000000-0000-0000-0000-000000000003', 'Real-Time Telemetry (Demo)', 'Backend & Data', 85, true, 3, true)
ON CONFLICT (id) DO NOTHING;

-- Step 2: Demo Credentials
INSERT INTO public.credentials (id, title, issuer, credential_type, issue_date, credential_url, credential_id_number, status, display_order)
VALUES
('c0000000-0000-0000-0000-000000000001', 'Professional Cloud Systems Architect (Sample Certification)', 'Fictional Cloud Institute (Demo)', 'certification', '2024-01-15', 'https://example.com/demo-credential', 'DEMO-CERT-000000', 'published', 1)
ON CONFLICT (id) DO NOTHING;

-- Step 3: Demo Experiences
INSERT INTO public.experiences (id, role, organization, employment_type, location, start_date, is_current, description, highlights, status, display_order)
VALUES
('d0000000-0000-0000-0000-000000000001', 'Staff Systems Architect (Demonstration Role)', 'Fictional Technology Labs Inc. (Demo)', 'Full-time (Sample)', 'Remote (Sample)', '2023-01-01', true, 'DEMO RECORD: This placeholder illustrates how career positions, leadership highlights, and verifiable technical impact bullet points render in the Professional Dossier.', ARRAY['Sample accomplishment: Directed the architectural transition to event-driven microservices.', 'Sample accomplishment: Reduced multi-region data synchronization latency by 45%.'], 'published', 1)
ON CONFLICT (id) DO NOTHING;

-- Step 4: Demo Projects
INSERT INTO public.projects (id, slug, title, tagline, summary, sector, status, is_featured, is_flagship, challenge_narrative, solution_narrative, architecture_overview, impact_metrics, display_order)
VALUES
(
    'e0000000-0000-0000-0000-000000000001',
    'demo-distributed-telemetry-engine',
    'Project Chronos: Distributed Telemetry Mesh',
    'Demonstration Architecture — High-throughput event processing prototype',
    'A sample demonstration project illustrating how technical case studies, architectural challenge breakdowns, system topologies, and verified performance metrics appear in THE YACINEVERSE.',
    'core_systems',
    'published',
    true,
    true,
    'DEMO NARRATIVE: Demonstrates how complex engineering challenges, latency bottlenecks, and technical trade-offs are structured for technical recruiters and engineering directors.',
    'DEMO SOLUTION: Illustrates architectural solutions, resilient retry algorithms, and distributed queue topologies designed under real-world constraints.',
    'Sample Stack: Go / Rust Event Brokers + Redis Shards + PostgreSQL Data Lake + WebGL Telemetry Visualizer (Demo)',
    '[{"label": "Sample Throughput", "value": "10,000", "prefix": "", "suffix": " msg/s"}, {"label": "Sample P99 Latency", "value": "12", "prefix": "< ", "suffix": "ms"}]',
    1
),
(
    'e0000000-0000-0000-0000-000000000002',
    'demo-neural-inference-pipeline',
    'Project Hyperion: Edge Neural Pipeline',
    'Demonstration Architecture — Low-latency computer vision inference prototype',
    'A sample demonstration project illustrating AI pipeline integration, edge model quantization, and real-time inference latency tracking.',
    'ai_intelligence',
    'published',
    true,
    false,
    'DEMO NARRATIVE: Demonstrates how machine learning model constraints, frame budget bottlenecks, and hardware acceleration trade-offs are presented.',
    'DEMO SOLUTION: Illustrates tensor quantization, batch pipelining, and zero-copy memory buffers for low-latency edge deployment.',
    'Sample Stack: PyTorch + TensorRT + ONNX Runtime + C++ Ingestion Daemon (Demo)',
    '[{"label": "Sample FPS", "value": "60", "prefix": "", "suffix": " fps"}, {"label": "Quantized Speedup", "value": "3.4", "prefix": "", "suffix": "x"}]',
    2
)
ON CONFLICT (id) DO NOTHING;

-- Step 5: Demo Project Skills Junction
INSERT INTO public.project_skills (project_id, skill_id, is_primary, display_order)
VALUES
('e0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', true, 1),
('e0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000003', true, 2),
('e0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000001', true, 1),
('e0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000002', true, 2)
ON CONFLICT (project_id, skill_id) DO NOTHING;

-- Step 6: Demo Story
INSERT INTO public.stories (id, slug, title, excerpt, content_mdx, read_time_minutes, tags, status)
VALUES
(
    'f0000000-0000-0000-0000-000000000001',
    'demo-architecting-resilient-event-streams',
    'Architecting Resilient Event Streams under High Concurrency (Demo Case Study)',
    'A sample demonstration essay demonstrating reading progress, code block rendering, and technical narrative structure in the Chronicle.',
    '## Demonstration Case Study\n\nNotice: This is synthetic demonstration prose illustrating the article layout and syntax styling.\n\n### 1. The Distributed Ingestion Challenge\n\nIn high-throughput event processing architectures, sudden spikes in traffic can saturate database write pools. This article demonstrates how buffer layers and backpressure signaling maintain system stability.',
    4,
    ARRAY['Architecture', 'Distributed Systems', 'Demo'],
    'published'
)
ON CONFLICT (id) DO NOTHING;
