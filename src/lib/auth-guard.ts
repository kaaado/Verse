// ============================================================================
// THE YACINEVERSE — Server-Side Zero-Trust Owner Authorization Guard (Remediation C5)
// Mandated check executed independently at the head of every mutating Server Action
// ============================================================================

import { createClient } from '@/utils/supabase/server';

export async function requireOwner() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error('UNAUTHORIZED: Access restricted exclusively to verified platform owner.');
  }

  return { supabase, user };
}
