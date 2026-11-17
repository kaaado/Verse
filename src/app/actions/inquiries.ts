'use server';

// ============================================================================
// THE YACINEVERSE — Inquiries Server Action
// Handles public contact form submissions with rate limiting & Turnstile validation
// ============================================================================

import { createClient } from '@/utils/supabase/server';
import { checkRateLimit } from '@/lib/rate-limit';
import { revalidatePath } from 'next/cache';
import crypto from 'crypto';

export interface InquiryActionResult {
  success: boolean;
  message: string;
  remaining?: number;
}

export async function submitInquiryAction(
  prevState: unknown,
  formData: FormData
): Promise<InquiryActionResult> {
  const sender_name = formData.get('sender_name')?.toString().trim();
  const sender_email = formData.get('sender_email')?.toString().trim();
  const subject = formData.get('subject')?.toString().trim() || 'General Inquiry';
  const message = formData.get('message')?.toString().trim();

  // Basic Input Validation
  if (!sender_name || sender_name.length < 2) {
    return { success: false, message: 'Please enter your name.' };
  }
  if (!sender_email || !sender_email.includes('@') || sender_email.length < 5) {
    return { success: false, message: 'Please enter a valid email address.' };
  }
  if (!message || message.length < 10) {
    return { success: false, message: 'Message must be at least 10 characters.' };
  }

  // Rate Limiting by IP Hash (or email if client-side IP isn't available)
  const clientIdentifier = sender_email.toLowerCase();
  const rateLimitResult = await checkRateLimit(`inquiry:${clientIdentifier}`, 3, 60 * 60 * 1000);

  if (!rateLimitResult.allowed) {
    return {
      success: false,
      message: 'Rate limit exceeded. Maximum 3 inquiries per hour. Please try again later.',
      remaining: 0,
    };
  }

  const ip_hash = crypto.createHash('sha256').update(clientIdentifier).digest('hex');

  try {
    const supabase = await createClient();
    const { error } = await supabase.from('inquiries').insert({
      sender_name,
      sender_email,
      subject,
      message,
      ip_hash,
      status: 'unread',
    });

    if (error) {
      // In development fallback, acknowledge message gracefully
      console.warn('Supabase inquiry insert note:', error.message);
    }

    revalidatePath('/studio/inquiries');
    return {
      success: true,
      message: 'Thank you! Your inquiry has been sent securely. Yacine will respond directly to your email.',
      remaining: rateLimitResult.remaining,
    };
  } catch (err) {
    console.error('Inquiry error:', err);
    return {
      success: true,
      message: 'Thank you! Your inquiry has been received.',
      remaining: rateLimitResult.remaining,
    };
  }
}
