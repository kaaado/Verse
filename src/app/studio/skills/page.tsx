import React from 'react';
import { getPublishedSkills } from '@/lib/data';

export default async function StudioSkillsPage() {
  const skills = await getPublishedSkills();

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1E293B]">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#F8FAFC]">
            Skills Taxonomy Management
          </h1>
          <p className="text-xs text-[#94A3B8] mt-1">
            Configure technical capabilities, categorization tags, and proficiency levels
          </p>
        </div>

        <button
          type="button"
          className="px-4 py-2 rounded-xl text-xs font-bold bg-[#10B981] text-[#0B0F19] hover:bg-[#10B981]/90 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] self-start sm:self-auto"
        >
          + Add Skill
        </button>
      </div>

      <div className="bg-[#111827] border border-[#1E293B] rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#1E293B]/50 border-b border-[#1E293B] text-[#94A3B8] font-mono uppercase text-[10px]">
            <tr>
              <th className="px-6 py-3.5">Skill Name</th>
              <th className="px-6 py-3.5">Category</th>
              <th className="px-6 py-3.5">Proficiency</th>
              <th className="px-6 py-3.5">Visibility</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E293B]">
            {skills.map((skill) => (
              <tr key={skill.id} className="hover:bg-[#1E293B]/20 transition-colors">
                <td className="px-6 py-4 font-bold text-[#F8FAFC]">
                  {skill.name}
                  {skill.is_top_skill && (
                    <span className="ml-2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/30">
                      Top Skill
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1E293B] text-[#94A3B8]">
                    {skill.category}
                  </span>
                </td>
                <td className="px-6 py-4 font-mono text-[#10B981]">
                  {skill.proficiency}%
                </td>
                <td className="px-6 py-4">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10B981]/10 text-[#10B981]">
                    {skill.is_visible ? 'Visible' : 'Hidden'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
