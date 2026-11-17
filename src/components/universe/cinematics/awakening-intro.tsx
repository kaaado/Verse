'use client';

// ============================================================================
// THE YACINEVERSE — Enterprise Pure Visual Cinematic Awakening
// 5-Phase Sequence: VOID -> NEURAL AWAKENING -> PORTAL FORMATION -> LAUNCH -> REVEAL
// Visual storytelling, telemetry instrumentation, physical resonance, zero filler
// ============================================================================

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { universeAudio } from '../universe-audio';

interface AwakeningIntroProps {
  onLaunchComplete: () => void;
  onSkipIntro: () => void;
}

type IntroPhase = 'A_VOID' | 'B_AWAKENING' | 'C_PORTAL' | 'D_LAUNCH';

export function AwakeningIntro({
  onLaunchComplete,
  onSkipIntro,
}: AwakeningIntroProps) {
  const [phase, setPhase] = useState<IntroPhase>('A_VOID');
  const [telemetryVal, setTelemetryVal] = useState(0);
  const [isEngaged, setIsEngaged] = useState(false);

  // Auto-progress from Void -> Awakening -> Portal Ready
  useEffect(() => {
    const tVoid = setTimeout(() => {
      setPhase('B_AWAKENING');
      universeAudio.init();
      universeAudio.resume();
    }, 600);

    const tPortal = setTimeout(() => {
      setPhase('C_PORTAL');
    }, 2400);

    return () => {
      clearTimeout(tVoid);
      clearTimeout(tPortal);
    };
  }, []);

  // Telemetry coordinate counter effect
  useEffect(() => {
    if (phase === 'A_VOID') return;
    const interval = setInterval(() => {
      setTelemetryVal((prev) => (prev < 100 ? prev + 2 : 100));
    }, 40);
    return () => clearInterval(interval);
  }, [phase]);

  // Execute Launch
  const triggerLaunch = useCallback(() => {
    if (isEngaged) return;
    setIsEngaged(true);
    universeAudio.init();
    universeAudio.resume();
    universeAudio.playWarpSound();
    setPhase('D_LAUNCH');

    const finishTimer = setTimeout(() => {
      onLaunchComplete();
    }, 1800);

    return () => clearTimeout(finishTimer);
  }, [isEngaged, onLaunchComplete]);

  // Keyboard engagement listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        universeAudio.init();
        universeAudio.resume();
        onSkipIntro();
      } else if (e.key === 'Enter' || e.key === ' ' || e.key === 'e' || e.key === 'E') {
        e.preventDefault();
        triggerLaunch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSkipIntro, triggerLaunch]);

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    universeAudio.init();
    universeAudio.resume();
    onSkipIntro();
  };

  return (
    <div
      onClick={triggerLaunch}
      className="fixed inset-0 z-50 bg-[#030712] flex flex-col items-center justify-center p-6 select-none cursor-pointer overflow-hidden"
    >
      {/* Background Star Points & Radial Ambient Glow */}
      <div className="absolute inset-0 cosmic-grid opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#030712]/60 to-[#030712] pointer-events-none" />

      {/* Top Telemetry & Skip Dock */}
      <div className="absolute top-6 left-6 right-6 z-40 flex items-center justify-between pointer-events-none">
        <div className="flex items-center space-x-3 text-[11px] font-mono tracking-widest text-[#64748B]">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span>SYS.ORBITAL_RECEPTOR // READY</span>
          <span className="hidden sm:inline text-[#334155]">|</span>
          <span className="hidden sm:inline text-[#06B6D4]">SYNC: {telemetryVal}%</span>
        </div>

        <button
          type="button"
          onClick={handleSkip}
          className="pointer-events-auto flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-[#1E293B] hover:border-[#334155] bg-[#0F172A]/80 backdrop-blur-md text-[11px] font-mono text-[#94A3B8] hover:text-[#F8FAFC] transition-all"
          title="Skip Introduction [Esc]"
        >
          <span>✕</span>
          <span className="hidden sm:inline">Skip Introduction</span>
          <span className="text-[10px] text-[#475569] sm:inline hidden">[Esc]</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {/* Phase A: Void */}
        {phase === 'A_VOID' && (
          <motion.div
            key="void"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center pointer-events-none"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
          </motion.div>
        )}

        {/* Phase B: Neural Awakening & Phase C: Dimensional Portal Formation */}
        {(phase === 'B_AWAKENING' || phase === 'C_PORTAL') && (
          <motion.div
            key="awakening"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.4 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="flex flex-col items-center justify-center relative pointer-events-none max-w-lg w-full"
          >
            {/* Concentric Rotating Energy Ring Assembly */}
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 flex items-center justify-center">
              {/* Outer Alignment Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-dashed border-[#10B981]/30 shadow-[0_0_40px_rgba(16,185,129,0.15)]"
              />

              {/* Counter-Rotating Gyroscopic Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-4 rounded-full border border-[#06B6D4]/30"
              />

              {/* Concentric Reticle Caliper Marks */}
              <div className="absolute inset-8 rounded-full border border-[#334155]/40 flex items-center justify-center">
                <div className="w-full h-px bg-[#06B6D4]/20 absolute" />
                <div className="h-full w-px bg-[#06B6D4]/20 absolute" />
              </div>

              {/* Inner Pulsating Plasma Singularity */}
              <motion.div
                animate={{
                  scale: phase === 'C_PORTAL' ? [1, 1.2, 1] : [0.9, 1.05, 0.9],
                  boxShadow: [
                    '0 0 25px #10B981',
                    '0 0 60px #06B6D4',
                    '0 0 25px #10B981',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-14 h-14 rounded-full bg-gradient-radial from-white via-[#10B981] to-[#06B6D4]"
              />
            </div>

            {/* Typography & Brand Telemetry */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mt-10 text-center"
            >
              <h1 className="text-2xl sm:text-4xl font-bold font-display tracking-[0.35em] text-[#F8FAFC] uppercase drop-shadow-md">
                THE YACINEVERSE
              </h1>
              <p className="text-[11px] font-mono tracking-widest text-[#06B6D4] mt-2 uppercase">
                A Journey Through the Mind of a Builder
              </p>
            </motion.div>

            {/* Interactive Engagement Prompt */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: [0.6, 1, 0.6], y: 0 }}
              transition={{
                delay: 0.6,
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="mt-8 flex flex-col items-center space-y-2 pointer-events-auto"
            >
              <div className="px-5 py-2.5 rounded-full border border-[#10B981]/50 bg-[#10B981]/10 text-xs font-mono tracking-widest text-[#A7F3D0] hover:bg-[#10B981]/20 hover:border-[#10B981] hover:scale-105 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                [ CLICK OR PRESS SPACE / ENTER TO ENTER THE UNIVERSE ]
              </div>
              <span className="text-[10px] font-mono tracking-wider text-[#64748B]">
                FIRST-PERSON EXPLORATION ACTIVE
              </span>
            </motion.div>
          </motion.div>
        )}

        {/* Phase D: Hyper-Thruster Launch Acceleration Flash */}
        {phase === 'D_LAUNCH' && (
          <motion.div
            key="launch"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center pointer-events-none"
          >
            {/* Rapidly expanding sonic warp field */}
            <motion.div
              animate={{ scale: [1, 4, 80], opacity: [1, 0.9, 0] }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-36 h-36 rounded-full bg-gradient-radial from-white via-[#06B6D4] to-transparent shadow-[0_0_120px_#10B981]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Coordinates & Version Footer */}
      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[10px] font-mono text-[#475569] pointer-events-none">
        <span>SECTOR: SOL-SYS-001 // ENTERPRISE BUILD</span>
        <span>VER: 4.0.0-PROD</span>
      </div>
    </div>
  );
}
