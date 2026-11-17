'use client';

// ============================================================================
// THE YACINEVERSE — Spatially Integrated In-World Artifact & Terminal
// 3D holographic artifact with proximity activation and in-space spatial UI
// ============================================================================

import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import type { InteractiveArtifact } from './universe-types';
import type { Project, Skill, Story } from '@/types/database';
import { universeAudio } from './universe-audio';
import { IconExternalLink, IconSparkles } from '@/components/icons';

interface WorldTerminalProps {
  artifact: InteractiveArtifact;
  isActive: boolean;
  onActivate: (artifact: InteractiveArtifact) => void;
  onClose: () => void;
}

export function WorldTerminal({
  artifact,
  isActive,
  onActivate,
  onClose,
}: WorldTerminalProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.5;
      meshRef.current.position.y = artifact.position[1] + Math.sin(t * 2) * 0.1;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.4;
      ringRef.current.rotation.z = -t * 0.6;
    }
  });

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    universeAudio.playInteractionChime();
    onActivate(artifact);
  };

  const projectData = artifact.type === 'project' ? (artifact.data as Project) : null;
  const skillData = artifact.type === 'skill' ? (artifact.data as Skill) : null;
  const storyData = artifact.type === 'story' ? (artifact.data as Story) : null;

  return (
    <group position={artifact.position}>
      {/* 3D Holographic Artifact Geometry */}
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        {artifact.type === 'project' && <octahedronGeometry args={[1.2, 0]} />}
        {artifact.type === 'skill' && <cylinderGeometry args={[0.4, 0.4, 1.8, 6]} />}
        {artifact.type === 'story' && <dodecahedronGeometry args={[1.1, 0]} />}
        {artifact.type === 'portal' && <torusGeometry args={[1.6, 0.1, 16, 48]} />}

        <meshStandardMaterial
          color={artifact.color}
          emissive={artifact.color}
          emissiveIntensity={isActive ? 2.5 : hovered ? 1.8 : 0.9}
          wireframe={artifact.type === 'project' || artifact.type === 'story'}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Orbiting Reticle Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.8, 0.03, 12, 48]} />
        <meshBasicMaterial
          color={artifact.color}
          transparent
          opacity={hovered || isActive ? 0.9 : 0.4}
        />
      </mesh>

      {/* Localized Point Light */}
      <pointLight
        color={artifact.color}
        intensity={isActive ? 20 : hovered ? 12 : 5}
        distance={12}
      />

      {/* Spatially Projected HTML Terminal Display */}
      {isActive ? (
        <Html position={[0, 2.2, 0]} center distanceFactor={14}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-80 sm:w-96 bg-[#0B0F19]/95 backdrop-blur-xl border border-[#1E293B] rounded-2xl p-5 shadow-[0_0_30px_rgba(0,0,0,0.8)] text-[#F8FAFC] select-none"
            style={{ borderColor: `${artifact.color}66` }}
          >
            {/* Terminal Header */}
            <div className="flex items-start justify-between pb-3 border-b border-[#1E293B]">
              <div>
                <span
                  style={{ color: artifact.color }}
                  className="text-[10px] font-mono uppercase tracking-widest block font-bold"
                >
                  {artifact.type.toUpperCase()} ARTIFACT ACTIVE
                </span>
                <h3 className="text-base font-bold font-display text-[#F8FAFC] mt-0.5">
                  {artifact.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-7 h-7 rounded-lg bg-[#1E293B] text-[#94A3B8] hover:text-[#F8FAFC] flex items-center justify-center text-xs font-mono"
              >
                ✕
              </button>
            </div>

            {/* Terminal Body Content */}
            <div className="py-3 space-y-3 text-xs text-[#94A3B8] leading-relaxed">
              {projectData && (
                <>
                  <p className="text-[#F8FAFC] font-medium">{projectData.tagline}</p>
                  <p className="line-clamp-3">{projectData.summary}</p>

                  {projectData.architecture_overview && (
                    <div className="bg-[#111827] p-2.5 rounded-xl border border-[#1E293B]">
                      <span className="text-[10px] font-mono uppercase text-[#06B6D4] block mb-1">
                        System Topology
                      </span>
                      <p className="font-mono text-[11px] text-[#F8FAFC]">
                        {projectData.architecture_overview}
                      </p>
                    </div>
                  )}

                  {projectData.impact_metrics && projectData.impact_metrics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {projectData.impact_metrics.map((m, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono bg-[#1E293B] text-[#10B981] px-2 py-0.5 rounded"
                        >
                          {m.label}: {m.value}
                        </span>
                      ))}
                    </div>
                  )}
                </>
              )}

              {skillData && (
                <div className="space-y-2">
                  <div className="flex justify-between font-mono text-xs">
                    <span>Proficiency Index:</span>
                    <span className="text-[#10B981] font-bold">{skillData.proficiency}%</span>
                  </div>
                  <div className="w-full bg-[#1E293B] h-2 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${skillData.proficiency}%` }}
                      className="bg-[#10B981] h-full rounded-full"
                    />
                  </div>
                  <span className="text-[10px] font-mono text-[#64748B] block">
                    Taxonomy category: {skillData.category}
                  </span>
                </div>
              )}

              {storyData && (
                <>
                  <div className="flex items-center space-x-1.5 text-[10px] font-mono text-[#EC4899]">
                    <IconSparkles className="w-3 h-3" />
                    <span>Technical Chronicle • {storyData.read_time_minutes} min read</span>
                  </div>
                  <p>{storyData.excerpt}</p>
                </>
              )}
            </div>

            {/* Terminal Actions */}
            <div className="pt-3 border-t border-[#1E293B] flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={onClose}
                className="font-mono text-[#94A3B8] hover:text-[#F8FAFC]"
              >
                Close [Esc]
              </button>

              {projectData && (
                <a
                  href={`/projects/${projectData.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[#10B981] font-bold hover:underline flex items-center space-x-1"
                >
                  <span>Full Deep-Dive</span>
                  <IconExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </Html>
      ) : (
        /* Floating Unactivated Label */
        <Html position={[0, 1.8, 0]} center distanceFactor={22} pointerEvents="none">
          <div
            style={{ borderColor: hovered ? artifact.color : '#1E293B' }}
            className="bg-[#0B0F19]/80 backdrop-blur-md px-2.5 py-1 rounded-full border text-[11px] font-mono text-[#F8FAFC] whitespace-nowrap shadow-md flex items-center space-x-1.5"
          >
            <span
              style={{ backgroundColor: artifact.color }}
              className="w-1.5 h-1.5 rounded-full"
            />
            <span>{artifact.title}</span>
            <span className="text-[9px] text-[#94A3B8] font-mono">[E]</span>
          </div>
        </Html>
      )}
    </group>
  );
}
