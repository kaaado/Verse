'use client';

// ============================================================================
// THE YACINEVERSE — Master Universe Explorer Container
// Integrates 3D WebGL game-quality scene with Framer Motion HUD & 2D fallback
// ============================================================================

import React, { useState, useSyncExternalStore, Component, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import type { Project } from '@/types/database';
import { UniverseCanvas } from './universe-canvas';
import { UniverseHUDOverlay } from './universe-hud-overlay';
import { Universe3DScene } from './universe-3d-scene';

// Dynamically import Canvas from @react-three/fiber with SSR disabled
const FiberCanvas = dynamic(
  () => import('@react-three/fiber').then((mod) => mod.Canvas),
  { ssr: false }
);

interface Universe3DWrapperProps {
  projects: Project[];
}

interface WebGLErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface WebGLErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<WebGLErrorBoundaryProps, WebGLErrorBoundaryState> {
  constructor(props: WebGLErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('WebGL Rendering Error, falling back to 2D Celestial Canvas:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function emptySubscribe() {
  return () => {};
}

function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

function checkWebGLSupport(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export function Universe3DWrapper({ projects }: Universe3DWrapperProps) {
  const isClient = useIsClient();
  const [activeSectorId, setActiveSectorId] = useState<string | null>(null);
  const [is3DMode, setIs3DMode] = useState(true);
  const [webGlAvailable] = useState(() => checkWebGLSupport());

  const handleSelectSector = (sectorId: string | null) => {
    setActiveSectorId(sectorId);
  };

  const handleResetNexus = () => {
    setActiveSectorId(null);
  };

  const handleToggle3D = () => {
    setIs3DMode((prev) => !prev);
  };

  // SSR or initial mounting placeholder
  if (!isClient) {
    return (
      <div className="relative w-full h-[calc(100vh-4rem)] bg-[#0B0F19] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3 text-xs font-mono text-[#10B981]">
          <span className="w-3 h-3 rounded-full bg-[#10B981] animate-ping" />
          <span>INITIALIZING CELESTIAL COORDINATES...</span>
        </div>
      </div>
    );
  }

  // 2D Planar Map (Active when 3D is toggled off or WebGL is unavailable)
  if (!is3DMode || !webGlAvailable) {
    return (
      <div className="relative w-full h-[calc(100vh-4rem)]">
        {!webGlAvailable && (
          <div className="absolute top-2 inset-x-0 z-40 flex justify-center pointer-events-none">
            <span className="text-[10px] font-mono bg-[#F59E0B]/20 border border-[#F59E0B]/40 text-[#F59E0B] px-3 py-1 rounded-full backdrop-blur-md">
              Hardware WebGL unavailable on this display — Accessible 2D Celestial Grid active
            </span>
          </div>
        )}
        {webGlAvailable && (
          <div className="absolute top-4 right-4 z-40">
            <button
              type="button"
              onClick={handleToggle3D}
              className="px-3 py-1.5 rounded-xl text-xs font-mono bg-[#10B981] text-[#0B0F19] font-bold shadow-[0_0_12px_rgba(16,185,129,0.3)] hover:bg-[#10B981]/90 transition-all"
            >
              Switch to 3D Orbit View →
            </button>
          </div>
        )}
        <UniverseCanvas projects={projects} />
      </div>
    );
  }

  // Real 3D Game-Quality Experience (Default)
  return (
    <div className="relative w-full h-[calc(100vh-4rem)] bg-[#0B0F19] overflow-hidden select-none">
      <WebGLErrorBoundary fallback={<UniverseCanvas projects={projects} />}>
        {/* 3D WebGL Canvas */}
        <FiberCanvas
          camera={{ position: [0, 10, 48], fov: 45 }}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
          }}
          className="w-full h-full"
        >
          <color attach="background" args={['#0B0F19']} />
          <Universe3DScene
            projects={projects}
            activeSectorId={activeSectorId}
            onSelectSector={handleSelectSector}
            onResetNexus={handleResetNexus}
          />
        </FiberCanvas>

        {/* Framer Motion HUD & Cinematic Interaction Drawer */}
        <UniverseHUDOverlay
          projects={projects}
          activeSectorId={activeSectorId}
          onSelectSector={handleSelectSector}
          onResetNexus={handleResetNexus}
          is3DMode={is3DMode}
          onToggle3DMode={handleToggle3D}
          webGlAvailable={webGlAvailable}
        />
      </WebGLErrorBoundary>
    </div>
  );
}
