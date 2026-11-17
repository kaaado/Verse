'use client';

// ============================================================================
// THE YACINEVERSE — World 2: AI & Machine Intelligence
// Geodesic neural biosphere, levitating tensor core, synaptic axons
// ============================================================================

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { WorldTerminal } from '../world-terminal';
import type { InteractiveArtifact } from '../universe-types';
import type { Project, Skill } from '@/types/database';
import { getWorldArtifacts } from '../universe-artifacts';

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
  const coreRef = useRef<THREE.Mesh>(null!);
  const tensorRingRef = useRef<THREE.Mesh>(null!);

  const artifacts = useMemo(() => {
    return getWorldArtifacts('ai_intelligence', {
      projects,
      skills,
      experiences: [],
      credentials: [],
      stories: [],
    });
  }, [projects, skills]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.x = t * 0.3;
      coreRef.current.rotation.y = t * 0.5;
      coreRef.current.position.y = 12 + Math.sin(t * 1.5) * 0.8;
    }
    if (tensorRingRef.current) {
      tensorRingRef.current.rotation.z = -t * 0.6;
      tensorRingRef.current.position.y = 12 + Math.sin(t * 1.5) * 0.8;
    }
  });

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

      {/* Synaptic Axon Columns around Platform */}
      {[-16, -8, 8, 16].map((x, idx) => (
        <group key={idx} position={[x, 5, -12]}>
          <mesh>
            <cylinderGeometry args={[0.3, 0.4, 10, 12]} />
            <meshStandardMaterial color="#082F49" roughness={0.3} metalness={0.8} />
          </mesh>
          <mesh position={[0, 5, 0]}>
            <sphereGeometry args={[0.7, 16, 16]} />
            <meshStandardMaterial
              color="#06B6D4"
              emissive="#0891B2"
              emissiveIntensity={1.5}
            />
          </mesh>
        </group>
      ))}

      {/* Levitating Machine Intelligence Core & Tensor Ring */}
      <group position={[0, 0, -18]}>
        <mesh ref={coreRef} position={[0, 12, 0]}>
          <icosahedronGeometry args={[4, 1]} />
          <meshStandardMaterial
            color="#06B6D4"
            emissive="#0891B2"
            emissiveIntensity={1.8}
            wireframe
          />
        </mesh>

        <mesh ref={tensorRingRef} position={[0, 12, 0]}>
          <torusGeometry args={[6.5, 0.12, 16, 48]} />
          <meshBasicMaterial color="#06B6D4" transparent opacity={0.6} />
        </mesh>

        <pointLight position={[0, 12, 0]} color="#06B6D4" intensity={25} distance={30} />
      </group>

      {/* Space Orbit Gateway Light Column */}
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
