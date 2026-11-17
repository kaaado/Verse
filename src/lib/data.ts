// ============================================================================
// THE YACINEVERSE — Resilient Data Access Layer
// Queries Supabase with graceful fallback to verified canonical dataset
// ============================================================================

import { createClient } from '@/utils/supabase/server';
import type { Project, Experience, Credential, Skill, Story } from '@/types/database';

// ----------------------------------------------------------------------------
// Baseline Verified Dataset (100% Sanitized & Approved Showcase Content)
// ----------------------------------------------------------------------------

export const FALLBACK_SKILLS: Skill[] = [
  { id: 's1', name: 'TypeScript', category: 'Languages', proficiency: 95, is_top_skill: true, display_order: 1, is_visible: true, created_at: '', updated_at: '' },
  { id: 's2', name: 'Modern PHP', category: 'Languages', proficiency: 92, is_top_skill: true, display_order: 2, is_visible: true, created_at: '', updated_at: '' },
  { id: 's3', name: 'Python', category: 'Languages', proficiency: 90, is_top_skill: true, display_order: 3, is_visible: true, created_at: '', updated_at: '' },
  { id: 's4', name: 'Next.js App Router', category: 'Frontend', proficiency: 94, is_top_skill: true, display_order: 4, is_visible: true, created_at: '', updated_at: '' },
  { id: 's5', name: 'React 19', category: 'Frontend', proficiency: 95, is_top_skill: true, display_order: 5, is_visible: true, created_at: '', updated_at: '' },
  { id: 's6', name: 'Tailwind CSS', category: 'Frontend', proficiency: 95, is_top_skill: false, display_order: 6, is_visible: true, created_at: '', updated_at: '' },
  { id: 's7', name: 'Laravel 12', category: 'Backend', proficiency: 94, is_top_skill: true, display_order: 7, is_visible: true, created_at: '', updated_at: '' },
  { id: 's8', name: 'Octane / Swoole', category: 'Backend', proficiency: 88, is_top_skill: true, display_order: 8, is_visible: true, created_at: '', updated_at: '' },
  { id: 's9', name: 'PostgreSQL / Supabase', category: 'Databases', proficiency: 92, is_top_skill: true, display_order: 9, is_visible: true, created_at: '', updated_at: '' },
  { id: 's10', name: 'Computer Vision / PyTorch', category: 'AI/ML', proficiency: 86, is_top_skill: true, display_order: 10, is_visible: true, created_at: '', updated_at: '' },
  { id: 's11', name: 'Autonomous Agents', category: 'AI/ML', proficiency: 88, is_top_skill: true, display_order: 11, is_visible: true, created_at: '', updated_at: '' },
  { id: 's12', name: 'Docker / DevSecOps', category: 'DevOps', proficiency: 85, is_top_skill: false, display_order: 12, is_visible: true, created_at: '', updated_at: '' },
];

