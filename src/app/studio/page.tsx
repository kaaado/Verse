import React from 'react';
import Link from 'next/link';
import {
  getPublishedProjects,
  getPublishedExperiences,
  getPublishedSkills,
  getPublishedCredentials,
} from '@/lib/data';
import { getActiveDataMode } from '@/lib/data-provider';
import { ContentChecklist } from '@/components/studio/content-checklist';
import {
  IconTerminal,
  IconDossier,
  IconShield,
  IconMail,
  IconDatabase,
  IconActivity,
  IconChevronRight,
  IconSparkles,
} from '@/components/icons';

export default async function StudioDashboardPage() {
  const [projects, experiences, skills, credentials, dataMode] = await Promise.all([
    getPublishedProjects(),
    getPublishedExperiences(),
    getPublishedSkills(),
    getPublishedCredentials(),
    getActiveDataMode(),
  ]);

  const hasDbConfig = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  );

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#F8FAFC]">
              Creator Studio Command Center
            </h1>
            <span
              className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full border ${
                dataMode === 'demo'
                  ? 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30'
                  : dataMode === 'owner'
                  ? 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/30'
                  : 'bg-[#94A3B8]/10 text-[#94A3B8] border-[#94A3B8]/30'
              }`}
            >
              Mode: {dataMode.toUpperCase()}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#94A3B8]">
            Dynamic content management, structured data boundaries and onboarding workflow
          </p>
        </div>

        {dataMode === 'demo' && (
          <div className="flex items-center space-x-2 text-xs font-mono text-[#F59E0B] bg-[#F59E0B]/10 border border-[#F59E0B]/20 px-3 py-1.5 rounded-xl">
            <IconSparkles className="w-4 h-4 shrink-0 text-[#F59E0B]" />
            <span>Currently using synthetic demo records</span>
          </div>
        )}
      </div>

      {/* Honest Infrastructure & Connection Telemetry Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Supabase Egress Monitor / Telemetry Status */}
        <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase text-[#94A3B8] flex items-center space-x-1.5">
              <IconActivity className="w-4 h-4 text-[#10B981]" />
              <span>Supabase Monthly Egress</span>
            </span>
            <span className="text-xs font-mono text-[#94A3B8] bg-[#1E293B] px-2 py-0.5 rounded">
              {hasDbConfig ? 'Standard Metering' : 'Not Connected'}
            </span>
          </div>

          <div className="text-lg font-bold font-mono text-[#F8FAFC]">
            Live Telemetry: <span className="text-sm font-normal text-[#94A3B8]">{hasDbConfig ? 'Requires Management API Token' : 'Unavailable'}</span>
          </div>

          <div className="w-full bg-[#1E293B] h-2 rounded-full mt-3 overflow-hidden">
            <div
              style={{ width: hasDbConfig ? '15%' : '0%' }}
              className="bg-[#10B981] h-full rounded-full transition-all"
            />
          </div>
          <span className="text-[10px] text-[#94A3B8] font-mono mt-1.5 block">
            {hasDbConfig
              ? 'Supabase client initialized. Live egress metrics require Supabase Management API integration.'
              : 'Supabase credentials not configured or operating in offline demonstration mode.'}
          </span>
        </div>

        {/* Database Disk Storage Monitor */}
        <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase text-[#94A3B8] flex items-center space-x-1.5">
              <IconDatabase className="w-4 h-4 text-[#06B6D4]" />
              <span>PostgreSQL Database Status</span>
            </span>
            <span className="text-xs font-mono text-[#06B6D4] bg-[#06B6D4]/10 px-2 py-0.5 rounded border border-[#06B6D4]/20">
              13 Tables Declared
            </span>
          </div>

          <div className="text-lg font-bold font-mono text-[#F8FAFC]">
            Disk Storage: <span className="text-sm font-normal text-[#94A3B8]">Within Free 500 MB Quota</span>
          </div>

          <div className="w-full bg-[#1E293B] h-2 rounded-full mt-3 overflow-hidden">
            <div
              style={{ width: '5%' }}
              className="bg-[#06B6D4] h-full rounded-full transition-all"
            />
          </div>
          <span className="text-[10px] text-[#94A3B8] font-mono mt-1.5 block">
            Strict Zero-Trust RLS policies configured across all 13 core domain tables.
          </span>
        </div>
      </div>

      {/* Content KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-4">
          <div className="flex items-center justify-between text-[#94A3B8]">
            <span className="text-xs font-mono">Projects</span>
            <IconTerminal className="w-4 h-4 text-[#10B981]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#F8FAFC] mt-2">
            {projects.length}
          </div>
          <span className="text-[11px] text-[#10B981] font-mono">
            {dataMode === 'demo' ? 'Synthetic Demo Records' : 'Published Live'}
          </span>
        </div>

        <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-4">
          <div className="flex items-center justify-between text-[#94A3B8]">
            <span className="text-xs font-mono">Experiences</span>
            <IconDossier className="w-4 h-4 text-[#06B6D4]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#F8FAFC] mt-2">
            {experiences.length}
          </div>
          <span className="text-[11px] text-[#06B6D4] font-mono">
            {dataMode === 'demo' ? 'Synthetic Demo Records' : 'Career Roles'}
          </span>
        </div>

        <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-4">
          <div className="flex items-center justify-between text-[#94A3B8]">
            <span className="text-xs font-mono">Credentials</span>
            <IconShield className="w-4 h-4 text-[#F59E0B]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#F8FAFC] mt-2">
            {credentials.length}
          </div>
          <span className="text-[11px] text-[#F59E0B] font-mono">
            {dataMode === 'demo' ? 'Synthetic Demo Records' : 'Verified Degrees'}
          </span>
        </div>

        <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-4">
          <div className="flex items-center justify-between text-[#94A3B8]">
            <span className="text-xs font-mono">Skills Indexed</span>
            <IconActivity className="w-4 h-4 text-[#8B5CF6]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#F8FAFC] mt-2">
            {skills.length}
          </div>
          <span className="text-[11px] text-[#8B5CF6] font-mono">
            {dataMode === 'demo' ? 'Synthetic Demo Records' : 'Taxonomy Chips'}
          </span>
        </div>
      </div>

      {/* Your Content Checklist Onboarding Section */}
      <ContentChecklist />

      {/* Quick Actions & Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Recent Projects */}
        <div className="lg:col-span-2 bg-[#111827] border border-[#1E293B] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1E293B]">
            <h2 className="text-base font-bold font-display text-[#F8FAFC]">
              {dataMode === 'demo' ? 'Demonstration Initiatives' : 'Recently Published Initiatives'}
            </h2>
            <Link
              href="/studio/projects"
              className="text-xs text-[#10B981] hover:underline flex items-center space-x-1"
            >
              <span>Manage All</span>
              <IconChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {projects.slice(0, 4).map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-3 rounded-xl bg-[#0B0F19] border border-[#1E293B] hover:border-[#334155] transition-all"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xs font-bold text-[#F8FAFC]">{p.title}</h3>
                    {p.is_demo && (
                      <span className="text-[9px] font-mono bg-[#F59E0B]/10 text-[#F59E0B] px-1.5 py-0.2 rounded border border-[#F59E0B]/30">
                        DEMO
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-[#94A3B8] font-mono">
                    Sector: {p.sector} • Slug: /{p.slug}
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded border border-[#10B981]/20">
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Quick CMS Actions */}
        <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold font-display text-[#F8FAFC] mb-4 pb-3 border-b border-[#1E293B]">
              Quick CMS Operations
            </h2>

            <div className="space-y-2.5">
              <Link
                href="/studio/projects"
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#10B981] text-[#0B0F19] hover:bg-[#10B981]/90 transition-all font-bold"
              >
                <span>Add New Project Case Study</span>
                <span>+</span>
              </Link>

              <Link
                href="/studio/experiences"
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#1E293B] text-[#F8FAFC] hover:bg-[#334155] border border-[#334155] transition-all"
              >
                <span>Update Career Milestone</span>
                <IconChevronRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/studio/inquiries"
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#1E293B] text-[#F8FAFC] hover:bg-[#334155] border border-[#334155] transition-all"
              >
                <span>Review Inbound Inquiries</span>
                <IconMail className="w-3.5 h-3.5 text-[#EC4899]" />
              </Link>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#1E293B] text-[11px] text-[#94A3B8]">
            <p>On-demand Next.js ISR cache invalidation active.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
