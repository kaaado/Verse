'use client';

// ============================================================================
// THE YACINEVERSE — Home Container Component
// Synchronizes Dual-Plane view with browser URL state (?view=universe | dossier)
// Integrates 3D Game-Quality Universe Explorer with Executive Dossier
// ============================================================================

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams, useRouter } from 'next/navigation';
import { GlobalHeader } from '@/components/nav/global-header';
import { ExecutiveHeader } from '@/components/dossier/executive-header';
import { SkillsMatrix } from '@/components/dossier/skills-matrix';
import { SkillConstellation } from '@/components/visualizations/SkillConstellation';
import { CredentialsSection } from '@/components/dossier/credentials-section';
import { ExperienceTimeline } from '@/components/dossier/experience-timeline';
import { ProjectsGrid } from '@/components/dossier/projects-grid';
import { ContactSection } from '@/components/dossier/contact-section';
import type { Project, Experience, Skill, Credential } from '@/types/database';

const Universe3DWrapper = dynamic(
  () => import('@/components/universe/universe-3d-wrapper').then((mod) => mod.Universe3DWrapper),
  {
    ssr: false,
    loading: () => (
      <div className="relative w-full h-[calc(100vh-4rem)] bg-[#0B0F19] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3 text-xs font-mono text-[#10B981]">
          <span className="w-3 h-3 rounded-full bg-[#10B981] animate-ping" />
          <span>INITIALIZING CELESTIAL COORDINATES...</span>
        </div>
      </div>
    ),
  }
);

interface HomeContainerProps {
  projects: Project[];
  experiences: Experience[];
  skills: Skill[];
  credentials: Credential[];
  isDemo?: boolean;
}

export function HomeContainer({
  projects,
  experiences,
  skills,
  credentials,
  isDemo = true,
}: HomeContainerProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Derive active plane directly from URL to avoid duplicate state & cascading renders
  const currentPlane: 'universe' | 'dossier' =
    searchParams.get('view') === 'dossier' ? 'dossier' : 'universe';

  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  // Handle plane changes and update URL cleanly without reload
  const handlePlaneChange = (plane: 'universe' | 'dossier') => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('view', plane);
    router.replace(`/?${newParams.toString()}`, { scroll: false });
  };

  return (
    <div className="flex-1 flex flex-col" suppressHydrationWarning>
      {/* Global Navigation Header */}
      <GlobalHeader currentPlane={currentPlane} onPlaneChange={handlePlaneChange} />

      {/* Plane View Rendering */}
      {currentPlane === 'universe' ? (
        <main className="flex-1 flex flex-col">
          <Universe3DWrapper
            projects={projects}
            skills={skills}
            experiences={experiences}
            credentials={credentials}
          />
        </main>
      ) : (
        <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full animate-fade-in">
          <ExecutiveHeader isDemo={isDemo} />
          <SkillsMatrix
            skills={skills}
            selectedSkill={selectedSkill}
            onSelectSkill={setSelectedSkill}
          />
          <div className="mb-12">
            <SkillConstellation skills={skills} />
          </div>
          <ProjectsGrid
            projects={projects}
            selectedSkill={selectedSkill}
          />
          <CredentialsSection credentials={credentials} />
          <ExperienceTimeline experiences={experiences} />
          <ContactSection />
        </main>
      )}

      {/* Global Minimal Footer */}
      <footer className="border-t border-[#1E293B] py-6 text-center text-xs text-[#94A3B8] font-mono no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>THE YACINEVERSE • A journey through the mind of a builder</span>
          <span>Engineered with Next.js App Router, TypeScript, Three.js & Supabase</span>
        </div>
      </footer>
    </div>
  );
}