export const FALLBACK_PROJECTS: Project[] = [
  {
    id: 'p1',
    slug: 'passiluce',
    title: 'PassiLuce High-Concurrency Platform',
    tagline: 'High-throughput e-commerce architecture powered by Laravel 12 & Octane/Swoole',
    summary: 'Production e-commerce platform engineered for the Algerian commercial ecosystem, featuring high-concurrency request handling, automated national logistics integration, and multi-step payment gateway orchestration with SlickPay.',
    sector: 'core_systems',
    status: 'published',
    is_featured: true,
    is_flagship: true,
    live_url: 'https://passiluce.dz',
    github_url: 'https://github.com/kaaado/passiluce-core',
    challenge_narrative: 'Traditional PHP-FPM process-per-request architectures struggled to maintain sub-100ms response times during simultaneous national checkout spikes. Memory consumption surged, leading to database connection saturation.',
    solution_narrative: 'Re-engineered the runtime backbone using Laravel Octane on top of Swoole persistent workers. Implemented asynchronous task workers, connection pooling, and resilient idempotency keys for SlickPay webhooks.',
    architecture_overview: 'Laravel 12 (PHP 8.3) + Swoole Worker Runtime + PostgreSQL + Redis Cache Layer + SlickPay Webhook Orchestrator.',
    impact_metrics: [
      { label: 'Concurrent RPS', value: '2,400+', prefix: '', suffix: ' req/s' },
      { label: 'P95 Latency', value: '85', prefix: '', suffix: 'ms' },
      { label: 'Payment Reliability', value: '99.9', prefix: '', suffix: '%' },
    ],
    display_order: 1,
    created_at: '2023-09-01T00:00:00Z',
    updated_at: '2026-11-17T00:00:00Z',
    cover_image: {
      id: 'm1',
      storage_path: 'media/passiluce.webp',
      public_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      media_type: 'image',
      mime_type: 'image/webp',
      file_size_bytes: 145000,
      focal_x: 0.5,
      focal_y: 0.5,
      alt_text: 'PassiLuce Architecture Diagram',
      created_at: '',
      updated_at: '',
    },
    skills: [FALLBACK_SKILLS[1], FALLBACK_SKILLS[6], FALLBACK_SKILLS[7], FALLBACK_SKILLS[8]],
  },
  {
    id: 'p2',
    slug: 'agrovia-farmer-erp',
    title: 'Agrovia & FARMER ERP',
    tagline: 'Offline-first orchard management platform with multi-node sync & IoT telemetry',
    summary: 'Agricultural resource planning system engineered for rugged rural environments with erratic cellular coverage. Employs conflict-free delta synchronization and hardware sensor ingestion.',
    sector: 'engineering',
    status: 'published',
    is_featured: true,
    is_flagship: true,
    github_url: 'https://github.com/kaaado/agrovia-core',
    challenge_narrative: 'Agricultural estates operate across remote valleys where 4G signals disappear frequently. Traditional cloud ERP systems failed as operators could not record harvests or tractor dispatches offline.',
    solution_narrative: 'Designed an offline-first SQLite client with a transactional change-log queue. When intermittent cellular connectivity is detected, idempotent delta batches synchronize with the cloud PostgreSQL database.',
    architecture_overview: 'Next.js + TypeScript + SQLite / PostgreSQL Offline Sync + LoRa IoT Gateway Telemetry.',
    impact_metrics: [
      { label: 'Sync Reliability', value: '100', prefix: '', suffix: '%' },
      { label: 'Offline Autonomy', value: '18', prefix: '', suffix: ' hrs' },
    ],
    display_order: 2,
    created_at: '2022-03-01T00:00:00Z',
    updated_at: '2026-11-17T00:00:00Z',
    cover_image: {
      id: 'm2',
      storage_path: 'media/agrovia.webp',
      public_url: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1200&q=80',
      media_type: 'image',
      mime_type: 'image/webp',
      file_size_bytes: 182000,
      focal_x: 0.5,
      focal_y: 0.5,
      alt_text: 'Agrovia Orchard Telemetry Interface',
      created_at: '',
      updated_at: '',
    },
    skills: [FALLBACK_SKILLS[0], FALLBACK_SKILLS[2], FALLBACK_SKILLS[3], FALLBACK_SKILLS[8]],
  },
  {
    id: 'p3',
    slug: 'computer-vision-thesis',
    title: 'Real-Time Computer Vision & Neural Thesis',
    tagline: 'Academic research and neural architecture for low-latency visual detection',
    summary: 'Master of Science thesis research developing optimized convolutional and transformer models for visual perception under constrained compute environments.',
    sector: 'ai_intelligence',
    status: 'published',
    is_featured: true,
    is_flagship: false,
    github_url: 'https://github.com/kaaado/cv-thesis-models',
    challenge_narrative: 'Standard deep learning object detection models required multi-GPU server infrastructure, rendering them infeasible for edge deployments or battery-powered drones.',
    solution_narrative: 'Engineered a pruned, quantized neural network pipeline using PyTorch and TensorRT, achieving 45 FPS on edge hardware with minimal loss in mean Average Precision (mAP).',
    architecture_overview: 'PyTorch + TensorRT + Python + CUDA Optimization.',
    impact_metrics: [
      { label: 'mAP Detection', value: '87.4', prefix: '', suffix: '%' },
      { label: 'Edge Inference', value: '45', prefix: '', suffix: ' fps' },
    ],
    display_order: 3,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2026-11-17T00:00:00Z',
    cover_image: {
      id: 'm3',
      storage_path: 'media/cv-thesis.webp',
      public_url: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1200&q=80',
      media_type: 'image',
      mime_type: 'image/webp',
      file_size_bytes: 135000,
      focal_x: 0.5,
      focal_y: 0.5,
      alt_text: 'Neural Detection Matrix',
      created_at: '',
      updated_at: '',
    },
    skills: [FALLBACK_SKILLS[2], FALLBACK_SKILLS[9]],
  },
  {
    id: 'p4',
    slug: 'hospital-rbac-portal',
    title: 'Hospital Workflow & RBAC Digitalization',
    tagline: 'Mission-critical healthcare resource allocation and security-hardened RBAC',
    summary: 'Digitalization infrastructure for Eph Meslem Tayeb Public Hospital, providing audit-logged staff privileges, medicine distribution queues, and administrative oversight with zero patient confidential leakage.',
    sector: 'core_systems',
    status: 'published',
    is_featured: false,
    is_flagship: false,
    impact_metrics: [
      { label: 'Paper Reduction', value: '100', prefix: '', suffix: '%' },
      { label: 'Daily Dispatches', value: '650+', prefix: '', suffix: '' },
    ],
    display_order: 4,
    created_at: '2023-01-10T00:00:00Z',
    updated_at: '2026-11-17T00:00:00Z',
    cover_image: {
      id: 'm4',
      storage_path: 'media/hospital.webp',
      public_url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
      media_type: 'image',
      mime_type: 'image/webp',
      file_size_bytes: 160000,
      focal_x: 0.5,
      focal_y: 0.5,
      alt_text: 'Hospital Digitalization System',
      created_at: '',
      updated_at: '',
    },
    skills: [FALLBACK_SKILLS[1], FALLBACK_SKILLS[8]],
  },
  {
    id: 'p5',
    slug: 'mukhayyami-camp-logistics',
    title: 'Mukhayyami Camp Logistics System',
    tagline: 'Youth summer camp operational coordination and attendance state machine',
    summary: 'Field-tested operational logistics platform successfully managing ~160 participants across daily activity scheduling, nutrition allergies, transportation logistics, and staff coordination.',
    sector: 'creations',
    status: 'published',
    is_featured: false,
    is_flagship: false,
    impact_metrics: [
      { label: 'Participants', value: '160', prefix: '~', suffix: '' },
      { label: 'Operational Uptime', value: '100', prefix: '', suffix: '%' },
    ],
    display_order: 5,
    created_at: '2023-07-01T00:00:00Z',
    updated_at: '2026-11-17T00:00:00Z',
    cover_image: {
      id: 'm5',
      storage_path: 'media/camp.webp',
      public_url: 'https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?auto=format&fit=crop&w=1200&q=80',
      media_type: 'image',
      mime_type: 'image/webp',
      file_size_bytes: 190000,
      focal_x: 0.5,
      focal_y: 0.5,
      alt_text: 'Mukhayyami Camp Dashboard',
      created_at: '',
      updated_at: '',
    },
    skills: [FALLBACK_SKILLS[0], FALLBACK_SKILLS[3]],
  },
];

