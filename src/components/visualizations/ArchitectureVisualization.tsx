'use client';

// ============================================================================
// THE YACINEVERSE — Interactive System Architecture Topology Visualization
// Multi-Tier Component Diagram with Node Selection, Active Conduits & Telemetry Inspector
// ============================================================================

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ArchitectureNode {
  id: string;
  name: string;
  tier: 'Edge Ingestion' | 'Gateway & Auth' | 'Compute & Core' | 'Persistence';
  protocol: string;
  latency: string;
  description: string;
  status: 'nominal' | 'active' | 'standby';
  x: number;
  y: number;
}

const DEFAULT_NODES: ArchitectureNode[] = [
  {
    id: 'edge-proxy',
    name: 'Edge Routing Proxy',
    tier: 'Edge Ingestion',
    protocol: 'HTTP/3 • TLS 1.3',
    latency: '< 12ms',
    description: 'Geo-distributed edge proxy enforcing DDoS mitigation, rate-limiting, and geo-routing.',
    status: 'nominal',
    x: 15,
    y: 20,
  },
  {
    id: 'api-gateway',
    name: 'Zero-Trust Gateway',
    tier: 'Gateway & Auth',
    protocol: 'gRPC / JSON',
    latency: '< 18ms',
    description: 'Central validation gate verifying cryptographic JWT tokens, claims, and tenant boundaries.',
    status: 'nominal',
    x: 40,
    y: 20,
  },
  {
    id: 'core-compute',
    name: 'Distributed Engine',
    tier: 'Compute & Core',
    protocol: 'Internal Bus',
    latency: '< 5ms',
    description: 'High-throughput transactional engine handling business logic and deterministic state machines.',
    status: 'active',
    x: 65,
    y: 20,
  },
  {
    id: 'database-cluster',
    name: 'PostgreSQL & Cache',
    tier: 'Persistence',
    protocol: 'TCP / Wire',
    latency: '< 2ms',
    description: 'ACID-compliant relational storage with connection pooling and in-memory LRU read replicas.',
    status: 'nominal',
    x: 90,
    y: 20,
  },
  {
    id: 'realtime-stream',
    name: 'Telemetry Bus',
    tier: 'Compute & Core',
    protocol: 'WebSocket / SSE',
    latency: '< 25ms',
    description: 'Bidirectional streaming service fanning out real-time updates and audit telemetry.',
    status: 'nominal',
    x: 65,
    y: 75,
  },
  {
    id: 'audit-vault',
    name: 'Immutable Audit Log',
    tier: 'Persistence',
    protocol: 'Append-Only',
    latency: '< 8ms',
    description: 'Cryptographically sequenced tamper-evident log verifying all administrative interventions.',
    status: 'nominal',
    x: 90,
    y: 75,
  },
];

interface ArchitectureVisualizationProps {
  title?: string;
  systemName?: string;
  nodes?: ArchitectureNode[];
}

export function ArchitectureVisualization({
  title = 'System Topology & Data Pipeline',
  systemName = 'Enterprise System Architecture',
  nodes = DEFAULT_NODES,
}: ArchitectureVisualizationProps) {
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode>(nodes[2]);

  return (
    <div className="w-full bg-[#070D1A]/90 border border-[#1E293B] rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-md">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#1E293B] gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <h3 className="text-sm font-mono tracking-widest text-[#06B6D4] uppercase">
              {title}
            </h3>
          </div>
          <p className="text-xs text-[#94A3B8] font-sans mt-0.5">
            {systemName} • Click any node to inspect telemetry & protocol specifications
          </p>
        </div>
        <div className="flex items-center space-x-2 font-mono text-[11px] text-[#64748B]">
          <span>STATUS: ALL NODES NOMINAL</span>
          <span className="px-2 py-0.5 rounded bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">
            ONLINE
          </span>
        </div>
      </div>

      {/* SVG Canvas & Node Map */}
      <div className="relative w-full h-64 sm:h-72 my-4 rounded-xl bg-[#030712]/70 border border-[#1E293B]/60 overflow-hidden flex items-center justify-center">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 cosmic-grid opacity-15 pointer-events-none" />

        {/* Dynamic SVG Conduit Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Main Highway: Edge -> Gateway -> Compute -> DB */}
          <line x1="15" y1="20" x2="40" y2="20" stroke="#1E293B" strokeWidth="0.8" />
          <line x1="40" y1="20" x2="65" y2="20" stroke="#1E293B" strokeWidth="0.8" />
          <line x1="65" y1="20" x2="90" y2="20" stroke="#1E293B" strokeWidth="0.8" />

          {/* Telemetry Branches */}
          <line x1="40" y1="20" x2="65" y2="75" stroke="#1E293B" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
          <line x1="65" y1="75" x2="90" y2="75" stroke="#1E293B" strokeWidth="0.8" />
          <line x1="65" y1="20" x2="65" y2="75" stroke="#1E293B" strokeWidth="0.8" strokeDasharray="1 1" />

          {/* Active Flow Pulse Animations */}
          <motion.circle
            cx="27.5"
            cy="20"
            r="1"
            fill="#10B981"
            animate={{ cx: [15, 40] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
          <motion.circle
            cx="52.5"
            cy="20"
            r="1"
            fill="#06B6D4"
            animate={{ cx: [40, 65] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
          />
          <motion.circle
            cx="77.5"
            cy="20"
            r="1"
            fill="#8B5CF6"
            animate={{ cx: [65, 90] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </svg>

        {/* Interactive Nodes */}
        {nodes.map((node) => {
          const isSelected = selectedNode.id === node.id;
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => setSelectedNode(node)}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group transition-all duration-300 focus:outline-none`}
            >
              {/* Outer Glow Halo */}
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                  isSelected
                    ? 'border-[#10B981] bg-[#10B981]/20 shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-110'
                    : 'border-[#334155] bg-[#0F172A]/90 hover:border-[#06B6D4] hover:scale-105'
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    isSelected ? 'bg-[#10B981] animate-ping' : 'bg-[#06B6D4]'
                  }`}
                />
              </div>

              {/* Node Title Badge */}
              <span
                className={`mt-1.5 px-2 py-0.5 rounded font-mono text-[10px] whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-[#10B981]/20 text-[#A7F3D0] border border-[#10B981]/30 font-bold'
                    : 'text-[#94A3B8] bg-[#0F172A]/60 group-hover:text-[#F8FAFC]'
                }`}
              >
                {node.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Node Telemetry Inspector */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedNode.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="p-4 rounded-xl bg-[#0F172A]/90 border border-[#1E293B] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="space-y-1 max-w-xl">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/20">
                {selectedNode.tier}
              </span>
              <h4 className="text-sm font-bold text-[#F8FAFC] font-sans">
                {selectedNode.name}
              </h4>
            </div>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              {selectedNode.description}
            </p>
          </div>

          <div className="flex items-center space-x-4 border-t sm:border-t-0 sm:border-l border-[#1E293B] pt-3 sm:pt-0 sm:pl-4 w-full sm:w-auto justify-between sm:justify-start">
            <div>
              <span className="text-[9px] font-mono text-[#64748B] uppercase block">
                Protocol
              </span>
              <span className="text-xs font-mono font-bold text-[#F8FAFC]">
                {selectedNode.protocol}
              </span>
            </div>
            <div>
              <span className="text-[9px] font-mono text-[#64748B] uppercase block">
                Target Latency
              </span>
              <span className="text-xs font-mono font-bold text-[#10B981]">
                {selectedNode.latency}
              </span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
