'use client';

// ============================================================================
// THE YACINEVERSE — World 3: Engineering & Field Systems
// Industrial Orbital Staging Ground, Steel Truss Arrays, Telemetry Radar & Edge Nodes
// ============================================================================

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { WorldTerminal } from '../world-terminal';
import type { InteractiveArtifact } from '../universe-types';
import type { Skill } from '@/types/database';
import { getWorldArtifacts } from '../universe-artifacts';
import { DESIGN_TOKENS } from '@/lib/design-tokens';

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
  const gatewayRingRef = useRef<THREE.Group>(null!);

  const tokens = DESIGN_TOKENS.worlds.engineering;

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
    if (gatewayRingRef.current) {
      gatewayRingRef.current.rotation.y = t * 0.8;
      gatewayRingRef.current.rotation.z = Math.sin(t * 0.4) * 0.15;
    }
  });

  return (
    <group>
      {/* Environmental Fog & Industrial Amber Lighting */}
      <fog attach="fog" args={[tokens.fog, 6, 52]} />
      <ambientLight intensity={tokens.ambientLightIntensity} color={tokens.primary} />
      <directionalLight position={[15, 24, 8]} intensity={tokens.directionalLightIntensity} color="#FEF3C7" />

      {/* Industrial Metallic Platform Floor */}
      <mesh position={[0, -0.25, 0]} receiveShadow>
        <cylinderGeometry args={[28, 30, 0.5, 48]} />
        <meshStandardMaterial
          color="#140D04"
          roughness={tokens.surfaceRoughness}
          metalness={tokens.surfaceMetalness}
        />
      </mesh>

      {/* Concentric Telemetry Hazard Rings on Floor */}
      {[8, 15, 22, 27].map((radius, idx) => (
        <mesh key={idx} position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius - 0.06, radius, 64]} />
          <meshBasicMaterial color={tokens.primary} transparent opacity={0.3} />
        </mesh>
      ))}

      {/* Elevated West Pedestal: Telemetry Station Skill Pillar */}
      <group position={[-5, 0.2, -2]}>
        <mesh receiveShadow>
          <cylinderGeometry args={[3.6, 4.0, 0.4, 24]} />
          <meshStandardMaterial color="#261A08" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.21, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3.4, 3.55, 32]} />
          <meshBasicMaterial color={tokens.accent} transparent opacity={0.7} />
        </mesh>
      </group>

      {/* Elevated East Pedestal: Field Sync Protocol Artifact */}
      <group position={[5, 0.2, -2]}>
        <mesh receiveShadow>
          <cylinderGeometry args={[3.6, 4.0, 0.4, 24]} />
          <meshStandardMaterial color="#261A08" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.21, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3.4, 3.55, 32]} />
          <meshBasicMaterial color={tokens.accent} transparent opacity={0.7} />
        </mesh>
      </group>

      {/* Rotating Telemetry Radar Dish Array */}
      <group ref={radarRef} position={[0, 14, -16]}>
        <mesh rotation={[0.35, 0, 0]}>
          <cylinderGeometry args={[5.0, 0.2, 1.4, 32, 1, true]} />
          <meshStandardMaterial color="#374151" metalness={0.9} roughness={0.2} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0, 1.2]}>
          <cylinderGeometry args={[0.12, 0.12, 3.2, 8]} />
          <meshBasicMaterial color={tokens.accent} />
        </mesh>
        <pointLight color={tokens.primary} intensity={18} distance={25} />
      </group>

      {/* Industrial Catwalk & Solar Truss Modules in Background */}
      {[-16, 16].map((x, idx) => (
        <group key={idx} position={[x, 8, -20]} rotation={[0.3, idx === 0 ? 0.25 : -0.25, 0]}>
          <mesh>
            <boxGeometry args={[14, 6, 0.25]} />
            <meshStandardMaterial color="#0A1420" metalness={0.92} roughness={0.12} />
          </mesh>
          <mesh position={[0, 0, 0.15]}>
            <planeGeometry args={[13.6, 5.6]} />
            <meshBasicMaterial color="#1E293B" wireframe />
          </mesh>
        </group>
      ))}

      {/* Space Orbit Gateway Beacon with Gyro Rings */}
      <group position={[0, 0, 14]}>
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[2.8, 3.2, 0.2, 32]} />
          <meshStandardMaterial color="#241706" roughness={0.2} metalness={0.9} />
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
              <meshStandardMaterial color="#1C1205" metalness={0.9} roughness={0.2} />
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
