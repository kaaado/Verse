'use client';

// ============================================================================
// THE YACINEVERSE — Pure Visual Cinematic Awakening (Visual Storytelling Only)
// No narrative paragraphs. Darkness -> Energy Awakening -> Portal Formation -> Launch
// ============================================================================

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { universeAudio } from '../universe-audio';

interface AwakeningIntroProps {
  onLaunchComplete: () => void;
  onSkipIntro: () => void;
}

export function AwakeningIntro({
  onLaunchComplete,
  onSkipIntro,
}: AwakeningIntroProps) {
  // Visual Stages: A. DARKNESS -> B. AWAKENING -> C. PORTAL -> D. LAUNCH
  const [stage, setStage] = useState<'A_DARKNESS' | 'B_AWAKENING' | 'C_PORTAL' | 'D_LAUNCH'>('A_DARKNESS');
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Stage A -> Stage B transition after initial mount
    const t1 = setTimeout(() => {
      setStage('B_AWAKENING');
    }, 800);

    const t2 = setTimeout(() => {
      setStage('C_PORTAL');
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleStartExperience = () => {
    if (hasInteracted) return;
    setHasInteracted(true);
    universeAudio.init();
    universeAudio.resume();
    universeAudio.playWarpSound();
    setStage('D_LAUNCH');

    setTimeout(() => {
      onLaunchComplete();
    }, 1800);
  };

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    universeAudio.init();
    universeAudio.resume();
    onSkipIntro();
  };

  return (
    <div
      onClick={handleStartExperience}
      className="fixed inset-0 z-50 bg-[#0B0F19] flex flex-col items-center justify-center p-6 select-none cursor-pointer overflow-hidden"
    >
      {/* Background Star Points */}
      <div className="absolute inset-0 cosmic-grid opacity-20 pointer-events-none" />

      {/* Minimal Icon-Based Skip Button */}
      <div className="absolute top-6 right-6 z-40">
        <button
          type="button"
          onClick={handleSkip}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-[#1E293B] hover:border-[#334155] bg-[#111827]/70 backdrop-blur-md text-[11px] font-mono text-[#94A3B8] hover:text-[#F8FAFC] transition-all"
          title="Skip Introduction [Esc]"
        >
          <span>✕</span>
          <span className="hidden sm:inline">Skip Introduction</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {/* Stage B & C: Energy Awakening & Portal Geometry */}
        {(stage === 'B_AWAKENING' || stage === 'C_PORTAL') && (
          <motion.div
            key="awakening"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="flex flex-col items-center justify-center relative pointer-events-none"
          >
            {/* Concentric Rotating Energy Rings */}
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
              {/* Outer Energy Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-dashed border-[#10B981]/40 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
              />

              {/* Counter-Rotating Middle Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-4 rounded-full border border-[#06B6D4]/30"
              />

              {/* Inner Pulsating Plasma Core */}
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  boxShadow: [
                    '0 0 20px #10B981',
                    '0 0 50px #06B6D4',
                    '0 0 20px #10B981',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-12 h-12 rounded-full bg-gradient-radial from-white via-[#10B981] to-[#06B6D4]"
              />
            </div>

            {/* Minimal Brand Identity Symbol */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-8 text-center"
            >
              <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-[0.3em] text-[#F8FAFC] uppercase">
                THE YACINEVERSE
              </h1>
              <p className="text-[10px] font-mono tracking-widest text-[#10B981] mt-2 uppercase">
                ENTER THE UNIVERSE
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* Stage D: Launch Acceleration Flash */}
        {stage === 'D_LAUNCH' && (
          <motion.div
            key="launch"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center pointer-events-none"
          >
            <motion.div
              animate={{ scale: [1, 3, 50], opacity: [0.9, 1, 0] }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}
              className="w-32 h-32 rounded-full bg-gradient-radial from-white via-[#06B6D4] to-transparent shadow-[0_0_80px_#10B981]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
