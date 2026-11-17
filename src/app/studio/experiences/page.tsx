import React from 'react';
import { getPublishedExperiences } from '@/lib/data';

export default async function StudioExperiencesPage() {
  const experiences = await getPublishedExperiences();

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1E293B]">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#F8FAFC]">
            Career Experiences Management
          </h1>
          <p className="text-xs text-[#94A3B8] mt-1">
            Manage employment positions, roles, consulting milestones, and achievements
          </p>
        </div>

        <button
          type="button"
          className="px-4 py-2 rounded-xl text-xs font-bold bg-[#10B981] text-[#0B0F19] hover:bg-[#10B981]/90 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] self-start sm:self-auto"
        >
          + Add Experience
        </button>
      </div>

      <div className="bg-[#111827] border border-[#1E293B] rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#1E293B]/50 border-b border-[#1E293B] text-[#94A3B8] font-mono uppercase text-[10px]">
            <tr>
              <th className="px-6 py-3.5">Role & Organization</th>
              <th className="px-6 py-3.5">Dates</th>
              <th className="px-6 py-3.5">Type</th>
              <th className="px-6 py-3.5">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E293B]">
            {experiences.map((exp) => (
              <tr key={exp.id} className="hover:bg-[#1E293B]/20 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-[#F8FAFC]">{exp.role}</div>
                  <div className="text-[11px] text-[#06B6D4] font-medium">{exp.organization}</div>
                </td>
                <td className="px-6 py-4 font-mono text-[#94A3B8]">
                  {exp.start_date} {exp.is_current ? '— Present' : `— ${exp.end_date || ''}`}
                </td>
                <td className="px-6 py-4 text-[#94A3B8]">
                  {exp.employment_type}
                </td>
                <td className="px-6 py-4">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30">
                    {exp.status}
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
