'use client';

// ============================================================================
// THE YACINEVERSE — World 1: Core Systems & Architecture (Benchmark World)
// Enterprise Multi-Tiered Infrastructure, Obsidian Server Towers, Glowing Data Canals,
// Suspended Catwalks & Interactive Spatial Terminals
// ============================================================================

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { WorldTerminal } from '../world-terminal';
import type { InteractiveArtifact } from '../universe-types';
import type { Project, Skill } from '@/types/database';
import { getWorldArtifacts } from '../universe-artifacts';
import { DESIGN_TOKENS } from '@/lib/design-tokens';

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
  const gatewayRingRef = useRef<THREE.Group>(null!);
  const serverLedsRef = useRef<THREE.Group>(null!);

  const tokens = DESIGN_TOKENS.worlds.core_systems;

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

    // Data canal pulse
    if (conduitRef.current) {
      const mat = conduitRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.45 + Math.sin(t * 3.2) * 0.2;
    }

    // Gateway confinement ring rotation
    if (gatewayRingRef.current) {
      gatewayRingRef.current.rotation.y = t * 0.8;
      gatewayRingRef.current.rotation.z = Math.sin(t * 0.5) * 0.1;
    }

    // Blinking server LEDs
    if (serverLedsRef.current) {
      serverLedsRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh) {
          const mat = child.material as THREE.MeshBasicMaterial;
          mat.opacity = (Math.sin(t * 6 + i) > 0.2) ? 0.9 : 0.2;
        }
      });
    }
  });

  return (
    <group>
      {/* Volumetric Fog & Atmospheric Lighting */}
      <fog attach="fog" args={[tokens.fog, 6, 52]} />
      <ambientLight intensity={tokens.ambientLightIntensity} color={tokens.primary} />
      <directionalLight
        position={[14, 24, 14]}
        intensity={tokens.directionalLightIntensity}
        color="#F8FAFC"
        castShadow
      />
      <pointLight position={[0, 8, 0]} color={tokens.accent} intensity={12} distance={28} />

      {/* ================================================================== */}
      {/* ZONE 1: PRIMARY MULTI-TIER ARCHITECTURAL PLAZA                    */}
      {/* ================================================================== */}
      {/* Main Obsidian Floor Foundation */}
      <mesh position={[0, -0.25, 0]} receiveShadow>
        <cylinderGeometry args={[28, 30, 0.5, 48]} />
        <meshStandardMaterial
          color="#060C08"
          roughness={tokens.surfaceRoughness}
          metalness={tokens.surfaceMetalness}
        />
      </mesh>

      {/* Recessed Glowing Data Canal (Runs north-south through center) */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[3.2, 0.1, 40]} />
        <meshStandardMaterial color="#020804" roughness={0.1} metalness={0.95} />
      </mesh>

      {/* Flowing Emerald Data Stream in Canal */}
      <mesh ref={conduitRef} position={[0, -0.14, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.8, 40]} />
        <meshBasicMaterial color={tokens.primary} transparent opacity={0.6} />
      </mesh>

      {/* Translucent Glass Cross-Bridge over Canal */}
      <group position={[0, 0.05, 0]}>
        <mesh>
          <boxGeometry args={[4.2, 0.1, 3.0]} />
          <meshStandardMaterial
            color="#0F291E"
            transparent
            opacity={0.8}
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>
        {/* Bridge Edge Lights */}
        <mesh position={[0, 0.06, 1.45]}>
          <boxGeometry args={[4.2, 0.04, 0.06]} />
          <meshBasicMaterial color={tokens.accent} />
        </mesh>
        <mesh position={[0, 0.06, -1.45]}>
          <boxGeometry args={[4.2, 0.04, 0.06]} />
          <meshBasicMaterial color={tokens.accent} />
        </mesh>
      </group>

      {/* Concentric Telemetry Circuit Rings on Ground */}
      {[8, 14, 22, 27].map((radius, idx) => (
        <mesh key={idx} position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius - 0.06, radius, 64]} />
          <meshBasicMaterial color={tokens.primary} transparent opacity={0.28} />
        </mesh>
      ))}

      {/* ================================================================== */}
      {/* ZONE 2 & 3: ELEVATED PEDESTALS FOR ARTIFACTS                      */}
      {/* ================================================================== */}
      {/* West Platform: Project Chronos Monolith Pedestal */}
      <group position={[-6, 0.2, 0]}>
        <mesh receiveShadow>
          <cylinderGeometry args={[3.6, 4.0, 0.4, 24]} />
          <meshStandardMaterial color="#0A1610" roughness={0.25} metalness={0.85} />
        </mesh>
        {/* Outer illuminated boundary ring */}
        <mesh position={[0, 0.21, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3.4, 3.55, 32]} />
          <meshBasicMaterial color={tokens.accent} transparent opacity={0.7} />
        </mesh>
      </group>

      {/* East Platform: Backend Systems Pillar Pedestal */}
      <group position={[6, 0.2, -2]}>
        <mesh receiveShadow>
          <cylinderGeometry args={[3.6, 4.0, 0.4, 24]} />
          <meshStandardMaterial color="#0A1610" roughness={0.25} metalness={0.85} />
        </mesh>
        {/* Outer illuminated boundary ring */}
        <mesh position={[0, 0.21, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3.4, 3.55, 32]} />
          <meshBasicMaterial color={tokens.accent} transparent opacity={0.7} />
        </mesh>
      </group>

      {/* ================================================================== */}
      {/* ZONE 4: MONOLITHIC SERVER TOWERS & SUSPENDED CATWALKS             */}
      {/* ================================================================== */}
      {/* Perimeter Server Towers */}
      {[-20, -14, 14, 20].map((xPos, idx) => {
        const zPos = -12 + (idx % 2) * 4;
        return (
          <group key={idx} position={[xPos, 9, zPos]}>
            {/* Tower Body */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[3.8, 18, 3.8]} />
              <meshStandardMaterial
                color="#07130C"
                roughness={0.2}
                metalness={0.9}
              />
            </mesh>
            {/* Vertical Glowing Heat Vents */}
            <mesh position={[0, 0, 1.95]}>
              <planeGeometry args={[0.3, 16]} />
              <meshBasicMaterial color={tokens.primary} transparent opacity={0.85} />
            </mesh>
            <mesh position={[1.95, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
              <planeGeometry args={[0.3, 16]} />
              <meshBasicMaterial color={tokens.secondary} transparent opacity={0.6} />
            </mesh>
          </group>
        );
      })}

      {/* Animated Server LED Array */}
      <group ref={serverLedsRef} position={[0, 0, 0]}>
        {[-14, 14].map((xPos) =>
          [2, 5, 8, 11, 14].map((yPos, i) => (
            <mesh key={`${xPos}-${i}`} position={[xPos, yPos, -9.9]}>
              <boxGeometry args={[0.15, 0.15, 0.05]} />
              <meshBasicMaterial color={tokens.accent} />
            </mesh>
          ))
        )}
      </group>

      {/* Suspended Overhead Catwalk Bridge */}
      <group position={[0, 12, -10]}>
        <mesh>
          <boxGeometry args={[36, 0.5, 2.4]} />
          <meshStandardMaterial color="#081A11" metalness={0.92} roughness={0.18} />
        </mesh>
        {/* Under-bridge Neon Glow Line */}
        <mesh position={[0, -0.28, 0]}>
          <boxGeometry args={[34, 0.06, 0.2]} />
          <meshBasicMaterial color={tokens.primary} />
        </mesh>
      </group>

      {/* ================================================================== */}
      {/* ZONE 5: Space Orbit Gateway Beacon & Containment                  */}
      {/* ================================================================== */}
      <group position={[0, 0, 14]}>
        {/* Gateway Launch Platform */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[2.8, 3.2, 0.2, 32]} />
          <meshStandardMaterial color="#0A1810" roughness={0.2} metalness={0.9} />
        </mesh>

        {/* Vertical Warp Particle Light Column */}
        <mesh position={[0, 7, 0]}>
          <cylinderGeometry args={[2.2, 2.2, 14, 24, 1, true]} />
          <meshBasicMaterial
            color={tokens.primary}
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Gyroscopic Containment Rings */}
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

        {/* High-Intensity Gateway Teleport Light */}
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
              <meshStandardMaterial color="#0A140F" metalness={0.9} roughness={0.2} />
            </mesh>
            <mesh position={[0, 1.3, 0]}>
              <sphereGeometry args={[0.15, 12, 12]} />
              <meshBasicMaterial color={tokens.primary} />
            </mesh>
          </group>
        );
      })}

      {/* ================================================================== */}
      {/* INTERACTIVE SPATIALLY PLACED ARTIFACTS                             */}
      {/* ================================================================== */}
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
