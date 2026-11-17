import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { IconMail } from '@/components/icons';
import type { Inquiry } from '@/types/database';

export default async function StudioInquiriesPage() {
  let inquiries: Inquiry[] = [];

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      inquiries = data as Inquiry[];
    }
  } catch {
    inquiries = [];
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
      <div className="pb-6 border-b border-[#1E293B]">
        <h1 className="text-2xl font-bold font-display text-[#F8FAFC]">
          Inbound Inquiries & Communication Inbox
        </h1>
        <p className="text-xs text-[#94A3B8] mt-1">
          Review incoming visitor questions, recruiter contact, and consulting proposals
        </p>
      </div>

      {inquiries.length === 0 ? (
        <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-12 text-center">
          <div className="w-12 h-12 rounded-full bg-[#1E293B] border border-[#1E293B] flex items-center justify-center mx-auto mb-3 text-[#94A3B8]">
            <IconMail className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#F8FAFC]">No Inquiries Logged Yet</h3>
          <p className="text-xs text-[#94A3B8] max-w-sm mx-auto mt-1">
            New contact submissions from the public Professional Dossier will appear here in real time.
          </p>
        </div>
      ) : (
        <div className="bg-[#111827] border border-[#1E293B] rounded-2xl overflow-hidden shadow-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#1E293B]/50 border-b border-[#1E293B] text-[#94A3B8] font-mono uppercase text-[10px]">
              <tr>
                <th className="px-6 py-3.5">Sender</th>
                <th className="px-6 py-3.5">Subject</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Received</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E293B]">
              {inquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-[#1E293B]/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-[#F8FAFC]">{inq.sender_name}</div>
                    <div className="text-[11px] text-[#06B6D4] font-mono">{inq.sender_email}</div>
                  </td>
                  <td className="px-6 py-4 text-[#F8FAFC]">
                    {inq.subject}
                    <div className="text-[11px] text-[#94A3B8] line-clamp-1 mt-0.5">{inq.message}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30">
                      {inq.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-[#94A3B8]">
                    {new Date(inq.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
