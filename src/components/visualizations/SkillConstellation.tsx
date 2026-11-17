'use client';

// ============================================================================
// THE YACINEVERSE — Skill Constellation & Engineering Mastery Matrix
// High-Density Taxonomy, Proficiency Arc Gauges & Real-World Application Badges
// ============================================================================

import React, { useState } from 'react';
import type { Skill } from '@/types/database';

interface SkillConstellationProps {
  skills?: Skill[];
}

const FALLBACK_SKILLS: Skill[] = [
  { id: '1', name: 'Distributed Systems & Microservices', category: 'Backend Architecture', proficiency: 96, is_top_skill: true, display_order: 1, is_visible: true, created_at: '', updated_at: '' },
  { id: '2', name: 'PostgreSQL Relational Modeling & RLS', category: 'Data & Persistence', proficiency: 94, is_top_skill: true, display_order: 2, is_visible: true, created_at: '', updated_at: '' },
  { id: '3', name: 'Three.js / WebGL Spatial Engineering', category: '3D Graphics & Spatial', proficiency: 92, is_top_skill: true, display_order: 3, is_visible: true, created_at: '', updated_at: '' },
  { id: '4', name: 'Zero-Trust Security & Cryptographic Auth', category: 'Security & Defensive', proficiency: 95, is_top_skill: true, display_order: 4, is_visible: true, created_at: '', updated_at: '' },
  { id: '5', name: 'TypeScript & Strict Type Systems', category: 'Core Languages', proficiency: 98, is_top_skill: true, display_order: 5, is_visible: true, created_at: '', updated_at: '' },
  { id: '6', name: 'Next.js 16 App Router & Turbopack', category: 'Frontend Architecture', proficiency: 95, is_top_skill: true, display_order: 6, is_visible: true, created_at: '', updated_at: '' },
  { id: '7', name: 'Web Audio API Procedural Synthesis', category: '3D Graphics & Spatial', proficiency: 88, is_top_skill: false, display_order: 7, is_visible: true, created_at: '', updated_at: '' },
  { id: '8', name: 'High-Concurrency In-Memory Caching', category: 'Backend Architecture', proficiency: 91, is_top_skill: false, display_order: 8, is_visible: true, created_at: '', updated_at: '' },
];

export function SkillConstellation({ skills = FALLBACK_SKILLS }: SkillConstellationProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const displaySkills = skills && skills.length > 0 ? skills : FALLBACK_SKILLS;

  const categories = ['ALL', ...Array.from(new Set(displaySkills.map((s) => s.category)))];

  const filtered = selectedCategory === 'ALL'
    ? displaySkills
    : displaySkills.filter((s) => s.category === selectedCategory);

  return (
    <div className="w-full bg-[#070D1A]/90 border border-[#1E293B] rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#1E293B] gap-3">
        <div>
          <h3 className="text-sm font-mono tracking-widest text-[#8B5CF6] uppercase flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
            <span>Technical Capabilities & Mastery Matrix</span>
          </h3>
          <p className="text-xs text-[#94A3B8] font-sans mt-0.5">
            Demonstrated competencies mapped across architectural and engineering disciplines
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-mono transition-all ${
                  isActive
                    ? 'bg-[#8B5CF6] text-white font-bold shadow-[0_0_12px_rgba(139,92,246,0.4)]'
                    : 'bg-[#0F172A] text-[#94A3B8] border border-[#1E293B] hover:text-[#F8FAFC]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Skill Gauges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-5">
        {filtered.map((skill) => (
          <div
            key={skill.id}
            className="p-4 rounded-xl bg-[#090F1C]/80 border border-[#1E293B] hover:border-[#8B5CF6]/50 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-[9px] font-mono uppercase text-[#06B6D4] font-semibold">
                  {skill.category}
                </span>
                <span className="text-xs font-mono font-bold text-[#10B981]">
                  {skill.proficiency}%
                </span>
              </div>
              <h4 className="text-xs font-bold text-[#F8FAFC] font-sans mt-1.5 leading-snug">
                {skill.name}
              </h4>
            </div>

            <div className="mt-4">
              <div className="w-full bg-[#1E293B] h-1.5 rounded-full overflow-hidden">
                <div
                  style={{ width: `${skill.proficiency}%` }}
                  className="bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] h-full rounded-full"
                />
              </div>
              <div className="flex items-center justify-between text-[9px] font-mono text-[#64748B] mt-1.5">
                <span>FOUNDATION</span>
                <span>PRODUCTION-READY</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
