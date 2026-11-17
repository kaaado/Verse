'use client';

// ============================================================================
// THE YACINEVERSE — Global Navigation Header
// Features Dual-Plane View Switcher, Audio Consent, & Direct Studio Gateway
// ============================================================================

import React, { useState } from 'react';
import Link from 'next/link';
import { IconSparkles, IconOrbit, IconDossier, IconLock } from '@/components/icons';

interface GlobalHeaderProps {
  currentPlane: 'universe' | 'dossier';
  onPlaneChange: (plane: 'universe' | 'dossier') => void;
}

export function GlobalHeader({ currentPlane, onPlaneChange }: GlobalHeaderProps) {
  const [audioConsent, setAudioConsent] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1E293B] bg-[#0B0F19]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand & Identity */}
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="w-8 h-8 rounded-lg bg-[#111827] border border-[#10B981]/40 flex items-center justify-center text-[#10B981] group-hover:border-[#10B981] group-hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all">
              <IconSparkles className="w-4 h-4" />
            </span>
            <div>
              <span className="text-sm font-bold tracking-wider font-display text-[#F8FAFC]">
                THE YACINEVERSE
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] text-[#10B981] font-mono px-1.5 py-0.5 rounded bg-[#10B981]/10 border border-[#10B981]/20">
                LIVE
              </span>
            </div>
          </Link>
        </div>

        {/* Dual-Plane Switcher */}
        <div className="flex items-center bg-[#111827] border border-[#1E293B] p-1 rounded-xl shadow-inner">
          <button
            type="button"
            onClick={() => onPlaneChange('universe')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              currentPlane === 'universe'
                ? 'bg-[#1E293B] text-[#06B6D4] shadow-[0_0_10px_rgba(6,182,212,0.2)] border border-[#06B6D4]/30'
                : 'text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
            aria-label="Switch to Universe Explorer"
          >
            <IconOrbit className="w-3.5 h-3.5" />
            <span>Universe Explorer</span>
          </button>

          <button
            type="button"
            onClick={() => onPlaneChange('dossier')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              currentPlane === 'dossier'
                ? 'bg-[#1E293B] text-[#10B981] shadow-[0_0_10px_rgba(16,185,129,0.2)] border border-[#10B981]/30'
                : 'text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
            aria-label="Switch to Professional Dossier"
          >
            <IconDossier className="w-3.5 h-3.5" />
            <span>Professional Dossier</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          {/* Consent-First Audio Toggle */}
          <button
            type="button"
            onClick={() => setAudioConsent(!audioConsent)}
            title={audioConsent ? "Mute Ambient Soundscape" : "Enable Ambient Cosmic Soundscape"}
            className={`text-xs px-2.5 py-1.5 rounded-lg border transition-all hidden md:flex items-center space-x-1.5 ${
              audioConsent
                ? 'border-[#10B981]/50 bg-[#10B981]/10 text-[#10B981]'
                : 'border-[#1E293B] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#334155]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            <span>{audioConsent ? 'Audio: ON' : 'Audio: OFF'}</span>
          </button>

          {/* Creator Studio Gateway */}
          <Link
            href="/studio"
            className="flex items-center space-x-1.5 text-xs text-[#94A3B8] hover:text-[#F8FAFC] px-2.5 py-1.5 rounded-lg border border-[#1E293B] hover:border-[#334155] transition-all"
            title="Creator Studio Administration"
          >
            <IconLock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Studio</span>
          </Link>
        </div>

      </div>
    </header>
  );
}
