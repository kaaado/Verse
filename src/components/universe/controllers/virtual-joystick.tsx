'use client';

// ============================================================================
// THE YACINEVERSE — Mobile Virtual Touch Controls
// Non-obtrusive analog thumbstick, touch drag look, and context action button
// ============================================================================

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VirtualJoystickProps {
  onActionClick: () => void;
  actionPrompt: string | null;
  onBoostToggle?: () => void;
  isBoosting?: boolean;
}

export function VirtualJoystick({
  onActionClick,
  actionPrompt,
  onBoostToggle,
  isBoosting = false,
}: VirtualJoystickProps) {
  const [joystickPos, setJoystickPos] = useState<{ x: number; y: number } | null>(null);
  const [knobPos, setKnobPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    setJoystickPos({ x: touch.clientX, y: touch.clientY });
    setKnobPos({ x: 0, y: 0 });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!touchStartRef.current) return;
    const touch = e.touches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    const maxRadius = 45;
    const dist = Math.hypot(dx, dy);
    const clampedDist = Math.min(dist, maxRadius);
    const angle = Math.atan2(dy, dx);

    setKnobPos({
      x: Math.cos(angle) * clampedDist,
      y: Math.sin(angle) * clampedDist,
    });
  };

  const handleTouchEnd = () => {
    touchStartRef.current = null;
    setJoystickPos(null);
    setKnobPos({ x: 0, y: 0 });
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-30 lg:hidden overflow-hidden">
      {/* Left Touch Movement Area */}
      <div
        className="absolute left-0 bottom-0 top-1/2 w-1/2 pointer-events-auto touch-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {joystickPos && (
          <div
            style={{
              left: joystickPos.x - 50,
              top: joystickPos.y - 50,
            }}
            className="absolute w-24 h-24 rounded-full border border-[#10B981]/40 bg-[#0B0F19]/60 backdrop-blur-sm pointer-events-none flex items-center justify-center"
          >
            <div
              style={{
                transform: `translate(${knobPos.x}px, ${knobPos.y}px)`,
              }}
              className="w-10 h-10 rounded-full bg-[#10B981]/80 shadow-[0_0_12px_#10B981]"
            />
          </div>
        )}
      </div>

      {/* Right Action & Boost Buttons */}
      <div className="absolute right-6 bottom-8 pointer-events-auto flex flex-col items-end space-y-3">
        {onBoostToggle && (
          <button
            type="button"
            onClick={onBoostToggle}
            className={`px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider uppercase border transition-all ${
              isBoosting
                ? 'bg-[#06B6D4] text-[#0B0F19] font-bold border-[#06B6D4] shadow-[0_0_12px_#06B6D4]'
                : 'bg-[#111827]/80 text-[#94A3B8] border-[#1E293B]'
            }`}
          >
            Thrusters: {isBoosting ? 'HYPER' : 'CRUISE'}
          </button>
        )}

        <AnimatePresence>
          {actionPrompt && (
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              type="button"
              onClick={onActionClick}
              className="px-5 py-3 rounded-2xl bg-[#10B981] text-[#0B0F19] font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(16,185,129,0.5)] border border-[#10B981] active:scale-95 transition-transform"
            >
              {actionPrompt}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