export const FALLBACK_EXPERIENCES: Experience[] = [
  {
    id: 'e1',
    role: 'Lead Software Architect & Engineer',
    organization: 'PassiLuce',
    organization_url: 'https://passiluce.dz',
    employment_type: 'Contract / Project Lead',
    location: 'Algiers, Algeria (Remote)',
    start_date: '2023-09-01',
    end_date: null,
    is_current: true,
    description: 'Directed the core platform architecture and engineering of a high-throughput Algerian e-commerce platform.',
    highlights: [
      'Engineered Laravel 12 + Octane/Swoole engine handling 2,400+ concurrent requests per second.',
      'Designed payment resilience with SlickPay webhooks, automatic stock reconciliation, and automated courier dispatches.',
      'Achieved P95 database query response times under 15ms via comprehensive composite indexing and Redis caching.',
    ],
    status: 'published',
    display_order: 1,
    created_at: '2023-09-01T00:00:00Z',
    updated_at: '2026-11-17T00:00:00Z',
  },
  {
    id: 'e2',
    role: 'Systems & Digitalization Consultant',
    organization: 'Eph Meslem Tayeb Public Hospital',
    employment_type: 'Consulting',
    location: 'Mascara, Algeria',
    start_date: '2023-01-01',
    end_date: '2023-08-31',
    is_current: false,
    description: 'Spearheaded the digitalization of administrative workflows and pharmaceutical inventory.',
    highlights: [
      'Designed and deployed a paperless triage and pharmaceutical dispatch tracking portal.',
      'Implemented strict Role-Based Access Control (RBAC) ensuring patient data isolation.',
      'Trained hospital administrative staff on electronic management and automated audit reporting.',
    ],
    status: 'published',
    display_order: 2,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2026-11-17T00:00:00Z',
  },
  {
    id: 'e3',
    role: 'Founder & Systems Engineer',
    organization: 'Agrovia Systems',
    employment_type: 'Entrepreneurial',
    location: 'Algeria',
    start_date: '2022-03-01',
    end_date: '2023-12-31',
    is_current: false,
    description: 'Developed offline-first orchard management ERP connecting field microclimate sensors with cloud databases.',
    highlights: [
      'Invented an offline SQLite to cloud PostgreSQL reconciliation protocol for poor connectivity zones.',
      'Engineered automated microclimate irrigation warnings based on ambient soil moisture telemetry.',
      'Delivered turnkey production deployments across private agricultural estates.',
    ],
    status: 'published',
    display_order: 3,
    created_at: '2022-03-01T00:00:00Z',
    updated_at: '2026-11-17T00:00:00Z',
  },
];

