// ============================================================================
// THE YACINEVERSE — Data Provider Boundary & Mode Manager
// Location: src/lib/data-provider.ts
//
// Manages three explicit data modes:
// 1. 'demo'  -> Reads strictly from src/lib/demo-data/ (labeled clearly)
// 2. 'owner' -> Reads real owner content from Supabase PostgreSQL
// 3. 'empty' -> Renders guided empty states when owner has not added records
// ============================================================================

import { createClient } from '@/utils/supabase/server';
import {
  DEMO_PROJECTS,
  DEMO_EXPERIENCES,
  DEMO_SKILLS,
  DEMO_CREDENTIALS,
  DEMO_STORIES,
} from '@/lib/demo-data';
import type { Project, Experience, Skill, Credential, Story } from '@/types/database';

export type AppDataMode = 'demo' | 'owner' | 'empty';

export interface DataProviderResponse<T> {
  data: T;
  mode: AppDataMode;
  isDemo: boolean;
}

/**
 * Returns the currently active data mode configured via environment or database state.
 * Defaults to 'demo' when Supabase is unconfigured or has zero owner records.
 */
export async function getActiveDataMode(): Promise<AppDataMode> {
  const envMode = process.env.NEXT_PUBLIC_DATA_MODE?.toLowerCase();
  if (envMode === 'demo' || envMode === 'empty' || envMode === 'owner') {
    return envMode as AppDataMode;
  }

  // Automatic detection based on database presence of published owner projects
  try {
    const supabase = await createClient();
    const { count, error } = await supabase
      .from('projects')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'published');

    if (error || count === null || count === 0) {
      return 'demo'; // Default safe demonstration mode
    }

    return 'owner';
  } catch {
    return 'demo';
  }
}

// ----------------------------------------------------------------------------
// Mode-Isolated Entity Fetchers
// ----------------------------------------------------------------------------

export async function fetchProjects(): Promise<DataProviderResponse<Project[]>> {
  const mode = await getActiveDataMode();

  if (mode === 'demo') {
    return { data: DEMO_PROJECTS, mode: 'demo', isDemo: true };
  }

  if (mode === 'empty') {
    return { data: [], mode: 'empty', isDemo: false };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*, cover_image:cover_image_id(*)')
      .eq('status', 'published')
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return { data: DEMO_PROJECTS, mode: 'demo', isDemo: true };
    }

    return { data: data as Project[], mode: 'owner', isDemo: false };
  } catch {
    return { data: DEMO_PROJECTS, mode: 'demo', isDemo: true };
  }
}

export async function fetchProjectBySlug(slug: string): Promise<DataProviderResponse<Project | null>> {
  const mode = await getActiveDataMode();

  if (mode === 'demo') {
    const match = DEMO_PROJECTS.find((p) => p.slug === slug);
    return { data: match || null, mode: 'demo', isDemo: true };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*, cover_image:cover_image_id(*)')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error || !data) {
      const match = DEMO_PROJECTS.find((p) => p.slug === slug);
      return { data: match || null, mode: 'demo', isDemo: true };
    }

    return { data: data as Project, mode: 'owner', isDemo: false };
  } catch {
    const match = DEMO_PROJECTS.find((p) => p.slug === slug);
    return { data: match || null, mode: 'demo', isDemo: true };
  }
}

export async function fetchExperiences(): Promise<DataProviderResponse<Experience[]>> {
  const mode = await getActiveDataMode();

  if (mode === 'demo') {
    return { data: DEMO_EXPERIENCES, mode: 'demo', isDemo: true };
  }

  if (mode === 'empty') {
    return { data: [], mode: 'empty', isDemo: false };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .eq('status', 'published')
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return { data: DEMO_EXPERIENCES, mode: 'demo', isDemo: true };
    }

    return { data: data as Experience[], mode: 'owner', isDemo: false };
  } catch {
    return { data: DEMO_EXPERIENCES, mode: 'demo', isDemo: true };
  }
}

export async function fetchSkills(): Promise<DataProviderResponse<Skill[]>> {
  const mode = await getActiveDataMode();

  if (mode === 'demo') {
    return { data: DEMO_SKILLS, mode: 'demo', isDemo: true };
  }

  if (mode === 'empty') {
    return { data: [], mode: 'empty', isDemo: false };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .eq('is_visible', true)
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return { data: DEMO_SKILLS, mode: 'demo', isDemo: true };
    }

    return { data: data as Skill[], mode: 'owner', isDemo: false };
  } catch {
    return { data: DEMO_SKILLS, mode: 'demo', isDemo: true };
  }
}

export async function fetchCredentials(): Promise<DataProviderResponse<Credential[]>> {
  const mode = await getActiveDataMode();

  if (mode === 'demo') {
    return { data: DEMO_CREDENTIALS, mode: 'demo', isDemo: true };
  }

  if (mode === 'empty') {
    return { data: [], mode: 'empty', isDemo: false };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('credentials')
      .select('*, certificate_media:certificate_media_id(*)')
      .eq('status', 'published')
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return { data: DEMO_CREDENTIALS, mode: 'demo', isDemo: true };
    }

    return { data: data as Credential[], mode: 'owner', isDemo: false };
  } catch {
    return { data: DEMO_CREDENTIALS, mode: 'demo', isDemo: true };
  }
}

export async function fetchStories(): Promise<DataProviderResponse<Story[]>> {
  const mode = await getActiveDataMode();

  if (mode === 'demo') {
    return { data: DEMO_STORIES, mode: 'demo', isDemo: true };
  }

  if (mode === 'empty') {
    return { data: [], mode: 'empty', isDemo: false };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('stories')
      .select('*, cover_image:cover_image_id(*)')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return { data: DEMO_STORIES, mode: 'demo', isDemo: true };
    }

    return { data: data as Story[], mode: 'owner', isDemo: false };
  } catch {
    return { data: DEMO_STORIES, mode: 'demo', isDemo: true };
  }
}

export async function fetchStoryBySlug(slug: string): Promise<DataProviderResponse<Story | null>> {
  const mode = await getActiveDataMode();

  if (mode === 'demo') {
    const match = DEMO_STORIES.find((s) => s.slug === slug);
    return { data: match || null, mode: 'demo', isDemo: true };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('stories')
      .select('*, cover_image:cover_image_id(*)')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error || !data) {
      const match = DEMO_STORIES.find((s) => s.slug === slug);
      return { data: match || null, mode: 'demo', isDemo: true };
    }

    return { data: data as Story, mode: 'owner', isDemo: false };
  } catch {
    const match = DEMO_STORIES.find((s) => s.slug === slug);
    return { data: match || null, mode: 'demo', isDemo: true };
  }
}
