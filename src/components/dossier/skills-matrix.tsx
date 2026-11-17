'use client';

// ============================================================================
// THE YACINEVERSE — Skills Matrix with Interactive Filter Triggers
// ============================================================================

import React from 'react';
import type { Skill } from '@/types/database';
import { IconCpu } from '@/components/icons';

interface SkillsMatrixProps {
  skills: Skill[];
  selectedSkill: string | null;
  onSelectSkill: (skillName: string | null) => void;
}

export function SkillsMatrix({ skills, selectedSkill, onSelectSkill }: SkillsMatrixProps) {
  // Group skills by category
  const categories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <IconCpu className="w-5 h-5 text-[#06B6D4]" />
          <h2 className="text-xl font-bold font-display text-[#F8FAFC]">
            Core Competencies & Stack Matrix
          </h2>
        </div>
        {selectedSkill && (
          <button
            type="button"
            onClick={() => onSelectSkill(null)}
            className="text-xs text-[#06B6D4] hover:underline"
          >
            Clear Filter ({selectedSkill})
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => {
          const categorySkills = skills.filter((s) => s.category === category);
          return (
            <div
              key={category}
              className="bg-[#111827] border border-[#1E293B] rounded-xl p-4 shadow-sm"
            >
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-3">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill) => {
                  const isSelected = selectedSkill === skill.name;
                  return (
                    <button
                      key={skill.id}
                      type="button"
                      onClick={() => onSelectSkill(isSelected ? null : skill.name)}
                      className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-all ${
                        isSelected
                          ? 'bg-[#06B6D4]/20 border-[#06B6D4] text-[#06B6D4] shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                          : 'bg-[#1E293B]/60 border-[#1E293B] text-[#F8FAFC] hover:border-[#334155] hover:text-[#06B6D4]'
                      }`}
                    >
                      {skill.name}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
