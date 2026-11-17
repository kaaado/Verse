'use client';

// ============================================================================
// THE YACINEVERSE — World 4: Creations & Utilities
// Enterprise Crystalline Archipelago, Levitating Refractive Prisms, Creative Arenas
// ============================================================================

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { WorldTerminal } from '../world-terminal';
import type { InteractiveArtifact } from '../universe-types';
import { getWorldArtifacts } from '../universe-artifacts';
import { DESIGN_TOKENS } from '@/lib/design-tokens';

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
  const gatewayRingRef = useRef<THREE.Group>(null!);

  const tokens = DESIGN_TOKENS.worlds.creations;

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
    if (gatewayRingRef.current) {
      gatewayRingRef.current.rotation.y = t * 0.8;
      gatewayRingRef.current.rotation.x = Math.sin(t * 0.4) * 0.15;
    }
  });

  return (
    <group>
      {/* Environmental Fog & Atmospheric Purple Lighting */}
      <fog attach="fog" args={[tokens.fog, 6, 52]} />
      <ambientLight intensity={tokens.ambientLightIntensity} color={tokens.primary} />
      <directionalLight position={[0, 24, 10]} intensity={tokens.directionalLightIntensity} color="#F5F3FF" />

      {/* Floating Crystalline Platform Floor */}
      <mesh position={[0, -0.25, 0]} receiveShadow>
        <cylinderGeometry args={[28, 30, 0.5, 48]} />
        <meshStandardMaterial
          color="#0F061C"
          roughness={tokens.surfaceRoughness}
          metalness={tokens.surfaceMetalness}
        />
      </mesh>

      {/* Concentric Telemetry Rings on Floor */}
      {[7, 14, 21, 27].map((radius, idx) => (
        <mesh key={idx} position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius - 0.06, radius, 64]} />
          <meshBasicMaterial color={tokens.primary} transparent opacity={0.3} />
        </mesh>
      ))}

      {/* Elevated West Pedestal: Cosmic Sandbox Engine */}
      <group position={[-6, 0.2, -1]}>
        <mesh receiveShadow>
          <cylinderGeometry args={[3.6, 4.0, 0.4, 24]} />
          <meshStandardMaterial color="#210F38" roughness={0.2} metalness={0.88} />
        </mesh>
        <mesh position={[0, 0.21, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3.4, 3.55, 32]} />
          <meshBasicMaterial color={tokens.accent} transparent opacity={0.7} />
        </mesh>
      </group>

      {/* Elevated East Pedestal: Devtools Ergonomics Suite */}
      <group position={[6, 0.2, -1]}>
        <mesh receiveShadow>
          <cylinderGeometry args={[3.6, 4.0, 0.4, 24]} />
          <meshStandardMaterial color="#210F38" roughness={0.2} metalness={0.88} />
        </mesh>
        <mesh position={[0, 0.21, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3.4, 3.55, 32]} />
          <meshBasicMaterial color={tokens.accent} transparent opacity={0.7} />
        </mesh>
      </group>

      {/* Floating Geometric Crystals in Background */}
      <group ref={crystalsRef}>
        {[-18, -10, 0, 10, 18].map((x, idx) => (
          <mesh key={idx} position={[x, 8, -16]}>
            <octahedronGeometry args={[2.2 + (idx % 2) * 0.6, 0]} />
            <meshStandardMaterial
              color={tokens.primary}
              emissive={tokens.emissive}
              emissiveIntensity={1.4}
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>
        ))}
      </group>

      {/* Space Orbit Gateway Beacon with Gyro Rings */}
      <group position={[0, 0, 14]}>
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[2.8, 3.2, 0.2, 32]} />
          <meshStandardMaterial color="#1E0D33" roughness={0.2} metalness={0.9} />
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
              <meshStandardMaterial color="#160829" metalness={0.9} roughness={0.2} />
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
