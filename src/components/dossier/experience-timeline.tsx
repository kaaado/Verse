'use client';

// ============================================================================
// THE YACINEVERSE — Career Experience Timeline
// ============================================================================

import React from 'react';
import type { Experience } from '@/types/database';
import { IconActivity } from '@/components/icons';

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <section className="mb-12">
      <div className="flex items-center space-x-2 mb-6">
        <IconActivity className="w-5 h-5 text-[#06B6D4]" />
        <h2 className="text-xl font-bold font-display text-[#F8FAFC]">
          Professional Career & Architecture Milestones
        </h2>
      </div>

      <div className="relative border-l border-[#1E293B] ml-3 pl-6 space-y-8">
        {experiences.map((exp) => (
          <div key={exp.id} className="relative group">
            {/* Timeline Node Point */}
            <span
              className={`absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full border-2 transition-all ${
                exp.is_current
                  ? 'bg-[#10B981] border-[#0B0F19] shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                  : 'bg-[#1E293B] border-[#0B0F19] group-hover:border-[#06B6D4]'
              }`}
            />

            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base font-bold text-[#F8FAFC]">
                  {exp.role}
                </h3>
                <span className="text-xs text-[#94A3B8] font-mono">
                  {new Date(exp.start_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                  {' — '}
                  {exp.is_current ? (
                    <span className="text-[#10B981] font-bold">Present</span>
                  ) : exp.end_date ? (
                    new Date(exp.end_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
                  ) : (
                    'Completed'
                  )}
                </span>
              </div>

              <div className="text-xs text-[#06B6D4] font-medium mt-0.5">
                {exp.organization} • {exp.employment_type} {exp.location ? `(${exp.location})` : ''}
              </div>

              <p className="text-xs text-[#94A3B8] mt-2 leading-relaxed">
                {exp.description}
              </p>

              {exp.highlights && exp.highlights.length > 0 && (
                <ul className="mt-3 space-y-1.5">
                  {exp.highlights.map((highlight, idx) => (
                    <li key={idx} className="text-xs text-[#94A3B8] flex items-start space-x-2">
                      <span className="text-[#10B981] mt-0.5 font-bold">›</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
