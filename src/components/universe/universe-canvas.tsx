'use client';

// ============================================================================
// THE YACINEVERSE — Interactive Universe Explorer Canvas
// High-performance 2D SVG / Canvas Celestial Map with 100% WebGL Fallback Parity
// ============================================================================

import React, { useState } from 'react';
import Link from 'next/link';
import type { Project } from '@/types/database';
import { RadarHUD } from './radar-hud';
import { IconSparkles, IconChevronRight, IconTerminal } from '@/components/icons';

interface UniverseCanvasProps {
  projects: Project[];
}

interface SectorInfo {
  id: string;
  title: string;
  x: number;
  y: number;
  color: string;
  summary: string;
}

const SECTORS: SectorInfo[] = [
  { id: 'core_systems', title: 'Core Systems & Architecture', x: -280, y: -120, color: '#10B981', summary: 'PassiLuce high-concurrency Swoole backbones & hospital RBAC portals.' },
  { id: 'ai_intelligence', title: 'AI & Machine Intelligence', x: 280, y: -140, color: '#06B6D4', summary: 'Computer Vision neural thesis & autonomous agent workflows.' },
  { id: 'engineering', title: 'Engineering & Field Systems', x: 200, y: 180, color: '#F59E0B', summary: 'Agrovia offline-first orchard sync & IoT telemetry.' },
  { id: 'creations', title: 'Creations & Utilities', x: -220, y: 160, color: '#8B5CF6', summary: 'Mukhayyami summer camp logistics & interactive sandboxes.' },
  { id: 'origins', title: 'Origins & Evolution', x: 0, y: -260, color: '#EC4899', summary: 'Master of Science academic foundation & University of Mascara roots.' },
];