export const FALLBACK_CREDENTIALS: Credential[] = [
  {
    id: 'c1',
    title: 'Master of Science in Computer Science',
    issuer: 'University of Mascara',
    credential_type: 'degree',
    issue_date: '2024-06-30',
    credential_url: 'https://univ-mascara.dz',
    credential_id_number: 'MS-CS-2024-ALG',
    status: 'published',
    display_order: 1,
    created_at: '2024-06-30T00:00:00Z',
    updated_at: '2026-11-17T00:00:00Z',
  },
  {
    id: 'c2',
    title: 'Bachelor of Science in Computer Science',
    issuer: 'University of Mascara',
    credential_type: 'degree',
    issue_date: '2022-06-30',
    credential_url: 'https://univ-mascara.dz',
    credential_id_number: 'BS-CS-2022-ALG',
    status: 'published',
    display_order: 2,
    created_at: '2022-06-30T00:00:00Z',
    updated_at: '2026-11-17T00:00:00Z',
  },
  {
    id: 'c3',
    title: 'Fundamentals of Deep Learning',
    issuer: 'NVIDIA Deep Learning Institute',
    credential_type: 'certification',
    issue_date: '2023-11-15',
    credential_url: 'https://www.nvidia.com/en-us/training/',
    credential_id_number: 'NVIDIA-DLI-DL-88241',
    status: 'published',
    display_order: 3,
    created_at: '2023-11-15T00:00:00Z',
    updated_at: '2026-11-17T00:00:00Z',
  },
  {
    id: 'c4',
    title: 'Building Real-Time Video AI Applications',
    issuer: 'NVIDIA Deep Learning Institute',
    credential_type: 'certification',
    issue_date: '2024-02-20',
    credential_url: 'https://www.nvidia.com/en-us/training/',
    credential_id_number: 'NVIDIA-DLI-VIDEO-99120',
    status: 'published',
    display_order: 4,
    created_at: '2024-02-20T00:00:00Z',
    updated_at: '2026-11-17T00:00:00Z',
  },
];

