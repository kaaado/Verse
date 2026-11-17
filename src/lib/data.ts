// ============================================================================
// THE YACINEVERSE — Resilient Data Access Facade
// Backed by Mode-Isolated Data Provider (src/lib/data-provider.ts)
// ============================================================================

import {
  fetchProjects,
  fetchProjectBySlug,
  fetchExperiences,
  fetchSkills,
  fetchCredentials,
  fetchStories,
  fetchStoryBySlug,
  getActiveDataMode,
} from '@/lib/data-provider';
import type { Project, Experience, Skill, Credential, Story } from '@/types/database';

export { getActiveDataMode };

export async function getPublishedProjects(): Promise<Project[]> {
  const response = await fetchProjects();
  return response.data;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const response = await fetchProjectBySlug(slug);
  return response.data;
}

export async function getPublishedExperiences(): Promise<Experience[]> {
  const response = await fetchExperiences();
  return response.data;
}

export async function getPublishedCredentials(): Promise<Credential[]> {
  const response = await fetchCredentials();
  return response.data;
}

export async function getPublishedSkills(): Promise<Skill[]> {
  const response = await fetchSkills();
  return response.data;
}

export async function getPublishedStories(): Promise<Story[]> {
  const response = await fetchStories();
  return response.data;
}

export async function getStoryBySlug(slug: string): Promise<Story | null> {
  const response = await fetchStoryBySlug(slug);
  return response.data;
}
