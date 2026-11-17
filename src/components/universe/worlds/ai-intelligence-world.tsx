'use client';

// ============================================================================
// THE YACINEVERSE — World 2: AI & Machine Intelligence
// Enterprise Geodesic Neural Observatory, Levitating Tensor Core, Synaptic Lattice
// ============================================================================

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { WorldTerminal } from '../world-terminal';
import type { InteractiveArtifact } from '../universe-types';
import type { Project, Skill } from '@/types/database';
import { getWorldArtifacts } from '../universe-artifacts';
import { DESIGN_TOKENS } from '@/lib/design-tokens';

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
  const gatewayRingRef = useRef<THREE.Group>(null!);

  const tokens = DESIGN_TOKENS.worlds.ai_intelligence;

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
    if (gatewayRingRef.current) {
      gatewayRingRef.current.rotation.y = t * 0.8;
      gatewayRingRef.current.rotation.x = Math.sin(t * 0.4) * 0.15;
    }
  });

  return (
    <group>
      {/* Environmental Fog & Atmospheric Cyan Lighting */}
      <fog attach="fog" args={[tokens.fog, 6, 52]} />
      <ambientLight intensity={tokens.ambientLightIntensity} color={tokens.primary} />
      <directionalLight position={[-10, 24, 10]} intensity={tokens.directionalLightIntensity} color="#E0F2FE" />

      {/* Main Geodesic Floor Platform Foundation */}
      <mesh position={[0, -0.25, 0]} receiveShadow>
        <cylinderGeometry args={[28, 30, 0.5, 48]} />
        <meshStandardMaterial
          color="#040D17"
          roughness={tokens.surfaceRoughness}
          metalness={tokens.surfaceMetalness}
        />
      </mesh>

      {/* Outer Geodesic Neural Dome Shell (Wireframe) */}
      <mesh position={[0, 4, 0]}>
        <sphereGeometry args={[29, 24, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color={tokens.primary}
          wireframe
          transparent
          opacity={0.14}
        />
      </mesh>

      {/* Concentric Synaptic Reticle Rings on Floor */}
      {[7, 14, 21, 27].map((radius, idx) => (
        <mesh key={idx} position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius - 0.06, radius, 64]} />
          <meshBasicMaterial color={tokens.primary} transparent opacity={0.28} />
        </mesh>
      ))}

      {/* Elevated West Pedestal: AI Matrix Skill Pillar */}
      <group position={[-6, 0.2, -2]}>
        <mesh receiveShadow>
          <cylinderGeometry args={[3.6, 4.0, 0.4, 24]} />
          <meshStandardMaterial color="#061726" roughness={0.2} metalness={0.88} />
        </mesh>
        <mesh position={[0, 0.21, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3.4, 3.55, 32]} />
          <meshBasicMaterial color={tokens.accent} transparent opacity={0.7} />
        </mesh>
      </group>

      {/* Elevated East Pedestal: Project Hyperion Core */}
      <group position={[6, 0.2, 0]}>
        <mesh receiveShadow>
          <cylinderGeometry args={[3.6, 4.0, 0.4, 24]} />
          <meshStandardMaterial color="#061726" roughness={0.2} metalness={0.88} />
        </mesh>
        <mesh position={[0, 0.21, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3.4, 3.55, 32]} />
          <meshBasicMaterial color={tokens.accent} transparent opacity={0.7} />
        </mesh>
      </group>

      {/* Synaptic Axon Columns around Platform */}
      {[-18, -10, 10, 18].map((x, idx) => (
        <group key={idx} position={[x, 6, -12]}>
          <mesh>
            <cylinderGeometry args={[0.35, 0.45, 12, 16]} />
            <meshStandardMaterial color="#072236" roughness={0.2} metalness={0.9} />
          </mesh>
          <mesh position={[0, 6, 0]}>
            <sphereGeometry args={[0.8, 20, 20]} />
            <meshStandardMaterial
              color={tokens.primary}
              emissive={tokens.emissive}
              emissiveIntensity={tokens.emissiveIntensity}
            />
          </mesh>
        </group>
      ))}

      {/* Levitating Machine Intelligence Core & Tensor Ring */}
      <group position={[0, 0, -18]}>
        <mesh ref={coreRef} position={[0, 12, 0]}>
          <icosahedronGeometry args={[4.2, 1]} />
          <meshStandardMaterial
            color={tokens.primary}
            emissive={tokens.emissive}
            emissiveIntensity={2.0}
            wireframe
          />
        </mesh>

        <mesh ref={tensorRingRef} position={[0, 12, 0]}>
          <torusGeometry args={[6.8, 0.12, 16, 64]} />
          <meshBasicMaterial color={tokens.accent} transparent opacity={0.65} />
        </mesh>

        <pointLight position={[0, 12, 0]} color={tokens.primary} intensity={30} distance={35} />
      </group>

      {/* Space Orbit Gateway Beacon with Gyro Rings */}
      <group position={[0, 0, 14]}>
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[2.8, 3.2, 0.2, 32]} />
          <meshStandardMaterial color="#071828" roughness={0.2} metalness={0.9} />
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
              <meshStandardMaterial color="#051422" metalness={0.9} roughness={0.2} />
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
