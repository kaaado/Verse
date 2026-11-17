import React from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { logoutOwnerAction } from '@/app/actions/auth';
import {
  IconSparkles,
  IconTerminal,
  IconDossier,
  IconShield,
  IconCpu,
  IconMail,
  IconDatabase,
  IconExternalLink,
} from '@/components/icons';

export const metadata = {
  title: 'Creator Studio — THE YACINEVERSE',
  description: 'Private single-owner Content Management System for THE YACINEVERSE.',
};

export default async function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If unauthenticated and not on login page, let proxy/middleware handle redirect.
  // When user is null, child page (like /studio/login) renders without full admin chrome.
  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#F8FAFC] flex flex-col md:flex-row">
      {/* Admin Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#111827] border-b md:border-b-0 md:border-r border-[#1E293B] flex flex-col justify-between p-4 shrink-0">
        <div>
          {/* Studio Brand */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1E293B]">
            <Link href="/studio" className="flex items-center space-x-2">
              <span className="w-7 h-7 rounded-lg bg-[#1E293B] border border-[#10B981]/50 flex items-center justify-center text-[#10B981]">
                <IconSparkles className="w-4 h-4" />
              </span>
              <div>
                <span className="text-xs font-bold font-display tracking-wider block text-[#F8FAFC]">
                  CREATOR STUDIO
                </span>
                <span className="text-[10px] text-[#94A3B8] font-mono block">
                  Admin CMS
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs font-medium">
            <Link
              href="/studio"
              className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] transition-all"
            >
              <IconDatabase className="w-4 h-4 text-[#10B981]" />
              <span>Overview & Telemetry</span>
            </Link>

            <Link
              href="/studio/projects"
              className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] transition-all"
            >
              <IconTerminal className="w-4 h-4 text-[#06B6D4]" />
              <span>Projects CRUD</span>
            </Link>

            <Link
              href="/studio/experiences"
              className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] transition-all"
            >
              <IconDossier className="w-4 h-4 text-[#F59E0B]" />
              <span>Career Experiences</span>
            </Link>

            <Link
              href="/studio/credentials"
              className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] transition-all"
            >
              <IconShield className="w-4 h-4 text-[#10B981]" />
              <span>Degrees & Certifications</span>
            </Link>

            <Link
              href="/studio/skills"
              className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] transition-all"
            >
              <IconCpu className="w-4 h-4 text-[#8B5CF6]" />
              <span>Skills Taxonomy</span>
            </Link>

            <Link
              href="/studio/inquiries"
              className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] transition-all"
            >
              <IconMail className="w-4 h-4 text-[#EC4899]" />
              <span>Inquiries Inbox</span>
            </Link>
          </nav>
        </div>

        {/* User Session & Logout */}
        <div className="pt-4 border-t border-[#1E293B] mt-6">
          <div className="text-[11px] text-[#94A3B8] font-mono truncate mb-2">
            Logged in: <span className="text-[#10B981]">{user.email}</span>
          </div>

          <div className="flex items-center justify-between">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-[#94A3B8] hover:text-[#F8FAFC] flex items-center space-x-1"
            >
              <span>View Live Site</span>
              <IconExternalLink className="w-3 h-3" />
            </Link>

            <form action={logoutOwnerAction}>
              <button
                type="submit"
                className="text-xs text-[#EF4444] hover:underline font-medium"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main Studio Work Area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
