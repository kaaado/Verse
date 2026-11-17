'use client';

// ============================================================================
// THE YACINEVERSE — Creator Studio Login Page
// ============================================================================

import React, { useActionState } from 'react';
import Link from 'next/link';
import { loginOwnerAction, type AuthActionResult } from '@/app/actions/auth';
import { IconLock, IconSparkles } from '@/components/icons';

const initialAuthState: AuthActionResult = {
  success: false,
};

export default function StudioLoginPage() {
  const [state, formAction, isPending] = useActionState(loginOwnerAction, initialAuthState);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#F8FAFC] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#111827] border border-[#1E293B] rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#1E293B] border border-[#10B981]/40 flex items-center justify-center text-[#10B981] mx-auto mb-3 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <IconSparkles className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold font-display text-[#F8FAFC]">
            Creator Studio Authentication
          </h1>
          <p className="text-xs text-[#94A3B8] mt-1">
            Sign in with authorized administrator credentials
          </p>
        </div>

        {state.error && (
          <div className="mb-4 p-3 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/40 text-[#EF4444] text-xs">
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-[#94A3B8] mb-1">
              Admin Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="kaaado.dev@gmail.com"
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-[#0B0F19] border border-[#1E293B] text-[#F8FAFC] placeholder-[#64748B] focus:border-[#10B981] focus:outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-medium text-[#94A3B8] mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-[#0B0F19] border border-[#1E293B] text-[#F8FAFC] placeholder-[#64748B] focus:border-[#10B981] focus:outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#10B981] text-[#0B0F19] hover:bg-[#10B981]/90 disabled:opacity-50 transition-all flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(16,185,129,0.3)] mt-2"
          >
            <IconLock className="w-3.5 h-3.5" />
            <span>{isPending ? 'Authenticating...' : 'Sign In to Studio'}</span>
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-[#1E293B] text-center">
          <Link href="/" className="text-xs text-[#94A3B8] hover:text-[#F8FAFC]">
            ← Return to Public Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
