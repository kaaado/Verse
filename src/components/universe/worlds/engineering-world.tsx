'use client';

// ============================================================================
// THE YACINEVERSE — World 3: Engineering & Field Systems
// Industrial orbital research platform, steel truss catwalks, telemetry array
// ============================================================================

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { WorldTerminal } from '../world-terminal';
import type { InteractiveArtifact } from '../universe-types';
import type { Skill } from '@/types/database';
import { getWorldArtifacts } from '../universe-artifacts';

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
  const radarRef = useRef<THREE.Group>(null!);

  const artifacts = useMemo(() => {
    return getWorldArtifacts('engineering', {
      projects: [],
      skills,
      experiences: [],
      credentials: [],
      stories: [],
    });
  }, [skills]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (radarRef.current) {
      radarRef.current.rotation.y = t * 0.4;
    }
  });

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

      {/* Perimeter Hazard Border Ring */}
      <mesh position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[24.8, 25.5, 48]} />
        <meshBasicMaterial color="#F59E0B" transparent opacity={0.6} />
      </mesh>

      {/* Industrial Perimeter Truss Posts & Flashing Hazard Beacons */}
      {[-16, -8, 8, 16].map((x, idx) => (
        <group key={idx} position={[x, 5, -12]}>
          <mesh>
            <cylinderGeometry args={[0.3, 0.3, 10, 8]} />
            <meshStandardMaterial color="#2B210C" metalness={0.8} />
          </mesh>
          <mesh position={[0, 4.8, 0]}>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshBasicMaterial color="#F59E0B" />
          </mesh>
          <pointLight position={[0, 4.8, 0]} color="#F59E0B" intensity={6} distance={10} />
        </group>
      ))}

      {/* Rotating Telemetry Radar Dish Array */}
      <group ref={radarRef} position={[0, 14, -16]}>
        <mesh rotation={[0.4, 0, 0]}>
          <cylinderGeometry args={[4.5, 0.2, 1.2, 24, 1, true]} />
          <meshStandardMaterial color="#374151" metalness={0.9} roughness={0.2} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0, 1]}>
          <cylinderGeometry args={[0.1, 0.1, 3, 8]} />
          <meshBasicMaterial color="#F59E0B" />
        </mesh>
        <pointLight color="#F59E0B" intensity={12} distance={20} />
      </group>

      {/* Edge Solar Panels in Background */}
      {[-15, 15].map((x, idx) => (
        <mesh key={idx} position={[x, 9, -20]} rotation={[0.4, idx === 0 ? 0.3 : -0.3, 0]}>
          <boxGeometry args={[12, 6, 0.2]} />
          <meshStandardMaterial color="#0E1A2B" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}

      {/* Space Orbit Gateway Light Column */}
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
