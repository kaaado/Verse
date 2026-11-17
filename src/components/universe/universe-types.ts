// ============================================================================
// THE YACINEVERSE — Cinematic First-Person Exploration State & Types
// State Machine: BOOT -> INTRO -> LAUNCH -> REVEAL -> SPACE -> WARP -> WORLD
// ============================================================================

import type { Project, Skill, Experience, Credential, Story } from '@/types/database';

export type UniverseStateType =
  | 'BOOT'
  | 'INTRO'
  | 'LAUNCH'
  | 'UNIVERSE_REVEAL'
  | 'SPACE_FLIGHT'
  | 'APPROACHING_WORLD'
  | 'WARP_TRANSITION'
  | 'WORLD_EXPLORATION'
  | 'PAUSED';

export type WorldId =
  | 'core_systems'
  | 'ai_intelligence'
  | 'engineering'
  | 'creations'
  | 'origins';

export interface WorldMetadata {
  id: WorldId;
  title: string;
  subtitle: string;
  themeColor: string;
  emissiveColor: string;
  spaceCoordinates: [number, number, number];
  approachRadius: number;
  atmosphereDescription: string;
  architecturalStyle: string;
}

export interface InteractiveArtifact {
  id: string;
  type: 'project' | 'skill' | 'experience' | 'credential' | 'story' | 'portal';
  title: string;
  subtitle?: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  color: string;
  data?: Project | Skill | Experience | Credential | Story;
}

export interface ExplorationContextState {
  currentState: UniverseStateType;
  activeWorld: WorldId | null;
  targetWorld: WorldId | null;
  warpDestination: 'space' | WorldId | null;
  isAudioMuted: boolean;
  discoveredWorlds: Set<WorldId>;
  discoveredArtifacts: Set<string>;
  activeArtifact: InteractiveArtifact | null;
  isPointerLocked: boolean;
  isReducedMotion: boolean;
}

export const WORLDS_CONFIG: Record<WorldId, WorldMetadata> = {
  core_systems: {
    id: 'core_systems',
    title: 'Core Systems & Architecture',
    subtitle: 'Cybernetic Monoliths & Zero-Trust Infrastructure',
    themeColor: '#10B981',
    emissiveColor: '#059669',
    spaceCoordinates: [-32, 4, -14],
    approachRadius: 18,
    atmosphereDescription: 'High-density computational atmosphere with pulsing data conduit highways.',
    architecturalStyle: 'Floating obsidian monoliths, glowing data rivers, and server tower complexes.',
  },
  ai_intelligence: {
    id: 'ai_intelligence',
    title: 'AI & Machine Intelligence',
    subtitle: 'Neural Nexus & Autonomous Agent Graphs',
    themeColor: '#06B6D4',
    emissiveColor: '#0891B2',
    spaceCoordinates: [32, 8, -18],
    approachRadius: 18,
    atmosphereDescription: 'Synaptic particle nebula with glowing geometric consciousness clusters.',
    architecturalStyle: 'Geodesic crystalline observatories, levitating tensor matrices, and neural synapse rings.',
  },
  engineering: {
    id: 'engineering',
    title: 'Engineering & Field Systems',
    subtitle: 'Resilient Edge Nodes & Industrial Telemetry',
    themeColor: '#F59E0B',
    emissiveColor: '#D97706',
    spaceCoordinates: [24, -20, 12],
    approachRadius: 18,
    atmosphereDescription: 'Industrial telemetry grid with orbital solar arrays and edge beacons.',
    architecturalStyle: 'Orbital research platforms, steel truss catwalks, and IoT laboratory modules.',
  },
  creations: {
    id: 'creations',
    title: 'Creations & Utilities',
    subtitle: 'Prismatic archipelago & Creative Engine Pods',
    themeColor: '#8B5CF6',
    emissiveColor: '#7C3AED',
    spaceCoordinates: [-26, -18, 16],
    approachRadius: 18,
    atmosphereDescription: 'Refractive purple aurora with floating geometric polyhedra.',
    architecturalStyle: 'Crystalline levitating islands, developer sandbox arenas, and interactive prisms.',
  },
  origins: {
    id: 'origins',
    title: 'Origins & Evolution',
    subtitle: 'Celestial Observatory & Chronometer Archive',
    themeColor: '#EC4899',
    emissiveColor: '#DB2777',
    spaceCoordinates: [0, 28, -12],
    approachRadius: 18,
    atmosphereDescription: 'Starlit rose chronosphere with historical memory constellation rings.',
    architecturalStyle: 'Grand astrolabe observatory, floating marble memory stelae, and the Eternal Spire.',
  },
};
