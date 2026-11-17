'use client';

// ============================================================================
// THE YACINEVERSE — Interactive Data Flow & Execution Sequence Diagram
// Animated Step-by-Step Transaction Flow from User Interaction to Storage & Audit
// ============================================================================

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface DataFlowStep {
  step: number;
  actor: string;
  action: string;
  details: string;
  securityGuard: string;
  duration: string;
}

const FLOW_STEPS: DataFlowStep[] = [
  {
    step: 1,
    actor: 'Client Universe Viewport',
    action: 'Deterministic User Interaction',
    details: 'User presses [E] near an interactive monolith or navigates via first-person controls.',
    securityGuard: 'CentralizedInputManager 400ms Cooldown & Key Repeat Guard',
    duration: '< 1ms',
  },
  {
    step: 2,
    actor: 'Network Edge Proxy (proxy.ts)',
    action: 'Ingress & Rate Limiting',
    details: 'Validates client request origin, inspects session headers, and checks sliding-window IP limits.',
    securityGuard: 'checkRateLimit (50 req/min) & CSP Security Headers',
    duration: '2ms - 8ms',
  },
  {
    step: 3,
    actor: 'Zero-Trust Server Action',
    action: 'Role & Cryptographic Assertion',
    details: 'Verifies authenticated Supabase user session token or enforces public read-only constraints.',
    securityGuard: 'requireAuthGuard & Strict TypeScript Schema Validation',
    duration: '10ms - 20ms',
  },
  {
    step: 4,
    actor: 'PostgreSQL Relational Engine',
    action: 'Row-Level Security Evaluation',
    details: 'Postgres evaluates declarative RLS policies; ensures non-published projects or drafts are excluded.',
    securityGuard: 'PostgreSQL RLS with zero information leakage junction rules',
    duration: '2ms - 15ms',
  },
  {
    step: 5,
    actor: 'Audit & State Synchronizer',
    action: 'State Broadcast & Response',
    details: 'Writes tamper-evident audit log if mutation occurred; returns payload to client state orchestrator.',
    securityGuard: 'Immutable public.audit_logs append-only trigger',
    duration: '< 5ms',
  },
];

export function DataFlowVisualization() {
  const [activeStep, setActiveStep] = useState<number>(1);

  return (
    <div className="w-full bg-[#070D1A]/90 border border-[#1E293B] rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#1E293B] gap-2">
        <div>
          <h3 className="text-sm font-mono tracking-widest text-[#06B6D4] uppercase flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#06B6D4] animate-pulse" />
            <span>Deterministic End-to-End Request Pipeline</span>
          </h3>
          <p className="text-xs text-[#94A3B8] font-sans mt-0.5">
            Step through the life of a secure transaction from client input to persistence
          </p>
        </div>

        <span className="text-[11px] font-mono text-[#64748B]">
          PIPELINE: ACTIVE
        </span>
      </div>

      {/* Horizontal Step Timeline Tracker */}
      <div className="grid grid-cols-5 gap-2 my-5">
        {FLOW_STEPS.map((s) => {
          const isSelected = activeStep === s.step;
          const isPassed = activeStep > s.step;
          return (
            <button
              key={s.step}
              type="button"
              onClick={() => setActiveStep(s.step)}
              className="flex flex-col items-center group text-left focus:outline-none"
            >
              <div
                className={`w-full h-1.5 rounded-full mb-2 transition-all ${
                  isSelected
                    ? 'bg-[#06B6D4] shadow-[0_0_10px_#06B6D4]'
                    : isPassed
                    ? 'bg-[#10B981]'
                    : 'bg-[#1E293B]'
                }`}
              />
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-[#06B6D4] text-[#030712] scale-110'
                    : isPassed
                    ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]'
                    : 'bg-[#0F172A] text-[#64748B] border border-[#1E293B]'
                }`}
              >
                0{s.step}
              </div>
              <span
                className={`text-[10px] font-mono mt-1 text-center hidden sm:block ${
                  isSelected ? 'text-[#06B6D4] font-bold' : 'text-[#64748B]'
                }`}
              >
                {s.actor.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Step Detail Card */}
      <AnimatePresence mode="wait">
        {(() => {
          const current = FLOW_STEPS.find((s) => s.step === activeStep) || FLOW_STEPS[0];
          return (
            <motion.div
              key={current.step}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="p-4 sm:p-5 rounded-xl bg-[#030712]/70 border border-[#1E293B] flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono text-[#06B6D4] font-bold">
                    STEP 0{current.step} {'//'} {current.actor}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1E293B] text-[#94A3B8]">
                    LATENCY: {current.duration}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[#F8FAFC]">
                  {current.action}
                </h4>
                <p className="text-xs text-[#94A3B8] leading-relaxed max-w-2xl">
                  {current.details}
                </p>
              </div>

              <div className="w-full md:w-auto p-3 rounded-lg bg-[#0F172A] border border-[#1E293B] shrink-0">
                <span className="text-[9px] font-mono uppercase text-[#10B981] block font-bold">
                  Active Defensive Control
                </span>
                <span className="text-xs font-mono text-[#F8FAFC] block mt-0.5">
                  {current.securityGuard}
                </span>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
