// ============================================================================
// THE YACINEVERSE — Enterprise Design Tokens & Sci-Fi Visual Identity
// Authoritative Design System for 3D Environments, Shaders, Terminals & HUD
// ============================================================================

import type { WorldId } from '@/components/universe/universe-types';

export interface WorldMaterialTokens {
  primary: string;
  secondary: string;
  accent: string;
  emissive: string;
  background: string;
  fog: string;
  surfaceRoughness: number;
  surfaceMetalness: number;
  emissiveIntensity: number;
  atmosphereDensity: number;
  ambientLightIntensity: number;
  directionalLightIntensity: number;
}

export interface DesignTokens {
  core: {
    void: string;
    deepSpace: string;
    starlight: string;
    hudCyan: string;
    hudEmerald: string;
    hudAmber: string;
    hudViolet: string;
    hudRose: string;
    glassBackground: string;
    glassBorder: string;
    glassHighlight: string;
  };
  typography: {
    fontMono: string;
    fontDisplay: string;
    fontSans: string;
    trackingWidest: string;
  };
  lighting: {
    ambientSpace: number;
    sunIntensity: number;
    nexusGlow: number;
    beaconIntensity: number;
    terminalHighlight: number;
  };
  motion: {
    cinematicDuration: number;
    warpTransitionDuration: number;
    terminalTransitionDuration: number;
    easeOutExpo: [number, number, number, number];
    easeInOutCubic: [number, number, number, number];
  };
  worlds: Record<WorldId, WorldMaterialTokens>;
}

export const DESIGN_TOKENS: DesignTokens = {
  core: {
    void: '#030712',
    deepSpace: '#050914',
    starlight: '#F8FAFC',
    hudCyan: '#06B6D4',
    hudEmerald: '#10B981',
    hudAmber: '#F59E0B',
    hudViolet: '#8B5CF6',
    hudRose: '#EC4899',
    glassBackground: 'rgba(7, 12, 26, 0.78)',
    glassBorder: 'rgba(148, 163, 184, 0.15)',
    glassHighlight: 'rgba(255, 255, 255, 0.08)',
  },
  typography: {
    fontMono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    fontDisplay: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    trackingWidest: '0.25em',
  },
  lighting: {
    ambientSpace: 0.35,
    sunIntensity: 1.8,
    nexusGlow: 2.5,
    beaconIntensity: 3.0,
    terminalHighlight: 1.6,
  },
  motion: {
    cinematicDuration: 4.8,
    warpTransitionDuration: 2.2,
    terminalTransitionDuration: 0.35,
    easeOutExpo: [0.16, 1, 0.3, 1],
    easeInOutCubic: [0.65, 0, 0.35, 1],
  },
  worlds: {
    core_systems: {
      primary: '#10B981',
      secondary: '#059669',
      accent: '#34D399',
      emissive: '#047857',
      background: '#021e14',
      fog: '#03170e',
      surfaceRoughness: 0.22,
      surfaceMetalness: 0.88,
      emissiveIntensity: 1.6,
      atmosphereDensity: 0.014,
      ambientLightIntensity: 0.45,
      directionalLightIntensity: 1.4,
    },
    ai_intelligence: {
      primary: '#06B6D4',
      secondary: '#0891B2',
      accent: '#22D3EE',
      emissive: '#0E7490',
      background: '#041624',
      fog: '#03111c',
      surfaceRoughness: 0.15,
      surfaceMetalness: 0.92,
      emissiveIntensity: 1.9,
      atmosphereDensity: 0.016,
      ambientLightIntensity: 0.5,
      directionalLightIntensity: 1.5,
    },
    engineering: {
      primary: '#F59E0B',
      secondary: '#D97706',
      accent: '#FBBF24',
      emissive: '#B45309',
      background: '#1c1103',
      fog: '#150c02',
      surfaceRoughness: 0.35,
      surfaceMetalness: 0.75,
      emissiveIntensity: 1.5,
      atmosphereDensity: 0.012,
      ambientLightIntensity: 0.4,
      directionalLightIntensity: 1.6,
    },
    creations: {
      primary: '#8B5CF6',
      secondary: '#7C3AED',
      accent: '#A78BFA',
      emissive: '#6D28D9',
      background: '#160829',
      fog: '#100520',
      surfaceRoughness: 0.18,
      surfaceMetalness: 0.85,
      emissiveIntensity: 1.8,
      atmosphereDensity: 0.015,
      ambientLightIntensity: 0.48,
      directionalLightIntensity: 1.45,
    },
    origins: {
      primary: '#EC4899',
      secondary: '#DB2777',
      accent: '#F472B6',
      emissive: '#BE185D',
      background: '#230818',
      fog: '#180410',
      surfaceRoughness: 0.25,
      surfaceMetalness: 0.8,
      emissiveIntensity: 1.7,
      atmosphereDensity: 0.013,
      ambientLightIntensity: 0.42,
      directionalLightIntensity: 1.35,
    },
  },
};
