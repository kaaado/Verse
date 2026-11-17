'use client';

// ============================================================================
// THE YACINEVERSE — World 4: Creations & Utilities
// Crystalline archipelago, levitating refractive prisms, creative sandboxes
// ============================================================================

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { WorldTerminal } from '../world-terminal';
import type { InteractiveArtifact } from '../universe-types';
import { getWorldArtifacts } from '../universe-artifacts';

interface CreationsWorldProps {
  activeArtifact: InteractiveArtifact | null;
  onActivateArtifact: (artifact: InteractiveArtifact) => void;
  onCloseArtifact: () => void;
}

export function CreationsWorld({
  activeArtifact,
  onActivateArtifact,
  onCloseArtifact,
}: CreationsWorldProps) {
  const crystalsRef = useRef<THREE.Group>(null!);

  const artifacts = useMemo(() => {
    return getWorldArtifacts('creations', {
      projects: [],
      skills: [],
      experiences: [],
      credentials: [],
      stories: [],
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (crystalsRef.current) {
      crystalsRef.current.children.forEach((child, i) => {
        child.rotation.x = t * 0.4 + i;
        child.rotation.y = t * 0.6 + i;
        child.position.y = 8 + Math.sin(t * 1.8 + i) * 1.2;
      });
    }
  });

  return (
    <group>
      {/* Environmental Fog & Atmospheric Purple Lighting */}
      <fog attach="fog" args={['#0e0717', 8, 48]} />
      <ambientLight intensity={0.4} color="#8B5CF6" />
      <directionalLight position={[0, 25, 10]} intensity={1.2} color="#F5F3FF" />

      {/* Floating Crystalline Platform Floor */}
      <mesh position={[0, -0.2, 0]} receiveShadow>
        <cylinderGeometry args={[26, 28, 0.4, 32]} />
        <meshStandardMaterial
          color="#120A1E"
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Violet Rune Rings on Platform */}
      {[7, 14, 21].map((radius, idx) => (
        <mesh key={idx} position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius - 0.08, radius, 48]} />
          <meshBasicMaterial color="#8B5CF6" transparent opacity={0.4} />
        </mesh>
      ))}

      {/* Floating Geometric Crystals in Background */}
      <group ref={crystalsRef}>
        {[-16, -8, 0, 8, 16].map((x, idx) => (
          <mesh
            key={idx}
            position={[x, 8, -15]}
          >
            <octahedronGeometry args={[2.0 + (idx % 2) * 0.6, 0]} />
            <meshStandardMaterial
              color="#8B5CF6"
              emissive="#7C3AED"
              emissiveIntensity={1.2}
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>
        ))}
      </group>

      {/* Floating Prismatic Sandbox Pedestals */}
      {[-12, 12].map((x, idx) => (
        <group key={idx} position={[x, 1, 0]}>
          <mesh>
            <cylinderGeometry args={[1.5, 1.8, 2, 8]} />
            <meshStandardMaterial color="#1E1135" roughness={0.3} metalness={0.7} />
          </mesh>
          <mesh position={[0, 1.1, 0]}>
            <dodecahedronGeometry args={[0.8, 0]} />
            <meshStandardMaterial color="#A78BFA" emissive="#8B5CF6" emissiveIntensity={1.4} />
          </mesh>
          <pointLight position={[0, 1.5, 0]} color="#8B5CF6" intensity={10} distance={8} />
        </group>
      ))}

      {/* Space Orbit Gateway Light Column */}
      <group position={[0, 0, 14]}>
        <mesh position={[0, 6, 0]}>
          <cylinderGeometry args={[1.8, 1.8, 12, 16, 1, true]} />
          <meshBasicMaterial
            color="#8B5CF6"
            transparent
            opacity={0.15}
            side={THREE.DoubleSide}
          />
        </mesh>
        <pointLight color="#8B5CF6" intensity={15} distance={15} />
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
