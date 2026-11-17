'use client';

// ============================================================================
// THE YACINEVERSE — World 5: Origins & Evolution
// Enterprise Astrolabe Observatory, Celestial Memory Stelae, Eternal Spire
// ============================================================================

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { WorldTerminal } from '../world-terminal';
import type { InteractiveArtifact } from '../universe-types';
import type { Story, Experience } from '@/types/database';
import { getWorldArtifacts } from '../universe-artifacts';
import { DESIGN_TOKENS } from '@/lib/design-tokens';

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
  const gatewayRingRef = useRef<THREE.Group>(null!);

  const tokens = DESIGN_TOKENS.worlds.origins;

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
    if (gatewayRingRef.current) {
      gatewayRingRef.current.rotation.y = t * 0.8;
      gatewayRingRef.current.rotation.x = Math.sin(t * 0.4) * 0.15;
    }
  });

  return (
    <group>
      {/* Environmental Fog & Atmospheric Rose/Pink Lighting */}
      <fog attach="fog" args={[tokens.fog, 6, 52]} />
      <ambientLight intensity={tokens.ambientLightIntensity} color={tokens.primary} />
      <directionalLight position={[0, 26, 8]} intensity={tokens.directionalLightIntensity} color="#FDF2F8" />

      {/* Astrolabe Platform Floor */}
      <mesh position={[0, -0.25, 0]} receiveShadow>
        <cylinderGeometry args={[28, 30, 0.5, 48]} />
        <meshStandardMaterial
          color="#160510"
          roughness={tokens.surfaceRoughness}
          metalness={tokens.surfaceMetalness}
        />
      </mesh>

      {/* Concentric Astrolabe Brass/Pink Rings on Floor */}
      {[6, 12, 18, 24, 27].map((radius, idx) => (
        <mesh key={idx} position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius - 0.06, radius, 64]} />
          <meshBasicMaterial color={tokens.primary} transparent opacity={0.3} />
        </mesh>
      ))}

      {/* Elevated West Pedestal: Chronicle Archive Story Stela */}
      <group position={[-6, 0.2, -1]}>
        <mesh receiveShadow>
          <cylinderGeometry args={[3.6, 4.0, 0.4, 24]} />
          <meshStandardMaterial color="#2B0A20" roughness={0.2} metalness={0.88} />
        </mesh>
        <mesh position={[0, 0.21, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3.4, 3.55, 32]} />
          <meshBasicMaterial color={tokens.accent} transparent opacity={0.7} />
        </mesh>
      </group>

      {/* Elevated East Pedestal: Career Horizon Experience Stela */}
      <group position={[6, 0.2, -1]}>
        <mesh receiveShadow>
          <cylinderGeometry args={[3.6, 4.0, 0.4, 24]} />
          <meshStandardMaterial color="#2B0A20" roughness={0.2} metalness={0.88} />
        </mesh>
        <mesh position={[0, 0.21, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3.4, 3.55, 32]} />
          <meshBasicMaterial color={tokens.accent} transparent opacity={0.7} />
        </mesh>
      </group>

      {/* Central Eternal Beacon Spire */}
      <group position={[0, 0, -10]}>
        <mesh position={[0, 12, 0]}>
          <cylinderGeometry args={[0.2, 1.4, 24, 8]} />
          <meshStandardMaterial
            color={tokens.primary}
            emissive={tokens.emissive}
            emissiveIntensity={2.0}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        <pointLight position={[0, 20, 0]} color={tokens.primary} intensity={30} distance={40} />
      </group>

      {/* Rotating Armillary Rings atop Spire */}
      <group ref={armillaryRef} position={[0, 22, -10]}>
        <mesh>
          <torusGeometry args={[3.2, 0.08, 16, 48]} />
          <meshBasicMaterial color={tokens.accent} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[3.6, 0.08, 16, 48]} />
          <meshBasicMaterial color={tokens.primary} />
        </mesh>
      </group>

      {/* Space Orbit Gateway Beacon with Gyro Rings */}
      <group position={[0, 0, 14]}>
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[2.8, 3.2, 0.2, 32]} />
          <meshStandardMaterial color="#26091C" roughness={0.2} metalness={0.9} />
        </mesh>

        <mesh position={[0, 7, 0]}>
          <cylinderGeometry args={[2.2, 2.2, 14, 24, 1, true]} />
          <meshBasicMaterial
            color={tokens.primary}
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>

        <group ref={gatewayRingRef} position={[0, 2.5, 0]}>
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[2.6, 0.06, 16, 48]} />
            <meshBasicMaterial color={tokens.accent} />
          </mesh>
          <mesh rotation={[-Math.PI / 4, 0, 0]}>
            <torusGeometry args={[2.9, 0.05, 16, 48]} />
            <meshBasicMaterial color={tokens.secondary} />
          </mesh>
        </group>

        <pointLight color={tokens.primary} intensity={25} distance={20} />
      </group>

      {/* Safety Perimeter Boundary Pylons */}
      {[0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4, Math.PI, (5 * Math.PI) / 4, (3 * Math.PI) / 2, (7 * Math.PI) / 4].map((angle, idx) => {
        const px = Math.cos(angle) * 27.5;
        const pz = Math.sin(angle) * 27.5;
        return (
          <group key={idx} position={[px, 1.2, pz]}>
            <mesh>
              <cylinderGeometry args={[0.2, 0.25, 2.4, 12]} />
              <meshStandardMaterial color="#1C0615" metalness={0.9} roughness={0.2} />
            </mesh>
            <mesh position={[0, 1.3, 0]}>
              <sphereGeometry args={[0.15, 12, 12]} />
              <meshBasicMaterial color={tokens.primary} />
            </mesh>
          </group>
        );
      })}

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
