'use server';

// ============================================================================
// THE YACINEVERSE — Creator Studio Auth Actions
// ============================================================================

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export interface AuthActionResult {
  success: boolean;
  error?: string;
}

export async function loginOwnerAction(
  prevState: unknown,
  formData: FormData
): Promise<AuthActionResult> {
  const email = formData.get('email')?.toString().trim();
  const password = formData.get('password')?.toString();

  if (!email || !password) {
    return { success: false, error: 'Email and password are required.' };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  redirect('/studio');
}

export async function logoutOwnerAction(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/studio/login');
}
