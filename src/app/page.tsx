import React, { Suspense } from 'react';
import { HomeContainer } from '@/components/home-container';
import {
  getPublishedProjects,
  getPublishedExperiences,
  getPublishedSkills,
  getPublishedCredentials,
} from '@/lib/data';
import { getActiveDataMode } from '@/lib/data-provider';

export const revalidate = 3600; // 1-hour On-Demand ISR default

export default async function HomePage() {
  const [projects, experiences, skills, credentials, dataMode] = await Promise.all([
    getPublishedProjects(),
    getPublishedExperiences(),
    getPublishedSkills(),
    getPublishedCredentials(),
    getActiveDataMode(),
  ]);

  const isDemo = dataMode === 'demo' || projects.some((p) => p.is_demo);

  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center min-h-[50vh] text-xs font-mono text-[#10B981]">
          Initializing The Yacineverse...
        </div>
      }
    >
      <HomeContainer
        projects={projects}
        experiences={experiences}
        skills={skills}
        credentials={credentials}
        isDemo={isDemo}
      />
    </Suspense>
  );
}
