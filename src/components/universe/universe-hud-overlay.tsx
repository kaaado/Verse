'use client';

// ============================================================================
// THE YACINEVERSE — Cinematic Universe HUD & Interaction Drawer
// Framer Motion animated interface overlay for the 3D Universe Explorer
// ============================================================================

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '@/types/database';
import { SECTORS_3D } from './universe-3d-scene';
import {
  IconTerminal,
  IconCompass,
  IconChevronRight,
  IconExternalLink,
} from '@/components/icons';

interface UniverseHUDOverlayProps {
  projects: Project[];
  activeSectorId: string | null;
  onSelectSector: (sectorId: string | null) => void;
  onResetNexus: () => void;
  is3DMode: boolean;
  onToggle3DMode: () => void;
  webGlAvailable: boolean;
}

export function UniverseHUDOverlay({
  projects,
  activeSectorId,
  onSelectSector,
  onResetNexus,
  is3DMode,
  onToggle3DMode,
  webGlAvailable,
}: UniverseHUDOverlayProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const activeSector = SECTORS_3D.find((s) => s.id === activeSectorId) || null;
  const sectorProjects = activeSectorId
    ? projects.filter((p) => p.sector === activeSectorId)
    : [];

  return (
    <>
      {/* Top Telemetry & Controls Ribbon */}
      <div className="absolute top-4 inset-x-0 z-30 pointer-events-none px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: System Telemetry Status */}
          <div className="flex items-center space-x-2 bg-[#0B0F19]/80 backdrop-blur-md border border-[#1E293B] px-3.5 py-1.5 rounded-xl pointer-events-auto shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[11px] font-mono text-[#F8FAFC] tracking-wider uppercase">
              {is3DMode ? '3D WebGL Orbit' : '2D Celestial Grid'}
            </span>
            <span className="text-[10px] font-mono text-[#94A3B8] border-l border-[#1E293B] pl-2">
              {activeSector
                ? `LOC: [${activeSector.position.join(', ')}]`
                : 'LOC: [0, 0, 0] NEXUS'}
            </span>
          </div>

          {/* Right: Mode Switcher & Navigation Help */}
          <div className="flex items-center space-x-2 pointer-events-auto">
            {webGlAvailable && (
              <button
                type="button"
                onClick={onToggle3DMode}
                className="flex items-center space-x-1.5 bg-[#0B0F19]/80 backdrop-blur-md border border-[#1E293B] hover:border-[#334155] px-3 py-1.5 rounded-xl text-xs font-mono text-[#94A3B8] hover:text-[#F8FAFC] transition-all shadow-lg"
                title="Toggle between 3D Game-Quality Scene and 2D Planar Map"
              >
                <IconCompass className="w-3.5 h-3.5 text-[#06B6D4]" />
                <span>{is3DMode ? 'Switch to 2D' : 'Switch to 3D'}</span>
              </button>
            )}

            <Link
              href="/?view=dossier"
              className="flex items-center space-x-1.5 bg-[#10B981]/10 border border-[#10B981]/30 hover:bg-[#10B981]/20 px-3 py-1.5 rounded-xl text-xs font-mono text-[#10B981] font-semibold transition-all shadow-lg"
            >
              <span>Recruiter Dossier</span>
              <IconChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Center: Sector Quick-Jump Dock */}
      <div className="absolute bottom-6 inset-x-0 z-30 pointer-events-none px-4">
        <div className="max-w-2xl mx-auto flex items-center justify-center pointer-events-auto">
          <div className="flex items-center space-x-1 sm:space-x-2 bg-[#0B0F19]/90 backdrop-blur-md border border-[#1E293B] p-1.5 rounded-2xl shadow-2xl overflow-x-auto max-w-full">
            {/* Nexus Reset Button */}
            <button
              type="button"
              onClick={onResetNexus}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center space-x-1.5 whitespace-nowrap ${
                activeSectorId === null
                  ? 'bg-[#10B981] text-[#0B0F19] font-bold shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B]'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              <span>Nexus (0,0)</span>
            </button>

            {/* Sector Jump Buttons */}
            {SECTORS_3D.map((sector) => {
              const isSelected = activeSectorId === sector.id;
              return (
                <button
                  key={sector.id}
                  type="button"
                  onClick={() => onSelectSector(sector.id)}
                  style={{
                    borderColor: isSelected ? sector.color : undefined,
                    boxShadow: isSelected ? `0 0 12px ${sector.color}40` : undefined,
                  }}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center space-x-1.5 whitespace-nowrap border ${
                    isSelected
                      ? 'bg-[#1E293B] text-[#F8FAFC] font-semibold'
                      : 'border-transparent text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B]/60'
                  }`}
                >
                  <span
                    style={{ backgroundColor: sector.color }}
                    className="w-2 h-2 rounded-full shrink-0"
                  />
                  <span className="hidden md:inline">{sector.title.split(' ')[0]}</span>
                  <span className="md:hidden">{sector.title.slice(0, 4)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Right: Radar Mini-Map (Desktop) */}
      <div className="absolute bottom-6 right-6 z-20 pointer-events-none hidden lg:block">
        <div className="pointer-events-auto bg-[#0B0F19]/90 backdrop-blur-md border border-[#1E293B] rounded-2xl p-3 shadow-2xl w-48">
          <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-[#1E293B]">
            <span className="text-[10px] font-mono uppercase text-[#06B6D4] flex items-center space-x-1">
              <IconCompass className="w-3 h-3" />
              <span>RADAR TRACKER</span>
            </span>
            <span className="text-[9px] font-mono text-[#94A3B8]">
              {activeSectorId ? 'LOCKED' : 'ORBIT'}
            </span>
          </div>

          <div className="relative w-full aspect-square bg-[#070A11] rounded-xl border border-[#1E293B] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-2 border border-[#10B981]/15 rounded-full" />
            <div className="absolute inset-6 border border-[#10B981]/25 rounded-full" />
            <div className="absolute inset-x-0 top-1/2 h-px bg-[#10B981]/20" />
            <div className="absolute inset-y-0 left-1/2 w-px bg-[#10B981]/20" />

            {/* Central Nexus Center */}
            <div
              onClick={onResetNexus}
              className="cursor-pointer w-2.5 h-2.5 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981] z-10 hover:scale-125 transition-transform"
              title="Central Nexus"
            />

            {/* Sector Blips */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              {SECTORS_3D.map((s) => {
                // Map 3D positions [-25, 25] to 2D [10, 90]
                const cx = 50 + (s.position[0] / 30) * 40;
                const cy = 50 - (s.position[2] / 30) * 40;
                const isSelected = activeSectorId === s.id;
                return (
                  <circle
                    key={s.id}
                    cx={cx}
                    cy={cy}
                    r={isSelected ? 4 : 2.5}
                    fill={s.color}
                    className="cursor-pointer transition-all hover:r-4"
                    onClick={() => onSelectSector(s.id)}
                  >
                    <title>{s.title}</title>
                  </circle>
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* Animated Sector Detail Drawer (Framer Motion) */}
      <AnimatePresence>
        {activeSector && (
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="absolute top-0 right-0 bottom-0 z-40 w-full max-w-md bg-[#0B0F19]/95 backdrop-blur-xl border-l border-[#1E293B] shadow-2xl flex flex-col p-6 overflow-y-auto"
          >
            {/* Drawer Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#1E293B]">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span
                    style={{ backgroundColor: activeSector.color }}
                    className="w-2.5 h-2.5 rounded-full"
                  />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#94A3B8]">
                    THEMATIC SECTOR
                  </span>
                </div>
                <h2 className="text-xl font-bold font-display text-[#F8FAFC]">
                  {activeSector.title}
                </h2>
                <p className="text-xs text-[#06B6D4] font-mono mt-0.5">
                  {activeSector.tagline}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onSelectSector(null)}
                className="w-8 h-8 rounded-xl bg-[#1E293B] text-[#94A3B8] hover:text-[#F8FAFC] flex items-center justify-center transition-colors"
                title="Return to Cosmic Orbit"
              >
                ✕
              </button>
            </div>

            {/* Sector Description */}
            <div className="my-4 text-xs text-[#94A3B8] leading-relaxed">
              {activeSector.description}
            </div>

            {/* Sector Projects Section */}
            <div className="flex-1 flex flex-col space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8] pt-2 border-t border-[#1E293B]">
                <span>PUBLISHED INITIATIVES ({sectorProjects.length})</span>
                <span className="text-[#10B981]">ONLINE</span>
              </div>

              {sectorProjects.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border border-dashed border-[#1E293B] rounded-2xl">
                  <IconTerminal className="w-8 h-8 text-[#94A3B8] mb-2 opacity-50" />
                  <p className="text-xs text-[#94A3B8] font-mono">
                    No initiatives currently published in this sector.
                  </p>
                  <p className="text-[10px] text-[#64748B] font-mono mt-1">
                    The owner can publish case studies here via Creator Studio.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {sectorProjects.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => setSelectedProject(project)}
                      className="group p-4 rounded-2xl bg-[#111827] border border-[#1E293B] hover:border-[#334155] cursor-pointer transition-all hover:shadow-lg"
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="text-sm font-bold text-[#F8FAFC] group-hover:text-[#10B981] transition-colors">
                              {project.title}
                            </h3>
                            {project.is_demo && (
                              <span className="text-[9px] font-mono uppercase bg-[#F59E0B]/10 text-[#F59E0B] px-1.5 py-0.2 rounded border border-[#F59E0B]/30">
                                DEMO
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#94A3B8] line-clamp-2">
                            {project.tagline || project.summary}
                          </p>
                        </div>
                        <IconChevronRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#10B981] transition-transform group-hover:translate-x-1 shrink-0 ml-2" />
                      </div>

                      {/* Impact metrics badges */}
                      {project.impact_metrics && project.impact_metrics.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {project.impact_metrics.slice(0, 2).map((metric, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-mono bg-[#1E293B] text-[#06B6D4] px-2 py-0.5 rounded"
                            >
                              {metric.label}: {metric.value}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Drawer Footer Actions */}
            <div className="pt-4 mt-auto border-t border-[#1E293B] flex items-center justify-between">
              <button
                type="button"
                onClick={onResetNexus}
                className="text-xs font-mono text-[#94A3B8] hover:text-[#F8FAFC] flex items-center space-x-1"
              >
                <span>← Orbit Nexus</span>
              </button>

              <Link
                href="/?view=dossier"
                className="text-xs font-mono text-[#10B981] hover:underline"
              >
                View Full Dossier →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Case Study Flyout Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0B0F19] border border-[#1E293B] rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-start justify-between border-b border-[#1E293B] pb-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono uppercase text-[#06B6D4] bg-[#06B6D4]/10 px-2 py-0.5 rounded border border-[#06B6D4]/30">
                      Sector: {selectedProject.sector}
                    </span>
                    {selectedProject.is_demo && (
                      <span className="text-[10px] font-mono text-[#F59E0B] bg-[#F59E0B]/10 px-2 py-0.5 rounded border border-[#F59E0B]/30">
                        DEMO TEMPLATE
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold font-display text-[#F8FAFC] mt-2">
                    {selectedProject.title}
                  </h3>
                  <p className="text-xs text-[#94A3B8] mt-0.5">
                    {selectedProject.tagline}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="w-7 h-7 rounded-lg bg-[#1E293B] text-[#94A3B8] hover:text-[#F8FAFC] flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs text-[#94A3B8] leading-relaxed">
                <div>
                  <h4 className="text-[11px] font-mono uppercase text-[#F8FAFC] mb-1">
                    Architectural Summary
                  </h4>
                  <p>{selectedProject.summary}</p>
                </div>

                {selectedProject.architecture_overview && (
                  <div>
                    <h4 className="text-[11px] font-mono uppercase text-[#F8FAFC] mb-1">
                      System Topology
                    </h4>
                    <p className="bg-[#111827] p-3 rounded-xl border border-[#1E293B] font-mono text-[11px] text-[#06B6D4]">
                      {selectedProject.architecture_overview}
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#1E293B] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#1E293B] text-[#F8FAFC] hover:bg-[#334155]"
                >
                  Close
                </button>

                <Link
                  href={`/projects/${selectedProject.slug}`}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#10B981] text-[#0B0F19] hover:bg-[#10B981]/90 font-bold flex items-center space-x-1.5 shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                >
                  <span>Read Full Case Study</span>
                  <IconExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