export function UniverseCanvas({ projects }: UniverseCanvasProps) {
  const [activeSector, setActiveSector] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = activeSector
    ? projects.filter((p) => p.sector === activeSector)
    : projects;

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] bg-[#0B0F19] overflow-hidden select-none flex flex-col justify-between">
      
      {/* Background Starfield & Celestial Grid */}
      <div className="absolute inset-0 cosmic-grid opacity-40 pointer-events-none" />

      {/* Top Sector Controls Ribbon */}
      <div className="relative z-20 pt-6 px-4 max-w-5xl mx-auto w-full">
        <div className="flex flex-wrap items-center justify-center gap-2 bg-[#111827]/80 backdrop-blur-md p-1.5 rounded-2xl border border-[#1E293B]">
          <button
            type="button"
            onClick={() => setActiveSector(null)}
            className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all ${
              activeSector === null
                ? 'bg-[#10B981] text-[#0B0F19] font-bold shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                : 'text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
          >
            All Sectors (Nexus)
          </button>
          {SECTORS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveSector(s.id)}
              className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all ${
                activeSector === s.id
                  ? 'bg-[#1E293B] text-[#06B6D4] border border-[#06B6D4]/40 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Coordinate Plane */}
      <div className="relative flex-1 flex items-center justify-center p-4">
        <div className="relative w-full max-w-4xl aspect-[4/3] max-h-[70vh] flex items-center justify-center">
          
          {/* SVG Orbit Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="-400 -300 800 600">
            {/* Concentric Coordinate Orbits */}
            <circle cx="0" cy="0" r="140" fill="none" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
            <circle cx="0" cy="0" r="240" fill="none" stroke="rgba(255,255,255,0.04)" strokeDasharray="6 6" />
            <circle cx="0" cy="0" r="320" fill="none" stroke="rgba(255,255,255,0.03)" />

            {/* Connecting Celestial Vectors */}
            {SECTORS.map((s) => (
              <line
                key={s.id}
                x1="0"
                y1="0"
                x2={s.x}
                y2={s.y}
                stroke={s.color}
                strokeWidth={activeSector === s.id ? 2 : 1}
                strokeOpacity={activeSector === s.id ? 0.6 : 0.15}
                strokeDasharray={activeSector === s.id ? "none" : "2 2"}
              />
            ))}
          </svg>

          {/* Central Nexus (Origin: 0, 0) */}
          <div
            className="absolute z-10 flex flex-col items-center justify-center cursor-pointer group"
            onClick={() => setActiveSector(null)}
          >
            <div className="w-16 h-16 rounded-full bg-[#111827] border-2 border-[#10B981] flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.35)] group-hover:scale-110 transition-transform">
              <IconSparkles className="w-8 h-8 text-[#10B981] animate-pulse" />
            </div>
            <span className="text-xs font-bold font-display text-[#F8FAFC] mt-2 group-hover:text-[#10B981]">
              CENTRAL NEXUS
            </span>
            <span className="text-[10px] text-[#94A3B8] font-mono">(0, 0)</span>
          </div>

          {/* Orbital Sector Nodes */}
          {SECTORS.map((s) => {
            const isSectorActive = activeSector === s.id;
            return (
              <div
                key={s.id}
                style={{
                  transform: `translate(calc(${s.x}px * 0.9), calc(${s.y}px * 0.9))`,
                }}
                className={`absolute z-10 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                  isSectorActive ? 'scale-110' : 'hover:scale-105'
                }`}
                onClick={() => setActiveSector(s.id)}
              >
                <div
                  style={{ borderColor: s.color }}
                  className={`w-12 h-12 rounded-full bg-[#111827] border-2 flex items-center justify-center shadow-lg ${
                    isSectorActive ? 'shadow-[0_0_20px_rgba(6,182,212,0.4)]' : ''
                  }`}
                >
                  <IconTerminal style={{ color: s.color }} className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-[#F8FAFC] mt-1.5 text-center max-w-[130px] leading-tight">
                  {s.title}
                </span>
              </div>
            );
          })}

        </div>
      </div>

      {/* Selected Project Node Drawer / Inspector */}
      {selectedProject && (
        <div className="absolute top-20 right-6 z-40 w-80 bg-[#111827] border border-[#1E293B] rounded-2xl p-5 shadow-2xl backdrop-blur-md animate-fade-in">
          <div className="flex items-center justify-between border-b border-[#1E293B] pb-2 mb-3">
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#10B981]">
              Sector Entity
            </span>
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="text-xs text-[#94A3B8] hover:text-[#F8FAFC]"
            >
              ✕
            </button>
          </div>

          <h4 className="text-sm font-bold text-[#F8FAFC]">
            {selectedProject.title}
          </h4>
          <p className="text-xs text-[#06B6D4] mt-0.5">
            {selectedProject.tagline}
          </p>
          <p className="text-xs text-[#94A3B8] mt-2 line-clamp-3">
            {selectedProject.summary}
          </p>

          <div className="mt-4 pt-3 border-t border-[#1E293B] flex justify-between items-center">
            <Link
              href={`/projects/${selectedProject.slug}`}
              className="text-xs font-bold text-[#10B981] hover:underline flex items-center space-x-1"
            >
              <span>Explore Case Study</span>
              <IconChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* Bottom Sector Projects Carousel / Drawer */}
      <div className="relative z-20 pb-6 px-4 max-w-5xl mx-auto w-full">
        <div className="bg-[#111827]/90 border border-[#1E293B] rounded-2xl p-4 backdrop-blur-md">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold font-display text-[#F8FAFC]">
              {activeSector ? `Sector Initiatives (${filteredProjects.length})` : 'Nexus Constellation Highlights'}
            </span>
            <span className="text-[10px] text-[#94A3B8] font-mono">
              Click node to inspect architecture
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filteredProjects.slice(0, 3).map((p) => (
              <div
                key={p.id}
                onClick={() => setSelectedProject(p)}
                className="bg-[#0B0F19] border border-[#1E293B] hover:border-[#10B981]/50 rounded-xl p-3 cursor-pointer transition-all group"
              >
                <div className="text-[10px] font-mono text-[#06B6D4] truncate">
                  {p.sector.replace('_', ' ').toUpperCase()}
                </div>
                <h4 className="text-xs font-bold text-[#F8FAFC] group-hover:text-[#10B981] truncate mt-0.5">
                  {p.title}
                </h4>
                <div className="text-[11px] text-[#94A3B8] truncate mt-1">
                  {p.tagline}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Radar HUD */}
      <RadarHUD
        activeSector={activeSector}
        onSelectSector={(s) => setActiveSector(s)}
        onResetView={() => setActiveSector(null)}
      />

    </div>
  );
}
