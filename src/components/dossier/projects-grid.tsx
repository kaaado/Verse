'use client';

// ============================================================================
// THE YACINEVERSE — Projects Grid
// Dense executive case study cards filtered dynamically by tech stack
// ============================================================================

import React from 'react';
import Link from 'next/link';
import type { Project } from '@/types/database';
import { IconExternalLink, IconGithub, IconChevronRight, IconTerminal } from '@/components/icons';

interface ProjectsGridProps {
  projects: Project[];
  selectedSkill: string | null;
}

export function ProjectsGrid({ projects, selectedSkill }: ProjectsGridProps) {
  // Filter projects by selected skill if present
  const filtered = selectedSkill
    ? projects.filter((p) => p.skills?.some((s) => s.name === selectedSkill))
    : projects;

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <IconTerminal className="w-5 h-5 text-[#10B981]" />
          <h2 className="text-xl font-bold font-display text-[#F8FAFC]">
            Curated Systems & Production Engineering Showcase
          </h2>
        </div>
        <span className="text-xs text-[#94A3B8] font-mono">
          Showing {filtered.length} of {projects.length} Initiatives
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((project) => (
          <div
            key={project.id}
            className="bg-[#111827] border border-[#1E293B] hover:border-[#10B981]/40 rounded-2xl p-6 transition-all shadow-md flex flex-col justify-between group"
          >
            <div>
              {/* Top Sector & Flagship Badges */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-[#1E293B] text-[#06B6D4] border border-[#06B6D4]/20">
                  {project.sector.replace('_', ' ')}
                </span>
                {project.is_flagship && (
                  <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30">
                    Flagship Architecture
                  </span>
                )}
              </div>

              {/* Title & Tagline */}
              <h3 className="text-lg font-bold text-[#F8FAFC] group-hover:text-[#10B981] transition-colors">
                <Link href={`/projects/${project.slug}`}>
                  {project.title}
                </Link>
              </h3>
              <p className="text-xs text-[#06B6D4] font-medium mt-1">
                {project.tagline}
              </p>

              {/* Summary */}
              <p className="text-xs text-[#94A3B8] mt-3 line-clamp-3 leading-relaxed">
                {project.summary}
              </p>

              {/* Verified Impact Metrics */}
              {project.impact_metrics && project.impact_metrics.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4 pt-3 border-t border-[#1E293B]">
                  {project.impact_metrics.map((m, idx) => (
                    <div key={idx} className="bg-[#1E293B]/40 rounded-lg p-2 border border-[#1E293B]">
                      <div className="text-[10px] text-[#94A3B8] font-mono truncate">
                        {m.label}
                      </div>
                      <div className="text-sm font-bold text-[#10B981] font-mono">
                        {m.prefix}{m.value}{m.suffix}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Attached Skills */}
              {project.skills && project.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {project.skills.map((s) => (
                    <span
                      key={s.id}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1E293B] text-[#94A3B8]"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-[#1E293B] flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
                    title="View GitHub Repository"
                  >
                    <IconGithub className="w-4 h-4" />
                  </a>
                )}
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#94A3B8] hover:text-[#10B981] transition-colors flex items-center space-x-1 text-xs"
                    title="Open Live Deployment"
                  >
                    <IconExternalLink className="w-4 h-4" />
                    <span>Live</span>
                  </a>
                )}
              </div>

              <Link
                href={`/projects/${project.slug}`}
                className="text-xs font-semibold text-[#10B981] hover:text-[#10B981]/80 flex items-center space-x-1"
              >
                <span>Read Case Study</span>
                <IconChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
