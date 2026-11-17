'use client';

// ============================================================================
// THE YACINEVERSE — World 3: Engineering & Field Systems
// Interior environment: Orbital research platform, steel catwalks, solar telemetry
// ============================================================================

import React, { useMemo } from 'react';
import * as THREE from 'three';
import { WorldTerminal } from '../world-terminal';
import type { InteractiveArtifact } from '../universe-types';
import type { Skill } from '@/types/database';

interface EngineeringWorldProps {
  skills: Skill[];
  activeArtifact: InteractiveArtifact | null;
  onActivateArtifact: (artifact: InteractiveArtifact) => void;
  onCloseArtifact: () => void;
}

export function EngineeringWorld({
  skills,
  activeArtifact,
  onActivateArtifact,
  onCloseArtifact,
}: EngineeringWorldProps) {
  const infraSkill = skills.find((s) => s.category.toLowerCase().includes('infra') || s.category.toLowerCase().includes('devops')) || skills[0];

  const artifacts: InteractiveArtifact[] = useMemo(() => {
    const list: InteractiveArtifact[] = [];

    if (infraSkill) {
      list.push({
        id: 'telemetry-station',
        type: 'skill',
        title: infraSkill.name,
        position: [-5, 1.8, -2],
        color: '#F59E0B',
        data: infraSkill,
      });
    }

    list.push({
      id: 'field-sync-artifact',
      type: 'project',
      title: 'Resilient Edge Mesh Network',
      subtitle: 'Fault-Tolerant Offline Sync Protocol',
      position: [5, 1.8, -2],
      color: '#F59E0B',
    });

    // Space Orbit Return Beacon
    list.push({
      id: 'exit-portal',
      type: 'portal',
      title: 'Space Orbit Gateway',
      position: [0, 1.8, 14],
      color: '#F59E0B',
    });

    return list;
  }, [infraSkill]);

  return (
    <group>
      {/* Environmental Fog & Industrial Amber Lighting */}
      <fog attach="fog" args={['#170e04', 8, 48]} />
      <ambientLight intensity={0.4} color="#F59E0B" />
      <directionalLight position={[15, 25, 5]} intensity={1.2} color="#FEF3C7" />

      {/* Industrial Metallic Platform Floor */}
      <mesh position={[0, -0.2, 0]} receiveShadow>
        <cylinderGeometry args={[26, 28, 0.4, 32]} />
        <meshStandardMaterial
          color="#161208"
          roughness={0.4}
          metalness={0.7}
        />
      </mesh>

      {/* Industrial Perimeter Truss Posts */}
      {[-16, -8, 8, 16].map((x, idx) => (
        <group key={idx} position={[x, 5, -12]}>
          <mesh>
            <cylinderGeometry args={[0.3, 0.3, 10, 8]} />
            <meshStandardMaterial color="#2B210C" metalness={0.8} />
          </mesh>
          <mesh position={[0, 4.8, 0]}>
            <sphereGeometry args={[0.6, 16, 16]} />
            <meshBasicMaterial color="#F59E0B" />
          </mesh>
          <pointLight position={[0, 4.8, 0]} color="#F59E0B" intensity={6} distance={10} />
        </group>
      ))}

      {/* Edge Solar Panels in Background */}
      {[-14, 14].map((x, idx) => (
        <mesh key={idx} position={[x, 10, -20]} rotation={[0.4, idx === 0 ? 0.3 : -0.3, 0]}>
          <boxGeometry args={[12, 6, 0.2]} />
          <meshStandardMaterial color="#0E1A2B" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}

      {/* Exit Gateway Light Column */}
      <group position={[0, 0, 14]}>
        <mesh position={[0, 6, 0]}>
          <cylinderGeometry args={[1.8, 1.8, 12, 16, 1, true]} />
          <meshBasicMaterial
            color="#F59E0B"
            transparent
            opacity={0.15}
            side={THREE.DoubleSide}
          />
        </mesh>
        <pointLight color="#F59E0B" intensity={15} distance={15} />
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
