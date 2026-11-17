'use client';

// ============================================================================
// THE YACINEVERSE — World 4: Creations & Utilities
// Interior environment: Crystalline archipelago, geometric prisms, creative engines
// ============================================================================

import React, { useMemo } from 'react';
import * as THREE from 'three';
import { WorldTerminal } from '../world-terminal';
import type { InteractiveArtifact } from '../universe-types';

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
  const artifacts: InteractiveArtifact[] = useMemo(() => {
    return [
      {
        id: 'sandbox-engine',
        type: 'project',
        title: 'Cosmic Sandbox Engine',
        subtitle: 'Interactive 3D WebGL Visualization Suite',
        position: [-6, 1.8, -1],
        color: '#8B5CF6',
      },
      {
        id: 'devtools-artifact',
        type: 'project',
        title: 'Developer Ergonomics Suite',
        subtitle: 'Zero-Trust API Routing & Cache Utilities',
        position: [6, 1.8, -1],
        color: '#8B5CF6',
      },
      // Space Orbit Return Beacon
      {
        id: 'exit-portal',
        type: 'portal',
        title: 'Space Orbit Gateway',
        position: [0, 1.8, 14],
        color: '#8B5CF6',
      },
    ];
  }, []);

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

      {/* Floating Geometric Crystals in Background */}
      {[-16, -8, 0, 8, 16].map((x, idx) => (
        <mesh
          key={idx}
          position={[x, 6 + (idx % 3) * 2, -15]}
          rotation={[idx * 0.4, idx * 0.2, 0]}
        >
          <octahedronGeometry args={[2.0 + (idx % 2), 0]} />
          <meshStandardMaterial
            color="#8B5CF6"
            emissive="#7C3AED"
            emissiveIntensity={1.2}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
      ))}

      {/* Exit Gateway Light Column */}
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
