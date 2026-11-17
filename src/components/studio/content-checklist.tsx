'use client';

// ============================================================================
// THE YACINEVERSE — Creator Studio: "Your Content Checklist" Onboarding
// Instructional checklist guiding the Product Owner on what real content to supply
// ============================================================================

import React from 'react';
import { IconSparkles } from '@/components/icons';

interface ChecklistItem {
  id: string;
  category: string;
  title: string;
  description: string;
  requiredFields: string[];
  optionalFields: string[];
  destinationRoute: string;
}

const CONTENT_CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'intro',
    category: 'Identity',
    title: 'Professional Introduction & Bio',
    description: 'Executive bio, primary engineering disciplines, and availability status displayed in the Dossier header.',
    requiredFields: ['Full Name', 'Primary Professional Title', 'Executive Summary'],
    optionalFields: ['Location', 'Preferred Remote/Hybrid Status'],
    destinationRoute: '/studio/profile',
  },
  {
    id: 'contact',
    category: 'Communication',
    title: 'Official Contact & Inbound Channels',
    description: 'Email and destination endpoint for messages submitted through the encrypted contact section.',
    requiredFields: ['Primary Work Email'],
    optionalFields: ['LinkedIn Profile URL', 'GitHub Organization URL', 'Public Calendar Booking Link'],
    destinationRoute: '/studio/inquiries',
  },
  {
    id: 'skills',
    category: 'Taxonomy',
    title: 'Technical Skills & Competency Matrix',
    description: 'Core programming languages, frameworks, AI/ML tools, and infrastructure technologies.',
    requiredFields: ['Skill Name', 'Category (Languages / Frontend / Backend / AI / DevOps)', 'Proficiency (0-100)'],
    optionalFields: ['Top Skill Flag', 'Custom SVG Icon Slug', 'Display Priority Order'],
    destinationRoute: '/studio/skills',
  },
  {
    id: 'experiences',
    category: 'Career History',
    title: 'Employment & Systems Consulting Roles',
    description: 'Chronological work history with verifiable achievements and architectural responsibilities.',
    requiredFields: ['Role / Title', 'Organization Name', 'Start Date', 'Description'],
    optionalFields: ['End Date (leave empty if current)', 'Organization Website URL', 'Bullet Point Highlights'],
    destinationRoute: '/studio/experiences',
  },
  {
    id: 'credentials',
    category: 'Accreditation',
    title: 'Academic Degrees & Professional Certifications',
    description: 'University diplomas, post-graduate degrees, and professional certifications with verification links.',
    requiredFields: ['Credential Title', 'Issuing Institution', 'Credential Type (Degree / Cert)', 'Issue Date'],
    optionalFields: ['Credential ID Number', 'Official Verification URL', 'Certificate PDF / Image Asset'],
    destinationRoute: '/studio/credentials',
  },
  {
    id: 'projects',
    category: 'Showcase',
    title: 'Flagship Projects & Systems Case Studies',
    description: 'Deep-dive architectural case studies illustrating problems, solutions, topologies, and metrics.',
    requiredFields: ['Project Title', 'Unique URL Slug', 'Tagline', 'Thematic Sector', 'Summary'],
    optionalFields: ['Flagship Flag', 'Live Demo URL', 'GitHub Repo URL', 'Architecture Topology Overview', 'Verified Metrics (JSON)'],
    destinationRoute: '/studio/projects',
  },
  {
    id: 'stories',
    category: 'Chronicle',
    title: 'Technical Chronicle Articles & Essays',
    description: 'Long-form technical articles, post-mortems, and engineering philosophies.',
    requiredFields: ['Article Title', 'URL Slug', 'Excerpt Summary', 'Markdown / MDX Content'],
    optionalFields: ['Tags', 'Cover Image Asset', 'Estimated Read Time in Minutes'],
    destinationRoute: '/studio/stories',
  },
  {
    id: 'cv_asset',
    category: 'Media & Documents',
    title: 'Curated Recruiter CV (PDF Asset)',
    description: 'High-res downloadable PDF resume for fast-track recruiter downloading.',
    requiredFields: ['Upload CV PDF file to Media Library'],
    optionalFields: ['Update date timestamp'],
    destinationRoute: '/studio/media',
  },
];

export function ContentChecklist() {
  return (
    <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 shadow-xl">
      <div className="flex items-center space-x-2.5 pb-4 mb-6 border-b border-[#1E293B]">
        <span className="w-8 h-8 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center text-[#10B981]">
          <IconSparkles className="w-4 h-4" />
        </span>
        <div>
          <h2 className="text-base font-bold font-display text-[#F8FAFC]">
            Your Content Checklist
          </h2>
          <p className="text-xs text-[#94A3B8]">
            Authoritative guide to the real information you need to input to replace synthetic demo data
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CONTENT_CHECKLIST_ITEMS.map((item, index) => (
          <div
            key={item.id}
            className="bg-[#0B0F19] border border-[#1E293B] hover:border-[#334155] rounded-xl p-4 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase text-[#06B6D4] px-2 py-0.5 rounded bg-[#06B6D4]/10 border border-[#06B6D4]/20">
                {item.category}
              </span>
              <span className="text-[10px] font-mono text-[#64748B]">
                Step {index + 1} of {CONTENT_CHECKLIST_ITEMS.length}
              </span>
            </div>

            <h3 className="text-sm font-bold text-[#F8FAFC]">{item.title}</h3>
            <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
              {item.description}
            </p>

            <div className="mt-3 pt-3 border-t border-[#1E293B] space-y-1.5 text-[11px]">
              <div>
                <strong className="text-[#10B981]">Required:</strong>{' '}
                <span className="text-[#94A3B8]">{item.requiredFields.join(', ')}</span>
              </div>
              <div>
                <strong className="text-[#94A3B8]">Optional:</strong>{' '}
                <span className="text-[#64748B]">{item.optionalFields.join(', ')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
