// ============================================================================
// THE YACINEVERSE — Centralized Synthetic Demonstration Dataset
// Location: src/lib/demo-data/index.ts
//
// NOTICE: THIS IS 100% FICTIONAL DEMONSTRATION DATA.
// The Product Owner will supply their own real professional history,
// verified projects, employment, credentials, and achievements later.
// ============================================================================

import type { Project, Experience, Credential, Skill, Story, Milestone } from '@/types/database';

export const DEMO_NOTICE = 'DEMO DATA — REPLACE WITH YOUR OWN CONTENT';

export const DEMO_SKILLS: Skill[] = [
  {
    id: 'demo-skill-1',
    name: 'Distributed Systems (Demo)',
    category: 'Architecture',
    proficiency: 90,
    is_top_skill: true,
    display_order: 1,
    is_visible: true,
    is_demo: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-skill-2',
    name: 'Cloud Infrastructure (Demo)',
    category: 'DevOps & Systems',
    proficiency: 88,
    is_top_skill: true,
    display_order: 2,
    is_visible: true,
    is_demo: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-skill-3',
    name: 'Real-Time Telemetry (Demo)',
    category: 'Backend & Data',
    proficiency: 85,
    is_top_skill: true,
    display_order: 3,
    is_visible: true,
    is_demo: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const DEMO_PROJECTS: Project[] = [
  {
    id: 'demo-project-1',
    slug: 'demo-distributed-telemetry-engine',
    title: 'Project Chronos: Distributed Telemetry Mesh',
    tagline: 'Demonstration Architecture — High-throughput event processing prototype',
    summary: 'A sample demonstration project illustrating how technical case studies, architectural challenge breakdowns, system topologies, and verified performance metrics appear in THE YACINEVERSE.',
    sector: 'core_systems',
    status: 'published',
    is_featured: true,
    is_flagship: true,
    is_demo: true,
    challenge_narrative: 'DEMO NARRATIVE: Demonstrates how complex engineering challenges, latency bottlenecks, and technical trade-offs are structured for technical recruiters and engineering directors.',
    solution_narrative: 'DEMO SOLUTION: Illustrates architectural solutions, resilient retry algorithms, and distributed queue topologies designed under real-world constraints.',
    architecture_overview: 'Sample Stack: Go / Rust Event Brokers + Redis Shards + PostgreSQL Data Lake + WebGL Telemetry Visualizer (Demo)',
    impact_metrics: [
      { label: 'Sample Throughput', value: '10,000', prefix: '', suffix: ' msg/s' },
      { label: 'Sample P99 Latency', value: '12', prefix: '< ', suffix: 'ms' },
      { label: 'Demo Uptime', value: '99.9', prefix: '', suffix: '%' },
    ],
    display_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    skills: [DEMO_SKILLS[0], DEMO_SKILLS[2]],
  },
  {
    id: 'demo-project-2',
    slug: 'demo-neural-inference-pipeline',
    title: 'Project Hyperion: Edge Neural Pipeline',
    tagline: 'Demonstration Architecture — Low-latency computer vision inference prototype',
    summary: 'A sample demonstration project illustrating AI pipeline integration, edge model quantization, and real-time inference latency tracking.',
    sector: 'ai_intelligence',
    status: 'published',
    is_featured: true,
    is_flagship: false,
    is_demo: true,
    challenge_narrative: 'DEMO NARRATIVE: Demonstrates how machine learning model constraints, frame budget bottlenecks, and hardware acceleration trade-offs are presented.',
    solution_narrative: 'DEMO SOLUTION: Illustrates tensor quantization, batch pipelining, and zero-copy memory buffers for low-latency edge deployment.',
    architecture_overview: 'Sample Stack: PyTorch + TensorRT + ONNX Runtime + C++ Ingestion Daemon (Demo)',
    impact_metrics: [
      { label: 'Sample FPS', value: '60', prefix: '', suffix: ' fps' },
      { label: 'Quantized Speedup', value: '3.4', prefix: '', suffix: 'x' },
    ],
    display_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    skills: [DEMO_SKILLS[0], DEMO_SKILLS[1]],
  },
];

export const DEMO_EXPERIENCES: Experience[] = [
  {
    id: 'demo-experience-1',
    role: 'Staff Systems Architect (Demonstration Role)',
    organization: 'Fictional Technology Labs Inc. (Demo)',
    employment_type: 'Full-time (Sample)',
    location: 'Remote (Sample)',
    start_date: '2023-01-01',
    end_date: null,
    is_current: true,
    description: 'DEMO RECORD: This placeholder illustrates how career positions, leadership highlights, and verifiable technical impact bullet points render in the Professional Dossier.',
    highlights: [
      'Sample accomplishment: Directed the architectural transition to event-driven microservices.',
      'Sample accomplishment: Reduced multi-region data synchronization latency by 45%.',
      'Sample accomplishment: Mentored engineering leads and authored platform engineering standards.',
    ],
    status: 'published',
    display_order: 1,
    is_demo: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const DEMO_CREDENTIALS: Credential[] = [
  {
    id: 'demo-credential-1',
    title: 'Professional Cloud Systems Architect (Sample Certification)',
    issuer: 'Fictional Cloud Institute (Demo)',
    credential_type: 'certification',
    issue_date: '2024-01-15',
    credential_url: 'https://example.com/demo-credential',
    credential_id_number: 'DEMO-CERT-000000',
    status: 'published',
    display_order: 1,
    is_demo: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const DEMO_STORIES: Story[] = [
  {
    id: 'demo-story-1',
    slug: 'demo-architecting-resilient-event-streams',
    title: 'Architecting Resilient Event Streams under High Concurrency (Demo Case Study)',
    excerpt: 'A sample demonstration essay demonstrating reading progress, code block rendering, and technical narrative structure in the Chronicle.',
    content_mdx: `## Demonstration Case Study

> **Notice:** This is synthetic demonstration prose illustrating the article layout and syntax styling.

### 1. The Distributed Ingestion Challenge

In high-throughput event processing architectures, sudden spikes in traffic can saturate database write pools. This article demonstrates how buffer layers and backpressure signaling maintain system stability.

\`\`\`typescript
// Sample buffer backpressure queue
interface StreamBuffer<T> {
  enqueue(event: T): Promise<boolean>;
  drain(batchSize: number): Promise<T[]>;
}
\`\`\`

### 2. Idempotent Processing

Every incoming message is deduplicated against a transactional log with a configurable expiration window, guaranteeing exactly-once side effects.`,
    read_time_minutes: 4,
    tags: ['Architecture', 'Distributed Systems', 'Demo'],
    status: 'published',
    is_demo: true,
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const DEMO_MILESTONES: Milestone[] = [
  {
    id: 'demo-milestone-1',
    title: 'Platform Architecture Baseline Established (Demo Milestone)',
    description: 'Demonstration checkpoint showing personal evolution timeline rendering.',
    milestone_date: '2024-01-01',
    status: 'published',
    is_demo: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];
