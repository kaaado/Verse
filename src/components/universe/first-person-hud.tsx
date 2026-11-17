'use client';

// ============================================================================
// THE YACINEVERSE — Cinematic First-Person HUD & Audio Control Center
// Targeting reticle, authoritative input context prompt, and audio mixer panel
// ============================================================================

import React, { useState, useEffect } from 'react';
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
import { universeAudio, type AudioSettings } from './universe-audio';
import { inputManager, type InteractionTarget } from './input-manager';

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
  discoveredWorlds,
  onInitiateWarp,
  onReturnToSpace,
  onToggle2D,
  is2DAvailable,
}: FirstPersonHUDProps) {
  // Audio Mixer Panel State
  const [audioSettings, setAudioSettings] = useState<AudioSettings>(() =>
    universeAudio.getSettings()
  );
  const [isAudioPanelOpen, setIsAudioPanelOpen] = useState(false);

  // Authoritative Context Target from Input Manager
  const [contextTarget, setContextTarget] = useState<InteractionTarget>(() =>
    inputManager.getCurrentTarget()
  );

  // Subscribe to audio engine state updates
  useEffect(() => {
    return universeAudio.subscribe((updated) => {
      setAudioSettings(updated);
    });
  }, []);

  // Subscribe to centralized input manager context target changes
  useEffect(() => {
    return inputManager.onContextChange((target) => {
      setContextTarget(target);
    });
  }, []);

  // Format HUD action prompt
  let actionPrompt: string | null = null;
  if (contextTarget.type === 'APPROACHING_PLANET') {
    actionPrompt = `[E] Enter Atmosphere: ${contextTarget.label}`;
  } else if (contextTarget.type === 'NEAR_ARTIFACT') {
    actionPrompt = `[E] Inspect ${contextTarget.label}`;
  } else if (contextTarget.type === 'NEAR_GATEWAY') {
    actionPrompt = `[E] Return to Space Orbit`;
  } else if (contextTarget.type === 'TERMINAL_OPEN') {
    actionPrompt = `[E / Esc] ${contextTarget.label}`;
  }

  const activeWorldConfig = activeWorld ? WORLDS_CONFIG[activeWorld] : null;
  const locationLabel =
    currentState === 'SPACE_FLIGHT' || currentState === 'APPROACHING_WORLD'
      ? 'DEEP SPACE FLIGHT'
      : currentState === 'WARP_TRANSITION'
      ? 'ATMOSPHERIC TRANSITION'
      : activeWorldConfig
      ? activeWorldConfig.title
      : 'DEEP SPACE ORBIT';

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
            {locationLabel}
          </span>
          <span className="text-[10px] font-mono text-[#94A3B8] border-l border-[#1E293B] pl-2 hidden sm:inline">
            DISCOVERED: {discoveredWorlds.size} / 5 WORLDS
          </span>
        </div>

        {/* Right: Quick Controls, Audio Mixer Toggle & Dossier Link */}
        <div className="flex items-center space-x-2 pointer-events-auto relative">
          {/* Audio Mixer Toggle */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsAudioPanelOpen((prev) => !prev)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono border backdrop-blur-md transition-all shadow-md flex items-center space-x-1.5 ${
                audioSettings.masterMuted
                  ? 'bg-[#1E293B]/60 text-[#94A3B8] border-[#334155]'
                  : 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/40'
              }`}
              title="Open Authoritative Audio Mixer"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${audioSettings.masterMuted ? 'bg-[#94A3B8]' : 'bg-[#10B981]'}`} />
              <span>{audioSettings.masterMuted ? 'AUDIO: OFF' : 'AUDIO: ON'}</span>
            </button>

            {/* Audio Settings Mixer Popover */}
            <AnimatePresence>
              {isAudioPanelOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  className="absolute right-0 top-11 w-72 bg-[#0B0F19]/95 backdrop-blur-xl border border-[#1E293B] p-4 rounded-2xl shadow-2xl text-xs space-y-3 z-50 pointer-events-auto"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-[#1E293B]">
                    <span className="font-mono font-bold text-[#F8FAFC] uppercase tracking-wider text-[11px]">
                      Audio Engine Mixer
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsAudioPanelOpen(false)}
                      className="text-[#94A3B8] hover:text-[#F8FAFC] font-mono"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Master Volume */}
                  <div className="space-y-1">
                    <div className="flex justify-between font-mono text-[11px]">
                      <span className="text-[#94A3B8]">Master Bus</span>
                      <button
                        type="button"
                        onClick={() => universeAudio.toggleMasterMute()}
                        className={`text-[10px] uppercase font-bold ${
                          audioSettings.masterMuted ? 'text-[#EF4444]' : 'text-[#10B981]'
                        }`}
                      >
                        {audioSettings.masterMuted ? 'MUTED' : 'UNMUTED'}
                      </button>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={audioSettings.masterVolume}
                      onChange={(e) => universeAudio.setMasterVolume(parseFloat(e.target.value))}
                      className="w-full accent-[#10B981] h-1.5 bg-[#1E293B] rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Ambient Volume */}
                  <div className="space-y-1">
                    <div className="flex justify-between font-mono text-[11px]">
                      <span className="text-[#94A3B8]">Cosmic Drone / Ambience</span>
                      <button
                        type="button"
                        onClick={() => universeAudio.toggleAmbientMute()}
                        className={`text-[10px] uppercase font-bold ${
                          audioSettings.ambientMuted ? 'text-[#EF4444]' : 'text-[#10B981]'
                        }`}
                      >
                        {audioSettings.ambientMuted ? 'MUTED' : 'ACTIVE'}
                      </button>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={audioSettings.ambientVolume}
                      onChange={(e) => universeAudio.setAmbientVolume(parseFloat(e.target.value))}
                      className="w-full accent-[#06B6D4] h-1.5 bg-[#1E293B] rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Effects Volume */}
                  <div className="space-y-1">
                    <div className="flex justify-between font-mono text-[11px]">
                      <span className="text-[#94A3B8]">Sound Effects / Thrusters</span>
                      <button
                        type="button"
                        onClick={() => universeAudio.toggleEffectsMute()}
                        className={`text-[10px] uppercase font-bold ${
                          audioSettings.effectsMuted ? 'text-[#EF4444]' : 'text-[#10B981]'
                        }`}
                      >
                        {audioSettings.effectsMuted ? 'MUTED' : 'ACTIVE'}
                      </button>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={audioSettings.effectsVolume}
                      onChange={(e) => universeAudio.setEffectsVolume(parseFloat(e.target.value))}
                      className="w-full accent-[#F59E0B] h-1.5 bg-[#1E293B] rounded-lg cursor-pointer"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

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
                inputManager.triggerAction();
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
          <span>•</span>
          <span>Esc: Close / Unlock</span>
        </div>
      </div>

      {/* Mobile Touch Virtual Joystick */}
      <VirtualJoystick
        onActionClick={() => {
          inputManager.triggerAction();
        }}
        actionPrompt={actionPrompt}
      />
    </div>
  );
}
