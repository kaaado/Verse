'use client';

// ============================================================================
// THE YACINEVERSE — Verified Credentials & University Degrees
// ============================================================================

import React, { useState } from 'react';
import type { Credential } from '@/types/database';
import { IconShield, IconExternalLink, IconCheck } from '@/components/icons';

interface CredentialsSectionProps {
  credentials: Credential[];
}

export function CredentialsSection({ credentials }: CredentialsSectionProps) {
  const [activeCredential, setActiveCredential] = useState<Credential | null>(null);

  return (
    <section className="mb-12">
      <div className="flex items-center space-x-2 mb-4">
        <IconShield className="w-5 h-5 text-[#10B981]" />
        <h2 className="text-xl font-bold font-display text-[#F8FAFC]">
          Verified Academic & Technical Credentials
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {credentials.map((cred) => (
          <div
            key={cred.id}
            className="bg-[#111827] border border-[#1E293B] hover:border-[#10B981]/40 rounded-xl p-5 transition-all shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30">
                  <IconCheck className="w-3 h-3 mr-1" />
                  {cred.credential_type}
                </span>
                <span className="text-xs text-[#94A3B8] font-mono">
                  {new Date(cred.issue_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                </span>
              </div>

              <h3 className="text-base font-semibold text-[#F8FAFC] leading-snug">
                {cred.title}
              </h3>
              <p className="text-xs text-[#06B6D4] mt-1 font-medium">
                {cred.issuer}
              </p>

              {cred.credential_id_number && (
                <p className="text-[11px] text-[#94A3B8] font-mono mt-2">
                  ID: {cred.credential_id_number}
                </p>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-[#1E293B] flex items-center justify-between">
              {cred.credential_url ? (
                <a
                  href={cred.credential_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#10B981] hover:underline flex items-center space-x-1"
                >
                  <span>Verify Institution</span>
                  <IconExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <span className="text-xs text-[#94A3B8]">Verified Record</span>
              )}

              <button
                type="button"
                onClick={() => setActiveCredential(cred)}
                className="text-xs text-[#F8FAFC] bg-[#1E293B] hover:bg-[#334155] px-2.5 py-1 rounded-lg border border-[#334155] transition-all"
              >
                Inspect
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Credential Inspection Modal */}
      {activeCredential && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4 border-b border-[#1E293B] pb-3">
              <h3 className="text-lg font-bold text-[#F8FAFC]">
                {activeCredential.title}
              </h3>
              <button
                type="button"
                onClick={() => setActiveCredential(null)}
                className="text-[#94A3B8] hover:text-[#F8FAFC] text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#94A3B8]">
              <p><strong className="text-[#F8FAFC]">Issuing Authority:</strong> {activeCredential.issuer}</p>
              <p><strong className="text-[#F8FAFC]">Credential Type:</strong> {activeCredential.credential_type}</p>
              <p><strong className="text-[#F8FAFC]">Date of Conferment:</strong> {activeCredential.issue_date}</p>
              {activeCredential.credential_id_number && (
                <p><strong className="text-[#F8FAFC]">Registry Verification ID:</strong> <code className="bg-[#1E293B] px-1 py-0.5 rounded text-[#10B981]">{activeCredential.credential_id_number}</code></p>
              )}
              <p className="mt-4 pt-4 border-t border-[#1E293B] text-[11px] italic text-[#64748B]">
                Physical degree transcripts and official conferment records verified under Master of Science curriculum requirements at the University of Mascara and NVIDIA DLI.
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveCredential(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#1E293B] text-[#F8FAFC] hover:bg-[#334155]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
