'use client';

// ============================================================================
// THE YACINEVERSE — Cinematic Awakening Introduction
// Scene A1 Awakening & Scene A2 Launch Sequence
// ============================================================================

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { universeAudio } from '../universe-audio';
import { IconSparkles } from '@/components/icons';

interface AwakeningIntroProps {
  onLaunchComplete: () => void;
  onSkipIntro: () => void;
}

export function AwakeningIntro({
  onLaunchComplete,
  onSkipIntro,
}: AwakeningIntroProps) {
  const [phase, setPhase] = useState<'AWAKENING_POEM' | 'TITLE_REVEAL' | 'READY_PROMPT' | 'WARP_LAUNCH'>('AWAKENING_POEM');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('TITLE_REVEAL'), 2800);
    const t2 = setTimeout(() => setPhase('READY_PROMPT'), 5600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleLaunch = () => {
    universeAudio.init();
    universeAudio.resume();
    universeAudio.playWarpSound();
    setPhase('WARP_LAUNCH');
    setTimeout(() => {
      onLaunchComplete();
    }, 2200);
  };

  const handleSkip = () => {
    universeAudio.init();
    universeAudio.resume();
    onSkipIntro();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0B0F19] flex flex-col items-center justify-center p-6 select-none overflow-hidden">
      {/* Background Starlight & Cosmic Dust Glow */}
      <div className="absolute inset-0 cosmic-grid opacity-30 pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-radial from-[#10B981]/15 via-[#06B6D4]/10 to-transparent blur-3xl pointer-events-none" />

      {/* Top Skip Button */}
      <div className="absolute top-6 right-6 z-40">
        <button
          type="button"
          onClick={handleSkip}
          className="text-xs font-mono text-[#94A3B8] hover:text-[#F8FAFC] px-3.5 py-1.5 rounded-xl border border-[#1E293B] hover:border-[#334155] bg-[#111827]/60 backdrop-blur-md transition-all"
        >
          Skip Introduction [Esc] →
        </button>
      </div>

      <AnimatePresence mode="wait">
        {/* Phase 1: Poetic Awakening Statement */}
        {phase === 'AWAKENING_POEM' && (
          <motion.div
            key="poem"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="text-center max-w-xl space-y-4"
          >
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#10B981] flex items-center justify-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
              <span>SIGNAL DETECTED</span>
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-light text-[#F8FAFC] tracking-wide leading-relaxed">
              &ldquo;Somewhere, beyond the boundaries of ordinary thinking...&rdquo;
            </h2>
          </motion.div>
        )}

        {/* Phase 2: Title & Universe Identity */}
        {(phase === 'TITLE_REVEAL' || phase === 'READY_PROMPT') && (
          <motion.div
            key="title"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.0, ease: 'easeOut' }}
            className="text-center max-w-2xl space-y-4"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1E293B]/60 border border-[#10B981]/30 text-xs font-mono text-[#10B981] mb-2">
              <IconSparkles className="w-3.5 h-3.5" />
              <span>COSMIC ARCHITECTURE PROTOCOL</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-display text-[#F8FAFC] tracking-tight">
              THE YACINEVERSE
            </h1>

            <p className="text-sm sm:text-base text-[#06B6D4] font-mono tracking-widest uppercase">
              A journey through the mind of a builder
            </p>

            {phase === 'READY_PROMPT' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="pt-8"
              >
                <button
                  type="button"
                  onClick={handleLaunch}
                  className="group relative px-8 py-3.5 rounded-2xl bg-[#10B981] text-[#0B0F19] font-mono font-bold text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:shadow-[0_0_35px_rgba(16,185,129,0.7)] hover:bg-[#10B981]/90 active:scale-95 transition-all"
                >
                  <span className="flex items-center space-x-2">
                    <span>ENTER THE UNIVERSE</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </button>
                <div className="text-[11px] font-mono text-[#94A3B8] mt-3">
                  Click to initialize WebGL 3D flight & spatial audio
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Phase 3: Warp Launch Acceleration FX */}
        {phase === 'WARP_LAUNCH' && (
          <motion.div
            key="warp"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center space-y-4"
          >
            <motion.div
              animate={{ scale: [1, 1.8, 40], opacity: [0.8, 1, 0] }}
              transition={{ duration: 2.0, ease: 'easeInOut' }}
              className="w-24 h-24 rounded-full bg-gradient-radial from-white via-[#06B6D4] to-transparent shadow-[0_0_60px_#10B981] mx-auto"
            />
            <p className="text-xs font-mono tracking-widest text-[#10B981] uppercase animate-pulse">
              WARP ACCELERATION INITIATED...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
