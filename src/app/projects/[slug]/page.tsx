import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProjectBySlug, getPublishedProjects } from '@/lib/data';
import { IconGithub, IconExternalLink, IconTerminal, IconShield } from '@/components/icons';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getPublishedProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: 'Project Not Found — THE YACINEVERSE' };
  }

  return {
    title: `${project.title} — Architecture Case Study | THE YACINEVERSE`,
    description: project.tagline || project.summary,
    openGraph: {
      title: `${project.title} — Case Study`,
      description: project.summary,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#F8FAFC] flex flex-col">
      {/* Top Breadcrumb Navigation */}
      <header className="border-b border-[#1E293B] bg-[#111827]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <nav className="flex items-center space-x-2 text-xs font-mono text-[#94A3B8]">
            <Link href="/" className="hover:text-[#F8FAFC]">
              THE YACINEVERSE
            </Link>
            <span>/</span>
            <Link href="/?view=dossier" className="hover:text-[#F8FAFC]">
              Projects
            </Link>
            <span>/</span>
            <span className="text-[#10B981] truncate max-w-[200px]">
              {project.slug}
            </span>
          </nav>

          <Link
            href="/?view=dossier"
            className="text-xs text-[#94A3B8] hover:text-[#F8FAFC] px-3 py-1 rounded-lg border border-[#1E293B] hover:border-[#334155]"
          >
            ← Back to Dossier
          </Link>
        </div>
      </header>

      {/* Main Case Study Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-12 w-full">
        {/* Demo Template Notice */}
        {project.is_demo && (
          <div className="mb-6 p-4 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/30 flex items-center space-x-3 text-xs text-[#F59E0B]">
            <span className="font-mono uppercase font-bold shrink-0">[DEMO CASE STUDY]</span>
            <span className="text-[#FCD34D]">
              This is a synthetic demonstration template illustrating project architecture, topology breakdowns, and metric visualizations. Real case studies will be populated by the owner.
            </span>
          </div>
        )}

        {/* Sector & Flagship Banner */}
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-[10px] uppercase font-mono tracking-wider px-2.5 py-0.5 rounded bg-[#1E293B] text-[#06B6D4] border border-[#06B6D4]/30">
            {project.sector.replace('_', ' ')}
          </span>
          {project.is_flagship && (
            <span className="text-[10px] uppercase font-mono tracking-wider px-2.5 py-0.5 rounded bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30">
              Flagship Architecture
            </span>
          )}
        </div>

        {/* Title & Tagline */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#F8FAFC] tracking-tight">
          {project.title}
        </h1>
        <p className="text-base sm:text-lg text-[#06B6D4] font-medium mt-2">
          {project.tagline}
        </p>

        {/* Links Bar */}
        <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-[#1E293B]">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#111827] text-[#F8FAFC] border border-[#1E293B] hover:border-[#334155]"
            >
              <IconGithub className="w-4 h-4" />
              <span>Inspect Source Code</span>
            </a>
          )}
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#10B981] text-[#0B0F19] hover:bg-[#10B981]/90 font-bold"
            >
              <IconExternalLink className="w-4 h-4" />
              <span>Launch Live Deployment</span>
            </a>
          )}
        </div>

        {/* Verified Impact Metrics Banner */}
        {project.impact_metrics && project.impact_metrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-10 p-6 rounded-2xl bg-[#111827] border border-[#1E293B]">
            {project.impact_metrics.map((m, idx) => (
              <div key={idx}>
                <div className="text-xs text-[#94A3B8] font-mono">{m.label}</div>
                <div className="text-2xl font-bold font-mono text-[#10B981] mt-1">
                  {m.prefix}{m.value}{m.suffix}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Executive Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-bold font-display text-[#F8FAFC] mb-3 flex items-center space-x-2">
            <IconTerminal className="w-4 h-4 text-[#10B981]" />
            <span>Executive Architecture Summary</span>
          </h2>
          <p className="text-sm text-[#94A3B8] leading-relaxed">
            {project.summary}
          </p>
        </section>

        {/* Challenge Narrative */}
        {project.challenge_narrative && (
          <section className="mb-10 p-6 rounded-2xl bg-[#111827]/60 border border-[#1E293B]">
            <h2 className="text-lg font-bold font-display text-[#F8FAFC] mb-2 text-[#F59E0B]">
              The Engineering Challenge & Constraint Matrix
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              {project.challenge_narrative}
            </p>
          </section>
        )}

        {/* Solution Narrative */}
        {project.solution_narrative && (
          <section className="mb-10 p-6 rounded-2xl bg-[#111827]/60 border border-[#1E293B]">
            <h2 className="text-lg font-bold font-display text-[#F8FAFC] mb-2 text-[#10B981]">
              Architectural Solution & Resilience Design
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              {project.solution_narrative}
            </p>
          </section>
        )}

        {/* Architecture Overview */}
        {project.architecture_overview && (
          <section className="mb-10">
            <h2 className="text-xl font-bold font-display text-[#F8FAFC] mb-3 flex items-center space-x-2">
              <IconShield className="w-4 h-4 text-[#06B6D4]" />
              <span>Technology Topology</span>
            </h2>
            <div className="p-4 rounded-xl bg-[#0B0F19] border border-[#1E293B] font-mono text-xs text-[#06B6D4]">
              {project.architecture_overview}
            </div>
          </section>
        )}

        {/* Attached Skills */}
        {project.skills && project.skills.length > 0 && (
          <section className="pt-6 border-t border-[#1E293B]">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-3">
              Technologies & Infrastructure Deployed
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.skills.map((s) => (
                <span
                  key={s.id}
                  className="text-xs px-3 py-1 rounded-lg bg-[#111827] border border-[#1E293B] text-[#F8FAFC]"
                >
                  {s.name}
                </span>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1E293B] py-6 text-center text-xs text-[#94A3B8] font-mono">
        THE YACINEVERSE • A journey through the mind of a builder
      </footer>
    </div>
  );
}
