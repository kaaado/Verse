'use client';

// ============================================================================
// THE YACINEVERSE — Layered Technology Stack Architecture Visualization
// Interactive Categorized Badges, Proficiency Indices & Architectural Roles
// ============================================================================

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export interface TechItem {
  name: string;
  category: 'Frontend & 3D' | 'Backend & Data' | 'Security & Infra' | 'DevOps & Tooling';
  role: string;
  proficiency: number;
  highlight?: boolean;
}

const DEFAULT_STACK: TechItem[] = [
  { name: 'React 19 & Next.js 16', category: 'Frontend & 3D', role: 'Server Components, Turbopack, App Router', proficiency: 96, highlight: true },
  { name: 'Three.js / WebGL', category: 'Frontend & 3D', role: 'Physically-Based 3D Universe & Shaders', proficiency: 92, highlight: true },
  { name: 'TypeScript', category: 'Frontend & 3D', role: 'End-to-End Strict Static Typing', proficiency: 98, highlight: true },
  { name: 'Tailwind CSS v4', category: 'Frontend & 3D', role: 'Modern Responsive Design Tokens', proficiency: 95 },
  { name: 'Web Audio API', category: 'Frontend & 3D', role: 'Procedural Multi-Bus Sound Synthesis', proficiency: 88 },

  { name: 'PostgreSQL', category: 'Backend & Data', role: 'Relational Persistence, Foreign Keys & Indexes', proficiency: 94, highlight: true },
  { name: 'Row-Level Security (RLS)', category: 'Backend & Data', role: 'Deterministic Data Isolation & Policies', proficiency: 96, highlight: true },
  { name: 'Supabase / pg_graphql', category: 'Backend & Data', role: 'Managed Auth, Storage & Realtime Subscriptions', proficiency: 92 },
  { name: 'In-Memory Caching', category: 'Backend & Data', role: 'Sub-millisecond State Caching & Rate Limiting', proficiency: 90 },

  { name: 'Zero-Trust Architecture', category: 'Security & Infra', role: 'Defensive Token Verification & Isolation', proficiency: 95, highlight: true },
  { name: 'Edge Ingestion Proxy', category: 'Security & Infra', role: 'Next.js 16 proxy.ts Network Boundary', proficiency: 94 },
  { name: 'Audit Logging Engine', category: 'Security & Infra', role: 'Tamper-Evident Admin History Tracking', proficiency: 91 },

  { name: 'Vitest / Node Test Suite', category: 'DevOps & Tooling', role: 'Automated 110-Step Deterministic Verification', proficiency: 96, highlight: true },
  { name: 'ESLint & Prettier', category: 'DevOps & Tooling', role: 'Zero-Tolerance Linting & Formatting', proficiency: 98 },
  { name: 'Turbopack Engine', category: 'DevOps & Tooling', role: 'High-Performance Incremental Bundling', proficiency: 93 },
];

export function TechnologyStackVisualization() {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Frontend & 3D', 'Backend & Data', 'Security & Infra', 'DevOps & Tooling'];

  const filteredItems = activeCategory === 'ALL'
    ? DEFAULT_STACK
    : DEFAULT_STACK.filter((item) => item.category === activeCategory);

  return (
    <div className="w-full bg-[#070D1A]/90 border border-[#1E293B] rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#1E293B] gap-3">
        <div>
          <h3 className="text-sm font-mono tracking-widest text-[#10B981] uppercase flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span>Technology Architecture & Engineering Stack</span>
          </h3>
          <p className="text-xs text-[#94A3B8] font-sans mt-0.5">
            Production-grade modern web, systems architecture, and graphics toolchain
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-mono transition-all ${
                  isActive
                    ? 'bg-[#10B981] text-[#030712] font-bold shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                    : 'bg-[#0F172A] text-[#94A3B8] border border-[#1E293B] hover:text-[#F8FAFC]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Technology Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-4">
        {filteredItems.map((item, idx) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.03 }}
            className={`p-3.5 rounded-xl border transition-all ${
              item.highlight
                ? 'bg-[#0B1528]/80 border-[#06B6D4]/40 hover:border-[#06B6D4]'
                : 'bg-[#0A101D]/70 border-[#1E293B] hover:border-[#334155]'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <h4 className="text-xs font-bold font-sans text-[#F8FAFC]">
                {item.name}
              </h4>
              <span className="text-[10px] font-mono font-bold text-[#10B981]">
                {item.proficiency}%
              </span>
            </div>

            <p className="text-[11px] text-[#94A3B8] mt-1 line-clamp-2">
              {item.role}
            </p>

            <div className="mt-2.5 flex items-center justify-between">
              <span className="text-[9px] font-mono text-[#64748B] uppercase">
                {item.category}
              </span>
              <div className="w-20 bg-[#1E293B] h-1.5 rounded-full overflow-hidden">
                <div
                  style={{ width: `${item.proficiency}%` }}
                  className="bg-gradient-to-r from-[#06B6D4] to-[#10B981] h-full rounded-full"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
