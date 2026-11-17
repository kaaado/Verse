'use server';

// ============================================================================
// THE YACINEVERSE — Experiences Server Actions
// ============================================================================

import { requireOwner } from '@/lib/auth-guard';
import { revalidatePath } from 'next/cache';
import type { ContentStatus } from '@/types/database';

export interface ExperienceFormData {
  role: string;
  organization: string;
  organization_url?: string;
  employment_type: string;
  location?: string;
  start_date: string;
  end_date?: string | null;
  is_current: boolean;
  description: string;
  highlights: string[];
  status: ContentStatus;
  display_order?: number;
}

export async function saveExperienceAction(id: string | null, data: ExperienceFormData) {
  const { supabase } = await requireOwner();

  if (id) {
    const { error } = await supabase
      .from('experiences')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from('experiences').insert(data);
    if (error) throw new Error(error.message);
  }

  revalidatePath('/');
  revalidatePath('/studio/experiences');
  return { success: true };
}

export async function deleteExperienceAction(id: string) {
  const { supabase } = await requireOwner();
  const { error } = await supabase.from('experiences').delete().eq('id', id);
  if (error) throw new Error(error.message);

  revalidatePath('/');
  revalidatePath('/studio/experiences');
  return { success: true };
}
