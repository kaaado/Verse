'use server';

// ============================================================================
// THE YACINEVERSE — Stories Server Actions
// ============================================================================

import { requireOwner } from '@/lib/auth-guard';
import { revalidatePath } from 'next/cache';
import type { ContentStatus } from '@/types/database';

export interface StoryFormData {
  slug: string;
  title: string;
  excerpt: string;
  content_mdx: string;
  read_time_minutes: number;
  tags: string[];
  status: ContentStatus;
}

export async function saveStoryAction(id: string | null, data: StoryFormData) {
  const { supabase } = await requireOwner();

  const payload = {
    ...data,
    published_at: data.status === 'published' ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  };

  if (id) {
    const { error } = await supabase.from('stories').update(payload).eq('id', id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from('stories').insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath('/');
  revalidatePath('/stories');
  revalidatePath(`/stories/${data.slug}`);
  revalidatePath('/studio/stories');
  return { success: true };
}

export async function deleteStoryAction(id: string) {
  const { supabase } = await requireOwner();
  const { error } = await supabase.from('stories').delete().eq('id', id);
  if (error) throw new Error(error.message);

  revalidatePath('/');
  revalidatePath('/stories');
  revalidatePath('/studio/stories');
  return { success: true };
}
