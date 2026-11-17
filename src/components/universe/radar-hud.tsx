'use client';

// ============================================================================
// THE YACINEVERSE — Universe Radar HUD
// Navigational mini-map radar overlay displaying sector coordinates
// ============================================================================

import React from 'react';
import { IconCompass } from '@/components/icons';

interface RadarHUDProps {
  activeSector: string | null;
  onSelectSector: (sector: string) => void;
  onResetView: () => void;
}

const SECTOR_BLIPS = [
  { id: 'core_systems', label: 'Core Systems', cx: 30, cy: 35 },
  { id: 'ai_intelligence', label: 'AI & Intelligence', cx: 75, cy: 30 },
  { id: 'engineering', label: 'Engineering', cx: 65, cy: 75 },
  { id: 'creations', label: 'Creations', cx: 30, cy: 70 },
  { id: 'origins', label: 'Origins', cx: 50, cy: 15 },
];

export function RadarHUD({ activeSector, onSelectSector, onResetView }: RadarHUDProps) {
  return (
    <div className="absolute bottom-6 right-6 z-30 bg-[#111827]/90 border border-[#1E293B] rounded-2xl p-4 backdrop-blur-md shadow-2xl w-56 hidden sm:block">
      <div className="flex items-center justify-between mb-3 border-b border-[#1E293B] pb-2">
        <div className="flex items-center space-x-1.5 text-xs font-mono text-[#06B6D4]">
          <IconCompass className="w-3.5 h-3.5" />
          <span>RADAR HUD</span>
        </div>
        <button
          type="button"
          onClick={onResetView}
          className="text-[10px] font-mono text-[#94A3B8] hover:text-[#F8FAFC] underline"
        >
          Reset Nexus
        </button>
      </div>

      {/* Circular Radar Sweep Screen */}
      <div className="relative w-full aspect-square bg-[#0B0F19] rounded-xl border border-[#1E293B] overflow-hidden flex items-center justify-center">
        {/* Radar concentric circles */}
        <div className="absolute inset-2 border border-[#10B981]/15 rounded-full" />
        <div className="absolute inset-8 border border-[#10B981]/25 rounded-full" />
        <div className="absolute inset-14 border border-[#10B981]/35 rounded-full" />
        
        {/* Radar crosshairs */}
        <div className="absolute inset-x-0 top-1/2 h-px bg-[#10B981]/20" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-[#10B981]/20" />

        {/* Central Nexus Blip */}
        <div className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981]" />

        {/* Sector Blips */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          {SECTOR_BLIPS.map((blip) => {
            const isActive = activeSector === blip.id;
            return (
              <circle
                key={blip.id}
                cx={blip.cx}
                cy={blip.cy}
                r={isActive ? 3.5 : 2}
                className={`cursor-pointer transition-all ${
                  isActive
                    ? 'fill-[#06B6D4] stroke-white stroke-1'
                    : 'fill-[#10B981] hover:fill-[#06B6D4]'
                }`}
                onClick={() => onSelectSector(blip.id)}
              >
                <title>{blip.label}</title>
              </circle>
            );
          })}
        </svg>
      </div>

      <div className="mt-2.5 text-[10px] font-mono text-[#94A3B8] text-center">
        {activeSector ? `Focus: ${activeSector.replace('_', ' ').toUpperCase()}` : 'Orbit: Nexus (0, 0)'}
      </div>
    </div>
  );
}
