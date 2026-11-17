'use server';

// ============================================================================
// THE YACINEVERSE — Projects Server Actions
// Secured with Zero-Trust requireOwner() Guard & On-Demand ISR Invalidation
// ============================================================================

import { requireOwner } from '@/lib/auth-guard';
import { revalidatePath } from 'next/cache';
import type { SectorType, ContentStatus, ImpactMetric } from '@/types/database';

export interface ProjectFormData {
  title: string;
  slug: string;
  tagline: string;
  summary: string;
  sector: SectorType;
  status: ContentStatus;
  is_featured: boolean;
  is_flagship: boolean;
  live_url?: string;
  github_url?: string;
  challenge_narrative?: string;
  solution_narrative?: string;
  architecture_overview?: string;
  impact_metrics?: ImpactMetric[];
  display_order?: number;
}

export async function createProjectAction(data: ProjectFormData) {
  const { supabase, user } = await requireOwner();

  const { data: project, error } = await supabase
    .from('projects')
    .insert({
      title: data.title,
      slug: data.slug,
      tagline: data.tagline,
      summary: data.summary,
      sector: data.sector,
      status: data.status,
      is_featured: data.is_featured,
      is_flagship: data.is_flagship,
      live_url: data.live_url || null,
      github_url: data.github_url || null,
      challenge_narrative: data.challenge_narrative || null,
      solution_narrative: data.solution_narrative || null,
      architecture_overview: data.architecture_overview || null,
      impact_metrics: data.impact_metrics || [],
      display_order: data.display_order || 0,
      published_at: data.status === 'published' ? new Date().toISOString() : null,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create project: ${error.message}`);
  }

  // Audit log
  await supabase.from('audit_logs').insert({
    actor_id: user.id,
    action: 'CREATE_PROJECT',
    entity_type: 'projects',
    entity_id: project.id,
    diff_payload: { slug: project.slug, title: project.title },
  });

  revalidatePath('/');
  revalidatePath('/projects');
  revalidatePath('/studio/projects');
  return { success: true, project };
}

export async function updateProjectAction(id: string, data: Partial<ProjectFormData>) {
  const { supabase, user } = await requireOwner();

  const updatePayload: Record<string, unknown> = {
    ...data,
    updated_at: new Date().toISOString(),
  };

  if (data.status === 'published') {
    updatePayload.published_at = new Date().toISOString();
  }

  const { data: project, error } = await supabase
    .from('projects')
    .update(updatePayload)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update project: ${error.message}`);
  }

  // Audit log
  await supabase.from('audit_logs').insert({
    actor_id: user.id,
    action: 'UPDATE_PROJECT',
    entity_type: 'projects',
    entity_id: id,
    diff_payload: data,
  });

  revalidatePath('/');
  revalidatePath('/projects');
  if (project?.slug) {
    revalidatePath(`/projects/${project.slug}`);
  }
  revalidatePath('/studio/projects');
  return { success: true, project };
}

export async function deleteProjectAction(id: string) {
  const { supabase, user } = await requireOwner();

  const { error } = await supabase.from('projects').delete().eq('id', id);

  if (error) {
    throw new Error(`Failed to delete project: ${error.message}`);
  }

  // Audit log
  await supabase.from('audit_logs').insert({
    actor_id: user.id,
    action: 'DELETE_PROJECT',
    entity_type: 'projects',
    entity_id: id,
    diff_payload: { id },
  });

  revalidatePath('/');
  revalidatePath('/projects');
  revalidatePath('/studio/projects');
  return { success: true };
}