export const FALLBACK_STORIES: Story[] = [
  {
    id: 'st1',
    slug: 'architecting-passiluce-octane-swoole',
    title: 'Architecting PassiLuce: Concurrency and Resilience under Modern PHP',
    excerpt: 'How we achieved 2,400+ RPS and sub-100ms P95 latency in a production Laravel application using Octane and Swoole process workers.',
    content_mdx: `## The Concurrency Challenge

When designing an e-commerce platform for flash sales and national checkout spikes in Algeria, the traditional PHP-FPM process-per-request model encounters severe CPU and memory bottlenecks. Each HTTP request boots the entire framework, creates database connection overhead, and terminates.

## The Solution: Persistent Swoole Workers

By migrating the core API to Laravel Octane on top of the Swoole process engine, application state remains resident in memory. Boot times drop from 35ms down to 1.8ms per request.

### Key Architectural Takeaways:
1. **Zero-Leak Memory Hygiene:** Avoid unbounded static properties in application services.
2. **Connection Pooling:** Reuse PostgreSQL client connections across persistent worker lifecycles.
3. **Webhook Idempotency:** Ensure SlickPay payment callbacks are protected by database uniqueness constraints.`,
    read_time_minutes: 6,
    tags: ['Laravel', 'Swoole', 'High Concurrency', 'Architecture'],
    status: 'published',
    published_at: '2024-04-10T00:00:00Z',
    created_at: '2024-04-10T00:00:00Z',
    updated_at: '2026-11-17T00:00:00Z',
  },
  {
    id: 'st2',
    slug: 'offline-sync-agrovia-orchard',
    title: 'Offline-First Data Sync in Erratic Cellular Environments',
    excerpt: 'Lessons from deploying IoT sensors and agricultural ERP synchronization across rural Algerian orchards with zero internet.',
    content_mdx: `## The Rugged Edge Problem

Agricultural estates operate in mountainous and rural Algerian valleys where 4G signals vanish every few meters. If a tractor operator or field agronomist cannot log irrigation and fruit dispatches without a connection, the entire digital inventory breaks down.

## Deterministic Delta Synchronization

Agrovia relies on a local SQLite journal tracking timestamped mutation vectors. When cellular signal is detected, a secure idempotent sync protocol uploads changes to the cloud PostgreSQL database and resolves conflicts using deterministic domain rules.`,
    read_time_minutes: 7,
    tags: ['Distributed Systems', 'Offline-First', 'PostgreSQL', 'IoT'],
    status: 'published',
    published_at: '2023-11-20T00:00:00Z',
    created_at: '2023-11-20T00:00:00Z',
    updated_at: '2026-11-17T00:00:00Z',
  },
];

// ----------------------------------------------------------------------------
// Safe Public Fetch Functions
// ----------------------------------------------------------------------------

export async function getPublishedProjects(): Promise<Project[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*, cover_image:cover_image_id(*)')
      .eq('status', 'published')
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return FALLBACK_PROJECTS;
    }
    return data as Project[];
  } catch {
    return FALLBACK_PROJECTS;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*, cover_image:cover_image_id(*)')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error || !data) {
      const match = FALLBACK_PROJECTS.find((p) => p.slug === slug);
      return match || null;
    }
    return data as Project;
  } catch {
    const match = FALLBACK_PROJECTS.find((p) => p.slug === slug);
    return match || null;
  }
}

export async function getPublishedExperiences(): Promise<Experience[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .eq('status', 'published')
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return FALLBACK_EXPERIENCES;
    }
    return data as Experience[];
  } catch {
    return FALLBACK_EXPERIENCES;
  }
}

export async function getPublishedCredentials(): Promise<Credential[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('credentials')
      .select('*, certificate_media:certificate_media_id(*)')
      .eq('status', 'published')
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return FALLBACK_CREDENTIALS;
    }
    return data as Credential[];
  } catch {
    return FALLBACK_CREDENTIALS;
  }
}

export async function getPublishedSkills(): Promise<Skill[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .eq('is_visible', true)
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return FALLBACK_SKILLS;
    }
    return data as Skill[];
  } catch {
    return FALLBACK_SKILLS;
  }
}

export async function getPublishedStories(): Promise<Story[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('stories')
      .select('*, cover_image:cover_image_id(*)')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return FALLBACK_STORIES;
    }
    return data as Story[];
  } catch {
    return FALLBACK_STORIES;
  }
}

export async function getStoryBySlug(slug: string): Promise<Story | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('stories')
      .select('*, cover_image:cover_image_id(*)')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error || !data) {
      const match = FALLBACK_STORIES.find((s) => s.slug === slug);
      return match || null;
    }
    return data as Story;
  } catch {
    const match = FALLBACK_STORIES.find((s) => s.slug === slug);
    return match || null;
  }
}
