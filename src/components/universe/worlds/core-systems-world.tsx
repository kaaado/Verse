'use client';

// ============================================================================
// THE YACINEVERSE — World 1: Core Systems & Architecture
// Interior environment: Floating obsidian architecture, server towers, data bridges
// ============================================================================

import React, { useMemo } from 'react';
import * as THREE from 'three';
import { WorldTerminal } from '../world-terminal';
import type { InteractiveArtifact } from '../universe-types';
import type { Project, Skill } from '@/types/database';

interface CoreSystemsWorldProps {
  projects: Project[];
  skills: Skill[];
  activeArtifact: InteractiveArtifact | null;
  onActivateArtifact: (artifact: InteractiveArtifact) => void;
  onCloseArtifact: () => void;
}

export function CoreSystemsWorld({
  projects,
  skills,
  activeArtifact,
  onActivateArtifact,
  onCloseArtifact,
}: CoreSystemsWorldProps) {
  // Find project and skill data
  const chronosProject = projects.find((p) => p.slug === 'project-chronos') || projects[0];
  const backendSkill = skills.find((s) => s.category.toLowerCase().includes('backend')) || skills[0];

  const artifacts: InteractiveArtifact[] = useMemo(() => {
    const list: InteractiveArtifact[] = [];

    if (chronosProject) {
      list.push({
        id: 'chronos-monolith',
        type: 'project',
        title: chronosProject.title,
        subtitle: chronosProject.tagline,
        position: [-6, 1.8, 0],
        color: '#10B981',
        data: chronosProject,
      });
    }

    if (backendSkill) {
      list.push({
        id: 'backend-pillar',
        type: 'skill',
        title: backendSkill.name,
        position: [6, 1.8, -2],
        color: '#10B981',
        data: backendSkill,
      });
    }

    // Space Orbit Return Beacon
    list.push({
      id: 'exit-portal',
      type: 'portal',
      title: 'Space Orbit Gateway',
      position: [0, 1.8, 14],
      color: '#10B981',
    });

    return list;
  }, [chronosProject, backendSkill]);

  return (
    <group>
      {/* Environmental Fog & Atmospheric Lighting */}
      <fog attach="fog" args={['#04130c', 8, 48]} />
      <ambientLight intensity={0.4} color="#10B981" />
      <directionalLight position={[10, 20, 10]} intensity={1.2} color="#F8FAFC" />

      {/* Main Obsidian Floor Platform */}
      <mesh position={[0, -0.2, 0]} receiveShadow>
        <cylinderGeometry args={[26, 28, 0.4, 32]} />
        <meshStandardMaterial
          color="#0B130E"
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Neon Emerald Grid Rings on Floor */}
      {[8, 16, 24].map((radius, idx) => (
        <mesh key={idx} position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius - 0.08, radius, 48]} />
          <meshBasicMaterial color="#10B981" transparent opacity={0.35} />
        </mesh>
      ))}

      {/* Architectural Server Towers around Perimeter */}
      {[-18, -12, 12, 18].map((xPos, idx) => (
        <group key={idx} position={[xPos, 8, -14]}>
          <mesh>
            <boxGeometry args={[3.5, 16, 3.5]} />
            <meshStandardMaterial
              color="#091811"
              roughness={0.3}
              metalness={0.8}
            />
          </mesh>
          {/* Vertical Data Strip Lights */}
          <mesh position={[0, 0, 1.8]}>
            <planeGeometry args={[0.2, 15]} />
            <meshBasicMaterial color="#10B981" />
          </mesh>
        </group>
      ))}

      {/* Pulsing Central Energy Conduit Highway */}
      <mesh position={[0, 0.06, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.5, 28]} />
        <meshBasicMaterial color="#059669" transparent opacity={0.6} />
      </mesh>

      {/* Exit Gateway Light Column */}
      <group position={[0, 0, 14]}>
        <mesh position={[0, 6, 0]}>
          <cylinderGeometry args={[1.8, 1.8, 12, 16, 1, true]} />
          <meshBasicMaterial
            color="#10B981"
            transparent
            opacity={0.15}
            side={THREE.DoubleSide}
          />
        </mesh>
        <pointLight color="#10B981" intensity={15} distance={15} />
      </group>

      {/* Interactive Spatially Placed Artifacts */}
      {artifacts.map((art) => (
        <WorldTerminal
          key={art.id}
          artifact={art}
          isActive={activeArtifact?.id === art.id}
          onActivate={onActivateArtifact}
          onClose={onCloseArtifact}
        />
      ))}
    </group>
  );
}
