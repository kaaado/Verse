'use server';

// ============================================================================
// THE YACINEVERSE — Skills & Credentials Server Actions
// ============================================================================

import { requireOwner } from '@/lib/auth-guard';
import { revalidatePath } from 'next/cache';
import type { ContentStatus, CredentialType } from '@/types/database';

export interface SkillFormData {
  name: string;
  category: string;
  proficiency: number;
  is_top_skill: boolean;
  display_order: number;
  is_visible: boolean;
}

export async function saveSkillAction(id: string | null, data: SkillFormData) {
  const { supabase } = await requireOwner();

  if (id) {
    const { error } = await supabase.from('skills').update(data).eq('id', id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from('skills').insert(data);
    if (error) throw new Error(error.message);
  }

  revalidatePath('/');
  revalidatePath('/studio/skills');
  return { success: true };
}

export async function deleteSkillAction(id: string) {
  const { supabase } = await requireOwner();
  const { error } = await supabase.from('skills').delete().eq('id', id);
  if (error) throw new Error(error.message);

  revalidatePath('/');
  revalidatePath('/studio/skills');
  return { success: true };
}

export interface CredentialFormData {
  title: string;
  issuer: string;
  credential_type: CredentialType;
  issue_date: string;
  credential_url?: string;
  credential_id_number?: string;
  status: ContentStatus;
  display_order: number;
}

export async function saveCredentialAction(id: string | null, data: CredentialFormData) {
  const { supabase } = await requireOwner();

  if (id) {
    const { error } = await supabase.from('credentials').update(data).eq('id', id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from('credentials').insert(data);
    if (error) throw new Error(error.message);
  }

  revalidatePath('/');
  revalidatePath('/studio/credentials');
  return { success: true };
}

export async function deleteCredentialAction(id: string) {
  const { supabase } = await requireOwner();
  const { error } = await supabase.from('credentials').delete().eq('id', id);
  if (error) throw new Error(error.message);

  revalidatePath('/');
  revalidatePath('/studio/credentials');
  return { success: true };
}
