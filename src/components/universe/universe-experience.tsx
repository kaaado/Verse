'use client';

// ============================================================================
// THE YACINEVERSE — Master Cinematic Experience Orchestrator
// State Machine: BOOT -> INTRO -> LAUNCH -> REVEAL -> SPACE -> WARP -> WORLD
// Coordinates 3D Scene Graph, Flight/Ground Controllers, Cinematics, HUD & Audio
// ============================================================================

import React, { useState, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import type { Project, Skill, Experience, Credential, Story } from '@/types/database';
import {
  type UniverseStateType,
  type WorldId,
  type InteractiveArtifact,
} from './universe-types';
import { universeAudio } from './universe-audio';
import { AwakeningIntro } from './cinematics/awakening-intro';
import { WarpTunnel } from './cinematics/warp-tunnel';
import { FlightControls } from './controllers/flight-controls';
import { WorldControls } from './controllers/world-controls';
import { FirstPersonHUD } from './first-person-hud';
import { Universe3DScene } from './universe-3d-scene';
import { CoreSystemsWorld } from './worlds/core-systems-world';
import { AIIntelligenceWorld } from './worlds/ai-intelligence-world';
import { EngineeringWorld } from './worlds/engineering-world';
import { CreationsWorld } from './worlds/creations-world';
import { OriginsWorld } from './worlds/origins-world';

const FiberCanvas = dynamic(
  () => import('@react-three/fiber').then((mod) => mod.Canvas),
  { ssr: false }
);

interface UniverseExperienceProps {
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  credentials: Credential[];
  stories: Story[];
  onToggle2D: () => void;
  is2DAvailable: boolean;
}

export function UniverseExperience({
  projects,
  skills,
  experiences,
  stories,
  onToggle2D,
  is2DAvailable,
}: UniverseExperienceProps) {
  // Session-persisted intro skip check using lazy state initializers
  const [hasLaunched, setHasLaunched] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      return sessionStorage.getItem('yacineverse_intro_seen') === 'true';
    } catch {
      return false;
    }
  });

  const [currentState, setCurrentState] = useState<UniverseStateType>(() => {
    if (typeof window === 'undefined') return 'INTRO';
    try {
      return sessionStorage.getItem('yacineverse_intro_seen') === 'true'
        ? 'SPACE_FLIGHT'
        : 'INTRO';
    } catch {
      return 'INTRO';
    }
  });

  const [activeWorld, setActiveWorld] = useState<WorldId | null>(null);
  const [approachingWorld, setApproachingWorld] = useState<WorldId | null>(null);
  const [warpTarget, setWarpTarget] = useState<WorldId | 'space'>('space');
  const [discoveredWorlds, setDiscoveredWorlds] = useState<Set<WorldId>>(new Set());

  // In-World Interaction States
  const [nearArtifact, setNearArtifact] = useState<InteractiveArtifact | null>(null);
  const [activeArtifact, setActiveArtifact] = useState<InteractiveArtifact | null>(null);
  const [nearExitPortal, setNearExitPortal] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handleLaunchComplete = () => {
    setHasLaunched(true);
    setCurrentState('SPACE_FLIGHT');
    try {
      sessionStorage.setItem('yacineverse_intro_seen', 'true');
    } catch {}
  };

  const handleSkipIntro = () => {
    setHasLaunched(true);
    setCurrentState('SPACE_FLIGHT');
    try {
      sessionStorage.setItem('yacineverse_intro_seen', 'true');
    } catch {}
  };

  const handleToggleMute = () => {
    const nextMute = universeAudio.toggleMute();
    setIsMuted(nextMute);
  };

  // Interplanetary Warp Trigger (From Space to World, or between Worlds)
  const handleInitiateWarp = useCallback((worldId: WorldId) => {
    setActiveArtifact(null);
    setNearArtifact(null);
    setWarpTarget(worldId);
    setCurrentState('WARP_TRANSITION');
  }, []);

  // Return to Space Orbit Trigger (From World to Space)
  const handleReturnToSpace = useCallback(() => {
    setActiveArtifact(null);
    setNearArtifact(null);
    setWarpTarget('space');
    setCurrentState('WARP_TRANSITION');
  }, []);

  // Warp Arrival Completion Handler
  const handleWarpArrival = useCallback(() => {
    if (warpTarget === 'space') {
      setActiveWorld(null);
      setApproachingWorld(null);
      setCurrentState('SPACE_FLIGHT');
    } else {
      setActiveWorld(warpTarget);
      setDiscoveredWorlds((prev) => new Set([...prev, warpTarget]));
      setCurrentState('WORLD_EXPLORATION');
    }
  }, [warpTarget]);

  // World artifacts list for the active world
  const currentWorldArtifacts = useMemo(() => {
    // In-memory artifacts list matching the active world
    const list: InteractiveArtifact[] = [];
    if (activeWorld === 'core_systems') {
      const p = projects.find((proj) => proj.slug === 'project-chronos') || projects[0];
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
    } else if (activeWorld === 'ai_intelligence') {
      const p = projects.find((proj) => proj.slug === 'project-hyperion') || projects[0];
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
    }
    return list;
  }, [activeWorld, projects]);

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] bg-[#0B0F19] overflow-hidden select-none">
      {/* Scene A1 Awakening & Scene A2 Launch Intro */}
      {!hasLaunched && currentState === 'INTRO' && (
        <AwakeningIntro
          onLaunchComplete={handleLaunchComplete}
          onSkipIntro={handleSkipIntro}
        />
      )}

      {/* 3D WebGL Canvas */}
      <FiberCanvas
        camera={{ position: [0, 4, 38], fov: 45 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        className="w-full h-full"
      >
        <color attach="background" args={['#0B0F19']} />

        {/* 1. Deep Space Flight Mode */}
        {(currentState === 'SPACE_FLIGHT' || currentState === 'APPROACHING_WORLD') && (
          <>
            <Universe3DScene
              projects={projects}
              activeSectorId={approachingWorld}
              onSelectSector={(sectorId) => handleInitiateWarp(sectorId as WorldId)}
              onResetNexus={() => {}}
            />
            <FlightControls
              enabled={true}
              onApproachWorld={setApproachingWorld}
              onInitiateWarp={handleInitiateWarp}
            />
          </>
        )}

        {/* 2. Hyperspace Warp Transition */}
        {currentState === 'WARP_TRANSITION' && (
          <WarpTunnel
            targetWorld={warpTarget}
            onArrival={handleWarpArrival}
          />
        )}

        {/* 3. Interior World Exploration Mode */}
        {currentState === 'WORLD_EXPLORATION' && activeWorld && (
          <>
            {activeWorld === 'core_systems' && (
              <CoreSystemsWorld
                projects={projects}
                skills={skills}
                activeArtifact={activeArtifact}
                onActivateArtifact={setActiveArtifact}
                onCloseArtifact={() => setActiveArtifact(null)}
              />
            )}

            {activeWorld === 'ai_intelligence' && (
              <AIIntelligenceWorld
                projects={projects}
                skills={skills}
                activeArtifact={activeArtifact}
                onActivateArtifact={setActiveArtifact}
                onCloseArtifact={() => setActiveArtifact(null)}
              />
            )}

            {activeWorld === 'engineering' && (
              <EngineeringWorld
                skills={skills}
                activeArtifact={activeArtifact}
                onActivateArtifact={setActiveArtifact}
                onCloseArtifact={() => setActiveArtifact(null)}
              />
            )}

            {activeWorld === 'creations' && (
              <CreationsWorld
                activeArtifact={activeArtifact}
                onActivateArtifact={setActiveArtifact}
                onCloseArtifact={() => setActiveArtifact(null)}
              />
            )}

            {activeWorld === 'origins' && (
              <OriginsWorld
                stories={stories}
                experiences={experiences}
                activeArtifact={activeArtifact}
                onActivateArtifact={setActiveArtifact}
                onCloseArtifact={() => setActiveArtifact(null)}
              />
            )}

            <WorldControls
              enabled={true}
              artifacts={currentWorldArtifacts}
              onNearArtifact={setNearArtifact}
              onActivateArtifact={setActiveArtifact}
              onNearExitPortal={setNearExitPortal}
              onReturnToSpace={handleReturnToSpace}
            />
          </>
        )}
      </FiberCanvas>

      {/* Cinematic First-Person HUD Overlay */}
      {hasLaunched && (
        <FirstPersonHUD
          currentState={currentState}
          activeWorld={activeWorld}
          approachingWorld={approachingWorld}
          nearArtifact={nearArtifact}
          nearExitPortal={nearExitPortal}
          discoveredWorlds={discoveredWorlds}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          onInitiateWarp={handleInitiateWarp}
          onReturnToSpace={handleReturnToSpace}
          onActivateArtifact={setActiveArtifact}
          onToggle2D={onToggle2D}
          is2DAvailable={is2DAvailable}
        />
      )}
    </div>
  );
}
