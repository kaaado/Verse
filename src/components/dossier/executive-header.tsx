'use client';

// ============================================================================
// THE YACINEVERSE — Dossier Executive Header
// Fast-track recruiter overview designed for sub-30-second conviction
// ============================================================================

import React, { useState } from 'react';
import { IconDownload, IconMail, IconCheck, IconExternalLink } from '@/components/icons';

export function ExecutiveHeader() {
  const [copied, setCopied] = useState(false);
  const email = 'kaaado.dev@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="border-b border-[#1E293B] pb-10 mb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] mr-1.5 animate-pulse" />
              Available for High-Impact Roles & Architecture Consulting
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-display text-[#F8FAFC]">
            Yacine Abdelsoltane Kermame
          </h1>
          <p className="text-lg text-[#06B6D4] font-medium mt-1">
            Principal Software Architect & Full-Stack Systems Engineer
          </p>
          <p className="text-sm text-[#94A3B8] max-w-2xl mt-3 leading-relaxed">
            M.Sc. Computer Science • 5+ years architecting high-concurrency distributed platforms (PassiLuce), offline-first IoT field ERPs (Agrovia), and mission-critical hospital RBAC digitalization. Proven production impact under real-world infrastructure and payment constraints.
          </p>
        </div>

        {/* Quick Recruiter Actions */}
        <div className="flex flex-wrap sm:flex-nowrap gap-3 items-center">
          <button
            type="button"
            onClick={handleCopyEmail}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#111827] text-[#F8FAFC] border border-[#1E293B] hover:border-[#334155] hover:bg-[#1E293B] transition-all shadow-sm"
          >
            {copied ? (
              <>
                <IconCheck className="w-4 h-4 text-[#10B981]" />
                <span className="text-[#10B981]">Email Copied!</span>
              </>
            ) : (
              <>
                <IconMail className="w-4 h-4 text-[#94A3B8]" />
                <span>Copy Email</span>
              </>
            )}
          </button>

          <a
            href="#contact"
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#10B981] text-[#0B0F19] hover:bg-[#10B981]/90 transition-all font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          >
            <IconExternalLink className="w-4 h-4" />
            <span>Send Inquiry</span>
          </a>

          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#111827] text-[#94A3B8] border border-[#1E293B] hover:text-[#F8FAFC] hover:border-[#334155] transition-all"
            title="Export Clean 2-Page Executive Dossier as PDF"
          >
            <IconDownload className="w-4 h-4" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>
    </section>
  );
}
