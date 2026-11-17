'use client';

// ============================================================================
// THE YACINEVERSE — Master Universe Explorer Container
// Mounts Cinematic First-Person Universe Experience with WebGL Error Boundary
// ============================================================================

import React, { useState, Component, type ReactNode } from 'react';
import type { Project, Skill, Experience, Credential, Story } from '@/types/database';
import { UniverseCanvas } from './universe-canvas';
import { UniverseExperience } from './universe-experience';

interface Universe3DWrapperProps {
  projects: Project[];
  skills?: Skill[];
  experiences?: Experience[];
  credentials?: Credential[];
  stories?: Story[];
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

export function Universe3DWrapper({
  projects,
  skills = [],
  experiences = [],
  credentials = [],
  stories = [],
}: Universe3DWrapperProps) {
  const [is3DMode, setIs3DMode] = useState(true);
  const [webGlAvailable] = useState(() => checkWebGLSupport());

  const handleToggle3D = () => {
    setIs3DMode((prev) => !prev);
  };

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
              Enter 3D Cinematic Universe →
            </button>
          </div>
        )}
        <UniverseCanvas projects={projects} />
      </div>
    );
  }

  // Real First-Person 3D Game-Quality Universe Experience (Default)
  return (
    <WebGLErrorBoundary fallback={<UniverseCanvas projects={projects} />}>
      <UniverseExperience
        projects={projects}
        skills={skills}
        experiences={experiences}
        credentials={credentials}
        stories={stories}
        onToggle2D={handleToggle3D}
        is2DAvailable={webGlAvailable}
      />
    </WebGLErrorBoundary>
  );
}
