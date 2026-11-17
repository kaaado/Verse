'use client';

// ============================================================================
// THE YACINEVERSE — World 2: AI & Machine Intelligence
// Interior environment: Geodesic observatory, neural synapse clusters, tensor grids
// ============================================================================

import React, { useMemo } from 'react';
import * as THREE from 'three';
import { WorldTerminal } from '../world-terminal';
import type { InteractiveArtifact } from '../universe-types';
import type { Project, Skill } from '@/types/database';

interface AIIntelligenceWorldProps {
  projects: Project[];
  skills: Skill[];
  activeArtifact: InteractiveArtifact | null;
  onActivateArtifact: (artifact: InteractiveArtifact) => void;
  onCloseArtifact: () => void;
}

export function AIIntelligenceWorld({
  projects,
  skills,
  activeArtifact,
  onActivateArtifact,
  onCloseArtifact,
}: AIIntelligenceWorldProps) {
  const hyperionProject = projects.find((p) => p.slug === 'project-hyperion') || projects[0];
  const aiSkill = skills.find((s) => s.category.toLowerCase().includes('ai')) || skills[0];

  const artifacts: InteractiveArtifact[] = useMemo(() => {
    const list: InteractiveArtifact[] = [];

    if (hyperionProject) {
      list.push({
        id: 'hyperion-core',
        type: 'project',
        title: hyperionProject.title,
        subtitle: hyperionProject.tagline,
        position: [6, 1.8, 0],
        color: '#06B6D4',
        data: hyperionProject,
      });
    }

    if (aiSkill) {
      list.push({
        id: 'ai-matrix-pillar',
        type: 'skill',
        title: aiSkill.name,
        position: [-6, 1.8, -2],
        color: '#06B6D4',
        data: aiSkill,
      });
    }

    // Space Orbit Return Beacon
    list.push({
      id: 'exit-portal',
      type: 'portal',
      title: 'Space Orbit Gateway',
      position: [0, 1.8, 14],
      color: '#06B6D4',
    });

    return list;
  }, [hyperionProject, aiSkill]);

  return (
    <group>
      {/* Environmental Fog & Atmospheric Cyan Lighting */}
      <fog attach="fog" args={['#041018', 8, 48]} />
      <ambientLight intensity={0.4} color="#06B6D4" />
      <directionalLight position={[-10, 20, 10]} intensity={1.2} color="#E0F2FE" />

      {/* Floating Geodesic Floor Platform */}
      <mesh position={[0, -0.2, 0]} receiveShadow>
        <cylinderGeometry args={[26, 28, 0.4, 32]} />
        <meshStandardMaterial
          color="#06121E"
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Outer Geodesic Neural Dome Shell (Wireframe) */}
      <mesh position={[0, 4, 0]}>
        <sphereGeometry args={[28, 24, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color="#06B6D4"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Glowing Neural Synapse Connections on Floor */}
      {[-12, -4, 4, 12].map((xOffset, idx) => (
        <mesh key={idx} position={[xOffset, 0.05, -idx * 2]} rotation={[Math.PI / 2, 0, idx]}>
          <ringGeometry args={[2, 2.1, 32]} />
          <meshBasicMaterial color="#06B6D4" transparent opacity={0.4} />
        </mesh>
      ))}

      {/* Levitating Machine Intelligence Core in Background */}
      <group position={[0, 12, -18]}>
        <mesh>
          <icosahedronGeometry args={[4, 1]} />
          <meshStandardMaterial
            color="#06B6D4"
            emissive="#0891B2"
            emissiveIntensity={1.8}
            wireframe
          />
        </mesh>
        <pointLight color="#06B6D4" intensity={25} distance={30} />
      </group>

      {/* Exit Gateway Light Column */}
      <group position={[0, 0, 14]}>
        <mesh position={[0, 6, 0]}>
          <cylinderGeometry args={[1.8, 1.8, 12, 16, 1, true]} />
          <meshBasicMaterial
            color="#06B6D4"
            transparent
            opacity={0.15}
            side={THREE.DoubleSide}
          />
        </mesh>
        <pointLight color="#06B6D4" intensity={15} distance={15} />
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
