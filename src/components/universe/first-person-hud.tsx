'use client';

// ============================================================================
// THE YACINEVERSE — Cinematic First-Person HUD & Navigation Compass
// Targeting reticle, contextual action prompts, discovery log, and audio toggle
// ============================================================================

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  WORLDS_CONFIG,
  type WorldId,
  type UniverseStateType,
  type InteractiveArtifact,
} from './universe-types';
import { VirtualJoystick } from './controllers/virtual-joystick';
import {
  IconCompass,
  IconChevronRight,
} from '@/components/icons';

interface FirstPersonHUDProps {
  currentState: UniverseStateType;
  activeWorld: WorldId | null;
  approachingWorld: WorldId | null;
  nearArtifact: InteractiveArtifact | null;
  nearExitPortal: boolean;
  discoveredWorlds: Set<WorldId>;
  isMuted: boolean;
  onToggleMute: () => void;
  onInitiateWarp: (worldId: WorldId) => void;
  onReturnToSpace: () => void;
  onActivateArtifact: (artifact: InteractiveArtifact) => void;
  onToggle2D: () => void;
  is2DAvailable: boolean;
}

export function FirstPersonHUD({
  currentState,
  activeWorld,
  approachingWorld,
  nearArtifact,
  nearExitPortal,
  discoveredWorlds,
  isMuted,
  onToggleMute,
  onInitiateWarp,
  onReturnToSpace,
  onActivateArtifact,
  onToggle2D,
  is2DAvailable,
}: FirstPersonHUDProps) {
  // Determine active context action prompt
  let actionPrompt: string | null = null;
  let actionHandler: (() => void) | null = null;

  if (currentState === 'SPACE_FLIGHT' || currentState === 'APPROACHING_WORLD') {
    if (approachingWorld) {
      const cfg = WORLDS_CONFIG[approachingWorld];
      actionPrompt = `[E] Enter Atmosphere: ${cfg.title}`;
      actionHandler = () => onInitiateWarp(approachingWorld);
    }
  } else if (currentState === 'WORLD_EXPLORATION') {
    if (nearExitPortal) {
      actionPrompt = `[E] Return to Space Orbit`;
      actionHandler = () => onReturnToSpace();
    } else if (nearArtifact) {
      actionPrompt = `[E] Inspect ${nearArtifact.title}`;
      actionHandler = () => onActivateArtifact(nearArtifact);
    }
  }

  const activeWorldConfig = activeWorld ? WORLDS_CONFIG[activeWorld] : null;

  return (
    <div className="absolute inset-0 pointer-events-none z-30 select-none overflow-hidden flex flex-col justify-between p-4 sm:p-6">
      {/* Top Telemetry & Controls Ribbon */}
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto gap-4">
        {/* Left: Location & State Indicator */}
        <div className="flex items-center space-x-2.5 bg-[#0B0F19]/80 backdrop-blur-md border border-[#1E293B] px-3.5 py-1.5 rounded-xl pointer-events-auto shadow-lg">
          <span
            style={{
              backgroundColor: activeWorldConfig ? activeWorldConfig.themeColor : '#10B981',
            }}
            className="w-2 h-2 rounded-full animate-pulse"
          />
          <span className="text-xs font-mono font-bold text-[#F8FAFC] tracking-wider uppercase">
            {activeWorldConfig ? activeWorldConfig.title : 'DEEP SPACE ORBIT'}
          </span>
          <span className="text-[10px] font-mono text-[#94A3B8] border-l border-[#1E293B] pl-2 hidden sm:inline">
            DISCOVERED: {discoveredWorlds.size} / 5 WORLDS
          </span>
        </div>

        {/* Right: Quick Controls, Sound Toggle & Dossier Link */}
        <div className="flex items-center space-x-2 pointer-events-auto">
          {/* Sound Toggle */}
          <button
            type="button"
            onClick={onToggleMute}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono border backdrop-blur-md transition-all shadow-md flex items-center space-x-1.5 ${
              isMuted
                ? 'bg-[#1E293B]/60 text-[#94A3B8] border-[#334155]'
                : 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/40'
            }`}
            title="Toggle Procedural Web Audio Soundscape"
          >
            <span>{isMuted ? 'AUDIO: OFF' : 'AUDIO: ON'}</span>
          </button>

          {/* 2D Planar Fallback Toggle */}
          {is2DAvailable && (
            <button
              type="button"
              onClick={onToggle2D}
              className="hidden sm:flex items-center space-x-1.5 bg-[#0B0F19]/80 backdrop-blur-md border border-[#1E293B] hover:border-[#334155] px-3 py-1.5 rounded-xl text-xs font-mono text-[#94A3B8] hover:text-[#F8FAFC] transition-all shadow-md"
            >
              <IconCompass className="w-3.5 h-3.5 text-[#06B6D4]" />
              <span>2D Map</span>
            </button>
          )}

          {/* Recruiter Dossier Link */}
          <Link
            href="/?view=dossier"
            className="flex items-center space-x-1.5 bg-[#10B981]/10 border border-[#10B981]/30 hover:bg-[#10B981]/20 px-3 py-1.5 rounded-xl text-xs font-mono text-[#10B981] font-semibold transition-all shadow-md"
          >
            <span>Recruiter Dossier</span>
            <IconChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Center Targeting Reticle & Proximity Action Prompt */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        {/* Reticle Dot */}
        <div className="relative w-3 h-3 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] opacity-70 shadow-[0_0_6px_#10B981]" />
          <div className="absolute w-6 h-6 border border-[#10B981]/30 rounded-full" />
        </div>

        {/* Dynamic Context Action Prompt */}
        <AnimatePresence>
          {actionPrompt && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="mt-6 pointer-events-auto cursor-pointer"
              onClick={() => {
                if (actionHandler) actionHandler();
              }}
            >
              <div className="bg-[#0B0F19]/90 backdrop-blur-xl border border-[#10B981] px-5 py-2.5 rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center space-x-2 text-xs font-mono font-bold text-[#F8FAFC]">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                <span>{actionPrompt}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Area: Interplanetary Quick-Travel Dock & Navigation Compass */}
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center space-y-3 pointer-events-none">
        {/* World Quick-Warp Navigation Dock (Desktop) */}
        <div className="pointer-events-auto flex items-center space-x-1.5 sm:space-x-2 bg-[#0B0F19]/90 backdrop-blur-md border border-[#1E293B] p-1.5 rounded-2xl shadow-2xl overflow-x-auto max-w-full">
          {/* Space Orbit Button */}
          <button
            type="button"
            onClick={onReturnToSpace}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center space-x-1.5 whitespace-nowrap ${
              activeWorld === null
                ? 'bg-[#10B981] text-[#0B0F19] font-bold shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            <span>Space Orbit</span>
          </button>

          {/* 5 World Warp Buttons */}
          {(Object.keys(WORLDS_CONFIG) as WorldId[]).map((wId) => {
            const cfg = WORLDS_CONFIG[wId];
            const isCurrent = activeWorld === wId;
            return (
              <button
                key={wId}
                type="button"
                onClick={() => onInitiateWarp(wId)}
                style={{
                  borderColor: isCurrent ? cfg.themeColor : undefined,
                  boxShadow: isCurrent ? `0 0 12px ${cfg.themeColor}55` : undefined,
                }}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center space-x-1.5 whitespace-nowrap border ${
                  isCurrent
                    ? 'bg-[#1E293B] text-[#F8FAFC] font-semibold'
                    : 'border-transparent text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B]/60'
                }`}
              >
                <span
                  style={{ backgroundColor: cfg.themeColor }}
                  className="w-2 h-2 rounded-full shrink-0"
                />
                <span className="hidden md:inline">{cfg.title.split(' ')[0]}</span>
                <span className="md:hidden">{cfg.title.slice(0, 4)}</span>
              </button>
            );
          })}
        </div>

        {/* Flight & Exploration Help Instructions (Desktop) */}
        <div className="hidden lg:flex items-center space-x-4 text-[10px] font-mono text-[#64748B] bg-[#0B0F19]/60 px-4 py-1 rounded-full border border-[#1E293B]/40">
          <span>W/A/S/D: Move / Fly</span>
          <span>•</span>
          <span>Mouse: Look Around</span>
          <span>•</span>
          <span>Shift: Thruster Boost</span>
          <span>•</span>
          <span>Space/C: Vertical Thrust</span>
          <span>•</span>
          <span>E: Interact / Enter</span>
        </div>
      </div>

      {/* Mobile Touch Virtual Joystick */}
      <VirtualJoystick
        onActionClick={() => {
          if (actionHandler) actionHandler();
        }}
        actionPrompt={actionPrompt}
      />
    </div>
  );
}
