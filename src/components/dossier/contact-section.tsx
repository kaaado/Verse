'use client';

// ============================================================================
// THE YACINEVERSE — Secure Contact & Inquiries Section
// Protected with rate limiting and server action validation
// ============================================================================

import React, { useActionState } from 'react';
import { submitInquiryAction, type InquiryActionResult } from '@/app/actions/inquiries';
import { IconMail, IconCheck, IconShield } from '@/components/icons';

const initialState: InquiryActionResult = {
  success: false,
  message: '',
};

export function ContactSection() {
  const [state, formAction, isPending] = useActionState(submitInquiryAction, initialState);

  return (
    <section id="contact" className="mb-16 pt-8 border-t border-[#1E293B]">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30 mb-3">
            <IconShield className="w-3.5 h-3.5" />
            <span>Encrypted Direct Inquiry Channel</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#F8FAFC]">
            Initiate Architecture Dialogue
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-2">
            Interested in consulting, full-time senior architecture roles, or distributed systems advisory? Reach out directly.
          </p>
        </div>

        <form action={formAction} className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 sm:p-8 shadow-xl space-y-4">
          {state.message && (
            <div
              className={`p-4 rounded-xl text-xs flex items-start space-x-2.5 border ${
                state.success
                  ? 'bg-[#10B981]/10 border-[#10B981]/40 text-[#10B981]'
                  : 'bg-[#EF4444]/10 border-[#EF4444]/40 text-[#EF4444]'
              }`}
            >
              {state.success ? (
                <IconCheck className="w-4 h-4 mt-0.5 shrink-0" />
              ) : (
                <span className="font-bold shrink-0">!</span>
              )}
              <div>{state.message}</div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="sender_name" className="block text-xs font-medium text-[#94A3B8] mb-1">
                Your Name / Organization <span className="text-[#10B981]">*</span>
              </label>
              <input
                id="sender_name"
                name="sender_name"
                type="text"
                required
                placeholder="e.g. Sarah Jenkins (Acme Corp)"
                className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-[#0B0F19] border border-[#1E293B] text-[#F8FAFC] placeholder-[#64748B] focus:border-[#06B6D4] focus:outline-none transition-all"
              />
            </div>

            <div>
              <label htmlFor="sender_email" className="block text-xs font-medium text-[#94A3B8] mb-1">
                Email Address <span className="text-[#10B981]">*</span>
              </label>
              <input
                id="sender_email"
                name="sender_email"
                type="email"
                required
                placeholder="s.jenkins@acme.com"
                className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-[#0B0F19] border border-[#1E293B] text-[#F8FAFC] placeholder-[#64748B] focus:border-[#06B6D4] focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-xs font-medium text-[#94A3B8] mb-1">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              defaultValue="Senior Architecture Opportunity / Consultation"
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-[#0B0F19] border border-[#1E293B] text-[#F8FAFC] placeholder-[#64748B] focus:border-[#06B6D4] focus:outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-xs font-medium text-[#94A3B8] mb-1">
              Message <span className="text-[#10B981]">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              placeholder="Outline project scope, architecture requirements, or role timeline..."
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-[#0B0F19] border border-[#1E293B] text-[#F8FAFC] placeholder-[#64748B] focus:border-[#06B6D4] focus:outline-none transition-all resize-none"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[11px] text-[#64748B]">
              Protected by distributed rate limiting. Zero spam tolerance.
            </span>

            <button
              type="submit"
              disabled={isPending}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold bg-[#10B981] text-[#0B0F19] hover:bg-[#10B981]/90 disabled:opacity-50 transition-all flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            >
              <IconMail className="w-4 h-4" />
              <span>{isPending ? 'Sending...' : 'Transmit Message'}</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
