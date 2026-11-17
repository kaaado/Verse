'use client';

// ============================================================================
// THE YACINEVERSE — World 5: Origins & Evolution
// Interior environment: Cosmic observatory, timeline astrolabe, memory stelae
// ============================================================================

import React, { useMemo } from 'react';
import * as THREE from 'three';
import { WorldTerminal } from '../world-terminal';
import type { InteractiveArtifact } from '../universe-types';
import type { Story, Experience } from '@/types/database';

interface OriginsWorldProps {
  stories: Story[];
  experiences: Experience[];
  activeArtifact: InteractiveArtifact | null;
  onActivateArtifact: (artifact: InteractiveArtifact) => void;
  onCloseArtifact: () => void;
}

export function OriginsWorld({
  stories,
  experiences,
  activeArtifact,
  onActivateArtifact,
  onCloseArtifact,
}: OriginsWorldProps) {
  const story = stories[0];
  const experience = experiences[0];

  const artifacts: InteractiveArtifact[] = useMemo(() => {
    const list: InteractiveArtifact[] = [];

    if (story) {
      list.push({
        id: 'chronicle-archive',
        type: 'story',
        title: story.title,
        subtitle: `Technical Chronicle • ${story.read_time_minutes} min read`,
        position: [-6, 1.8, -1],
        color: '#EC4899',
        data: story,
      });
    }

    if (experience) {
      list.push({
        id: 'career-stela',
        type: 'experience',
        title: `${experience.role} @ ${experience.organization}`,
        subtitle: `Career Horizon • ${experience.start_date} – Present`,
        position: [6, 1.8, -1],
        color: '#EC4899',
        data: experience,
      });
    }

    // Space Orbit Return Beacon
    list.push({
      id: 'exit-portal',
      type: 'portal',
      title: 'Space Orbit Gateway',
      position: [0, 1.8, 14],
      color: '#EC4899',
    });

    return list;
  }, [story, experience]);

  return (
    <group>
      {/* Environmental Fog & Atmospheric Rose/Pink Lighting */}
      <fog attach="fog" args={['#17040e', 8, 48]} />
      <ambientLight intensity={0.4} color="#EC4899" />
      <directionalLight position={[0, 30, 0]} intensity={1.2} color="#FDF2F8" />

      {/* Astrolabe Platform Floor */}
      <mesh position={[0, -0.2, 0]} receiveShadow>
        <cylinderGeometry args={[26, 28, 0.4, 32]} />
        <meshStandardMaterial
          color="#180712"
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Concentric Astrolabe Brass/Pink Rings on Floor */}
      {[6, 12, 18, 24].map((radius, idx) => (
        <mesh key={idx} position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius - 0.06, radius, 64]} />
          <meshBasicMaterial color="#EC4899" transparent opacity={0.3} />
        </mesh>
      ))}

      {/* Central Eternal Beacon Spire */}
      <group position={[0, 0, -8]}>
        <mesh position={[0, 10, 0]}>
          <cylinderGeometry args={[0.2, 1.2, 20, 8]} />
          <meshStandardMaterial
            color="#EC4899"
            emissive="#DB2777"
            emissiveIntensity={1.8}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        <pointLight position={[0, 16, 0]} color="#EC4899" intensity={25} distance={35} />
      </group>

      {/* Exit Gateway Light Column */}
      <group position={[0, 0, 14]}>
        <mesh position={[0, 6, 0]}>
          <cylinderGeometry args={[1.8, 1.8, 12, 16, 1, true]} />
          <meshBasicMaterial
            color="#EC4899"
            transparent
            opacity={0.15}
            side={THREE.DoubleSide}
          />
        </mesh>
        <pointLight color="#EC4899" intensity={15} distance={15} />
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
