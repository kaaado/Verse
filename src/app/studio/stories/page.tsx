import React from 'react';
import { getPublishedStories } from '@/lib/data';
import Link from 'next/link';
import { IconExternalLink } from '@/components/icons';

export default async function StudioStoriesPage() {
  const stories = await getPublishedStories();

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1E293B]">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#F8FAFC]">
            Chronicle Stories & Articles
          </h1>
          <p className="text-xs text-[#94A3B8] mt-1">
            Author and edit long-form architectural essays and engineering case studies
          </p>
        </div>

        <button
          type="button"
          className="px-4 py-2 rounded-xl text-xs font-bold bg-[#10B981] text-[#0B0F19] hover:bg-[#10B981]/90 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] self-start sm:self-auto"
        >
          + New Story
        </button>
      </div>

      <div className="bg-[#111827] border border-[#1E293B] rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#1E293B]/50 border-b border-[#1E293B] text-[#94A3B8] font-mono uppercase text-[10px]">
            <tr>
              <th className="px-6 py-3.5">Title & Slug</th>
              <th className="px-6 py-3.5">Read Time</th>
              <th className="px-6 py-3.5">Status</th>
              <th className="px-6 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E293B]">
            {stories.map((story) => (
              <tr key={story.id} className="hover:bg-[#1E293B]/20 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-[#F8FAFC]">{story.title}</div>
                  <div className="text-[11px] text-[#06B6D4] font-mono">/stories/{story.slug}</div>
                </td>
                <td className="px-6 py-4 font-mono text-[#94A3B8]">
                  {story.read_time_minutes} min read
                </td>
                <td className="px-6 py-4">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30">
                    {story.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/stories/${story.slug}`}
                    target="_blank"
                    className="text-xs text-[#06B6D4] hover:underline inline-flex items-center space-x-1"
                  >
                    <span>Read</span>
                    <IconExternalLink className="w-3 h-3" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
