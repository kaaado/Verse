'use client';

// ============================================================================
// THE YACINEVERSE — World 5: Origins & Evolution
// Astrolabe observatory, rose aurora sky, memory timeline stelae, Eternal Spire
// ============================================================================

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { WorldTerminal } from '../world-terminal';
import type { InteractiveArtifact } from '../universe-types';
import type { Story, Experience } from '@/types/database';
import { getWorldArtifacts } from '../universe-artifacts';

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
  const armillaryRef = useRef<THREE.Group>(null!);

  const artifacts = useMemo(() => {
    return getWorldArtifacts('origins', {
      projects: [],
      skills: [],
      experiences,
      credentials: [],
      stories,
    });
  }, [stories, experiences]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (armillaryRef.current) {
      armillaryRef.current.rotation.x = t * 0.3;
      armillaryRef.current.rotation.y = t * 0.5;
    }
  });

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
      <group position={[0, 0, -10]}>
        <mesh position={[0, 12, 0]}>
          <cylinderGeometry args={[0.2, 1.4, 24, 8]} />
          <meshStandardMaterial
            color="#EC4899"
            emissive="#DB2777"
            emissiveIntensity={2.0}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        <pointLight position={[0, 20, 0]} color="#EC4899" intensity={30} distance={40} />
      </group>

      {/* Rotating Armillary Rings atop Spire */}
      <group ref={armillaryRef} position={[0, 22, -10]}>
        <mesh>
          <torusGeometry args={[3.2, 0.08, 16, 48]} />
          <meshBasicMaterial color="#F472B6" />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[3.6, 0.08, 16, 48]} />
          <meshBasicMaterial color="#EC4899" />
        </mesh>
      </group>

      {/* Space Orbit Gateway Light Column */}
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
