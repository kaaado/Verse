import React, { Suspense } from 'react';
import { HomeContainer } from '@/components/home-container';
import {
  getPublishedProjects,
  getPublishedExperiences,
  getPublishedSkills,
  getPublishedCredentials,
} from '@/lib/data';

export const revalidate = 3600; // 1-hour On-Demand ISR default

export default async function HomePage() {
  const [projects, experiences, skills, credentials] = await Promise.all([
    getPublishedProjects(),
    getPublishedExperiences(),
    getPublishedSkills(),
    getPublishedCredentials(),
  ]);

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
      />
    </Suspense>
  );
}
