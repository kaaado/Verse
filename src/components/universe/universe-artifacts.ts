// ============================================================================
// THE YACINEVERSE — Authoritative World Artifacts Directory
// Single source of truth for spatial artifacts across 3D worlds & controls
// ============================================================================

import type { Project, Skill, Experience, Credential, Story } from '@/types/database';
import type { WorldId, InteractiveArtifact } from './universe-types';

export interface WorldDataContext {
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  credentials: Credential[];
  stories: Story[];
}

export function getWorldArtifacts(
  worldId: WorldId,
  data: WorldDataContext
): InteractiveArtifact[] {
  const { projects, skills, experiences, stories } = data;
  const list: InteractiveArtifact[] = [];

  switch (worldId) {
    case 'core_systems': {
      const p = projects.find((proj) => proj.slug === 'project-chronos') || projects[0];
      const s = skills.find((sk) => sk.category.toLowerCase().includes('backend')) || skills[0];

      if (p) {
        list.push({
          id: 'chronos-monolith',
          type: 'project',
          title: p.title,
          subtitle: p.tagline,
          position: [-6, 1.8, 0],
          color: '#10B981',
          data: p,
        });
      }
      if (s) {
        list.push({
          id: 'backend-pillar',
          type: 'skill',
          title: s.name,
          subtitle: `Proficiency: ${s.proficiency}%`,
          position: [6, 1.8, -2],
          color: '#10B981',
          data: s,
        });
      }
      list.push({
        id: 'exit-portal-core',
        type: 'portal',
        title: 'Space Orbit Gateway',
        subtitle: 'Return to Deep Space Flight',
        position: [0, 1.8, 14],
        color: '#10B981',
      });
      break;
    }

    case 'ai_intelligence': {
      const p = projects.find((proj) => proj.slug === 'project-hyperion') || projects[0];
      const s = skills.find((sk) => sk.category.toLowerCase().includes('ai')) || skills[0];

      if (p) {
        list.push({
          id: 'hyperion-core',
          type: 'project',
          title: p.title,
          subtitle: p.tagline,
          position: [6, 1.8, 0],
          color: '#06B6D4',
          data: p,
        });
      }
      if (s) {
        list.push({
          id: 'ai-matrix-pillar',
          type: 'skill',
          title: s.name,
          subtitle: `Proficiency: ${s.proficiency}%`,
          position: [-6, 1.8, -2],
          color: '#06B6D4',
          data: s,
        });
      }
      list.push({
        id: 'exit-portal-ai',
        type: 'portal',
        title: 'Space Orbit Gateway',
        subtitle: 'Return to Deep Space Flight',
        position: [0, 1.8, 14],
        color: '#06B6D4',
      });
      break;
    }

    case 'engineering': {
      const infraSkill = skills.find((sk) =>
        sk.category.toLowerCase().includes('infra') ||
        sk.category.toLowerCase().includes('devops') ||
        sk.category.toLowerCase().includes('cloud')
      ) || skills[0];

      if (infraSkill) {
        list.push({
          id: 'telemetry-station',
          type: 'skill',
          title: infraSkill.name,
          subtitle: `Proficiency: ${infraSkill.proficiency}% • Infrastructure`,
          position: [-5, 1.8, -2],
          color: '#F59E0B',
          data: infraSkill,
        });
      }
      list.push({
        id: 'field-sync-artifact',
        type: 'project',
        title: 'Resilient Edge Mesh Network',
        subtitle: 'Fault-Tolerant Offline Sync Protocol',
        position: [5, 1.8, -2],
        color: '#F59E0B',
      });
      list.push({
        id: 'exit-portal-engineering',
        type: 'portal',
        title: 'Space Orbit Gateway',
        subtitle: 'Return to Deep Space Flight',
        position: [0, 1.8, 14],
        color: '#F59E0B',
      });
      break;
    }

    case 'creations': {
      list.push({
        id: 'sandbox-engine',
        type: 'project',
        title: 'Cosmic Sandbox Engine',
        subtitle: 'Interactive 3D WebGL Visualization Suite',
        position: [-6, 1.8, -1],
        color: '#8B5CF6',
      });
      list.push({
        id: 'devtools-artifact',
        type: 'project',
        title: 'Developer Ergonomics Suite',
        subtitle: 'Zero-Trust API Routing & Cache Utilities',
        position: [6, 1.8, -1],
        color: '#8B5CF6',
      });
      list.push({
        id: 'exit-portal-creations',
        type: 'portal',
        title: 'Space Orbit Gateway',
        subtitle: 'Return to Deep Space Flight',
        position: [0, 1.8, 14],
        color: '#8B5CF6',
      });
      break;
    }

    case 'origins': {
      const story = stories[0];
      const experience = experiences[0];

      if (story) {
        list.push({
          id: 'chronicle-archive',
          type: 'story',
          title: story.title,
          subtitle: `Technical Chronicle • ${story.read_time_minutes} min read`,
          position: [-6, 1.8, -1],
          color: '#EC4899',
          data: story,
        });
      }
      if (experience) {
        list.push({
          id: 'career-stela',
          type: 'experience',
          title: `${experience.role} @ ${experience.organization}`,
          subtitle: `Career Horizon • ${experience.start_date} – Present`,
          position: [6, 1.8, -1],
          color: '#EC4899',
          data: experience,
        });
      }
      list.push({
        id: 'exit-portal-origins',
        type: 'portal',
        title: 'Space Orbit Gateway',
        subtitle: 'Return to Deep Space Flight',
        position: [0, 1.8, 14],
        color: '#EC4899',
      });
      break;
    }
  }

  return list;
}
