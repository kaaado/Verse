'use client';

// ============================================================================
// THE YACINEVERSE — World 1: Core Systems & Architecture
// Cybernetic server monoliths, floating data bridges, emerald energy highways
// ============================================================================

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { WorldTerminal } from '../world-terminal';
import type { InteractiveArtifact } from '../universe-types';
import type { Project, Skill } from '@/types/database';
import { getWorldArtifacts } from '../universe-artifacts';

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
  const conduitRef = useRef<THREE.Mesh>(null!);

  const artifacts = useMemo(() => {
    return getWorldArtifacts('core_systems', {
      projects,
      skills,
      experiences: [],
      credentials: [],
      stories: [],
    });
  }, [projects, skills]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (conduitRef.current) {
      const mat = conduitRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.5 + Math.sin(t * 3) * 0.25;
    }
  });

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

      {/* Suspended Overhead Data Bridges */}
      <group position={[0, 12, -6]}>
        <mesh>
          <boxGeometry args={[32, 0.4, 2.5]} />
          <meshStandardMaterial color="#0A1E14" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.25, 0]}>
          <planeGeometry args={[30, 0.3]} />
          <meshBasicMaterial color="#10B981" />
        </mesh>
      </group>

      {/* Pulsing Central Energy Conduit Highway */}
      <mesh ref={conduitRef} position={[0, 0.06, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.6, 28]} />
        <meshBasicMaterial color="#059669" transparent opacity={0.6} />
      </mesh>

      {/* Space Orbit Gateway Light Column */}
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
