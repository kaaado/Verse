import React from 'react';
import { getPublishedProjects } from '@/lib/data';
import { IconExternalLink } from '@/components/icons';
import Link from 'next/link';

export default async function StudioProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1E293B]">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#F8FAFC]">
            Projects Content Management
          </h1>
          <p className="text-xs text-[#94A3B8] mt-1">
            Author, edit, and publish engineering initiatives and case studies
          </p>
        </div>

        <button
          type="button"
          className="px-4 py-2 rounded-xl text-xs font-bold bg-[#10B981] text-[#0B0F19] hover:bg-[#10B981]/90 transition-all flex items-center space-x-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)] self-start sm:self-auto"
        >
          <span>+ Add Project</span>
        </button>
      </div>

      {/* Projects High-Density Data Table */}
      <div className="bg-[#111827] border border-[#1E293B] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#1E293B]/50 border-b border-[#1E293B] text-[#94A3B8] font-mono uppercase text-[10px]">
              <tr>
                <th className="px-6 py-3.5">Title & Slug</th>
                <th className="px-6 py-3.5">Sector</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Metrics</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E293B]">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-[#1E293B]/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-[#F8FAFC]">{p.title}</div>
                    <div className="text-[11px] text-[#06B6D4] font-mono">/{p.slug}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1E293B] text-[#94A3B8]">
                      {p.sector.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                        p.status === 'published'
                          ? 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/30'
                          : 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-[#94A3B8]">
                    {p.impact_metrics?.length || 0} metrics
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link
                      href={`/projects/${p.slug}`}
                      target="_blank"
                      className="text-xs text-[#06B6D4] hover:underline inline-flex items-center space-x-0.5"
                    >
                      <span>Preview</span>
                      <IconExternalLink className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
